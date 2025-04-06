import {
  Calendar,
  Briefcase,
  Share2,
  BookOpen,
  PlayCircle,
  Download,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";
import type { InterviewDetail } from "../../types/interview";

// This would typically come from an API or props
const interviewData: InterviewDetail = {
  name: "Sarah Chen",
  role: "VP of Engineering at Google",
  topic: "Breaking into Tech Leadership",
  date: "March 15, 2024",
  imageUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  category: "Tech Leaders",
  insights: [
    "Building technical teams",
    "Career progression in tech",
    "Future of AI",
  ],
  fullInterview: {
    introduction:
      "Sarah Chen shares her journey from a software engineer to VP of Engineering at Google, offering invaluable insights into leadership in the tech industry. With over 15 years of experience, she discusses the challenges and opportunities in building and leading high-performing technical teams.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sections: [
      {
        title: "Journey to Leadership",
        content:
          "My journey into tech leadership began as a software engineer working on complex distributed systems. The transition to leadership wasn't straightforward – it required developing a completely different skill set. I had to learn to think strategically about people, not just code. The key was realizing that technical excellence alone isn't enough; you need to be able to inspire and guide others, to see the bigger picture, and to make decisions that impact both the technology and the people building it.",
      },
      {
        title: "Building Technical Teams",
        content:
          "Building effective technical teams is both an art and a science. It's crucial to balance technical skills with cultural fit. I've learned that diverse teams bring diverse perspectives, which leads to better problem-solving and innovation. When building teams, I look for people who are not only technically competent but also demonstrate curiosity, adaptability, and strong collaboration skills.",
      },
      {
        title: "Future of AI in Tech",
        content:
          "AI is revolutionizing how we approach software development and team management. We're seeing AI tools augment developer productivity, improve code quality, and even assist in architectural decisions. However, it's crucial to maintain a balance – AI should enhance human capabilities, not replace human judgment. Leaders need to stay informed about AI developments while ensuring their teams can effectively integrate these tools into their workflows.",
      },
    ],
    keyTakeaways: [
      "Technical leadership requires a different skillset than engineering",
      "Diverse teams lead to better innovation and problem-solving",
      "AI will augment, not replace, human decision-making in tech",
      "Continuous learning is crucial for staying relevant in tech leadership",
      "Building trust and psychological safety is fundamental to team success",
    ],
    resources: [
      {
        title: "Leadership in Tech: A Comprehensive Guide",
        url: "#",
        type: "PDF",
      },
      {
        title: "Building High-Performance Engineering Teams",
        url: "#",
        type: "Webinar",
      },
      {
        title: "AI in Software Development: Best Practices",
        url: "#",
        type: "Article",
      },
    ],
  },
};

const InterviewDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={interviewData.imageUrl}
              alt={interviewData.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <div className="text-blue-100 font-medium mb-2">
                {interviewData.category}
              </div>
              <h1 className="text-4xl font-bold mb-4">{interviewData.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {interviewData.role}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {interviewData.date}
                </div>
              </div>
              <h2 className="text-2xl font-semibold">{interviewData.topic}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {interviewData.fullInterview.introduction}
              </p>
            </div>

            {/* Video Section */}
            {interviewData.fullInterview.videoUrl && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <PlayCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Interview Highlights
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={interviewData.fullInterview.videoUrl}
                    className="w-full h-[400px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Interview Sections */}
            {interviewData.fullInterview.sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 mb-8"
              >
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Key Takeaways */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {interviewData.fullInterview.keyTakeaways.map(
                  (takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4">
                Additional Resources
              </h3>
              <ul className="space-y-4">
                {interviewData.fullInterview.resources.map(
                  (resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {resource.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {resource.type}
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Share2 className="h-6 w-6 mr-2 text-blue-600" />
                Share Interview
              </h3>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <LinkedinIcon className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <TwitterIcon className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <FacebookIcon className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;
