import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SetLoader } from '../../redux/loaderSlice';
import { Button, Divider, message } from 'antd';
import { GetAllBids, GetProducts, GetProductsById } from '../../apicalls/products';
import moment from 'moment';
import BidModel from './BidModel';


function ProductInfo() {
    const {user}= useSelector((state)=>state.users)

    const[showAddNewBid, setShowAddNewBid]=React.useState(false)
    const dispatch = useDispatch();
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProducts] = React.useState(null)
    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const bidsResponse = await GetAllBids({product:id})
            const response = await GetProductsById(id)
            dispatch(SetLoader(false));
            if (response.success) {
                const bidsResponse = await GetAllBids({ product: id });
            
                setProducts({
                    ...response.data,
                    bids: bidsResponse.data,
                });
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    React.useEffect(() => {
        getData();

    }, []);
    return (
        product && <div>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col gap-5'>
                    <img
                        src={product.images[selectedImageIndex]} alt=''
                        className='image-fluid object-cover rounded-md' />

                    <div className='flex gap-5'>
                        {product.images.map((image, index) => {
                            return (
                                <img
                                    className={
                                        'w-20 h-20 object-cover rounded-md cursor-pointer hover-highlight' + (selectedImageIndex === index ?
                                            "border-2  border-solid hover-highlight"
                                            : "")
                                    }
                                    onClick={() => setSelectedImageIndex(index)}
                                    src={image} alt="" />
                            )
                        })}
                    </div>


                </div>
                <div>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <h2 className='p-5'>{product.name}</h2>
                            <Divider />
                            <span className='p-5'>
                                <span className='rupee align-top '>₹</span>  <span className='price'>{product.price}</span>
                                <Divider/>
                                <div className='grid grid-cols-2 gap-10 center'>
  <Button className='bg-orange-600 buy ' disabled={user._id === product.seller._id}>
    Buy
  </Button>

  <Button className='bg-yellow-400 buy'  disabled={user._id === product.seller._id} onClick={()=> setShowAddNewBid(!showAddNewBid)}>
    Bid
  </Button>
</div>

                                <Divider />
                                <span className='p-5'>
                                    {product.description}
                                </span>
                                <Divider />
                                <div className='flex flex-col'>
                                    <h3 className='p-5 underline text-xl'>Product Details</h3>
                                    <div className='flex justify-between mt-3'>
                                        <span>Category</span><span>{product.category}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>  Age
                                        </span><span>{product.age}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>Bill Available</span><span>{product.billAvailable ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>Warranty Available</span><span>{product.warrantyAvailable ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>Orignal Accessories</span><span>{product.orignalAccessories ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>Orignal Box</span><span>{product.orignalBox ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-3'>
                                    <span>Added On</span><span>{moment(product.createdAt).format('DD-MM-YYYY')}</span>
                                </div>




                                <Divider />
                                <div className='flex flex-col'>
                                    <h3 className='p-5 underline text-xl'>Owner Details</h3>
                                    <div className='flex justify-between mt-3'>
                                        <span>Name</span><span>{product.seller.name}</span>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span>  Email
                                        </span><span>{product.seller.email}</span>
                                    </div>



                                </div>

                            </span>
                        </div>
                    </div>
                </div>

            </div>
            {showAddNewBid &&<BidModel
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
        
            />}
        </div>
    )
}

export default ProductInfo