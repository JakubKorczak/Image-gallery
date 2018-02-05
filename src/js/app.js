import { buildLayout } from "./build-layout.js";

document.addEventListener("DOMContentLoaded", function() {
    function loadJSON(callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './data.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    (function loadData() {
        loadJSON(function(response) {
            const dataJSON = JSON.parse(response);
            buildLayout(dataJSON);
        });
    })();
});
