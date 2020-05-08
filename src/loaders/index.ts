import Logger from './logger';
import expressLoader from './express';
import dbconnectionLoader from './dbconnection';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};
