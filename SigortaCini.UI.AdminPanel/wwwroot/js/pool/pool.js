var table;
var allUsers = [];
var pools = [];
var filteredUsers = [];
var selectedUsers = [];
$(document).ready(function() {
  sigortaCiniPool.init();
  $("#selectAll").click(function() {
    var checked = $(this).prop("checked");
    $(".usersCheckBox")
      .find("input:checkbox")
      .prop("checked", checked);
  });
  $("#btnOpenModal").click(function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $("#poolOperationModal").modal("show");
    $("#poolName").val("");
    $(".PoolList").addClass("hide");
    $(".PoolAdd").removeClass("hide");
    $("#btnPoolAdd").removeClass("hide");
    $("#btnPoolAddForList").addClass("hide");
    $("#poolDescription").val("");
    $(".poolIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#defaultUnchecked").attr("checked", "checked");
    $("#parent_pool")
      .val("")
      .select2();
    $(".IsSigortaCiniDiv")
      .find("span")
      .removeClass("checked");
    $("#IsSigortaCini").attr("checked", false);
    $("#parent_pool").prop("disabled", false);
    $("#IsSigortaCini").change(function(e) {
      e.preventDefault();
      if ($("#IsSigortaCini").attr("checked") == "checked") {
        $("#parent_pool").prop("disabled", "disabled");
        $("#parent_pool")
          .val("")
          .select2();
      } else {
        $("#parent_pool").prop("disabled", false);
      }
    });
    sigortaCiniPool.getPools();
  });

  $("#btnPoolTaskOperationModal").click(function() {
    $("#ddlTaskUserDefinition")
      .val("")
      .select2();
    $("#pools").addClass("hide");
    $("#poolTaskOperationModal").modal("show");
    sigortaCiniPool.getTasks();
  });
});

var sigortaCiniPool = {
  init: function() {
    this.create();
    this.update();
    this.getall();
    this.createForPoolList();
  },

  getPools: function() {
    showLoader();
    $("#parent_pool").html('<option value="">Seçiniz</option>');
    $.ajax({
      url: "/Pool/getall",
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
          $.each(dataSet.data, function(index, item) {
            $("#parent_pool").append(
              new Option(item.taskAssignGroupName, item.taskAssignGroupId)
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

  getTasks: function() {
    showLoader();
    $("#ddlTaskUserDefinition").html('<option value="0">Seçiniz</option>');
    $.ajax({
      url: "/TaskAssignGroupTaskType/GetAllTaskTypes",
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
            $("#ddlTaskUserDefinition ").append(
              new Option(
                value.taskAssignTaskTypeName,
                value.taskAssignTaskTypeId
              )
            );
          });
          hideLoader();
          sigortaCiniPool.getallforTasks();
        }
      },
      error: function(errorThrown) {
        hideLoader();
        console.log(errorThrown);
      }
    });
  },

  getallforTasks: function() {
    $("#ddlTaskUserDefinition").on("change", function() {
      if ($("#ddlTaskUserDefinition").val() == "0") {
        $("#pools").addClass("hide");
        return;
      }
      showLoader();
      $.ajax({
        url: "/TaskAssignGroupTaskType/GetGroupsByTaskTypeId",
        type: "GET",
        data: { taskTypeId: $("#ddlTaskUserDefinition").val() },
        dataType: "json",

        success: function(dataSet) {
          if (dataSet == null) {
            hideLoader();
            $("#pools").addClass("hide");
            error("Sistemde bir hata oluştu");
          } else if (dataSet.hasError) {
            hideLoader();
            $("#pools").addClass("hide");
            error(dataSet.message);
          } else if (dataSet.data.length == 0) {
            hideLoader();
            $("#pools").addClass("hide");
          } else {
            sigortaCiniPool.fillDataTableforTasks(dataSet.data);
            $("#pools").removeClass("hide");
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

  fillDataTableforTasks: function(dataInput) {
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
        item.taskAssignGroupId +
        '" value="' +
        item.taskAssignGroupId +
        '">' +
        item.taskAssignGroupName +
        "</label>";
      htmlStr += "</div>";
    });
    $(".usersCheckBox").html(htmlStr);
    sigortaCiniPool.saveforTasks();
  },

  saveforTasks: function() {
    $("#btnSave").click(function(e) {
      e.preventDefault();
      var pools = [];
      $(".checkboxUsers").each(function(index) {
        if (this.checked) {
          pools.push(parseInt(this.value));
        }
      });
      if (pools.length == 0) {
        error("Havuzlardan en az birini seçiniz");
        return;
      }
      showLoader();

      $.ajax({
        url: "/TaskAssignGroupTaskType/SetGroupsByTaskTypeId",
        type: "POST",
        dataType: "json",
        data: {
          TaskTypeId: $("#ddlTaskUserDefinition").val(),
          TaskGroupIds: pools
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
            $("#poolTaskOperationModal").modal("hide");
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    });
  },

  fillPoolForUpdate: function(parentId) {
    showLoader();
    $("#parent_pool_update").html('<option value="">Seçiniz</option>');
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
          $.each(dataSet.data, function(index, item) {
            $("#parent_pool_update").append(
              new Option(item.taskAssignGroupName, item.taskAssignGroupId)
            );
          });
          $("#parent_pool_update")
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

  createFromPoolList: function(parentid) {
    showLoader();
    $.ajax({
      url: "/Pool/getall",
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
          $.each(dataSet.data, function(index, item) {
            $("#parent_pool_list").append(
              new Option(item.taskAssignGroupName, item.taskAssignGroupId)
            );
          });
          $("#poolOperationModal").modal("show");
          $("#poolName").val("");
          $("#poolDescription").val("");
          $(".poolIsActiveDiv")
            .find("span")
            .addClass("checked");
          $("#defaultUnchecked").attr("checked", "checked");
          $("#parent_pool_list")
            .val(parentid)
            .select2();
          $(".PoolList").removeClass("hide");
          $("#parent_pool_list").prop("disabled", "disabled");
          $(".PoolAdd").addClass("hide");
          $("#btnPoolAdd").addClass("hide");
          $("#btnPoolAddForList").removeClass("hide");
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  create: function() {
    $("#btnPoolAdd").click(function() {
      if ($("#poolName").val().length == 0) {
        error("Havuz adını boş geçmeyiniz.");
        return;
      }
      if ($("#poolDescription").val().length == 0) {
        error("Havuz açıklamasını boş geçmeyiniz.");
        return;
      }
      if (
        $("#parent_pool").val() == "" &&
        $("#IsSigortaCini").attr("checked") != "checked"
      ) {
        error("Ana Havuz alanını boş geçmeyiniz.");
        return;
      }

      showLoader();

      var poolId = null;

      var isActive = false;
      var parentPool = $("#parent_pool").val();

      if ($("#defaultUnchecked").attr("checked") == "checked") {
        isActive = true;
      }
      if ($("#IsSigortaCini").attr("checked") == "checked") {
        parentPool = "null";
      }

      $.ajax({
        url: "/Pool/Create",
        type: "POST",
        data: {
          TaskAssignGroupId: poolId,
          TaskAssignGroupName: $("#poolName").val(),
          TaskAssignGroupDesc: $("#poolDescription").val(),
          ParentaskAssignGroupId: parentPool,
          State: isActive
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
            sigortaCiniPool.getall();
            $("#poolOperationModal").modal("hide");
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    });
  },

  createForPoolList: function() {
    $("#btnPoolAddForList").click(function() {
      if ($("#poolName").val().length == 0) {
        error("Havuz adını boş geçmeyiniz.");
        return;
      }
      if ($("#poolDescription").val().length == 0) {
        error("Havuz açıklamasını boş geçmeyiniz.");
        return;
      }

      var poolId = null;

      var isActive = false;

      if ($("#defaultUnchecked").attr("checked") == "checked") {
        isActive = true;
      }

      showLoader();

      $.ajax({
        url: "/Pool/Create",
        type: "POST",
        data: {
          TaskAssignGroupId: poolId,
          TaskAssignGroupName: $("#poolName").val(),
          TaskAssignGroupDesc: $("#poolDescription").val(),
          ParentaskAssignGroupId: $("#parent_pool_list").val(),
          State: isActive
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
            sigortaCiniPool.getall();
            $("#poolOperationModal").modal("hide");
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
          hideLoader();
        }
      });
    });
  },

  update: function() {
    $("#btnPoolUpdate").click(function() {
      showLoader();
      if ($("#poolNameUpdate").val().length == 0) {
        hideLoader();
        error("Havuz adını boş geçmeyiniz.");
        return;
      }
      if ($("#poolDescriptionUpdate").val().length == 0) {
        hideLoader();
        error("Havuz açıklamasını boş geçmeyiniz.");
        return;
      }

      var poolIdVal = $("#poolId").val();

      var parentTenantUpdate = $("#parent_pool_update").val();

      var isActive = false;
      if ($("#defaultUncheckedUpdate").attr("checked") == "checked") {
        isActive = true;
      }

      if ($("#IsSigortaCiniUpdate").attr("checked") == "checked") {
        parentTenantUpdate = "null";
      }

      $.ajax({
        url: "/Pool/Update",
        type: "POST",
        data: {
          ParentaskAssignGroupId: parentTenantUpdate,
          TaskAssignGroupId: poolIdVal,
          TaskAssignGroupName: $("#poolNameUpdate").val(),
          TaskAssignGroupDesc: $("#poolDescriptionUpdate").val(),
          State: isActive
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
            $("#poolOperationUpdateModal").modal("hide");
            sigortaCiniPool.getall();
            hideLoader();
            success("Başarıyla kaydedildi");
          }
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        }
      });
    });

    $("#IsSigortaCiniUpdate").change(function(e) {
      e.preventDefault();
      if ($("#IsSigortaCiniUpdate").attr("checked") == "checked") {
        $("#parent_pool_update").prop("disabled", "disabled");
        $("#parent_pool_update")
          .val("")
          .select2();
      } else {
        $("#parent_pool_update").prop("disabled", false);
      }
    });
  },

  getall: function() {
    showLoader();
    $.ajax({
      url: "/Pool/GetAllAsTree",
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
          var htmlStr = "";
          $.each(dataSet.data, function(itemId, item) {
            htmlStr +=
              '<li class="m-b-3"><i  class="fa fa-plus parent-i"></i><div class="poolparentname"> <label id="poolLabel"> ' +
              '<input  type="hidden"  value=' +
              item.taskAssignGroupId +
              " </>" +
              item.taskAssignGroupName +
              " - " +
              item.taskAssignGroupDesc +
              '</label><button class="img-parent" style="background-image: url(../img/add.png);">  <input  type="hidden"  value=' +
              item.taskAssignGroupId +
              " </></button></div>";
            htmlStr += '<ul class="w-95p pad-left-0">';
            if (item.children.length > 0) {
              pool(item.children);
            }

            htmlStr += "</ul>";
            htmlStr += "</li>";
          });
          function pool(pools) {
            $.each(pools, function(index, child) {
              htmlStr +=
                '<div class="poolalt display-flex  pool-main">' +
                '<li class="pool-li-cursor m5 fnt-13"><input type="hidden"  value=' +
                child.taskAssignGroupId +
                " </> " +
                child.taskAssignGroupName +
                " - " +
                child.taskAssignGroupDesc +
                "</li>" +
                ' <button class="img-parent margin-top-4" style="background-image: url(../img/addblack.png);"><input type="hidden"  value=' +
                child.taskAssignGroupId +
                " </> " +
                "</button>" +
                "</div>";

              if (child.children.length > 0) {
                htmlStr += "<ul>";
                pool(child.children);
                htmlStr += "</ul>";
              }
            });
          }

          $("#treeview").html(htmlStr);
          $("#treeview").hummingbird();

          $(".poolparentname #poolLabel").click(function() {
            sigortaCiniPool.get(
              $(this)
                .find("input")
                .filter(":first")
                .val(),
              1
            );
          });

          $(".poolparentname .img-parent").click(function() {
            sigortaCiniPool.createFromPoolList(
              $(this)
                .find("input")
                .filter(":first")
                .val()
            );
          });

          $(".pool-li-cursor").click(function() {
            sigortaCiniPool.get(
              $(this)
                .find("input")
                .filter(":first")
                .val(),
              2
            );
          });

          $(".poolalt .img-parent").click(function(e) {
            e.preventDefault();
            sigortaCiniPool.createFromPoolList(
              $(this)
                .find("input")
                .filter(":first")
                .val()
            );
          });

          $("#CollapseAll").on("click", function() {
            $("#treeview").hummingbird("collapseAll");
          });

          $("#ExpandAll").on("click", function() {
            $("#treeview").hummingbird("expandAll");
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

  get: function(id, type) {
    if (type == 1) {
      showLoader();
      $.ajax({
        url: "/Pool/get",
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
            $("#poolOperationUpdateModal").modal("show");
            $("#poolNameUpdate").val(dataSet.data.taskAssignGroupName);
            $("#poolDescriptionUpdate").val(dataSet.data.taskAssignGroupDesc);
            if (dataSet.data.state) {
              $(".poolIsActiveDivUpdate")
                .find("span")
                .addClass("checked");
              $("#defaultUncheckedUpdate").attr("checked", "checked");
            } else {
              $(".poolIsActiveDivUpdate")
                .find("span")
                .removeClass("checked");
              $("#defaultUncheckedUpdate").removeAttr("checked");
            }

            $("#parent_pool_update").prop("disabled", "disabled");
            $(".IsSigortaCiniUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#IsSigortaCiniUpdate").attr("checked", "checked");
            $("#parent_pool_update")
              .val("")
              .select2();
            sigortaCiniPool.fillPoolForUpdate(
              dataSet.data.parentaskAssignGroupId
            );

            $("#poolId").val(dataSet.data.taskAssignGroupId);
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
      $.ajax({
        url: "/Pool/get",
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
            $("#poolOperationUpdateModal").modal("show");
            $("#poolNameUpdate").val(dataSet.data.taskAssignGroupName);
            $("#poolDescriptionUpdate").val(dataSet.data.taskAssignGroupDesc);
            if (dataSet.data.state) {
              $(".poolIsActiveDivUpdate")
                .find("span")
                .addClass("checked");
              $("#defaultUncheckedUpdate").attr("checked", "checked");
            } else {
              $(".poolIsActiveDivUpdate")
                .find("span")
                .removeClass("checked");
              $("#defaultUncheckedUpdate").removeAttr("checked");
            }

            if (dataSet.data.parentaskAssignGroupId == null) {
              $("#parent_pool_update").prop("disabled", "disabled");
              $(".IsSigortaCiniUpdateDiv")
                .find("span")
                .addClass("checked");
              $("#IsSigortaCiniUpdate").attr("checked", "checked");
              $("#parent_pool_update")
                .val("")
                .select2();
            } else {
              $(".IsSigortaCiniUpdateDiv")
                .find("span")
                .removeClass("checked");
              $("#IsSigortaCiniUpdate").attr("checked", false);
              $("#parent_pool_update").prop("disabled", false);
              sigortaCiniPool.fillPoolForUpdate(
                dataSet.data.parentaskAssignGroupId
              );
            }
            $("#poolId").val(dataSet.data.taskAssignGroupId);
            hideLoader();
          }
        },
        error: function(errorThrown) {
          hideLoader();
          console.log(errorThrown);
        }
      });
    }
  }
};
