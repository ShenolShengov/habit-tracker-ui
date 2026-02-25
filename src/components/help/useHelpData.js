import { useTranslation } from "react-i18next";
import {
  IconGauge,
  IconPlus,
  IconChecks,
  IconChartBar,
  IconUser,
  IconLayoutNavbar,
} from "@tabler/icons-react";

export default function useHelpData() {
  const { t } = useTranslation();

  return [
    {
      Icon: IconGauge,
      title: t("help.dashboard.title"),
      description: t("help.dashboard.description"),
      steps: [
        t("help.dashboard.step1"),
        t("help.dashboard.step2"),
        t("help.dashboard.step3"),
        t("help.dashboard.step4"),
      ],
    },
    {
      Icon: IconPlus,
      title: t("help.creatingHabit.title"),
      description: t("help.creatingHabit.description"),
      steps: [
        t("help.creatingHabit.step1"),
        t("help.creatingHabit.step2"),
        t("help.creatingHabit.step3"),
        t("help.creatingHabit.step4"),
      ],
    },
    {
      Icon: IconChecks,
      title: t("help.trackingHabits.title"),
      description: t("help.trackingHabits.description"),
      steps: [
        t("help.trackingHabits.step1"),
        t("help.trackingHabits.step2"),
        t("help.trackingHabits.step3"),
        t("help.trackingHabits.step4"),
      ],
    },
    {
      Icon: IconChartBar,
      title: t("help.habitDetails.title"),
      description: t("help.habitDetails.description"),
      steps: [
        t("help.habitDetails.step1"),
        t("help.habitDetails.step2"),
        t("help.habitDetails.step3"),
        t("help.habitDetails.step4"),
      ],
    },
    {
      Icon: IconUser,
      title: t("help.profile.title"),
      description: t("help.profile.description"),
      steps: [
        t("help.profile.step1"),
        t("help.profile.step2"),
        t("help.profile.step3"),
      ],
    },
    {
      Icon: IconLayoutNavbar,
      title: t("help.navigation.title"),
      description: t("help.navigation.description"),
      steps: [
        t("help.navigation.step1"),
        t("help.navigation.step2"),
        t("help.navigation.step3"),
        t("help.navigation.step4"),
      ],
    },
  ];
}
