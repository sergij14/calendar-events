import { DATE_AFTER_ERROR_MESSAGE } from "../../../constants";
import { EventAction, EventActionEnum, EventState } from "./types";

const initialState: EventState = {
  events: [],
  guests: [],
  selectedDate: {
    date: "",
    createAllowed: false,
    removeAllowed: false,
    error: DATE_AFTER_ERROR_MESSAGE,
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
      return {
        ...state,
        selectedDate: { ...state.selectedDate, ...action.payload },
      };

    default:
      return state;
  }
}
