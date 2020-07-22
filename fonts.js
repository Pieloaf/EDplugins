const Plugin = require('../plugin');
const fs = require('fs');
const { NONAME } = require('dns');
const { inherits } = require('util');

module.exports = new Plugin({
    name: 'Google Fonts', /* Human-readable plugin name. */
    description: 'mehh I don\'t feel like writing a description',
    author: "Pieloaf",

    defaultSettings: {font: '', spacing: '2px'},
    resetSettings: function() {
        this.settings = this.defaultSettings;
        console.log("reset")
    },

    onSettingsUpdate: function() {
        return this.reload();
    },

    load: function() {
        var body = document.body;
        var importFont = document.createElement("link");
        importFont.href = "https://fonts.googleapis.com/css2?family="+this.settings.font+"&display=swap";
        importFont.rel = "stylesheet";
        body.appendChild(importFont);
        body.style.fontFamily = this.settings.font;
        body.style.letterSpacing = this.settings.spacing+"px";
    },

    unload: function(){
        document.body.removeAttribute('style');
    },

    generateSettings: function() { 
        var opts = []
        var x = fs.readFileSync('./fonts.json', 'utf8')
        var fonts = JSON.parse(x).fonts;
        var len = fonts.length;            
        for(var i=0; i<len; i++){
            opts.push({label: fonts[i], value: fonts[i]});
        }
        return [{type: "input:select",
        options: opts,
        configName: "font",
        title: "Font Name:",
        note: "Name of Google Font to be Used",
        },{
        type: "input:slider",
        configName: "spacing",
        title: "Font Spacing",
        markers: [
            0,.2,.4,.6,.8,1,1.2,1.4,1.6,1.8,2
        ],
        stickToMarkers: true,
        defaultValue: 0,
        minValue:0,
        maxValue:2,
        }]
    }
})