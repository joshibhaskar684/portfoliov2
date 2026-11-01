import Experience from "./Experience/Experience";
import Faq from "./Faq/Faq";
import HeroSection from "./HeroSection/HeroSection";
import Projects from "./Projects/Projects";
import SkillPage from "./Skill/Skill";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <Projects/>
<SkillPage/>
<Experience/>
<Faq/>
   </>
  );
}
