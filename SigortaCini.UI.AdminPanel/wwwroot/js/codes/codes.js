$(document).ready(function() {
  sigortaCiniCodes.init();
  $("#codeModala").modal("show");
  $("#btnCodeAdd").click(function() {
    if ($("#codeId").val() == 0) {
      error("Lütfen organizasyon seçiniz.");
      return;
    }
    $("#codeModal").modal("show");
    $("#campaign_code_new").val("");
    $(".CampaignIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#CampaignIsActive").attr("checked", "checked");
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
});

$("#btnpr").click(function() {
  $("#organ")
    .val("0")
    .select2();
  $("#codeModala").modal("show");
  $("#btnAddCode").attr("disabled", "disabled");
});
var sigortaCiniCodes = {
  init: function() {
    this.create();
    this.getall();
    this.getOrgs();
    this.update();
    this.getUserId();
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
            $("#organ").append(
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

  getUserId: function() {
    $.ajax({
      url: "/Base/GetCurrentUser",
      type: "POST",

      dataType: "json",
      success: function(data) {
        if (data == null) {
          error("Sistemde bir hata oluştu");
        } else if (data.hasError) {
          error(data.message);
        } else {
          $("#userId").val(data.userId);
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  create: function() {
    $("#btnAddCodesfor").click(function() {
      showLoader();

      if ($("#campaign_code_new").val().length == 0) {
        hideLoader();
        error("Kod alanını boş geçmeyiniz.");
        return;
      }
      var isActive = false;
      if ($("#CampaignIsActive").attr("checked") == "checked") {
        isActive = true;
      }

      $.ajax({
        url: "/CampaignCode/CreateCampaignCode",
        type: "POST",
        data: {
          OrganizationId: $("#codeId").val(),
          CampaignCodeValue: $("#campaign_code_new").val(),
          CampaignCodeState: isActive
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
            sigortaCiniCodes.justgetall();
            $("#codeModal").modal("hide");
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
    $("#btnUpdateCodesfor").click(function() {
      showLoader();

      var isActive = false;
      if ($("#CampaignIsUpdateActive").attr("checked") == "checked") {
        isActive = true;
      }

      $.ajax({
        url: "/CampaignCode/UpdateCampaignCode",
        type: "PUT",
        data: {
          OrganizationId: $("#codeId").val(),
          CampaignCodeId: $("#ccode").val(),
          CampaignCodeValue: $("#campaign_code_update").val(),
          state: isActive
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
            sigortaCiniCodes.justgetall();
            $("#codeModalUpdate").modal("hide");
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

  justgetall: function() {
    showLoader();
    $.ajax({
      url: "/CampaignCode/GetCampaignCodeByOrganizationId",
      type: "GET",
      data: {
        organizationId: $("#codeId").val()
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
          sigortaCiniCodes.fillDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },
  getall: function() {
    $("#btnAddCode").on("click", function() {
      $("#codeModala").modal("hide");
      showLoader();
      $.ajax({
        url: "/CampaignCode/GetCampaignCodeByOrganizationId",
        type: "GET",
        data: {
          organizationId: $("#codeId").val()
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
            sigortaCiniCodes.fillDataTable(dataSet.data);
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
    $("#codeTable").DataTable({
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
      columns: [{ data: "campaingCodeValue" }, { data: "state" }]
    });

    sigortaCiniCodes.datatableClick();
  },

  datatableClick: function() {
    $("#codeTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#codeTable").DataTable();
      var data = table.row(this).data();
      sigortaCiniCodes.get(data.campaignCodeId);
      $("#types").modal("hide");
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/CampaignCode/GetById",
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
          $("#codeModalUpdate").modal("show");
          $("#campaign_code_update").val(dataSet.data.campaingCodeValue);
          $("#ccode").val(dataSet.data.campaignCodeId);

          if (dataSet.data.state) {
            $(".CampaignIsActiveUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#CampaignIsUpdateActive").attr("checked", "checked");
          } else {
            $(".CampaignIsActiveUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#CampaignIsUpdateActive").removeAttr("checked");
          }
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
