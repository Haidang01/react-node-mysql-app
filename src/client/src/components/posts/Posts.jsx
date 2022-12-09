import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostCurrent, getPosts } from "../../redux/features/postsSlice";
import Post from "../post/Post";
import "./posts.scss";


const Posts = ({userId}) => {
  const {dataPost,loading} = useSelector(state => ({ ...state.post }))
  const dispatch = useDispatch();
  useEffect(() => {
    userId ?
      dispatch(getPostCurrent(userId)) :
    dispatch(getPosts())
  }, [])
  return (
    <div className="posts">
      {loading ? "Loading..." : dataPost.length == 0 ?
        <span style={{ textAlign: 'center' }}>
          Post not found
      </span>
          :
        dataPost.map((post) => <Post post={post} key={post.id} />)
      }
      
    </div>
  );
};

export default Posts;
