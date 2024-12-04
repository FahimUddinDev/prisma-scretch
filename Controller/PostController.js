import prisma from "../DB/db.config.js";

export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({});
  return res.status(200).send({ posts });
};

export const getPost = async (req, res) => {
  const id = parseInt(req.params.id);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    page = 10;
  }
  const skip = (page - 1) * limit;
  const post = await prisma.post.findUnique({
    skip,
    take: limit,
    where: { id },
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  // to get the totAl post count
  const totalPostCount = await prisma.post.count();
  const totalPage = Math.ceil(totalPostCount / limit);

  return res.status(200).send({
    post,
    meta: {
      totalPage,
      currentPage: page,
      totalCount: totalPostCount,
      limit,
    },
  });
};

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: parseInt(user_id),
      title,
      description,
    },
  });
  return res
    .status(200)
    .send({ message: "Created Post successfully", newUser });
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const data = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id: parseInt(postId),
    },
    data: {
      ...data,
    },
  });
  return res
    .status(200)
    .send({ message: "Post updated  successfully", updatedUser });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const updatedPost = await prisma.post.delete({
    where: {
      id: parseInt(postId),
    },
  });
  return res.status(200).send({ message: "Post deleted  successfully" });
};

export const searchPost = async (req, res) => {
  const query = req.query.q;

  const post = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });
  return res.status(200).send({ post: searchPost });
};
