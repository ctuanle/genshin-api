import { Injectable } from '@nestjs/common';
import { Pool, PoolClient, QueryResult } from 'pg';

@Injectable()
export class DBService {
  public static counter = 0;
  private pool: Pool;

  constructor() {
    DBService.counter++;
    this.pool = new Pool({
      connectionString: 'postgres://genshin_api:password@localhost/genshin_api',
      statement_timeout: 5000,
      query_timeout: 5000,
    });

    console.log('yahoo', DBService.counter);
  }

  async onModuleInit() {
    await this.pool.connect();
    console.log('connected');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('destroyed');
  }

  async query<T = any>(
    tx: PoolClient | null,
    query: string,
    values?: any[],
  ): Promise<QueryResult<T>> {
    if (tx) {
      return tx.query<T>(query, values);
    }

    return this.pool.query<T>(query, values);
  }

  async transaction<T>(fn: (tx: PoolClient) => Promise<T>): Promise<T> {
    const tx = await this.pool.connect();
    let result: Awaited<ReturnType<typeof fn>>;
    try {
      await tx.query('BEGIN');
      result = await fn(tx);
      await tx.query('COMMIT');
    } catch (error) {
      await tx.query('ROLLBACK');
      throw error;
    } finally {
      tx.release();
    }
    return result;
  }
}
