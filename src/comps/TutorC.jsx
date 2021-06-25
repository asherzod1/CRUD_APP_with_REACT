import React, { useEffect, useState } from 'react'
import { API_URL } from '../const/const'
import { Table, Row, Button, Modal, Form, Input, InputNumber, message, } from 'antd';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';

const TutorC = () => {
    
    const initial = {
        fullname: '',
        username: '',
        address: '',
        groupId: '',
        password: ''
    }

    const [data, setData] = useState([])
    const getTutors = () =>{
        axios.get(API_URL+'api/admin/tutors')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        getTutors();
    },[])

    //Modal Functions

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const AddTutor =() => {
        showModal();
        form.setFieldsValue(initial);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteTutor = () =>{
        selectedRowKeys.forEach(item=> 
            axios.delete(API_URL+'api/admin/tutor/delete/'+item)
            .then(res => {
                message.info('Tutor Deleted'); 
                getTutors();})
            .catch(err => message.error('Tutor doesn\'t deleted'))
            )
    }

    const editTutor = () => {
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
    // table functions

    const columns = [
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

      const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) =>{
            setSelectedRowKeys(selectedRowKeys);
        },
      };

      //Form functions 
      const [form] = useForm();
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      
      const onFinish = (values) => {
        if(selectedRowKeys.length === 0){
            axios.post(API_URL + 'api/admin/tutor/save', values)
            .then(res => {
            message.success('Tutor Created')
            getTutors();
            handleCancel();
            })
            .catch(err => message.error('Login or Password is Incorrect'))
        }
        else{
            axios.put(API_URL + 'api/admin/tutor/edit/' + selectedRowKeys[0], values)
            .then(res => {
                message.success('Tutor Edited')
                getTutors();
                handleCancel();
                setSelectedRowKeys([]);
            })
            .catch(err => {
                message.error('Tutor doesn\'t edited')
            })
        }
      };
      const onFinishFailed = (err) =>{
          message.error('Xatolik')
      }
    return (
        <div>
            <Row>
                <Button type='primary' onClick={AddTutor}>Add Tutor</Button>
                {selectedRowKeys.length !==0 ? 
                (<Button type='danger' onClick={deleteTutor}>Delete</Button>) : 
                ('')}
                {selectedRowKeys.length === 1 ? 
                (<Button onClick={editTutor}>Edit Button</Button>): 
                ('')} 
            </Row>
            <Table rowKey='id' rowSelection={ {...rowSelection}} columns={columns} dataSource={data} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} okText={'Close'} okType='danger' onCancel={handleCancel} cancelText='OK'>
                <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

export default TutorC
