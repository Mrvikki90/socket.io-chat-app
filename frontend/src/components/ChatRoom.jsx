import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { RoomsData } from "../mockData/data";
import moment from "moment/moment";

const ChatRoom = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [allmessages, setAllMessages] = useState([]);
  const [sockets, setSockets] = useState();
  const [isChatting, setIsChatting] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setData(location.state);
  }, [location]);

  useEffect(() => {
    const socket = io("http://localhost:8000/");
    setSockets(socket);
    socket.on("connect", () => {
      socket.emit("joinRoom", {
        name: location.state.name,
        room: location.state.room,
      });
    });
  }, []);

  useEffect(() => {
    if (sockets) {
      sockets.on("latestMessages", (newMessage) => {
        setAllMessages([...allmessages, newMessage]);
        setMsg("");
      });
    }
  }, [sockets, allmessages]);

  const getClient = async () => {
    if (sockets) {
      await sockets.on("welcome", (userName) => {
        console.log(userName);
        setClients(userName);
      });
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  const handleChnage = (e) => setMsg(e.target.value);

  const onSubmit = () => {
    if (msg) {
      const newMessage = { time: new Date(), msg: msg, name: data.name };
      sockets.emit("newMessage", {
        newMessage: newMessage,
        room: location.state.room,
      });
    }
  };

  return (
    <>
      <Flex bg="#e1b382" h="100vh">
        <Flex w="40vh" bg="#272727" boxShadow="dark-lg">
          <Flex direction="column" mt="10" gap="6" alignItems="center" ml="12">
            <Button
              size="md"
              variant="outline"
              color="#00FF00"
              onClick={() => setIsChatting(true)}
            >
              Start Chatting
            </Button>
            <Text fontSize="2xl" color="white">
              Active Users
            </Text>
            {clients &&
              clients.map((item) => (
                <Flex
                  alignItems="center"
                  justifyContent="space-evenly"
                  gap="4"
                  mx="8"
                >
                  <Avatar src='"https://www.shutterstock.com/image-vector/assassin-head-mask-logo-gaming-600w-1930222925.jpg' />
                  <Text cursor="pointer" color="#00FFFF" fontSize="lg">
                    {item.userName}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
        <Flex direction="column" w="full">
          <Flex
            bg="darkturquoise"
            boxShadow="dark-lg"
            h="-webkit-fit-content"
            p="4"
            w="full"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <Image w="10vh" h="10vh" src="/logo.png" />
            </Flex>
            <Flex>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">
                  {location.state.name}
                  <Badge ml="1" colorScheme="green">
                    Active
                  </Badge>
                </Text>
                <Text fontSize="sm">Software Engineer</Text>
              </Box>
            </Flex>
          </Flex>
          <Flex bg="white">
            {isChatting ? (
              <Scrollbars
                style={{
                  marginTop: 20,
                  marginLeft: 50,
                  width: 1200,
                  height: 500,
                }}
              >
                {allmessages.map((item) => {
                  return data.name === item.name ? (
                    <Flex justifyContent="flex-end" m="6">
                      <div className="div-right">
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text fontStyle="italic" fontWeight="medium">
                            {moment(msg.time).fromNow()}
                          </Text>
                          <Text fontSize="sm">{item.name}</Text>
                        </Flex>

                        <Text>{item.msg}</Text>
                      </div>
                    </Flex>
                  ) : (
                    <Flex mt="4" justifyContent="flex-start">
                      <div className="div-left">
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text fontStyle="italic" fontWeight="medium">
                            {moment(msg.time).fromNow()}
                          </Text>
                          <Text fontSize="sm">{item.name}</Text>
                        </Flex>
                        <Text>{item.msg}</Text>
                      </div>
                    </Flex>
                  );
                })}
              </Scrollbars>
            ) : (
              <Image src="/welcome.jpg" h="85.8vh" w="full" />
            )}
          </Flex>
          <Flex bg="white" h="100vh" direction="column">
            {isChatting ? (
              <Flex mx="96">
                <FormControl>
                  <Input
                    placeholder="Enter message"
                    value={msg}
                    onChange={(e) => handleChnage(e)}
                  />
                </FormControl>
                <Button
                  colorScheme="facebook"
                  bg="cyan"
                  variant="outline"
                  onClick={onSubmit}
                >
                  Send
                </Button>
              </Flex>
            ) : (
              ""
            )}
          </Flex>
          <Flex></Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ChatRoom;
