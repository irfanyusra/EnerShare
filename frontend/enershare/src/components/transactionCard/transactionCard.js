import {
    Card,
    CardItem,
} from "./transactionCard.styled"

const TransactionCard = ({ item: { _id, date, reason, change, balance }, removePosting }) => {
    let dateNow = new Date(parseInt(date))
    return (
        <Card>
            <CardItem>
                {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateNow)}
            </CardItem>
            <CardItem>
                {reason}
            </CardItem>
            <CardItem>
                ${change}
            </CardItem>
            <CardItem>
                {balance}
            </CardItem>
        </Card>
    )
}

export default TransactionCard