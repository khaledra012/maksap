document.addEventListener("DOMContentLoaded", function () {
  // تشغيل AOS مع إعدادات تضمن الظهور
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  // تحديث AOS عند تحميل الصفحة بالكامل
  window.addEventListener("load", function () {
    AOS.refresh();
  });

  // Hover للدروب داون
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    dropdown.addEventListener("mouseenter", () => {
      dropdown.querySelector(".dropdown-menu").classList.add("show");
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdown.querySelector(".dropdown-menu").classList.remove("show");
    });
  }
});

//
// بيانات السكشن الإبداعي
const creativeSectionData = {
  message: {
    title: "رسالتنا في مكسب واضحة:",
    description:
      "نقدم تسويقاً رقمياً متكاملاً يرفع قيمة علامتك التجارية ويحقق أهدافك التجارية بأعلى كفاءة. نسعى إلى:",
    list: [
      "بناء هوية رقمية قوية",
      "صناعة محتوى مرتبط بجمهورك",
      "تعزيز التفاعل على السوشيال ميديا",
      "خطط إعلانية مدفوعة بعائد مرتفع.",
    ],
  },
  values: {
    title: "قيمنا الأساسية:",
    description:
      "في مكسب نؤمن أن التسويق الرقمي أكثر من مجرد خدمات، بل قوة حقيقية لتحويل العلامات التجارية. نمتلك فهمًا عميقًا لسوق السعودية وسلوك الجمهور، لذلك لا نقدم حلولًا جاهزة، بل استراتيجيات مخصصة حسب أهداف كل عميل. قيمتنا الحقيقية تظهر في:",
    list: [
      "المصداقية والشفافية في العمل",
      "الابتكار المستمر وعدم التقليد",
      "الالتزام بالمواعيد المحددة",
      "الجودة العالية في التنفيذ",
    ],
  },
  goals: {
    title: "أهدافنا المستقبلية:",
    description:
      "أن نكون القوة الدافعة وراء نجاح علامتك التجارية رقميًا. نحقق ذلك من خلال:",
    list: [
      "زيادة الوعي بالعلامة التجارية",
      "رفع معدلات التفاعل والتحويل",
      "نمو مستدام مبني على بيانات حقيقية",
      " بناء علاقة طويلة الأمد مع الجمهور",
      "صدرك لمحركات البحث والسوشيال ميديا هدفنا ليس حملة ناجحة فقط، بل تأثير مستمر يضعك في مقدمة المنافسين.",
    ],
  },
};

// دالة تغيير المحتوى (اسم فريد)
function changeCreativeContent(key, btnRef) {
  const contentContainer = document.getElementById("creativeDynamicContent");

  // تحديد الأزرار داخل هذا السكشن فقط
  const sectionButtons = document.querySelectorAll(
    "#unique-creative-section .creative-btn",
  );

  // إزالة الكلاس active من كل الأزرار
  sectionButtons.forEach((b) => b.classList.remove("active"));

  // تفعيل الزر المضغوط
  btnRef.classList.add("active");

  // إخفاء المحتوى
  contentContainer.classList.remove("visible");

  // تغيير النص بعد لحظات (لتأثير الحركة)
  setTimeout(() => {
    const data = creativeSectionData[key];

    let listHTML = "";
    data.list.forEach((item) => {
      listHTML += `<li>${item}</li>`;
    });

    contentContainer.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <ul>${listHTML}</ul>
        `;

    // إظهار المحتوى
    contentContainer.classList.add("visible");
  }, 400);
}

// تشغيل المحتوى الافتراضي عند التحميل
document.addEventListener("DOMContentLoaded", function () {
  // محاكاة الضغط على زر "رسالتنا" ليبدأ مفعلاً
  const initialBtn = document.querySelector(
    "#unique-creative-section .creative-btn.active",
  );
  if (initialBtn) {
    // استخراج الـ key من الـ onclick
    // onclick="changeCreativeContent('message', this)"
    // نريد كلمة message
    const keyMatch = initialBtn.getAttribute("onclick").match(/'([^']+)'/);
    if (keyMatch && keyMatch[1]) {
      changeCreativeContent(keyMatch[1], initialBtn);
    }
  }
});

//

// كود تشغيل عداد الأرقام عند الوصول للسكشن
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("#stats-section .counter-value");
  const section = document.querySelector("#stats-section");
  let started = false; // عشان العداد يشتغل مرة واحدة بس

  // دالة العد
  function startCount(el) {
    const target = +el.getAttribute("data-target");
    const count = +el.innerText;

    // سرعة العد (كل ما الرقم زاد، قلل القيمة دي عشان يبقى أسرع)
    const increment = target / 100;

    if (count < target) {
      el.innerText = Math.ceil(count + increment);
      setTimeout(() => startCount(el), 20);
    } else {
      el.innerText = target; // التأكد من وصول الرقم للنهاية
    }
  }

  // مراقب السكرول (Intersection Observer)
  // ده بيشوف هل السكشن ظهر في الشاشة ولا لأ
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          counters.forEach((counter) => startCount(counter));
          started = true; // منع التكرار
        }
      });
    },
    { threshold: 0.3 },
  ); // 0.3 يعني لما 30% من السكشن يظهر

  if (section) {
    observer.observe(section);
  }
});
