import { Button, message, Popconfirm, Tag } from "antd"

import AddressFormXzz from "@/components/addressInfo/form"
// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"
import TableXzz from "@/components/TableXzz"
import XzzBtn from "@/components/XzzBtn"
import { deleteAddressApi, getAddressApi, setDefaultAddressApi } from "@/network/api/address"

import { DataListType, RegionType } from "./form/type"

interface AddressInfoProps {
  test?: number
}
// 传参currentId 到 modal 当有此参数 说明时用户选择 地址  从而显示当前选择项
const AddressInfo: React.FC<AddressInfoProps> = () => {
  //  使用 useShallow 可以避免组件 的重新渲染
  // const names = useTestStore(useShallow((state: any) => Object.keys(state)))
  const { isManageModalOpen, closeManageModal, openEditModal, currentId, setIsUpdate } = useConsigneeStore(
    (state) => state,
  )

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

  // 递归获取regionId
  const extractRegionId = (region: RegionType, key: string): number[] => {
    const newRegion = JSON.parse(JSON.stringify(region))
    const regionIdArr: number[] = newRegion[key] ? [newRegion[key]] : []
    if (newRegion?.children) {
      return regionIdArr.concat(extractRegionId(newRegion.children, key))
    }
    return regionIdArr
  }

  const [addressList, setAddressList] = useState<DataListType[]>([])

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
      <ModalLqh2
        width="1200px"
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
              width: "1200px",
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
            <TableXzz columns={columns} dataList={addressList} />
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
      <AddressFormXzz updateAddressList={updateAddressList} />
    </div>
  )
}

export default AddressInfo
