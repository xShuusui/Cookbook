import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Layout, Menu } from "antd";
import { Redirect } from "react-router";

export const SiteLayout: React.FC = ({ children }) => {
    const { Header, Content, Footer } = Layout;
    const [switchPage, setSwitchPage] = useState<boolean>(false);

    const headerHeight = "85px";
    const footerHeight = "50px";

    const MaxWidthCSS = css`
        max-width: 80rem;
        margin: auto;
    `;

    const Main = styled.main`
        min-height: calc(100vh - ${headerHeight} - ${footerHeight});
        ${MaxWidthCSS}
    `;

    return (
        <>
            {!switchPage ? (
                <Redirect to={"/"} />
            ) : (
                <Redirect to={"/ingredient"} />
            )}
            <Header style={{ backgroundColor: "white" }}>
                <div style={{ float: "left", marginRight: "12rem" }}>
                    Cookbook
                </div>
                <Menu
                    mode="horizontal"
                    theme={"light"}
                    defaultSelectedKeys={["Dashboard"]}
                >
                    <Menu.Item
                        onClick={() => setSwitchPage(false)}
                        key="Dashboard"
                    >
                        Home
                    </Menu.Item>

                    <Menu.Item
                        onClick={() => setSwitchPage(true)}
                        key="Ingredients"
                    >
                        Ingredients
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Main>{children}</Main>
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    backgroundColor: "lightgrey",
                }}
            >
                © 2020 by Julian Segeth
            </Footer>
        </>
    );
};

{
    /* export const CustomLayout: React.FC = ({ children }) => {
 

    return <Main>{children}</Main>;
}; */
}
