import React from "react";
import styled, { css } from "styled-components";

export const Layout: React.FC = ({ children }) => {
    const headerHeight = "85px";
    const footerHeight = "50px";

    const MaxWidthCSS = css`
        max-width: 80rem;
        margin: auto;
    `;

    const Header = styled.header`
        height: ${headerHeight};
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 25px;
    `;

    const Main = styled.main`
        min-height: calc(100vh - ${headerHeight} - ${footerHeight});
        ${MaxWidthCSS}
    `;

    const Footer = styled.footer`
        height: ${footerHeight};
    `;

    const NavigationList = styled.ul`
        list-style: none;
        display: flex;
    `;

    const NavigationItem = styled.li`
        color: red;
        padding: 10px 25px;
    `;

    return (
        <>
            <Header>
                Header
                <NavigationList>
                    <NavigationItem>Home</NavigationItem>
                    <NavigationItem>Recipe</NavigationItem>
                    <NavigationItem>Ingredient</NavigationItem>
                </NavigationList>
            </Header>
            <Main>{children}</Main>
            <Footer>Footer</Footer>
        </>
    );
};
