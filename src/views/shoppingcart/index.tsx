// 引入动态切换的样式
// import "./index.css"

import { datatable } from "./common"
import ThreedPrinting from "./Threedprinting"
import Threedprintingfootercom from "./Threedprintingfootercom"
import Threedscan from "./Threedscan"

function ShoppingcartLqh() {
  const [types, setTypes] = useState(" ")
  const { isShoppingcart, setIsShopoingCart } = useShoppingcartStore((state) => state)

  // 滚动到锚点位置
  const handleScroll = (id: string) => {
    const element = document.querySelector(`#${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  const shoppingListtabBth = (value: number, items: string, id: string) => {
    setTypes(items)

    setIsShopoingCart(value)

    handleScroll(id)
  }

  return (
    <div className="w-[100%] mt-[20px] gap-[30px]">
      <div className="flex justify-center gap-[30px] items-start mb-[30px]">
        <div className="w-[260px] h-[100%] bg-[#ffffff] rounded-[20px] border border-[#dcdcdc] pt-[30px] text-left relative">
          <ul className="relative">
            {datatable.map((item, index) => {
              return (
                <li
                  key={item.id}
                  onClick={() => shoppingListtabBth(index, item.type, item.id)}
                  className={`${isShoppingcart === index ? "selected1" : ""} hover:bg-[#f2f2f2] h-[44px] leading-[44px] text-[18px] pl-[36px] text-[#222222] cursor-pointer mb-[49px]`}
                >
                  <a href={`#${item.id}`} className="text-[#222222]">
                    {item.title}
                  </a>
                  {isShoppingcart === index && (
                    <a
                      href={`#${item.id}`}
                      className="absolute left-[0] w-[6px] h-[21px] mt-[11px] bg-[#1366f0] rounded-[3px]"
                    ></a>
                  )}

                  <span className="text-[#1366f0]">({item.count})</span>
                </li>
              )
            })}
          </ul>
        </div>
        {/* 右边表格 */}

        <div className="shoppingCarScrollbar max-h-[800px] pr-[11px] overflow-y-scroll">
          {/* <div id="section-a">{<Threedmodellibrary />}</div> */}
          {/* 3d打印 */}
          <div id="section-b">{<ThreedPrinting data={types} />}</div>
          {/* 3d扫描 */}
          <div id="section-c"> {<Threedscan />}</div>

          {/* CNC加工 */}
          {/* <div id="section-d"> {<Cncmachining />}</div>
          手板腹膜
          <div id="section-e"> {<Handplateperitoneumcom />}</div> */}
        </div>
      </div>

      {/* 展示尾部全选页面 */}
      {isShoppingcart == 1 && <Threedprintingfootercom />}
      {isShoppingcart == 2 && <Threedprintingfootercom />}
      {isShoppingcart == 3 && <Threedprintingfootercom />}
      {isShoppingcart == 4 && <Threedprintingfootercom />}
    </div>
  )
}

export default ShoppingcartLqh
