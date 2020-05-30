import React from "react";
import { Space, Button, PageHeader, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type DashboardHeaderProps = {
    setSortBy: (sortBy: string) => void;
    filterByIngredient: string;
    setFilterByIngredient: (filterByIngredient: string) => void;
    filterByRating: number[];
    setFilterByRating: (filterByRating: number[]) => void;
    setShowModal: (showModal: boolean) => void;
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    setSortBy,
    filterByIngredient,
    setFilterByIngredient,
    filterByRating,
    setFilterByRating,
    setShowModal,
}) => {
    const { Option } = Select;

    return (
        <PageHeader
            title="Dashboard"
            style={{ width: "80rem" }}
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
            <Space size={"large"}>
                <Space>
                    Sort by:
                    <Select
                        placeholder={"Select ..."}
                        style={{ width: "200px" }}
                        onSelect={(e: string) => setSortBy(e)}
                    >
                        <Option value={"name"}>Name</Option>
                        <Option value={"rating"}>Rating</Option>
                        <Option value={"newest"}>Newest</Option>
                        <Option value={"lastedited"}>Last Edited</Option>
                        <Option value={"calories"}>Calories</Option>
                        <Option value={"fat"}>Fat</Option>
                    </Select>
                </Space>
                <Space>
                    Filter by:
                    <Input
                        placeholder="Ingredient"
                        style={{ width: "200px" }}
                        value={filterByIngredient}
                        onChange={(e) =>
                            setFilterByIngredient(e.currentTarget.value)
                        }
                    />
                    <Select
                        placeholder={"Rating"}
                        style={{ width: "200px" }}
                        mode={"multiple"}
                        onChange={(e: number[]) => setFilterByRating(e)}
                    >
                        <Option value={0}>0 - Stars</Option>
                        <Option value={1}>1 - Stars</Option>
                        <Option value={2}>2 - Stars</Option>
                        <Option value={3}>3 - Stars</Option>
                        <Option value={4}>4 - Stars</Option>
                        <Option value={5}>5 - Stars</Option>
                    </Select>
                </Space>
            </Space>
        </PageHeader>
    );
};
