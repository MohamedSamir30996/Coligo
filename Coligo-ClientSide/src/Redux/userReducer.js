const initialState = {
    name: null,
    id: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                name: action.payload.name,
                id: action.payload.id,
            };
        default:
            return state;
    }
};

export default userReducer;
