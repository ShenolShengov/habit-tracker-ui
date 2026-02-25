import { Accordion } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Container from "../ui/Container";
import useQaData from "./useQaData";

export default function QA() {
  const { t } = useTranslation();
  const qaData = useQaData();

  return (
    <Container className="flex-col items-center py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-3 mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {t("qa.title")}
        </h1>
        <p className="text-sm text-gray-400">
          {t("qa.description")}
        </p>
      </div>
      <Accordion variant="separated" radius="md" className="max-w-2xl w-full">
        {qaData.map((item, index) => (
          <Accordion.Item key={index} value={String(index)}>
            <Accordion.Control className="text-sm font-medium">
              {item.question}
            </Accordion.Control>
            <Accordion.Panel className="text-sm text-gray-600">
              {item.answer}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
