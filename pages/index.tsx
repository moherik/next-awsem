import {
  CompassOutlined,
  LikeOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Head from "next/head";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Awsem Content</title>
      </Head>

      <Space style={{ marginBottom: 24 }}>
        <Button icon={<CompassOutlined />} type="primary" shape="round">
          Explore
        </Button>
        <Button shape="round">Teknologi</Button>
        <Button shape="round">Hiburan</Button>
        <Button shape="round">Gaming</Button>
        <Button shape="round">Tutorial</Button>
      </Space>

      <Row gutter={24}>
        <Col span={16}>
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </Col>
        <Col span={8}>
          <Space style={{ top: 80, position: "sticky" }} direction="vertical">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                padding: "16px",
                boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
                marginBottom: 16,
              }}
            >
              <Row justify="space-around" align="middle">
                <Button type="text" shape="round" icon={<LikeOutlined />}>
                  Like
                </Button>
                <Button type="text" shape="round" icon={<ShareAltOutlined />}>
                  Share
                </Button>
                <Button type="text" shape="round" icon={<PlusSquareOutlined />}>
                  Save
                </Button>
              </Row>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 6,
                boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
                marginBottom: 16,
                minHeight: 360,
              }}
            >
              <Title level={5}>10 Komentar</Title>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam
              error corrupti nihil corporis, labore a, animi ea dignissimos
              rerum dolores voluptates. Aut ad quibusdam at vel consequuntur
              eveniet dolorum!
            </div>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
}
