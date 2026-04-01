"use client";

import { useEffect, useRef } from "react";

interface Globe3DProps {
  size?: number;
  opacity?: number;
  className?: string;
  rotationSpeed?: number;
  orbitSpeed?: number;
  position?: "hero" | "about" | "experience" | "education" | "contact";
}

export function Globe3D({
  size = 500,
  opacity = 1,
  className = "",
  rotationSpeed = 0.003,
  orbitSpeed = 1,
  position = "hero",
}: Globe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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
    const R = size * 0.38;

    // Teal color theme
    const TEAL   = "#5eead4";
    const TEAL2  = "#2dd4bf";
    const TEAL3  = "#14b8a6";
    const DARK   = "rgba(94,234,212,";

    // ── CONTINENTAL OUTLINES (simplified lat/lng points) ──────────
    const continents = [
      // North America
      [[-170,70],[-120,70],[-80,70],[-60,50],[-55,45],[-60,35],[-80,25],[-90,15],[-85,10],[-77,8],[-75,10],[-60,10],[-55,5],[-60,-5],[-45,5],[-35,5],[-28,0],[-35,-10],[-50,-30],[-65,-55],[-70,-55],[-75,-50],[-75,-40],[-65,-35],[-55,-35],[-45,-25],[-40,-10],[-45,0],[-55,5],[-60,10],[-80,10],[-90,15],[-100,20],[-110,23],[-115,30],[-120,35],[-120,45],[-125,50],[-130,55],[-140,58],[-155,60],[-165,65],[-170,70]],
      // South America
      [[-80,10],[-75,12],[-65,12],[-55,12],[-50,5],[-48,0],[-40,-5],[-35,-10],[-38,-18],[-40,-22],[-45,-23],[-48,-28],[-53,-34],[-58,-38],[-62,-45],[-65,-55],[-70,-55],[-75,-50],[-78,-40],[-80,-30],[-82,-18],[-80,-5],[-80,10]],
      // Europe
      [[0,50],[5,48],[10,45],[15,44],[20,40],[28,38],[30,40],[35,42],[35,47],[30,50],[25,55],[20,58],[15,60],[10,58],[5,55],[0,50]],
      // Africa
      [[0,5],[5,5],[10,5],[15,5],[20,5],[25,0],[30,-5],[35,-10],[40,-15],[42,-20],[44,-25],[40,-30],[35,-35],[30,-35],[25,-35],[20,-30],[15,-25],[10,-20],[5,-15],[0,-10],[-5,-5],[0,5]],
      // Asia
      [[35,42],[40,42],[50,40],[55,38],[60,35],[65,30],[70,25],[75,22],[80,20],[85,22],[90,22],[95,20],[100,15],[105,12],[110,10],[115,5],[120,5],[125,8],[130,10],[135,35],[140,40],[145,42],[140,45],[135,48],[130,50],[125,52],[120,55],[115,55],[110,52],[105,50],[100,52],[95,55],[90,55],[85,52],[80,50],[75,50],[70,52],[65,50],[60,50],[55,52],[50,50],[45,48],[40,45],[35,42]],
      // Australia
      [[115,-22],[120,-20],[125,-18],[130,-14],[135,-12],[138,-14],[140,-18],[142,-22],[145,-25],[148,-30],[150,-35],[148,-38],[145,-38],[140,-38],[135,-35],[130,-32],[125,-28],[120,-25],[115,-22]],
    ];

    // ── DOT PATTERN FOR GLOBE SURFACE ─────────────────────────────
    const dots: { lat: number; lng: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 12) {
      const count = Math.round(Math.cos((lat * Math.PI) / 180) * 18);
      for (let i = 0; i < count; i++) {
        dots.push({ lat, lng: (i / count) * 360 - 180 });
      }
    }

    // ── ORBIT DATA ────────────────────────────────────────────────
    const orbits = [
      { tilt: 20,  radius: 1.28, speed: orbitSpeed * 0.7,  size: 3.5, phase: 0,    color: TEAL  },
      { tilt: -35, radius: 1.45, speed: orbitSpeed * 0.45, size: 2.5, phase: 2.1,  color: TEAL2 },
      { tilt: 65,  radius: 1.18, speed: orbitSpeed * 1.1,  size: 2,   phase: 4.2,  color: TEAL3 },
    ];

    // ── MATH HELPERS ──────────────────────────────────────────────
    function latLngTo3D(lat: number, lng: number, r: number, rotY: number) {
      const phi   = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng + 180 + (rotY * 180) / Math.PI) * Math.PI) / 180;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
      };
    }

    function project(x: number, y: number, z: number) {
      const fov = 1.8;
      const scale = fov / (fov + z / R);
      return { px: cx + x * scale, py: cy - y * scale, scale };
    }

    function orbitPos(orbit: typeof orbits[0], t: number) {
      const angle = t * orbit.speed + orbit.phase;
      const tiltR = (orbit.tilt * Math.PI) / 180;
      const r     = R * orbit.radius;
      const x0    = Math.cos(angle) * r;
      const y0    = Math.sin(angle) * r;
      return {
        x: x0,
        y: y0 * Math.cos(tiltR),
        z: y0 * Math.sin(tiltR),
      };
    }

    // ── DRAW ──────────────────────────────────────────────────────
    function draw(t: number) {
      ctx.clearRect(0, 0, size, size);
      const rotY = t * rotationSpeed;

      // ── Outer atmosphere glow
      const glow = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
      glow.addColorStop(0, "rgba(94,234,212,0.06)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // ── Grid lines (lat/lng)
      ctx.save();
      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p = latLngTo3D(lat, lng, R, rotY);
          if (p.z < 0) { first = true; continue; }
          const { px, py } = project(p.x, p.y, p.z);
          if (first) { ctx.moveTo(px, py); first = false; }
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = lat === 0 ? "rgba(94,234,212,0.12)" : "rgba(94,234,212,0.05)";
        ctx.lineWidth = lat === 0 ? 0.8 : 0.5;
        ctx.stroke();
      }
      // Longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 3) {
          const p = latLngTo3D(lat, lng, R, rotY);
          if (p.z < 0) { first = true; continue; }
          const { px, py } = project(p.x, p.y, p.z);
          if (first) { ctx.moveTo(px, py); first = false; }
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(94,234,212,0.05)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // ── Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(94,234,212,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Globe surface gradient (lit side)
      const litGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, 0, cx, cy, R);
      litGrad.addColorStop(0, "rgba(94,234,212,0.06)");
      litGrad.addColorStop(0.5, "rgba(20,184,166,0.03)");
      litGrad.addColorStop(1, "rgba(0,0,0,0.2)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = litGrad;
      ctx.fill();

      // ── Surface dots
      dots.forEach(({ lat, lng }) => {
        const p = latLngTo3D(lat, lng, R * 0.99, rotY);
        if (p.z < -R * 0.1) return;
        const { px, py, scale } = project(p.x, p.y, p.z);
        const brightness = Math.max(0, (p.z / R + 0.3)) ;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${brightness * 0.25})`;
        ctx.fill();
      });

      // ── Continents
      continents.forEach((points) => {
        const visible: { px: number; py: number; z: number }[] = [];
        points.forEach(([lng, lat]) => {
          const p = latLngTo3D(lat, lng, R * 1.001, rotY);
          const { px, py } = project(p.x, p.y, p.z);
          visible.push({ px, py, z: p.z });
        });

        ctx.beginPath();
        visible.forEach(({ px, py, z }, i) => {
          if (z < -R * 0.2) return;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = "rgba(94,234,212,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "rgba(94,234,212,0.05)";
        ctx.fill();
      });

      // ── Aceh location dot
      const aceh = latLngTo3D(5.55, 95.32, R * 1.01, rotY);
      if (aceh.z > 0) {
        const { px, py } = project(aceh.x, aceh.y, aceh.z);
        // ping rings
        const ping = (t * 0.8) % 1;
        [0, 0.33, 0.66].forEach((offset) => {
          const p2 = ((ping + offset) % 1);
          ctx.beginPath();
          ctx.arc(px, py, p2 * 14, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(94,234,212,${(1 - p2) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#5eead4";
        ctx.fill();
      }

      // ── Orbit trails + satellites
      orbits.forEach((orbit) => {
        // Draw full ellipse trail
        const tiltR = (orbit.tilt * Math.PI) / 180;
        ctx.beginPath();
        let firstPt = true;
        for (let a = 0; a < Math.PI * 2; a += 0.05) {
          const r = R * orbit.radius;
          const x0 = Math.cos(a) * r;
          const y0 = Math.sin(a) * r;
          const x3d = x0;
          const y3d = y0 * Math.cos(tiltR);
          const z3d = y0 * Math.sin(tiltR);
          if (z3d < -R * 0.5) { firstPt = true; continue; }
          const { px, py } = project(x3d, y3d, z3d);
          if (firstPt) { ctx.moveTo(px, py); firstPt = false; }
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `${orbit.color}30`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite dot
        const pos = orbitPos(orbit, t);
        const { px, py, scale } = project(pos.x, pos.y, pos.z);
        const isBehind = pos.z < -R * 0.1;
        if (!isBehind) {
          // Glow
          const sg = ctx.createRadialGradient(px, py, 0, px, py, orbit.size * scale * 3);
          sg.addColorStop(0, `${orbit.color}80`);
          sg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(px, py, orbit.size * scale * 3, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(px, py, orbit.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = orbit.color;
          ctx.fill();

          // Trail
          ctx.beginPath();
          for (let i = 1; i <= 12; i++) {
            const ta = t - i * 0.04;
            const tp = orbitPos(orbit, ta);
            if (tp.z < -R * 0.2) break;
            const { px: tx, py: ty } = project(tp.x, tp.y, tp.z);
            if (i === 1) ctx.moveTo(px, py);
            ctx.lineTo(tx, ty);
          }
          ctx.strokeStyle = `${orbit.color}${Math.floor(40).toString(16)}`;
          ctx.lineWidth = orbit.size * scale * 0.6;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      });

      // ── Inner glow
      const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      innerGlow.addColorStop(0, "rgba(94,234,212,0.03)");
      innerGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();
    }

    // ── ANIMATION LOOP ────────────────────────────────────────────
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      timeRef.current = elapsed;
      draw(elapsed);
      frameRef.current = requestAnimationFrame(animate);
    }
    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [size, rotationSpeed, orbitSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    />
  );
}
