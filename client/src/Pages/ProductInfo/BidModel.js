import { Form, Input, Modal, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { SetLoader } from '../../redux/loaderSlice';
import { PlaceNewBid } from '../../apicalls/products';

function BidModel({
    showBidModal,
    setShowBidModal,
    reloadData,
    product
}) {
    const { user } = useSelector((state) => state.users)
    const formRef = React.useRef(null);
    const rules = [{ required: true, message: "Required" }];
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await PlaceNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id
            })
            dispatch(SetLoader(false))
            if (response.success) {
                message.success("Bid added successfully");
                reloadData();
                setShowBidModal(false)
            }else{
                throw new Error(response.data)
            }

        } catch (error) {
            message.error(error.message);
            dispatch(SetLoader(false))
        }
    }
    return (
        <Modal
            visible={showBidModal}
            onCancel={() => setShowBidModal(false)} // Use onCancel instead of onCancel
            centered width={600}
            onOk={() => formRef.current.submit()}
        >
            <div className='flex flex-col gap-5'>
                <div>
                    <h2>Place A Bid</h2>
                    <Form layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}>

<Form.Item label="Bid Amount" name="bidAmount" rules={[{ required: true, message: 'Required' }]}>
    <Input />
</Form.Item>
<Form.Item label="Message" name="message" rules={[{ required: true, message: 'Required' }]}>
    <Input />
</Form.Item>
<Form.Item label="Mobile no." name="mobile" rules={[{ required: true, message: 'Required' }]}>
    <Input />
</Form.Item>

                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default BidModel;
