import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { createBlog, deleteBlog, dislikeBlog, getBlogById, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blogController.js"

const router = express.Router()

router.get("/get-own-blogs", isAuthenticated, getOwnBlogs);
router.get('/my-blogs/likes', isAuthenticated, getMyTotalBlogLikes);
router.get("/get-published-blogs", getPublishedBlog);
router.get("/:blogId", getBlogById);
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);

router.post("/", isAuthenticated, singleUpload, createBlog);
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.patch("/:blogId", isAuthenticated, togglePublishBlog);

export default router;