const authRouter = require('../modules/auth/auth.router');
const taskRouter = require('../modules/task/task.router');

const router = require('express').Router();

router.use('/auth', authRouter)
router.use('/task', taskRouter)
module.exports = router;