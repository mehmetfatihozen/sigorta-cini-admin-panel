$(document).ready(function() {
  sigortaCiniCallCenter.init();
});

var sigortaCiniCallCenter = {
  init: function() {
    this.getall();
  },

  getall: function() {
    showLoader();
    $.ajax({
      url: "/CallCenter/GetAllLead",
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
          sigortaCiniCallCenter.fillDataTable(dataSet.data);
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
    $("#call_center_table").DataTable({
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
      data: dataInput,
      columns: [
        { data: "taskList.0.taskId" },
        { data: "searchValue" },
        { data: "name" },
        { data: "surname" },
        { data: "email" },
        { data: "phone" },
        { data: "productName" },
        {
          data: "createdDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        }
      ]
    });
  }
};
