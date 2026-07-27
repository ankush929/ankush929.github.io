function validateForm() {
  "use strict";
  var name = $("#name").val();
  var err = true;
  if (name == "" || name == null) {
    $("#name").addClass("validation");
    err = false;
  } else {
    $("#name").removeClass("validation");
  }
  var email = $("#email").val();
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    $("#email").addClass("validation");
    err = false;
  } else {
    $("#email").removeClass("validation");
  }
  var message = $("#message").val();
  if (message == "" || message == null) {
    $("#message").addClass("validation");
    err = false;
  } else {
    $("#message").removeClass("validation");
  }
  return err;
}

$(document).ready(function () {
  "use strict";
  var $form = $("#form1");
  var $status = $("#successmsg");

  $("#button").click(function (e) {
    e.preventDefault();
    if (!validateForm()) {
      return false;
    }

    var action = $form.attr("action") || "";
    if (action.indexOf("YOUR_FORM_ID") !== -1 || action === "") {
      $status.html(
        "Contact form isn't configured yet. Reach me directly at " +
          "<a href='mailto:ankushwadhwa929@gmail.com'>ankushwadhwa929@gmail.com</a>."
      );
      return false;
    }

    $status.html("Sending…");

    $.ajax({
      url: action,
      type: "POST",
      data: $form.serialize(),
      dataType: "json",
      headers: { Accept: "application/json" },
    })
      .done(function () {
        $status.html("Thanks! Your message is on its way. I'll be in touch soon.");
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
      })
      .fail(function (xhr) {
        var msg =
          "Something went wrong. Please email me at " +
          "<a href='mailto:ankushwadhwa929@gmail.com'>ankushwadhwa929@gmail.com</a>.";
        if (xhr && xhr.responseJSON && xhr.responseJSON.errors) {
          msg = xhr.responseJSON.errors
            .map(function (x) {
              return x.message;
            })
            .join(", ");
        }
        $status.html(msg);
      });
  });
});
