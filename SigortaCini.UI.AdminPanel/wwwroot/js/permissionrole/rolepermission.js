$(document).ready(function() {
  sigortaCiniPermissionRole.init();
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
var sigortaCiniPermissionRole = {
  init: function() {
    this.update();
    this.getAllRoles();
    this.create();
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
            sigortaCiniPermissionRole.getAllRoles();
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

  getAllRoles: function() {
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
          sigortaCiniPermissionRole.fillDataTable(dataSet.data);
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
    $("#dataTableRoles").DataTable({
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

    sigortaCiniPermissionRole.datatableDoubleClick();
  },

  datatableDoubleClick: function() {
    $("#dataTableRoles tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#dataTableRoles").DataTable();
      var data = table.row(this).data();
      sigortaCiniPermissionRole.get(data.roleTypeId, data.state);
    });
  },

  get: function(id, state) {
    if (id == null || id == 0 || state != true) {
      alert("Rol Id Boş veya Rol Aktif Değil");
      $("#roleId").val("");
      $("#alt_content_checks").addClass("hide");
      $("#treeview").html("");
      return;
    } else {
      $("#roleId").val(id);
      showLoader();
      $.ajax({
        type: "GET",
        url: "/Permission/GetAllPermissionByGroupRole",
        data: {
          RoleId: id,
          PermissionTypeId: "1"
        },
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            $("#alt_content_checks").addClass("hide");
            $("#btn_update").addClass("hide");
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            $("#alt_content_checks").addClass("hide");
            $("#btn_update").addClass("hide");
            hideLoader();
            error(dataSet.message);
          } else if (dataSet.data == "") {
            $("#alt_content_checks").addClass("hide");
            $("#btn_update").addClass("hide");
            hideLoader();
          } else {
            var htmlStr = "";
            var checked = "";
            $.each(dataSet.data, function(itemId, item) {
              htmlStr +=
                '<li><i class="fa fa-plus"></i> <label class="poolparentname"> <input id="' +
                item.permissionGroupId +
                '"  type="checkbox" />' +
                item.permissionGroupName +
                "</label>";
              htmlStr += "<ul>";
              $.each(item.permissions, function(index, sapermissions) {
                if (sapermissions.state) {
                  checked = "checked=checked";
                } else {
                  checked = "";
                }
                htmlStr +=
                  "<li><label><input " +
                  checked +
                  ' class="hummingbird-end-node" id="' +
                  sapermissions.permissionId +
                  '" type="checkbox" />' +
                  sapermissions.permissionName +
                  "-" +
                  sapermissions.permissionDesc +
                  "</label></li>";
              });

              htmlStr += "</ul>";
              htmlStr += "</li>";
            });

            $("#treeview").html(htmlStr);

            $("#treeview").hummingbird();

            $("#CheckAll").on("click", function() {
              $("#treeview").hummingbird("checkAll");
            });

            $("#UnCheckAll").on("click", function() {
              $("#treeview").hummingbird("uncheckAll");
            });

            $("#CollapseAll").on("click", function() {
              $("#treeview").hummingbird("collapseAll");
            });

            $("#ExpandAll").on("click", function() {
              $("#treeview").hummingbird("expandAll");
            });

            $("#alt_content_checks").removeClass("hide");
            $("#btn_update").removeClass("hide");
            hideLoader();
          }
        },
        error: function(errorThrown) {
          $("#alt_content_checks").addClass("hide");
          $("#btn_update").addClass("hide");
          hideLoader();
          console.log(errorThrown);
        }
      });
    }
  },

  update: function() {
    $("#btn_update").click(function(e) {
      e.preventDefault();

      var List = { id: [], dataid: [], text: [] };
      $("#treeview").hummingbird("getChecked", {
        list: List,
        onlyEndNodes: true
      });

      if (List["id"].length == 0) {
        alert("Yetkilerden en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/Permission/AddPermissionRole",
        type: "POST",
        dataType: "json",
        data: {
          RoleId: $("#roleId").val(),
          PermissionIds: List["id"]
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
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  }
};
