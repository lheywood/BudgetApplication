const express = require('express');
const router = express.Router();
const mssql = require('mssql');
 
router.get('/', function(req, res){
    res.sendFile(global.basedir + "/client/index.html");
});

router.get('/account', function(req, res){
    res.sendFile(global.basedir + "/client/account.html");
});


router.post('/current_user', function(req, res){
    const mmsql_request = new mssql.Request();
    mmsql_request.query('SELECT TOP 1 * FROM aviw_Budgets_Users', function(err, dataset){
        if(dataset && dataset.recordsets.length > 0){
            res.status(200).send(dataset.recordset[0]);
        }
        else{
            res.status(400).send({Error:"Something went wrong."});
        }
    })
});

router.post('/current_user_accounts', function(req, res){
    const mmsql_request = new mssql.Request();
    
    mmsql_request.query('SELECT * FROM aviw_Budgets_Accounts WHERE User_ID = ' + req.body.User_ID, function(err, dataset){
        if(dataset && dataset.recordsets.length > 0){
            res.status(200).send(dataset.recordsets);
        }
        else{
            res.status(400).send({Error:"Something went wrong."});
        }
    })
});

router.post('/add_new_account', function(req, res){
    const mmsql_request = new mssql.Request();
    mmsql_request.input('Account', req.body.Name);
    mmsql_request.input('Description', req.body.Description);
    mmsql_request.input('Country', 'req.body.Country');
    mmsql_request.input('User_ID', req.body.User_ID)
    mmsql_request.execute('add-new-account', function(err, dataset){
        if(err === null){
            res.status(200).send('success');
        }
        else{
            res.status(400).send(err);
        }
    })
});

router.post('/remove-account', function(req, res){
    const mmsql_request = new mssql.Request();
    console.log(req.body.ID)
    mmsql_request.query('DELETE FROM Budgets_Accounts WHERE ID = ' + req.body.ID, function(err, dataset){
        console.log(dataset);
        console.log(dataset.recordset);
        if(!err){
            res.status(200).send(dataset.recordsets);
        }
        else{
            res.status(400).send({Error:"Something went wrong."});
        }
    })
});

module.exports = router;