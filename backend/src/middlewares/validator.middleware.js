const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;

            if(!data) {
                throw{
                    code: 422,
                    message: "Data not set",
                    name: "VALIDATOR_DATA_NOTSET"
                }
            }

            await schema.validateAsync(data, {abortEarly: false})
            next()
        } catch (error) {
            let errorBag = {
                code: error.code || null,
                message: error.message,
                detail: error.details || null,
                status: error.name
            }
            let messageBag;

            if(error.details && error.length) {
                error.details.map((error)=> {
                    let key = error.path.pop();
                    let message = error.message

                    messageBag[key] = message
                })

                errorBag.detail = messageBag
                errorBag.message = "Validation Error"
            }
            next(errorBag)
        }
    }
}

module.exports = bodyValidator