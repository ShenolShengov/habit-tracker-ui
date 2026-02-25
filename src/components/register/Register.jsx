import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  InputError,
} from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/authContext";

export default function Register() {
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.email({ error: t("validation.invalidEmail") }),
    password: z.string().min(6, t("validation.passwordMinRegister")),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: zod4Resolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      await register(data.email.trim(), data.password.trim());
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      form.setErrors({ email: t("auth.register.emailTaken") });
    }
  };

  return (
    <Container
      size={420}
      className="flex grow justify-center items-stretch flex-col gap-4"
    >
      <Title className="self-center font-outfit!" fw={600}>{t("auth.register.title")}</Title>

      <Text c="dimmed" size="sm" className="self-center">
        {t("auth.register.hasAccount")}{" "}
        <Anchor component={Link} to="/login">
          {t("auth.register.logIn")}
        </Anchor>
      </Text>

      <Paper shadow="xs" p={28} className="mt-2!" radius="lg">
        <form onSubmit={form.onSubmit(handleRegister)} className="flex flex-col gap-4">
          <TextInput
            label={t("auth.register.email")}
            placeholder={t("auth.register.emailPlaceholder")}
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={t("auth.register.password")}
            placeholder={t("auth.register.passwordPlaceholder")}
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button
            disabled={form.submitting || !form.isValid()}
            type="submit"
            fullWidth
            mt="xs"
            radius="md"
          >
            {form.submitting ? t("auth.register.creatingAccount") : t("auth.register.signUp")}
          </Button>
          {form.errors.root && (
            <InputError size="md">
              {form.errors.root}
            </InputError>
          )}
        </form>
      </Paper>
    </Container>
  );
}
