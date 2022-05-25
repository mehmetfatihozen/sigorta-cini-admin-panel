$(document).ready(function() {
  sigortaCiniTenant.init();
  $("#tenant_tel, #tenant_update_tel").mask("0(999) 999-9999");
  $("#tenant_tel, #tenant_update_tel").live("click", function(e) {
    e.preventDefault();

    $("#tenant_tel, #tenant_update_tel").focus();

    return false;
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#tenant_preview_image").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function readURLforUpdate(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#tenant_view_image").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#IsSigortaCini").change(function(e) {
    e.preventDefault();
    if ($("#IsSigortaCini").attr("checked") == "checked") {
      $("#parent_tenant").prop("disabled", "disabled");
      $("#parent_tenant")
        .val("")
        .select2();
    } else {
      $("#parent_tenant").prop("disabled", false);
    }
  });

  $("#IsSigortaCiniUpdate").change(function(e) {
    e.preventDefault();
    if ($("#IsSigortaCiniUpdate").attr("checked") == "checked") {
      $("#parent_tenant_update").prop("disabled", "disabled");
      $("#parent_tenant_update")
        .val("")
        .select2();
    } else {
      $("#parent_tenant_update").prop("disabled", false);
      showLoader();
      $.ajax({
        url: "/Tenant/GetAll",
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
            $.each(dataSet.data, function(id, item) {
              $("#parent_tenant_update").append(
                new Option(item.tenantName, item.tenantId)
              );
            });
            hideLoader();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    }
  });

  $("#selectAllProducts").click(function() {
    if ($("#selectAllProducts").is(":checked")) {
      $("#product_name > option").prop("selected", "selected");
      $("#product_name").trigger("change");
    } else {
      $("#product_name > option").removeAttr("selected");
      $("#product_name").trigger("change");
    }
  });

  $("#selectAllProductsForUpdate").click(function() {
    if ($("#selectAllProductsForUpdate").is(":checked")) {
      $("#product_name_update > option").prop("selected", "selected");
      $("#product_name_update").trigger("change");
    } else {
      $("#product_name_update > option").removeAttr("selected");
      $("#product_name_update").trigger("change");
    }
  });

  $('input[type="file"][id="tenant_image"]').bind("change", function() {
    var file = $('input[type="file"][id="tenant_image"]').val();
    var exts = ["png", "jpg", "jpeg", "gif"];
    if (file) {
      var get_ext = file.split(".");
      get_ext = get_ext.reverse();
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
        readURL(this);
      } else {
        $('input[type="file"][id="tenant_image"]').val("");
        error("Geçersiz dosya türü");
        return;
      }
    }

    if (file && this.files[0].size > 8388608) {
      $('input[type="file"][id="tenant_image"]').val("");
      error("Maksimum dosya boyutu 8 MB'dır.");
      return;
    }
  });

  $('input[type="file"][id="tenant_update_image"]').bind("change", function() {
    var file = $('input[type="file"][id="tenant_update_image"]').val();
    var exts = ["png", "jpg", "jpeg", "gif"];
    if (file) {
      var get_ext = file.split(".");
      get_ext = get_ext.reverse();
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
        readURLforUpdate(this);
      } else {
        $('input[type="file"][id="tenant_update_image"]').val("");
        error("Geçersiz dosya türü");
        return;
      }
    }

    if (file && this.files[0].size > 8388608) {
      $('input[type="file"][id="tenant_update_image"]').val("");
      error("Maksimum dosya boyutu 8 MB'dır. ");
      return;
    }
  });

  $("input[type=radio][name=mygroup]").change(function() {
    if (this.value == 1) {
      $("#tenan_email").prop("disabled", false);
      $("#tenan_email").val("@");

      $("#mygroupid").val(1);
    } else {
      $("#tenan_email").prop("disabled", "disabled");
      $("#tenan_email").val("");
      $("#mygroupid").val(2);
    }
  });

  $("input[type=radio][name=mygroupupdate]").change(function() {
    if (this.value == 1) {
      $("#tenant_update_email").prop("disabled", false);
      $("#mygroupidforupdate").val(1);
    } else {
      $("#tenant_update_email").prop("disabled", "disabled");
      $("#mygroupidforupdate").val(2);
    }
  });

  $("#btnTenantAdd").click(function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    sigortaCiniTenant.getProducts();
    sigortaCiniTenant.getTenants();
    sigortaCiniTenant.clearForAdd();
    $("#tenantAddModal").modal("show");
  });
});
var sigortaCiniTenant = {
  init: function() {
    this.create();
    this.update();
    this.getall();
  },

  clearForAdd: function() {
    $("#selectAllProducts").attr("checked", false);
    $("#tenant_name").val("");
    $("#tenant_desc").val("");
    $("#tenant_tel").val("");
    $("#tenant_update_email").val("");
    $("#tenant_preview_image").attr("src", "");
    $('input[type="file"][id="tenant_image"]').val("");
    $('input[type=radio][name="mygroup"]').attr("checked", false);
    $("#parent_tenant")
      .val("")
      .select2();
    $(".TenantIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#TenantIsActive").attr("checked", "checked");
    $(".SmsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#SmsActive").attr("checked", "checked");
    $(".IsSigortaCiniDiv")
      .find("span")
      .removeClass("checked");
    $("#IsSigortaCini").attr("checked", false);
    $(".AllowCallYouDiv")
      .find("span")
      .removeClass("checked");
    $("#AllowCallYou").attr("checked", false);
    $(".IsLeadDiv")
      .find("span")
      .removeClass("checked");
    $(".IsLeadUserCodeActiveDiv")
      .find("span")
      .removeClass("checked");
    $(".IsRegistryActiveDiv")
      .find("span")
      .removeClass("checked");
    $("#IsLead").attr("checked", false);
    $("#isLeadUserCodeActive").attr("checked", false);
    $("#isRegistryActive").attr("checked", false);
    $(".CampaignCodeDiv")
      .find("span")
      .removeClass("checked");
    $("#CampaignCode").attr("checked", false);
    $("#parent_tenant").prop("disabled", false);
    $("#tenan_email").prop("disabled", "disabled");
    $("#product_name")
      .val("")
      .select2();
    $("#mygroupid").val("");
  },

  getTenants: function() {
    showLoader();
    $("#parent_tenant").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAll",
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
          $.each(dataSet.data, function(id, item) {
            $("#parent_tenant").append(
              new Option(item.tenantName, item.tenantId)
            );
          });
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getProducts: function() {
    showLoader();
    $("#product_name").html(
      '<option disabled="disabled" value="">Seçiniz</option>'
    );
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
            $("#product_name").append(
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

  create: function() {
    $("#tenant_form").on("submit", function(e) {
      e.preventDefault();

      if (
        $("#mygroupid").val() == 1 &&
        !$("#tenan_email")
          .val()
          .match("^@")
      ) {
        error("Email alanı '@' ile başlamalıdır.");
        return;
      }

      if (
        $("#parent_tenant").val() == "" &&
        $("#IsSigortaCini").attr("checked") != "checked"
      ) {
        error("Ana tenant seçiniz.");
        return;
      }

      if ($("#tenant_name").val() == "") {
        error("Tenant adını alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_desc").val() == "") {
        error("Tenant açıklamasını alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_tel").val() == "") {
        error("Tenant telefon alanını boş geçmeyiniz.");
        return;
      }

      if ($("#mygroupid").val() == "") {
        error("Lütfen giriş tipini seçiniz.");
        return;
      }

      if ($("#product_name").val() == "") {
        error("Lütfen ürün seçiniz");
        return;
      }

      if ($("#mygroupid").val() == 1 && $("#tenan_email").val() == "") {
        error("Email alanını boş geçmeyiniz.");
        return;
      }

      showLoader();

      var parentTenant = $("#parent_tenant").val();

      var isActive = false;

      var smsLoginActive = false;

      var IsAllowedAllMail = false;

      var AllowCallYou = true;

      var isLead = false;

      var isLeadUserCodeActive = false;

      var isRegistryActive = false;

      var AllowCampaignCode = true;

      var emailvalue = $("#tenan_email").val();

      var products = [];

      if ($("#TenantIsActive").attr("checked") == "checked") {
        isActive = true;
      }

      if ($("#SmsActive").attr("checked") == "checked") {
        smsLoginActive = true;
      }

      if ($("#AllowCallYou").attr("checked") == "checked") {
        AllowCallYou = false;
      }

      if ($("#IsLead").attr("checked") == "checked") {
        isLead = true;
      }

      if ($("#isLeadUserCodeActive").attr("checked") === "checked") {
        isLeadUserCodeActive = true;
      }

      if ($("#isRegistryActive").attr("checked") === "checked") {
        isRegistryActive = true;
      }

      if ($("#CampaignCode").attr("checked") == "checked") {
        AllowCampaignCode = false;
      }

      if ($("#IsSigortaCini").attr("checked") == "checked") {
        parentTenant = "null";
      }

      if ($("#mygroupid").val() != 1) {
        emailvalue = "";
        IsAllowedAllMail = true;
      }

      $.each($("#product_name").val(), function(index, val) {
        products.push(val);
      });

      var $form = $("#tenant_form");
      var ajaxData = new FormData($form[0]);
      ajaxData.append("parentTenantId", parentTenant);
      ajaxData.append("TenantId", 0);
      ajaxData.append("Token", "null");
      ajaxData.append("TenantName", $("#tenant_name").val());
      ajaxData.append("TenantDesc", $("#tenant_desc").val());
      ajaxData.append("phone", $("#tenant_tel").val());
      ajaxData.append("State", isActive);
      ajaxData.append("IsAllowedAllMail", IsAllowedAllMail);
      ajaxData.append("Email", emailvalue);
      ajaxData.append("IsCampaignCodeDisabled", AllowCampaignCode);
      ajaxData.append("IsLetusCallYouDisabled", AllowCallYou);
      ajaxData.append("IsLead", isLead);
      ajaxData.append("IsLeadUserCodeActive", isLeadUserCodeActive);
      ajaxData.append("IsRegistryActive", isRegistryActive);
      ajaxData.append("IsSmsLoginActive", smsLoginActive);

      $.each(products, function(indexInArray, valueOfElement) {
        ajaxData.append(
          "TenantProductIds[" + indexInArray + "]",
          valueOfElement
        );
      });

      $.ajax({
        url: "/Tenant/Create",
        type: "POST",
        data: ajaxData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data == null) {
            hideLoader();
            error("Sistemde bir hata oluştu");
            return false;
          } else if (data.hasError) {
            hideLoader();
            error(data.message);
            return false;
          } else {
            $("#tenantAddModal").modal("hide");
            sigortaCiniTenant.getall();
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

  fillPoolsForUpdate: function(degerid) {
    showLoader();
    $("#tenant_update_pool").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Pool/getall",
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
          $.each(dataSet.data, function(taskAssignGroupId, item) {
            $("#tenant_update_pool").append(
              new Option(item.taskAssignGroupName, item.taskAssignGroupId)
            );
          });
          $("#tenant_update_pool")
            .val(degerid)
            .change();

          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  fillLeadAssignGroupForUpdate: function (degerId) {
    showLoader();
    $("#tenant_update_lead_assign_group").html('<option value="0">Seçiniz</option>');
    $.ajax({
        url: "/LeadAssignGroup/GetAll",
        type: "GET",
        dataType: "json",
        success: function (dataSet) {
            if (dataSet === null) {
                hideLoader();
                error("Sistemde bir hata oluştu");
            } else if (dataSet.hasError) {
                hideLoader();
                error(dataSet.message);
            } else {
                $.each(dataSet.data, function (leadAssignGroupId,item) {
                    $("#tenant_update_lead_assign_group").append(
                        new Option(item.leadAssignGroupName, item.leadAssignGroupId)
                    );
                });
                $("#tenant_update_lead_assign_group")
                    .val(degerId)
                    .change();

                hideLoader();
            }
        },
        error: function (errorThrown) {
            hideLoader();
            console.log(errorThrown);
        }
    });
  },

  fillTenantForUpdate: function(parentId) {
    showLoader();
    $("#parent_tenant_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAll",
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
            $("#parent_tenant_update").append(
              new Option(item.parentTenant.tenantName, item.parentTenantId)
            );
          });
          $("#parent_tenant_update")
            .val(parentId)
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

  fillProductForUpdate: function(productId) {
    showLoader();
    $("#product_name_update").html(
      '<option disabled="disabled" value="">Seçiniz</option>'
    );
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
          var products = [];

          $.each(dataSet.data, function(index, values) {
            products.push(values.productMidCatId);
          });

          $.each(dataSet.data, function(index, item) {
            $("#product_name_update").append(
              new Option(item.productMidCatDesc, item.productMidCatId)
            );
          });

          if (products.length == productId.length) {
            $("#selectAllProductsForUpdate").attr("checked", "checked");
          } else {
            $("#selectAllProductsForUpdate").attr("checked", false);
          }

          $("#product_name_update")
            .val(productId)
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

  update: function() {
    $("#tenant_update_form").on("submit", function(e) {
      e.preventDefault();

      if (
        $("#parent_tenant_update").val() == "" &&
        $("#IsSigortaCiniUpdate").attr("checked") != "checked"
      ) {
        error("Ana tenant seçiniz.");
        return;
      }

      if ($("#tenant_update_name").val() == "") {
        error("Tenant adını alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_update_desc").val() == "") {
        error("Tenant açıklamasını alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_update_tel").val() == "") {
        error("Tenant telefon alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_update_token").val() == "") {
        error("Tenant token alanını boş geçmeyiniz.");
        return;
      }

      if ($("#tenant_update_pool").val() == "") {
        error("Lütfen havuz seçiniz.");
        return;
        }

      if ($("#tenant_update_lead_assign_group").val() === "0")
      {
          error("Lütfen lead assign group seçiniz.");
          return;
      }

      if (
        $("#mygroupidforupdate").val() == 1 &&
        !$("#tenant_update_email")
          .val()
          .match("^@")
      ) {
        error("Email alanı '@' ile başlamalıdır.");
        return;
      }

      if ($("#product_name_update").val() == null) {
        error("Lütfen ürün seçiniz");
        return;
      }

      if (
        $("#mygroupidforupdate").val() == 1 &&
        $("#tenant_update_email").val() == ""
      ) {
        error("Email alanını boş geçmeyiniz.");
        return;
      }

      showLoader();

      var parentTenantUpdate = $("#parent_tenant_update").val();

      var isActive = false;

      var smsLoginActiveUpdate = false;

      var IsAllowedAllMail = false;

      var AllowCampaignCodeForUpdate = true;

      var AllowCallYouForUpdate = true;

      var isLeadForUpdate = false;

      var isLeadUserCodeActiveUpdate = false;

      var isRegistryActiveUpdate = false;

      var emailvalue = $("#tenant_update_email").val();

      var products = [];

      if ($("#TenantUpdateIsActive").attr("checked") == "checked") {
        isActive = true;
      }

      if ($("#SmsActiveUpdate").attr("checked") == "checked") {
        smsLoginActiveUpdate = true;
      }

      if ($("#IsSigortaCiniUpdate").attr("checked") == "checked") {
        parentTenantUpdate = "null";
      }

      if ($("#AllowCallYouUpdate").attr("checked") == "checked") {
        AllowCallYouForUpdate = false;
      }

      if ($("#IsLeadUpdate").attr("checked") == "checked") {
        isLeadForUpdate = true;
      }

      if ($("#isLeadUserCodeActiveUpdate").attr("checked") === "checked") {
        isLeadUserCodeActiveUpdate = true;
      }

      if ($("#isRegistryActiveUpdate").attr("checked") === "checked") {
        isRegistryActiveUpdate = true;
      }

      if ($("#CampaignCodeUpdate").attr("checked") == "checked") {
        AllowCampaignCodeForUpdate = false;
      }

      if ($("#mygroupidforupdate").val() != 1) {
        emailvalue = "";
        IsAllowedAllMail = true;
      }

      $.each($("#product_name_update").val(), function(index, val) {
        products.push(val);
      });

      var $form = $("#tenant_update_form");
      var ajaxData = new FormData($form[0]);

      ajaxData.append("parentTenantId", parentTenantUpdate);
      ajaxData.append("TenantId", $("#tenantId").val());
      ajaxData.append("token", $("#tenant_update_token").val());
      ajaxData.append("TenantName", $("#tenant_update_name").val());
      ajaxData.append("TenantDesc", $("#tenant_update_desc").val());
      ajaxData.append("phone", $("#tenant_update_tel").val());
      ajaxData.append("email", $("#tenant_update_email").val());
      ajaxData.append("TaskAssignGroupId", $("#tenant_update_pool").val());
      ajaxData.append("LeadAssignGroupId", $("#tenant_update_lead_assign_group").val());
      ajaxData.append("State", isActive);
      ajaxData.append("IsAllowedAllMail", IsAllowedAllMail);
      ajaxData.append("Email", emailvalue);
      ajaxData.append("IsCampaignCodeDisabled", AllowCampaignCodeForUpdate);
      ajaxData.append("IsLetusCallYouDisabled", AllowCallYouForUpdate);
      ajaxData.append("IsLead", isLeadForUpdate);
      ajaxData.append("IsLeadUserCodeActive", isLeadUserCodeActiveUpdate);
      ajaxData.append("IsRegistryActive", isRegistryActiveUpdate);
      ajaxData.append("IsSmsLoginActive", smsLoginActiveUpdate);

      $.each(products, function(indexInArray, valueOfElement) {
        ajaxData.append(
          "TenantProductIds[" + indexInArray + "]",
          valueOfElement
        );
      });

      $.ajax({
        url: "/Tenant/Update",
        type: "PUT",
        data: ajaxData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data == null) {
            error("Sistemde bir hata oluştu");
            return false;
          } else if (data.hasError) {
            error(data.message);
            return false;
          } else {
            $("#tenantUpdateModal").modal("hide");
            sigortaCiniTenant.getall();
            success("Başarıyla kaydedildi");
          }
          hideLoader();
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
      url: "/Tenant/GetAll",
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
          sigortaCiniTenant.fillDataTable(dataSet.data);
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  fillDataTable: function(dataInput) {
    $("#tenanttable").DataTable({
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
        { data: "tenantName" },
        { data: "tenantDesc" },
        { data: "phone" },
        { data: "email" },
        { data: "taskAssignGroup.taskAssignGroupName" },
        { data: "token" },
        { data: "parentTenant.tenantName" },
        { data: "state" }
      ]
    });
    hideLoader();
    sigortaCiniTenant.datatableClick();
  },

  datatableClick: function() {
    $("#tenanttable tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#tenanttable").DataTable();
      var data = table.row(this).data();
      sigortaCiniTenant.get(data.tenantId);
    });
  },

  get: function(id) {
    showLoader();
    $.ajax({
      url: "/Tenant/GetById",
      type: "GET",
      dataType: "json",
      data: {
        id: id
      },

      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          error(dataSet.message);
        } else {
          $("#tenant_update_name").val(dataSet.data.tenantName);
          $("#tenant_update_desc").val(dataSet.data.tenantDesc);
          $("#tenant_update_tel").val(dataSet.data.phone);
          $("#tenant_update_token").val(dataSet.data.token);

          var products = [];
          $.each(dataSet.data.tenantProducts, function(index, values) {
            products.push(values.productMidCatId);
          });

          sigortaCiniTenant.fillProductForUpdate(products);
          sigortaCiniTenant.fillPoolsForUpdate(dataSet.data.taskAssignGroupId);
          sigortaCiniTenant.fillLeadAssignGroupForUpdate(dataSet.data.leadAssignGroupId);

          if (dataSet.data.state) {
            $(".TenantUpdateIsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#TenantUpdateIsActive").attr("checked", "checked");
          } else {
            $(".TenantUpdateIsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#TenantUpdateIsActive").removeAttr("checked");
          }

          if (dataSet.data.isSmsLoginActive) {
            $(".SmsActiveUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#SmsActiveUpdate").attr("checked", "checked");
          } else {
            $(".SmsActiveUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#SmsActiveUpdate").removeAttr("checked");
          }

          if (!dataSet.data.isCampaignCodeDisabled) {
            $(".CampaignCodeUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#CampaignCodeUpdate").attr("checked", "checked");
          } else {
            $(".CampaignCodeUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#CampaignCodeUpdate").removeAttr("checked");
          }

          if (!dataSet.data.isLetusCallYouDisabled) {
            $(".AllowCallYouUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#AllowCallYouUpdate").attr("checked", "checked");
          } else {
            $(".AllowCallYouUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#AllowCallYouUpdate").removeAttr("checked");
          }

          if (dataSet.data.isLead) {
            $(".IsLeadUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#IsLeadUpdate").attr("checked", "checked");
          } else {
            $(".IsLeadUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#IsLeadUpdate").removeAttr("checked");
          }

          if (dataSet.data.isLeadUserCodeActive) {
            $(".IsLeadUserCodeActiveDivUpdate")
              .find("span")
              .addClass("checked");
            $("#isLeadUserCodeActiveUpdate").attr("checked", "checked");
          } else {
            $(".IsLeadUserCodeActiveDivUpdate")
              .find("span")
              .removeClass("checked");
            $("#isLeadUserCodeActiveUpdate").removeAttr("checked");
          }

          if (dataSet.data.isRegistryActive) {
            $(".IsRegistryActiveDivUpdate")
              .find("span")
              .addClass("checked");
            $("#isRegistryActiveUpdate").attr("checked", "checked");
          } else {
            $(".IsRegistryActiveDivUpdate")
              .find("span")
              .removeClass("checked");
            $("#isRegistryActiveUpdate").removeAttr("checked");
          }

          if (dataSet.data.isAllowedAllMail) {
            $("#mygroupidforupdate").val(2);
            $(
              'input[type=radio][name="mygroupupdate"][id="emailtypeforupdate2"]'
            ).attr("checked", "checked");
            $("#tenant_update_email").prop("disabled", "disabled");
            $("#tenant_update_email").val("");
          } else {
            $("#mygroupidforupdate").val(1);
            $(
              'input[type=radio][name="mygroupupdate"][id="emailtypeforupdate1"]'
            ).attr("checked", "checked");
            $("#tenant_update_email").val(dataSet.data.email);
            $("#tenant_update_email").prop("disabled", false);
          }

          if (dataSet.data.parentTenantId == null) {
            $("#parent_tenant_update").prop("disabled", "disabled");
            $(".IsSigortaCiniUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#IsSigortaCiniUpdate").attr("checked", "checked");
            $("#parent_tenant_update")
              .val("")
              .select2();
          } else {
            $(".IsSigortaCiniUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#IsSigortaCiniUpdate").attr("checked", false);
            $("#parent_tenant_update").prop("disabled", false);
            sigortaCiniTenant.fillTenantForUpdate(dataSet.data.parentTenantId);
          }

          $("#tenant_view_image").attr(
            "src",
            "/tenant/GetLogoByTenantId?tenantId=" + id
          );

          $("#tenantId").val(dataSet.data.tenantId);
          $("#tenantUpdateModal").modal("show");
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
