import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  VFC,
  useState
} from "react";
import {
  Input,
  InputGroup,
  useDisclosure,
  Wrap,
  WrapItem,
  IconButton
} from "@chakra-ui/react";

import { TeamCard } from "../organisms/team/TeamCard";
import { GetAllTeams } from "../../hooks/GetAllTeams";
import { TeamDetailModal } from "../organisms/modal/TeamDetailModal";
import { useSelectTeam } from "../../hooks/useSelectTeam";
import { Team } from "../../types/api/team";

export const TeamManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTeams, teams } = GetAllTeams();
  const { onSelectTeam, selectedTeam } = useSelectTeam();
  const [filterTeams, setFilterTeams] = useState<Array<Team>>(teams);
  const [result, setResult] = useState(true);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  const onClickTeam = useCallback(
    (id: number) => {
      onSelectTeam({ id, teams, onOpen });
    },
    [teams, onSelectTeam, onOpen]
  );

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const updateList = teams.filter((obj) => {
      return obj.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    setResult(updateList.length !== 0);
    setFilterTeams(updateList);
  };

  return (
    <>
      {
        <Wrap p={{ base: 4, md: 10 }}>
          <InputGroup>
            <Input
              variant="outline"
              colorScheme="red"
              placeholder="検索"
              onChange={onFilter}
            />
          </InputGroup>
          {(filterTeams.length === 0 && result === true
            ? teams
            : filterTeams
          ).map((obj) => (
            <WrapItem key={obj.id} mx="auto">
              <TeamCard
                id={obj.id}
                imageUrl="https://source.unsplash.com/random"
                teamName={obj.name}
                onClick={onClickTeam}
              />
            </WrapItem>
          ))}
          <IconButton
            aria-label="view"
            shadow="lg"
            bg="white"
            color="gray.400"
            rounded="full"
          />
        </Wrap>
      }

      <TeamDetailModal
        isOpen={isOpen}
        onClose={onClose}
        team={selectedTeam}
        teams={teams}
      />
    </>
  );
});
