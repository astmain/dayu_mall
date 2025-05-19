// import { Button } from "antd"

// import { Button } from "antd"

import AddressInfo from "@/components/addressInfo"
import TableXzz from "@/components/TableXzz"
import TextBtn from "@/components/TextBtn"
// import XzzBtn from "@/components/XzzBtn"
// import TableXzz from "@/components/TableXzz"
import TagXzz from "@/components/XzzTag"

function Consignee() {
  // const { setInvoiceModalVisible } = useInvoiceStore((state) => state)

  // const { openManageModal } = useConsigneeStore((state) => state)
  const { openEditModal, openManageModal } = useConsigneeStore((state) => state)

  const columns = [
    {
      title: "联系人",
      dataIndex: "contact",
      key: "contact",
      flex: 1,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
      flex: 1,
    },
    {
      title: "详细地址",
      dataIndex: "detailAddress",
      key: "detailAddress",
      flex: 4,
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      flex: 1,
    },
  ]
  interface DataListType {
    contact: string
    tag: { label: string; value: string }
    region: string[]
    street: string
    phone: string
    operate?: React.ReactNode
    detailAddress?: React.ReactNode
  }
  const dataList: DataListType = {
    contact: "Tom",
    phone: "1234567890",
    region: ["福建省", "泉州市", "鲤城区"],
    street: "北峰街道300号大宇科技",
    // tag: "company",
    tag: { label: "公司", value: "company" },
    operate: (
      <div className="flex justify-around items-center">
        <TextBtn onClick={() => openManageModal(2)}>更换</TextBtn>
      </div>
    ),
  }

  dataList.detailAddress = (
    <div className=" ">
      <div className="address text-hidden">{dataList.region.join("") + dataList.street}</div>
    </div>
  )

  return (
    <>
      <div className="title w-[100%] flex items-center justify-between mb-[20px]">
        <TagXzz title="收货人信息" />
        <TextBtn onClick={openEditModal}>+ 添加新的地址</TextBtn>
      </div>
      <TableXzz columns={columns} dataList={[dataList]} />
      <AddressInfo />
    </>
  )
}

export default Consignee
