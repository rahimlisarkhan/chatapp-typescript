
import { toast } from 'react-toastify'
import { baseURL } from '../../helper/baseURL'
import * as type from '../type'



//GETTER
export const getUser = () => (dispatch: any) => {

    baseURL.get('user/me/')
        .then((resp) => {
            console.log(resp);
            dispatch({ type: type.USER_INFO, payload: resp.data })
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}

export const getUsers = () => (dispatch: any) => {

    baseURL.get('user/list/')
        .then((resp) => {
            console.log(resp);
            dispatch({ type: type.USERS_INFO, payload: resp.data })
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}

export const getUsersSearch = (text: any) => (dispatch: any) => {

    baseURL.get(`user/list/?search=${text}`)
        .then((resp) => {
            dispatch({ type: type.USERS_INFO, payload: resp.data })
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}

export const getMessage = (id: number) => (dispatch: any) => {

    console.log(id);

    baseURL.get(`chat/get_messages/?recipient_id=${id}`)
        .then((resp) => {
            console.log(resp);
            dispatch({ type: type.USERS_MESSAGE, payload: resp.data.results })
            dispatch({ type: type.MESSAGE_ID_USER, payload: id })


        }
        )
        .catch((err) => toast.error(err.response.data.message))
}

export const postMessage = (data: object) => (dispatch: any) => {

    console.log(data);


    baseURL.post(`chat/send_message/`, data)
        .then((resp) => {
            dispatch({ type: type.USERS_MESSAGE__POST, payload: data })
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}

export const putMessage = (data: any) => (dispatch: any) => {

    console.log(data);
    

    baseURL.put(`chat/edit_message/${data.id}`, { title:data.title,body:data.body,recipient:data.recipient})
        .then((resp) => {
            // dispatch({ type: type.USERS_MESSAGE__POST, payload: data })
            toast.success('Success updated')
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}



export const deleteMessage = (id: number) => (dispatch: any) => {

    baseURL.delete(`chat/delete_message/${id}`)
        .then((resp) => {
            dispatch({ type: type.USERS_MESSAGE__DELETE, payload: id })
            toast.info('Success deleted')
        }
        )
        .catch((err) => toast.error(err.response.data.message))
}


