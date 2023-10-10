"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "routes", {
    enumerable: true,
    get: function() {
        return routes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _home = require("./home");
const _user = require("./user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const routes = _express.default.Router();
routes.use(_home.homeRoutes);
routes.use("/user", _user.userRoutes);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvcm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBob21lUm91dGVzIH0gZnJvbSAnLi9ob21lJztcclxuaW1wb3J0IHsgdXNlclJvdXRlcyB9IGZyb20gJy4vdXNlcic7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlcy51c2UoaG9tZVJvdXRlcyk7XHJcbnJvdXRlcy51c2UoJy91c2VyJywgdXNlclJvdXRlcyk7XHJcbiJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJleHByZXNzIiwiUm91dGVyIiwidXNlIiwiaG9tZVJvdXRlcyIsInVzZXJSb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7K0JBSWFBOzs7ZUFBQUE7OztnRUFKTztzQkFDTztzQkFDQTs7Ozs7O0FBRXBCLE1BQU1BLFNBQVNDLGdCQUFPLENBQUNDLE1BQU07QUFFcENGLE9BQU9HLEdBQUcsQ0FBQ0MsZ0JBQVU7QUFDckJKLE9BQU9HLEdBQUcsQ0FBQyxTQUFTRSxnQkFBVSJ9