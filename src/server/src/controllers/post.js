import { db } from "../config/connectDB.js";
import moment from 'moment';

export const getPosts = (req, res, next) => {
  const q = `SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId= ?
  ORDER BY p.createdAt DESC`;
  db.query(q, [req.userId, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}
export const getPostCurrent = (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  const q = `SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId=?  
  ORDER BY p.createdAt DESC`;
  db.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}

export const addPost = async (req, res) => {
  const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUE (?)"
  const values = [
    req.body.desc,
    req.body.img,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    req.userId
  ];
  db.query(q, [values], (err, result) => {
    if (err) return res.status(500).json(err);
    const q = `SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId= ?
    ORDER BY p.createdAt DESC`;
    db.query(q, [req.userId, req.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })
  })
}
//DELETE POST
export const deletePost = async (req, res) => {
  const { postId, userId } = req.params;
  if (userId == req.userId) {
    const q = `DELETE FROM posts WHERE  id=?`;
    db.query(q, [postId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json('Delete post successfully');
    })
  } else {
    return res.status(500).json("You don't have permission to delete this post!");
  }
}