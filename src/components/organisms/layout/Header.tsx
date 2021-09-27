/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, VFC } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickTeamManagement = useCallback(
    () => history.push("/team_management"),
    []
  );

  const onClickAddTeam = useCallback(() => history.push("/team_add"), []);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            チーム管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box pr={4}>
            <Link onClick={onClickTeamManagement}>チーム一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickAddTeam}>新規登録</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickTeamManagement={onClickTeamManagement}
        onClickAddTeam={onClickAddTeam}
      />
    </>
  );
});
