import {
  BackpackIcon,
  LayersIcon,
  PersonIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { IconHexagonNumber1, IconHexagonNumber2 } from "@tabler/icons-react";

export interface NavLink {
  role: string;
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    role: "",
    title: "Dashboard",
    label: "3",
    href: "/dashboard",
    icon: <TokensIcon />,
  },
  {
    role: "customer",
    title: "Upload Package",
    label: "9",
    href: "/dashboard/package",
    icon: <BackpackIcon />,
  },
  {
    role: "customer",
    title: "Status",
    label: "",
    href: "/dashboard/customer-status",
    icon: <LayersIcon />,
  },
  {
    role: "supplier",
    title: "Supplier",
    label: "",
    href: "/dashboard/supplier",
    icon: <IconHexagonNumber1 size={18} />,
  },
];
