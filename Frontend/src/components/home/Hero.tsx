import { useState } from "react";
import { Search, Sparkles, Users, BookOpen } from "lucide-react";
import { colleges } from "../../data/colleges"; // Import colleges data
import { scholarshipsData } from "../../data/scholarshipdata"; // Import scholarships data
import { Link } from "react-router-dom"; // Import Link for navigation

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    colleges: typeof colleges;
    scholarships: typeof scholarshipsData;
  }>({ colleges: [], scholarships: [] });

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults({ colleges: [], scholarships: [] });
      return;
    }

    // Filter colleges
    const filteredColleges = colleges.filter((college) =>
      college.name.toLowerCase().includes(query.toLowerCase())
    );

    // Filter scholarships
    const filteredScholarships = scholarshipsData.filter((scholarship) =>
      scholarship.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults({
      colleges: filteredColleges,
      scholarships: filteredScholarships,
    });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full object-cover">
          <video
            className="w-full h-full object-cover opacity-80"
            autoPlay
            loop
            muted
            src="/Public/Assets/videos/Banner Video.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* For darker overlay */}
      </div>

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl">
              <span className="block">Your journey to</span>
              <span className="block text-yellow-400">higher education</span>
              <span className="block">starts here</span>
            </h1>
            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Find your perfect college, discover scholarships, and connect with
              a community that supports your educational dreams.
            </p>

            {/* Search Section */}
            <div className="mt-8 sm:mt-12">
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Search colleges, scholarships..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              {/* Display Search Results */}
              {(searchResults.colleges.length > 0 ||
                searchResults.scholarships.length > 0) && (
                <div className="mt-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto lg:mx-0 p-4">
                  {searchResults.colleges.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Colleges</h3>
                      <ul>
                        {searchResults.colleges.map((college) => (
                          <li
                            key={college.id}
                            className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          >
                            <Link
                              to={`/colleges/${college.id}`} // Redirect to college details page
                              className="block w-full h-full"
                            >
                              {college.name} - {college.location}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.scholarships.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Scholarships
                      </h3>
                      <ul>
                        {searchResults.scholarships.map((scholarship) => (
                          <li
                            key={scholarship.id}
                            className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          >
                            <Link
                              to={`/colleges/${scholarship.id}`} // Redirect to college details page
                              className="block w-full h-full"
                            ></Link>
                            {scholarship.name} - {scholarship.provider}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-semibold text-white">1000+</div>
                <div className="text-sm text-gray-400">Colleges</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-semibold text-white">50K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-semibold text-white">5K+</div>
                <div className="text-sm text-gray-400">Scholarships</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
