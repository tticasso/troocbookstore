import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import CreateAuthorModal from './CreateAuthorModal';
import CreateCategoryModal from './CreateCategoryModal';
import CreateNationModal from './CreateNationModal';

const { Option } = Select;

const BookModal = ({
    visible,
    onCancel,
    onSubmit,
    editingBook,
    authors,
    categories,
    fileList,
    setFileList,
    bookData,
    onOk
}) => {
    const [isCreateAuthorModalVisible, setIsCreateAuthorModalVisible] = useState(false);
    const [isCreateCategoryModalVisible, setIsCreateCategoryModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [nations, setNations] = useState([]);
    const [isCreateNationModalVisible, setIsCreateNationModalVisible] = useState(false);

    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };

    // Fetch list of nations
    useEffect(() => {
        const fetchNations = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/nation/list');
                setNations(response.data);
            } catch (error) {
                console.error('Error fetching nations:', error);
                notification.error({ message: 'Error fetching nations', description: error.message });
            }
        };
        fetchNations();
    }, []);

    useEffect(() => {
        if (editingBook) {
            // Đặt giá trị của các trường form
            form.setFieldsValue({
                title: editingBook.title,
                publication_date: editingBook.publication_date.split('-')[0],
                description: editingBook.description,
                author: editingBook.author.map(a => a._id),
                price: editingBook.price,
                quantity: editingBook.quantity,
                category: editingBook.category,
                isbn: editingBook.isbn,
                nationId: editingBook.nation,
            });
    
            // Đặt lại danh sách file nếu sách có ảnh
            setFileList(editingBook.img ? [{ 
                uid: '-1', 
                name: editingBook.img.split('\\').pop(), 
                status: 'done', 
                url: `http://localhost:9999/uploads/${editingBook.img.split('\\').pop()}` 
            }] : []);
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [editingBook, form, setFileList, categories]);

    // Handle form submit
    const handleFormSubmit = async (values) => {
        try {
            const { name, author, nationId } = values;
            const book = { name, author, nation: nationId }; // Add other fields if necessary
            if (bookData) {
                // Update book logic here (if it's editing an existing book)
                await axios.put(`http://localhost:9999/api/book/update/${bookData._id}`, book);
            } else {
                // Create new book logic
                await axios.post('http://localhost:9999/api/book/create', book);
            }
            console.log("book: ", book);
            
            notification.success({ message: 'Book saved successfully' });
            onOk();
            form.resetFields();
        } catch (error) {
            console.error('Error saving book:', error);
            notification.error({ message: 'Error saving book', description: error.message });
        }
    };


    const handleCreateAuthor = (newAuthor) => {
        authors.push(newAuthor);  // Add the new author to the list of authors
        setIsCreateAuthorModalVisible(false); // Close the modal
    };

    const handleCreateCategory = (newCategory) => {
        // Thêm thể loại mới vào danh sách thể loại
        categories.push(newCategory);
        setIsCreateCategoryModalVisible(false);
    };

    const handleCreateNation = (newNation) => {
        // Thêm quốc gia mới vào danh sách quốc gia
        nations.push(newNation);
        setIsCreateNationModalVisible(false);
    };

    return (
        <Modal
            title={bookData ? 'Cập nhật sách' : 'Thêm sách mới'}
            visible={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText="Lưu"
            cancelText="Hủy"
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                initialValues={bookData}
            >
                {/* Tiêu đề sách */}
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Năm xuất bản */}
                <Form.Item
                    label="Năm xuất bản"
                    name="publication_date"
                    rules={[{ required: true, message: 'Vui lòng nhập năm xuất bản!' }]}
                >
                    <Input maxLength={4} />
                </Form.Item>

                {/* Mô tả sách */}
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                {/* Tác giả */}
                <Form.Item
    label="Tác giả"
    name="author"
    rules={[{ required: true, message: 'Vui lòng chọn tác giả!' }]}>
    <Select mode="multiple">
        {editingBook && editingBook.author && (
            <Option key={editingBook.author._id} value={editingBook.author._id}>
                {editingBook.author.full_name}
            </Option>
        )}
        {!editingBook && authors.map(author => (
            <Option key={author._id} value={author._id}>
                {author.full_name}
            </Option>
        ))}
    </Select>
    <Button type="link" onClick={() => setIsCreateAuthorModalVisible(true)}>
        + Tạo mới tác giả
    </Button>
</Form.Item>


                {/* Giá sách */}
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Số lượng sách */}
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Thể loại */}
                <Form.Item
    label="Thể loại"
    name="category"
    rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}>
    <Select mode="multiple">
        {editingBook && editingBook.category.map(categoryId => (
            <Option key={categoryId} value={categoryId}>
                {categories.find(c => c._id === categoryId)?.name}
            </Option>
        ))}
        {!editingBook && categories.map(category => (
            <Option key={category._id} value={category._id}>
                {category.name}
            </Option>
        ))}
    </Select>
    <Button type="link" onClick={() => setIsCreateCategoryModalVisible(true)}>
        + Tạo mới thể loại
    </Button>
</Form.Item>

                {/* ISBN */}
                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[{ required: false, message: 'Vui lòng nhập mã ISBN!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Quốc gia */}
                <Form.Item
                    name="nationId"
                    label="Quốc gia"
                    rules={[{ required: true, message: 'Vui lòng chọn quốc gia' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn quốc gia"
                        onChange={(value) => form.setFieldsValue({ nationId: value })}
                    >
                        {nations.map((nation) => (
                            <Select.Option key={nation._id} value={nation._id}>
                                {nation.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Nút tạo mới quốc gia */}
                <Button
                    type="link"
                    onClick={() => setIsCreateNationModalVisible(true)}
                >
                    Thêm quốc gia mới
                </Button>

                {/* Ảnh đại diện */}
                {!editingBook && (
                    <Form.Item
                        name="img"
                        label="Ảnh đại diện"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện' }]}
                    >
                        <Upload
                            {...uploadProps}
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                )}

                {/* Nút thêm hoặc cập nhật */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editingBook ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </Form.Item>
            </Form>

            {/* CreateAuthorModal */}
            <CreateAuthorModal
                visible={isCreateAuthorModalVisible}
                onCancel={() => setIsCreateAuthorModalVisible(false)}
                onSubmit={handleCreateAuthor}
            />
            {/* CreateCategoryModal */}
            <CreateCategoryModal
                visible={isCreateCategoryModalVisible}
                onCancel={() => setIsCreateCategoryModalVisible(false)}
                onSubmit={handleCreateCategory}
            />
            {/* Modal tạo quốc gia */}
            <CreateNationModal
                isModalVisible={isCreateNationModalVisible}
                setIsModalVisible={setIsCreateNationModalVisible}
                // After creating a new nation, refresh the list of nations
                onCreate={() => {
                    axios.get('http://localhost:9999/api/nation/list').then(response => {
                        setNations(response.data);
                    });
                }}
            />
        </Modal>
    );
};

export default BookModal;
