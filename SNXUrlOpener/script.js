const timerIntervalMS = 1000;
const closingTimerStartAfterMS = 60000;

const csvFile = document.getElementById("inputGroupFile01");
const fileChoosen = document.getElementById("FileChoosen");
const btnOpenUrls = document.getElementById("btnOpenUrls");
const txtUrlsOpened = document.getElementById("UrlsOpened");

let data;
let timer;
let closingTimer;
let openedTabs = [];

csvFile.addEventListener('change', function () {
    fileChoosen.textContent = csvFile.files[0].name;
});

btnOpenUrls.addEventListener('click', function () {
    btnOpenUrls.setAttribute('disabled', true);

    var fr = new FileReader();
    fr.onload = function () {
        data = fr.result;

        let lines = data.split('\n');
        let index = 1;

        timer = setInterval(function () {
            let values = lines[index].split(',');
            let tab = window.open(values[3], '_blank');
            openedTabs.push(tab);

            index++;
            txtUrlsOpened.value += values[3] + '\\\n';

            if (index > lines.length) {
                clearInterval(timer);
            }
        }, timerIntervalMS);

        setTimeout(() => {
            closingTimer = setInterval(() => {
                openedTabs[0].close();
                openedTabs.shift();

                if (openedTabs.length === 0) {
                    clearInterval(closingTimer);
                }

            }, timerIntervalMS);
        }, closingTimerStartAfterMS);
    }

    fr.readAsText(csvFile.files[0]);
});