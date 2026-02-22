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
import { useAuth } from "../../store/authContext";

const schema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
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
      form.setErrors({ email: "Email is already taken" });
    }
  };

  return (
    <Container
      size={420}
      className="flex grow justify-center items-stretch flex-col gap-4"
    >
      <Title className="self-center font-outfit!" fw={600}>Create your account</Title>

      <Text c="dimmed" size="sm" className="self-center">
        Already have an account?{" "}
        <Anchor component={Link} to="/login">
          Log in
        </Anchor>
      </Text>

      <Paper shadow="xs" p={28} className="mt-2!" radius="lg">
        <form onSubmit={form.onSubmit(handleRegister)} className="flex flex-col gap-4">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
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
            {form.submitting ? "Creating account..." : "Sign up"}
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
