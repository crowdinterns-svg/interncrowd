// ---------- Live Blog Views + Likes (Firebase Realtime Database) ----------
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhyA8pxUFyeeoU2vkdlakUsQYv339H2TY",
  authDomain: "intern-crowd-2ed57.firebaseapp.com",
  databaseURL: "https://intern-crowd-2ed57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intern-crowd-2ed57",
  storageBucket: "intern-crowd-2ed57.firebasestorage.app",
  messagingSenderId: "978737778446",
  appId: "1:978737778446:web:ea6000c84cbc08fed0d15f",
  measurementId: "G-J45L3QT1N6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

function getSlug() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return file.replace(/\.html$/i, "") || "home";
}

function formatNum(n) {
  n = n || 0;
  if (n >= 100000) return (n / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function initEngagement() {
  const slug = getSlug();
  const viewsEls = document.querySelectorAll("[data-views-num]");
  const likesEls = document.querySelectorAll("[data-likes-num]");
  const likeBtns = document.querySelectorAll("[data-like-btn]");

  if (!viewsEls.length && !likesEls.length && !likeBtns.length) return;

  const viewedKey = "ic_viewed_" + slug;
  const likedKey = "ic_liked_" + slug;

  // Count one real view per browser session (avoids inflating on refresh/back-forward)
  if (!sessionStorage.getItem(viewedKey)) {
    sessionStorage.setItem(viewedKey, "1");
    runTransaction(ref(db, "blogStats/" + slug + "/views"), (cur) => (cur || 0) + 1).catch(() => {});
  }

  // Live listener — updates instantly for every visitor currently on the page
  onValue(ref(db, "blogStats/" + slug), (snap) => {
    const data = snap.val() || {};
    const v = formatNum(data.views);
    const l = formatNum(data.likes);
    viewsEls.forEach((el) => (el.textContent = v));
    likesEls.forEach((el) => (el.textContent = l));
  });

  likeBtns.forEach((btn) => {
    if (localStorage.getItem(likedKey) === "1") btn.classList.add("liked");

    btn.addEventListener("click", () => {
      const isLiked = localStorage.getItem(likedKey) === "1";
      const delta = isLiked ? -1 : 1;
      runTransaction(ref(db, "blogStats/" + slug + "/likes"), (cur) => Math.max(0, (cur || 0) + delta))
        .then(() => {
          if (isLiked) {
            localStorage.removeItem(likedKey);
            likeBtns.forEach((b) => b.classList.remove("liked"));
          } else {
            localStorage.setItem(likedKey, "1");
            likeBtns.forEach((b) => b.classList.add("liked"));
          }
        })
        .catch(() => {});
    });
  });
}

// ---------- Blog listing page (blog.html): show live views/likes per card ----------
function initListingCards() {
  const cards = document.querySelectorAll("[data-blog-slug]");
  if (!cards.length) return;
  cards.forEach((card) => {
    const slug = card.getAttribute("data-blog-slug");
    const vEl = card.querySelector("[data-views-num]");
    const lEl = card.querySelector("[data-likes-num]");
    if (!vEl && !lEl) return;
    onValue(ref(db, "blogStats/" + slug), (snap) => {
      const data = snap.val() || {};
      if (vEl) vEl.textContent = formatNum(data.views);
      if (lEl) lEl.textContent = formatNum(data.likes);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initEngagement();
    initListingCards();
  });
} else {
  initEngagement();
  initListingCards();
}
