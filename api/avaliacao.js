module.exports = app =>{
    const get = app.get('/avaliacao', (req,res)=>{
        mysqlConnection.query('select * from avaliacao', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar avaliacao
    const getu = app.get('/avaliacao/:id', (req,res)=>{
        mysqlConnection.query('select * from avaliacao where ava_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar avaliacao
    const del = app.delete('/avaliacao/:id', (req,res)=>{
        mysqlConnection.query('delete from avaliacao where ava_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar avaliacao
    const add = app.post('/avaliacao', (req,res)=>{
        //console.log({...req.body})
        let ava = req.body;
        var sql = "SET @ava_id = ?; SET @ava_fk_pac = ?;SET @ava_data = ?;\
                   CALL AvaliacaoAddOrEdit(@ava_id, @ava_fk_pac, @ava_data);";
        mysqlConnection.query(sql, [ava.ava_id, ava.ava_fk_pac, ava.ava_data] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Avaliacao adicionada id : ' +element[0].ava_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar avaliacao
    const att = app.put('/avaliacao', (req,res)=>{
        let ava = req.body;
        var sql = "SET @ava_id = ?; SET @ava_fk_pac = ?;SET @ava_data = ?;\
                   CALL AvaliacaoAddOrEdit(@ava_id, @ava_fk_pac, @ava_data);";
        mysqlConnection.query(sql, [ava.ava_id, ava.ava_fk_pac, ava.ava_data] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}