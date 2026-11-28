import Banner from "@/components/banner";
import Feature from "@/components/Feature";
import HowPizzaHubWorks from "@/components/HowPizzaHubWorks";
import PizzaCategories from "@/components/PizzaCategories";
import WhyChoosePizzaHub from "@/components/WhyChoosePizzaHub";


export default function Home() {
  return (

    <div>
      <Banner />
      <Feature />
      <PizzaCategories />
      <WhyChoosePizzaHub />
      <HowPizzaHubWorks />
    </div>
  );
}
