import { Outlet } from "react-router";
import Container from "../components/ui/Container";
import LanguageSwitcher from "../components/ui/LanguageSwitcher";

export default function AuthLayout() {
  return (
    <Container className="relative flex-col min-h-dvh">
      <div className="flex justify-end pt-4 pr-0 sm:absolute sm:top-4 sm:right-4">
        <LanguageSwitcher />
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <Outlet />
      </div>
    </Container>
  );
}
