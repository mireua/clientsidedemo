$(function() {
    $("form[name='checkoutform']").validate({
      rules: {
    
        firstname: "required",
        lastname: "required",
        email: {
          required: true,
          email: true
        },
        address: {
          required: true,
          minlength: 5
        }
      },
      
      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        address: {
          required: "Please enter your address",
          minlength: "Enter a valid address"
        },
        email: "Please enter a valid email address"
      },
      
      submitHandler: function(form) {
        form.submit();
      }
    });
  });