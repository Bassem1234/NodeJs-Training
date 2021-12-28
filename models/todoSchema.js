const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
name: {type: String, required: true},
description: String
},
{
    versionKey: false,
    timestamps: true
});
const toDo = mongoose.model('todo', todoSchema);
module.exports = toDo;