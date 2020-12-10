export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  if ("SET_USER") {
    return {
      ...state,
      user: action.user,
    };
  }
};

export default reducer;
