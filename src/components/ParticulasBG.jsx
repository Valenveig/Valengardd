// src/components/ParticulasBG.jsx
import React, { useEffect, useRef } from "react";

export default function ParticulasBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Criar partículas
    let particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1, // tamanho variado
        dx: (Math.random() - 0.5) * 1.5, // velocidade mais dinâmica
        dy: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.5 + 0.3, // opacidade
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // brilho suave
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(130, 87, 230, 0.7)";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 87, 230, ${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        // rebote nas bordas
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
