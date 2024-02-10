import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditProductStatus, GetProducts, UpdateProductStatus, UploadProductStatus } from '../../apicalls/products';
import { SetLoader } from '../../redux/loaderSlice';
import moment from 'moment'


function Products() {

    const [products, setProducts] = React.useState([]);


    const dispatch = useDispatch();
    const getData = async () => {

        try {
            dispatch(SetLoader(true))

            const response = await GetProducts({

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
    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id,status);
            dispatch(SetLoader(false));
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
            
        }

    }




    const colums = [
        {
            title: "Product",
            dataIndex: "name",
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) => {
                return record.seller.name
            }
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
            render: (text,record)=>{
                return record.status.toUpperCase();
            }
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {

                const { status, _id } = record
                return <div className='flex gap-3'>
                    
                    {status === 'pending' && <span className='underline cursor-pointer'
                        onClick={() => onStatusUpdate(_id, "approved")}
                    >Accept</span>}
                    
                    {status === 'pending' && <span className='underline cursor-pointer'
                        onClick={() => onStatusUpdate(_id, "rejected")}
                    >Reject</span>}
                    
                    {status === 'approved' && <span className='underline cursor-pointer'
                        onClick={() => onStatusUpdate(_id, "blocked")}
                    >Block</span>}
                    
                    {status === 'blocked' && <span className='underline cursor-pointer'
                        onClick={() => onStatusUpdate(_id, "approved")}
                    >Unblock</span>}



                </div >
            }
        },


    ]

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <Table columns={colums} dataSource={products} />
        </div>
    );
}

export default Products;
