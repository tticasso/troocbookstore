import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Edit2, Save, X } from 'lucide-react';
import {
    Button,
    Table,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Space,
    Popconfirm,
    message,
    Tag
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    CheckOutlined,
    TruckOutlined,
    EyeOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/order/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    const handleConfirm = async (orderId) => {
        try {
            await axios.put(`http://localhost:9999/api/order/confirm/${orderId}`);
            message.success('Xác nhận đơn hàng thành công!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            message.error('Lỗi khi xác nhận đơn hàng');
        }
    };

    const handleCancel = async (orderId) => {
        try {
            await axios.put(`http://localhost:9999/api/order/cancel/${orderId}`);
            message.success('Hủy đơn hàng thành công!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            message.error('Lỗi khi hủy đơn hàng');
        }
    };

    const handleShipping = async (orderId) => {
        try {
            await axios.put(`http://localhost:9999/api/order/ship/${orderId}`);
            message.success('Chuyển trạng thái đơn hàng thành công!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            message.error('Lỗi khi chuyển trạng thái đơn hàng');
        }
    };

    const handleShowOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    };

    const handleClosePopup = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };


    const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm theo mã đơn hàng"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    <PlusOutlined /> Thêm đơn hàng
                </Button>
            </Space>

            <Table
                dataSource={filteredOrders}
                columns={[
                    { title: 'ID', dataIndex: 'order_id', key: 'order_id' },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        key: 'status',
                        width: 120,
                        filters: [
                            { text: 'PENDING', value: 'pending' },
                            { text: 'CONFIRMED', value: 'confirmed' },
                            { text: 'SHIPPING', value: 'shipping' },
                            { text: 'SUCCESS', value: 'success' },
                            { text: 'CANCEL', value: 'cancel' },

                        ],
                        onFilter: (value, record) => record.status === value,
                        render: (status) => {
                            let color = 'default';
                            switch (status) {
                                case 'cancel':
                                    color = 'red';
                                    break;
                                case 'success':
                                    color = 'green';
                                    break;
                                case 'shipping':
                                    color = 'purple';
                                    break;
                                case 'confirmed':
                                    color = 'blue';
                                    break;
                            }
                            return <Tag color={color}>{status.toUpperCase()}</Tag>;
                        },
                    },
                    {
                        title: 'Ngày đặt hàng',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (date) => moment(date).format('HH:mm DD-MM-YYYY'),
                    },
                    {
                        title: 'Hành động',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                {/* Nút xác nhận, chuyển trạng thái, và hủy đơn hàng */}
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                                    onConfirm={() => handleConfirm(record._id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button type="text" icon={<CheckOutlined />} />
                                </Popconfirm>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn chuyển trạng thái đơn hàng này?"
                                    onConfirm={() => handleShipping(record._id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button type="text" icon={<TruckOutlined />} />
                                </Popconfirm>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn hủy đơn hàng này?"
                                    onConfirm={() => handleCancel(record._id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button type="text" icon={<DeleteOutlined />} />
                                </Popconfirm>
                                {/* Nút xem chi tiết đơn hàng */}
                                <Button
                                    type="text"
                                    icon={<EyeOutlined />}
                                    onClick={() => handleShowOrderDetails(record)}
                                />
                            </Space>
                        ),
                    }

                ]}
                rowKey="_id"
            />

            {showOrderDetails && selectedOrder && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleClosePopup}
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            {/* Thông tin đơn hàng */}
                            <div className="w-1/2 flex-grow">
                                <h3 className="font-bold">Thông tin đơn hàng</h3>
                                <div className="flex flex-col gap-2">
                                    <p><strong>Mã đơn hàng:</strong> {selectedOrder.order_id}</p>
                                    <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.createdAt)}</p>
                                    <p><strong>Phí vận chuyển:</strong> {selectedOrder.shipping_price.toLocaleString()} VND</p>
                                    <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                                    <p><strong>Tên người nhận:</strong> {selectedOrder.name}</p>
                                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                                    <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                                    <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
                                    <p><strong>Ghi chú:</strong> {selectedOrder.note || 'Không có'}</p>
                                </div>
                            </div>

                            {/* Sản phẩm */}
                            <div className="w-1/2 flex-grow">
                                <h3 className="font-bold">Sản phẩm</h3>
                                {selectedOrder.items.map((item) => (
                                    <div key={item._id} className="flex items-start border-b py-2">
                                        <div className="relative">
                                            <img
                                                src={`http://localhost:9999/${item.book_id.img}`}
                                                alt={item.book_id.title}
                                                className="w-16 h-20 object-cover rounded"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <h3 className="font-semibold">{item.book_id.title}</h3>
                                            <p>{item.quantity} x {item.price.toLocaleString()} VND</p>
                                        </div>
                                        <span className="font-semibold">{(item.quantity * item.price).toLocaleString()} VND</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tổng tiền */}
                        <div className="mt-4 border-t flex-col pt-4">
                            <p><strong>Tổng tiền sản phẩm:</strong> {selectedOrder.products_price.toLocaleString()} VND</p>
                            <p><strong>Phí vận chuyển:</strong> {selectedOrder.shipping_price.toLocaleString()} VND</p>
                            <p className="text-xl font-bold">
                                <strong>Tổng cộng:</strong> {selectedOrder.total_price.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderManagement;
