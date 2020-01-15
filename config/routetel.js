module.exports = app => {
    app.route('/telefone')
       .get(app.api.telefone.get)  
       .get(app.api.telefone.getu) 
       .delete(app.api.telefone.del) 
       .post(app.api.telefone.add)
       .put(app.api.telefone.att)
}