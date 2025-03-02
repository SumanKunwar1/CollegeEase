import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CollegesPage from "./pages/CollegesPage";
import SearchCompare from "./pages/colleges/SearchCompare";
import CollegeRankings from "./pages/colleges/CollegeRankings";
import ApplicationForm from "./pages/colleges/ApplicationForm";
import CollegeDetails from "./pages/colleges/CollegeDetails";
import VirtualTours from "./pages/colleges/VirtualTours";
import ApplicationGuides from "./pages/colleges/ApplicationGuides";
import ScholarshipsPage from "./pages/ScholarshipsPage";
import ScholarshipFinder from "./pages/scholarship/ScholarshipFinder";
import SmartPredictor from "./pages/scholarship/SmartPredictor";
import ScholarshipApplicationForm from "./pages/scholarship/ScholarshipApplicationForm";
import ScholarshipDetails from "./pages/scholarship/ScholarshipDetails";
import ApplicationReceived from "./pages/scholarship/ApplicationReceived";
import ScholarshipApplicationGuides from "./pages/scholarship/ApplicationGuide";
import SuccessStories from "./pages/scholarship/SuccessStories";
import ScholarshipSubmitSuccessStory from "./pages/scholarship/SubmitSuccessStories";

import DonatePage from "./pages/DonatePage";
import DonationSuccessStories from "./pages/donation/DonationSuccessStories";
import HowItWorks from "./pages/donation/HowItWorks";
import StudentProfiles from "./pages/donation/StudentProfile";
import StudentRegistration from "./pages/donation/DonationStudentRegistration";
import DonorRegistration from "./pages/donation/DonorRegistration";
import StudentLogin from "./pages/donation/StudentLogin";
import StudentDashboard from "./pages/donation/StudentDashboard";
import DonationForm from "./pages/donation/DonationForm";
import SubmitSuccessStory from "./pages/donation/SubmitSuccessStories";

import BecomeMentorPage from "./pages/mentorship/BecameMentor";
import FindMentorDetails from "./pages/mentorship/FindMentorDetails";
import FindMentor from "./pages/mentorship/FindMentor";
import BookSession from "./pages/mentorship/BookASession";
import GroupSessionDetails from "./pages/mentorship/GroupSessionDetails";
import GroupSessions from "./pages/mentorship/GroupSession";
import GroupRegistrationForm from "./pages/mentorship/GroupRegistrationForm";
import GroupRegistrationSuccess from "./pages/mentorship/GroupSessionRegistrationSuccess";
import Resources from "./pages/mentorship/Resources";
import GroupSessionsFeedback from "./pages/mentorship/GroupSessionFeedback";

import ResourceDetailsPage from "./pages/mentorship/ResourceDetails";
import ExpertInterviewsPage from "./pages/insight/ExpertInterview";
import InterviewDetailPage from "./pages/insight/InterviewDetails";
import IndustryTrendsPage from "./pages/insight/Industrytrends";
import IndustryTrendDetails from "./pages/insight/IndustryTrendsDetail";
import JobMarketAnalysisPage from "./pages/insight/JobMarketAnalysis";
import JobAnalysisPage from "./pages/insight/JobMarketAnalysisDetails";
import SkillDevelopmentPage from "./pages/insight/SkillDevelopment";
import SkillDevelopmentDetails from "./pages/insight/SkillDevelopmentDetails";
import JobsAndPlacementPage from "./pages/insight/JobAndPlacement";
import JobAndPlacementDetails from "./pages/insight/JobAndPlacementDetails";

import ConnectPage from "./pages/ConnectPage";

import AuthPage from "./pages/auth/Auth";
import { DashboardLayout } from "./components/auth/DashboardLayout";
import InstituteDashboard from "./pages/auth/Institute";
import { Admissions } from "./pages/auth/dashboard/institute/Admission";
import { Reviews } from "./pages/auth/dashboard/institute/Review";
import { Applications } from "./pages/auth/dashboard/institute/Application";
import AddnewScholarship from "./pages/auth/dashboard/scholarship/AddNewScholarship";
import EditScholarship from "./pages/auth/dashboard/scholarship/EditScholarship";
import AboutInstitute from "./pages/auth/dashboard/institute/AboutInstitute";
import IndustryDashboard from "./pages/auth/Industry";
import { Analytics } from "./pages/auth/dashboard/industry/Analystics";
import { IndustryApplications } from "./pages/auth/dashboard/industry/Application";
import { Jobs } from "./pages/auth/dashboard/industry/Jobs";
import PostNewJob from "./pages/auth/dashboard/industry/PostNewJob";

import MentorDashboard from "./pages/auth/Mentor";
import ScholarshipDashboard from "./pages/auth/Scholarship";
import { ScholarshipAnalytics } from "./pages/auth/dashboard/scholarship/Analytics";
import { ScholarshipApplications } from "./pages/auth/dashboard/scholarship/Application";
import { ScholarshipPrograms } from "./pages/auth/dashboard/scholarship/Programs";

import AboutUs from "./pages/AboutUs";

import AdminLayout from "./pages/admin/AdminLayout";
import LoginPage from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/AdminDashboard";
import AdminAboutCollegeEase from "./pages/admin/home/AboutUs";
import AdminHome from "./pages/admin/home/Home";

import AdminCollegesPage from "./pages/admin/colleges/Colleges";
import AdminCollegeRankings from "./pages/admin/colleges/CollegeRankings";
import AdminCollegeDetails from "./pages/admin/colleges/CollegeDetails";
import AdminSearchCompare from "./pages/admin/colleges/SearchCompare";
import AdminVirtualTours from "./pages/admin/colleges/VirtualTours";
import AdminApplicationGuides from "./pages/admin/colleges/ApplicationGuides";

//admin-donation
import AdminDonationPage from "./pages/admin/donation/DonatePage";
import AdminDonationForm from "./pages/donation/DonationForm";
import AdminStudentRegistration from "./pages/donation/DonationStudentRegistration";
import AdminDonationSuccessStories from "./pages/admin/donation/DonationSuccessStories";
import AdminHowItWorks from "./pages/donation/HowItWorks";
import AdminStudentProfiles from "./pages/admin/donation/StudentProfile";

function PrivateRoute({ element }: { element: JSX.Element }) {
  const isAuthenticated = !!sessionStorage.getItem("isAuthenticated");
  return isAuthenticated ? element : <Navigate to="/admin/login" />;
}

// Wrapper component to handle layout
function AppContent() {
  const [, setCurrentPage] = useState("home");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-white">
      {!isAdminRoute && !isDashboardRoute && (
        <Navigation onPageChange={setCurrentPage} />
      )}
      <div className={!isAdminRoute && !isDashboardRoute ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/colleges/search-compare" element={<SearchCompare />} />
          <Route path="/colleges/rankings" element={<CollegeRankings />} />
          <Route path="/colleges/virtual-tours" element={<VirtualTours />} />
          <Route
            path="/colleges/application-guides"
            element={<ApplicationGuides />}
          />
          <Route path="/colleges/:id/apply" element={<ApplicationForm />} />
          <Route path="/colleges/:id" element={<CollegeDetails />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route
            path="/scholarships/scholarships-finder"
            element={<ScholarshipFinder />}
          />
          <Route
            path="/scholarships/smart-predictor"
            element={<SmartPredictor />}
          />
          <Route
            path="/scholarships/application-guide"
            element={<ScholarshipApplicationGuides />}
          />
          <Route
            path="/scholarships/success-stories"
            element={<SuccessStories />}
          />
          <Route
            path="/scholarships/submit-stories"
            element={<ScholarshipSubmitSuccessStory />}
          />
          <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
          <Route
            path="/scholarships/:id/apply"
            element={<ScholarshipApplicationForm />}
          />
          <Route
            path="/scholarships/:id/application-received"
            element={<ApplicationReceived />}
          />
          <Route path="/donate" element={<DonatePage />} />
          <Route
            path="/donate/success-stories"
            element={<DonationSuccessStories />}
          />
          <Route
            path="/donate/submit-success-stories"
            element={<SubmitSuccessStory />}
          />
          <Route
            path="/donate/student-registration"
            element={<StudentRegistration />}
          />
          <Route path="/donate/donation-form/:id" element={<DonationForm />} />
          <Route path="/donate/student-login" element={<StudentLogin />} />
          <Route
            path="/donate/student-dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/donate/donor-registraion"
            element={<DonorRegistration />}
          />
          <Route path="/donate/how-it-works" element={<HowItWorks />} />
          <Route path="/donate/student-profile" element={<StudentProfiles />} />
          <Route
            path="/mentorship/became-mentor"
            element={<BecomeMentorPage />}
          />
          <Route path="/mentorship/find-mentor" element={<FindMentor />} />
          <Route
            path="/mentorship/find-mentor/:id"
            element={<FindMentorDetails />}
          />
          <Route
            path="/mentorship/find-mentor/:id/book-a-session"
            element={<BookSession />}
          />
          <Route path="/mentorship/group-session" element={<GroupSessions />} />
          <Route
            path="/mentorship/group-session/:id"
            element={<GroupSessionDetails />}
          />
          <Route
            path="/mentorship/group-session/feedback"
            element={<GroupSessionsFeedback />}
          />
          <Route
            path="/mentorship/group-session/:id/register"
            element={<GroupRegistrationForm />}
          />
          <Route
            path="/registration-success"
            element={<GroupRegistrationSuccess />}
          />
          <Route path="/mentorship/resources" element={<Resources />} />
          <Route
            path="/mentorship/resources/:id"
            element={<ResourceDetailsPage />}
          />
          <Route
            path="/insights/expert-interviews"
            element={<ExpertInterviewsPage />}
          />
          <Route
            path="/insights/expert-interviews/:topic"
            element={<InterviewDetailPage />}
          />
          <Route
            path="/insights/industry-trends"
            element={<IndustryTrendsPage />}
          />
          <Route
            path="/insights/industry-trends/:trendId"
            element={<IndustryTrendDetails />}
          />
          <Route
            path="/insights/job-market-analysis"
            element={<JobMarketAnalysisPage />}
          />
          <Route
            path="/insights/job-market-analysis/:role"
            element={<JobAnalysisPage />}
          />
          <Route
            path="/insights/skill-development"
            element={<SkillDevelopmentPage />}
          />
          <Route
            path="/insights/skill-development/:courseTitle"
            element={<SkillDevelopmentDetails />}
          />
          <Route
            path="/insights/job-and-internship"
            element={<JobsAndPlacementPage />}
          />
          <Route
            path="/insights/job-and-internship/:id"
            element={<JobAndPlacementDetails />}
          />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="institute/:id" element={<InstituteDashboard />} />
            <Route path="institute/:id/admissions" element={<Admissions />} />
            <Route
              path="institute/:id/about-institute"
              element={<AboutInstitute />}
            />
            <Route
              path="institute/:id/applications"
              element={<Applications />}
            />
            <Route path="institute/:id/reviews" element={<Reviews />} />
            <Route path="industry/:id" element={<IndustryDashboard />} />
            <Route path="industry/:id/analytics" element={<Analytics />} />
            <Route
              path="industry/:id/applications"
              element={<IndustryApplications />}
            />
            <Route path="industry/:id/jobs" element={<Jobs />} />
            <Route path="industry/jobs/post-new-job" element={<PostNewJob />} />

            <Route path="mentor/:id" element={<MentorDashboard />} />
            <Route path="scholarship/:id" element={<ScholarshipDashboard />} />
            <Route
              path="scholarship/:id/analytics"
              element={<ScholarshipAnalytics />}
            />
            <Route
              path="scholarship/:id/applications"
              element={<ScholarshipApplications />}
            />
            <Route
              path="scholarship/:id/programs"
              element={<ScholarshipPrograms />}
            />
            <Route
              path="scholarship/:id/programs/add-new-program"
              element={<AddnewScholarship />}
            />
            <Route
              path="scholarship/:id/programs/edit-program"
              element={<EditScholarship />}
            />
          </Route>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/home"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminHome />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/about-us"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminAboutCollegeEase />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/about"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminAboutCollegeEase />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminCollegesPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges/search-compare"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminSearchCompare />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges/rankings"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminCollegeRankings />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges/:id"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminCollegeDetails />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges/virtual-tours"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminVirtualTours />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/colleges/application-guides"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminApplicationGuides />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/donate"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminDonationPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/donate/student-profile"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminStudentProfiles />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/donate/success-stories"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminDonationSuccessStories />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/donate/how-it-works"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminHowItWorks />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/donate/donation-form/:id"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminDonationForm />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/donate/student-registration-form"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminStudentRegistration />
                  </AdminLayout>
                }
              />
            }
          />
        </Routes>
      </div>
      {!isAdminRoute && !isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
