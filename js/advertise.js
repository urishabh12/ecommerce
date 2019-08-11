$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "auth-token": localStorage.getItem("auth-token")
    }
  });

  $.getJSON("http://139.59.14.141:2000/api/advertisement/web", function(json) {
    var tr;
    for (var i = 0; i < json.length - 1; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + json[i].title + "</td>");
      let temp = "";
      for (var j = 0; j < json[i].product.length; j++) {
        if (j === 0) {
          temp = temp + json[i].product[j].name;
        } else {
          temp = temp + " | " + json[i].product[j].name;
        }
      }
      tr.append("<td>" + temp + "</td>");
      tr.append(
        "<td>" +
          "<button class='delButton' name=" +
          json[i]._id +
          ">X</button>" +
          "</td>"
      );
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

    let pro = json[json.length - 1];
    for (var i = 0; i < pro.length; i++) {
      $("#category").append(
        "<option value='" +
          JSON.stringify(pro[i]) +
          "'" +
          ">" +
          pro[i].name +
          "</option>"
      );
    }

    $(".delButton").click(function(e) {
      e.preventDefault();

      let id = $(this).attr("name");

      $.ajax({
        type: "POST",
        url: "http://139.59.14.141:2000/api/advertisement/delete/" + id,
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
    $("#advertiseForm").show();

    e.preventDefault();
  });

  $("#advertiseForm").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var url = "http://139.59.14.141:2000/api/advertisement/add";

    console.log(formData);

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  });
});
