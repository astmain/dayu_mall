import { ConfigProvider, Timeline } from "antd"

// 引入关于我们接口 企业产品介绍接口 componeyProductData
// import { componeyProductData } from "@/network/api/about"

function About() {
  const imgBaseUrl = "http://yun3d.com/frontend/public/test/"

  // 接口代码--企业产品介绍示例接口代码
  const companyProduct = async () => {
    console.log("企业产品介绍接口代码")
    // const data = {
    //   product: "",
    //   // productData: [0],
    // }
    // 接口代码
    // try {
    //   const res = await componeyProductData({ params: data })
    //   console.log(res, "res")
    // } catch (err) {
    //   console.log("错误情况", err)
    // }
  }

  companyProduct()

  return (
    <div className="w-[100%] h-[100%]">
      <div className="max-w-[1760px]">
        <div className="text-[36px] mt-[60px] mb-[50px]">
          <h1>企业产品介绍</h1>
        </div>

        <div className="flex items-center justify-center max-w-[1760px] mx-auto flex-wrap 2xl:w-[100%] xl:w-[84%] lg:w-[82%] md:w-[80%] sm:w-[95%]">
          <div className="w-[350px] h-[220px] bg-[#f11313] rounded-[20px] flex justify-center items-center mr-[30px] max-w-[350px] 2xl:w-[350px] xl:w-[50vw] lg:w-[48vw] md:w-[46vw] sm:w-[44vw]">
            <img className="w-[100%] max-w-[209px] h-[auto]" src={imgBaseUrl + "LOGO@2x.png"} alt="" />
          </div>

          <div className="w-[1039px] text-left text-[#666666] text-[18px] flex-1">
            <p className="mb-[28px]">
              我们是一家提供三维扫描、三维设计、快速成型(3D打印)、硬件设备等的一站式的三维数字化(3D打印)综合服务的数字创意型公司。{" "}
            </p>
            <p className="mb-[28px]">
              目前已拥有多项专利，为超过500家客户（包括学校、医院、政府和企业）提供专业的技术服务。
            </p>
            <p className="mb-[28px]">
              公司着重围绕动漫产品、工艺品、陶瓷、玩具文具、机械装备等产业为企业提供产品3D打印设计、3D打印快速成型、模具制造、工
              业处理、模型制作与销售、3D展示服务、创新应用研究、材料研究、技术咨询等全方位的一站式三维数字化（3D打印）创新应用
              等服务。
            </p>
          </div>
        </div>
        <div className="text-[36px] mb-[50px] mt-[60px]  max-w-[1780px]">
          <h1>公司历程</h1>
        </div>

        <div className="flex items-center justify-center mx-auto gap-[306px]">
          <div className="w-[600px] max-w-[600px] 2xl:w-[100%] xl:w-[69%] lg:w-[54%] md:w-[42%] sm:w-[34%]">
            <ConfigProvider
              theme={{
                components: {
                  Timeline: {
                    itemPaddingBottom: 92,
                    fontSize: 18,
                    colorText: "#666666",
                  },
                },
              }}
            >
              <Timeline
                mode="left"
                items={[
                  {
                    label: <div className="text-[#222222]">2015</div>,
                    children: "大宇科技公司成立",
                  },
                  {
                    label: <div className="text-[#222222]">2016</div>,
                    children: "100万天使轮融资 1000万pre-A轮融资1.2W+服务企业数",
                  },
                  {
                    label: <div className="text-[#222222]">2017</div>,
                    children: "5500万A轮融资2W + 服务企业数",
                  },
                  {
                    label: <div className="text-[#222222]">2018</div>,
                    children: "获xx资本领投B轮6000万融资 4.8W+服务企业数",
                  },
                  {
                    label: <div className="text-[#222222]">2019</div>,
                    children: "获xx企业领投B+轮数亿元融资23W+服务企业数 12W+日均打印次数",
                  },
                  {
                    label: <div className="text-[#222222]">2020</div>,
                    children: "获xxx、xxxx、xxxx、xxxx、xxxx共同投资的C轮融资85W+日均打印 65W+服务企业数",
                  },
                ]}
              />
            </ConfigProvider>
          </div>

          <div className="max-w-[100%] 2xl:w-[100%] xl:w-[69%] lg:w-[54%] md:w-[42%] sm:w-[34%]">
            <img className="w-[80%] max-w-[100%]" src={imgBaseUrl + "gongsilicheng.png"} alt="" />
          </div>
        </div>

        <div className="text-[36px] mb-[50px] max-w-[1780px] mx-auto">
          <div>
            <h1>公司环境</h1>
          </div>

          <div className="max-w-[1200px] mx-auto pt-[30px] mb-[50px] 2xl:w-[100%] xl:w-[94%] lg:w-[100%] md:w-[98%] sm:w-[98%]">
            <ul className="flex justify-center items-center flex-wrap mx-auto">
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer 2xl:w-[23.75%] xl:w-[23%]">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua1.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua2.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua3.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[0] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua4.png"} alt="" />
              </li>
            </ul>
          </div>
        </div>

        <div className="text-[36px] max-w-[1780px] mx-auto pb-[50px]">
          <div>
            <h1>企业文化</h1>
          </div>

          <div className="max-w-[1200px] w-full mx-auto pt-[30px]">
            <ul className="flex w-[1200px] max-w-[1200px] justify-center items-center flex-wrap mx-auto 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[98%] sm:w-[98%]">
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua1.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua2.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua3.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua4.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua5.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua6.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua7.png"} alt="" />
              </li>
              <li className="w-[285px] box-border transition duration-1000 ease-linear  linear mr-[8px] cursor-pointer">
                <img className="w-[100%] h-[auto]" src={imgBaseUrl + "qiyewenhua8.png"} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
