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
    role: "seeker",
    title: "Upload Package",
    label: "9",
    href: "/dashboard/package",
    icon: <BackpackIcon />,
  },
  {
    role: "seeker",
    title: "Status",
    label: "",
    href: "/dashboard/status",
    icon: <LayersIcon />,
  },
  {
    role: "",
    title: "Sign Out",
    label: "",
    href: "/dashboard/profiles",
    icon: <PersonIcon />,
  },
  {
    role: "",
    title: "Supplier",
    label: "",
    href: "/dashboard/supplier",
    icon: <IconHexagonNumber1 size={18} />,
  },
  // {
  //   role: "employer",
  //   title: "View Application",
  //   label: "",
  //   href: "/dashboard/view-application",
  //   icon: <IconHexagonNumber2 size={18} />,
  // },
];
