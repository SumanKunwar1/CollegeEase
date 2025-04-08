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
import GroupSessionRegistrationSuccess from "./pages/mentorship/GroupSessionRegistrationSuccess";
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

import BlogPage from "./pages/footer/Blog";
import BlogDetails from "./pages/footer/BlogDetails";
import FAQsPage from "./pages/footer/Faq";
import SupportPage from "./pages/footer/Support";
import PrivacyPolicyPage from "./pages/footer/PrivacyPolicy";
import CookiePolicyPage from "./pages/footer/Cookies";
import TermsOfServicePage from "./pages/footer/TermsOfService";

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
import AdminDonationForm from "./pages/donation/DonationForm";
import AdminStudentRegistration from "./pages/donation/DonationStudentRegistration";
import AdminDonationSuccessStories from "./pages/admin/donation/DonationSuccessStories";
import AdminHowItWorks from "./pages/donation/HowItWorks";
import AdminStudentProfiles from "./pages/admin/donation/StudentProfile";
import AdminStudentRegistrations from "./pages/admin/donation/StudentData";

//admin find mentor
import { AdminMentorsPage } from "./pages/admin/montorship/AdminFindMentor";
import AdminBookSession from "./pages/admin/montorship/AdminBookSession";
import { AdminGroupSessionsPage } from "./pages/admin/montorship/AdminGroupSession";
import { AdminResourcesPage } from "./pages/admin/montorship/AdminResources";
import AdminMentorPage from "./pages/admin/montorship/AdminBecameMentor";
import AdminGroupSessionRegistration from "./pages/admin/montorship/AdminGroupSessionRegistration";
import ResourceAdminDashboard from "./pages/admin/montorship/ResourceRequest";

//scholarship

import AdminScholarshipsPage from "./pages/admin/scholarship/AdminScholarship";
import AdminScholarshipDetails from "./pages/admin/scholarship/AdminScholarshipDetails";
import AdminScholarshipApplicationGuides from "./pages/admin/scholarship/AdminScholarshpGuidePage";

//admin insights

import { AdminExpertInterviewsPage } from "./pages/admin/insights/AdminExpertInterviewsPage";
import { AdminIndustryTrendsPage } from "./pages/admin/insights/AdminIndustryTrendsPage";
import { AdminJobAndPlacementPage } from "./pages/admin/insights/AdminJobAndPlacementPage";
import { AdminJobMarketAnalysisPage } from "./pages/admin/insights/AdminJobMarketAnalysisPage";
import { AdminSkillDevelopmentPage } from "./pages/admin/insights/AdminSkillDevelopmentPage";
//admin footer

import { AdminBlogPage } from "./pages/admin/footer/AdminBlog";
import { AdminBlogDetailPage } from "./pages/admin/footer/AdminBlogDetails";
import { AdminFAQPage } from "./pages/admin/footer/AdminFaqs";
import { AdminCookiesPage } from "./pages/admin/footer/AdminCookies";
import { AdminPrivacyPolicyPage } from "./pages/admin/footer/AdminPrivacyPolicy";
import { AdminTermsOfServicePage } from "./pages/admin/footer/AdmingTermsOfService";
import { AdminSupportPage } from "./pages/admin/footer/AdminSupport";

import AdminSignIn from "./pages/admin/SignUp";

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
          <Route path="/colleges/:name/apply" element={<ApplicationForm />} />
          <Route path="/colleges/:name" element={<CollegeDetails />} />
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
          <Route path="/scholarships/:organizationName" element={<ScholarshipDetails />} />
          <Route
            path="/scholarships/:organizationName/apply"
            element={<ScholarshipApplicationForm />}
          />
          <Route
            path="/scholarships/:organizationName/application-received"
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
            path="/donate/student-dashboard/:name"
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
            element={<GroupSessionRegistrationSuccess />}
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
            path="/insights/expert-interviews/:id"
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
            path="/insights/skill-development/:courseId"  
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

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:title" element={<BlogDetails />} />
          <Route path="/faq" element={<FAQsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="institute/:organizationName" element={<InstituteDashboard />} />
            <Route path="institute/:organizationName/admissions" element={<Admissions />} />
            <Route
              path="institute/:organizationName/about-institute"
              element={<AboutInstitute />}
            />
            <Route
              path="institute/:organizationName/applications"
              element={<Applications />}
            />
            <Route path="institute/:organizationName/reviews" element={<Reviews />} />
            <Route path="industry/:organizationName" element={<IndustryDashboard />} />
            <Route path="industry/:organizationName/analytics" element={<Analytics />} />
            <Route
              path="industry/:organizationName/applications"
              element={<IndustryApplications />}
            />
            <Route path="industry/:organizationName/jobs" element={<Jobs />} />
            <Route path="industry/jobs/post-new-job" element={<PostNewJob />} />

            <Route path="mentor/:id" element={<MentorDashboard />} />
            <Route path="scholarship/:organizationName" element={<ScholarshipDashboard />} />
            <Route
              path="scholarship/:organizationName/analytics"
              element={<ScholarshipAnalytics />}
            />
            <Route
              path="scholarship/:organizationName/applications"
              element={<ScholarshipApplications />}
            />
            <Route
              path="scholarship/:organizationName/programs"
              element={<ScholarshipPrograms />}
            />
            <Route
              path="scholarship/:organizationName/programs/add-new-program"
              element={<AddnewScholarship />}
            />
            <Route
              path="scholarship/:organizationName/programs/edit-program"
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
                    <AdminStudentRegistrations />
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
          <Route
            path="/admin/mentorship/find-mentor"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminMentorsPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/mentorship/mentor-registration"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminMentorPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/mentorship/group-session-registration"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminGroupSessionRegistration />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/mentorship/Session-registration"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminBookSession />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/mentorship/group-session"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminGroupSessionsPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/mentorship/resources"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminResourcesPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/mentorship/requested-resources"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <ResourceAdminDashboard />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/scholarships"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminScholarshipsPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/scholarships/:organizationName"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminScholarshipDetails />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/scholarships/application-guide"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminScholarshipApplicationGuides />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/insights/expert-interviews"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminExpertInterviewsPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/insights/industry-trends"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminIndustryTrendsPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/insights/skill-development"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminSkillDevelopmentPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/insights/job-and-internship"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminJobAndPlacementPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/insights/job-market-analysis"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminJobMarketAnalysisPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/blog"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminBlogPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/blog/:id"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminBlogDetailPage id={0} />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/cookies"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminCookiesPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/privacy-policy"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminPrivacyPolicyPage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/faqs"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminFAQPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/terms-of-service"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminTermsOfServicePage />
                  </AdminLayout>
                }
              />
            }
          />

          <Route
            path="/admin/support"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminSupportPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/registration"
            element={
              <PrivateRoute
                element={
                  <AdminLayout>
                    <AdminSignIn />
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
