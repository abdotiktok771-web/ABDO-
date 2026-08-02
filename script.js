document.addEventListener('DOMContentLoaded', () => {
    console.log("تم تحميل السكريبت بنجاح وموقعك جاهز 100%! 🚀");

    // ==========================================
    // 1. تشغيل البوت الذكي (Smart Chatbot Engine)
    // ==========================================
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatBox = document.getElementById('chatbot-box');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatLogs = document.getElementById('chat-logs');

    if (chatToggle && chatBox) {
        // فتح وإغلاق الشات
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (chatBox.style.display === 'flex') {
                chatBox.style.display = 'none';
            } else {
                chatBox.style.display = 'flex';
                chatBox.classList.add('active');
            }
        });

        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                chatBox.style.display = 'none';
            });
        }

        if (chatSend) chatSend.addEventListener('click', sendMessage);
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }

    // دالة إرسال الرسائل
    function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        // 1. إظهار رسالة المستخدم
        appendMessage(userText, 'user');
        chatInput.value = '';

        // 2. إظهار جاري التفكير
        const loadingId = 'loading-' + Date.now();
        appendLoadingMessage('جاري التفكير... 🧠', loadingId);

        // 3. التفكير والرد المباشر السريع
        setTimeout(() => {
            removeLoadingMessage(loadingId);
            const reply = generateSmartReply(userText);
            appendMessage(reply, 'bot');
        }, 600);
    }

    function appendMessage(msg, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.textContent = msg;
        chatLogs.appendChild(msgDiv);
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }

    function appendLoadingMessage(msg, id) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', 'bot');
        msgDiv.id = id;
        msgDiv.textContent = msg;
        chatLogs.appendChild(msgDiv);
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }

    function removeLoadingMessage(id) {
        const loader = document.getElementById(id);
        if (loader) loader.remove();
    }

    // محرك الإجابات الذكي والمباشر
    function generateSmartReply(input) {
        const text = input.toLowerCase();

        if (text.includes('مين') || text.includes('من انت') || text.includes('اسمك') || text.includes('عبد الرحمن')) {
            return "أنا المساعد الذكي الخاص بعبد الرحمن! عبد الرحمن صانع محتوى إبداعي ومطور أفكار متميز في المونتاج والتصميم والبرمجة. 🚀";
        } 
        else if (text.includes('مهارات') || text.includes('بتعمل ايه') || text.includes('شغل') || text.includes('خدمات')) {
            return "عبد الرحمن يقدم خدمات احترافية في: \n1. مونتاج الفيديوهات والمؤثرات البصرية 🎬\n2. تصميم الجرافيك والبوسترات 🎨\n3. تطوير مواقع الويب السريعة 🔥";
        } 
        else if (text.includes('تواصل') || text.includes('رقم') || text.includes('اميل') || text.includes('فيسبوك') || text.includes('انستجرام')) {
            return "تقدر تتواصل مع عبد الرحمن مباشرة من خلال أيقونات التواصل الاجتماعي الموجودة أسفل الموقع! 📩";
        } 
        else if (text.includes('موقع') || text.includes('برمجة') || text.includes('كود') || text.includes('تصميم')) {
            return "الموقع ده مبني بأحدث تقنيات الويب (HTML5, CSS3, JavaScript) مع حركات أنيميشن سريعة وتجاوب كامل مع كافة الشاشات! 💻";
        }
        else if (text.includes('ازيك') || text.includes('عامل ايه') || text.includes('اخبارك') || text.includes('ينهار')) {
            return "أنا تمام وزي الفل! جاهز أساعدك في أي حاجة تعرفها عن موقع عبد الرحمن وأعماله ✨";
        }
        else if (text.includes('سلام') || text.includes('شكرا') || text.includes('تسلم')) {
            return "العفو يا بطل! تحت أمرك في أي وقت 🔥";
        }
        else {
            return `سؤال مميز جداً! عبد الرحمن حالياً بيطور في الموقع باستمرار، وتقدر تكتشف أعماله ومهاراته في القوائم فوق أو تتواصل معاه مباشرة! 🌟`;
        }
    }

    // ==========================================
    // 2. التمرير السلس للروابط (Smooth Scroll)
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.color = '');
            this.style.color = '#10b981';
        });
    });
    // ==========================================
    // 3. التبديل بين Light Mode و Dark Mode
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // فحص التفضيل المحفوظ سابقاً
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
            
            // حفظ تفضيل الزائر في المتصفح
            localStorage.setItem('theme', theme);
        });
    }
    // ==========================================
    // 4. تكبير صور معرض الأعمال (Lightbox)
    // ==========================================
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const portfolioImages = document.querySelectorAll('.portfolio-card img');

    if (modal && modalImg) {
        // فتح الصورة كبيرة عند الضغط عليها
        portfolioImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            });
        });

        // إغلاق النافذة عند الضغط على زرار (X)
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        // إغلاق النافذة عند الضغط على أي مكان برة الصورة
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // إغلاق النافذة عند الضغط على زر Escape في الكيبورد
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
    }
    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWKtRYhITsFz4i5wu7KgvnVwpt1ebn0xQ",
  authDomain: "my-web-b12b0.firebaseapp.com",
  databaseURL: "https://my-web-b12b0-default-rtdb.firebaseio.com",
  projectId: "my-web-b12b0",
  storageBucket: "my-web-b12b0.firebasestorage.app",
  messagingSenderId: "814843679666",
  appId: "1:814843679666:web:bab54b135f50083357caab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ==========================================
// نظام التقييمات الحقيقي (Firebase Realtime Database)
// ==========================================

// 1. كود تهيئة Firebase (تأكد إن البيانات دي هي بيانات مشروعك بالضبط)
const firebaseConfig = {
    apiKey: "حط_الـ_apiKey_بتاعك_هنا",
    authDomain: "my-web-b12b0.firebaseapp.com",
    databaseURL: "https://my-web-b12b0-default-rtdb.firebaseio.com",
    projectId: "my-web-b12b0",
    storageBucket: "my-web-b12b0.appspot.com",
    messagingSenderId: "حط_الـ_messagingSenderId",
    appId: "حط_الـ_appId"
};

// تشغيل Firebase في الموقع
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const reviewsRef = db.ref('reviews');

const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.getElementById('reviews-container');

// 2. قراءة التقييمات الحقيقية وعرضها للجميع فوراً
reviewsRef.on('value', (snapshot) => {
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';
    const data = snapshot.val();

    if (data) {
        // ترتيب التقييمات من الأحدث للأقدم
        Object.keys(data).reverse().forEach((key) => {
            const item = data[key];
            const stars = '⭐'.repeat(item.rating || 5);
            
            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = `
                <div class="stars">${stars}</div>
                <p>"${escapeHtml(item.comment)}"</p>
                <h4>${escapeHtml(item.name)}</h4>
                <span>زائر حقيقي ✨</span>
            `;
            reviewsContainer.appendChild(card);
        });
    } else {
        reviewsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">لا توجد تقييمات حتى الآن. كن أول من يكتب تقييمه! 🌟</p>';
    }
});

// 3. إرسال التقييم الجديد عند إرسال النموذج
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerText = 'جاري النشر...';

        const name = document.getElementById('reviewer-name').value.trim();
        const rating = parseInt(document.getElementById('reviewer-rating').value);
        const comment = document.getElementById('reviewer-comment').value.trim();

        // إرسال البيانات إلى Firebase
        reviewsRef.push({
            name: name,
            rating: rating,
            comment: comment,
            timestamp: Date.now()
        }).then(() => {
            reviewForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = 'نشر التقييم للجميع 🚀';
            alert('تم نشر تقييمك بنجاح وسيطهر لجميع زوار الموقع الآن! 🎉');
        }).catch((err) => {
            console.error(err);
            submitBtn.disabled = false;
            submitBtn.innerText = 'نشر التقييم للجميع 🚀';
            alert('حدث خطأ أثناء حفظ التقييم، يرجى المحاولة لاحقاً.');
        });
    });
}

// دالة حماية من النصوص الضارة
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
});
