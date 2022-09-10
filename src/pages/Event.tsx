import React, { FC, useEffect, useState } from "react";
import { Button, Layout, Modal, Row } from "antd";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";

const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setIsModalOpen(false);
    createEvent(event);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center" style={{ backgroundColor: "white" }}>
        <Button onClick={() => showModal()}>Add an event</Button>
      </Row>
      <Modal
        title="Add an event"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
