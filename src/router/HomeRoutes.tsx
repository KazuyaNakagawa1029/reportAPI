import { Home } from "../components/pages/Home";
import { TeamManagement } from "../components/pages/TeamManagement";
import { Test } from "../components/pages/Test";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "team_management",
    exact: false,
    children: <TeamManagement />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
