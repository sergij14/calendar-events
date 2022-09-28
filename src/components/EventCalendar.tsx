import React, { FC } from "react";
import { Alert, Badge, Calendar, Popover, Row, Space, Typography } from "antd";
import { IEvent } from "../models/IEvent";
import moment, { Moment } from "moment";
import { DATE_AFTER_ERROR_MESSAGE, EVENT_TYPE_COLORS } from "../constants";
import { RightCircleOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { formatDate } from "../utils";
import { useActions, useTypedSelector } from "../hooks";

interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const { setSelectedDate } = useActions();
  const {
    selectedDate: { date },
  } = useTypedSelector((state) => state.event);

  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((ev) => ev.date === formatedDate);

    return (
      <Space size="small" direction="vertical">
        {currentDayEvents.map((ev, index) => (
          <Popover
            key={index}
            title={
              <Space size="small">
                <RightCircleOutlined
                  style={{ color: EVENT_TYPE_COLORS[ev.type] }}
                />
                <Typography.Text strong>{ev.title}</Typography.Text>
              </Space>
            }
            content={
              <Space size="small" direction="vertical">
                <p>{ev.description}</p>
                <Space size="small">
                  <UsergroupAddOutlined />
                  {ev.guest.toString()}
                </Space>
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
    <>
      <Row justify="center">
        <Alert message={`Selected date: ${date}`} />
      </Row>

      <Calendar
        mode="month"
        onSelect={onDateSelect}
        dateCellRender={dateCellRender}
      />
    </>
  );
};
