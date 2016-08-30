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
  document.getElementById('path').value = path;
  
});

fileManagerBtn.addEventListener('click', function (event) {
  shell.showItemInFolder(os.homedir())
  shell.beep()
});

const holder = document.getElementById('holder')
  holder.ondragover = () => {
    return false;
  }
  holder.ondragleave = holder.ondragend = () => {
    return false;
  }
  holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
      document.getElementById('path').value = f.path;
      document.getElementById('output').innerHTML +=  ` <br> Looked up file: ${f.path}` + "\n"
    }
    return false;
  }

const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', function (event) {
  ipc.send('print-to-pdf')
})

ipc.on('wrote-pdf', function (event, path) {
  const message = `\n` +`Wrote PDF to: ${path}`
  document.getElementById('output').innerHTML += "<br>" +  message + "\n"
})
