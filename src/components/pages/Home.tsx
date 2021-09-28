import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  VFC,
  useState,
  useMemo
} from "react";
import {
  Input,
  InputGroup,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Wrap,
  Tr,
  Th,
  Td,
  IconButton,
  Link
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { AddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { TeamCard } from "../organisms/team/TeamCard";
import { GetAllTeams } from "../../hooks/GetAllTeams";
import { TeamDetailModal } from "../organisms/modal/TeamDetailModal";
import { useSelectTeam } from "../../hooks/useSelectTeam";
import { Team } from "../../types/api/team";

export const Home: VFC = memo(() => {
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

  // function DataTable() {
  //   const data = useMemo(
  //     () => [
  //      teams
  //     ],
  //     [],
  //   )

  //   const columns = useMemo(
  //     () => [
  //       {
  //         Header: "id",
  //         accessor: "fromUnit",
  //         isNumeric: true,
  //       },
  //       {
  //         Header: "名前",
  //         accessor: "fromUnit",
  //       },
  //       {
  //         Header: "入力開始日",
  //         accessor: "toUnit",
  //         isNumeric: true,
  //       },
  //       {
  //         Header: "通知開始日",
  //         accessor: "factor",
  //         isNumeric: true,
  //       },
  //       {
  //         Header: "送信先",
  //         accessor: "fromUnit",
  //       },
  //     ],
  //     [],
  //   )

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data }, useSortBy)

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

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>入力開始日</Th>
                <Th>通知開始日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(filterTeams.length === 0 && result === true
                ? teams
                : filterTeams
              ).map((obj) => (
                <Tr id={obj.id}>
                  <Td>
                    <Link onClick={onClickTeam}>{obj.name}</Link>
                  </Td>
                  <Td>{obj.input_start_date}</Td>
                  <Td>{obj.alert_start_days}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Wrap>
      }
      <IconButton
        aria-label="view"
        shadow="lg"
        bg="white"
        color="gray.400"
        rounded="full"
        icon={<AddIcon />}
      />
      <TeamDetailModal
        isOpen={isOpen}
        onClose={onClose}
        team={selectedTeam}
        teams={teams}
      />
    </>
  );
});
