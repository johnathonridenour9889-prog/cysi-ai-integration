<?php
// CYSI assessment endpoint.
// Public URL: https://cysi.net/api/assessment.php
// Secrets live OUTSIDE the public /cysi directory in ../cysi-private/.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_string(mixed $value, int $max): string {
    if (!is_string($value)) {
        return '';
    }

    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }
    return substr($value, 0, $max);
}

function clip(string $value, int $max): string {
    if (function_exists('mb_strlen') && function_exists('mb_substr')) {
        return mb_strlen($value, 'UTF-8') > $max
            ? mb_substr($value, 0, max(0, $max - 1), 'UTF-8') . '…'
            : $value;
    }
    return strlen($value) > $max ? substr($value, 0, max(0, $max - 3)) . '...' : $value;
}

function read_secret(string $filename, ?string $envName = null): string {
    if ($envName) {
        $env = getenv($envName);
        if (is_string($env) && trim($env) !== '') {
            return trim($env);
        }
    }

    // /host-root/cysi/api -> /host-root/cysi-private
    $hostRoot = dirname(__DIR__, 2);
    $path = $hostRoot . DIRECTORY_SEPARATOR . 'cysi-private' . DIRECTORY_SEPARATOR . $filename;
    if (!is_readable($path)) {
        return '';
    }

    $value = file_get_contents($path);
    return is_string($value) ? trim($value) : '';
}

function http_post_json(string $url, array $payload, array $headers = []): array {
    if (!function_exists('curl_init')) {
        return [false, 0, 'cURL is not available on the server.'];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => array_merge(['Content-Type: application/json'], $headers),
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        CURLOPT_USERAGENT => 'CYSI-Website/1.0',
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    return [$body !== false && $status >= 200 && $status < 300, $status, $error ?: (string) $body];
}

function smtp_read($socket): array {
    $lines = [];
    $code = 0;
    while (($line = fgets($socket, 2048)) !== false) {
        $lines[] = rtrim($line, "\r\n");
        if (preg_match('/^(\d{3})([ -])/', $line, $m)) {
            $code = (int) $m[1];
            if ($m[2] === ' ') {
                break;
            }
        } else {
            break;
        }
    }
    return [$code, implode("\n", $lines)];
}

function smtp_command($socket, string $command, array $okCodes): array {
    fwrite($socket, $command . "\r\n");
    [$code, $message] = smtp_read($socket);
    return [in_array($code, $okCodes, true), $code, $message];
}

function smtp_send_cloudflare(string $token, string $to, string $name, string $reference): array {
    $from = 'support@cysi.net';
    $host = 'smtp.mx.cloudflare.net';
    $port = 465;

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $host,
            'SNI_enabled' => true,
        ],
    ]);

    $errno = 0;
    $errstr = '';
    $socket = @stream_socket_client(
        "ssl://{$host}:{$port}",
        $errno,
        $errstr,
        12,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        return [false, "SMTP connection failed: {$errno} {$errstr}"];
    }

    stream_set_timeout($socket, 15);
    [$code, $banner] = smtp_read($socket);
    if ($code !== 220) {
        fclose($socket);
        return [false, "SMTP banner rejected: {$banner}"];
    }

    [$ok, , $message] = smtp_command($socket, 'EHLO cysi.net', [250]);
    if (!$ok) {
        fclose($socket);
        return [false, "EHLO failed: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, 'AUTH LOGIN', [334]);
    if (!$ok) {
        fclose($socket);
        return [false, "SMTP auth start failed: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, base64_encode('api_token'), [334]);
    if (!$ok) {
        fclose($socket);
        return [false, "SMTP username rejected: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, base64_encode($token), [235]);
    if (!$ok) {
        fclose($socket);
        return [false, "SMTP token rejected: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, "MAIL FROM:<{$from}>", [250]);
    if (!$ok) {
        fclose($socket);
        return [false, "MAIL FROM failed: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, "RCPT TO:<{$to}>", [250, 251]);
    if (!$ok) {
        fclose($socket);
        return [false, "RCPT TO failed: {$message}"];
    }

    [$ok, , $message] = smtp_command($socket, 'DATA', [354]);
    if (!$ok) {
        fclose($socket);
        return [false, "DATA failed: {$message}"];
    }

    $safeName = htmlspecialchars($name !== '' ? $name : 'there', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeReference = htmlspecialchars($reference, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $subject = 'CYSI — Assessment Request Received';

    $text = "Hi " . ($name !== '' ? $name : 'there') . ",\n\n"
        . "Thank you for contacting CYSI. We received your AI assessment request and our team will review the information you provided.\n\n"
        . "Reference: {$reference}\n\n"
        . "We will follow up after reviewing your goals and current systems. If you need to add anything, reply directly to this email.\n\n"
        . "CYSI\nCyber Systems Integration\nsupport@cysi.net\nhttps://cysi.net";

    $html = '<!doctype html><html><body style="margin:0;background:#071019;color:#eaf6ff;font-family:Arial,sans-serif">'
        . '<div style="max-width:640px;margin:0 auto;padding:40px 28px">'
        . '<div style="font-size:12px;letter-spacing:.16em;color:#67cfff;margin-bottom:18px">CYSI / CYBER SYSTEMS INTEGRATION</div>'
        . '<h1 style="font-size:26px;line-height:1.2;margin:0 0 20px;color:#fff">Assessment request received.</h1>'
        . '<p style="line-height:1.7;color:#c8d8e5">Hi ' . $safeName . ',</p>'
        . '<p style="line-height:1.7;color:#c8d8e5">Thank you for contacting CYSI. We received your AI assessment request and our team will review the information you provided.</p>'
        . '<div style="margin:26px 0;padding:16px 18px;border:1px solid #24435a;background:#0b1722">'
        . '<div style="font-size:11px;letter-spacing:.12em;color:#7b9aae">REFERENCE</div>'
        . '<div style="margin-top:7px;font-size:18px;color:#fff">' . $safeReference . '</div>'
        . '</div>'
        . '<p style="line-height:1.7;color:#c8d8e5">We will follow up after reviewing your goals and current systems. If you need to add anything, reply directly to this email.</p>'
        . '<p style="margin-top:30px;line-height:1.6;color:#8fa9bb"><strong style="color:#fff">CYSI</strong><br>Cyber Systems Integration<br>'
        . '<a href="mailto:support@cysi.net" style="color:#67cfff">support@cysi.net</a><br>'
        . '<a href="https://cysi.net" style="color:#67cfff">cysi.net</a></p>'
        . '</div></body></html>';

    $boundary = 'cysi_' . bin2hex(random_bytes(12));
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: CYSI <support@cysi.net>',
        'To: <' . $to . '>',
        'Reply-To: support@cysi.net',
        'Subject: ' . '=?UTF-8?B?' . base64_encode($subject) . '?=',
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@cysi.net>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        '',
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $text,
        '',
        '--' . $boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $html,
        '',
        '--' . $boundary . '--',
    ];

    $messageData = implode("\r\n", $headers);
    // SMTP dot-stuffing.
    $messageData = preg_replace('/(^|\r\n)\./', '$1..', $messageData) ?? $messageData;
    fwrite($socket, $messageData . "\r\n.\r\n");
    [$code, $message] = smtp_read($socket);
    smtp_command($socket, 'QUIT', [221, 250]);
    fclose($socket);

    return [$code === 250, $message];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > 65536) {
    respond(413, ['success' => false, 'message' => 'Request too large.']);
}

// Same-origin protection when browsers send an Origin header.
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $originHost = parse_url((string) $_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $allowed = ['cysi.net', 'www.cysi.net'];
    if (!is_string($originHost) || !in_array(strtolower($originHost), $allowed, true)) {
        respond(403, ['success' => false, 'message' => 'Origin not allowed.']);
    }
}

$raw = file_get_contents('php://input');
$data = json_decode(is_string($raw) ? $raw : '', true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'message' => 'Invalid request.']);
}

// Honeypot. Humans never see/fill this field.
if (clean_string($data['website'] ?? '', 200) !== '') {
    respond(200, ['success' => true, 'reference' => 'CYSI-RECEIVED', 'confirmationSent' => false]);
}

$name = clean_string($data['name'] ?? '', 120);
$company = clean_string($data['company'] ?? '', 180);
$email = clean_string($data['email'] ?? '', 254);
$stage = clean_string($data['stage'] ?? 'Exploring', 100);
$systems = clean_string($data['systems'] ?? '', 1400);
$challenge = clean_string($data['challenge'] ?? '', 4000);
$source = clean_string($data['source'] ?? 'Website assessment', 120);

$goals = [];
if (isset($data['goals']) && is_array($data['goals'])) {
    foreach (array_slice($data['goals'], 0, 10) as $goal) {
        $clean = clean_string($goal, 100);
        if ($clean !== '') {
            $goals[] = $clean;
        }
    }
}

if ($name === '' || $company === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $challenge === '') {
    respond(422, ['success' => false, 'message' => 'Please complete all required fields.']);
}

// Lightweight server-side rate limit by connecting IP.
$ip = (string) ($_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR . 'cysi-assessment-' . hash('sha256', $ip) . '.rate';
$now = time();
if (is_file($rateFile)) {
    $last = (int) @file_get_contents($rateFile);
    if ($last > 0 && ($now - $last) < 20) {
        respond(429, ['success' => false, 'message' => 'Please wait a moment before submitting again.']);
    }
}
@file_put_contents($rateFile, (string) $now, LOCK_EX);

$reference = 'CYSI-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
$submittedAt = gmdate('c');

$discordWebhook = read_secret('discord-webhook.txt', 'CYSI_DISCORD_WEBHOOK');
if ($discordWebhook === '' || !filter_var($discordWebhook, FILTER_VALIDATE_URL)) {
    error_log("CYSI {$reference}: Discord webhook is missing or invalid.");
    respond(500, ['success' => false, 'message' => 'The assessment service is temporarily unavailable. Please email support@cysi.net.']);
}

$discordPayload = [
    'username' => 'CYSI Website',
    'allowed_mentions' => ['parse' => []],
    'embeds' => [[
        'title' => 'New CYSI AI Assessment',
        'description' => clip($challenge, 1800),
        'color' => 6742015,
        'fields' => [
            ['name' => 'Reference', 'value' => $reference, 'inline' => true],
            ['name' => 'Stage', 'value' => clip($stage ?: 'Exploring', 100), 'inline' => true],
            ['name' => 'Source', 'value' => clip($source, 100), 'inline' => true],
            ['name' => 'Name', 'value' => clip($name, 200), 'inline' => true],
            ['name' => 'Company', 'value' => clip($company, 200), 'inline' => true],
            ['name' => 'Email', 'value' => clip($email, 250), 'inline' => false],
            ['name' => 'Areas of interest', 'value' => clip($goals ? implode(', ', $goals) : 'Not specified', 900), 'inline' => false],
            ['name' => 'Current systems / tools', 'value' => clip($systems !== '' ? $systems : 'Not specified', 900), 'inline' => false],
        ],
        'footer' => ['text' => 'cysi.net • Website assessment'],
        'timestamp' => $submittedAt,
    ]],
];

[$discordOk, $discordStatus, $discordResult] = http_post_json($discordWebhook, $discordPayload);
if (!$discordOk) {
    error_log("CYSI {$reference}: Discord delivery failed ({$discordStatus}): " . clip($discordResult, 500));
    respond(502, ['success' => false, 'message' => 'We could not submit your request. Please email support@cysi.net.']);
}

$confirmationSent = false;
$emailToken = read_secret('cloudflare-email-token.txt', 'CLOUDFLARE_EMAIL_TOKEN');
if ($emailToken !== '') {
    [$confirmationSent, $smtpResult] = smtp_send_cloudflare($emailToken, $email, $name, $reference);
    if (!$confirmationSent) {
        error_log("CYSI {$reference}: Confirmation email failed: " . clip($smtpResult, 500));

        // Tell the team in Discord that the lead is safe but the auto-confirmation failed.
        http_post_json($discordWebhook, [
            'username' => 'CYSI Website',
            'content' => "⚠️ Confirmation email failed for **{$reference}** ({$email}). The assessment itself was received successfully.",
            'allowed_mentions' => ['parse' => []],
        ]);
    }
} else {
    error_log("CYSI {$reference}: Cloudflare email token is missing.");
}

respond(200, [
    'success' => true,
    'reference' => $reference,
    'confirmationSent' => $confirmationSent,
    'supportEmail' => 'support@cysi.net',
]);
