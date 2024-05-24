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


/**
 * @description Mock the fetch method.
 * TODO: Extend to support url matching etc.
 */
export const mockFetch = async (data: any) => {
    // @ts-ignore
    globalThis.fetch = () => {
        console.debug("Mocked fetch called:", data);
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data}),
        })
      };
}

/**
 * @description Clear the mock fetch.
 * TODO: Look for a better solution.
 */
export const clearMockFetch = () => {
    // @ts-ignore
    globalThis.fetch = undefined;
}