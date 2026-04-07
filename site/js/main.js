// Menu
const burger = document.querySelector('.burger');
const body = document.body;
burger?.addEventListener('click', () => body.classList.toggle('menu-open'));
document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => body.classList.remove('menu-open')));

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Ripple click effect on any .ripple element
document.addEventListener('click', e => {
  const t = e.target.closest('.ripple');
  if (!t) return;
  const r = document.createElement('span');
  const rect = t.getBoundingClientRect();
  r.className = 'ripple-dot';
  r.style.cssText = `position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;transform:translate(-50%,-50%);pointer-events:none;animation:rpl .9s ease-out forwards`;
  t.appendChild(r);
  setTimeout(() => r.remove(), 900);
});
const st = document.createElement('style');
st.textContent = '@keyframes rpl{to{width:420px;height:420px;opacity:0}}';
document.head.appendChild(st);

// Three.js floating particles hero (if canvas present)
(function initParticles(){
  const host = document.getElementById('particles');
  if (!host || !window.THREE) return;
  const w = host.clientWidth, h = host.clientHeight;
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize(w,h); renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, w/h, .1, 100);
  cam.position.z = 6;
  const N = 260;
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(N*3), vel = new Float32Array(N);
  for (let i=0;i<N;i++){
    pos[i*3]=(Math.random()-.5)*12;
    pos[i*3+1]=(Math.random()-.5)*10;
    pos[i*3+2]=(Math.random()-.5)*6;
    vel[i]=.002+Math.random()*.005;
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const m = new THREE.PointsMaterial({color:0xe8e5d8, size:.035, transparent:true, opacity:.75});
  const pts = new THREE.Points(g,m);
  scene.add(pts);
  let mx=0,my=0;
  host.addEventListener('pointermove', e=>{
    const r = host.getBoundingClientRect();
    mx = ((e.clientX-r.left)/r.width-.5)*.5;
    my = ((e.clientY-r.top)/r.height-.5)*.5;
  });
  function tick(){
    const p = g.attributes.position.array;
    for (let i=0;i<N;i++){
      p[i*3+1]+=vel[i];
      if (p[i*3+1]>5) p[i*3+1]=-5;
    }
    g.attributes.position.needsUpdate=true;
    pts.rotation.y += (mx-pts.rotation.y)*.03;
    pts.rotation.x += (my-pts.rotation.x)*.03;
    renderer.render(scene,cam);
    requestAnimationFrame(tick);
  }
  tick();
  addEventListener('resize', ()=>{
    const W=host.clientWidth,H=host.clientHeight;
    cam.aspect=W/H; cam.updateProjectionMatrix(); renderer.setSize(W,H);
  });
})();
