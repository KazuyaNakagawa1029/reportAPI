import { Home } from "../components/pages/Home";
import { TeamManagement } from "../components/pages/TeamManagement";
import { TeamAdd } from "../components/pages/TeamAdd";
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
    path: "team_add",
    exact: false,
    children: <TeamAdd />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
