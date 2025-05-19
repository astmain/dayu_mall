// import pantoneC from "./pantoneC.json"
// import pantoneU from "./pantoneU.json"

// 1. HEX → RGB

export const hexToRgb = (hex: string) => {
  // 移除可能的前缀#
  hex = hex.replace(/^#/, "")
  // 处理简写形式（例如 #03F）
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((item: string) => item + item)
      .join("")
  }
  // 将十六进制字符串转换为整数
  const bigint = parseInt(hex, 16)
  // 提取红、绿、蓝分量
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

// 2. RGB → XYZ
function rgbToXyz({ r, g, b }: { r: number; g: number; b: number }) {
  ;[r, g, b] = [r, g, b].map((v) => {
    v /= 255
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92
  })

  r *= 100
  g *= 100
  b *= 100

  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505,
  }
}

// 3. XYZ → Lab
function xyzToLab({ x, y, z }: { x: number; y: number; z: number }) {
  const ref = { x: 95.047, y: 100.0, z: 108.883 }

  ;[x, y, z] = [x / ref.x, y / ref.y, z / ref.z].map((v) => {
    return v > 0.008856 ? Math.pow(v, 1 / 3) : 7.787 * v + 16 / 116
  })

  return {
    L: 116 * y - 16,
    A: 500 * (x - y),
    B: 200 * (y - z),
  }
}

function hexToLab(hex: string) {
  return xyzToLab(rgbToXyz(hexToRgb(hex)))
}

// 4. DeltaE 2000
function deltaE00(lab1: { L: number; A: number; B: number }, lab2: { L: number; A: number; B: number }) {
  const { L: L1, A: A1, B: B1 } = lab1
  const { L: L2, A: A2, B: B2 } = lab2

  // const avg_L = (L1 + L2) / 2
  const C1 = Math.sqrt(A1 * A1 + B1 * B1)
  const C2 = Math.sqrt(A2 * A2 + B2 * B2)
  const avg_C = (C1 + C2) / 2

  const G = 0.5 * (1 - Math.sqrt(Math.pow(avg_C, 7) / (Math.pow(avg_C, 7) + Math.pow(25, 7))))
  const a1p = A1 * (1 + G)
  const a2p = A2 * (1 + G)

  const C1p = Math.sqrt(a1p * a1p + B1 * B1)
  const C2p = Math.sqrt(a2p * a2p + B2 * B2)
  const avg_Cp = (C1p + C2p) / 2

  const h1p = (Math.atan2(B1, a1p) * 180) / Math.PI + (Math.atan2(B1, a1p) < 0 ? 360 : 0)
  const h2p = (Math.atan2(B2, a2p) * 180) / Math.PI + (Math.atan2(B2, a2p) < 0 ? 360 : 0)

  let deltahp = h2p - h1p
  if (Math.abs(deltahp) > 180) deltahp += deltahp > 0 ? -360 : 360

  const deltaLp = L2 - L1
  const deltaCp = C2p - C1p
  const deltaHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(((deltahp / 2) * Math.PI) / 180)

  // const avg_Lp = (L1 + L2) / 2
  const avg_hp = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2

  const T =
    1 -
    0.17 * Math.cos(((avg_hp - 30) * Math.PI) / 180) +
    0.24 * Math.cos((2 * avg_hp * Math.PI) / 180) +
    0.32 * Math.cos(((3 * avg_hp + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * avg_hp - 63) * Math.PI) / 180)

  const delta_ro = 30 * Math.exp(-(((avg_hp - 275) / 25) ** 2))
  const RC = 2 * Math.sqrt(Math.pow(avg_Cp, 7) / (Math.pow(avg_Cp, 7) + Math.pow(25, 7)))
  const SL = 1
  const SC = 1 + 0.045 * avg_Cp
  const SH = 1 + 0.015 * avg_Cp * T
  const RT = -RC * Math.sin((2 * delta_ro * Math.PI) / 180)

  return Math.sqrt(
    Math.pow(deltaLp / SL, 2) +
      Math.pow(deltaCp / SC, 2) +
      Math.pow(deltaHp / SH, 2) +
      RT * (deltaCp / SC) * (deltaHp / SH),
  )
}

// 5. 找出最接近的 10 个 Pantone 值
export function findClosestPantones(inputHex: string, pantoneDict: Record<string, string>, topN = 10) {
  const inputLab = hexToLab(inputHex)
  const results = Object.entries(pantoneDict).map(([pantone, hex]) => {
    const lab = hexToLab(hex)
    const delta = deltaE00(inputLab, lab)
    return { pantone, hex, delta }
  })

  return results.sort((a, b) => a.delta - b.delta).slice(0, topN)
}

// console.log(findClosestPantones("#FFAA4D", pantoneC));

//    颜色块  内部的 文字颜色 动态变换  高对比度
export const getHighContrastColor = (color: string) => {
  const rgbColor = hexToRgb(color)
  const [R, G, B] = [rgbColor.r, rgbColor.g, rgbColor.b].map((channel: number) => {
    const proportion = channel / 255
    return proportion <= 0.03928 ? proportion / 12.92 : Math.pow((proportion + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export const changeFontSize = (text: string) => {
  return text.length > 9 ? "11px" : ""
}

export const changeLineHeight = (text: string) => {
  return text.length > 10 ? "1" : ""
}
