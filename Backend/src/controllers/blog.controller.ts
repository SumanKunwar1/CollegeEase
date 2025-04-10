import { Request, Response, NextFunction } from 'express';
import BlogPost, { IBlogPost, IContentSection } from '../models/blog.model';
import { asyncHandler } from '../utils/asyncHandler';
import slugify from 'slugify';

// Create a new blog post
export const createBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, excerpt, author, date, readTime, image, content } = req.body;

  // Generate slug from title
  const slug = slugify(title, { lower: true, strict: true });

  const blogPost = await BlogPost.create({
    title,
    excerpt,
    author,
    date,
    readTime,
    image,
    content,
    slug
  });

  res.status(201).json({
    success: true,
    data: blogPost
  });
});

// Update a blog post
export const updateBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, excerpt, author, date, readTime, image, content } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Update slug if title changed
  if (title && title !== blogPost.title) {
    blogPost.slug = slugify(title, { lower: true, strict: true });
  }

  blogPost.title = title || blogPost.title;
  blogPost.excerpt = excerpt || blogPost.excerpt;
  blogPost.author = author || blogPost.author;
  blogPost.date = date || blogPost.date;
  blogPost.readTime = readTime || blogPost.readTime;
  blogPost.image = image || blogPost.image;
  blogPost.content = content || blogPost.content;

  const updatedBlogPost = await blogPost.save();

  res.status(200).json({
    success: true,
    data: updatedBlogPost
  });
});

// Get all blog posts
export const getAllBlogPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: blogPosts
  });
});

// Get a single blog post by ID
export const getBlogPostById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  res.status(200).json({
    success: true,
    data: blogPost
  });
});



// Delete a blog post
export const deleteBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  await blogPost.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

export const getBlogPostBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
  
    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }
  
    res.status(200).json({
      success: true,
      data: blogPost
    });
  });