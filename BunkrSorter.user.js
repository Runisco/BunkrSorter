// ==UserScript==
// @name         BunkrSorter
// @namespace    https://github.com/runisco
// @version      1.2
// @updateURL    https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @downloadURL  https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @supportURL   https://github.com/Runisco/BunkrSorter/issues
// @description  Sorts bunkr items by size. Biggest first
// @author       Runisco
// @match        https://bunkr.is/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunkr.is
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

/* globals $ */

var sortButton = $('<a href="#" class="sort" id="startSort">sort items</a>');
sortButton.insertAfter($('p.subtitle'));
$('#startSort').css({'margin-left':'10px'});

var debug = false
var debugOnlyOne = false

$('#startSort').click(function(){
    var items = [];
    $('div.image-container.column').each(function(e){
        let item = []
        let size, sizeMultiplier;
        item.push($(this));

        if (debug || debugOnlyOne){console.log($(this))}
        $(this).remove();

        let sizeInfo = $(this).find('p.file-size').text();
        let sizeSplit = sizeInfo.split(" ");
        size = parseFloat(sizeSplit[0]);
        if (debug || debugOnlyOne) {console.log(sizeInfo + " " + size)}

        let sizeMultiplierDeterminer = sizeSplit[1]
        if (sizeMultiplierDeterminer == "KiB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "MiB"){
            sizeMultiplier = 200;
        } else if (sizeMultiplierDeterminer == "GiB"){
            size = size * 100
            sizeMultiplier = 10240;
        }
        item.push(size * sizeMultiplier);
        if (debug || debugOnlyOne) {console.log(size + " = " + size * sizeMultiplier)}

        items.push(item);
        $(this).remove();
        debugOnlyOne = false;
    });

    var sortedItems = items.sort(function(a, b) {
        return b[1] - a[1];
    });

    for (let i=0; i < sortedItems.length; i++){
        $('div#table').append(sortedItems[i][0]);
    }
})
