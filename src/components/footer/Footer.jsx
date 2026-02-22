import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Group } from "@mantine/core";
import logo from "../../assets/logo.png";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <div className="mt-auto border-t border-solid border-gray-100">
      <Container className="flex-col sm:flex-row justify-between items-center py-6 gap-4">
        <img src={logo} alt="Habit Tracker" className="h-9" />

        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
