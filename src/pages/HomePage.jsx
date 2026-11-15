import Hero from "../components/templates/Hero";
import HomeCategories from "../components/templates/HomeCategories";
import HomeCTA from "../components/templates/HomeCTA";
import LatestPosts from "../components/templates/LatestPosts";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <HomeCategories />
      <LatestPosts />
      <HomeCTA />
    </main>
  );
};

export default HomePage;
