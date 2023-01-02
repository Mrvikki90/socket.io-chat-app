import { Box } from "@chakra-ui/react";
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
    <Box ml="40rem" mt="12rem" p="20" display="inline-block" bg="#1c2329">
      <form onSubmit={handleSubmit}>
        <h3 className="text-warning">Welcome to Chat Room</h3>
        <div className="mb-3">
          <label className=" text-light form-label" name="name">
            Name
          </label>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleChnage1}
          />
        </div>
        <div className="mb-3">
          <label className=" text-light form-label">Select Room</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="chatRoom"
            onChange={handleChnage2}
          >
            <option selected>Select Room</option>
            <option value="Gaming">Gaming</option>
            <option value="Coding">Coding</option>
            <option value="Music">Music</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Box>
  );
};

export default JoinForm;
