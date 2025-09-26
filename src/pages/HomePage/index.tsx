import About from "./About";
import CTASection from "./ContactUs";
import Jumbotron from "./Jumbotron";
import Technology from "./Technology";

function HomePageIndex() {
  return (
    <>
      <Jumbotron />
      <About />
      <Technology />
      <CTASection />
    </>
  );
}

export default HomePageIndex;
