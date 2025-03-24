import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Write a Compelling College Essay",
    excerpt:
      "Learn the key strategies to make your college essay stand out from the crowd...",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Understanding Early Decision vs Early Action",
    excerpt: "Discover the pros and cons of different application timelines...",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Financial Aid 101: Everything You Need to Know",
    excerpt: "A comprehensive guide to understanding college financial aid...",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CollegeEase Blog
          </h1>
          <p className="text-lg text-gray-600">
            Expert advice and insights for your college journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <User size={16} className="mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Clock size={16} className="mr-1" />
                  <span className="mr-4">{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
