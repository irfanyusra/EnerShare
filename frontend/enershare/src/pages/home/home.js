import React from 'react'

import { HomePageLayout, Title, Summary, Entry, LoginButton, SignUpButton, LargeTitle} from './home.styled'

const HomePage = () => {
  return (
    <HomePageLayout>
      <Title>EnerShare</Title>
      <Summary>
        <LargeTitle>A peer-to-peer energy marketplace</LargeTitle>
      </Summary>
      <Entry>
        <LoginButton>Login</LoginButton>
        <SignUpButton>Sign Up</SignUpButton>
      </Entry>
    </HomePageLayout>
  )
}

export default HomePage