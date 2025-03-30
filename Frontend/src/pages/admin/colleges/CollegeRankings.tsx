import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { RankingCriteria, College } from "../../../types/college";
import { colleges as initialColleges } from "../../../data/colleges";

const rankingCriteria: RankingCriteria[] = [
  { id: "1", name: "Academic Excellence", key: "academic" },
  { id: "2", name: "Student Satisfaction", key: "studentSatisfaction" },
  { id: "3", name: "Placement Rate", key: "placement" },
];

const AdminCollegeRankings = () => {
  const [selectedCriteria, setSelectedCriteria] =
    useState<RankingCriteria["key"]>("academic");
  const [colleges, setColleges] = useState<College[]>(initialColleges);

  // Sort colleges based on the selected criteria
  const sortedColleges = [...colleges].sort(
    (a, b) => b.rankings[selectedCriteria] - a.rankings[selectedCriteria]
  );

  // Handle ranking changes
  const handleRankingChange = (
    collegeId: string,
    criteria: keyof College["rankings"],
    value: string
  ) => {
    const updatedColleges = colleges.map((college) =>
      college.id === collegeId
        ? {
            ...college,
            rankings: {
              ...college.rankings,
              [criteria]: parseInt(value) || 0, // Ensure it's a number
            },
          }
        : college
    );
    setColleges(updatedColleges);
  };

  // Calculate rank change (difference between current and previous rank)
  const calculateRankChange = (index: number) => {
    const previousRank = index + 2; // Assuming previous rank is always +1
    const currentRank = index + 1;
    return previousRank - currentRank; // Positive for improvement, negative for decline
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
              alt={college.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
            <p className="text-gray-600 mb-4">{college.location}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Academic Rank:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="font-medium outline-none"
                  onBlur={(e) =>
                    handleRankingChange(
                      college.id,
                      "academic",
                      e.target.innerText
                    )
                  }
                >
                  {college.rankings.academic}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Student Satisfaction:
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="font-medium outline-none"
                  onBlur={(e) =>
                    handleRankingChange(
                      college.id,
                      "studentSatisfaction",
                      e.target.innerText
                    )
                  }
                >
                  {college.rankings.studentSatisfaction}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Placement Rate:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="font-medium outline-none"
                  onBlur={(e) =>
                    handleRankingChange(
                      college.id,
                      "placement",
                      e.target.innerText
                    )
                  }
                >
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
                const rankChange = calculateRankChange(index);
                return (
                  <tr key={college.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {college.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {college.location}
                    </td>
                    <td
                      contentEditable
                      suppressContentEditableWarning
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 outline-none"
                      onBlur={(e) =>
                        handleRankingChange(
                          college.id,
                          selectedCriteria,
                          e.target.innerText
                        )
                      }
                    >
                      {college.rankings[selectedCriteria]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center ${
                          rankChange >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {rankChange >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {rankChange}
                      </span>
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

export default AdminCollegeRankings;
