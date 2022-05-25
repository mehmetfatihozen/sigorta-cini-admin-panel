
$(document).ready(function () {
    cpmCategory.init();
});

var cpmCategory = {
    init: function () {
        this.save();
        this.getAllCompany();
        this.getProductMidCategories();
    },

    save: function () {

        $("#btnCPMCategorySaveB2BIs3D").click(function () {
            var selectedCompany = $("#ddlCompanies").val();
            if (selectedCompany.length <= 0) {
                error("Önce şirket seçiniz");
                return;
            }

            showLoader();

            var categories = [];
            $(".checboxCategoryB2B").each(function (index) {
                if (this.checked) {
                    categories.push({
                        ProductId: parseInt(this.value),
                        VariantId: parseInt(this.attributes.variant.value)
                    });
                    hideLoader();
                }
            });
            if (categories.length === 0) {
                hideLoader();
                error("B2B kategorilerden en az birini seçiniz");
                return;
            }

            $.ajax({
                url: "/CPMCategory/SaveCompanyProductMidCategoriesByIsB2B3D",
                type: "POST",
                dataType: "json",
                data: {
                    CompanyId: selectedCompany,
                    CategoryIds: categories
                },
                success: function (dataSet) {
                    if (dataSet === null) {
                        hideLoader();
                        console.log(dataSet);
                        error("Sistemde bir hata oluştu");
                        return;
                    } else if (dataSet.hasError) {
                        hideLoader();
                        error(dataSet.message);
                        return;
                    } else {
                        hideLoader();
                        success("B2B kategori başarıyla kaydedildi.");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });

        $("#btnCPMCategorySaveB2CIs3D").click(function () {
            var selectedCompany = $("#ddlCompanies").val();
            if (selectedCompany.length <= 0) {
                error("Önce şirket seçiniz");
                return;
            }

            showLoader();

            var b2cCategories = [];
            $(".checboxCategoryB2C").each(function (index) {
                if (this.checked) {
                    b2cCategories.push({
                        ProductId: parseInt(this.value),
                        VariantId: parseInt(this.attributes.variant.value)
                    });
                    hideLoader();
                }
            });
            if (b2cCategories.length === 0) {
                hideLoader();
                error("B2C kategorilerden en az birini seçiniz");
                return;
            }

            $.ajax({
                url: "/CPMCategory/SaveCompanyProductMidCategoriesByIsB2C3D",
                type: "POST",
                dataType: "json",
                data: {
                    CompanyId: selectedCompany,
                    CategoryIds: b2cCategories
                },
                success: function (dataSet) {
                    if (dataSet === null) {
                        hideLoader();
                        console.log(dataSet);
                        error("Sistemde bir hata oluştu");
                        return;
                    } else if (dataSet.hasError) {
                        hideLoader();
                        error(dataSet.message);
                        return;
                    } else {
                        hideLoader();
                        success("B2C kategori başarıyla kaydedildi.");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });
    },

    getProductMidCategories: function () {
        $("#ddlCompanies").change(function () {
            showLoader();
            if ($("#ddlCompanies").val() === 0 || $("#ddlCompanies").val() === "") {
                $("#alt_content_b2b").addClass("hide");
                $("#alt_content_b2c").addClass("hide");
                hideLoader();
                return;
            }

            $.ajax({
                url: "/CPMCategory/GetAllProductMidCategoriesByIsB2b3D",
                type: "GET",
                dataType: "json",
                data: { companyId: $("#ddlCompanies").val() },
                success: function (dataSet) {
                    if (dataSet === null) {
                        hideLoader();
                        $("#alt_content_b2b").addClass("hide");
                        console.log(dataSet);
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                        return;
                    } else if (dataSet.hasError) {
                        hideLoader();
                        $("#alt_content_b2b").addClass("hide");
                        hideLoader();
                        error(dataSet.message);
                        return;
                    } else if (dataSet.data.length === 0) {
                        hideLoader();
                        $("#alt_content_b2b").addClass("hide");
                    } else {
                        $(".categoriesCheckBoxB2b").html("");
                        var htmlStr = "";
                        $.each(dataSet.data, function (taskAssignGroupId, item) {
                            var checked = "";
                            if (item.isIncludedByCompany) {
                                checked = "checked=checked";
                            }
                            htmlStr += '<div class="checkbox">';
                            htmlStr +=
                                '<label><input type="checkbox" ' +
                                checked +
                                ' class="checboxCategoryB2B " id="checboxCategoryB2B' +
                                item.productMidCatId +
                                '" value="' +
                                item.productMidCatId +
                                '" variant=' + item.variantId + ' >' +
                                item.productName +
                                "</label>";
                            htmlStr += "</div>";
                        });
                        $(".categoriesCheckBoxB2b").html(htmlStr);
                        $("#alt_content_b2b").removeClass("hide");
                        hideLoader();
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });

            $.ajax({
                url: "/CPMCategory/GetAllProductMidCategoriesByIsB2c3D",
                type: "GET",
                dataType: "json",
                data: { companyId: $("#ddlCompanies").val() },
                success: function (dataSet) {
                    if (dataSet === null) {
                        hideLoader();
                        $("#alt_content_b2c").addClass("hide");
                        console.log(dataSet);
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                        return;
                    } else if (dataSet.hasError) {
                        hideLoader();
                        $("#alt_content_b2c").addClass("hide");
                        hideLoader();
                        error(dataSet.message);
                        return;
                    } else if (dataSet.data.length === 0) {
                        hideLoader();
                        $("#alt_content_b2c").addClass("hide");
                    } else {
                        $(".categoriesCheckBoxB2c").html("");
                        var htmlStr = "";
                        $.each(dataSet.data, function (taskAssignGroupId, item) {
                            var checked = "";
                            if (item.isIncludedByCompany) {
                                checked = "checked=checked";
                            }
                            htmlStr += '<div class="checkbox">';
                            htmlStr +=
                                '<label><input type="checkbox" ' +
                                checked +
                                ' class="checboxCategoryB2C " id="checboxCategoryB2C' +
                                item.productMidCatId +
                                '" value="' +
                                item.productMidCatId +
                                '" variant=' + item.variantId + ' >' +
                                item.productName +
                                "</label>";
                            htmlStr += "</div>";
                        });
                        $(".categoriesCheckBoxB2c").html(htmlStr);
                        $("#alt_content_b2c").removeClass("hide");
                        hideLoader();
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });
    },

    getAllCompany: function () {
        $("#ddlCompanies").html('<option value="">Seçiniz</option>');
        showLoader();
        $.ajax({
            url: "/CPMCategory/GetAllCompanies",
            type: "GET",
            dataType: "json",
            success: function (dataSet) {
                if (dataSet === null) {
                    hideLoader();
                    console.log(dataSet);
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    hideLoader();
                    error(dataSet.message);
                } else {
                    $.each(dataSet.data, function (companyId, company) {
                        $("#ddlCompanies").append(
                            new Option(company.companyName, company.companyId)
                        );
                    });
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
