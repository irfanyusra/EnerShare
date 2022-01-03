import React, { useState } from "react"

import {logout} from "../../helperFunctions/logout"

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"
import { BiMenu, BiMenuAltRight } from "react-icons/bi"
import { AiOutlineHome, AiTwotoneShop } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"
import { MdOutlineSell } from "react-icons/md"
import { RiBillLine } from "react-icons/ri"

import {
  NavigationBarLayout,
  NavigationLinkContainer,
  NavigationLink,
  OpenNavigationButton,
  EnerShareLogo,
  LogoContainer,
  PageNavigationLinkContainer,
  LogoutNavigationLinkContainer,
} from './navigationBar.styled'

const NavigationBar = () => {
  const [navigationBarOpen, setNavigationBarOpen] = useState(true);
  return (
    <NavigationBarLayout navigationBarOpen={navigationBarOpen}>
      <LogoContainer>
        {navigationBarOpen ? (<EnerShareLogo />) : (<></>)}
        <OpenNavigationButton onClick={() => {
          setNavigationBarOpen((curr) => !curr)
        }}>
          {navigationBarOpen ? <BiMenuAltRight /> : <BiMenu />}
        </OpenNavigationButton>
      </LogoContainer>
      <NavigationLinkContainer>
        <PageNavigationLinkContainer>
          <NavigationLink to="/dashboard" navigationBarOpen={navigationBarOpen}>
            <AiOutlineHome />
            {navigationBarOpen ? <>Home</> : <></>}
          </NavigationLink>
          <NavigationLink to="/marketplace" navigationBarOpen={navigationBarOpen}>
            <AiTwotoneShop />
            {navigationBarOpen ? <>Marketplace</> : <></>}
          </NavigationLink>
          <NavigationLink to="/sell" navigationBarOpen={navigationBarOpen}>
            <MdOutlineSell />
            {navigationBarOpen ? <>Sell</> : <></>}
          </NavigationLink>
          <NavigationLink to="/bill" navigationBarOpen={navigationBarOpen}>
            <RiBillLine />
            {navigationBarOpen ? <>Bill</> : <></>}
          </NavigationLink>
        </PageNavigationLinkContainer>
        <LogoutNavigationLinkContainer>
          <NavigationLink to="/login" onClick={logout} navigationBarOpen={navigationBarOpen}>
            <FiLogOut />
            {navigationBarOpen ? <>Logout</> : <></>}
          </NavigationLink>
        </LogoutNavigationLinkContainer>
      </NavigationLinkContainer>
    </NavigationBarLayout>
  )
}

export default NavigationBar