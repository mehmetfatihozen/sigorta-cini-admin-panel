$(document).ready(function() {
  sigortaCiniProductTerms.init();

  $("#company").change(function(e) {
    e.preventDefault();
    if ($("#company").val() != "") {
      sigortaCiniProductTerms.getVariants();
      $("#product").prop("disabled", false);
    } else {
      $("#product").prop("disabled", "disabled");
      $("#variant").prop("disabled", "disabled");
      $("#product")
        .val("")
        .select2();
      $("#variant")
        .val("")
        .select2();
    }
  });

  $("#product").change(function(e) {
    e.preventDefault();
    if ($("#product").val() != "") {
      sigortaCiniProductTerms.getVariants();
      $("#variant").prop("disabled", false);
    } else {
      $("#variant").prop("disabled", "disabled");
      $("#variant")
        .val("")
        .select2();
    }
  });

  $("#company_update").change(function(e) {
    e.preventDefault();
    if ($("#company_update").val() != "") {
      sigortaCiniProductTerms.getVariantsForUpdate(0, 0, 0);
      $("#product_update").prop("disabled", false);
    } else {
      $("#product_update").prop("disabled", "disabled");
      $("#variant_update").prop("disabled", "disabled");
      $("#product_update")
        .val("")
        .select2();
      $("#variant_update")
        .val("")
        .select2();
    }
  });

  $("#product_update").change(function(e) {
    e.preventDefault();
    if ($("#product_update").val() != "") {
      sigortaCiniProductTerms.getVariantsForUpdate(0, 0, 0);
      $("#variant_update").prop("disabled", false);
    } else {
      $("#variant_update").prop("disabled", "disabled");
      $("#variant_update")
        .val("")
        .select2();
    }
  });

  $("#IsLimitAvaible").change(function(e) {
    e.preventDefault();
    if ($("#IsLimitAvaible").attr("checked") == "checked") {
      $("#yt").prop("disabled", "disabled");
      $("#yt").val("");
    } else {
      $("#yt").prop("disabled", false);
    }
  });

  $("#IsLimitAvaibleUpdate").change(function(e) {
    e.preventDefault();
    if ($("#IsLimitAvaibleUpdate").attr("checked") == "checked") {
      $("#yt_update").prop("disabled", "disabled");
      $("#yt_update").val("");
    } else {
      $("#yt_update").prop("disabled", false);
    }
  });

    $("#isBirthTermLimitless").change(function (e) {
        e.preventDefault();
        if ($("#isBirthTermLimitless").attr("checked") === "checked") {
            $("#numberOfBirthTerm").prop("disabled", "disabled");
            $("#numberOfBirthTerm").val("");
        } else {
            $("#numberOfBirthTerm").prop("disabled", false);
        }
    });

    $("#isBirthTermLimitlessUpdate").change(function (e) {
        e.preventDefault();
        if ($("#isBirthTermLimitlessUpdate").attr("checked") === "checked") {
            $("#numberOfBirthTermUpdate").prop("disabled", "disabled");
            $("#numberOfBirthTermUpdate").val("");
        } else {
            $("#numberOfBirthTermUpdate").prop("disabled", false);
        }
    });

  $("#IsDurationTime").change(function(e) {
    e.preventDefault();
    if ($("#IsDurationTime").attr("checked") == "checked") {
      $("#duration_time").prop("disabled", "disabled");
      $("#duration_time").val("");
    } else {
      $("#duration_time").prop("disabled", false);
    }
  });

  $("#IsDurationTimeUpdate").change(function(e) {
    e.preventDefault();
    if ($("#IsDurationTimeUpdate").attr("checked") == "checked") {
      $("#duration_time_update").prop("disabled", "disabled");
      $("#duration_time_update").val("");
    } else {
      $("#duration_time_update").prop("disabled", false);
    }
  });

  $("input[type=radio][name=mygroup]").change(function() {
    if (this.value == 1) {
      $("#year").prop("disabled", false);
      $("#year").val("");
      $("#mygroupid").val(1);
    } else {
      $("#year").prop("disabled", "disabled");
      $("#year").val("");
      $("#mygroupid").val(2);
    }
  });

    $("input[type=radio][name=hasPsychologicalSupport]").change(function () {
        if (this.value === "1") {
            $("#hasPsychologicalSupport").val("1");
        } else {
            $("#hasPsychologicalSupport").val("0");
        }
    });

    $("input[type=radio][name=hasDieticianService]").change(function () {
        if (this.value === "1") {
            $("#hasDieticianService").val("1");
        } else {
            $("#hasDieticianService").val("0");
        }
    });

  $("input[type=radio][name=mygroupupdate]").change(function() {
    if (this.value == 1) {
      $("#year_update").prop("disabled", false);
      $("#year_update").val("");
      $("#mygroupidupdate").val(1);
    } else {
      $("#year_update").prop("disabled", "disabled");
      $("#year_update").val("");
      $("#mygroupidupdate").val(2);
    }
  });

    $("input[type=radio][name=hasPsychologicalSupportUpdate]").change(function () {
        if (this.value === "1") {
            $("#hasPsychologicalSupportUpdate").val("1");
        } else {
            $("#hasPsychologicalSupportUpdate").val("0");
        }
    });

    $("input[type=radio][name=hasDieticianServiceUpdate]").change(function () {
        if (this.value === "1") {
            $("#hasDieticianServiceUpdate").val("1");
        } else {
            $("#hasDieticianServiceUpdate").val("0");
        }
    });

  $("#btnParameterAdd").click(function() {
    sigortaCiniProductTerms.clear();
    sigortaCiniProductTerms.getCompanies();
    sigortaCiniProductTerms.getProducts();
    $("#AddParameterModal").modal("show");
  });
});

var sigortaCiniProductTerms = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  clear: function() {
    $("#company")
      .val("")
      .select2();
    $("#product")
      .val("")
      .select2();
    $("#yt").val("");
    $("#at").val("");
    $("#variant")
      .val("")
      .select2();
    $("#institution_network").val("");
    $("#entry_age_from").val("");
    $("#entry_age_to").val("");
    $("#past_diseases").val("");
    $("#duration_time").val("");
    $("#IsLimitAvaible").attr("checked", false);
    $("#isBirthTermLimitless").attr("checked", false);
    $("#numberOfBirthTerm").prop("disabled", false);
    $("#numberOfBirthTerm").val("");
    $("#IsDurationTime").attr("checked", false);
    $("#duration_time").prop("disabled", false);
    $("#yt").prop("disabled", false);
    $("#year").prop("disabled", "disabled");
    $("#mygroupid").val("2");
    $("#year").val("");
    $("#hasPsychologicalSupport").val("0");
    $("#hasDieticianService").val("0");
    $('input[type=radio][name="hasDieticianService"][id="no"]').attr("checked","checked");
    $('input[type=radio][name="hasPsychologicalSupport"][id="no"]').attr("checked","checked");
    $('input[type=radio][name="mygroup"][id="no"]').attr("checked","checked");
    $("#product").prop("disabled", "disabled");
    $("#variant").prop("disabled", "disabled");
  },

  getCompanies: function() {
    showLoader();
    $("#company").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/CPMCategory/GetAllCompanies",
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
            $("#company").append(
              new Option(value.companyName, value.companyId)
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
  },

  getProducts: function() {
    showLoader();
    $("#product").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/ProductMidCategory/GetAllByGroup",
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
          $.each(dataSet.data, function(index, item) {
            $("#product").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
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
  },

  getVariants: function() {
    showLoader();
    $("#variant").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/ProductTerms/GetVariantsByCompanyAndProduct",
      type: "GET",
      data: {
        CompanyId: $("#company").val(),
        ProductMidCatId: $("#product").val()
      },
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        } else {
          $.each(dataSet.data, function(index, item) {
            $("#variant").append(new Option(item.variantName, item.variantId));
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

  getVariantsForUpdate: function(productid, companyid, variantid) {
    if (productid == 0 || companyid == 0) {
      showLoader();
      $("#variant_update").html('<option  value="">Seçiniz</option>');
      $.ajax({
        url: "/ProductTerms/GetVariantsByCompanyAndProduct",
        type: "GET",
        dataType: "json",
        data: {
          CompanyId: $("#company_update").val(),
          ProductMidCatId: $("#product_update").val()
        },
        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            hideLoader();
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, item) {
              $("#variant_update").append(
                new Option(item.variantName, item.variantId)
              );
            });
            $("#variant_update")
              .val("")
              .select2();
            hideLoader();
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    } else {
      showLoader();
      $("#variant_update").html('<option  value="">Seçiniz</option>');
      $.ajax({
        url: "/ProductTerms/GetVariantsByCompanyAndProduct",
        type: "GET",
        dataType: "json",
        data: {
          CompanyId: companyid,
          ProductMidCatId: productid
        },
        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            hideLoader();
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, item) {
              $("#variant_update").append(
                new Option(item.variantName, item.variantId)
              );
            });
            $("#variant_update")
              .val(variantid)
              .select2();
            $("#variant_update").prop("disabled", false);
            hideLoader();
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    }
  },

  getCompaniesForUpdate: function(companyid) {
    showLoader();
    $("#company_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/CPMCategory/GetAllCompanies",
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
            $("#company_update").append(
              new Option(value.companyName, value.companyId)
            );
          });
          $("#company_update")
            .val(companyid)
            .select2();
          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getProductsForUpdate: function(productid) {
    showLoader();
    $("#product_update").html('<option  value="">Seçiniz</option>');
    $.ajax({
      url: "/ProductMidCategory/GetAllByGroup",
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
          $.each(dataSet.data, function(index, item) {
            $("#product_update").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
            );
          });
          $("#product_update")
            .val(productid)
            .select2();
          $("#product_update").prop("disabled", false);

          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  create: function() {
    $("#parameterAdd").click(function() {
      if ($("#company").val() == "") {
        error("Sigorta şirketi seçiniz.");
        return;
      }

      if ($("#product").val() == "") {
        error("Ürün seçiniz.");
        return;
      }

      if ($("#variant").val() == "") {
        error("Variant seçiniz.");
        return;
      }

      if (
        $("#yt").val() == "" &&
        $("#IsLimitAvaible").attr("checked") != "checked"
      ) {
        error("Yatarak alanını boş geçmeyiniz.");
        return;
      }

        if (
            $("#numberOfBirthTerm").val() === "" &&
            $("#isBirthTermLimitless").attr("checked") !== "checked"
        ) {
            error("Doğum hizmeti alanını boş geçmeyiniz.");
            return;
        }

      if ($("#at").val() == "") {
        error("Ayakta alanını boş geçmeyiniz.");
        return;
      }

      if ($("#entry_age_from").val() === "" || $("#entry_age_to").val() === "") {
        error("Giriş yaşı aralığı değerlerini eksiksiz giriniz.");
        return;
      }

      if ($("#entry_age_from").val() !== "" && $("#entry_age_to").val() !== "") {
        if ($("#entry_age_to").val() <= $("#entry_age_from").val()) {
            error("Giriş yaşı aralığı doğru giriniz. İkinci değer birinci değerden büyük olmalıdır.");
            return;
        }
        if ($("#entry_age_from").val() < 0 || $("#entry_age_to").val() < 0) {
            error("Giriş yaşı aralığı doğru giriniz. Değerler 0'da küçük olamaz.");
            return;
        }
        if ($("#entry_age_from").val() > 120 || $("#entry_age_to").val() > 120) {
          error("Giriş yaşı aralığı doğru giriniz. Değerler 120'den büyük olamaz.");
          return;
        }
      }

      if (
        $("#duration_time").val() == "" &&
        $("#IsDurationTime").attr("checked") != "checked"
      ) {
        error("Bekleme Süresi alanını boş geçmeyiniz.");
        return;
      }

      if ($("#mygroupid").val() == "") {
        error("Yenileme Garantisi tipini seçiniz.");
        return;
      }

        if ($("#hasPsychologicalSupport").val() === "") {
            error("Psikolojik destek hizmeti seçimi yapınız.");
            return;
        }

        if ($("#hasDieticianService").val() === "") {
            error("Diyetisyen hizmeti seçimi yapınız.");
            return;
        }

      if ($("#mygroupid").val() == "1" && $("#year").val() == "") {
        error("Yenileme Garantisi yılı alanını giriniz.");
        return;
      }

      if ($("#institution_network").val() == "") {
        error("Hastane Ağı alanını giriniz.");
        return;
      }

      if ($("#past_diseases").val() == "") {
        error("Geçmiş Hastalıklar alanını giriniz.");
        return;
      }

      var yenileme = false;
      var year = "";
      if ($("#mygroupid").val() == "1") {
        yenileme = true;
        year = $("#year").val();
      }

        var hasDieticianService = false;
        if ($("#hasDieticianService").val() === "1") {
            hasDieticianService = true;
        }

        var hasPsychologicalSupport = false;
        if ($("#hasPsychologicalSupport").val() === "1") {
            hasPsychologicalSupport = true;
        }

      var limit = false;
      var yt = $("#yt").val().split(".").join("");
      if ($("#IsLimitAvaible").attr("checked") == "checked") {
        limit = true;
        yt = "";
        }

        var isBirthTermLimitless = false;
        var numberOfBirthTerm = $("#numberOfBirthTerm").val();
        if ($("#isBirthTermLimitless").attr("checked") === "checked") {
            isBirthTermLimitless = true;
            numberOfBirthTerm = "";
        }

      var duration = $("#duration_time").val();
      if ($("#IsDurationTime").attr("checked") == "checked") {
        duration = "0";
      }

      showLoader();
      $.ajax({
        url: "/ProductTerms/Create",
        type: "POST",
        data: {
          CompanyId: $("#company").val(),
          ProductMidCatId: $("#product").val(),
          VariantId: $("#variant").val(),
          LayTime: duration,
          NumberOfOutpatient: $("#at").val(),
          IsInpatientLimitless: limit,
          NumberOfInpatient: yt,
          IsBirthTermLimitless: isBirthTermLimitless,
          NumberOfBirthTerm: numberOfBirthTerm,
          HasDieticianService: hasDieticianService,
          HasPsychologicalSupport: hasPsychologicalSupport,
          BirthState: 2,
          HasRenewalPeriod: yenileme,
          RenewalPeriod: year,
          TermLink: $("#institution_network").val(),
          EntryAgeRange: $("#entry_age_from").val() + "-" + $("#entry_age_to").val(),
          PastDiseases: $("#past_diseases").val()
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
            hideLoader();
            sigortaCiniProductTerms.getall();
            $("#AddParameterModal").modal("hide");
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
    $("#parameterUpdate").click(function() {
      if ($("#company_update").val() == "") {
        error("Sigorta şirketi seçiniz.");
        return;
      }

      if ($("#product_update").val() == "") {
        error("Ürün seçiniz.");
        return;
      }

      if ($("#variant_update").val() == "") {
        error("Variant seçiniz.");
        return;
      }

      if (
        $("#yt_update").val() == "" &&
        $("#IsLimitAvaibleUpdate").attr("checked") != "checked"
      ) {
        error("Yatarak alanını boş geçmeyiniz.");
        return;
        }

        if (
            $("#numberOfBirthTermUpdate").val() === "" &&
            $("#isBirthTermLimitlessUpdate").attr("checked") !== "checked"
        ) {
            error("Doğum hizmeti alanını boş geçmeyiniz.");
            return;
        }

      if ($("#at_update").val() == "") {
        error("Ayakta alanını boş geçmeyiniz.");
        return;
      }

      if ($("#entry_age_from_update").val() === "" || $("#entry_age_to_update").val() === "") {
        error("Giriş yaşı aralığı değerlerini eksiksiz giriniz.");
        return;
      }

      if ($("#entry_age_from_update").val() !== "" && $("#entry_age_to_update").val() !== "") {
        if ($("#entry_age_to_update").val() <= $("#entry_age_from_update").val()) {
          error("Giriş yaşı aralığı doğru giriniz. İkinci değer birinci değerden büyük olmalıdır.");
          return;
        }
        if ($("#entry_age_from_update").val() < 0 || $("#entry_age_to_update").val() < 0) {
          error("Giriş yaşı aralığı doğru giriniz. Değerler 0'da küçük olamaz.");
          return;
        }
        if ($("#entry_age_from_update").val() > 120 || $("#entry_age_to_update").val() > 120) {
          error("Giriş yaşı aralığı doğru giriniz. Değerler 120'den büyük olamaz.");
          return;
        }
      }

      if (
        $("#duration_time_update").val() == "" &&
        $("#IsDurationTimeUpdate").attr("checked") != "checked"
      ) {
        error("Bekleme Süresi alanını boş geçmeyiniz.");
        return;
      }

      if ($("#mygroupidupdate").val() == "") {
        error("Yenileme Garantisi tipini seçiniz.");
        return;
      }

        if ($("#hasPsychologicalSupportUpdate").val() === "") {
            error("Psikolojik destek hizmeti seçimi yapınız.");
            return;
        }

        if ($("#hasDieticianServiceUpdate").val() === "") {
            error("Diyetisyen hizmeti seçimi yapınız.");
            return;
        }

      if ($("#mygroupidupdate").val() == "1" && $("#year_update").val() == "") {
        error("Yenileme Garantisi yılı alanını giriniz.");
        return;
      }

      if ($("#institution_network_update").val() == "") {
        error("Hastane Ağı alanını giriniz.");
        return;
      }

      if ($("#past_diseases_update").val() == "") {
        error("Geçmiş Hastalıklar alanını giriniz.");
        return;
      }

      var yenileme = false;
      var year = "";
      if ($("#mygroupidupdate").val() == "1") {
        yenileme = true;
        year = $("#year_update").val();
      }

        var hasDieticianServiceUpdate = false;
        if ($("#hasDieticianServiceUpdate").val() === "1") {
            hasDieticianServiceUpdate = true;
        }

        var hasPsychologicalSupportUpdate = false;
        if ($("#hasPsychologicalSupportUpdate").val() === "1") {
            hasPsychologicalSupportUpdate = true;
        }

      var limit = false;
      var yt = $("#yt_update").val().split(".").join("");;
      if ($("#IsLimitAvaibleUpdate").attr("checked") == "checked") {
        limit = true;
        yt = "";
        }

        var isBirthTermLimitless = false;
        var numberOfBirthTerm = $("#numberOfBirthTermUpdate").val();
        if ($("#isBirthTermLimitlessUpdate").attr("checked") === "checked") {
            isBirthTermLimitless = true;
            numberOfBirthTerm = "";
        }

      var duration = $("#duration_time_update").val();
      if ($("#IsDurationTimeUpdate").attr("checked") == "checked") {
        duration = "0";
      }

      showLoader();

      $.ajax({
        url: "/ProductTerms/Update",
        type: "PUT",
        data: {
          CompanyProductTermId: $("#parameterId").val(),
          CompanyId: $("#company_update").val(),
          ProductMidCatId: $("#product_update").val(),
          VariantId: $("#variant_update").val(),
          LayTime: duration,
          NumberOfOutpatient: $("#at_update").val(),
          IsInpatientLimitless: limit,
          NumberOfInpatient: yt,
          IsBirthTermLimitless: isBirthTermLimitless,
          NumberOfBirthTerm: numberOfBirthTerm,
          HasDieticianService: hasDieticianServiceUpdate,
          HasPsychologicalSupport: hasPsychologicalSupportUpdate,
          BirthState: 2,
          HasRenewalPeriod: yenileme,
          RenewalPeriod: year,
          TermLink: $("#institution_network_update").val(),
          EntryAgeRange: $("#entry_age_from_update").val() + "-" + $("#entry_age_to_update").val(),
          PastDiseases: $("#past_diseases_update").val()
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
            sigortaCiniProductTerms.getall();
            $("#UpdateParameterModal").modal("hide");
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
      url: "/ProductTerms/GetAll",
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
          sigortaCiniProductTerms.fillDataTable(dataSet);
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
    $("#parameter_table").DataTable({
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
        { data: "company.companyName" },
        { data: "productMidCat.productMidCatDesc" },
        { data: "numberOfInpatient" },
        { data: "numberOfOutpatient" },
        { data: "layTime" },
        { data: "hasRenewalPeriod" },
        { data: "termLink" }
      ]
    });

    sigortaCiniProductTerms.datatableClick();
  },

  datatableClick: function() {
    $("#parameter_table tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      table = $("#parameter_table").DataTable();
      var data = table.row(this).data();
      sigortaCiniProductTerms.get(data.companyProductTermId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/ProductTerms/GetById",
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
          $("#UpdateParameterModal").modal("show");

          $("#institution_network_update").val(dataSet.data.termLink);

          if(dataSet.data.entryAgeRange){
              $("#entry_age_from_update").val(dataSet.data.entryAgeRange.split("-")[0]);
              $("#entry_age_to_update").val(dataSet.data.entryAgeRange.split("-")[1]);
          }
          else {
              $("#entry_age_from_update").val("");
              $("#entry_age_to_update").val("");
          }
          $("#past_diseases_update").val(dataSet.data.pastDiseases);
          $("#at_update").val(dataSet.data.numberOfOutpatient);

          if (dataSet.data.isInpatientLimitless) {
            $("#IsLimitAvaibleUpdate").attr("checked", "checked");
            $("#yt_update").prop("disabled", "disabled");
            $("#yt_update").val("");
          } else {
            $("#IsLimitAvaibleUpdate").attr("checked", false);
            $("#yt_update").prop("disabled", false);
            $("#yt_update").val(dataSet.data.numberOfInpatient);
            formatCurrency($("#yt_update"));
          }

            if (dataSet.data.isBirthTermLimitless) {
                $("#isBirthTermLimitlessUpdate").attr("checked", "checked");
                $("#numberOfBirthTermUpdate").prop("disabled", "disabled");
                $("#numberOfBirthTermUpdate").val("");
            } else {
                $("#isBirthTermLimitlessUpdate").attr("checked", false);
                $("#numberOfBirthTermUpdate").prop("disabled", false);
                $("#numberOfBirthTermUpdate").val(dataSet.data.numberOfBirthTerm);
            }

          if (dataSet.data.layTime == 0) {
            $("#IsDurationTimeUpdate").attr("checked", "checked");
            $("#duration_time_update").prop("disabled", "disabled");
            $("#duration_time_update").val("");
          } else {
            $("#IsDurationTimeUpdate").attr("checked", false);
            $("#duration_time_update").prop("disabled", false);
            $("#duration_time_update").val(dataSet.data.layTime);
          }

          if (dataSet.data.hasRenewalPeriod) {
            $("#mygroupidupdate").val(1);
            $('input[type=radio][name="mygroupupdate"][id="yes"]').attr(
              "checked",
              "checked"
            );
            $("#year_update").prop("disabled", false);
            $("#year_update").val(dataSet.data.renewalPeriod);
          } else {
            $("#mygroupidupdate").val(2);
            $("#year_update").prop("disabled", "disabled");
            $('input[type=radio][name="mygroupupdate"][id="no"]').attr(
              "checked",
              "checked"
            );
            $("#year_update").val("");
          }

            if (dataSet.data.hasPsychologicalSupport) {
                $("#hasPsychologicalSupportUpdate").val("1");
                $('input[type=radio][name="hasPsychologicalSupportUpdate"][id="yes"]').attr(
                    "checked",
                    "checked"
                );
            } else {
                $("#hasPsychologicalSupportUpdate").val("0");
                $('input[type=radio][name="hasPsychologicalSupportUpdate"][id="no"]').attr(
                    "checked",
                    "checked"
                );
            }

            if (dataSet.data.hasDieticianService) {
                $("#hasDieticianServiceUpdate").val("1");
                $('input[type=radio][name="hasDieticianServiceUpdate"][id="yes"]').attr(
                    "checked",
                    "checked"
                );
            } else {
                $("#hasDieticianServiceUpdate").val("0");
                $('input[type=radio][name="hasDieticianServiceUpdate"][id="no"]').attr(
                    "checked",
                    "checked"
                );
            }

          $("#parameterId").val(dataSet.data.companyProductTermId);
          sigortaCiniProductTerms.getProductsForUpdate(
            dataSet.data.productMidCatId
          );
          sigortaCiniProductTerms.getCompaniesForUpdate(dataSet.data.companyId);
          sigortaCiniProductTerms.getVariantsForUpdate(
            dataSet.data.productMidCatId,
            dataSet.data.companyId,
            dataSet.data.variantId
          );

          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};

$("input[data-type='yt']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this));
    }
});

function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function formatCurrency(input) {
    if (input.val().replace(/0/g, '') === "") { input.val(""); }
    var input_val = input.val();

    if (input_val === "") { return }

    var original_len = input_val.length;

    var caret_pos = input.prop("selectionStart");

    input_val = formatNumber(input_val);

    input.val(input_val);

    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}