// Buttons / UI
const acceptBtn = document.getElementById("acceptBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const card = document.querySelector(".card");

// Sounds
const hoverSound = document.getElementById("hoverSound");
const yesSound = document.getElementById("yesSound");

// Modal elements
const modal = document.getElementById("valentineModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBackdrop = document.querySelector(".modal-backdrop");

// ✅ EmailJS init
(function () {
  if (window.emailjs) {
    emailjs.init("wYJaqXN05jT1tFfhi"); // Public Key
  } else {
    console.warn("EmailJS SDK not loaded.");
  }
})();

// Move NO button on hover
noBtn.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});

  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = cardRect.width - btnRect.width - 10;
  const maxY = cardRect.height - btnRect.height - 10;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
});

// YES click
acceptBtn.addEventListener("click", () => {
  yesSound.play().catch(() => {});
  response.innerHTML = "Yay! I can't wait to see you ❤️✨";

  if (typeof confetti === "function") {
    confetti({ particleCount: 220, spread: 120, origin: { y: 0.65 } });
  }

  for (let i = 0; i < 12; i++) setTimeout(createHeart, i * 120);

  acceptBtn.disabled = true;
  noBtn.disabled = true;
  acceptBtn.style.opacity = "0.75";
  acceptBtn.style.cursor = "not-allowed";
  noBtn.style.opacity = "0.75";
  noBtn.style.cursor = "not-allowed";

  sendAcceptanceEmail();
  setTimeout(openModal, 400);
});

// Modal open/close
function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ✅ Email sending function (FIXED: uses `email` to match {{email}})
function sendAcceptanceEmail() {
  if (!window.emailjs) {
    response.innerHTML += "<br><small style='color:#b00020'>❌ EmailJS not loaded.</small>";
    return;
  }

function sendAcceptanceEmail() {
  const params = {
    email: "junry.jumawan4@gmail.com",  // MUST be "email"
    time: new Date().toLocaleString(),
    page_url: window.location.href,
    message: "Inah Cañete clicked YES 💖 — I’ll pick you up at 7:30 PM."
  };

  emailjs.send("service_zwkrk1s", "template_rc1snto", params)
    .then(() => console.log("✅ sent"))
    .catch((err) => console.log("❌", err));
}


  response.innerHTML += "<br><small>📩 Sending email...</small>";

  emailjs
    .send("service_zwkrk1s", "template_rc1snto", params)
    .then(() => {
      response.innerHTML += "<br><small style='color:green'>✅ Email sent to you!</small>";
    })
    .catch((err) => {
      console.error("❌ EmailJS failed:", err);
      response.innerHTML += `<br><small style="color:#b00020">❌ Email failed: ${err?.text || JSON.stringify(err)}</small>`;
    });
}

// Hearts
function createHeart() {
  const heart = document.createElement("img");
  heart.src = "hearts.png";
  heart.className = "floating-heart";

  const size = Math.random() * 20 + 20;
  const left = Math.random() * 100;
  const duration = Math.random() * 2 + 3;

  heart.style.left = left + "vw";
  heart.style.width = size + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(() => {
  if (!acceptBtn.disabled) createHeart();
}, 900);
