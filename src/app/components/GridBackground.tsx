"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    const CELL = 60;
    const EFFECT_RADIUS = 220;
    const BULGE_STRENGTH = 18;

    const BASE_ALPHA = 0.1;
    const GLOW_ALPHA = 0.2;
    const BASE_WIDTH = 0.5;
    const GLOW_WIDTH = 1.0;

    const displaced = (gx: number, gy: number): [number, number] => {
      const dx = gx - mouseX;
      const dy = gy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > EFFECT_RADIUS || dist === 0) return [gx, gy];
      const t = 1 - dist / EFFECT_RADIUS;
      const s = t * t * (3 - 2 * t);
      return [
        gx + (dx / dist) * s * BULGE_STRENGTH,
        gy + (dy / dist) * s * BULGE_STRENGTH,
      ];
    };

    const glowFactor = (x: number, y: number): number => {
      const dist = Math.hypot(x - mouseX, y - mouseY);
      if (dist >= EFFECT_RADIUS) return 0;
      const t = 1 - dist / EFFECT_RADIUS;
      return t * t * (3 - 2 * t);
    };

    const draw = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / CELL) + 2;
      const rows = Math.ceil(canvas.height / CELL) + 2;

      // Vertical lines — drawn per segment for smooth per-pixel glow
      for (let i = 0; i <= cols; i++) {
        const bx = i * CELL;
        for (let j = 0; j < rows; j++) {
          const [x1, y1] = displaced(bx, j * CELL);
          const [x2, y2] = displaced(bx, (j + 1) * CELL);
          const g = glowFactor(bx, (j + 0.5) * CELL);
          const alpha = BASE_ALPHA + g * (GLOW_ALPHA - BASE_ALPHA);
          const width = BASE_WIDTH + g * (GLOW_WIDTH - BASE_WIDTH);
          const green = Math.round(160 + g * 65);
          const blue = Math.round(180 + g * 75);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(120,${green},${blue},${alpha.toFixed(3)})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }

      // Horizontal lines — drawn per segment
      for (let j = 0; j <= rows; j++) {
        const by = j * CELL;
        for (let i = 0; i < cols; i++) {
          const [x1, y1] = displaced(i * CELL, by);
          const [x2, y2] = displaced((i + 1) * CELL, by);
          const g = glowFactor((i + 0.5) * CELL, by);
          const alpha = BASE_ALPHA + g * (GLOW_ALPHA - BASE_ALPHA);
          const width = BASE_WIDTH + g * (GLOW_WIDTH - BASE_WIDTH);
          const green = Math.round(160 + g * 65);
          const blue = Math.round(180 + g * 75);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(120,${green},${blue},${alpha.toFixed(3)})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }

      // Intersection glow dots
      if (mouseX > -1000) {
        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const bx = i * CELL;
            const by = j * CELL;
            const g = glowFactor(bx, by);
            if (g <= 0) continue;
            const [x, y] = displaced(bx, by);
            ctx.beginPath();
            ctx.arc(x, y, 2.2 * g + 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,225,255,${(g * g * 0.8).toFixed(3)})`;
            ctx.fill();
          }
        }

        // Soft spotlight
        const spotlight = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, EFFECT_RADIUS
        );
        spotlight.addColorStop(0, "rgba(80,160,255,0.055)");
        spotlight.addColorStop(0.6, "rgba(60,120,220,0.018)");
        spotlight.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, EFFECT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = spotlight;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}