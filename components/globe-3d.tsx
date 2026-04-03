"use client";

import { useEffect, useRef } from "react";

interface GalaxyProps {
  size?: number;
  opacity?: number;
  className?: string;
  speed?: number;
}

export function Globe3D({
  size = 420,
  opacity = 1,
  className = "",
  speed = 1,
}: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    // ── HELPERS ──────────────────────────────────────────────────
    const TAU = Math.PI * 2;

    function rgba(r: number, g: number, b: number, a: number) {
      return `rgba(${r},${g},${b},${a})`;
    }
    // teal palette
    const T = (a: number) => rgba(94, 234, 212, a); // #5eead4
    const T2 = (a: number) => rgba(45, 212, 191, a); // #2dd4bf
    const T3 = (a: number) => rgba(153, 246, 228, a); // #99f6e4
    const T4 = (a: number) => rgba(20, 184, 166, a); // #14b8a6

    // ── GALAXY CORE ──────────────────────────────────────────────
    const CORE_R = size * 0.055;

    // ── STAR FIELD ───────────────────────────────────────────────
    type Star = {
      x: number;
      y: number;
      r: number;
      alpha: number;
      twinkleOffset: number;
    };
    const stars: Star[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * TAU;
      const dist = size * 0.08 + Math.random() * size * 0.44;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 0.4 + Math.random() * 1.1,
        alpha: 0.08 + Math.random() * 0.22,
        twinkleOffset: Math.random() * TAU,
      };
    });

    // ── SPIRAL ARMS ──────────────────────────────────────────────
    type SpiralDot = { angle: number; dist: number; alpha: number; r: number };
    const spiralDots: SpiralDot[] = [];
    const ARMS = 3;
    for (let arm = 0; arm < ARMS; arm++) {
      const baseAngle = (arm / ARMS) * TAU;
      for (let i = 0; i < 55; i++) {
        const t = i / 54;
        const dist = size * 0.07 + t * size * 0.36;
        const curl = t * Math.PI * 2.2;
        spiralDots.push({
          angle: baseAngle + curl,
          dist,
          alpha: (1 - t) * 0.18 + 0.03,
          r: (1 - t * 0.7) * 1.8,
        });
      }
    }

    // ── ORBITING RINGS ───────────────────────────────────────────
    type Ring = {
      rx: number; // x-radius of ellipse
      ry: number; // y-radius (tilt)
      tilt: number; // visual tilt angle (deg)
      color: (a: number) => string;
      lineW: number;
      alpha: number;
      dashOn: number;
      dashOff: number;
    };
    const rings: Ring[] = [
      {
        rx: size * 0.2,
        ry: size * 0.058,
        tilt: -15,
        color: T,
        lineW: 0.7,
        alpha: 0.18,
        dashOn: 4,
        dashOff: 5,
      },
      {
        rx: size * 0.28,
        ry: size * 0.09,
        tilt: 10,
        color: T2,
        lineW: 0.6,
        alpha: 0.14,
        dashOn: 3,
        dashOff: 7,
      },
      {
        rx: size * 0.36,
        ry: size * 0.12,
        tilt: -22,
        color: T3,
        lineW: 0.5,
        alpha: 0.1,
        dashOn: 5,
        dashOff: 8,
      },
      {
        rx: size * 0.44,
        ry: size * 0.145,
        tilt: 18,
        color: T4,
        lineW: 0.5,
        alpha: 0.08,
        dashOn: 2,
        dashOff: 10,
      },
    ];

    // ── ORBITING BODIES ──────────────────────────────────────────
    type Body = {
      ringIdx: number; // which ring it rides on
      revSpeed: number; // revolution (orbit) speed rad/s
      rotSpeed: number; // self-rotation speed rad/s
      phase: number; // start angle
      r: number; // body radius px
      color: (a: number) => string;
      type: "circle" | "diamond" | "square" | "tri";
      trailLen: number;
    };
    const bodies: Body[] = [
      {
        ringIdx: 0,
        revSpeed: speed * 0.55,
        rotSpeed: speed * 4.0,
        phase: 0.0,
        r: 3.5,
        color: T,
        type: "circle",
        trailLen: 20,
      },
      {
        ringIdx: 0,
        revSpeed: speed * 0.55,
        rotSpeed: speed * 0,
        phase: 3.2,
        r: 2.0,
        color: T3,
        type: "diamond",
        trailLen: 12,
      },
      {
        ringIdx: 1,
        revSpeed: speed * 0.38,
        rotSpeed: speed * 5.5,
        phase: 1.0,
        r: 3.0,
        color: T2,
        type: "square",
        trailLen: 16,
      },
      {
        ringIdx: 1,
        revSpeed: speed * 0.38,
        rotSpeed: speed * 0,
        phase: 4.4,
        r: 1.8,
        color: T,
        type: "circle",
        trailLen: 10,
      },
      {
        ringIdx: 2,
        revSpeed: speed * 0.26,
        rotSpeed: speed * 3.0,
        phase: 2.5,
        r: 2.5,
        color: T4,
        type: "tri",
        trailLen: 14,
      },
      {
        ringIdx: 2,
        revSpeed: speed * 0.26,
        rotSpeed: speed * 0,
        phase: 5.8,
        r: 1.5,
        color: T2,
        type: "circle",
        trailLen: 8,
      },
      {
        ringIdx: 3,
        revSpeed: speed * 0.18,
        rotSpeed: speed * 2.2,
        phase: 1.8,
        r: 2.0,
        color: T3,
        type: "diamond",
        trailLen: 12,
      },
      {
        ringIdx: 3,
        revSpeed: speed * 0.18,
        rotSpeed: speed * 0,
        phase: 5.0,
        r: 1.3,
        color: T,
        type: "circle",
        trailLen: 8,
      },
    ];

    // Get position of body at time t on its ring
    function bodyPos(b: Body, t: number) {
      const ring = rings[b.ringIdx];
      const angle = t * b.revSpeed + b.phase;
      const tiltR = (ring.tilt * Math.PI) / 180;
      // Ellipse position
      const ex = Math.cos(angle) * ring.rx;
      const ey = Math.sin(angle) * ring.ry;
      // Apply tilt rotation
      const px = cx + ex * Math.cos(tiltR) - ey * Math.sin(tiltR);
      const py = cy + ex * Math.sin(tiltR) + ey * Math.cos(tiltR);
      return { px, py };
    }

    // Draw a body shape
    function drawBody(
      bx: number,
      by: number,
      r: number,
      angle: number,
      type: Body["type"],
      colorFn: (a: number) => string,
    ) {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle);
      ctx.shadowBlur = 12;
      ctx.shadowColor = colorFn(0.8);
      ctx.fillStyle = colorFn(0.95);

      switch (type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, TAU);
          ctx.fill();
          break;

        case "diamond":
          ctx.beginPath();
          ctx.moveTo(0, -r * 1.4);
          ctx.lineTo(r * 0.9, 0);
          ctx.lineTo(0, r * 1.4);
          ctx.lineTo(-r * 0.9, 0);
          ctx.closePath();
          ctx.fill();
          break;

        case "square":
          ctx.beginPath();
          ctx.rect(-r, -r, r * 2, r * 2);
          ctx.fill();
          // solar panels
          ctx.strokeStyle = colorFn(0.55);
          ctx.lineWidth = r * 0.5;
          ctx.lineCap = "round";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.moveTo(-r * 2.6, 0);
          ctx.lineTo(r * 2.6, 0);
          ctx.stroke();
          break;

        case "tri":
          ctx.beginPath();
          ctx.moveTo(0, -r * 1.5);
          ctx.lineTo(r * 1.3, r * 0.9);
          ctx.lineTo(-r * 1.3, r * 0.9);
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    }

    // ── DRAW FRAME ───────────────────────────────────────────────
    function draw(t: number) {
      ctx.clearRect(0, 0, size, size);

      // ── 1. Background nebula glow ───────────────────────────────
      const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.46);
      nebula.addColorStop(0, T(0.06));
      nebula.addColorStop(0.35, T4(0.02));
      nebula.addColorStop(0.7, T(0.01));
      nebula.addColorStop(1, "transparent");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, size, size);

      // ── 2. Twinkling stars ─────────────────────────────────────
      stars.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.8 + s.twinkleOffset);
        const a = s.alpha * (0.5 + twinkle * 0.5);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, TAU);
        ctx.fillStyle = T(a);
        ctx.fill();
      });

      // ── 3. Spiral arms (rotate slowly) ─────────────────────────
      const spiralRot = t * speed * 0.06;
      spiralDots.forEach((d) => {
        const a = d.angle + spiralRot;
        const x = cx + Math.cos(a) * d.dist;
        const y = cy + Math.sin(a) * d.dist;
        const flicker = 0.7 + 0.3 * Math.sin(t * 2.2 + d.angle * 3);
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, TAU);
        ctx.fillStyle = T(d.alpha * flicker);
        ctx.fill();
      });

      // ── 4. Orbit rings ─────────────────────────────────────────
      rings.forEach((ring) => {
        const tiltR = (ring.tilt * Math.PI) / 180;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltR);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, TAU);
        ctx.strokeStyle = ring.color(ring.alpha);
        ctx.lineWidth = ring.lineW;
        ctx.shadowBlur = 4;
        ctx.shadowColor = ring.color(0.3);
        ctx.setLineDash([ring.dashOn, ring.dashOff]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // ── 5. Orbiting bodies (trail + shape) ─────────────────────
      bodies.forEach((b) => {
        const pos = bodyPos(b, t);

        // Trail
        for (let i = 1; i <= b.trailLen; i++) {
          const ta = t - i * 0.03;
          const pPrev = bodyPos(b, t - (i - 1) * 0.03);
          const pCurr = bodyPos(b, ta);
          const prog = 1 - i / b.trailLen;
          ctx.beginPath();
          ctx.moveTo(pPrev.px, pPrev.py);
          ctx.lineTo(pCurr.px, pCurr.py);
          ctx.strokeStyle = b.color(prog * 0.45);
          ctx.lineWidth = b.r * prog * 1.3;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Body glow
        const glow = ctx.createRadialGradient(
          pos.px,
          pos.py,
          0,
          pos.px,
          pos.py,
          b.r * 5,
        );
        glow.addColorStop(0, b.color(0.4));
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.px, pos.py, b.r * 5, 0, TAU);
        ctx.fillStyle = glow;
        ctx.fill();

        // Body shape with self-rotation
        drawBody(pos.px, pos.py, b.r, t * b.rotSpeed, b.type, b.color);
      });

      // ── 6. Galaxy core ──────────────────────────────────────────
      // Outer halo
      const coreHalo = ctx.createRadialGradient(cx, cy, 0, cx, cy, CORE_R * 4);
      coreHalo.addColorStop(0, T(0.55));
      coreHalo.addColorStop(0.3, T(0.12));
      coreHalo.addColorStop(0.7, T(0.03));
      coreHalo.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_R * 4, 0, TAU);
      ctx.fillStyle = coreHalo;
      ctx.fill();

      // Core rings (pulsing)
      const pulse = 0.7 + 0.3 * Math.sin(t * 2.5);
      [CORE_R * 2.2, CORE_R * 1.5].forEach((cr, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, TAU);
        ctx.strokeStyle = T((i === 0 ? 0.12 : 0.25) * pulse);
        ctx.lineWidth = i === 0 ? 0.8 : 1.2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = T(0.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Core bright center
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, CORE_R);
      coreGrad.addColorStop(0, T3(0.95));
      coreGrad.addColorStop(0.4, T(0.8));
      coreGrad.addColorStop(1, T4(0.3));
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_R, 0, TAU);
      ctx.shadowBlur = 20;
      ctx.shadowColor = T(0.9);
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core cross flare
      const flareA = 0.15 + 0.1 * Math.sin(t * 1.8);
      [-1, 1].forEach((dir) => {
        const grad = ctx.createLinearGradient(
          cx,
          cy,
          cx + dir * CORE_R * 5,
          cy,
        );
        grad.addColorStop(0, T(flareA));
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dir * CORE_R * 5, cy);
        ctx.strokeStyle = grad as unknown as string;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const gradV = ctx.createLinearGradient(
          cx,
          cy,
          cx,
          cy + dir * CORE_R * 5,
        );
        gradV.addColorStop(0, T(flareA));
        gradV.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + dir * CORE_R * 5);
        ctx.strokeStyle = gradV as unknown as string;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // ── ANIMATION LOOP ───────────────────────────────────────────
    let t0: number | null = null;
    function loop(ts: number) {
      if (!t0) t0 = ts;
      draw((ts - t0) / 1000);
      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, opacity }}
    />
  );
}
