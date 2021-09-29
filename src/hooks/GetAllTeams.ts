/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";

import { Team } from "../types/api/team";
import { useMessage } from "./useMessage";

export const GetAllTeams = () => {
  const { showMessage } = useMessage();

  const [teams, setTeams] = useState<Array<Team>>([]);

  const getTeams = useCallback(async () => {
    try {
      const res = await axios.get<Array<Team>>("http://localhost:8080/teams");
      setTeams(res.data);
    } catch (e) {
      showMessage({ title: "チーム取得に失敗しました", status: "error" });
    }
  }, []);

  return { getTeams, teams };
};
