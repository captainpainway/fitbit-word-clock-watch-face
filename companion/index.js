import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

let SHOW_HR = "showHR";
let SHOW_STEPS = "showSteps";
let TEXT_COLOR = "textolor";
let HR_COLOR = "hrcolor";
let STEP_COLOR = "stepcolor";

// Settings have been changed
settingsStorage.onchange = function(evt) {
    sendValue(evt.key, evt.newValue);
}

// Send the value of the setting
sendValue(SHOW_HR, settingsStorage.getItem(SHOW_HR));
sendValue(SHOW_STEPS, settingsStorage.getItem(SHOW_STEPS));
sendValue(TEXT_COLOR, settingsStorage.getItem(TEXT_COLOR));
sendValue(HR_COLOR, settingsStorage.getItem(HR_COLOR));
sendValue(STEP_COLOR, settingsStorage.getItem(STEP_COLOR));

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}
function sendSettingData(data) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}
