import {
  DashboardIcon,
  SearchIcon,
  ZoomSearchIcon,
  MyUniverseIcon,
  PendingConnectionIcon,
  NotificationIcon,
  SettingsIcon,
  ConnectIcon,
  ConnectionMadeIcon,
} from "./SidebarIcons";

export interface SidebarItem {
  id: string;
  title: string;
  iconComponent: React.ComponentType<{
    color?: string;
    width?: number;
    height?: number;
  }>;
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

export const childItemsSuperConnector: ChildItem[] = [
  { id: 1, title: "Sub Item 1", path: "/superconnector/dashboard/sub1" },
  { id: 2, title: "Sub Item 2", path: "/superconnector/dashboard/sub2" },
  { id: 3, title: "Sub Item 3", path: "/superconnector/dashboard/sub3" },
];


export const sidebarItemsUser: SidebarItem[] = [
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
    path: "/user/pending_connections",
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

export const sidebarItemsSuperConnector: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Your Dashboard",
    iconComponent: DashboardIcon,
    path: "/superconnector/dashboard",
  },
  {
    id: "search",
    title: "Search",
    iconComponent: SearchIcon,
    path: "/search",
  },
  {
    id: "connected_other",
    title: "Connect Others",
    iconComponent: ConnectIcon,
    path: "/superconnector/dashboard",
    children: childItemsSuperConnector,
  },
  {
    id: "connection_made",
    title: "Connections Made",
    iconComponent: ConnectionMadeIcon,
    path: "/superconnector/connections",
  },
  {
    id: "connected",
    title: "Get Connected",
    iconComponent: ZoomSearchIcon,
    path: "/superconnector/connections",
    children: childItemsSuperConnector,
  },
  {
    id: "myuniverse",
    title: "My Universe",
    iconComponent: MyUniverseIcon,
    path: "/superconnector/my-universe",
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
