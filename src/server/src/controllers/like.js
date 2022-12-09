import { db } from '../config/connectDB.js';

export const getLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const query = 'SELECT userId FROM likes WHERE postId = ?';
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  if (userId) {
    const query = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
    db.query(query, [postId, req.userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  } else {
    const query = 'INSERT INTO likes (`postId`,`userId`) VALUES (?, ?)';
    db.query(query, [postId, req.userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  }
}