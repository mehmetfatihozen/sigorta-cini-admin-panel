var pcount;
var ccount;
pcount = 0;
ccount = 0;

$(document).ready(function() {
  sigortaCiniBenchmark.init();
  $("#start_date_product").datepicker();
  $("#end_date_product").datepicker();
  $("#start_date_companies").datepicker();
  $("#end_date_companies").datepicker();
  google.charts.load("current", { packages: ["corechart"] });

  $("#selectAllProducts").click(function() {
    if ($("#selectAllProducts").is(":checked")) {
      $("#product_name > option").prop("selected", "selected");
      $("#product_name").trigger("change");
    } else {
      $("#product_name > option").removeAttr("selected");
      $("#product_name").trigger("change");
    }
  });

  $("#selectAllCompanies").click(function() {
    if ($("#selectAllCompanies").is(":checked")) {
      $("#company_name > option").prop("selected", "selected");
      $("#company_name").trigger("change");
    } else {
      $("#company_name > option").removeAttr("selected");
      $("#company_name").trigger("change");
    }
  });
});
var sigortaCiniBenchmark = {
  init: function() {
    this.getProductChart();
    this.getCompaniesChart();
    this.getCompanies();
    this.getProducts();
    this.getTenants();
  },

  getTenants: function() {
    showLoader();
    $("#tenantProducts").html('<option value="">Seçiniz</option>');
    $("#tenantCompanies").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAll",
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
          $.each(dataSet.data, function(index, item) {
            $("#tenantProducts").append(
              new Option(item.tenantName, item.tenantId)
            );
            $("#tenantCompanies").append(
              new Option(item.tenantName, item.tenantId)
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

  getProductChart: function() {
    $("#btnListProduct").click(function(e) {
      e.preventDefault();
      if ($("#product_name").val() == null || $("#product_name").val() == "") {
        error("Lütfen ürünlerden en az bir tanesini seçiniz.");
        return;
      }

      if ($("#tenantProducts").val() == "") {
        error("Lütfen ortam seçiniz.");
        return;
      }

      if ($("#start_date_product").val() == "") {
        error("Lütfen başlangıç tarihi giriniz.");
        return;
      }

      if ($("#end_date_product").val() == "") {
        error("Lütfen bitiş tarihi giriniz.");
        return;
      }

      showLoader();
      var product_start_picker = $("#start_date_product").val();
      product_start_picker += " 12:00:00";

      var product_end_picker = $("#end_date_product").val();
      product_end_picker += " 12:00:00";

      $.ajax({
        url: "/Benchmark/ProductReport",
        type: "POST",
        data: {
          ProductIdList: $("#product_name").val(),
          FromDate: product_start_picker,
          ToDate: product_end_picker,
          TenantId: $("#tenantProducts").val(),
          UserIdList: []
        },
        dataType: "json",
        success: function(response) {
          if (response == null) {
            error("Sistemde bir hata oluştu");
          } else if (response.hasError) {
            error(response.message);
          } else {
            var data = new google.visualization.DataTable();
            data.addColumn("string", "Ürün");
            data.addColumn("number", "Task");
            data.addColumn("number", "Başarılı Teklif");
            data.addColumn("number", "Başarısız Teklif");
            data.addColumn("number", "Poliçe");
            $.each(response.data.productReportList, function(
              i,
              valueOfElement
            ) {
              var product = valueOfElement.productName;
              var sum = valueOfElement.taskCount;
              var successCount = valueOfElement.quotationSuccessCount;
              var failedCount = valueOfElement.quotationErrorCount;
              var policyCount = valueOfElement.policyCount;
              data.addRows([
                [product, sum, successCount, failedCount, policyCount]
              ]);
            });

            var options = {
              title:
                "Ürün Benchmark Grafiği / " +
                " Ortam: " +
                $("#tenantProducts option:selected").text(),
              colors: ["#3366CC", "#109618", "#dc3912", "#FF9900"],
              isStacked: true,
              vAxis: {
                textStyle: {
                  fontSize: 11
                }
              }
            };

            var chart = new google.visualization.BarChart(
              document.getElementById("chart_div_product")
            );
            chart.draw(data, options);

            sigortaCiniBenchmark.fillDataTableForProduct(
              response.data.userBasedProductReportList
            );
          }
          hideLoader();
          if (pcount == 0) {
            $("#btnListProduct").triggerHandler("click");
            pcount++;
            $("#chart_div_product").removeClass("hide");
            $("#product_divider").removeClass("hide");
            $("#product_table").removeClass("hide");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  getCompaniesChart: function() {
    $("#btnListCompany").click(function(e) {
      e.preventDefault();
      if ($("#company_name").val() == null || $("#company_name").val() == "") {
        error("Lütfen şirketlerden en az bir tanesini seçiniz.");
        return;
      }

      if ($("#productForCompanies").val() == "") {
        error("Lütfen ürün seçiniz.");
        return;
      }

      if ($("#tenantCompanies").val() == "") {
        error("Lütfen ortam seçiniz.");
        return;
      }

      if ($("#start_date_companies").val() == "") {
        error("Lütfen başlangıç tarihi giriniz.");
        return;
      }

      if ($("#end_date_companies").val() == "") {
        error("Lütfen bitiş tarihi giriniz.");
        return;
      }

      showLoader();
      var company_start_picker = $("#start_date_companies").val();
      company_start_picker += " 12:00:00";

      var company_end_picker = $("#end_date_companies").val();
      company_end_picker += " 12:00:00";

      $.ajax({
        url: "/Benchmark/CompanyReport",
        type: "POST",
        data: {
          CompanyIdList: $("#company_name").val(),
          ProductId: $("#productForCompanies").val(),
          FromDate: company_start_picker,
          ToDate: company_end_picker,
          TenantId: $("#tenantCompanies").val()
        },
        dataType: "json",
        success: function(response) {
          if (response == null) {
            error("Sistemde bir hata oluştu");
          } else if (response.hasError) {
            error(response.message);
          } else {
            var data_company = new google.visualization.DataTable();
            data_company.addColumn("string", "Şirket");
            data_company.addColumn("number", "Task");
            data_company.addColumn("number", "Başarılı Teklif");
            data_company.addColumn("number", "Başarısız Teklif");
            data_company.addColumn("number", "Poliçe");
            $.each(response.data.companyReportList, function(
              i,
              valueOfElement
            ) {
              var company =
                valueOfElement.companyName +
                " " +
                "(" +
                $("#productForCompanies option:selected").text() +
                ")";
              var taskCountCompany = valueOfElement.taskCount;
              var successCountCompany = valueOfElement.quotationSuccessCount;
              var failedCountCompany = valueOfElement.quotationErrorCount;
              var policyCountCompany = valueOfElement.policyCount;
              data_company.addRows([
                [
                  company,
                  taskCountCompany,
                  successCountCompany,
                  failedCountCompany,
                  policyCountCompany
                ]
              ]);
            });

            var options_company = {
              title:
                "Şirket Benchmark Grafiği / " +
                " Ortam: " +
                $("#tenantCompanies option:selected").text(),
              seriesType: "bars",
              colors: ["#3366CC", "#109618", "#dc3912", "#FF9900"],
              series: { 5: { type: "line" } }
            };

            var chart_company = new google.visualization.ComboChart(
              document.getElementById("chart_div_company")
            );
            chart_company.draw(data_company, options_company);

            sigortaCiniBenchmark.fillDataTableForCompany(
              response.data.userBasedCompanyReportList
            );
          }
          hideLoader();
          if (ccount == 0) {
            $("#btnListCompany").triggerHandler("click");
            ccount++;
            $("#chart_div_company").removeClass("hide");
            $("#company_table").removeClass("hide");
            $("#company_divider").removeClass("hide");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  fillDataTableForProduct: function(dataInput) {
    $("#productTable").DataTable({
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
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          text: '<i class="fa fa-file-excel-o"></i> Excel',
          titleAttr: "Excel",
          className: "export-excell-button"
        }
      ],
      data: dataInput,
      columns: [
        { data: "userName" },
        { data: "name" },
        { data: "surname" },
        { data: "tenantName" },
        { data: "productName" },
        { data: "taskCount" },
        { data: "quotationErrorCount" },
        { data: "quotationSuccessCount" },
        { data: "policyCount" },
        { data: "policyRate" },
        {
          data: "fromDate",
          render: function(data, type, row) {
            return new Date(data).toLocaleDateString("tr-TR");
          }
        },
        {
          data: "toDate",
          render: function(data, type, row) {
            return new Date(data).toLocaleDateString("tr-TR");
          }
        }
      ]
    });
  },

  fillDataTableForCompany: function(dataInput) {
    $("#companyTable").DataTable({
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
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          text: '<i class="fa fa-file-excel-o"></i> Excel',
          titleAttr: "Excel",
          className: "export-excell-button"
        }
      ],
      data: dataInput,
      columns: [
        { data: "userName" },
        { data: "name" },
        { data: "surname" },
        { data: "tenantName" },
        { data: "companyName" },
        {
          data: "companyName",
          render: function(data, type, row) {
            return $("#productForCompanies option:selected").text();
          }
        },
        { data: "taskCount" },
        { data: "quotationErrorCount" },
        { data: "quotationSuccessCount" },
        { data: "policyCount" },
        { data: "policyRate" },
        {
          data: "fromDate",
          render: function(data, type, row) {
            return new Date(data).toLocaleDateString("tr-TR");
          }
        },
        {
          data: "toDate",
          render: function(data, type, row) {
            return new Date(data).toLocaleDateString("tr-TR");
          }
        }
      ]
    });
  },

  getProducts: function() {
    showLoader();
    $("#product_name").html(
      '<option disabled="disabled" value="">Seçiniz</option>'
    );
    $("#productForCompanies").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/ProductMidCategory/GetAllByGroup",
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
          $.each(dataSet.data, function(index, item) {
            $("#product_name").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
            );
            $("#productForCompanies").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
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

  getCompanies: function() {
    showLoader();
    $("#company_name").html(
      '<option disabled="disabled" value="">Seçiniz</option>'
    );
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
          $.each(dataSet.data, function(index, item) {
            $("#company_name").append(
              new Option(item.companyName, item.companyId)
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
  }
};
