
$(document).ready(function () {
    sigortaCiniCpmCategory.init();
});

var sigortaCiniCpmCategory = {
    init: function () {
        this.save();
        this.getallCompany();
        this.getProductMidCategories();
    },

    getProductMidCategories: function () {
        $("#ddlCompanies").change(function () {
            showLoader();
            if ($("#ddlCompanies").val() === 0 || $("#ddlCompanies").val() === "") {
                $("#alt_content").addClass("hide");
                $("#alt_content_b2c").addClass("hide");
                $("#btnCPMCategorySaveB2BIsPolicy").addClass("hide");
                $("#btnCPMCategorySaveB2CIsPolicy").addClass("hide");
                hideLoader();
                return;
            }

            $.ajax({
                url: "/CPMCategory/GetAllProductMidCategoriesByIsB2bPolicy",
                type: "GET",
                dataType: "json",
                data: { companyId: $("#ddlCompanies").val() },
                success: function (dataSet) {
                    if (dataSet === null) {
                        hideLoader();
                        $("#alt_content").addClass("hide");
                        console.log(dataSet);
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                        return;
                    } else if (dataSet.hasError) {
                        hideLoader();
                        $("#alt_content").addClass("hide");
                        hideLoader();
                        error(dataSet.message);
                        return;
                    } else if (dataSet.data.length === 0) {
                        hideLoader();
                        $("#alt_content").addClass("hide");
                    } else {
                        $(".categoriesCheckBox").html("");
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
                                ' class="checboxCategory " id="checboxCategory' +
                                item.productMidCatId +
                                '" value="' +
                                item.productMidCatId +
                                '">' +
                                item.productMidCatDesc +
                                "</label>";
                            htmlStr += "</div>";
                        });
                        $(".categoriesCheckBox").html(htmlStr);
                        $("#alt_content").removeClass("hide");
                        hideLoader();
                        $("#btnCPMCategorySaveB2BIsPolicy").removeClass("hide");
                        $("#btnCPMCategorySaveB2CIsPolicy").removeClass("hide");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });

            $.ajax({
                url: "/CPMCategory/GetAllProductMidCategoriesByIsB2cPolicy",
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
                                '">' +
                                item.productMidCatDesc +
                                "</label>";
                            htmlStr += "</div>";
                        });
                        $(".categoriesCheckBoxB2c").html(htmlStr);
                        $("#alt_content_b2c").removeClass("hide");
                        hideLoader();
                        $("#btnCPMCategorySaveB2BIsPolicy").removeClass("hide");
                        $("#btnCPMCategorySaveB2CIsPolicy").removeClass("hide");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    hideLoader();
                }
            });
        });
    },

    save: function () {
        $("#btnCPMCategorySaveB2BIsPolicy").click(function () {
            var selectedCompany = $("#ddlCompanies").val();
            if (selectedCompany.length <= 0) {
                error("Önce havuz seçiniz");
                return;
            }

            showLoader();

            var categories = [];
            $(".checboxCategory").each(function (index) {
                if (this.checked) {
                    categories.push(parseInt(this.value));
                    hideLoader();
                }
            });
            if (categories.length === 0) {
                hideLoader();
                error("B2B kategorilerden en az birini seçiniz");
                return;
            }

            $.ajax({
                url: "/CPMCategory/SaveCompanyProductMidCategoriesByIsB2BPolicy",
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

        $("#btnCPMCategorySaveB2CIsPolicy").click(function () {
            var selectedCompany = $("#ddlCompanies").val();
            if (selectedCompany.length <= 0) {
                error("Önce havuz seçiniz");
                return;
            }

            showLoader();

            var b2cCategories = [];
            $(".checboxCategoryB2C").each(function (index) {
                if (this.checked) {
                    b2cCategories.push(parseInt(this.value));
                    hideLoader();
                }
            });
            if (b2cCategories.length === 0) {
                hideLoader();
                error("B2C kategorilerden en az birini seçiniz");
                return;
            }

            $.ajax({
                url: "/CPMCategory/SaveCompanyProductMidCategoriesByIsB2CPolicy",
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

    getallCompany: function () {
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
