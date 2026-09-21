import SplashCursor from "./Components/SplashCursor";
import HeaderLogo from "./Components/HeaderLogo";
import Navigation from "./Components/Navigation";
import Home from './Pages/Home';
import About from './Pages/About';
import SkillSection from './Components/SkillSection';
import Projects from './Pages/Projects';
import OpenSource from './Pages/OpenSource';
import Contact from './Pages/Contact';
import LoadingScreen from './Components/LoadingScreen';
import CustomCursor from './Components/Customcursor';
import SmoothScroll from "./Components/Smoothscroll";
import "lenis/dist/lenis.css";

const App = () => {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <CustomCursor />
        <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden select-none">
          {/* <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={3000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE={false}
            COLOR="#525153"
          /> */}
          <HeaderLogo />
          <Navigation />
          <Home />
          <About />
          <SkillSection />
          <Projects />
          <OpenSource />
          <Contact />
        </div>
      </SmoothScroll>
    </>
  );
};

export default App;
