/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";

import { Result } from "../types/result";

export const useAxios = <T>(url: string) => {
  const [result, setResult] = useState<Result>({ level: 0, message: "" });
  const [teams, setTeams] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const getResult = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<T>(url);
      setTeams(res.data);
    } catch (e) {
      setResult({ level: 2, message: "チーム取得に失敗しました" });
    }
  }, []);

  return { getResult, teams, result, isLoading };
};
