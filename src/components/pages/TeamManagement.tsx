import { memo, useCallback, useEffect, VFC } from "react";
import { useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";

import { TeamCard } from "../organisms/team/TeamCard";
import { GetAllTeams } from "../../hooks/GetAllTeams";
import { TeamDetailModal } from "../organisms/modal/TeamDetailModal";
import { useSelectTeam } from "../../hooks/useSelectTeam";

export const TeamManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTeams, teams } = GetAllTeams();
  const { onSelectTeam, selectedTeam } = useSelectTeam();

  useEffect(() => getTeams(), [getTeams]);

  const onClickTeam = useCallback(
    (id: number) => {
      onSelectTeam({ id, teams, onOpen });
    },
    [teams, onSelectTeam, onOpen]
  );

  return (
    <>
      {
        <Wrap p={{ base: 4, md: 10 }}>
          {teams.map((obj) => (
            <WrapItem key={obj.id} mx="auto">
              <TeamCard
                id={obj.id}
                imageUrl="https://source.unsplash.com/random"
                teamName={obj.name}
                onClick={onClickTeam}
              />
            </WrapItem>
          ))}
        </Wrap>
      }
      <TeamDetailModal isOpen={isOpen} onClose={onClose} team={selectedTeam} />
    </>
  );
});
