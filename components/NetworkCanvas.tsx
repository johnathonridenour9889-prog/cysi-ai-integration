"use client";

import { useEffect, useRef, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  icon: "api" | "database" | "people" | "document" | "bars" | "gear" | "report" | "check";
};

const nodes: NodeDef[] = [
  { id: "apps", label: "APIs", sub: "LLMs", x: 0.28, y: 0.15, icon: "api" },
  { id: "sql", label: "SQL", sub: "DATABASES", x: 0.12, y: 0.31, icon: "database" },
  { id: "crm", label: "CRM", sub: "CUSTOMERS", x: 0.11, y: 0.56, icon: "people" },
  { id: "docs", label: "DOCS", sub: "KNOWLEDGE", x: 0.24, y: 0.76, icon: "document" },
  { id: "assist", label: "ASSIST", sub: "EMPLOYEES", x: 0.77, y: 0.16, icon: "bars" },
  { id: "automate", label: "AUTOMATE", sub: "WORKFLOWS", x: 0.81, y: 0.35, icon: "gear" },
  { id: "report", label: "REPORT", sub: "INSIGHTS", x: 0.84, y: 0.58, icon: "report" },
  { id: "decide", label: "DECIDE", sub: "WITH DATA", x: 0.73, y: 0.78, icon: "check" },
];

const tour = ["apps", "sql", "crm", "docs", "assist", "automate", "report", "decide"];

const nodeDetails: Record<string, { description: string; route: string; control: string }> = {
  apps: {
    description: "AI models and external APIs connect into the integration layer without replacing your existing software.",
    route: "AI API → Cyber Systems → Business workflow",
    control: "Scoped credentials + approved endpoints",
  },
  sql: {
    description: "Databases provide structured operational data for reporting, retrieval, automation, and AI-assisted analysis.",
    route: "SQL data → Integration layer → Approved output",
    control: "Read/write boundaries + query controls",
  },
  crm: {
    description: "CRM and business platforms contribute customer, sales, service, and operational context.",
    route: "CRM → Cyber Systems → AI / Automation",
    control: "Role-based access + field restrictions",
  },
  docs: {
    description: "Policies, manuals, PDFs, and internal documentation become searchable knowledge for employees and workflows.",
    route: "Documents → Retrieval / RAG → Assistant",
    control: "Permission-aware retrieval",
  },
  assist: {
    description: "Employees receive AI assistance inside practical workflows instead of using disconnected standalone tools.",
    route: "Business context → AI assistant → Employee",
    control: "Approved actions + human review",
  },
  automate: {
    description: "Connected workflows handle repetitive steps across systems while preserving business rules and approvals.",
    route: "Trigger → Logic → Approval → Action",
    control: "Guardrails + audit trail",
  },
  report: {
    description: "Connected data produces reporting, summaries, dashboards, and operational outputs automatically.",
    route: "Systems → Data logic → Reporting",
    control: "Validated sources + output checks",
  },
  decide: {
    description: "Higher-impact recommendations stay inside explicit approval paths so people remain in control.",
    route: "AI recommendation → Human review → Decision",
    control: "Human-in-the-loop approval",
  },
};

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef("apps");
  const pauseTourUntilRef = useRef(0);
  const [active, setActive] = useState("apps");

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < pauseTourUntilRef.current) return;
      const currentIndex = Math.max(0, tour.indexOf(activeRef.current));
      const next = tour[(currentIndex + 1) % tour.length];
      activeRef.current = next;
      setActive(next);
    }, 3900);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    // Capture the ref values once and assert their DOM types for the lifetime of
    // this effect. The runtime guards still protect against an unmounted ref,
    // while the explicit types keep TypeScript from re-widening these captured
    // values to nullable inside resize/draw/event callbacks.
    const canvasNode = canvasRef.current;
    const wrapNode = wrapRef.current;
    if (!canvasNode || !wrapNode) return;

    const context = canvasNode.getContext("2d");
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasNode;
    const wrap: HTMLDivElement = wrapNode;
    const ctx: CanvasRenderingContext2D = context;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let pointerX = -999;
    let pointerY = -999;
    let hovering = false;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Exact CYSI emblem generated from the approved logo artwork and bundled in /public.
    const cysiMark = new window.Image();
    cysiMark.src = "/cysi-mark-transparent.png";

    const particles = nodes.flatMap((node, edgeIndex) =>
      Array.from({ length: 3 }, (_, index) => ({
        edgeIndex,
        offset: (edgeIndex * 0.13 + index * 0.31) % 1,
        speed: 0.00023 + (edgeIndex % 3) * 0.000035 + index * 0.000012,
      })),
    );

    const specks = Array.from({ length: 64 }, (_, index) => ({
      x: ((index * 61 + 7) % 100) / 100,
      y: ((index * 43 + 19) % 100) / 100,
      alpha: 0.045 + (index % 5) * 0.018,
      size: 0.55 + (index % 3) * 0.45,
      phase: index * 0.73,
    }));

    function resize() {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(360, Math.floor(rect.width));
      height = Math.max(430, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function mapBounds() {
      const top = 10;
      const bottom = height - 148;
      return { top, bottom, span: bottom - top };
    }

    function pos(node: NodeDef) {
      const bounds = mapBounds();
      return {
        x: node.x * width,
        y: bounds.top + node.y * bounds.span,
      };
    }

    function corePos() {
      const bounds = mapBounds();
      return {
        x: width * 0.525,
        y: bounds.top + bounds.span * 0.46,
      };
    }

    function pathPoint(node: NodeDef, t: number) {
      const start = pos(node);
      const end = corePos();
      const dir = node.x < 0.5 ? 1 : -1;
      const c1 = { x: start.x + width * 0.11 * dir, y: start.y + (end.y - start.y) * 0.10 };
      const c2 = { x: end.x - width * 0.10 * dir, y: end.y - (end.y - start.y) * 0.12 };
      const u = 1 - t;

      return {
        x:
          u * u * u * start.x +
          3 * u * u * t * c1.x +
          3 * u * t * t * c2.x +
          t * t * t * end.x,
        y:
          u * u * u * start.y +
          3 * u * u * t * c1.y +
          3 * u * t * t * c2.y +
          t * t * t * end.y,
      };
    }

    function drawBackground(time: number) {
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#040910");
      bg.addColorStop(0.58, "#050b12");
      bg.addColorStop(1, "#03070c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const center = corePos();
      const radial = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, Math.min(width, height) * 0.49);
      radial.addColorStop(0, "rgba(37,112,158,.18)");
      radial.addColorStop(0.30, "rgba(21,72,106,.10)");
      radial.addColorStop(0.66, "rgba(12,34,52,.035)");
      radial.addColorStop(1, "rgba(4,9,16,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      const small = 18;
      const major = 72;

      for (let x = 0; x <= width; x += small) {
        ctx.strokeStyle = x % major === 0 ? "rgba(104,177,221,.055)" : "rgba(104,177,221,.022)";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += small) {
        ctx.strokeStyle = y % major === 0 ? "rgba(104,177,221,.055)" : "rgba(104,177,221,.022)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      specks.forEach((speck) => {
        const flicker = reducedMotion ? 0 : (Math.sin(time * 0.0007 + speck.phase) + 1) * 0.012;
        ctx.fillStyle = `rgba(145,213,255,${speck.alpha + flicker})`;
        ctx.beginPath();
        ctx.arc(speck.x * width, speck.y * height, speck.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawCoreField(time: number) {
      const c = corePos();
      const radii = [104, 123, 143, 164];

      radii.forEach((radius, index) => {
        ctx.save();
        ctx.strokeStyle =
          index === 0
            ? "rgba(111,197,246,.25)"
            : index === 1
            ? "rgba(91,167,215,.16)"
            : "rgba(91,167,215,.08)";
        ctx.lineWidth = index === 0 ? 1.6 : 1;
        if (index > 1) ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      if (!reducedMotion) {
        const rot = time * 0.00045;
        for (let i = 0; i < 3; i += 1) {
          ctx.strokeStyle = `rgba(145,213,255,${0.12 - i * 0.025})`;
          ctx.lineWidth = 2 - i * 0.3;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 116 + i * 20, rot + i * 1.9, rot + i * 1.9 + 0.82);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = "rgba(145,213,255,.075)";
      ctx.lineWidth = 1;
      const bounds = mapBounds();
      ctx.beginPath();
      ctx.moveTo(c.x, bounds.top + 8);
      ctx.lineTo(c.x, bounds.bottom - 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(46, c.y);
      ctx.lineTo(width - 46, c.y);
      ctx.stroke();
    }

    function drawPath(node: NodeDef, activeEdge: boolean) {
      const a = pos(node);
      const b = corePos();
      const dir = node.x < 0.5 ? 1 : -1;
      const c1 = { x: a.x + width * 0.11 * dir, y: a.y + (b.y - a.y) * 0.10 };
      const c2 = { x: b.x - width * 0.10 * dir, y: b.y - (b.y - a.y) * 0.12 };

      ctx.strokeStyle = "rgba(0,0,0,.66)";
      ctx.lineWidth = activeEdge ? 5 : 4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
      ctx.stroke();

      const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      gradient.addColorStop(0, activeEdge ? "rgba(145,213,255,.92)" : "rgba(91,167,215,.52)");
      gradient.addColorStop(0.48, activeEdge ? "rgba(194,237,255,.88)" : "rgba(121,194,238,.55)");
      gradient.addColorStop(1, activeEdge ? "rgba(145,213,255,.98)" : "rgba(91,167,215,.58)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = activeEdge ? 2.3 : 1.5;
      ctx.shadowColor = activeEdge ? "rgba(145,213,255,.56)" : "rgba(91,167,215,.18)";
      ctx.shadowBlur = activeEdge ? 10 : 4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function drawBrandGlyph(x: number, y: number, size: number) {
      const scale = size / 64;
      ctx.save();
      ctx.translate(x - 32 * scale, y - 32 * scale);
      ctx.scale(scale, scale);
      ctx.strokeStyle = "#8DDAFF";
      ctx.fillStyle = "#8DDAFF";
      ctx.lineWidth = 3.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(12, 13);
      ctx.lineTo(39, 13);
      ctx.lineTo(47, 21);
      ctx.lineTo(47, 28);
      ctx.lineTo(39, 28);
      ctx.lineTo(39, 24);
      ctx.lineTo(35, 20);
      ctx.lineTo(20, 20);
      ctx.lineTo(20, 44);
      ctx.lineTo(35, 44);
      ctx.lineTo(39, 40);
      ctx.lineTo(39, 36);
      ctx.lineTo(47, 36);
      ctx.lineTo(47, 43);
      ctx.lineTo(39, 51);
      ctx.lineTo(12, 51);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(26, 28);
      ctx.lineTo(52, 28);
      ctx.moveTo(26, 36);
      ctx.lineTo(44, 36);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(53, 28, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawCore(time: number) {
      const c = corePos();
      const r = Math.min(110, Math.max(94, width * 0.116));
      const pulse = reducedMotion ? 0 : (Math.sin(time * 0.0022) + 1) * 0.5;

      ctx.save();

      // Wide blue corona / sun bloom.
      const corona = ctx.createRadialGradient(c.x, c.y, r * 0.48, c.x, c.y, r + 118);
      corona.addColorStop(0, "rgba(195,240,255,.30)");
      corona.addColorStop(0.20, "rgba(94,201,252,.24)");
      corona.addColorStop(0.48, "rgba(42,130,181,.11)");
      corona.addColorStop(0.75, "rgba(19,65,95,.045)");
      corona.addColorStop(1, "rgba(7,26,42,0)");
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r + 120, 0, Math.PI * 2);
      ctx.fill();

      // Fine solar rays around the orb.
      ctx.save();
      ctx.translate(c.x, c.y);
      for (let i = 0; i < 56; i += 1) {
        const a = (Math.PI * 2 * i) / 56;
        const wave = reducedMotion ? 0 : Math.sin(time * 0.0014 + i * 1.37) * 2.8;
        const inner = r + 14;
        const outer = inner + 10 + (i % 6) * 2.1 + wave;
        const alpha = 0.026 + (i % 5) * 0.009;
        ctx.strokeStyle = `rgba(145,213,255,${alpha})`;
        ctx.lineWidth = i % 7 === 0 ? 1.35 : 0.8;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.stroke();
      }
      ctx.restore();

      // Outer halo rings.
      [r + 11, r + 21, r + 34].forEach((radius, index) => {
        ctx.strokeStyle = index === 0
          ? "rgba(139,220,255,.48)"
          : index === 1
          ? "rgba(105,191,235,.18)"
          : "rgba(91,167,215,.08)";
        ctx.lineWidth = index === 0 ? 2 : 1;
        if (index === 2) ctx.setLineDash([5, 8]);
        ctx.beginPath();
        ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Main glass sphere.
      const sphere = ctx.createRadialGradient(
        c.x - r * 0.34,
        c.y - r * 0.42,
        2,
        c.x + r * 0.12,
        c.y + r * 0.13,
        r * 1.10,
      );
      sphere.addColorStop(0, "rgba(215,247,255,.98)");
      sphere.addColorStop(0.06, "rgba(125,218,255,.98)");
      sphere.addColorStop(0.17, "rgba(49,151,203,.98)");
      sphere.addColorStop(0.43, "rgba(12,71,108,.995)");
      sphere.addColorStop(0.74, "rgba(6,35,58,1)");
      sphere.addColorStop(1, "rgba(2,14,25,1)");
      ctx.fillStyle = sphere;
      ctx.shadowColor = "rgba(84,198,255,.82)";
      ctx.shadowBlur = 38;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Glass/refraction overlays clipped to the sphere.
      ctx.save();
      ctx.beginPath();
      ctx.arc(c.x, c.y, r - 1, 0, Math.PI * 2);
      ctx.clip();

      // Large translucent top glass cap.
      const cap = ctx.createLinearGradient(c.x, c.y - r, c.x, c.y + r * 0.35);
      cap.addColorStop(0, "rgba(255,255,255,.29)");
      cap.addColorStop(0.28, "rgba(213,244,255,.11)");
      cap.addColorStop(0.62, "rgba(122,207,248,.025)");
      cap.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = cap;
      ctx.beginPath();
      ctx.ellipse(c.x - r * 0.08, c.y - r * 0.38, r * 0.92, r * 0.54, -0.12, 0, Math.PI * 2);
      ctx.fill();

      // Bright upper-left specular hotspot.
      const glass = ctx.createRadialGradient(
        c.x - r * 0.42,
        c.y - r * 0.46,
        0,
        c.x - r * 0.36,
        c.y - r * 0.39,
        r * 0.72,
      );
      glass.addColorStop(0, "rgba(255,255,255,.58)");
      glass.addColorStop(0.12, "rgba(220,249,255,.27)");
      glass.addColorStop(0.38, "rgba(144,222,255,.08)");
      glass.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glass;
      ctx.fillRect(c.x - r, c.y - r, r * 2, r * 2);

      // Refracted cyan light near lower-right edge.
      const lowerGlow = ctx.createRadialGradient(
        c.x + r * 0.42,
        c.y + r * 0.48,
        0,
        c.x + r * 0.34,
        c.y + r * 0.44,
        r * 0.82,
      );
      lowerGlow.addColorStop(0, "rgba(91,213,255,.22)");
      lowerGlow.addColorStop(0.42, "rgba(32,132,188,.07)");
      lowerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lowerGlow;
      ctx.fillRect(c.x - r, c.y - r, r * 2, r * 2);

      // Internal horizontal refraction bands.
      ctx.strokeStyle = "rgba(160,224,252,.075)";
      ctx.lineWidth = 1.1;
      for (let i = -2; i <= 2; i += 1) {
        const yy = c.y + i * 15;
        ctx.beginPath();
        ctx.ellipse(c.x, yy, r * 0.78, r * (0.105 + Math.abs(i) * 0.010), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Thin diagonal reflection streak.
      const streak = ctx.createLinearGradient(c.x - r, c.y - r, c.x + r, c.y + r);
      streak.addColorStop(0, "rgba(255,255,255,0)");
      streak.addColorStop(0.35, "rgba(255,255,255,.12)");
      streak.addColorStop(0.48, "rgba(255,255,255,.035)");
      streak.addColorStop(0.64, "rgba(255,255,255,0)");
      ctx.fillStyle = streak;
      ctx.fillRect(c.x - r, c.y - r, r * 2, r * 2);

      ctx.restore();

      // Double bright glass rim.
      ctx.strokeStyle = "rgba(202,243,255,.98)";
      ctx.lineWidth = 2.8;
      ctx.shadowColor = "rgba(95,205,255,.95)";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = "rgba(145,213,255,.34)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r - 11, 0, Math.PI * 2);
      ctx.stroke();

      // Reflection crescent.
      const reflection = ctx.createLinearGradient(c.x - r, c.y - r, c.x + r, c.y + r);
      reflection.addColorStop(0, "rgba(255,255,255,.56)");
      reflection.addColorStop(0.18, "rgba(213,247,255,.22)");
      reflection.addColorStop(0.46, "rgba(255,255,255,0)");
      ctx.strokeStyle = reflection;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r - 6, Math.PI * 1.09, Math.PI * 1.53);
      ctx.stroke();

      // Rim flare points.
      [0.02, 1.58, 3.34, 4.86].forEach((a, index) => {
        const rr = r + 1;
        const fx = c.x + Math.cos(a + pulse * 0.018) * rr;
        const fy = c.y + Math.sin(a + pulse * 0.018) * rr;
        ctx.shadowColor = "rgba(216,247,255,.98)";
        ctx.shadowBlur = 12;
        ctx.fillStyle = index === 0 ? "#FFFFFF" : "#B9EAFF";
        ctx.beginPath();
        ctx.arc(fx, fy, index === 0 ? 2.7 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Exact CYSI emblem with its dark source background removed.
      // The transparent asset lets the pearl/glass lighting show through naturally.
      if (cysiMark.complete && cysiMark.naturalWidth > 0) {
        const markSize = 44;
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.shadowColor = "rgba(83,201,255,.34)";
        ctx.shadowBlur = 7;
        ctx.drawImage(
          cysiMark,
          c.x - markSize / 2,
          c.y - 63,
          markSize,
          markSize,
        );
        ctx.restore();
      }

      // Core wording: all text remains inside the bubble.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,.80)";
      ctx.shadowBlur = 9;
      ctx.fillStyle = "#F8FBFD";
      ctx.font = '700 19px "Inter", Arial, sans-serif';
      ctx.fillText("CYBER", c.x, c.y + 2);
      ctx.font = '700 15px "Inter", Arial, sans-serif';
      ctx.fillText("SYSTEMS", c.x, c.y + 23);
      ctx.shadowBlur = 0;

      // Divider and subtitle placed safely within the glass sphere.
      ctx.strokeStyle = "rgba(145,213,255,.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(c.x - 29, c.y + 42);
      ctx.lineTo(c.x + 29, c.y + 42);
      ctx.stroke();

      ctx.fillStyle = "rgba(185,230,251,.88)";
      ctx.font = '600 6.6px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      ctx.fillText("AI INTEGRATION", c.x, c.y + 54);
      ctx.fillStyle = "rgba(145,213,255,.64)";
      ctx.font = '600 5.8px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      ctx.fillText("REAL BUSINESS IMPACT", c.x, c.y + 66);

      // Soft animated outer ring.
      ctx.strokeStyle = `rgba(145,213,255,${0.12 + pulse * 0.045})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r + 18 + pulse * 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    function drawIcon(node: NodeDef, x: number, y: number, size: number) {
      ctx.save();
      const s = size;
      ctx.strokeStyle = "#DDF4FF";
      ctx.fillStyle = "#DDF4FF";
      ctx.lineWidth = Math.max(1.7, s * 0.07);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(145,213,255,.38)";
      ctx.shadowBlur = 6;

      if (node.icon === "database") {
        const w = s * 0.31;
        const h = s * 0.115;
        ctx.fillStyle = "#CFEFFF";
        ctx.beginPath();
        ctx.ellipse(x, y - s * 0.19, w, h, 0, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 3; i += 1) {
          const yy = y - s * 0.17 + i * s * 0.15;
          ctx.strokeStyle = i === 0 ? "#DDF4FF" : "rgba(207,239,255,.88)";
          ctx.beginPath();
          ctx.ellipse(x, yy, w, h, 0, 0, Math.PI);
          ctx.stroke();
          if (i < 2) {
            ctx.beginPath();
            ctx.moveTo(x - w, yy);
            ctx.lineTo(x - w, yy + s * 0.14);
            ctx.moveTo(x + w, yy);
            ctx.lineTo(x + w, yy + s * 0.14);
            ctx.stroke();
          }
        }
      } else if (node.icon === "people") {
        ctx.beginPath();
        ctx.arc(x - s * 0.15, y - s * 0.13, s * 0.11, 0, Math.PI * 2);
        ctx.arc(x + s * 0.15, y - s * 0.13, s * 0.11, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(x - s * 0.31, y + s * 0.03, s * 0.26, s * 0.21, s * 0.08);
        ctx.roundRect(x + s * 0.05, y + s * 0.03, s * 0.26, s * 0.21, s * 0.08);
        ctx.fill();
      } else if (node.icon === "document") {
        ctx.strokeRect(x - s * 0.21, y - s * 0.28, s * 0.38, s * 0.53);
        ctx.beginPath();
        ctx.moveTo(x + s * 0.03, y - s * 0.28);
        ctx.lineTo(x + s * 0.17, y - s * 0.14);
        ctx.lineTo(x + s * 0.03, y - s * 0.14);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth *= 0.72;
        [-0.02, 0.09].forEach((dy) => {
          ctx.beginPath();
          ctx.moveTo(x - s * 0.11, y + s * dy);
          ctx.lineTo(x + s * 0.09, y + s * dy);
          ctx.stroke();
        });
      } else if (node.icon === "bars") {
        const widths = [0.11, 0.11, 0.11];
        const heights = [0.16, 0.27, 0.38];
        heights.forEach((h, index) => {
          const bx = x - s * 0.23 + index * s * 0.18;
          ctx.fillRect(bx, y + s * 0.22 - s * h, s * widths[index], s * h);
        });
      } else if (node.icon === "gear") {
        ctx.beginPath();
        ctx.arc(x, y, s * 0.17, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i += 1) {
          const a = (Math.PI * 2 * i) / 8;
          const inner = s * 0.23;
          const outer = s * 0.36;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(a) * inner, y + Math.sin(a) * inner);
          ctx.lineTo(x + Math.cos(a) * outer, y + Math.sin(a) * outer);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, s * 0.065, 0, Math.PI * 2);
        ctx.fill();
      } else if (node.icon === "report") {
        ctx.strokeRect(x - s * 0.27, y - s * 0.23, s * 0.54, s * 0.46);
        ctx.beginPath();
        ctx.moveTo(x - s * 0.18, y + s * 0.09);
        ctx.lineTo(x - s * 0.05, y - s * 0.03);
        ctx.lineTo(x + s * 0.055, y + s * 0.025);
        ctx.lineTo(x + s * 0.18, y - s * 0.14);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + s * 0.12, y - s * 0.14);
        ctx.lineTo(x + s * 0.18, y - s * 0.14);
        ctx.lineTo(x + s * 0.18, y - s * 0.08);
        ctx.stroke();
      } else if (node.icon === "check") {
        ctx.beginPath();
        ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - s * 0.15, y);
        ctx.lineTo(x - s * 0.035, y + s * 0.10);
        ctx.lineTo(x + s * 0.18, y - s * 0.15);
        ctx.stroke();
      } else if (node.icon === "api") {
        // Clean six-loop AI/API knot treatment.
        ctx.lineWidth = Math.max(1.8, s * 0.065);
        for (let i = 0; i < 6; i += 1) {
          const a = (Math.PI * 2 * i) / 6;
          const cx = x + Math.cos(a) * s * 0.105;
          const cy = y + Math.sin(a) * s * 0.105;
          ctx.beginPath();
          ctx.arc(cx, cy, s * 0.145, a - 1.32, a + 1.32);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, s * 0.105, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawNode(node: NodeDef, time: number) {
      const p = pos(node);
      const isActive = activeRef.current === node.id;
      const radius = Math.min(42, Math.max(34, width * 0.047));
      const hover = hovering && Math.hypot(pointerX - p.x, pointerY - p.y) < radius + 15;
      const on = isActive || hover;

      if (on) {
        const halo = ctx.createRadialGradient(p.x, p.y, radius * 0.30, p.x, p.y, radius + 24);
        halo.addColorStop(0, "rgba(145,213,255,.26)");
        halo.addColorStop(1, "rgba(145,213,255,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + 26, 0, Math.PI * 2);
        ctx.fill();
      }

      const fill = ctx.createRadialGradient(p.x - radius * 0.32, p.y - radius * 0.36, 3, p.x, p.y, radius);
      fill.addColorStop(0, on ? "rgba(27,80,114,.98)" : "rgba(18,52,76,.96)");
      fill.addColorStop(0.55, "rgba(8,29,46,.99)");
      fill.addColorStop(1, "rgba(4,16,27,1)");

      ctx.shadowColor = on ? "rgba(89,196,255,.62)" : "rgba(0,0,0,.55)";
      ctx.shadowBlur = on ? 18 : 16;
      ctx.shadowOffsetY = on ? 0 : 5;
      const nodeRadius = radius + (isActive ? 3 : hover ? 1.5 : 0);
      ctx.fillStyle = fill;
      ctx.strokeStyle = on ? "rgba(145,213,255,.98)" : "rgba(87,178,229,.76)";
      ctx.lineWidth = isActive ? 2.8 : on ? 2.1 : 1.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = "rgba(145,213,255,.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius - 7, 0, Math.PI * 2);
      ctx.stroke();

      drawIcon(node, p.x, p.y, radius * 1.15);

      if (on && !reducedMotion) {
        const pulse = 5 + (Math.sin(time * 0.0034) + 1) * 2;
        ctx.strokeStyle = "rgba(145,213,255,.19)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.save();
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      ctx.font = '700 13.8px "Inter", Arial, sans-serif';
      const labelWidth = ctx.measureText(node.label).width;
      ctx.font = '700 8.2px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      const subWidth = ctx.measureText(node.sub).width;
      const textWidth = Math.max(labelWidth, subWidth);
      const desiredTextX = p.x + radius + 18;
      const textX = Math.min(desiredTextX, width - textWidth - 18);

      // Keep the SQL and CRM labels clear of their live data routes.
      // SQL sits above its stream; CRM sits below its stream.
      const labelOffsetY = node.id === "sql" ? -20 : node.id === "crm" ? 18 : 0;

      ctx.shadowColor = "rgba(0,0,0,.90)";
      ctx.shadowBlur = 9;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillStyle = isActive ? "#FFFFFF" : "#F1F6FA";
      ctx.font = '700 13.8px "Inter", Arial, sans-serif';
      ctx.fillText(node.label, textX, p.y - 9 + labelOffsetY);

      ctx.shadowBlur = 6;
      ctx.fillStyle = isActive ? "rgba(164,226,255,.92)" : "rgba(145,213,255,.72)";
      ctx.font = '700 8.2px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      ctx.fillText(node.sub, textX, p.y + 10 + labelOffsetY);
      ctx.restore();
    }

    function drawParticles(time: number) {
      if (reducedMotion) return;

      particles.forEach((particle) => {
        const node = nodes[particle.edgeIndex];
        const t = (particle.offset + time * particle.speed) % 1;
        const p = pathPoint(node, t);
        const p1 = pathPoint(node, Math.max(0, t - 0.018));
        const p2 = pathPoint(node, Math.max(0, t - 0.038));
        const activeEdge = activeRef.current === node.id;

        ctx.strokeStyle = activeEdge ? "rgba(145,213,255,.26)" : "rgba(145,213,255,.13)";
        ctx.lineWidth = activeEdge ? 2.4 : 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();

        ctx.shadowColor = "rgba(145,213,255,.95)";
        ctx.shadowBlur = activeEdge ? 16 : 10;
        ctx.fillStyle = activeEdge ? "#F4FBFF" : "#BFEAFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, activeEdge ? 3.4 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);
      drawBackground(time);
      drawCoreField(time);
      nodes.forEach((node) => drawPath(node, activeRef.current === node.id));
      drawParticles(time);
      drawCore(time);
      nodes.forEach((node) => drawNode(node, time));
      raf = window.requestAnimationFrame(draw);
    }

    function pickNode(clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      let selected: NodeDef | null = null;
      let best = Infinity;

      for (const node of nodes) {
        const p = pos(node);
        const d = Math.hypot(x - p.x, y - p.y);
        if (d < best) {
          best = d;
          selected = node;
        }
      }

      if (selected && best < 72) {
        activeRef.current = selected.id;
        setActive(selected.id);
        pauseTourUntilRef.current = Date.now() + 9000;
      }
    }

    function onMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      hovering = true;

      const onNode = nodes.some((node) => {
        const p = pos(node);
        return Math.hypot(pointerX - p.x, pointerY - p.y) < 58;
      });

      canvas.style.cursor = onNode ? "pointer" : "default";
      if (onNode) pauseTourUntilRef.current = Date.now() + 5000;
    }

    function onLeave() {
      hovering = false;
      pointerX = -999;
      pointerY = -999;
      canvas.style.cursor = "default";
    }

    function onClick(event: MouseEvent) {
      pickNode(event.clientX, event.clientY);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    resize();
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  const activeNode = nodes.find((node) => node.id === active) ?? nodes[0];
  const activeDetails = nodeDetails[activeNode.id];

  return (
    <div className="canvas-network canvas-network--v17">
      <div className="canvas-network__top canvas-network__top--v17">
        <span>LIVE SYSTEM INTEGRATION MAP</span>
        <div className="canvas-network__top-status">
          <span className="canvas-network__selected-status">SELECTED: {activeNode.label}</span>
          <span className="canvas-network__tour">AUTO TOUR</span>
          <span className="canvas-network__online canvas-network__online--green">
            <i />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>

      <div className="canvas-network__stage canvas-network__stage--v17" ref={wrapRef}>
        <canvas ref={canvasRef} aria-label="Animated Cyber Systems integration map" />
        <div className="canvas-network__corner canvas-network__corner--tl" />
        <div className="canvas-network__corner canvas-network__corner--br" />

        <div className="canvas-network__selection" aria-live="polite">
          <div className="canvas-network__selection-node">
            <span>SELECTED NODE</span>
            <strong>{activeNode.label}</strong>
            <small>{activeNode.sub}</small>
          </div>

          <div className="canvas-network__selection-copy">
            <p>{activeDetails.description}</p>
            <div className="canvas-network__selection-meta">
              <span><b>ROUTE</b>{activeDetails.route}</span>
              <span><b>CONTROL</b>{activeDetails.control}</span>
            </div>
          </div>

          <div className="canvas-network__selection-hint">CLICK ANY NODE TO INSPECT</div>
        </div>
      </div>

      <div className="canvas-network__flowbar" aria-hidden="true">
        <div className="canvas-network__flow">
          <span><i /> DATA</span>
          <b>→</b>
          <span>SYSTEMS</span>
          <b>→</b>
          <span>AI</span>
          <b>→</b>
          <span>PEOPLE</span>
          <b>→</b>
          <span>RESULTS</span>
        </div>
        <div className="canvas-network__qualities">
          SCALABLE <i>/</i> SECURE <i>/</i> ENTERPRISE-READY
        </div>
      </div>
    </div>
  );
}
