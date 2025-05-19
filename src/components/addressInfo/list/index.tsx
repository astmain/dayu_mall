import { Button, message, Popconfirm, Tag } from "antd"

import AddressFormXzz from "@/components/addressInfo/form"
import TableXzz from "@/components/TableXzz"
import { deleteAddressApi, getAddressApi, setDefaultAddressApi } from "@/network/api/address"

import { DataListType, RegionType } from "../form/type"

// 给个人中心--收货地址用
const ListLqh = () => {
  const { openEditModal, currentId, setIsUpdate } = useConsigneeStore((state) => state)
  const columns = [
    {
      title: "联系人",
      dataIndex: "name",
      key: "name",
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
      flex: 2,
    },
  ]
  console.log(columns)

  // 递归获取regionId
  const extractRegionId = (region: RegionType, key: string): number[] => {
    const newRegion = JSON.parse(JSON.stringify(region))
    const regionIdArr: number[] = newRegion[key] ? [newRegion[key]] : []
    if (newRegion?.children) {
      return regionIdArr.concat(extractRegionId(newRegion.children, key))
    }
    return regionIdArr
  }

  // 用来接收新增地址数据
  const [addressList, setAddressList] = useState<DataListType[]>([])
  console.log(addressList)

  // 新增地址列表
  const updateAddressList = () => {
    getAddressApi().then((res) => {
      const data = res?.data?.map((item: any) => {
        const region = extractRegionId(item.region[0], "id")
        const regionTitle = extractRegionId(item.region[0], "name")
        return {
          ...item,
          region,
          regionTitle,
          tag: item.address_type,
        }
      })
      setAddressList(gengrateDataList(data))
    })
  }

  useEffect(() => {
    updateAddressList()
  }, [])

  const openUpdateModal = (item: any) => {
    openEditModal(item)
    setIsUpdate(true)
  }

  const deleteAddress = async (id: number) => {
    const res = await deleteAddressApi({ id })
    if (res.code == 200) {
      message.success("删除成功")
      updateAddressList()
    }
  }

  const setDefaultAddress = async (id: number) => {
    const res = await setDefaultAddressApi({ id, is_default: true })
    if (res.code == 200) {
      message.success("设置默认地址成功")
      updateAddressList()
    }
  }

  const gengrateDataList = (data: DataListType[]) => {
    return data.map((item) => {
      const detailAddress = (
        <div className="flex  items-center justify-center">
          <Tag color={item?.address_type == "company" ? "#F05113" : "#1366F0"}>{item?.address_type}</Tag>
          <div
            className="street"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item?.regionTitle?.join("") + item.street}
          </div>
        </div>
      )
      const operate = (
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

          {item.is_default ? (
            <Button color="primary" size="small" variant="solid">
              默认地址
            </Button>
          ) : (
            <Button type="text" size="small" onClick={() => setDefaultAddress(item.id)}>
              设为默认
            </Button>
          )}
          <div className="btns">
            <Button type="text" size="small" onClick={() => openUpdateModal(item)}>
              修改
            </Button>
            <Popconfirm
              title="确定删除地址吗？"
              description="删除后无法恢复"
              onConfirm={() => deleteAddress(item.id)}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" style={{ color: "#999" }}>
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
      )
      return {
        ...item,
        detailAddress,
        operate,
      }
    })
  }

  return (
    <div className="">
      {/* 表格列表组件 */}
      <TableXzz columns={columns} dataList={addressList} />
      {/* 点击新建收货地址弹出 */}
      <AddressFormXzz updateAddressList={updateAddressList} />
    </div>
  )
}

export default ListLqh
