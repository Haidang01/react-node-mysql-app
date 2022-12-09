import { useContext, useEffect, useState } from "react";
import "./comments.scss";
// import moment from "moment";
import img from '../../assets/tải xuống.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getComment, postComment } from "../../redux/features/commentSlice";
import moment from "moment";
import { toast } from 'react-toastify'
import axios from "axios";
import { API } from "../../redux/api";
const Comments = ({ postId,fetch,dataComments }) => {
  const [desc, setDesc] = useState("");
  const { dataUser } = useSelector(state => ({ ...state.auth }));
  const {loading, dataComment,error } = useSelector(state => ({ ...state.comment }));
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (!desc) {
      toast.error('Please enter comment')
    } else {
      const data={desc,postId}
      dispatch(postComment(data))
      .then(() => {
        fetch();
        setDesc('');
      })
    }
  }
  
  return (
    <div className="comments">
      <div className="write">
       <img src={dataUser.profilePic?process.env.PUBLIC_URL +`/upload/${dataUser.profilePic}`:img} alt="" />

        <input
          type="text"
          placeholder="write a comment..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {
        error ?
          <div className="error">
          <span>ERROR!</span>
          </div>
        :
          loading ?
            <div className="loading"><span>Loading...</span></div>
          :
          dataComments.length == 0 ?
            <p style={{textAlign:'center'}}>No comments yet.</p>
          : dataComments.map((comment,index) => (
            <div className="comment" key={index}>
              <img src={process.env.PUBLIC_URL+`/upload/${comment.profilePic}`} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
               {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
