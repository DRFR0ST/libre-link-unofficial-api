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
