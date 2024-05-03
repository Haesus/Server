const bcrypt = require(`bcrypt`);
const password = `gotnajtwu`;
const saltRound = 10;

let hashed = bcrypt.hashSync(password, saltRound);

console.log(`password: ${password}, ${hashed}`);

const result = bcrypt.compareSync(password, hashed);
console.log(`Password is same: ${result}`);
const result1 = bcrypt.compareSync(`1234`, hashed);
console.log(`Password is same: ${result1}`);

(async () => {
    const hashed = await bcrypt.hash(password, saltRound);
    console.log(`password: ${password}, hashed:${hashed}`);
    const result = await bcrypt.compare(password, hashed);
    console.log(`Password is Same: ${result}`);
    })();

const asyncFunc = async () => {
    let hashed1 = await bcrypt.hash(password, saltRound);
    console.log(`password async: ${password}, ${hashed1}`);

    const result = await bcrypt.compare(password, hashed1);
    console.log(`Password is same: ${result}`);
    const result1 = await bcrypt.compare(`1234`, hashed1);
    console.log(`Password is same: ${result1}`);
}

asyncFunc()