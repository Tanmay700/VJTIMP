import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import Divider from '../../components/Divider';
import { RegisterUser } from '../../apicalls/users';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';


const rules = [
  {
    required: true,
    message: 'Field is required',
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    
    try {
      dispatch(SetLoader(true))
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      message.success(response.message);
      window.location.href="/login";

      
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message);
    }
    // Handle the form submission
    console.log('Success values:', values);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/');
    }
  },
    []);


  return (
    <div className="h-screen flex justify-center items-center">
      <div className='Form p-10 rounded max-w-md w-full' >
        <h1 className='text-primary text-2xl mb-4'>
          VJTI MP <span className='text-gray-700 block'>Create Account</span>
        </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label='Name' name='name' rules={rules}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input.Password
              placeholder="Password"
              style={{ border: '1px solid black', borderRadius: '4px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className='bg-primary rounded'
              style={{ display: 'block', width: '100%' }}>
              Register
            </Button>
          </Form.Item>
          <Divider />
          <span className='text-gray-500 block text-center'>
            Already have an account? <Link to="/Login" className='text-primary'>Login</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default Register;
