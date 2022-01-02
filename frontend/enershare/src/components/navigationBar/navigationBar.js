import React, { useState } from "react"

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

import { NavigationBarLayout, Title, NavigationLinkContainer, NavigationLink, OpenNavigationButton } from './navigationBar.styled'

const NavigationBar = () => {
  const [navigationBarOpen, setNavigationBarOpen] = useState(true);
  return (
    <NavigationBarLayout navigationBarOpen={navigationBarOpen}>
      <Title>EnerShare</Title>
      <NavigationLinkContainer>
        <NavigationLink to="/dashboard">
          {navigationBarOpen ? <>HOME</> : <>H</>}
        </NavigationLink>
        <NavigationLink to="/marketplace">
          {navigationBarOpen ? <>MARKETPLACE</> : <>M</>}
        </NavigationLink>
        <NavigationLink to="/sell">
          {navigationBarOpen ? <>Sell</> : <>S</>}
        </NavigationLink>
        <NavigationLink to="/bill">
          {navigationBarOpen ? <>Bill</> : <>B</>}
        </NavigationLink>
        {/* TODO: MAKE LOGOUT A BUTTON NOT A LINK */}
        {/* <NavigationLink>
          LOGOUT
        </NavigationLink> */}
        <OpenNavigationButton onClick={() => {
          setNavigationBarOpen((curr) => !curr)
        }}>
          {navigationBarOpen ? <BsFillArrowLeftCircleFill/> : <BsFillArrowRightCircleFill/>}
        </OpenNavigationButton>
      </NavigationLinkContainer>
    </NavigationBarLayout>
  )
}

export default NavigationBar