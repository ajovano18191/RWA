import { SocketIoConfig } from "ngx-socket-io";

export const baseURL: string = "http://localhost:3000/api";

export const socketIoConfig: SocketIoConfig = { url: 'http://localhost:3000', options: {
  extraHeaders: { Authorization: `Bearer ` }
} };