module.exports = app => {
    app.route('/administrador')
       .get(app.api.administrador.get)  
       .get(app.api.administrador.getu) 
       .delete(app.api.administrador.del) 
       .post(app.api.administrador.add)
       .put(app.api.administrador.att)
}