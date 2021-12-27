import React from "react"

import { NavigationBarLayout, Title, NavigationLinkContainer, NavigationLink } from './navigationBar.styled'

const NavigationBar = () => {
  return (
    <NavigationBarLayout>
      <Title>EnerShare</Title>
      <NavigationLinkContainer>
        <NavigationLink>
          Home
        </NavigationLink>
        <NavigationLink>
          Logout
        </NavigationLink>
      </NavigationLinkContainer>
    </NavigationBarLayout>
  )
} 

export default NavigationBar