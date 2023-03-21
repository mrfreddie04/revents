const authActionTypes = {
  SIGN_IN_USER: "SIGN_IN_USER",
  SIGN_OUT_USER: "SIGN_OUT_USER"
};

const { SIGN_IN_USER, SIGN_OUT_USER } = authActionTypes;

// const initialState = {
//   authenticated: false,
//   currentUser: null
// };


//for testing
const initialState = {
  authenticated: true,
  currentUser: {
    email: 'bob@test.com',
    photoURL: '/assets/user.png'    
  }
};


export const authActions = {
  signInUser: (payload) => ({ type: SIGN_IN_USER, payload: payload}),
  signOutUser: () => ({ type: SIGN_OUT_USER }),
}

export default function authReducer(state = initialState, {type, payload}) {
  //console.log(type,payload);
  switch(type) {
    case SIGN_IN_USER:
      return { ...state, authenticated: true, currentUser: {
        email: payload.email,
        photoURL: '/assets/user.png'
      } };  
    case SIGN_OUT_USER :
      return { ...state, ...initialState };  
    default:
      return state; 
  }
}