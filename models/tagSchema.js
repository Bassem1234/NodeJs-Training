const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagSchema = new Schema ({
name: {type: String, required: true},
description: String
},
{
    versionKey: false,
    timestamps: true
});
const tag = mongoose.model('tag', tagSchema);
module.exports = tag;