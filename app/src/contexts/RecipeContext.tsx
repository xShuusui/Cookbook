import React, { createContext } from "react";

import { Recipe } from "../types/Types";
import { useGetHook } from "../hooks/UseGetHook";

type RecipeContextProps = {
    Recipe: Recipe | null;
    refetchData: () => void;
};

export const RecipeContext = createContext<RecipeContextProps>({
    Recipe: null,
    refetchData: () => {},
});

export const RecipeContextProvider: React.FC<{ recipeId: string }> = ({
    recipeId,
    children,
}) => {
    const { data, fetchData } = useGetHook("/api/recipe/" + recipeId);

    return (
        <RecipeContext.Provider
            value={{
                Recipe: data as Recipe,
                refetchData: fetchData,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};
