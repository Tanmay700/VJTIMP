import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react';
import ProductsForm from './ProductsForm';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loaderSlice';
import moment from 'moment'
import Bids from './Bids';


function Products() {
    const [showBids, setShowBids] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const { user } = useSelector(state => state.users)

    const [showProductsForm, setShowProductsForm] = React.useState(false);

    const dispatch = useDispatch();
    const getData = async () => {

        try {
            dispatch(SetLoader(true))

            const response = await GetProducts({
                seller: user._id
            }
            );

            dispatch(SetLoader(false))
            if (response.success) {
                setProducts(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }



    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success("Product deleted successfully");
                getData();
            } else {
                message.error("Something went wrong")
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error("something went wrong")
        }
    }
    const colums = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },

        {
            title: "Price",
            dataIndex: "price",
        },

        {
            title: "Category",
            dataIndex: "category",
        },

        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },

        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {

                return <div className='flex gap-5'>
                    <i className="ri-edit-2-line"
                        onClick={() => {
                            setSelectedProduct(record)
                            setShowProductsForm(true)
                        }
                        }></i>
                    <i className="ri-delete-bin-line" onClick={() =>
                        deleteProduct(record._id)}></i>

                    <span className='underline cursor-pointer'
                        onClick={() => {
                            setSelectedProduct(record);
                            setShowBids(true);
                        }}>
                        Show Bids
                    </span>
                </div >
            }
        },

    ]

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div className='flex justify-end '>
                <Button
                    type='default'
                    className='rounded'
                    onClick={() => {
                        setSelectedProduct(null)
                        setShowProductsForm(true)
                    }}>
                    Add Product
                </Button>

            </div>

            <Table columns={colums} dataSource={products} />
            {showProductsForm && <ProductsForm showProductsForm={showProductsForm} setShowProductsForm={setShowProductsForm} selectedProduct={selectedProduct} getData={getData} />

            }
            {showBids && (
                <Bids
                    showBidsModal={showBids}
                    setShowBidsModal={setShowBids}
                    selectedProduct={selectedProduct}
                    getData={getData} />


            )}

        </div>
    );
}

export default Products;
