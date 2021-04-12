import axios from '../Helpers/axios'
import { postConstants } from './constants';

export const createPost = (form) => {
    return async dispatch => {
        try{
            dispatch({ type: postConstants.CREATE_POST_REQUEST });
            
            const res = await axios.post(`/post/create`, form);
            console.log(res)
            if(res.status === 200){
                dispatch({
                    type: postConstants.CREATE_POST_SUCCESS,
                    payload:{ category: res.data.product} 
                    
                });
                dispatch(getPosts())
            }else{
                dispatch({
                    type: postConstants.CREATE_POST_FAILURE,
                    payload: res.data.error
                });
            }
        }catch(error){
            console.log(error);
        }
        
    }
}

export const getPosts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: postConstants.GET_ALL_POST_REQUEST });
        const res = await axios.get(`post/getposts`);
        if (res.status === 200) {
          const { posts } = res.data;
          dispatch({
            type: postConstants.GET_ALL_POST_SUCCESS,
            payload: { posts},
          });
        } else {
          dispatch({ type: postConstants.GET_ALL_POST_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  export const updatePost = (updatedPost) => {
    return async dispatch => {
        dispatch({type:postConstants.UPDATE_POST_BY_ID_REQUEST})
        const res = await axios.post(`/post/update/?postId=${updatedPost._id}`, {updatePost:updatedPost});
        if(res.status === 201){
            dispatch({type:postConstants.UPDATE_POST_BY_ID_SUCCESS})
            dispatch(getPosts())
        }else{
            dispatch({
                type:postConstants.UPDATE_POST_BY_ID_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }
    }
}

//   export const deleteProductById = (payload) => {
//     return async (dispatch) => {
//       try {
//         const res = await axios.delete(`/product/deleteproductbyid`, {
//           data: { payload },
//         });
//         dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
//         if (res.status === 202) {
//           dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
//           dispatch(getProducts());
//         } else {
//           const { error } = res.data;
//           dispatch({
//             type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
//             payload: {
//               error,
//             },
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   };