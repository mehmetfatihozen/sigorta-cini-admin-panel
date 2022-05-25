$(document).ready(function() {
  sigortaCiniDescription.init();
  $("#btnParameterAdd").click(function() {
    $("#AddParameterModal").modal("show");
    sigortaCiniDescription.getTenant();
    sigortaCiniDescription.getTypes();
    sigortaCiniDescription.clear();
  });
});

var sigortaCiniDescription = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  clear: function() {
    $("#parameter_name").val("");
    $("#parameter_type")
      .val("")
      .select2();
    $("#parameter_tenant")
      .val("")
      .select2();
    $("#IsParameterActive").attr("checked", true);
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#parameter_name").val() == "") {
        error("Açıklama Adını boş geçmeyiniz.");
        return;
      }

      if ($("#parameter_type").val() == "") {
        error("Açıklama Tipini seçiniz.");
        return;
      }

      if ($("#parameter_tenant").val() == "") {
        error("Açıklama Tenantını seçiniz.");
        return;
      }

      var isActive = false;
      if ($("#IsParameterActive").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();
      $.ajax({
        url: "/TenantContentDescription/Create",
        type: "POST",
        data: {
          TenantContentDescText: $("#parameter_name").val(),
          TenantContentDescTypeId: $("#parameter_type").val(),
          TenantId: $("#parameter_tenant").val(),
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
            hideLoader();
            sigortaCiniDescription.getall();
            $("#AddParameterModal").modal("hide");
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
        error("Açıklama Adını boş geçmeyiniz.");
        return;
      }

      if ($("#parameter_type_update").val() == "") {
        error("Açıklama Tipini seçiniz.");
        return;
      }

      if ($("#parameter_tenant_update").val() == "") {
        error("Açıklama Tenantını seçiniz.");
        return;
      }

      var isUpdateActive = false;
      if ($("#IsParameterActiveUpdate").attr("checked") == "checked") {
        isUpdateActive = true;
      }

      showLoader();

      $.ajax({
        url: "/TenantContentDescription/Update",
        type: "POST",
        data: {
          TenantContentDescId: $("#parameterId").val(),
          TenantContentDescText: $("#parameter_name_update").val(),
          TenantContentDescTypeId: $("#parameter_type_update").val(),
          TenantId: $("#parameter_tenant_update").val(),
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
            sigortaCiniDescription.getall();
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
      url: "/TenantContentDescription/GetAll",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          sigortaCiniDescription.error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
          return;
        } else {
          sigortaCiniDescription.fillDataTable(dataSet.data);
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
        { data: "tenantContentDescText" },
        { data: "tenantContentDescType.tenantContentDescTypeName" },
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

    sigortaCiniDescription.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniDescription.get(data.tenantContentDescId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/TenantContentDescription/Get",
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
          $("#parameter_name_update").val(dataSet.data.tenantContentDescText);
          sigortaCiniDescription.getTenantForUpdate(dataSet.data.tenantId);
          sigortaCiniDescription.getTypesForUpdate(
            dataSet.data.tenantContentDescTypeId
          );

          if (dataSet.data.isActive) {
            $("#IsParameterActiveUpdate").prop("checked", true);
          } else {
            $("#IsParameterActiveUpdate").prop("checked", false);
          }
          $("#parameterId").val(dataSet.data.tenantContentDescId);

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

  getTypes: function() {
    showLoader();
    $("#parameter_type").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/TenantContentDescription/GetAllDescTypes",
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
              new Option(
                item.tenantContentDescTypeName,
                item.tenantContentDescTypeId
              )
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
      url: "/TenantContentDescription/GetAllDescTypes",
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
              new Option(
                item.tenantContentDescTypeName,
                item.tenantContentDescTypeId
              )
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
