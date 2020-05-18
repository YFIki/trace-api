/**
 * modelテスト用
 */
import { getAllEventList, getEventList } from '../models/eventInfoModel';

export const getEvent = async () => {
  const result = await getAllEventList();
  return result;
};

export const getAllEvent = async (eventId: string) => {
  const result = await getEventList(eventId);
  return result;
};
