import { SearchOutlined } from "@ant-design/icons"
import type { GetProps } from "antd"
import { Button, Input } from "antd"

import BackBtn from "../backBtn"
type SearchProps = GetProps<typeof Input.Search>
const suffix = <i className="iconfont icon-mima"></i>
const SearchMain: React.FC<{ showBack?: boolean }> = ({ showBack = false }) => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value)

  return (
    <div className="w-full relative  m-[50px_0]">
      <div className="flex justify-center items-center w-full">
        <div className="w-2/5 home-search-input-custom-search">
          <Input.Search
            placeholder="输入关键词搜索或以图搜图"
            className=""
            suffix={suffix}
            onSearch={onSearch}
            enterButton={
              <Button
                type="primary"
                style={{ borderRadius: "0 16px 16px 0", height: "60px", width: "90px" }}
                icon={<SearchOutlined style={{ fontSize: "29px" }} />}
              ></Button>
            }
          />
        </div>
      </div>
      {showBack && (
        <div className="flex justify-center items-center gap-[20px] absolute bottom-0 left-0">
          <BackBtn />
        </div>
      )}
      <div className="flex justify-center items-center gap-[20px] absolute bottom-0 right-0">
        <Button>我上传的作品</Button>
        <Button type="primary">上传作品</Button>
      </div>
    </div>
  )
}
export default SearchMain
