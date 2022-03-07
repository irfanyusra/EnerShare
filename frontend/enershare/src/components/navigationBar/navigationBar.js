import React, { useState, useEffect } from "react"

import { logout } from "../../helperFunctions/logout"

import { BiMenu, BiMenuAltRight } from "react-icons/bi"
import { AiOutlineHome, AiTwotoneShop } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"
import { MdOutlineSell } from "react-icons/md"
import { getUserId } from "../../helperFunctions/getUserId"
import axios from 'axios'
import Loader from "../../components/loader/loader"
// import { RiBillLine } from "react-icons/ri"

import {
  NavigationBarLayout,
  NavigationLinkContainer,
  NavigationLink,
  OpenNavigationButton,
  EnerShareLogo,
  BlockchainLogo,
  LogoContainer,
  PageNavigationLinkContainer,
  LogoutNavigationLinkContainer,
} from './navigationBar.styled'

const NavigationBar = () => {
  const user_id = getUserId()
  const [navigationBarOpen, setNavigationBarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true)
    try {
      let resp = await axios.get(`http://localhost:8080/api/user/${user_id}`);
      setIsAdmin(resp.data.response.admin);

    } catch (err) {
      if (err && err.response) {
        console.log(err.response.data)
        alert("Error: Error getting user data and checking fo admin status")
      }
    }
    setLoading(false)
  }, [])

  return (
    loading ? (<Loader />) : (
      <NavigationBarLayout navigationbaropen={navigationBarOpen.toString()}>
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
            <NavigationLink to="/dashboard" navigationbaropen={navigationBarOpen.toString()}>
              <AiOutlineHome />
              {navigationBarOpen ? <>Home</> : <></>}
            </NavigationLink>
            <NavigationLink to="/marketplace" navigationbaropen={navigationBarOpen.toString()}>
              <AiTwotoneShop />
              {navigationBarOpen ? <>Marketplace</> : <></>}
            </NavigationLink>
            <NavigationLink to="/sell" navigationbaropen={navigationBarOpen.toString()}>
              <MdOutlineSell />
              {navigationBarOpen ? <>Sell</> : <></>}
            </NavigationLink>
            {/* <NavigationLink to="/bill" navigationbaropen={navigationBarOpen.toString()}>
            <RiBillLine />
            {navigationBarOpen ? <>Bill</> : <></>}
          </NavigationLink> */}
            {isAdmin == true ? (
              <NavigationLink to="/blockchain" navigationbaropen={navigationBarOpen.toString()}>
                <BlockchainLogo />
                {navigationBarOpen ? <>Blockchain</> : <></>}
              </NavigationLink>
            ) : (<></>)}
          </PageNavigationLinkContainer>
          <LogoutNavigationLinkContainer>
            <NavigationLink to="/login" onClick={logout} navigationbaropen={navigationBarOpen.toString()}>
              <FiLogOut />
              {navigationBarOpen ? <>Logout</> : <></>}
            </NavigationLink>
          </LogoutNavigationLinkContainer>
        </NavigationLinkContainer>
      </NavigationBarLayout>
    )
  )
}

export default NavigationBar