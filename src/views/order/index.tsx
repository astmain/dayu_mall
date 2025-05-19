import OrderTab from "./tab"
import OrderTable from "./table"
import OrderType from "./type"

export default function MyOrderXzz() {
  return (
    <>
      <div className="flex items-start gap-[30px] mt-[20px]">
        <OrderType />
        <div className="">
          <OrderTab />
          <OrderTable />
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  )
}
