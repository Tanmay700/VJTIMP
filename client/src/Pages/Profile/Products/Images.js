import { Button, Upload, message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { EditProduct, UploadProductImage } from '../../../apicalls/products';

function Images({
    selectedProduct,
    getData,
    setSelectedProduct,
    setShowProductsForm
}
) {
    const [showPreview, setShowPreview] = React.useState(true);
    const [images, setImages] = React.useState([]);

    const [file = null, setFile] = React.useState(null);
    const dispatch = useDispatch();
    const upload = async () => {
        try {
            dispatch(SetLoader(true));
            console.log(file)
            //upload img
            const formData = new FormData();
            formData.append("file", file);
            formData.append("productId", selectedProduct._id);
            const response = await UploadProductImage(formData);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                setImages([...images, response.data]);
                setShowPreview(false);
                setFile(null);
                getData();

            } else {
                message.error(response.message)
            }

        } catch (error) {
            console.error(error);
            dispatch(SetLoader(false))
            message.error(error.message)
        }

       


    }
    const deleteImage=async(image)=>{
try {
    const updatedImagesArray = images.filter((img)=> img!==image);
    const updateProduct={...selectedProduct,images: updatedImagesArray};
    const response = await EditProduct(
        selectedProduct._id,
        updateProduct);
        if(response.success){
            message.success("Deleted successfully");
            setImages(updatedImagesArray);
            getData();
        }else{
            throw new Error(response.message);
        }
    dispatch(SetLoader(true))
} catch (error) {
    dispatch(SetLoader(false))
    message.error(error.message)
}
    }
    React.useEffect(() => {
        setImages(selectedProduct?.images || []);
    }, [selectedProduct]);
    


    return (
        <div>
                <div className='flex gap-5 mb-5'>
                {images.map((image) => {
                    return (
                        <div className='flex gap-2 rounded border-solid border-gray-300 '>
                            <img className='h-20 w-20 object-cover p-1' src={image} alt="" />
                            <i className="ri-close-fill" onClick={() => deleteImage(image)}></i>
                        </div>

                    )
                })}

            </div>
            
            
            
            <Upload
            listType='picture'
            beforeUpload={() => false}
            onChange={(info) => {
                setFile(info.file);
                setShowPreview(true);
            }}

            showUploadList={showPreview}>
        
            <div className='p-5'>
                <Button
                    type="default"
                >
                    Upload Image
                </Button>
            </div>
        </Upload>
            <div className='flex justify-end gap-4 mt-5' >
                <Button
                    type="primary"
                    onClick={() => {
                        setShowProductsForm(false)
                    }}>
                    Cancel

                </Button>
                <Button
                    type='default'
                    onClick={upload}>
                    Upload

                </Button>
            </div>
        </div>
    )
}


export default Images