import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Award,
  Building,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  ChevronRight,
  Clock,
  Plus,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";
import { useState } from "react";
import { collegesData } from "../../../../data/collegeDetails1";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

type Program = {
  name: string;
  type: "undergraduate" | "postgraduate" | "doctorate";
  duration: string;
  description: string;
};

type ProgramLevel = "undergraduate" | "postgraduate" | "doctorate";

type Programs = {
  [K in ProgramLevel]?: Program[];
};

const AboutInstitute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = collegesData.find((c) => c.id === Number(id));

  const [programs, setPrograms] = useState<Programs>(college?.programs || {});
  const [hasChanges, setHasChanges] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            College not found
          </h2>
          <Button onClick={() => navigate("/colleges")} className="mt-4">
            Back to Colleges
          </Button>
        </div>
      </div>
    );
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleAddProgram = (level: ProgramLevel, newProgram: Program) => {
    setPrograms((prev) => ({
      ...prev,
      [level]: [...(prev[level] || []), newProgram],
    }));
    setHasChanges(true);
  };

  const handleEditProgram = (
    level: ProgramLevel,
    index: number,
    updatedProgram: Program
  ) => {
    setPrograms((prev) => ({
      ...prev,
      [level]:
        prev[level]?.map((p, i) => (i === index ? updatedProgram : p)) || [],
    }));
    setHasChanges(true);
  };

  const handleDeleteProgram = (level: ProgramLevel, index: number) => {
    setPrograms((prev) => ({
      ...prev,
      [level]: prev[level]?.filter((_, i) => i !== index) || [],
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    // Here you would typically make an API call to save the changes
    console.log("Saving changes:", programs);
    setHasChanges(false);
  };

  const ProgramForm = ({
    program,
    onSubmit,
    level,
  }: {
    program?: Program;
    onSubmit: (program: Program) => void;
    level: ProgramLevel;
  }) => {
    const [formData, setFormData] = useState<Program>(
      program || {
        name: "",
        type: level,
        duration: "",
        description: "",
      }
    );

    return (
      <div className="space-y-4 bg-white">
        <div className="space-y-2 bg-white">
          <Label htmlFor="name">Program Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
        </div>
        <div className="space-y-2 bg-white">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <DialogClose asChild>
          <Button onClick={() => onSubmit(formData)} className="w-full">
            {program ? "Update Program" : "Add Program"}
          </Button>
        </DialogClose>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover transform scale-110"
          style={{
            backgroundImage: `url(${coverImage || college.imageUrl})`,
            transform: "translateZ(0)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
            <div className="pb-20 text-white">
              <h1
                className="text-5xl font-bold mb-4"
                contentEditable
                suppressContentEditableWarning
              >
                {college.name}
              </h1>
              <div className="flex items-center space-x-6 text-lg">
                <div
                  className="flex items-center"
                  contentEditable
                  suppressContentEditableWarning
                >
                  <MapPin className="h-6 w-6 mr-2" />
                  {college.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{college.rating}</span>
                </div>
                <div
                  className="flex items-center"
                  contentEditable
                  suppressContentEditableWarning
                >
                  <Building className="h-6 w-6 mr-2" />
                  Est. {college.foundedYear}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <Label htmlFor="coverImage" className="text-white mb-1">
            Upload Cover Images
          </Label>
          <Input
            type="file"
            id="coverImage"
            onChange={handleCoverImageChange}
            className="bg-white"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
                  College Overview
                </h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {college.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Global Ranking</p>
                        <p className="text-xl font-bold text-gray-900">
                          #{college.globalRanking}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Alumni Network</p>
                        <p
                          className="text-xl font-bold text-gray-900"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {college.alumniCount.toLocaleString()}+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Programs Section with CRUD operations */}
            <section id="programs" className="scroll-mt-24 bg-white">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
                    Academic Programs
                  </h2>
                  {hasChanges && (
                    <Button
                      onClick={handleSaveChanges}
                      className="flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>
                <div className="space-y-8">
                  {(
                    Object.entries(programs) as [ProgramLevel, Program[]][]
                  ).map(([level, programsList]) => (
                    <div key={level}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 capitalize">
                          {level} Programs
                        </h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Program
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Add New Program</DialogTitle>
                              <DialogDescription>
                                Add a new program to the {level} level
                              </DialogDescription>
                            </DialogHeader>
                            <ProgramForm
                              level={level}
                              onSubmit={(newProgram) => {
                                handleAddProgram(level, newProgram);
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="grid gap-4">
                        {programsList.map((program, index) => (
                          <div
                            key={`${program.name}-${index}`}
                            className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow relative group"
                          >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white">
                                  <DialogHeader>
                                    <DialogTitle>Edit Program</DialogTitle>
                                    <DialogDescription>
                                      Make changes to the program
                                    </DialogDescription>
                                  </DialogHeader>
                                  <ProgramForm
                                    program={program}
                                    level={level}
                                    onSubmit={(updatedProgram) => {
                                      handleEditProgram(
                                        level,
                                        index,
                                        updatedProgram
                                      );
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Program
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      program? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      <Button variant="ghost">Cancel</Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProgram(level, index)
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {program.name}
                            </h4>
                            <p className="text-gray-600 mt-2">
                              {program.description}
                            </p>
                            <div className="flex items-center mt-4 text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              Duration: {program.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="h-8 w-8 mr-3 text-blue-600" />
                  Latest Student Reviews
                </h2>
                <div className="space-y-6">
                  {college.studentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {review.studentName}
                          </p>
                          <p className="text-blue-600">{review.program}</p>
                        </div>
                        <div className="flex items-center bg-white px-3 py-1 rounded-full">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:space-y-8">
            {/* Quick Actions Card */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Placement Rate</span>
                    <span
                      className="font-semibold text-blue-600"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {college.careerStats.placementRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Starting Salary</span>
                    <span
                      className="font-semibold text-blue-600"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {college.careerStats.averageSalary}
                    </span>
                  </div>
                  <Button
                    onClick={() => navigate(`/colleges/${id}/apply`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mb-6"
                  >
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Application Deadlines */}
              <div
                id="admissions"
                className="bg-white rounded-2xl shadow-xl p-8 mb-8 scroll-mt-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Application Deadlines
                </h3>
                <div className="space-y-4">
                  {Object.entries(college.applicationDeadlines).map(
                    ([term, date]) => (
                      <div
                        key={term}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="capitalize">{term} Intake</span>
                        </div>
                        <span className="font-medium">{date}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Tuition Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                  Tuition & Fees
                </h3>
                <div className="space-y-4">
                  {college.tuition.map((fee) => (
                    <div key={fee.level} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="capitalize text-gray-600"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {fee.level}
                        </span>
                        <span
                          className="font-semibold text-gray-900"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {fee.range}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{fee.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInstitute;
