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
} from '@ant-design/icons';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/category/list'); // Thay đổi URL để lấy danh mục
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            notification.error({ message: 'Error fetching categories', description: error.message });
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingCategory) {
                await axios.put(`http://localhost:9999/api/category/update/${editingCategory._id}`, values);
                notification.success({ message: 'Category updated successfully' });
            } else {
                await axios.post('http://localhost:9999/api/category/create', values);
                notification.success({ message: 'Category created successfully' });
            }
            fetchCategories();
            setIsModalVisible(false);
            form.resetFields();
            setEditingCategory(null);
        } catch (error) {
            console.error('Error saving category:', error);
            notification.error({ message: 'Error saving category', description: error.message });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/category/delete/${id}`);
            notification.success({ message: 'Category deleted successfully' });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            notification.error({ message: 'Error deleting category', description: error.message });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...category,
            name: category.name,
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
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 170,
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
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý danh mục" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchCategories}>Làm mới</Button>
                        <Input
                            placeholder="Tìm kiếm theo tên danh mục"
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
                        onClick={() => {
                            setIsModalVisible(true);
                            setEditingCategory(null); // Reset editing category for new entry
                        }}
                    >
                        Thêm danh mục
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredCategories}
                scroll={{ x: 'max-content' }}
                rowKey="_id"
            />
            <Modal
                title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    initialValues={{ name: editingCategory?.name }}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingCategory ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryManagement;
