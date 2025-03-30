import { Quote, Award, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const SuccessStories = () => {
  const navigate = useNavigate();
  const stories = [
    {
      id: 1,
      name: "Sarah Chen",
      scholarship: "Global Merit Scholarship",
      amount: "$25,000",
      university: "Stanford University",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote:
        "The scholarship application process seemed daunting at first, but with persistence and the right guidance, I was able to secure funding for my dream university.",
      tips: [
        "Start applications early",
        "Personalize each application",
        "Get multiple people to review your essays",
      ],
    },
    {
      id: 2,
      name: "James Rodriguez",
      scholarship: "STEM Excellence Award",
      amount: "$15,000",
      university: "MIT",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote:
        "I almost didn't apply thinking my chances were low. But I took the chance, and it changed my entire academic journey.",
      tips: [
        "Don't self-reject",
        "Highlight unique experiences",
        "Follow up with recommenders",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
          <p className="mt-2 text-gray-600">
            Real stories from students who successfully secured scholarships
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {story.name}
                    </h2>
                    <p className="text-gray-600">{story.university}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {story.scholarship}
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        {story.amount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-3">
                    <Quote className="h-8 w-8 text-indigo-500 flex-shrink-0" />
                    <p className="text-gray-600 italic">{story.quote}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Top Tips from {story.name.split(" ")[0]}
                  </h3>
                  <ul className="space-y-2">
                    {story.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <ArrowRight className="h-4 w-4 text-indigo-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Success Story
          </h2>
          <p className="text-gray-600 mb-6">
            Have you recently won a scholarship? Share your story to inspire and
            help other students!
          </p>
          <Button
            onClick={() => navigate(`/scholarships/submit-stories`)}
            size="lg"
          >
            Submit Your Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
