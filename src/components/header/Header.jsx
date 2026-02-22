import { Box, Burger, Button, Drawer, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useAuth } from "../../store/authContext";
import Container from "../ui/Container";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
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
            <img src={logo} alt="Habit Tracker" className="h-9" />
          </Link>

          <Group gap="sm" visibleFrom="sm">
            {isAuthenticated ? (
              <>
                <Button component={Link} to="/dashboard" variant="default" radius="md">
                  Dashboard
                </Button>
                <Button onClick={handleLogout} radius="md">Logout</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="subtle" color="gray" radius="md">
                  Sign in
                </Button>
                <Button component={Link} to="/register" radius="md">
                  Sign up
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
        title={<img src={logo} alt="Habit Tracker" className="h-8" />}
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack gap="md" className="mt-4">
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
                Dashboard
              </Button>
              <Button fullWidth radius="md" onClick={handleLogout}>
                Logout
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
                Sign in
              </Button>
              <Button
                component={Link}
                to="/register"
                fullWidth
                radius="md"
                onClick={closeDrawer}
              >
                Sign up
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
