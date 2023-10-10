"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("express-async-errors");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
const _routes = require("./routes/routes");
const _GlobalErrorHandler = require("./middlewares/GlobalErrorHandler");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const port = process.env.PORT ?? 3000;
const ip = process.env.IP ?? "127.0.0.1";
const app = (0, _express.default)();
app.use((0, _morgan.default)("dev"));
app.use(_bodyparser.default.json({
    limit: "100mb"
}));
app.use(_bodyparser.default.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use(_routes.routes);
app.use(_GlobalErrorHandler.globalErrorHandler);
app.listen(Number(port), ip, ()=>{
    console.log(`Server is running on port ${port}`);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2V4cHJlc3MtYXN5bmMtZXJyb3JzJztcclxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcclxuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcy9yb3V0ZXMnO1xyXG5pbXBvcnQgeyBnbG9iYWxFcnJvckhhbmRsZXIgfSBmcm9tICcuL21pZGRsZXdhcmVzL0dsb2JhbEVycm9ySGFuZGxlcic7XHJcblxyXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCA/PyAzMDAwO1xyXG5jb25zdCBpcCA9IHByb2Nlc3MuZW52LklQID8/ICcxMjcuMC4wLjEnO1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogJzEwMG1iJyB9KSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgbGltaXQ6ICc1MG1iJywgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5hcHAudXNlKHJvdXRlcyk7XHJcbmFwcC51c2UoZ2xvYmFsRXJyb3JIYW5kbGVyKTtcclxuXHJcbmFwcC5saXN0ZW4oTnVtYmVyKHBvcnQpLCBpcCwgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGBTZXJ2ZXIgaXMgcnVubmluZyBvbiBwb3J0ICR7cG9ydH1gKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJwb3J0IiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJpcCIsIklQIiwiYXBwIiwiZXhwcmVzcyIsInVzZSIsIm1vcmdhbiIsImJvZHlQYXJzZXIiLCJqc29uIiwibGltaXQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJyb3V0ZXMiLCJnbG9iYWxFcnJvckhhbmRsZXIiLCJsaXN0ZW4iLCJOdW1iZXIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7O1FBQU87Z0VBQ2E7K0RBQ0Q7bUVBQ0k7d0JBQ0E7b0NBQ1k7Ozs7OztBQUVuQyxNQUFNQSxPQUFPQyxRQUFRQyxHQUFHLENBQUNDLElBQUksSUFBSTtBQUNqQyxNQUFNQyxLQUFLSCxRQUFRQyxHQUFHLENBQUNHLEVBQUUsSUFBSTtBQUU3QixNQUFNQyxNQUFNQyxJQUFBQSxnQkFBTztBQUVuQkQsSUFBSUUsR0FBRyxDQUFDQyxJQUFBQSxlQUFNLEVBQUM7QUFDZkgsSUFBSUUsR0FBRyxDQUFDRSxtQkFBVSxDQUFDQyxJQUFJLENBQUM7SUFBRUMsT0FBTztBQUFRO0FBQ3pDTixJQUFJRSxHQUFHLENBQUNFLG1CQUFVLENBQUNHLFVBQVUsQ0FBQztJQUFFRCxPQUFPO0lBQVFFLFVBQVU7QUFBSztBQUM5RFIsSUFBSUUsR0FBRyxDQUFDTyxjQUFNO0FBQ2RULElBQUlFLEdBQUcsQ0FBQ1Esc0NBQWtCO0FBRTFCVixJQUFJVyxNQUFNLENBQUNDLE9BQU9sQixPQUFPSSxJQUFJO0lBQzNCZSxRQUFRQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRXBCLEtBQUssQ0FBQztBQUNqRCJ9