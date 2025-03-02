import { useParams } from "react-router-dom";
import { collegesData } from "../../data/collegeDetails"; // Import colleges data

const CollegeDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Get the college ID from the URL
  const college = collegesData.find((college) => college.id === id); // Find the college by ID

  if (!college) {
    return <div>College not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
      <p className="text-gray-600 mb-4">{college.location}</p>
      <img
        src={college.imageUrl}
        alt={college.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700">{college.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CollegeDetailsPage;
