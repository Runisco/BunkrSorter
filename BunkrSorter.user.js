// ==UserScript==
// @name         BunkrSorter
// @namespace    https://github.com/runisco
// @version      2.1
// @updateURL    https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @downloadURL  https://github.com/Runisco/BunkrSorter/raw/main/BunkrSorter.user.js
// @supportURL   https://github.com/Runisco/BunkrSorter/issues
// @description  Toggle bunkr items by size.
// @author       Runisco
// @match        https://bunkr.is/a/*
// @match        https://bunkr.ru/a/*
// @match        https://bunkr.su/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunkr.is
// @grant        none
// ==/UserScript==

/* globals $ */

const ascendingLabel = 'Sort (Smallest First)';
const descendingLabel = 'Sort (Largest First)';

let debug = true
let debugOnlyOne = false

let direction = 'asc';

const styles = document.createElement('style');
styles.innerHTML = `
#btn-sort:hover {
  text-decoration: underline;
}
`;
document.head.prepend(styles);

const sortButton = document.createElement('a');
sortButton.id = 'btn-sort';
sortButton.href = '#';
sortButton.style.color = 'dodgerblue';
sortButton.style.fontSize = '18px';
sortButton.textContent = direction === 'desc' ? ascendingLabel : descendingLabel;

const row = document.createElement('div');
row.className = 'w-full px-2 lg:w-2/4';
row.innerHTML = `
<div class="mb-12-xxx">
  <h1 class="text-[24px] font-bold text-dark dark:text-white">
    <span id="btn-sort-container" class="text-primary text-[20px] break-normal"></span>
  </h1>
</div>
`;

const header = document.querySelector('.-mx-4');
header.append(row);

document.querySelector('#btn-sort-container').append(sortButton);

sortButton.addEventListener('click', (e) => {
    e.preventDefault();

    direction = direction === 'asc' ? 'desc' : 'asc';

    const getSize = (container) => {
        const parts = container.innerText.split(' ');
        return Number.parseFloat(parts[0]).toFixed(2);
    }

    const getSizeMultiplier = (container) => {
        const parts = container.innerText.split(' ');
        let multiplier = parts[1].trim().toLowerCase();

        if (multiplier.indexOf('k') > -1) {
            multiplier = (1/1024);
        } else if (multiplier.indexOf('m') > -1) {
            multiplier = 1;
        } else if (multiplier.indexOf('g') > -1) {
            multiplier = 1024;
        }

        return multiplier;
    }

    const items = document.querySelectorAll('div.overflow-hidden');

    if (debug || debugOnlyOne) {
        [...items].forEach((i) => {
            const container = i.querySelector('figcaption > p:nth-child(2)');
            const size = getSize(container);
            const sizeMultiplier = getSizeMultiplier(container);
            console.log(i);
            console.log(`${container.innerText} ${size}`)
            console.log(`${size} = ${size * sizeMultiplier}`);
        });
    }

    const sortedItems = [...items].sort((a, b) => {
        const sizeContainerA = a.querySelector('figcaption > p:nth-child(2)');
        const sizeContainerB = b.querySelector('figcaption > p:nth-child(2)');

        let sizeA = getSize(sizeContainerA);
        let sizeB = getSize(sizeContainerB);

        let sizeMultiplierA = getSizeMultiplier(sizeContainerA);
        let sizeMultiplierB = getSizeMultiplier(sizeContainerB);

        sizeA = sizeA * sizeMultiplierA;
        sizeB = sizeB * sizeMultiplierB;

        return direction === 'asc' ? sizeA - sizeB : sizeB - sizeA;
    });

    const grid = document.querySelector('.grid');

    [...grid.children].forEach((c) => c.remove());

    sortedItems.forEach((i) => grid.append(i));

    sortButton.textContent = direction === 'desc' ? ascendingLabel : descendingLabel;
});