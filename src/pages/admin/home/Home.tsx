import Hero from "../../../components/adminHome/Hero";
import FeaturedColleges from "../../../components/home/FeaturedColleges";
import FeaturedStudentsSection from "../../../components/adminHome/FeatureStudentSection";
import ScholarshipsSection from "../../../components/adminHome/ScholarshipsSection";
import AboutUsPreview from "../../../components/adminHome/AboutUsSection";
import FeaturedGroupSession from "../../../components/adminHome/FeaturedGroupSession";
function AdminHome() {
  return (
    <div>
      <Hero />
      <AboutUsPreview />
      <FeaturedColleges />
      <ScholarshipsSection />
      <FeaturedStudentsSection />
      <FeaturedGroupSession />
    </div>
  );
}

export default AdminHome;
