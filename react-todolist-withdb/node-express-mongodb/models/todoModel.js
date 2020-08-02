const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: {type: Number, required: true},
  text: {type: String, max: 120, required: true},
  status: {type: Boolean, default: true},
  deleteFlg: {type: Boolean, default: false}
});

todoSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('ToDoModel', todoSchema);

