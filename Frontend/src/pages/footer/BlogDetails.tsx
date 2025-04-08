import { useParams } from "react-router-dom";
import { Clock, User, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface ContentSection {
  type: "paragraph" | "heading";
  content: string;
}

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!id) {
          throw new Error('No blog post specified');
        }
        
        const response = await fetch(`${API_BASE_URL}/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlogPost(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Blog post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <img
          src={blogPost.image || "https://via.placeholder.com/800x400"}
          alt="Blog header"
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blogPost.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-8">
            <User size={18} className="mr-2" />
            <span className="mr-6">{blogPost.author}</span>
            <Calendar size={18} className="mr-2" />
            <span className="mr-6">{new Date(blogPost.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <Clock size={18} className="mr-2" />
            <span>{blogPost.readTime}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">{blogPost.excerpt}</p>

            {blogPost.content.map((section, index) => (
              <div key={index}>
                {section.type === "heading" ? (
                  <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                    {section.content}
                  </h2>
                ) : (
                  <p className="text-gray-700 mb-4">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;