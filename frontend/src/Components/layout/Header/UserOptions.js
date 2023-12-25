import React, { Fragment, useState } from 'react'
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/PersonAdd"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import ShoppingCartItem from "@material-ui/icons/ShoppingCart"
import { logout } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import "./UserOption.css"
import { useNavigate } from 'react-router-dom';
const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const {cartItems} = useSelector((state) => state.cart)
    const options = [
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ShoppingCartItem/>, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser}
    ]

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon/>,
            name: "Dashboard",
            func: dashboard
        })
    }

    function dashboard() {
       navigate("/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }

    function logoutUser() {
        dispatch(logout())
      alert.success("Logout Successfully")
      navigate('/')
    }

  return <Fragment>
    <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial style={{ zIndex: "11" }} className='speedDial' ariaLabel='speedDial tooltip example' direction='down' onClose={()=> setOpen(false)} onOpen={()=> setOpen(true)} open={open} icon={<img src={user.avatar.url} className='speedDialIcon' alt='Profile'/>}>

    {options.map((item)=>(
        <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true : false}/>
))}
    </SpeedDial>
  </Fragment>
}

export default UserOptions
