import { db } from "../config/connectDB.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
//REGISTER
export const register = async (req, res) => {

  const { username, email, password, name } = req.body;
  //CHECK USER EXISTS
  const salt = await bcrypt.genSalt(10);

  const q = "SELECT * FROM users WHERE username =?";
  db.query(q, [username], (err, data) => {

    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('User already exists');

    //HASH_PASSWORD
    const hashPass = bcrypt.hashSync(password, salt);
    const profilePic = 'avatar.jpg';
    const coverPic = 'cover.png';
    //CREATE USER
    const q = 'INSERT INTO users (`username`, `email`, `password`,`name`,`profilePic`,`coverPic`) VALUE (?,?,?,?,?,?)'
    db.query(q, [username, email, hashPass, name, profilePic, coverPic], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully");
    })
  })

}

//LOGIN
export const login = async (req, res) => {

  //CHECK USER
  const q = 'SELECT * FROM users WHERE username = ?';
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(401).json('User not found');
    //CHECK PASS
    const checkPassword = bcrypt.compareSync(req.body.password, result[0].password);
    if (!checkPassword) return res.status(401).json('Wrong password or username');
    const { password, ...others } = result[0];
    console.log(result[0]);
    //JWT Authentication
    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET);
    return res.status(200).json({ user: others, token: token });
  })
}

//LOGOUT
export const logout = async (req, res) => {
  res.clearCookie().status(200).json("Logout completed ")
}
//Get data Profile
export const getProfile = async (req, res) => {
  const { userId } = req.params;
  const q = 'SELECT * FROM users WHERE id =?';
  db.query(q, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    const { password, ...others } = result[0];
    if (result.length === 0) return res.status(404).json('User not exist');
    return res.status(200).json(others);
  })
}