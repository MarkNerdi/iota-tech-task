const prefix = "iota_tech_task_";

export function getLocalStorageItem(key, defaultValue) {
    if (defaultValue === undefined) {
        console.warn("No default value specified for key " + key);
    }
    return JSON.parse(localStorage.getItem(prefix + key)) ?? defaultValue;
}

export function setLocalStorageItem(key, value) {
    localStorage.setItem(prefix + key, JSON.stringify(value));
}

export function removeLocalStorageItems(...keys) {
    keys.forEach(key => localStorage.removeItem(prefix + key));
}

export const LocalStorageKey = {
    TOKEN: "TOKEN",
    LANGUAGE: "LANGUAGE",
    SECURITY_KEY: "SECURITY_KEY"
};
