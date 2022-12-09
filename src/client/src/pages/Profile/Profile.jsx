import "./Profile.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, profile } from "../../redux/features/authSlice";
import {  getRelationship } from "../../redux/features/relationshipSlice";
import { API } from "../../redux/api";
import Share from '../../components/share/Share'
import Update from "../../components/update/Update";
const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { dataProfile,dataUser } = useSelector(state => ({ ...state.auth }));
  const { dataRelationships } = useSelector(state => ({ ...state.relationship }));
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(fetchProfile(userId));
     dataUser.id&& dispatch(getRelationship(userId))
  }, [userId])
  const handleFollow = async() => {
    const check = dataRelationships.find(user => dataUser.id == user.followerUserId);
    const res = await API.put(`/api/relationships/${userId}`, check);
    if (res.status === 200) {
      dispatch(fetchProfile(userId));
      dispatch(getRelationship(userId))
    }
  };
   
  return (
    <div className="profile">
          <div className="images">
            <img src={process.env.PUBLIC_URL +`/upload/${dataProfile.coverPic}`} alt="" className="cover" />
            <img src={process.env.PUBLIC_URL +`/upload/${dataProfile.profilePic}`} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{dataProfile.name}</span>
                <span>{dataProfile?.ban}</span>
              </div>
            </div>
              <div className="info">
          <div className="items">
            <div className="item">
              <PlaceIcon/>
              <span>{dataProfile?.city}</span>
            </div>
            <div className="item">
                <EmailOutlinedIcon/>
                <span>{dataProfile?.email}</span>
            </div>
            <div className="item">
              <LanguageIcon/>
              <span>{dataProfile?.website}</span>
            </div>
          </div>
                <div className="button">
            {dataUser.id !== dataProfile.id
              ?
              <button className="follow" onClick={handleFollow}>
                {
                  dataRelationships.find(user=>dataUser.id==user.followerUserId)?'following':'follow'
                }
              </button>
              :
              <button className="edit" onClick={()=>setOpenUpdate(true)}><CreateOutlinedIcon />Edit profile</button>
            }</div>
            </div>
        </div>
            <Share/>
            <Posts userId={userId} />
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} dataUser={dataUser} />}
    </div>
  );
};

export default Profile;
