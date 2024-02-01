let x=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory =["stick"];
/*
replacement of : if else
if(x==1)
x++;
else
x--;
we can replace all of that with:
x==2 ? x++ : x--;*/ 
const button1=document.getElementById("button1");
const button2=document.getElementById("button2");
const button3=document.getElementById("button3");
const text=document.getElementById("text");
const xpText=document.getElementById("xpText");
const healthText=document.getElementById("healthText");
const goldText=document.getElementById("goldText");
const monsterStats=document.getElementById("monsterStats");
const monsterHealthText=document.getElementById("monsterHealthText");
const monsterNameText=document.getElementById("monsterNameText");

const weapons=[
    {//object 1
        name:"stick",
        power:10
    } ,
    {
        name:"dagger",
        power:30
    } ,
    {
        name:"claw hammer",
        power:50
    } ,
    {
        name:"swoard",
        power:100
    } ,
]
const monsters=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    },
    
]
const locations=[
 { //object 1
    name:"town square",
    "button text":["Go to store","Go to cave","Fight dragon"],
    "button function":[goStore,goCave,fightDragon],
    text:"you are in the town square, you see a sign that says \"Store\""
 }, 
 {
    name:"Store",
    "button text":["By 10 health (10 gold)","buy weapon(30 gold)","Go to town square"],
    "button function":[buyHealth,buyWeapon,goTown],
    text:"you enter the store"
 },
 {
    name:"cave",
    "button text":["Fight Slime","Fight fanged beast","Go to town square"],
    "button function":[fightSlime,fightBeast,goTown],
    text:"you enter the cave, you see some monsters"
 },
 {
    name:"fight",
    "button text":["attack","dodge","run"],
    "button function":[attack,dodge,goTown],
    text:"you enter the cave, you see some monsters"
 },
 {
    name:"kill monster",
    "button text":["go town square","go town square","go town square"],
    "button function":[goTown,goTown,goTown],
    text:"you killed a monster ,you gained xps and gold"
 },
 {
    name:"lose",
    "button text":["REPLAY","REPLAY","REPLAY"],
    "button function":[restart,restart,restart],
    text:"you died "
 },
 {
    name:"win",
    "button text":["REPLAY","REPLAY","REPLAY"],
    "button function":[restart,restart,restart],
    text:"you won the game "
 },
]

//initializing buttons
button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;
//{}  functions
function update(location){
    monsterStats.style.display="none";
    button1.innerHTML=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
  
    text.innerHTML=location.text;
    button1.onclick= location["button function"][0];
    button2.onclick= location["button function"][1];
    button3.onclick= location["button function"][2];
} 

function goTown(){
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}

//{} 
function buyHealth(){
    if(gold>=10){
        gold-=10;
        health+=10;  
        goldText.innerHTML=gold;
        healthText.innerHTML=health;
    }
    else {
        text.innerHTML="You don't have enough gold to buy health";
    } 
   
  }
  function buyWeapon(){
    if(currentWeapon< weapons.length-1){ 
    if(gold>=30){
        gold-=30; 
        currentWeapon++;
        goldText.innerHTML=gold;
        let newWeapon=weapons[currentWeapon].name;
        text.innerHTML="you just bought "+newWeapon+".";
        //inventory hiya lmekhzen d weapons kula sla7 kaytshra kaytzad b smiytou temma
        inventory.push(newWeapon);
        text.innerHTML+="In your inventory you have "+inventory;
    } 
    else{
        text.innerHTML="You don't have enough gold";
    }
    
}
    else{
        text.innerHTML="You already have the most powerful weapon";
        button2.innerHTML="Sell weapon for 15 gold";
        button2.onclick=sellWeapon;
} 

    
  }
  function sellWeapon(){
    if(inventory.length>1)//khas ikun endu ktar men sla7 li ybi3
        {
          gold+=15;
          goldText.innerHTML= gold;//affichage gold
          let currentWeapon=inventory.shift(); //let west if kayweli dak lvar khas ghe b dik if la bedelnah aytbedel ghe west l if mashy globalement  
          //shift kat7eyed awel elt men tableau inventory w at7etou f currentWeapon
          text.innerHTML="you sold an "+currentWeapon+".";
        }
        else  {
            text.innerHTML="You only have one weapon"
        }
   
  }

  function fightSlime(){
     fighting=0;
     goFight();
   
  }
  function fightBeast(){
    fighting=1;
    goFight();
 
  }
  function fightDragon() {
    fighting=2;
    goFight();
    
  }
  function goFight(){
//jme3na feha algo li ghaytwead f kula fight w 3eyetnaleha f kula fight
    update(locations[3]);
    monsterHealth=monsters[fighting].health;//health d kula monster
    monsterStats.style.display="block";
    monsterNameText.inn=monsters[fighting].name;
    monsterHealthText.innerHTML=monsterHealth;
  }
  function attack(){
    text.innerHTML="the "+monsters[fighting].name+" is attacking ";
    text.innerHTML+="you attack it with your "+weapons[currentWeapon].name+".";
    health-=monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power +Math.floor(Math.random() *xp) +1;
    healthText.innerHTML=health;
    monsterHealth.innerHTML=monsterHealth;
    if(health<=0)
        {
            lose();
        } 
        else if(monsterHealth<=0)
        {//fighting 002 zeama you defeated a dragon donc hua akher w aw3er wa7ed donc rbe7ty l game
            fighting==2 ? winGame():defeatMonster;
        }   


  } //{} 
  function dodge(){
    text.innerHTML="you dodged the attack from "+monsters[fighting].name+".";
  }
  function defeatMonster()
  {
    gold+=Math.floor(monsters[fighting].level *6.7);
    xp+=monsters[fighting].level;
    xpText.innerHTML=xp;
    update(locations[4]);
  }
  function lose()
  {
    update(locations[5]);
  } 
  function restart()
  {//reintialiser data et restart from town again
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory="stick"
    goldText.innerHTML=gold;
    xpText.innerHTML=xp;
    healthText.innerHTML=health;
    goTown();
  } 
  function winGame()
  {
    update(locations[6]);
  } 
  
  //{} 
  