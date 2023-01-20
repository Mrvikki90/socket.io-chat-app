import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const GamingRoom = ({ allMessages, name }) => {
  return (
    <>
      {allMessages.map((item) => {
        return name === item.name ? (
          <Flex justifyContent="flex-end" mr="6">
            <div className="div-right">
              <Text>Hello</Text>
            </div>
          </Flex>
        ) : (
          <Flex mt="4" justifyContent="flex-start">
            <div className="div-left">
              <Text>Hello</Text>
            </div>
          </Flex>
        );
      })}
    </>
  );
};

export default GamingRoom;
