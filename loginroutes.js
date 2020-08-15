const User = require("./classes/User.js").User,
      Accounts = require("./classes/Accounts.js").Accounts,
      Misc = require("./classes/utils/Misc.js").Misc;

exports.login = function(req, resp) {
  var email = req.body.email;
  var password = Misc.hashIt(req.body.pass);
  
  if (Misc.validateEmail(email)) {
    Misc.captchaCheck(req, resp, function(response) {
      if(response){
        Accounts.login(email, password, function(response){
          if (response){
            Accounts.getUser(email, function(response){
              if(response.status){
                req.session.loggedin = response.status;
                req.session.username = response.username;
                resp.send({ status: true, username: response.username });
              }
            });
            /*resp.send({ status: true, message: "Logou com sucesso!" });
            req.session.loggedin = true;
            req.session.save();*/
          }else{
            resp.send({ status: false, message: "Email ou senha incorretos." });
          }
        });
      }else{
        resp.send({ status: false, message: "Captcha não foi resolvido." });
      }
    });
  }else{ resp.send({ status: false, message: "Email invalido." }); }
};

exports.register = function(req, resp) {
  var name = req.body.name;
  var password = Misc.hashIt(req.body.pass);
  var email = req.body.email;
  var date_created = new Date();
  var user = new User(null, name, password, email, date_created);
  
  if (Misc.validateEmail(email)) {
    Misc.captchaCheck(req, resp, function(response) {
      if(response){
        Accounts.register(user, function(response){
          if(response){
            resp.send({ status: true, message: "Registrou com sucesso!" });
          }else{
            resp.send({ status: false, message: "Ocorreu um erro na hora de registrar." });
          }
        });
      }else{
        resp.send({ status: false, message: "Captcha não foi resolvido." });
      }
    });
  }else {resp.send({ status: false, message: "Email invalido." })}
};

exports.logout = function(req, resp) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      resp.redirect("/");
    }
  });
};
