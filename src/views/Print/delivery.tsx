import { Button } from "antd"

import Xzztag from "@/components/XzzTag"

export default function DeliveryList() {
  const { deliveryInfo, setDeliveryInfo, deliveryList } = usePrintCartStore((state) => state)

  useEffect(() => {
    setDeliveryInfo(deliveryList[0])
  }, [])

  const currentItem = (item: any) => {
    setDeliveryInfo(item)
  }
  return (
    <>
      <Xzztag title="交货日期" />

      {deliveryList.map((item) => {
        return (
          <div key={item.label} className="my-[12px] " onClick={() => currentItem(item)}>
            <Button
              color="primary"
              variant={deliveryInfo.type == item.type ? "outlined" : undefined}
              block
              size="large"
              className="h-[46px]"
            >
              <div className="ss flex justify-between items-center w-[100%]">
                <div className="title  text-[14px]">{item.type + ": " + item.label}</div>
                <div className=" flex justify-between w-[90px]">
                  <div className="">￥{item.price}</div>
                  <div className=" w-[16px]">
                    {deliveryInfo.type == item.type && <i className="iconfont icon-shuruzhengque"></i>}
                  </div>
                </div>
              </div>
            </Button>
          </div>
        )
      })}
    </>
  )
}
