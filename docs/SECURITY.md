# Security Design

## Credential Separation

The public application does not hard-code production credentials.

The assessment backend supports:
- `CYSI_DISCORD_WEBHOOK`
- `CLOUDFLARE_EMAIL_TOKEN`

Production can provide these as environment variables or from a private directory outside the public site document root.

## Never Commit

- webhook URLs
- API tokens
- SMTP credentials
- private keys
- `.env` files
- customer assessment submissions
- production logs
- server backups

`.env.example` contains placeholders only.
