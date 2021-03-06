// Author: Gillom McNeil (A00450414)
// Author: Evan Meunier

import { useState } from 'react'
import { useHistory } from "react-router-dom";

const Login = ({ socket }) => {
    //===== STATES ============================================================
    // These states are set by the Login component.
    const [userName, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");
    const history = useHistory()

    //===== EVENT EMISSION ====================================================

    /**
     * @author Gillom McNeil (A00450414)
     *
     * Handles the onClick event on the Join button
     *
     * Check to make sure input is non-empty and then emit the join_room event
     */
    const joinRoom = () => {
      if (userName !== "" && roomName !== "") {
          socket.emit("join_room", { userName, roomName });
          history.push("/game", {user: userName, room: roomName});
      }
    };

    //===== COMPONENT =========================================================
    return (
        <div className="LoginPage">
            <div className="LoginCard">
                <div className="Logo">Aij?</div>
                <input className="LoginInput" type="text"
                    placeholder="Username"
                    onBlur={(event) => {setUserName(event.target.value)}}/>
                <input className="LoginInput" type="text" placeholder="Room ID"
                    onBlur={(event) => {setRoomName(event.target.value)}}/>
                <button className="Join Btn" to="/game"
                    onClick={joinRoom}>Join</button>
            </div>
        </div>
    );
}

export default Login;
