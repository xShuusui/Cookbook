import React from "react";
import styled, { css } from "styled-components";

export enum MessageType {
    INFO = "info",
    ERROR = "error",
    NONE = "",
}

interface IMessage {
    type?: MessageType;
}

export const StyledMessage = styled.div<IMessage>`
    color: ${(props) => {
        switch (props.type) {
            case MessageType.INFO:
                return "blue";
            case MessageType.ERROR:
                return "red";
            default:
                return "black";
        }
    }};
`;

// export const Message: React.FC<IMessage> = ({
//     children,
//     type = MessageType.NONE,
// }) => {
//     return <StyledMessage className={type}>{children}</StyledMessage>;
// };
