import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  searchPost,
  updatePost,
} from "../Controller/PostController";

const router = Router();

router.route("/").post(createPost).get(getPosts);
router.route("/:id").put(updatePost).get(getPost).delete(deletePost);
router.route("/search").get(searchPost);

export default router;
