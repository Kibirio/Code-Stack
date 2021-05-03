import { useState } from 'react';
import { AUTH } from '../constants/actionTypes';
import * as api  from '../api/index.js';
 

export const register = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(formData);
        console.log(data)
        
        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.log(error, 'Could not register user');
        
    }
};

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(formData);
        console.log(data)

        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.log(error.message, 'Could not sign in user');
    }
}