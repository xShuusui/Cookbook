import React from "react";
import { Space, Button, PageHeader, Input, Slider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const buttonStyle = {
    width: "150px",
};

type DashboardHeaderProps = {
    setSortBy: (sortBy: string) => void;
    filterBy: string;
    setFilterBy: (filterBy: string) => void;
    setShowModal: (showModal: boolean) => void;
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    setSortBy,
    filterBy,
    setFilterBy,
    setShowModal,
}) => {
    return (
        <PageHeader
            title="Dashboard"
            extra={
                <Button
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                >
                    Add Recipe
                </Button>
            }
        >
            <Space size="small">
                {"Sort by: "}
                <Button style={buttonStyle} onClick={() => setSortBy("name")}>
                    Name
                </Button>
                <Button style={buttonStyle} onClick={() => setSortBy("newest")}>
                    Newest
                </Button>
                <Button style={buttonStyle} onClick={() => setSortBy("rating")}>
                    Rating
                </Button>
                <Button
                    style={buttonStyle}
                    onClick={() => setSortBy("calories")}
                >
                    Calories
                </Button>
                <Button style={buttonStyle} onClick={() => setSortBy("fat")}>
                    Fat
                </Button>
                <Input
                    placeholder="Search ingredient"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.currentTarget.value)}
                />
                <Slider min={0} max={5} />
            </Space>
        </PageHeader>
    );
};
