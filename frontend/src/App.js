import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import JoinForm from "./components/JoinForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinForm />}></Route>
        <Route path="/chat/:roomname" element={<ChatRoom />}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
