
export const logout = () => {
    if (localStorage.getItem('token')) {
        window.localStorage.removeItem('token');
    }
}