export const isProd = process.env.NODE_ENV === "production";
export const serverPort = 5000;
export const serverMessage = `⚡️[server] => Server is running: \n - Home: http://localhost:${serverPort} \n - Graphql: http://localhost:${serverPort}/graphql`;
export const cookieName = "sessionid";
export const forgetPassword = "forget-password: ";
