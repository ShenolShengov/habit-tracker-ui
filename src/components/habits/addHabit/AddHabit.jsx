import { Button, Input } from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import DashboardSection from "../../ui/DashboardSection";
import habitSchema from "../../../schemas/habit.schema";
import useCreateHabit from "../../../hooks/habits/useCreateHabit";
import useUpdateHabit from "../../../hooks/habits/useUpdateHabit";
import useHabit from "../../../hooks/habits/useHabit";

const inputClasses =
  "border border-gray-200 border-solid rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm";

export default function AddHabit() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validateInputOnChange: true,
    validate: zod4Resolver(habitSchema),
  });

  const { errors } = form;

  const { data: initialData, error } = useHabit(id, {
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

  const { mutateAsync: addHabitMutation } = useCreateHabit();

  const { mutateAsync: editHabitMutation } = useUpdateHabit();

  const handleAction = async (data) => {
    try {
      if (isEditing) {
        await editHabitMutation({ id, initialData, data });
      } else {
        await addHabitMutation(data);
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
          {isEditing ? "Edit habit" : "Create new habit"}
        </h1>
        {!isEditing && (
          <p className="text-sm text-gray-400">
            Define your new habit to start tracking your progress.
          </p>
        )}
      </div>
      <form
        className="flex flex-col gap-5 max-w-lg"
        onSubmit={form.onSubmit(handleAction)}
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Habit Name <span className="text-red-400 text-xs">*</span>
          </label>
          <input
            key={form.key("name")}
            {...form.getInputProps("name")}
            className={inputClasses}
            placeholder="e.g., Drink 8 glasses of water"
            type="text"
          />
          {errors.name && <Input.Error size="sm">{errors.name}</Input.Error>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            key={form.key("description")}
            {...form.getInputProps("description")}
            className={inputClasses}
            placeholder="Briefly describe your habit and why it's important"
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
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isTouched()}
            variant="filled"
            size="md"
            radius="md"
          >
            {form.submitting
              ? "Saving..."
              : isEditing
              ? "Save changes"
              : "Create habit"}
          </Button>
        </div>
      </form>
    </DashboardSection>
  );
}
