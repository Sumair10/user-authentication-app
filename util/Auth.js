import axios from "axios"

const API_KEY ='AIzaSyABGfywWurKV-ed5KwQRRQBG_oMneChEfk'


export const createUser =async (email , password) =>{
    console.log('first' , email, password)
    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABGfywWurKV-ed5KwQRRQBG_oMneChEfk',{
            email :email,
            password :password,
            returnSecureToken: true
        }
    )
}