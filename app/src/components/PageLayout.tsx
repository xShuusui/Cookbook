import React, { useState } from "react";
import { Redirect } from "react-router";
import { Layout, Menu } from "antd";
import styled from "styled-components";

/** The main layout of all pages. */
export const PageLayout: React.FC = ({ children }) => {
    const { Header, Content, Footer } = Layout;
    const [switchPage, setSwitchPage] = useState<boolean>(false);

    const Logo = styled.div`
        float: left;
        margin-right: 8rem;
        font-size: 24px;
        letter-spacing: 3px;
        text-decoration: underline;
    `;

    return (
        <>
            {!switchPage ? (
                <Redirect to={"/"} />
            ) : (
                <Redirect to={"/ingredient"} />
            )}
            <Header
                style={{
                    backgroundColor: "#e6e6e6",
                }}
            >
                <Logo>Cookbook</Logo>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["Dashboard"]}
                    style={{ backgroundColor: "#e6e6e6" }}
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
            <Content
                style={{
                    maxWidth: "80rem",
                    margin: "auto",
                }}
            >
                {children}
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    backgroundColor: "#e6e6e6",
                }}
            >
                © 2020 by Julian Segeth
            </Footer>
        </>
    );
};
