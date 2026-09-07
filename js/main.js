/**
 * HadTours Travels — Core JavaScript & Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initMobileMenu();
  initFaqAccordions();
  initGalleryLightbox();
  initBookingForm();
});

/* --- 1. Language Switcher (AR / EN) --- */
const translations = {
  ar: {
    langBtn: 'English',
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navDestinations: 'الوجهات',
    navTours: 'الرحلات',
    navGallery: 'معرض الصور',
    navFaq: 'الأسئلة الشائعة',
    navContact: 'تواصل معنا',
    btnBook: 'طلب حجز',
    btnExplore: 'استكشف الرحلات',
    btnPlan: 'صمم رحلتك الخاصة',
    btnWhatsapp: 'محادثة عبر واتساب',
    btnSubmitRequest: 'إرسال الطلب عبر واتساب 💬',
    footerBio: 'وكالة سفر يمنية محلية تنظم رحلات أصيلة بمرافقة مرشدين محليين عبر حضرموت وسقطرى.',
    footerExplore: 'استكشف',
    footerContact: 'التواصل والحجز',
    footerRights: 'جميع الحقوق محفوظة',
    footerAuthentic: 'رحلات يمنية أصيلة بمرافقة محلية',
    tagline: 'رفيقك في السفر',
    brandName: 'هاد تورز ترافلز'
  },
  en: {
    langBtn: 'العربية',
    navHome: 'Home',
    navAbout: 'About Us',
    navDestinations: 'Destinations',
    navTours: 'Tours',
    navGallery: 'Gallery',
    navFaq: 'FAQ',
    navContact: 'Contact',
    btnBook: 'Book Trip',
    btnExplore: 'Explore Tours',
    btnPlan: 'Plan Custom Trip',
    btnWhatsapp: 'Chat on WhatsApp',
    btnSubmitRequest: 'Send Request via WhatsApp 💬',
    footerBio: 'A local Yemeni travel agency running authentic, guided journeys across Hadramout and Socotra.',
    footerExplore: 'Explore',
    footerContact: 'Contact & Booking',
    footerRights: 'All rights reserved',
    footerAuthentic: 'Authentic Yemeni Journeys',
    tagline: 'Your Travel Companion',
    brandName: 'HadTours Travels'
  }
};

function initLanguage() {
  const savedLang = localStorage.getItem('hadtours_lang') || 'ar';
  setLanguage(savedLang);

  const langBtns = document.querySelectorAll('.lang-switch');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('lang') || 'ar';
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      setLanguage(newLang);
    });
  });
}

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('hadtours_lang', lang);

  // Update elements with data-ar / data-en or data-i18n
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });

  document.querySelectorAll('.lang-switch .lang-opt').forEach(el => {
    if (el.getAttribute('data-lang') === lang) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

/* --- 2. Mobile Menu Drawer --- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('active');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when clicking any link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      menuBtn.classList.remove('open');
    });
  });
}

/* --- 3. FAQ Accordions --- */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close other items if desired
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --- 4. Gallery Lightbox --- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item, .itinerary-photo-frame');
  const modal = document.querySelector('.lightbox-modal');
  const modalImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close-btn');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && img.src) {
        modalImg.src = img.src;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --- 5. Interactive WhatsApp Booking Request Builder --- */
function initBookingForm() {
  const form = document.getElementById('bookingRequestForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || 'Traveler';
    const email = form.querySelector('[name="email"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const nationality = form.querySelector('[name="nationality"]')?.value || '';
    const destination = form.querySelector('[name="destination"]')?.value || 'Socotra';
    const date = form.querySelector('[name="date"]')?.value || 'Flexible';
    const guests = form.querySelector('[name="guests"]')?.value || '1';
    const tourType = form.querySelector('[name="tourType"]')?.value || 'Private Tour';
    const notes = form.querySelector('[name="notes"]')?.value || 'None';

    const lang = document.documentElement.getAttribute('lang') || 'ar';

    let message = '';
    if (lang === 'ar') {
      message = `*طلب حجز رحلة جديدة — HadTours Travels*\n` +
        `👤 *الاسم:* ${name}\n` +
        `🌍 *الجنسية:* ${nationality}\n` +
        `📍 *الوجهة:* ${destination}\n` +
        `👥 *عدد المسافرين:* ${guests}\n` +
        `📅 *التاريخ المتوقع:* ${date}\n` +
        `🏕️ *نوع الرحلة:* ${tourType}\n` +
        `📞 *الهاتف:* ${phone}\n` +
        `✉️ *البريد:* ${email}\n` +
        `📝 *ملاحظات إضافية:* ${notes}\n\n` +
        `_تم الإرسال عبر موقع HadTours الرسمي_`;
    } else {
      message = `*New Tour Booking Request — HadTours Travels*\n` +
        `👤 *Name:* ${name}\n` +
        `🌍 *Nationality:* ${nationality}\n` +
        `📍 *Destination:* ${destination}\n` +
        `👥 *Guests:* ${guests}\n` +
        `📅 *Expected Date:* ${date}\n` +
        `🏕️ *Tour Type:* ${tourType}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `📝 *Special Requests:* ${notes}\n\n` +
        `_Sent via HadTours Official Website_`;
    }

    const whatsappNumber = '967778889066';
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  });
}

