window.onload = function () {
	var email = document.getElementById("email");

	email.addEventListener("input", function (event) {
		if (email.validity.typeMismatch) {
			email.setCustomValidity("O email não é válido!");

		} else {
			email.setCustomValidity("");
		}
	});
}