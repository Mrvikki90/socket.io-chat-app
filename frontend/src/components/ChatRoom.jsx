import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { RoomsData } from "../mockData/data";
import CodingRoom from "./ChatRooms/CodingRoom";
import GamingRoom from "./ChatRooms/GamingRoom";
import MusicRooms from "./ChatRooms/MusicRooms";

const ChatRoom = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [allmessages, setAllMessages] = useState({
    Coding: [],
    Gaming: [],
    Music: [],
  });
  const [sockets, setSockets] = useState();
  const [isChatting, setIsChatting] = useState(false);
  const [rooms, setRooms] = useState();

  useEffect(() => {
    setData(location.state);
  }, [location]);

  const chatRooms = {
    Coding: [],
    Gaming: [],
    Music: [],
  };

  // let roomsStore = [];

  // const setRoomCategory = (roomCat) => {
  //   switch (roomCat) {
  //     case "Gaming Room":
  //       roomsStore.push(roomCat);
  //       setRooms(roomCat);
  //       return setIsChatting(true);

  //     case "Coding Room":
  //       roomsStore.push(roomCat);
  //       setRooms(roomCat);
  //       return setIsChatting(true);

  //     case "Music Room":
  //       roomsStore.push(roomCat);
  //       setRooms(roomCat);
  //       return setIsChatting(true);
  //   }
  // };

  // useEffect(() => {
  //   console.log("roomsStore", roomsStore);
  // }, [roomsStore]);

  useEffect(() => {
    const socket = io("http://localhost:8000/");
    setSockets(socket);
    socket.on("connect", () => {
      socket.emit("joinRoom", rooms);
    });
  }, [rooms]);

  useEffect(() => {
    if (sockets) {
      sockets.on("joined_room", (room) => {
        // roomsStore.push({ room });
      });
    }
  }, [rooms, sockets]);

  useEffect(() => {
    if (sockets) {
      sockets.on("latestMessages", (newMessage) => {
        console.log({ newMessage });
        setAllMessages((prev) => {
          console.log({
            ...prev,
            [`${newMessage.room}`]: [
              ...((prev && prev[newMessage.room]) || []),
              newMessage,
            ],
          });
          return {
            ...prev,
            [`${newMessage.room}`]: [
              ...((prev && prev[newMessage.room]) || []),
              newMessage.newMessage.msg,
            ],
          };
        });
        setMsg("");
      });
    }
  }, [sockets]);

  useEffect(() => {
    console.log("allmessgaes", allmessages);
  }, [allmessages]);

  const handleChnage = (e) => setMsg(e.target.value);

  const onSubmit = () => {
    if (msg) {
      const newMessage = { time: new Date(), msg: msg, name: data.name };
      sockets.emit("newMessage", {
        newMessage: newMessage,
        room: rooms,
      });
    }
  };

  return (
    <>
      <Flex bg="#e1b382" h="100vh">
        <Flex w="40vh" bg="#272727" boxShadow="dark-lg">
          <Flex direction="column" gap="10">
            <Text fontSize="4xl" m="4" color="white">
              Chat Rooms
            </Text>
            <Tabs display="flex">
              <TabList display="flex" flexDirection="column">
                {_.map(allmessages, (chatRoom, chatRoomName) => {
                  return (
                    <Tab
                      onClick={() => {
                        setIsChatting(true);
                        setRooms(chatRoomName);
                      }}
                    >
                      {chatRoomName}
                    </Tab>
                  );
                })}
              </TabList>

              <TabPanels
                width="100%"
                border="1px solid red"
                backgroundColor="green"
              >
                {_.map(allmessages, (chatRoom, chatRoomName) => (
                  <TabPanel>
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
                        <Text
                          fontSize="4xl"
                          fontWeight="semibold"
                          fontStyle="italic"
                        >
                          {rooms}
                        </Text>
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
                            {_.map(allmessages[chatRoomName], (item) => {
                              return data.name === item.name ? (
                                <Flex justifyContent="flex-end" m="6">
                                  <div className="div-right">
                                    <Text>{item}</Text>
                                  </div>
                                </Flex>
                              ) : (
                                <Flex mt="4" justifyContent="flex-start">
                                  <div className="div-left">
                                    <Text>{item}</Text>
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
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
            {/* {RoomsData.map((item) => (
              <Flex alignItems="center" justifyContent="space-evenly">
                <Avatar src={item.img} />
                <Text
                  cursor="pointer"
                  color="yellowgreen"
                  fontSize="lg"
                  onClick={() => setRoomCategory(item.disc)}
                >
                  {item.disc}
                </Text>
              </Flex>
            ))} */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ChatRoom;
