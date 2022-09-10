import moment from "moment";
import { formatDate } from "../../../utils/date";
import { EventAction, EventActionEnum, EventState } from "./types";

const today = new Date();

const initialState: EventState = {
  events: [],
  guests: [],
  selectedDate: {
    date: formatDate(today),
    createAllowed: moment(today).isSameOrAfter(moment()),
    removeAllowed: false,
  },
};

export default function EventReducer(
  state = initialState,
  action: EventAction
): EventState {
  switch (action.type) {
    case EventActionEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
    case EventActionEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionEnum.SET_SELECTED_DATE:
      console.log(state);

      return {
        ...state,
        selectedDate: { ...state.selectedDate, ...action.payload },
      };

    default:
      return state;
  }
}
