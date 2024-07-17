import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import React, { ReactNode, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { menuList } from "src/const/menu-list";

const { Header, Content, Footer, Sider } = Layout;

const generateMenuItems = (menu: any, parentKey = ""): MenuProps["items"] => {
  return Object.keys(menu).map((key, index) => {
    const currentKey = parentKey ? `${parentKey}-${key}` : key;
    const hasChildren =
      menu[key].submenu && Object.keys(menu[key].submenu).length > 0;
    const label = menu[key].name;
    const route = menu[key].route;
    const icon = menu[key].icon ? React.createElement(menu[key].icon) : null;

    return {
      key: currentKey,
      icon: icon,
      label: hasChildren ? (
        label
      ) : route ? (
        <Link to={route}>{label}</Link>
      ) : (
        label
      ),
      children: hasChildren
        ? generateMenuItems(menu[key].submenu, currentKey)
        : undefined,
    };
  });
};

const items1: MenuProps["items"] = generateMenuItems(menuList);

export interface DashboardProps {
  children?: ReactNode;
}

function PrivateRouter({ children }: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setBroken(broken);
          if (broken) {
            setCollapsed(true);
          }
        }}
        trigger={null}
        collapsedWidth={broken ? 0 : 80}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items1}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrivateRouter;
