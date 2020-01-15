module.exports = app => {
    app.route('/paciente')
       .get(app.api.pacientes.get)  
       .get(app.api.pacientes.getu) 
       .delete(app.api.pacientes.del) 
       .post(app.api.pacientes.add)
       .put(app.api.pacientes.att)
}
