import { Router } from "express";
import CommentRoutes from "./comment.js";
import PostRoutes from "./post.js";
import userRoutes from "./user.js";

const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/post", PostRoutes);
router.use("/api/comment", CommentRoutes);

export default router;
