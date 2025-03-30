import { donation } from "../../data/donations";
import { useNavigate } from "react-router-dom";

const FeaturedStudentsSection = () => {
  // Limit to displaying a maximum of 3 students
  const featuredStudents = donation.slice(0, 3);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Student Profiles
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudents.map((student, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={student.image}
                alt={student.studentName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {student.studentName}
                </h3>
                <p className="mt-2 text-gray-600">{student.story}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Raised: {student.raised}</span>
                    <span>Goal: {student.goal}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseInt(
                            student.raised.toString().replace(/\D/g, "")
                          ) /
                            parseInt(
                              student.goal.toString().replace(/\D/g, "")
                            )) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Academic History:</p>
                  <p className="text-sm font-medium text-gray-700">
                    {student.academicHistory}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate(`/donate/donation-form/${student.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Support {student.studentName}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={() => (window.location.href = "/donate")} // Redirect to /donate page
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View All Students
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStudentsSection;
