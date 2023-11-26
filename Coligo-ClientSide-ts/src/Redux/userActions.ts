export const setUserData = (id: string, name: string) => ({
    type: 'SET_USER',
    payload: { id, name },
});