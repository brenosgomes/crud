module.exports = app =>{
    const get = app.get('/relatoriopaciente', (req,res)=>{
        mysqlConnection.query('select * from relatoriopaciente', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar relatoriopaciente
    const getu = app.get('/relatoriopaciente/:id', (req,res)=>{
        mysqlConnection.query('select * from relatoriopaciente where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar relatoriopaciente
    const del = app.delete('/relatoriopaciente/:id', (req,res)=>{
        mysqlConnection.query('delete from relatoriopaciente where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar relatoriopaciente
    const add = app.post('/relatoriopaciente', (req,res)=>{
        //console.log({...req.body})
        let rel_pac = req.body;
        var sql = "SET @rel_pac_id = ?; SET @rel_pac_fk_ava = ?;SET @rel_pac_forA = ?;\
                   SET @rel_pac_forB = ?;SET @rel_pac_forC = ?;SET @rel_pac_forD = ?;\
                   CALL RelatorioPacienteAddOrEdit(@rel_pac_id, @rel_pac_fk_ava, @rel_pac_forA, \
                                                 @rel_pac_forB, @rel_pac_forC, @rel_pac_forD);";
        mysqlConnection.query(sql, [rel_pac.rel_pac_id, rel_pac.rel_pac_fk_ava, rel_pac.rel_pac_forA, rel_pac.rel_pac_forB, 
                                    rel_pac.rel_pac_forC, rel_pac.rel_pac_forD] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Relatorio paciente adicionado id : ' +element[0].rel_pac_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar relatoriopaciente
    const att = app.put('/relatoriopaciente', (req,res)=>{
        let rel_pac = req.body;
        var sql = "SET @rel_pac_id = ?; SET @rel_pac_fk_ava = ?;SET @rel_pac_forA = ?;\
                   SET @rel_pac_forB = ?;SET @rel_pac_forC = ?;SET @rel_pac_forD = ?;\
                   CALL RelatorioPacienteAddOrEdit(@rel_pac_id, @rel_pac_fk_ava, @rel_pac_forA, \
                                                   @rel_pac_forB, @rel_pac_forC, @rel_pac_forD);";
        mysqlConnection.query(sql, [rel_pac.rel_pac_id, rel_pac.rel_pac_fk_ava, rel_pac.rel_pac_forA, rel_pac.rel_pac_forB, 
                                    rel_pac.rel_pac_forC, rel_pac.rel_pac_forD] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}