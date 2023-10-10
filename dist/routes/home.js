"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "homeRoutes", {
    enumerable: true,
    get: function() {
        return homeRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const homeRoutes = _express.default.Router();
homeRoutes.get("/", (req, res)=>{
    res.status(200).json({
        asd: "asdf"
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaG9tZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuXHJcbmV4cG9ydCBjb25zdCBob21lUm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbmhvbWVSb3V0ZXMuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBhc2Q6ICdhc2RmJyB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJob21lUm91dGVzIiwiZXhwcmVzcyIsIlJvdXRlciIsImdldCIsInJlcSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJhc2QiXSwibWFwcGluZ3MiOiI7Ozs7K0JBRWFBOzs7ZUFBQUE7OztnRUFGTzs7Ozs7O0FBRWIsTUFBTUEsYUFBYUMsZ0JBQU8sQ0FBQ0MsTUFBTTtBQUV4Q0YsV0FBV0csR0FBRyxDQUFDLEtBQUssQ0FBQ0MsS0FBS0M7SUFDeEJBLElBQUlDLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUMsS0FBSztJQUFPO0FBQ3JDIn0=