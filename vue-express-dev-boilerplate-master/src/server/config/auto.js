var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto(
    'food', 'root', 'wangfeng123', {
        host: '120.79.213.80',
        dialect: 'mysql',
        directory: '../model', // prevents the program from writing to disk
        port: '3306',
        additional: {
            timestamps: false,
            underscored:true
        }
    }
)
auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});