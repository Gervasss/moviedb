import { SIDE_PAGE } from '../actions/actions.type';

const INITIAL_STATE = {
  sidePage: '',
};

function sidePageReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SIDE_PAGE:
      return {
        ...state,
        sidePage: action.payload,
      };
    default:
      return state;
  }
}

export default sidePageReducer;
