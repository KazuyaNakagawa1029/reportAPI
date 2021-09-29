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
  ModalFooter,
  ModalOverlay,
  Stack,
  ButtonGroup,
  Button
} from "@chakra-ui/react";
import axios from "axios";

import { Team } from "../../../types/api/team";
import { useMessage } from "../../../hooks/useMessage";

type Props = {
  team: Team;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
  teams: Array<Team>;
};

export const TeamDetailModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, team } = props;
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [alertStartDays, setAlertStartDays] = useState("");
  const [sendingMessageUrl, setSendingMessageUrl] = useState("");
  const { showMessage } = useMessage();

  const onClickUpdate = async () => {
    var result = window.confirm("こちらの内容で更新しますか？");
    if (result) {
      try {
        await axios.put("http://localhost:8080/teams/" + id, {
          name: name,
          input_start_date: Number(inputStartDate),
          alert_start_days: Number(alertStartDays),
          sending_message_url: sendingMessageUrl
        });
        showMessage({ title: "更新しました。", status: "success" });
        onClose();
      } catch {
        showMessage({ title: "更新に失敗しました", status: "error" });
      }
    }
  };

  const onClickDelete = async () => {
    var result = window.confirm("削除してもよろしいですか？");
    if (result) {
      try {
        await axios.delete("http://localhost:8080/teams/" + id);
        showMessage({ title: "削除しました。", status: "success" });
        onClose();
      } catch {
        showMessage({ title: "削除に失敗しました", status: "error" });
      }
    }
  };

  useEffect(() => {
    setId(String(team?.id) ?? "");
    setName(team?.name ?? "");
    setInputStartDate(String(team?.input_start_date) ?? "");
    setAlertStartDays(String(team?.alert_start_days) ?? "");
    setSendingMessageUrl(team?.sending_message_url ?? "");
  }, [team]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeInputStartDate = (e: ChangeEvent<HTMLInputElement>) =>
    setInputStartDate(e.target.value);
  const onChangeAlertStartDays = (e: ChangeEvent<HTMLInputElement>) =>
    setAlertStartDays(e.target.value);
  const onChangeSendingMessageUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setSendingMessageUrl(e.target.value);

  return (
    <>
      {
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
                  <Input
                    value={inputStartDate}
                    onChange={onChangeInputStartDate}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>通知開始日</FormLabel>
                  <Input
                    value={alertStartDays}
                    onChange={onChangeAlertStartDays}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>送信先</FormLabel>
                  <Input
                    value={sendingMessageUrl}
                    onChange={onChangeSendingMessageUrl}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup variant="outline" spacing="6" align="center">
                <Button size="lg" colorScheme="teal" onClick={onClickUpdate}>
                  更新
                </Button>
                <Button size="lg" colorScheme="red" onClick={onClickDelete}>
                  削除
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
});
