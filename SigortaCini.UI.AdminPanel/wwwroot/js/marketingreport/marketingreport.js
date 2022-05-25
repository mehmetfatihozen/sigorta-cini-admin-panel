
$(document).ready(function () {
    marketingReport.init();

    $("#selectAllTenants").click(function () {
        if ($("#selectAllTenants").is(":checked")) {
            $("#tenants > option").prop("selected", "selected");
            $("#tenants").trigger("change");
        } else {
            $("#tenants > option").removeAttr("selected");
            $("#tenants").trigger("change");
        }
    });

    $("#btnList").trigger("click");
});

var marketingReport = {
    init: function () {
        this.GetMarketingReport();
        this.GetTenants();
        this.DateRangePickerInitialize("#dateRangeList");
        this.Clear();
    },

    GetMarketingReport: function () {
        $("#btnList").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {
                TenantIdList: $("#tenants").val(),
                DateFrom: $('#dateRangeList').val().split("-")[0].trim() + " 12:00:00",
                DateTo: $('#dateRangeList').val().split("-")[1].trim() + " 12:00:00",
            }

            $.ajax({
                url: "/MarketingReport/GetMarketingReport",
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
                        marketingReport.FillDataTable(response.data);
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
        $.fn.dataTable.moment('DD/MM/YYYY');

        $("#marketingReportTable").DataTable({
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
            columns: [
                { data: "leadName" },
                { data: "leadSurname" },
                { data: "citizenshipNumber" },
                { data: "address" },
                { data: "email" },

                { data: "productName" },
                { data: "tenantName" },
                { data: "referringUserName" },
                { data: "assignedUserName" },
                { data: "assignedUserBranchName" },

                { data: "customerName" },

                { data: "phone" },
                { data: "city" },
                { data: "district" },
                { data: "lastState" },
                { data: "asbisNo" },
                { data: "chassisNo" },
                { data: "engineNo" },
                { data: "plate" },
                { data: "make" },
                { data: "model" },

                {
                    data: "leadCreatedDate",
                    render: function (data, type, row) {
                        if (data === '0001-01-01T00:00:00Z') {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY');
                        }
                    }
                },
                { data: "leadCreatedTime" },
                {
                    data: "leadUpdatedDate",
                    render: function (data, type, row) {
                        if (data === '0001-01-01T00:00:00Z') {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY');
                        }
                    }
                },
                { data: "leadUpdatedTime" },

                { data: "campaignCode" },
                { data: "campaignCodeOrganizationName" },
                {
                    data: "customerKVKK",
                    render: function (data, type, row) {
                        if (data) {
                            return 'Evet';
                        } else if (!data) {
                            return 'Hayır';
                        }
                        else {
                            return '';
                        }
                    }
                },
                {
                    data: "customerPermitMarketing",
                    render: function (data, type, row) {
                        if (data) {
                            return 'Evet';
                        } else if (!data) {
                            return 'Hayır';
                        }
                        else {
                            return '';
                        }
                    }
                },
                {
                    data: "customerSaleContractApproved",
                    render: function (data, type, row) {
                        if (data) {
                            return 'Evet';
                        } else if (!data) {
                            return 'Hayır';
                        }
                        else {
                            return '';
                        }
                    }
                }
            ]
        });
        $(".dt-buttons").attr("style", "display:inline");
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

    Clear: function () {
        $("#btnClear").click(function (e) {
            e.preventDefault();

            $("#tenants")
                .val("")
                .select2();

            $("#selectAllTenants").attr("checked", false);

            $('#dateRangeList').val(moment().subtract(29, 'days').format('DD/MM/YYYY') + ' - ' + moment().format('DD/MM/YYYY'));

            $("#btnList").trigger("click");
        });
    },

    DateRangePickerInitialize: function (element) {
        function cb(start, end) {
            $(element).val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        }

        cb(moment().subtract(29, 'days'), moment());

        $(element).daterangepicker({
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
                "cancelLabel": "Vazgeç",
                "fromLabel": "Dan",
                "toLabel": "a",
                "customRangeLabel": "Özel",
                "daysOfWeek": [
                    "Pt",
                    "Sl",
                    "Çr",
                    "Pr",
                    "Cm",
                    "Ct",
                    "Pz"
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
                "firstDay": 0
            }
        }, cb);
    }
};
