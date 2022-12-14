const Post = require("./../../models/posts").postsModel;

/**
 * ** Usecases for Post entity
 * *** createPost
 * *** getUserPosts
 * *** getPost
 * *** updatePost
 * *** deletePost
 */

const create = async (data) => {
  const { title, description, user } = data;
  const newPost = new Post({ title, description, user });
  return await newPost.save();
};
const getUserPosts = async (user) => await Post.find({ user }).exec();
const getPost = async (id) => await Post.findById(id).exec();
const getPostsByTitle = async (title) => await Post.find({ title });

const updatePost = async (id, data) => {
  //console.log("id:", id, "data:", data);
  return await Post.findByIdAndUpdate(id, data).exec();
};

const deletePost = async (id) => await Post.findByIdAndDelete(id).exec();

module.exports = {
  create,
  getUserPosts,
  getPost,
  getPostsByTitle,
  updatePost,
  deletePost,
};
