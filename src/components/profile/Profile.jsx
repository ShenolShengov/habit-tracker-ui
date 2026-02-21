import { Button, Input, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNavigate } from "react-router";
import DashboardSection from "../ui/DashboardSection";
import AppLoader from "../loader/AppLoader";
import profileSchema from "../../schemas/profile.schema";
import useProfile from "../../hooks/user/useProfile";
import useUpdateProfile from "../../hooks/user/useUpdateProfile";
import useDeleteAccount from "../../hooks/user/useDeleteAccount";
import { useAuth } from "../../store/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, refresh } = useAuth();
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
    validate: zod4Resolver(profileSchema),
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

  const handleUpdate = async (data) => {
    try {
      const payload = {
        ...data,
        age: data.age === "" ? null : Number(data.age),
        firstName: data.firstName || null,
        lastName: data.lastName || null,
      };
      await updateProfile(payload);
      await refresh();
      form.resetTouched();
    } catch (e) {
      form.setErrors({ email: e.response?.data?.message ?? "Update failed" });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
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
      <div className="flex flex-col pb-4 border-b gap-4 border-gray-400">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="opacity-70">Manage your account settings</p>
      </div>

      <form
        className="flex flex-col gap-4 max-w-lg"
        onSubmit={form.onSubmit(handleUpdate)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-normal">
            Email <span className="text-red-500 pl-0.5 text-sm">*</span>
          </label>
          <input
            key={form.key("email")}
            {...form.getInputProps("email")}
            className="border border-gray-400 border-solid rounded-xl px-3 py-2"
            type="email"
          />
          {errors.email && <Input.Error size="md">{errors.email}</Input.Error>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-normal">
              First Name
            </label>
            <input
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
              className="border border-gray-400 border-solid rounded-xl px-3 py-2"
              type="text"
            />
            {errors.firstName && (
              <Input.Error size="md">{errors.firstName}</Input.Error>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-normal">
              Last Name
            </label>
            <input
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
              className="border border-gray-400 border-solid rounded-xl px-3 py-2"
              type="text"
            />
            {errors.lastName && (
              <Input.Error size="md">{errors.lastName}</Input.Error>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="font-normal">
            Age
          </label>
          <input
            key={form.key("age")}
            {...form.getInputProps("age")}
            className="border border-gray-400 border-solid rounded-xl px-3 py-2"
            type="number"
            min={1}
            max={150}
          />
          {errors.age && <Input.Error size="md">{errors.age}</Input.Error>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="timeZone" className="font-normal">
            Time Zone <span className="text-red-500 pl-0.5 text-sm">*</span>
          </label>
          <input
            key={form.key("timeZone")}
            {...form.getInputProps("timeZone")}
            className="border border-gray-400 border-solid rounded-xl px-3 py-2"
            type="text"
          />
          {errors.timeZone && (
            <Input.Error size="md">{errors.timeZone}</Input.Error>
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isTouched()}
            variant="filled"
            size="md"
            className="rounded-xl!"
          >
            {form.submitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-400 max-w-lg">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <p className="opacity-70 mt-2">
          Once you delete your account, there is no going back.
        </p>
        <Button
          onClick={openDeleteModal}
          variant="filled"
          color="red"
          size="md"
          className="mt-4 rounded-xl!"
        >
          Delete Account
        </Button>
      </div>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete Account"
        centered
      >
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDeleteAccount}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </DashboardSection>
  );
}
