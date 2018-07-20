let dbName = 'ycjxc',
    dbPort = '27017',
    dbUser = 'gm',
    dbPassword = 'qwe123',
    dbUrl = 'mongodb://'+dbUser+':'+dbPassword+'@'+'localhost:' + dbPort + '/'+dbName;

const mongoKey = {
    dbName,
    dbPort,
    dbUrl,
    dbUser,
    dbPassword
};

export default mongoKey;
