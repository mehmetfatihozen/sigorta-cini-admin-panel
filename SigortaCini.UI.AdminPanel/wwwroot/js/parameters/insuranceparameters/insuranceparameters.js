var build = {
  buildingParameterId: "",
  buildingParameterName: "",
  buildingParameterDesc: "",
  buildingParameterState: ""
};
var bank = {
  bankParameterId: "",
  bankParameterName: "",
  bankParameterDesc: "",
  bankParameterState: ""
};
var branch = {
  departmentParameterId: "",
  departmentParameterName: "",
  departmentParameterDesc: "",
  departmentParameterState: ""
};
var insurance = {
  insurerParameterId: "",
  insurerParameterName: "",
  insurerParameterDesc: "",
  insurerParameterState: ""
};

var year = {
  buildingYearParameterId: "",
  buildingYearParameterName: "",
  buildingYearParameterDesc: "",
  buildingYearParameterState: ""
};

var floor = {
  totalFloorParameterId: "",
  totalFloorParameterName: "",
  totalFloorParameterDesc: "",
  totalFloorParameterState: ""
};

var type = {
  usingStyleParameterId: "",
  usingStyleParameterName: "",
  usingStyleParameterDesc: "",
  usingStyleParameterState: ""
};

var institution = {
  institutionParameterId: "",
  institutionParameterName: "",
  institutionParameterDesc: "",
  institutionParameterState: ""
};

var finance = {
  institutionTypeParameterId: "",
  institutionTypeParameterName: "",
  institutionTypeParameterDesc: "",
  institutionTypeParameterState: ""
};
var deger = {};
var parameterUrl;
var parameterUrlForAdd;
var getFromBetween = {
  results: [],
  string: "",
  getFromBetween: function(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    var SP = this.string.indexOf(sub1) + sub1.length;
    var string1 = this.string.substr(0, SP);
    var string2 = this.string.substr(SP);
    var TP = string1.length + string2.indexOf(sub2);
    return this.string.substring(SP, TP);
  },
  removeFromBetween: function(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
    this.string = this.string.replace(removal, "");
  },
  getAllResults: function(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

    var result = this.getFromBetween(sub1, sub2);
    this.results.push(result);
    this.removeFromBetween(sub1, sub2);

    if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
      this.getAllResults(sub1, sub2);
    } else return;
  },
  get: function(string, sub1, sub2) {
    this.results = [];
    this.string = string;
    this.getAllResults(sub1, sub2);
    return this.results;
  }
};
$(document).ready(function() {
  sigortaCiniParameters.init();
  $("#new_parameter").click(function() {
    $("#myModalParameter").modal("show");
    $("#ParaName").val("");
    $("#ParaDesc").val("");
    $(".ParaIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#ParaIsActive").attr("checked", "checked");
  });
});
var sigortaCiniParameters = {
  init: function() {
    this.getParameter();
    this.update();
    this.create();
  },

  getParameter: function() {
    $("#parameters").on("change", function() {
      var optionValue = $(this).val();
      $("#name").val("");
      $("#desc").val("");
      $(".IsActiveDiv")
        .find("span")
        .removeClass("checked");
      $("#IsActive").removeAttr("checked");
      if (optionValue == "build") {
        deger = build;
        parameterUrl = "/Parameters/InsertUpdateBuildingParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();

        $.ajax({
          url: "/Parameters/GetBuildingParameters",
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
                var content =
                  "{" +
                  value.buildingParameterName +
                  "}" +
                  "{" +
                  value.buildingParameterDesc +
                  "}" +
                  "{" +
                  value.buildingParameterState +
                  "}" +
                  "{" +
                  value.buildingParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.buildingParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "year") {
        deger = year;
        parameterUrl = "/Parameters/InsertUpdateBuildingYearParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();

        $.ajax({
          url: "/Parameters/GetBuildingYearParameters",
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
                var content =
                  "{" +
                  value.buildingYearParameterName +
                  "}" +
                  "{" +
                  value.buildingYearParameterDesc +
                  "}" +
                  "{" +
                  value.buildingYearParameterState +
                  "}" +
                  "{" +
                  value.buildingYearParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.buildingYearParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          console.log(result);
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "floor") {
        deger = floor;
        parameterUrl = "/Parameters/InsertUpdateTotalFloorParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetTotalFloorParameters",
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
                var content =
                  "{" +
                  value.totalFloorParameterName +
                  "}" +
                  "{" +
                  value.totalFloorParameterDesc +
                  "}" +
                  "{" +
                  value.totalFloorParameterState +
                  "}" +
                  "{" +
                  value.totalFloorParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.totalFloorParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "type") {
        deger = type;
        parameterUrl = "/Parameters/InsertUpdateUsingStyleParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetUsingStyleParameters",
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
                var content =
                  "{" +
                  value.usingStyleParameterName +
                  "}" +
                  "{" +
                  value.usingStyleParameterDesc +
                  "}" +
                  "{" +
                  value.usingStyleParameterState +
                  "}" +
                  "{" +
                  value.usingStyleParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.usingStyleParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "bank") {
        deger = bank;
        parameterUrl = "/Parameters/InsertUpdateBankParameter";

        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetBankParameters",
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
                var content =
                  "{" +
                  value.bankParameterName +
                  "}" +
                  "{" +
                  value.bankParameterDesc +
                  "}" +
                  "{" +
                  value.bankParameterState +
                  "}" +
                  "{" +
                  value.bankParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.bankParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "institution") {
        deger = institution;
        parameterUrl = "/Parameters/InsertUpdateInstitutionParameter";

        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetInstitutionParameters",
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
                var content =
                  "{" +
                  value.institutionParameterName +
                  "}" +
                  "{" +
                  value.institutionParameterDesc +
                  "}" +
                  "{" +
                  value.institutionParameterState +
                  "}" +
                  "{" +
                  value.institutionParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.institutionParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "finance") {
        deger = finance;
        parameterUrl = "/Parameters/InsertUpdateInstitutionTypeParameter";

        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetInstitutionTypeParameters",
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
                var content =
                  "{" +
                  value.institutionTypeParameterName +
                  "}" +
                  "{" +
                  value.institutionTypeParameterDesc +
                  "}" +
                  "{" +
                  value.institutionTypeParameterState +
                  "}" +
                  "{" +
                  value.institutionTypeParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.institutionTypeParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "insurance") {
        deger = insurance;
        parameterUrl = "/Parameters/InsertUpdateInsurerParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetInsurerParameters",
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
                var content =
                  "{" +
                  value.insurerParameterName +
                  "}" +
                  "{" +
                  value.insurerParameterDesc +
                  "}" +
                  "{" +
                  value.insurerParameterState +
                  "}" +
                  "{" +
                  value.insurerParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.insurerParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else if (optionValue == "branch") {
        deger = branch;
        parameterUrl = "/Parameters/InsertUpdateDepartmentParameter";
        showLoader();
        $("#parameter_type").html('<option value="0">Seçiniz</option>');
        $("#parameter_type")
          .val("0")
          .select2();
        $.ajax({
          url: "/Parameters/GetDepartmentParameters",
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
                var content =
                  "{" +
                  value.departmentParameterName +
                  "}" +
                  "{" +
                  value.departmentParameterDesc +
                  "}" +
                  "{" +
                  value.departmentParameterState +
                  "}" +
                  "{" +
                  value.departmentParameterId +
                  "}";
                $("#parameter_type").append(
                  new Option(value.departmentParameterName, content)
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

        $("#parameter_type").on("change", function() {
          var optionValue = $(this).val();
          var result = getFromBetween.get(optionValue, "{", "}");
          $("#name").val(result[0]);
          $("#desc").val(result[1]);
          if (result[2] == "true") {
            $(".IsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#IsActive").attr("checked", "checked");
          } else {
            $(".IsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#IsActive").removeAttr("checked");
          }
          $("#pId").val(result[3]);
        });

        $(".form-body").addClass("h-250");
        $("#alt_content").removeClass("hide");
      } else {
        $(".form-body").removeClass("h-250");
        $("#alt_content").addClass("hide");
      }
    });
  },

  update: function() {
    $("#btn_save").click(function() {
      if ($("#desc").val().length == 0 || $("#name").val().length == 0) {
        error("Lütfen gerekli tüm alanları doldurunuz.");
        return;
      }

      showLoader();
      var isActive = false;
      if ($("#IsActive").attr("checked") == "checked") {
        isActive = true;
      }
      build.buildingParameterDesc = $("#desc").val();
      build.buildingParameterName = $("#name").val();
      build.buildingParameterId = $("#pId").val();
      build.buildingParameterState = isActive;

      bank.bankParameterDesc = $("#desc").val();
      bank.bankParameterName = $("#name").val();
      bank.bankParameterId = $("#pId").val();
      bank.bankParameterState = isActive;

      branch.departmentParameterDesc = $("#desc").val();
      branch.departmentParameterName = $("#name").val();
      branch.departmentParameterId = $("#pId").val();
      branch.departmentParameterState = isActive;

      insurance.insurerParameterDesc = $("#desc").val();
      insurance.insurerParameterName = $("#name").val();
      insurance.insurerParameterId = $("#pId").val();
      insurance.insurerParameterState = isActive;

      year.buildingYearParameterDesc = $("#desc").val();
      year.buildingYearParameterName = $("#name").val();
      year.buildingYearParameterId = $("#pId").val();
      year.buildingYearParameterState = isActive;

      floor.totalFloorParameterDesc = $("#desc").val();
      floor.totalFloorParameterName = $("#name").val();
      floor.totalFloorParameterId = $("#pId").val();
      floor.totalFloorParameterState = isActive;

      type.usingStyleParameterDesc = $("#desc").val();
      type.usingStyleParameterName = $("#name").val();
      type.usingStyleParameterId = $("#pId").val();
      type.usingStyleParameterState = isActive;

      institution.institutionParameterDesc = $("#desc").val();
      institution.institutionParameterName = $("#name").val();
      institution.institutionParameterId = $("#pId").val();
      institution.institutionParameterState = isActive;

      finance.institutionTypeParameterDesc = $("#desc").val();
      finance.institutionTypeParameterName = $("#name").val();
      finance.institutionTypeParameterId = $("#pId").val();
      finance.institutionTypeParameterState = isActive;

      $.ajax({
        url: parameterUrl,
        type: "post",
        dataType: "json",
        data: deger,
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
  },

  create: function() {
    $("#parametersAdd").on("change", function() {
      showLoader();

      var optionValue = $(this).val();

      if (optionValue == "build") {
        deger = build;
        parameterUrlForAdd = "/Parameters/InsertUpdateBuildingParameter";
        hideLoader();
      } else if (optionValue == "year") {
        deger = year;
        parameterUrlForAdd = "/Parameters/InsertUpdateBuildingYearParameter";
        hideLoader();
      } else if (optionValue == "floor") {
        deger = floor;
        parameterUrlForAdd = "/Parameters/InsertUpdateTotalFloorParameter";
        hideLoader();
      } else if (optionValue == "type") {
        deger = type;
        parameterUrlForAdd = "/Parameters/InsertUpdateUsingStyleParameter";
        hideLoader();
      } else if (optionValue == "bank") {
        deger = bank;
        parameterUrlForAdd = "/Parameters/InsertUpdateBankParameter";
        hideLoader();
      } else if (optionValue == "institution") {
        deger = institution;
        parameterUrlForAdd = "/Parameters/InsertUpdateInstitutionParameter";
        hideLoader();
      } else if (optionValue == "finance") {
        deger = finance;
        parameterUrlForAdd = "/Parameters/InsertUpdateInstitutionTypeParameter";
        hideLoader();
      } else if (optionValue == "insurance") {
        deger = insurance;
        parameterUrlForAdd = "/Parameters/InsertUpdateInsurerParameter";
        hideLoader();
      } else if (optionValue == "branch") {
        deger = branch;
        parameterUrlForAdd = "/Parameters/InsertUpdateDepartmentParameter";
        hideLoader();
      } else {
        hideLoader();
        error("Lütfen Parametre Tipini Seçiniz");
      }
    });

    $("#btnAddPara").on("click", function() {
      if (
        $("#ParaDesc").val().length == 0 ||
        $("#ParaName").val().length == 0
      ) {
        error("Lütfen gerekli tüm alanları doldurunuz.");
        return;
      }

      showLoader();
      var isActive = false;
      if ($("#ParaIsActive").attr("checked") == "checked") {
        isActive = true;
      }
      build.buildingParameterDesc = $("#ParaDesc").val();
      build.buildingParameterName = $("#ParaName").val();
      build.buildingParameterId = null;
      build.buildingParameterState = isActive;

      bank.bankParameterDesc = $("#ParaDesc").val();
      bank.bankParameterName = $("#ParaName").val();
      bank.bankParameterId = null;
      bank.bankParameterState = isActive;

      branch.departmentParameterDesc = $("#ParaDesc").val();
      branch.departmentParameterName = $("#ParaName").val();
      branch.departmentParameterId = null;
      branch.departmentParameterState = isActive;

      insurance.insurerParameterDesc = $("#ParaDesc").val();
      insurance.insurerParameterName = $("#ParaName").val();
      insurance.insurerParameterId = null;
      insurance.insurerParameterState = isActive;

      year.buildingYearParameterDesc = $("#ParaDesc").val();
      year.buildingYearParameterName = $("#ParaName").val();
      year.buildingYearParameterId = null;
      year.buildingYearParameterState = isActive;

      floor.totalFloorParameterDesc = $("#ParaDesc").val();
      floor.totalFloorParameterName = $("#ParaName").val();
      floor.totalFloorParameterId = null;
      floor.totalFloorParameterState = isActive;

      type.usingStyleParameterDesc = $("#ParaDesc").val();
      type.usingStyleParameterName = $("#ParaName").val();
      type.usingStyleParameterId = null;
      type.usingStyleParameterState = isActive;

      institution.institutionParameterDesc = $("#ParaDesc").val();
      institution.institutionParameterName = $("#ParaName").val();
      institution.institutionParameterId = null;
      institution.institutionParameterState = isActive;

      finance.institutionTypeParameterDesc = $("#ParaDesc").val();
      finance.institutionTypeParameterName = $("#ParaName").val();
      finance.institutionTypeParameterId = null;
      finance.institutionTypeParameterState = isActive;

      $.ajax({
        url: parameterUrlForAdd,
        type: "post",
        dataType: "json",
        data: deger,
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
