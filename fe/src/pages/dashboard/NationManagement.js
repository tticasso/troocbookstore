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
    notification,
    Space,
    Popconfirm,
    Row,
    Col
} from 'antd';

import {
    PlusOutlined,
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const NationManagement = () => {
    const [nations, setNations] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingNation, setEditingNation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNations();
    }, []);

    const fetchNations = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/nation/list');
            setNations(response.data);
        } catch (error) {
            console.error('Error fetching nations:', error);
            notification.error({ message: 'Error fetching nations', description: error.message });
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingNation) {
                await axios.put(`http://localhost:9999/api/nation/update/${editingNation._id}`, values);
                notification.success({ message: 'Nation updated successfully' });
            } else {
                await axios.post('http://localhost:9999/api/nation/create', values);
                notification.success({ message: 'Nation created successfully' });
            }
            fetchNations();
            setIsModalVisible(false);
            form.resetFields();
            setEditingNation(null);
        } catch (error) {
            console.error('Error saving nation:', error);
            notification.error({ message: 'Error saving nation', description: error.message });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/nation/delete/${id}`);
            fetchNations();
            notification.success({ message: 'Nation deleted successfully' });
        } catch (error) {
            console.error('Error deleting nation:', error);
            notification.error({ message: 'Error deleting nation', description: error.message });
        }
    };

    const handleEdit = (nation) => {
        setEditingNation(nation);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: nation.name,
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
            title: 'Tên Quốc Gia',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Ngày Cập Nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Hành Động',
            fixed: "right",
            align: "center",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa quốc gia này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="text" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredNations = nations.filter(nation =>
        nation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý quốc gia" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchNations}>Làm mới</Button>
                        <Input
                            placeholder="Tìm kiếm theo tên quốc gia"
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
                        Thêm quốc gia
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredNations}
                scroll={{ x: 'max-content' }}
                rowKey="_id"
            />
            <Modal
                title={editingNation ? 'Cập nhật quốc gia' : 'Thêm quốc gia'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingNation(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên Quốc Gia"
                        rules={[{ required: true, message: 'Vui lòng điền tên quốc gia' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NationManagement;
