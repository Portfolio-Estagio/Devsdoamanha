const request = require("request-promise"),
      crypto = require("crypto");

class Misc{
  static captchaCheck(req, resp, callback){
    var recaptcha = req.body.captcha;
    if(recaptcha === undefined || recaptcha === "" || recaptcha === null) return callback(false);
    
    var secretKey = process.env.SECRET_KEY;
    var URL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;
    
    request(URL, function(err, data, resp){  
      if (err) throw err;
      try{
        var body = JSON.parse(resp);
      }catch(e){ return callback(false) }
      if(body.success !== undefined && !body.success) return callback(false);
      return callback(true);
      
    });
  };
  
  static hashIt(str){
    return crypto
      .createHash("sha256")
      .update(str)
      .digest("base64");
  };
  
  static validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

exports.Misc = Misc;