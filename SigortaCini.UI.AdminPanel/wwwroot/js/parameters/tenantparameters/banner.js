$(document).ready(function() {
  sigortaCiniBanner.init();
  $("#btnParameterAdd").click(function() {
    sigortaCiniBanner.getTenant();
    sigortaCiniBanner.getProducts();
    sigortaCiniBanner.getTypes();
    sigortaCiniBanner.clear();
    $("#AddParameterModal").modal("show");
  });
  $('[data-toggle="tooltip"]').tooltip();

  $('input[type="file"][id="parameter_image"]').bind("change", function() {
    var file = $('input[type="file"][id="parameter_image"]').val();
    var exts = ["png", "jpg", "jpeg", "gif"];
    if (file) {
      var get_ext = file.split(".");
      get_ext = get_ext.reverse();
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
        readURL(this);
      } else {
        $('input[type="file"][id="parameter_image"]').val("");
        error("Geçersiz dosya türü");
        return;
      }
    }

    if (file && this.files[0].size > 8388608) {
      $('input[type="file"][id="parameter_image"]').val("");
      error("Maksimum dosya boyutu 8 MB'dır. ");
      return;
    }
  });

  $('input[type="file"][id="parameter_image_update"]').bind(
    "change",
    function() {
      var file = $('input[type="file"][id="parameter_image_update"]').val();
      var exts = ["png", "jpg", "jpeg", "gif"];
      if (file) {
        var get_ext = file.split(".");
        get_ext = get_ext.reverse();
        if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
          readURLforUpdate(this);
        } else {
          $('input[type="file"][id="parameter_image_update"]').val("");
          error("Geçersiz dosya türü");
          return;
        }
      }

      if (file && this.files[0].size > 8388608) {
        $('input[type="file"][id="parameter_image_update"]').val("");
        error("Maksimum dosya boyutu 8 MB'dır. ");
        return;
      }
    }
  );

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#parameter_image_preview").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function readURLforUpdate(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#parameter_image_preview_update").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
});

var sigortaCiniBanner = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  clear: function() {
    $("#parameter_name").val("");
    $("#parameter_desc").val("");
    $("#parameter_tenant")
      .val("")
      .select2();
    $("#parameter_product")
      .val("")
      .select2();
    $("#parameter_type")
      .val("")
      .select2();
    $('input[type="file"][id="parameter_image"]').val("");
    $("#parameter_image_preview").attr("src", "");
    $(".parameterActiveDiv")
      .find("span")
      .addClass("checked");
    $("#parameterActive").attr("checked", "checked");
  },

  create: function() {
    $("#banner_form").on("submit", function(e) {
      e.preventDefault();

      if ($("#parameter_name").val() == "") {
        error("Banner Adını boş geçmeyiniz.");
        return;
      }

      if ($("#parameter_tenant").val() == "") {
        error("Banner Tenantını seçiniz.");
        return;
      }

      if ($("#parameter_type").val() == "") {
        error("Banner Tipini seçiniz.");
        return;
      }

      var isActive = false;
      if ($("#parameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();

      var $form = $("#banner_form");
      var ajaxData = new FormData($form[0]);
      ajaxData.append("TenantBannerDesc", $("#parameter_name").val());
      ajaxData.append("TenantBannerTypeId", $("#parameter_type").val());
      ajaxData.append("ProductMidCatId", $("#parameter_product").val());
      ajaxData.append("TenantId", $("#parameter_tenant").val());
      ajaxData.append("IsActive", isActive);

      $.ajax({
        url: "/TenantBanner/Create",
        type: "POST",
        data: ajaxData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
          } else {
            $("#AddParameterModal").modal("hide");
            sigortaCiniBanner.getall();
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
    $("#banner_update_form").on("submit", function(e) {
      e.preventDefault();

      if ($("#parameter_name_update").val() == "") {
        error("Banner Adını boş geçmeyiniz.");
        return;
      }

      if ($("#parameter_tenant_update").val() == "") {
        error("Banner Tenantını seçiniz.");
        return;
      }

      if ($("#parameter_type_update").val() == "") {
        error("Banner Tipini seçiniz.");
        return;
      }

      var isActive = false;
      if ($("#parameterActiveUpdate").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();
      parameterActiveUpdate;
      var $form = $("#banner_update_form");
      var ajaxData = new FormData($form[0]);
      ajaxData.append("TenantBannerId", $("#parameterId").val());
      ajaxData.append("TenantBannerDesc", $("#parameter_name_update").val());
      ajaxData.append("TenantBannerTypeId", $("#parameter_type_update").val());
      ajaxData.append("ProductMidCatId", $("#parameter_product_update").val());
      ajaxData.append("TenantId", $("#parameter_tenant_update").val());
      ajaxData.append("IsActive", isActive);

      $.ajax({
        url: "/TenantBanner/Update",
        type: "POST",
        data: ajaxData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
          } else {
            $("#UpdateParameterModal").modal("hide");
            sigortaCiniBanner.getall();
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
      url: "/TenantBanner/GetAll",
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
          sigortaCiniBanner.fillDataTable(dataSet.data);
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
        { data: "tenantBannerDesc" },
        { data: "tenantBannerType.tenantBannerTypeName" },
        { data: "productMidCategory.productMidCatDesc" },
        { data: "tenant.tenantName" },
        {
          data: "isActive",
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

    this.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniBanner.get(data.tenantBannerId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/TenantBanner/Get",
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
          $("#parameter_name_update").val(dataSet.data.tenantBannerDesc);
          $("#parameter_image_preview_update").attr(
            "src",
            "/TenantBanner/GetBannerById?bannerid=" + id
          );

          sigortaCiniBanner.getTenantForUpdate(dataSet.data.tenant.tenantId);
          sigortaCiniBanner.getProductsForUpdate(dataSet.data.productMidCatId);
          sigortaCiniBanner.getTypesForUpdate(dataSet.data.tenantBannerTypeId);

          if (dataSet.data.isActive) {
            $("#parameterActiveUpdate").prop("checked", true);
          } else {
            $("#parameterActiveUpdate").prop("checked", false);
          }
          $("#parameterId").val(dataSet.data.tenantBannerId);

          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },
  getTenant: function() {
    showLoader();
    $("#parameter_tenant").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAll",
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
            $("#parameter_tenant").append(
              new Option(item.tenantName, item.tenantId)
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

  getTenantForUpdate: function(id) {
    showLoader();
    $("#parameter_tenant_update").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAll",
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
            $("#parameter_tenant_update").append(
              new Option(item.tenantName, item.tenantId)
            );
          });
          $("#parameter_tenant_update")
            .val(id)
            .select2();
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
    $("#parameter_product").html('<option value="">Seçiniz</option>');
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
            $("#parameter_product").append(
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

  getProductsForUpdate: function(id) {
    showLoader();
    $("#parameter_product_update").html('<option value="">Seçiniz</option>');
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
            $("#parameter_product_update").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
            );
          });
          $("#parameter_product_update")
            .val(id)
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

  getTypes: function() {
    showLoader();
    $("#parameter_type").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/TenantBanner/GetAllDescTypes",
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
            $("#parameter_type").append(
              new Option(item.tenantBannerTypeName, item.tenantBannerTypeId)
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

  getTypesForUpdate: function(id) {
    showLoader();
    $("#parameter_type_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/TenantBanner/GetAllDescTypes",
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
            $("#parameter_type_update").append(
              new Option(item.tenantBannerTypeName, item.tenantBannerTypeId)
            );
          });
          $("#parameter_type_update")
            .val(id)
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
