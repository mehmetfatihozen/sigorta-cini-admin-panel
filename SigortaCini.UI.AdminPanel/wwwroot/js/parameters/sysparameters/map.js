$(document).ready(function() {
  sigortaCiniSysMap.init();
  $("#selectAll").click(function() {
    var checked = $(this).prop("checked");
    $(".usersCheckBox")
      .find("input:checkbox")
      .prop("checked", checked);
  });
});
var sigortaCiniSysMap = {
  init: function() {
    this.getall();
    this.getParameters();
    this.save();
  },

  getParameters: function() {
    showLoader();
    $("#roles").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/SysCat/GetAll",
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
            $("#roles ").append(new Option(value.name, value.leadSysTypeCatId));
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
        url: "/SysMap/GetByCatId",
        type: "GET",
        data: { id: $("#roleId").val() },
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
            sigortaCiniSysMap.fillDataTable(dataSet.data.leadSysTypeList);
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
      if (item.uiIsChecked) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsers " id="checkboxUsers' +
        item.leadSysTypeId +
        '" value="' +
        item.leadSysTypeId +
        '">' +
        item.explanation +
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
        error("Parametrelerden en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/SysMap/CreateAndUpdate ",
        type: "PUT",
        dataType: "json",
        data: {
          LeadSysTypeCatId: $("#roleId").val(),
          LeadSysTypeIdList: menus
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
