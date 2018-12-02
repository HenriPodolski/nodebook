export function immutableSplice(arr, start, deleteCount, ...items) {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ];
}