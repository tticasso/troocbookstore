import React, { useEffect, useState } from 'react';
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
    message,
    Upload
} from 'antd';
import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
    LockOutlined,
    UnlockOutlined,
    DeleteOutlined, UploadOutlined
} from '@ant-design/icons';

import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nations, setNations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingBook, setEditingBook] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const booksData = await axios.get('http://localhost:9999/api/book/list');
        const authorsData = await axios.get('http://localhost:9999/api/author/list');
        const categoriesData = await axios.get('http://localhost:9999/api/category/list');
        const nationsData = await axios.get('http://localhost:9999/api/nation/list');
        setBooks(booksData.data);
        setAuthors(authorsData.data);
        setCategories(categoriesData.data);
        setNations(nationsData.data);
    };

    // Hàm lấy tên tác giả từ danh sách tác giả dựa trên authorId
    const getAuthorName = (authorId) => {
        if (!authorId) { 
            return 'Không rõ';
        }
        const author = authors.find((a) => a._id === authorId._id);
        return author ? author.full_name : 'Không rõ';
    };

    // Hàm lấy tên category từ danh sách category dựa trên categoryId
    const getCategoryNames = (categoryIds) => {
        return categoryIds
            .map((id) => {
                const category = categories.find((c) => c._id === id);
                return category ? category.name : 'Không rõ';
            })
            .join(', ');
    };

    // Hàm lấy tên quốc gia từ danh sách nations dựa trên nationId
    const getNationName = (nationId) => {
        const nation = nations.find((n) => n._id === nationId);
        return nation ? nation.name : 'Không rõ'; 
    };

    const handleFormSubmit = async (values) => {
        const formData = new FormData();

        if (values.img && values.img[0]) {
            formData.append('img', values.img[0].originFileObj); // Đính kèm file ảnh
        }

        // Chuyển đổi năm xuất bản thành định dạng date
        const publicationDate = moment(`${values.publication_date}-01-01`).format('YYYY-MM-DD');
        values.publication_date = publicationDate;

        Object.keys(values).forEach(key => {
            if (key !== 'img') {
                formData.append(key, values[key]);
            }
        });

        if (fileList.length > 0) {
            formData.append('img', fileList[0].originFileObj);
        } else if (values.img) {
            formData.append('img', values.img);
        }

        try {
            if (editingBook) {
                await axios.put(`http://localhost:9999/api/book/update/${editingBook._id}`, formData);
                message.success('Cập nhật sách thành công!');
            } else {
                await axios.post('http://localhost:9999/api/book/create', formData);
                message.success('Thêm sách mới thành công!');
            }
            fetchData();
            setIsModalVisible(false);
            form.resetFields();
            setEditingBook(null);
            setFileList([]);
        } catch (error) {
            console.error('Error saving book:', error);
            message.error('Đã xảy ra lỗi khi lưu sách!');
        }
    };

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

    const handleEdit = (book) => {
        setEditingBook(book);
        form.setFieldsValue({
            ...book,
            publication_date: moment(book.publication_date).format('YYYY'),
            category: book.category
        });
        setIsModalVisible(true);
        setFileList([]); 
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAuthorName(book.author).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCategoryNames(book.category).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getNationName(book.nation).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:9999/api/book/delete/${bookId}`);
            message.success('Xóa sách thành công!');
            fetchData();
        } catch (error) {
            console.error('Error deleting book:', error);
            message.error('Lỗi khi xóa sách');
        }
    };

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col>
                    <Input
                        placeholder="Tìm kiếm theo tiêu đề, tác giả, thể loại hoặc quốc gia"
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: 400 }}
                    />
                </Col>
                <Col>
                    <Button type="primary" onClick={() => setIsModalVisible(true)}>
                        Thêm sách mới
                    </Button>
                </Col>
            </Row>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Thêm sách mới
            </Button>
            <Table
                dataSource={filteredBooks}
                columns={[
                    // Các cột khác...
                    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
                    { title: 'Tác giả', dataIndex: 'author', key: 'author', render: (authorId) => getAuthorName(authorId) },
                    { title: 'Ảnh', dataIndex: 'img', key: 'img', render: (img) => <img src={`http://localhost:9999/uploads/${img.split('\\').pop()}`} alt="book"  /> },
                    { title: 'Thể loại', dataIndex: 'category', key: 'category', render: (categoriesIds) => getCategoryNames(categoriesIds) },
                    { title: 'Mô tả', dataIndex: 'description', key: 'description',className: "truncate max-w-[300px]" },
                    { title: 'Quốc gia', dataIndex: 'nation', key: 'nation', render: (nationId) => getNationName(nationId), className: 'text-center' },
                    { title: 'Giá', dataIndex: 'price', key: 'price', className: 'text-center' },
                    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', className: 'text-center' },
                    { title: 'Năm xuất bản', dataIndex: 'publication_date', key: 'publication_date', render: date => moment(date).format('YYYY'), className: 'text-center' },
                    {
                        title: 'Hành động',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={() => handleEdit(record)}
                                />
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa cuốn sách này?"
                                    onConfirm={() => handleDelete(record._id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                    />
                                </Popconfirm>
                            </Space>
                        ),
                    },
                    // Các cột khác...
                ]}
                rowKey="_id"
            />

            <Modal
                title={editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingBook(null);
                    setFileList([]);
                }}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Năm xuất bản"
                        name="publication_date"
                        rules={[
                            { required: true, message: 'Vui lòng nhập năm xuất bản!' },
                            {
                                pattern: /^\d{4}$/,
                                message: 'Năm xuất bản phải là 4 chữ số!'
                            },
                            {
                                validator: (_, value) => {
                                    const year = parseInt(value);
                                    if (year >= 1000 && year <= 3000) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Năm xuất bản phải từ 1000 đến 3000!');
                                }
                            }
                        ]}
                    >
                        <Input maxLength={4} />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Vui lòng chọn tác giả!' }]}
                    >
                        <Select>
                            {authors.map(author => (
                                <Option key={author._id} value={author._id}>
                                    {author.full_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
                    >
                        <Select mode="multiple">
                            {categories.map(category => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ISBN"
                        name="isbn"
                        rules={[{ required: false, message: 'Vui lòng nhập mã ISBN!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Quốc gia"
                        name="nation"
                        rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}
                    >
                        <Select>
                            {nations.map(nation => (
                                <Option key={nation._id} value={nation._id}>
                                    {nation.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {!editingBook && (
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingBook ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BookManagement;
