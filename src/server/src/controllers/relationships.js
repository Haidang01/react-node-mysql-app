import { db } from '../config/connectDB.js';


// GET  relationships
export const getRelationships = async (req, res) => {
  console.log(req.params.userId);
  const query = ' SELECT followerUserId FROM relationships WHERE followedUserId=? ';
  const values = [req.params.userId];
  db.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      res.status(200).json(result);
    }
  })
}

export const relationship = async (req, res) => {
  const { userId } = req.params;
  const { followerUserId } = req.body;
  if (followerUserId) {
    const query = 'DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?';
    db.query(query, [req.userId, userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  } else {
    const query = 'INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?, ?)';
    db.query(query, [req.userId, userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  }
}