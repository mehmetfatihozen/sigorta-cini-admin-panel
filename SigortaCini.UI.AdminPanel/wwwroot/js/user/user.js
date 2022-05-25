$(document).ready(function() {
  sigortaCiniUser.init();
  $("#userGsmNo").mask("0(999) 999-9999");

  $("#userGsmNo").live("click", function(e) {
    e.preventDefault();

    $("#userGsmNo").focus();

    return false;
  });

  $("#start_date").datepicker({ dateFormat: "dd-mm-yy" });

  $("#end_date").datepicker({ dateFormat: "dd-mm-yy" });

  $("#OwnTasksUpdate").change(function(e) {
    e.preventDefault();
    if ($("#OwnTasksUpdate").attr("checked") == "checked") {
      $("#pool_update").prop("disabled", "disabled");
      $("#pool_update")
        .val("")
        .select2();
    } else {
      $("#pool_update").prop("disabled", false);
    }
  });

  $("#end_date").change(function(e) {
    e.preventDefault();
    if ($(this).val() != "") {
      $("#userIsActive").prop("disabled", "disabled");
    } else {
      $("#userIsActive").prop("disabled", false);
    }
  });

  $("#start_dateAdd").datepicker({ dateFormat: "dd-mm-yy" });

  $("#end_dateAdd").datepicker({ dateFormat: "dd-mm-yy" });

  $("#userGsmNoAdd").mask("0(999) 999-9999");

  $("#userGsmNoAdd").live("click", function(e) {
    e.preventDefault();

    $("#userGsmNoAdd").focus();

    return false;
  });

  $("#end_dateAdd").change(function(e) {
    e.preventDefault();
    if ($(this).val() != "") {
      $("#userIsActiveAdd").prop("disabled", "disabled");
    } else {
      $("#userIsActiveAdd").prop("disabled", false);
    }
  });

  $("#OwnTasks").change(function(e) {
    e.preventDefault();
    if ($("#OwnTasks").attr("checked") == "checked") {
      $("#poolsAdd").prop("disabled", "disabled");
      $("#poolsAdd")
        .val("")
        .select2();
    } else {
      $("#poolsAdd").prop("disabled", false);
    }
  });

  $("#ddlUserType").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var data = $("#ddlUserType").select2("data");
    if (data.text == "Şube Müdürü") {
      sigortaCiniUser.getCities();
      sigortaCiniUser.getUserBranches();
      sigortaCiniUser.getUserAreas();
      sigortaCiniUser.getUserLocations();
      sigortaCiniUser.getUserSellingChannels();
      $("#branches").removeClass("hide");
      $("#operation_crew").addClass("hide");
      $("#operation_team_lead").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else if (data.text == "BWOS") {
      sigortaCiniUser.getCities();
      sigortaCiniUser.getUserBranches();
      sigortaCiniUser.getUserAreas();
      sigortaCiniUser.getUserLocations();
      sigortaCiniUser.getUserSellingChannels();
      $("#branches").removeClass("hide");
      $("#operation_crew").addClass("hide");
      $("#operation_team_lead").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else if (data.text == "Şube Satış Danışmanı") {
      $("#brach_sell").removeClass("hide");
      sigortaCiniUser.getAllByUserTypeId(5);
      $("#operation_crew").addClass("hide");
      $("#operation_team_lead").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#branch_sell").addClass("hide");
      $("#branches").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else if (data.text == "Operasyon Takım Lideri") {
      $("#operation_team_lead").removeClass("hide");
      sigortaCiniUser.getUserAreasForTeamLead();
      $("#operation_crew").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#branches").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else if (data.text == "Operasyon Ekibi Çalışanı") {
      $("#operation_crew").removeClass("hide");
      sigortaCiniUser.getAllByUserTypeId(9);
      $("#operation_team_lead").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#branches").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#location")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else if (data.text == "Çağrı Merkezi Çalışanı") {
      sigortaCiniUser.getLeadPools("insert");
      $("#operation_crew").addClass("hide");
      $("#operation_team_lead").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#branches").addClass("hide");
      $("#lead_pool_div").removeClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    } else {
      $("#operation_crew").addClass("hide");
      $("#operation_team_lead").addClass("hide");
      $("#brach_sell").addClass("hide");
      $("#lead_pool_div").addClass("hide");
      $("#branches").addClass("hide");
      $("#crew_lead")
        .val("")
        .select2();
      $("#operation_area")
        .val("")
        .select2();
      $("#branch_manager")
        .val("")
        .select2();
      $("#sell_canal_type")
        .val("")
        .select2();
      $("#lead_pool")
        .val("")
        .select2();
      $("#userSysCampaignId")
        .val("");
      $("#location")
        .val("")
        .select2();
      $("#area")
        .val("")
        .select2();
      $("#city")
        .val("")
        .select2();
      $("#branch")
        .val("")
        .select2();
    }
  });

  $("#userType").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var data = $("#userType").select2("data");
    if (data.text == "Şube Müdürü") {
      $("#lead_pool_update_div").addClass("hide");
      $("#branches_update").removeClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else if (data.text == "BWOS") {
      $("#lead_pool_update_div").addClass("hide");
      $("#branches_update").removeClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else if (data.text == "Şube Satış Danışmanı") {
      $("#lead_pool_update_div").addClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").removeClass("hide");
      $("#branches_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else if (data.text == "Operasyon Takım Lideri") {
      $("#lead_pool_update_div").addClass("hide");
      $("#operation_team_lead_update").removeClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#branches_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else if (data.text == "Operasyon Ekibi Çalışanı") {
      $("#operation_crew_update").removeClass("hide");
      $("#lead_pool_update_div").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#branches_update").addClass("hide");
      $("#lead_pool_update_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#location_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else if (data.text == "Çağrı Merkezi Çalışanı") {
      $("#lead_pool_update_div").removeClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#branches_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    } else {
      $("#lead_pool_update_div").addClass("hide");
      $("#operation_crew_update").addClass("hide");
      $("#operation_team_lead_update").addClass("hide");
      $("#brach_sell_update").addClass("hide");
      $("#branches_update").addClass("hide");
      $("#crew_lead_update")
        .val("")
        .select2();
      $("#lead_pool_update")
        .val("")
        .select2();
      $("#userSysCampaignIdUpdate")
        .val("");
      $("#operation_area_update")
        .val("")
        .select2();
      $("#branch_manager_update")
        .val("")
        .select2();
      $("#sell_canal_type_update")
        .val("")
        .select2();
      $("#location_update")
        .val("")
        .select2();
      $("#area_update")
        .val("")
        .select2();
      $("#city_update")
        .val("")
        .select2();
      $("#branch_update")
        .val("")
        .select2();
    }
  });

  $("#tenantAdd").change(function(e) {
    e.preventDefault();
    if ($(this).val() != "") {
      sigortaCiniUser.getDefaultPools($("#tenantAdd").val());
      $("#default_pool").prop("disabled", false);
    } else {
      $("#default_pool").prop("disabled", "disabled");
      $("#default_pool")
        .val("")
        .select2();
    }
  });

  $("#btnUserAddModal").click(function(e) {
    e.preventDefault();

    sigortaCiniUser.getUserTypes();
    sigortaCiniUser.getRoleTypes();
    sigortaCiniUser.getPools(1, null);
    sigortaCiniUser.getLeadAssignGroups(1, null);
    sigortaCiniUser.getTenants();

    sigortaCiniUser.getUserCode();
    sigortaCiniUser.clear();

    $("#addUserModal").modal("show");
  });
});

var sigortaCiniUser = {
  init: function() {
    this.getAllUser();
    this.update();
    this.create();
  },

  create: function() {
    $("#btnUserAdd").click(function() {
      if (!sigortaCiniUser.validateForAdd()) {
        return;
      }

      var areaid,
        teamleaduserid,
        branchmanageruserid,
        branchid,
        userAreaid,
        cityid,
        locationid,
        sellingid;

      if ($("#operation_area").val().length < 0) {
        areaid = "null";
      } else {
        areaid = $("#operation_area").val();
      }

      if ($("#crew_lead").val().length < 0) {
        teamleaduserid = "null";
      } else {
        teamleaduserid = $("#crew_lead").val();
      }

      if ($("#branch_manager").val().length < 0) {
        branchmanageruserid = "null";
      } else {
        branchmanageruserid = $("#branch_manager").val();
      }

      if ($("#branch").val().length < 0) {
        branchid = "null";
      } else {
        branchid = $("#branch").val();
      }

      if ($("#area").val().length < 0) {
        userAreaid = "null";
      } else {
        userAreaid = $("#area").val();
      }

      if ($("#city").val().length < 0) {
        cityid = "null";
      } else {
        cityid = $("#city").val();
      }

      if ($("#location").val().length < 0) {
        locationid = "null";
      } else {
        locationid = $("#location").val();
      }

      if ($("#sell_canal_type").val().length < 0) {
        sellingid = "null";
      } else {
        sellingid = $("#sell_canal_type").val();
      }

      var isUserActive = false;
      if ($("#userIsActiveAdd").attr("checked") == "checked") {
        isUserActive = true;
      }

      var isAzureUser = false;
      if ($("#userIsAzureEnabledAdd").attr("checked") == "checked") {
        isAzureUser = true;
      }

      var isOtpEnabled = true;
      if ($("#userIsOtpEnabledAdd").attr("checked") == "checked") {
        isOtpEnabled = false;
      }

      var isAdminLogin = false;
      if ($("#adminLoginIsActiveAdd").attr("checked") == "checked") {
        isAdminLogin = true;
      }

      var pool = $("#poolsAdd").val();
      var leadAssignGroupIdList = $("#leadAssignGroupsAdd").val();
      var roleTypeIdList = $("#otherRolles").val();
      var poolIsDisabled = false;
      if ($("#OwnTasks").attr("checked") == "checked") {
        pool = "null";
        poolIsDisabled = true;
      }
      showLoader();

      $.ajax({
        url: "/User/CreateUser",
        type: "POST",
        dataType: "json",
        data: {
          PersonFirstName: $("#userPersonNameAdd").val(),
          PersonLastName: $("#userPersonSurnameAdd").val(),
          PersonGsmNumber: $("#userGsmNoAdd").val(),
          PersonImageUrl: "",
          PersonState: isUserActive,
          UserTypeId: $("#ddlUserType").val(),
          RoleTypeId: $("#ddlRoleTypeAdd").val(),
          UserStaffId: "",
          TenantId: $("#tenantAdd").val(),
          PoolList: pool,
          LeadAssignGroupIdList: leadAssignGroupIdList,
          RoleTypeList: roleTypeIdList,
          IsPoolDisabled: poolIsDisabled,
          UserName: $("#userNameAdd").val(),
          JobEndStr: $("#end_dateAdd").val(),
          JobStartStr: $("#start_dateAdd").val(),
          UserPassword: $("#userPasswordAdd").val(),
          AzureidEnabled: isAzureUser,
          IsOtpDisabled: isOtpEnabled,
          status: isUserActive,
          IsAdminPanelEnabled: isAdminLogin,
          UserCode: $("#UserCode").val(),
          UserFinsoftCode: $("#finsoftCode").val(),
          UserSysCampaignId: $("#userSysCampaignId").val(),
          TaskAssignGroupId: $("#default_pool").val(),

          UserArea: {
            AreaId: areaid
          },
          UserTeamLead: {
            TeamLeadId: teamleaduserid
          },
          UserBranchManager: {
            UserBranchManagerId: branchmanageruserid
          },

          UserManagerBwos: {
            BranchId: branchid,
            AreaId: userAreaid,
            ProvinceId: cityid,
            LocationId: locationid,
            SellingChannelTypeId: sellingid
          },
          DefaultLeadAssignGroupId: $("#lead_pool").val()
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
            sigortaCiniUser.clear();
            sigortaCiniUser.getAllUser();
            $("#addUserModal").modal("hide");
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

  getLeadPools: function(value) {
    showLoader();
    if (value == "empty") {
      $("#lead_pool_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/LeadAssignGroup/GetAll",
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
            $.each(dataSet.data, function(index, leadPool) {
              $("#lead_pool_update").append(
                new Option(
                  leadPool.leadAssignGroupName,
                  leadPool.leadAssignGroupId
                )
              );
            });
            $("#lead_pool_update")
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
    } else if (value == "insert") {
      $("#lead_pool").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/LeadAssignGroup/GetAll",
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
            $.each(dataSet.data, function(index, leadPool) {
              $("#lead_pool").append(
                new Option(
                  leadPool.leadAssignGroupName,
                  leadPool.leadAssignGroupId
                )
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
    } else {
      $("#lead_pool_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/LeadAssignGroup/GetAll",
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
            $.each(dataSet.data, function(index, leadPool) {
              $("#lead_pool_update").append(
                new Option(
                  leadPool.leadAssignGroupName,
                  leadPool.leadAssignGroupId
                )
              );
            });
            $("#lead_pool_update")
              .val(value)
              .select2();
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

  clear: function() {
    $("#IsSigortaCiniTenant").removeAttr("checked");
    $("#userIsAzureEnabledAdd").removeAttr("checked");
    $("#userIsOtpEnabledAdd").removeAttr("checked");
    $("#userIsActiveAdd").removeAttr("checked");
    $("#adminLoginIsActiveAdd").removeAttr("checked");

    $("#OwnTasks").removeAttr("checked");

    $("#poolsAdd").prop("disabled", false);
    $("#userIsActiveAdd").prop("disabled", false);
    $("#default_pool").prop("disabled", "disabled");
    $("#lead_pool_div").addClass("hide");

    $("#operation_crew").addClass("hide");
    $("#operation_team_lead").addClass("hide");
    $("#brach_sell").addClass("hide");
    $("#branches").addClass("hide");

    $("#userPersonNameAdd").val("");
    $("#userPersonSurnameAdd").val("");
    $("#userGsmNoAdd").val("");
    $("#userNameAdd").val("");
    $("#userPasswordAdd").val("");
    $("#userRePasswordAdd").val("");
    $("#start_dateAdd").val("");
    $("#end_dateAdd").val("");
    $("#finsoftCode").val("");

    $("#tenantAdd")
      .val("")
      .select2();
    $("#poolsAdd")
      .val("")
      .select2();
    $("#leadAssignGroupsAdd")
      .val("")
      .select2();
    $("#otherRolles")
      .val("")
      .select2();
    $("#ddlUserType")
      .val("")
      .select2();
    $("#ddlRoleTypeAdd")
      .val("")
      .select2();
    $("#crew_lead")
      .val("")
      .select2();
    $("#operation_area")
      .val("")
      .select2();
    $("#branch_manager")
      .val("")
      .select2();
    $("#sell_canal_type")
      .val("")
      .select2();
    $("#location")
      .val("")
      .select2();
    $("#lead_pool")
      .val("")
      .select2();
    $("#userSysCampaignId")
      .val("");
    $("#area")
      .val("")
      .select2();
    $("#city")
      .val("")
      .select2();
    $("#branch")
      .val("")
      .select2();
    $("#default_pool")
      .val("")
      .select2();
    },

  validateForAdd: function() {
    var isValid = true;
    $.each($(".mustFillForAdd"), function(index, value) {
      if (
        $(this).val() == undefined ||
        $(this).val() == "" ||
        $(this).val().length <= 0
      ) {
        error($(this).attr("errMessage"));
        isValid = false;
      }
    });

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if ($("#ddlUserType").val() == "") {
      error("Kullanıcı tipini seçiniz");
      isValid = false;
    }
    if ($("#tenantAdd").val() == "") {
      error("Tenant seçiniz");
      isValid = false;
    }

    if ($("#ddlRoleTypeAdd").val() == "") {
      error("Rol tipini seçiniz");
      isValid = false;
    }

    if (!validateEmail($("#userNameAdd").val())) {
      error("Email geçerli değil.");
      isValid = false;
    }

    var data = $("#ddlUserType").select2("data");

    if (
      data.text == "Dış Kaynak" &&
      $("#userIsOtpEnabledAdd").attr("checked") != "checked"
    ) {
      error("Otf Aktif seçimi zorunludur.");
      isValid = false;
    }

    if (data.text == "Çağrı Merkezi Çalışanı" && $("#lead_pool").val() == "") {
      error("Lead havuzu seçiniz");
      isValid = false;
    }

    if (data.text == "Genel Müdürlük Çalışanı(Diğer)") {
    } else {
      if (
        $("#poolsAdd").val() == "" &&
        $("#OwnTasks").attr("checked") != "checked"
      ) {
        error("Havuz seçiniz");
        isValid = false;
      }
      if ($("#default_pool").val() == "") {
        error("Default havuzu seçiniz");
        isValid = false;
      }
    }

    if (!$("#branches").hasClass("hide")) {
      if ($("#branch").val() == "") {
        error("Şube seçiniz");
        isValid = false;
      }
      if ($("#city").val() == "") {
        error("Şehir seçiniz");
        isValid = false;
      }
      if ($("#area").val() == "") {
        error("Bölge seçiniz");
        isValid = false;
      }
      if ($("#location").val() == "") {
        error("Lokasyon seçiniz");
        isValid = false;
      }
      if ($("#sell_canal_type").val() == "") {
        error("Satış Kanal Tipi seçiniz");
        isValid = false;
      }
    }

    if (!$("#brach_sell").hasClass("hide")) {
      if ($("#branch_manager").val() == "") {
        error("Şube Müdürü seçiniz");
        isValid = false;
      }
    }

    if (!$("#operation_team_lead").hasClass("hide")) {
      if ($("#operation_area").val() == "") {
        error("Bölge seçiniz");
        isValid = false;
      }
    }

    if (!$("#operation_crew").hasClass("hide")) {
      if ($("#crew_lead").val() == "") {
        error("Takım Lideri seçiniz");
        isValid = false;
      }
    }

    if ($("#userPasswordAdd").val() != $("#userRePasswordAdd").val()) {
      error("Şifreler uyuşmuyor");
      isValid = false;
    }
    return isValid;
  },

  fillUserDataTable: function(dataInput) {
    $("#dataTableUpdateUser").DataTable({
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
        { data: "firstName" },
        { data: "lastName" },
        { data: "username" }
      ]
    });

    sigortaCiniUser.datatableClick();
  },

  datatableClick: function() {
    $("#dataTableUpdateUser tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#dataTableUpdateUser").DataTable();
      var data = table.row(this).data();
      sigortaCiniUser.getUser(data.userId);
    });
  },

  getUser: function(userId) {
    showLoader();
    $.ajax({
      url: "/User/GetUser",
      type: "GET",
      dataType: "json",
      data: {
        id: userId
      },
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $("#updateUserModal").modal("show");

          $("#userUpdateId").val(dataSet.userId);

          $("#end_date").val(dataSet.enddate);

          $("#start_date").val(dataSet.startdate);

          $("#userPersonName").val(dataSet.personFirstName);
          $("#userPersonSurname").val(dataSet.personLastName);
          $("#userGsmNo").val(dataSet.personGsmNumber);
          $("#userName").val(dataSet.userName);
          $("#tenant").val(dataSet.tenantName);
          $("#UserCodeUpdate").val(dataSet.userCode);
          $("#finsoftCodeUpdate").val(dataSet.userFinsoftCode);
          $("#userSysCampaignIdUpdate").val(dataSet.userSysCampaignId);
          $("#userPassword").val("");
          $("#userRePassword").val("");
          sigortaCiniUser.getPools(0, dataSet.poolList);
          sigortaCiniUser.getLeadAssignGroups(0, dataSet.leadAssignGroupList);
          sigortaCiniUser.getOtherRolesForUpdate(dataSet.roleTypeList);
          sigortaCiniUser.getUserTypesForUpdate(dataSet.userTypeId);
          sigortaCiniUser.getRoleTypesForUpdate(dataSet.roleTypeId);
          sigortaCiniUser.getDefaultPoolsForUpdate(
            dataSet.taskAssignGroupId,
            dataSet.tenantId
          );

          if (dataSet.enddate) {
            $("#userIsActive").prop("disabled", "disabled");
          } else {
            $("#userIsActive").prop("disabled", false);
          }
          if (dataSet.leadAssignGroupId) {
            sigortaCiniUser.getLeadPools(dataSet.leadAssignGroupId);
          } else {
            sigortaCiniUser.getLeadPools("empty");
          }

          if (dataSet.userManagerBwos) {
            sigortaCiniUser.getCitiesForUpdate(
              dataSet.userManagerBwos.province.id
            );
            sigortaCiniUser.getUserBranchesForUpdate(
              dataSet.userManagerBwos.userBranch.userBranchId
            );
            sigortaCiniUser.getUserAreasForUpdate(
              dataSet.userManagerBwos.userArea.userAreaId,
              1
            );
            sigortaCiniUser.getUserLocationsForUpdate(
              dataSet.userManagerBwos.userLocation.userLocationId
            );
            sigortaCiniUser.getUserSellingChannelsForUpdate(
              dataSet.userManagerBwos.userSellingChannelType.userSellingId
            );
          } else {
            if (dataSet.userTeamLeadArea) {
              sigortaCiniUser.getUserAreasForUpdate(
                dataSet.userTeamLeadArea.areaId,
                2
              );
            } else {
              sigortaCiniUser.getUserAreasForUpdate("", 0);
            }

            sigortaCiniUser.getCitiesForUpdate("");
            sigortaCiniUser.getUserBranchesForUpdate("");
            sigortaCiniUser.getUserLocationsForUpdate("");
            sigortaCiniUser.getUserSellingChannelsForUpdate("");
          }

          if (dataSet.userTeamLead) {
            sigortaCiniUser.getAllByUserTypeIdForUpdate(
              9,
              dataSet.userTeamLead.teamLeadUserId
            );
          } else {
            sigortaCiniUser.getAllByUserTypeIdForUpdate(9, "");
          }

          if (dataSet.userBranchManager) {
            sigortaCiniUser.getAllByUserTypeIdForUpdate(
              5,
              dataSet.userBranchManager.branchManagerUserId
            );
          } else {
            sigortaCiniUser.getAllByUserTypeIdForUpdate(5, "");
          }

          if (dataSet.azureidEnabled) {
            $(".userIsAzureEnabledDiv")
              .find("span")
              .addClass("checked");
            $("#userIsAzureEnabled").prop("checked", true);
          } else {
            $(".userIsAzureEnabledDiv")
              .find("span")
              .removeClass("checked");
            $("#userIsAzureEnabled").prop("checked", false);
          }
          if (!dataSet.isOtpDisabled) {
            $(".userIsOtpEnabledDiv")
              .find("span")
              .addClass("checked");
            $("#userIsOtpEnabled").prop("checked", true);
          } else {
            $(".userIsOtpEnabledDiv")
              .find("span")
              .removeClass("checked");
            $("#userIsOtpEnabled").prop("checked", false);
          }
          if (dataSet.state) {
            $(".userIsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#userIsActive").prop("checked", true);
          } else {
            $(".userIsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#userIsActive").prop("checked", false);
          }

          if (dataSet.isPoolDisabled) {
            $("#OwnTasksUpdate").prop("checked", true);
            $("#pool_update").prop("disabled", "disabled");
          } else {
            $("#pool_update").prop("disabled", false);
            $("#OwnTasksUpdate").prop("checked", false);
          }

          if (dataSet.isAdminPanelEnabled) {
            $(".adminLoginIsActiveDiv")
              .find("span")
              .addClass("checked");
            $("#adminLoginIsActive").prop("checked", true);
          } else {
            $(".adminLoginIsActiveDiv")
              .find("span")
              .removeClass("checked");
            $("#adminLoginIsActive").prop("checked", false);
            }

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
    $("#btnUserUpdate").click(function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!sigortaCiniUser.validate()) return;

      if ($("#userPassword").val().length > 0) {
        if ($("#userPassword").val() != $("#userRePassword").val()) {
          error("Şifreler aynı olmalıdır.");
          return;
        }
      }

      if ($("#userRePassword").val().length > 0) {
        if ($("#userPassword").val() != $("#userRePassword").val()) {
          error("Şifreler aynı olmalıdır.");
          return;
        }
      }

      showLoader();

      var areaid,
        teamleaduserid,
        branchmanageruserid,
        branchid,
        userAreaid,
        cityid,
        locationid,
        sellingid;

      if ($("#operation_area_update").val().length < 0) {
        areaid = "null";
      } else {
        areaid = $("#operation_area_update").val();
      }

      if ($("#crew_lead_update").val().length < 0) {
        teamleaduserid = "null";
      } else {
        teamleaduserid = $("#crew_lead_update").val();
      }

      if ($("#branch_manager_update").val().length < 0) {
        branchmanageruserid = "null";
      } else {
        branchmanageruserid = $("#branch_manager_update").val();
      }

      if ($("#branch_update").val().length < 0) {
        branchid = "null";
      } else {
        branchid = $("#branch_update").val();
      }

      if ($("#area_update").val().length < 0) {
        userAreaid = "null";
      } else {
        userAreaid = $("#area_update").val();
      }

      if ($("#city_update").val().length < 0) {
        cityid = "null";
      } else {
        cityid = $("#city_update").val();
      }

      if ($("#location_update").val().length < 0) {
        locationid = "null";
      } else {
        locationid = $("#location_update").val();
      }

      if ($("#sell_canal_type_update").val().length < 0) {
        sellingid = "null";
      } else {
        sellingid = $("#sell_canal_type_update").val();
      }

      var isUserActive = false;
      if ($("#userIsActive").attr("checked") == "checked") {
        isUserActive = true;
      }

      var isAzureUser = false;
      if ($("#userIsAzureEnabled").attr("checked") == "checked") {
        isAzureUser = true;
      }

      var isOtpEnabled = true;
      if ($("#userIsOtpEnabled").attr("checked") == "checked") {
        isOtpEnabled = false;
      }

      var isAdminLogin = false;
      if ($("#adminLoginIsActive").attr("checked") == "checked") {
        isAdminLogin = true;
      }

      var pool = $("#pool_update").val();
      var leadAssignGroupIdList = $("#leadAssignGroupsUpdate").val();
      var roleTypeIdList = $("#otherRollesUpdate").val();
      var poolIsDisabled = false;
      if ($("#OwnTasksUpdate").attr("checked") == "checked") {
        pool = "null";
        poolIsDisabled = true;
      }

      $.ajax({
        url: "/User/UpdateUser",
        type: "POST",
        dataType: "json",
        data: {
          UserId: $("#userUpdateId").val(),
          PoolList: pool,
          LeadAssignGroupIdList: leadAssignGroupIdList,
          RoleTypeList: roleTypeIdList,
          IsPoolDisabled: poolIsDisabled,
          PersonFirstName: $("#userPersonName").val(),
          PersonLastName: $("#userPersonSurname").val(),
          PersonGsmNumber: $("#userGsmNo").val(),
          PersonImageUrl: "",
          PersonState: isUserActive,
          IsAdminPanelEnabled: isAdminLogin,
          UserTypeId: $("#userType").val(),
          RoleTypeId: $("#ddlRoleType").val(),
          UserStaffId: "",
          JobEndStr: $("#end_date").val(),
          JobStartStr: $("#start_date").val(),
          UserName: $("#userName").val(),
          UserPassword: $("#userPassword").val(),
          AzureidEnabled: isAzureUser,
          IsOtpDisabled: isOtpEnabled,
          status: isUserActive,
          UserFinsoftCode: $("#finsoftCodeUpdate").val(),
          UserSysCampaignId: $("#userSysCampaignIdUpdate").val(),
          TaskAssignGroupId: $("#default_pool_update").val(),
          UserArea: {
            AreaId: areaid
          },
          UserTeamLead: {
            TeamLeadId: teamleaduserid
          },
          UserBranchManager: {
            UserBranchManagerId: branchmanageruserid
          },

          UserManagerBwos: {
            BranchId: branchid,
            AreaId: userAreaid,
            ProvinceId: cityid,
            LocationId: locationid,
            SellingChannelTypeId: sellingid
          },
          DefaultLeadAssignGroupId: $("#lead_pool_update").val()
        },
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            sigortaCiniUser.getAllUser();
            $("#updateUserModal").modal("hide");
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

  validate: function() {
    var isValid = true;
    $.each($(".mustFill"), function(index, value) {
      if (
        $(this).val() == undefined ||
        $(this).val() == "" ||
        $(this).val().length <= 0
      ) {
        error($(this).attr("errMessage"));
        isValid = false;
      }
    });

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (!validateEmail($("#userName").val())) {
      error("Email geçerli değil.");
      isValid = false;
    }

    var data = $("#userType").select2("data");

    if (
      data.text == "Dış Kaynak" &&
      $("#userIsOtpEnabled").attr("checked") != "checked"
    ) {
      error("Otf Aktif seçimi zorunludur.");
      isValid = false;
    }

    if (
      data.text == "Çağrı Merkezi Çalışanı" &&
      $("#lead_pool_update").val() == ""
    ) {
      error("Lead havuzu seçiniz");
      isValid = false;
    }

    if (data.text == "Genel Müdürlük Çalışanı(Diğer)") {
    } else {
      if (
        $("#pool_update").val() == "" &&
        $("#OwnTasksUpdate").attr("checked") != "checked"
      ) {
        error("Havuz seçiniz");
        isValid = false;
      }
      if ($("#default_pool_update").val() == "") {
        error("Default havuzu seçiniz");
        isValid = false;
      }
    }

    if (!$("#branches_update").hasClass("hide")) {
      if ($("#branch_update").val() == "") {
        error("Şube seçiniz");
        isValid = false;
      }
      if ($("#city_update").val() == "") {
        error("Şehir seçiniz");
        isValid = false;
      }
      if ($("#area_update").val() == "") {
        error("Bölge seçiniz");
        isValid = false;
      }
      if ($("#location_update").val() == "") {
        error("Lokasyon seçiniz");
        isValid = false;
      }
      if ($("#sell_canal_type_update").val() == "") {
        error("Satış Kanal Tipi seçiniz");
        isValid = false;
      }
    }

    if (!$("#brach_sell_update").hasClass("hide")) {
      if ($("#branch_manager_update").val() == "") {
        error("Şube Müdürü seçiniz");
        isValid = false;
      }
    }

    if (!$("#operation_team_lead_update").hasClass("hide")) {
      if ($("#operation_area_update").val() == "") {
        error("Bölge seçiniz");
        isValid = false;
      }
    }

    if (!$("#operation_crew_update").hasClass("hide")) {
      if ($("#crew_lead_update").val() == "") {
        error("Takım Lideri seçiniz");
        isValid = false;
      }
    }

    if (
      $("#userType").val() == undefined ||
      $("#userType").val() == "" ||
      $("#userType").val() == "Seçiniz"
    ) {
      error("Kullanıcı tipini seçiniz");
      isValid = false;
    }
    if (
      $("#ddlRoleType").val() == undefined ||
      $("#ddlRoleType").val() == "" ||
      $("#ddlRoleType").val() == "Seçiniz"
    ) {
      error("Rol tipini seçiniz");
      isValid = false;
    }

    if ($("#userPassword").val() != $("#userRePassword").val()) {
      error("Şifreler uyuşmuyor");
      isValid = false;
    }
    return isValid;
  },

  getPools: function(id, list) {
    if (id == 0 || list != null) {
      $("#pool_update").html(
        '<option disabled="disabled" value="">Seçiniz</option>'
      );
      $.ajax({
        url: "/Pool/getall",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, pool) {
              $("#pool_update").append(
                new Option(pool.taskAssignGroupName, pool.taskAssignGroupId)
              );
            });
            $("#pool_update")
              .val(list)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    } else {
      $("#poolsAdd").html(
        '<option disabled="disabled" value="">Seçiniz</option>'
      );
      $.ajax({
        url: "/Pool/getall",
        type: "GET",
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, pools) {
              $("#poolsAdd").append(
                new Option(pools.taskAssignGroupName, pools.taskAssignGroupId)
              );
            });
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    }
  },

  getLeadAssignGroups: function(id, list) {
    if (id == 0 || list != null) {
      $("#leadAssignGroupsUpdate").html(
        '<option disabled="disabled" value="">Seçiniz</option>'
      );
      $.ajax({
        url: "/LeadAssignGroup/GetAll",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, leadAssignGroup) {
              $("#leadAssignGroupsUpdate").append(
                new Option(leadAssignGroup.leadAssignGroupName, leadAssignGroup.leadAssignGroupId)
              );
            });
            $("#leadAssignGroupsUpdate")
              .val(list)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    } else {
      $("#leadAssignGroupsAdd").html(
        '<option disabled="disabled" value="">Seçiniz</option>'
      );
      $.ajax({
        url: "/LeadAssignGroup/GetAll",
        type: "GET",
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            error(dataSet.message);
          } else {
            $.each(dataSet.data, function(index, leadAssignGroup) {
              $("#leadAssignGroupsAdd").append(
                new Option(leadAssignGroup.leadAssignGroupName, leadAssignGroup.leadAssignGroupId)
              );
            });
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    }
  },

  getAllUser: function() {
    showLoader();
    $.ajax({
      url: "/User/GetAllUser",
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
          sigortaCiniUser.fillUserDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getTenants: function() {
    showLoader();
    $("#tenantAdd").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Tenant/GetAllExceptForApiTenant",
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
          $.each(dataSet.data, function(index, tenant) {
            $("#tenantAdd").append(
              new Option(tenant.tenantName, tenant.tenantId)
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

  getUserTypes: function() {
    showLoader();
    $("#ddlUserType").html('<option value="">Seçiniz</option>');
    $("#otherRolles").html('<option disabled="disabled" value="">Seçiniz</option>');
    $.ajax({
      url: "/User/GetUserTypes",
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
          $.each(dataSet.data, function(index, userType) {
            $("#ddlUserType").append(
              new Option(userType.userTypeName, userType.userTypeId)
            );
            $("#otherRolles").append(
              new Option(userType.userTypeName, userType.userTypeId)
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

  getUserCode: function() {
    $.ajax({
      url: "/User/GetUserCode",
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
          $("#UserCode").val(dataSet.data);
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getRoleTypes: function() {
    showLoader();
    $("#ddlRoleTypeAdd").html('<option value="">Seçiniz</option>');
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
          $.each(dataSet.data, function(index, roleType) {
            $("#ddlRoleTypeAdd").append(
              new Option(roleType.roleName, roleType.roleTypeId)
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

  getDefaultPools: function(tenantId) {
    showLoader();
    $("#default_pool").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Pool/GetByTenant",
      type: "GET",
      dataType: "json",
      data: {
        id: tenantId
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
          $.each(dataSet.data, function(index, defaultpool) {
            $("#default_pool").append(
              new Option(
                defaultpool.taskAssignGroupName,
                defaultpool.taskAssignGroupId
              )
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

  getUserBranches: function() {
    showLoader();
    $("#branch").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserBranch/GetAllUserBranches",
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
          $.each(dataSet.data, function(index, branch) {
            $("#branch").append(
              new Option(branch.userBranchName, branch.userBranchId)
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

  getUserAreas: function() {
    showLoader();
    $("#area").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserArea/GetAllUserAreas",
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
          $.each(dataSet.data, function(index, area) {
            $("#area").append(new Option(area.userAreaName, area.userAreaId));
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

  getUserAreasForTeamLead: function() {
    showLoader();
    $("#operation_area").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserArea/GetAllUserAreas",
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
          $.each(dataSet.data, function(index, area) {
            $("#operation_area").append(
              new Option(area.userAreaName, area.userAreaId)
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

  getUserLocations: function() {
    showLoader();
    $("#location").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserLocation/GetAllUserLocations",
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
          $.each(dataSet.data, function(index, location) {
            $("#location").append(
              new Option(location.userLocationName, location.userLocationId)
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

  getUserSellingChannels: function() {
    showLoader();
    $("#sell_canal_type").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserSellingChannel/GetAllUserSellingChannelType",
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
          $.each(dataSet.data, function(index, selling) {
            $("#sell_canal_type").append(
              new Option(selling.userSellingName, selling.userSellingId)
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

  getCities: function() {
    showLoader();
    $("#city").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Location/GetAllCities",
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
          $.each(dataSet.data, function(index, city) {
            $("#city").append(new Option(city.name, city.id));
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

  getAllByUserTypeId: function(id) {
    if (id == 9) {
      showLoader();
      $("#crew_lead").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/User/GetAllUserByUserTypeId",
        type: "GET",
        dataType: "json",
        data: {
          id: id
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
            $.each(dataSet.data, function(index, lead) {
              var nameandsurname = lead.firstName + " " + lead.lastName;
              $("#crew_lead").append(new Option(nameandsurname, lead.userId));
            });
            hideLoader();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    } else {
      showLoader();
      $("#branch_manager").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/User/GetAllUserByUserTypeId",
        type: "GET",
        dataType: "json",
        data: {
          id: id
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
            $.each(dataSet.data, function(index, manager) {
              var nameandsurname = manager.firstName + " " + manager.lastName;
              $("#branch_manager").append(
                new Option(nameandsurname, manager.userId)
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
  },

  getCitiesForUpdate: function(id) {
    $("#city_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Location/GetAllCities",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, city) {
            $("#city_update").append(new Option(city.name, city.id));
          });

          $("#city_update")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getUserBranchesForUpdate: function(id) {
    $("#branch_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserBranch/GetAllUserBranches",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, branch) {
            $("#branch_update").append(
              new Option(branch.userBranchName, branch.userBranchId)
            );
          });
          $("#branch_update")
            .val(id)
            .select2();   
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);  
      }
    });
  },

  getUserAreasForUpdate: function(id, type) {
    if (type == 0) {
      $("#area_update").html('<option value="">Seçiniz</option>');
      $("#operation_area_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/UserArea/GetAllUserAreas",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {   
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {  
            error(dataSet.message);
            return;
          } else {
            $.each(dataSet.data, function(index, area) {
              $("#area_update").append(
                new Option(area.userAreaName, area.userAreaId)
              );
              $("#operation_area_update").append(
                new Option(area.userAreaName, area.userAreaId)
              );
            });
            $("#area_update")
              .val(id)
              .select2();
            $("#operation_area_update")
              .val(id)
              .select2();   
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    } else if (type == 1) {
      $("#area_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/UserArea/GetAllUserAreas",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            $.each(dataSet.data, function(index, area) {
              $("#area_update").append(
                new Option(area.userAreaName, area.userAreaId)
              );
            });
            $("#area_update")
              .val(id)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    } else {
      $("#operation_area_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/UserArea/GetAllUserAreas",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            $.each(dataSet.data, function(index, area) {
              $("#operation_area_update").append(
                new Option(area.userAreaName, area.userAreaId)
              );
            });
            $("#operation_area_update")
              .val(id)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    }
  },

  getUserLocationsForUpdate: function(id) {
    $("#location_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserLocation/GetAllUserLocations",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, location) {
            $("#location_update").append(
              new Option(location.userLocationName, location.userLocationId)
            );
          });
          $("#location_update")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getUserSellingChannelsForUpdate: function(id) {
    $("#sell_canal_type_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserSellingChannel/GetAllUserSellingChannelType",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, selling) {
            $("#sell_canal_type_update").append(
              new Option(selling.userSellingName, selling.userSellingId)
            );
          });
          $("#sell_canal_type_update")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getUserAreasForTeamLeadForUpdate: function(id) {
    $("#operation_area_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/UserArea/GetAllUserAreas",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, area) {
            $("#operation_area_update").append(
              new Option(area.userAreaName, area.userAreaId)
            );
          });
          $("#operation_area_update")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getAllByUserTypeIdForUpdate: function(id, dataId) {
    if (id == 9) {
      $("#crew_lead_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/User/GetAllUserByUserTypeId",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
          id: id
        },
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            $.each(dataSet.data, function(index, lead) {
              var nameandsurname = lead.firstName + " " + lead.lastName;
              $("#crew_lead_update").append(
                new Option(nameandsurname, lead.userId)
              );
            });
            $("#crew_lead_update")
              .val(dataId)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    } else {
      $("#branch_manager_update").html('<option value="">Seçiniz</option>');
      $.ajax({
        url: "/User/GetAllUserByUserTypeId",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
          id: id
        },
        success: function(dataSet) {
          if (dataSet == null) {
            error("Sistemde bir hata oluştu");
            return;
          } else if (dataSet.hasError) {
            error(dataSet.message);
            return;
          } else {
            $.each(dataSet.data, function(index, manager) {
              var nameandsurname = manager.firstName + " " + manager.lastName;
              $("#branch_manager_update").append(
                new Option(nameandsurname, manager.userId)
              );
            });
            $("#branch_manager_update")
              .val(dataId)
              .select2();
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    }
  },

  getDefaultPoolsForUpdate: function(id, tenantId) {
    $("#default_pool_update").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Pool/GetByTenant",
      type: "GET",
      async: false,
      dataType: "json",
      data: {
        id: tenantId
      },
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          $.each(dataSet.data, function(index, defaultpool) {
            $("#default_pool_update").append(
              new Option(
                defaultpool.taskAssignGroupName,
                defaultpool.taskAssignGroupId
              )
            );
          });
          $("#default_pool_update")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getUserTypesForUpdate: function(id) {
    $("#userType").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/User/GetUserTypes",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          error(dataSet.message);
        } else {
          $.each(dataSet.data, function(userTypeId, userType) {
            $("#userType").append(
              new Option(userType.userTypeName, userType.userTypeId)
            );
          });
          $("#userType")
            .val(id)
            .select2();
          $("#operation_crew_update").addClass("hide");
          $("#operation_team_lead_update").addClass("hide");
          $("#brach_sell_update").addClass("hide");
          $("#lead_pool_update_div").addClass("hide");
          $("#branches_update").addClass("hide");
          var data = $("#userType").select2("data");
          if (data.text == "Şube Müdürü") {
            $("#branches_update").removeClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#lead_pool_update_div").addClass("hide");
            $("#operation_team_lead_update").addClass("hide");
            $("#operation_crew_update").addClass("hide");
          } else if (data.text == "BWOS") {
            $("#branches_update").removeClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#lead_pool_update_div").addClass("hide");
            $("#operation_team_lead_update").addClass("hide");
            $("#operation_crew_update").addClass("hide");
          } else if (data.text == "Şube Satış Danışmanı") {
            $("#brach_sell_update").removeClass("hide");
            $("#branches_update").addClass("hide");
            $("#operation_team_lead_update").addClass("hide");
            $("#lead_pool_update_div").addClass("hide");
            $("#operation_crew_update").addClass("hide");
          } else if (data.text == "Operasyon Takım Lideri") {
            $("#operation_team_lead_update").removeClass("hide");
            $("#branches_update").addClass("hide");
            $("#lead_pool_update_div").addClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#operation_crew_update").addClass("hide");
          } else if (data.text == "Operasyon Ekibi Çalışanı") {
            $("#operation_team_lead_update").addClass("hide");
            $("#operation_crew_update").removeClass("hide");
            $("#lead_pool_update_div").addClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#branches_update").addClass("hide");
          } else if (data.text == "Çağrı Merkezi Çalışanı") {
            $("#operation_team_lead_update").addClass("hide");
            $("#operation_crew_update").addClass("hide");
            $("#lead_pool_update_div").removeClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#branches_update").addClass("hide");
          } else {
            $("#lead_pool_update_div").addClass("hide");
            $("#operation_crew_update").addClass("hide");
            $("#operation_team_lead_update").addClass("hide");
            $("#brach_sell_update").addClass("hide");
            $("#branches_update").addClass("hide");
          }
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
    },

  getOtherRolesForUpdate: function(list) {
    $("#otherRollesUpdate").html('<option disabled="disabled" value="">Seçiniz</option>');
    $.ajax({
      url: "/User/GetUserTypes",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          error(dataSet.message);
        } else {
          $.each(dataSet.data, function(userTypeId, userType) {
            $("#otherRollesUpdate").append(
              new Option(userType.userTypeName, userType.userTypeId)
            );
          });
          $("#otherRollesUpdate")
            .val(list)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  getRoleTypesForUpdate: function(id) {
    $("#ddlRoleType").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Role/GetAll",
      type: "GET",
      async: false,
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          error(dataSet.message);
        } else {
          $.each(dataSet.data, function(index, roleType) {
            $("#ddlRoleType").append(
              new Option(roleType.roleName, roleType.roleTypeId)
            );
          });
          $("#ddlRoleType")
            .val(id)
            .select2();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  }
};
