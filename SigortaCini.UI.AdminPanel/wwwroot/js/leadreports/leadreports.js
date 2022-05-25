$(document).ready(function() {
  sigortaCiniLeadReports.init();
  $("#start_date_lead_reports").datepicker();
  $("#end_date_lead_reports").datepicker();

  $("#selectAllProducts").click(function() {
    if ($("#selectAllProducts").is(":checked")) {
      $("#products > option").prop("selected", "selected");
      $("#products").trigger("change");
    } else {
      $("#products > option").removeAttr("selected");
      $("#products").trigger("change");
    }
  });
});
var sigortaCiniLeadReports = {
  init: function() {
    this.getAll();
    this.getProducts();
    this.getLeadTypes();
    this.clear();
  },

  getLeadTypes: function() {
    showLoader();
    $("#leads").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/LeadType/GetAll",
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
            $("#leads").append(new Option(item.leadTypeName, item.leadTypeId));
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

  getAll: function() {
    $("#btnList").click(function(e) {
      e.preventDefault();
      if ($("#products").val() == null || $("#products").val() == "") {
        error("Lütfen ürünlerden en az bir tanesini seçiniz.");
        return;
      }

      if (
        graterThan(
          $("#end_date_lead_reports").val(),
          null,
          $("#start_date_lead_reports").val()
        )
      ) {
        error("Lütfen tarih aralığını doğru giriniz.");
        return;
      }

      if ($("#leads").val() == "") {
        error("Lütfen ortam seçiniz.");
        return;
      }

      if ($("#start_date_lead_reports").val() == "") {
        error("Lütfen başlangıç tarihi giriniz.");
        return;
      }

      if ($("#end_date_lead_reports").val() == "") {
        error("Lütfen bitiş tarihi giriniz.");
        return;
      }

      showLoader();
      var _start_picker = $("#start_date_lead_reports").val();
      _start_picker += " 12:00:00";

      var end_picker = $("#end_date_lead_reports").val();
      end_picker += " 12:00:00";

      $.ajax({
        url: "/LeadReports/GetLeadReports",
        type: "POST",
        data: {
          ProductIdList: $("#products").val(),
          FromDate: _start_picker,
          ToDate: end_picker,
          LeadTypeId: $("#leads").val()
        },
        dataType: "json",
        success: function(response) {
          if (response == null) {
            error("Sistemde bir hata oluştu");
          } else if (response.hasError) {
            error(response.message);
          } else {
            console.log(response.data);
            sigortaCiniLeadReports.fillDataTable(response.data);
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
    $("#leadReportsTable").DataTable({
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
        { data: "leadId" },
        { data: "leadTypeName" },
        { data: "leadSourceTypeName" },
        { data: "leadAssignUserName" },
        { data: "leadProductName" },
        { data: "customerNameSurname" },
        { data: "customerPhone" },
        {
          data: "insertedDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        },

        {
          data: "firstCallDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        },
        {
          data: "processDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        },

        {
          data: "sysParentCode"
        },
        {
          data: "sysChildCode"
        },
        {
          data: "assignedUserNote"
        }
      ]
    });
  },

  clear: function() {
    $("#btn_clear").click(function(e) {
      e.preventDefault();
      $("#products")
        .val("")
        .select2();
      $("#leads")
        .val("")
        .select2();
      $("#start_date_lead_reports").val("");
      $("#end_date_lead_reports").val("");
      $("#selectAllProducts").attr("checked", false);
    });
  },

  getProducts: function() {
    showLoader();
    $("#products").html(
      '<option disabled="disabled" value="">Seçiniz</option>'
    );
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
            $("#products").append(
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
  }
};
