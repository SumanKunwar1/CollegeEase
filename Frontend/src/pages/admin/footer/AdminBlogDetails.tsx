"use client";

import { useState } from "react";
import { Calendar, Clock, Save, User } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface AdminBlogDetailPageProps {
  id: number;
}

export function AdminBlogDetailPage({ id }: AdminBlogDetailPageProps) {
  const { toast } = useToast();

  const [post, setPost] = useState<BlogPost>({
    id: id,
    title: "How to Write a Compelling College Essay",
    content: `
Your college essay is one of the most important components of your college application. It's your chance to show admissions officers who you are beyond your grades and test scores.

## Start with a Compelling Hook

The first paragraph of your essay should grab the reader's attention and make them want to read more. Consider starting with an interesting anecdote, a thought-provoking question, or a powerful statement that reflects your personality.

## Be Authentic

Admissions officers want to hear your genuine voice. Don't try to write what you think they want to hear. Instead, focus on telling your unique story in your own words.

## Show, Don't Tell

Use specific examples and vivid details to illustrate your points. Instead of saying you're passionate about science, describe the experiments you conduct in your garage or the hours you spend reading scientific journals.
    `,
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  });

  const updateField = (field: keyof BlogPost, value: string) => {
    setPost({ ...post, [field]: value });
  };

  const saveChanges = () => {
    // In a real application, this would send data to an API
    toast({
      title: "Changes saved",
      description: "Your blog post has been updated successfully.",
      id: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <a href="/admin/blog">
            <Button variant="outline">Back to Blog List</Button>
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Blog header"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <Input
                className="bg-white/90"
                value={post.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="Image URL"
              />
            </div>
          </div>

          <div className="p-8">
            <Input
              value={post.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="text-3xl font-bold mb-4"
              placeholder="Post title"
            />

            <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <Input
                  value={post.author}
                  onChange={(e) => updateField("author", e.target.value)}
                  className="w-40"
                  placeholder="Author"
                />
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <Input
                  value={post.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-40"
                  placeholder="Date"
                />
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <Input
                  value={post.readTime}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  className="w-32"
                  placeholder="Read time"
                />
              </div>
            </div>

            <div className="prose max-w-none">
              <Textarea
                value={post.content}
                onChange={(e) => updateField("content", e.target.value)}
                className="min-h-[500px] font-mono"
                placeholder="Post content (supports Markdown)"
              />
            </div>
          </div>
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
