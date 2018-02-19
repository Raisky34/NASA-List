export function deepObjectClone(object) {
    return JSON.parse(JSON.stringify(object));
}
