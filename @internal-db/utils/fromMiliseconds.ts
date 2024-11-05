export function daysFromMil(miliseconds: number) {
    return miliseconds / 1000 / 60 / 60 / 24;
}
export function hoursFromMil(miliseconds: number) {
    return miliseconds / 1000 / 60 / 60;
}
export function minFromMil(miliseconds: number) {
    return miliseconds / 1000 / 60;
}
export function secFromMil(miliseconds: number) {
    return miliseconds / 1000;
}
