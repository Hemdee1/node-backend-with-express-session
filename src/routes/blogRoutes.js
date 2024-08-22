// RESTFUL API
// CREATE A REST API FOR A BLOG PLATFORM FOR THE FOLLOWING ENDPOINTS
// 1- CREATE A BLOG
// 2- GET ALL BLOGS
// 3- GET A BLOG
// 4- DELETE A BLOG
// 5- UPDATE A BLOG

const express = require("express");
const {
  createBlog,
  deleteBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
} = require("../controller/blogController");

const blogRoutes = express.Router();

blogRoutes.post("/", createBlog);
blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getBlog);
blogRoutes.put("/update/:id", updateBlog);
blogRoutes.delete("/delete/:id", deleteBlog);

module.exports = blogRoutes;
