document.documentElement.classList.add('js-ready');
// Reveal credentials and experience only as they enter view; honor reduced-motion preferences.
const revealItems = document.querySelectorAll('.experience,.credential-card,.achievement-card,.skill-group,.degree');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach(item => item.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: 0.14 });
  revealItems.forEach(item => observer.observe(item));
}
// Resume-based portfolio copilot. It answers locally from curated resume facts; no external AI/API is used.
const copilot = document.getElementById('copilot');
const launch = document.getElementById('copilot-launch');
const close = document.getElementById('copilot-close');
const panel = document.getElementById('copilot-panel');
const form = document.getElementById('copilot-form');
const input = document.getElementById('copilot-input');
const messages = document.getElementById('copilot-messages');
function openCopilot() { copilot.classList.add('open'); panel.setAttribute('aria-hidden','false'); input.focus(); }
launch.addEventListener('click', openCopilot);
close.addEventListener('click', () => { copilot.classList.remove('open'); panel.setAttribute('aria-hidden','true'); launch.focus(); });
function answerFor(question) {
  const q = question.toLowerCase();
  if (/market|social|campaign|client|marketing|digital/.test(q)) return 'Yaswanth worked full-time as a Digital Marketing Developer / Associate at PR Growth Marketing Pvt Ltd (Dec 2021–Dec 2023), coordinating social campaigns, promotional content, client communication, recruitment support, and business administration. He also completed a Digital Marketing internship at LaunchPad LLC (May–Jul 2023), supporting social content, market research, and competitor analysis.';
  if (/certif|course|training|learn/.test(q)) return 'Certifications: Python Programming (Alison / Simplilearn); Linux Unhatched (Cisco Networking Academy); Object-Oriented JavaScript (Mindluster); Generative AI & Productivity Tools (BE10X); Strategic Leadership Workshop (Cavalier India); Digital Marketing Internship Certification (InternMe); Certified Career Counselor (GuideXpert).';
  if (/achiev|award|karate|nda|elocution|olympiad|medal/.test(q)) return 'Achievements include a gold medal and 1st place at the 2nd AP State Open Karate Tournament; 1st rank in National Voters’ Day Elocution; 3rd rank in a State-Level GK Olympiad; 1st rank in college elocution; and qualifying for the NDA examination on the first attempt.';
  if (/educat|degree|college|study|cgpa|school/.test(q)) return 'Yaswanth earned a B.Sc. in Mathematics, Statistics & Computer Science in 2024 with a 9.63/10 CGPA from Government College (Autonomous), Adikavi Nannaya University. He completed Intermediate MPC at Sri Sai Bharathi Junior College (966/1000, 2021) and SSC at Sri Sadguru Vidyalayam (10/10 GPA, 2019).';
  if (/intern|flight|mern|smartbridge|launchpad/.test(q)) return 'Internships: MERN Stack Developer Intern at SmartBridge (Nov 2023–Apr 2024), working on a flight booking application with React, Node.js, MongoDB, and REST APIs; and Campus Training & Digital Marketing Intern at LaunchPad LLC (May–Jul 2023), supporting campaigns, social content, market research, and competitor analysis.';
  if (/ai|llm|outlier|snorkel|code|evaluator|telus|language|telugu/.test(q)) return 'Yaswanth has evaluated AI responses, prompts, English–Telugu translations, and multilingual datasets at Outlier AI. At TELUS Digital AI he rated internet ads and search relevance. At Snorkel AI he reviewed C# code for logic, functional correctness, edge cases, and task compliance.';
  if (/skill|technology|program|code|technical/.test(q)) return 'Skills include AI/LLM and prompt evaluation, English–Telugu linguistic review, data annotation and validation, digital marketing, C#, Python, JavaScript, Java, C++, SQL, React, Node.js, MongoDB, and REST APIs.';
  if (/contact|email|phone|linkedin|reach/.test(q)) return 'You can contact Yaswanth at yash132578@gmail.com, call +91 80740 80955, or use the LinkedIn link in the Contact section below.';
  if (/experience|work|career|operation|census|election|exam/.test(q)) return 'His experience includes AI code evaluation (Snorkel AI), ad quality rating (TELUS Digital AI), LLM evaluation and annotation (Outlier AI), census enumeration, electoral-roll revision support, exam and placement operations coordination, and digital marketing at PR Growth Marketing. Scroll through Experience for role details.';
  return 'I can answer about Yaswanth’s digital marketing, AI/LLM evaluation, internships, education, certifications, achievements, technical skills, operations, or contact details. Try asking about one of those topics.';
}
function addMessage(text,kind) { const bubble=document.createElement('div'); bubble.className=kind==='user'?'user-message':'bot-message'; bubble.textContent=text; messages.appendChild(bubble); messages.scrollTop=messages.scrollHeight; }
function ask(q) { const clean=q.trim(); if(!clean)return; messages.querySelector('.suggestions')?.remove(); addMessage(clean,'user'); input.value=''; window.setTimeout(()=>addMessage(answerFor(clean),'bot'),260); }
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value);});
messages.addEventListener('click',e=>{if(e.target.matches('.suggestions button'))ask(e.target.textContent);});
