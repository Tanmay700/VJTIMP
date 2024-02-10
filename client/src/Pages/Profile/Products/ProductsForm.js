import { Col, Input, Modal, Row, Tabs, message } from 'antd';
import Form from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import Images from './Images';

const additionalThngs = [
    {
        label: "Bill Available",
        name: "billAvailable"
    },
    {
        label: "Warranty Available",
        name: "warrantyAvailable"
    },
    {
        label: "Orignal Accessories",
        name: "orignalAccessories"
    },
    {
        label: "Orignal Box",
        name: "orignalBox"
    },
];





function ProductsForm({
    showProductsForm,
    setShowProductsForm,
    selectedProduct,
    getData

}) {

    const [selectTab, setSelectedTab] = React.useState("1");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users)

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await EditProduct(selectedProduct._id, values)

            } else {
                values.seller = user._id;
                values.status = "pending";
                response = await AddProduct(values);
            }

            if (response.success) {
                message.success(response.message);
                getData();
                setShowProductsForm(false);

            } else {

                message.error(response.message);
                dispatch(SetLoader(false));
            }
            console.log("Success: ", values)
            dispatch(SetLoader(false));
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }

    };
    const formRef = React.useRef(null);

    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct)
        }
    }, [selectedProduct])
    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]
    return (
        <Modal
            title=""
            open={showProductsForm}
            onCancel={() => setShowProductsForm(false)}
            centered
            className='rounded Model'
            width={1000}
            okText="Save"
            onOk={() => {
                formRef.current.submit();
            }}
            {...(selectTab==="2" && { footer: false })}

            >
            
            <div>
                <h1 className='text-2xl text primary'>
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </h1>
                <Tabs defaultActiveKey='1'
                activeKey= {selectTab}
                onChange={(key)=> setSelectedTab(key)}>
                    <Tabs.TabPane tab='Product Details' key='1'>
                        <Form
                            layout="vertical"
                            ref={formRef}
                            onFinish={onFinish}
                        >
                            <Form.Item label="Name" name='name' rules={rules}>
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item label="Description" name='description' rules={rules}>
                                <TextArea type='text' />
                            </Form.Item>
                            <Row
                                gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="Price" name='price' rules={rules}>
                                        <Input type='number' />
                                    </Form.Item>


                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Category" name='category' rules={rules}>
                                        <select>
                                            <option>Select</option>
                                            <option value="electronics" > Electronics</option>
                                            <option value="fashion" >Fashion</option>
                                            <option value="sports">Sports</option>
                                            <option value="books" >Books</option>
                                            <option value="furniture" >Furniture</option>
                                            <option value="others" >Others</option>
                                        </select>


                                    </Form.Item>


                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Age" name='age' rules={rules}>
                                        <Input type='String' />
                                    </Form.Item>


                                </Col>
                            </Row>
                            <div className='flex gap-10'>
                                {additionalThngs.map((item) => {
                                    return (
                                        <Form.Item label={item.label} name={item.name} valuePropName="checked">
                                            <Input type="checkbox" className='chekbox'
                                                value={item.name}
                                                onChange={(e) => {
                                                    formRef.current.setFieldValue({
                                                        [item.name]: e.target.checked,
                                                    })
                                                }} />
                                        </Form.Item>
                                    )
                                })}
                            </div>


                        </Form>


                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Images" key='2'>
                        <Images selectedProduct={selectedProduct} getData={getData} setShowProductsForm={setShowProductsForm}/>
                    </Tabs.TabPane>

                </Tabs>
            </div>


        </Modal>
    );
}

export default ProductsForm;
