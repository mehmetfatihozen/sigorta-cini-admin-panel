var table;
$(document).ready(function() {
  sigortaCiniVehicleType.init();
  $("#btnVehicleTypeOpenModal").click(function() {
    $("#myModalVehicleType").modal("show");
    $("#VehicleTypeName").val("");
    $(".VehicleTypeIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#VehicleTypeIsActive").attr("checked", "checked");
    $("#VehicleTypeDesc").val("");
    $("#VehicleTypeCode").val("");
  });
});
var sigortaCiniVehicleType = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },
  create: function() {
    $("#btnVehicleTypeAdd").click(function() {
      if (
        $("#VehicleTypeName").val().length == 0 ||
        $("#VehicleTypeCode").val().length == 0 ||
        $("#VehicleTypeDesc").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();
      var VehicleTypeId = 0;

      var isActive = false;
      if ($("#VehicleTypeIsActive").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/VehicleType/Create",
        type: "POST",
        data: {
          VehicleTypeId: VehicleTypeId,
          VehicleTypeName: $("#VehicleTypeName").val(),
          VehicleTypeCode: $("#VehicleTypeCode").val(),
          VehicleTypeDesc: $("#VehicleTypeDesc").val(),
          VehicleTypeState: isActive
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            error(data.message);
          } else {
            success("Başarıyla kaydedildi");
            $("#myModalVehicleType").modal("hide");
            sigortaCiniVehicleType.getall();
            hideLoader();
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
    $("#btnVehicleTypeUpdate").click(function() {
      if (
        $("#VehicleTypeNameUpdate").val().length == 0 ||
        $("#VehicleTypeCodeUpdate").val().length == 0 ||
        $("#VehicleTypeDescUpdate").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      var VehicleTypeIdVal = $("#VehicleTypeId").val();

      var isActive = false;
      if ($("#VehicleTypeIsActiveUpdate").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/VehicleType/Update",
        type: "POST",
        data: {
          VehicleTypeId: VehicleTypeIdVal,
          VehicleTypeName: $("#VehicleTypeNameUpdate").val(),
          VehicleTypeCode: $("#VehicleTypeCodeUpdate").val(),
          VehicleTypeDesc: $("#VehicleTypeDescUpdate").val(),
          VehicleTypeState: isActive
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            error(data.message);
          } else {
            success("Başarıyla kaydedildi");
            $("#myModalVehicleTypeUpdate").modal("hide");
            sigortaCiniVehicleType.getall();
            hideLoader();
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
    showLoader();

    $("#sampleVehicleType_2").DataTable({
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
        url: "/VehicleType/GetAll",
        dataSrc: "data"
      },
      columns: [
        { data: "vehicleTypeCode" },
        { data: "vehicleTypeName" },
        { data: "vehicleTypeDesc" },
        { data: "state" }
      ]
    });

    sigortaCiniVehicleType.datatableDoubleClick();
    hideLoader();
  },

  datatableDoubleClick: function() {
    $("#sampleVehicleType_2 tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#sampleVehicleType_2").DataTable();
      var data = table.row(this).data();
      sigortaCiniVehicleType.get(data.vehicleTypeId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/VehicleType/get",
      type: "GET",
      dataType: "json",
      data: {
        id: id
      },
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          error(dataSet.message);
        } else {
          $("#VehicleTypeNameUpdate").val(dataSet.data.vehicleTypeName);
          $("#VehicleTypeDescUpdate").val(dataSet.data.vehicleTypeDesc);
          $("#VehicleTypeCodeUpdate").val(dataSet.data.vehicleTypeCode);
          if (dataSet.data.vehicleTypeState) {
            $(".VehicleTypeIsActiveDivUpdate")
              .find("span")
              .addClass("checked");
            $("#VehicleTypeIsActiveUpdate").attr("checked", "checked");
          } else {
            $(".VehicleTypeIsActiveDivUpdate")
              .find("span")
              .removeClass("checked");
            $("#VehicleTypeIsActiveUpdate").removeAttr("checked");
          }
          $("#VehicleTypeId").val(dataSet.data.vehicleTypeId);
          $("#myModalVehicleTypeUpdate").modal("show");
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  }
};
