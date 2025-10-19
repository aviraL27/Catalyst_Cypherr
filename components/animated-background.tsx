"use client"

import { useEffect } from "react"

export default function AnimatedBackground() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    })

    const count = Math.max(24, Math.floor((w * h) / 60000))
    const particles: any[] = []

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(1.4, 3.6),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.06, 0.06),
        life: rand(40, 160),
      })
    }

    let gradOffset = 0

    function draw() {
      ctx.clearRect(0, 0, w, h)

      gradOffset += 0.002
      const g = ctx.createLinearGradient(Math.cos(gradOffset) * w, 0, w, Math.sin(gradOffset) * h)
      g.addColorStop(0, "rgba(45,156,219,0.12)")
      g.addColorStop(0.5, "rgba(108,92,231,0.08)")
      g.addColorStop(1, "rgba(19,21,47,0.12)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.2

        if (p.x < -30) p.x = w + 30
        if (p.x > w + 30) p.x = -30
        if (p.y < -30) p.y = h + 30
        if (p.y > h + 30) p.y = -30
        if (p.life < 0) {
          p.life = rand(60, 200)
          p.x = rand(0, w)
          p.y = rand(0, h)
        }

        const grd = ctx.createRadialGradient(p.x, p.y, p.r * 0.1, p.x, p.y, p.r * 8)
        grd.addColorStop(0, "rgba(255,255,255,0.06)")
        grd.addColorStop(0.12, "rgba(108,92,231,0.12)")
        grd.addColorStop(0.5, "rgba(45,156,219,0.06)")
        grd.addColorStop(1, "rgba(12,14,28,0)")
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.save()
      ctx.globalAlpha = 0.03
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1
      const spacing = 120
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()

      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return <canvas id="bg-canvas" />
}
