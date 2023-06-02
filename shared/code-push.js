import { SyncOptions } from 'react-native-code-push';

export const UPDATE_CONFIG: SyncOptions = {
  updateDialog: {
    appendReleaseDescription: true,
  },
  rollbackRetryOptions: {
    delayInHours: 0.1,
    maxRetryAttempts: 7,
  },
};
