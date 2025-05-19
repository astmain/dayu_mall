import cartimg from "@/assets/cart.webp"
import switchimg from "@/assets/home/modelimg.png"
import watchimg from "@/assets/home/watchimg.png"

let items = [
  {
    id: 1,
    image: watchimg, // Replace with actual image URL
    title: "高品质机械手表建模、电子表建模",
    author: "DAYU-3D",
    authorimg: cartimg,
    enableCommercial: true,
  },
  {
    id: 2,
    image: switchimg, // Replace with actual image URL
    title: "switch 卡通风格物景建模",
    author: "九月",
    authorimg: cartimg,
    enableCommercial: true,
  },
  {
    id: 1,
    image: watchimg, // Replace with actual image URL
    title: "高品质机械手表建模、电子表建模",
    author: "DAYU-3D",
    authorimg: cartimg,
  },
]
items = [...items, ...items, ...items, ...items, ...items]
export default items
