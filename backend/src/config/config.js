require('dotenv').config();


const MongoDbConfig =  {
    url: process.env.MONGODB_DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.MONGODB_DB_NAME
}

const SmtpConfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
}

const AppConfig = {
    feUrl: process.env.FRONTEND_URL,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = {MongoDbConfig, SmtpConfig, AppConfig}