       
const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'CLEAR_NOTIFICATION':
            return initialState
        default:
            return state
    }
}



export const setNotification = (message, time) => {
    return async dispatch => {
        
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message }
        })
       
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, time)
    }
}



export default notificationReducer