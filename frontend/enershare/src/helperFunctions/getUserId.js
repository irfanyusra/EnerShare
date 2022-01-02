import decode from 'jwt-decode'

export const getUserId = () => {
    const token = localStorage.getItem('token')
    if (token){
        const userId = decode(token).userId
        return userId
    }
    else{
        return null
    }
}