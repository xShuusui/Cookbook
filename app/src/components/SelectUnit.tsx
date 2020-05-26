import { Select } from "antd";
import React from "react";

type SelectUnitProps = {
    setUnit: (unit: string) => void;
    enableInput: boolean;
};

export const SelectUnit: React.FC<SelectUnitProps> = ({
    setUnit,
    enableInput,
}) => {
    const { Option } = Select;

    return (
        <Select
            disabled={enableInput ? false : true}
            onSelect={(e: string) => setUnit(e)}
            style={{ width: "150px" }}
        >
            <Option value="g">gram</Option>
            <Option value="kg">kilogram</Option>
            <Option value="ml">milliliter</Option>
            <Option value="l">liter</Option>
            <Option value="cup">cup</Option>
            <Option value="teaspoon">teaspoon</Option>
            <Option value="tablespoon">tablespoon</Option>
        </Select>
    );
};
