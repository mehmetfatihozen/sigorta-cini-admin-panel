
$(document).ready(function () {
    bannedEMailAddresses.init();
    $("#showAddModal").click(function () {
        $("#eMailAddressAdd").val("");
        $("#addModal").modal("show");
    });
});

var bannedEMailAddresses = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    create: function () {
        $("#btnAdd").click(function () {
            if ($("#eMailAddressAdd").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            showLoader();
            $.ajax({
                url: "/BannedEMailAddress/Create",
                type: "POST",
                data: {
                    EMailAddress: $("#eMailAddressAdd").val(),
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
                        bannedEMailAddresses.getAll();
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
            if ($("#eMailAddressUpdate").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            var stateUpdate = false;
            if ($("#stateUpdate").attr("checked") === "checked") {
                stateUpdate = true;
            }

            showLoader();

            $.ajax({
                url: "/BannedEMailAddress/Update",
                type: "PUT",
                data: {
                    BannedEMailAddressId: $("#bannedEMailAddressId").val(),
                    EMailAddress: $("#eMailAddressUpdate").val(),
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
                        bannedEMailAddresses.getAll();
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
            url: "/BannedEMailAddress/GetAll",
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
                    bannedEMailAddresses.fillDataTable(dataSet.data);
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
                { data: "bannedEMailAddressId" },
                { data: "eMailAddress" },
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

        bannedEMailAddresses.datatableClick();
    },

    datatableClick: function () {
        $("#table tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#table").DataTable();
            var data = table.row(this).data();
            bannedEMailAddresses.get(data.bannedEMailAddressId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/BannedEMailAddress/GetById",
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

                    $("#eMailAddressUpdate").val(dataSet.data.eMailAddress);
                    if (dataSet.data.state) {
                        $("#stateUpdate").prop("checked", true);
                    } else {
                        $("#stateUpdate").prop("checked", false);
                    }
                    $("#bannedEMailAddressId").val(dataSet.data.bannedEMailAddressId);

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
