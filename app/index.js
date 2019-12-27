import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { me as appbit } from "appbit";
import { me as device } from "device";
import { today } from "user-activity";
import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let textcolor = "white";
let hrcolor = "#ff007a";
let stepcolor = "aquamarine";
let showHR = false;
let showSteps = false;

let settings = loadSettings();
onSettingsChange(settings);

function onSettingsChange(data) {
    if (!data) {
        return
    }
    if (data.textcolor) {
        textcolor = data.textcolor;
    }
    if (data.hrcolor) {
        hrcolor = data.hrcolor;
    }
    if (data.stepcolor) {
        stepcolor = data.stepcolor;
    }
    if (data.showHR) {
        showHR = data.showHR;
    }
    if (data.showSteps) {
        showSteps = data.showSteps;
    }
}

messaging.peerSocket.onmessage = function(evt) {
    settings[evt.data.key] = evt.data.value;
    onSettingsChange(settings);
    saveSettings(settings);
}

appbit.addEventListener("unload", saveSettings);

function loadSettings() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch(ex) {
        return {};
    }
}

function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
    resetAll();
    let today = evt.date;
    let hours = today.getHours();
    hours = hours % 12 || 12;
    let mins = today.getMinutes();
    minsToWords(mins);
    if (mins >= 35) {
        hours = (hours + 1) % 12 || 12;
    }
    hoursToWords(hours);
    document.getElementById('row1col1').style.fill = textcolor;
    document.getElementById('row1col2').style.fill = textcolor;
    document.getElementById('row1col4').style.fill = textcolor;
    document.getElementById('row1col5').style.fill = textcolor;
    if (showSteps) {
        getSteps();
    }
    if (showHR) {
        getHR();
    }
}

function getSteps() {
    if (appbit.permissions.granted("access_activity")) {
        let steps = today.adjusted.steps;
        let steparr = ("00000" + steps).substr(-5).split('');
        document.getElementById('row2col12').textContent = steparr[0];
        document.getElementById('row3col12').textContent = steparr[1];
        document.getElementById('row4col12').textContent = steparr[2];
        document.getElementById('row5col12').textContent = steparr[3];
        document.getElementById('row6col12').textContent = steparr[4];
        document.getElementById('row2col12').style.fill = stepcolor;
        document.getElementById('row3col12').style.fill = stepcolor;
        document.getElementById('row4col12').style.fill = stepcolor;
        document.getElementById('row5col12').style.fill = stepcolor;
        document.getElementById('row6col12').style.fill = stepcolor;
    }
}

function getHR() {
    if (HeartRateSensor) {
        const hrm = new HeartRateSensor({ frequency: 1 });
        hrm.addEventListener("reading", () => {
            let hrarr = hrm.heartRate.toString().split('');
            if (hrarr.length < 3) {
                hrarr.unshift(0);
            }
            document.getElementById('row1col9').textContent = hrarr[0];
            document.getElementById('row1col10').textContent = hrarr[1];
            document.getElementById('row1col11').textContent = hrarr[2];
            document.getElementById('row1col9').style.fill = hrcolor;
            document.getElementById('row1col10').style.fill = hrcolor;
            document.getElementById('row1col11').style.fill = hrcolor;
        });
        display.addEventListener("change", () => {
            // Automatically stop the sensor when the screen is off to conserve battery
            display.on ? hrm.start() : hrm.stop();
        });
        hrm.start();
    }
}

function resetAll() {
    let texts = document.getElementsByTagName('text');
    texts.forEach(t => {
        t.style.fill = '#222222';
    })
}

function hoursToWords(hours) {
    switch (hours) {
        case 1:
            document.getElementById('row10col9').style.fill = textcolor;
            document.getElementById('row10col10').style.fill = textcolor;
            document.getElementById('row10col11').style.fill = textcolor;
            break;
        case 2:
            document.getElementById('row8col10').style.fill = textcolor;
            document.getElementById('row8col11').style.fill = textcolor;
            document.getElementById('row8col12').style.fill = textcolor;
            break;
        case 3:
            document.getElementById('row10col4').style.fill = textcolor;
            document.getElementById('row10col5').style.fill = textcolor;
            document.getElementById('row10col6').style.fill = textcolor;
            document.getElementById('row10col7').style.fill = textcolor;
            document.getElementById('row10col8').style.fill = textcolor;
            break;
        case 4:
            document.getElementById('row6col7').style.fill = textcolor;
            document.getElementById('row6col8').style.fill = textcolor;
            document.getElementById('row6col9').style.fill = textcolor;
            document.getElementById('row6col10').style.fill = textcolor;
            break;
        case 5:
            document.getElementById('row8col5').style.fill = textcolor;
            document.getElementById('row8col6').style.fill = textcolor;
            document.getElementById('row8col7').style.fill = textcolor;
            document.getElementById('row8col8').style.fill = textcolor;
            break;
        case 6:
            document.getElementById('row10col1').style.fill = textcolor;
            document.getElementById('row10col2').style.fill = textcolor;
            document.getElementById('row10col3').style.fill = textcolor;
            break;
        case 7:
            document.getElementById('row7col1').style.fill = textcolor;
            document.getElementById('row7col2').style.fill = textcolor;
            document.getElementById('row7col3').style.fill = textcolor;
            document.getElementById('row7col4').style.fill = textcolor;
            document.getElementById('row7col5').style.fill = textcolor;
            break;
        case 8:
            document.getElementById('row9col1').style.fill = textcolor;
            document.getElementById('row9col2').style.fill = textcolor;
            document.getElementById('row9col3').style.fill = textcolor;
            document.getElementById('row9col4').style.fill = textcolor;
            document.getElementById('row9col5').style.fill = textcolor;
            break;
        case 9:
            document.getElementById('row8col1').style.fill = textcolor;
            document.getElementById('row8col2').style.fill = textcolor;
            document.getElementById('row8col3').style.fill = textcolor;
            document.getElementById('row8col4').style.fill = textcolor;
            break;
        case 10:
            document.getElementById('row11col1').style.fill = textcolor;
            document.getElementById('row11col2').style.fill = textcolor;
            document.getElementById('row11col3').style.fill = textcolor;
            break;
        case 11:
            document.getElementById('row9col7').style.fill = textcolor;
            document.getElementById('row9col8').style.fill = textcolor;
            document.getElementById('row9col9').style.fill = textcolor;
            document.getElementById('row9col10').style.fill = textcolor;
            document.getElementById('row9col11').style.fill = textcolor;
            document.getElementById('row9col12').style.fill = textcolor;
            break;
        case 12:
            document.getElementById('row7col7').style.fill = textcolor;
            document.getElementById('row7col8').style.fill = textcolor;
            document.getElementById('row7col9').style.fill = textcolor;
            document.getElementById('row7col10').style.fill = textcolor;
            document.getElementById('row7col11').style.fill = textcolor;
            document.getElementById('row7col12').style.fill = textcolor;
            break;
    }
}

function past() {
    document.getElementById('row6col1').style.fill = textcolor;
    document.getElementById('row6col2').style.fill = textcolor;
    document.getElementById('row6col3').style.fill = textcolor;
    document.getElementById('row6col4').style.fill = textcolor;
}

function to() {
    document.getElementById('row5col9').style.fill = textcolor;
    document.getElementById('row5col10').style.fill = textcolor;
}

function minutes() {
    document.getElementById('row5col1').style.fill = textcolor;
    document.getElementById('row5col2').style.fill = textcolor;
    document.getElementById('row5col3').style.fill = textcolor;
    document.getElementById('row5col4').style.fill = textcolor;
    document.getElementById('row5col5').style.fill = textcolor;
    document.getElementById('row5col6').style.fill = textcolor;
    document.getElementById('row5col7').style.fill = textcolor;
}

function minsToWords(mins) {
    if (mins >= 0 && mins < 5) {
        document.getElementById('row11col7').style.fill = textcolor;
        document.getElementById('row11col8').style.fill = textcolor;
        document.getElementById('row11col9').style.fill = textcolor;
        document.getElementById('row11col10').style.fill = textcolor;
        document.getElementById('row11col11').style.fill = textcolor;
        document.getElementById('row11col12').style.fill = textcolor;
    } else if (mins >= 5 && mins < 10) {
        document.getElementById('row3col7').style.fill = textcolor;
        document.getElementById('row3col8').style.fill = textcolor;
        document.getElementById('row3col9').style.fill = textcolor;
        document.getElementById('row3col10').style.fill = textcolor;
        minutes();
        past();
    } else if (mins >= 10 && mins < 15) {
        document.getElementById('row4col8').style.fill = textcolor;
        document.getElementById('row4col9').style.fill = textcolor;
        document.getElementById('row4col10').style.fill = textcolor;
        minutes();
        past();
    } else if (mins >= 15 && mins < 20) {
        document.getElementById('row2col3').style.fill = textcolor;
        document.getElementById('row2col4').style.fill = textcolor;
        document.getElementById('row2col5').style.fill = textcolor;
        document.getElementById('row2col6').style.fill = textcolor;
        document.getElementById('row2col7').style.fill = textcolor;
        document.getElementById('row2col8').style.fill = textcolor;
        document.getElementById('row2col9').style.fill = textcolor;
        minutes();
        past();
    } else if (mins >= 20 && mins < 25) {
        document.getElementById('row3col1').style.fill = textcolor;
        document.getElementById('row3col2').style.fill = textcolor;
        document.getElementById('row3col3').style.fill = textcolor;
        document.getElementById('row3col4').style.fill = textcolor;
        document.getElementById('row3col5').style.fill = textcolor;
        document.getElementById('row3col6').style.fill = textcolor;
        minutes();
        past();
    } else if (mins >= 25 && mins < 30) {
        document.getElementById('row3col1').style.fill = textcolor;
        document.getElementById('row3col2').style.fill = textcolor;
        document.getElementById('row3col3').style.fill = textcolor;
        document.getElementById('row3col4').style.fill = textcolor;
        document.getElementById('row3col5').style.fill = textcolor;
        document.getElementById('row3col6').style.fill = textcolor;
        document.getElementById('row3col7').style.fill = textcolor;
        document.getElementById('row3col8').style.fill = textcolor;
        document.getElementById('row3col9').style.fill = textcolor;
        document.getElementById('row3col10').style.fill = textcolor;
        minutes();
        past();
    } else if (mins >= 30 && mins < 35) {
        document.getElementById('row4col2').style.fill = textcolor;
        document.getElementById('row4col3').style.fill = textcolor;
        document.getElementById('row4col4').style.fill = textcolor;
        document.getElementById('row4col5').style.fill = textcolor;
        past();
    } else if (mins >= 35 && mins < 40) {
        document.getElementById('row3col1').style.fill = textcolor;
        document.getElementById('row3col2').style.fill = textcolor;
        document.getElementById('row3col3').style.fill = textcolor;
        document.getElementById('row3col4').style.fill = textcolor;
        document.getElementById('row3col5').style.fill = textcolor;
        document.getElementById('row3col6').style.fill = textcolor;
        document.getElementById('row3col7').style.fill = textcolor;
        document.getElementById('row3col8').style.fill = textcolor;
        document.getElementById('row3col9').style.fill = textcolor;
        document.getElementById('row3col10').style.fill = textcolor;
        minutes();
        to();
    } else if (mins >= 40 && mins < 45) {
        document.getElementById('row3col1').style.fill = textcolor;
        document.getElementById('row3col2').style.fill = textcolor;
        document.getElementById('row3col3').style.fill = textcolor;
        document.getElementById('row3col4').style.fill = textcolor;
        document.getElementById('row3col5').style.fill = textcolor;
        document.getElementById('row3col6').style.fill = textcolor;
        minutes();
        to();
    } else if (mins >= 45 && mins < 50) {
        document.getElementById('row2col3').style.fill = textcolor;
        document.getElementById('row2col4').style.fill = textcolor;
        document.getElementById('row2col5').style.fill = textcolor;
        document.getElementById('row2col6').style.fill = textcolor;
        document.getElementById('row2col7').style.fill = textcolor;
        document.getElementById('row2col8').style.fill = textcolor;
        document.getElementById('row2col9').style.fill = textcolor;
        minutes();
        to();
    } else if (mins >= 50 && mins < 55) {
        document.getElementById('row4col8').style.fill = textcolor;
        document.getElementById('row4col9').style.fill = textcolor;
        document.getElementById('row4col10').style.fill = textcolor;
        minutes();
        to();
    } else if (mins >= 55) {
        document.getElementById('row3col7').style.fill = textcolor;
        document.getElementById('row3col8').style.fill = textcolor;
        document.getElementById('row3col9').style.fill = textcolor;
        document.getElementById('row3col10').style.fill = textcolor;
        minutes();
        to();
    }
}