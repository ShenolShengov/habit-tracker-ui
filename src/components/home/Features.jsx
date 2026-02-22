import {
  IconCalendarPlus,
  IconCheck,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
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
      <p className="text-center text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <Section>
      <SectionHeader
        preTitle="Powerful"
        title="Features designed for your success"
        description="Our comprehensive toolkit helps you build and maintain meaningful habits."
      />
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Feature
          title="Habit creation"
          description="Customize and track personal and professional habits with precision."
          Icon={IconCalendarPlus}
        />
        <Feature
          title="Daily check-ins"
          description="Record your progress and stay accountable every single day."
          Icon={IconCheck}
        />
        <Feature
          title="Advanced stats"
          description="Gain insights into your performance with detailed analytics and visualizations."
          Icon={IconDeviceDesktopAnalytics}
        />
      </div>
      <Button component={Link} to="/register" size="lg" variant="default" radius="md">
        Get started for free
      </Button>
    </Section>
  );
}
