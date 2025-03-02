import Hero from "../components/home/Hero";
import FeaturedColleges from "../components/home/FeaturedColleges";
import FeaturedStudentsSection from "../components/home/FeatureStudentSection";
import ScholarshipsSection from "../components/home/ScholarshipsSection";
import AboutUsPreview from "../components/home/AboutUsSection";
import FeaturedGroupSession from "../components/home/FeaturedGroupSession";
function Home() {
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

export default Home;
