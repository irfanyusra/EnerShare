import React from "react"

import MarketplaceCard from "../../components/marketplaceCard/marketplaceCard"

import NavigationBar from "../../components/navigationBar/navigationBar"
import { 
  DashboardLayout, 
  DashboardColumn, 
  WelcomeText,
  EnergyDataContainer,
  RecentTransactionContainer,
  DashboardRowColumnSwitcher,
  DashboardRow,
  MarketPlaceContainer,
  DashboardContainerTitles,
  ContainerLists,
} from './dashboard.styled'

let postingList = [
  {
    id: 1,
    amount_energy: 30,
    price: 100,
    energy_type: "Solar",
    selling_user_id: 111
  },
  {
    id: 2,
    amount_energy: 40,
    price: 110,
    energy_type: "Solar",
    selling_user_id: 112
  },
]


// "credits": {
//   "balance": 30,
//   "comment": "Added Balance of  30 \n Reason: Sold 100kWh to user2",
//   "date": "1640817844783"
// },
const Dashboard = () => {
  return (
    <DashboardLayout>
      <NavigationBar></NavigationBar>
      <DashboardColumn>
        <WelcomeText>Welcome, User Name!</WelcomeText>
        <DashboardRowColumnSwitcher>
          <EnergyDataContainer>Energy Usage</EnergyDataContainer>
          <RecentTransactionContainer>Your Postings</RecentTransactionContainer>
        </DashboardRowColumnSwitcher>
        <DashboardRow>
          <MarketPlaceContainer> 
            <DashboardContainerTitles>
              Market Place
            </DashboardContainerTitles>    
            <ContainerLists>
              {postingList.map((posting, id) => (
                <MarketplaceCard key={id} posting={posting}>{console.log(posting)}</MarketplaceCard>
              ))}       
            </ContainerLists>
          </MarketPlaceContainer>
        </DashboardRow>
      </DashboardColumn>
      {/* TODO: add more layout components */}

    </DashboardLayout>
  )
} 

export default Dashboard

// {content.map((item, index) => (
//   <Card key={index} item={item} />
// ))}