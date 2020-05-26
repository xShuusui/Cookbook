import { PageHeader, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

type RecipeHeaderProps = {
    setRedirect: (redirect: boolean) => void;
};

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ setRedirect }) => {
    return (
        <PageHeader
            title={"Recipe"}
            onBack={() => setRedirect(true)}
            backIcon={
                <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    shape="circle"
                ></Button>
            }
        />
    );
};
