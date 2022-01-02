import {
    // Card,
    // CardItem,
    TableRow,
    TableData
} from "./recentTransactionTableRow.styled"

const RecentTransactionTableRow = ({ item: { id, date, reason, change, balance } }) => {
    let dateNow = new Date(parseInt(date))
    return (
        <TableRow>
            <TableData>
                {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateNow)}
            </TableData>
            <TableData>
                {reason}
            </TableData>
            <TableData>
                {change}
            </TableData>
            <TableData>
                {balance}
            </TableData>
        </TableRow>
        // <Card>
        //     <CardItem>
        //         {date}
        //     </CardItem>
        //     <CardItem>
        //         {reason}
        //     </CardItem>
        //     <CardItem>
        //         {change}
        //     </CardItem>
        //     <CardItem>
        //         {balance}
        //     </CardItem>
        // </Card>
    )
}

export default RecentTransactionTableRow