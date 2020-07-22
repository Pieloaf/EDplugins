const Plugin = require('../plugin');

module.exports = new Plugin({
    name: 'Hide Sidebar', /* Human-readable plugin name. */
    description: 'Hides server and friend list side bar',
    author: "Pieloaf",
    
    load: function() {
        var element = document.getElementsByClassName('sidebar-2K8pFh');
        element["0"].style.width = "240px";
        var range = document.getElementsByClassName('scroller-2TZvBN none-2Eo-qx scrollerBase-289Jih');
        var button = document.createElement('img');
        button.id = "hideside"
        button.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F800px%2Fsvg_to_png%2F221605%2Fmenu-icon.png";
        button.width = 40;
        button.style.marginLeft = "17px";
        button.style.paddingBottom = "6px";
        button.onclick = function () {
            if (element["0"].style.width == "240px"){
            element["0"].style.width = "0px";}
            else {element["0"].style.width = "240px";}
        }
        range["0"].appendChild(button)
    },

    unload: function(){
        var element = document.getElementsByClassName('sidebar-2K8pFh');
        var button = document.getElementById("hideside")
        button.remove()
        element["0"].style.width = "240px";
    }
});