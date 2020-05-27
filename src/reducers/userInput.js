const LOAD = 'LOAD'
const  userInputState ={
    name:'andrei',
    email:'kircheiandri@gmail.com',
    password :'qwerty'
}
const userInput = (state=userInputState,action) =>{
    switch (action.type) {
        case LOAD : {
            return {data: action.data}
        }
        default:
            return state

    }
}

export const loadUserInput = data =>({type: LOAD, data})
export default userInput