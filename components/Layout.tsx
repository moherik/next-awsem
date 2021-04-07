import { Col, Layout as Wrapper, Space } from "antd";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "#eceff1" }}>
      <Header />
      <Col
        span={16}
        offset={4}
        style={{ marginTop: "50px", padding: "40px 0px" }}
      >
        {children}
      </Col>
    </div>
  );
}
