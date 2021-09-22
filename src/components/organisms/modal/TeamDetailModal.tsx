import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";
import axios from "axios";

import { Team } from "../../../types/api/team";
import { useMessage } from "../../../hooks/useMessage";
import { DeleteButton } from "../../atoms/button/DeleteButton";

type Props = {
  team: Team | undefined;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const TeamDetailModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, team } = props;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [alertStartDays, setAlertStartDays] = useState("");
  const { showMessage } = useMessage();

  const onClickDelete = () => {
    axios
      .delete("http://localhost:8080/team/" + id)
      .catch(() =>
        showMessage({ title: "削除に失敗しました", status: "error" })
      );
  };

  useEffect(() => {
    setId(String(team?.id) ?? "");
    setName(team?.name ?? "");
    setInputStartDate(String(team?.input_start_date) ?? "");
    setAlertStartDays(String(team?.alert_start_days) ?? "");
  }, [team]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeInputStartDate = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeAlertStartDays = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={name} onChange={onChangeName} />
            </FormControl>
            <FormControl>
              <FormLabel>入力開始日</FormLabel>
              <Input value={inputStartDate} onChange={onChangeInputStartDate} />
            </FormControl>
            <FormControl>
              <FormLabel>通知開始日</FormLabel>
              <Input value={alertStartDays} onChange={onChangeAlertStartDays} />
            </FormControl>
          </Stack>
        </ModalBody>
        <DeleteButton onClick={onClickDelete}>削除</DeleteButton>
      </ModalContent>
    </Modal>
  );
});
