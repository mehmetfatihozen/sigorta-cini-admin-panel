$(document).ready(function() {
  sigortaCiniClicky.init();
  $('[data-toggle="tooltip"]').tooltip({
    container: "body"
  });

  $("#refresh_manuel").click(function(e) {
    e.preventDefault();
    window.location.reload();
  });
});

var sigortaCiniClicky = {
  init: function() {
    this.getData();
  },

  getData: function() {
    showLoader();
    $.ajax({
      url: "/Clicky/GetStatAllType",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
          return;
        } else {
          $("#liveUserCount").text(dataSet.data[0].dates[0].items[0].value);
          $("#sumUserCount").text(dataSet.data[1].dates[0].items[0].value);
          $("#actionsCount").text(dataSet.data[2].dates[0].items[0].value);
          $("#actionsAverageCount").text(
            dataSet.data[3].dates[0].items[0].value
          );
          var averageMinute = Math.floor(
            dataSet.data[4].dates[0].items[0].value / 60
          );
          $("#timeAverageCount").text(averageMinute + " Dakika");
          var totalMinute = Math.floor(
            dataSet.data[5].dates[0].items[0].value / 60
          );
          $("#timeTotalCount").text(totalMinute + " Dakika");
          $("#bounceRate").text(dataSet.data[6].dates[0].items[0].value + "%");
          $("#searches").text(dataSet.data[7].dates[0].items[0]);
          $("#visitors_table").DataTable({
            language: {
              sDecimal: ",",
              sEmptyTable: "Tabloda herhangi bir veri mevcut değil",
              sInfo:
                "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
              sInfoEmpty: "Kayıt yok",
              sInfoFiltered: "(_MAX_ kayıt içerisinden bulunan)",
              sInfoPostFix: "",
              sInfoThousands: ".",
              sLengthMenu: "Sayfada _MENU_ kayıt göster",
              sLoadingRecords: "Yükleniyor...",
              sProcessing: "İşleniyor...",
              sSearch: "Ara:",
              sZeroRecords: "Eşleşen kayıt bulunamadı",
              oPaginate: {
                sFirst: "İlk",
                sLast: "Son",
                sNext: "Sonraki",
                sPrevious: "Önceki"
              },
              oAria: {
                sSortAscending: ": artan sütun sıralamasını aktifleştir",
                sSortDescending: ": azalan sütun sıralamasını aktifleştir"
              },
              select: {
                rows: {
                  _: "%d kayıt seçildi",
                  "0": "",
                  "1": "1 kayıt seçildi"
                }
              }
              },
            order: [],
            paging: true,
            searching: true,
            responsive: true,
            destroy: true,
            data: dataSet.data[8].dates[0].items,
            columns: [
              //{ "data": "ip_address" },
              { data: "geolocation" },
              { data: "landing_page" },
              { data: "web_browser" },
              { data: "operating_system" },
              { data: "screen_resolution" },
              { data: "language" },
              { data: "referrer_type" },
              {
                data: "referrer_url",
                defaultContent: ""
              },
              {
                data: "referrer_domain",
                defaultContent: ""
              },
              { data: "organization" },
              { data: "time_pretty" }
            ]
          });
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    }).done(function() {
      sigortaCiniClicky.drawGraphs();
    });
  },

  drawGraphs: function() {
    showLoader();
    var action_canvas = document.getElementById("action-canvas");
    var myChart = new Chart(action_canvas, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderWidth: 1,
            backgroundColor: "#F79552",
            borderColor: "#000000",
            label: "Aksiyon Sayısı"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Saat Bazında Aksiyon Sayısı"
        }
      }
    });
    $.ajax({
      url: "/Clicky/GetStatByActionType",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
          return;
        } else {
          for (i = 0; i < dataSet.data[0].dates[0].items.length; i++) {
            dataSet.data[0].dates[0].items[i].hour = parseInt(
              dataSet.data[0].dates[0].items[i].hour,
              10
            );
          }

          var tmpArray = dataSet.data[0].dates[0].items.sort(
            (a, b) => (a.hour > b.hour ? 1 : -1)
          );

          $.each(tmpArray, function(i, valueOfElement) {
            if (valueOfElement.hour.toString().length == "2") {
              myChart.data.labels.push(valueOfElement.hour + ":00");
            } else {
              myChart.data.labels.push("0" + valueOfElement.hour + ":00");
            }
            myChart.data.datasets[0].data.push(valueOfElement.value);
          });
        }

        sigortaCiniClicky.getUserGraph();
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getUserGraph: function() {
    var user_canvas = document.getElementById("user-canvas");
    var myChart = new Chart(user_canvas, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderWidth: 1,
            backgroundColor: "#F79552",
            borderColor: "#000000",
            label: "Kullanıcı Sayısı"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Saat Bazında Kullanıcı Sayısı"
        }
      }
    });

    $.ajax({
      url: "/Clicky/GetStatByVisitorsType",
      type: "GET",
      dataType: "json",
      success: function(response) {
        if (response == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
          return;
        } else if (response.hasError) {
          hideLoader();
          error(response.message);
          return;
        } else {
          for (i = 0; i < response.data[0].dates[0].items.length; i++) {
            response.data[0].dates[0].items[i].hour = parseInt(
              response.data[0].dates[0].items[i].hour,
              10
            );
          }

          var tmpArray = response.data[0].dates[0].items.sort(
            (a, b) => (a.hour > b.hour ? 1 : -1)
          );

          $.each(tmpArray, function(i, valueOfElement) {
            if (valueOfElement.hour.toString().length == "2") {
              myChart.data.labels.push(valueOfElement.hour + ":00");
            } else {
              myChart.data.labels.push("0" + valueOfElement.hour + ":00");
            }
            myChart.data.datasets[0].data.push(valueOfElement.value);
          });
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    }).done(function() {
      sigortaCiniClicky.start(59);
      hideLoader();
    });
  },

  start: function(num) {
    var element = $(".counter");
    for (var i = 0; i <= num; i += 1) {
      setTimeout(function() {
        if (num === 0) {
          window.location.reload();
        }
        element.html(num--);
      }, i * 1000);
    }
  }
};
