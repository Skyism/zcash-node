const { ZcashDevBackend } = require('./zcash-backend');

const zcash = new ZcashDevBackend();

// zcash.getBalance().then(result => {
//     console.log(result);
// });

// zcash.getAddresses().then(result => {
//     console.log(result);
// });

// zcash.getTransactions().then(result => {
//     console.log(result);
// });

zcash.sync().then(result => {
    console.log(result);
});