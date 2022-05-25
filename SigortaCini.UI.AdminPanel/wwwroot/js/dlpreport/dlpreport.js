
var tabName = "list";

$(document).ready(function () {
    dlpcReport.init();

    google.charts.load("current", { packages: ["corechart"] });

    $("#dlpcReportChartTab").click(function (e) {
        e.preventDefault();
        tabName = "chart";
        $("#btnList").trigger("click");
    });
    $("#dlpcReportListTab").click(function (e) {
        e.preventDefault();
        tabName = "list"
        $("#btnList").trigger("click");
    });

    $("#selectAllLeadTypes").click(function () {
        if ($("#selectAllLeadTypes").is(":checked")) {
            $("#leadTypes > option").prop("selected", "selected");
            $("#leadTypes").trigger("change");
        } else {
            $("#leadTypes > option").removeAttr("selected");
            $("#leadTypes").trigger("change");
        }
    });

    $("#selectAllProductLeadTypes").click(function () {
        if ($("#selectAllProductLeadTypes").is(":checked")) {
            $("#productLeadTypes > option").prop("selected", "selected");
            $("#productLeadTypes").trigger("change");
        } else {
            $("#productLeadTypes > option").removeAttr("selected");
            $("#productLeadTypes").trigger("change");
        }
    });

    $("#selectAllTenants").click(function () {
        if ($("#selectAllTenants").is(":checked")) {
            $("#tenants > option").prop("selected", "selected");
            $("#tenants").trigger("change");
        } else {
            $("#tenants > option").removeAttr("selected");
            $("#tenants").trigger("change");
        }
    });

    $("#selectAllLeadSourceTypes").click(function () {
        if ($("#selectAllLeadSourceTypes").is(":checked")) {
            $("#leadSourceTypes > option").prop("selected", "selected");
            $("#leadSourceTypes").trigger("change");
        } else {
            $("#leadSourceTypes > option").removeAttr("selected");
            $("#leadSourceTypes").trigger("change");
        }
    });

    $("#selectAllProducts").click(function () {
        if ($("#selectAllProducts").is(":checked")) {
            $("#products > option").prop("selected", "selected");
            $("#products").trigger("change");
        } else {
            $("#products > option").removeAttr("selected");
            $("#products").trigger("change");
        }
    });

    $("#selectAllAssignedUsers").click(function () {
        if ($("#selectAllAssignedUsers").is(":checked")) {
            $("#assignedUsers > option").prop("selected", "selected");
            $("#assignedUsers").trigger("change");
        } else {
            $("#assignedUsers > option").removeAttr("selected");
            $("#assignedUsers").trigger("change");
        }
    });

    $("#btnList").trigger("click");
});

var dlpcReport = {
    init: function () {
        this.GetDLPCReport();
        this.GetLeadTypes();
        this.GetProductLeadTypes();
        this.GetTenants();
        this.GetLeadSourceTypes();
        this.GetProducts();
        this.GetAssignedUsers();
        this.DateRangePickerInitialize("#createdDateRange");
        this.DateRangePickerInitialize("#updatedDateRange");
        this.Clear();
    },

    GetDLPCReport: function () {
        $("#btnList").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                LeadTypeIdList: $("#leadTypes").val(),
                ProductLeadTypeIdList: $("#productLeadTypes").val(),
                TenantIdList: $("#tenants").val(),
                LeadSourceTypeIdList: $("#leadSourceTypes").val(),
                ProductIdList: $("#products").val(),
                AssignedUserIdList: $("#assignedUsers").val()
            }

            if ($('#createdDateRange').val() !== '' && $('#createdDateRange').val() !== null) {
                data.CreatedDateFrom = $('#createdDateRange').val().split("-")[0].trim() + " 12:00:00";
                data.CreatedDateTo = $('#createdDateRange').val().split("-")[1].trim() + " 12:00:00";
            }
            if ($('#updatedDateRange').val() !== '' && $('#updatedDateRange').val() !== null) {
                data.UpdatedDateFrom = $('#updatedDateRange').val().split("-")[0].trim() + " 12:00:00";
                data.UpdatedDateTo = $('#updatedDateRange').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/DlpReport/GetDLPCReport",
                type: "POST",
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response === null) {
                        error("Sistemde bir hata oluştu");
                    } else if (response.hasError) {
                        error(response.message);
                    } else {
                        console.log(response.data);
                        if (tabName === "list") {
                            dlpcReport.FillDataTable(response.data.reportItemList);
                        } else if (tabName === "chart") {
                            dlpcReport.CreateReportChart(response.data.totalRecordList);
                        }
                    }
                    hideLoader();
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });
    },

    FillDataTable: function (dataInput) {
        $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss');

        $.extend($.fn.dataTableExt.oSort, {
            "turkish-pre": function (a) {
                var special_letters = {
                    "C": "Ca", "c": "ca", "Ç": "Cb", "ç": "cb",
                    "G": "Ga", "g": "ga", "Ğ": "Gb", "ğ": "gb",
                    "I": "Ia", "ı": "ia", "İ": "Ib", "i": "ib",
                    "O": "Oa", "o": "oa", "Ö": "Ob", "ö": "ob",
                    "S": "Sa", "s": "sa", "Ş": "Sb", "ş": "sb",
                    "U": "Ua", "u": "ua", "Ü": "Ub", "ü": "ub"
                };
                for (var val in special_letters) {
                    if (a === null) {
                        a = "";
                    }
                    a = a.split(val).join(special_letters[val]).toLowerCase();
                }
                return a;
            },

            "turkish-asc": function (a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            },

            "turkish-desc": function (a, b) {
                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            }
        });

        $("#dlpcReportTable").DataTable({
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
                },
                buttons: {
                    pageLength: {
                        _: "%d kayıt göster",
                        '-1': "hepsini göster"
                    }
                }
            },
            order: [],
            paging: true,
            searching: true,
            destroy: true,
            responsive: true,
            dom: "Bfrtip",
            buttons: [
                {
                    extend: "pageLength",
                    className: "margin-right-10"
                },
                {
                    extend: "excelHtml5",
                    text: '<i class="fa fa-file-excel-o"></i> Excel',
                    titleAttr: "Excel",
                    className: "export-excell-button"
                }
            ],
            data: dataInput,
            lengthMenu: [[10, 25, 50, -1], ['10 kayıt', '25 kayıt', '50 kayıt', 'Hepsi']],
            pageLength: 10,
            //columnDefs: [
            //    { targets: [7, 8, 9], visible: false, searchable: false, orderable: false }
            //],
            columnDefs: [
                { type: 'turkish', targets: [0, 1, 2, 3, 4, 7, 8/*, 9*/] }
            ],
            columns: [
                { data: "leadTypeName" },
                { data: "productLeadTypeName" },
                { data: "tenantName" },
                { data: "productName" },
                { data: "leadName" },
                { data: "assignedUserName" },
                {
                    data: "createDate",
                    render: function (data, type, row) {
                        if (data === '0001-01-01T00:00:00Z') {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY HH:mm:ss');
                        }
                    }
                },
                {
                    data: "updatedDate",
                    render: function (data, type, row) {
                        if (data === '0001-01-01T00:00:00Z') {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY HH:mm:ss');
                        }
                    }
                },
                { data: "leadLastEmail" },
                { data: "leadLastPhone" }
                //,{ data: "companyName" }
            ]
        });
        $(".dt-buttons").attr("style", "display:inline");
    },

    CreateReportChart: function (dataInput) {
        function GetRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        var dataArray = [['Lead Tipi', 'Ürün Sayısı', { role: 'style' }]]
        $.each(dataInput, function (index, item) {
            dataArray.push([item.name, item.count, GetRandomColor()])
        });

        var data = new google.visualization.arrayToDataTable(dataArray);

        var options = {
            chartArea: { width: '50%' },
            hAxis: {
                title: 'Toplam Ürün Sayısı',
                minValue: 0
            },
            vAxis: {
                title: 'Lead Tipi'
            },
            legend: { position: "none" }
        };

        var chart = new google.visualization.BarChart(
            document.getElementById("dlpcReportChart")
        );

        chart.draw(data, options);
    },

    GetLeadTypes: function () {
        showLoader();
        $("#leadTypes").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/LeadType/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        if (!item.leadTypeName.includes("CallCenter") && !item.leadTypeName.includes("Customer")) {
                            $("#leadTypes").append(new Option(item.leadTypeName, item.leadTypeId));
                        }
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    GetProductLeadTypes: function () {
        showLoader();
        $("#productLeadTypes").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/LeadType/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        if (!item.leadTypeName.includes("CallCenter") && !item.leadTypeName.includes("Customer")) {
                            $("#productLeadTypes").append(new Option(item.leadTypeName, item.leadTypeId));
                        }
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    GetTenants: function () {
        showLoader();
        $("#tenants").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/Tenant/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        $("#tenants").append(
                            new Option(item.tenantName, item.tenantId)
                        );
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    GetLeadSourceTypes: function () {
        showLoader();
        $("#leadSourceTypes").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/LeadSourceType/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        if (item.isLead) {
                            $("#leadSourceTypes").append(
                                new Option(item.leadSourceTypeName, item.leadSourceTypeId)
                            );
                        }
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    GetProducts: function () {
        showLoader();
        $("#products").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/ProductMidCategory/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        $("#products").append(
                            new Option(item.productMidCatDesc, item.productMidCatId)
                        );
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    GetAssignedUsers: function () {
        showLoader();
        $("#assignedUsers").html('<option disabled="disabled" value="">Seçiniz</option>');
        $.ajax({
            url: "/User/GetAllUser",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $("#assignedUsers").append(
                        new Option('YOK', 0)
                    );
                    $.each(dataSet.data, function (index, item) {
                        $("#assignedUsers").append(
                            new Option(item.firstName + " " + item.lastName, item.userId)
                        );
                    });
                }
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    Clear: function () {
        $('#createdDateRange').val("");
        $('#updatedDateRange').val("");

        $("#btnClear").click(function (e) {
            e.preventDefault();

            $("#leadTypes")
                .val("")
                .select2();
            $("#productLeadTypes")
                    .val("")
                    .select2();
            $("#tenants")
                .val("")
                .select2();
            $("#leadSourceTypes")
                .val("")
                .select2();
            $("#products")
                .val("")
                .select2();
            $("#assignedUsers")
                .val("")
                .select2();

            $('#createdDateRange').val("");
            $('#updatedDateRange').val("");

            $("#selectAllLeadTypes").attr("checked", false);
            $("#selectAllProductLeadTypes").attr("checked", false);
            $("#selectAllTenants").attr("checked", false);
            $("#selectAllLeadSourceTypes").attr("checked", false);
            $("#selectAllProducts").attr("checked", false);
            $("#selectAllAssignedUsers").attr("checked", false);

            $("#btnList").trigger("click");
        });
    },

    DateRangePickerInitialize: function (element) {
        function cb(start, end) {
            $(element).val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        }

        $(element).daterangepicker({
            "autoUpdateInput": true,
            "showDropdowns": true,
            "showCustomRangeLabel": false,
            "alwaysShowCalendars": true,
            "timePicker24Hour": true,
            "opens": "left",
            "applyClass": "btn btn-xs btn-default",
            "cancelClass": "btn btn-xs btn-link",
            ranges: {
                'Bugün': [moment(), moment()],
                'Dün': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Son 7 gün': [moment().subtract(6, 'days'), moment()],
                'Son 30 gün': [moment().subtract(29, 'days'), moment()],
                'Bu ay': [moment().startOf('month'), moment().endOf('month')],
                'Geçen ay': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Uygula",
                "cancelLabel": "Temizle",
                "fromLabel": "Dan",
                "toLabel": "a",
                "customRangeLabel": "Özel",
                "daysOfWeek": [
                    "Pzr",
                    "Pzt",
                    "Sl",
                    "Çrş",
                    "Prş",
                    "Cm",
                    "Cts"
                ],
                "monthNames": [
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
                "firstDay": 1
            }
        }, cb);

        $(element).on('cancel.daterangepicker', function () {
            $(element).val('');
        });
    }
};