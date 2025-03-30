"use client";

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
import { useState, useEffect } from "react";
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
import { toast } from "react-hot-toast";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1';

// Type Definitions
type Program = {
  _id?: string;
  name: string;
  level: "undergraduate" | "postgraduate" | "doctorate";
  duration: string;
  description: string;
};

type ProgramLevel = "undergraduate" | "postgraduate" | "doctorate";

type Programs = {
  [K in ProgramLevel]?: Program[];
};

type Review = {
  id: string;
  studentName: string;
  program: string;
  rating: number;
  review: string;
};

type Tuition = {
  level: string;
  range: string;
  notes: string;
};

type Deadlines = {
  fall: string;
  spring: string;
  summer: string;
};

type CareerStats = {
  placementRate: string;
  averageSalary: string;
};

type CollegeType = {
  organizationName: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  foundedYear: string;
  globalRanking: number;
  alumniCount: number;
  programs: Programs;
  studentReviews: Review[];
  tuition: Tuition[];
  applicationDeadlines: Deadlines;
  careerStats: CareerStats;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// Empty college template
const emptyCollege: CollegeType = {
  organizationName: '',
  name: '',
  description: '',
  imageUrl: '',
  location: '',
  rating: 0,
  foundedYear: new Date().getFullYear().toString(),
  globalRanking: 0,
  alumniCount: 0,
  programs: {
    undergraduate: [],
    postgraduate: [],
    doctorate: []
  },
  studentReviews: [],
  tuition: [
    { level: 'undergraduate', range: '', notes: '' },
    { level: 'postgraduate', range: '', notes: '' },
    { level: 'doctorate', range: '', notes: '' }
  ],
  applicationDeadlines: {
    fall: '',
    spring: '',
    summer: ''
  },
  careerStats: {
    placementRate: '',
    averageSalary: ''
  }
};

const AboutInstitute = () => {
  const { organizationName: orgNameParam } = useParams<{ organizationName: string }>();
  const navigate = useNavigate();
  const [college, setCollege] = useState<CollegeType | null>(null);
  const [programs, setPrograms] = useState<Programs>(emptyCollege.programs);
  const [hasChanges, setHasChanges] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editableData, setEditableData] = useState<Partial<CollegeType>>({});

  const formatOrganizationName = (name: string) => {
    return name ? decodeURIComponent(name).replace(/%20/g, ' ') : '';
  };

  const fetchCollegeDetails = async () => {
    try {
      setLoading(true);
      const formattedOrgName = formatOrganizationName(orgNameParam || '');
      
      if (!formattedOrgName) {
        throw new Error('Organization name is required');
      }

      // First try to fetch college details
      const response = await fetch(`${API_BASE_URL}/college-details/${encodeURIComponent(formattedOrgName)}`);
      
      if (response.status === 404) {
        // College not found, create new with basic info
        const newCollege = {
          ...emptyCollege,
          organizationName: formattedOrgName,
          name: formattedOrgName,
          location: ''
        };
        setCollege(newCollege);
        setEditableData({
          name: formattedOrgName,
          location: ''
        });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch college details');
      }
      
      const data: ApiResponse<CollegeType> = await response.json();
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Invalid data format');
      }

      setCollege(data.data);
      setPrograms(data.data.programs || emptyCollege.programs);
      setEditableData({
        name: data.data.name,
        description: data.data.description,
        location: data.data.location,
        foundedYear: data.data.foundedYear,
        globalRanking: data.data.globalRanking,
        alumniCount: data.data.alumniCount,
        careerStats: data.data.careerStats,
        tuition: data.data.tuition || emptyCollege.tuition,
        applicationDeadlines: data.data.applicationDeadlines || emptyCollege.applicationDeadlines
      });
    } catch (error) {
      console.error("Error fetching college details:", error);
      toast.error("Failed to load college details");
      setCollege({
        ...emptyCollege,
        organizationName: formatOrganizationName(orgNameParam || ''),
        name: formatOrganizationName(orgNameParam || '')
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollegeDetails();
  }, [orgNameParam]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setHasChanges(true);
    }
  };

  const handleInputChange = (field: keyof CollegeType, value: any) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleAddProgram = (level: ProgramLevel, newProgram: Program) => {
    setPrograms(prev => ({
      ...prev,
      [level]: [...(prev[level] || []), newProgram],
    }));
    setHasChanges(true);
  };

  const handleEditProgram = (level: ProgramLevel, index: number, updatedProgram: Program) => {
    setPrograms(prev => ({
      ...prev,
      [level]: prev[level]?.map((p, i) => (i === index ? updatedProgram : p)) || [],
    }));
    setHasChanges(true);
  };

  const handleDeleteProgram = (level: ProgramLevel, index: number) => {
    setPrograms(prev => ({
      ...prev,
      [level]: prev[level]?.filter((_, i) => i !== index) || [],
    }));
    setHasChanges(true);
  };

  const handleDeadlineChange = (term: keyof Deadlines, value: string) => {
    handleInputChange('applicationDeadlines', {
      ...(editableData.applicationDeadlines || college?.applicationDeadlines || emptyCollege.applicationDeadlines),
      [term]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (!college || !orgNameParam) {
        toast.error("College information is incomplete");
        return;
      }
      
      const formattedOrgName = formatOrganizationName(orgNameParam);
      
      if (!formattedOrgName) {
        toast.error("Organization name is required");
        return;
      }

      const updatedCollege = {
        ...college,
        ...editableData,
        programs,
        imageUrl: coverImage || college.imageUrl,
        organizationName: formattedOrgName
      };

      console.log("Saving college:", updatedCollege); // Debug log

      const response = await fetch(`${API_BASE_URL}/college-details/${encodeURIComponent(formattedOrgName)}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCollege)
      });

      if (!response.ok) {
        let errorMessage = 'Failed to save changes';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const updatedData: ApiResponse<CollegeType> = await response.json();
      
      if (!updatedData.success || !updatedData.data) {
        throw new Error(updatedData.message || 'Invalid response format');
      }

      setCollege(updatedData.data);
      setHasChanges(false);
      toast.success("Changes saved successfully!");
    } catch (error: any) {
      console.error("Error saving changes:", error);
      toast.error(error.message || "Failed to save changes. Please try again.");
    }
  };

  const ProgramForm = ({ program, onSubmit, level }: {
    program?: Program;
    onSubmit: (program: Program) => void;
    level: ProgramLevel;
  }) => {
    const [formData, setFormData] = useState<Program>(
      program || {
        name: "",
        level: level,
        duration: "",
        description: "",
      },
    );

    return (
      <div className="space-y-4 bg-white">
        <div className="space-y-2">
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
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading College Details...</h2>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">College Not Found</h2>
          <Button onClick={() => navigate("/colleges")} className="mt-4">
            Back to Colleges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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
              <Input
                value={editableData.name || college.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-5xl font-bold mb-4 bg-transparent border-none text-white p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  <Input
                    value={editableData.location || college.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-transparent border-none text-white p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{college.rating}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-6 w-6 mr-2" />
                  Est. <Input
                    value={editableData.foundedYear || college.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    className="bg-transparent border-none text-white p-0 w-20 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <Label htmlFor="coverImage" className="text-white mb-1">
            Upload Cover Image
          </Label>
          <Input 
            type="file" 
            id="coverImage" 
            onChange={handleCoverImageChange} 
            className="bg-white" 
            accept="image/*"
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
                <Textarea
                  value={editableData.description || college.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="text-gray-600 text-lg leading-relaxed mb-8 min-h-[200px]"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Global Ranking</p>
                        <Input
                          value={editableData.globalRanking?.toString() || college.globalRanking.toString()}
                          onChange={(e) => handleInputChange('globalRanking', parseInt(e.target.value) || 0)}
                          className="text-xl font-bold text-gray-900 p-0 border-none focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Alumni Network</p>
                        <Input
                          value={editableData.alumniCount?.toString() || college.alumniCount.toString()}
                          onChange={(e) => handleInputChange('alumniCount', parseInt(e.target.value) || 0)}
                          className="text-xl font-bold text-gray-900 p-0 border-none focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
                    Academic Programs
                  </h2>
                  {hasChanges && (
                    <Button onClick={handleSaveChanges} className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>

                <div className="space-y-8">
                  {(['undergraduate', 'postgraduate', 'doctorate'] as ProgramLevel[]).map((level) => {
                    const programsList = programs[level] || [];
                    return (
                      <div key={level}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 capitalize">{level} Programs</h3>
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
                                <DialogDescription>Add a new program to the {level} level</DialogDescription>
                              </DialogHeader>
                              <ProgramForm
                                level={level}
                                onSubmit={(newProgram) => handleAddProgram(level, newProgram)}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>

                        {programsList.length > 0 ? (
                          <div className="grid gap-4">
                            {programsList.map((program, index) => (
                              <div
                                key={`${program._id || program.name}-${index}`}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow relative group"
                              >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Program</DialogTitle>
                                        <DialogDescription>Make changes to the program</DialogDescription>
                                      </DialogHeader>
                                      <ProgramForm
                                        program={program}
                                        level={level}
                                        onSubmit={(updatedProgram) => handleEditProgram(level, index, updatedProgram)}
                                      />
                                    </DialogContent>
                                  </Dialog>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Program</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete this program? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          <Button variant="ghost">Cancel</Button>
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteProgram(level, index)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">{program.name}</h4>
                                <p className="text-gray-600 mt-2">{program.description}</p>
                                <div className="flex items-center mt-4 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Duration: {program.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col items-center justify-center">
                            <GraduationCap className="h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-gray-500 text-center mb-2">No {level} programs added yet</p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Your First Program
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white">
                                <DialogHeader>
                                  <DialogTitle>Add New Program</DialogTitle>
                                  <DialogDescription>Add a new program to the {level} level</DialogDescription>
                                </DialogHeader>
                                <ProgramForm
                                  level={level}
                                  onSubmit={(newProgram) => handleAddProgram(level, newProgram)}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="h-8 w-8 mr-3 text-blue-600" />
                  Student Reviews
                </h2>
                {college.studentReviews.length > 0 ? (
                  <div className="space-y-6">
                    {college.studentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">{review.studentName}</p>
                            <p className="text-blue-600">{review.program}</p>
                          </div>
                          <div className="flex items-center bg-white px-3 py-1 rounded-full">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.review}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No student reviews yet</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:space-y-8">
            {/* Quick Actions Card */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Statistics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Placement Rate</span>
                    <Input
                      value={editableData.careerStats?.placementRate || college.careerStats.placementRate}
                      onChange={(e) => handleInputChange('careerStats', {
                        ...editableData.careerStats,
                        placementRate: e.target.value
                      })}
                      className="w-24 text-right border-none p-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Starting Salary</span>
                    <Input
                      value={editableData.careerStats?.averageSalary || college.careerStats.averageSalary}
                      onChange={(e) => handleInputChange('careerStats', {
                        ...editableData.careerStats,
                        averageSalary: e.target.value
                      })}
                      className="w-32 text-right border-none p-0 focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    onClick={() => navigate(`/colleges/${orgNameParam}/apply`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mb-6"
                  >
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Application Deadlines */}
              <div id="admissions" className="bg-white rounded-2xl shadow-xl p-8 mb-8 scroll-mt-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Application Deadlines</h3>
                <div className="space-y-4">
                  {(['fall', 'spring', 'summer'] as (keyof Deadlines)[]).map((term) => (
                    <div key={term} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="capitalize">{term} Intake</span>
                      </div>
                      <Input
                        type="date"
                        value={(editableData.applicationDeadlines || college.applicationDeadlines)?.[term] || ''}
                        onChange={(e) => handleDeadlineChange(term, e.target.value)}
                        className="font-medium border-none p-0 w-32 focus-visible:ring-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tuition Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                  Tuition & Fees
                </h3>
                <div className="space-y-4">
                  {(editableData.tuition || college.tuition).map((fee, index) => (
                    <div key={fee.level} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="capitalize text-gray-600">{fee.level}</span>
                        <Input
                          value={fee.range}
                          onChange={(e) => {
                            const updatedTuition = [...(editableData.tuition || college.tuition)];
                            updatedTuition[index] = {
                              ...updatedTuition[index],
                              range: e.target.value
                            };
                            handleInputChange('tuition', updatedTuition);
                          }}
                          className="font-semibold text-gray-900 border-none p-0 focus-visible:ring-0"
                          placeholder="e.g. $10,000 - $15,000"
                        />
                      </div>
                      <Textarea
                        value={fee.notes}
                        onChange={(e) => {
                          const updatedTuition = [...(editableData.tuition || college.tuition)];
                          updatedTuition[index] = {
                            ...updatedTuition[index],
                            notes: e.target.value
                          };
                          handleInputChange('tuition', updatedTuition);
                        }}
                        className="text-sm text-gray-500 border-none p-0 focus-visible:ring-0"
                        placeholder="Additional fee information"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button at bottom center */}
        {hasChanges && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
            <Button 
              onClick={handleSaveChanges}
              className="px-8 py-6 text-lg shadow-lg"
              size="lg"
            >
              <Save className="h-5 w-5 mr-2" />
              Save All Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutInstitute;