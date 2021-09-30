/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";

import { Team } from "../types/api/team";
import { Result } from "../types/result";

export const GetAllTeams = () => {
  const [result, setResult] = useState<Result>({ level: 0, message: "" });
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<Array<Team>>("http://localhost:8080/teams");
      setTeams(res.data);
    } catch (e) {
      setResult({ level: 2, message: "チーム取得に失敗しました" });
    }
  }, []);

  return { getTeams, teams, result, isLoading };
};
