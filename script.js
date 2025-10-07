
const nameInput = document.getElementById('name');
const go = document.getElementById('go');
const consoleEl = document.getElementById('console');
const inputArea = document.getElementById('input-area');
const countdownEl = document.getElementById('countdown');
const beep = document.getElementById('discordBeep');

const profiles = [
  { name: 'Count Blushula 🦇', avatar: 'images/count.png',
    lines: ['I vant to suck your… attention.', 'I’m looking for someone who enjoys long walks in the crypt and eternal commitment.'],
    choices: ['That’s a bit much.', 'Do you sparkle?'],
    end: 'He blushes, turns into a bat, and flies off embarrassed! 🦇💨' },
  { name: 'Sad Victorian Ghost ☁️', avatar: 'images/cute-ghost-on-dark.jpg',
    lines: ['I wrote you 300 letters, but they all burned in my death fire.'],
    choices: ['That’s sweet?', 'You need therapy.'],
    end: 'She sighs and vanishes into her locket... 💔' },
  { name: 'Tech Bro Phantom 💻', avatar: 'images/techbro.jpg',
    lines: ['Hey, you up? I haunt co-working spaces.', 'I do crypto. But like… the actual crypt kind.'],
    choices: ['I’m logging off.', 'Give me some Bitcoin!'],
    end: 'Connection lost. 👻📱' }
];

go.addEventListener('click', handleSummon);
nameInput.addEventListener('keydown', e => { if(e.key==='Enter') handleSummon(); });

function playBeep(){ beep.currentTime = 0; beep.play(); }

function handleSummon(){
  const name = nameInput.value.trim() || 'Beautiful Stranger';
  inputArea.style.display = 'none';
  consoleEl.textContent = `Ah, ${name}... what a lovely name! 💖`;
  setTimeout(()=>{ consoleEl.textContent += '\nSearching for matches in your local graveyard... 🪦'; },1200);
  setTimeout(()=>startAct2(),3000);
}

// ---------------- ACT 2 ----------------
let current=0;
function startAct2(){ showProfile(); }

function showProfile(){
  if(current>=profiles.length){ consoleEl.textContent='You survived BooTender... for now. 💀'; setTimeout(()=>startAct3(),2000); return; }
  const p=profiles[current];
  consoleEl.innerHTML=`<strong>${p.name}</strong><br>`;
  let lineIndex=0;

  function showNextLine(){
    if(lineIndex<p.lines.length){
      chat(p.lines[lineIndex], p.avatar);
      lineIndex++;
      setTimeout(showNextLine,3500);
    } else {
      p.choices.forEach(choice=>{
        const btn=document.createElement('button');
        btn.textContent=choice;
        btn.onclick=()=>{
          consoleEl.innerHTML='';
          chat(p.end,p.avatar);
          setTimeout(()=>{ current++; showProfile(); },2500);
        };
        consoleEl.appendChild(btn);
      });
    }
  }

  setTimeout(showNextLine,2000);
}

// ---------------- ACT 3 ----------------
function startAct3(){
  consoleEl.innerHTML='';
  typeLine('Error: living user detected.',0);
  setTimeout(()=>typeLine('Wait... there’s another heartbeat in the chatroom.',1),2000);
  setTimeout(()=>startAct4(),4000);
}

// ---------------- ACT 4 ----------------
function startAct4(){
  consoleEl.innerHTML='';
  chat('Hey, it’s me. Guess I wandered in here by accident.','images/me.jpg');
  setTimeout(()=>chat('This place is full of ghosts, but you’re the only thing that feels real.','images/me.jpg'),1500);
  setTimeout(()=>{
    const a=document.createElement('button'); a.textContent='You’re alive??';
    const b=document.createElement('button'); b.textContent='Prove it.';
    [a,b].forEach(btn=>{ btn.onclick=()=>act4response(); consoleEl.appendChild(btn); });
  },3000);
}

function act4response(){
  consoleEl.innerHTML='';
  chat('How about this... meet me at Marienplatz 10:30 AM on October 18th. I’ll be there.','images/me.jpg');
  setTimeout(()=>chat('Until then... don’t get ghosted. ❤️','images/me.jpg'),2000);
  setTimeout(()=>startCountdown(),4000);
}

// ---------------- ACT 5 ----------------
function startCountdown(){
  countdownEl.style.display='block';
  const halloween=new Date('2025-10-18T10:30:00');
  const interval=setInterval(()=>{
    const now=new Date(); const diff=halloween-now;
    if(diff<=0){clearInterval(interval); showAfterHalloween(); return;}
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff/(1000*60*60))%24);
    const m=Math.floor((diff/(1000*60))%60);
    countdownEl.textContent=`${d} days, ${h} hours, ${m} minutes 🎃`;
  },1000);
}

function showAfterHalloween(){
  consoleEl.innerHTML='';
  chat('Boo! Told you I’d be here. 💕','images/me.jpg');
  countdownEl.textContent='';
}

// helpers
function chat(msg, avatarUrl){
  const container=document.createElement('div');
  container.style.display='flex';
  container.style.alignItems='flex-start';
  container.style.marginBottom='6px';

  const img=document.createElement('img');
  img.src=avatarUrl||'';
  img.style.width='40px';
  img.style.height='40px';
  img.style.borderRadius='50%';
  img.style.marginRight='8px';

  const div=document.createElement('div');
  div.className='chat them';
  div.textContent=msg;

  container.appendChild(img);
  container.appendChild(div);
  consoleEl.appendChild(container);
  playBeep();
  consoleEl.scrollTop=consoleEl.scrollHeight;
}

function typeLine(text, delay){
  setTimeout(()=>{
    const line=document.createElement('div');
    line.textContent=text;
    consoleEl.appendChild(line);
    playBeep();
  }, delay*1000);
}
