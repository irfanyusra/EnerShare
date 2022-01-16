import React from 'react'

import {
  HomePageLayout,
  Entry,
  LoginButton,
  SignUpButton,
  SubTitle,
  StyledLink,
  EnerShareLogo,
  LogoContainer
} from './home.styled'

const HomePage = () => {
  return (
    <HomePageLayout>
      <LogoContainer>
        <EnerShareLogo />
      </LogoContainer>
      <SubTitle>A peer-to-peer energy marketplace</SubTitle>
      <Entry>
        <LoginButton>
          <StyledLink to='/login'>Login</StyledLink>
        </LoginButton>
        <SignUpButton>
          <StyledLink to='/signup'>Sign Up</StyledLink>
        </SignUpButton>
      </Entry>
    </HomePageLayout>
  )
}

export default HomePage