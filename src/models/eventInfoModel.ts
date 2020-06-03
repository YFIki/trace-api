import dbconnection from '../submodules/loaders/dbconnection';

const SELECT_EVENT_INFO_ALL_DATA = `
SELECT
  event_id AS "eventId",
  comment AS "comment",
  dish_name AS "dishName",
  pic_url AS "picUrl",
  registed_date AS "registedDate",
  updated_date AS "updatedDate"
FROM event_info`;
const SELECT_EVENT_INFO_SEARCH_DATA = `
SELECT 
  event_id AS "eventId",
  comment AS "comment",
  dish_name AS "dishName",
  pic_url AS "picUrl",
  registed_date AS "registedDate",
  updated_date AS "updatedDate"
FROM event_info
WHERE event_id = :cond`;

export const getAllEventList = async () => {
  let sequelize;
  if (process.env.NODE_ENV === 'test') {
    sequelize = new dbconnection();
  } else {
    sequelize = dbconnection.httpContextInstance;
  }

  // event_infoテーブルのレコードを全て取得する
  const result = await sequelize.select(SELECT_EVENT_INFO_ALL_DATA);

  return result;
};

export const getEvent = async (eventId: string) => {
  let sequelize;
  if (process.env.NODE_ENV === 'test') {
    sequelize = new dbconnection();
  } else {
    sequelize = dbconnection.httpContextInstance;
  }

  const replacements = {
    cond: eventId,
  };

  // event_infoテーブルから、eventIdに一致するレコードを取得する
  const result = await sequelize.select(SELECT_EVENT_INFO_SEARCH_DATA, { replacements });
  // 一致するデータがない場合NULLが返却される
  return result[0];
};
