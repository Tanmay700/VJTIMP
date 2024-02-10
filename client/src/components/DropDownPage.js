import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DropDownProfile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);

    return (
        <div>
            <ul className="flex p-5 DropDownProfile">

                <li className="p-1 Profile"
                    onClick={() => {
                        if (user.role === "user") {
                            navigate("/profile")

                        } else {
                            navigate("/admin")
                        }
                    }}
                > Profile</li>

                <li
                    className="p-1 Logout"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</li>

            </ul>
        </div>
    );
};

export default DropDownProfile;
