import React from "react";
import { GlobalStyle } from "./components/GlobalLayout";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecipePage } from "./pages/RecipePage";

export const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route path="/recipe/:recipeId">
                            {(props) => {
                                return (
                                    <RecipePage
                                        recipeId={props.match?.params.recipeId}
                                    />
                                );
                            }}
                        </Route>
                        <Route path="/">
                            <DashboardPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Layout>
        </>
    );
};
