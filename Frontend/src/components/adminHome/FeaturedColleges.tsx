import { Star, MapPin } from "lucide-react";
import { colleges } from "../../data/colleges"; // Import the colleges data
import { useNavigate } from "react-router-dom";

const FeaturedColleges = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Colleges
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover top-rated institutions that match your academic goals
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={college.imageUrl}
                  alt={college.name}
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {college.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {college.rating}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {college.location}
                  </div>
                  <div className="mt-3">
                    <div className="text-sm text-gray-900">
                      Popular courses:
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {college.courses.map((course) => (
                        <span
                          key={course}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    Tuition range: {college.tuitionRange}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      navigate(`/colleges/${college.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => (window.location.href = "/colleges")} // Redirect to /colleges page
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View All Colleges
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
