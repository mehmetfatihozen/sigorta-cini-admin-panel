var table;

$(document).ready(function() {
  sigortaCiniCompanyInsuranceActivity.init();
});

var sigortaCiniCompanyInsuranceActivity = {
  init: function() {
    this.save();
    this.getallCompany();
    this.getCompanySettings();
  },

  getCompanySettings: function() {
    $(".ddlCompaniesInsuranceActivity").change(function() {
      if ($("#ddlCompaniesInsuranceActivity").val() == 0) {
        $(".portlet-body").removeClass("h-350");
        $("#alt_content").addClass("hide");
        $("#btnCompaniesInsuranceActivitySave").addClass("hide");
        hideLoader();
        return;
      }
      showLoader();

      $.ajax({
        url: "/CompanyInsuranceActivity/GetSettingsByCompanyId",
        type: "GET",
        dataType: "json",
        data: { companyId: $("#ddlCompaniesInsuranceActivity").val() },
        success: function(dataSet) {
          if (dataSet == null) {
            $(".content-loader").hide();
            $("#alt_content").addClass("hide");
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            $(".content-loader").hide();
            $("#alt_content").addClass("hide");
            error(dataSet.message);
          } else if (dataSet.data.length == 0) {
            hideLoader();
            $(".portlet-body").removeClass("h-350");
            $("#alt_no_data_content").removeClass("hide");
            $("#alt_content").addClass("hide");
          } else {
            sigortaCiniCompanyInsuranceActivity.fillDataTable(dataSet.data);
            $("#alt_content").removeClass("hide");
            $("#alt_no_data_content").addClass("hide");
            $(".portlet-body").addClass("h-350");
            $("#btnCompaniesInsuranceActivitySave").removeClass("hide");
            hideLoader();
          }
        },
        error: function(errorThrown) {
          $("#alt_content").hide();
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  fillDataTable: function(dataInput) {
    $(".productsCheckBox").html("");
    var htmlStr = "";
    $.each(dataInput, function(itemId, item) {
      var checked = "";
      if (item.isActive) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checboxProducts " id="checboxProducts' +
        item.companyInsuranceActivityId +
        '" value="' +
        item.companyInsuranceActivityId +
        '">' +
        item.productName +
        " ( " +
        item.variantId +
        " ) " +
        "</label>";
      htmlStr += "</div>";
    });
    $(".productsCheckBox").html(htmlStr);
  },

  save: function() {
    $("#btnCompaniesInsuranceActivitySave").click(function() {
      var selectedCompany = $("#ddlCompaniesInsuranceActivity").val();
      if (selectedCompany.length <= 0) {
        error("Önce şirket seçiniz");
        return;
      }
      var products = [];
      $(".checboxProducts").each(function(index) {
        if (this.checked) {
          products.push(parseInt(this.value));
        }
      });
      if (products.length == 0) {
        error("Ürünlerden en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/CompanyInsuranceActivity/SaveCompanyInsuranceActivity",
        type: "POST",
        dataType: "json",
        data: {
          CompanyId: selectedCompany,
          ProductIds: products
        },
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
            hideLoader();
            success("Başarıyla kaydedildi");
            sigortaCiniCompanyInsuranceActivity.getCompanySettings(
              dataSet.data[0].companyId
            );
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
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
            $("#ddlCompaniesInsuranceActivity").append(
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
