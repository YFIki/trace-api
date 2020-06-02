import Sequelize from 'sequelize';
import httpContext from 'express-http-context';
import config from 'config';
const db = config.db;

const HTTP_CONTEXT_KEY_DB_CONNECTION = 'db-connection';

/**
 * company に対する接続設定を定義
 */
const dbconnection = new Sequelize.Sequelize(db.database, db.username, db.password, {
  // 接続先ホストを指定
  host: db.host,
  port: db.port,

  // 使用する DB 製品を指定
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

class DbConnection {
  sequelize;
  transaction;

  /**
   * コンストラクタ
   * Sequelize#constructor
   * https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
   */
  constructor () {
    this.sequelize = dbconnection;
    this.transaction = null;
  }

  /**
   * HTTPContextに格納されているインスタンスを返す
   * @returns {dbConnection} HTTPContextに格納されているインスタンス
   */
  static get httpContextInstance () {
    return httpContext.get(HTTP_CONTEXT_KEY_DB_CONNECTION);
  }

  /**
   * express middlewareとして登録。
   * DBに接続し、作成されたインスタンスをHTTPコンテキストに格納する
   */
  static middleware (req, res, next) {
    httpContext.set(HTTP_CONTEXT_KEY_DB_CONNECTION, new DbConnection());
    next();
  }

  /**
   * 指定されたクエリを発行
   * Sequelize#query
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql
   * @param {Object} [options = {}]
   */
  async query(sql, options:{ type?, transaction? } = {}) {
    if (this.transaction) {
      options.transaction = this.transaction;
    }
    const result = await this.sequelize.query(sql, options);
    return result;
  }

  /**
   * SELECT文を発行
   * Sequelize#query(sql, {type: Sequelize.QueryTypes.SELECT})
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql SELECT文
   * @param {Object} [options = {}] Sequelize#queryのoptions. options.type及びoptions.transactionの指定は不要。
   * @returns クエリ結果（Array）。結果0件の場合も長さ0のArrayを返します。
   */
  async select(sql, options:{ type?, transaction? } = {}) {
    options.type = Sequelize.QueryTypes.SELECT;
    const result = await this.query(sql, options);
    return result;
  }

  /**
   * INSERT文を発行
   * Sequelize#query(sql, {type: Sequelize.QueryTypes.INSERT})
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql INSERT文
   * @param {Object} [options = {}] Sequelize#queryのoptions.
   * @returns {Object} {result, meta} result,metaの内容はsqlとdialectに依存します。
   */
  async insert(sql, options = {}) {
    const [result, meta] = await this.query(sql, options);
    return {result, meta};
  }

  /**
   * UPDATE文を発行
   * Sequelize#query(sql, {type: Sequelize.QueryTypes.UPDATE})
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql UPDATE文
   * @param {Object} [options = {}] Sequelize#queryのoptions.
   * @returns {Object} {result, meta} result,metaの内容はsqlとdialectに依存します。
   */
  async update(sql, options = {}) {
    const [result, meta] = await this.query(sql, options);
    return {result, meta};
  }

  /**
   * DELETE文を発行
   * Sequelize#query(sql, {type: Sequelize.QueryTypes.DELETE})
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql DELETE文
   * @param {Object} [options = {}] Sequelize#queryのoptions.
   * @returns {Object} {result, meta} result,metaの内容はsqlとdialectに依存します。
   */
  async delete(sql, options = {}) {
    const [result, meta] = await this.query(sql, options);
    return {result, meta};
  }

  /**
   * UPSERT文を発行
   * Sequelize#query(sql, {type: Sequelize.QueryTypes.UPSERT})
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-query
   * @param {string} sql UPSERT文
   * @param {Object} [options = {}] Sequelize#queryのoptions.
   * @returns {Object} {result, meta} result,metaの内容はsqlとdialectに依存します。
   */
  async upsert(sql, options = {}) {
    const [result, meta] = await this.query(sql, options);
    return {result, meta};
  }

  /**
   * トランザクションの開始
   * Sequelize#transaction
   * https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-method-transaction
   * @param {Object} options
   */
  async beginTransaction(options) {
    const tx = await this.sequelize.transaction(options);
    this.transaction = tx;
  }

  /**
   * コミット
   * Sequelize#commit
   * https://sequelize.org/master/class/lib/transaction.js~Transaction.html#instance-method-commit
   */
  commit = async () => {
    await this.transaction.commit();
  }

  /**
   * ロールバック
   * Sequelize#rollback
   * https://sequelize.org/master/class/lib/transaction.js~Transaction.html#instance-method-rollback
   */
  rollback = async () => {
    await this.transaction.rollback();
  }

  /**
   * DB接続の終了
   * Seqluelize#close
   * https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-close
   */
  close = async () => {
    await this.sequelize.close();
  }
}

export default DbConnection;
