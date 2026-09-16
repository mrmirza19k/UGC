const brands = [
  {name:"Parakeet AI", type:"Content Created For"},
  {name:"RoboApply Jobs", type:"Campaign Manager & Content Creator"},
  {name:"Envarson AI", type:"Content Created For"},
  {name:"10x", type:"Content Created For"},
  {name:"PremyFrench", type:"Content Created For"},
  {name:"Higgsfield AI", type:"Content Created For"},
  {name:"Content Rewards", type:"Creator Program"},
  {name:"LockedIn AI", type:"Content Created For"},
  {name:"Acadly AI", type:"Content Created For"},
  {name:"Job Steps", type:"Content Created For"},
];

const projects = [
  {brand:"Parakeet AI", type:"AI", platform:"Instagram", desc:"Short-form product walkthrough with a fast hook.", result:"6.3M+ views", tag:"AI", video:"videos/para6.3.mp4"},
  {brand:"Parakeet AI", type:"SaaS", platform:"Instagram", desc:"Short-form product walkthrough with a fast hook.", result:"623k+ views", tag:"SaaS", video:"videos/para623k.mp4"},
  {brand:"RoboApply Jobs", type:"Career", platform:"Instagram", desc:"AI interview-prep product content aimed at job seekers.", result:"", tag:"Career", video:"videos/robo1.mp4"},
  {brand:"RoboApply Jobs", type:"UGC", platform:"Instagram", desc:"UGC-style testimonial around the job-application product.", result:"", tag:"UGC", video:"videos/robo2.mp4"},
  {brand:"Envarson AI", type:"AI", platform:"YouTube Shorts", desc:"Product demo for an AI technology brand.", result:"", tag:"AI", video:"videos/env1.mp4"},
  {brand:"10x", type:"SaaS", platform:"YouTube Shorts", desc:"Feature-focused short-form content.", result:"", tag:"SaaS", video:"videos/video3.mp4"},
  {brand:"LockedIn AI", type:"Career", platform:"Instagram", desc:"Product-focused content for an AI career-tech tool.", result:"", tag:"Career", video:"videos/lock1.mp4"},
  {brand:"Acadly AI", type:"Product", platform:"YouTube Shorts", desc:"Edtech product content explaining core features.", result:"", tag:"Product", video:"videos/video1.mp4"},
  {brand:"Job Steps", type:"Career", platform:"Instagram", desc:"Career-content series built around job-seeker pain points.", result:"", tag:"Career", video:"videos/job1.mp4"},
];

const process = [
  {n:"01", t:"Research", d:"Understand the brand, audience, product, and competitors."},
  {n:"02", t:"Idea", d:"Find a relatable problem or content angle."},
  {n:"03", t:"Hook", d:"Create a strong opening designed to stop scrolling."},
  {n:"04", t:"Script", d:"Build a concise and natural story."},
  {n:"05", t:"Shoot", d:"Create talking-head or UGC content."},
  {n:"06", t:"Edit", d:"Improve pacing, captions, visuals, and retention."},
  {n:"07", t:"Publish", d:"Optimize format, caption, CTA, and platform."},
  {n:"08", t:"Analyze", d:"Review performance and improve future content."},
];

document.getElementById('brandGrid').innerHTML = brands.map(b => `
  <div class="brand-card" onclick="document.getElementById('work').scrollIntoView({behavior:'smooth'})">
    <div class="bname">${b.name}</div>
    <div class="btype">${b.type}</div>
  </div>`).join('');

const cats = ["All","UGC","Talking Head","AI","SaaS","Career","Product","Brand Campaigns"];
document.getElementById('filterRow').innerHTML = cats.map((c,i) => `
  <button class="filter-btn ${i===0?'active':''}" data-cat="${c}" onclick="filterWork('${c}', this)">${c}</button>`).join('');

function renderWork(filter){
  const grid = document.getElementById('workGrid');
  const list = filter==="All" ? projects : projects.filter(p=>p.tag===filter);
  grid.innerHTML = list.map((p,i) => `
    <div class="work-card" onclick='openModal(${JSON.stringify(p).replace(/'/g,"&apos;")})'>
      <div class="thumb">
        <span class="platform-tag">${p.platform}</span>
        <video src="${p.video}" muted playsinline loop></video>
        <button class="play" onclick="event.stopPropagation(); toggleInlineVideo(this)">▶</button>
      </div>
      <div class="work-body">
        <div class="wbrand">${p.brand}</div>
        <div class="wdesc">${p.desc}</div>
        ${p.result ? `<div class="wresult">${p.result}</div>` : ''}
      </div>
    </div>`).join('');
}
function filterWork(cat, el){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderWork(cat);
}
renderWork("All");

document.getElementById('processRow').innerHTML = process.map(s => `
  <div class="proc-step">
    <div class="pn">${s.n}</div>
    <h4>${s.t}</h4>
    <p>${s.d}</p>
  </div>`).join('');

// Shared play/pause toggle used by the hero reels, case-study clips,
// work-grid thumbnails, and the modal preview. Expects the <video>
// to sit immediately before the <button class="play"> in the markup.
function toggleInlineVideo(btn){
  const video = btn.previousElementSibling;
  if(!video || video.tagName !== 'VIDEO') return;
  if(video.paused){
    video.play();
    btn.classList.add('playing');
  } else {
    video.pause();
    btn.classList.remove('playing');
  }
}

function openModal(p){
  document.getElementById('mTitle').textContent = p.brand;
  document.getElementById('mMeta').textContent = `${p.type} · ${p.platform}`;
  document.getElementById('mResult').textContent = p.result || '';

  const mVideo = document.getElementById('mVideo');
  const mPlayBtn = document.getElementById('mPlayBtn');
  mVideo.pause();
  mVideo.currentTime = 0;
  mVideo.src = p.video || 'videos/example-video.mp4';
  mPlayBtn.classList.remove('playing');

  document.getElementById('modal').classList.add('open');
}
function closeModal(){
  document.getElementById('modal').classList.remove('open');
  const mVideo = document.getElementById('mVideo');
  mVideo.pause();
  document.getElementById('mPlayBtn').classList.remove('playing');
}
document.getElementById('modal').addEventListener('click', e => { if(e.target.id==='modal') closeModal(); });
