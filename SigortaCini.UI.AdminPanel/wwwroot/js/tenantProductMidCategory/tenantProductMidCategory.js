
$(document).ready(function () {
    tenantProductMidCategory.init();

    $("#btnParameterAdd").click(function () {
        $("#AddParameterModal").modal("show");
        tenantProductMidCategory.getTenants($("#ddlTenants"), "");
        tenantProductMidCategory.getProducts($("#ddlProducts"), "");
        $("#isActive").attr("checked", false);
    });
});

var tenantProductMidCategory = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    create: function () {
        $("#parameterAdd").click(function () {
            if ($("#ddlTenants").val() === "") {
                error("Tenant alanını boş geçmeyiniz.");
                return;
            }

            if ($("#ddlProducts").val() === "") {
                error("Ürün alanını boş geçmeyiniz.");
                return;
            }

            var isActive = false;
            if ($("#isActive").attr("checked") === "checked") {
                isActive = true;
            }

            showLoader();
            $.ajax({
                url: "/TenantProductMidCategory/Create",
                type: "POST",
                data: {
                    TenantId: $("#ddlTenants").val(),
                    ProductId: $("#ddlProducts").val(),
                    Status: isActive
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
                        tenantProductMidCategory.getAll();
                        $("#AddParameterModal").modal("hide");
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
        $("#parameterUpdate").click(function () {
            if ($("#ddlTenantsUpdate").val() === "") {
                error("Tenant alanını boş geçmeyiniz.");
                return;
            }

            if ($("#ddlProductsUpdate").val() === "") {
                error("Ürün alanını boş geçmeyiniz.");
                return;
            }

            var isActiveUpdate = false;
            if ($("#isActiveUpdate").attr("checked") === "checked") {
                isActiveUpdate = true;
            }

            showLoader();

            $.ajax({
                url: "/TenantProductMidCategory/Update",
                type: "PUT",
                data: {
                    TenantProductMidCatId: $("#parameterId").val(),
                    TenantId: $("#ddlTenantsUpdate").val(),
                    ProductId: $("#ddlProductsUpdate").val(),
                    Status: isActiveUpdate
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
                        tenantProductMidCategory.getAll();
                        $("#UpdateParameterModal").modal("hide");
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
            url: "/TenantProductMidCategory/GetAll",
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
                    tenantProductMidCategory.fillDataTable(dataSet.data);
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
        $("#parameter_table").DataTable({
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
                { data: "tenantName" },
                { data: "productName" },
                {
                    data: "status",
                    render: function (data, type, row) {
                        if (data === false) {
                            return "Aktif Değil";
                        } else {
                            return "Aktif";
                        }
                    }
                }
            ]
        });

        tenantProductMidCategory.datatableClick();
    },

    datatableClick: function () {
        $("#parameter_table tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#parameter_table").DataTable();
            var data = table.row(this).data();
            tenantProductMidCategory.get(data.tenantProductMidCatId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/TenantProductMidCategory/GetById",
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
                    tenantProductMidCategory.getTenants($("#ddlTenantsUpdate"), dataSet.data.tenantId);
                    tenantProductMidCategory.getProducts($("#ddlProductsUpdate"), dataSet.data.productId);
                    if (dataSet.data.status) {
                        $("#isActiveUpdate").prop("checked", true);
                    } else {
                        $("#isActiveUpdate").prop("checked", false);
                    }
                    $("#parameterId").val(dataSet.data.tenantProductMidCatId);

                    hideLoader();

                    $("#UpdateParameterModal").modal("show");

                    return dataSet.data;
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    },

    getTenants: function (element, value) {
        element.html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/Tenant/GetAll",
            type: "GET",
            async: false,
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        element.append(
                            new Option(item.tenantName, item.tenantId)
                        );
                    });
                }
                element.val(value).select2();
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    },

    getProducts: function (element, value) {
        element.html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/ProductMidCategory/GetAll",
            type: "GET",
            async: false,
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        element.append(
                            new Option(item.productMidCatDesc, item.productMidCatId)
                        );
                    });
                }
                element.val(value).select2();
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    },
};
