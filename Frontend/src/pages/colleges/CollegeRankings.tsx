import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import type { RankingCriteria } from "../../types/college";

const rankingCriteria: RankingCriteria[] = [
  { id: "1", name: "Academic Excellence", key: "academic" },
  { id: "2", name: "Student Satisfaction", key: "studentSatisfaction" },
  { id: "3", name: "Placement Rate", key: "placement" },
];

// Added previousRank to each college to track changes
const colleges = [
  {
    id: "1",
    organizationName: "Asia Pacific University of Technology & Innovation (APU)",
    location: "Kuala Lumpur, Malaysia",
    imageUrl: "https://source.unsplash.com/featured/?university",
    rankings: { academic: 93, studentSatisfaction: 88, placement: 92 },
    previousRank: { academic: 3, studentSatisfaction: 5, placement: 4 },
  },
  {
    id: "2",
    organizationName: "Lord Buddha Education Foundation (LBEF)",
    location: "Kathmandu, Nepal",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrm3kXNBBBtAg8pvtNG0G-ZEyq2ebaCC51h4wzxus5j34TMJNovNvngZENQVKdy0JwIsc&usqp=CAU",
    rankings: { academic: 80, studentSatisfaction: 86, placement: 95 },
    previousRank: { academic: 15, studentSatisfaction: 12, placement: 16 },
  },
  {
    id: "3",
    organizationName: "Tribhuvan University",
    location: "Kirtipur, Nepal",
    imageUrl: "https://source.unsplash.com/featured/?campus",
    rankings: { academic: 85, studentSatisfaction: 80, placement: 70 },
    previousRank: { academic: 8, studentSatisfaction: 15, placement: 18 },
  },
  {
    id: "4",
    organizationName: "Kathmandu University",
    location: "Dhulikhel, Nepal",
    imageUrl: "https://source.unsplash.com/featured/?students",
    rankings: { academic: 88, studentSatisfaction: 84, placement: 77 },
    previousRank: { academic: 6, studentSatisfaction: 8, placement: 14 },
  },
  {
    id: "5",
    organizationName: "Harvard University",
    location: "Cambridge, USA",
    imageUrl: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?cs=srgb&dl=pexels-pixabay-207692.jpg&fm=jpg",
    rankings: { academic: 99, studentSatisfaction: 97, placement: 98 },
    previousRank: { academic: 1, studentSatisfaction: 2, placement: 1 },
  },
  {
    id: "6",
    organizationName: "Massachusetts Institute of Technology (MIT)",
    location: "Cambridge, USA",
    imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    rankings: { academic: 100, studentSatisfaction: 95, placement: 97 },
    previousRank: { academic: 2, studentSatisfaction: 3, placement: 2 },
  },
  {
    id: "7",
    organizationName: "Stanford University",
    location: "California, USA",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    rankings: { academic: 98, studentSatisfaction: 96, placement: 94 },
    previousRank: { academic: 4, studentSatisfaction: 1, placement: 3 },
  },
  {
    id: "8",
    organizationName: "University of Tokyo",
    location: "Tokyo, Japan",
    imageUrl: "https://source.unsplash.com/featured/?tokyo",
    rankings: { academic: 93, studentSatisfaction: 89, placement: 88 },
    previousRank: { academic: 5, studentSatisfaction: 6, placement: 5 },
  },
  {
    id: "9",
    organizationName: "University of Melbourne",
    location: "Melbourne, Australia",
    imageUrl: "https://source.unsplash.com/featured/?melbourne",
    rankings: { academic: 90, studentSatisfaction: 85, placement: 87 },
    previousRank: { academic: 7, studentSatisfaction: 9, placement: 7 },
  },
  {
    id: "10",
    organizationName: "National University of Singapore (NUS)",
    location: "Singapore",
    imageUrl: "https://source.unsplash.com/featured/?nus",
    rankings: { academic: 94, studentSatisfaction: 91, placement: 92 },
    previousRank: { academic: 9, studentSatisfaction: 4, placement: 6 },
  },
  {
    id: "11",
    organizationName: "University of British Columbia (UBC)",
    location: "Vancouver, Canada",
    imageUrl: "https://source.unsplash.com/featured/?ubc",
    rankings: { academic: 89, studentSatisfaction: 86, placement: 85 },
    previousRank: { academic: 10, studentSatisfaction: 7, placement: 9 },
  },
  {
    id: "12",
    organizationName: "ETH Zurich",
    location: "Zurich, Switzerland",
    imageUrl: "https://source.unsplash.com/featured/?eth",
    rankings: { academic: 96, studentSatisfaction: 90, placement: 91 },
    previousRank: { academic: 11, studentSatisfaction: 10, placement: 8 },
  },
  {
    id: "13",
    organizationName: "Peking University",
    location: "Beijing, China",
    imageUrl: "https://source.unsplash.com/featured/?peking",
    rankings: { academic: 91, studentSatisfaction: 87, placement: 86 },
    previousRank: { academic: 12, studentSatisfaction: 11, placement: 10 },
  },
  {
    id: "14",
    organizationName: "University of Cape Town",
    location: "Cape Town, South Africa",
    imageUrl: "https://source.unsplash.com/featured/?capetown",
    rankings: { academic: 83, studentSatisfaction: 79, placement: 76 },
    previousRank: { academic: 13, studentSatisfaction: 14, placement: 13 },
  },
  {
    id: "15",
    organizationName: "University of Warsaw",
    location: "Warsaw, Poland",
    imageUrl: "https://source.unsplash.com/featured/?warsaw",
    rankings: { academic: 82, studentSatisfaction: 78, placement: 74 },
    previousRank: { academic: 14, studentSatisfaction: 16, placement: 15 },
  },
  {
    id: "16",
    organizationName: "University of Delhi",
    location: "Delhi, India",
    imageUrl: "https://source.unsplash.com/featured/?delhi",
    rankings: { academic: 80, studentSatisfaction: 83, placement: 79 },
    previousRank: { academic: 16, studentSatisfaction: 13, placement: 12 },
  },
  {
    id: "17",
    organizationName: "University of Amsterdam",
    location: "Amsterdam, Netherlands",
    imageUrl: "https://source.unsplash.com/featured/?amsterdam",
    rankings: { academic: 87, studentSatisfaction: 85, placement: 82 },
    previousRank: { academic: 17, studentSatisfaction: 17, placement: 11 },
  },
  {
    id: "18",
    organizationName: "Monash University",
    location: "Melbourne, Australia",
    imageUrl: "https://source.unsplash.com/featured/?monash",
    rankings: { academic: 88, studentSatisfaction: 86, placement: 84 },
    previousRank: { academic: 18, studentSatisfaction: 18, placement: 17 },
  },
  {
    id: "19",
    organizationName: "Nanyang Technological University (NTU)",
    location: "Singapore",
    imageUrl: "https://source.unsplash.com/featured/?ntu",
    rankings: { academic: 93, studentSatisfaction: 90, placement: 89 },
    previousRank: { academic: 19, studentSatisfaction: 19, placement: 19 },
  },
  {
    id: "20",
    organizationName: "University of Edinburgh",
    location: "Edinburgh, UK",
    imageUrl: "https://source.unsplash.com/featured/?edinburgh",
    rankings: { academic: 90, studentSatisfaction: 88, placement: 86 },
    previousRank: { academic: 20, studentSatisfaction: 20, placement: 20 },
  },
];

const CollegeRankings = () => {
  const [selectedCriteria, setSelectedCriteria] =
    useState<RankingCriteria["key"]>("academic");

  const sortedColleges = [...colleges].sort(
    (a, b) => b.rankings[selectedCriteria] - a.rankings[selectedCriteria]
  );

  // Function to calculate rank change
  const getRankChange = (college: typeof colleges[0], currentIndex: number) => {
    const previousRank = college.previousRank[selectedCriteria];
    const currentRank = currentIndex + 1;
    const change = previousRank - currentRank;
    
    return {
      change,
      isPositive: change > 0,
      isNegative: change < 0,
      isNeutral: change === 0
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">College Rankings</h1>
          <p className="text-gray-600">
            Compare colleges based on different criteria
          </p>
        </div>
        <Select
          value={selectedCriteria}
          onValueChange={(value) =>
            setSelectedCriteria(value as RankingCriteria["key"])
          }
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select ranking criteria" />
          </SelectTrigger>
          <SelectContent>
            {rankingCriteria.map((criteria) => (
              <SelectItem key={criteria.id} value={criteria.key}>
                {criteria.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {sortedColleges.slice(0, 3).map((college, index) => (
          <div
            key={college.id}
            className="relative bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-400"
          >
            <div className="absolute -top-4 left-4 bg-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <Trophy className="h-8 w-8 text-yellow-400 mb-4" />
            <img
              src={college.imageUrl}
              alt={college.organizationName}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{college.organizationName}</h3>
            <p className="text-gray-600 mb-4">{college.location}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Academic Rank:</span>
                <span className="font-medium">{college.rankings.academic}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Student Satisfaction:
                </span>
                <span className="font-medium">
                  {college.rankings.studentSatisfaction}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Placement Rate:</span>
                <span className="font-medium">
                  {college.rankings.placement}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Complete Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  College
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Previous Rank
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedColleges.map((college, index) => {
                const rankChange = getRankChange(college, index);
                const changeText = rankChange.change > 0 
                  ? `+${rankChange.change}` 
                  : rankChange.change.toString();
                
                return (
                  <tr key={college.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {college.organizationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {college.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {college.rankings[selectedCriteria]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {college.previousRank[selectedCriteria]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {rankChange.isPositive ? (
                        <span className="inline-flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" /> {changeText}
                        </span>
                      ) : rankChange.isNegative ? (
                        <span className="inline-flex items-center text-red-600">
                          <TrendingDown className="h-4 w-4 mr-1" /> {changeText}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollegeRankings;