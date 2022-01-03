import { AiFillDelete } from 'react-icons/ai'

import {
    Card,
    CardItem,
    DeleteButton
} from "./postingCard.styled"

const PostingCard = ({ item: { _id, timestamp, amount_energy, price }, removePosting }) => {
    let dateNow = Date.parse(timestamp)
    return (
        <Card>
            <CardItem>
                {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateNow)}
            </CardItem>
            <CardItem>
                {amount_energy} kWh
            </CardItem>
            <CardItem>
                ${price}
            </CardItem>
            <CardItem>
                <DeleteButton onClick={() => removePosting(_id)}><AiFillDelete></AiFillDelete></DeleteButton>
            </CardItem>
        </Card>
    )
}

export default PostingCard