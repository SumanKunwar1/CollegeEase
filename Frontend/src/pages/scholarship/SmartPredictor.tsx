import { useState, useEffect } from "react";
import {
  Calculator,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface Scholarship {
  id: string;
  name: string;
  organizationName: string;
  type: string;
  deadline: string;
  amount: string;
  status: string;
  coverImage: string;
  requirements: {
    minimumGPA: number;
    preferredGPA: number;
    competitiveGPA: number;
    majorWeights: Record<string, number>;
    countryDiversity: {
      priority: string[];
      weight: number;
    };
  };
  statistics: {
    averageGPAAwarded: number;
    totalApplications: number;
    acceptanceRate: number;
    majorDistribution: Record<string, number>;
  };
  vision: {
    purpose: string;
  };
  eligibleCountries: string[];
}

interface PredictionResult {
  percentage: number;
  feedback: string;
  status: "high" | "medium" | "low";
  details: {
    gpaScore: number;
    majorScore: number;
    diversityScore: number;
    competitionScore: number;
  };
}

const SmartPredictor = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState("");
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [country, setCountry] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/scholarships`);
        if (!response.ok) {
          throw new Error("Failed to fetch scholarships");
        }
        const data = await response.json();
        // Add id field to each scholarship (using _id from MongoDB or generating a new one)
        const formattedData = data.map((scholarship: any) => ({
          ...scholarship,
          id: scholarship._id || Math.random().toString(36).substring(2, 9),
          requirements: scholarship.requirements || {
            minimumGPA: 3.0,
            preferredGPA: 3.5,
            competitiveGPA: 3.7,
            majorWeights: {
              "Computer Science": 1.0,
              "Engineering": 0.9,
              "Medicine": 0.8,
              "Business": 0.7,
              "Other": 0.5
            },
            countryDiversity: {
              priority: ["Nepal", "malaysia","India", "Nigeria", "Brazil", "Vietnam"],
              weight: 1.2
            }
          },
          statistics: scholarship.statistics || {
            averageGPAAwarded: 3.6,
            totalApplications: 1000,
            acceptanceRate: 0.1,
            majorDistribution: {
              "Computer Science": 0.3,
              "Engineering": 0.25,
              "Medicine": 0.2,
              "Business": 0.15,
              "Other": 0.1
            }
          },
          eligibleCountries: scholarship.eligibleCountries || ["Nepal", "malaysia","Singapore","India", "Nigeria", "Brazil", "Vietnam"]
        }));
        setScholarships(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const calculatePrediction = () => {
    const scholarship = scholarships.find((s) => s.id === selectedScholarship);
    if (!scholarship) return;

    const gpaNum = parseFloat(gpa);
    let scores = {
      gpaScore: 0,
      majorScore: 0,
      diversityScore: 0,
      competitionScore: 0,
    };

    // GPA Scoring (40% of total) - More strict calculation
    if (gpaNum >= scholarship.requirements.competitiveGPA) {
      scores.gpaScore = 40;
    } else if (gpaNum >= scholarship.requirements.preferredGPA) {
      scores.gpaScore =
        30 +
        ((gpaNum - scholarship.requirements.preferredGPA) /
          (scholarship.requirements.competitiveGPA -
            scholarship.requirements.preferredGPA)) *
          10;
    } else if (gpaNum >= scholarship.requirements.minimumGPA) {
      scores.gpaScore = Math.max(
        0,
        15 +
          ((gpaNum - scholarship.requirements.minimumGPA) /
            (scholarship.requirements.preferredGPA -
              scholarship.requirements.minimumGPA)) *
            15
      );
    } else {
      // Below minimum GPA gets a very low score
      scores.gpaScore = Math.max(
        0,
        Math.min(10, (gpaNum / scholarship.requirements.minimumGPA) * 10)
      );
    }

    // Major Scoring (30% of total)
    const majorWeight =
      scholarship.requirements.majorWeights[
        major as keyof typeof scholarship.requirements.majorWeights
      ] || scholarship.requirements.majorWeights.Other;
    scores.majorScore = Math.min(30, 30 * majorWeight);

    // Diversity Scoring (20% of total)
    const isDiversityCountry =
      scholarship.requirements.countryDiversity.priority.includes(country);
    scores.diversityScore = Math.min(
      20,
      isDiversityCountry
        ? 20 * scholarship.requirements.countryDiversity.weight
        : 15
    );

    // Competition Score based on historical data (10% of total)
    const majorDistribution =
      scholarship.statistics.majorDistribution[
        major as keyof typeof scholarship.statistics.majorDistribution
      ] || scholarship.statistics.majorDistribution.Other;
    scores.competitionScore = Math.min(
      9,
      9 * (1 - majorDistribution * scholarship.statistics.acceptanceRate)
    );

    // Calculate total percentage and ensure it doesn't exceed 100
    const totalScore = Math.min(
      100,
      Object.values(scores).reduce((a, b) => a + b, 0)
    );
    const percentage = Math.round(totalScore);

    // Determine status and feedback with more strict thresholds
    let status: PredictionResult["status"];
    let feedback: string;

    if (percentage >= 80 && gpaNum >= scholarship.requirements.preferredGPA) {
      status = "high";
      feedback = `Excellent prospects! Your GPA of ${gpa} is ${
        gpaNum >= scholarship.requirements.competitiveGPA
          ? "highly competitive"
          : "strong"
      }, and your major in ${major} aligns well with the scholarship's focus. ${
        isDiversityCountry
          ? "Your country of origin adds to your competitive advantage."
          : ""
      } Based on historical data, you have a strong chance of success.`;
    } else if (
      percentage >= 60 &&
      gpaNum >= scholarship.requirements.minimumGPA
    ) {
      status = "medium";
      feedback = `Good potential! While your GPA of ${gpa} meets the requirements, ${
        gpaNum < scholarship.requirements.preferredGPA
          ? "there might be candidates with higher academic scores. "
          : "you have a competitive academic profile. "
      }${major} candidates historically have a ${
        majorDistribution > 0.25 ? "high" : "moderate"
      } acceptance rate. Consider strengthening your application with strong letters of recommendation and extracurricular activities.`;
    } else {
      status = "low";
      feedback = `Your application may face some challenges. ${
        gpaNum < scholarship.requirements.minimumGPA
          ? "Your GPA is significantly below the typical minimum requirement. We recommend improving your academic performance before applying. "
          : "While you meet the minimum GPA requirement, the competition is typically very strong. "
      }Consider ${
        gpaNum < 3.0 ? "focusing on improving your GPA and " : ""
      }highlighting unique achievements and experiences in your application. ${
        isDiversityCountry
          ? "Your country of origin may provide some advantage in the selection process."
          : "You might want to explore other scholarship opportunities as well."
      }`;
    }

    setPredictionResult({ percentage, feedback, status, details: scores });
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700">{error}</p>
          <Button
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scholarship Smart Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized predictions on your chances of receiving specific
            scholarships based on our advanced analysis system
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Scholarship
              </label>
              <Select
                value={selectedScholarship}
                onValueChange={setSelectedScholarship}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose a scholarship" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {scholarships.map((scholarship) => (
                    <SelectItem key={scholarship.id} value={scholarship.id}>
                      {scholarship.name} ({scholarship.amount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedScholarship && (
                <div className="mt-2 text-sm text-gray-500">
                  {
                    scholarships.find((s) => s.id === selectedScholarship)
                      ?.vision?.purpose
                  }
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current GPA
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                placeholder="Enter your GPA (e.g., 3.5)"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Major
              </label>
              <Select value={major} onValueChange={setMajor}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your major" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country of Origin
              </label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {scholarships[0]?.eligibleCountries?.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full mt-8 h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={calculatePrediction}
            disabled={!selectedScholarship || !gpa || !major || !country}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate My Chances
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Your Scholarship Prediction
              </DialogTitle>
            </DialogHeader>
            {predictionResult && (
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div
                    className={`
                      w-36 h-36 rounded-full flex items-center justify-center text-3xl font-bold
                      transform transition-all duration-300 ease-in-out
                      ${
                        predictionResult.status === "high"
                          ? "bg-green-100 text-green-800 scale-110"
                          : predictionResult.status === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800 scale-95"
                      }
                    `}
                  >
                    {predictionResult.percentage}%
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    {predictionResult.status === "high" ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    ) : predictionResult.status === "medium" ? (
                      <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    )}
                    <p className="text-gray-600">{predictionResult.feedback}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Detailed Breakdown
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Academic Score</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{
                                width: `${
                                  (predictionResult.details.gpaScore / 40) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">
                            {predictionResult.details.gpaScore.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Major Alignment</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{
                                width: `${
                                  (predictionResult.details.majorScore / 30) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">
                            {predictionResult.details.majorScore.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Diversity Factor</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                            <div
                              className="h-full bg-purple-600 rounded-full"
                              style={{
                                width: `${
                                  (predictionResult.details.diversityScore /
                                    20) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">
                            {predictionResult.details.diversityScore.toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Competition Level</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                            <div
                              className="h-full bg-orange-600 rounded-full"
                              style={{
                                width: `${
                                  (predictionResult.details.competitionScore /
                                    10) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">
                            {predictionResult.details.competitionScore.toFixed(
                              1
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowResult(false)}
                    className="px-6"
                  >
                    Try Another
                  </Button>
                  <Button className="px-6 bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SmartPredictor;