import React from "react";
import styles from "./Message.module.css";

export enum MessageType {
    INFO = "info",
    ERROR = "error",
    NONE = "",
}

interface IMessage {
    type?: MessageType;
}

export const Message: React.FC<IMessage> = ({
    children,
    type = MessageType.NONE,
}) => {
    return <div className={`message ${styles[type]}`}>{children}</div>;
};
