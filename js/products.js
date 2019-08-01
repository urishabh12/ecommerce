$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://localhost:2000/api/product/all", function(json) {
    var tr;
    for (var i = 0; i < json.length - 1; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + json[i].name + "</td>");
      tr.append("<td>" + json[i].category + "</td>");
      tr.append("<td>" + json[i].company + "</td>");
      tr.append("<td>" + json[i].price + "</td>");
      tr.append("<td>" + json[i].quantity + "</td>");
      $("table tbody").append(tr);
    }
    let cat = json[json.length - 1];
    for (var i = 0; i < cat.length; i++) {
      $("#category").append(
        "<option value='" + cat.name + "'" + ">" + cat[i].name + "</option>"
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
  });

  $("#displayForm").click(function(e) {
    $("#productForm").show();

    e.preventDefault();
  });

  $("#productForm").submit(function(e) {
    e.preventDefault();

    var form = $(this);
    var url = "http://localhost:2000/api/product/add";

    console.log(form);

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
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
