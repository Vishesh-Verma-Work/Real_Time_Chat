// const { log } = require("console");

const socket = io('http://localhost:8000');

const from = document.getElementsByClassName('msz-from');
const mszInp = document.getElementsByClassName('msger-input')
const mszContainer = document.getElementsByClassName('container')

console.log("hi bhau");
const naam = prompt("Enter Your Name to Join : ");
socket.emit('new-user-join', naam);