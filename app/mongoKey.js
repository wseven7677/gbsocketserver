let dbName = 'greenblue',
    dbPort = '27017',
    dbUser = 'blue',
    dbPassword = 'qwe123',
    dbUrl = 'mongodb://'+dbUser+':'+dbPassword+'@'+'localhost:' + dbPort + '/'+dbName;

const mongoKey = {
    dbName,
    dbUrl
};

export default mongoKey;
