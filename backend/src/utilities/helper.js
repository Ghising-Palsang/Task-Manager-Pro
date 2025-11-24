const generateRandomString = (len = 100) => {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let randomString = "";

    for(let i = 0 ; i < len; i++){
        let posn =   Math.floor(Math.random() * string.length);
        randomString += string[posn]
    
    }   

    return randomString;

}

module.exports = {generateRandomString}