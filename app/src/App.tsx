import React from "react";
import { Message, MessageType } from "./components/Message";

export const App = (
    <div className="container">
        <Message type={MessageType.INFO}>Hello World</Message>
        <div className="user info">Hallo User</div>
    </div>
);
