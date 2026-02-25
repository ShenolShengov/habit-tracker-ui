import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Section from "./HomeSection";
import SectionHeader from "./SectionHeader";

function SingleStatistics({ number, description }) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2 flex-1/2 border-l-2 pl-4 sm:pl-8 border-blue-200">
      <h3 className="font-outfit font-bold text-4xl sm:text-5xl text-gray-900">{number}</h3>
      <p className="font-outfit font-medium text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <Section direction="row">
      <SectionHeader
        center={false}
        preTitle={t("home.stats.preTitle")}
        title={t("home.stats.title")}
        description={t("home.stats.description")}
      >
        <Button
          component={Link}
          to="/register"
          size="lg"
          variant="default"
          radius="md"
          className="mt-4!"
        >
          {t("home.stats.startTracking")}
        </Button>
      </SectionHeader>
      <div className="flex-1 flex flex-wrap gap-y-8 sm:gap-y-12 w-full">
        <SingleStatistics number={87} description={t("home.stats.bestStreak")} />
        <SingleStatistics number={65} description={t("home.stats.currentStreak")} />
        <SingleStatistics number={42} description={t("home.stats.monthlyCheckIns")} />
        <SingleStatistics number={95} description={t("home.stats.totalHabitsTracked")} />
      </div>
    </Section>
  );
}
