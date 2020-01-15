module.exports = app => {
    app.route('/relatoriopaciente')
       .get(app.api.relatoriopaciente.get)  
       .get(app.api.relatoriopaciente.getu) 
       .delete(app.api.relatoriopaciente.del) 
       .post(app.api.relatoriopaciente.add)
       .put(app.api.relatoriopaciente.att)
}