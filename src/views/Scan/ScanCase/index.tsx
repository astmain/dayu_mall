import { Col, Divider, Row, Typography } from "antd"

function ScanCaseLqh() {
  const { Title } = Typography

  const ScanMethods = [
    {
      image: "/public/scan/手持激光扫描.png",
      text: "手持激光扫描",
    },
    {
      image: "/public/scan/固定式扫描.jpg",
      text: "固定式扫描",
    },
    {
      image: "/public/scan/手持白光扫描.png",
      text: "手持白光扫描",
    },
  ]
  return (
    <div style={{ textAlign: "left" }}>
      <Title level={5} style={{ fontSize: "20px", marginBottom: "29px", fontWeight: 400 }}>
        <Divider
          type="vertical"
          style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px", marginLeft: "0" }}
        />
        扫描案例
      </Title>
      <Row gutter={[16, 16]}>
        {ScanMethods.map((_method, index) => (
          <Col span={8} key={index}>
            {/*<Card
              hoverable
              style={{width:'200px',textAlign: 'center', boxShadow: 'darkgrey 10px 10px 30px 5px'}}
              cover={<img src={method.image} alt={method.text}  />}
            >
              <Text strong >{method.text}</Text>
            </Card>*/}
            <video src="your-video-url.mp4" controls width={340} height={230} autoPlay muted />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ScanCaseLqh
