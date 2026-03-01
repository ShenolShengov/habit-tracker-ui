import {
  IconGauge,
  IconLogout,
  IconPlus,
  IconUser,
  IconShieldCheck,
  IconHelp,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";
import logoMini from "../../assets/logo-mini.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../store/authContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";

function NavbarLink({ Icon, label, path, ...props }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink
        {...props}
        to={path}
        className={({ isActive }) =>
          `w-[44px] h-[44px] rounded-xl flex justify-center items-center transition-all duration-200 ${
            isActive
              ? "text-blue-600 bg-blue-50 shadow-sm"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`
        }
      >
        <Icon size={20} stroke={1.5} />
      </NavLink>
    </Tooltip>
  );
}

function MobileNavLink({ Icon, label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl text-xs no-underline transition-all duration-200 ${
          isActive
            ? "text-blue-600"
            : "text-gray-400 hover:text-gray-600"
        }`
      }
    >
      <Icon size={20} stroke={1.5} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const links = [
    { Icon: IconGauge, label: t("nav.dashboard"), path: "/dashboard" },
    { Icon: IconPlus, label: t("nav.addHabit"), path: "/habits/create" },
    { Icon: IconUser, label: t("nav.profile"), path: "/profile" },
    { Icon: IconHelp, label: t("nav.help"), path: "/help" },
  ];

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
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex w-[72px] fixed top-0 h-screen self-stretch py-6 flex-col items-center border-r border-solid border-gray-100 bg-white z-10">
        <Center>
          <img src={logoMini} alt={t("common.altLogo")} className="w-8" />
        </Center>

        <div className="flex-1 mt-10">
          <Stack justify="center" gap={4}>
            {links.map((link) => (
              <NavbarLink {...link} key={link.path} />
            ))}
            {user?.isAdmin && (
              <NavbarLink
                Icon={IconShieldCheck}
                label={t("nav.admin")}
                path="/admin"
              />
            )}
          </Stack>
        </div>

        <Stack justify="center" gap={4} align="center">
          <LanguageSwitcher />
          <Tooltip
            label={t("nav.logout")}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <button
              onClick={handleLogout}
              className="w-[44px] h-[44px] rounded-xl flex justify-center items-center text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer bg-transparent border-none transition-all duration-200"
            >
              <IconLogout size={20} stroke={1.5} />
            </button>
          </Tooltip>
        </Stack>
      </nav>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-solid border-gray-100 z-10 flex justify-around items-center px-1 py-1.5">
        {links.map((link) => (
          <MobileNavLink {...link} key={link.path} />
        ))}
        {user?.isAdmin && (
          <MobileNavLink
            Icon={IconShieldCheck}
            label={t("nav.admin")}
            path="/admin"
          />
        )}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl text-xs text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-none transition-all duration-200"
        >
          <IconLogout size={20} stroke={1.5} />
          <span className="font-medium">{t("nav.logout")}</span>
        </button>
        <div className="flex flex-col items-center gap-0.5 py-2 px-2">
          <LanguageSwitcher className="border-none px-0.5 py-0.5 text-sm" />
        </div>
      </nav>
    </>
  );
}
