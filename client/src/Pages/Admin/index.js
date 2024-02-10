import { Tabs, message } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect } from 'react'
import Users from './Users'
import Products from './Products'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function Admin() {
    const navigate = useNavigate();
    const {user}=useSelector((state)=> state.users);
    useEffect(() => {
        // Ensure user is not null or undefined before checking the role
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Tabs>
                <Tabs.TabPane tab="Products" key="1">
                    <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="2">
                    <Users />
                </Tabs.TabPane>
            </Tabs>
        </div>

    )
}

export default Admin