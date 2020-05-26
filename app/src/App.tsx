import React from "react";
import { GlobalStyle } from "./components/GlobalLayout";
import { Layout2 } from "./components/Layout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { RecipePage } from "./pages/recipe/RecipePage";
import { Menu, Layout } from "antd";
import { IngredientPage } from "./pages/ingredient/IngredientPage";

export const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Layout>
                <Layout.Header style={{ backgroundColor: "white" }}>
                    <div style={{ float: "left", marginRight: "12rem" }}>
                        Cookbook
                    </div>
                    <Menu
                        mode="horizontal"
                        theme={"light"}
                        defaultSelectedKeys={["Dashboard", "Ingredient"]}
                    >
                        <Menu.Item
                            onClick={() => {
                                window.location.href = "/";
                            }}
                            key="Dashboard"
                        >
                            Home
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                window.location.href = "/ingredient";
                            }}
                            key="Ingredient"
                        >
                            Ingredients
                        </Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout2>
                    <Layout.Content style={{ width: "100%" }}>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/recipe/:recipeId">
                                    {(props) => {
                                        return (
                                            <RecipePage
                                                recipeId={
                                                    props.match?.params.recipeId
                                                }
                                            />
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
                        </BrowserRouter>
                    </Layout.Content>
                </Layout2>
                <Layout.Footer>Test</Layout.Footer>
            </Layout>
        </>
    );
};
