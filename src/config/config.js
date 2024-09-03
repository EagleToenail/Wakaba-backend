module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || "wakaba",
        user: process.env.DB_USER || "wakaba",
        password: process.env.DB_PASS || "Wakaba_password123QWE!@#QWE",
        dialect: process.env.DIALECT || "mysql",
        host: process.env.HOST || "localhost",
    },
    authentication: {
        jwtSecret : process.env.JWT_SECRET || 'secret'
    },
    cors: {
        origin: ['http://localhost:3001','http://localhost:3000'],
        methods: 'GET,POST'
    },
}
