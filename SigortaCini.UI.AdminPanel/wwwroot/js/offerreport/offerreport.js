
$(document).ready(function () {
    offerReport.init();

    $("#offerReportByProductTab").click(function (e) {
        e.preventDefault();
        $("#btnClearByProduct").trigger("click");
    });
    $("#offerReportByCompanyTab").click(function (e) {
        e.preventDefault();
        $("#btnClearByCompany").trigger("click");
    });

    $("#selectAllTenantsByProduct").click(function () {
        if ($("#selectAllTenantsByProduct").is(":checked")) {
            $("#tenantsByProduct > option").prop("selected", "selected");
            $("#tenantsByProduct").trigger("change");
        } else {
            $("#tenantsByProduct > option").removeAttr("selected");
            $("#tenantsByProduct").trigger("change");
        }
    });

    $("#selectAllTenantsByCompany").click(function () {
        if ($("#selectAllTenantsByCompany").is(":checked")) {
            $("#tenantsByCompany > option").prop("selected", "selected");
            $("#tenantsByCompany").trigger("change");
        } else {
            $("#tenantsByCompany > option").removeAttr("selected");
            $("#tenantsByCompany").trigger("change");
        }
    });

    $("#selectAllProductsByCompany").click(function () {
        if ($("#selectAllProductsByCompany").is(":checked")) {
            $("#productsByCompany > option").prop("selected", "selected");
            $("#productsByCompany").trigger("change");
        } else {
            $("#productsByCompany > option").removeAttr("selected");
            $("#productsByCompany").trigger("change");
        }
    });

    $("#btnListByProduct").trigger("click");
});

var offerReport = {
    init: function () {
        this.GetOfferReport();
        this.ExcelFileDownload();
        this.GetTenants("#tenantsByProduct");
        this.GetTenants("#tenantsByCompany");
        this.GetProducts();
        this.DateRangePickerInitialize("#createdDateRangeByProduct");
        this.DateRangePickerInitialize("#createdDateRangeByCompany");
        this.Clear();
    },

    GetOfferReport: function () {
        $("#btnListByProduct").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                TenantIdList: $("#tenantsByProduct").val()
            }

            if ($('#createdDateRangeByProduct').val() !== '' && $('#createdDateRangeByProduct').val() !== null) {
                data.CreatedDateFrom = $('#createdDateRangeByProduct').val().split("-")[0].trim() + " 12:00:00";
                data.CreatedDateTo = $('#createdDateRangeByProduct').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/OfferReport/GetOfferReportByProduct",
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
                        var dataArray = []
                        $.each(response.data, function (index, item) {
                            dataArray.push({ name: item.productName, data: [item.offerSuccessRate] })
                        });
                        offerReport.CreateReportChart(dataArray);
                        offerReport.CreateReportInfoByProduct(response.data);
                    }
                    hideLoader();
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });

        $("#btnListByCompany").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                TenantIdList: $("#tenantsByCompany").val(),
                ProductIdList: $("#productsByCompany").val()
            }

            if ($('#createdDateRangeByCompany').val() !== '' && $('#createdDateRangeByCompany').val() !== null) {
                data.CreatedDateFrom = $('#createdDateRangeByCompany').val().split("-")[0].trim() + " 12:00:00";
                data.CreatedDateTo = $('#createdDateRangeByCompany').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/OfferReport/GetOfferReportByCompany",
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
                        var dataArray = []
                        $.each(response.data, function (index, item) {
                            dataArray.push({ name: item.companyName, data: [item.offerSuccessRate] })
                        });
                        offerReport.CreateReportChart(dataArray);
                        offerReport.CreateReportInfoByCompany(response.data);
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

    ExcelFileDownload: function () {
        $("#btnExcelFileDownloadByProduct").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                TenantIdList: $("#tenantsByProduct").val()
            }

            if ($('#createdDateRangeByProduct').val() !== '' && $('#createdDateRangeByProduct').val() !== null) {
                data.CreatedDateFrom = $('#createdDateRangeByProduct').val().split("-")[0].trim() + " 12:00:00";
                data.CreatedDateTo = $('#createdDateRangeByProduct').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/OfferReport/CreateOfferReportExcelFile",
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
                        window.location.href = response.data;
                    }
                    hideLoader();
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });

        $("#btnExcelFileDownloadByCompany").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                TenantIdList: $("#tenantsByCompany").val()
            }

            if ($('#createdDateRangeByCompany').val() !== '' && $('#createdDateRangeByCompany').val() !== null) {
                data.CreatedDateFrom = $('#createdDateRangeByCompany').val().split("-")[0].trim() + " 12:00:00";
                data.CreatedDateTo = $('#createdDateRangeByCompany').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/OfferReport/CreateOfferReportExcelFile",
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
                        window.location.href = response.data;
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

    CreateReportChart: function (dataArray) {
        $("#offerReportChart").html("");

        var options = {
            series: dataArray,
            chart: {
                type: 'bar',
                height: 500
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '75%',
                    endingShape: 'flat'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 10,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Teklif Verme Yüzdesi'],
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return '%' + val;
                    }
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#offerReportChart"), options);
        chart.render();
    },

    CreateReportInfoByProduct: function (dataInput) {
        var infoText = ""
        $.each(dataInput, function (index, item) {
            infoText += '<div class="row"><h4><strong>' + item.productName + ' SİGORTASI</strong></h4><p>Bir müşteri için ' + item.totalCompanyCount + ' sigorta şirketinden ortalama ' + item.averageOfferCount + ' teklif görüntüleniyor.</p><p>Toplam Task Sayısı: '+ item.totalTaskCount + '</p></div>';
        });
        $("#offerReportInfo").html(infoText);
    },

    CreateReportInfoByCompany: function (dataInput) {
        var infoText = ""
        $.each(dataInput, function (index, item) {
            infoText += '<div class="row"><h4><strong>' + item.companyName + ' SİGORTA</strong></h4><p>' + item.expectedOfferCount + ' teklif isteğinden ' + item.madeOfferCount + ' tanesine teklif dönülmüştür.</p></div>';
        });
        $("#offerReportInfo").html(infoText);
    },

    GetTenants: function (element) {
        showLoader();
        $(element).html('<option disabled="disabled" value="">Seçiniz</option>');
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
                        $(element).append(
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

    GetProducts: function () {
        showLoader();
        $("#productsByCompany").html('<option disabled="disabled" value="">Seçiniz</option>');
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
                        $("#productsByCompany").append(
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

    Clear: function () {
        $('#createdDateRangeByProduct').val("");
        $('#createdDateRangeByCompany').val("");

        $("#btnClearByProduct").click(function (e) {
            e.preventDefault();

            $("#tenantsByProduct")
                .val("")
                .select2();

            $('#createdDateRangeByProduct').val("");

            $("#selectAllTenantsByProduct").attr("checked", false);

            $("#btnListByProduct").trigger("click");
        });

        $("#btnClearByCompany").click(function (e) {
            e.preventDefault();

            $("#tenantsByCompany")
                .val("")
                .select2();
            $("#productsByCompany")
                .val("")
                .select2();

            $('#createdDateRangeByCompany').val("");

            $("#selectAllTenantsByCompany").attr("checked", false);
            $("#selectAllProductsByCompany").attr("checked", false);

            $("#btnListByCompany").trigger("click");
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