"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomError", {
    enumerable: true,
    get: function() {
        return CustomError;
    }
});
class CustomError extends Error {
    statusCode;
    message;
    logging;
    constructor(message, statusCode, logging){
        super(message);
        this.message = message;
        this.statusCode = statusCode ?? 500;
        this.logging = logging ?? false;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9DdXN0b21FcnJvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgc3RhdHVzQ29kZTogbnVtYmVyO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBsb2dnaW5nOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHN0YXR1c0NvZGU/OiBudW1iZXIsIGxvZ2dpbmc/OiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuXHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZSA/PyA1MDA7XHJcbiAgICB0aGlzLmxvZ2dpbmcgPSBsb2dnaW5nID8/IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiQ3VzdG9tRXJyb3IiLCJFcnJvciIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwibG9nZ2luZyIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7OytCQUFhQTs7O2VBQUFBOzs7QUFBTixNQUFNQSxvQkFBb0JDO0lBQy9CQyxXQUFtQjtJQUNuQkMsUUFBZ0I7SUFDaEJDLFFBQWlCO0lBRWpCQyxZQUFZRixPQUFlLEVBQUVELFVBQW1CLEVBQUVFLE9BQWlCLENBQUU7UUFDbkUsS0FBSyxDQUFDRDtRQUVOLElBQUksQ0FBQ0EsT0FBTyxHQUFHQTtRQUNmLElBQUksQ0FBQ0QsVUFBVSxHQUFHQSxjQUFjO1FBQ2hDLElBQUksQ0FBQ0UsT0FBTyxHQUFHQSxXQUFXO0lBQzVCO0FBQ0YifQ==