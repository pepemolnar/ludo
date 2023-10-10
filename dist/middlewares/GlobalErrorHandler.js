"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "globalErrorHandler", {
    enumerable: true,
    get: function() {
        return globalErrorHandler;
    }
});
const _CustomError = require("./CustomError");
const globalErrorHandler = (error, request, response, next)=>{
    let message = "Something went wrong!";
    let status = 500;
    if (error instanceof _CustomError.CustomError && error.logging) {
        message = error.message;
        status = error.statusCode;
    }
    console.error(error);
    response.status(status).send({
        message
    });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9HbG9iYWxFcnJvckhhbmRsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IEN1c3RvbUVycm9yIH0gZnJvbSAnLi9DdXN0b21FcnJvcic7XHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsRXJyb3JIYW5kbGVyID0gKFxyXG4gIGVycm9yOiBFcnJvcixcclxuICByZXF1ZXN0OiBSZXF1ZXN0LFxyXG4gIHJlc3BvbnNlOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKTogdm9pZCA9PiB7XHJcbiAgbGV0IG1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmchJztcclxuICBsZXQgc3RhdHVzID0gNTAwO1xyXG5cclxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDdXN0b21FcnJvciAmJiBlcnJvci5sb2dnaW5nKSB7XHJcbiAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgIHN0YXR1cyA9IGVycm9yLnN0YXR1c0NvZGU7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICByZXNwb25zZS5zdGF0dXMoc3RhdHVzKS5zZW5kKHsgbWVzc2FnZSB9KTtcclxufTtcclxuIl0sIm5hbWVzIjpbImdsb2JhbEVycm9ySGFuZGxlciIsImVycm9yIiwicmVxdWVzdCIsInJlc3BvbnNlIiwibmV4dCIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJDdXN0b21FcnJvciIsImxvZ2dpbmciLCJzdGF0dXNDb2RlIiwiY29uc29sZSIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7K0JBR2FBOzs7ZUFBQUE7Ozs2QkFGZTtBQUVyQixNQUFNQSxxQkFBcUIsQ0FDaENDLE9BQ0FDLFNBQ0FDLFVBQ0FDO0lBRUEsSUFBSUMsVUFBVTtJQUNkLElBQUlDLFNBQVM7SUFFYixJQUFJTCxpQkFBaUJNLHdCQUFXLElBQUlOLE1BQU1PLE9BQU8sRUFBRTtRQUNqREgsVUFBVUosTUFBTUksT0FBTztRQUN2QkMsU0FBU0wsTUFBTVEsVUFBVTtJQUMzQjtJQUVBQyxRQUFRVCxLQUFLLENBQUNBO0lBQ2RFLFNBQVNHLE1BQU0sQ0FBQ0EsUUFBUUssSUFBSSxDQUFDO1FBQUVOO0lBQVE7QUFDekMifQ==