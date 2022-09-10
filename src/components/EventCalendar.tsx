import React, { FC } from "react";
import { Badge, Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import moment, { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useActions } from "../hooks/useActions";

interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const { setSelectedDate } = useActions();

  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((ev) => ev.date === formatedDate);

    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <Badge status={ev.type} key={index} text={ev.description} />
        ))}
      </div>
    );
  };

  const onDateSelect = (date: Moment) => {
    const selDate = formatDate(date.toDate()).toString();

    const isDateAfter = date.isSameOrAfter(moment());
    const hasEvents = events.filter((ev) => ev.date === selDate).length > 0;

    setSelectedDate({
      date: selDate,
      createAllowed: isDateAfter,
    });

    if (hasEvents) {
      setSelectedDate({
        removeAllowed: hasEvents,
      });
    }
  };

  return <Calendar mode="month" onSelect={onDateSelect} dateCellRender={dateCellRender} />;
};
