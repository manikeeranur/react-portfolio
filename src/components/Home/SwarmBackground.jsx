import React, { useEffect, useRef } from "react";

const NUM_BOIDS = 90;
const MAX_SPEED = 1.8;
const MAX_FORCE = 0.04;
const SEP_DIST = 32;
const ALIGN_DIST = 65;
const COH_DIST = 95;

class Boid {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    const a = Math.random() * Math.PI * 2;
    const spd = 0.8 + Math.random() * 1.2;
    this.vx = Math.cos(a) * spd;
    this.vy = Math.sin(a) * spd;
    this.size = 5 + Math.random() * 3;
  }

  update(boids, w, h) {
    let sx = 0, sy = 0, sc = 0;
    let ax = 0, ay = 0, ac = 0;
    let cx = 0, cy = 0, cc = 0;

    for (const o of boids) {
      if (o === this) continue;
      const dx = o.x - this.x;
      const dy = o.y - this.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < SEP_DIST && d > 0) { sx -= dx / d; sy -= dy / d; sc++; }
      if (d < ALIGN_DIST)        { ax += o.vx;   ay += o.vy;   ac++; }
      if (d < COH_DIST)          { cx += o.x;    cy += o.y;    cc++; }
    }

    let fx = 0, fy = 0;
    if (sc > 0) { fx += (sx / sc) * 1.6 * MAX_FORCE; fy += (sy / sc) * 1.6 * MAX_FORCE; }
    if (ac > 0) { fx += ((ax / ac) - this.vx) * MAX_FORCE; fy += ((ay / ac) - this.vy) * MAX_FORCE; }
    if (cc > 0) {
      const tx = cx / cc - this.x, ty = cy / cc - this.y;
      const m = Math.sqrt(tx * tx + ty * ty) || 1;
      fx += (tx / m) * 0.9 * MAX_FORCE;
      fy += (ty / m) * 0.9 * MAX_FORCE;
    }

    this.vx += fx; this.vy += fy;
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > MAX_SPEED) { this.vx = (this.vx / spd) * MAX_SPEED; this.vy = (this.vy / spd) * MAX_SPEED; }
    if (spd < 0.4)       { this.vx *= 0.4 / spd;                  this.vy *= 0.4 / spd; }

    this.x += this.vx; this.y += this.vy;
    if (this.x > w + 10) this.x = -10;
    if (this.x < -10)    this.x = w + 10;
    if (this.y > h + 10) this.y = -10;
    if (this.y < -10)    this.y = h + 10;
  }

  draw(ctx) {
    const angle = Math.atan2(this.vy, this.vx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(this.size * 2.2, 0);
    ctx.lineTo(-this.size * 0.8,  this.size * 0.9);
    ctx.lineTo(-this.size * 0.8, -this.size * 0.9);
    ctx.closePath();
    ctx.fillStyle   = "rgba(139, 92, 246, 0.18)";
    ctx.strokeStyle = "rgba(139, 92, 246, 0.50)";
    ctx.lineWidth   = 0.7;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

const SwarmBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let boids = [];
    let animId;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      boids = Array.from({ length: NUM_BOIDS }, () => new Boid(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of boids) { b.update(boids, canvas.width, canvas.height); b.draw(ctx); }
      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default SwarmBackground;
