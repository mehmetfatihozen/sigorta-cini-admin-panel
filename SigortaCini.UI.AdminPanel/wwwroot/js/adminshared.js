function success(message) {
  var settings = {
    theme: "lime", // lime yeşşile yakın renkli olduğu için başarılı işlem mesajlarını göstermktedir. teal, amethist,ruby,tangerine,lemon,lime,ebony,smoke değerlerini alabilir
    horizontalEdge: "bottom", // kartınyataydaki konumu top-bpttom değerleri alabilir
    verticalEdge: "right", //bildirimin dikeydeki konumu .  right ,left değerlerini alabilir
    heading: "Başarılı", //başlık bilgisi
    sticky: false, // bildirim göründüğünde sabit mi kalacak yoksa kendiliğinden kapanacak mı ? true false değerlerini alabilir.
    life: 3000 // bildirimin göründükten sonra ne kadar süre sonra kaybolacağı . Burada bir saniye sonra kendiliğinden kaybolacaktır.
  };
  $.notific8("zindex", 11500); // zindex değeri veririz ki sayfada en üstte görünsün. diğer html nesnelerinin altında kalmasın
  $.notific8(message, settings); // son olarak burada da bildirimi göstermiş oluruz.
}

function error(message) {
  var settings = {
    theme: "ruby", // lime yeşşile yakın renkli olduğu için başarılı işlem mesajlarını göstermktedir. teal, amethist,ruby,tangerine,lemon,lime,ebony,smoke değerlerini alabilir
    horizontalEdge: "bottom", // kartınyataydaki konumu top-bpttom değerleri alabilir
    verticalEdge: "right", //bildirimin dikeydeki konumu .  right ,left değerlerini alabilir
    heading: "Başarısız", //başlık bilgisi
    sticky: false, // bildirim göründüğünde sabit mi kalacak yoksa kendiliğinden kapanacak mı ? true false değerlerini alabilir.
    life: 3000 // bildirimin göründükten sonra ne kadar süre sonra kaybolacağı . Burada bir saniye sonra kendiliğinden kaybolacaktır.
  };
  $.notific8("zindex", 11500); // zindex değeri veririz ki sayfada en üstte görünsün. diğer html nesnelerinin altında kalmasın
  $.notific8(message, settings); // son olarak burada da bildirimi göstermiş oluruz.
}

function graterThan(value, element, params) {
  if (value == "") return true;
  var s = params.split("-");
  var startDate = new Date(s[2], s[1], s[0]);
  var e = value.split("-");
  var endDate = new Date(e[2], e[1], e[0]);
  if (!/Invalid|NaN/.test(endDate)) {
    return endDate < startDate;
  }
}

function letFormat(value) {
  if (value.includes("Jan")) return value.replace("Jan", "Ocak");
  if (value.includes("Feb")) return value.replace("Feb", "Şubat");
  if (value.includes("Mar")) return value.replace("Mar", "Mart");
  if (value.includes("Apr")) return value.replace("Apr", "Nisan");
  if (value.includes("May")) return value.replace("May", "Mayıs");
  if (value.includes("Jun")) return value.replace("Jun", "Haziran");
  if (value.includes("Jul")) return value.replace("Jul", "Temmuz");
  if (value.includes("Aug")) return value.replace("Aug", "Ağustos");
  if (value.includes("Sep")) return value.replace("Sep", "Eylül");
  if (value.includes("Oct")) return value.replace("Oct", "Ekim");
  if (value.includes("Nov")) return value.replace("Nov", "Kasım");
  if (value.includes("Dec")) return value.replace("Dec", "Aralık");
}

function picker() {
  $.datepicker.regional["tr"] = {
    prevText: "geri",
    nextText: "ileri",
    currentText: "bugün",
    monthNames: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ],
    monthNamesShort: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara"
    ],
    dayNames: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi"
    ],
    dayNamesShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
    dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
    weekHeader: "Hf",
    dateFormat: "dd-mm-yy",
    firstDay: 1,
    isRTL: false,
    maxDate: new Date(),
    showMonthAfterYear: false,
    yearSuffix: ""
  };
  $.datepicker.setDefaults($.datepicker.regional["tr"]);
}

function showLoader() {
  $(".content-loader").show();
}

function hideLoader() {
  $(".content-loader").hide();
}

$(document).ready(function() {
  sigortaCiniShared.init();
  picker();
});

var sigortaCiniShared = {
  init: function() {
    this.getUserId();
  },

  getUserId: function() {
    $.ajax({
      url: "/Base/GetCurrentUser",
      type: "POST",

      dataType: "json",
      success: function(data) {
        if (data == null) {
          error("Sistemde bir hata oluştu");
        } else if (data.hasError) {
          error(data.message);
        }
        sigortaCiniShared.getAllMenus(data.userId);
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getAllMenus: function(id) {
    $.ajax({
      url: "/Role/GetRoleMenusByUserId",
      type: "GET",
      data: {
        userId: id
      },
      dataType: "json",
      success: function(data) {
        if (data == null) {
          error("Sistemde bir hata oluştu");
        } else if (data.hasError) {
          error(data.message);
        }
        var menuItem = sigortaCiniShared.addDataToMenu(data.data);
        $("#AdminMenuDiv").append(menuItem);
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  addDataToMenu: function(data) {
    if (data == null) {
      return "";
    }
    var result = "";
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var start = i == 0 ? "start" : "";
      var menuItem =
        '<li class="' +
        start +
        '" id=menuItem' +
        item.menuId +
        ">" +
        '<a href = "' +
        item.menu.menuUrl +
        '" >' +
        '<i class="' +
        item.menu.menuIcon +
        '"></i>' +
        '<span class="title">' +
        item.menu.menuName +
        "</span>" +
        (item.menu.roleMenu.length != 0 ? '<span class="arrow"></span>' : "") +
        "</a>" +
        (item.menu.roleMenu.length != 0
          ? '<ul class="sub-menu">' +
            sigortaCiniShared.addDataToMenu(item.menu.roleMenu) +
            "</ul>"
          : "") +
        "</li>";
      result += menuItem;
    }
    return result;
  }
};
