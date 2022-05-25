$(document).ready(function() {
  sigortaCiniUserLocation.init();
  $("#btnParameterAdd").click(function() {
    $("#parameter_name").val("");
    $("#IsParameterActive").attr("checked", false);
    $("#AddParameterModal").modal("show");
  });
});

var sigortaCiniUserLocation = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#parameter_name").val() == "") {
        error("Satış Kanal Tipi Adını boş geçmeyiniz.");
        return;
      }

      var isActive = false;
      if ($("#IsParameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();
      $.ajax({
        url: "/UserSellingChannel/CreateUserSellingChannelType",
        type: "POST",
        data: {
          UserSellingName: $("#parameter_name").val(),
          State: isActive
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
          } else {
            sigortaCiniUserLocation.getall();
            $("#AddParameterModal").modal("hide");
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  update: function() {
    $("#parameterUpdate").click(function() {
      if ($("#parameter_name_update").val() == "") {
        error("Satış Kanal Tipi Adını boş geçmeyiniz.");
        return;
      }

      var isUpdateActive = false;
      if ($("#IsParameterUpdateActive").attr("checked") == "checked") {
        isUpdateActive = true;
      }

      showLoader();

      $.ajax({
        url: "/UserSellingChannel/UpdateUserSellingChannelType",
        type: "PUT",
        data: {
          UserSellingId: $("#parameterId").val(),
          UserSellingName: $("#parameter_name_update").val(),
          State: isUpdateActive
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
          } else {
            sigortaCiniUserLocation.getall();
            $("#UpdateParameterModal").modal("hide");
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  getall: function() {
    showLoader();
    $.ajax({
      url: "/UserSellingChannel/GetAllUserSellingChannelType",
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
          sigortaCiniUserLocation.fillDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
    $("#parameter_table").DataTable({
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
        { data: "userSellingName" },
        {
          data: "state",
          render: function(data, type, row) {
            if (data == false) {
              return "Aktif Değil";
            } else {
              return "Aktif";
            }
          }
        }
      ]
    });

    sigortaCiniUserLocation.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniUserLocation.get(data.userSellingId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/UserSellingChannel/GetSellingChannelType",
      type: "GET",
      dataType: "json",
      data: {
        id: id
      },

      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        } else {
          $("#UpdateParameterModal").modal("show");
          $("#parameter_name_update").val(dataSet.data.userSellingName);
          if (dataSet.data.state) {
            $("#IsParameterUpdateActive").prop("checked", true);
          } else {
            $("#IsParameterUpdateActive").prop("checked", false);
          }
          $("#parameterId").val(dataSet.data.userSellingId);

          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};
