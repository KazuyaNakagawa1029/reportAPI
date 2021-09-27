import { VFC, memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickTeamManagement: () => void;
  onClickAddTeam: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    onClickHome,
    onClickTeamManagement,
    onClickAddTeam
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickTeamManagement}>
              チーム一覧
            </Button>
            <Button w="100%" onClick={onClickAddTeam}>
              新規登録
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
