$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://139.59.14.141:2000/api/cart/all", function(json) {
    var tr;
    var products = "";
    for (var i = 0; i < json.length; i++) {
      tr = $("<tr/>");
      let link =
        "window.open('" +
        "http://139.59.14.141:2000/api/users/single/" +
        json[i].user +
        "'" +
        "," +
        "'_self'" +
        ")";
      tr.append("<td onclick=" + link + ">" + json[i].user + "</td>");
      for (var j = 0; j < json[i].products.length; j++) {
        products = products + json[i].products[j].name + " ,";
      }
      tr.append("<td>" + products + "</td>");
      $("table tbody").append(tr);
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
  });
});
