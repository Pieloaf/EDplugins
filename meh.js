const Plugin = require('../plugin');
const path = require('path');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
//const TextToSVG = require('./text-to-svg-master/bin/text-to-svg');

module.exports = new Plugin({
    name: 'Custom Corner Text', /* Human-readable plugin name. */
    description: 'mehh I don\'t feel like writing a description',
    author: "Pieloaf",

    defaultSettings: {path: '', color: ''},
    resetSettings: function() {
        this.settings = this.defaultSettings;
        console.log("reset")
    },

    onSettingsUpdate: function() {
        const filePath = this.settings.path;
        const textColour = this.settings.color;
        if (!filePath) {
            return this.resetSettings('Empty path. Settings have been reset.');
        }
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            return this.resetSettings('Invalid file path. Must be a local SVG file (stored on your computer, not a URL.)');
        }
        if (!filePath.endsWith('.svg')) {
            return this.resetSettings('Invalid file path. Must be a SVG file.');
        }
        if (!fs.existsSync(filePath)) {
            return this.resetSettings('Invalid file path. File does not exist.');
        }
        return this.reload();
    },

/* https://maketext.io/ */
    load: function() {
        const filePath = this.settings.path;
        const svgPath = filePath;
        const textcolor = this.settings.color;
        var element = document.getElementsByClassName('wordmarkWindows-1v0lYD wordmark-2iDDfm');
        element[0].width= "500px"
        var svg = element[0].firstChild;
        svg.setAttribute("viewBox", "0 0 6000 16");
        svg.setAttribute("width", "100pc");
        svg.setAttribute("height", "1.9pc");

        readFile(svgPath, 'utf8').then((result) => {
            let parser = new DOMParser;
            let xmlDOM = parser.parseFromString(result, 'image/svg+xml');
            gTags = xmlDOM.querySelectorAll('g');
            let path = gTags['1'].firstChild;
            svg.firstChild.setAttribute("d", path.attributes.getNamedItem('d').value)
            svg.firstChild.setAttribute("transform", "translate(1 3)");
            if(textcolor){
                svg.firstChild.setAttribute("fill", textcolor);
            }
            else{
                svg.firstChild.setAttribute("fill", path.attributes.getNamedItem('fill').value)
            }
        });
    },

    unload: function(){
        var element = document.getElementsByClassName('wordmarkWindows-1v0lYD wordmark-2iDDfm');
        var svg = element[0].firstChild;
        svg.setAttribute("viewBox", "0 0 55 16");
        svg.setAttribute("width", "55");
        svg.setAttribute("height", "16");
        svg.firstChild.setAttribute("d", "M3.57642276,0.141304348 L0,0.141304348 L0,4.22826087 L2.38069106,6.40217391 L2.38069106,2.43478261 L3.66260163,2.43478261 C4.47052846,2.43478261 4.86910569,2.83695652 4.86910569,3.4673913 L4.86910569,6.5 C4.86910569,7.13043478 4.49207317,7.55434783 3.66260163,7.55434783 L0,7.55434783 L0,9.85869565 L3.57642276,9.85869565 C5.49390244,9.86956522 7.29288618,8.90217391 7.29288618,6.66304348 L7.29288618,3.39130435 C7.29288618,1.13043478 5.49390244,0.141304348 3.57642276,0.141304348 Z M22.3310976,6.67391304 L22.3310976,3.32608696 C22.3310976,2.11956522 24.4640244,1.83695652 25.1103659,3.05434783 L27.0817073,2.23913043 C26.3168699,0.510869565 24.8949187,0 23.7207317,0 C21.803252,0 19.9073171,1.13043478 19.9073171,3.32608696 L19.9073171,6.67391304 C19.9073171,8.88043478 21.803252,10 23.6776423,10 C24.8841463,10 26.3276423,9.39130435 27.1247967,7.81521739 L25.0134146,6.82608696 C24.4963415,8.17391304 22.3310976,7.84782609 22.3310976,6.67391304 Z M15.8030488,3.7826087 C15.0597561,3.61956522 14.5642276,3.34782609 14.5319106,2.88043478 C14.575,1.75 16.2878049,1.7173913 17.2896341,2.79347826 L18.8731707,1.55434783 C17.8821138,0.326086957 16.7617886,0 15.598374,0 C13.8424797,0 12.1404472,1 12.1404472,2.91304348 C12.1404472,4.77173913 13.5408537,5.76086957 15.0813008,6 C15.8676829,6.10869565 16.7402439,6.42391304 16.7186992,6.97826087 C16.654065,8.02173913 14.5426829,7.9673913 13.5839431,6.7826087 L12.0650407,8.23913043 C12.9591463,9.40217391 14.1764228,10 15.3182927,10 C17.074187,10 19.0239837,8.9673913 19.0993902,7.08695652 C19.2071138,4.69565217 17.5050813,4.09782609 15.8030488,3.7826087 Z M8.59634146,9.85869565 L11.0093496,9.85869565 L11.0093496,0.141304348 L8.59634146,0.141304348 L8.59634146,9.85869565 Z M49.2835366,0.141304348 L45.7071138,0.141304348 L45.7071138,4.22826087 L48.0878049,6.40217391 L48.0878049,2.43478261 L49.3589431,2.43478261 C50.1668699,2.43478261 50.5654472,2.83695652 50.5654472,3.4673913 L50.5654472,6.5 C50.5654472,7.13043478 50.1884146,7.55434783 49.3589431,7.55434783 L45.6963415,7.55434783 L45.6963415,9.85869565 L49.2727642,9.85869565 C51.1902439,9.86956522 52.9892276,8.90217391 52.9892276,6.66304348 L52.9892276,3.39130435 C53,1.13043478 51.2010163,0.141304348 49.2835366,0.141304348 Z M31.7353659,0 C29.753252,0 27.7819106,1.09782609 27.7819106,3.33695652 L27.7819106,6.66304348 C27.7819106,8.89130435 29.7640244,10 31.7569106,10 C33.7390244,10 35.7103659,8.89130435 35.7103659,6.66304348 L35.7103659,3.33695652 C35.7103659,1.10869565 33.7174797,0 31.7353659,0 Z M33.2865854,6.66304348 C33.2865854,7.35869565 32.5109756,7.7173913 31.7461382,7.7173913 C30.9705285,7.7173913 30.1949187,7.36956522 30.1949187,6.66304348 L30.1949187,3.33695652 C30.1949187,2.61956522 30.9489837,2.23913043 31.7030488,2.23913043 C32.4894309,2.23913043 33.2865854,2.58695652 33.2865854,3.33695652 L33.2865854,6.66304348 Z M44.3605691,3.33695652 C44.3067073,1.05434783 42.7770325,0.141304348 40.8056911,0.141304348 L36.9815041,0.141304348 L36.9815041,9.86956522 L39.4268293,9.86956522 L39.4268293,6.77173913 L39.8577236,6.77173913 L42.0768293,9.85869565 L45.0930894,9.85869565 L42.4861789,6.52173913 C43.6495935,6.15217391 44.3605691,5.14130435 44.3605691,3.33695652 Z M40.8487805,4.65217391 L39.4268293,4.65217391 L39.4268293,2.43478261 L40.8487805,2.43478261 C42.3784553,2.43478261 42.3784553,4.65217391 40.8487805,4.65217391 Z");
        svg.firstChild.setAttribute("fill", "#ffffff80");
        element[0].width= "73px"
    },
    
    generateSettings: function() { return [{
        type: "input:text",
        configName: "path",
        title: "SVG path:",
        note: "Set the svg file to use",
        placeholder: "Path to svg file"
    },{         
        type: "input:text",
        configName: "color",
        title: "Colour",
        note: "Set the text colour",
        placeholder: "#ffffff"}]},
});