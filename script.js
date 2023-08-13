
let leads=[];
const inputEL=document.getElementById('input-el');
const inputBtn=document.getElementById('save-btn');
const ulEl=document.getElementById('ul-el');

let deleteb=document.getElementById("delbtn");
let savtab=document.getElementById("savtab");

//--------------------------------------For prestored values---------------------
const leadsfromlocalstorage=JSON.parse(localStorage.getItem("leads"));
if(leadsfromlocalstorage){
leads=leadsfromlocalstorage;
render(leads);
}

// -------------------------------Save input buttton function-----------------------
inputBtn.addEventListener("click", function(){
   leads.push(inputEL.value);
   inputEL.value="";
  localStorage.setItem("leads", JSON.stringify(leads));

   render(leads);
})


// ------------------------------Delete button function---------------------
deleteb.addEventListener("dblclick",function(){
    localStorage.clear();
    leads=[];
    render(leads);
    
})

// --------------------------------Save tab button function----------------------
savtab.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leads.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(leads));
        render(leads);
    })
    })





// --------------------------------main render function------------------------------
function render(aray){
    let listItems="";

for(let i=0;i<aray.length;i++){
   listItems += `<li>
                    <a target='_blank' href='${aray[i]}'> ${aray[i]} </a>
                </li>`;
}

ulEl.innerHTML=listItems;
}