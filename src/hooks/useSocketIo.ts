import { io } from 'socket.io-client';
import { getAppEnvConfig } from '@/utils/env';

export function useSocketIo() {
  const { VITE_GLOB_SOCKET_URL } = getAppEnvConfig();
  const socket = io(VITE_GLOB_SOCKET_URL);
  socket.io.on('error', (error) => {
    console.log(error.message, error.cause);
  });
  socket.io.on('reconnect_error', (error) => {
    console.log(error.message, error.cause);
  });
  return socket;
}
