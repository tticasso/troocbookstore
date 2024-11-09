import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Input,
    notification,
    Modal,
    Form
} from 'antd';

const CreateCategoryModal = ({ visible, onCancel, onSubmit }) => {
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/category/list');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            notification.error({ message: 'Error fetching categories', description: error.message });
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            await axios.post('http://localhost:9999/api/category/create', values);
            notification.success({ message: 'Category created successfully' });
            onSubmit(values);  // Call the onSubmit function passed from parent
            form.resetFields();  // Reset form fields after submission
        } catch (error) {
            console.error('Error saving category:', error);
            notification.error({ message: 'Error saving category', description: error.message });
        }
    };

    return (
        <Modal
            title="Thêm danh mục"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleFormSubmit}
            >
                <Form.Item
                    label="Tên danh mục"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCategoryModal;


