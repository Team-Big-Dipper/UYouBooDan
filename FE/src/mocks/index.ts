if (typeof window === 'undefined') {
  const { server } = require('./server');
  server.listen();
} else {
  const { worker } = require('./browser');
  worker.start();
}
export {};
// const initMockAPI = async (): Promise<void> => {
//   if (typeof window === 'undefined') {
//     const { server } = await import('./server');
//     server.listen();
//   } else {
//     const { worker } = await import('./browser');
//     worker.start();
//   }
// };

// export default initMockAPI;
