const ToDoModel = require('./models/todoModel');

exports.create = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  const ToDo = new ToDoModel();

  ToDo.id = Date.now();
  ToDo.text = req.body.text;

  ToDo.save(function(err) {
    if (err) {
      res.send(err);
    }
  });
}

exports.findAll = (req, res) => {
  ToDoModel
    .find({deleteFlg: false})
    .sort({id: 1})
    .then(function(todoList) {
      res.json({
        todoList: todoList,
      });
    })
    .catch(err => {
      res.send(err);
    });
}

exports.findOne = (req, res) => {

}

exports.update = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  /* TodoModel.findOneAndUpdate()は使えないもよう。
    todoSchema.method("toJSON", ...)により、toJSONメソッドの返り値を変更したから？
  */
  ToDoModel.findById(req.params.id, function(err, todo) {
    if (err) {
      console.error(err);
      return
    }
    
    todo.text = req.body.text;
    todo.status = req.body.status;

    todo.save(function(err) {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

}

exports.delete = (req, res) => {
  ToDoModel.findById(req.params.id, function(err, todo) {
    todo.deleteFlg = true;

    todo.save(function(err) {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}

exports.deleteAll = (req, res) => {

}

exports.findAllPublished = (req, res) => {

}