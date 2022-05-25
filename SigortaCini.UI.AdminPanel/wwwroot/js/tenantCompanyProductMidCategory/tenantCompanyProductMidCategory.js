
$(document).ready(function () {
    tenantCompanyProductMidCategory.init();

    $("#btnParameterAdd").click(function () {
        $("#AddParameterModal").modal("show");
        tenantCompanyProductMidCategory.getTenants($("#ddlTenants"), "");
        tenantCompanyProductMidCategory.getProducts($("#ddlProducts"), "");
        $('#ddlProducts').trigger('change');
        $("#isActive").attr("checked", false);
    });

    $("#ddlProducts").change(function (e) {
        e.preventDefault();
        if ($("#ddlProducts").val() === "" || $("#ddlProducts").val() === null) {
            $("#ddlCompanies").html('<option value="">Seçiniz</option>');
            $('#ddlCompanies').trigger('change');
            $("#ddlCompanies").prop("disabled", "disabled");
        }
        else {
            tenantCompanyProductMidCategory.getCompanies($("#ddlCompanies"), $("#ddlProducts").val(), "");
            $("#ddlCompanies").prop("disabled", false);
        }
    });

    $("#ddlProductsUpdate").change(function (e) {
        e.preventDefault();
        if ($("#ddlProductsUpdate").val() === "" || $("#ddlProductsUpdate").val() === null) {
            $("#ddlCompaniesUpdate").html('<option value="">Seçiniz</option>');
            $('#ddlCompaniesUpdate').trigger('change');
            $("#ddlCompaniesUpdate").prop("disabled", "disabled");
        }
        else {
            tenantCompanyProductMidCategory.getCompanies($("#ddlCompaniesUpdate"), $("#ddlProductsUpdate").val(), "");
            $("#ddlCompaniesUpdate").prop("disabled", false);
        }
    });
});

var tenantCompanyProductMidCategory = {
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

            if ($("#ddlCompanies").val() === "" && $("#ddlCompanies").attr("disabled") !== "disabled") {
                error("Şirket alanını boş geçmeyiniz.");
                return;
            }

            var isActive = false;
            if ($("#isActive").attr("checked") === "checked") {
                isActive = true;
            }

            showLoader();
            $.ajax({
                url: "/TenantCompanyProductMidCategory/Create",
                type: "POST",
                data: {
                    TenantId: $("#ddlTenants").val(),
                    ProductId: $("#ddlProducts").val(),
                    CompanyProductMidCatId: $("#ddlCompanies").val(),
                    TenantCompanyProductMidCatState: isActive
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
                        tenantCompanyProductMidCategory.getAll();
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

            if ($("#ddlCompaniesUpdate").val() === "" && $("#ddlCompaniesUpdate").attr("disabled") !== "disabled") {
                error("Şirket alanını boş geçmeyiniz.");
                return;
            }

            var isActiveUpdate = false;
            if ($("#isActiveUpdate").attr("checked") === "checked") {
                isActiveUpdate = true;
            }

            showLoader();

            $.ajax({
                url: "/TenantCompanyProductMidCategory/Update",
                type: "PUT",
                data: {
                    TenantCompanyProductMidCatId: $("#parameterId").val(),
                    TenantId: $("#ddlTenantsUpdate").val(),
                    ProductId: $("#ddlProductsUpdate").val(),
                    CompanyProductMidCatId: $("#ddlCompaniesUpdate").val(),
                    TenantCompanyProductMidCatState: isActiveUpdate
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
                        tenantCompanyProductMidCategory.getAll();
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
            url: "/TenantCompanyProductMidCategory/GetAll",
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
                    tenantCompanyProductMidCategory.fillDataTable(dataSet.data);
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
                { data: "tenantCompanyProductMidCatId" },
                { data: "tenantName" },
                { data: "productName" },
                { data: "companyName" },
                {
                    data: "tenantCompanyProductMidCatState",
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

        tenantCompanyProductMidCategory.datatableClick();
    },

    datatableClick: function () {
        $("#parameter_table tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            table = $("#parameter_table").DataTable();
            var data = table.row(this).data();
            tenantCompanyProductMidCategory.get(data.tenantCompanyProductMidCatId);
        });
    },

    get: function (id) {
        showLoader();

        $.ajax({
            url: "/TenantCompanyProductMidCategory/GetById",
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
                    $("#UpdateParameterModal").modal("show");

                    tenantCompanyProductMidCategory.getTenants($("#ddlTenantsUpdate"), dataSet.data.tenantId);
                    tenantCompanyProductMidCategory.getProducts($("#ddlProductsUpdate"), dataSet.data.productId);
                    tenantCompanyProductMidCategory.getCompanies($("#ddlCompaniesUpdate"), dataSet.data.productId, dataSet.data.companyProductMidCatId);
                    $("#ddlCompaniesUpdate").prop("disabled", false);
                    if (dataSet.data.tenantCompanyProductMidCatState) {
                        $("#isActiveUpdate").prop("checked", true);
                    } else {
                        $("#isActiveUpdate").prop("checked", false);
                    }
                    $("#parameterId").val(dataSet.data.tenantCompanyProductMidCatId);

                    hideLoader();

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
        showLoader();
        element.html('<option value="">Seçiniz</option>');
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
                        element.append(
                            new Option(item.tenantName, item.tenantId)
                        );
                    });
                }
                element.val(value).select2();
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    getProducts: function (element, value) {
        showLoader();
        element.html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/TenantCompanyProductMidCategory/GetCompanyProductMidCategoryProducts",
            type: "GET",
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
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    getCompanies: function (element, productId, value) {
        showLoader();
        element.html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/TenantCompanyProductMidCategory/GetCompanyProductMidCategoriesByProductId",
            type: "GET",
            dataType: "json",
            data: {
                productId: productId
            },
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (index, item) {
                        element.append(
                            new Option(item.company.companyName, item.companyProductMidCatId)
                        );
                    });
                }
                element.val(value).select2();
                hideLoader();
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    }
};
