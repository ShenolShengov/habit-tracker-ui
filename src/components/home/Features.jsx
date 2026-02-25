import {
  IconCalendarPlus,
  IconCheck,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import Section from "./HomeSection";
import SectionHeader from "./SectionHeader";
import { Button } from "@mantine/core";
import { Link } from "react-router";

function Feature({ title, description, Icon }) {
  return (
    <div className="flex flex-col flex-1 gap-4 justify-center items-center p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-3 bg-blue-50 rounded-xl">
        <Icon size={32} stroke={1.5} className="text-blue-600" />
      </div>
      <h3 className="font-semibold font-outfit text-lg sm:text-xl">{title}</h3>
      <p className="text-center text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default function Features() {
  const { t } = useTranslation();

  return (
    <Section>
      <SectionHeader
        preTitle={t("home.features.preTitle")}
        title={t("home.features.title")}
        description={t("home.features.description")}
      />
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Feature
          title={t("home.features.habitCreation.title")}
          description={t("home.features.habitCreation.description")}
          Icon={IconCalendarPlus}
        />
        <Feature
          title={t("home.features.dailyCheckIns.title")}
          description={t("home.features.dailyCheckIns.description")}
          Icon={IconCheck}
        />
        <Feature
          title={t("home.features.advancedStats.title")}
          description={t("home.features.advancedStats.description")}
          Icon={IconDeviceDesktopAnalytics}
        />
      </div>
      <Button component={Link} to="/register" size="lg" variant="default" radius="md">
        {t("home.features.getStartedFree")}
      </Button>
    </Section>
  );
}
