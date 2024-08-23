import axios from "axios";

export const LoginPost = async(data)=>{
    
    let res = await axios.post("http://localhost:3000/api/v1/login",data)
    return res
}

export const RegisterPost = async(data)=>{
    
    let res = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",data)
    return res
}