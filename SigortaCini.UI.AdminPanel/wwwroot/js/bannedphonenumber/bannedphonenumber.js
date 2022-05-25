
$(document).ready(function () {
    bannedPhoneNumbers.init();
    $("#showAddModal").click(function () {
        $("#phoneNumberAdd").val("");
        $("#addModal").modal("show");
    });
});

var bannedPhoneNumbers = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    create: function () {
        $("#btnAdd").click(function () {
            if ($("#phoneNumberAdd").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            showLoader();
            $.ajax({
                url: "/BannedPhoneNumber/Create",
                type: "POST",
                data: {
                    PhoneNumber: $("#phoneNumberAdd").val(),
                    State: true,
                },
                dataType: "json",
                success: function (data) {
                    if (data === null) {
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                    } else if (data.hasError) {
                        hideLoader();
                        error(data.message);
                    } else {
                        bannedPhoneNumbers.getAll();
                        $("#addModal").modal("hide");
                        hideLoader();
                        success("Başarıyla kaydedildi");
                    }
                },
                error: function (errorThrown) {
                    hideLoader();
                    console.log(errorThrown);
                }
            });
        });
    },

    update: function () {
        $("#btnUpdate").click(function () {
            if ($("#phoneNumberUpdate").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            var stateUpdate = false;
            if ($("#stateUpdate").attr("checked") === "checked") {
                stateUpdate = true;
            }

            showLoader();

            $.ajax({
                url: "/BannedPhoneNumber/Update",
                type: "PUT",
                data: {
                    BannedPhoneNumberId: $("#bannedPhoneNumberId").val(),
                    PhoneNumber: $("#phoneNumberUpdate").val(),
                    State: stateUpdate,
                },
                dataType: "json",
                success: function (data) {
                    if (data === null) {
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                    } else if (data.hasError) {
                        hideLoader();
                        error(data.message);
                    } else {
                        bannedPhoneNumbers.getAll();
                        $("#updateModal").modal("hide");
                        hideLoader();
                        success("Başarıyla kaydedildi");
                    }
                },
                error: function (errorThrown) {
                    hideLoader();
                    console.log(errorThrown);
                }
            });
        });
    },

    getAll: function () {
        showLoader();
        $.ajax({
            url: "/BannedPhoneNumber/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    hideLoader();
                    error("Sistemde bir hata oluştu");
                    return;
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                    return;
                } else {
                    bannedPhoneNumbers.fillDataTable(dataSet.data);
                    hideLoader();
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    },

    fillDataTable: function (dataInput) {
        $.fn.dataTable.moment('DD/MM/YYYY hh:mm:ss');

        $("#table").DataTable({
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
                { data: "bannedPhoneNumberId" },
                { data: "phoneNumber" },
                {
                    data: "state",
                    render: function (data, type, row) {
                        if (data === false) {
                            return "Engelli Değil";
                        } else {
                            return "Engelli";
                        }
                    }
                },
                {
                    data: "createDate",
                    render: function (data, type, row) {
                        if (data === null) {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY HH:mm:ss');
                        }
                    }
                },
                {
                    data: "updateDate",
                    render: function (data, type, row) {
                        if (data === null) {
                            return "";
                        }
                        else {
                            return moment.utc(data).format('DD/MM/YYYY HH:mm:ss');
                        }
                    }
                }
            ]
        });

        bannedPhoneNumbers.datatableClick();
    },

    datatableClick: function () {
        $("#table tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#table").DataTable();
            var data = table.row(this).data();
            bannedPhoneNumbers.get(data.bannedPhoneNumberId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/BannedPhoneNumber/GetById",
            type: "GET",
            dataType: "json",
            data: {
                id: id
            },
            success: function (dataSet) {
                if (dataSet === null) {
                    hideLoader();
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                } else {
                    $("#updateModal").modal("show");

                    $("#phoneNumberUpdate").val(dataSet.data.phoneNumber);
                    if (dataSet.data.state) {
                        $("#stateUpdate").prop("checked", true);
                    } else {
                        $("#stateUpdate").prop("checked", false);
                    }
                    $("#bannedPhoneNumberId").val(dataSet.data.bannedPhoneNumberId);

                    hideLoader();
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    }
};
