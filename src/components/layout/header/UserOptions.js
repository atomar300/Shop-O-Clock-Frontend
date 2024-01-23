import React, { Fragment, useState } from "react";
import "./Header.css"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import profilePng from "../../../images/user-profile-icon-free-vector.jpg";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { toast } from "react-toastify";


const UserOptions = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    // const alert = useAlert();

    const { cartItems } = useSelector(state => state.cart);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    user.roles.forEach(element => {
        if (element.name === "ROLE_ADMIN") {
            options.unshift({
                icon: <DashboardIcon />,
                name: "Dashboard",
                func: dashboard,
            })
        }
    });


    function dashboard() {
        navigate("/dashboard")
    }

    function orders() {
        navigate("/orders")
    }

    function account() {
        navigate("/account")
    }

    function cart() {
        navigate("/cart")
    }

    function logoutUser() {
        dispatch(logout())
        toast.success("Logout Successfully");
        // alert.success("Logout Successfully");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className="speedDial"
                ariaLabel="SpeedDial controlled open example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="up"
                icon={<img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : profilePng}
                    alt="Profile"
                />}
            >
                {options.map(item => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth < 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions;