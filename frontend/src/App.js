import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import JoinForm from "./components/JoinForm";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<JoinForm />}></Route>
          <Route path="/chat/:roomname" element={<ChatRoom />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
