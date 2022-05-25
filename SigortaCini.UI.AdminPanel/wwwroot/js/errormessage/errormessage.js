
$(document).ready(function () {
    errorMessage.init();
    $("#btnErrorMessageAdd").click(function () {
        errorMessage.clear();
        errorMessage.getErrorMessageSourceEnums($("#errorMessageSourceAdd"), "");
        $("#errorMessageModalAdd").modal("show");
    });
});

var errorMessage = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    clear: function () {
        $("#errorMessageCodeAdd").val("");
        $("#errorMessageNameAdd").val("");
        $("#errorMessageDescAdd").val("");
        $("#errorMessageSourceAdd").val("").select2();
    },

    create: function () {
        $("#btnErrorMessageCreate").click(function () {
            if ($("#errorMessageCodeAdd").val() === "") {
                error("Hata kodu alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageNameAdd").val() === "") {
                error("Hata mesajı alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageDescAdd").val() === "") {
                error("Açıklama alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageSourceAdd").val() === "") {
                error("Kaynak alanını boş geçmeyiniz.");
                return;
            }

            showLoader();

            $.ajax({
                url: "/ErrorMessage/Create",
                type: "POST",
                data: {
                    Code: $("#errorMessageCodeAdd").val(),
                    Name: $("#errorMessageNameAdd").val(),
                    Desc: $("#errorMessageDescAdd").val(),
                    Source: $("#errorMessageSourceAdd").val()
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
                        errorMessage.getAll();
                        $("#errorMessageModalAdd").modal("hide");
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
        $("#btnErrorMessageUpdate").click(function () {
            if ($("#errorMessageCodeUpdate").val() === "") {
                error("Hata kodu alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageNameUpdate").val() === "") {
                error("Hata mesajı alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageDescUpdate").val() === "") {
                error("Açıklama alanını boş geçmeyiniz.");
                return;
            }
            if ($("#errorMessageSourceUpdate").val() === "") {
                error("Kaynak alanını boş geçmeyiniz.");
                return;
            }

            showLoader();

            $.ajax({
                url: "/ErrorMessage/Update",
                type: "PUT",
                data: {
                    ErrorMessageId: $("#errorMessageIdUpdate").val(),
                    Code: $("#errorMessageCodeUpdate").val(),
                    Name: $("#errorMessageNameUpdate").val(),
                    Desc: $("#errorMessageDescUpdate").val(),
                    Source: $("#errorMessageSourceUpdate").val()
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
                        errorMessage.getAll();
                        $("#errorMessageModalUpdate").modal("hide");
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
            url: "/ErrorMessage/GetAll",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    hideLoader();
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                } else {
                    errorMessage.fillDataTable(dataSet);
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
        $("#errorMessageTable").DataTable({
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
                { data: "code" },
                { data: "name" },
                { data: "desc" },
                { data: "source" }
            ]
        });

        errorMessage.dataTableClick();
    },

    dataTableClick: function () {
        $("#errorMessageTable tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#errorMessageTable").DataTable();
            var data = table.row(this).data();
            errorMessage.get(data.errorMessageId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/ErrorMessage/GetById",
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
                    $("#errorMessageModalUpdate").modal("show");
                    errorMessage.getErrorMessageSourceEnums($("#errorMessageSourceUpdate"), dataSet.data.source);

                    $("#errorMessageCodeUpdate").val(dataSet.data.code);
                    $("#errorMessageNameUpdate").val(dataSet.data.name);
                    $("#errorMessageDescUpdate").val(dataSet.data.desc);

                    $("#errorMessageIdUpdate").val(dataSet.data.errorMessageId);

                    hideLoader();
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    },

    getErrorMessageSourceEnums: function (element, value) {
        showLoader();
        element.html('<option  value="">Seçiniz</option>');
        $.ajax({
            url: "/ErrorMessage/GetErrorMessageSourceEnums",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    hideLoader();
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                } else {
                    $.each(dataSet, function (value, name) {
                        element.append(
                            new Option(name, value)
                        );
                    });
                    if (value !== "") {
                        element.val(value).select2();
                    }
                    hideLoader();
                }
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    }
};
