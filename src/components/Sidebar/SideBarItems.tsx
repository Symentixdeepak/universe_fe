import {
  DashboardIcon,
  SearchIcon,
  ZoomSearchIcon,
  MyUniverseIcon,
  PendingConnectionIcon,
  NotificationIcon,
  SettingsIcon,
} from "./SidebarIcons";

export interface SidebarItem {
  id: string;
  title: string;
  iconComponent: React.ComponentType<{ color?: string; width?: number; height?: number }>;
  path: string;
  children?: ChildItem[];
}

export interface ChildItem {
  id: number;
  title: string;
  path: string;
}

export const SIDEBAR_WIDTH_EXPANDED = 185;
export const SIDEBAR_WIDTH_COLLAPSED = 60;

export const childItems: ChildItem[] = [
  { id: 1, title: "Sub Item 1", path: "/user/dashboard/sub1" },
  { id: 2, title: "Sub Item 2", path: "/user/dashboard/sub2" },
  { id: 3, title: "Sub Item 3", path: "/user/dashboard/sub3" },
];

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Your Dashboard",
    iconComponent: DashboardIcon,
    path: "/user/dashboard",
  },
  {
    id: "search",
    title: "Search",
    iconComponent: SearchIcon,
    path: "/search",
  },
  {
    id: "connected",
    title: "Get Connected",
    iconComponent: ZoomSearchIcon,
    path: "/user/connections",
    children: childItems,
  },
  {
    id: "myuniverse",
    title: "My Universe",
    iconComponent: MyUniverseIcon,
    path: "/user/my-universe",
  },
  {
    id: "pending",
    title: "Pending Connection",
    iconComponent: PendingConnectionIcon,
    path: "/pending-connections",
  },
  {
    id: "notifications",
    title: "Notifications",
    iconComponent: NotificationIcon,
    path: "/notifications",
  },
  {
    id: "settings",
    title: "Settings",
    iconComponent: SettingsIcon,
    path: "/settings",
  },
];