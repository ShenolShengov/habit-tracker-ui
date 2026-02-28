import { useState } from "react";
import { Button, Input, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import DashboardSection from "../ui/DashboardSection";
import AppLoader from "../loader/AppLoader";
import getProfileSchema from "../../schemas/profile.schema";
import useProfile from "../../hooks/user/useProfile";
import useUpdateProfile from "../../hooks/user/useUpdateProfile";
import useDeleteAccount from "../../hooks/user/useDeleteAccount";
import { useAuth } from "../../store/authContext";
import { notifications } from "@mantine/notifications";

const inputClasses =
  "border border-gray-200 border-solid rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, refresh } = useAuth();
  const { t } = useTranslation();
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { data: profile, isLoading } = useProfile();

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      age: "",
      timeZone: "",
    },
    validateInputOnChange: true,
    validate: zod4Resolver(getProfileSchema(t)),
  });

  if (profile && !form.initialized) {
    form.initialize({
      email: profile.email ?? "",
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      age: profile.age ?? "",
      timeZone: profile.timeZone ?? "",
    });
  }

  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (data) => {
    try {
      const payload = {};

      if (data.email !== profile.email) payload.email = data.email;
      if ((data.firstName || null) !== (profile.firstName ?? null))
        payload.firstName = data.firstName || null;
      if ((data.lastName || null) !== (profile.lastName ?? null))
        payload.lastName = data.lastName || null;

      const newAge = data.age === "" ? null : Number(data.age);
      if (newAge !== (profile.age ?? null)) payload.age = newAge;

      if (data.timeZone !== profile.timeZone) payload.timeZone = data.timeZone;

      if (Object.keys(payload).length === 0) return;

      setIsUpdating(true);
      await updateProfile(payload);
      try {
        await refresh();
      } catch {
        // refresh may fail if cookie isn't available; profile was still updated
      }
      form.resetTouched();
      notifications.show({
        title: t("profile.updateNotificationTitle"),
        message: t("profile.updateNotificationMessage"),
        color: "green",
      });
    } catch (e) {
      const msg = e.response?.data?.message ?? t("profile.updateFailed");
      const firstTouched = form.getTouched();
      const errorField =
        Object.keys(firstTouched).find((key) => firstTouched[key]) ?? "email";
      form.setErrors({ [errorField]: msg });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      notifications.show({
        title: t("profile.deleteNotificationTitle"),
        message: t("profile.deleteNotificationMessage"),
        color: "red",
      });
      await logout();
      navigate("/", { replace: true });
    } catch {
      closeDeleteModal();
    }
  };

  if (isLoading) {
    return <AppLoader />;
  }

  const { errors } = form;

  return (
    <DashboardSection className="gap-8">
      <div className="flex flex-col pb-4 border-b gap-3 border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("profile.title")}</h1>
        <p className="text-sm text-gray-400">{t("profile.description")}</p>
      </div>

      <form
        className="flex flex-col gap-5 max-w-lg"
        onSubmit={form.onSubmit(handleUpdate)}
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {t("profile.email")} <span className="text-red-400 text-xs">{t("common.required")}</span>
          </label>
          <input
            key={form.key("email")}
            {...form.getInputProps("email")}
            className={inputClasses}
            type="email"
          />
          {errors.email && <Input.Error size="sm">{errors.email}</Input.Error>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              {t("profile.firstName")}
            </label>
            <input
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
              className={inputClasses}
              type="text"
            />
            {errors.firstName && (
              <Input.Error size="sm">{errors.firstName}</Input.Error>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              {t("profile.lastName")}
            </label>
            <input
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
              className={inputClasses}
              type="text"
            />
            {errors.lastName && (
              <Input.Error size="sm">{errors.lastName}</Input.Error>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="age" className="text-sm font-medium text-gray-700">
              {t("profile.age")}
            </label>
            <input
              key={form.key("age")}
              {...form.getInputProps("age")}
              className={inputClasses}
              type="number"
              min={1}
              max={150}
            />
            {errors.age && <Input.Error size="sm">{errors.age}</Input.Error>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="timeZone" className="text-sm font-medium text-gray-700">
              {t("profile.timeZone")} <span className="text-red-400 text-xs">{t("common.required")}</span>
            </label>
            <input
              key={form.key("timeZone")}
              {...form.getInputProps("timeZone")}
              className={inputClasses}
              type="text"
            />
            {errors.timeZone && (
              <Input.Error size="sm">{errors.timeZone}</Input.Error>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-2">
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isTouched()}
            loading={isUpdating}
            variant="filled"
            size="md"
            radius="md"
          >
            {t("common.saveChanges")}
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-8 border-t border-gray-200 max-w-lg">
        <h2 className="text-lg font-semibold text-red-600">{t("profile.dangerZone")}</h2>
        <p className="text-sm text-gray-400 mt-2">
          {t("profile.dangerZoneDescription")}
        </p>
        <Button
          onClick={openDeleteModal}
          variant="light"
          color="red"
          size="md"
          radius="md"
          className="mt-4"
        >
          {t("profile.deleteAccount")}
        </Button>
      </div>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={t("profile.deleteModalTitle")}
        centered
        radius="lg"
      >
        <p className="text-sm text-gray-600">
          {t("profile.deleteModalDescription")}
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="default" radius="md" onClick={closeDeleteModal}>
            {t("common.cancel")}
          </Button>
          <Button
            color="red"
            radius="md"
            onClick={handleDeleteAccount}
            loading={isDeleting}
          >
            {t("common.delete")}
          </Button>
        </div>
      </Modal>
    </DashboardSection>
  );
}
