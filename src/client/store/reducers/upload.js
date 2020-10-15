import axios from "axios";
const UPLOAD = "upload/UPLOAD";
const UPLOAD_SUCCESS = "upload/UPLOAD_SUCCESS";
const UPLOAD_FAILURE = "upload/UPLOAD_FAILURE";

const initState = {
  uploaded: false,
  uploadFailed: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploaded: action.payload,
        uploadFailed: false,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        uploaded: false,
        uploadFailed: action.error,
      };
    default:
      return state;
  }
}

export const uploadImage = (base64) => {
  return (dispatch) => {
    return axios
      .post(
        "/api/getFoodItems",
        { data: base64 },
        { headers: { "Content-type": "application/json" } }
      )
      .then((response) => {
        dispatch({
          type: UPLOAD_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPLOAD_FAILURE,
          error: error,
        });
      });
  };
};
