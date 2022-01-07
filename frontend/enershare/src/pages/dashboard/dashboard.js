import React, { useState, useEffect } from "react"
import axios from "axios"

import { getUserId } from "../../helperFunctions/getUserId"

import PostingCard from "../../components/postingCard/postingCard"
import TransactionCard from "../../components/transactionCard/transactionCard"
import Loader from "../../components/loader/loader"

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
  CardHeaderRow,
  CardHeader,
  TransactionCardHeaderRow,
} from './dashboard.styled'

const Dashboard = () => {
  const [user, setUser] = useState({})
  const [userRemainingEnergy, setUserRemainingEnergy] = useState([])
  const [userInOrderEnergy, setUserInOrderEnergy] = useState([])
  const [userPostings, setUserPostings] = useState([])
  const [userTransactionHistory, setUserTransactionHistory] = useState([])
  const [loading, setLoading] = useState(false);

  const userId = getUserId()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        let resp = await axios.get(`http://localhost:8080/api/user/${userId}`);
        console.log(resp);
        setUser(resp.data.response);
        setUserInOrderEnergy(user.energy_sell_in_order);

        resp = await axios.get(`http://localhost:8080/api//userRemainingEnergy/${userId}`);
        setUserRemainingEnergy(resp.data.response)

        // TODO: userActivePosting should probably be called right after a deletion but for now this works
        resp = await axios.get(`http://localhost:8080/api/userActivePostings/${userId}`);
        let sortedUserActivePostings = resp.data.response.sort((b, a) => ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)));
        setUserPostings(sortedUserActivePostings);

        resp = await axios.get(`http://localhost:8080/api/userCreditHistory/${userId}`);
        let sortedUserCreditHistory = resp.data.response.sort((b, a) => ((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0)));
        setUserTransactionHistory(sortedUserCreditHistory);

        setLoading(false);
      } catch (err) {
        if (err) {
          console.log(err);
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  const removePosting = id => {
    setLoading(true);
    axios.post(`http://localhost:8080/api/deletePosting/${id}`)
      .then(() => {
        let newUserPosting = userPostings.filter(posting => posting._id !== id)
        setUserPostings(newUserPosting)
        setLoading(false);
      }).catch((err) => {
        if (err) {
          console.log("ERROR DELETING POSTING: " + id);
        }
        console.log(err)
        setLoading(false);
      })
  }
  return (
    <DashboardLayout>
      {loading ? (<Loader />) : (
        <DashboardColumn>
          <WelcomeText>Welcome, {user?.name}!</WelcomeText>
          <DashboardRowColumnSwitcher>
            {/* TODO: Add energy vs time stuff */}
            <EnergyDataContainer>
              <DashboardContainerTitles>
                Energy vs Time
              </DashboardContainerTitles>
            </EnergyDataContainer>
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
              <ContainerLists>
                <TransactionCardHeaderRow>
                  <CardHeader>Date</CardHeader>
                  <CardHeader>Reason</CardHeader>
                  <CardHeader>Change($)</CardHeader>
                  <CardHeader>Balance($)</CardHeader>
                </TransactionCardHeaderRow>
                {userTransactionHistory.map((item, id) => (
                  <TransactionCard key={id} item={item} />
                ))}
              </ContainerLists>
            </RecentTransactionContainer>
          </DashboardRow>
        </DashboardColumn>
      )}
    </DashboardLayout>
  )
}

export default Dashboard