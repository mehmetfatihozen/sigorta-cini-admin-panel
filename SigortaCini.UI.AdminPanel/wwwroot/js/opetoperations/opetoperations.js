$(document).ready(function() {
  sigortaCiniOpetOperations.init();
});

var sigortaCiniOpetOperations = {
  init: function() {
    this.getall();
    this.sendAgain();
  },

  sendAgain: function() {
    $("#opet_op_table tbody").on("click", "#send_again", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      showLoader();
      var table = $("#opet_op_table").DataTable();
      var data = table.row($(this).parents("tr")).data();
      $.ajax({
        url: "/OpetOperations/ResendParapuan",
        type: "POST",
        data: {
          id: data.opetParaPuanLogId
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            error(data.message);
          } else {
            sigortaCiniOpetOperations.getall();
            success("Başarıyla kaydedildi");
          }
          hideLoader();
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    });
  },

  getall: function() {
    showLoader();
    $.ajax({
      url: "/OpetOperations/GetAll",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          sigortaCiniOpetOperations.fillDataTable(dataSet.data);
        }
        hideLoader();
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
    $("#opet_op_table").DataTable({
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
      destroy: true,
      responsive: true,
      data: dataInput,
      columns: [
        { data: "phoneNumber" },
        {
          data: "isSend",
          render: function(data, type, row) {
            if (data == false) {
              return "Hayır";
            } else {
              return "Evet";
            }
          }
        },
        { data: "policyId" },
        { data: "taskId" },
        { data: "opetParaPuanLogDesc" },
        {
          data: "opetParaPuanLogDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        },
        {
          data: "isSend",
          render: function(data, type, row) {
            if (data == false) {
              return "<button type='button' id='send_again' class='btn btn-success'>Tekrar Gönder</button>";
            } else {
              return "";
            }
          }
        }
      ]
    });
  }
};
