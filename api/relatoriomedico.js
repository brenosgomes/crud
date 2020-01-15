module.exports = app =>{
    const get = app.get('/relatoriomedico', (req,res)=>{
        mysqlConnection.query('select * from relatoriomedico', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar relatoriomedico
    const getu = app.get('/relatoriomedico/:id', (req,res)=>{
        mysqlConnection.query('select * from relatoriomedico where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar relatoriomedico
    const del = app.delete('/relatoriomedico/:id', (req,res)=>{
        mysqlConnection.query('delete from relatoriomedico where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar relatoriomedico
    const add = app.post('/relatoriomedico', (req,res)=>{
        //console.log({...req.body})
        let rel_med = req.body;
        var sql = "SET @rel_med_id = ?; SET @rel_med_fk_ava = ?;SET @rel_med_forA = ?;\
                   SET @rel_med_forB = ?;SET @rel_med_forC = ?;SET @rel_med_forD = ?;SET @rel_med_forE = ?;\
                   CALL RelatorioMedicoAddOrEdit(@rel_med_id, @rel_med_fk_ava, @rel_med_forA, \
                                                 @rel_med_forB, @rel_med_forC, @rel_med_forD, @rel_med_forE);";
        mysqlConnection.query(sql, [rel_med.rel_med_id, rel_med.rel_med_fk_ava, rel_med.rel_med_forA, rel_med.rel_med_forB, 
                                    rel_med.rel_med_forC, rel_med.rel_med_forD, rel_med.rel_med_forE] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Relatorio medico adicionado id : ' +element[0].rel_med_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar relatoriomedico
    const att = app.put('/relatoriomedico', (req,res)=>{
        let rel_med = req.body;
        var sql = "SET @rel_med_id = ?; SET @rel_med_fk_ava = ?;SET @rel_med_forA = ?;\
                   SET @rel_med_forB = ?;SET @rel_med_forC = ?;SET @rel_med_forD = ?;SET @rel_med_forE = ?;\
                   CALL RelatorioMedicoAddOrEdit(@rel_med_id, @rel_med_fk_ava, @rel_med_forA, \
                                                 @rel_med_forB, @rel_med_forC, @rel_med_forD, @rel_med_forE);";
        mysqlConnection.query(sql, [rel_med.rel_med_id, rel_med.rel_med_fk_ava, rel_med.rel_med_forA, rel_med.rel_med_forB, 
                                    rel_med.rel_med_forC, rel_med.rel_med_forD, rel_med.rel_med_forE] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}