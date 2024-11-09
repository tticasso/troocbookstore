import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, DatePicker, Upload, notification, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CreateAuthorModal = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

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

            await axios.post('http://localhost:9999/api/author/create', formData, config);
            notification.success({ message: 'Tác giả tạo mới thành công' });

            onSubmit(values); // Gọi callback khi thành công
            form.resetFields();
        } catch (error) {
            console.error('Error saving author:', error);
            notification.error({
                message: 'Lỗi khi tạo tác giả',
                description: error?.response?.data?.message || error.message,
            });
        }
    };

    return (
        <Modal
            title="Thêm tác giả"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    name="full_name"
                    label="Họ tên"
                    rules={[{ required: true, message: 'Vui lòng điền họ tên' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="dob"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                    name="introduce"
                    label="Giới thiệu"
                    rules={[{ required: true, message: 'Vui lòng điền giới thiệu' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="img"
                    label="Ảnh đại diện"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện' }]}>
                    <Upload
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false} // Không upload tự động
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm tác giả
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateAuthorModal;
