import React, { useState } from "react";
import { PageHeader, Skeleton, Row, Col, Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { IngredientCard } from "./components/IngredientCard";
import { CreateModal } from "./components/CreateModal";
import { EditModal } from "./components/EditModal";
import { useGetHook } from "../../hooks/UseGetHook";
import { Ingredient } from "../../types/Types";

/** The main react component for the ingredient page. */
export const IngredientPage: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const [ingredientId, setIngredientId] = useState<string>("");

    const { data, fetchData } = useGetHook<Ingredient[]>("/api/ingredient");

    return (
        <>
            <CreateModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                refetchData={fetchData}
            />
            <EditModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                ingredientId={ingredientId}
                refetchData={fetchData}
            />
            <PageHeader
                title="Ingredients"
                style={{ width: "80rem" }}
                extra={
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => setShowCreateModal(true)}
                    >
                        Create ingredient
                    </Button>
                }
            />

            {data === null ? (
                <Skeleton />
            ) : data.length === 0 ? (
                <Empty description={"No ingredients found!"} />
            ) : (
                <Row gutter={[16, 16]}>
                    {data.map((ingredient) => (
                        <Col span={8} key={ingredient.ingredientId}>
                            <IngredientCard
                                ingredient={ingredient}
                                refetchData={fetchData}
                                setShowEditModal={setShowEditModal}
                                setIngredientId={setIngredientId}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};
