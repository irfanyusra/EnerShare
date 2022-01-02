import React, { useState, useEffect } from "react"
import axios from "axios"

import { getUserId } from "../../helperFunctions/getUserId"

import NavigationBar from "../../components/navigationBar/navigationBar"
import RecentTransactionTableRow from "../../components/recentTransactionTableRow/recentTransactionTableRow"
import PostingCard from "../../components/postingCard/postingCard"

import {
  DashboardLayout,
  DashboardColumn,
  WelcomeText,
  EnergyDataContainer,
  RecentTransactionContainer,
  DashboardRowColumnSwitcher,
  DashboardRow,
  UserPostingContainer,
  DashboardContainerTitles,
  ContainerLists,
  Table,
  TableBody,
  TableRow,
  TableHeading,
  CardHeaderRow,
  CardHeader,
} from './dashboard.styled'

// MOCK STUFF
// let mockUserPostings = [
//   {
//     id: 1,
//     timestamp: 1640817844783,
//     amount_energy: 30,
//     price: 100,
//   },
//   {
//     id: 2,
//     timestamp: 1640817844783,
//     amount_energy: 20,
//     price: 110,
//   },
// ]

// let mockRecentTransactions = [
//   {
//     id: 1,
//     date: 1640817844783,
//     reason: "Sold 10kWh",
//     change: 30,
//     balance: 30,
//   },
//   {
//     id: 1,
//     date: 1640817844783,
//     reason: "Bought 5kWh",
//     change: -15,
//     balance: 15,
//   },
// ]

const userId = getUserId()

const Dashboard = () => {
  const [userPostings, setUserPostings] = useState([])
  const [userTransactionHistory, setUserTransactionHistory] = useState([])

  // TODO: userActivePosting should probably be called right after a deletion but for now this works
  useEffect(() => {
    const response = axios.get(`http://localhost:8080/api/userActivePostings/${userId}`)
    .then((resp)=>{
      console.log('userActivePostings')
      console.log(resp)
      let sortedUserActivePostings = resp.data.response.sort((b, a) =>((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0))) 
      setUserPostings(resp.data.response)
    })
    .catch((err) => {
      if (err)
        console.log(err)
    })
  }, [])
  
  
  useEffect(() => {
    const response = axios.get(`http://localhost:8080/api/userCreditHistory/${userId}`)
    .then((resp)=>{
      console.log('CreditHistory')
      console.log(resp)
      let sortedUserCreditHistory = resp.data.response.sort((b, a) =>((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0))) 
      setUserTransactionHistory(sortedUserCreditHistory)
    })
    .catch((err) => {
      if (err)
        console.log(err)
    })
  }, [])

  const removePosting = id => {
    const response = axios.post(`http://localhost:8080/api/deletePosting/${id}`)
    .then((resp)=>{
      console.log(resp)
      let newUserPosting = userPostings.filter(posting => posting._id !== id)
      setUserPostings(newUserPosting)
    })
    .catch((err) => {
      if (err)
        console.log("ERROR DELETING POSTING: " + id)
        console.log(err)
    })
  }

  return (
    <DashboardLayout>
      <NavigationBar></NavigationBar>
      <DashboardColumn>
        <WelcomeText>Welcome, User Name!</WelcomeText>
        <DashboardRowColumnSwitcher>
          {/* TODO: Add energy vs time stuff */}
          <EnergyDataContainer>Energy vs Time</EnergyDataContainer> 
          <UserPostingContainer>
            <DashboardContainerTitles>
              Your Postings
            </DashboardContainerTitles>
            <ContainerLists>
              <CardHeaderRow>
                <CardHeader>Date</CardHeader>
                <CardHeader>Amount</CardHeader>
                <CardHeader>Price</CardHeader>
                <CardHeader>Delete</CardHeader>
              </CardHeaderRow>
              {userPostings.map((item, id) => (
                <PostingCard key={id} item={item} removePosting={removePosting} />
              ))}
            </ContainerLists>
          </UserPostingContainer>
        </DashboardRowColumnSwitcher>
        <DashboardRow>
          <RecentTransactionContainer>
            <DashboardContainerTitles>
              Recent Transactions
            </DashboardContainerTitles>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHeading>Date</TableHeading>
                  <TableHeading>Reason</TableHeading>
                  <TableHeading>Change</TableHeading>
                  <TableHeading>Balance</TableHeading>
                </TableRow>
                {userTransactionHistory.map((item, id) => (
                  <RecentTransactionTableRow key={id} item={item} />
                ))}
              </TableBody>
            </Table>
          </RecentTransactionContainer>
        </DashboardRow>
      </DashboardColumn>
    </DashboardLayout>
  )
}

export default Dashboard