import { expect, test, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';

describe('LibreLinkClient', () => {
  let client: LibreLinkClient;

  beforeEach(() => {
    client = new LibreLinkClient();
  });

  test('should be created', () => {
    expect(client).toBeTruthy();
  });
});