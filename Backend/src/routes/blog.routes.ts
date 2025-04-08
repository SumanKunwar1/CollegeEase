// routes/blog.routes.ts
import express from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostBySlug
} from '../controllers/blog.controller';

const router = express.Router();

router.route('/')
  .post(createBlogPost)
  .get(getAllBlogPosts);

router.route('/:id')
  .get(getBlogPostById)
  .put(updateBlogPost)
  .delete(deleteBlogPost);

  router.route('/slug/:slug')
  .get(getBlogPostBySlug);

export default router;