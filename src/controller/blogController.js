const blogModel = require("../model/blogModel");

// const createBlog = async (req, res) => {
//   const { title, snippet, body } = req.body;

//   const blog = new blogModel({ title, snippet, body });

//   blog
//     .save()
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err.message);
//       console.log(err);
//     });
// };

const createBlog = async (req, res) => {
  const { title, snippet, body } = req.body;

  try {
    if (!title) {
      throw new Error("Title must be included!");
    }
    if (!snippet) {
      throw new Error("Snippet must be included!");
    }
    if (!body) {
      throw new Error("Body must be included!");
    }

    const blog = await blogModel.create({ title, snippet, body });

    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);

    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, snippet, body } = req.body;

  try {
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, snippet, body },
      { new: true }
    );

    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await blogModel.findByIdAndDelete(id);

    res.status(200).json("Blog deleted succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { createBlog, getBlog, getAllBlogs, deleteBlog, updateBlog };
