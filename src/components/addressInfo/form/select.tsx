import { Cascader, CascaderProps } from "antd"

import { getAddressListApi } from "@/network/api/address"

// import { childrenJson } from "./area"

const SelectXzz: React.FC = () => {
  const { SHOW_CHILD } = Cascader

  interface Option2 {
    id: number
    name: string
    children?: Option2[]
    parent_id: number
  }
  const { formData, setFormData } = useConsigneeStore((state) => state)
  const [childrenJson, setChildrenJson] = useState<Option2[]>([])
  const onChange: CascaderProps<Option2>["onChange"] = (
    value: (string | number | Option2[])[],
    _selectedOptions: Option2[],
  ) => {
    setFormData({ region: value as number[] })
  }

  useEffect(() => {
    getAddressListApi().then((res) => {
      res?.data && setChildrenJson(res.data)
    })
  }, [])

  return (
    <>
      <Cascader
        style={{ height: "56px", width: "576px" }}
        options={childrenJson}
        onChange={onChange}
        showCheckedStrategy={SHOW_CHILD}
        displayRender={(label) => label.join("")}
        multiple={false}
        popupClassName="custom-cascader-menu"
        allowClear={false}
        value={formData.region}
        fieldNames={{ label: "name", value: "id", children: "children" }}
      />
    </>
  )
}

export default SelectXzz
