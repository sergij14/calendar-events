import {
  EventActionEnum,
  EventState,
  SetEventsAction,
  SetGuestsAction,
  SetSelectedDateAction,
} from "./types";
import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";
import UserService from "../../../api/UserService";
import { AppDispatch } from "../..";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
      if (json.length) {
        dispatch(EventActionCreators.setSelectedDate({ removeAllowed: true }));
      }
    } catch (e) {
      console.log(e);
    }
  },
  setSelectedDate: (
    selDateProps: Partial<EventState["selectedDate"]>
  ): SetSelectedDateAction => ({
    type: EventActionEnum.SET_SELECTED_DATE,
    payload: { ...selDateProps },
  }),
  removeEvents: (date: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const filteredEvents = json.filter((event) => event.date !== date);
      dispatch(EventActionCreators.setEvents(filteredEvents));
      localStorage.setItem("events", JSON.stringify(filteredEvents));
      if (!filteredEvents.length) {
        dispatch(EventActionCreators.setSelectedDate({ removeAllowed: false }));
      }
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author === username || ev.guest === username
      );
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
