import { ADD_DETAIL } from "../actions/action";

const initialstate = {
  resume: {},
  template: "",
};

const Reducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_DETAIL:
      {
        return {
          ...state,
          resume: action.payload.resume_detail,
          template: action.payload.template,
        };
      }

    default:
      return initialstate;
  }
};

export default Reducer;
