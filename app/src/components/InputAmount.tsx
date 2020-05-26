import { InputNumber } from "antd";
import React from "react";

type InputAmountProps = {
    setAmount: (amount: number) => void;
    enableInput: boolean;
};

export const InputAmount: React.FC<InputAmountProps> = ({
    setAmount,
    enableInput,
}) => {
    return (
        <InputNumber
            style={{ width: "150px" }}
            min={0}
            disabled={enableInput ? false : true}
            defaultValue={0}
            onChange={(e) => setAmount(Number(e))}
        />
    );
};
