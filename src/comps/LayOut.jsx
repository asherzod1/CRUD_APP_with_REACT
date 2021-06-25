import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './LayOut.scss'
import { TOKEN } from '../const/const';
const { Header, Sider, Content } = Layout;
const LayOut = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => {
        setCollapsed(!collapsed);
    }

    const logOut = () => {
        localStorage.removeItem(TOKEN);
        window.location.href = '/login'
    }
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to='/tutor'>TUTOR</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to='/student'>STUDENTS</Link>
                    </Menu.Item>
                    <Menu.Item  key="3" icon={<UploadOutlined />}>
                    <Link onClick={logOut}>LOG OUT</Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayOut
