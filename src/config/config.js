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
    //development
    cors: {
        origin: ['http://192.168.141.65:3000', 'http://localhost:3000'],
        methods: 'GET,POST'
    },
    ////production
    // cors: {
    //     origin: ['http://3.14.245.186:3000', 'http://localhost:3000'],
    //     methods: 'GET,POST'
    // },
}
