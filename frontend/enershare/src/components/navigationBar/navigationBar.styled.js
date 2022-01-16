import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'

import enerShareLogo from "../../images/enerShareLogo.png"

export const NavigationBarLayout = styled.nav`
    padding: 1.5rem;
    height: 100vh;
    width: ${props => props.navigationbaropen === 'true' ? '300px' : '5em'}; // add min()
    align-items: ${props => props.navigationbaropen === 'true' ? 'start' : 'center'}; // add min()
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #557C55;
    border-radius: 0 5px 5px 0 ;
    z-index: 999;
    flex: 0 0 auto;
    //TODO: INSET
    //TODO: Add transitions
    /* transition: ease 0.1s; */
`

export const NavigationLinkContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const PageNavigationLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    `

export const LogoutNavigationLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 1rem;
`

export const LogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const EnerShareLogo = styled.img.attrs({
    src: `${enerShareLogo}`
  })`
  width: auto;
  height: 2rem;
  `;

export const Title = styled.div`
    font-size: 2rem;
    color: white;
`

export const NavigationLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.25em;
    font-size: ${props => props.navigationbaropen === 'true' ? '1.25rem' : '2rem'};
    color: white;
    text-decoration: none;
    font-weight: 400;

    &.active {
        color: hsl(72, 100%, 80%);
    }
`

export const OpenNavigationButton = styled.div`
    color: white;
    z-index: 9999;
    font-size: 2rem;
`

export const StyledRouter = styled(Router)`
    display: flex;
`