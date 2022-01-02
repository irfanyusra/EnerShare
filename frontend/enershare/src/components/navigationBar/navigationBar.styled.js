import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const NavigationBarLayout = styled.nav`
    height: 100%;
    width: ${props => props.navigationBarOpen ? 'max(20vw, 20rem)' : '10em'}; // add min()
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    background-color: lightslategray;
    /* position: absolute; */
    //TODO: INSET
    /* z-index: 999; */
    /* border: 5px solid red; */
    border-radius: 0 5px 5px 0 ;

    @media (max-width: 35em){
        inset: 0 30% 0 0;
        background-color: royalblue;
    }
`

export const NavigationLinkContainer = styled.div`
    height: 100%;
    /* flex: 4; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: end; */
`

export const Title = styled.div`
    font-size: 2rem;
    color: white;
`

export const NavigationLink = styled(Link)`
    font-size: 1.5rem;
    margin: 0 1em 0 1em;
    color: black;
    text-decoration: none;

    &.active {
        color: orange;
    }
`

export const OpenNavigationButton = styled.button`

    /* @media (min-width: 700px){
        display: none;
    } */
`