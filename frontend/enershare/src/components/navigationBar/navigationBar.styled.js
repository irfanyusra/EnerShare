import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationBarLayout = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #41729F;
`

export const NavigationLinkContainer = styled.div`
    height: 100%;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: end;
`

export const Title = styled.div`
    font-size: 2rem;
    color: white;
`

export const NavigationLink = styled(Link)`
    font-size: 1.5rem;
    margin: 0 1em 0 1em;
    color: #B1D4E0;
    text-decoration: none;
`