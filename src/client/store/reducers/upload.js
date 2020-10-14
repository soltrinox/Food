const UPLOAD_SUCCESS = "upload/UPLOAD_SUCCESS";

const initState = {
  authenticate: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        authenticate: true,
      };
    default:
      return state;
  }
}

export function uploadImage() {
  return {
    type: UPLOAD_SUCCESS,
  };
}
