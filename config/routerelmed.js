module.exports = app => {
    app.route('/relatoriomedico')
       .get(app.api.relatoriomedico.get)  
       .get(app.api.relatoriomedico.getu) 
       .delete(app.api.relatoriomedico.del) 
       .post(app.api.relatoriomedico.add)
       .put(app.api.relatoriomedico.att)
}