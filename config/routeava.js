module.exports = app => {
    app.route('/avaliacao')
       .get(app.api.avaliacao.get)  
       .get(app.api.avaliacao.getu) 
       .delete(app.api.avaliacao.del) 
       .post(app.api.avaliacao.add)
       .put(app.api.avaliacao.att)
}