// AdminBlog.tsx (updated version)
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Save, Plus, Trash, Eye, ArrowLeft } from "lucide-react"

// Types
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: ContentSection[];
}

interface ContentSection {
  id: string;
  type: "paragraph" | "heading";
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001/api/v1";

const AdminBlog: React.FC = () => {
  // State for blog posts list
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // State for the current blog post being edited
  const [currentPost, setCurrentPost] = useState<Omit<BlogPost, '_id'> & { _id?: string }>({
    title: "",
    excerpt: "",
    author: "",
    date: "",
    readTime: "",
    image: "",
    content: [],
  })

  // State for UI
  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [newSectionText, setNewSectionText] = useState("")
  const [sectionType, setSectionType] = useState<"paragraph" | "heading">("paragraph")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch blog posts from API
  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();
      setBlogPosts(data.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      alert('Error fetching blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  // Load blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, [])

  // Handle input changes for the main form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentPost({ ...currentPost, [name]: value })
  }

  // Add a new content section
  const addContentSection = () => {
    if (!newSectionText.trim()) return

    const newSection: ContentSection = {
      id: Date.now().toString(),
      type: sectionType,
      content: newSectionText,
    }

    setCurrentPost({
      ...currentPost,
      content: [...currentPost.content, newSection],
    })

    setNewSectionText("")
  }

  // Remove a content section
  const removeContentSection = (id: string) => {
    setCurrentPost({
      ...currentPost,
      content: currentPost.content.filter((section) => section.id !== id),
    })
  }

  // Save the current post
  const savePost = async () => {
    if (!currentPost.title || !currentPost.author || !currentPost.image) {
      alert("Please fill in all required fields (title, author, image)")
      return
    }

    setIsLoading(true);
    try {
      let response;
      const url = currentPost._id 
        ? `${API_BASE_URL}/blog/${currentPost._id}`
        : `${API_BASE_URL}/blog`;
      
      const method = currentPost._id ? 'PUT' : 'POST';
      
      // Prepare the post data without the id field for new posts
      const { _id, ...postData } = currentPost;
      
      response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error(`Failed to ${currentPost._id ? 'update' : 'create'} blog post`);

      await fetchBlogPosts();

      // Reset form
      setCurrentPost({
        title: "",
        excerpt: "",
        author: "",
        date: "",
        readTime: "",
        image: "",
        content: [],
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert(`Error ${currentPost._id ? 'updating' : 'creating'} blog post`);
    } finally {
      setIsLoading(false);
    }
  }

  // Edit an existing post
  const editPost = (post: BlogPost) => {
    setCurrentPost({
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      image: post.image,
      content: post.content.map(section => ({
        id: section.id || Date.now().toString(),
        type: section.type,
        content: section.content
      }))
    });
    setIsEditing(true);
    setIsPreview(false);
  }

  // Delete a post
  const deletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog post');

      await fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post');
    } finally {
      setIsLoading(false);
    }
  }

  // Format date as MMMM DD, YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog Admin</h1>

        {/* Loading state */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md">Loading...</div>
          </div>
        )}

        {/* Toggle between post list and editor */}
        {!isPreview && (
          <div className="mb-4">
            <button
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false)
                  setCurrentPost({
                    title: "",
                    excerpt: "",
                    author: "",
                    date: "",
                    readTime: "",
                    image: "",
                    content: [],
                  })
                } else {
                  setIsPreview(!isPreview)
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              {isEditing ? "Cancel Editing" : "View All Posts"}
            </button>
          </div>
        )}

        {/* Preview Mode */}
        {isPreview ? (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <button
              onClick={() => setIsPreview(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mb-6 flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Editor
            </button>

            <img
              src={currentPost.image || "https://via.placeholder.com/800x400"}
              alt="Blog header"
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentPost.title || "Blog Post Title"}</h1>

            <div className="flex items-center text-gray-600 mb-8">
              <span className="mr-6">{currentPost.author || "Author Name"}</span>
              <span className="mr-6">{formatDate(currentPost.date) || "Date"}</span>
              <span>{currentPost.readTime || "Read time"}</span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">{currentPost.excerpt || "Blog excerpt goes here..."}</p>

              {currentPost.content.map((section) => (
                <div key={section.id}>
                  {section.type === "heading" ? (
                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{section.content}</h2>
                  ) : (
                    <p className="text-gray-700 mb-4">{section.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Blog Post Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Blog Post" : "Add New Blog Post"}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={currentPost.author}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={currentPost.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={currentPost.readTime}
                    onChange={handleInputChange}
                    placeholder="e.g. 5 min read"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    value={currentPost.image}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={currentPost.excerpt}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={2}
                  />
                </div>
              </div>

              {/* Content Sections */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Content Sections</h3>

                {currentPost.content.map((section, index) => (
                  <div key={section.id} className="flex items-start mb-3 p-3 bg-gray-50 rounded-md">
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 mr-2">{index + 1}.</span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {section.type === "heading" ? "Heading" : "Paragraph"}
                        </span>
                      </div>
                      <div className="pl-6">{section.content}</div>
                    </div>
                    <button
                      onClick={() => removeContentSection(section.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ))}

                <div className="mt-4">
                  <div className="flex mb-2">
                    <select
                      value={sectionType}
                      onChange={(e) => setSectionType(e.target.value as "paragraph" | "heading")}
                      className="p-2 border border-gray-300 rounded-md mr-2"
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="heading">Heading</option>
                    </select>
                  </div>

                  <div className="flex">
                    <textarea
                      value={newSectionText}
                      onChange={(e) => setNewSectionText(e.target.value)}
                      placeholder={sectionType === "heading" ? "Enter heading text..." : "Enter paragraph text..."}
                      className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                      rows={3}
                    />
                    <button
                      onClick={addContentSection}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md self-end"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsPreview(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Eye size={18} className="mr-2" />
                  Preview
                </button>

                <button
                  onClick={savePost}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Save Post
                </button>
              </div>
            </div>

            {/* Blog Posts List */}
            {!isEditing && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>

                {blogPosts.length === 0 ? (
                  <p className="text-gray-500">No blog posts yet. Create your first post above.</p>
                ) : (
                  <div className="divide-y">
                    {blogPosts.map((post) => (
                      <div key={post._id} className="py-4 flex items-center">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-gray-500">
                            {post.author} • {formatDate(post.date)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editPost(post)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePost(post._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminBlog