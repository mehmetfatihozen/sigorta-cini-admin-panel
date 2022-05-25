var table;
$(document).ready(function() {
  sigortaCiniTaskDocumentType.init();
  $("#btnTaskDocumentTypeOpenModal").click(function() {
    $("#myModalTaskDocumentType").modal("show");
    $("#TaskDocumentTypeName").val("");
    $("#TaskDocumentTypeImage").val("");
    $("#TaskDocumentTypeDesc").val("");
    $(".TaskDocumentTypeIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#TaskDocumentTypeIsActive").attr("checked", "checked");
  });
});
var sigortaCiniTaskDocumentType = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },
  create: function() {
    $("#btnTaskDocumentTypeAdd").click(function() {
      if (
        $("#TaskDocumentTypeName").val().length == 0 ||
        $("#TaskDocumentTypeImage").val().length == 0 ||
        $("#TaskDocumentTypeDesc").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      var TaskDocumentTypeId = 0;

      $.ajax({
        url: "/TaskDocumentType/Create",
        type: "POST",
        data: {
          TaskDocumentTypeId: TaskDocumentTypeId,
          TaskDocumentTypeName: $("#TaskDocumentTypeName").val(),
          TaskDocumentTypeImage: $("#TaskDocumentTypeImage").val(),
          TaskDocumentTypeDesc: $("#TaskDocumentTypeDesc").val()
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
            $("#myModalTaskDocumentType").modal("hide");
            sigortaCiniTaskDocumentType.getall();
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },
  update: function() {
    $("#btnTaskDocumentTypeUpdate").click(function() {
      if (
        $("#TaskDocumentTypeNameUpdate").val().length == 0 ||
        $("#TaskDocumentTypeImageUpdate").val().length == 0 ||
        $("#TaskDocumentTypeDescUpdate").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }

      showLoader();

      $.ajax({
        url: "/TaskDocumentType/Update",
        type: "POST",
        data: {
          TaskDocumentTypeId: $("#TaskDocumentTypeId").val(),
          TaskDocumentTypeName: $("#TaskDocumentTypeNameUpdate").val(),
          TaskDocumentTypeImage: $("#TaskDocumentTypeImageUpdate").val(),
          TaskDocumentTypeDesc: $("#TaskDocumentTypeDescUpdate").val()
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
            $("#myModalTaskDocumentTypeUpdate").modal("hide");
            sigortaCiniTaskDocumentType.getall();
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  getall: function() {
    $("#sampleTaskDocumentType_2").DataTable({
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
      ajax: {
        type: "GET",
        url: "/TaskDocumentType/GetAll",
        dataSrc: "data"
      },
      columns: [
        { data: "taskDocumentTypeImage" },
        { data: "taskDocumentTypeName" },
        { data: "taskDocumentTypeDesc" }
      ]
    });

    sigortaCiniTaskDocumentType.datatableDoubleClick();
  },

  datatableDoubleClick: function() {
    $("#sampleTaskDocumentType_2 tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#sampleTaskDocumentType_2").DataTable();
      var data = table.row(this).data();
      sigortaCiniTaskDocumentType.get(data.taskDocumentTypeId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/TaskDocumentType/get",
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
          $("#TaskDocumentTypeNameUpdate").val(
            dataSet.data.taskDocumentTypeName
          );
          $("#TaskDocumentTypeDescUpdate").val(
            dataSet.data.taskDocumentTypeDesc
          );
          $("#TaskDocumentTypeImageUpdate").val(
            dataSet.data.taskDocumentTypeImage
          );

          $("#TaskDocumentTypeId").val(dataSet.data.taskDocumentTypeId);
          $("#myModalTaskDocumentTypeUpdate").modal("show");
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
