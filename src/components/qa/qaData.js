const qaData = [
  {
    question: "What is Habit Tracker?",
    answer:
      "Habit Tracker is a free web application that helps you build and maintain positive daily habits. You can create habits, check in daily, track your streaks, and visualize your progress with charts and statistics.",
  },
  {
    question: "How do I create a new habit?",
    answer:
      "After logging in, go to the Dashboard and click the \"Add habit\" button. Give your habit a name and an optional description, then click \"Create habit\". You can also pick from our suggested habits to get started quickly.",
  },
  {
    question: "Can I edit or delete a habit?",
    answer:
      "Yes. Open the habit details page by clicking on a habit from your dashboard. From there you can edit the habit name and description, or delete the habit entirely.",
  },
  {
    question: "How do streaks work?",
    answer:
      "A streak counts the number of consecutive days you have checked in for a habit. If you miss a day, the streak resets to zero. Your best streak is saved so you can always try to beat your personal record.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Your dashboard shows an overview of your stats including total check-ins, current streaks, and a weekly activity chart. Each habit also has a detailed view with a calendar of check-ins and monthly breakdown charts.",
  },
  {
    question: "Can I use Habit Tracker on mobile?",
    answer:
      "Yes. Habit Tracker is fully responsive and works on phones, tablets, and desktops. The interface adapts automatically to your screen size.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your account is protected with JWT-based authentication. Passwords are securely hashed, and access tokens are stored in memory (not localStorage) to reduce the risk of XSS attacks. Refresh tokens are handled via httpOnly cookies.",
  },
  {
    question: "Is Habit Tracker free to use?",
    answer:
      "Yes, Habit Tracker is completely free and open-source. You can use all features without any payment or subscription.",
  },
];

export default qaData;
