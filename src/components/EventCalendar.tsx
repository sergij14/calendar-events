import React, { FC } from "react";
import { Badge, Calendar, Popover, Space, Typography } from "antd";
import { IEvent } from "../models/IEvent";
import moment, { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useActions } from "../hooks/useActions";
import { DATE_AFTER_ERROR_MESSAGE } from "../constants";

interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const { setSelectedDate } = useActions();

  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((ev) => ev.date === formatedDate);

    return (
      <Space size="small" direction="vertical">
        {currentDayEvents.map((ev, index) => (
          <Popover
            style={{ display: "block" }}
            key={index}
            title={<Typography.Text strong>{ev.title}</Typography.Text>}
            content={
              <Space size="small" direction="vertical">
                <p>{ev.description}</p>
                <p> <Typography.Text strong>Guests:</Typography.Text> {ev.guest.toString()}</p>
              </Space>
            }
          >
            <Badge status={ev.type} text={ev.description} />
          </Popover>
        ))}
      </Space>
    );
  };

  const onDateSelect = (date: Moment) => {
    const selDate = formatDate(date.toDate()).toString();

    const isDateAfter = date.isAfter(moment());
    const hasEvents = events.filter((ev) => ev.date === selDate).length > 0;

    setSelectedDate({
      date: selDate,
      createAllowed: isDateAfter,
      error: isDateAfter ? "" : DATE_AFTER_ERROR_MESSAGE,
      removeAllowed: hasEvents,
    });
  };

  return (
    <Calendar
      mode="month"
      onSelect={onDateSelect}
      dateCellRender={dateCellRender}
    />
  );
};
