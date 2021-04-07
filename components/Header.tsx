import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";

import {
  BellOutlined,
  HomeOutlined,
  LoginOutlined,
  NotificationOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  return (
    <div
      style={{
        padding: "15px 0px 15px 0px",
        backgroundColor: "white",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 9999,
      }}
    >
      <Col span={16} offset={4}>
        <Row justify="space-between" align="middle">
          <Link href="/">
            <a>
              <Text strong style={{ margin: 0, fontSize: 16 }}>
                Awsem
              </Text>
            </a>
          </Link>
          <div
            style={{
              width: 450,
              backgroundColor: "white",
              borderRadius: 20,
              padding: "2px 6px",
              border: "solid 1px #d9d9d9",
              boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
            }}
          >
            <Input
              size="middle"
              placeholder="Cari sesuatu"
              bordered={false}
              suffix={<SearchOutlined />}
            />
          </div>
          <Space>
            <Button
              type="default"
              shape="circle"
              icon={<BellOutlined />}
              onProgress={() => {}}
            />
            <Button
              type="default"
              shape="round"
              icon={<PlusOutlined />}
              onClick={() => router.push("/upload")}
            >
              Upload
            </Button>
            <Button type="primary" shape="round" icon={<LoginOutlined />}>
              Login
            </Button>
            <Link href="/user">
              <a>
                <Avatar size={32} icon={<UserOutlined />} />
              </a>
            </Link>
          </Space>
        </Row>
      </Col>
    </div>
  );
}
