// users.js (API calls)// users.js (API calls)
import axiosInstance from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(`api/users/register`, payload);
    return response.data; // Return the response data on success
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during user registration.' };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(`api/users/login`, payload);
    return response.data; // Return the response data on success
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during user login.' };
  }
};


// get curr user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/api/users/get-current-user');
    console.log("GetCurrentUser Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetCurrentUser Error:", error.message);
    return error.message;
  }
};

//get all usr

export const GetAllUsers= async()=>{
  try {
    const response= await axiosInstance.get('/api/users/get-all-users');
    return response.data;
  } catch (error) {
    return error.message
  }
};
//update status

export const UpdateUserStatus = async(id,status)=>{
  try {
    const response = await axiosInstance.put(`/api/users/update-user-status/${id}`, {status})
    return response.data;
  } catch (error) {
    return error.message
  }
}


