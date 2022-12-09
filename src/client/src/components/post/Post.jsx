import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
// import Comments from "../comments/Comments";
import img from '../../assets/tải xuống.jpg'
import { useEffect, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../redux/api";
import { getPosts, removePost } from "../../redux/features/postsSlice";
import { toast } from "react-toastify";
const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dataComments, setDataComment] = useState([]);
  const [likes, setLikes] = useState('');
  const navigate=useNavigate();
  const { dataUser } = useSelector(state => ({ ...state.auth }));
  const { error } = useSelector(state => ({ ...state.post }));
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(removePost({ postId: post.id, userId: post.userId }));
    dispatch(getPosts());    
  }
  const handleLike = async () => {
    const checkLiked = likes.find(likes => likes.userId === dataUser.id)
    const res = await API.put(`/api/likes/${post.id}`,checkLiked);
    if (res.status === 200) { 
      fetchLiked();
    }
    
  }
  useEffect(() => {
    fetchLiked();
    fetch();
    error&& toast.error(error)
  }, [error])
  const fetchLiked = async () => {
    const res = await API.get(`/api/likes/${post.id}`);
    if (res.status === 200) {
      setLikes(res.data);
    }
  }
  const fetch = async () => {
    const res = await API.get(`/api/comments/${post.id}`);
    if (res.status === 200) {
      setDataComment(res.data)
    }
  }
  const handleOpenComment = () => {
    setCommentOpen(!commentOpen);
  }
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo" onClick={()=>navigate(`/profile/${post.userId}`)}>
            <img src={dataUser.profilePic?process.env.PUBLIC_URL +`/upload/${dataUser.profilePic}`:img} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{ moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon style={{cursor: 'pointer'}} onClick={() => setMenuOpen(!menuOpen)} />
          {
          menuOpen &&
          <div className='nav-menu'  >
            <ul>
              <li>Profile</li>
              <li onClick={handleDelete} >Delete</li>
            </ul>
          </div>
        }
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={process.env.PUBLIC_URL +`/upload/${post.img}`} alt="" />
        </div>
          <hr />
        <div className="info">
          <div className="item" onClick={()=>handleLike()}>
            {likes&&likes.find(likes => likes.userId === dataUser.id)
              ? <FavoriteOutlinedIcon
              style={{ color: "red" }} />
          :<FavoriteBorderOutlinedIcon/>
            }
            {likes.length} Likes
          </div>
          <div className="item" onClick={handleOpenComment}>
            <TextsmsOutlinedIcon />
            {dataComments.length?dataComments.length:''} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        <hr />
        {commentOpen && <Comments postId={post.id} dataComments={dataComments} fetch={fetch} />}
      </div>
    </div>
  );
};

export default Post;
