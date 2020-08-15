$("#loginform").submit(function(e) {
  e.preventDefault();
  var email = $("#email").val(),
    pass = $("#pass").val(),
    data = { "email": email, "pass": pass, "captcha": grecaptcha.getResponse() };

  $.ajax({
    type: "POST",
    url: "/",
    data: data,
    success: function(response) {
      if (response.status == true) window.location = "/";

      $("#msgs").toggle();
      setTimeout(function() {
        $("#msgs").toggle();
      }, 3000);

      $("#msgs").html(response.message);
      grecaptcha.reset();
      console.log(response);
    }
  });

  /*$.ajax({
    type: "POST",
    url: "/",
    data: { email: email, pass: pass, captcha: grecaptcha.getResponse() },
    success: function(response) {
      if (response.status == true) window.location = "/";

      $("#msgs").toggle();
      setTimeout(function() {
        $("#msgs").toggle();
      }, 3000);

      $("#msgs").html(response.message);
      grecaptcha.reset();
      console.log(response);
    }
  });*/
});

$("#registerform").submit(function(e) {
  e.preventDefault();
  var name = $("#name").val();
  var email = $("#email").val();
  var pass = $("#pass").val();

  /*console.log(name, email, pass);
  $.ajax({
    type: "POST",
    url: "/register",
    data: {
      name: name,
      email: email,
      pass: pass,
      captcha: grecaptcha.getResponse()
    },
    success: function(response) {
      if (response.status == true) window.location = "/";
      grecaptcha.reset();
    }
  });*/
});
