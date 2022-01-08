import styled from 'styled-components'

export const DashboardLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  overflow-y: auto;
`

export const DashboardColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
`

export const WelcomeText = styled.div`
    height: 10vh;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: black;
    flex: 1;
`

export const DashboardRowColumnSwitcher = styled.div`
    width: 100%;
    flex: 10;
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    /* TODO: add media queries to handle the switch from flex-direction row to column */

    @media only screen and (max-width: 1400px) {
    flex-direction: column;
    padding-bottom: 1rem;
}
`

export const DashboardRow = styled.div`
    flex: 10;
`

export const DashboardContainers = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border: black;
    border-radius: 10px;
    max-height: 40vh;
    width: 100%;
    color: black;
`

export const EnergyDataContainer = styled(DashboardContainers)`
`

export const UserPostingContainer = styled(DashboardContainers)`
`

export const RecentTransactionContainer = styled(DashboardContainers)`
`

export const DashboardContainerTitles = styled.div`
    font-weight: 400;
`

export const ContainerLists = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid black;
    `

export const ContainerListContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 35vh;
`

export const CardHeaderRow = styled.div`
    background-color: lightgrey;
    color: 	hsl(120, 19%, 35%);
    display: grid;
    
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid black;
    grid-template-columns: 3fr 1fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardRow = styled.div`
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TransactionCardHeaderRow = styled.div`
    background-color: lightgrey;
    color: 	hsl(120, 19%, 35%);
    display: grid;
    
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid black;
    grid-template-columns: 3fr 2fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0.25em 0.5em 0.25em;
`

export const Table = styled.table`
`

export const TableBody = styled.tbody`
`

export const TableRow = styled.tr`
`

export const TableHeading = styled.th`
    font-weight: 400;
    background-color: lightgrey;
    color: #557C55;
`

export const GraphContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 45vw;

    @media only screen and (max-width: 1400px) {
        max-width: 70vw;
    }
`