import io from "socket.io-client";

import "./App.css";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Input from "./components/Input";

interface UserDetailsInterface {
  name: string;
  score: string;
}

function App() {
  const [userDetails, setUserDetails] = useState<UserDetailsInterface>({
    name: "",
    score: "0",
  });

  const socket = useMemo(() => {
    return io("http://localhost:3000", {});
  }, []);

  const connectSocket = () => {
    socket.on("connection", () => {});
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserDetails((prevDetails) => {
      return {
        ...prevDetails,
        ...{ [name]: value },
      };
    });
  };

  const handleSendUserDetails = (userDetails: UserDetailsInterface) => {
    socket.emit("send-player-details", userDetails);
    socket.on("player-score-to-client", (player_details: string) => {
      console.log(player_details);
    });
  };

  const handleEditPlayerDetails = (user_details: UserDetailsInterface) => {
    socket.emit("edit-player-details", user_details);
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>React Multiplayer dashboard</h1>

      <Input
        placeholder={"Enter your name"}
        id="name"
        name="name"
        onChange={handleInputChange}
      />
      <Input
        placeholder={"Enter your Score"}
        id="score"
        name="score"
        onChange={handleInputChange}
      />

      <button onClick={() => handleSendUserDetails(userDetails)}>
        Send Details
      </button>
      <button onClick={() => handleEditPlayerDetails(userDetails)}>
        Edit Details
      </button>
    </>
  );
}

export default App;
