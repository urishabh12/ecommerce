$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://localhost:2000/api/product/all", function(json) {
    var tr;
    let link = "http://localhost:2000/getimage/";
    for (var i = 0; i < json.length - 1; i++) {
      let link =
        "window.open('" +
        "http://localhost:2000/getimage/" +
        json[i].image +
        "'" +
        "," +
        "'_self'" +
        ")";
      tr = $("<tr/>");
      tr.append("<td>" + json[i].name + "</td>");
      tr.append("<td>" + json[i].category + "</td>");
      tr.append("<td>" + json[i].company + "</td>");
      tr.append("<td>" + json[i].price + "</td>");
      tr.append("<td>" + json[i].quantity + "</td>");
      tr.append("<td onclick=" + link + ">" + "View" + "</td>");
      tr.append(
        "<td>" +
          "<button class='delButton' name=" +
          json[i]._id +
          ">X</button>" +
          "</td>"
      );
      $("table tbody").append(tr);
    }
    let cat = json[json.length - 1];
    for (var i = 0; i < cat.length; i++) {
      $("#category").append(
        "<option value='" + cat[i].name + "'" + ">" + cat[i].name + "</option>"
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
        url: "http://localhost:2000/api/product/delete/" + id,
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
    $("#productForm").show();

    e.preventDefault();
  });

  $("#productForm").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var url = "http://localhost:2000/api/product/add";

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        $("h5").text(data);
        location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  });
});
