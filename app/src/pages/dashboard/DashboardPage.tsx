import { Row, Skeleton, Empty } from "antd";
import React, { useState } from "react";

import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardModal } from "./components/DashboardModal";
import { DashboardCard } from "./components/DashboardCard";
import { useGetHook } from "../../hooks/UseGetHook";
import { Recipe } from "../../types/Types";

export const DashboardPage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [filterBy, setFilterBy] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    const { data, fetchData } = useGetHook<Recipe[]>(
        "/api/recipe?sortBy=" + sortBy + "&filterBy=" + filterBy
    );

    return (
        <>
            <DashboardModal
                showModal={showModal}
                setShowModal={setShowModal}
                refetch={fetchData}
            />
            <DashboardHeader
                setSortBy={setSortBy}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setShowModal={setShowModal}
            />

            <Row gutter={16}>
                {data === null ? (
                    <Skeleton />
                ) : data.length === 0 ? (
                    <Empty
                        description="No recipes found."
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    data.map((recipe) => (
                        <DashboardCard
                            key={recipe.recipeId}
                            recipe={recipe}
                            refetch={fetchData}
                        ></DashboardCard>
                    ))
                )}
            </Row>
        </>
    );
};
