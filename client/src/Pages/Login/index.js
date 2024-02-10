import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import Divider from '../../components/Divider';
import { loginUser } from '../../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';
const rules = [
    {
        required: true,
        message: 'Field is required',
    },
];

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function onFinish(values) {
        // Handle the form submission
        try {
            dispatch(SetLoader(true))
            const response = await loginUser(values);
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                navigate("/")
            } else {
                throw new Error(response.message);
            }
        }
        catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message);

        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    },
    []);

    return (
        <div className="h-screen flex justify-center items-center">
            <div className='Form p-10 rounded max-w-md w-full' >
                <h1 className='text-primary text-2xl mb-4'>
                    VJTI MP <span className='text-gray-700 block'>Login</span>
                </h1>
                <Form layout="vertical" onFinish={onFinish}>
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
                            className='bg-primary rounded Login'
                            style={{ display: 'block', width: '100%' }}>
                            Login
                        </Button>
                    </Form.Item>
                    <Divider />
                    <span className='text-gray-500 block text-center'>
                        <Link to="/Register" className='text-primary'> Create your account</Link>
                    </span>
                </Form>
            </div>
        </div>
    );
}

export default Login;
