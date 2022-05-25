var table;
$(document).ready(function() {
  sigortaCiniPermission.init();
});
var sigortaCiniPermission = {
  init: function() {
    this.getall();
    this.getPersonTypes();
    this.save();
  },

  getPersonTypes: function() {
    showLoader();
    $("#users").html('<option value="0">Seçiniz</option>');
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
            $("#users ").append(new Option(role, value.roleTypeId));
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
    $("#users").on("change", function() {
      showLoader();

      $("#selectedId").val($(this).val());

      if ($("#selectedId").val() == 0) {
        $(".portlet-body").removeClass("h-350");
        $("#alt_content").addClass("hide");
        $("#save_permission").addClass("hide");
        hideLoader();
        error("Geçerli bir değer seçiniz.");
        return;
      }
      $(".portlet-body").addClass("h-350");
      $("#save_permission").removeClass("hide");
      $.ajax({
        url: "/Permission/GetRolesWithUsersForRole",
        type: "GET",
        data: { roleId: $("#selectedId").val() },
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
            sigortaCiniPermission.fillDataTable(dataSet.data);
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
      var fullname = item.firstName + " " + item.lastName;
      if (item.isRequestedRole) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsers " id="checkboxUsers' +
        item.userId +
        '" value="' +
        item.userId +
        '">' +
        fullname +
        "</label>";
      htmlStr += "</div>";
    });
    $(".usersCheckBox").html(htmlStr);
  },

  save: function() {
    $("#save_permission").click(function() {
      var users = [];
      $(".checkboxUsers").each(function(index) {
        if (this.checked) {
          users.push(parseInt(this.value));
        }
      });
      if (users.length == 0) {
        error("Kullanıcılardan en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/Permission/SetUsersRole",
        type: "PUT",
        dataType: "json",
        data: {
          editUserId: 43,
          roleId: $("#selectedId").val(),
          UserIds: users
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
            sigortaCiniPermission.getall(dataSet.data[0].roleId);
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
