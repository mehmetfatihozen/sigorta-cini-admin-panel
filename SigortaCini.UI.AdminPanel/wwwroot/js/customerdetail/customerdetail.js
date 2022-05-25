$(document).ready(function() {
  sigortaCiniCustomerDetail.init();
  var counter;
  counter = 0;
  $("#leadContent").click(function(e) {
    e.preventDefault();
    if (counter == 0) {
      sigortaCiniCustomerDetail.getAllLeads();
      counter++;
    }
  });
});

var sigortaCiniCustomerDetail = {
  init: function() {
    this.getallCustomer();
    this.clear();
  },

  getallCustomer: function() {
    showLoader();
    $.ajax({
      url: "/CustomerDetail/GetAll",
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
          sigortaCiniCustomerDetail.fillDataTable(dataSet.data, 1);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getAllLeads: function() {
    showLoader();
    $.ajax({
      url: "/CustomerDetail/GetAllLead",
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
          sigortaCiniCustomerDetail.fillDataTable(dataSet.data, 2);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput, type) {
    if (type == 1) {
      $("#customerTable").DataTable({
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
          //{
          //    extend: 'csvHtml5',
          //    text: '<i class="fa fa-file-text-o"></i> CSV',
          //    titleAttr: 'CSV',
          //    className: 'export-csv-button'

          //},
          //{
          //    extend: 'pdfHtml5',
          //    text: '<i class="fa fa-file-pdf-o"></i> PDF',
          //    titleAttr: 'PDF',
          //    className: 'export-pdf-button'

          //}
        ],
        data: dataInput,
        columns: [
          { data: "name" },
          { data: "surname" },
          { data: "lastPhone" },
          { data: "lastEmail" },
          { data: "currentProductName" },
          { data: "status" },
          {
            data: "createDate",
            render: function(data, type, row) {
              return letFormat(
                new Date(data)
                  .toUTCString()
                  .split(",")[1]
                  .replace("GMT", "")
              );
            }
          }
        ]
      });

      sigortaCiniCustomerDetail.datatableClick();
    } else {
      $("#leadTable").DataTable({
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
        responsive: true,
        destroy: true,
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
          { data: "identificationNo" },
          { data: "b2CInfo.name" },
          { data: "b2CInfo.surname" },
          { data: "currentProductName" },
          { data: "status" },
          {
            data: "createDate",
            render: function(data, type, row) {
              return letFormat(
                new Date(data)
                  .toUTCString()
                  .split(",")[1]
                  .replace("GMT", "")
              );
            }
          }
        ]
      });

      sigortaCiniCustomerDetail.datatableClickLead();
    }
  },

  datatableClick: function() {
    $("#customerTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#customerTable").DataTable();
      var data = table.row(this).data();
      sigortaCiniCustomerDetail.get(data.id, 1);
    });
  },

  datatableClickLead: function() {
    $("#leadTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#leadTable").DataTable();
      var data = table.row(this).data();
      sigortaCiniCustomerDetail.get(data.id, 2);
    });
  },

  get: function(id, type) {
    if (type == 1) {
      showLoader();

      $.ajax({
        url: "/CustomerDetail/GetById",
        type: "POST",
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
            $("#name").val(dataSet.data.name);
            $("#surname").val(dataSet.data.surname);
            $("#identificationNo").val(dataSet.data.identificationNo);
            var birthDate = new Date(dataSet.data.birthDate).toLocaleDateString(
              "tr-TR"
            );
            $("#birthDate").val(birthDate);
            var create = letFormat(
              new Date(dataSet.data.createDate)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
            $("#createDate").val(create);

            if (dataSet.data.gender == "E") {
              $("#gender").val("Erkek");
            } else if (dataSet.data.gender == "K") {
              $("#gender").val("Erkek");
            } else {
              $("#gender").val("");
            }

            //$.each(dataSet.data.productList, function (indexInArray, valueOfElement) {
            //    var option = new Option(valueOfElement.productMidCatDesc, valueOfElement.productMidCatId, true, true);
            //    $('#productsList').append(option).trigger('change');
            //    $('#productsList').trigger({
            //        type: 'select2:select',
            //        params: {
            //            data: valueOfElement.productMidCatDesc
            //        }
            //    });

            //});

            $.each(dataSet.data.phoneList, function(
              indexInArray,
              valueOfElement
            ) {
              var option = new Option(valueOfElement, indexInArray, true, true);
              $("#phonesList")
                .append(option)
                .trigger("change");
              $("#phonesList").trigger({
                type: "select2:select",
                params: {
                  data: valueOfElement
                }
              });
            });

            $.each(dataSet.data.emailList, function(
              indexInArray,
              valueOfElement
            ) {
              var option = new Option(valueOfElement, indexInArray, true, true);
              $("#emailsList")
                .append(option)
                .trigger("change");
              $("#emailsList").trigger({
                type: "select2:select",
                params: {
                  data: valueOfElement
                }
              });
            });

            $("#customerDetails").modal({
              backdrop: "static",
              keyboard: false
            });
            $("#customerDetails").modal("show");
            hideLoader();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    } else {
      showLoader();

      $.ajax({
        url: "/CustomerDetail/GetLeadById",
        type: "POST",
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
            $("#identificationNoLead").val(dataSet.data.identificationNo);
            var create = letFormat(
              new Date(dataSet.data.createDate)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
            $("#createDateLead").val(create);
            $("#leadName").val(dataSet.data.b2CInfo.name);
            $("#leadSurname").val(dataSet.data.b2CInfo.surname);
            $("#leadEmail").val(dataSet.data.b2CInfo.email);
            $("#leadPhone").val(dataSet.data.b2CInfo.phoneNumber);
            //$('#productCountLead').val(dataSet.data.productCount);

            //$.each(dataSet.data.productList, function (indexInArray, valueOfElement) {
            //    var option = new Option(valueOfElement.productMidCatDesc, valueOfElement.productMidCatId, true, true);
            //    $('#productsListLead').append(option).trigger('change');
            //    $('#productsListLead').trigger({
            //        type: 'select2:select',
            //        params: {
            //            data: valueOfElement.productMidCatDesc
            //        }
            //    });

            //});

            $("#leadDetails").modal({
              backdrop: "static",
              keyboard: false
            });
            $("#leadDetails").modal("show");
            hideLoader();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    }
  },

  clear: function() {
    $(".modal-close-icon").click(function(e) {
      e.preventDefault();
      $("#phonesList")
        .val("")
        .select2();
      $("#emailsList")
        .val("")
        .select2();
      //$('#productsList').val("").select2();
      //$('#productsListLead').val("").select2();
    });
    $(".btn-danger").click(function(e) {
      e.preventDefault();
      $("#phonesList")
        .val("")
        .select2();
      $("#emailsList")
        .val("")
        .select2();
      //$('#productsList').val("").select2();
      //$('#productsListLead').val("").select2();
    });
  }
};
