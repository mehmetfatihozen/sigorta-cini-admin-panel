$(document).ready(function() {
  sigortaCiniApi.init();
});
var sigortaCiniApi = {
  init: function() {
    this.update();
    this.getall();
  },

  update: function() {
    $("#btnRoleUpdate").click(function() {
      if ($("#Role").val() == 0) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      $.ajax({
        url: "/ApiSettings/UpdateApiUser",
        type: "POST",
        data: {
          UserId: $("#userid").val(),
          RoleType: {
            RoleTypeId: $("#Role").val()
          }
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
            $("#updateUserModal").modal("hide");
            sigortaCiniApi.getall();
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
      url: "/ApiSettings/GetAllApiUser",
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
          sigortaCiniApi.fillDataTable(dataSet.data);
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
    $("#dataTableApi").DataTable({
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
      data: dataInput,
      columns: [
        { data: "firstName" },
        { data: "lastName" },
        { data: "username" }
      ]
    });

    sigortaCiniApi.datatableDoubleClick();
  },

  datatableDoubleClick: function() {
    $("#dataTableApi tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#dataTableApi").DataTable();
      var data = table.row(this).data();
      sigortaCiniApi.get(data.userId);
    });
  },

  get: function(userId) {
    showLoader();
    $.ajax({
      url: "/User/GetUser",
      type: "GET",
      dataType: "json",
      data: {
        id: userId
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
          sigortaCiniApi.getRoleTypes(dataSet.roleTypeId);
          $("#userid").val(dataSet.userId);

          $("#updateUserModal").modal("show");
          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getRoleTypes: function(roleId) {
    showLoader();
    $("#Role").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/Role/GetAll",
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
          $.each(dataSet.data, function(roleTypeId, roleType) {
            $("#Role").append(
              new Option(roleType.roleName, roleType.roleTypeId)
            );
          });
          $("#Role")
            .val(roleId)
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
