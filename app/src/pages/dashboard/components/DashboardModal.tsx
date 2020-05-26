import React, { useState } from "react";
import { Modal } from "antd";
import { CreateRecipe } from "./CreateRecipe";
import { AddIngredient } from "./AddIngredient";
import { RecipeModal } from "./RecipeModal";

/** The type for the DashboardModal. */
type DashboardModalProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    refetch: () => void;
};

export const DashboardModal: React.FC<DashboardModalProps> = ({
    showModal,
    setShowModal,
    refetch,
}) => {
    const [changeForm, setChangeForm] = useState<boolean>(false);
    const [submitForm, setSubmitForm] = useState<boolean>(false);
    const [recipeId, setRecipeId] = useState<string>("");

    const onModalOk = () => {
        setSubmitForm(true);
    };

    /** Cancel a modal. */
    const onModalCancel = () => {
        setShowModal(false);
        if (changeForm) setChangeForm(false);
    };

    return <></>;
    // <Modal
    //     title={!changeForm ? "Create Recipe" : "Add Ingredient To Recipe"}
    //     visible={showModal}
    //     okText={!changeForm ? "Create Recipe" : "Add Ingredient"}
    //     onOk={onModalOk} //TODO: Change this concept.
    //     onCancel={onModalCancel}
    //     width={"40%"}
    // >
    //     {changeForm === false ? (
    //         <CreateRecipe
    //             refetch={refetch}
    //             setRecipeId={setRecipeId}
    //             setChangeForm={setChangeForm}
    //             submitForm={submitForm}
    //             setSubmitForm={setSubmitForm}
    //         />
    //     ) : (
    //         <AddIngredient
    //             refetch={refetch}
    //             recipeId={recipeId}
    //             submitForm={submitForm}
    //             setSubmitForm={setSubmitForm}
    //         />
    //     )}
    // </Modal>
};
