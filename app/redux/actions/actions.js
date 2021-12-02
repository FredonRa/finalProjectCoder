import * as t from '../actionTypes';
import { Alert } from "react-native"; 
import { LoginUrl } from '../../constants/api';

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

const setLogoutState = (userDataLogout) => {
  return {
    type: t.SET_LOGOUT_STATE,
    payload: userDataLogout
  }
  
}

export const login = (loginInput) => {
    return (dispatch) => { 
      return fetch(LoginUrl, {
        method: 'POST',
        mode: "cors",
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          if (json.ok) { // response success checking logic could differ
            console.log(json)
            const { email, username, role, _id} = json.usuario;
           Alert.alert('Login Success', `Welcome ${username}!`);
            dispatch(setLoginState({ email: email, username: username, role: role, id: _id })); // our action is called here
          } else {
           Alert.alert('Ingreso fallido', json.err.message);
          }
        })
        .catch((err) => {
          Alert.alert('Login Failed', 'Some error occured, please retry');
          console.log(err);
        });
    };
  };

export const logout = (user) => {
    return setLogoutState(user); 
}