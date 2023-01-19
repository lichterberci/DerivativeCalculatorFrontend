export function SetPreferences (keyValuePairs: { [key: string]: any }): void {

    if (typeof window === 'undefined') {
        console.warn("localStorage is undefined, cannot use preferences!");
        return;
    }

    for (let key in keyValuePairs) {
        localStorage.setItem(key, JSON.stringify(keyValuePairs[key]));
    }
}

export function GetPreferences (key: string): any | undefined {

    if (typeof window === 'undefined') {
        console.warn("localStorage is undefined, cannot use preferences!");
        return;
    }

    const data = localStorage.getItem(key);

    if (data === null) {
        console.error(`Key '${key}' is not set in localStorage!`);
        return undefined;
    }

    return JSON.parse(data);
}