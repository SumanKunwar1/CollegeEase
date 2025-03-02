import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
  whyJoinUs: string;
}

const PostNewJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState<Job>({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    salary: "",
    requirements: [""],
    responsibilities: [""],
    whyJoinUs: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Job
  ) => {
    if (!Array.isArray(job[field])) return;
    const newArray = [...(job[field] as string[])];
    newArray[index] = e.target.value;
    setJob((prev) => ({ ...prev, [field]: newArray }));
  };

  const addRequirement = () => {
    setJob((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const addResponsibility = () => {
    setJob((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posted successfully!");
    navigate("/dashboard/industry/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Post New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Job Title
            </h2>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Company & Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="company"
                value={job.company}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Company name"
                required
              />
              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Location"
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Job Type & Salary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="type"
                value={job.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <input
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Salary"
                required
              />
            </div>
          </div>

          {(
            ["requirements", "responsibilities"] as Array<
              "requirements" | "responsibilities"
            >
          ).map((field) => (
            <div key={field} className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </h2>
              {(job[field] as string[]).map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(e, index, field)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  placeholder={`${field.slice(0, -1)} ${index + 1}`}
                  required
                />
              ))}
              <button
                type="button"
                onClick={
                  field === "requirements" ? addRequirement : addResponsibility
                }
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add {field.slice(0, -1)}
              </button>
            </div>
          ))}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why Join Us
            </h2>
            <textarea
              name="whyJoinUs"
              value={job.whyJoinUs}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Explain why someone should join your company"
              rows={4}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewJob;
