import dbconnection from '../loaders/dbconnection'

const SELECT_SAMPLE_DATA = 'SELECT * FROM "FASILITY_WORD_LIST" limit :limit';

export const getSampleData = async () => {
  const sequelize = dbconnection.httpContextInstance;
  const replacements = {
    limit: 1
  };

  // 取得データが1つでも配列で返ってくるため、必要であればresult[0]などと指定すること。
  const result = await sequelize.select(SELECT_SAMPLE_DATA, {replacements});

  return result[0];
}