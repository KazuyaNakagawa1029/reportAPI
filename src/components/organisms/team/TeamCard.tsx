import { memo, VFC } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

type Props = {
  id: number;
  imageUrl: string;
  teamName: string;
  onClick: (id: number) => void;
};

export const TeamCard: VFC<Props> = memo((props) => {
  const { id, imageUrl, teamName, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={teamName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {teamName}
        </Text>
      </Stack>
    </Box>
  );
});
