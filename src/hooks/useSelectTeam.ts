/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";

import { Team } from "../types/api/team";
import { useMessage } from "./useMessage";

type Props = {
  id: number;
  teams: Array<Team>;
  onOpen: () => void;
};

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectTeam = () => {
  const { showMessage } = useMessage();

  const [selectedTeam, setSelectedTeam] = useState<Team>();

  const onSelectTeam = useCallback((props: Props) => {
    const { id, teams, onOpen } = props;
    const targetTeam = teams.find((obj) => obj.id === id);
    if (!targetTeam) {
      showMessage({ title: "チームが見つかりません", status: "error" });
      return;
    } else {
      setSelectedTeam(targetTeam);
      onOpen();
    }
  }, []);
  return { onSelectTeam, selectedTeam };
};
