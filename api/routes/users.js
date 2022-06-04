import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkath", verifyToken, (req, res, next) => {
//   res.send("hellor user you are loged in");
// });
// router.get("/checkath/:id", verifyUser, (req, res, next) => {
//   res.send("hellor user you are loged in and you can delete your acc");
// });
// router.get("/checkadmin", verifyAdmin, (req, res, next) => {
//   res.send("hello admin");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/", verifyAdmin, getAllUsers);

export default router;
