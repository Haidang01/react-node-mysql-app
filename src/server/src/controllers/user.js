
import { db } from '../config/connectDB.js';
import bcrypt from 'bcryptjs';

export const getUser = async (req, res) => {

}
export const updateUser = async (req, res) => {
  const id = req.userId;
  const { name, password, coverUrl, profileUrl, website, city } = req.body;
  // UPDATE USER  
  const query = 'UPDATE users SET `name`=? , `coverPic`=? ,`profilePic`=?, `website`=? ,`city`=? WHERE id = ?';
  const values = [name, coverUrl, profileUrl, website, city, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    const q = 'SELECT * FROM users WHERE id =?';
    db.query(q, [req.userId], (err, result) => {
      if (err) return res.status(500).json(err);
      const { password, ...others } = result[0];
      if (result.length === 0) return res.status(404).json('User not exist');
      return res.status(200).json(others);
    })
  })
}
export const getAllUser = async (req, res) => {
  const q = 'SELECT * FROM users  WHERE id != ?';
  db.query(q, [req.userId], (err, result) => {
    if (err) return res.status(500).json(err)
    if (result.length === 0) return res.status(404).json('User not exist');
    const users = result.map(user => {
      const { password, ...others } = user;
      return others;
    })
    return res.status(200).json(users);
  })
}
