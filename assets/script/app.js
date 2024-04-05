'use strict';

import * as utils from './utils.js';

const lifetime = 15;
const firstDialog = utils.select('.box-one');
const secondDialog = utils.select('.box-two');
const acceptButton = utils.select('.accept');
const settingsButton = utils.select('.settings');
const save = utils.select('.save');
const overlay = utils.select('.overlay');
const browserToggle = utils.getElement('switch1');
const osToggle = utils.getElement('switch2');
const widthToggle = utils.getElement('switch3');
const heightToggle = utils.getElement('switch4');
const toggles = utils.selectAll('.toggle-input');
const toggleNames = utils.selectAll('.toggle-text');
let width = window.innerWidth;
let height = window.innerHeight;


window.addEventListener('load', () => {

  if (checkCookies()) {
    removeAllDialogs();
  } else {
    setTimeout(() =>
    firstDisplay(), 1000);
  }
});

utils.listen('click', acceptButton, () => {
  acceptAll();
  console.log(document.cookie);
});

utils.listen('click', settingsButton, () => {
  remove(firstDialog);
  browserToggle.checked = true;
  osToggle.checked = true;
  widthToggle.checked = true;
  heightToggle.checked = true;
  display(secondDialog);
});

utils.listen('click', save, () => {
  getToggles();
  removeAllDialogs();
  console.log(document.cookie);
});

function firstDisplay(){
  display(firstDialog);
  display(overlay);
}

function getToggles() {
  let rejected = true;
  let value;
  for (let i = 0; i < toggles.length; i++) {
    if (toggleNames[i].textContent.toLowerCase().includes('browser'.toLowerCase()))
      value = getBrowser();
    else if (toggleNames[i].textContent.toLowerCase().includes('operating'.toLowerCase()))
      value = getOS();
    else if (toggleNames[i].textContent.toLowerCase().includes('width'.toLowerCase()))
      value = width;
    else if (toggleNames[i].textContent.toLowerCase().includes('height'.toLowerCase()))
      value = height;
    if (toggles[i].checked === true) {
      utils.setCookie(toggleNames[i].textContent, value, lifetime);
      rejected = false;
    }
    if (rejected)
      utils.setCookie('User rejected cookies', 'None found', lifetime);
  }
}

function acceptAll() {
  utils.setCookie('Browser', getBrowser(), lifetime);
  utils.setCookie('Operating System', getOS(), lifetime);
  utils.setCookie('Screen width', width, lifetime);
  utils.setCookie('Screen height', height, lifetime);
  removeAllDialogs();
}

function checkCookies() {
  let enabled = navigator.cookieEnabled;
  let stored = document.cookie.length > 0 ? true : false;
  if (enabled) {
    if (stored) {
      return true;  //cookies enabled and stored
    } else {
      return false;  //cookies enabled but not stored
    }
  } else {
    return false;  //cookies not enabled
  }
}

function display(element) {
  element.style.transition = 'all 0.3s ease-in-out';
  element.classList.add('visible');
  element.classList.remove('hidden');
  element.style.opacity = 1;
}

function remove(element) {
  element.style.transition = 'all 0.3s ease-in-out';
  element.classList.add('hidden');
  element.classList.remove('visible');
  element.style.opacity = 0;
}

function removeAllDialogs() {
  remove(firstDialog);
  remove(secondDialog);
  remove(overlay);
}

function getOS() {
  const userAgent = navigator.userAgent;
  let os = '';
  if (userAgent.includes("Windows"))
    os = "Windows";
  else if (userAgent.includes("Mac OS"))
    os = "Mac OS";
  else if (userAgent.includes("Linux"))
    os = "Linux-based system.";
  else if (userAgent.includes("Android"))
    os = "Android";
  else if (userAgent.includes("iOS"))
    os = "iOS";
  else os = "Unable to determine";

  return os;
}

function getBrowser() {
  let browserName;
  if (navigator.userAgent.indexOf("OPR") !== -1)
    browserName = "Opera";
  else if (navigator.userAgent.indexOf("Edg") !== -1)
    browserName = "Microsoft Edge";
  else if (navigator.userAgent.indexOf("MSIE") !== -1)
    browserName = "Microsoft Internet Explorer";
  else if (navigator.userAgent.indexOf("Chrome") !== -1)
    browserName = "Chrome";
  else if (navigator.userAgent.indexOf("Safari") !== -1)
    browserName = "Safari";
  else if (navigator.userAgent.indexOf("Firefox") !== -1)
    browserName = "Firefox";
  if ('brave' in navigator) browserName = "Brave";

  return browserName;
}