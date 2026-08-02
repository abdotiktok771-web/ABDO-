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
});