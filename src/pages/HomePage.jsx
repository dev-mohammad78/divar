import HomeCategories from "../components/templates/HomeCategories";
import LatestPosts from "../components/templates/LatestPosts";

const HomePage = () => {
  return (
    <main>
      {/* Hero */}
      <HomeCategories />
      <LatestPosts />
      {/* CTA */}
    </main>
  );
};

export default HomePage;
