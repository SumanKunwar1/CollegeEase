import { useState, useEffect } from "react";
import { Search, Sparkles, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  withCredentials: true,
});

type HeroData = {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  stats: {
    colleges: string;
    students: string;
    scholarships: string;
  };
  bannerMedia: {
    type: string;
    src: string;
  };
};

type College = {
  _id: string;
  organizationName: string;
  location: string;
};

type Scholarship = {
  _id: string;
  name: string;
  organizationName: string;
};

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    titleLine1: "Your journey to",
    titleLine2: "higher education",
    titleLine3: "starts here",
    description: "Find your perfect college, discover scholarships, and connect with a community that supports your educational dreams.",
    stats: {
      colleges: "1000+",
      students: "50K+",
      scholarships: "5K+",
    },
    bannerMedia: {
      type: "video",
      src: "/Public/Assets/videos/Banner Video.mp4",
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    colleges: College[];
    scholarships: Scholarship[];
  }>({ colleges: [], scholarships: [] });

  // Fetch hero content from backend
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await api.get("/hero");
        setHeroData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hero content:", err);
        setError("Failed to load hero content");
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults({ colleges: [], scholarships: [] });
      return;
    }

    try {
      // Search colleges and scholarships from backend
      const [collegesRes, scholarshipsRes] = await Promise.all([
        api.get(`/admin/colleges?search=${query}`),
        api.get(`/scholarships?search=${query}`)
      ]);

      // Filter results to only include items that match the search query
      const filteredColleges = collegesRes.data.data
        .filter((college: any) => 
          college.organizationName.toLowerCase().includes(query.toLowerCase()) ||
          college.location.toLowerCase().includes(query.toLowerCase())
        )
        .map((college: any) => ({
          _id: college._id,
          organizationName: college.organizationName,
          location: college.location
        }));

      const filteredScholarships = (scholarshipsRes.data.data || scholarshipsRes.data || [])
        .filter((scholarship: any) => 
          scholarship.name.toLowerCase().includes(query.toLowerCase()) ||
          scholarship.organizationName.toLowerCase().includes(query.toLowerCase())
        );

      setSearchResults({
        colleges: filteredColleges,
        scholarships: filteredScholarships
      });
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults({ colleges: [], scholarships: [] });
    }
  };

  if (loading) {
    return (
      <div className="relative bg-white overflow-hidden h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-white overflow-hidden h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Banner Media */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full object-cover">
          {heroData.bannerMedia.type === "video" ? (
            <video 
              className="w-full h-full object-cover opacity-80" 
              autoPlay 
              loop 
              muted 
              src={heroData.bannerMedia.src}
            ></video>
          ) : (
            <img
              src={heroData.bannerMedia.src || "/placeholder.svg"}
              alt="Banner"
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            {/* Title */}
            <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl">
              <span className="block">{heroData.titleLine1}</span>
              <span className="block text-yellow-400">{heroData.titleLine2}</span>
              <span className="block">{heroData.titleLine3}</span>
            </h1>

            {/* Description */}
            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
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
              {(searchResults.colleges.length > 0 || searchResults.scholarships.length > 0) && (
                <div className="mt-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto lg:mx-0 p-4">
                  {searchResults.colleges.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Colleges</h3>
                      <ul>
                        {searchResults.colleges.map((college) => (
                          <li key={college._id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <Link
                              to={`/colleges/${encodeURIComponent(college.organizationName)}`}
                              className="block w-full h-full"
                            >
                              {college.organizationName} - {college.location}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.scholarships.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
                      <ul>
                        {searchResults.scholarships.map((scholarship) => (
                          <li key={scholarship._id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <Link
                              to={`/scholarships/${encodeURIComponent(scholarship.organizationName)}`}
                              className="block w-full h-full"
                            >
                              {scholarship.name} - {scholarship.organizationName}
                            </Link>
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
                <div className="text-2xl font-semibold text-white">
                  {heroData.stats.colleges}
                </div>
                <div className="text-sm text-gray-400">Colleges</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {heroData.stats.students}
                </div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {heroData.stats.scholarships}
                </div>
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