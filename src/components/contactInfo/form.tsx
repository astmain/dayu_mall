import { Form, Input, Space } from "antd"

// 新改的对话框弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"
// 旧的对话框弹框组件
// import ModalXzz2 from "@/components/ModalXzz2"
// 新增联系人改为自己封装的对话框
import XzzBtn from "@/components/XzzBtn"
import { useContactStore } from "@/store/contact"

interface AddressFormProps {
  onSubmit: (obj: object) => void
}

const ContactForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const { isEditModalOpen, closeEditModal, formColumns } = useContactStore((state) => state)

  const [form] = Form.useForm()
  // console.log("TCL: AddressFormXzz:React.FC -> formData", formData)

  const onFinish = (values: any) => {
    console.log(values)
    onSubmit(values)
  }

  const closeModal = () => {
    closeEditModal()
    form.resetFields()
  }

  // const openModal = (formData: FormInstance<any>) => {
  //   form.setFieldsValue(formData || { tag: "home" })
  //   openAddModal()
  // }
  return (
    // <ModalXzz2 {...{ showClose: true, zIndex: 779, title: "新增联系人" }} isOpen={isEditModalOpen} onClose={closeModal}>
    //   <div className="w-[650px] p-[30px]">
    //     <Form
    //       {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
    //       form={form}
    //       name="control-hooks"
    //       onFinish={onFinish}
    //       style={{ width: "100%", height: "100%", justifyContent: "center" }}
    //     >
    //       {formColumns.map((item: any) => (
    //         <Form.Item
    //           key={item.key}
    //           name={item.key}
    //           label={item.title}
    //           rules={[{ required: true }]}
    //           style={{ height: "56px", lineHeight: "56px", width: "100%" }}
    //         >
    //           <Input style={{ height: "56px", width: "100%" }} />
    //         </Form.Item>
    //       ))}

    //       <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: "auto", textAlign: "center" }}>
    //         <Space size={20}>
    //           <XzzBtn htmlType="button">
    //             <div style={{ width: "98px" }}>取消</div>
    //           </XzzBtn>
    //           <XzzBtn type="primary" htmlType="submit">
    //             <div style={{ width: "98px" }}>保存</div>
    //           </XzzBtn>
    //         </Space>
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </ModalXzz2>
    // 自己封装的新增联系人弹框
    <ModalLqh2
      width="700px"
      open={isEditModalOpen}
      onCancel={closeModal}
      onOk={closeModal}
      title="新增联系人"
      classname="custom-modal-addlianxiren"
      closable={true} //显示右上角关闭按钮 />
      content={
        <div className="w-[650px] p-[30px]">
          <Form
            {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {formColumns.map((item: any) => (
              <Form.Item
                key={item.key}
                name={item.key}
                label={item.title}
                rules={[{ required: true }]}
                style={{ height: "56px", lineHeight: "56px", width: "100%" }}
              >
                <Input style={{ height: "56px", width: "100%" }} />
              </Form.Item>
            ))}

            <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: "auto", textAlign: "center" }}>
              <Space size={20}>
                <XzzBtn htmlType="button">
                  <div style={{ width: "98px" }}>取消</div>
                </XzzBtn>
                <XzzBtn type="primary" htmlType="submit">
                  <div style={{ width: "98px" }}>保存</div>
                </XzzBtn>
              </Space>
            </Form.Item>
          </Form>
        </div>
      }
    />
  )
}

export default ContactForm
