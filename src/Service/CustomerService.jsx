import axios from "axios";

const getHeaderConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    };
  };
console.log(getHeaderConfig());

export const findBysearch = async (firstName) => {

    try {
        let res = await axios.post("http://localhost:3000/api/v1/getcustomerbycrnorname", firstName, getHeaderConfig())
        return res;
    } catch (error) {
        console.log(error)
        if (error.response
            .status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            alert('Session expired. Please log in again.');
        }
        throw error
    }
   
}