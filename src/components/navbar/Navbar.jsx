import {
  IconGauge,
  IconLogout,
  IconPlus,
  IconUser,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip } from "@mantine/core";
import logoMini from "../../assets/logo-mini.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../store/authContext";

function NavbarLink({ Icon, label, path, ...props }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink
        {...props}
        to={path}
        className={({ isActive }) => {
          return `w-[50px] h-[50px] rounded-lg flex justify-center items-center ${
            isActive
              ? " text-blue-600 bg-blue-100"
              : "text-gray-700 hover:bg-gray-50"
          }`;
        }}
      >
        <Icon size={20} stroke={1.5} />
      </NavLink>
    </Tooltip>
  );
}

const links = [
  { Icon: IconGauge, label: "Dashboard", path: "/dashboard" },
  { Icon: IconPlus, label: "Add habit", path: "/habits/create" },
  { Icon: IconUser, label: "Profile", path: "/profile" },
];

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="w-20 fixed top-0 h-screen self-stretch p-4 flex flex-col border-r border-solid border-gray-300">
      <Center>
        <img src={logoMini} alt="" />
      </Center>

      <div className="flex-1 mt-[50px]">
        <Stack justify="center" gap={0}>
          {links.map((link) => {
            return <NavbarLink {...link} key={link.label} />;
          })}
          {user?.isAdmin && (
            <NavbarLink
              Icon={IconShieldCheck}
              label="Admin"
              path="/admin"
            />
          )}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <Tooltip
          onClick={handleLogout}
          label="Logout"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <div className="w-[50px] h-[50px] rounded-lg flex justify-center items-center text-gray-700 hover:bg-gray-50">
            <IconLogout size={20} stroke={1.5} />
          </div>
        </Tooltip>
      </Stack>
    </nav>
  );
}
