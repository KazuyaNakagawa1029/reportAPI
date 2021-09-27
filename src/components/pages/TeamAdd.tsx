import { ChangeEvent, memo, useState, VFC } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import axios from "axios";

import { useMessage } from "../../hooks/useMessage";
import { AddButton } from "../atoms/button/AddButton";

export const TeamAdd: VFC = memo(() => {
  const [name, setName] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [alertStartDays, setAlertStartDays] = useState("");
  const [sendingMessageUrl, setSendingMessageUrl] = useState("");
  const { showMessage } = useMessage();

  const onClickAdd = () => {
    var result = window.confirm("こちらの内容で登録しますか？");
    if (result) {
      axios
        .post("http://localhost:8080/teams", {
          name: name,
          input_start_date: Number(inputStartDate),
          alert_start_days: Number(alertStartDays),
          sending_message_url: sendingMessageUrl
        })
        .then(function (response) {
          setName("");
          setInputStartDate("");
          setAlertStartDays("");
          setSendingMessageUrl("");
          showMessage({ title: "登録しました。", status: "success" });
        })
        .catch((error) => {
          console.trace(error);
          showMessage({ title: "登録に失敗しました", status: "error" });
        });
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeInputStartDate = (e: ChangeEvent<HTMLInputElement>) =>
    setInputStartDate(e.target.value);
  const onChangeAlertStartDays = (e: ChangeEvent<HTMLInputElement>) =>
    setAlertStartDays(e.target.value);
  const onChangeSendingMessageUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setSendingMessageUrl(e.target.value);

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          チーム新規登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <FormControl>
            <FormLabel>チーム名</FormLabel>
            <Input
              placeholder="チーム名"
              value={name}
              onChange={onChangeName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>入力開始日</FormLabel>
            <Input
              placeholder="入力開始日"
              value={inputStartDate}
              onChange={onChangeInputStartDate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>通知開始日</FormLabel>
            <Input
              placeholder="通知開始日"
              value={alertStartDays}
              onChange={onChangeAlertStartDays}
            />
          </FormControl>
          <FormControl>
            <FormLabel>送信先</FormLabel>
            <Input
              placeholder="送信先"
              value={sendingMessageUrl}
              onChange={onChangeSendingMessageUrl}
            />
          </FormControl>
          <AddButton onClick={onClickAdd}>登録</AddButton>
        </Stack>
      </Box>
    </Flex>
  );
});
