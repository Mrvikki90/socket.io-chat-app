import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinForm = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleChnage1 = (e) => {
    setName(e.target.value);
  };
  const handleChnage2 = (e) => {
    setRoom(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      navigate(`/chat/${room}`, {
        state: {
          name: name,
          room: room,
        },
      });
    }
  };

  return (
    <Box
      bg="darkcyan"
      h="100vh"
      position="relative"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Flex
        position="absolute"
        p="8"
        bg="white"
        rounded="lg"
        boxShadow="dark-lg"
        mb="14"
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="6">
            <Heading color="InfoText">Welcome to Chat Room</Heading>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your Name" onChange={handleChnage1} />
            </FormControl>
            <FormControl>
              <FormLabel>Select Room</FormLabel>
              <Select placeholder="Select Room" onChange={handleChnage2}>
                <option value="Gaming">Gaming</option>
                <option value="Coding">Coding</option>
                <option value="Music">Music</option>
              </Select>
            </FormControl>
            <Button variant="outline" colorScheme="cyan" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default JoinForm;
