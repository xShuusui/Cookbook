import React from "react";
import { Space, Button, PageHeader, Input, Slider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
                    Create Recipe
                </Button>
            }
        >
            <Space size="small">
                {"Sort by: "}
                <Button
                    style={{ width: "150px" }}
                    onClick={() => setSortBy("name")}
                >
                    Name
                </Button>
                <Button
                    style={{ width: "150px" }}
                    onClick={() => setSortBy("newest")}
                >
                    Newest
                </Button>
                <Button
                    style={{ width: "150px" }}
                    onClick={() => setSortBy("rating")}
                >
                    Rating
                </Button>
                <Button
                    style={{ width: "150px" }}
                    onClick={() => setSortBy("calories")}
                >
                    Calories
                </Button>
                <Button
                    style={{ width: "150px" }}
                    onClick={() => setSortBy("fat")}
                >
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
