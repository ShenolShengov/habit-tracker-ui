import LandingSection from "./LandingSection";
import HowHabitWorks from "./HowHabitWorks";
import Features from "./Features";
import StatsSection from "./StatsSection";
import Container from "../ui/Container";

export default function Home() {
  return (
    <Container className="flex-col justify-center items-center gap-20 sm:gap-32 lg:gap-40 py-8">
      <LandingSection />
      <HowHabitWorks />
      <Features />
      <StatsSection />
    </Container>
  );
}
