$(document).ready(function() {
  sigortaCiniDynamicInsurance.init();
});

var sigortaCiniDynamicInsurance = {
  init: function() {
    this.getList();
    //this.clearInputs();
    //this.getCompanies();
    //this.getProducts();
    //this.update();
  },

  clearInputs: function() {
    $("#btnClear").click(function(e) {
      e.preventDefault();
      $("#company")
        .val("")
        .select2();
      $("#product")
        .val("")
        .select2();
    });
  },

  getCompanies: function() {
    showLoader();
    $("#company").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/CPMCategory/GetAllCompanies",
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
          $.each(dataSet.data, function(index, item) {
            $("#company").append(new Option(item.companyName, item.companyId));
          });
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getProducts: function() {
    showLoader();
    $("#product").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/ProductMidCategory/GetAllByGroup",
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
          $.each(dataSet.data, function(index, item) {
            $("#product").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
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
  },

  update: function() {
    $("#parameterUpdate").click(function(e) {
      e.preventDefault();
      if ($("#description").val() == "") {
        error("Lütfen açıklama giriniz.");
      } else if ($("#value").val() == "") {
        error("Lütfen value giriniz.");
      } else if ($("#output").val() == "") {
        error("Lütfen output giriniz.");
      } else {
        var state = false;
        if ($("#IsActive").attr("checked") == "checked") {
          state = true;
        }
        showLoader();
        $.ajax({
          url: "/DynamicInsurance/Update",
          type: "POST",
          dataType: "json",
          data: {
            Id: $("#parameterId").val(),
            Description: $("#description").val(),
            Value: $("#value").val(),
            Output: $("#output").val(),
            State: state
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
              sigortaCiniDynamicInsurance.getList();
              success("Başarıyla kaydedildi");
              $("#UpdateParameterModal").modal("hide");
            }
          },
          error: function(errorThrown) {
            console.log(errorThrown);
            hideLoader();
          }
        });
      }
    });
  },

  getList: function() {
    showLoader();
    $.ajax({
      url: "/DynamicInsurance/GetAll",
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
          sigortaCiniDynamicInsurance.fillDataTableFor(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
    //$('#btnList').click(function (e) {
    //    e.preventDefault();
    //    if ($('#company').val() == "") {
    //        error("Lütfen şirket seçiniz.");
    //    }
    //    else if ($('#product').val() == "") {
    //        error("Lütfen ürün seçiniz.");
    //    }
    //    else {
    //showLoader();
    //$.ajax({
    //    url: '/DynamicInsurance/GetAll',
    //    type: "POST",
    //    dataType: "json",
    //    data: {
    //        Company: $('#company').val(),
    //        Product: $('#product').val(),
    //    },
    //    success: function (dataSet) {
    //        if (dataSet == null) {
    //            hideLoader();
    //            error("Sistemde bir hata oluştu");
    //            return;
    //        }
    //        else if (dataSet.hasError) {
    //            hideLoader();
    //            error(dataSet.message);
    //            return;
    //        }
    //        else {
    //            sigortaCiniDynamicInsurance.fillDataTableFor(dataSet.data);
    //            hideLoader();
    //        }

    //    },
    //    error: function (errorThrown) {
    //        console.log(errorThrown);
    //        hideLoader();

    //    }
    //});
    //    }

    //});
  },

  fillDataTableFor: function(dataInput) {
    $("#parameter_table").DataTable({
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
        { data: "name" },
        { data: "companyServiceName" },
        { data: "value" },
        { data: "companyServiceValue" },
        { data: "company.companyName" }
      ]
    });

    // sigortaCiniDynamicInsurance.datatableClick();
  },

  //datatableClick: function () {
  //    $('#parameter_table tbody').on('click', 'tr', function (e) {
  //        e.preventDefault();
  //        e.stopImmediatePropagation();
  //        table = $("#parameter_table").DataTable();
  //        var data = table.row(this).data();
  //        sigortaCiniDynamicInsurance.B2BLogGetById(data.logId);

  //    });
  //},

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/DynamicInsurance/GetById",
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
          $("#UpdateParameterModal").modal("show");
          if (dataSet.data.state) {
            $("#IsActive").attr("checked", "checked");
          } else {
            $("#IsActive").attr("checked", false);
          }

          $("#parameterId").val(dataSet.data.id);
          $("#description").val(dataSet.data.enviroment);
          $("#value").val(dataSet.data.methodType);
          $("#output").val(dataSet.data.typeName);
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
