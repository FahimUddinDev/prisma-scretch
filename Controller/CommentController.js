import prisma from "../DB/db.config.js";

export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: {
      // and structure is same
      OR: [
        {
          title: {
            startsWith: "Next",
            endsWith: "js",
            equals: "Next js",
          },
        },
        {
          comment_count: {
            gt: 2,
          },
        },
      ],
      NOT: {
        title: {
          endsWith: "React",
        },
      },
    },
    include: {
      post: {
        include: { user: true },
      },
      user: true,
    },
  });
  return res.status(200).send({ comments });
};

export const getComment = async (req, res) => {
  const id = parseInt(req.params.id);
  const comment = await prisma.comment.findUnique({ where: { id } });
  return res.status(200).send({ comment });
};

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  // Increase the comment counter
  await prisma.post.update({
    where: { id: parseInt(post_id) },
    data: { comment_count: { increment: 1 } },
  });
  const newComment = await prisma.comment.create({
    data: {
      user_id: parseInt(user_id),
      post_id,
      comment,
    },
  });
  return res
    .status(200)
    .send({ message: "Created Comment successfully", newComment });
};

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const data = req.body;
  const updatedComment = await prisma.comment.update({
    where: {
      id: parseInt(commentId),
    },
    data: {
      ...data,
    },
  });
  return res
    .status(200)
    .send({ message: "Comment updated  successfully", updatedUser });
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  // Decrement the comment counter
  await prisma.post.update({
    where: { id: parseInt(post_id) },
    data: { comment_count: { decrement: 1 } },
  });
  const updatedComment = await prisma.comment.delete({
    where: {
      id: parseInt(commentId),
    },
  });
  return res.status(200).send({ message: "Comment deleted  successfully" });
};
