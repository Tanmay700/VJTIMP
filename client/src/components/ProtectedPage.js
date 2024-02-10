import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from "react-router-dom";
import DropDownProfile from './DropDownPage';
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from '../redux/loaderSlice';
import { SetUser } from '../redux/usersSlice';


function ProtectedPage({ children }) {
    const { user } = useSelector((state) => state.users);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateToken = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetCurrentUser();
            dispatch(SetLoader(false))
            if (response.success) {
                dispatch(SetUser(response.data))
            }
            else {
                message.error(response.message);
                navigate("/login");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error("You are not authorized to access this page.");
                navigate("/login");
            } else {
                message.error(error.message);
                console.error("Error validating token:", error);
            }
            dispatch(SetLoader(false))
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        console.log("User:", user);
    }, [user]);

    return (
        <div>
            <div className="flex justify-between items-center bg-primary p-5">

                <h1 className='text-2xl text-white p-5 bg-primary protheader hover-highlight rounded font-bold' onClick={() => {
                    navigate("/")}
                }>
                    VJTI MP
                </h1>
                <div className='py-2 px-5 ProtProfile'>
                    <div className='Name text-white p-1 hover-highlight rounded' onClick={() => setOpenProfile((prev) => !prev)}>
                        Hello, {user?.name}
                        <div className='Acc'>
                            Account
                        </div>
                    </div>

                    {
                        openProfile && <DropDownProfile />
                    }


                </div>
            </div>
            <div className='p-5'>{children}</div>
        </div>
    );
}

export default ProtectedPage;