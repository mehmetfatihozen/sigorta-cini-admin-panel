$(document).ready(function() {
  sigortaCiniTaskClose.init();
  $("#btnParameterAdd").click(function() {
    $("#parameter_name").val("");
    $("#product_add")
      .val("")
      .select2();
    $("#IsParameterActive").attr("checked", false);
    $("#AddParameterModal").modal("show");
  });
});

var sigortaCiniTaskClose = {
  init: function() {
    this.create();
    this.update();
    this.getall();
    this.getProducts();
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#parameter_name").val() == "") {
        error("Parametre Adını boş geçmeyiniz.");
        return;
      }

      if ($("#product_add").val() == "") {
        error("Ürünü boş geçmeyiniz.");
        return;
      }

      var isActive = false;
      if ($("#IsParameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();
      $.ajax({
        url: "/TaskCloseStatus/Create",
        type: "POST",
        data: {
          TaskCloseStatusName: $("#parameter_name").val(),
          ProductMidCatId: $("#product_add").val(),
          IsActive: isActive
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
            sigortaCiniTaskClose.getall();
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
      if ($("#parameter_name_update").val() == "") {
        error("Parametre Adını boş geçmeyiniz.");
        return;
      }

      if ($("#product_update").val() == "") {
        error("Ürünü boş geçmeyiniz.");
        return;
      }

      var isUpdateActive = false;
      if ($("#IsParameterUpdateActive").attr("checked") == "checked") {
        isUpdateActive = true;
      }

      showLoader();

      $.ajax({
        url: "/TaskCloseStatus/Update",
        type: "PUT",
        data: {
          id: $("#parameterId").val(),
          TaskCloseStatusName: $("#parameter_name_update").val(),
          ProductMidCatId: $("#product_update").val(),
          IsActive: isUpdateActive
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
            sigortaCiniTaskClose.getall();
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
      url: "/TaskCloseStatus/GetAll",
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
          sigortaCiniTaskClose.fillDataTable(dataSet.data);
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
        { data: "taskCloseStatusName" },
        { data: "productMidCategory.productMidCatDesc" },
        { data: "taskAssignTaskTypeState" }
      ]
    });

    sigortaCiniTaskClose.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniTaskClose.get(data.taskCloseStatusId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/TaskCloseStatus/GetById",
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
          $("#parameter_name_update").val(dataSet.data.taskCloseStatusName);
          if (dataSet.data.isActive) {
            $("#IsParameterUpdateActive").prop("checked", true);
          } else {
            $("#IsParameterUpdateActive").prop("checked", false);
          }
          sigortaCiniTaskClose.getProductsForUpdate(
            dataSet.data.productMidCategory.productMidCatId
          );
          $("#parameterId").val(dataSet.data.taskCloseStatusId);

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
    $("#product_add").html('<option value="">Seçiniz</option>');
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
            $("#product_add").append(
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
    $("#product_update").html('<option value="">Seçiniz</option>');
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
          hideLoader();

          $("#product_update")
            .val(productId)
            .select2();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  }
};
