/* =========================================
   RIOSHOP — MAIN JAVASCRIPT
   نسخه Frontend آماده برای اتصال به Backend
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const body = document.body;

    // Header & Mobile Menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");

    // Search
    const searchBtn = document.getElementById("searchBtn");
    const searchModal = document.getElementById("searchModal");
    const searchInput = document.getElementById("searchInput");

    // Cart
    const cartBtn = document.getElementById("cartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");
    const checkoutBtn = document.getElementById("checkoutBtn");

    // Login
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const fakeLoginBtn = document.getElementById("fakeLoginBtn");

    // General Modals
    const infoModal = document.getElementById("infoModal");
    const infoModalContent = document.getElementById("infoModalContent");
    const closeInfoModal = document.getElementById("closeInfoModal");

    const closeModalButtons = document.querySelectorAll(".close-modal");

    // Seller Buttons
    const sellerButtons = [
        document.getElementById("heroSellerBtn"),
        document.getElementById("emptyProductSellerBtn"),
        document.getElementById("emptyStoreSellerBtn"),
        document.getElementById("sellerBtn"),
        document.getElementById("floatingSeller")
    ];

    // Support
    const supportFeatureBtn = document.getElementById("supportFeatureBtn");

    // Offers
    const offerBtn = document.getElementById("offerBtn");

    // Footer Links
    const footerPageButtons = document.querySelectorAll("[data-page]");

    // Toast
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");

    // Year
    const currentYear = document.getElementById("currentYear");


    /* ================= PROJECT STATE ================= */

    /*
        در نسخه فعلی هیچ محصول یا فروشگاه ساختگی وجود ندارد.

        در مرحله Backend این بخش‌ها از API و دیتابیس دریافت خواهند شد.
    */

    const appState = {
        cart: [],
        products: [],
        stores: []
    };


    /* ================= CURRENT YEAR ================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================= TOAST ================= */

    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastText) return;

        clearTimeout(toastTimeout);

        toastText.textContent = message;
        toast.classList.add("show");

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }


    /* ================= MODAL FUNCTIONS ================= */

    function openModal(modal) {
        if (!modal) return;

        modal.classList.add("show");
        body.classList.add("no-scroll");
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("show");

        // بررسی می‌کنیم مودال یا سبد دیگری باز نباشد
        const hasOpenModal = document.querySelector(".modal.show");
        const cartIsOpen = cartSidebar?.classList.contains("open");

        if (!hasOpenModal && !cartIsOpen) {
            body.classList.remove("no-scroll");
        }
    }


    /* ================= MOBILE MENU ================= */

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks?.classList.remove("active");

            navItems.forEach((navItem) => {
                navItem.classList.remove("active");
            });

            item.classList.add("active");
        });
    });


    /* ================= SEARCH ================= */

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            openModal(searchModal);

            setTimeout(() => {
                searchInput?.focus();
            }, 200);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            /*
                فعلاً محصولی در سیستم وجود ندارد.

                پس هیچ نتیجه ساختگی نمایش داده نمی‌شود.
                در مرحله Backend اینجا به API جستجو متصل می‌شود.
            */
        });
    }


    /* ================= CART ================= */

    function openCart() {
        cartSidebar?.classList.add("open");
        cartOverlay?.classList.add("show");
        body.classList.add("no-scroll");
    }

    function closeCartSidebar() {
        cartSidebar?.classList.remove("open");
        cartOverlay?.classList.remove("show");

        const hasOpenModal = document.querySelector(".modal.show");

        if (!hasOpenModal) {
            body.classList.remove("no-scroll");
        }
    }

    if (cartBtn) {
        cartBtn.addEventListener("click", openCart);
    }

    if (closeCart) {
        closeCart.addEventListener("click", closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCartSidebar);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (appState.cart.length === 0) {
                showToast("سبد خرید شما خالی است.");
                return;
            }

            showToast("سیستم ثبت سفارش در مرحله اتصال به Backend فعال خواهد شد.");
        });
    }


    /* ================= LOGIN ================= */

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            openModal(loginModal);
        });
    }

    if (fakeLoginBtn) {
        fakeLoginBtn.addEventListener("click", () => {
            const loginInput = document.getElementById("loginInput");
            const value = loginInput?.value.trim();

            if (!value) {
                showToast("لطفاً شماره موبایل یا ایمیل خود را وارد کنید.");
                return;
            }

            showToast("سیستم ورود واقعی در مرحله Backend فعال می‌شود.");
        });
    }


    /* ================= INFO PAGES CONTENT ================= */

    const infoPages = {

        about: {
            title: "درباره Rioshop",
            content: `
                <div class="info-section">
                    <h3>Rioshop چیست؟</h3>
                    <p>
                        Rioshop یک پروژه بازار آنلاین است که با هدف ایجاد بستری
                        مدرن برای ارتباط میان خریداران و فروشندگان طراحی شده است.
                    </p>
                </div>

                <div class="info-section">
                    <h3>هدف ما</h3>
                    <p>
                        هدف Rioshop ایجاد تجربه‌ای ساده، منظم و قابل اعتماد برای
                        کشف محصولات، مدیریت فروشگاه‌ها و انجام فرآیند خرید و فروش است.
                    </p>
                </div>

                <div class="info-section">
                    <h3>وضعیت فعلی</h3>
                    <p>
                        Rioshop در حال توسعه است. نسخه فعلی شامل ساختار Frontend
                        پروژه است و در مراحل بعدی Backend، دیتابیس، حساب کاربری،
                        فروشگاه‌ها، محصولات و سیستم سفارش به آن متصل خواهند شد.
                    </p>
                </div>
            `
        },

        terms: {
            title: "قوانین و مقررات",
            content: `
                <div class="info-section">
                    <h3>استفاده از Rioshop</h3>
                    <p>
                        استفاده از خدمات Rioshop به معنی پذیرش قوانین و مقررات
                        فعال در زمان استفاده از سایت خواهد بود.
                    </p>
                </div>

                <div class="info-section">
                    <h3>مسئولیت کاربران</h3>
                    <ul class="info-list">
                        <li>کاربران باید اطلاعات صحیح و معتبر ارائه کنند.</li>
                        <li>ثبت محتوای غیرقانونی یا آسیب‌زا مجاز نیست.</li>
                        <li>فروشندگان مسئول صحت اطلاعات محصولات خود هستند.</li>
                        <li>کاربران باید از حساب کاربری خود به‌صورت مسئولانه استفاده کنند.</li>
                    </ul>
                </div>

                <div class="info-section">
                    <h3>تغییر قوانین</h3>
                    <p>
                        با توسعه خدمات Rioshop ممکن است این قوانین به‌روزرسانی شوند.
                        نسخه جدید قوانین از طریق همین بخش در دسترس کاربران قرار خواهد گرفت.
                    </p>
                </div>
            `
        },

        privacy: {
            title: "حریم خصوصی",
            content: `
                <div class="info-section">
                    <h3>اطلاعات کاربران</h3>
                    <p>
                        Rioshop در نسخه واقعی فقط اطلاعات موردنیاز برای ارائه خدمات
                        و مدیریت حساب کاربری را دریافت و پردازش خواهد کرد.
                    </p>
                </div>

                <div class="info-section">
                    <h3>استفاده از اطلاعات</h3>
                    <ul class="info-list">
                        <li>مدیریت حساب و ارائه خدمات سایت</li>
                        <li>پردازش سفارش‌ها و درخواست‌های کاربران</li>
                        <li>بهبود عملکرد و امنیت سرویس</li>
                        <li>ارسال اطلاع‌رسانی‌های ضروری مربوط به حساب یا سفارش</li>
                    </ul>
                </div>

                <div class="info-section">
                    <h3>امنیت</h3>
                    <p>
                        در زمان راه‌اندازی نسخه Backend، تدابیر فنی مناسب برای
                        محافظت از اطلاعات و دسترسی‌های کاربران در نظر گرفته خواهد شد.
                    </p>
                </div>
            `
        },

        support: {
            title: "پشتیبانی Rioshop",
            content: `
                <div class="info-section">
                    <h3>چطور می‌توانیم کمک کنیم؟</h3>
                    <p>
                        اگر درباره عملکرد Rioshop سؤال دارید یا مشکلی در سایت
                        مشاهده کرده‌اید، می‌توانید موضوع را برای بررسی ثبت کنید.
                    </p>
                </div>

                <div class="support-option">
                    <strong>گزارش مشکل</strong>
                    <span>
                        برای مشکلات فنی، خطاها و بخش‌هایی که به‌درستی کار نمی‌کنند.
                    </span>
                </div>

                <div class="support-option">
                    <strong>پیشنهاد و بازخورد</strong>
                    <span>
                        ایده‌ها و پیشنهادهای شما می‌تواند به بهتر شدن Rioshop کمک کند.
                    </span>
                </div>

                <button class="primary-btn info-action-btn" id="supportRequestBtn">
                    <i class="fa-solid fa-headset"></i>
                    ثبت درخواست پشتیبانی
                </button>
            `
        },

        contact: {
            title: "تماس با Rioshop",
            content: `
                <div class="info-section">
                    <h3>ارتباط با ما</h3>
                    <p>
                        در حال حاضر اطلاعات تماس رسمی Rioshop هنوز نهایی نشده است.
                        پس از راه‌اندازی نسخه عمومی، راه‌های ارتباطی رسمی در این بخش
                        قرار خواهند گرفت.
                    </p>
                </div>

                <div class="info-section">
                    <h3>پیشنهاد یا گزارش مشکل دارید؟</h3>
                    <p>
                        تا زمان فعال شدن سیستم ارتباطی کامل، می‌توانید از بخش
                        پشتیبانی برای ثبت موضوع موردنظر خود استفاده کنید.
                    </p>
                </div>

                <button class="primary-btn info-action-btn" id="contactSupportBtn">
                    رفتن به بخش پشتیبانی
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            `
        }
    };


    /* ================= INFO MODAL ================= */

    function openInfoPage(pageName) {
        const page = infoPages[pageName];

        if (!page || !infoModalContent) return;

        infoModalContent.innerHTML = `
            <h2 class="info-page-title">${page.title}</h2>
            ${page.content}
        `;

        openModal(infoModal);

        // دکمه ثبت درخواست پشتیبانی
        const supportRequestBtn = document.getElementById("supportRequestBtn");

        if (supportRequestBtn) {
            supportRequestBtn.addEventListener("click", () => {
                showToast(
                    "سیستم ثبت درخواست واقعی پس از راه‌اندازی Backend فعال می‌شود."
                );
            });
        }

        // رفتن از تماس با ما به پشتیبانی
        const contactSupportBtn = document.getElementById("contactSupportBtn");

        if (contactSupportBtn) {
            contactSupportBtn.addEventListener("click", () => {
                openInfoPage("support");
            });
        }
    }


    /* ================= FOOTER PAGES ================= */

    footerPageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const pageName = button.dataset.page;
            openInfoPage(pageName);
        });
    });


    /* ================= SUPPORT FEATURE ================= */

    if (supportFeatureBtn) {
        supportFeatureBtn.addEventListener("click", () => {
            openInfoPage("support");
        });
    }


    /* ================= SELLER BUTTONS ================= */

    sellerButtons.forEach((button) => {
        if (!button) return;

        button.addEventListener("click", () => {
            openInfoPage("seller");
        });
    });


    /*
        صفحه فروشندگان به‌صورت جداگانه تعریف می‌شود تا تمام دکمه‌های
        «فروشنده شوید» عملکرد یکسان داشته باشند.
    */

    infoPages.seller = {
        title: "فروشنده شدن در Rioshop",
        content: `
            <div class="info-section">
                <h3>فروشگاه خود را راه‌اندازی کنید</h3>
                <p>
                    سیستم فروشندگان Rioshop برای ایجاد فروشگاه، ثبت محصولات،
                    مدیریت موجودی، سفارش‌ها و درآمد طراحی شده است.
                </p>
            </div>

            <div class="info-section">
                <h3>وضعیت فعلی</h3>
                <p>
                    پنل فروشندگان در نسخه نهایی Frontend طراحی شده است،
                    اما برای فعال شدن واقعی به Backend، سیستم حساب کاربری
                    و دیتابیس متصل خواهد شد.
                </p>
            </div>

            <div class="info-section">
                <h3>مرحله بعد</h3>
                <p>
                    پس از راه‌اندازی سیستم ثبت‌نام و ورود، کاربران واجد شرایط
                    می‌توانند فرآیند ایجاد فروشگاه را به‌صورت واقعی شروع کنند.
                </p>
            </div>

            <button class="primary-btn info-action-btn" id="sellerNotifyBtn">
                <i class="fa-solid fa-bell"></i>
                اطلاع از زمان راه‌اندازی
            </button>
        `
    };


    /*
        چون صفحه فروشنده بعد از تعریف اولیه به دکمه‌ها متصل شده،
        یک کنترل برای دکمه داخلی آن ایجاد می‌کنیم.
    */

    const originalOpenInfoPage = openInfoPage;

    function openSellerPage() {
        originalOpenInfoPage("seller");

        setTimeout(() => {
            const sellerNotifyBtn = document.getElementById("sellerNotifyBtn");

            if (sellerNotifyBtn) {
                sellerNotifyBtn.addEventListener("click", () => {
                    showToast(
                        "سیستم اعلان و ثبت درخواست در نسخه Backend فعال خواهد شد."
                    );
                });
            }
        }, 0);
    }

    sellerButtons.forEach((button) => {
        if (!button) return;

        /*
            جلوگیری از رفتار قبلی و استفاده از صفحه کامل فروشندگان
            با clone کردن دکمه.
        */
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener("click", () => {
            openSellerPage();
        });
    });


    /* ================= OFFER BUTTON ================= */

    if (offerBtn) {
        offerBtn.addEventListener("click", () => {
            showToast(
                "با اضافه شدن محصولات واقعی، پیشنهادهای ویژه در این بخش نمایش داده می‌شوند."
            );
        });
    }


    /* ================= CLOSE MODALS ================= */

    closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    if (closeInfoModal) {
        closeInfoModal.addEventListener("click", () => {
            closeModal(infoModal);
        });
    }

    // بستن مودال با کلیک روی فضای بیرونی
    [searchModal, loginModal, infoModal].forEach((modal) => {
        if (!modal) return;

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // بستن با کلید Escape
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        document.querySelectorAll(".modal.show").forEach((modal) => {
            closeModal(modal);
        });

        if (cartSidebar?.classList.contains("open")) {
            closeCartSidebar();
        }

        navLinks?.classList.remove("active");
    });


    /* ================= INITIAL STATE ================= */

    /*
        نسخه فعلی عمداً با داده خالی شروع می‌شود.

        پس از ساخت Backend:
        - محصولات از API دریافت می‌شوند.
        - فروشگاه‌ها از دیتابیس دریافت می‌شوند.
        - سبد خرید به حساب کاربر متصل می‌شود.
        - ورود و ثبت‌نام واقعی فعال می‌شود.
    */

    console.log("Rioshop Frontend آماده اتصال به Backend است.");

});