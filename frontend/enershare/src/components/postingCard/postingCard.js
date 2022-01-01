import { AiFillDelete } from 'react-icons/ai'

import {
    Card,
    CardItem,
    DeleteButton
} from "./postingCard.styled"

const PostingCard = ({ item: { id, timestamp, amount_energy, price }, removePosting }) => {
    return (
        <Card>
            <CardItem>
                {timestamp}
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