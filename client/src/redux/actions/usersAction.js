import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/user/all_infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}


export function onSuccessBuy(data) {

    const request = axios.post("/successBuy", data)
        .then(response => response.data);

    return {
        type: "success",
        payload: request
    }
}
