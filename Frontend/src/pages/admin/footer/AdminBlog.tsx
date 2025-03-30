"use client";

import { useState } from "react";
import { Clock, Plus, Save, Trash, User } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export function AdminBlogPage() {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
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
      excerpt:
        "Discover the pros and cons of different application timelines...",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Financial Aid 101: Everything You Need to Know",
      excerpt:
        "A comprehensive guide to understanding college financial aid...",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    },
  ]);

  const addNewPost = () => {
    const newPost: BlogPost = {
      id:
        blogPosts.length > 0
          ? Math.max(...blogPosts.map((post) => post.id)) + 1
          : 1,
      title: "New Blog Post",
      excerpt: "Enter excerpt here...",
      author: "Author Name",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    };
    setBlogPosts([...blogPosts, newPost]);
  };

  const updatePost = (id: number, field: keyof BlogPost, value: string) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post
      )
    );
  };

  const deletePost = (id: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
  };

  const saveChanges = () => {
    // In a real application, this would send data to an API
    toast({
      title: "Changes saved",
      description: "Your blog posts have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Blog Posts
          </h1>
          <div className="flex gap-4">
            <Button onClick={addNewPost}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Button>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Input
                      className="absolute bottom-2 left-2 right-2 bg-white/90 text-sm"
                      value={post.image}
                      onChange={(e) =>
                        updatePost(post.id, "image", e.target.value)
                      }
                      placeholder="Image URL"
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="space-y-4">
                      <Input
                        value={post.title}
                        onChange={(e) =>
                          updatePost(post.id, "title", e.target.value)
                        }
                        className="text-xl font-semibold"
                        placeholder="Post title"
                      />
                      <Textarea
                        value={post.excerpt}
                        onChange={(e) =>
                          updatePost(post.id, "excerpt", e.target.value)
                        }
                        className="text-gray-600"
                        placeholder="Post excerpt"
                      />
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <User size={16} className="mr-1" />
                          <Input
                            value={post.author}
                            onChange={(e) =>
                              updatePost(post.id, "author", e.target.value)
                            }
                            className="w-40 h-8"
                            placeholder="Author"
                          />
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <Input
                            value={post.readTime}
                            onChange={(e) =>
                              updatePost(post.id, "readTime", e.target.value)
                            }
                            className="w-32 h-8"
                            placeholder="Read time"
                          />
                        </div>
                        <div className="flex items-center ml-auto">
                          <a href={`/admin/blog/${post.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                            >
                              Edit Content
                            </Button>
                          </a>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border flex justify-end">
          <Button onClick={saveChanges} className="w-full md:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
