/* eslint-disable @typescript-eslint/no-misused-promises */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userRoutes", {
    enumerable: true,
    get: function() {
        return userRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _userController = require("../controllers/userController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const userRoutes = _express.default.Router();
userRoutes.get("/:id", _userController.getUserById);
userRoutes.post("/new", _userController.addUser);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWlzdXNlZC1wcm9taXNlcyAqL1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgYWRkVXNlciwgZ2V0VXNlckJ5SWQgfSBmcm9tICcuLi9jb250cm9sbGVycy91c2VyQ29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlclJvdXRlcyA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG51c2VyUm91dGVzLmdldCgnLzppZCcsIGdldFVzZXJCeUlkKTtcclxuXHJcbnVzZXJSb3V0ZXMucG9zdCgnL25ldycsIGFkZFVzZXIpO1xyXG4iXSwibmFtZXMiOlsidXNlclJvdXRlcyIsImV4cHJlc3MiLCJSb3V0ZXIiLCJnZXQiLCJnZXRVc2VyQnlJZCIsInBvc3QiLCJhZGRVc2VyIl0sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7Ozs7K0JBSTVDQTs7O2VBQUFBOzs7Z0VBSE87Z0NBQ2lCOzs7Ozs7QUFFOUIsTUFBTUEsYUFBYUMsZ0JBQU8sQ0FBQ0MsTUFBTTtBQUV4Q0YsV0FBV0csR0FBRyxDQUFDLFFBQVFDLDJCQUFXO0FBRWxDSixXQUFXSyxJQUFJLENBQUMsUUFBUUMsdUJBQU8ifQ==