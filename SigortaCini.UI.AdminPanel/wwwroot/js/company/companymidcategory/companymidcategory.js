$(document).ready(function() {
  sigortaCiniCompanyMidCategory.init();
  $("#selectAll").click(function() {
    var checked = $(this).prop("checked");
    $(".categoriesCheckBox")
      .find("input:checkbox")
      .prop("checked", checked);
  });
});

var sigortaCiniCompanyMidCategory = {
  init: function() {
    this.getList();
    this.save();
  },

  save: function() {
    $("#save").click(function(e) {
      e.preventDefault();
      var companies = [];
      $(".checkboxUsers").each(function(index) {
        if (this.checked == true) {
          companies.push(this.value);
        }
      });
      if (companies.length == 0) {
        error("Şirketlerden en az birini seçiniz");
        return;
      }
      showLoader();
      $.ajax({
        url:
          "/CompanyProductMidCategory/UpdateCompanyProductMidCategoriesByEgmTramer",
        type: "POST",
        dataType: "json",
        data: {
          ProductId: "102",
          CompanyMidCatIds: companies
        },

        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            console.log(dataSet);
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            hideLoader();
            error(dataSet.message);
            return;
          } else {
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

  fillDataTable: function(dataInput) {
    $(".categoriesCheckBox").html("");
    var htmlStr = "";
    $.each(dataInput, function(index, item) {
      var checked = "";
      if (item.isB2bActive) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsers " id="checkboxUsers' +
        item.companyProductMidCatId +
        '" value="' +
        item.companyProductMidCatId +
        '">' +
        item.company.companyName +
        "</label>";
      htmlStr += "</div>";
    });
    $(".categoriesCheckBox").html(htmlStr);
    hideLoader();
  },

  getList: function() {
    showLoader();
    $.ajax({
      url: "/CompanyProductMidCategory/GetAllByEgmTramer",
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
          sigortaCiniCompanyMidCategory.fillDataTable(dataSet.data);
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};
