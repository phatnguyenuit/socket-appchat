var emailPattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,3}$/;

var emailEle = $('#email');

emailEle.on('change', function () {
  var email = emailEle.val();
  var addClassInvalid = !email.match(emailPattern) ? true : false;
  emailEle.toggleClass("is-invalid", addClassInvalid);
  if (addClassInvalid) {
    emailEle.siblings('.invalid-feedback').text('Wrong email');
    $('.btn-login').prop('disabled', true);
  } else {
    emailEle.siblings('.invalid-feedback').text('');
    $('.btn-login').prop('disabled', false);
  }
});
