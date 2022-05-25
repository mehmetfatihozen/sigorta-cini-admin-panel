$(document).ready(function() {
  SigortaCiniSetting.init();
  $('input[type="file"][id="uploaded_file"]').bind("change", function() {
    var file = $('input[type="file"][id="uploaded_file"]').val();
    var exts = ["xls", "xlsx"];
    if (file) {
      var get_ext = file.split(".");
      get_ext = get_ext.reverse();
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
      } else {
        $('input[type="file"][id="uploaded_file"]').val("");
        error("Geçersiz dosya türü");
        return;
      }
    }

    if (file && this.files[0].size > 8388608) {
      $('input[type="file"][id="uploaded_file"]').val("");
      error("Maksimum dosya boyutu 8 MB'dır.");
      return;
    }
  });
});
var SigortaCiniSetting = {
  init: function() {
    this.getall();
    this.update();
    this.uploadCarList();
  },

  update: function() {
    $("#btne").click(function() {
      showLoader();

      var isActiveb2b = false;
      var isActiveb2c = false;

      if ($("#uavtStateb2b").attr("checked") == "checked") {
        isActiveb2b = true;
      }
      if ($("#uavtStateb2c").attr("checked") == "checked") {
        isActiveb2c = true;
      }

      $.ajax({
        url: "/Setting/UpdateSetting",
        type: "PUT",
        data: {
          settingId: $("#settingsId").val(),
          uavtB2bState: isActiveb2b,
          uavtB2cState: isActiveb2c
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
            SigortaCiniSetting.getall();
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
      url: "/Setting/GetSetting",
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
          $("#settingsId").val(dataSet.data.settingId);

          if (dataSet.data.uavtB2bState) {
            $(".UavtB2bIsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#uavtStateb2b").attr("checked", "checked");
          } else {
            $(".UavtB2bIsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#uavtStateb2b").removeAttr("checked");
          }

          if (dataSet.data.uavtB2cState) {
            $(".UavtB2cIsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#uavtStateb2c").attr("checked", "checked");
          } else {
            $(".UavtB2cIsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#uavtStateb2c").removeAttr("checked");
          }
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  uploadCarList: function() {
    $("#upload_file").click(function(e) {
      e.preventDefault();
      if ($('input[type="file"][id="uploaded_file"]').val() == "") {
        error("Lütfen bir dosya seçiniz");
        return false;
      } else {
        showLoader();
        var $form = $("#upload_car_form");
        var ajaxData = new FormData($form[0]);
        $.ajax({
          url: "/CarList/ImportCarsFromExcel",
          type: "POST",
          data: ajaxData,
          dataType: "json",
          cache: false,
          contentType: false,
          processData: false,
          success: function(data) {
            if (data == null) {
              hideLoader();
              $('input[type="file"][id="uploaded_file"]').val("");
              error("Sistemde bir hata oluştu");
              return false;
            } else if (data.hasError) {
              hideLoader();
              $('input[type="file"][id="uploaded_file"]').val("");
              error(data.message);
              return false;
            } else {
              hideLoader();
              $('input[type="file"][id="uploaded_file"]').val("");
              success("Başarıyla yüklendi");
            }
          },
          error: function(errorThrown) {
            hideLoader();
            console.log(errorThrown);
          }
        });
      }
    });
  }
};
