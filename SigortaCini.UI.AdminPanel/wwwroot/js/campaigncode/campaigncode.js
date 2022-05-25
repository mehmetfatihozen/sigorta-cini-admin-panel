$(document).ready(function() {
  sigortaCiniOrganization.init();
  $("#organization_tel_update").mask("0(999) 999-9999");
  $("#organization_tel_update").live("click", function(e) {
    e.preventDefault();

    $("#organization_tel_update").focus();

    return false;
  });
  $("#btnOrganizationAdd").click(function() {
    $("#organizationModal").modal("show");
    $("#organization_code").val("");
    $("#organization_name").val("");
    $("#organization_tel").val("");
    $("#organization_email").val("");
    $("#organization_tel").mask("0(999) 999-9999");
    $("#organization_tel").live("click", function(e) {
      e.preventDefault();

      $("#organization_tel").focus();

      return false;
    });
  });
});
var sigortaCiniOrganization = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  create: function() {
    $("#btnAdd").click(function() {
      if (
        $("#organization_name").val().length == 0 ||
        $("#organization_code").val().length == 0 ||
        $("#organization_tel").val().length == 0 ||
        $("#organization_email").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      $.ajax({
        url: "/Organization/Create",
        type: "POST",
        data: {
          OrganizationId: 0,
          OrganizationCode: $("#organization_code").val(),
          OrganizationName: $("#organization_name").val(),
          OrganizationPhone: $("#organization_tel").val(),
          OrganizationEmail: $("#organization_email").val()
        },
        dataType: "json",
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
            return;
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
            return;
          }

          $("#organizationModal").modal("hide");
          sigortaCiniOrganization.getall();
          hideLoader();
          success("Başarıyla kaydedildi");
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  update: function() {
    $("#btnUpdate").click(function() {
      if (
        $("#organization_name_update").val().length == 0 ||
        $("#organization_code_update").val().length == 0 ||
        $("#organization_tel_update").val().length == 0 ||
        $("#organization_email_update").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      var OrIdVal = $("#orId").val();

      $.ajax({
        url: "/Organization/Update",
        type: "PUT",
        data: {
          OrganizationId: OrIdVal,
          OrganizationCode: $("#organization_code_update").val(),
          OrganizationName: $("#organization_name_update").val(),
          OrganizationPhone: $("#organization_tel_update").val(),
          OrganizationEmail: $("#organization_email_update").val()
        },
        dataType: "json",

        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
            return;
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
            return;
          }

          $("#organizationUpdateModal").modal("hide");
          sigortaCiniOrganization.getall();
          hideLoader();
          success("Başarıyla kaydedildi");
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
      url: "/Organization/GetAll",
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
        }

        sigortaCiniOrganization.fillDataTable(dataSet.data);
        hideLoader();
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
    $("#organizationTable").DataTable({
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
      responsive: true,
      searching: true,
      destroy: true,
      data: dataInput,
      columns: [
        { data: "organizationCode" },
        { data: "organizationName" },
        { data: "organizationPhone" },
        { data: "organizationEmail" }
      ]
    });

    sigortaCiniOrganization.datatableClick();
  },

  datatableClick: function() {
    $("#organizationTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#organizationTable").DataTable();
      var data = table.row(this).data();
      sigortaCiniOrganization.get(data.organizationId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/Organization/GetById",
      type: "GET",
      dataType: "json",
      data: {
        organizationId: id
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
        }

        $("#organization_name_update").val(dataSet.data.organizationName);
        $("#organization_code_update").val(dataSet.data.organizationCode);
        $("#organization_tel_update").val(dataSet.data.organizationPhone);
        $("#organization_email_update").val(dataSet.data.organizationEmail);
        $("#orId").val(dataSet.data.organizationId);
        $("#organizationUpdateModal").modal("show");
        hideLoader();
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};
