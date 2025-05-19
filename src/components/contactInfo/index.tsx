import { Button } from "antd"

// 采用新的弹框
import ModalLqh2 from "@/components/ModalLqh2/index"
// import { useShallow } from 'zustand/react/shallow'
// 就的弹框不用先注释
// import ModalXzz2 from "@/components/ModalXzz2"
import TableXzz from "@/components/TableXzz"
import XzzBtn from "@/components/XzzBtn"
import { DataListType, useContactStore } from "@/store/contact"

import ContactForm from "./form"

interface AddressInfoProps {
  test?: number
}
// 传参currentId 到 modal 当有此参数 说明时用户选择 地址  从而显示当前选择项
const ContactInfo: React.FC<AddressInfoProps> = () => {
  //  使用 useShallow 可以避免组件 的重新渲染
  // const names = useTestStore(useShallow((state: any) => Object.keys(state)))
  const { isManageModalOpen, closeManageModal, openEditModal, currentId, columns2 } = useContactStore((state) => state)

  const dataList: (DataListType & { id: number })[] = [
    {
      id: 5,
      contact: "Tom",
      phone: "1234567890",
      technician: "jerry",
      tecphone: "13099998888",
    },
    {
      id: 2,
      contact: "Jerry",
      phone: "9876543210",
      technician: "Tom",
      tecphone: "1234567890",
    },
  ]

  const gengrateDataList = () => {
    return dataList.map((item, index) => {
      item.operate = (
        <div className="flex justify-around items-center">
          {currentId >= 0 &&
            (item.id === currentId ? (
              <Button color="primary" size="small" variant="solid">
                当前
              </Button>
            ) : (
              <Button type="text" size="small">
                使用
              </Button>
            ))}

          {index == 0 ? (
            <Button color="primary" size="small" variant="solid">
              当前默认
            </Button>
          ) : (
            <Button type="text" size="small">
              设为默认
            </Button>
          )}
          <div className="btns">
            <Button type="text" size="small" onClick={() => openEditModal(item)}>
              修改
            </Button>
            <Button type="text" size="small" style={{ color: "#999" }}>
              删除
            </Button>
          </div>
        </div>
      )
      return item
    })
  }
  const submitForm = (values: object) => {
    console.log("TCL: submitForm -> values", values)
  }
  {
    /* 地址管理旧的弹框 */
  }
  return (
    <>
      {/* <ModalXzz2
        {...{ showClose: true, zIndex: 777, title: "地址管理" }}
        isOpen={isManageModalOpen}
        onClose={closeManageModal}
      >
        <div
          style={{
            padding: "30px",
            width: "1000px",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            type="text"
            size="small"
            style={{
              color: "#1366F0",
              marginBottom: "20px",
              alignSelf: "end",
            }}
            onClick={openEditModal}
          >
            +新增地址
          </Button>
          <TableXzz columns={columns2} dataList={gengrateDataList()} />
          <div className="mt-[auto] justify-center flex gap-[20px]">
            <XzzBtn>
              <div style={{ width: "98px" }} onClick={closeManageModal}>
                取消
              </div>
            </XzzBtn>
            <XzzBtn type="primary">
              <div style={{ width: "98px" }}>确定</div>
            </XzzBtn>
          </div>
        </div>
      </ModalXzz2> */}

      <ModalLqh2
        width="1000px"
        open={isManageModalOpen}
        onCancel={closeManageModal}
        onOk={closeManageModal}
        title="地址管理"
        classname="custom-modal-addressguanli"
        closable={true} //显示右上角关闭按钮 />
        content={
          <div
            style={{
              padding: "30px",
              width: "1000px",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              type="text"
              size="small"
              style={{
                color: "#1366F0",
                marginBottom: "20px",
                alignSelf: "end",
              }}
              onClick={openEditModal}
            >
              +新增地址
            </Button>
            <TableXzz columns={columns2} dataList={gengrateDataList()} />
            <div className="mt-[auto] justify-center flex gap-[20px]">
              <XzzBtn>
                <div style={{ width: "98px" }} onClick={closeManageModal}>
                  取消
                </div>
              </XzzBtn>
              <XzzBtn type="primary">
                <div style={{ width: "98px" }}>确定</div>
              </XzzBtn>
            </div>
          </div>
        }
      />

      <ContactForm onSubmit={submitForm} />
    </>
  )
}

export default ContactInfo
