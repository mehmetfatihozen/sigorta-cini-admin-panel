var table;
$(document).ready(function() {
  sigortaCiniVehicleUseType.init();
  $("#btnVehicleUseTypeOpenModal").click(function() {
    $("#myModalVehicleUseType").modal("show");
    $("#VehicleUseTypeName").val("");
    $("#VehicleUseTypeDesc").val("");
    $("#VehicleUseTypeCode").val("");
    $(".VehicleUseTypeIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#VehicleUseTypeIsActive").attr("checked", "checked");
  });
});
var sigortaCiniVehicleUseType = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },
  create: function() {
    $("#btnVehicleUseTypeAdd").click(function() {
      if (
        $("#VehicleUseTypeName").val().length == 0 ||
        $("#VehicleUseTypeCode").val().length == 0 ||
        $("#VehicleUseTypeDesc").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      var VehicleUseTypeId = 0;
      var isActive = false;
      if ($("#VehicleUseTypeIsActive").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/VehicleUseType/Create",
        type: "POST",
        data: {
          vehicleUseTypeId: VehicleUseTypeId,
          vehicleUseTypeName: $("#VehicleUseTypeName").val(),
          vehicleUseTypeCode: $("#VehicleUseTypeCode").val(),
          vehicleUseTypeDesc: $("#VehicleUseTypeDesc").val(),
          vehicleUseTypeState: isActive
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
            $("#myModalVehicleUseType").modal("hide");
            sigortaCiniVehicleUseType.getall();
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
    $("#btnVehicleUseTypeUpdate").click(function() {
      if (
        $("#VehicleUseTypeNameUpdate").val().length == 0 ||
        $("#VehicleUseTypeCodeUpdate").val().length == 0 ||
        $("#VehicleUseTypeDescUpdate").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }

      showLoader();
      var VehicleUseTypeIdVal = $("#VehicleUseTypeId").val();

      var isActive = false;
      if ($("#VehicleUseTypeIsActiveUpdate").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/VehicleUseType/Update",
        type: "POST",
        data: {
          VehicleUseTypeId: VehicleUseTypeIdVal,
          VehicleUseTypeName: $("#VehicleUseTypeNameUpdate").val(),
          VehicleUseTypeCode: $("#VehicleUseTypeCodeUpdate").val(),
          VehicleUseTypeDesc: $("#VehicleUseTypeDescUpdate").val(),
          VehicleUseTypeState: isActive
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
            $("#myModalVehicleUseUpdateType").modal("hide");
            sigortaCiniVehicleUseType.getall();
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
    showLoader();

    $("#sampleVehicleUseType_2").DataTable({
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
        url: "/VehicleUseType/GetAll",
        dataSrc: "data"
      },
      columns: [
        { data: "vehicleUseTypeCode" },
        { data: "vehicleUseTypeName" },
        { data: "vehicleUseTypeDesc" },
        { data: "state" }
      ]
    });

    sigortaCiniVehicleUseType.datatableDoubleClick();
    hideLoader();
  },

  datatableDoubleClick: function() {
    $("#sampleVehicleUseType_2 tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#sampleVehicleUseType_2").DataTable();
      var data = table.row(this).data();
      sigortaCiniVehicleUseType.get(data.vehicleUseTypeId);
    });
  },

  get: function(id) {
    showLoader();
    $.ajax({
      url: "/VehicleUseType/get",
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
          $("#VehicleUseTypeNameUpdate").val(dataSet.data.vehicleUseTypeName);
          $("#VehicleUseTypeDescUpdate").val(dataSet.data.vehicleUseTypeDesc);
          $("#VehicleUseTypeCodeUpdate").val(dataSet.data.vehicleUseTypeCode);
          if (dataSet.data.vehicleUseTypeState) {
            $(".VehicleUseTypeIsActiveDivUpdate")
              .find("span")
              .addClass("checked");
            $("#VehicleUseTypeIsActiveUpdate").attr("checked", "checked");
          } else {
            $(".VehicleUseTypeIsActiveDivUpdate")
              .find("span")
              .removeClass("checked");
            $("#VehicleUseTypeIsActiveUpdate").removeAttr("checked");
          }
          $("#VehicleUseTypeId").val(dataSet.data.vehicleUseTypeId);
          $("#myModalVehicleUseUpdateType").modal("show");
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
