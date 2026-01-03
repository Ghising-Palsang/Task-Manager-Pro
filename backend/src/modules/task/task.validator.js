const joi = require('joi');

const taskDTO = joi.object({
    title: joi.string().min(2).max(80).required(),
    description: joi.string().default(""),
    status: joi.string().valid("active", "completed").required()
})

module.exports = taskDTO