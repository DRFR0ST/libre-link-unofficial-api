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

const fetchReading = async () => {
  console.log("\n\Fetch the reading =>\n");

  return await client.fetchReading();
}

// This is an example of how to use the LibreLinkClient class.
const main = async () => {
  console.clear();

  await login();

  console.log(client.me);

  // const reading = await read();

  // console.log("Reading =>", reading);
  // console.log("Raw Reading =>", JSON.stringify(reading._raw, null, 2));
  // console.log("mg/dL", reading.mgDl);
  // console.log("mmol", reading.mmol);
  // console.log("timestamp", reading.timestamp);
  // console.log("trend", reading.trend);
  // console.log("isHigh", reading.isHigh);
  // console.log("isLow", reading.isLow);
  // console.log("trendType", reading.trendType);
  // console.log("options", reading._options);
  console.log(JSON.stringify(await fetchReading(), null, 2));
};

main();
