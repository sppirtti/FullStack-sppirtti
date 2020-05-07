const reducer = (state = "", action) => {

    
    switch (action.type) {

        case 'NOTIFICATION':
            return action.data.message
        case 'CLEAR':
            return ""

        default:
            return state
    }
}

export const setNotification = (message) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: {message}
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, 5000)
    }
}

export default reducer