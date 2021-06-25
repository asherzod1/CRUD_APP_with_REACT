import React from 'react'
import {Row, Col, Tabs, Form, Input, Button, message } from 'antd'
import axios from 'axios';
import { API_URL, TOKEN } from '../const/const';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const LoginPage = () => {
    //api/auth/signin
    const onFinish = (values) => {
        axios.post(API_URL + 'api/auth/signin', values)
        .then(res => {
            message.success('You Signed In Our Site Successfully ')
            window.location.href = '/';
            localStorage.setItem(TOKEN, res.data.token)
            console.log(res);
        })
        .catch(err => 
            message.error('Username or Password Incorrect')
            )
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div>
            <Row>
                <Col md={8} sm={24} push={8}>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="LOGIN" key="1">
                                 <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                        Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="CREATE ACCOUNT" key="2">
                            CREATE ACCOUNT
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage
