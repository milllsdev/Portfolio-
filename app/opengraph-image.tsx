import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f4f2ec", color: "#20251f", padding: 70 }}><div style={{ fontSize: 24 }}>MICHEL AYIKOE ATAYI / PORTFOLIO</div><div style={{ display: "flex", flexDirection: "column", fontSize: 88, letterSpacing: -5 }}><span>Thoughtful software.</span><span>From idea to interface.</span></div><div style={{ fontSize: 24 }}>Computer Science Student & Software Engineer</div></div>, size);
}
