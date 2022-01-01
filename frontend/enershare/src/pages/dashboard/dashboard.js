import React, { useState, useEffect } from "react"

import RecentTransactionTableRow from "../../components/recentTransactionTableRow/recentTransactionTableRow"
import PostingCard from "../../components/postingCard/postingCard"

import NavigationBar from "../../components/navigationBar/navigationBar"

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

let mockUserPostings = [
  {
    id: 1,
    timestamp: 1640817844783,
    amount_energy: 30,
    price: 100,
  },
  {
    id: 2,
    timestamp: 1640817844783,
    amount_energy: 20,
    price: 110,
  },
]

let recentTransactions = [
  {
    id: 1,
    date: 1640817844783,
    reason: "Sold 10kWh",
    change: 30,
    balance: 30,
  },
  {
    id: 1,
    date: 1640817844783,
    reason: "Bought 5kWh",
    change: -15,
    balance: 15,
  },
]

const Dashboard = () => {
  const [userPostings, setUserPostings] = useState([])

  useEffect(() => {
    setUserPostings(mockUserPostings) //TODO: REPLACE WITH AXIOS CALL TO BACKEND
  }, [mockUserPostings])

  const removePosting = id => {
    let newUserPosting = userPostings.filter(posting => posting.id !== id)
    setUserPostings(newUserPosting)
  }

  return (
    <DashboardLayout>
      <NavigationBar></NavigationBar>
      <DashboardColumn>
        <WelcomeText>Welcome, User Name!</WelcomeText>
        <DashboardRowColumnSwitcher>
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
                {recentTransactions.map((item, id) => (
                  <RecentTransactionTableRow key={id} item={item} />
                ))}
              </TableBody>
            </Table>
          </RecentTransactionContainer>
        </DashboardRow>
      </DashboardColumn>
      {/* TODO: add more layout components */}
    </DashboardLayout>
  )
}

export default Dashboard