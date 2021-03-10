// ==UserScript==
// @name         Add Column to Cororanvirus
// @namespace    Coroanvirus
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.worldometers.info/coronavirus/
// @match        https://www.worldometers.info/coronavirus/country/us/
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

$(function() {
    'use strict';
    var $button = $("<button>", {'id': 'add-more-counts'}).text("Add more").css({"padding": 10, "font-size": 30})
    $("#countries").parent().prepend($button);
    $("#nav-tabContent").prepend($button);
    $("#add-more-counts").on("click", function () {
        console.log("Adding more stuff to tables")
        var $table = $("#main_table_countries_yesterday")
        if ($table.length == 0) {
            $table = $("#usa_table_countries_yesterday")
        }
        var $header = $table.find("thead");
        $header.find("tr").append($("<th>", {'width': 30, class: 'sorting', rowspan: '1', colspan: '1'}).text("Cases/1m Population"));
        $header.find("tr").append($("<th>", {'width': 30, class: 'sorting', rowspan: '1', colspan: '1'}).text("Death/1m Population"));
        var $rows = $table.find("tbody tr");
        $rows.each(function (i, row) {
            if (i == 0) {
               return;
            }

            var $row = $(row);
            if ($row.hasClass("row_continent") || $row.hasClass("total_row_world")) {
                return;
            }

            var cases = parseInt($row.find("td:eq(3)").text().replace(/,/g, "")) * 1.0;
            var deaths = parseInt($row.find("td:eq(5)").text().replace(/,/g, "")) * 1.0;
            var population = parseInt($row.find("td:eq(13)").text().replace(/,/g, "")) * 1.0 / 1000000;
            if (Object.is(NaN, population)) {
                population = parseInt($row.find("td:eq(12)").text().replace(/,/g, "")) * 1.0 / 1000000;
            }
            var casesPerPopNew = (cases / population).toFixed(2);
            var deahthsPerPopNew = (deaths / population).toFixed(2);
            $row.append($("<td>", {style: "font-size:15px; font-weight: bold; text-align:center; vertical-align:middle;"}).text(casesPerPopNew))
            $row.append($("<td>", {style: "font-size:15px; font-weight: bold; text-align:center; vertical-align:middle;"}).text(deahthsPerPopNew))
         });
    });
});

