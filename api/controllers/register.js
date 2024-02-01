import { db } from "../db.js";
import bcrypt from "bcrypt";


export const register = (req, res) => {

  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //HASHING PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //CREATING USER
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};