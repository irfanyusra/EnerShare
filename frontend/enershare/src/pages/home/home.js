import React from 'react'

import { HomePageLayout, Title, Summary, Entry, LoginButton, SignUpButton, H1, StyledLink} from './home.styled'

const HomePage = () => {
  return (
    <HomePageLayout>
      <Title>EnerShare</Title>
      <Summary>
        <H1>A peer-to-peer energy marketplace</H1>
      </Summary>
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