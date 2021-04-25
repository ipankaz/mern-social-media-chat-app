import {userConstants,postConstants} from './constants'
import axios from '../Helpers/axios'

export const signup = (user)=>{
     console.log(user)
    return async (dispatch)=>{
        dispatch({
            type:userConstants.USER_REGISTER_REQUEST
        })
        const res = await axios.post('signup',{
           ...user
        })
        if(res.status===201){
            const {message}=res.data
            dispatch({
                type:userConstants.USER_REGISTER_SUCCESS,
                payload:{
                 message
                }
            })
        }else{
            if(res.status===400){
                dispatch({
                    type:userConstants.USER_REGISTER_FAILURE,
                    payload:{
                       error:res.data.error
                    }
                })
            }
        }


    }

}
export const getUserPosts = (userId) => {
    return async (dispatch) => {
      try {
        dispatch({ type: postConstants.GET_ALL_USER_POST_REQUEST });
        const res = await axios.get(`post/getuserposts?userId=${userId}`);
        if (res.status === 200) {
          const { posts } = res.data;
          console.log(posts);
          dispatch({
            type: postConstants.GET_ALL_USER_POST_SUCCESS,
            payload: { posts},
          });
        } else {
          dispatch({ type: postConstants.GET_ALL_USER_POST_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const getUserByFirstName = (firstname) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.GET_USER_BY_FIRSTNAME_REQUEST });
        const res = await axios.get(`search/firstname?firstname=${firstname}`);
        if (res.status === 200) {
          const { users } = res.data;
          console.log(users);
          dispatch({
            type: userConstants.GET_USER_BY_FIRSTNAME_SUCCESS,
            payload: { users},
          });
        } else {
          dispatch({ type: userConstants.GET_USER_BY_FIRSTNAME_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const getUserByUserName = (username) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.GET_USER_BY_USERNAME_REQUEST });
        const res = await axios.get(`search/username?username=${username}`);
        if (res.status === 200) {
          const { users} = res.data;
          dispatch({
            type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            payload: { users},
          });
        } else {
          dispatch({ type: userConstants.GET_USER_BY_USERNAME_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
