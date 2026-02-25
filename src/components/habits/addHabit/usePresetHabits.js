import { useTranslation } from "react-i18next";

export default function usePresetHabits() {
  const { t } = useTranslation();

  return [
    {
      name: t("preset.readFor30Minutes.name"),
      description: t("preset.readFor30Minutes.description"),
    },
    {
      name: t("preset.completeHomework.name"),
      description: t("preset.completeHomework.description"),
    },
    {
      name: t("preset.reviewNotes.name"),
      description: t("preset.reviewNotes.description"),
    },
    {
      name: t("preset.exerciseFor20Minutes.name"),
      description: t("preset.exerciseFor20Minutes.description"),
    },
    {
      name: t("preset.practiceALanguage.name"),
      description: t("preset.practiceALanguage.description"),
    },
    {
      name: t("preset.drinkWater.name"),
      description: t("preset.drinkWater.description"),
    },
    {
      name: t("preset.limitScreenTime.name"),
      description: t("preset.limitScreenTime.description"),
    },
    {
      name: t("preset.sleepBy10PM.name"),
      description: t("preset.sleepBy10PM.description"),
    },
  ];
}
