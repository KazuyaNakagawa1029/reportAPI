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
  Tr,
  Th,
  Td,
  Wrap
} from "@chakra-ui/react";
import { useTable, useSortBy, Column } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { GetAllTeams } from "../../hooks/GetAllTeams";
import { useSelectTeam } from "../../hooks/useSelectTeam";
import { Team } from "../../types/api/team";
import { TeamDetailModal } from "../organisms/modal/TeamDetailModal";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTeams, teams } = GetAllTeams();
  const { onSelectTeam, selectedTeam } = useSelectTeam();
  const [filterTeams, setFilterTeams] = useState<Array<Team>>(teams);
  const [filteredChar, setFilteredChar] = useState<String>("");

  const createFilteredTeams = (teams1: Team[], filteringChar: String) => {
    if (filteringChar.length === 0) {
      return teams1;
    }

    return teams1.filter((obj) => {
      return obj.name.toLowerCase().search(filteringChar.toLowerCase()) !== -1;
    });
  };

  const onClickTeam = useCallback(
    (id: number) => {
      onSelectTeam({ id, teams, onOpen });
    },
    [teams, onSelectTeam, onOpen]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredChar(e.target.value);
  };

  const onClosed = () => {
    getTeams();
    onClose();
  };

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  useEffect(() => {
    const updateList = createFilteredTeams(teams, filteredChar);
    setFilterTeams(updateList);
  }, [teams, filteredChar]);

  const columns: Column<Team>[] = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        isNumeric: true
      },
      {
        Header: "名前",
        accessor: "name"
      },
      {
        Header: "入力開始日",
        accessor: "input_start_date",
        isNumeric: true
      },
      {
        Header: "通知開始日",
        accessor: "alert_start_days",
        isNumeric: true
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: filterTeams }, useSortBy);
  console.log(rows);
  return (
    <>
      <Wrap p={{ base: 4, md: 10 }}>
        <InputGroup>
          <Input
            variant="outline"
            colorScheme="red"
            placeholder="検索"
            onChange={onChange}
          />
        </InputGroup>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      onClick={() => onClickTeam(row.values.id)}
                      _hover={{ cursor: "pointer", opacity: 0.6 }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Wrap>
      )
      <TeamDetailModal isOpen={isOpen} onClose={onClosed} team={selectedTeam} />
    </>
  );
});
