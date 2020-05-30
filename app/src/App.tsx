import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { GlobalStyle } from "./components/GlobalLayout";
import { SiteLayout } from "./components/Layout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { RecipePage } from "./pages/recipe/RecipePage";
import { IngredientPage } from "./pages/ingredient/IngredientPage";
import { RecipeContextProvider } from "./contexts/RecipeContext";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <SiteLayout>
                <Switch>
                    <Route path="/recipe/:recipeId">
                        {(props) => {
                            return (
                                <RecipeContextProvider
                                    recipeId={props.match?.params.recipeId}
                                >
                                    <RecipePage />
                                </RecipeContextProvider>
                            );
                        }}
                    </Route>
                    <Route path="/ingredient">
                        <IngredientPage />
                    </Route>
                    <Route path="/">
                        <DashboardPage />
                    </Route>
                </Switch>
            </SiteLayout>
        </BrowserRouter>
    );
};
