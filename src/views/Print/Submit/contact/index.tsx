// import { Button } from "antd"

// import { Button } from "antd"

import ContactInfo from "@/components/contactInfo"
import TableXzz from "@/components/TableXzz"
import TextBtn from "@/components/TextBtn"
// import XzzBtn from "@/components/XzzBtn"
// import TableXzz from "@/components/TableXzz"
import TagXzz from "@/components/XzzTag"
import { DataListType, useContactStore } from "@/store/contact"

function Contact() {
  const { openEditModal, openManageModal, columns1 } = useContactStore((state) => state)
  const dataList: DataListType = {
    contact: "Tom",
    phone: "1234567890",
    technician: "jerry",
    tecphone: "13099998888",
    operate: (
      <div className="flex justify-around items-center">
        <TextBtn onClick={() => openManageModal(2)}>更换</TextBtn>
      </div>
    ),
  }

  return (
    <>
      <div className="title w-[100%] flex items-center justify-between mb-[20px]">
        <TagXzz title="下单联系人" />
        <TextBtn onClick={openEditModal}>+ 添加新的联系人</TextBtn>
      </div>
      <TableXzz columns={columns1} dataList={[dataList]} />
      <ContactInfo />
    </>
  )
}

export default Contact
