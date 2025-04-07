import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Award, Star } from "lucide-react";

interface SyllabusItem {
  title: string;
  description: string[];
  imageUrl?: string;
}

interface Instructor {
  name: string;
  bio: string;
  imageUrl: string;
}

interface CourseDetails {
  overview: string;
  syllabus: SyllabusItem[];
  instructor: Instructor;
}

interface Course {
  _id: string;
  title: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  imageUrl: string;
  details: CourseDetails;
}

const SkillDevelopmentDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/skill-development/course/${courseId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading course</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Overview Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full md:w-1/3 h-64 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-gray-600 mb-6">{course.details.overview}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2" />
                    {course.level}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    {course.rating} ({course.students} students)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Syllabus
            </h2>
            <ul className="space-y-6">
              {course.details.syllabus.map((item, index) => (
                <li key={index} className="text-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {item.description.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About the Instructor
            </h2>
            <div className="flex items-center space-x-6">
              <img
                src={course.details.instructor.imageUrl}
                alt={course.details.instructor.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {course.details.instructor.name}
                </h3>
                <p className="text-gray-600">{course.details.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentDetails;