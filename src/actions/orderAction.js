import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";
import {ApiClient} from "../ApiClient"



// create order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST})

        const token = (localStorage.getItem("token"));
        const config = {headers: {"Content-Type": "application/json", "Authorization" : `Bearer ${token}`},}

        const {data} = await ApiClient.post(`/api/v1/order/new`, order, config);

        dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


// My order
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDER_REQUEST})

        const token = localStorage.getItem("token");
        const config = { headers: { "Authorization" : `Bearer ${token}` } }

        const {data} = await ApiClient.get(`/api/v1/orders/me`, config);

        dispatch({type: MY_ORDER_SUCCESS, payload: data.orders})
        
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})

        const token = localStorage.getItem("token");
        const config = { headers: { "Authorization" : `Bearer ${token}` } }

        const {data} = await ApiClient.get(`/api/v1/order/${id}`, config);

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order})
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}
