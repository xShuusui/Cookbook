import React from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { PageHeader, Skeleton, Card, Row, Col, Button } from "antd";
import { useGetHook } from "../../hooks/UseGetHook";
import { Ingredient } from "../../types/Types";

export const IngredientPage: React.FC = () => {
    const { data, fetchData } = useGetHook<Ingredient[]>("/api/ingredient");

    return (
        <>
            <PageHeader
                title="Ingredients"
                extra={
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => console.log("Create")}
                    >
                        Create Ingredient
                    </Button>
                }
            />

            <Row gutter={16}>
                {data === null ? (
                    <Skeleton />
                ) : (
                    data.map((ingredient) => (
                        <Col span={8} key={ingredient.ingredientId}>
                            <Card
                                title={ingredient.name}
                                style={{ margin: "0.5rem 0" }}
                                extra={
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={() => console.log("Edit")}
                                    >
                                        Edit
                                    </Button>
                                }
                                actions={[
                                    <DeleteOutlined
                                        onClick={() => console.log("Delete")}
                                    />,
                                ]}
                            >
                                <Card.Grid
                                    hoverable={false}
                                    style={{ width: "50%" }}
                                >
                                    {new Date(
                                        ingredient.createdAt
                                    ).toLocaleString()}
                                </Card.Grid>
                                <Card.Grid
                                    hoverable={false}
                                    style={{ width: "50%" }}
                                >
                                    {new Date(
                                        ingredient.updatedAt
                                    ).toLocaleString()}
                                </Card.Grid>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};
