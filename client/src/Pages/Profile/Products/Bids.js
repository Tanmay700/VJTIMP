import React, { useEffect } from 'react'
import { Modal, Table, message } from "antd"
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { GetAllBids } from '../../../apicalls/products';
import moment from 'moment';

function Bids({
    showBidsModal,
    setShowBidsModal,
    selectedProduct
}) {
    const dispatch = useDispatch();
    const [bidsData, setBidsData] = React.useState([]);
    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllBids({
                product: selectedProduct._id,
            });
            dispatch(SetLoader(false));
            if (response.success) {
                setBidsData(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render:(text, record)=>{
                return record.buyer.name
            }
        },
        {
            title: "Bid Amount",
            dataIndex: "bidAmount"
        },
        {
            title: "Message",
            dataIndex: "message"
        },

        {
            title: "Bid Data",
            dataIndex: "bidDate",
            render: (text, record) => {
                return moment(text).format("DD/MM/YYYY")
            }
        },
        {
            title: "Contact details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return (
                    <div>
                        <p>
                            Phone: {record.mobile}
                        </p>
                        <p>
                            Email: {record.buyer.email}
                        </p>
                    </div>
                )

            }
        },

    ]
    useEffect(() => {
        if (selectedProduct) {
            getData();
        }
    }, [selectedProduct]);

    return (
        <Modal  title='Bids'
        visible={showBidsModal}
        onCancel={() => setShowBidsModal(false)}
        centered
        width={1200}
        footer={null}>
            <h1 className='text-xl'>
                {selectedProduct.name}
            </h1>
            <Table columns={columns} dataSource={bidsData} />
        </Modal>
    )
}
export default Bids