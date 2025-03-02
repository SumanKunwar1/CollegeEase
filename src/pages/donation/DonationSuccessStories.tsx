import { Quote, GraduationCap, Heart, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const SuccessStories = () => {
  const navigate = useNavigate();
  const stories = [
    {
      id: 1,
      name: "Emily Thompson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      university: "Harvard University",
      major: "Environmental Science",
      amountRaised: 45000,
      quote:
        "Thanks to the generous support of donors, I was able to pursue my dream of studying environmental science. Now, I'm working on innovative solutions for climate change.",
      impact: [
        "First in family to attend college",
        "Published research paper in first year",
        "Started environmental awareness club",
      ],
    },
    {
      id: 2,
      name: "Marcus Johnson",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      university: "MIT",
      major: "Computer Science",
      amountRaised: 35000,
      quote:
        "The support I received didn't just fund my education - it opened doors to opportunities I never thought possible. I'm now developing AI solutions that help other students learn.",
      impact: [
        "Developed educational app for underserved communities",
        "Internship at major tech company",
        "Mentors high school students in coding",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
          <p className="mt-2 text-gray-600">
            See how your donations have transformed students' lives
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
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {story.university} • {story.major}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-indigo-600 font-medium">
                    <Heart className="h-5 w-5" />
                    <span>
                      ${story.amountRaised.toLocaleString()} raised from donors
                    </span>
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
                    Impact & Achievements
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

        <div className="bg-indigo-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Make Your Impact
            </h2>
            <p className="text-gray-600 mb-6">
              Your donation can help create the next success story. Support a
              student's educational journey today.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => navigate(`/donate/student-profile`)}
                size="lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
              <Button
                onClick={() => navigate(`/donate/student-profile`)}
                variant="outline"
                size="lg"
              >
                Browse Student Profiles
              </Button>
            </div>
          </div>
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
            onClick={() => navigate(`/donate/submit-success-stories`)}
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
