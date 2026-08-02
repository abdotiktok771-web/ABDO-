// ==========================================
// 1. إعدادات وتوصيل Firebase Realtime Database
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyDWKtRYhITsFz4i5wu7KgvnVwpt1ebn0xQ",
  authDomain: "my-web-b12b0.firebaseapp.com",
  databaseURL: "https://my-web-b12b0-default-rtdb.firebaseio.com",
  projectId: "my-web-b12b0",
  storageBucket: "my-web-b12b0.firebasestorage.app",
  messagingSenderId: "814843679666",
  appId: "1:814843679666:web:bab54b135f50083357caab"
};

// تشغيل وتهيئة الخدمة في الموقع
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const reviewsRef = db.ref('reviews');

// تحديد عناصر النموذج والحاوية من HTML
const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.getElementById('reviews-container');

// ==========================================
// 2. قراءة التقييمات وعرضها للجميع فوراً
// ==========================================

reviewsRef.on('value', (snapshot) => {
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = '';
    const data = snapshot.val();

    if (data) {
        // ترتيب التقييمات من الأحدث للأقدم
        Object.keys(data).reverse().forEach((key) => {
            const item = data[key];
            const ratingValue = parseInt(item.rating) || 5;
            const stars = '⭐'.repeat(ratingValue);
            
            // إنشاء كارت التقييم
            const card = document.createElement('div');
            card.className = 'review-card';
            
            // تنسيق مباشر وصريح عشان يشتغل على الموبايل والكمبيوتر بدون مشاكل كاش
            card.style.cssText = "background: #1a1a1a; padding: 1.5rem; border-radius: 14px; border: 1px solid #333333; text-align: right; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;";

            card.innerHTML = `
                <div>
                    <div class="stars" style="color: #ffc107; font-size: 1.1rem; margin-bottom: 0.8rem;">${stars}</div>
                    <p style="color: #dddddd; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem; word-break: break-word;">"${escapeHtml(item.comment)}"</p>
                </div>
                <div>
                    <h4 style="color: #ffffff; font-size: 1rem; margin: 0; font-weight: bold;">${escapeHtml(item.name)}</h4>
                    <span style="color: #007bff; font-size: 0.8rem;">زائر حقيقي ✨</span>
                </div>
            `;
            
            reviewsContainer.appendChild(card);
        });
    } else {
        reviewsContainer.innerHTML = '<p style="text-align: center; color: #888888; grid-column: 1/-1; width: 100%;">لا توجد تقييمات حتى الآن. كن أول من يكتب تقييمه! 🌟</p>';
    }
});

// ==========================================
// 3. حفظ وإرسال التقييم الجديد إلى السيرفر
// ==========================================

if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const nameInput = document.getElementById('reviewer-name');
        const ratingInput = document.getElementById('reviewer-rating');
        const commentInput = document.getElementById('reviewer-comment');

        // تعطيل الزرار أثناء التحميل
        submitBtn.disabled = true;
        submitBtn.innerText = 'جاري النشر... ⏳';

        const name = nameInput.value.trim();
        const rating = parseInt(ratingInput.value);
        const comment = commentInput.value.trim();

        // دفع البيانات لـ Firebase
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
            console.error("Firebase Error:", err);
            submitBtn.disabled = false;
            submitBtn.innerText = 'نشر التقييم للجميع 🚀';
            alert('حدث خطأ أثناء حفظ التقييم، يرجى المحاولة لاحقاً.');
        });
    });
}

// ==========================================
// 4. دالة الحماية (XSS Protection)
// ==========================================

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}