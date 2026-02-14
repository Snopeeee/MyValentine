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

  // Confetti
  if (typeof confetti === "function") {
    confetti({
      particleCount: 220,
      spread: 120,
      origin: { y: 0.65 },
    });
  }

  // Hearts burst
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 120);
  }

  // Disable buttons
  acceptBtn.disabled = true;
  noBtn.disabled = true;

  acceptBtn.style.opacity = "0.75";
  acceptBtn.style.cursor = "not-allowed";
  noBtn.style.opacity = "0.75";
  noBtn.style.cursor = "not-allowed";

  // ✅ Send email notification to you (with visible status)
  sendAcceptanceEmail();

  // Show popup
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

// ✅ Email sending function (with debug + UI status)
function sendAcceptanceEmail() {
  if (!window.emailjs) {
    response.innerHTML += "<br><small style='color:#b00020'>❌ EmailJS not loaded.</small>";
    return;
  }

  // Optional: include to_email if your template uses it
  const params = {
    // to_email: "junry.jumawan4@gmail.com",
    message:
      "Inah Cañete clicked YES 💖 — Be prepared, I’ll pick you up at 7:30 PM. Take your time. 🌷✨",
    time: new Date().toLocaleString(),
    page_url: window.location.href,
  };

  response.innerHTML += "<br><small>📩 Sending email...</small>";

  emailjs
    .send("service_q9ez7ed", "template_rc1snto", params)
    .then((res) => {
      console.log("✅ Email sent via EmailJS:", res);
      response.innerHTML += "<br><small style='color:green'>✅ Email sent to you!</small>";
    })
    .catch((err) => {
      console.error("❌ EmailJS failed:", err);
      response.innerHTML +=
        `<br><small style="color:#b00020">❌ Email failed: ${err?.text || JSON.stringify(err)}</small>`;
    });
}

// Hearts (uses your image file)
function createHeart() {
  const heart = document.createElement("img");

  // If your repo has hearts.png in ROOT:
  heart.src = "hearts.png";

  // If you move it to /images/heart.png, use:
  // heart.src = "images/heart.png";

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

// Optional: continuous soft hearts (only before accepting)
setInterval(() => {
  if (!acceptBtn.disabled) createHeart();
}, 900);
