
$(document).ready(function () {
    userPerformanceReport.init();

    $("#btnList").trigger("click");
});

var userPerformanceReport = {
    init: function () {
        this.GetUserPerformanceReport();
        this.DateRangePickerInitialize("#dateRangeList");
        this.Clear();
    },

    GetUserPerformanceReport: function () {
        $("#btnList").click(function (e) {
            e.preventDefault();

            showLoader();

            var data = {};

            if ($('#dateRangeList').val() !== '' && $('#dateRangeList').val() !== null) {
                data.fromDate = $('#dateRangeList').val().split("-")[0].trim() + " 12:00:00";
                data.toDate = $('#dateRangeList').val().split("-")[1].trim() + " 12:00:00";
            };

            $.ajax({
                url: "/UserPerformanceReport/GetUserPerformanceReport",
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
                        userPerformanceReport.FillDataTable(response.data);
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

        $("#userPerformanceReportTable").DataTable({
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
                    className: "export-excell-button",
                    footer: true
                }
            ],
            data: dataInput,
            lengthMenu: [[10, 25, 50, -1], ['10 kayıt', '25 kayıt', '50 kayıt', 'Hepsi']],
            pageLength: 10,
            columns: [
                { data: "nameSurname" },
                { data: "source" },
                { data: "totalLead" },
                { data: "totalSale" },
                { data: "totalAppointment" },
                {
                    data: "leadSalePercentage",
                    render: function (data, type, row) {
                        debugger;
                        var percent = (100 * row.totalLead) / row.totalSale;
                        if (percent == 0 || isNaN(percent) || isNaN === null || Number.isFinite(percent) === false) {
                            return 0;
                        } else {
                            return '%' + Math.round(percent * 100) / 100;
                        }

                    }
                },

            ]
        });
        $(".dt-buttons").attr("style", "display:inline");
    },

    Clear: function () {
        $("#btnClear").click(function (e) {
            e.preventDefault();

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
