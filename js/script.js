// Language Data
const translations = {
    vi: {
        title: "Xác Nhận Tham Dự",
        subtitle: "Vui lòng xác nhận sự hiện diện của bạn trước ngày 01/02/2026",
        name: "Tên của bạn",
        namePh: "Nhập tên của bạn...",
        phone: "Số điện thoại",
        guests: "Số lượng người đi cùng",
        attending: "Bạn sẽ tham dự chứ?",
        yes: "Có, chắc chắn rồi!",
        no: "Rất tiếc, mình bận mất rồi",
        wishes: "Lời nhắn gửi",
        wishesPh: "Gửi lời chúc đến Thành & Loan...",
        submit: "GỬI XÁC NHẬN",
        modalTitle: "Cảm ơn bạn!",
        modalMessage: "Cảm ơn lời chúc của bạn! Hẹn gặp bạn tại đám cưới.",
        modalClose: "Đóng"
    },
    en: {
        title: "RSVP",
        subtitle: "Please confirm your attendance before February 1st, 2026",
        name: "Your Name",
        namePh: "Enter your name...",
        phone: "Phone Number",
        guests: "Number of Guests",
        attending: "Will you attend?",
        yes: "Yes, I will be there!",
        no: "Sorry, I can't come",
        wishes: "Wishes",
        wishesPh: "Best wishes for the couple...",
        submit: "SEND RSVP",
        modalTitle: "Thank You!",
        modalMessage: "Thank you for your wishes! See you at the wedding.",
        modalClose: "Close"
    },
    zh: {
        title: "出席确认",
        subtitle: "请在2026年2月1日前确认您的出席",
        name: "您的姓名",
        namePh: "输入您的姓名...",
        phone: "电话号码",
        guests: "随行人数",
        attending: "您会参加吗？",
        yes: "是的，我会参加！",
        no: "抱歉，我无法参加",
        wishes: "祝福语",
        wishesPh: "给新人的祝福...",
        submit: "发送确认",
        modalTitle: "谢谢!",
        modalMessage: "谢谢你的祝福! 婚礼见。",
        modalClose: "关闭"
    }
};

let currentLang = 'vi';

function setLanguage(lang) {
    currentLang = lang;
    // Update Text
    const t = translations[lang];

    // Form Elements
    const elements = {
        'form-title': t.title,
        'form-subtitle': t.subtitle,
        'label-name': t.name,
        'label-phone': t.phone,
        'label-guests': t.guests,
        'label-attending': t.attending,
        'label-wishes': t.wishes,
        'btn-submit': t.submit,
        'modal-title': t.modalTitle,
        'modal-message': t.modalMessage,
        'modal-close': t.modalClose
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // Input Placeholders
    const inputs = {
        'name': t.namePh,
        'wishes': t.wishesPh
    };

    for (const [id, ph] of Object.entries(inputs)) {
        const el = document.getElementById(id);
        if (el) el.placeholder = ph;
    }

    // Radio Labels
    const radioYes = document.getElementById('opt-yes');
    if (radioYes) radioYes.textContent = t.yes;

    const radioNo = document.getElementById('opt-no');
    if (radioNo) radioNo.textContent = t.no;

    // Update Button Styles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('bg-wedding-red', 'text-white', 'border-transparent');
            btn.classList.remove('text-gray-700', 'border-gray-300');
        } else {
            btn.classList.remove('bg-wedding-red', 'text-white', 'border-transparent');
            btn.classList.add('text-gray-700', 'border-gray-300');
        }
    });
}

// Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Music Player
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

function updateMusicUI(playing) {
    isPlaying = playing;
    if (playing) {
        musicBtn.classList.add('animate-spin-slow');
        musicBtn.innerHTML = '<i class="fas fa-compact-disc text-xl"></i>';
    } else {
        musicBtn.classList.remove('animate-spin-slow');
        musicBtn.innerHTML = '<i class="fas fa-play text-xl"></i>';
    }
}

if (bgMusic && musicBtn) {
    // Event Listeners for UI Sync
    bgMusic.addEventListener('play', () => updateMusicUI(true));
    bgMusic.addEventListener('pause', () => updateMusicUI(false));

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
    });
}

// Auto play logic
// Auto play logic
function attemptPlay() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().then(() => {
            // Remove listeners once played (UI updated by event)
            cleanupAutoPlay();
        }).catch(e => {
            // Autoplay prevented, waiting for interaction
        });
    }
}

function cleanupAutoPlay() {
    document.removeEventListener('click', attemptPlay);
    document.removeEventListener('touchstart', attemptPlay);
    window.removeEventListener('scroll', attemptPlay);
}

// Try immediately on load (often blocked, but worth a try)
if (bgMusic) {
    bgMusic.addEventListener('canplaythrough', attemptPlay, { once: true });
}
setTimeout(attemptPlay, 3000);

// Try on any user interaction
document.addEventListener('click', attemptPlay, { once: true });
document.addEventListener('touchstart', attemptPlay, { once: true });
window.addEventListener('scroll', attemptPlay, { once: true });

// Modal Functions
// Modal Functions
function closeModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex'); // Remove flex
            modal.classList.remove('opacity-0');
        }, 300);
    }
}

function showModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Add flex to enable centering
        modal.classList.remove('opacity-0'); // Ensure it's visible
        // Ensure the text is up to date with current language
        setLanguage(currentLang);
    }
}

// RSVP Form Handling
const scriptURL = 'https://script.google.com/macros/s/AKfycbySv3UM0Ey5F9SG1Eyu1VVIorN224GuypV47vZXcBvaGAFbJpYL0MUq1I3kebnfxsD7LQ/exec';
const form = document.getElementById('wedding-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Validation
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (name.length <= 3) {
            alert(currentLang === 'vi' ? "Vui lòng nhập tên đầy đủ (lớn hơn 3 ký tự)." : "Please enter a valid name (> 3 chars).");
            return;
        }

        if (phone.length < 9) {
            alert(currentLang === 'vi' ? "Số điện thoại không hợp lệ (phải từ 9 số trở lên)." : "Invalid phone number (>= 9 digits).");
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = currentLang === 'vi' ? "Đang gửi..." : "Sending...";

        // Prepare data
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                showModal(); // Show the new modal
                form.reset();
            })
            .catch(error => {
                console.error('Lỗi!', error.message);
                alert("Có lỗi xảy ra khi gửi biểu mẫu. Vui lòng thử lại sau.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            });
    });
}

// Initialize default language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('vi');
});
