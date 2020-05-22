import React, { useState } from "react";
import { Space, Button, PageHeader, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const buttonStyle = {
    width: "150px",
};

type DashboardHeaderProps = {
    setSortBy: (sortBy: string) => void;
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    setSortBy,
}) => {
    const [addRecipe, setAddRecipe] = useState<boolean>(false);

    return (
        <>
            <Modal
                visible={addRecipe}
                onCancel={() => {
                    setAddRecipe(false);
                }}
            />
            <PageHeader
                title="Dashboard"
                extra={
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => setAddRecipe(true)}
                    >
                        Add Recipe
                    </Button>
                }
            >
                <Space size="small">
                    {"Sort by: "}
                    <Button
                        style={buttonStyle}
                        onClick={() => setSortBy("name")}
                    >
                        Name
                    </Button>
                    <Button
                        style={buttonStyle}
                        onClick={() => setSortBy("newest")}
                    >
                        Newest
                    </Button>
                    <Button
                        style={buttonStyle}
                        onClick={() => setSortBy("rating")}
                    >
                        Rating
                    </Button>
                    <Button
                        style={buttonStyle}
                        onClick={() => setSortBy("ingredients")}
                    >
                        Ingredients
                    </Button>
                </Space>
            </PageHeader>
        </>
    );
};
