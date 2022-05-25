$(document).ready(function() {
  SigortaCiniCodeResult.init();
  $("#codeModala").modal("show");
});

$("#organ").on("change", function() {
  if ($("#organ").val() == "") {
    $("#btnAddCode").attr("disabled", "disabled");
    return;
  }
  $("#btnAddCode").removeAttr("disabled", "disabled");
  var optionValue = $(this).val();
  $("#codeId").val(optionValue);
});

$("#btnpr").click(function(e) {
  $("#organ")
    .val("0")
    .select2();
  $("#btnAddCode").attr("disabled", "disabled");
  $("#codeModala").modal("show");
});
var SigortaCiniCodeResult = {
  init: function() {
    this.getall();
    this.getOrgs();
  },

  getOrgs: function() {
    showLoader();
    $("#organ").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/Organization/GetAll",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        } else {
          $.each(dataSet.data, function(index, value) {
            $("#organ ").append(
              new Option(value.organizationName, value.organizationId)
            );
          });
          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getall: function() {
    $("#btnAddCode").on("click", function() {
      $("#codeModala").modal("hide");
      showLoader();
      $.ajax({
        url: "/CampaignCode/SearchCampaignCode",
        type: "POST",
        data: {
          OrganizationId: $("#codeId").val()
        },
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
            SigortaCiniCodeResult.fillDataTable(dataSet.data);
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

  fillDataTable: function(dataInput) {
    $("#resultTable").DataTable({
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
        { data: "campaignCodeValue" },
        { data: "userFullName" },
        { data: "taskStatus" },
        { data: "policyStatus" }
      ]
    });

    SigortaCiniCodeResult.datatableClick();
  },

  datatableClick: function() {
    $("#resultTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#resultTable").DataTable();
      var data = table.row(this).data();
      SigortaCiniCodeResult.get(data.taskId);
      $("#types").modal("hide");
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/CampaignCode/GetAllDetail",
      type: "POST",
      dataType: "json",
      data: {
        TaskId: id,
        OrganizationId: $("#codeId").val()
      },

      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        } else {
          $("#task_code").val(dataSet.data[0].taskCode);
          $("#policy_code").val(dataSet.data[0].policyCode);
          $("#full_name").val(dataSet.data[0].customer.customerFullName);
          $("#identification_no").val(
            dataSet.data[0].customer.identificationNo
          );
          $("#license_no").val(
            dataSet.data[0].taskAssetVehicle.customerAsset.licenseNumber
          );
          $("#plate").val(
            dataSet.data[0].taskAssetVehicle.customerAsset.plateNumber
          );

          $("#resultDetails").modal("show");
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
