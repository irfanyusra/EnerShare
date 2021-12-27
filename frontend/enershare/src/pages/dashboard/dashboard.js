import React from "react"

import NavigationBar from "../../components/navigationBar/navigationBar"
import { DashboardLayout, DashboardColumn, WelcomeText, EnergyDataContainer, RecentTransactionContainer, DashboardRowColumnSwitcher } from './dashboard.styled'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <NavigationBar></NavigationBar>
      <DashboardColumn>
        <WelcomeText>Welcome, User Name!</WelcomeText>
        <DashboardRowColumnSwitcher>
          <EnergyDataContainer>Energy Usage</EnergyDataContainer>
          <RecentTransactionContainer>Recent Transactions</RecentTransactionContainer>
        </DashboardRowColumnSwitcher>
      </DashboardColumn>

      {/* TODO: add more layout components */}
    </DashboardLayout>
  )
} 

export default Dashboard