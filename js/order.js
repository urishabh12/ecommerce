$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://localhost:2000/api/order/all", function(json) {
    var tr;
    for (var i = 0; i < json.length; i++) {
      tr = $("<tr/>");
      let link =
        "window.open('" +
        "http://localhost:2000/api/users/single/" +
        json[i].user +
        "'" +
        "," +
        "'_self'" +
        ")";

      let name = "";
      let quantity = "";
      let from = "";
      let to = "";
      tr.append("<td onclick=" + link + ">" + json[i].user + "</td>");
      for (var i = 0; i < product.orderList.length; i++) {
        if (i === 1) {
          name = name + product.orderList[i].name;
          quantity = quantity + product.orderList[i].quantity;
          from = from + product.orderList[i].ddate;
          to = to + product.orderList[i].bdate;
        } else {
          name = name + ", " + product.orderList[i].name;
          quantity = quantity + ", " + product.orderList[i].quantity;
          from = from + ", " + product.orderList[i].ddate;
          to = to + ", " + product.orderList[i].bdate;
        }
      }
      tr.append("<td>" + name + "</td>");
      tr.append("<td>" + quantity + "</td>");
      tr.append("<td>" + from + "</td>");
      tr.append("<td>" + to + "</td>");
      tr.append("<td>" + json[i].product.totalPrice + "</td>");
      if (json[i].isComplete === true) {
        tr.append("<td>" + "Completed" + "</td>");
      } else {
        tr.append(
          "<td>" +
            "<button name=" +
            json[i]._id +
            " class='completeOrder'>Not Complete</button>" +
            "</td>"
        );
      }
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

    $(".completeOrder").click(function(e) {
      e.preventDefault();

      let id = $(this).attr("name");

      $.ajax({
        type: "POST",
        url: "http://localhost:2000/api/order/complete/" + id,
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
});
