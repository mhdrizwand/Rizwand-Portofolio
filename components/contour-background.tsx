"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

// Simplex noise for contour generation
function createNoise(seed?: number) {
  const perm = new Uint8Array(512)
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i

  // Simple seeded random
  let s = seed ?? Math.floor(Math.random() * 100000)
  function seededRandom() {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }

  for (let i = 255; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1))
      ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]

  const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  ]

  function dot(g: number[], x: number, y: number) {
    return g[0] * x + g[1] * y
  }

  return function noise2D(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1)
    const G2 = (3 - Math.sqrt(3)) / 6
    const s = (xin + yin) * F2
    const i = Math.floor(xin + s)
    const j = Math.floor(yin + s)
    const t = (i + j) * G2
    const X0 = i - t
    const Y0 = j - t
    const x0 = xin - X0
    const y0 = yin - Y0

    let i1: number, j1: number
    if (x0 > y0) { i1 = 1; j1 = 0 }
    else { i1 = 0; j1 = 1 }

    const x1 = x0 - i1 + G2
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1 + 2 * G2
    const y2 = y0 - 1 + 2 * G2

    const ii = i & 255
    const jj = j & 255
    const gi0 = perm[ii + perm[jj]] % 12
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 12
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 12

    let n0: number, n1: number, n2: number
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 < 0) n0 = 0
    else { t0 *= t0; n0 = t0 * t0 * dot(grad3[gi0], x0, y0) }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 < 0) n1 = 0
    else { t1 *= t1; n1 = t1 * t1 * dot(grad3[gi1], x1, y1) }

    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 < 0) n2 = 0
    else { t2 *= t2; n2 = t2 * t2 * dot(grad3[gi2], x2, y2) }

    return 70 * (n0 + n1 + n2)
  }
}

// Parse oklch color string to RGB
function oklchToRgb(oklchStr: string): [number, number, number] {
  const match = oklchStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) return [128, 128, 128]

  const L = parseFloat(match[1])
  const C = parseFloat(match[2])
  const H = parseFloat(match[3])

  // Convert oklch -> oklab
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // Convert oklab -> linear sRGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let bVal = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

  // Gamma correction
  const gamma = (x: number) => {
    if (x >= 0.0031308) return 1.055 * Math.pow(x, 1 / 2.4) - 0.055
    return 12.92 * x
  }

  r = Math.round(Math.min(255, Math.max(0, gamma(r) * 255)))
  g = Math.round(Math.min(255, Math.max(0, gamma(g) * 255)))
  bVal = Math.round(Math.min(255, Math.max(0, gamma(bVal) * 255)))

  return [r, g, bVal]
}

// Read theme colors from CSS custom properties
function getThemeColors(): { foreground: [number, number, number]; muted: [number, number, number]; primary: [number, number, number]; accent: [number, number, number] } {
  const style = getComputedStyle(document.documentElement)

  const fg = style.getPropertyValue("--foreground").trim()
  const muted = style.getPropertyValue("--muted-foreground").trim()
  const primary = style.getPropertyValue("--primary").trim()
  const accent = style.getPropertyValue("--accent-foreground").trim()

  return {
    foreground: oklchToRgb(fg || "oklch(0.145 0 0)"),
    muted: oklchToRgb(muted || "oklch(0.556 0 0)"),
    primary: oklchToRgb(primary || "oklch(0.205 0 0)"),
    accent: oklchToRgb(accent || "oklch(0.205 0 0)"),
  }
}

const CONTOUR_LEVELS = 28
const CELL_SIZE = 8

// Random drift directions for more organic movement
interface DriftConfig {
  xSpeed: number
  ySpeed: number
  xFreq: number
  yFreq: number
  phase: number
}

function createRandomDrifts(count: number): DriftConfig[] {
  return Array.from({ length: count }, () => ({
    xSpeed: 0.000012 + Math.random() * 0.000018,
    ySpeed: 0.00001 + Math.random() * 0.000015,
    xFreq: 0.3 + Math.random() * 0.7,
    yFreq: 0.3 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
  }))
}

export function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const noiseRef = useRef(createNoise())
  const driftsRef = useRef<DriftConfig[]>(createRandomDrifts(3))
  const colorsRef = useRef<ReturnType<typeof getThemeColors> | null>(null)
  const { resolvedTheme } = useTheme()

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      // Re-read colors periodically (theme changes)
      if (!colorsRef.current || time % 1000 < 17) {
        colorsRef.current = getThemeColors()
      }

      ctx.clearRect(0, 0, w, h)

      const noise = noiseRef.current
      const drifts = driftsRef.current
      const isDark = resolvedTheme === "dark"
      const colors = colorsRef.current

      // Use theme-based color palette
      const colorPalette = [
        colors.foreground,
        colors.muted,
        colors.primary,
      ]

      const cols = Math.ceil(w / CELL_SIZE) + 1
      const rows = Math.ceil(h / CELL_SIZE) + 1

      // Compute smooth drifting offsets using sine waves for organic motion
      const offsets = drifts.map((d) => ({
        x: Math.sin(time * d.xSpeed * d.xFreq + d.phase) * 1.2 + time * d.xSpeed * 0.5,
        y: Math.cos(time * d.ySpeed * d.yFreq + d.phase * 0.7) * 1.2 + time * d.ySpeed * 0.4,
      }))

      // Sample noise values into grid using multi-octave noise with smooth drift
      const field: number[][] = []
      for (let row = 0; row < rows; row++) {
        field[row] = []
        for (let col = 0; col < cols; col++) {
          const nx = col * 0.022
          const ny = row * 0.022
          // Layer multiple noise octaves with different drift directions
          let val = 0
          val += noise(nx + offsets[0].x, ny + offsets[0].y) * 0.5
          val += noise(nx * 1.8 + offsets[1].x * 1.1, ny * 1.8 + offsets[1].y * 1.1) * 0.3
          val += noise(nx * 3.6 + offsets[2].x * 0.6, ny * 3.6 + offsets[2].y * 0.6) * 0.15
          val += noise(nx * 7.0 + offsets[0].x * 0.3, ny * 7.0 + offsets[0].y * 0.3) * 0.05
          field[row][col] = val
        }
      }

      // Draw contour lines using marching squares
      for (let level = 0; level < CONTOUR_LEVELS; level++) {
        const threshold = -0.8 + (1.6 / CONTOUR_LEVELS) * (level + 0.5)

        // Cycle through theme colors for each contour level
        const [r, g, b] = colorPalette[level % colorPalette.length]

        // Vary alpha for depth effect - brighter in dark mode
        const baseAlpha = isDark ? 0.13 : 0.07
        const alphaVar = isDark ? 0.03 : 0.02
        const alpha = baseAlpha + (level % 5) * alphaVar

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.lineWidth = isDark ? 0.6 + (level % 3) * 0.15 : 0.5 + (level % 3) * 0.12

        ctx.beginPath()

        for (let row = 0; row < rows - 1; row++) {
          for (let col = 0; col < cols - 1; col++) {
            const tl = field[row][col] >= threshold ? 1 : 0
            const tr = field[row][col + 1] >= threshold ? 1 : 0
            const br = field[row + 1][col + 1] >= threshold ? 1 : 0
            const bl = field[row + 1][col] >= threshold ? 1 : 0
            const caseIndex = tl * 8 + tr * 4 + br * 2 + bl

            if (caseIndex === 0 || caseIndex === 15) continue

            const x = col * CELL_SIZE
            const y = row * CELL_SIZE
            const s = CELL_SIZE

            const interpTop = () => {
              const d = (threshold - field[row][col]) / (field[row][col + 1] - field[row][col])
              return x + d * s
            }
            const interpBottom = () => {
              const d = (threshold - field[row + 1][col]) / (field[row + 1][col + 1] - field[row + 1][col])
              return x + d * s
            }
            const interpLeft = () => {
              const d = (threshold - field[row][col]) / (field[row + 1][col] - field[row][col])
              return y + d * s
            }
            const interpRight = () => {
              const d = (threshold - field[row][col + 1]) / (field[row + 1][col + 1] - field[row][col + 1])
              return y + d * s
            }

            const segments: [number, number, number, number][] = []

            switch (caseIndex) {
              case 1: case 14:
                segments.push([x, interpLeft(), interpBottom(), y + s]); break
              case 2: case 13:
                segments.push([interpBottom(), y + s, x + s, interpRight()]); break
              case 3: case 12:
                segments.push([x, interpLeft(), x + s, interpRight()]); break
              case 4: case 11:
                segments.push([interpTop(), y, x + s, interpRight()]); break
              case 5:
                segments.push([x, interpLeft(), interpTop(), y])
                segments.push([interpBottom(), y + s, x + s, interpRight()]); break
              case 6: case 9:
                segments.push([interpTop(), y, interpBottom(), y + s]); break
              case 7: case 8:
                segments.push([x, interpLeft(), interpTop(), y]); break
              case 10:
                segments.push([interpTop(), y, x + s, interpRight()])
                segments.push([x, interpLeft(), interpBottom(), y + s]); break
            }

            for (const [x1, y1, x2, y2] of segments) {
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
            }
          }
        }

        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    },
    [resolvedTheme],
  )

  useEffect(() => {
    // Reset colors on theme change
    colorsRef.current = null
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  useEffect(() => {
    function handleResize() {
      // Force canvas resize on next frame
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = 0
        canvas.height = 0
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
