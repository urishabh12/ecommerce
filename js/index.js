$(".my-form").on("submit", function() {
  event.preventDefault();
  $.ajax({
    url: "http://localhost:2000/api/users/login",
    type: "post",
    data: {
      email: $("#email").val(),
      password: $("#pwd").val()
    },
    dataType: "json",
    success: function(data, textStatus, request) {
      let id = request.getResponseHeader("auth-token");
      localStorage.setItem("auth-token", id);
      location.href = "http://localhost:2000/dashboard";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("h4").text("Wrong email or password");
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
});

if (localStorage.getItem("auth-token") !== null) {
  $.ajax({
    url: "http://localhost:2000/check",
    type: "post",
    data: {},
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    },
    dataType: "text",
    success: function(data) {
      if (data === "SUCCESS") {
        location.href = "http://localhost:2000/dashboard";
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
}
