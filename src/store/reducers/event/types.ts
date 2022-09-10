import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";

export interface EventState {
  guests: IUser[];
  events: IEvent[];
  selectedDate: {
    date?: string;
    createAllowed?: boolean;
    removeAllowed?: boolean;
    error?: string
  };
}

export enum EventActionEnum {
  SET_GUESTS = "SET_GUESTS",
  SET_EVENTS = "SET_EVENTS",
  SET_SELECTED_DATE = "SET_SELECTED_DATE",
}

export interface SetGuestsAction {
  type: EventActionEnum.SET_GUESTS;
  payload: IUser[];
}

export interface SetEventsAction {
  type: EventActionEnum.SET_EVENTS;
  payload: IEvent[];
}

export interface SetSelectedDateAction {
  type: EventActionEnum.SET_SELECTED_DATE;
  payload: EventState["selectedDate"];
}

export type EventAction =
  | SetGuestsAction
  | SetEventsAction
  | SetSelectedDateAction;
