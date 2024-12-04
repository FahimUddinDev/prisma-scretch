import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../Controller/CommentController";

const router = Router();

router.route("/").post(createComment).get(getComments);
router.route("/:id").put(updateComment).get(getComment).delete(deleteComment);

export default router;
