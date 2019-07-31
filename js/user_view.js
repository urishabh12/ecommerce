$(document).ready(function() {
  $.ajax({
    url: window.location.href,
    type: "GET",
    data: {
      tom: "yes"
    },
    dataType: "json",
    success: function(data, textStatus, request) {
      setit(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("h4").text("Server Error");
      console.log(jqXHR, textStatus, errorThrown);
    }
  });

  function setit(data) {
    console.log(data);
    let link = "http://localhost:2000/getimage/";
    var verifylink = "http://localhost:2000/api/users/verify/" + data[0]._id;
    $("#email").append("<h4>" + "<b>Email: </b>" + data[0].email + "</h4>");
    $("#name").append("<h4>" + "<b>Name: </b>" + data[0].name + "</h4>");
    $("#mobile").append("<h4>" + "<b>Mobile: </b>" + data[0].mobile + "</h4>");
    for (var i = 0; i < data[0].address.length; i++) {
      if (i === 0) {
        $("#address").append(
          "<h4>" + "<b>Address: </b>" + data[0].address[i] + "</h4>"
        );
      } else {
        $("#address").append("<h4>" + data[0].address[i] + "</h4>");
      }
    }
    $("#aadhar1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.aadhar0 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#aadhar1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.aadhar1 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#pan1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.pan0 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#pan1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.pan1 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#elec").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.electricity0 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#elec").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.electricity1 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#driving1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.driving0 +
        "'" +
        "alt='Smiley face'></img>"
    );
    $("#driving1").append(
      "<img src=" +
        "'" +
        link +
        data[0].documentLink.driving1 +
        "'" +
        "alt='Smiley face'></img>"
    );
    if (data[0].isVerified === true) {
      $("#vrbtn").remove();
      $("#verify").append("<h2> Verified </h2>");
    }

    $("#vrbtn").click(function() {
      $.ajax({
        url: verifylink,
        type: "POST",
        data: {},
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        },
        dataType: "json",
        success: function(data, textStatus, request) {
          location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $("h4").text("Server Error");
        }
      });
    });
  }
});
