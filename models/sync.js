const { sequelize } = require(`./index`);

const sync = () => {
    sequelize.sync( {force: true, alter: true})
    .then((result) => {
        console.log(`데이터베이스 생성완료`);
    }).catch((err) => {
        console.log(`데이터베이스 생성종료`)
    });
}

module.exports = sync;