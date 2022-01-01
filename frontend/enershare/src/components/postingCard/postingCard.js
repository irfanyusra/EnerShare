import { AiFillDelete } from 'react-icons/ai'

import {
    Card,
    CardItem,
    DeleteButton
} from "./postingCard.styled"

const PostingCard = ({ item: { id, timestamp, amount_energy, price }, removePosting }) => {
    let dateNow = new Date(timestamp)
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
                <DeleteButton onClick={() => removePosting(id)}><AiFillDelete></AiFillDelete></DeleteButton>
            </CardItem>
        </Card>
    )
}

export default PostingCard