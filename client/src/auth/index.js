import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    ERROR_MODAL: "ERROR_MODAL",
    CLOSE_MODAL: "CLOSE_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        hasError: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    hasError: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    hasError: null
                })
            }
            case AuthActionType.LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    hasError: null
                })
            }
            case AuthActionType.LOGGED_OUT: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    hasError: null
                })
            }
            case AuthActionType.ERROR_MODAL: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: payload.hasError
                })
            }
            case AuthActionType.CLOSE_MODAL: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    hasError: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
        const response = await api.registerUser(userData);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            store.loadIdNamePairs();
        }
    } catch (errorMsg) {
        authReducer({
            type: AuthActionType.ERROR_MODAL,
            payload: {              
                error: errorMsg.response.data.errorMessage
            }
        })
    }
}

    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGGED_OUT,
                payload: null
            })
            history.push("/");
        }

    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGGED_IN,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (errorMsg) {
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: errorMsg.response.data.errorMessage
                }
            })
        }
    }
    auth.closeModal = function() {
        authReducer({
            type: AuthActionType.CLOSE_MODAL,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };