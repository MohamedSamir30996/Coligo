const initialState = {
    name: null,
    id: null,
};
interface UserState {
    name: string | null;
    id: string | null;
}

interface SetUserAction {
    type: 'SET_USER';
    payload: {
        id: string;
        name: string;
    };
}

type UserActionTypes = SetUserAction;

const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
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
