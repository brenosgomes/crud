module.exports = app => {
    const get = app.get('/paciente', (req,res)=>{
        mysqlConnection.query('select * from paciente', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar paciente
    const getu = app.get('/paciente/:id', (req,res)=>{
        mysqlConnection.query('select * from paciente where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar paciente
    const del = app.delete('/paciente/:id', (req,res)=>{
        mysqlConnection.query('delete from paciente where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar paciente
    const add = app.post('/paciente', (req,res)=>{
        //console.log({...req.body})
        let pac = req.body;
        var sql = "SET @pac_id = ?; SET @pac_fk_adm = ?;SET @pac_nome = ?; SET @pac_dt_nasc = ?; SET @pac_email = ?; SET @pac_rg = ?; \
                   SET @pac_cpf = ?;SET @pac_num = ?; SET @pac_rua = ?; SET @pac_bairro = ?; SET @pac_cid = ?; SET @pac_est = ?; \
                   CALL PacienteAddOrEdit(@pac_id, @pac_fk_adm, @pac_nome, @pac_dt_nasc, @pac_email, @pac_rg,\
                                          @pac_cpf, @pac_num, @pac_rua ,@pac_bairro, @pac_cid, @pac_est);";
        mysqlConnection.query(sql, [pac.pac_id, pac.pac_fk_adm, pac.pac_nome, pac.pac_dt_nasc, pac.pac_email, pac.pac_rg, 
                              pac.pac_cpf, pac.pac_num, pac.pac_rua ,pac.pac_bairro, pac.pac_cid, pac.pac_est] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Paciente adicionado id : ' +element[0].pac_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar paciente
    const att = app.put('/paciente', (req,res)=>{
        let pac = req.body;
        var sql = "SET @pac_id = ?; SET @pac_fk_adm = ?;SET @pac_nome = ?; SET @pac_dt_nasc = ?; SET @pac_email = ?; SET @pac_rg = ?;  \
                   SET @pac_cpf = ?;SET @pac_num = ?; SET @pac_rua = ?; SET @pac_bairro = ?; SET @pac_cid = ?; SET @pac_est = ?; \
                   CALL PacienteAddOrEdit(@pac_id, @pac_fk_adm, @pac_nome, @pac_dt_nasc, @pac_email, @pac_rg,\
                                          @pac_cpf, @pac_num, @pac_rua ,@pac_bairro, @pac_cid, @pac_est);";
        mysqlConnection.query(sql, [pac.pac_id, pac.pac_fk_adm, pac.pac_nome, pac.pac_dt_nasc, pac.pac_email, pac.pac_rg, 
                              pac.pac_cpf,pac.pac_num, pac.pac_rua ,pac.pac_bairro, pac.pac_cid, pac.pac_est] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}





