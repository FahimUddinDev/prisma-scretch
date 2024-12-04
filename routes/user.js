import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/UserController.js";

const router = Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:id").put(updateUser).get(getUser).delete(deleteUser);

export default router;
