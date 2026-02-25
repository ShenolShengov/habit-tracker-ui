import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "bg", flag: "🇧🇬" },
];

export default function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("bg") ? "bg" : "en";

  return (
    <select
      value={currentLang}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={`bg-transparent border border-gray-200 border-solid rounded-lg px-1.5 py-1.5 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className ?? ""}`}
    >
      {languages.map(({ code, flag }) => (
        <option key={code} value={code}>
          {flag}
        </option>
      ))}
    </select>
  );
}
