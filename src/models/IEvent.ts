import { BadgeProps } from "antd";

export interface IEvent {
  author: string;
  guest: string;
  date: string;
  description: string;
  type: BadgeProps['status']
}
