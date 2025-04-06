import { useState } from "react";
import { Search, Sparkles, Users, BookOpen } from "lucide-react";
import { colleges } from "../../data/colleges"; // Import colleges data
import { scholarshipsData } from "../../data/scholarshipdata"; // Import scholarships data
import { Link } from "react-router-dom"; // Import Link for navigation

const Hero = () => {
  // State for editable content
  const [heroData, setHeroData] = useState({
    titleLine1: "Your journey to",
    titleLine2: "higher education",
    titleLine3: "starts here",
    description:
      "Find your perfect college, discover scholarships, and connect with a community that supports your educational dreams.",
    stats: {
      colleges: "1000+",
      students: "50K+",
      scholarships: "5K+",
    },
  });

  // State for banner media (image or video)
  const [bannerMedia, setBannerMedia] = useState({
    type: "video", // Can be "video" or "image"
    src: "/Public/Assets/videos/Banner Video.mp4",
  });

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    colleges: typeof colleges;
    scholarships: typeof scholarshipsData;
  }>({ colleges: [], scholarships: [] });

  // Handle text changes
  const handleTextChange = (field: string, value: string) => {
    setHeroData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle banner media change
  const handleBannerMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBannerMedia({
            type: file.type.startsWith("video") ? "video" : "image",
            src: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle search
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

  // Save updates
  const handleSave = () => {
    console.log("Updated Hero Data:", heroData);
    console.log("Updated Banner Media:", bannerMedia);
    alert("Changes saved successfully!");
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Banner Media */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full object-cover">
          {bannerMedia.type === "video" ? (
            <video
              className="w-full h-full object-cover opacity-80"
              autoPlay
              loop
              muted
              src={bannerMedia.src}
            ></video>
          ) : (
            <img
              src={bannerMedia.src}
              alt="Banner"
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* For darker overlay */}
      </div>

      {/* Banner Media Upload */}
      <div className="absolute top-4 right-4 z-20">
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleBannerMediaChange}
          className="bg-white p-2 rounded-md shadow-md"
        />
      </div>

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            {/* Title */}
            <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextChange("titleLine1", e.target.innerText)
                }
                className="block outline-none"
              >
                {heroData.titleLine1}
              </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextChange("titleLine2", e.target.innerText)
                }
                className="block text-yellow-400 outline-none"
              >
                {heroData.titleLine2}
              </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextChange("titleLine3", e.target.innerText)
                }
                className="block outline-none"
              >
                {heroData.titleLine3}
              </span>
            </h1>

            {/* Description */}
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextChange("description", e.target.innerText)
              }
              className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 outline-none"
            >
              {heroData.description}
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
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, colleges: e.target.innerText },
                    }))
                  }
                  className="text-2xl font-semibold text-white outline-none"
                >
                  {heroData.stats.colleges}
                </div>
                <div className="text-sm text-gray-400">Colleges</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, students: e.target.innerText },
                    }))
                  }
                  className="text-2xl font-semibold text-white outline-none"
                >
                  {heroData.stats.students}
                </div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-yellow-400" />
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      stats: {
                        ...prev.stats,
                        scholarships: e.target.innerText,
                      },
                    }))
                  }
                  className="text-2xl font-semibold text-white outline-none"
                >
                  {heroData.stats.scholarships}
                </div>
                <div className="text-sm text-gray-400">Scholarships</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Save Update Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Save Update
        </button>
      </div>
    </div>
  );
};

export default Hero;
