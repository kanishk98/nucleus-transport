export function renderIf(condition, content, progress) {
    if (condition) {
        return content;
    } else {
        return progress;
    }
}