import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { useTranslation } from "react-i18next";

const SLOW_LOAD_DELAY = 10_000;

export default function AppLoader({ size = "xl" } = {}) {
  const { t } = useTranslation();
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSlow(true), SLOW_LOAD_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-dvh justify-center items-center w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader size={size} />
        {isSlow && (
          <p className="text-sm text-gray-400 text-center max-w-xs">
            {t("common.serverWaking")}
          </p>
        )}
      </div>
    </div>
  );
}
