// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const ipc = require('electron').ipcRenderer
const shell = require('electron').shell
const exLinksBtn = document.getElementById('open-ex-links');
const os = require('os')
const fileManagerBtn = document.getElementById('open-file-manager')
const appInfoBtn = document.getElementById('app-info')

appInfoBtn.addEventListener('click', function () {
  ipc.send('get-app-path');
});

exLinksBtn.addEventListener('click', function (event) {
  shell.openExternal('http://google.com');
  console.log('clicked');
});

ipc.on('got-app-path', function (event, path) {
  const message = `This app is located at: ${path}`
  document.getElementById('path').value = path
});

fileManagerBtn.addEventListener('click', function (event) {
  shell.showItemInFolder(os.homedir())
})




