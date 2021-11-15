const express = require('express')
const todosController = require('./../controllers/todosController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.use(authController.authenticateToken)

router.get("/", todosController.getTodos)
router.post("/", todosController.addTodo)
router.get("/:id", todosController.getTodo)
router.delete("/:id", todosController.deleteTodo)
router.patch("/:id", todosController.editTodo)

module.exports = router