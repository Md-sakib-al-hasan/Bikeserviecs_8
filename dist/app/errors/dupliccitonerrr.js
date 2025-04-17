"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueFieldsError = getUniqueFieldsError;
function getUniqueFieldsError(errorMessage) {
    const fieldNames = [];
    const regex = /Unique constraint failed on the fields: \(`(.*?)`\)/;
    const match = errorMessage.match(regex);
    console.log('match', match);
    if (match && match[0]) {
        fieldNames.push(...match[0].split(',').map((field) => field.trim()));
    }
    return fieldNames;
}
