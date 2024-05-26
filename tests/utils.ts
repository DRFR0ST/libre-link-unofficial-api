interface TypeMap {
    [key: string]: string | TypeMap; // Allow nested TypeMaps for objects
}

/**
 * @description Map object properties to types. Mainly used for snapshotting objects to check for changes.
 */
export const mapObjectPropertiesToTypes = (obj: Record<string, any>): TypeMap => {
    const typeMap: TypeMap = {};

    for (const key in obj) {
        const value = obj[key];
        const type = typeof value; 

        if (type === 'object') {
            if (Array.isArray(value)) { 
                typeMap[key] = 'array'; // Indicate an array
            } else if (value === null) {
                typeMap[key] = 'null'; // Handle null
            } else if (JSON.stringify(value).trim() === "{}") {
                typeMap[key] = 'object'; // Handle empty object
            } else {
                // Recurse for nested objects
                typeMap[key] = mapObjectPropertiesToTypes(value); 
            }
        } else {
            // Primitive type
            typeMap[key] = type;  
        }
    }

    return typeMap;
}

const MOCKED_REQUESTS = new Map<RegExp, any>();
// Not proud of this.
let ORIGINAL_FETCH: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

/**
 * @description Mock the fetch method.
 */
export const mockFetch = async (input: RequestInfo | URL | RegExp, data: any) => {
    // Create regex class from input.
    const regexInput = input instanceof RegExp ? input : new RegExp(wildcardToRegex(input.toString()));

    // Check if request is already mocked.
    const isRequestMocked = [...MOCKED_REQUESTS.keys()].find(key => key.toString() === regexInput.toString());

    if(!isRequestMocked) {
        // Use regex as key.
        MOCKED_REQUESTS.set(regexInput, data);
        console.log("Registered mocked request", input, regexInput);
    } else {
        console.log("Request already mocked", regexInput);
        return;
    }

    // Cache the original fetch method before mocking it. Might be useful in the future to clean the mock.
    if(!ORIGINAL_FETCH)
        ORIGINAL_FETCH = globalThis.fetch;

    // @ts-ignore
    globalThis.fetch = (_path: string) => {
        // When the request it fired, check if it matches a mocked request.
        const mockedRequest = [...MOCKED_REQUESTS.entries()].find(([key]) => 
            _path.match(key)?.[0]
        );

        if(!mockedRequest)
            return Promise.reject(new Error(`No mocked request found for path ${_path}.`));

        console.debug("Mocked fetch called:", _path, mockedRequest[0]);

        return Promise.resolve({
          status: 200,
          ok: true,
          // Return the mocked response.
          json: () => Promise.resolve({ data: mockedRequest[1] }),
        })
      };
}

/**
 * @description Clear the mock fetch.
 */
export const clearMockFetch = () => {
    MOCKED_REQUESTS.clear();
    globalThis.fetch = ORIGINAL_FETCH;
}

/**
 * @description Convert a wildcard string to a regular expression.
 * @param wildcardString - The wildcard string to convert. eg. '/api/*\/users'
 * @returns A regular expression that matches the wildcard string.
 */
function wildcardToRegex(wildcardString: string): RegExp {
    // Escape special regex characters
    const escapedString = wildcardString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  
    // Convert wildcard stars to regex patterns
    const regexPattern = escapedString.replace(/\\\*/g, "[\\s\\S]*");
  
    // Anchor pattern for strict path matching
    const anchoredPattern = `${regexPattern}$`; 
  
    return new RegExp(anchoredPattern);
  }
  