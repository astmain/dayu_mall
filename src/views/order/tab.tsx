import { Fragment } from "react/jsx-runtime"

import { STATUS_ARR } from "./common"

export default function OrderTab() {
  const { orderStatusMap, currentType, setOrderStatus } = useUserOrderStore()
  return (
    <>
      <div
        className="flex items-center h-[60px]  px-[30px]"
        style={{
          border: "1px solid #DCDCDC",
          borderRadius: "14px",
          background: "#fff",
          width: "1000px",
        }}
      >
        {STATUS_ARR.map((item, index: number) => {
          return (
            <Fragment key={item.status}>
              {index != 0 && <div className=" w-[1px] h-[29px] bg-[#DCDCDC]" key={item.status}></div>}
              <div
                className=" px-[30px] cursor-pointer flex leading-[58px] hover:bg-[#F2F2F2] transition-[background-color] 0.3s ease-in-out"
                key={item.name}
                onClick={() => setOrderStatus(item.status)}
              >
                <div style={{ color: orderStatusMap[currentType] == item.status ? "#1366F0" : "#222" }}>
                  {item.name}
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
    </>
  )
}
