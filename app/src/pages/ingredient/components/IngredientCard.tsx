import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Ingredient } from "../../../types/Types";
import { confirmModal } from "../../../components/ConfirmModal";

type IngredientCardProps = {
    ingredient: Ingredient;
    refetchData: () => void;
    setShowEditModal: (showEditModal: boolean) => void;
    setIngredientId: (ingredientId: string) => void;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({
    ingredient: { ingredientId, name, createdAt, updatedAt },
    refetchData,
    setShowEditModal,
    setIngredientId,
}) => {
    return (
        <Card
            title={name}
            extra={
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setShowEditModal(true);
                        setIngredientId(ingredientId);
                    }}
                >
                    Edit
                </Button>
            }
            actions={[
                <DeleteOutlined
                    onClick={() =>
                        confirmModal(
                            "/api/ingredient/" + ingredientId,
                            refetchData
                        )
                    }
                />,
            ]}
        >
            <Card.Grid
                hoverable={false}
                style={{
                    width: "50%",
                    textAlign: "center",
                }}
            >
                <p style={{ margin: 0 }}>Created at:</p>
                {new Date(createdAt).toLocaleString()}
            </Card.Grid>
            <Card.Grid
                hoverable={false}
                style={{
                    width: "50%",
                    textAlign: "center",
                }}
            >
                <p style={{ margin: 0 }}>Updated at:</p>
                {new Date(updatedAt).toLocaleString()}
            </Card.Grid>
        </Card>
    );
};
