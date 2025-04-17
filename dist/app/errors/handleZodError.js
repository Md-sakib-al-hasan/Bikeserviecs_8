"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const requiredFields = err.issues
        .filter((issue) => issue.message === "Required")
        .map((issue) => issue.path.at(-1));
    const message = requiredFields.length === 0 ? "Validation error"
        : requiredFields.length === 1
            ? `${requiredFields[0]} is required`
            : `${requiredFields.slice(0, -1).join(", ")} and ${requiredFields.at(-1)} are required`;
    return {
        statusCode: 400,
        message,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    };
};
exports.default = handleZodError;
