import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Modal, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';
import { API_URL } from '../const/const';
import { useForm } from 'antd/lib/form/Form';

const StudentC = () => {

    const initial = {
        fullname: '',
        username: '',
        address: '',
        groupId: '',
        password: ''
    }
    const [data, setData] = useState([]);
    const getStudent = () => {
        axios.get(API_URL + 'api/admin/students')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getStudent();
    }, [])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const columns = [
        {
            title: 'ID',
            dataIndex:'id'
        },
        {
          title: 'Fullname',
          dataIndex: 'fullname',
        },
        {
          title: 'Username',
          dataIndex: 'username',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
    ];
    console.log(data)
    const rowSelection = {
        selectedRowKeys,
        onChange:(selectedRowKeys) => { 
            setSelectedRowKeys(selectedRowKeys)},
      };
    
    const AddStudent = () =>{
        showModal();
        form.setFieldsValue(initial)
    }
    const deleteStudent = () =>{
        
        selectedRowKeys.forEach(item=>
            {
                axios.delete(API_URL + 'api/admin/student/delete/' + item)
                .then(res => {
                    message.success('Student deleted'); 
                    getStudent()
                })
                .catch(err => message.error('Error with Server'))
            }
            )
    }
    const editStudent = () =>{
        showModal();
        const editData=data.filter(item => item.id === selectedRowKeys[0])
        .map(item=>{
            return {
                fullname: item.fullname,
                username: item.username,
                address:item.address,
                groupId: item.groupId,
                password: item.password
            };
        })[0];
        form.setFieldsValue(editData)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
    setIsModalVisible(true);
    };

    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };
    //Form functions

    const [form] = useForm();
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const validateMessages = {
        types: {
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      const onFinish = (values) => {
        if(selectedRowKeys.length === 0){
            axios.post(API_URL + 'api/admin/student/save', values)
            .then(res => {
            message.success('Student Created')
            getStudent();
            handleCancel();
            })
            .catch(err => message.error('Login or Password is Incorrect'))
        }
        else{
            axios.put(API_URL + 'api/admin/student/edit/' + selectedRowKeys[0], values)
            .then(res => {
                message.success('Student Edited')
                getStudent();
                handleCancel();
                setSelectedRowKeys([]);
            })
            .catch(err => {
                message.error('Student doesn\'t edited')
            })
        }
      };
      const onFinishFailed = (err) =>{
          message.error('Xatolik')
      }
    return (
        <div>
            <Row>
                <Button type='primary' onClick={AddStudent}>Add Tutor</Button>
                {selectedRowKeys.length !==0 ? 
                (<Button type='danger' onClick={deleteStudent}>Delete</Button>) : 
                ('')}
                {selectedRowKeys.length === 1 ? 
                (<Button onClick={editStudent}>Edit Button</Button>): 
                ('')} 
            </Row>
            <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={data} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
                    <Form.Item name='fullname' label="FullName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='username' label="Username" >
                        <Input />
                    </Form.Item>
                    <Form.Item name='address' label="Address" >
                        <Input />
                    </Form.Item>
                    <Form.Item name='groupId' label="GroupId" rules={[{ type: 'number', min: 0, max: 99 }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default StudentC
