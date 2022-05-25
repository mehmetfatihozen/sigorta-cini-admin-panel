var table;
$(document).ready(function() {
  sigortaCiniTaskAssign.init();
  $("#btnRoleOpenModal").click(function() {
    $("#myModalRole").modal("show");
    $("#TaskAssignTaskTypeName").val("");
    $(".AssignIsActiveDiv")
      .find("span")
      .addClass("checked");
    $("#TaskAssignTaskTypeState").attr("checked", "checked");
  });
});
var sigortaCiniTaskAssign = {
  init: function() {
    this.create();
    this.getall();
    this.update();
  },

  create: function() {
    $("#btnTaskAdd").click(function() {
      showLoader();
      if ($("#TaskAssignTaskTypeName").val().length == 0) {
        hideLoader();
        error("Görev Tipi  ismini boş geçmeyiniz.");
        return;
      }

      var TaskId = 0;

      var isActive = false;
      if ($("#TaskAssignTaskTypeState").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/TaskAssignTaskType/Create",
        type: "POST",
        data: {
          TaskAssignTaskTypeId: TaskId,
          TaskAssignTaskTypeName: $("#TaskAssignTaskTypeName").val(),
          TaskAssignTaskTypeState: isActive
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
            $("#myModalRole").modal("hide");
            sigortaCiniTaskAssign.getall();
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

  update: function() {
    $("#btnTaskUpdate").click(function() {
      showLoader();
      if ($("#TaskAssignTaskTypeNameUpdate").val().length == 0) {
        hideLoader();
        error("Görev Tipi ismini boş geçmeyiniz.");
        return;
      }

      var TaskIdVal = $("#TaskTypeId").val();

      var isActive = false;
      if ($("#TaskAssignTaskTypeStateUpdate").attr("checked") == "checked") {
        isActive = true;
      }
      $.ajax({
        url: "/TaskAssignTaskType/Update",
        type: "PUT",
        data: {
          TaskAssignTaskTypeId: TaskIdVal,
          TaskAssignTaskTypeName: $("#TaskAssignTaskTypeNameUpdate").val(),
          TaskAssignTaskTypeState: isActive
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
            $("#myModalRoleUpdate").modal("hide");
            sigortaCiniTaskAssign.getall();
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
      url: "/TaskAssignTaskType/GetAll",
      type: "GET",
      dataType: "json",
      success: function(dataSet) {
        if (dataSet == null) {
          error("Sistemde bir hata oluştu");
          return;
        } else if (dataSet.hasError) {
          error(dataSet.message);
          return;
        } else {
          sigortaCiniTaskAssign.fillDataTable(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  fillDataTable: function(dataInput) {
    showLoader();
    $("#taskAssignTypes").DataTable({
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
        { data: "taskAssignTaskTypeName" },
        { data: "taskAssignTaskTypeState" }
      ]
    });

    sigortaCiniTaskAssign.datatableDoubleClick();
    hideLoader();
  },

  datatableDoubleClick: function() {
    $("#taskAssignTypes tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#taskAssignTypes").DataTable();
      var data = table.row(this).data();
      sigortaCiniTaskAssign.get(data.taskAssignTaskTypeId);
    });
  },

  get: function(id) {
    showLoader();

    $.ajax({
      url: "/TaskAssignTaskType/GetById",
      type: "GET",
      dataType: "json",
      data: {
        taskAssignTaskTypeId: id
      },
      success: function(dataSet) {
        if (dataSet == null) {
          hideLoader();
          error("Sistemde bir hata oluştu");
        } else if (dataSet.hasError) {
          hideLoader();
          error(dataSet.message);
        } else {
          $("#TaskAssignTaskTypeNameUpdate").val(
            dataSet.data.taskAssignTaskTypeName
          );
          $("#TaskTypeId").val(dataSet.data.taskAssignTaskTypeId);

          if (dataSet.data.taskAssignTaskTypeState) {
            $(".AssignIsActiveUpdateDiv")
              .find("span")
              .addClass("checked");
            $("#TaskAssignTaskTypeStateUpdate").attr("checked", "checked");
          } else {
            $(".AssignIsActiveUpdateDiv")
              .find("span")
              .removeClass("checked");
            $("#TaskAssignTaskTypeStateUpdate").removeAttr("checked");
          }
          $("#myModalRoleUpdate").modal("show");
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
