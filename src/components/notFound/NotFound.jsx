import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center font-outfit gap-4 px-4">
      <h1 className="text-6xl sm:text-8xl font-bold text-blue-600">404</h1>
      <p className="text-2xl sm:text-3xl text-center font-semibold">
        {t("notFound.title")}
      </p>
      <p className="text-sm sm:text-base text-center text-gray-400 max-w-sm">
        {t("notFound.description")}
      </p>
      <Button
        component={Link}
        to="/"
        variant="filled"
        size="md"
        radius="md"
        className="mt-2"
      >
        {t("notFound.goHome")}
      </Button>
    </div>
  );
}
