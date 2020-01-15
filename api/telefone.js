module.exports = app =>{
    const get = app.get('/telefone', (req,res)=>{
        mysqlConnection.query('select * from telefone', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar telefone
    const getu = app.get('/telefone/:id', (req,res)=>{
        mysqlConnection.query('select * from telefone where tel_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar telefone
    const del = app.delete('/telefone/:id', (req,res)=>{
        mysqlConnection.query('delete from telefone where tel_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar telefone
    const add = app.post('/telefone', (req,res)=>{
        //console.log({...req.body})
        let tel = req.body;
        var sql = "SET @tel_id = ?; SET @tel_fk_pac = ?;SET @tel_ddd = ?; SET @tel_num = ?;\
                   CALL TelefoneAddOrEdit(@tel_id, @tel_fk_pac, @tel_ddd, @tel_num);";
        mysqlConnection.query(sql, [tel.tel_id, tel.tel_fk_pac, tel.tel_ddd, tel.tel_num] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Telefone adicionado id : ' +element[0].tel_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar telefone
    const att = app.put('/telefone', (req,res)=>{
        let tel = req.body;
        var sql = "SET @tel_id = ?; SET @tel_fk_pac = ?;SET @tel_ddd = ?; SET @tel_num = ?;\
                   CALL TelefoneAddOrEdit(@tel_id, @tel_fk_pac, @tel_ddd, @tel_num);";
        mysqlConnection.query(sql, [tel.tel_id, tel.tel_fk_pac, tel.tel_ddd, tel.tel_num] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}