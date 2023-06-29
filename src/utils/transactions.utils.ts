import mainDBConnection from '@config/db';
import { Transaction } from 'sequelize';
/**
 * Wrapper with a database transaction
 */
export const executeTransaction = (callback: (t: Transaction) => PromiseLike<unknown>) => {
  return mainDBConnection.transaction(
    {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    },
    t => callback(t),
  );
};
