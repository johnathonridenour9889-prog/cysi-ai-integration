"use client";

import { useEffect, useRef } from "react";

export function ContactNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    const wrapRefValue = wrapRef.current;
    if (!canvasRefValue || !wrapRefValue) return;

    const context = canvasRefValue.getContext("2d");
    if (!context) return;

    // Stable non-null aliases are used inside nested animation callbacks.
    const canvas = canvasRefValue;
    const wrap = wrapRefValue;
    const ctx = context;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pts = [
      [0.10, 0.25],
      [0.10, 0.50],
      [0.10, 0.76],
      [0.50, 0.50],
      [0.90, 0.25],
      [0.90, 0.50],
      [0.90, 0.76],
    ];

    const edges = [
      [0,3],[1,3],[2,3],[3,4],[3,5],[3,6]
    ];

    function resize() {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width));
      height = Math.max(220, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function p(index: number) {
      return { x: pts[index][0] * width, y: pts[index][1] * height };
    }

    function curve(a:{x:number;y:number}, b:{x:number;y:number}, t:number) {
      const mx = (a.x + b.x) / 2;
      const u = 1 - t;
      const p0 = a, p1 = {x:mx,y:a.y}, p2 = {x:mx,y:b.y}, p3 = b;
      return {
        x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
        y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
      };
    }

    function draw(time:number) {
      ctx.clearRect(0,0,width,height);

      ctx.strokeStyle = "rgba(130,170,202,.055)";
      ctx.lineWidth = 1;
      for (let x=0;x<width;x+=28) {
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke();
      }
      for (let y=0;y<height;y+=28) {
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke();
      }

      edges.forEach(([aIndex,bIndex], index) => {
        const a = p(aIndex), b = p(bIndex);
        const mx = (a.x+b.x)/2;
        ctx.strokeStyle = "rgba(145,213,255,.24)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.bezierCurveTo(mx,a.y,mx,b.y,b.x,b.y);
        ctx.stroke();

        if (!reduced) {
          const t = ((time * (0.00022 + index*0.000018)) + index*0.17) % 1;
          const q = curve(a,b,t);
          ctx.save();
          ctx.fillStyle = "#91d5ff";
          ctx.shadowColor = "rgba(145,213,255,.85)";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(q.x,q.y,3,0,Math.PI*2);
          ctx.fill();
          ctx.restore();
        }
      });

      pts.forEach((_, index) => {
        const q = p(index);
        const core = index === 3;
        ctx.save();

        if (core) {
          ctx.strokeStyle = "rgba(145,213,255,.12)";
          ctx.setLineDash([4,6]);
          ctx.beginPath();
          ctx.arc(q.x,q.y,48,0,Math.PI*2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.fillStyle = core ? "rgba(11,31,47,.98)" : "rgba(5,13,21,.98)";
        ctx.strokeStyle = core ? "rgba(145,213,255,.85)" : "rgba(91,167,215,.55)";
        ctx.lineWidth = core ? 2 : 1.2;
        ctx.beginPath();
        ctx.arc(q.x,q.y,core ? 26 : 8,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();

        if (core) {
          ctx.fillStyle = "#f4f7fb";
          ctx.font = "700 10px ui-monospace, monospace";
          ctx.textAlign = "center";
          ctx.fillText("DISCOVERY",q.x,q.y-2);
          ctx.fillStyle = "#91d5ff";
          ctx.font = "500 6px ui-monospace, monospace";
          ctx.fillText("MAP",q.x,q.y+9);
        }

        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="contact-canvas">
      <div className="contact-canvas__bar">
        <span>DISCOVERY PATH</span>
        <span>LIVE</span>
      </div>
      <div className="contact-canvas__stage" ref={wrapRef}>
        <canvas ref={canvasRef} />
      </div>
      <div className="contact-canvas__labels">
        <span>YOUR BUSINESS</span>
        <span>DISCOVERY</span>
        <span>INTEGRATION PATH</span>
      </div>
    </div>
  );
}
