
$(document).ready(function () {
    lead.init();

    $("#btnList").trigger("click");
});

var lead = {
    init: function () {
        this.GetLeads();
        this.DateRangePickerInitialize("#dateRange");
        this.Clear();
    },

    GetLeads: function () {
        $("#btnList").click(function () {
            showLoader();

            var data = {}

            if ($('#dateRange').val() !== '' && $('#dateRange').val() !== null) {
                data.FromDate = $('#dateRange').val().split("-")[0].trim() + " 12:00:00";
                data.ToDate = $('#dateRange').val().split("-")[1].trim() + " 12:00:00";
            }

            $.ajax({
                url: "/Lead/GetAllForExcel",
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
                        lead.FillDataTable(response.data);
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

        $("#leadTable").DataTable({
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
            columnDefs: [
                { type: 'turkish', targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            ],
            columns: [
                { data: "id" },
                { data: "name" },
                { data: "surname" },
                { data: "productName" },
                { data: "phoneNumber" },
                { data: "email" },
                { data: "citizenshipNumber" },
                { data: "plateNumber" },
                { data: "registryNumber" },
                { data: "city" },
                { data: "district" },
                {
                    data: "createdDate",
                    render: function (data, type, row) {
                        if (data === '0001-01-01T00:00:00Z') {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY HH:mm:ss');
                        }
                    }
                }
            ]
        });
        $(".dt-buttons").attr("style", "display:inline");
    },

    Clear: function () {
        $('#dateRange').val("");

        $("#btnClear").click(function () {
            $('#dateRange').val("");

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