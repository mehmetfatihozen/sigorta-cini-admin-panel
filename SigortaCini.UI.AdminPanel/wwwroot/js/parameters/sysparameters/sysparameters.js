$(document).ready(function() {
  sigortaCiniSysParameters.init();
  $("#btnParameterAdd").click(function() {
    sigortaCiniSysParameters.clear();
    $("#AddParameterModal").modal("show");
  });
});

var sigortaCiniSysParameters = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  clear: function() {
    $("#parameter_name").val("");
    $("#parameter_id").val("");
    $("#parameter_parent_id").val("");
    $("#system_result").val("");
    $("#score").val("");
    $("#parameter_order_id").val("");

    $("#IsParameterActive").attr("checked", false);
    $("#IsSystemResult").attr("checked", false);
    $("#IsClosingResult").attr("checked", false);
    $("#IsSuccessResult").attr("checked", false);
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#parameter_id").val() == "") {
        error("Id Alanını boş geçmeyiniz.");
        return;
      }

      var isActive = false;
      if ($("#IsParameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      var IsSystemResult = false;
      if ($("#IsSystemResult").attr("checked") == "checked") {
        IsSystemResult = true;
      }

      var IsClosingResult = false;
      if ($("#IsClosingResult").attr("checked") == "checked") {
        IsClosingResult = true;
      }

      var IsSuccessResult = false;
      if ($("#IsSuccessResult").attr("checked") == "checked") {
        IsSuccessResult = true;
      }

      showLoader();
      $.ajax({
        url: "/SysParameters/Create",
        type: "POST",
        data: {
          LeadSysTypeId: $("#parameter_id").val(),
          ParentId: $("#parameter_parent_id").val(),
          Explanation: $("#parameter_name").val(),
          IsSuccessResult: IsSuccessResult,
          IsClosingResult: IsClosingResult,
          IsSystemResult: IsSystemResult,
          SystemResult: $("#system_result").val(),
          Score: $("#score").val(),
          IsEnabled: isActive,
          OrderId: $("#parameter_order_id").val()
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
            sigortaCiniSysParameters.getall();
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
      var IsSystemResult = false;
      if ($("#IsSystemResultUpdate").attr("checked") == "checked") {
        IsSystemResult = true;
      }

      var IsClosingResult = false;
      if ($("#IsClosingResultUpdate").attr("checked") == "checked") {
        IsClosingResult = true;
      }

      var IsSuccessResult = false;
      if ($("#IsSuccessResultUpdate").attr("checked") == "checked") {
        IsSuccessResult = true;
      }

      var isUpdateActive = false;
      if ($("#IsParameterUpdateActive").attr("checked") == "checked") {
        isUpdateActive = true;
      }

      showLoader();

      $.ajax({
        url: "/SysParameters/Update",
        type: "PUT",
        data: {
          LeadSysTypeId: $("#parameter_id_update").val(),
          ParentId: $("#parameter_parent_id_update").val(),
          Explanation: $("#parameter_name_update").val(),
          IsSuccessResult: IsSuccessResult,
          IsClosingResult: IsClosingResult,
          IsSystemResult: IsSystemResult,
          SystemResult: $("#system_result_update").val(),
          Score: $("#score_update").val(),
          IsEnabled: isUpdateActive,
          OrderId: $("#parameter_order_id_update").val()
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
            sigortaCiniSysParameters.getall();
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
      url: "/SysParameters/GetAll",
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
          sigortaCiniSysParameters.fillDataTable(dataSet.data);
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
        { data: "leadSysTypeId" },
        { data: "parentId" },
        { data: "orderId" },
        { data: "explanation" },
        { data: "systemResult" },
        { data: "score" },

        {
          data: "isSystemResult",
          render: function(data, type, row) {
            if (data == false) {
              return "Aktif Değil";
            } else {
              return "Aktif";
            }
          }
        },
        {
          data: "isClosingResult",
          render: function(data, type, row) {
            if (data == false) {
              return "Aktif Değil";
            } else {
              return "Aktif";
            }
          }
        },
        {
          data: "isSuccessResult",
          render: function(data, type, row) {
            if (data == false) {
              return "Aktif Değil";
            } else {
              return "Aktif";
            }
          }
        },
        {
          data: "isEnabled",
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

    sigortaCiniSysParameters.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
        sigortaCiniSysParameters.get(data.leadSysTypeId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/SysParameters/GetById",
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
            $("#parameter_parent_id_update").val(dataSet.data.parentId);
            $("#parameter_order_id_update").val(dataSet.data.orderId);

            $("#system_result_update").val(dataSet.data.systemResult);
            $("#score_update").val(dataSet.data.score);

            $("#parameter_name_update").val(dataSet.data.explanation);


            if (dataSet.data.isSystemResult) {
                $("#IsSystemResultUpdate").prop("checked", true);
            } else {
                $("#IsSystemResultUpdate").prop("checked", false);


            }
            if (dataSet.data.isClosingResult) {
                $("#IsClosingResultUpdate").prop("checked", true);
          } else {
                $("#IsClosingResultUpdate").prop("checked", false);
            }

            if (dataSet.data.isSuccessResult) {
                $("#IsSuccessResultUpdate").prop("checked", true);
            } else {
                $("#IsSuccessResultUpdate").prop("checked", false);
            }

            if (dataSet.data.isEnabled) {
                $("#IsParameterUpdateActive").prop("checked", true);
            } else {
                $("#IsParameterUpdateActive").prop("checked", false);
            }
            $("#parameter_id_update").val(dataSet.data.leadSysTypeId);
            console.log($("#parameter_id_update").val());
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
