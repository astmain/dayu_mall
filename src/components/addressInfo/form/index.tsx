import { Form, Input, Radio, Space } from "antd"

// 引入新的弹框
import ModalLqh2 from "@/components/ModalLqh2"
// import ModalXzz2 from "@/components/ModalXzz2"
import XzzBtn from "@/components/XzzBtn"
import { useSimpleTryApi } from "@/hooks/useTryApi"
import { createAddressApi, updateAddressApi } from "@/network/api/address"
import { CreateAddressRes, UpdateAddressData, UpdateAddressRes } from "@/network/api/address/type"
import { useConsigneeStore } from "@/store/consignee"

import SelectXzz from "./select"
import { AddressFormData } from "./type"

const tagOptions = [
  { label: "家", value: "home" },
  { label: "公司", value: "company" },
  { label: "其他", value: "other" },
]

const AddressFormXzz: React.FC<{ updateAddressList: () => void }> = ({ updateAddressList }) => {
  const { isEditModalOpen, formData, closeEditModal, isUpdate, setFormData } = useConsigneeStore((state) => state)

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(formData)
  }, [formData])

  const { request, loading } = useSimpleTryApi<UpdateAddressRes | CreateAddressRes>({
    title: isUpdate ? "修改地址成功" : "新增地址成功",
    apiFunction: isUpdate ? updateAddressApi : createAddressApi,
    handler: () => {
      updateAddressList()
      closeEditModal()
    },
  })

  const onFinish = async (formdata: AddressFormData) => {
    const { region, street, name, phone, tag } = formdata
    const tag_value = typeof tag === "string" ? tag : tag.value
    const region_id = region[region.length - 1]
    const submitData = isUpdate
      ? {
          id: (formData as UpdateAddressData).id,
          region_id,
          street,
          name,
          phone,
          address_type: tag_value,
        }
      : { region_id, street, name, phone, address_type: tag_value, region }
    request(submitData)
  }

  return (
    // 地址--使用新的弹框
    <ModalLqh2
      open={isEditModalOpen}
      onCancel={closeEditModal}
      onOk={closeEditModal}
      width="1000px"
      title={isUpdate ? "修改地址" : "新增地址"}
      classname="custom-modal-address"
      closable={true}
      content={
        <div className="w-[1000px] h-[600px] p-[30px]">
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 3 }}
            onValuesChange={(changedValues, allValues) => {
              console.log("✨ 🍰 ✨ xzz2021: onValuesChange -> changedValues", changedValues)
              console.log("✨ 🍰 ✨ xzz2021: onValuesChange -> allValues", allValues)
              setFormData(allValues)
            }}
          >
            <Form.Item
              name="name"
              label="联系人"
              rules={[{ required: true }]}
              style={{ height: "56px", lineHeight: "56px" }}
            >
              <Input style={{ height: "56px", width: "576px" }} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true }]}
              style={{ height: "56px", lineHeight: "56px" }}
            >
              <Input style={{ height: "56px", width: "576px" }} />
            </Form.Item>
            <Form.Item
              name="region"
              rules={[{ required: true }]}
              label="收货地址"
              style={{ height: "56px", lineHeight: "56px" }}
            >
              <SelectXzz />
            </Form.Item>
            <Form.Item
              name="street"
              label="详细地址"
              rules={[{ required: true }]}
              style={{ height: "56px", lineHeight: "56px" }}
            >
              <Input style={{ height: "56px", width: "576px" }} />
            </Form.Item>
            <Form.Item name="tag" label="添加标签" rules={[{ required: true }]}>
              <Radio.Group
                options={tagOptions}
                // onChange={onTagChange}
                optionType="button"
                buttonStyle="solid"
                // value={form.getFieldValue("tag")} // 让 Radio.Group 受控
              />
            </Form.Item>
            {/* <Form.Item name="is_default" label="是否默认" rules={[{ required: true }]}>
              <Switch
                checked={formData.is_default}
                onChange={(checked) => {
                  form.setFieldsValue({ is_default: checked })
                }}
              />
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginTop: "auto" }}>
              <Space size={20}>
                <XzzBtn htmlType="button" onClick={closeEditModal}>
                  <div style={{ width: "98px" }}>取消</div>
                </XzzBtn>
                <XzzBtn type="primary" htmlType="submit" loading={loading}>
                  <div
                    style={{ width: "98px" }}
                    onClick={() => {
                      console.log(111)
                    }}
                  >
                    保存111
                  </div>
                </XzzBtn>
              </Space>
            </Form.Item>
          </Form>
        </div>
      }
    />
  )
}

export default AddressFormXzz
