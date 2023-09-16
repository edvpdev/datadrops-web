import { IoAnalytics } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { CgDatabase } from "react-icons/cg";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

export interface Route {
  icon?: IconType;
  name: string;
  path: string;
  children?: Route[];
}

export const ROUTES: Route[] = [
  {
    icon: IoAnalytics,
    name: "Integrations",
    path: "/integrations/providers",
    children: [
      {
        name: "Providers",
        path: "/integrations/providers",
      },
      {
        name: "Synchronizations",
        path: "/integrations/synchronizations",
      },
      {
        name: "History",
        path: "/integrations/history",
      },
    ],
  },
  {
    icon: CgDatabase,
    name: "Data Management",
    path: "/data/query",
    children: [
      {
        name: "Query",
        path: "/data/query",
      },
    ],
  },
  {
    icon: TbDeviceDesktopAnalytics,
    name: "Analytics",
    path: "/analytics/views",
    children: [
      {
        name: "Views",
        path: "/analytics/views",
      },
      {
        name: "Statistics",
        path: "/analytics/statistics",
      },
    ],
  },
];
