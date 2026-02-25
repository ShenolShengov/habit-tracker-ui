import { useTranslation } from "react-i18next";
import DashboardSection from "../ui/DashboardSection";
import HelpCard from "./HelpCard";
import useHelpData from "./useHelpData";

export default function Help() {
  const { t } = useTranslation();
  const helpData = useHelpData();

  return (
    <DashboardSection className="gap-8">
      <div className="flex flex-col pb-4 border-b gap-3 border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("help.title")}</h1>
        <p className="text-sm text-gray-400">
          {t("help.description")}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {helpData.map((section) => (
          <HelpCard key={section.title} {...section} />
        ))}
      </div>
    </DashboardSection>
  );
}
