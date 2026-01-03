const roleCheck = (...allowedRoles) => {
  return async (req, res, next) => {
    try {

        const userRole = req.loggedInUser.role;

        if(!allowedRoles.includes(userRole)){
            throw{
                code: 401,
                message: "Access denied: Role permission not matched",
                name:"ACCESS_DENIED"
            }
        }


        next()
    } catch (error) {
      next(error);
    }
  };
};

module.exports = roleCheck;
