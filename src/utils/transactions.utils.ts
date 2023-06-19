import mainDBConnection from '@config/db';
import { Transaction } from 'sequelize';

export const executeTransaction = (callback: (t: Transaction) => PromiseLike<unknown>) => {
  return mainDBConnection.transaction(
    {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    },
    t => callback(t),
  );
};

export const executeTransactionPromise = () => {
  return new Promise(resolve => {
    return mainDBConnection.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async t => {
        resolve(t);
      },
    );
  });
};
