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
import { useHistory } from "react-router-dom";

import { Team } from "../../../types/api/team";
import { useMessage } from "../../../hooks/useMessage";
import { UpdateButton } from "../../atoms/button/UpdateButton";
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
  const history = useHistory();

  const onClickUpdate = () => {
    axios
      .put("http://localhost:8080/teams/" + id, {
        name: name,
        input_start_date: Number(inputStartDate),
        alert_start_days: Number(alertStartDays)
      })
      .then(function (response) {
        showMessage({ title: "更新しました。", status: "success" });
      })
      .catch((error) => {
        console.trace(error);
        showMessage({ title: "更新に失敗しました", status: "error" });
      });
  };

  const onClickDelete = () => {
    axios
      .delete("http://localhost:8080/teams/" + id)
      .then(function (response) {
        showMessage({ title: "削除しました。", status: "success" });
        history.push("/team_management");
      })
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
    setInputStartDate(e.target.value);
  const onChangeAlertStartDays = (e: ChangeEvent<HTMLInputElement>) =>
    setAlertStartDays(e.target.value);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>チーム詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>チーム名</FormLabel>
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
        <UpdateButton onClick={onClickUpdate}>更新</UpdateButton>
        <DeleteButton onClick={onClickDelete}>削除</DeleteButton>
      </ModalContent>
    </Modal>
  );
});
