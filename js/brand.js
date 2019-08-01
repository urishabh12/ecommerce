$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://localhost:2000/api/category/brand", function(json) {
    var tr;
    for (var i = 0; i < json.length - 1; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + json[i].name + "</td>");
      tr.append(
        "<td>" +
          "<button class='delButton' name=" +
          json[i]._id +
          ">X</button>" +
          "</td>"
      );
      $("table tbody").append(tr);
    }
    let data = json[json.length - 1];
    for (var i = 0; i < data.length; i++) {
      $("#name").append(
        "<option value='" + data[i] + "'" + ">" + data[i] + "</option>"
      );
    }
    $("#data").after('<div id="nav"></div>');
    var rowsShown = 5;
    var rowsTotal = $("#data tbody tr").length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $("#nav").append('<a href="#" rel="' + i + '">' + pageNum + "</a> ");
    }
    $("#data tbody tr").hide();
    $("#data tbody tr")
      .slice(0, rowsShown)
      .show();
    $("#nav a:first").addClass("active");
    $("#nav a").bind("click", function() {
      $("#nav a").removeClass("active");
      $(this).addClass("active");
      var currPage = $(this).attr("rel");
      var startItem = currPage * rowsShown;
      var endItem = startItem + rowsShown;
      $("#data tbody tr")
        .css("opacity", "0.0")
        .hide()
        .slice(startItem, endItem)
        .css("display", "table-row")
        .animate({ opacity: 1 }, 300);
    });

    $(".delButton").click(function(e) {
      e.preventDefault();

      let id = $(this).attr("name");

      $.ajax({
        type: "POST",
        url: "http://localhost:2000/api/category/delbrand/" + id,
        data: {},
        success: function(data) {
          location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      });
    });
  });

  $("#displayForm").click(function(e) {
    $("#brandForm").show();

    e.preventDefault();
  });

  $("#brandForm").submit(function(e) {
    e.preventDefault();

    var form = $(this);
    var url = "http://localhost:2000/api/category/brand/add";

    console.log(form);

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function(data) {
        location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  });
});
