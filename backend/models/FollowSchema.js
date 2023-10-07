const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const FollowSchema = new Schema({
    followerUserId: {
        // suppose A follows B then this is A's user Id---
        // foreign key to user collection
        type: String,
        ref: "users",
        require: true,
    },

    followingUserId : {
        // this is B's user Id---
        type: String,
        ref: "users",
        require: true,
    },
    creationDateTime : {
        type: Date,
        require: true,
    }
});

module.exports = Mongoose.model("follow", FollowSchema);