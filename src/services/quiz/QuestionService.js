import {
    api_get_questions, api_store_answer, api_daily_winners, api_monthly_winners, api_get_certificate, api_get_result
} from "../../../config.json";

import Axios from "axios";
import { getApiToken } from '../auth/AuthService';


// /**
//  * register()
//  *
//  * Register User
//  * @param string name
//  * @param string email
//  * @param string phone_no
//  * @param string password
//  * @param string confirm_password
//  *
//  * @return object return data if true else false and null data
//  */

// export async function register(name, phone_no, email, password, confirm_password) {
//     let response = {};
//     try {
        
//         await Axios.post(`${api_registration}`, {
//             name : name,
//             email : email,
//             phone_no : phone_no,
//             password : password,
//             confirm_password : confirm_password
//         })
//         .then(function(res) {
//             response = res.data;
//             console.log('Registration Response: ', response);
//         })
//         .catch(function(error) {
//             console.log('Registration Error: ', error);
//         });
//     } catch (error) {}

//     return response;
// }

// /**
//  * login()
//  *
//  * Login User
//  * @param string phone_no
//  * @param string password
//  *
//  * @return object return data if true else false and null data
//  */

// export async function login(phone_no, password) {
//     let response = {};
//     try {
        
//         await Axios.post(`${api_signin}`, {
//             phone_no : phone_no,
//             password : password
//         })
//         .then(function(res) {
//             response = res.data;
//             console.log('Login Response: ', response);

//             if(response.status) {
//                 // Store this info in cache / local storage 
//                 window.localStorage.setItem('user', JSON.stringify(response.user));
//             }
//         })
//         .catch(function(error) {
//             console.log('Login Error: ', error);
//         });
//     } catch (error) {}

//     return response;
// }

export async function getQuestionsData() {

    // For testing purpose only
    // let set_no = 60;

    // For original development
    let set_no = Math.floor(Math.random() * 10) + 1;
    
    let response = [];

    // search set questions
    try {
        await Axios.get(`${api_get_questions}`, {
            params: {
                set_no : set_no
            }
        })
        .then(function(res) {
            response = res.data.questions;
            console.log('Question Response: ', response);

        })
        .catch(function(error) {
            console.log('Question Error: ', error);
        });
    } catch (error) {}
    return response;
}


export async function storeAnswer(time_ms) {
    let response = {};

    let api_token = await getApiToken();

    let current_datetime = new Date();
    let today = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();

    try {
        
        await Axios.post(`${api_store_answer}`, {
            time : time_ms,
            api_token : api_token,
            date : today
        })
        .then(function(res) {
            response = res.data;
            console.log('Answer Submit Response: ', response);
        })
        .catch(function(error) {
            console.log('Answer Submit Error: ', error);
        });
    } catch (error) {}

    return response;
}

export async function getDailyWinners() {

    let response = [];

    let current_datetime = new Date();
    let today = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    
    // search set winners
    try {
        await Axios.get(`${api_daily_winners}`, {
            params: {
                date : today
            }
        })
        .then(function(res) {
            response = res.data.winners;
            console.log('Winner Response: ', response);

        })
        .catch(function(error) {
            console.log('Winner Error: ', error);
        });
    } catch (error) {}

    return response;
}

export async function getMonthlyWinners() {

    let response = [];
    
    // search set winners
    try {
        await Axios.get(`${api_monthly_winners}`, {
            params: {
                date : ''
            }
        })
        .then(function(res) {
            response = res.data.winners;
            console.log('Winner Response: ', response);

        })
        .catch(function(error) {
            console.log('Winner Error: ', error);
        });
    } catch (error) {}

    return response;
}

export async function getCertificate() {
    let response = {};

    let api_token = await getApiToken();

    let current_datetime = new Date();
    let today = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();

    try {
        await Axios.get(`${api_get_certificate}`, {
            params: {
                api_token : api_token,
                date : today
            }
        })
        .then(function(res) {
            response = res.data.questionResponse;
            console.log('Certificate Response: ', response);

        })
        .catch(function(error) {
            console.log('Certificate Error: ', error);
        });
    } catch (error) {}

    return response;
}

export async function getResult(slug) {
    
    let response = {};

    try {
        await Axios.get(`${api_get_result}`, {
            params: {
                slug : slug,
            }
        })
        .then(function(res) {
            response = res.data.result;
            console.log('Result Response: ', response);

        })
        .catch(function(error) {
            console.log('Result Error: ', error);
        });
    } catch (error) {}

    return response;
}