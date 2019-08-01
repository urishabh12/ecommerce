$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

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

  function setTable(json) {
    var tr;
    for (var i = 0; i < json.length - 1; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + json[i].title + "</td>");
      tr.append("<td>" + json[i].product + "</td>");
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
  }

  $("#displayForm").click(function(e) {
    $("#advertiseForm").show();

    e.preventDefault();
  });
});
