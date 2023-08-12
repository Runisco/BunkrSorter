// ==UserScript==
// @name         BunkrSorter
// @namespace    https://github.com/runisco
// @version      2.2
// @updateURL    https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @downloadURL  https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @supportURL   https://github.com/Runisco/BunkrSorter/issues
// @description  Sorts bunkr items by size. Biggest first
// @author       Runisco
// @match        https://bunkr.is/a/*
// @match        https://bunkr.ru/a/*
// @match        https://bunkr.su/a/*
// @match        https://bunkr.la/a/*
// @match        https://bunkrr.su/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunkr.is
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

/* globals $ */

var sortButton = $('<a href="#" class="sort" id="startSort">sort items</a>');
sortButton.insertAfter($('p.subtitle'));
$('#startSort').css({'margin-left':'10px'});
// $('#startlistSort').css({'margin-left':'10px'});
var sortButtonFriends = $('<li><a href="#" class="sort" id="startSortFriends">sort items</a></li>');
var listButtonFriends = $('<li><a href="#" class="listSort" id="startlistSort">sort & list items</a></li>');
sortButtonFriends.insertAfter($('div.friends'))
listButtonFriends.insertAfter(sortButtonFriends)

var debug = true
var debugOnlyOne = false
var identifiedClass = '';
var identifiedContainer = '';

$('#startSort').click(function(){
    if (debug || debugOnlyOne){console.log("old startSort clicked")}
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
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "KB"){
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "kB"){
            sizeMultiplier = (1/1024);
        }else if (sizeMultiplierDeterminer == "MiB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "MB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "GiB"){
            sizeMultiplier = 1024;
        } else if (sizeMultiplierDeterminer == "GB"){
            sizeMultiplier = 1024;
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

$('#startSortFriends').click(function(){
    if (debug || debugOnlyOne){console.log("New startSortFriends clicked")}

    var items = [];

    if ($('div.overflow-hidden').length != 0){
        identifiedClass = 'div.overflow-hidden'
    } else if ($('div.grid-images_box').length != 0) {
        identifiedClass = 'div.grid-images_box'
    }

    if ($('div.grid').length != 0){
        identifiedContainer = 'div.overflow-hidden'
    } else if ($('div.grid-images_box').length != 0) {
        identifiedContainer = 'div.grid-images'
    }


    $(identifiedClass).each(function(e){
        let item = []
        let size, sizeMultiplier;
        item.push($(this));

        if (debug || debugOnlyOne){console.log($(this))}
        $(this).remove();

        let sizeInfo = $(this).find('p:eq(1)').text();
        let sizeSplit = sizeInfo.split(" ");
        size = parseFloat(sizeSplit[0]);
        if (debug || debugOnlyOne) {console.log(sizeInfo + " " + size)}

        let sizeMultiplierDeterminer = sizeSplit[1]
        if (sizeMultiplierDeterminer == "KiB"){
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "KB"){
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "kB"){
            sizeMultiplier = (1/1024);
        }else if (sizeMultiplierDeterminer == "MiB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "MB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "GiB"){
            sizeMultiplier = 1024;
        } else if (sizeMultiplierDeterminer == "GB"){
            sizeMultiplier = 1024;
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
        $(identifiedContainer).append(sortedItems[i][0]);
    }
})

$('#startlistSort').click(function(){
    if (debug || debugOnlyOne){console.log("New startlistSort clicked")}

    var items = [];

    if ($('div.overflow-hidden').length != 0){
        identifiedClass = 'div.overflow-hidden'
    } else if ($('div.grid-images_box').length != 0) {
        identifiedClass = 'div.grid-images_box'
    }

    if ($('div.grid').length != 0){
        identifiedContainer = 'div.overflow-hidden'
    } else if ($('div.grid-images_box').length != 0) {
        identifiedContainer = 'div.grid-images'
    }


    $(identifiedClass).each(function(e){
        let item = []
        let size, sizeMultiplier;
        $(this).find('img').remove()
        item.push($(this));

        if (debug || debugOnlyOne){console.log($(this))}
        $(this).remove();

        let sizeInfo = $(this).find('p:eq(1)').text();
        let sizeSplit = sizeInfo.split(" ");
        size = parseFloat(sizeSplit[0]);
        if (debug || debugOnlyOne) {console.log(sizeInfo + " " + size)}

        let sizeMultiplierDeterminer = sizeSplit[1]
        if (sizeMultiplierDeterminer == "KiB"){
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "KB"){
            sizeMultiplier = (1/1024);
        } else if (sizeMultiplierDeterminer == "kB"){
            sizeMultiplier = (1/1024);
        }else if (sizeMultiplierDeterminer == "MiB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "MB"){
            sizeMultiplier = 1;
        } else if (sizeMultiplierDeterminer == "GiB"){
            sizeMultiplier = 1024;
        } else if (sizeMultiplierDeterminer == "GB"){
            sizeMultiplier = 1024;
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

    var newList = $('<ul></ul>')
    for (let i=0; i < sortedItems.length; i++){
        // $(identifiedContainer).append(sortedItems[i][0]);
        newList.append(sortedItems[i][0]);
    }
    newList.insertAfter(identifiedContainer)
    $(identifiedContainer).remove()
    $('.grid-images_box-link').css('height','50px')
})
