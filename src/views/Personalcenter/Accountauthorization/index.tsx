import "./zhanghaoshouquan.css"

import type { TableColumnsType, TableProps } from "antd"
import { Button, Flex, Space, Table } from "antd"

// 引入新的弹框样式
import ModalLqh2 from "@/components/ModalLqh2"
import PopconfirmLqh from "@/components/PopconfirmLqh"

// 引入新增账号弹框
import AddnewaccountLqh from "./addnewaccount"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

interface DataType {
  key: React.Key
  name: string
  age: string
  address: string
  type: string
}

const type = {
  caiwu: { name: "财务", color: "#F05113" },
  zhuli: { name: "助理", color: "#1366F0" },
}

function AccountauthorizationLqh() {
  // 新增账号弹框
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)

  //点击右上角关闭弹框,清空新增账号表单字段
  const closeAttaccount = () => {
    setIsModalOpenAdd(false)
  }
  // 关闭弹框--从子组件接收父组件方法
  const handleChildData = () => {
    closeAttaccount()
  }

  // 点确认授权--数据不为空的时候--关闭弹框--否则不关闭弹框--提示用户输入数据
  const Confirmauthorization = () => {
    // 授权成功关闭弹框--
    setIsModalOpenAdd(false)
    // 调用账号授权列表接口数据--刷新账号授权列表数据
  }

  // 新增账号方法
  const addNumber = () => {
    // 到时用ref方法调用子组件--清空表单方法

    // 开启弹框
    setIsModalOpenAdd(true)
  }
  const handleDelete = (key: any) => {
    console.log(key, "确认删除数据")
  }

  const handleCancel = () => {
    console.log("取消删除数据")
  }
  const columns: TableColumnsType<DataType> = [
    {
      title: "授权账号",
      dataIndex: "name",
      align: "center",

      render: (text, item) => {
        const itemType = item.type as keyof typeof type

        return (
          <Space size="middle">
            <div className="flex">
              <div className="text-[16px] text-[#000000] mr-[10px]">
                <span> {text}</span>
              </div>

              <div
                className="w-[50px] h-[25px] bg-[#f05113] rounded-[4px] text-[14px] text-[#fff] flex justify-center items-center"
                style={{ backgroundColor: type[itemType].color }}
              >
                <span>{type[itemType].name}</span>
              </div>
            </div>
          </Space>
        )
      },
    },
    {
      title: "授权时间",
      dataIndex: "age",
      align: "center",
      render: () => (
        <Space size="middle">
          <div className="flex">
            <div className="text-[16px] text-[#000000] mr-[10px]">
              <span>2024-10-20 10:26:32</span>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "操作",
      dataIndex: "address",
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <PopconfirmLqh title="确认要删除吗" onCancel={handleCancel} onConfirm={() => handleDelete(record.key)}>
            <span className="text-[#1366F0] cursor-pointer">删除</span>
          </PopconfirmLqh>
        ) : null,
    },
  ]

  // 表格数据
  const dataSource = [
    {
      key: 1,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "zhuli",
    },
    {
      key: 2,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "caiwu",
    },
    {
      key: 3,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "zhuli",
    },
    {
      key: 4,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "caiwu",
    },
    {
      key: 5,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "zhuli",
    },
    {
      key: 6,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "caiwu",
    },
    {
      key: 7,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "zhuli",
    },
    {
      key: 8,
      name: `DAYU-3D_13009868761`,
      age: `2024-10-20 10:26:32`,
      address: `删除`,
      type: "caiwu",
    },
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div className="w-[920px] h-[677px] bg-[#ffffff] rounded-[10px] border border-[#dcdcdc] p-[30px] flex flex-col max-w-[920px] 2xl:w-[100%] xl:w-[65vw] lg:w-[56vw] md:w-[54vw] sm:w-[50vw]">
      <div className="flex justify-between mb-[23px] ">
        <div className="font-normal text-[20px] text-[#222222]">
          <span>账号授权</span>
        </div>

        <div className="flex justify-center items-center">
          <Button className="text-[14px]">批量删除</Button>
        </div>
      </div>

      <Flex gap="middle" vertical>
        <div className="scrollTable">
          <Table
            bordered
            scroll={{
              y: 330,
            }}
            pagination={false}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </Flex>

      <div className="mt-auto">
        <Button className="w-[160px] h-[56px] text-[18px]" type="primary" onClick={addNumber}>
          + 新增账号
        </Button>
      </div>

      {/* 新增账号弹框 ModalLqh2 */}
      <ModalLqh2
        width="920px 2xl:w-[920px] xl:w-[90vw] lg:w-[85vw] md:w-[80vw] sm:w-[75vw]"
        open={isModalOpenAdd}
        onCancel={closeAttaccount}
        onOk={closeAttaccount}
        title="新增账号"
        classname="custom-modal-grenzx"
        closable={false}
        content={<AddnewaccountLqh cancelBtn={handleChildData} confirmAuthorizationBtn={Confirmauthorization} />}
      />
    </div>
  )
}

export default AccountauthorizationLqh
