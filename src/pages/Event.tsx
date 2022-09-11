import React, { FC, useEffect, useState } from "react";
import { Button, Layout, Modal, Row, Space, Tooltip } from "antd";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

export interface RemoveEvent {
  allow: boolean;
  date: string;
}

const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchGuests, createEvent, fetchEvents, removeEvents } = useActions();
  const {
    guests,
    events,
    selectedDate: { date, removeAllowed, createAllowed, error },
  } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []); //eslint-disable-line

  const fireRemoveEvents = () => {
    date && removeEvents(date);
  };

  const addNewEvent = (event: IEvent) => {
    setIsModalOpen(false);
    createEvent(event);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ backgroundColor: "white", padding: "8px" }}>
      <EventCalendar events={events} />
      <Row justify="center">
        <Space size="small">
          <Tooltip title={error && error}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => showModal()}
              disabled={!createAllowed}
            >
              Add an event
            </Button>
          </Tooltip>
          <Button
            icon={<MinusCircleOutlined />}
            disabled={!removeAllowed}
            htmlType="button"
            onClick={() => fireRemoveEvents()}
          >
            Delete events
          </Button>
        </Space>
      </Row>
      <Modal
        title="Add an event"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
