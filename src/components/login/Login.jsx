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

export default function Login() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.email({ error: t("validation.invalidEmail") }),
    password: z.string().min(8, t("validation.passwordMinLogin")),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: zod4Resolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      const isNetworkError = !e.response;
      form.setErrors({
        root: isNetworkError
          ? t("auth.login.networkError")
          : t("auth.login.invalidCredentials"),
      });
    }
  };

  return (
    <Container
      size={420}
      className="flex grow justify-center items-stretch flex-col gap-4"
    >
      <Title className="self-center font-outfit!" fw={600}>{t("auth.login.title")}</Title>

      <Text c="dimmed" size="sm" className="self-center">
        {t("auth.login.noAccount")}{" "}
        <Anchor component={Link} to="/register">{t("auth.login.createAccount")}</Anchor>
      </Text>

      <Paper shadow="xs" p={28} className="mt-2!" radius="lg">
        <form onSubmit={form.onSubmit(handleLogin)} className="flex flex-col gap-4">
          <TextInput
            label={t("auth.login.email")}
            placeholder={t("auth.login.emailPlaceholder")}
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={t("auth.login.password")}
            placeholder={t("auth.login.passwordPlaceholder")}
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
            {form.submitting ? t("auth.login.signingIn") : t("auth.login.signIn")}
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
