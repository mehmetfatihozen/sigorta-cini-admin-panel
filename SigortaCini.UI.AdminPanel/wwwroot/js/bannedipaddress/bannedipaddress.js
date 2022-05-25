
$(document).ready(function () {
    bannedIpAddresses.init();
    $("#showAddModal").click(function () {
        $("#ipAddressAdd").val("");
        $("#addModal").modal("show");
    });
});

var bannedIpAddresses = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    create: function () {
        $("#btnAdd").click(function () {
            if ($("#ipAddressAdd").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            showLoader();
            $.ajax({
                url: "/BannedIpAddress/Create",
                type: "POST",
                data: {
                    IpAddress: $("#ipAddressAdd").val(),
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
                        bannedIpAddresses.getAll();
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
            if ($("#ipAddressUpdate").val() === "") {
                error("Telefon Numarası alanını boş geçmeyiniz.");
                return;
            }

            var stateUpdate = false;
            if ($("#stateUpdate").attr("checked") === "checked") {
                stateUpdate = true;
            }

            showLoader();

            $.ajax({
                url: "/BannedIpAddress/Update",
                type: "PUT",
                data: {
                    BannedIpAddressId: $("#bannedIpAddressId").val(),
                    IpAddress: $("#ipAddressUpdate").val(),
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
                        bannedIpAddresses.getAll();
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
            url: "/BannedIpAddress/GetAll",
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
                    bannedIpAddresses.fillDataTable(dataSet.data);
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
                { data: "bannedIpAddressId" },
                { data: "ipAddress" },
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

        bannedIpAddresses.datatableClick();
    },

    datatableClick: function () {
        $("#table tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#table").DataTable();
            var data = table.row(this).data();
            bannedIpAddresses.get(data.bannedIpAddressId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/BannedIpAddress/GetById",
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

                    $("#ipAddressUpdate").val(dataSet.data.ipAddress);
                    if (dataSet.data.state) {
                        $("#stateUpdate").prop("checked", true);
                    } else {
                        $("#stateUpdate").prop("checked", false);
                    }
                    $("#bannedIpAddressId").val(dataSet.data.bannedIpAddressId);

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
