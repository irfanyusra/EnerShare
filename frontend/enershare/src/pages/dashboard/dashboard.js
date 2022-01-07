import React, { useState, useEffect } from "react"
import axios from "axios"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts'
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
  CardRow,
  ContainerListContent,
  GraphContainer,
} from './dashboard.styled'

const Dashboard = () => {
  const [user, setUser] = useState({})
  const [userRemainingEnergy, setUserRemainingEnergy] = useState([])
  // const [userInOrderEnergy, setUserInOrderEnergy] = useState([])
  const [userPostings, setUserPostings] = useState([])
  const [userTransactionHistory, setUserTransactionHistory] = useState([])
  const [loading, setLoading] = useState(false);

  const userId = getUserId()

  useEffect( async () => {
      try {
        setLoading(true);

        let resp = await axios.get(`http://localhost:8080/api/user/${userId}`);
        console.log(resp);
        setUser(resp.data.response);
        // setUserInOrderEnergy(user.energy_sell_in_order);

        resp = await axios.get(`http://localhost:8080/api//userRemainingEnergy/${userId}`);
        resp = resp.data.response.sort((b, a) => ((a.start_time < b.start_time) ? 1 : ((a.start_time > b.start_time) ? -1 : 0)))
        resp.forEach((obj) => {
          let date = Date.parse(obj.start_time)
          obj.start_time = Intl.DateTimeFormat(['ban', 'id']).format(date)
        })
        setUserRemainingEnergy(resp)

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
  }, [userId])

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
                <EnergyDataContainer>
                  <DashboardContainerTitles>
                    Remaining Energy vs Time
                  </DashboardContainerTitles>
                  <GraphContainer>
                    <ResponsiveContainer width="100%">
                      <LineChart data={userRemainingEnergy} margin={{ top: 20, right: 20, left: 30, bottom: 30 }}>
                        <Line type="monotone" dataKey="remaining_energy" stroke="hsl(120, 19%, 35%)" dot={false} />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <XAxis dataKey="start_time" interval={24} tickMargin={10}>
                          <Label value="Date (D/M/Y)" position="bottom" offset={10} />
                        </XAxis>
                        <YAxis label={{ value: 'Remaining Energy (kWh)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} offset={10} tickMargin={10} />
                      </LineChart>
                    </ResponsiveContainer>
                  </GraphContainer>
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
                    <ContainerListContent>
                      {userPostings.length === 0 && (
                        <CardRow>You have no postings</CardRow>
                      )}
                      {userPostings.map((item, id) => (
                        <PostingCard key={id} item={item} removePosting={removePosting} />
                      ))}
                    </ContainerListContent>
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
                    <ContainerListContent>
                      {userTransactionHistory.length === 0 && (
                        <CardRow>You have no transactions</CardRow>
                      )}
                      {userTransactionHistory.map((item, id) => (
                        <TransactionCard key={id} item={item} />
                      ))}
                    </ContainerListContent>
                  </ContainerLists>
                </RecentTransactionContainer>
              </DashboardRow>
            </DashboardColumn>
      )}
    </DashboardLayout>
  )
}

export default Dashboard