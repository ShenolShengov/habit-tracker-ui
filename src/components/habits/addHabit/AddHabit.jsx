import { Button, Input } from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import DashboardSection from "../../ui/DashboardSection";
import AppLoader from "../../loader/AppLoader";
import getHabitSchema from "../../../schemas/habit.schema";
import useCreateHabit from "../../../hooks/habits/useCreateHabit";
import useUpdateHabit from "../../../hooks/habits/useUpdateHabit";
import useHabit from "../../../hooks/habits/useHabit";
import { notifications } from "@mantine/notifications";
import usePresetHabits from "./usePresetHabits";
import PresetHabitCard from "./PresetHabitCard";

const inputClasses =
  "border border-gray-200 border-solid rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm";

export default function AddHabit() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const presetHabits = usePresetHabits();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validateInputOnChange: true,
    validate: zod4Resolver(getHabitSchema(t)),
  });

  const { errors } = form;

  const { data: initialData, error, isLoading: isHabitLoading } = useHabit(id, {
    enabled: isEditing,
    retry: false,
  });

  if (initialData && !form.initialized) {
    form.initialize({
      name: initialData.name,
      description: initialData.description,
    });
  }

  if (error) {
    navigate("/not-found");
  }

  if (isEditing && isHabitLoading) {
    return <AppLoader />;
  }

  const { mutateAsync: addHabitMutation, isPending: isCreating } =
    useCreateHabit();

  const { mutateAsync: editHabitMutation, isPending: isUpdating } =
    useUpdateHabit();

  const handleAction = async (data) => {
    try {
      if (isEditing) {
        await editHabitMutation({ id, initialData, data });
        notifications.show({
          title: t("habits.edit.notificationTitle"),
          message: t("habits.edit.notificationMessage"),
          color: "green",
        });
      } else {
        await addHabitMutation(data);
        notifications.show({
          title: t("habits.create.notificationTitle"),
          message: t("habits.create.notificationMessage"),
          color: "green",
        });
      }
      navigate("/dashboard");
    } catch (e) {
      form.setErrors({ name: e.response.data.message });
    }
  };

  const onCancel = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardSection className="gap-8">
      <div className="flex flex-col pb-4 border-b gap-3 border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {isEditing ? t("habits.edit.title") : t("habits.create.title")}
        </h1>
        {!isEditing && (
          <p className="text-sm text-gray-400">
            {t("habits.create.description")}
          </p>
        )}
      </div>
      {!isEditing && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-600">
            {t("habits.create.quickStart")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {presetHabits.map((habit) => (
              <PresetHabitCard
                key={habit.name}
                name={habit.name}
                description={habit.description}
                onClick={() => {
                  form.setValues({
                    name: habit.name,
                    description: habit.description,
                  });
                  form.setTouched({ name: true, description: true });
                }}
              />
            ))}
          </div>
        </div>
      )}
      <form
        className="flex flex-col gap-5 max-w-lg"
        onSubmit={form.onSubmit(handleAction)}
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            {t("habits.create.nameLabel")} <span className="text-red-400 text-xs">{t("common.required")}</span>
          </label>
          <input
            key={form.key("name")}
            {...form.getInputProps("name")}
            className={inputClasses}
            placeholder={t("habits.create.namePlaceholder")}
            type="text"
          />
          {errors.name && <Input.Error size="sm">{errors.name}</Input.Error>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            {t("habits.create.descriptionLabel")}
          </label>
          <textarea
            key={form.key("description")}
            {...form.getInputProps("description")}
            className={inputClasses}
            placeholder={t("habits.create.descriptionPlaceholder")}
            rows={4}
            type="text"
          />
          {errors.description && (
            <Input.Error size="sm">{errors.description}</Input.Error>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 mt-2">
          <Button
            onClick={onCancel}
            variant="default"
            size="md"
            radius="md"
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isTouched()}
            loading={isCreating || isUpdating}
            variant="filled"
            size="md"
            radius="md"
          >
            {isEditing
              ? t("common.saveChanges")
              : t("habits.create.createButton")}
          </Button>
        </div>
      </form>
    </DashboardSection>
  );
}
