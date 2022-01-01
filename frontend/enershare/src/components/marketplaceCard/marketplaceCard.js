import {
    Card,
    CardInfo,
    CardItem
} from "./marketplaceCard.styled"

const MarketplaceCard = ({ posting: { id, amount_energy, price, energy_type, timestamp, selling_user_id } }) => {
    return (
        <Card>
            <CardInfo>
                <CardItem>
                    Amount of energy: {amount_energy}kWh
                </CardItem>
                <CardItem>
                    Price: ${price}
                </CardItem>
                <CardItem>
                    Energy Type: {energy_type}
                </CardItem>
                <CardItem>
                    Selling User: {selling_user_id}
                </CardItem>
            </CardInfo>
        </Card>
    )
}

export default MarketplaceCard