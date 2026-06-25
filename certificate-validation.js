import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhyA8pxUFyeeoU2vkdlakUsQYv339H2TY",
  authDomain: "intern-crowd-2ed57.firebaseapp.com",
  projectId: "intern-crowd-2ed57",
  storageBucket: "intern-crowd-2ed57.firebasestorage.app",
  messagingSenderId: "978737778446",
  appId: "1:978737778446:web:ea6000c84cbc08fed0d15f",
  measurementId: "G-J45L3QT1N6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  (function(){
    var input = document.getElementById('cert-id-input');
    var btn = document.getElementById('verify-btn');
    var resultArea = document.getElementById('cert-result-area');
    if(!input || !btn || !resultArea) return;

    function escapeHtml(str){
      return String(str).replace(/[&<>"']/g, function(c){
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
      });
    }
    function render(html){
      resultArea.innerHTML = html;
      resultArea.classList.add('show');
    }
    function showNotFound(query){
      render(
        '<div class="status-msg not-found">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
          '<div><h3>Certificate not found</h3>' +
          '<p>We could not find any record for <strong>' + escapeHtml(query) + '</strong>. Please double-check the Certificate ID and try again.</p></div>' +
        '</div>'
      );
    }
    function showPending(user){
      render(
        '<div class="status-msg pending">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '<div><h3>Certificate not yet issued</h3>' +
          '<p><strong>' + escapeHtml(user.name) + '</strong>\'s certificate for <strong>' + escapeHtml(user.domain) + '</strong> is still in progress and has not been issued yet.</p></div>' +
        '</div>'
      );
    }
    function showCertificate(user){
      render(
        '<div class="cert-card">' +
          '<div class="cert-verified-banner">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>' +
            'Verified — This is a genuine Intern Crowd certificate' +
          '</div>' +
          '<div class="cert-body">' +
            '<div class="cert-logo">INTERN CROWD</div>' +
            '<p>Dear <strong>' + escapeHtml(user.name) + '</strong>,</p>' +
            '<p>On behalf of Intern Crowd, I am pleased to certify that you have successfully completed the <strong>' + escapeHtml(user.domain) + '</strong> internship task. Your hard work and dedication to the project have been evident, and we are confident in your abilities as a valuable member of our team.</p>' +
            '<div class="cert-meta">' +
              '<div class="cert-meta-item"><div class="label">Certificate ID</div><div class="value">' + escapeHtml(user.user_id) + '</div></div>' +
              '<div class="cert-meta-item"><div class="label">Domain</div><div class="value">' + escapeHtml(user.domain) + '</div></div>' +
              '<div class="cert-meta-item"><div class="label">Enrolled On</div><div class="value">' + escapeHtml(user.enrolled_date || '\u2014') + '</div></div>' +
              '<div class="cert-meta-item"><div class="label">Certificate Issued</div><div class="value">' + escapeHtml(user.certificate_issued_date || '\u2014') + '</div></div>' +
            '</div>' +
            '<div class="cert-sincerely">' +
              '<h6>Sincerely,</h6>' +
              '<p class="name">Prachi Patil</p>' +
              '<p class="designation">Co-founder &amp; CEO</p>' +
              '<p class="company">Intern Crowd</p>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }
   
async function doVerify() {

    var query = input.value || '';

    if (!query.trim()) {
        input.focus();
        return;
    }

    const docRef = doc(db, "users", query.trim());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        showNotFound(query.trim());
        return;
    }

    const user = docSnap.data();

    if (user.status === "issued") {
        showCertificate(user);
    } else {
        showPending(user);
    }
}
    btn.addEventListener('click', doVerify);
    input.addEventListener('keydown', function(e){
      if(e.key === 'Enter') doVerify();
    });
  })();

  // Dark mode toggle
  (function(){
    var btn = document.getElementById('dark-mode-btn');
    var html = document.documentElement;
    if(localStorage.getItem('darkMode') === 'on') html.classList.add('dark');
    if(btn) {
      btn.addEventListener('click', function(){
        html.classList.toggle('dark');
        localStorage.setItem('darkMode', html.classList.contains('dark') ? 'on' : 'off');
      });
    }
  })();
