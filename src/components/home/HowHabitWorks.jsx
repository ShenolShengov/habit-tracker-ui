import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Section image={stepsImage}>
      <SectionHeader
        preTitle={t("home.howItWorks.preTitle")}
        title={t("home.howItWorks.title")}
        description={t("home.howItWorks.description")}
      />
      <div className="w-full flex flex-col sm:flex-row gap-8 sm:gap-6">
        <Step
          step={1}
          name={t("home.howItWorks.step1.name")}
          description={t("home.howItWorks.step1.description")}
        />
        <Step
          step={2}
          name={t("home.howItWorks.step2.name")}
          description={t("home.howItWorks.step2.description")}
        />
        <Step
          step={3}
          name={t("home.howItWorks.step3.name")}
          description={t("home.howItWorks.step3.description")}
        />
      </div>
    </Section>
  );
}
