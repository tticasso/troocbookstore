import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Col
} from 'antd';

import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
    LockOutlined,
    UnlockOutlined
} from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
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
            const response = await axios.get('http://localhost:9999/api/user/list');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            notification.error({ message: 'Error fetching users', description: error.message });
        }
    };




    const handleFormSubmit = async (values) => {
        try {
            if (editingUser) {
                await axios.put(`http://localhost:9999/api/user/update/${editingUser._id}`, values);
                notification.success({ message: 'User updated successfully' });
            } else {
                await axios.post('http://localhost:9999/api/user/signup', values);
                notification.success({ message: 'User created successfully' });
            }
            fetchUsers();
            setIsModalVisible(false);
            form.resetFields();
            setEditingUser(null);
        } catch (error) {
            console.error('Error saving user:', error);
            notification.error({ message: 'Error saving user', description: error.message });
        }
    };


    const handleChangeStatus = async (id, currentStatus) => {
        try {
            if (currentStatus === 'active') {
                await axios.put(`http://localhost:9999/api/user/inactive/${id}`);
            } else {
                await axios.put(`http://localhost:9999/api/user/active/${id}`);
            }
            fetchUsers();
            notification.success({ message: 'User status updated successfully' });
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
            full_name: user.full_name,
            phone_number: user.phone_number,
            role: user.role,
            // Note: Removed dob as it's not in the new data structure
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Họ Tên',
            width: 170,
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Điện thoại',
            width: 120,
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            filters: [
                { text: 'ADMIN', value: 'admin' },
                { text: 'USER', value: 'user' },
                { text: 'LOGISTIC', value: 'logistic' },
                { text: 'CONTENT CREATOR', value: 'content creator' },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) => {
                let color = 'default';
                switch (role) {
                    case 'admin':
                        color = 'red';
                        break;
                    case 'doctor':
                        color = 'green';
                        break;
                    case 'patient':
                        color = 'purple';
                        break;
                    case 'manager':
                        color = 'blue';
                        break;
                }
                return <Tag color={color}>{role.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status === 'active' ? 'Đang hoạt động' : 'Dừng hoạt động'}
                </Tag>
            ),
            filters: [
                { text: 'Đang hoạt động', value: 'active' },
                { text: 'Dừng hoạt động', value: 'inactive' },
            ],
            onFilter: (value, record) => record.status === value,
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
                                record.status === 'active' ? "Khóa tài khoản này?" : "Mở khóa tài khoản này?"
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
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number.toString().includes(searchTerm)
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
                        Thêm người dùng
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
                title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng'}
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
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Vui lòng điền đúng format email' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="full_name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng điền họ tên' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng điền số điện thoại' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Thêm trường role */}
                    <Form.Item
                        name="role"
                        label="Chức vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                    >
                        <Select placeholder="Chọn chức vụ">
                            <Option value="user">User</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="logistic">Logistic</Option>
                            <Option value="content-creator">Content Creator</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
