import React, { useState } from 'react'
import './NavBar.scss';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
  const { dataUser } = useSelector(state => ({ ...state.auth }));
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout({navigate, toast}));
  }
  return (
    <div className='navbar'>
      <div className="left">
        <span>{dataUser.name}</span>
        <HomeOutlinedIcon onClick={()=>navigate('/')} style={{cursor:'pointer'}} />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search...' />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={() => { setOpenMenu(!openMenu);  }}>
          <img src={process.env.PUBLIC_URL+`/upload/${dataUser.profilePic}`} alt="" />
          <span>{ dataUser.name}</span>
        </div>
        {
          openMenu &&
          <div className='nav-menu'  >
            <ul>
                <li onClick={() => { setOpenMenu(false); navigate(`/profile/${dataUser.id}`) }}>Profile</li>
              <li onClick={handleLogout} >LogOut</li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar
