import { useTranslation } from "react-i18next";

export default function useQaData() {
  const { t } = useTranslation();

  return [
    { question: t("qa.q1.question"), answer: t("qa.q1.answer") },
    { question: t("qa.q2.question"), answer: t("qa.q2.answer") },
    { question: t("qa.q3.question"), answer: t("qa.q3.answer") },
    { question: t("qa.q4.question"), answer: t("qa.q4.answer") },
    { question: t("qa.q5.question"), answer: t("qa.q5.answer") },
    { question: t("qa.q6.question"), answer: t("qa.q6.answer") },
    { question: t("qa.q7.question"), answer: t("qa.q7.answer") },
    { question: t("qa.q8.question"), answer: t("qa.q8.answer") },
  ];
}
