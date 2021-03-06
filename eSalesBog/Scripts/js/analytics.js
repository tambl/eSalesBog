﻿function initDatePicker() {
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        weekStart: 1,
        language: "ka"
    });
}

$(document).ready(function () {
    initDatePicker();
    initSalesByConsultantsTable();
    initSalesByProductPriceTable();
    initConsultantsByProductQuantityTable();
    initConsultantsBySummedSalesTable();
    initConsultantsByPopularProductsTable();
});

function initSalesByConsultantsTable() {

    var dataTable = $("#salesByConsultants").DataTable({
        //ajax: {
        //    url: "/Analytics/GetSalesByConsultants?startDate=" + startDate + "&endDate=" + endDate,
        //    method: "GET",
        //    dataSrc: ""
        //},
        //"processing": true,
        //"serverSide": true,
        columns: [
            { data: "SaleID", sortable: true },
            {
                data: "SaleDate",
                render: function (data) {
                    var date = new Date(parseInt(data.replace('/Date(', '')));
                    return date;
                },
                sortable: true
            },
            { data: "ConsultantID", sortable: true }
            , { data: "FullName", sortable: true },
            { data: "PersonalNumber", sortable: true },
            { data: "Quantity", sortable: true },
            { data: "SumAmount", sortable: true }
        ]

    });
};

$(".loadSalesByConsultants").on("click", function () {

    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();

    var datatable = $("#salesByConsultants").DataTable();

    $.ajax({
        url: "/Analytics/GetSalesByConsultants?startDate=" + startDate + "&endDate=" + endDate,
        method: "GET",
        success: function (result) {

            datatable.clear();
            datatable.rows.add(result.data);
            datatable.draw();

        }
    });

});

function initSalesByProductPriceTable() {
    var dataTable = $("#salesByProductPrice").DataTable({
        columns: [
            { data: "SaleID", sortable: true },
            {
                data: "SaleDate",
                render: function (data) {
                    var date = new Date(parseInt(data.replace('/Date(', '')));
                    return date;
                },
                sortable: true
            },
            { data: "ConsultantID", sortable: true }
            , { data: "FullName", sortable: true },
            { data: "PersonalNumber", sortable: true },
            { data: "Quantity", sortable: true }
        ]

    });
};

$(".loadSalesByProductPrice").on("click", function () {

    var startDate = $("#startDate2").val();
    var endDate = $("#endDate2").val();
    var minPrice = $("#minPrice").val();
    var maxPrice = $("#maxPrice").val();

    var datatable = $("#salesByProductPrice").DataTable();

    $.ajax({
        url: "/Analytics/GetSalesByProductPrice?startDate=" + startDate + "&endDate=" + endDate + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice,
        method: "GET",
        success: function (result) {

            datatable.clear();
            datatable.rows.add(result.data);
            datatable.draw();

        }
    });

});

function initConsultantsByProductQuantityTable() {
    var dataTable = $("#consultantsByProductQuantity").DataTable({
        columns: [
            { data: "ConsultantID", sortable: true },
           { data: "FullName", sortable: true },
            { data: "PersonalNumber", sortable: true },
            {
                data: "ConsultantBirthDate",
                render: function (data) {
                    var date = dDate(parseInt(data.replace('/Date(', '')));
                    return date;
                },
                sortable: true
            },
            { data: "ProductCode", sortable: true },
            { data: "Quantity", sortable: true }
        ]

    });
};

$(".loadConsultantsByProductQuantity").on("click", function () {

    var startDate = $("#startDate3").val();
    var endDate = $("#endDate3").val();
    var productCode = $("#productCode").val();
    var minQuantityOfProducts = $("#minQuantityOfProducts").val();

    var datatable = $("#consultantsByProductQuantity").DataTable();

    $.ajax({
        url: "/Analytics/GetConsultantsByProductQuantity?startDate=" + startDate + "&endDate=" + endDate + "&productCode=" + productCode + "&minQuantityOfProducts=" + minQuantityOfProducts,
        method: "GET",
        success: function (result) {

            datatable.clear();
            datatable.rows.add(result.data);
            datatable.draw();

        }
    });

});

function initConsultantsBySummedSalesTable() {

    var dataTable = $("#consultantsBySummedSales").DataTable({
        columns: [
            { data: "ConsultantID", sortable: true }
            , { data: "FullName", sortable: true },
            { data: "PersonalNumber", sortable: true },
            {
                data: "ConsultantBirthDate",
                render: function (data) {
                    var date = new Date(parseInt(data.replace('/Date(', '')));
                    return date;
                },
                sortable: true
            },

            { data: "Quantity", sortable: true },
            { data: "QuantityOverHierarchy", sortable: true }
        ],
        order: [[5, "desc"]]

    });
};

$(".loadConsultantsBySummedSales").on("click", function () {

    var startDate = $("#startDate4").val() ? $("#startDate4").val() : null;
    var endDate = $("#endDate4").val() ? $("#endDate4").val() : null;

    var datatable = $("#consultantsBySummedSales").DataTable();

    $.ajax({
        url: "/Analytics/GetConsultantsBySummedSales?startDate==" + startDate + "&endDate=" + endDate,
        method: "GET",
        success: function (result) {

            datatable.clear();
            datatable.rows.add(result.data);
            datatable.draw();

        }
    });

});

function initConsultantsByPopularProductsTable() {

    var dataTable = $("#consultantsByTopSoldProducts").DataTable({
        columns: [
            { data: "ConsultantID", sortable: true }
            , { data: "FullName", sortable: true },
            { data: "PersonalNumber", sortable: true },
            {
                data: "ConsultantBirthDate",
                render: function (data) {
                    var date = new Date(parseInt(data.replace('/Date(', '')));
                    return date;
                },
                sortable: true
            },

            { data: "TopSoldProductCode", sortable: true },
            { data: "TopSoldProductName", sortable: true },
        { data: "TopSoldProductTotalQuantity", sortable: true },
        { data: "TopProfitableProductCode", sortable: true },
        { data: "TopProfitableProductName", sortable: true },
        { data: "TopProfitableProductTotalAmount", sortable: true }
        ],
        order:[[9,"desc"]]

    });
};

$(".loadConsultantsByTopSoldProducts").on("click", function () {

    var startDate = $("#startDate5").val() ? $("#startDate5").val() : null;
    var endDate = $("#endDate5").val() ? $("#endDate5").val() : null;

    var datatable = $("#consultantsByTopSoldProducts").DataTable();

    $.ajax({
        url: "/Analytics/GetConsultantsByTopSoldProducts?startDate==" + startDate + "&endDate=" + endDate,
        method: "GET",
        success: function (result) {

            datatable.clear();
            datatable.rows.add(result.data);
            datatable.draw();

        }
    });

});