var table;

$(document).ready(function() {
  sigortaCiniwsConfig.init();

  $(".ddlCompaniesWsConfig").change(function() {
    if ($("#ddlCompaniesWsConfig").val().length <= 0) {
      return;
    }
    var id = parseInt($("#ddlCompaniesWsConfig").val());
    sigortaCiniwsConfig.getCompanySettings(id);
  });
});

var sigortaCiniwsConfig = {
  init: function() {
    this.save();
    this.getallCompany();
  },

  getCompanySettings: function(id) {
    showLoader();
    $.ajax({
      url: "/CompanyWsConfig/GetSettingsByCompanyId",
      type: "GET",
      dataType: "json",
      data: { companyId: id },
      success: function(dataSet) {
        if (dataSet == null) {
          $(".wsConfigDatatableDiv").hide();
          $(".content-loader").hide();
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          $(".wsConfigDatatableDiv").hide();
          $(".content-loader").hide();
          error(dataSet.message);
          return;
        } else if (dataSet.data.length == 0) {
          hideLoader();
          $("#alt_no_data_content").removeClass("hide");
          $(".wsConfigDatatableDiv").hide();
        } else {
          $(".wsConfigDatatableDiv").show();
          $("#alt_no_data_content").addClass("hide");
          sigortaCiniwsConfig.fillDataTable(dataSet.data);
          $(".content-loader").hide();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        $(".wsConfigDatatableDiv").hide();
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
    $("#dataTableCompanyWsConfig").DataTable({
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
        { data: "productName" },
        { data: "companyName" },
        { data: "activeString" },
        { data: "key" },
        { data: "value" }
      ]
    });

    sigortaCiniwsConfig.datatableDoubleClick();
  },

  datatableDoubleClick: function() {
    $("#dataTableCompanyWsConfig tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#dataTableCompanyWsConfig").DataTable();
      var data = table.row(this).data();
      $("#wsConfigProductName").val(data.productName);
      $("#wsConfigCompanyName").val(data.companyName);
      $("#wsConfigKey").val(data.key);
      $("#wsConfigValue").val(data.value);
      $("#wsConfigId").val(data.companyWsId);
      $("#wsConfigProductId").val(data.productId);
      $("#wsCompanyId").val(data.companyId);

      if (data.active) {
        $(".wsConfigIsActiveDiv")
          .find("span")
          .addClass("checked");
        $("#wsConfigIsActive").attr("checked", "checked");
      } else {
        $(".wsConfigIsActiveDiv")
          .find("span")
          .removeClass("checked");
        $("#wsConfigIsActive").removeAttr("checked");
      }

      $("#wsConfigModal").modal("show");
    });
  },

  save: function() {
    $("#btnwsConfigSave").click(function() {
      showLoader();
      var selectedCompany = $("#wsCompanyId").val();
      if (selectedCompany.length <= 0) {
        hideLoader();
        error("Şirket bilgisi boş tekrar deneyiniz");
        return;
      }
      var companyWsId = $("#wsConfigId").val();
      if (companyWsId.length <= 0) {
        hideLoader();
        error("Bir sorun oluştu");
        return;
      }

      var isActive = false;
      if ($("#wsConfigIsActive").attr("checked") == "checked") {
        isActive = true;
      }

      var keyWsConfig = $("#wsConfigKey").val();
      if (keyWsConfig.length <= 0) {
        hideLoader();
        error("Key alanını boş bırakmayın");
        return;
      }

      var valueWsConfig = $("#wsConfigValue").val();
      if (valueWsConfig.length <= 0) {
        hideLoader();
        error("Value alanını boş bırakmayın");
        return;
      }

      $.ajax({
        url: "/CompanyWsConfig/SaveCompanyWsConfig",
        type: "POST",
        dataType: "json",
        data: {
          CompanyWsId: companyWsId,
          Active: isActive,
          Key: keyWsConfig,
          Value: valueWsConfig
        },
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            sigortaCiniwsConfig.getCompanySettings(dataSet.data.companyId);
            $("#wsConfigModal").modal("hide");
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          $("#wsConfigModal").modal("hide");
          hideLoader();
        }
      });
    });
  },

  getallCompany: function() {
    $("#ddlCompanies").html('<option value="">Seçiniz</option>');
    showLoader();
    $.ajax({
      url: "/CPMCategory/GetAllCompanies",
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
          $.each(dataSet.data, function(companyId, company) {
            $("#ddlCompaniesWsConfig").append(
              new Option(company.companyName, company.companyId)
            );
          });
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
