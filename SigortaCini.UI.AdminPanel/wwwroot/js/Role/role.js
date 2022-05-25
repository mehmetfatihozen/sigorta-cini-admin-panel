var table;
$(document).ready(function() {
  sigortaCiniRole.init();
  $("#btnRoleOpenModal").click(function() {
    $("#myModalRole").modal("show");
    $("#RoleName").val("");
    $("#RoleImage").val("");
    $("#RoleDesc").val("");
    $(".RoleIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#RoleIsActive").attr("checked", "checked");
  });
});
var sigortaCiniRole = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },
  create: function() {
    $("#btnRoleAdd").click(function() {
      if (
        $("#RoleName").val().length == 0 ||
        $("#RoleDesc").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }

      showLoader();

      var RoleId = 0;

      var isActive = false;
      if ($("#RoleIsActive").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/Role/Create",
        type: "POST",
        data: {
          RoleTypeId: RoleId,
          RoleName: $("#RoleName").val(),
          State: isActive,
          RoleDesc: $("#RoleDesc").val()
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
            $("#myModalRole").modal("hide");
            sigortaCiniRole.getall();
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
    $("#btnRoleUpdate").click(function() {
      if (
        $("#RoleNameUpdate").val().length == 0 ||
        $("#RoleDescUpdate").val().length == 0
      ) {
        error("Gerekli tüm alanları doldurunuz.");
        return;
      }
      showLoader();

      var RoleIdVal = $("#RoleId").val();

      var isActive = false;
      if ($("#RoleIsActiveUpdate").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/Role/Update",
        type: "POST",
        data: {
          RoleTypeId: RoleIdVal,
          RoleName: $("#RoleNameUpdate").val(),
          State: isActive,
          RoleDesc: $("#RoleDescUpdate").val()
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
            $("#myModalUpdateRole").modal("hide");
            sigortaCiniRole.getall();
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
      url: "/Role/GetAll",
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
          sigortaCiniRole.fillDataTable(dataSet.data);
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
    var table = $("#dataTableRoles").DataTable({
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
        { data: "roleName" },
        { data: "roleDesc" },
        { data: "stateDesc" }
      ]
    });

    sigortaCiniRole.datatableDoubleClick();
  },

  datatableDoubleClick: function() {
    $("#dataTableRoles tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#dataTableRoles").DataTable();
      var data = table.row(this).data();
      sigortaCiniRole.get(data.roleTypeId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/Role/get",
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
          $("#myModalUpdateRole").modal("show");
          $("#RoleNameUpdate").val(dataSet.data.roleName);
          $("#RoleDescUpdate").val(dataSet.data.roleDesc);
          $("#RoleId").val(dataSet.data.roleTypeId);
          hideLoader();

          if (dataSet.data.state) {
            $(".RoleIsActiveDivUpdate")
              .find("span")
              .addClass("checked");
            $("#RoleIsActiveUpdate").attr("checked", "checked");
          } else {
            $(".RoleIsActiveDivUpdate")
              .find("span")
              .removeClass("checked");
            $("#RoleIsActiveUpdate").removeAttr("checked");
          }
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};
