interface User {
  // socket id
  id: string;
  username: string;
  room: string;
}

// send msg,
export const sendMesage = (user: any, message: string) => {};

// message from server

export const listenMessage = () => {};
