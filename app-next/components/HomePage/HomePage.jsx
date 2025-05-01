import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import MealsList from "../MealsList/MealsList";
import "./HomePage.css"; // Assuming you have your styles in this file

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to HackYourFuture Meals</h1>
          <p>
            {" "}
            Discover delicious meals prepared with love. Book your seat and
            enjoy a great dining experience!
          </p>
        </div>
      </section>

      {/* Meals List */}
      <MealsList showAll={false} />
    </>
  );
}

export default HomePage;
