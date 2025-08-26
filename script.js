// Treino atualizado por Emilly Fernandes
const TRAINING = {
  'Segunda':[ 'Cadeira extensora - 3x15','Agachamento livre - 4x12','Leg press articulado - 4x12','Passada - 5 series','Extensora - 3x10' ],
  'Terça':[ 'Desenvolvimento - 3x12','Elevação lateral com halter - 3x12','Crucifixo invertido - 3x12','Triceps pulley corda - 3x12','Triceps francês - 3x12' ],
  'Quarta':[ 'Mesa flexora - 3x12','Stiff com halteres - 3x12','Elevação pélvica - 3x12','Flexora em pé - 3x12','Cadeira abdutora - 3x12','Panturrilha máquina - 3x20' ],
  'Quinta':[ 'Remada alta - 3x12','Remada máquina - 3x12','Pull down - 3x12','Crucifixo inverso - 3x12','Rosca alternada - 3x10' ],
  'Sexta':[ 'Agachamento livre - 3x15','Extensão de quadril na polia - 3x12','Elevação pélvica - 3x12','Agachamento no smith - 3x12','Passada - 5 series' ]
};

// Gerenciamento de progresso por semana
const today = new Date();
const weekNumber = getWeekNumber(today);
const weekKey = 'week_'+weekNumber;
let weekData = JSON.parse(localStorage.getItem(weekKey)) || {};

function getWeekNumber(d) {
  const onejan = new Date(d.getFullYear(),0,1);
  return Math.ceil((((d - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function loadExercises(day){
  const container = document.getElementById('exercises');
  container.innerHTML='';
  let doneCount=0;
  TRAINING[day].forEach(ex=>{
    const key=day+'_'+ex;
    const checked = weekData[key] && weekData[key].done;
    if(checked) doneCount++;
    const div=document.createElement('div');
    div.className='exercise';
    div.innerHTML=`<span>${ex}</span><button onclick="toggle('${day}','${ex}',this)">${checked?'✔':'Marcar'}</button>`;
    container.appendChild(div);
  });
  updateStats(doneCount, TRAINING[day].length);
  loadReport();
}

function toggle(day, ex, btn){
  const key=day+'_'+ex;
  const timestamp = new Date();
  if(weekData[key] && weekData[key].done){
    delete weekData[key];
    btn.textContent='Marcar';
  } else {
    weekData[key] = {done:true, date: timestamp.toLocaleString()};
    btn.textContent='✔';
  }
  localStorage.setItem(weekKey, JSON.stringify(weekData));
  loadExercises(document.getElementById('daySelect').value);
}

function updateStats(done,total){
  const stats = document.getElementById('stats');
  stats.textContent=`Exercícios concluídos hoje: ${done} / ${total}`;
}

function loadReport(){
  const reportArea = document.getElementById('reportArea');
  reportArea.innerHTML='';
  for(const key in weekData){
    if(weekData[key].done){
      const [day, exName] = key.split('_');
      reportArea.innerHTML+=`<div>${day} • ${exName} • ${weekData[key].date}</div>`;
    }
  }
}

document.getElementById('daySelect').addEventListener('change',(e)=>{
  loadExercises(e.target.value);
});

loadExercises('Segunda');

// ---------- Partículas Laranjas Subindo ----------
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*4+1,
    speed: Math.random()*1+0.5,
    opacity: Math.random()*0.5+0.3
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,165,0,${p.opacity})`;
    ctx.fill();
    p.y -= p.speed;
    if(p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
