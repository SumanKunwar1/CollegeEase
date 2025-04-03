import { Quote, Award, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SuccessStory {
  _id: string;
  name: string;
  image: string;
  university: string;
  major: string;
  amountRaised: number;
  quote: string;
  impact: string[];
  createdAt: string;
  updatedAt: string;
}

const SuccessStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/success-stories`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch success stories');
        }

        const data = await response.json();
        setStories(data.data);
      } catch (err) {
        console.error('Error fetching success stories:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        toast.error('Failed to load success stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Stories</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Success Stories Yet</h1>
          <p className="text-gray-600 mb-6">
            Be the first to share your scholarship success story!
          </p>
          <Button
            onClick={() => navigate(`/scholarships/submit-stories`)}
            size="lg"
          >
            Share Your Story
          </Button>
        </div>
      </div>
    );
  }

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
              key={story._id}
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
                        {story.major}
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        ${story.amountRaised.toLocaleString()} raised
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
                    Achievements & Impact
                  </h3>
                  <ul className="space-y-2">
                    {story.impact.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <ArrowRight className="h-4 w-4 text-indigo-500" />
                        <span>{item}</span>
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