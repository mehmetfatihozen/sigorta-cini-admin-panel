
var table;

$(document).ready(function () {
    sigortaCiniCustomerProfession.init();
    $("#btnOpenModal").click(function () {
        $("#myModal").modal("show");
        $("#professionName").val("");
        $("#addModalProducts").val("").select2();
        $(".professionIsActiveDiv")
            .find("span")
            .addClass("checked");
        $("#professionIsActive").attr("checked", "checked");
    });

    $("#filterProduct").html('<option value="">Seçiniz</option>');
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
                    $("#filterProduct").append(
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
    $("#filterProduct").val("").select2();

    $("#btnList").trigger("click");
});

var sigortaCiniCustomerProfession = {
    init: function () {
        this.create();
        this.List();
        this.update();
        this.Clear();
        this.GetProducts();
    },

    create: function () {
        $("#btnProfessionAdd").click(function () {
            if ($("#professionName").val() == "") {
                error("Meslek adını boş geçmeyiniz.");
                return;
            }
            showLoader();

            var professionIdVal = 0;
            var isActive = false;
            if ($("#professionIsActive").attr("checked") == "checked") {
                isActive = true;
            }
            $.ajax({
                url: "/Profession/Create",
                type: "POST",
                data: {
                    CustomerProfessionId: professionIdVal,
                    CustomerProfessionName: $("#professionName").val(),
                    ProductId: $("#addModalProducts").val(),
                    State: isActive
                },
                dataType: "json",
                success: function (data) {
                    if (data == null) {
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                    } else if (data.hasError) {
                        hideLoader();
                        error(data.message);
                    } else {
                        $("#myModal").modal("hide");
                        $("#btnClear").trigger("click");
                        success("Başarıyla kaydedildi");
                        hideLoader();
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
        $("#btnProfessionUpdate").click(function () {
            if ($("#professionNameUpdate").val() == "") {
                error("Meslek adını boş geçmeyiniz.");
                return;
            }
            showLoader();

            var professionIdVal = $("#professionIdUpdate").val();

            var isActive = false;
            if ($("#professionIsActiveUpdate").attr("checked") == "checked") {
                isActive = true;
            }
            $.ajax({
                url: "/Profession/Update",
                type: "POST",
                data: {
                    CustomerProfessionId: professionIdVal,
                    CustomerProfessionName: $("#professionNameUpdate").val(),
                    ProductId: $("#updateModalProducts").val(),
                    State: isActive
                },
                dataType: "json",
                success: function (data) {
                    if (data == null) {
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                    } else if (data.hasError) {
                        hideLoader();
                        error(data.message);
                    } else {
                        $("#updateModal").modal("hide");
                        $("#btnClear").trigger("click");
                        success("Başarıyla kaydedildi");
                        hideLoader();
                    }
                },
                error: function (errorThrown) {
                    hideLoader();
                    console.log(errorThrown);
                }
            });
        });
    },

    List: function () {
        $("#btnList").click(function (e) {
            e.preventDefault();

            showLoader();

            $.ajax({
                url: "/Profession/GetAll",
                type: "GET",
                dataType: "json",
                data: {
                    productId: $("#filterProduct").val()
                },
                success: function (response) {
                    if (response === null) {
                        error("Sistemde bir hata oluştu");
                    } else if (response.hasError) {
                        error(response.message);
                    } else {
                        console.log(response.data);
                        sigortaCiniCustomerProfession.FillDataTable(response.data);
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
        $("#sample_2").DataTable({
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
                { data: "customerProfessionName" },
                { data: "productName" },
                { data: "state" }
            ]
        });

        sigortaCiniCustomerProfession.datatableDoubleClick();
    },

    datatableDoubleClick: function () {
        $("#sample_2 tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var table = $("#sample_2").DataTable();
            var data = table.row(this).data();
            sigortaCiniCustomerProfession.get(data.customerProfessionId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/Profession/get",
            type: "GET",
            dataType: "json",
            data: {
                id: id
            },
            success: function (dataSet) {
                if (dataSet == null) {
                    hideLoader();
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                } else {
                    $("#professionNameUpdate").val(dataSet.data.customerProfessionName);
                    $("#professionIdUpdate").val(dataSet.data.customerProfessionId);
                    if (dataSet.data.productId === 0) {
                        $("#updateModalProducts").val("").select2();
                    } else {
                        $("#updateModalProducts").val(dataSet.data.productId).select2();
                    }
                    if (dataSet.data.state) {
                        $(".professionIsActiveDivUpdate")
                            .find("span")
                            .addClass("checked");
                        $("#professionIsActiveUpdate").attr("checked", "checked");
                    } else {
                        $(".professionIsActiveDivUpdate")
                            .find("span")
                            .removeClass("checked");
                        $("#professionIsActiveUpdate").removeAttr("checked");
                    }
                    $("#updateModal").modal("show");
                    hideLoader();
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    },

    GetProducts: function () {
        showLoader();
        $("#addModalProducts, #updateModalProducts").html('<option value="">Seçiniz</option>');
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
                        $("#addModalProducts, #updateModalProducts").append(
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
        $("#btnClear").click(function (e) {
            e.preventDefault();

            $("#filterProduct")
                .val("")
                .select2();

            $("#btnList").trigger("click");
        });
    },
};
