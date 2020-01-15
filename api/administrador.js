module.exports = app =>{
    const get = app.get('/administrador', (req,res)=>{
        mysqlConnection.query('select * from administrador', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar administrador
    const getu = app.get('/administrador/:id', (req,res)=>{
        mysqlConnection.query('select * from administrador where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar administrador
    const del = app.delete('/administrador/:id', (req,res)=>{
        mysqlConnection.query('delete from administrador where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar administrador
    const add = app.post('/administrador', (req,res)=>{
        //console.log({...req.body})
        let ava = req.body;
        var sql = "SET @adm_id = ?; SET @adm_login = ?;SET @adm_senha = ?; SET @adm_nome = ?;SET @adm_nivel = ?;\
        CALL AdministradorAddOrEdit(@adm_id, @adm_login, @adm_senha, @adm_nome, @adm_nivel);";
        mysqlConnection.query(sql, [adm.adm_id, adm.adm_login, adm.adm_senha, adm.adm_nome, adm.adm_nivel] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Administrador adicionado id : ' +element[0].ava_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar avaliacao
    const att = app.put('/administrador', (req,res)=>{
        let ava = req.body;
        var sql = "SET @adm_id = ?; SET @adm_login = ?;SET @adm_senha = ?; SET @adm_nome = ?;SET @adm_nivel = ?;\
        CALL AdministradorAddOrEdit(@adm_id, @adm_login, @adm_senha, @adm_nome, @adm_nivel);";
        mysqlConnection.query(sql, [adm.adm_id, adm.adm_login, adm.adm_senha, adm.adm_nome, adm.adm_nivel] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })
                
    return {get, getu, del, add, att}
}
