import Logger from './logger';
import expressLoader from './express';
import traceWordsResource from './traceWordsResource';

export default async ({ expressApp }) => {
  // 用語変換テーブルのキャッシュ
  traceWordsResource.cache;

  // expressの初期設定を行う
  await expressLoader({ app: expressApp });
};
