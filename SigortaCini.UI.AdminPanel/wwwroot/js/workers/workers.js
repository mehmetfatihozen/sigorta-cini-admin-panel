var codes = [];
$(document).ready(function() {
  sigortaCiniWorkers.init();
  $("#organ").on("change", function() {
    if ($("#organ").val() == "") {
      $("#btnAddCode").attr("disabled", "disabled");
      return;
    }
    $("#btnAddCode").removeAttr("disabled", "disabled");
    var optionValue = $(this).val();
    $("#codeId").val(optionValue);
  });

  $("#tel_update").mask("0(999) 999-9999");
  $("#tel_update").live("click", function(e) {
    e.preventDefault();

    $("#tel_update").focus();

    return false;
  });

  $("#codeModala").modal("show");
  $("#btnCodeAdd").click(function() {
    if ($("#codeId").val() == 0) {
      error("Lütfen organizasyon seçiniz.");
      return;
    }
    $("#codesfor")
      .val("0")
      .trigger("change");

    $("#codeModal").modal("show");
    $("#worker_name").val("");
    $("#worker_surname").val("");
    $("#worker_phone").val("");
    $("#worker_phone").mask("0(999) 999-9999");
    $("#worker_phone").live("click", function(e) {
      e.preventDefault();

      $("#worker_phone").focus();

      return false;
    });
    sigortaCiniWorkers.getCodes();
  });
  $("#btnWorkerAdd").click(function() {
    if ($("#codeId").val() == 0) {
      error("Lütfen organizasyon seçiniz.");
      return;
    }
    $("#workerAdd").modal("show");
    $(".new_person").addClass("hide");
    $("#btnAddNewDiv").addClass("hide");
    $("#btnAddWorker").removeClass("hide");
    $("#btnOtherAdd").removeClass("hide");
    sigortaCiniWorkers.getWorkers();
  });
});

$("#btnpr").click(function(e) {
  $("#organ")
    .val("0")
    .select2();
  $("#codeModala").modal("show");
  $("#btnAddCode").attr("disabled", "disabled");
});

$("#btnOtherAdd").click(function(e) {
  $("#alt_content_to").addClass("hide");
  $(".new_person").removeClass("hide");
  $("#btnAddWorker").addClass("hide");
  $("#btnOtherAdd").addClass("hide");
  $("#btnAddNewDiv").removeClass("hide");
  $("#surname_new").val("");
  $("#name_new").val("");
  $("#tel_new").val("");
});

var sigortaCiniWorkers = {
  init: function() {
    this.save();
    this.getall();
    this.getOrgs();
    this.saveForUsers();
    this.saveNewPerson();
    this.updatePerson();
  },

  saveNewPerson: function() {
    $("#btnAddNew").click(function(e) {
      if (
        $("#name_new").val().length == 0 ||
        $("#surname_new").val().length == 0 ||
        $("#tel_new").val().length == 0
      ) {
        error("Lütfen Gerekli Tüm Alanları Doldurunuz");
        return;
      }

      showLoader();
      $.ajax({
        type: "POST",
        url: "/Person/InsertOrUpdatePerson",
        data: {
          PersonFirstName: $("#name_new").val(),
          personLastName: $("#surname_new").val(),
          PersonGsmNumber: $("#tel_new").val(),
          State: true
        },
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            hideLoader();
            error(data.message);
          } else {
            sigortaCiniWorkers.saveForNewUser(dataSet.data.personId);
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  updatePerson: function() {
    $("#btnUpdate").click(function(e) {
      if (
        $("#name_update").val().length == 0 ||
        $("#surname_update").val().length == 0 ||
        $("#tel_update").val().length == 0
      ) {
        error("Lütfen Gerekli Tüm Alanları Doldurunuz");
        return;
      }
      showLoader();
      $.ajax({
        type: "POST",
        url: "/Person/InsertOrUpdatePerson",
        data: {
          PersonId: $("#personId").val(),
          PersonFirstName: $("#name_update").val(),
          PersonLastName: $("#surname_update").val(),
          PersonGsmNumber: $("#tel_update").val()
        },
        dataType: "json",
        success: function(dataSet) {
          sigortaCiniWorkers.justgetall();
          hideLoader();
          $("#workerUpdate").modal("hide");
          success("Başarıyla güncellendi");
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  getWorkers: function() {
    showLoader();
    $.ajax({
      url: "/OrganizationPerson/GetAllPersonWithOrganizationId",
      data: {
        OrganizationId: $("#codeId").val()
      },
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
          sigortaCiniWorkers.fillUsers(dataSet.data);
          $("#alt_content_to").removeClass("hide");
          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  fillUsers: function(dataInput) {
    $(".usersAllCheckBox").html("");
    var htmlStr = "";
    $.each(dataInput, function(itemId, item) {
      var checked = "";
      if (item.state) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsersAll " id="checkboxUsersAll' +
        item.personId +
        '" value="' +
        item.personId +
        '">' +
        item.personFullName +
        "</label>";
      htmlStr += "</div>";
    });
    $(".usersAllCheckBox").html(htmlStr);
  },

  saveForNewUser: function(personId) {
    showLoader();
    var newUser = [];

    newUser.push({
      organizationId: $("#codeId").val(),
      OrganizationPersonState: true,
      PersonId: personId
    });

    $.ajax({
      url: "/OrganizationPerson/CreateOrganizationPerson",
      type: "POST",
      dataType: "json",

      data: {
        organizationPerson: newUser
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
          $("#workerAdd").modal("hide");
          sigortaCiniWorkers.justgetall();
          hideLoader();
          success("Başarıyla kaydedildi");
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  saveForUsers: function() {
    $("#btnAddWorker").click(function() {
      var myusers = [];
      $(".checkboxUsersAll").each(function(index) {
        if (this.checked == true) {
          myusers.push({
            organizationId: $("#codeId").val(),
            OrganizationPersonState: this.checked,
            PersonId: this.value
          });
        }
      });
      if (myusers.length == 0) {
        error("Kullanıcılardan en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/OrganizationPerson/CreateOrganizationPerson",
        type: "POST",
        dataType: "json",
        data: {
          organizationPerson: myusers
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
            $("#workerAdd").modal("hide");
            sigortaCiniWorkers.justgetall();
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

  getCodes: function() {
    showLoader();
    $("#codesfor").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/CampaignCode/GetCampaignCodeByOrganizationId",
      data: {
        organizationId: $("#codeId").val()
      },
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
            $("#codesfor").append(
              new Option(value.campaingCodeValue, value.campaignCodeId)
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

    $("#codesfor").on("change", function() {
      showLoader();
      if ($("#codesfor").val() == "") {
        $("#btnAddCodes").attr("disabled", "disabled");
        $("#alt_content").addClass("hide");
        hideLoader();
        return;
      }
      var optionValue = $(this).val();
      $("#campaigncode").val(optionValue);
      $("#btnAddCodes").removeAttr("disabled", "disabled");
      $.ajax({
        url: "/CampaignCode/GetPersonByCampaignCodeId",
        data: {
          CampaignCodeId: $("#campaigncode").val()
        },
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
            sigortaCiniWorkers.fillDataTableMyCodes(dataSet.data);
            $("#alt_content").removeClass("hide");
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
  fillDataTableMyCodes: function(dataInput) {
    $(".usersCheckBox").html("");
    var htmlStr = "";
    $.each(dataInput, function(itemId, item) {
      var checked = "";
      if (item.state) {
        checked = "checked=checked";
      }
      htmlStr += '<div class="checkbox">';
      htmlStr +=
        '<label><input type="checkbox" ' +
        checked +
        ' class="checkboxUsers " id="checkboxUsers' +
        item.organizationPersonId +
        '" value="' +
        item.organizationPersonId +
        '">' +
        item.person.personFullName +
        "</label>";
      htmlStr += "</div>";
    });
    $(".usersCheckBox").html(htmlStr);
  },

  save: function() {
    $("#btnAddCodes").click(function() {
      var users = [];
      $(".checkboxUsers").each(function(index) {
        if (this.checked == true) {
          users.push({
            state: this.checked,
            organizationPersonId: this.value
          });
        }
      });

      showLoader();

      $.ajax({
        url: "/CampaignCode/UpdateOrganizationPersonCampaignCode",
        type: "PUT",
        dataType: "json",
        data: {
          CampaignId: $("#campaigncode").val(),
          OrganizationPersonList: users
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
            $("#codeModal").modal("hide");
            sigortaCiniWorkers.getCodes(dataSet.data[0].roleId);
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  getOrgs: function() {
    showLoader();
    $("#organ").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/Organization/GetAll",
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
            $("#organ ").append(
              new Option(value.organizationName, value.organizationId)
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

  justgetall: function() {
    showLoader();
    $.ajax({
      url: "/OrganizationPerson/GetOrganizationPerson",
      type: "GET",
      data: {
        organizationId: $("#codeId").val()
      },
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
          sigortaCiniWorkers.fillDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },
  getall: function() {
    $("#btnAddCode").on("click", function() {
      $("#codeModala").modal("hide");
      showLoader();
      $.ajax({
        url: "/OrganizationPerson/GetOrganizationPerson",
        type: "GET",
        data: {
          organizationId: $("#codeId").val()
        },
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
            sigortaCiniWorkers.fillDataTable(dataSet.data);
            hideLoader();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  fillDataTable: function(dataInput) {
    $("#codeTable").DataTable({
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
        { data: "personFirstName" },
        { data: "personLastName" },
        { data: "personGsmNumber" }
      ]
    });

    sigortaCiniWorkers.datatableClick();
  },

  datatableClick: function() {
    $("#codeTable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#codeTable").DataTable();
      var data = table.row(this).data();
      sigortaCiniWorkers.get(data.personId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/Person/GetPersonById",
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
          $("#workerUpdate").modal("show");
          $("#name_update").val(dataSet.data.personFirstName);
          $("#surname_update").val(dataSet.data.personLastName);
          $("#tel_update").val(dataSet.data.personGsmNumber);
          $("#personId").val(dataSet.data.personId);
        }

        hideLoader();
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  }
};
