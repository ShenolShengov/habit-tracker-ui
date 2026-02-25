import { Box, Burger, Button, Drawer, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useAuth } from "../../store/authContext";
import Container from "../ui/Container";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleLogout = async () => {
    closeDrawer();
    await logout();
  };

  return (
    <Box>
      <header className="px-4 border-b border-solid border-gray-100">
        <Container className="items-center justify-between h-16">
          <Link to="/">
            <img src={logo} alt={t("common.altLogo")} className="h-9" />
          </Link>

          {/* Center — Q&A link */}
          <Link
            to="/qa"
            className="hidden sm:block text-sm font-medium text-gray-500 hover:text-gray-800 no-underline transition-colors duration-200"
          >
            {t("nav.qa")}
          </Link>

          <Group gap="sm" visibleFrom="sm">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <Button component={Link} to="/dashboard" variant="default" radius="md">
                  {t("nav.dashboard")}
                </Button>
                <Button onClick={handleLogout} radius="md">{t("nav.logout")}</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="default" radius="md">
                  {t("nav.signIn")}
                </Button>
                <Button component={Link} to="/register" radius="md">
                  {t("nav.signUp")}
                </Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        title={<img src={logo} alt={t("common.altLogo")} className="h-8" />}
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack gap="md" className="mt-4">
          <LanguageSwitcher />
          <Link
            to="/qa"
            onClick={closeDrawer}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 no-underline px-3 py-2 transition-colors duration-200"
          >
            {t("nav.qa")}
          </Link>
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/dashboard"
                variant="light"
                fullWidth
                radius="md"
                onClick={closeDrawer}
              >
                {t("nav.dashboard")}
              </Button>
              <Button fullWidth radius="md" onClick={handleLogout}>
                {t("nav.logout")}
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="default"
                fullWidth
                radius="md"
                onClick={closeDrawer}
              >
                {t("nav.signIn")}
              </Button>
              <Button
                component={Link}
                to="/register"
                fullWidth
                radius="md"
                onClick={closeDrawer}
              >
                {t("nav.signUp")}
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
