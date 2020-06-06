const config = require( "../config" );

const sql = require('mssql');
// make sure that any items are correctly URL encoded in the connection string

const allAccounts = async config => {
    await sql.connect(`mssql://${config.sql.user}:${config.sql.password}@localhost/${config.sql.database}`)
    const result = await sql.query`SELECT * FROM Budgets_Accounts`
    return result.resultset;
 };
 
 module.exports = allAccounts;
