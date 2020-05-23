import React from "react";
import { GlobalStyle } from "./components/GlobalLayout";
import { Layout2 } from "./components/Layout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { RecipePage } from "./pages/RecipePage";
import { Menu, Layout } from "antd";

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
                        defaultSelectedKeys={["Dashboard"]}
                    >
                        <Menu.Item
                            onClick={() => {
                                window.location.href = "/";
                            }}
                            key="Dashboard"
                        >
                            Home
                        </Menu.Item>
                        <Menu.Item key="Ingredient">Ingredients</Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout2>
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
                            <Route path="/">
                                <DashboardPage />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </Layout2>
                <Layout.Footer>Test</Layout.Footer>
            </Layout>
        </>
    );
};
