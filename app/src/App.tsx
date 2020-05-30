import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { GlobalStyle } from "./components/GlobalLayout";
import { PageLayout } from "./components/PageLayout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { RecipePage } from "./pages/recipe/RecipePage";
import { IngredientPage } from "./pages/ingredient/IngredientPage";
import { RecipeContextProvider } from "./contexts/RecipeContext";

/** The appliaction that contains the style and the routes. */
export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <PageLayout>
                <Switch>
                    <Route exact path="/recipe/:recipeId">
                        {(props) => (
                            <RecipeContextProvider
                                recipeId={props.match?.params.recipeId}
                            >
                                <RecipePage />
                            </RecipeContextProvider>
                        )}
                    </Route>
                    <Route exact path="/ingredient">
                        <IngredientPage />
                    </Route>
                    <Route exact path="/">
                        <DashboardPage />
                    </Route>
                </Switch>
            </PageLayout>
        </BrowserRouter>
    );
};
