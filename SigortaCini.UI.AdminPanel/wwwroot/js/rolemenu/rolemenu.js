var table;
$(document).ready(function() {
  sigortaCiniRolesMenus.init();
  $("#selectAll").click(function() {
    var checked = $(this).prop("checked");
    $(".usersCheckBox")
      .find("input:checkbox")
      .prop("checked", checked);
  });
});
var sigortaCiniRolesMenus = {
  init: function() {
    this.getall();
    this.getRoles();
    this.save();
  },

  getRoles: function() {
    showLoader();
    $("#roles").html('<option value="0">Seçiniz</option>');
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
          $.each(dataSet.data, function(index, value) {
            var role = value.roleName + " - " + value.roleDesc;
            $("#roles ").append(new Option(role, value.roleTypeId));
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

  getall: function() {
    $("#roles").on("change", function() {
      showLoader();

      $("#roleId").val($(this).val());
      if ($("#roleId").val() == 0) {
        $(".portlet-body").removeClass("h-350");
        $("#alt_content").addClass("hide");
        $("#save_menus").addClass("hide");
        hideLoader();
        error("Geçerli bir değer seçiniz.");
        return;
      }
      $(".portlet-body").addClass("h-350");
      $("#save_menus").removeClass("hide");

      $.ajax({
        url: "/Role/GetRoleMenusById",
        type: "GET",
        data: { roleId: $("#roleId").val() },
        dataType: "json",

        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            $("#alt_content").addClass("hide");
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            hideLoader();
            $("#alt_content").addClass("hide");
            error(dataSet.message);
          } else if (dataSet.data.length == 0) {
            hideLoader();
            $("#alt_no_data_content").removeClass("hide");
            $("#alt_content").addClass("hide");
          } else {
            sigortaCiniRolesMenus.fillDataTable(dataSet.data);
            $("#alt_content").removeClass("hide");
            $("#alt_no_data_content").addClass("hide");
            hideLoader();
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },
  fillDataTable: function(dataInput) {
    $(".usersCheckBox").html("");
    var htmlStr = "";
    $.each(dataInput, function(itemId, item) {
      var checked = "";
      if (item.menuState) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsers " id="checkboxUsers' +
        item.menuId +
        '" value="' +
        item.menuId +
        '">' +
        item.menu.menuName +
        "</label>";
      htmlStr += "</div>";
    });
    $(".usersCheckBox").html(htmlStr);
  },

  save: function() {
    $("#save_menus").click(function() {
      var menus = [];
      $(".checkboxUsers").each(function(index) {
        if (this.checked == true) {
          menus.push(this.value);
        }
      });
      if (menus.length == 0) {
        error("Menülerden en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/Role/UpdateRoleMenu ",
        type: "PUT",
        dataType: "json",
        data: {
          RoleId: $("#roleId").val(),
          MenuIds: menus,
          EditUserId: 1
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
            window.location.reload();
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
