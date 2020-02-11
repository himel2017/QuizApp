import {
    api_signin, api_registration
} from "../../../config.json";

import Axios from "axios";
import { navigate } from 'gatsby';


/**
 * register()
 *
 * Register User
 * @param string name
 * @param string email
 * @param string phone_no
 * @param string password
 * @param string confirm_password
 *
 * @return object return data if true else false and null data
 */

export async function register(name, phone_no, email, password, confirm_password) {
    let response = {};
    try {
        
        await Axios.post(`${api_registration}`, {
            name : name,
            email : email,
            phone_no : phone_no,
            password : password,
            confirm_password : confirm_password
        })
        .then(function(res) {
            response = res.data;
            console.log('Registration Response: ', response);
        })
        .catch(function(error) {
            console.log('Registration Error: ', error);
        });
    } catch (error) {}

    return response;
}

/**
 * login()
 *
 * Login User
 * @param string phone_no
 * @param string password
 *
 * @return object return data if true else false and null data
 */

export async function login(phone_no, password) {
    let response = {};
    try {
        
        await Axios.post(`${api_signin}`, {
            phone_no : phone_no,
            password : password
        })
        .then(function(res) {
            response = res.data;
            console.log('Login Response: ', response);

            if(response.status) {
                // Store this info in cache / local storage 
                window.localStorage.setItem('user', JSON.stringify(response.user));
            }
        })
        .catch(function(error) {
            console.log('Login Error: ', error);
        });
    } catch (error) {}

    return response;
}

export async function getLoginData() {
    // let userData = (await AsyncStorage.getItem("userData")) || "none";
    // let dataParse = JSON.parse(userData);
    // return dataParse.loginData;
}

/**
 * checkLoggedIn
 * 
 * @return bool true or false
 */
export async function checkLoggedIn() {
    let user = window.localStorage.getItem('user');
    let loggedInUserData = JSON.parse(user);
    console.log('logged', loggedInUserData);

    if (typeof loggedInUserData !== 'undefined' && loggedInUserData !== null) {
        if(loggedInUserData.api_token != null){
            return true;
        }
        return false;
    }
    return false;
}


export async function logout() {
    window.localStorage.removeItem('user');
    navigate('/');
}

export async function getApiToken() {
    let user = window.localStorage.getItem('user');
    let loggedInUserData = JSON.parse(user);

    return loggedInUserData.api_token;
}