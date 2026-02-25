import { Button, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Section from "./HomeSection";
import habitTrackerImage from "../../assets/habit-tracker.png";
import { Link } from "react-router";

export default function LandingSection() {
  const { t } = useTranslation();

  return (
    <Section image={habitTrackerImage}>
      <div className="w-full max-w-3xl flex flex-col gap-6 sm:gap-8">
        <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl/[1.1] font-semibold text-center tracking-tight">
          {t("home.heading.before")}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            {t("home.heading.gradient")}
          </Text>
          {t("home.heading.after")}
        </h1>

        <p className="text-base sm:text-lg text-center text-gray-500 max-w-xl mx-auto">
          {t("home.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button component={Link} to="/register" size="lg" radius="md">
            {t("home.getStarted")}
          </Button>
          <Button component={Link} to="/login" size="lg" variant="default" radius="md">
            {t("home.signIn")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
