"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    addUser: function() {
        return addUser;
    },
    getUserById: function() {
        return getUserById;
    }
});
const _client = require("@prisma/client");
const _CustomError = require("../middlewares/CustomError");
const getUserById = async (req, res)=>{
    const prisma = new _client.PrismaClient();
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        throw new _CustomError.CustomError("Ez az ID nem l\xe9tezik!", 404, true);
    }
    res.status(200).json(user);
};
const addUser = async (req, res)=>{
    const prisma = new _client.PrismaClient();
    const { name, age } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            age: Number(age)
        }
    });
    res.status(200).json(user);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcbmltcG9ydCB7IEN1c3RvbUVycm9yIH0gZnJvbSAnLi4vbWlkZGxld2FyZXMvQ3VzdG9tRXJyb3InO1xyXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJCeUlkID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlXHJcbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuICBjb25zdCBpZCA9IE51bWJlcihyZXEucGFyYW1zLmlkKTtcclxuXHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBpZCB9IH0pO1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHRocm93IG5ldyBDdXN0b21FcnJvcignRXogYXogSUQgbmVtIGzDqXRlemlrIScsIDQwNCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICByZXMuc3RhdHVzKDIwMCkuanNvbih1c2VyKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRVc2VyID0gYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuICBjb25zdCB7IG5hbWUsIGFnZSB9ID0gcmVxLmJvZHk7XHJcblxyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xyXG4gICAgZGF0YTogeyBuYW1lLCBhZ2U6IE51bWJlcihhZ2UpIH1cclxuICB9KTtcclxuXHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24odXNlcik7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJhZGRVc2VyIiwiZ2V0VXNlckJ5SWQiLCJyZXEiLCJyZXMiLCJwcmlzbWEiLCJQcmlzbWFDbGllbnQiLCJpZCIsIk51bWJlciIsInBhcmFtcyIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJDdXN0b21FcnJvciIsInN0YXR1cyIsImpzb24iLCJuYW1lIiwiYWdlIiwiYm9keSIsImNyZWF0ZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBb0JhQSxPQUFPO2VBQVBBOztJQWhCQUMsV0FBVztlQUFYQTs7O3dCQUpnQjs2QkFDRDtBQUdyQixNQUFNQSxjQUFjLE9BQ3pCQyxLQUNBQztJQUVBLE1BQU1DLFNBQVMsSUFBSUMsb0JBQVk7SUFDL0IsTUFBTUMsS0FBS0MsT0FBT0wsSUFBSU0sTUFBTSxDQUFDRixFQUFFO0lBRS9CLE1BQU1HLE9BQU8sTUFBTUwsT0FBT0ssSUFBSSxDQUFDQyxVQUFVLENBQUM7UUFBRUMsT0FBTztZQUFFTDtRQUFHO0lBQUU7SUFFMUQsSUFBSSxDQUFDRyxNQUFNO1FBQ1QsTUFBTSxJQUFJRyx3QkFBVyxDQUFDLDRCQUF5QixLQUFLO0lBQ3REO0lBRUFULElBQUlVLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNMO0FBQ3ZCO0FBRU8sTUFBTVQsVUFBVSxPQUFPRSxLQUFjQztJQUMxQyxNQUFNQyxTQUFTLElBQUlDLG9CQUFZO0lBQy9CLE1BQU0sRUFBRVUsSUFBSSxFQUFFQyxHQUFHLEVBQUUsR0FBR2QsSUFBSWUsSUFBSTtJQUU5QixNQUFNUixPQUFPLE1BQU1MLE9BQU9LLElBQUksQ0FBQ1MsTUFBTSxDQUFDO1FBQ3BDQyxNQUFNO1lBQUVKO1lBQU1DLEtBQUtULE9BQU9TO1FBQUs7SUFDakM7SUFFQWIsSUFBSVUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0w7QUFDdkIifQ==