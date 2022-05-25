
$(document).ready(function () {
    leadAssignGroup.init();

    $("#isParentLeadAssignGroup").change(function (e) {
        e.preventDefault();
        if ($("#isParentLeadAssignGroup").attr("checked") === "checked") {
            $("#leadAssignGroupParentId").prop("disabled", "disabled");
            $("#leadAssignGroupParentId")
                .val("")
                .select2();
        } else {
            $("#leadAssignGroupParentId").prop("disabled", false);
        }
    });

    $("#isParentLeadAssignGroupUpdate").change(function (e) {
        e.preventDefault();
        if ($("#isParentLeadAssignGroupUpdate").attr("checked") === "checked") {
            $("#leadAssignGroupParentIdUpdate").prop("disabled", "disabled");
            $("#leadAssignGroupParentIdUpdate")
                .val("")
                .select2();
        } else {
            $("#leadAssignGroupParentIdUpdate").prop("disabled", false);
            showLoader();
            $.ajax({
                url: "/LeadAssignGroup/GetAll",
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
                        $.each(dataSet.data, function (id, item) {
                            $("#leadAssignGroupParentIdUpdate").append(
                                new Option(item.leadAssignGroupName, item.leadAssignGroupId)
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
    });

    $("#btnLeadAssignGroupAdd").click(function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        leadAssignGroup.getLeadAssignGroups();
        leadAssignGroup.clearForAdd();
        $("#leadAssignGroupAddModal").modal("show");
    });
});

var leadAssignGroup = {
    init: function () {
        this.create();
        this.update();
        this.getAll();
    },

    create: function () {
        $("#leadAssignGroupForm").on("submit", function (e) {
            e.preventDefault();

            if ($("#leadAssignGroupParentId").val() === "" && $("#isParentLeadAssignGroup").attr("checked") !== "checked") {
                error("Ana Lead Assign Group seçiniz.");
                return;
            }

            if ($("#leadAssignGroupName").val() === "") {
                error("Lead Assign Group Adı alanını boş geçmeyiniz.");
                return;
            }

            if ($("#leadAssignGroupDesc").val() === "") {
                error("Lead Assign Group Açıklaması alanını boş geçmeyiniz.");
                return;
            }

            showLoader();

            var leadAssignGroupParentId = $("#leadAssignGroupParentId").val();

            if ($("#isParentLeadAssignGroup").attr("checked") === "checked") {
                leadAssignGroupParentId = "null";
            }

            var $form = $("#leadAssignGroupForm");
            var ajaxData = new FormData($form[0]);
            ajaxData.append("LeadAssignGroupId", 0);
            ajaxData.append("LeadAssignGroupParentId", leadAssignGroupParentId);
            ajaxData.append("LeadAssignGroupName", $("#leadAssignGroupName").val());
            ajaxData.append("LeadAssignGroupDesc", $("#leadAssignGroupDesc").val());

            $.ajax({
                url: "/LeadAssignGroup/Create",
                type: "POST",
                data: ajaxData,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data === null) {
                        hideLoader();
                        error("Sistemde bir hata oluştu");
                        return false;
                    } else if (data.hasError) {
                        hideLoader();
                        error(data.message);
                        return false;
                    } else {
                        $("#leadAssignGroupAddModal").modal("hide");
                        leadAssignGroup.getAll();
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
        $("#leadAssignGroupFormUpdate").on("submit", function (e) {
            e.preventDefault();

            if ($("#leadAssignGroupParentIdUpdate").val() === "" && $("#isParentLeadAssignGroupUpdate").attr("checked") !== "checked") {
                error("Ana Lead Assign Group seçiniz.");
                return;
            }

            if ($("#leadAssignGroupNameUpdate").val() === "") {
                error("Lead Assign Group Adı alanını boş geçmeyiniz.");
                return;
            }

            if ($("#leadAssignGroupDescUpdate").val() === "") {
                error("Lead Assign Group Açıklaması alanını boş geçmeyiniz.");
                return;
            }

            showLoader();

            var leadAssignGroupParentIdUpdate = $("#leadAssignGroupParentIdUpdate").val();

            if ($("#isParentLeadAssignGroupUpdate").attr("checked") === "checked") {
                leadAssignGroupParentIdUpdate = "null";
            }

            var $form = $("#leadAssignGroupFormUpdate");
            var ajaxData = new FormData($form[0]);
            ajaxData.append("LeadAssignGroupId", $("#leadAssignGroupId").val());
            ajaxData.append("LeadAssignGroupParentId", leadAssignGroupParentIdUpdate);
            ajaxData.append("LeadAssignGroupName", $("#leadAssignGroupNameUpdate").val());
            ajaxData.append("LeadAssignGroupDesc", $("#leadAssignGroupDescUpdate").val());

            $.ajax({
                url: "/LeadAssignGroup/Update",
                type: "PUT",
                data: ajaxData,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data === null) {
                        error("Sistemde bir hata oluştu");
                        hideLoader();
                        return false;
                    } else if (data.hasError) {
                        error(data.message);
                        hideLoader();
                        return false;
                    } else {
                        $("#leadAssignGroupUpdateModal").modal("hide");
                        leadAssignGroup.getAll();
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

    getAll: function () {
        showLoader();
        $.ajax({
            url: "/LeadAssignGroup/GetAll",
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
                    leadAssignGroup.fillDataTable(dataSet.data);
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    },

    clearForAdd: function () {
        $("#leadAssignGroupParentId").prop("disabled", false);
        $("#leadAssignGroupParentId")
            .val("")
            .select2();
        $("#leadAssignGroupName").val("");
        $("#leadAssignGroupDesc").val("");
        $("#isParentLeadAssignGroup").attr("checked", false);
        $(".isParentLeadAssignGroupDiv")
            .find("span")
            .removeClass("checked");
    },

    getLeadAssignGroups: function () {
        showLoader();
        $("#leadAssignGroupParentId").html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/LeadAssignGroup/GetAll",
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
                    $.each(dataSet.data, function (id, item) {
                        $("#leadAssignGroupParentId").append(
                            new Option(item.leadAssignGroupName, item.leadAssignGroupId)
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
    },

    fillLeadAssignGroupForUpdate: function (parentId) {
        showLoader();
        $("#leadAssignGroupParentIdUpdate").html('<option value="">Seçiniz</option>');
        $.ajax({
            url: "/LeadAssignGroup/GetAll",
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
                    $.each(dataSet.data, function (index, item) {
                        $("#leadAssignGroupParentIdUpdate").append(
                            new Option(item.leadAssignGroupName, item.leadAssignGroupId)
                        );
                    });
                    $("#leadAssignGroupParentIdUpdate")
                        .val(parentId)
                        .select2();

                    hideLoader();
                }
            },
            error: function (errorThrown) {
                hideLoader();
                console.log(errorThrown);
            }
        });
    },

    fillDataTable: function (dataInput) {
        $("#leadAssignGroupTable").DataTable({
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
                { data: "leadAssignGroupName" }
            ]
        });
        hideLoader();
        leadAssignGroup.datatableClick();
    },

    datatableClick: function () {
        $("#leadAssignGroupTable tbody").on("click", "tr", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var table = $("#leadAssignGroupTable").DataTable();
            var data = table.row(this).data();
            leadAssignGroup.get(data.leadAssignGroupId);
        });
    },

    get: function (id) {
        showLoader();
        $.ajax({
            url: "/LeadAssignGroup/GetById",
            type: "GET",
            dataType: "json",
            data: {
                id: id
            },
            success: function (dataSet) {
                if (dataSet === null) {
                    error("Sistemde bir hata oluştu");
                } else if (dataSet.hasError) {
                    error(dataSet.message);
                } else {
                    $("#leadAssignGroupNameUpdate").val(dataSet.data.leadAssignGroupName);
                    $("#leadAssignGroupDescUpdate").val(dataSet.data.leadAssignGroupDesc);

                    if (dataSet.data.leadAssignGroupParentId === null) {
                        $("#leadAssignGroupParentIdUpdate").prop("disabled", "disabled");
                        $(".isParentLeadAssignGroupDivUpdate")
                            .find("span")
                            .addClass("checked");
                        $("#isParentLeadAssignGroupUpdate").attr("checked", "checked");
                        $("#leadAssignGroupParentIdUpdate")
                            .val("")
                            .select2();
                    } else {
                        $(".isParentLeadAssignGroupDivUpdate")
                            .find("span")
                            .removeClass("checked");
                        $("#isParentLeadAssignGroupUpdate").attr("checked", false);
                        $("#leadAssignGroupParentIdUpdate").prop("disabled", false);
                        leadAssignGroup.fillLeadAssignGroupForUpdate(dataSet.data.leadAssignGroupParentId);
                    }

                    $("#leadAssignGroupId").val(dataSet.data.leadAssignGroupId);

                    $("#leadAssignGroupUpdateModal").modal("show");
                }
                hideLoader();
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                hideLoader();
            }
        });
    }
};
