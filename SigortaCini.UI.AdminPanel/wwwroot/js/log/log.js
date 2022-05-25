$(document).ready(function() {
  sigortaCiniLog.init();
  $("#start_date_b2b").datepicker();
  $("#end_date_b2b").datepicker();
  $("#start_date_b2c").datepicker();
  $("#end_date_b2c").datepicker();
  $("#start_date_mq").datepicker();
  $("#end_date_mq").datepicker();

  var countforb2c;
  countforb2c = 0;

  var countformq;
  countformq = 0;

  $("#changeTabB2C").click(function(e) {
    e.preventDefault();
    if (countforb2c == 0) {
      sigortaCiniLog.getLastB2CLogs();
      countforb2c++;
    }
  });

  $("#changeTabMQ").click(function(e) {
    e.preventDefault();
    if (countformq == 0) {
      sigortaCiniLog.getLastMQLogs();
      countformq++;
    }
  });
});

var sigortaCiniLog = {
  init: function() {
    this.getLastB2BLogs();
    this.getAllUsers();
    this.getB2BLogs();
    this.getB2CLogs();
    this.getMqLogs();
    this.clearInputs();
  },

  clearInputs: function() {
    $("#btnClearb2b").click(function(e) {
      e.preventDefault();
      $("#start_date_b2b").val("");
      $("#end_date_b2b").val("");
      $("#typeIdB2b").val("");
      $("#userlistb2b")
        .val("")
        .select2();
      sigortaCiniLog.getLastB2BLogs();
    });

    $("#btnClearb2c").click(function(e) {
      e.preventDefault();
      $("#start_date_b2c").val("");
      $("#end_date_b2c").val("");
      $("#typeIdB2c").val("");
      $("#userlistb2c")
        .val("")
        .select2();
      sigortaCiniLog.getLastB2CLogs();
    });

    $("#btnClearMq").click(function(e) {
      e.preventDefault();
      $("#start_date_mq").val("");
      $("#end_date_mq").val("");
      sigortaCiniLog.getLastMQLogs();
    });
  },

  getAllUsers: function() {
    showLoader();
    $("#userlistb2b").html('<option value="">Seçiniz</option>');
    $("#userlistb2c").html('<option value="">Seçiniz</option>');
    $("#userlistmq").html('<option value="">Seçiniz</option>');

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
          $.each(dataSet.data, function(index, item) {
            var user =
              item.firstName + " " + item.lastName + "(" + item.username + ")";
            $("#userlistb2b").append(new Option(user, item.userId));
            $("#userlistb2c").append(new Option(user, item.userId));
            $("#userlistmq").append(new Option(user, item.userId));
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

  getLastB2BLogs: function() {
    showLoader();
    $.ajax({
      url: "/Log/GetLastB2BLog",
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
          sigortaCiniLog.fillDataTableForB2B(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getLastB2CLogs: function() {
    showLoader();
    $.ajax({
      url: "/Log/GetLastB2CLog",
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
          sigortaCiniLog.fillDataTableForB2C(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getLastMQLogs: function() {
    showLoader();
    $.ajax({
      url: "/Log/GetLastMQLog",
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
          sigortaCiniLog.fillDataTableForMq(dataSet.data);
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getB2BLogs: function() {
    $("#btnListb2b").click(function(e) {
      e.preventDefault();
      if ($("#start_date_b2b").val() == "" || $("#end_date_b2b").val() == "") {
        error("Lütfen tarih giriniz.");
      } else if (
        graterThan($("#end_date_b2b").val(), null, $("#start_date_b2b").val())
      ) {
        error("Lütfen tarih aralığını doğru giriniz.");
      } else {
        var b2b_start_picker = $("#start_date_b2b").val();
        b2b_start_picker += " 12:00:00";

        var b2b_end_picker = $("#end_date_b2b").val();
        b2b_end_picker += " 12:00:00";

        showLoader();
        $.ajax({
          url: "/Log/SearchB2BLog",
          type: "POST",
          dataType: "json",
          data: {
            UserId: $("#userlistb2b").val(),
            LogFrom: b2b_start_picker,
            LogTo: b2b_end_picker,
            MethodType: $("#typeIdB2b").val()
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
              sigortaCiniLog.fillDataTableForB2B(dataSet.data);
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
  },

  fillDataTableForB2B: function(dataInput) {
    $("#logTableB2b").DataTable({
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
        { data: "enviroment" },
        { data: "ipAddress" },
        {
          data: "hasError",
          render: function(data, type, row) {
            if (data == false) {
              return "Yok";
            } else {
              return "Var";
            }
          }
        },
        {
          data: "createDate",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        }
      ]
    });

    sigortaCiniLog.datatableClickForB2B();
  },

  datatableClickForB2B: function() {
    $("#logTableB2b tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#logTableB2b").DataTable();
      var data = table.row(this).data();
      sigortaCiniLog.B2BLogGetById(data.logId);
    });
  },

  B2BLogGetById: function(id) {
    showLoader();

    $.ajax({
      url: "/Log/B2BLogGetById",
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
          $("#resultDetailsB2b").modal("show");
          $("#enviroment").val(dataSet.data.enviroment);
          $("#methodType").val(dataSet.data.methodType);
          $("#typeName").val(dataSet.data.typeName);
          $("#ipAddress").val(dataSet.data.ipAddress);
          var create = letFormat(
            new Date(dataSet.data.createDate)
              .toUTCString()
              .split(",")[1]
              .replace("GMT", "")
          );
          $("#createDate").val(create);
          sigortaCiniLog.getUser(dataSet.data.userId);
          $("#jjson").jJsonViewer(dataSet.data.data, { expanded: true });
          hideLoader();
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getB2CLogs: function() {
    $("#btnListB2c").click(function(e) {
      e.preventDefault();

      if (
        $("#typeIdB2c").val() == "" &&
        $("#start_date_b2c").val() == "" &&
        $("#end_date_b2c").val() == ""
      ) {
        error("Lütfen listeleme için en az bir parametre giriniz.");
        return false;
      } else {
        if ($("#typeIdB2c").val() == "") {
          if (
            $("#start_date_b2c").val() == "" ||
            $("#end_date_b2c").val() == ""
          ) {
            error("Lütfen tarih giriniz.");
            return false;
          } else {
            if (
              graterThan(
                $("#end_date_b2c").val(),
                null,
                $("#start_date_b2c").val()
              )
            ) {
              error("Lütfen tarih aralığını doğru giriniz.");
              return false;
            }
          }
        } else {
          if (
            $("#start_date_b2c").val() != "" ||
            $("#end_date_b2c").val() != ""
          ) {
            if (
              graterThan(
                $("#end_date_b2c").val(),
                null,
                $("#start_date_b2c").val()
              )
            ) {
              error("Lütfen tarih aralığını doğru giriniz.");
              return false;
            }
          }
        }
      }

      var b2c_start_picker = $("#start_date_b2c").val();
      var b2c_end_picker = $("#end_date_b2c").val();

      if (b2c_start_picker != "" && b2c_end_picker != "") {
        b2c_start_picker += " 12:00:00";
        b2c_end_picker += " 12:00:00";
      } else {
        b2c_start_picker += "";
        b2c_end_picker += "";
      }

      showLoader();
      $.ajax({
        url: "/Log/SearchB2CLog",
        type: "POST",
        dataType: "json",
        data: {
          UserId: $("#userlistb2c").val(),
          LogFrom: b2c_start_picker,
          LogTo: b2c_end_picker,
          MethodType: $("#typeIdB2c").val()
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
            sigortaCiniLog.fillDataTableForB2C(dataSet.data);
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

  fillDataTableForB2C: function(dataInput) {
    $("#logTableB2c").DataTable({
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
        { data: "environment" },
        { data: "controller" },
        { data: "method" },
        {
          data: "hasError",
          render: function(data, type, row) {
            if (data == false) {
              return "Yok";
            } else {
              return "Var";
            }
          }
        },
        {
          data: "requestTime",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        }
      ]
    });

    sigortaCiniLog.datatableClickForB2C();
  },

  datatableClickForB2C: function() {
    $("#logTableB2c tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#logTableB2c").DataTable();
      var data = table.row(this).data();
      sigortaCiniLog.B2CLogGetById(data.logId);
    });
  },

  B2CLogGetById: function(id) {
    showLoader();

    $.ajax({
      url: "/Log/B2CLogGetById",
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
          $("#resultDetailsB2c").modal("show");
          $("#enviromentb2c").val(dataSet.data.environment);
          $("#methodTypeb2c").val(dataSet.data.method);
          $("#typeNameb2c").val(dataSet.data.controller);
          var create = letFormat(
            new Date(dataSet.data.requestTime)
              .toUTCString()
              .split(",")[1]
              .replace("GMT", "")
          );
          $("#createDateb2c").val(create);
          $("#tenant_token").val(dataSet.data.tenantToken);
          $("#sessionId").val(dataSet.data.sessionId);
          $("#errMessage").val(dataSet.data.errorMessage);
          $("#jjsonforrequest").jJsonViewer(dataSet.data.request, {
            expanded: true
          });
          $("#jjsonforresponse").jJsonViewer(dataSet.data.response, {
            expanded: true
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

  getMqLogs: function() {
    $("#btnListMq").click(function(e) {
      e.preventDefault();
      if (
        $("#keyformq").val() == "" &&
        $("#start_date_mq").val() == "" &&
        $("#end_date_mq").val() == ""
      ) {
        error("Lütfen listeleme için en az bir parametre giriniz.");
        return false;
      } else {
        if ($("#keyformq").val() == "") {
          if (
            $("#start_date_mq").val() == "" ||
            $("#end_date_mq").val() == ""
          ) {
            error("Lütfen tarih giriniz.");
            return false;
          } else {
            if (
              graterThan(
                $("#end_date_mq").val(),
                null,
                $("#start_date_mq").val()
              )
            ) {
              error("Lütfen tarih aralığını doğru giriniz.");
              return false;
            }
          }
        } else {
          if (
            $("#start_date_mq").val() != "" ||
            $("#end_date_mq").val() != ""
          ) {
            if (
              graterThan(
                $("#end_date_mq").val(),
                null,
                $("#start_date_mq").val()
              )
            ) {
              error("Lütfen tarih aralığını doğru giriniz.");
              return false;
            }
          }
        }
      }

      var mq_start_picker = $("#start_date_mq").val();
      var mq_end_picker = $("#end_date_mq").val();

      if (mq_start_picker != "" || mq_end_picker != "") {
        mq_start_picker += " 12:00:00";
        mq_end_picker += " 12:00:00";
      } else {
        mq_start_picker += "";
        mq_end_picker += "";
      }

      showLoader();
      $.ajax({
        url: "/Log/SearchMQLog",
        type: "POST",
        dataType: "json",
        data: {
          UserId: null,
          LogFrom: mq_start_picker,
          LogTo: mq_end_picker,
          MethodType: $("#keyformq").val()
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
            sigortaCiniLog.fillDataTableForMq(dataSet.data);
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

  fillDataTableForMq: function(dataInput) {
    $("#logTableMq").DataTable({
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
        { data: "product.productMidCatDesc" },
        { data: "methodName" },
        {
          data: "requestTime",
          render: function(data, type, row) {
            return letFormat(
              new Date(data)
                .toUTCString()
                .split(",")[1]
                .replace("GMT", "")
            );
          }
        }
      ]
    });

    sigortaCiniLog.datatableClickForMq();
  },

  datatableClickForMq: function() {
    $("#logTableMq tbody").on("click", "tr", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var table = $("#logTableMq").DataTable();
      var data = table.row(this).data();
      sigortaCiniLog.MqGetById(data.mqeLogId);
    });
  },

  MqGetById: function(id) {
    showLoader();

    $.ajax({
      url: "/Log/MQLogGetById",
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
            $("#message").val(dataSet.data.exceptionMessage);
            hideLoader();
          if (dataSet.data.logType == "xml") {
            $(".xml_content").removeClass("hide");
            $(".json_content").addClass("hide");
            $("#xmlinput")
              .empty()
              .simpleXML({
                xmlString: dataSet.data.inputJson,
                collapsedText: "..."
              });
            $("#xmloutput")
              .empty()
              .simpleXML({
                xmlString: dataSet.data.outputJson,
                collapsedText: "..."
              });
          } else {
            $(".json_content").removeClass("hide");
            $(".xml_content").addClass("hide");
            $("#jjsonmqinput").jJsonViewer(dataSet.data.inputJson, {
              expanded: true
            });
            $("#jjsonmqoutput").jJsonViewer(dataSet.data.outputJson, {
              expanded: true
            });
          }
          $("#resultDetailsmq").modal("show");
        }
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        hideLoader();
      }
    });
  },

  getUser: function(userid) {
    showLoader();
    $.ajax({
      url: "/User/GetUser",
      type: "GET",
      dataType: "json",
      data: {
        id: userid
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
          $("#userId").val(
            dataSet.personFirstName +
              " " +
              dataSet.personLastName +
              " " +
              "(" +
              dataSet.userName +
              ")"
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
