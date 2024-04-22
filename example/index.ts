import { LibreLinkClient } from "../src";

// Create a new LibreLinkClient instance.
const client = new LibreLinkClient();

const login = async () => {
  console.log("\n\nLog into the account =>\n");

  return await client.login();
};

const read = async () => {
  console.log("\n\nRead the data =>\n");

  return await client.read();
}

// This is an example of how to use the LibreLinkClient class.
const main = async () => {
  console.clear();

  await login();

  console.log(client.me);
  console.log(await read());
};

main();
