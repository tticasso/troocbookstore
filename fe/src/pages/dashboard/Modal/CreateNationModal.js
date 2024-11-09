import React, { useState } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const CreateNationModal = ({ isModalVisible, setIsModalVisible, onCreate }) => {
    const [form] = Form.useForm();

    const handleFormSubmit = async (values) => {
        try {
            await axios.post('http://localhost:9999/api/nation/create', values);
            notification.success({ message: 'Nation created successfully' });
            setIsModalVisible(false);
            form.resetFields();
            onCreate(); // Refresh the nations list after adding a new nation
        } catch (error) {
            console.error('Error saving nation:', error);
            notification.error({ message: 'Error saving nation', description: error.message });
        }
    };

    return (
        <Modal
            title="Thêm quốc gia"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
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
    );
};

export default CreateNationModal;
