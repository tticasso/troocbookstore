import {
    BellOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    DashboardOutlined,
    FileOutlined,
    GroupOutlined,
    LogoutOutlined,
    MedicineBoxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    ReconciliationOutlined,
    ReconciliationTwoTone,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
    UserSwitchOutlined,
    UsergroupAddOutlined,
    GlobalOutlined,
    ReadOutlined,
    BookOutlined
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Flex,
    Layout,
    List,
    Menu,
    Popover,
    Space,
    Tag,
    Typography,
    theme,
} from "antd";

import Title from "./Title";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Clock = () => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Flex align="center" justify="center">
            <Card styles={{ body: { padding: 10 } }}>
                <Title
                    styleContainer={{ margin: 0 }}
                    justify="center"
                    title={
                        <Space>
                            <ClockCircleOutlined />
                            {time.format("HH:mm:ss")}
                        </Space>
                    }
                />
            </Card>
        </Flex>
    );
};

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const menuSidebars = [
        {
            key: "users",
            icon: <UsergroupAddOutlined />,
            label: "Người dùng",
            link: "/admin/user-manage",
        },
        {
            key: "nations",
            icon: <GlobalOutlined />,
            label: "Quốc gia",
            link: "/admin/nation-manage",
        },
        {
            key: "categories",
            icon: <ReadOutlined />,
            label: "Danh mục",
            link: "/admin/category-manage",
        },
        {
            key: "books",
            icon: <BookOutlined />,
            label: "Sách",
            link: "/admin/book-manage",
        },
        {
            key: "orders",
            icon: <BookOutlined />,
            label: "Order",
            link: "/admin/order-manage",
        },
        {
            key: "authors",
            icon: <UsergroupAddOutlined />,
            label: "Tác giả",
            link: "/admin/author-manage",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            link: "/logout",

        },
    ];

    const selectedMenu = () => {
        const menu = menuSidebars.find((menu) =>
            window.location.pathname.includes(menu.link)
        );

        if (menu) {
            return [menu.key];
        }
        return [];
    };

    const onClickMenu = ({ item }) => {
        const { link } = item.props;

        if (link) {
            navigate(link);
        }
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width={250}
            >
                <div style={{
                    height: 64,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Typography.Title level={5} style={{ fontWeight: "bold", textAlign: "center" }}>
                        Trooc Bookstore
                    </Typography.Title>
                    {!collapsed && <Tag color="red">ADMIN</Tag>}
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={selectedMenu()}
                    items={menuSidebars}
                    onClick={onClickMenu}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex justify="space-between" align="center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: "16px", width: 64, height: 64 }}
                        />
                        <Clock />
                        <Flex style={{ marginRight: 20 }} align="center" gap={20}>
                            <Button type="text" icon={<BellOutlined />} />
                            <Button type="text" icon={<UserOutlined />}>
                                Admin
                            </Button>
                        </Flex>
                    </Flex>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;