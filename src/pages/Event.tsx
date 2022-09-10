import React, { FC, useEffect, useState } from "react";
import { Button, Layout, Modal, Row } from "antd";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";

export interface RemoveEvent {
  allow: boolean;
  date: string;
}

const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    fetchGuests,
    createEvent,
    fetchEvents,
    removeEvents,
  } = useActions();
  const {
    guests,
    events,
    selectedDate: { date, removeAllowed, createAllowed },
  } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

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
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center" style={{ backgroundColor: "white" }}>
        <Button onClick={() => showModal()} disabled={!createAllowed}>
          Add an event
        </Button>
        <Button
          disabled={!removeAllowed}
          htmlType="button"
          onClick={() => fireRemoveEvents()}
        >
          Delete events
        </Button>
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
