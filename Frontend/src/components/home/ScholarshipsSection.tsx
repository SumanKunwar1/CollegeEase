import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const ScholarshipsSection = () => {
  const scholarships = [
    {
      id: 1,
      title: "Merit Excellence Scholarship",
      amount: "$25,000",
      provider: " By Suman Kunwar Foundation",
      deadline: "March 31, 2025",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
      eligibility: [
        "3.5GPA+",
        "Computer Science",
        "Underrepresented Groups",
        "Bachelor/Master",
      ],
    },
    {
      id: 2,
      title: "STEM Leaders Grant",
      amount: "$15,000",
      provider: " By Suman Kunwar Foundation",
      deadline: "April 15, 2025",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
      eligibility: [
        "Computer Science",
        "Underrepresented Groups",
        "Bachelor/Master",
        "Developing Countries Only",
      ],
    },
    {
      id: 3,
      title: "Future Innovators Award",
      amount: "$20,000",
      provider: " By Suman Kunwar Foundation",
      deadline: "May 1, 2025",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      eligibility: [
        "Computer Science",
        "Underrepresented Groups",
        "Bachelor/Master",
      ],
    },
  ];
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Scholarships
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={scholarship.image || "/placeholder.svg"}
                alt={scholarship.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {scholarship.title}
                </h3>
                <p className="mt-2 font-regular italic">
                  {scholarship.provider}
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {scholarship.amount}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {scholarship.eligibility.map((criteria) => (
                    <span
                      key={criteria}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {criteria}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-gray-600">
                  Deadline: {scholarship.deadline}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => {
                      navigate(`/scholarships/${scholarship.id}`);
                      window.scrollTo(0, 0);
                    }} // Add onClick for navigation
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Apply Now
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/scholarships/smart-predictor`);
                      window.scrollTo(0, 0); // Scroll to the top after navigation
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Check Eligibility
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            onClick={() => (window.location.href = "/scholarships")}
            variant="secondary"
            className="px-6 py-3 bg-blue-100"
          >
            View more Scholarships
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
