import {
  IconGauge,
  IconPlus,
  IconChecks,
  IconChartBar,
  IconUser,
  IconLayoutNavbar,
} from "@tabler/icons-react";

const helpData = [
  {
    Icon: IconGauge,
    title: "Dashboard",
    description:
      "Your dashboard is the central hub for tracking your habits at a glance.",
    steps: [
      "View your overall stats including total habits, check-ins, and best streak.",
      "Check the weekly activity chart to see your recent progress.",
      "See all your habits listed with their current streak and today's status.",
      "Click on any habit to view its full details.",
    ],
  },
  {
    Icon: IconPlus,
    title: "Creating a Habit",
    description:
      "Start building new habits in just a few clicks.",
    steps: [
      "Click \"Add habit\" in the sidebar or bottom navigation.",
      "Pick a suggested habit from the quick start cards, or fill in the form manually.",
      "Enter a name (required) and an optional description.",
      "Click \"Create habit\" to save and start tracking.",
    ],
  },
  {
    Icon: IconChecks,
    title: "Tracking Habits",
    description:
      "Check in daily to build streaks and stay consistent.",
    steps: [
      "From the dashboard, click the check-in button next to a habit.",
      "Each consecutive day you check in increases your streak count.",
      "Missing a day resets the streak to zero, but your best streak is always saved.",
      "Try to maintain your streaks for long-term consistency.",
    ],
  },
  {
    Icon: IconChartBar,
    title: "Habit Details",
    description:
      "Dive deeper into any habit to see your full history and stats.",
    steps: [
      "Click on a habit from the dashboard to open its detail page.",
      "View the calendar to see which days you checked in.",
      "Check the monthly breakdown charts for longer-term trends.",
      "Use the edit button to update the habit name or description, or delete it.",
    ],
  },
  {
    Icon: IconUser,
    title: "Profile",
    description:
      "Manage your account settings and personal information.",
    steps: [
      "Click \"Profile\" in the sidebar or bottom navigation.",
      "Update your display name or other account details.",
      "Change your password from the profile settings.",
    ],
  },
  {
    Icon: IconLayoutNavbar,
    title: "Navigation",
    description:
      "Find your way around the app on any device.",
    steps: [
      "On desktop, use the sidebar on the left to switch between pages.",
      "On mobile, use the bottom navigation bar to access all sections.",
      "The Q&A page is available from both the sidebar and the guest header.",
      "Admins will see an additional \"Admin\" link for user management.",
    ],
  },
];

export default helpData;
