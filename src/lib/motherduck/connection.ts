import { MDConnection } from '@motherduck/wasm-client';
import { getMotherDuckConfig } from './config';

let connection: ReturnType<typeof MDConnection.create> | null = null;

// Initializes the connection to MotherDuck immidiately
// Useful for performing connection checks

export const getConnection = async () => {
  const config = getMotherDuckConfig();

  if (!config.token) {
    throw new Error('MotherDuck token not provided');
  }

  if (!connection) {
    connection = MDConnection.create({
      mdToken: config.token,
    });
    await connection.isInitialized();
  }
  return connection;
};

export const closeConnection = async () => {
  if (connection) {
    await connection.close();
    connection = null;
  }
};
