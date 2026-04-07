// Shared nav, menu, footer injection
document.body.insertAdjacentHTML('afterbegin', `
<nav class="nav">
  <a href="index.html" class="brand"><img src="assets/logo.svg" alt="Green Root Concepts"></a>
  <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="menu" aria-hidden="true">
  <div class="menu-inner">
    <img src="assets/logo.svg" alt="" style="position:absolute;top:1.4rem;left:clamp(1.2rem,4vw,3rem);width:64px;opacity:.9">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About Dali</a></li>
      <li><a href="services.html">The Ecosystem</a></li>
      <li><a href="ethos.html">Ethos &amp; Impact</a></li>
      <li><a href="contact.html">Collaborate</a></li>
    </ul>
    <div class="menu-aside">
      <p class="eyebrow">Contact</p>
      <p>+1&nbsp;602&nbsp;999&nbsp;2566</p>
      <p>hello@greenrootconcepts.org</p>
      <p>www.greenrootconcepts.org</p>
    </div>
  </div>
</div>
`);
document.body.insertAdjacentHTML('beforeend', `
<footer>
  <span class="brand">Green Root Concepts</span>
  Food that heals &nbsp;·&nbsp; Land that thrives &nbsp;·&nbsp; By Dali Solene
</footer>
`);
