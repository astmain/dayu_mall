import { TYPE_ARR } from "./common"

export default function OrderType() {
  const { currentType, setOrderType } = useUserOrderStore()
  return (
    <>
      <div
        className="flex flex-col items-center w-[220px] gap-[10px]  py-[20px]"
        style={{
          border: "1px solid #DCDCDC",
          borderRadius: "20px",
          background: "#fff",
          alignItems: "start",
        }}
      >
        {TYPE_ARR.map((item: any, index: number) => {
          return (
            <div
              className=" py-[10px] w-[100%]  cursor-pointer flex gap-[30px] hover:bg-[#F2F2F2] transition-[background-color] 0.3s ease-in-out"
              key={item.name}
              onClick={() => setOrderType(item.type)}
            >
              <div
                className="w-[6px] h-[21px] round-[3px] bg-[#1366F0]"
                style={{ borderRadius: "3px", visibility: currentType == item.type ? "visible" : "hidden" }}
              ></div>
              <div key={index} className="flex items-center gap-[10px]">
                <div>{item.name}</div>
                <div className="text-[#1366F0]">({item.count})</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
