
import axiosInstance from "./axiosInstance";

//add new product
export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/add-product",
            payload
        );
        return response.data;
    } catch (error) {
        return error.message;

    }
}
//get products

export const GetProducts = async (filters) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/get-product",
            filters


        );
        return response.data;
    } catch (error) {
        console.log("in productapierror",error) 
        return error.message;

    }
};
// Edit a product
export const EditProduct = async (id, payload) => {

    try {
        const response = await axiosInstance.put(`/api/products/edit-product/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.message;

    }
};

// Delete a product
export const DeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/products/delete-product/${id}`);
        return response.data;
    } catch (error) {
        return { message: error.message };
    }
};
// Upload img
export const UploadProductImage = async (payload, id) => {
    try {
        const response = await axiosInstance.post(`/api/products/upload-image-to-product?id=${id}`, payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

//update product status
export const UpdateProductStatus = async (id, status) => {

    console.log('Status to be updated:', status);
    try {
        const response = await axiosInstance.put(`/api/products/update-product-status/${id}`, { status });
        return response.data;

    } catch (error) {
        return error.message;
        console.log("in cat")
    }
};
//get prod by id
export const GetProductsById = async (id) => {
    try {

        const response = await axiosInstance.get(`/api/products/get-product-by-id/${id}`)
        console.log(response)
        return response.data

    } catch (error)
    {
        return error.message

    }}
    //place bid
    export const PlaceNewBid = async (payload) => {
        try {
            const response = await axiosInstance.post("/api/bids/place-new-bid", payload)
            return response.data;
        } catch (error) {
            return error.message
        }
    }
    //get all bids
    export const GetAllBids = async (filters) => {
        try {
            const response = await axiosInstance.post("/api/bids/get-all-bid", filters)
            return response.data

        } catch (error) {
            return error.message
        }
    }

