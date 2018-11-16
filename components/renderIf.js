export function renderIf(condition, content, alternateContent) {
    if (condition) {
        return content;
    } else {
        return alternateContent;
    }
}