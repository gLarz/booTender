
const nameInput = document.getElementById('name');
const go = document.getElementById('go');
const consoleEl = document.getElementById('console');
const inputArea = document.getElementById('input-area');
const countdownEl = document.getElementById('countdown');


const profiles = [
  { name: 'Astarion 🦇', avatar: 'images/astarion-normal.png',
    audio:new Audio('audios/discord-notification.mp3'),
    lines: ['I vant to suck your… attention.', 'I’m looking for someone who enjoys long walks in the crypt and eternal commitment.'],
    choices: ['That’s a bit much.', 'Do you sparkle?'],
    end: 'Astarion blushes but his face turns into disgut, he turns away and dissapears💨' },
  { name: 'Daddy Micah', avatar: 'images/micah.png',
    audio:new Audio('audios/discord-notification.mp3'),
    lines: ['I wrote you 300 letters, but they all got holes from Dutch´s shots.'],
    choices: ['That’s sweet?', 'You need therapy.'],
    end: 'He sighs and bleeds to death 💔' },
  { name: 'Arthur Morgan', avatar: 'images/arthur.png',
    audio:new Audio('audios/lenny.mp3'),
    lines: ['AWW LEENNAAAY'],
    choices: ['LEEENNAAAY'],
    end: 'AWW LEENNAAAY' }
];

// playAudio audio
function playAudio(audio){
  if(audio){ audio.currentTime=0; audio.play().catch(err=>console.log('Audio blocked:',err)); }
}


// Act 4 Custom Audio
const act4Audio=new Audio('audio/grindr.mp3');

go.addEventListener('click', handleSummon);
nameInput.addEventListener('keydown', e => { if(e.key==='Enter') handleSummon(); });

function handleSummon() {
  const name = nameInput.value.trim() || 'Beautiful Stranger';
  inputArea.style.display='none';
  consoleEl.textContent = `Ah, ${name}... what a lovely name! 💖`;
  setTimeout(() => { consoleEl.textContent += '\nSearching for matches in your local graveyard... 🪦'; },1200);
  setTimeout(startAct2, 3000);
}

// ACT 2
let current = 0;
function startAct2(){ showProfile(); }

function showProfile(){
  if(current >= profiles.length){
    consoleEl.textContent='You survived BooTender... for now. 💀';
    setTimeout(startAct3, 2000);
    return;
  }
  const p = profiles[current];
  consoleEl.innerHTML = `<strong>${p.name}</strong><br>`;
  let lineIndex = 0;

  function showNextLine(){
    if(lineIndex < p.lines.length){
      chat(p.lines[lineIndex], p.avatar, p.audio);
      lineIndex++;
      setTimeout(showNextLine, 3500);
    } else {
      p.choices.forEach(choice=>{
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = ()=>{
          consoleEl.innerHTML='';
          chat(p.end, p.avatar, p.audio);
          setTimeout(()=>{ current++; showProfile(); }, 2500);
        };
        consoleEl.appendChild(btn);
      });
    }
  }
  setTimeout(showNextLine, 2000);
}

// ACT 3
function startAct3(){
  consoleEl.innerHTML='';
  typeLine('Error: living user detected.',0);
  setTimeout(()=>typeLine('Wait... there’s another heartbeat in the chatroom.',1),2000);
  setTimeout(startAct4, 4000);
}

// ACT 4
function startAct4(){
  consoleEl.innerHTML='';
  playAudio(act4Audio)
  chat('Hey, it’s me. Guess I wandered in here by accident.','images/me.jpg', act4Audio);
  setTimeout(()=>chat('This place is full of ghosts, but you’re the only thing that feels real.','images/me.jpg', act4Audio),1500);
  setTimeout(()=>{
    const a=document.createElement('button'); a.textContent='You’re alive??';
    const b=document.createElement('button'); b.textContent='Prove it.';
     [a,b].forEach(btn=>{ btn.onclick=()=>{ playAudio(act4Audio); act4response(); }; consoleEl.appendChild(btn); });
  },3000);
}

function act4response(){
  consoleEl.innerHTML='';
  chat('How about this... meet me at Marienplatz 10:30 AM on October 18th. I’ll be there.','images/me.jpg',act4Audio);
  setTimeout(()=>chat('Until then... don’t get ghosted. ❤️','images/me.jpg',act4Audio),2000);
  setTimeout(startCountdown,4000);
}

// ACT 5
function startCountdown(){
  countdownEl.style.display='block';
  const halloween = new Date('2025-10-18T10:30:00');
  const interval = setInterval(()=>{
    const now = new Date();
    const diff = halloween-now;
    if(diff<=0){clearInterval(interval); showAfterHalloween(); return;}
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff/(1000*60*60))%24);
    const m=Math.floor((diff/(1000*60))%60);
    countdownEl.textContent=`${d} days, ${h} hours, ${m} minutes 🎃`;
  },1000);
}

function showAfterHalloween(){
  consoleEl.innerHTML='';
  chat('Boo! Told you I’d be here. 💕','images/me.jpg', act4Audio);
  countdownEl.textContent='';
}

// Helpers
function chat(msg, avatarUrl, audio){
  const container = document.createElement('div');
  container.style.display='flex';
  container.style.alignItems='flex-start';
  container.style.marginBottom='6px';

  const img = document.createElement('img');
  img.src = avatarUrl || '';
  img.style.width='40px';
  img.style.height='40px';
  img.style.borderRadius='50%';
  img.style.marginRight='8px';

  const div = document.createElement('div');
  div.className='chat them';
  div.textContent = msg;

  container.appendChild(img);
  container.appendChild(div);
  consoleEl.appendChild(container);

  playAudio(audio);
  consoleEl.scrollTop=consoleEl.scrollHeight;
}

function typeLine(text, delay){
  setTimeout(()=>{
    const line = document.createElement('div');
    line.textContent=text;
    consoleEl.appendChild(line);
  }, delay*1000);
}

