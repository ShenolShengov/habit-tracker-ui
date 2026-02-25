import { Outlet } from "react-router";
import Container from "../components/ui/Container";
import LanguageSwitcher from "../components/ui/LanguageSwitcher";

export default function AuthLayout() {
  return (
    <Container className="relative justify-center items-center min-h-dvh">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Outlet />
    </Container>
  );
}
