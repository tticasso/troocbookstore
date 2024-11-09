import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from "./Title";
import {
    Tag,
    Tooltip,
    Table,
    Button,
    Typography,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    notification,
    Space,
    Popconfirm,
    Row,
    Col,
    Upload
} from 'antd';
import moment from 'moment';

import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
    LockOutlined,
    UnlockOutlined,
    UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;

const AuthorManagement = () => {
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/author/list');
            // Parse dob using moment
            const usersWithParsedDob = response.data.map(user => ({
                ...user,
                dob: moment(user.dob) // Assuming your date format is YYYY-MM-DD
            }));
            setUsers(usersWithParsedDob); 
        } catch (error) {
            console.error('Error fetching users:', error);
            notification.error({ message: 'Error fetching users', description: error.message });
        }
    };




    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData(); // FormData để gửi dữ liệu multipart
            formData.append('full_name', values.full_name);
            formData.append('introduce', values.introduce);
            formData.append('dob', values.dob);

            if (values.img && values.img[0]) {
                formData.append('img', values.img[0].originFileObj); // Đính kèm file ảnh
            }

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            if (editingUser) {
                await axios.put(
                    `http://localhost:9999/api/author/update/${editingUser._id}`, formData, config
                );
                notification.success({ message: 'User updated successfully' });
            } else {
                await axios.post('http://localhost:9999/api/author/create', formData, config);
                notification.success({ message: 'User created successfully' });
            }

            fetchUsers();
            setIsModalVisible(false);
            form.resetFields();
            setEditingUser(null);
        } catch (error) {
            console.error('Error saving user:', error);
            notification.error({
                message: 'Error saving user',
                description: error?.response?.data?.message || error.message,
            });
        }
    };



    const handleChangeStatus = async (id, currentStatus) => {
        try {
            await axios.delete(`http://localhost:9999/api/author/delete/${id}`);
            fetchUsers();
            notification.success({ message: 'Author deleted successfully' });
        } catch (error) {
            console.error('Error updating user status:', error);
            notification.error({ message: 'Error updating user status', description: error.message });
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...user,
            dob: user.dob ? moment(user.dob, 'YYYY-MM-DD') : null 
        });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            key: "index",
            width: 70,
            align: "center",
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Họ Tên',
            width: 170,
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Giới thiệu',
            width: 120,
            dataIndex: 'introduce',
            key: 'introduce',
            className: "truncate max-w-[300px]"
        },
        {
            title: 'Hành động',
            fixed: "right",
            align: "center",
            width: 200,
            ellipsis: true,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                    <Tooltip
                        title={
                            record.status === 'active' ? "Bạn muốn khóa ?" : "Bạn muốn mở khóa?"
                        }
                    >
                        <Popconfirm
                            title={
                                record.status === 'active' ? "Khóa tài khoản này?" : "Xóa tác giả này?"
                            }
                            onConfirm={() => handleChangeStatus(record._id, record.status)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="text"
                                icon={
                                    record.status === 'active' ? <UnlockOutlined /> : <LockOutlined />
                                }
                            ></Button>
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const filteredUsers = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý người dùng" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchUsers}>Làm mới</Button>
                        <Input
                            placeholder="Tìm kiếm theo email, họ tên hoặc số điện thoại"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: 300 }}
                            prefix={<SearchOutlined />}
                        />
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Thêm tác giả
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredUsers}
                scroll={{ x: 'max-content' }}
                rowKey="_id"
            />
            <Modal
                title={editingUser ? 'Cập nhật tác giả' : 'Thêm tác giả'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingUser(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="full_name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng điền họ tên' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="dob"
                        label="Ngày sinh"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY" // Định dạng ngày
                        />
                    </Form.Item>



                    <Form.Item
                        name="introduce"
                        label="Giới thiệu"
                        rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                    >
                        <Input />
                    </Form.Item>

                    {!editingUser && (
                        <Form.Item
                            name="img"
                            label="Ảnh đại diện"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện' }]}
                        >
                            <Upload
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false} // Không upload tự động
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default AuthorManagement;
