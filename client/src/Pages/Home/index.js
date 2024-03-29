import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';
import { message } from 'antd';
import { GetProducts } from '../../apicalls/products';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';

function Home() {
  const {user} = useSelector((state)=>state.users)

  const navigate = useNavigate()
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    status: "approved",
  });
  
 
  

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      console.log("Client-side filters:", filters);
      const response = await GetProducts(filters);
      console.log(response)
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();

  }, []);

  return (
    <div className='container'>
      <div className='grid grid-cols-5 gap-5 '>
        {products?.map((product) => (
          <div style={{
            border: '1px solid #ccc', borderRadius: '5px', padding: '10px'
          }} className="flex flex-col gap-1 cursor-pointer hover-highlight"
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}>
            <img src={product.images[0]} className='w-full h-64  object-cover rounded' alt="" />
            <Divider />
            <div>
              <h1>{product.name}</h1>
              <span className=' align-top rupee text-gray-500'>₹</span> <span className='price'> {product.price}</span>
            </div>
          </div>

        ))}
      </div>
    </div>
  );


}


export default Home;
