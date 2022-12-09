import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { API } from "../../redux/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sharePost } from "../../redux/features/postsSlice";
import img from '../../assets/tải xuống.jpg';
const Share = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { dataUser } = useSelector(state => ({ ...state.auth }));
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("File", file);
      const res = await axios.post("http://localhost:8080/api/upload", formData);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (file) {
      const imgUrl = await upload();
      console.log(imgUrl);
      if (imgUrl) {
        const data = { desc, img: imgUrl }
        dispatch(sharePost(data));
        setDesc("");
        setFile(null);
      } 
    }
    const data = { desc }
    dispatch(sharePost(data));
    
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={process.env.PUBLIC_URL +`/upload/${dataUser.profilePic}`} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${dataUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
