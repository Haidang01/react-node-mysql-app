import { db } from "../config/connectDB.js";
import moment from "moment";
export const getComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const query = 'SELECT c.*,u.id AS userId,name,profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC';
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      return res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}
export const addComment = async (req, res) => {
  try {
    const { postId, desc } = req.body;
    const query = 'INSERT INTO comments(`desc`, `createdAt`,`userId`,`postId`) VALUES(?)';
    const values = [
      desc,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.userId,
      postId,
    ]
    db.query(query, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}