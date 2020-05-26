import { Input } from "antd";
import React from "react";

type InputInstructionsProps = {
    instructions: string;
    setInstructions: (instructions: string) => void;
    enableInput: boolean;
};

export const InputInstructions: React.FC<InputInstructionsProps> = ({
    instructions,
    setInstructions,
    enableInput,
}) => {
    return (
        <Input.TextArea
            value={instructions}
            onChange={(e) => setInstructions(e.currentTarget.value)}
            disabled={enableInput ? false : true}
            autoSize={{
                minRows: 5,
                maxRows: 15,
            }}
            style={
                enableInput
                    ? {
                          color: "black",
                      }
                    : {
                          color: "black",
                          border: "0",
                      }
            }
        />
    );
};
