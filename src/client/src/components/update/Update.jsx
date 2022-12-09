import { useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../redux/api";
import { editUser, fetchProfile, setDataProfile } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const Update = ({ setOpenUpdate }) => {
  const [cover, setCover] = useState(null);
  const { dataProfile,dataUser,success } = useSelector(state => ({ ...state.auth }));

  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: dataUser.email,
    name: dataUser.name,
    city: dataUser.city,
    website: dataUser.website,
  });
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("File", file);
      const res = await API.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : dataUser.coverPic;
    profileUrl = profile ? await upload(profile) : dataUser.profilePic;
    if (coverUrl && profileUrl) { 
      const data = { ...texts, coverUrl, profileUrl };
      dispatch(editUser(data));
      dispatch(fetchProfile(dataProfile.id))
      window.location.reload();
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }
  }
    return (
      <div className="update">
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={ "/upload/" + dataUser.coverPic}
                    alt=""
                  />
                  <CloudUploadIcon  className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={ "/upload/" + dataUser.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Email</label>
            <input
              disabled
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
            
            <label>Name</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <label>Country / City</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={texts.website}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            close
          </button>
        </div>
      </div>
    );
  };
export default Update;
