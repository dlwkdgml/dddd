document.oncontextmenu = function (e) {
   return false;
}

document.ondragstart = function (e) {
   return false;
}

document.onselectstart = function (e) {
   return false;
}

function searchWord(a,b) {
   external.searchWord(a,b);
}