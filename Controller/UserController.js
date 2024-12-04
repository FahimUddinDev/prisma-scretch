import prisma from "../DB/db.config.js";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      _count: {
        select: {
          post: true,
          comment: true,
        },
      },
    },
  });
  return res.status(200).send({ users });
};

export const getUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { post: { title: true, comment_count: true } },
  });
  return res.status(200).send({ user });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (findUser) {
    return res.status(400).send({ message: "Email already taken." });
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return res
    .status(200)
    .send({ message: "Created user successfully", newUser });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      ...data,
    },
  });
  return res
    .status(200)
    .send({ message: "user updated  successfully", updatedUser });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await prisma.user.delete({
    where: {
      id: parseInt(userId),
    },
  });
  return res.status(200).send({ message: "user deleted  successfully" });
};
