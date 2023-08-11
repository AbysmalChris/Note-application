
"use strict";
let list = [];

function sanitizeInput(input) {
    return input.replace(/<[^>]*>/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

function PostIt(title, content){
    this.title = title;
    this.content = content;
}

function create(notes){
    list.push(notes);
    const dummy = JSON.stringify(list);
    localStorage.setItem("mySpecific", dummy);
    display();
}

function note(){
    let title;
    let info;
    if(document.getElementById("header").value){
        title = sanitizeInput(document.getElementById("header").value);
    } else {
        title = "New note"
    }
    if(document.getElementById("info").value){
        info = sanitizeInput(document.getElementById("info").value);
    } else {
        info = "Empty"
    }
    let notes = new PostIt(title, info);
    create(notes);
}

function remove(index){
    list.splice(index, 1);
    const dummy = JSON.stringify(list);
    localStorage.setItem("mySpecific", dummy);
    display();
}

function display(){
    let cards = document.getElementById("notes");
    cards.setHTML("");

    const dummer = localStorage.getItem("mySpecific");
    if (dummer) {
        list = JSON.parse(dummer);
      }

    list.forEach((noted, index) => {
        let card = document.createElement("div");
        card.classList.add("notd");

        let title = document.createElement("h2");
        title.textContent = sanitizeInput(noted.title);
        
        let content = document.createElement("h3");
        content.textContent = sanitizeInput(noted.content);

        let removed = document.createElement("button");
        removed.textContent = "Clear note";
        removed.addEventListener("click", () => {
            remove(index);
        })

        card.appendChild(title);
        card.appendChild(content);
        card.appendChild(removed);

        cards.appendChild(card);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    display();
  });

