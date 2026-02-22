import { Button, Text } from "@mantine/core";
import Section from "./HomeSection";
import habitTrackerImage from "../../assets/habit-tracker.png";
import { Link } from "react-router";

export default function LandingSection() {
  return (
    <Section image={habitTrackerImage}>
      <div className="w-full max-w-3xl flex flex-col gap-6 sm:gap-8">
        <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl/[1.1] font-semibold text-center tracking-tight">
          Build{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            better habits
          </Text>
          {", "}
          transform your life
        </h1>

        <p className="text-base sm:text-lg text-center text-gray-500 max-w-xl mx-auto">
          Track your daily progress and create lasting change. Turn small
          actions into powerful life transformations.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            component={Link}
            to="/register"
            size="lg"
            radius="md"
          >
            Get started
          </Button>

          <Button
            component={Link}
            to="/login"
            size="lg"
            variant="default"
            radius="md"
          >
            Sign in
          </Button>
        </div>
      </div>
    </Section>
  );
}
