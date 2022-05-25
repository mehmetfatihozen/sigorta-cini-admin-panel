$(document).ready(function() {
  sigortaCiniInstallmentParameters.init();
  $("#product").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showLoader();
    $("#provider").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/CPMCategory/GetAllByProductId",
      type: "GET",
      dataType: "json",
      data: {
        productid: $("#product").val()
      },

      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        }

        $.each(dataSet.data, function(index, item) {
          $("#provider").append(new Option(item.companyName, item.companyId));
        });

        hideLoader();
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  });
  $("#btnParameterAdd").click(function() {
    $("#product")
      .val("")
      .select2();
    $("#provider option").remove();
    $("#provider").append(
      $("<option/>", {
        value: "",
        text: "Seçiniz"
      })
    );
    $("#provider")
      .val("")
      .select2();
    $("#provider")
      .val("")
      .trigger("change.select2");
    $("#installment").val("");
    $("#IsParameterActive").attr("checked", false);
    sigortaCiniInstallmentParameters.getProducts();
    $("#AddParameterModal").modal("show");
  });
});

var sigortaCiniInstallmentParameters = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#product").val() == "") {
        error("Ürünü boş geçmeyiniz.");
        return;
      }
      if ($("#provider").val() == "") {
        error("Sağlayıcıyı boş geçmeyiniz.");
        return;
      }
      if ($("#installment").val() == "") {
        error("Taksit Sayısını boş geçmeyiniz.");
        return;
      }

      var isActive = false;
      if ($("#IsParameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();
      $.ajax({
        url: "/InstallmentParameters/Create",
        type: "POST",
        data: {
          CompanyProductInstallmentId: null,
          ProducMidCattId: $("#product").val(),
          CompanyId: $("#provider").val(),
          InstallmentData: $("#installment").val(),
          State: isActive
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
            sigortaCiniInstallmentParameters.getall();
            $("#AddParameterModal").modal("hide");
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
    $("#parameterUpdate").click(function() {
      if ($("#product_update").val() == "") {
        error("Ürünü boş geçmeyiniz.");
        return;
      }
      if ($("#provider_update").val() == "") {
        error("Sağlayıcıyı boş geçmeyiniz.");
        return;
      }
      if ($("#installment_update").val() == "") {
        error("Taksit Sayısını boş geçmeyiniz.");
        return;
      }

      var isUpdateActive = false;
      if ($("#IsParameterUpdateActive").attr("checked") == "checked") {
        isUpdateActive = true;
      }

      showLoader();

      $.ajax({
        url: "/InstallmentParameters/Update",
        type: "PUT",
        data: {
          CompanyProductInstallmentId: $("#parameterId").val(),
          ProducMidCattId: $("#product_update").val(),
          CompanyId: $("#provider_update").val(),
          InstallmentData: $("#installment_update").val(),
          State: isUpdateActive
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
            sigortaCiniInstallmentParameters.getall();
            $("#UpdateParameterModal").modal("hide");
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

  getall: function() {
    showLoader();
    $.ajax({
      url: "/InstallmentParameters/GetAll",
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
          sigortaCiniInstallmentParameters.fillDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
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
        { data: "productMidCategory.productMidCatDesc" },
        { data: "company.companyName" },
        { data: "installmentData" },
        {
          data: "state",
          render: function(data, type, row) {
            if (data == false) {
              return "Aktif Değil";
            } else {
              return "Aktif";
            }
          }
        }
      ]
    });

    sigortaCiniInstallmentParameters.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniInstallmentParameters.get(data.companyProductInstallmentId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/InstallmentParameters/GetById",
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

          sigortaCiniInstallmentParameters.getProductsForUpdate(
            dataSet.data.productMidCategory.productMidCatId
          );
          sigortaCiniInstallmentParameters.getProviderForUpdate(
            dataSet.data.company.companyId
          );

          $("#installment_update").val(dataSet.data.installmentData);

          if (dataSet.data.state) {
            $("#IsParameterUpdateActive").prop("checked", true);
          } else {
            $("#IsParameterUpdateActive").prop("checked", false);
          }

          $("#parameterId").val(dataSet.data.companyProductInstallmentId);

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
    $("#product").html('<option  value="">Seçiniz</option>');
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
            $("#product").append(
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

  getProductsForUpdate: function(productId) {
    showLoader();
    $("#product_update").html('<option  value="">Seçiniz</option>');
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
            $("#product_update").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
            );
          });

          $("#product_update")
            .val(productId)
            .select2();

          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getProviderForUpdate: function(providerId) {
    showLoader();
    $("#provider_update").html('<option  value="">Seçiniz</option>');
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
            $("#provider_update").append(
              new Option(item.companyName, item.companyId)
            );
          });

          $("#provider_update")
            .val(providerId)
            .select2();

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
