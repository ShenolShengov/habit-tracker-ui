import Section from "./HomeSection";
import stepsImage from "../../assets/how-it-works.png";
import SectionHeader from "./SectionHeader";

function Step({ step, name, description, ...props }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-1" {...props}>
      <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
        {step}
      </span>
      <h3 className="font-outfit font-semibold text-lg sm:text-xl">{name}</h3>
      <p className="w-full sm:w-[80%] text-center text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function HowHabitWorks() {
  return (
    <Section image={stepsImage}>
      <SectionHeader
        preTitle="Simple"
        title="How our habit tracker works"
        description="Tracking habits is easy and intuitive. Follow three simple steps to personal growth."
      />
      <div className="w-full flex flex-col sm:flex-row gap-8 sm:gap-6">
        <Step
          step={1}
          name="Create habit"
          description="Define your goals and select habits you want to build or break."
        />
        <Step
          step={2}
          name="Track progress"
          description="Log daily check-ins and monitor your consistency with real-time tracking."
        />
        <Step
          step={3}
          name="Analyze results"
          description="Review your stats, celebrate streaks, and understand your personal growth journey."
        />
      </div>
    </Section>
  );
}
