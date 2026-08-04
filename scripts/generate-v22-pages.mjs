#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "assets/data/v22-assets.json"), "utf8"));

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;").replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const t = (tag, vi, en, className = "") => `<${tag}${className ? ` class="${className}"` : ""} data-vi="${esc(vi)}" data-en="${esc(en)}">${esc(vi)}</${tag}>`;
const asset = (group, originalName) => `../${manifest[group][originalName]}`;

function image(group, originalName, altVi, altEn, extraClass = "") {
  return `<img src="${asset(group, originalName)}" alt="${esc(altVi)}" data-alt-vi="${esc(altVi)}" data-alt-en="${esc(altEn)}" loading="lazy" decoding="async" data-lightbox${extraClass ? ` class="${extraClass}"` : ""}>`;
}

function logo(group, originalName, alt) {
  return `<div class="v22-logo-card"><img src="${asset(group, originalName)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
}

function header() {
  return `<div class="v22-progress" id="scrollProgress" aria-hidden="true"></div>
  <header class="v22-site-header">
    <div class="v22-shell v22-nav">
      <a class="v22-brand" href="../index.html#home" aria-label="Portfolio Trần Quang Nhật"><span class="v22-brand-mark">N.</span><span>Trần Quang Nhật</span></a>
      <nav class="v22-desktop-nav" aria-label="Primary navigation">
        ${t("a", "Trang chủ", "Home").replace("<a", '<a href="../index.html#home"')}
        ${t("a", "Dự án", "Projects").replace("<a", '<a href="../index.html#projects"')}
        ${t("a", "Kỹ năng", "Skills").replace("<a", '<a href="../index.html#skills"')}
        ${t("a", "Liên hệ", "Contact").replace("<a", '<a href="../index.html#contact"')}
      </nav>
      <div class="v22-nav-actions">
        <button class="v22-lang-toggle" id="langToggle" type="button" aria-label="Chuyển ngôn ngữ"><span data-lang-option="vi" class="active">VI</span><span aria-hidden="true">&nbsp;|&nbsp;</span><span data-lang-option="en">EN</span></button>
        <button class="v22-theme-toggle" id="themeToggle" type="button" aria-label="Đổi giao diện sáng tối">☾</button>
        <button class="v22-menu-toggle" id="menuToggle" type="button" aria-label="Mở menu" aria-expanded="false">☰</button>
      </div>
    </div>
    <nav class="v22-mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      ${t("a", "Trang chủ", "Home").replace("<a", '<a href="../index.html#home"')}
      ${t("a", "Dự án", "Projects").replace("<a", '<a href="../index.html#projects"')}
      ${t("a", "Kỹ năng", "Skills").replace("<a", '<a href="../index.html#skills"')}
      ${t("a", "Liên hệ", "Contact").replace("<a", '<a href="../index.html#contact"')}
    </nav>
  </header>`;
}

function hero({ group, desktop, mobile, kickerVi, kickerEn, titleVi, titleEn, subtitleVi, subtitleEn, tags = [] }) {
  return `<section class="v22-hero">
    <picture><source media="(max-width: 767px)" srcset="${asset(group, mobile)}"><img src="${asset(group, desktop)}" alt="${esc(titleVi)}" fetchpriority="high"></picture>
    <div class="v22-shell v22-hero-content">
      <a class="v22-back" href="../index.html#projects">← ${t("span", "Quay lại danh sách dự án", "Back to projects")}</a>
      <div class="v22-hero-copy">
        ${t("p", kickerVi, kickerEn, "v22-kicker")}
        ${t("h1", titleVi, titleEn)}
        ${t("p", subtitleVi, subtitleEn, "v22-hero-subtitle")}
        <div class="v22-tags">${tags.map(([vi, en]) => t("span", vi, en)).join("")}</div>
      </div>
    </div>
  </section>`;
}

function heading(number, titleVi, titleEn, textVi = "", textEn = "") {
  return `<div class="v22-heading reveal"><div>${t("p", number, number, "v22-eyebrow")}${t("h2", titleVi, titleEn)}</div>${textVi ? t("p", textVi, textEn) : ""}</div>`;
}

function metrics(items, noteVi = "", noteEn = "") {
  return `<div class="v22-metrics reveal">${items.map(([value, vi, en]) => `<article class="v22-metric"><strong>${value}</strong>${t("span", vi, en)}</article>`).join("")}</div>${noteVi ? t("p", noteVi, noteEn, "v22-note reveal") : ""}`;
}

function cards(items, gridClass = "") {
  return `<div class="v22-card-grid ${gridClass}">${items.map(([number, titleVi, titleEn, textVi, textEn]) => `<article class="v22-card reveal"><span class="v22-card-number">${number}</span>${t("h3", titleVi, titleEn)}${t("p", textVi, textEn)}</article>`).join("")}</div>`;
}

function mediaGrid(group, items, gridClass = "three", cardClass = "landscape") {
  return `<div class="v22-media-grid ${gridClass}">${items.map(([name, altVi, altEn, ownClass]) => `<figure class="v22-media-card ${ownClass || cardClass} reveal">${image(group, name, altVi, altEn)}</figure>`).join("")}</div>`;
}

function carousel(group, items, speed = 22) {
  return `<div class="v22-carousel reveal" data-carousel data-speed="${speed}"><div class="v22-carousel-viewport">${items.map(([name, altVi, altEn, orientation]) => `<figure class="v22-carousel-slide ${orientation || ""}">${image(group, name, altVi, altEn)}</figure>`).join("")}</div><div class="v22-carousel-controls"><button class="v22-carousel-button" type="button" data-carousel-action="previous" aria-label="Previous slide">←</button><button class="v22-carousel-button" type="button" data-carousel-action="next" aria-label="Next slide">→</button></div></div>`;
}

function series(prefix, count, vi, en, orientation = "") {
  return Array.from({ length: count }, (_, index) => [
    `${prefix}${index ? ` (${index + 1})` : ""}.jpg`,
    `${vi} ${index + 1}`,
    `${en} ${index + 1}`,
    orientation,
  ]);
}

function lightbox() {
  return `<div class="v22-lightbox" id="lightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Image preview"><button class="v22-lightbox-close" type="button" aria-label="Close image preview" disabled>×</button><img src="../assets/images/favicon.png" alt=""><p class="v22-lightbox-caption"></p></div>`;
}

function footer(nextHref, nextVi, nextEn) {
  return `<section class="v22-section"><div class="v22-shell"><a class="v22-next" href="${nextHref}">${t("span", "Dự án tiếp theo", "Next project")}${t("strong", nextVi, nextEn)}</a></div></section><footer class="v22-footer">© 2026 Trần Quang Nhật · Marketing Portfolio</footer>${lightbox()}<script src="../assets/js/case-studies-v22.js" defer></script>`;
}

function documentShell({ titleVi, titleEn, description, accent = "#c11818", main }) {
  const accentClass = accent.toLowerCase() === "#4e284b" ? "v22-accent-purple" : "v22-accent-red";
  return `<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Trần Quang Nhật">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">
  <link rel="stylesheet" href="../assets/css/case-studies-v22.css">
  <title>${esc(titleVi)} | Trần Quang Nhật</title>
</head>
<body class="v22-case ${accentClass}" data-title-vi="${esc(titleVi)} | Trần Quang Nhật" data-title-en="${esc(titleEn)} | Tran Quang Nhat">
  ${header()}
  <main>${main}</main>
</body>
</html>`;
}

const epicureProofs = [
  ["Website proof - Home.jpg", "Trang chủ EPICURE", "EPICURE homepage"],
  ["Webite proof - About.jpg", "Trang giới thiệu EPICURE", "EPICURE about page"],
  ["Website proof - Menu.jpg", "Hệ thống menu sản phẩm", "Product navigation menu"],
  ["Website proof - Search.jpg", "Tìm kiếm sản phẩm", "Product search"],
  ["Website proof - Filter.jpg", "Bộ lọc sản phẩm", "Product filters"],
  ["Website proof - compare.jpg", "Tính năng so sánh sản phẩm", "Product comparison"],
  ["Website proof - PDP.jpg", "Trang sản phẩm chi tiết", "Product detail page"],
  ["Website proof - Cart.jpg", "Giỏ hàng và thanh toán", "Cart and checkout"],
  ["Website proof - footer.jpg", "Footer, chính sách và điểm liên hệ", "Footer, policies and contact points"],
];

const epicureMain = `${hero({
  group:"epicure", desktop:"Hero Desktop.jpg", mobile:"Hero mobile.jpg",
  kickerVi:"CASE STUDY · EPICURE · 07/2025–12/2025", kickerEn:"CASE STUDY · EPICURE · 07/2025–12/2025",
  titleVi:"Xây dựng website & tối ưu SEO", titleEn:"Website Replatforming & SEO Optimization",
  subtitleVi:"Chuyển đổi WordPress sang Haravan, tái cấu trúc danh mục, tối ưu UX/UI và bảo toàn tài sản SEO.",
  subtitleEn:"Migrating from WordPress to Haravan, restructuring the catalogue, improving UX/UI and protecting existing SEO equity.",
  tags:[["Quy hoạch cấu trúc","Information architecture"],["Chuyển đổi nội dung","Content migration"],["UX/UI & E-commerce","UX/UI & E-commerce"],["Điều phối dự án","Project coordination"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Một nền tảng mới cho chiến lược mở rộng","A new platform for the next stage of growth","Website cũ được thiết kế chủ yếu cho ngành hàng cà phê và không còn phù hợp khi EPICURE mở rộng sang thiết bị gia dụng cao cấp.","The former coffee-led website no longer matched EPICURE's expansion into premium home appliances.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Để đáp ứng chiến lược mở rộng hệ sinh thái, dự án tập trung chuyển đổi toàn bộ nền tảng sang Haravan, tái quy hoạch danh mục sản phẩm, nâng cấp trải nghiệm mua hàng và xây quy trình bảo toàn các trang SEO có giá trị.","To support a broader product ecosystem, the project migrated the platform to Haravan, rebuilt the catalogue architecture, improved the shopping experience and established a process to protect valuable SEO pages.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>Project Owner</strong></article><article>${t("span","Thời gian","Period")}<strong>07/2025–12/2025</strong></article><article>${t("span","Nền tảng","Platform")}<strong>WordPress → Haravan</strong></article><article>${t("span","Phạm vi","Scope")}<strong>IA · UX/UI · SEO · UAT</strong></article></div></div>
  <div class="v22-logo-strip mt-12 reveal">${logo("epicure","Logo Epicure.jpg","EPICURE")}</div>
  <figure class="v22-media-card landscape contain reveal mt-12">${image("epicure","Device Mockup Website.jpg","Website EPICURE trên desktop và mobile","EPICURE website across desktop and mobile")}</figure>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Kết quả triển khai có thể xác minh","Verified implementation outcomes")}
  ${metrics([["WP → H","WordPress chuyển sang Haravan","WordPress migrated to Haravan"],["4","Nhóm danh mục sản phẩm cốt lõi","Core product-category groups"],["5","Tháng triển khai dự án","Months of implementation"],["Search → Checkout","Hành trình mua hàng trực tiếp","Direct shopping journey"]],"Case study không sử dụng tỷ lệ traffic retained, số lượng URL redirect hoặc số sản phẩm migration do không có số liệu chính xác.","The case study does not claim traffic-retention rates, redirect counts or migrated-product totals because exact data is unavailable.")}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("03 · VAI TRÒ","Phạm vi phụ trách xuyên suốt dự án","Responsibilities across the project")}
  ${cards([["01","Quy hoạch cấu trúc & chuyển đổi nội dung","Structure planning & content migration","Kiểm kê, làm sạch và ánh xạ nội dung sang cấu trúc mới.","Audited, cleaned and mapped content into the new structure."],["02","Tối ưu trải nghiệm & tính năng mua sắm","Shopping experience & functionality","Định hướng các luồng tìm kiếm, so sánh, PDP, giỏ hàng và hỗ trợ.","Shaped search, comparison, PDP, cart and support journeys."],["03","Lập kế hoạch & điều phối dự án","Planning & coordination","Kết nối Marketing, E-commerce, SEO, agency và các bộ phận nội bộ.","Aligned Marketing, E-commerce, SEO, agency and internal teams."],["04","Chuyển dữ liệu, nghiệm thu & triển khai","Migration, UAT & launch","Theo dõi dữ liệu, review chức năng và phối hợp nghiệm thu trước launch.","Tracked data, reviewed functions and coordinated UAT before launch."]])}
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("04 · WEBSITE LIVE","Trải nghiệm website sau chuyển đổi","The live experience after migration","Các màn hình thực tế thể hiện hệ thống điều hướng, tìm kiếm, lọc, so sánh và mua hàng trên desktop và mobile.","Live screens show navigation, search, filters, comparison and shopping across desktop and mobile.")}
  ${carousel("epicure",epicureProofs,20)}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("05 · CẤU TRÚC WEBSITE","Xây dựng lại cấu trúc danh mục","Rebuilding the catalogue structure","Cấu trúc mới xoay quanh bốn nhóm danh mục chính và vẫn có khả năng mở rộng khi doanh nghiệp bổ sung thương hiệu hoặc ngành hàng.","The new structure is organized around four core categories and can expand as new brands or product lines are added.")}
  <div class="v22-square-flow reveal">${[["Máy pha cà phê","Coffee machines"],["Thiết bị gia dụng cao cấp","Premium home appliances"],["Cà phê","Coffee"],["Phụ kiện & linh kiện","Accessories & spare parts"]].map(([vi,en])=>t("div",vi,en,"v22-square")).join("")}</div>
  <div class="v22-media-grid two mt-12"><figure class="v22-media-card landscape contain reveal">${image("epicure","Sitemap.jpg","Sitemap website EPICURE","EPICURE website sitemap")}</figure><figure class="v22-media-card landscape contain reveal">${image("epicure","Figma.jpg","Quá trình phối hợp và review trên Figma","Figma collaboration and review")}</figure></div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("06 · MIGRATION","Chuyển đổi nền tảng & bảo toàn SEO","Platform transition & SEO preservation","Hai hình trắng trong bộ asset được thay bằng các khối HTML responsive theo đúng layout mô phỏng.","The two blank supplied assets are replaced by responsive HTML blocks following the reference layout.")}
  <div class="v22-platform-transition reveal"><article class="v22-platform-card"><img src="${asset("epicure","Logo Wordpress.jpg")}" alt="WordPress"><strong>WordPress</strong></article><div class="v22-platform-arrow">→</div><article class="v22-platform-card"><img src="${asset("epicure","Logo Haravan.jpg")}" alt="Haravan"><strong>Haravan</strong></article></div>
  <div class="v22-flow-row mt-10 reveal">${[["Rà soát","Audit"],["Mapping & lên kế hoạch","Mapping & planning"],["Di chuyển","Migration"],["Kiểm tra","Validation"],["Launch","Launch"]].map(([vi,en])=>t("div",vi,en,"v22-flow-step")).join("")}</div>
  <div class="v22-media-grid two mt-12"><figure class="v22-media-card landscape contain reveal">${image("epicure","Content Inventory.jpg","Bảng kiểm kê nội dung","Content inventory")}</figure><figure class="v22-media-card landscape contain reveal">${image("epicure","URL Mapping.jpg","Bản đồ chuyển hướng URL","URL redirect mapping")}</figure></div>
  <div class="v22-logo-strip mt-12 reveal">${["Logo Wordpress.jpg","Logo Haravan.jpg","Logo Google Analytics.jpg","Logo Google Tag manager.jpg","Logo Meta.jpg","Logo Amis.jpg"].map(name=>logo("epicure",name,name.replace(/Logo |\.jpg/g,""))).join("")}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("07 · USER FLOW","Thiết kế các hành trình trọng yếu","Designing the core user journeys")}
  ${mediaGrid("epicure",[["User Flow - 01.jpg","Luồng mua hàng và hỗ trợ","Purchase and support flow"],["User Flow - 02.jpg","Luồng nội dung SEO đến sản phẩm","SEO content-to-product flow"],["User Flow - 03.jpg","Luồng xem chính sách và ra quyết định","Trust and policy review flow"]],"three","contain")}
</div></section>
<section class="v22-section v22-section-purple"><div class="v22-shell">
  ${heading("08 · DIGITAL HUB","Website trở thành trung tâm kết nối digital","The website as a connected digital hub","Luồng sản phẩm, đơn hàng và dữ liệu khách hàng được kết nối với AMIS, social và các sàn thương mại điện tử.","Product, order and customer data connect with AMIS, social channels and marketplaces.")}
  <figure class="v22-media-card landscape contain reveal">${image("epicure","Digital hub - CRM diagram.jpg","Sơ đồ trung tâm kết nối digital","Digital hub and CRM diagram")}</figure>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("09 · UAT","Nghiệm thu chức năng & dữ liệu","Functional and data validation")}
  ${mediaGrid("epicure",[["UAT, Function Matrix, Product data proof.jpg","Bảng theo dõi UAT","UAT tracking matrix"],["UAT, Function Matrix, Product data proof (2).jpg","Bảng chuẩn hóa dữ liệu sản phẩm","Product-data standardization"],["UAT, Function Matrix, Product data proof (3).jpg","Bằng chứng kiểm tra dữ liệu","Data-validation evidence"]],"three","contain")}
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("10 · KEY LEARNING","Bài học chính","Key learning")}
  ${cards([["01","Chốt phạm vi ngay từ đầu","Lock the scope early","Thống nhất wireframe, yêu cầu kỹ thuật, tiêu chuẩn SEO và tiêu chí nghiệm thu trước khi đi vào thiết kế chi tiết.","Align wireframes, technical requirements, SEO standards and acceptance criteria before detailed design."],["02","Luôn có buffer time","Protect the timeline with buffer time","Dự án nhiều phòng ban cần timeline rõ ràng và quỹ thời gian dự phòng cho các hạng mục phụ thuộc.","Cross-functional projects need a clear timeline and realistic buffers for dependent workstreams."]],"two")}
</div></section>
${footer("b2b-event-marketing-trade-show-activation.html","Tổ chức sự kiện & quảng bá thương hiệu offline","Offline Event Marketing & Brand Activation")}`;

const eventsMain = `${hero({
  group:"events", desktop:"Hero Desktop.jpg", mobile:"Hero Mobile.jpg",
  kickerVi:"CASE STUDY · EVENT MARKETING · 09/2023–05/2026", kickerEn:"CASE STUDY · EVENT MARKETING · 09/2023–05/2026",
  titleVi:"Tổ chức sự kiện & quảng bá thương hiệu offline", titleEn:"Offline Event Marketing & Brand Activation",
  subtitleVi:"Từ trade show đến activation: biến trải nghiệm trực tiếp thành điểm chạm thương hiệu, lead và cơ hội thương mại.",
  subtitleEn:"From trade shows to activation: turning in-person experiences into brand touchpoints, leads and commercial opportunities.",
  tags:[["Event planning","Event planning"],["Booth & activation","Booth & activation"],["Lead capture","Lead capture"],["On-site operation","On-site operation"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Thiết kế trải nghiệm thương hiệu ngoài đời thực","Designing real-world brand experiences","Phụ trách lập kế hoạch, phối hợp đối tác và vận hành các sự kiện cho SMEG, EPICURE và Lavazza trên nhiều quy mô khác nhau.","Planned, coordinated and operated events for SMEG, EPICURE and Lavazza across different formats and scales.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Mỗi hoạt động được xây dựng như một hành trình hoàn chỉnh: thu hút sự chú ý, giới thiệu sản phẩm, tạo trải nghiệm dùng thử, thu thập lead và hỗ trợ đối thoại thương mại.","Each activation was designed as a complete journey: attract attention, present products, enable sampling, capture leads and support commercial conversations.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>Event Marketing Lead</strong></article><article>${t("span","Thời gian","Period")}<strong>09/2023–05/2026</strong></article><article>${t("span","Thương hiệu","Brands")}<strong>SMEG · EPICURE · Lavazza</strong></article><article>${t("span","Phạm vi","Scope")}<strong>Planning · On-site · Leads</strong></article></div></div>
  <div class="v22-logo-strip mt-12 reveal">${["Logo Smeg.jpg","Logo Epicure.jpg","Logo Lavazza.jpg","Logo Cafeshow.jpg","Logo FHV.jpg","Logo MTE.jpg","Logo Italian Cuisine Week.jpg"].map(name=>logo("events",name,name.replace(/Logo |\.jpg/g,""))).join("")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Tác động qua các chương trình offline","Impact across offline programs")}
  ${metrics([["15+","Sự kiện & hoạt động đã triển khai","Events and activations delivered"],["~3K","Lượt khách tiếp cận trực tiếp","On-site visitors reached"],["2K+","Lead được ghi nhận","Leads captured"],["100+","Đối thoại thương mại","Commercial conversations"]])}
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("03 · VIETNAM CAFESHOW","Tạo điểm đến nổi bật tại triển lãm","Creating a standout exhibition destination","Carousel căn giữa tự động lướt liên tục; ảnh giữa hiển thị đầy đủ, hai bên tạo hiệu ứng peek và hỗ trợ vuốt trên thiết bị di động.","A centered, continuously looping carousel keeps the active image fully visible, previews adjacent slides and supports touch swiping.")}
  ${carousel("events",series("Cafeshow booth gallery",8,"Không gian booth Vietnam CafeShow","Vietnam CafeShow booth"),18)}
  <div class="mt-12">${carousel("events",series(")n site team - activation",4,"Đội ngũ vận hành và activation","On-site team and activation"),20)}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("04 · TRADE SHOWS","Đa dạng hóa điểm chạm ngành F&B","Diversifying F&B industry touchpoints")}
  ${t("h3","Food & Hospitality Vietnam 2026","Food & Hospitality Vietnam 2026","v22-kicker")}
  ${carousel("events",series("FHV 2026",5,"Hoạt động tại FHV 2026","FHV 2026 activation"),19)}
  <div class="mt-16">${t("h3","Meet The Expert 2026","Meet The Expert 2026","v22-kicker")}${carousel("events",series("MTE 2026",4,"Meet The Expert 2026","Meet The Expert 2026"),21)}</div>
  <div class="mt-16">${t("h3","Italian Cuisine Week 2025","Italian Cuisine Week 2025","v22-kicker")}${carousel("events",series("Italian Cuisine Week 2025",5,"Tuần lễ Ẩm thực Ý 2025","Italian Cuisine Week 2025"),19)}</div>
</div></section>
<section class="v22-section v22-section-purple"><div class="v22-shell">
  ${heading("05 · PRODUCT EXPERIENCE","Biến sản phẩm thành trải nghiệm trực tiếp","Turning products into hands-on experiences")}
  ${carousel("events",series("Product Showcase",11,"Trưng bày và trình diễn sản phẩm","Product showcase and demonstration"),17)}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("06 · LEAD & OPERATION","Vận hành tại chỗ và thu thập lead","On-site operation and lead capture")}
  ${mediaGrid("events",series("Lead Capture",3,"Hoạt động thu thập lead","Lead-capture activity"),"three","editorial")}
  <div class="mt-12">${mediaGrid("events",series("Onsite Operation",3,"Vận hành tại sự kiện","On-site operation"),"three","editorial")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("07 · SAMPLING ACTIVATION","Sampling, Partners & KOLs trong cùng một hành trình","Sampling, Partners & KOLs in one journey","Bốn ảnh Partners/KOLs mới đã được gom đúng vào nhóm Sampling Activation theo yêu cầu.","The four new Partners/KOLs images are incorporated into the Sampling Activation group as requested.")}
  ${carousel("events",series("Sampling Activation",10,"Sampling Activation, Partners và KOLs","Sampling Activation, Partners and KOLs"),17)}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("08 · ENGAGEMENT","Duy trì tương tác từ quà tặng đến đối thoại","Sustaining engagement from gifts to conversations")}
  ${carousel("events",series("Visitors Engagement - Gifts",7,"Tương tác khách tham quan và quà tặng","Visitor engagement and gifts"),19)}
  <div class="mt-16">${carousel("events",series("Commercial Conversation",4,"Đối thoại thương mại tại sự kiện","Commercial conversations on site"),21)}</div>
</div></section>
${footer("ecommerce-growth-marketplace-operations.html","Quản lý bán hàng đa kênh thương mại điện tử","Omnichannel E-commerce Operations")}`;

const ecommerceMain = `${hero({
  group:"ecommerce", desktop:"Hero Desktop.jpg", mobile:"Hero Mobile.jpg",
  kickerVi:"CASE STUDY · E-COMMERCE", kickerEn:"CASE STUDY · E-COMMERCE",
  titleVi:"Quản lý bán hàng đa kênh thương mại điện tử", titleEn:"Omnichannel E-commerce & Marketplace Operations",
  subtitleVi:"Chuẩn hóa vận hành gian hàng, nội dung sản phẩm và hệ thống campaign creative trên Shopee, Lazada và TikTok Shop.",
  subtitleEn:"Standardizing storefront operations, product content and campaign creatives across Shopee, Lazada and TikTok Shop.",
  tags:[["Marketplace operations","Marketplace operations"],["Product content","Product content"],["Campaign creative","Campaign creative"],["Sales growth","Sales growth"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Một hệ vận hành xuyên suốt nhiều thương hiệu","One operating system across multiple brands","Dự án kết nối quản trị gian hàng, chuẩn hóa nội dung và triển khai campaign cho SMEG, EPICURE, Lavazza và Breville.","The project connects storefront management, content standardization and campaign execution for SMEG, EPICURE, Lavazza and Breville.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Mục tiêu không chỉ là đưa sản phẩm lên sàn, mà còn xây trải nghiệm nhất quán từ nhận diện gian hàng, nội dung PDP đến banner campaign và vận hành bán hàng hằng ngày.","The goal was not simply to list products, but to create a consistent experience from storefront branding and PDP content to campaign banners and daily sales operations.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>E-commerce Manager</strong></article><article>${t("span","Thương hiệu","Brands")}<strong>4 brands</strong></article><article>${t("span","Kênh","Channels")}<strong>Shopee · Lazada · TikTok Shop</strong></article><article>${t("span","Phạm vi","Scope")}<strong>Store · PDP · Campaign</strong></article></div></div>
  <div class="v22-logo-strip mt-12 reveal">${["Smeg Logo.jpg","Epicure Logo.jpg","Lavazza Logo.jpg","Breville Logo.jpg","Shopee Logo.jpg","Lazada Logo.jpg","Tiktokshop Logo.jpg"].map(name=>logo("ecommerce",name,name.replace(/ Logo|\.jpg/g,""))).join("")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Kết quả vận hành đa kênh","Omnichannel operating outcomes")}
  ${metrics([["2×","Doanh thu E-commerce 2025 so với 2024","2025 E-commerce revenue vs. 2024"],["~1K","Đơn hàng Breville 2024–2025","Breville orders in 2024–2025"],["233","SKU được quản lý tại 05/2026","SKUs managed as of 05/2026"],["6","Gian hàng Shopee + TikTok Shop","Shopee + TikTok Shop stores"]])}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("03 · STOREFRONT SYSTEM","Chuẩn hóa hình ảnh gian hàng theo thương hiệu","Standardizing each brand storefront")}
  ${mediaGrid("ecommerce",[["Epicure Store device mockup.jpg","Gian hàng EPICURE trên thiết bị","EPICURE storefront device mockup"],["Smeg Store device mockup.jpg","Gian hàng SMEG trên thiết bị","SMEG storefront device mockup"],["Lavazza Store device mockup.jpg","Gian hàng Lavazza trên thiết bị","Lavazza storefront device mockup"]],"three","contain")}
  <div class="mt-12">${mediaGrid("ecommerce",[["Epicure Store background show theme.jpg","Hệ hình ảnh gian hàng EPICURE","EPICURE storefront theme"],["Smeg Store background showtheme.jpg","Hệ hình ảnh gian hàng SMEG","SMEG storefront theme"],["Lavazza Store background showtheme.jpg","Hệ hình ảnh gian hàng Lavazza","Lavazza storefront theme"]],"three","landscape")}</div>
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("04 · PRODUCT CONTENT","Từ key visual đến mô tả sản phẩm","From key visuals to product descriptions")}
  ${mediaGrid("ecommerce",series("Product Visual",3,"Product visual theo thương hiệu","Brand product visual"),"three","contain")}
  <div class="mt-12">${mediaGrid("ecommerce",series("Product description",3,"Nội dung mô tả sản phẩm","Product description content"),"three","contain")}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("05 · VERTICAL CAMPAIGN","Banner campaign dọc","Vertical campaign banners","Ba banner dọc giữ nguyên tỷ lệ ảnh gốc và được trình bày như một bộ creative thống nhất.","Three portrait banners preserve their original ratios and are presented as a cohesive creative set.")}
  ${mediaGrid("ecommerce",series("Banner  Campaign Dọc",3,"Banner campaign dọc","Vertical campaign banner","portrait"),"three","portrait")}
</div></section>
<section class="v22-section v22-section-red"><div class="v22-shell">
  ${heading("06 · CAMPAIGN CAM","Campaign Creative Cam","Orange campaign creatives")}
  ${carousel("ecommerce",series("Campaign Cam",4,"Campaign Creative Cam","Orange campaign creative"),20)}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("07 · CAMPAIGN NÂU","Campaign Creative Nâu","Brown campaign creatives")}
  ${carousel("ecommerce",series("Campaign Nâu",4,"Campaign Creative Nâu","Brown campaign creative"),20)}
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("08 · CAMPAIGN TRẮNG","Campaign Creative Trắng","White campaign creatives")}
  ${carousel("ecommerce",series("Campaign Trắng",4,"Campaign Creative Trắng","White campaign creative"),20)}
</div></section>
<section class="v22-section v22-section-purple"><div class="v22-shell">
  ${heading("09 · CAMPAIGN HỒNG","Bộ ba Campaign Creative Hồng","Three-piece pink campaign creative set","Ba thiết kế có tỷ lệ khác nhau được giữ nguyên tỷ lệ gốc trong layout linh hoạt, không ép crop.","Three designs with different ratios retain their native proportions in a flexible layout without forced cropping.")}
  ${mediaGrid("ecommerce",series("Bộ 3 banner campaign hồng",3,"Banner Campaign Creative Hồng","Pink campaign creative banner"),"three","contain")}
</div></section>
${footer("smeg-digital-brand-system.html","Xây dựng và quản trị các kênh Digital cho SMEG Vietnam","Building SMEG Vietnam's Digital Channels")}`;

const smegMain = `${hero({
  group:"smeg", desktop:"Hero Desktop.jpg", mobile:"Hero Mobile.jpg",
  kickerVi:"CASE STUDY · SMEG VIETNAM · 02/2025–05/2026", kickerEn:"CASE STUDY · SMEG VIETNAM · 02/2025–05/2026",
  titleVi:"Xây dựng & quản trị các kênh Digital cho SMEG Vietnam", titleEn:"Building & Managing SMEG Vietnam's Digital Channels",
  subtitleVi:"Xây nền tảng hiện diện số từ con số 0, thiết lập hệ thống nội dung và chuyển hóa định hướng global thành câu chuyện phù hợp với thị trường Việt Nam.",
  subtitleEn:"Building a digital presence from zero, creating a content system and adapting global direction for the Vietnamese market.",
  tags:[["Digital strategy","Digital strategy"],["Content system","Content system"],["Global to local","Global to local"],["Analytics","Analytics"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Xây nền tảng hiện diện số cho SMEG Vietnam","Building SMEG Vietnam's digital presence","Từ audit ban đầu đến kế hoạch, lịch nội dung, quy trình xuất bản và đo lường hiệu quả trên Facebook và Instagram.","From the initial audit to planning, content calendars, publishing workflows and performance measurement across Facebook and Instagram.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Hệ thống được thiết kế để vừa bảo toàn tinh thần thiết kế Ý của SMEG, vừa tạo nội dung hữu ích, gần gũi và có nhịp xuất bản bền vững cho người dùng Việt Nam.","The system preserves SMEG's Italian design identity while producing useful, relatable content at a sustainable publishing cadence for Vietnamese audiences.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>Digital Marketing Lead</strong></article><article>${t("span","Thời gian","Period")}<strong>02/2025–05/2026</strong></article><article>${t("span","Kênh","Channels")}<strong>Facebook · Instagram</strong></article><article>${t("span","Công cụ","Tools")}<strong>Metricool · Meta</strong></article></div></div>
  <div class="v22-logo-strip mt-12 reveal">${logo("smeg","Logo Smeg.jpg","SMEG")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Tăng trưởng nền tảng và nhịp nội dung","Platform growth and content cadence")}
  ${metrics([["10K+","Người theo dõi Facebook","Facebook followers"],["9K","Người theo dõi Instagram","Instagram followers"],["3/week","Nhịp đăng nội dung","Publishing cadence"],["2","Kênh được xây từ con số 0","Channels built from zero"]])}
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("03 · AUDIT","Rà soát hiện diện thương hiệu","Auditing the brand presence","Bốn ảnh vuông mới thay thế collage cũ và được trình bày bằng carousel giữ nguyên tỷ lệ 1:1.","Four new square images replace the former collage and are shown in a 1:1-preserving carousel.")}
  ${carousel("smeg",series("Brand presence audit collage",4,"Brand presence audit","Brand presence audit","square"),20)}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("04 · STRATEGY","Từ ma trận chiến lược đến lịch nội dung","From strategic matrix to content calendar")}
  ${mediaGrid("smeg",[["Strategic Planning Matrix.jpg","Ma trận chiến lược nội dung","Strategic planning matrix"],["Content Calendar.jpg","Lịch nội dung SMEG Vietnam","SMEG Vietnam content calendar"]],"two","contain")}
  <div class="v22-card-grid mt-12"><article class="v22-card reveal"><span class="v22-card-number">50%</span>${t("h3","Sản phẩm & Thiết kế","Product & Design")}</article><article class="v22-card reveal"><span class="v22-card-number">30%</span>${t("h3","Lifestyle & Cảm hứng sử dụng","Lifestyle & Usage Inspiration")}</article><article class="v22-card reveal"><span class="v22-card-number">10%</span>${t("h3","Di sản & Trải nghiệm thương hiệu","Brand Heritage & Experience")}</article><article class="v22-card reveal"><span class="v22-card-number">10%</span>${t("h3","Khuyến mãi & Thương mại","Promotion & Commerce")}</article></div>
</div></section>
<section class="v22-section v22-section-purple"><div class="v22-shell">
  ${heading("05 · PUBLISHING","Lập lịch và vận hành bằng Metricool","Scheduling and operating with Metricool","Hai ảnh scheduling mới giữ nguyên tỷ lệ thực tế 1920 × 910.","Two updated scheduling screens preserve their native 1920 × 910 ratio.")}
  ${mediaGrid("smeg",series("Metricool - 1902 x 910",2,"Màn hình lập lịch Metricool","Metricool scheduling screen"),"two","contain")}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("06 · CONTENT SYSTEM","Hệ thống nội dung nhất quán","A consistent content system","Ba hình mới trình bày cách các tuyến nội dung cùng tồn tại trong một hệ thị giác chung.","Three updated images show how multiple content streams coexist within one visual system.")}
  ${mediaGrid("smeg",series("Content System Gallery",3,"Content System Gallery","Content System Gallery"),"three","contain")}
  <div class="mt-12">${mediaGrid("smeg",[["Product Roadmap.jpg","Product Roadmap","Product Roadmap"],["Brand Heritage.jpg","Brand Heritage","Brand Heritage"]],"two","contain")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("07 · GLOBAL TO LOCAL","Chuyển hóa nội dung global cho thị trường Việt Nam","Adapting global content for Vietnam","Ba hình cho thấy quá trình lựa chọn, điều chỉnh ngữ cảnh và triển khai local mà vẫn giữ nguyên nhận diện thương hiệu.","Three images show selection, contextual adaptation and local execution while preserving brand identity.")}
  ${mediaGrid("smeg",series("Global to local",3,"Global to local adaptation","Global to local adaptation"),"three","contain")}
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("08 · CHANNEL OUTPUT","Nội dung trên các điểm chạm digital","Content across digital touchpoints")}
  ${mediaGrid("smeg",[["Content Gallery - Instagram.jpg","Content Gallery Instagram","Instagram content gallery"],["Content Gallery Reels.jpg","Content Gallery Reels","Reels content gallery"],["Smeg website screenshot - 1918 x 948.jpg","Website SMEG Vietnam","SMEG Vietnam website"],["E-commerce Mockup.jpg","E-commerce mockup","E-commerce mockup"],["Social Proof.jpg","Bằng chứng kênh Facebook và Instagram","Facebook and Instagram channel proof"]],"three","contain")}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("09 · ANALYTICS","Theo dõi hiệu quả bằng Metricool","Monitoring performance with Metricool","Bốn dashboard được trình bày theo đúng tỷ lệ thực tế 1917 × 882 và có thể mở lightbox để xem chi tiết.","Four dashboards retain their native 1917 × 882 ratio and can be opened in a lightbox for detail.")}
  ${carousel("smeg",series("Metricool Analytcs Dashboard - 1917x882",4,"Metricool Analytics Dashboard","Metricool Analytics Dashboard"),19)}
</div></section>
${footer("breville-christmas-challenge.html","Breville Christmas Challenge","Breville Christmas Challenge")}`;

const brevilleMain = `${hero({
  group:"breville", desktop:"Desktop Hero.jpg", mobile:"Mobile Hero.jpg",
  kickerVi:"CASE STUDY · BREVILLE CHRISTMAS CHALLENGE · 12/2023", kickerEn:"CASE STUDY · BREVILLE CHRISTMAS CHALLENGE · 12/2023",
  titleVi:"Breville Christmas Challenge", titleEn:"Breville Christmas Challenge",
  subtitleVi:"Kích hoạt mùa lễ hội cùng Frank Culinary và Huy Trần thông qua thử thách nội dung đa nền tảng và lời kêu gọi UGC.",
  subtitleEn:"A festive activation with Frank Culinary and Huy Tran, built around cross-platform content and a UGC call-to-action.",
  tags:[["Influencer marketing","Influencer marketing"],["Social campaign","Social campaign"],["UGC activation","UGC activation"],["Cross-platform","Cross-platform"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Tạo câu chuyện Giáng sinh từ sản phẩm Breville","Creating a Christmas story around Breville products","Hai nhà sáng tạo nội dung biến thiết bị nhà bếp thành chất liệu cho công thức mùa lễ hội, đồng thời mời cộng đồng tham gia thử thách.","Two creators turned Breville appliances into the foundation for festive recipes while inviting the community to join the challenge.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Campaign được triển khai đồng thời trên TikTok, Instagram, Facebook và YouTube, bảo đảm mỗi nội dung có định dạng phù hợp với hành vi xem trên từng nền tảng.","The campaign ran across TikTok, Instagram, Facebook and YouTube, with each asset adapted to viewing behavior on its platform.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>Campaign Lead</strong></article><article>${t("span","Thời gian","Period")}<strong>12/2023</strong></article><article>${t("span","Creators","Creators")}<strong>Frank Culinary · Huy Trần</strong></article><article>${t("span","Kênh","Channels")}<strong>TikTok · IG · FB · YouTube</strong></article></div></div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Hiệu quả organic ghi nhận ngày 24/12/2023","Organic results captured on 24 December 2023")}
  ${metrics([["859.4K","Lượt xem","Views"],["308","Bình luận","Comments"],["326","Lượt chia sẻ","Shares"],["30","Bài dự thi UGC","UGC submissions"]])}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("03 · FRANK CULINARY","Công thức mùa lễ hội cùng Frank Culinary","Festive recipe content with Frank Culinary")}
  <div class="v22-overview-grid"><figure class="v22-media-card portrait reveal">${image("breville","Frank Culinary.jpg","Frank Culinary trong Breville Christmas Challenge","Frank Culinary in the Breville Christmas Challenge")}</figure><div>${mediaGrid("breville",series("Recipe Content Gallery - Frank Culinary",3,"Nội dung công thức của Frank Culinary","Frank Culinary recipe content"),"three","portrait")}<div class="v22-link-row reveal"><a href="https://www.tiktok.com/@culinary.frank/video/7310950259503402242" target="_blank" rel="noopener">TikTok ↗</a><a href="https://www.instagram.com/reel/C0rGT1yL6cr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.facebook.com/share/p/1EEJzWJv6A/" target="_blank" rel="noopener">Facebook ↗</a><a href="https://www.youtube.com/shorts/GYJ-Z6LKrZw" target="_blank" rel="noopener">YouTube ↗</a></div></div></div>
  <div class="mt-16">${carousel("breville",series("Social Media Proof - Frank Culinary",4,"Social Media Proof Frank Culinary","Frank Culinary social proof"),20)}</div>
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("04 · HUY TRẦN","Công thức mùa lễ hội cùng Huy Trần","Festive recipe content with Huy Tran")}
  <div class="v22-overview-grid"><figure class="v22-media-card portrait reveal">${image("breville","Huy Tran.jpg","Huy Trần trong Breville Christmas Challenge","Huy Tran in the Breville Christmas Challenge")}</figure><div>${mediaGrid("breville",series("Recipe Content Gallery - Huy Tran",3,"Nội dung công thức của Huy Trần","Huy Tran recipe content"),"three","portrait")}<div class="v22-link-row reveal"><a href="https://www.tiktok.com/@huy.trn/video/7309847703503097095" target="_blank" rel="noopener">TikTok ↗</a><a href="https://www.instagram.com/reel/C0jeHPTI2v8/" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.facebook.com/share/v/1czjpBQP7P/" target="_blank" rel="noopener">Facebook ↗</a></div></div></div>
  <div class="mt-16">${carousel("breville",series("Social Media Proof Huy Trần",4,"Social Media Proof Huy Trần","Huy Tran social proof"),20)}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("05 · KEY LEARNING","Bài học chính","Key learning")}
  ${cards([["01","Một ý tưởng, nhiều định dạng","One idea, multiple formats","Giữ một trục sáng tạo xuyên suốt nhưng điều chỉnh cách mở đầu, nhịp dựng và CTA theo từng nền tảng.","Maintain one creative idea while adapting hooks, pacing and calls-to-action by platform."],["02","Creator fit quan trọng hơn độ phủ đơn thuần","Creator fit matters beyond reach","Sự phù hợp về kỹ năng, phong cách nội dung và cộng đồng giúp sản phẩm xuất hiện tự nhiên hơn.","Alignment in expertise, content style and audience makes product integration feel more natural."]],"two")}
</div></section>
${footer("saint-lbeau.html","Xây dựng nội dung kết hợp Affiliate Marketing","Content & Affiliate Marketing")}`;

const affiliateMain = `${hero({
  group:"affiliate", desktop:"Desktop Hero.jpg", mobile:"Mobile Hero.jpg",
  kickerVi:"CASE STUDY · SAINT L’BEAU · 11/2021–01/2023", kickerEn:"CASE STUDY · SAINT L’BEAU · 11/2021–01/2023",
  titleVi:"Xây dựng nội dung kết hợp Affiliate Marketing", titleEn:"Content Strategy & Affiliate Marketing",
  subtitleVi:"Xây hệ thống nội dung đa thương hiệu, kết hợp video giáo dục, social commerce và mạng lưới creator để hỗ trợ tăng trưởng.",
  subtitleEn:"Building a multi-brand content system that combines educational video, social commerce and a creator network to support growth.",
  tags:[["Content strategy","Content strategy"],["Video production","Video production"],["Creator network","Creator network"],["Affiliate commerce","Affiliate commerce"]]
})}
<section class="v22-section"><div class="v22-shell">
  ${heading("01 · TỔNG QUAN","Nội dung là hạ tầng cho Affiliate Marketing","Content as the infrastructure for affiliate marketing","Dự án phát triển nội dung cho Iris Care, Pebble, tmrbae và ToningMe Tea dưới hệ sinh thái Saint L’Beau.","The project developed content for Iris Care, Pebble, tmrbae and ToningMe Tea within the Saint L'Beau ecosystem.")}
  <div class="v22-overview-grid reveal"><div>${t("p","Thay vì tách rời branding và bán hàng, hệ thống liên kết key visual, nội dung giáo dục, video, social proof và creator activation thành một hành trình hỗ trợ chuyển đổi.","Rather than separating branding from commerce, the system connects key visuals, educational content, video, social proof and creator activation into one conversion-supporting journey.","v22-lead")}</div><div class="v22-meta-grid"><article>${t("span","Vai trò","Role")}<strong>Content &amp; Affiliate Lead</strong></article><article>${t("span","Thời gian","Period")}<strong>11/2021–01/2023</strong></article><article>${t("span","Danh mục","Portfolio")}<strong>4 brands</strong></article><article>${t("span","Phạm vi","Scope")}<strong>Content · Video · Affiliate</strong></article></div></div>
  <div class="v22-logo-strip mt-12 reveal">${["Logo Saint L'Beau.jpg","Logo Iris.jpg","Logo Pebble.jpg","Logo Tmrbae.jpg","Logo Toningme Tea.jpg"].map(name=>logo("affiliate",name,name.replace(/Logo |\.jpg/g,""))).join("")}</div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("02 · KẾT QUẢ","Kết quả nổi bật","Selected outcomes")}
  ${metrics([["200+","KOC/TikTok creator trong mạng lưới","KOC/TikTok creators in the network"],["3,000+","Follower Shopee trong 2 tháng","Shopee followers in two months"],["15%+","Doanh thu Q4 so với Q3/2022","Q4 revenue vs. Q3 2022"],["Top #2","Pebble Fleur trên marketplace","Pebble Fleur marketplace ranking"]])}
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("03 · CONTENT PLANNING","Từ kế hoạch đến hệ thống triển khai","From plan to execution system")}
  <figure class="v22-media-card landscape contain reveal">${image("affiliate","Content Calender.jpg","Content Calendar Affiliate Marketing","Affiliate Marketing content calendar")}</figure>
</div></section>
<section class="v22-section v22-section-purple"><div class="v22-shell">
  ${heading("04 · IRIS CARE","Giáo dục sản phẩm bằng nội dung chuyên gia","Expert-led product education","Iris Key Visual được trình bày cùng logo và phần nội dung HTML theo yêu cầu.","The Iris Key Visual is presented with a separate logo and HTML copy as requested.")}
  <article class="v22-brand-visual reveal"><div class="v22-brand-visual-copy"><img src="${asset("affiliate","Logo Iris.jpg")}" alt="Iris Care">${t("h3","Iris Care","Iris Care")}${t("p","Xây nội dung giải thích sản phẩm theo hướng dễ hiểu, có chuyên gia trình bày và kết nối trực tiếp với nhu cầu người dùng.","Educational product content presented in an accessible expert-led format and connected to real user needs.")}</div>${image("affiliate","Iris Keyvisual.jpg","Iris Care Key Visual","Iris Care Key Visual")}</article>
  <div class="mt-12">${mediaGrid("affiliate",series("Iris Gallery - 1920 x 1300",3,"Iris Care social content","Iris Care social content"),"three","editorial")}</div>
  <div class="mt-12">${mediaGrid("affiliate",[["Iris Care Presenter - 1920 x 1300.jpg","Hình chuyên gia trình bày Iris Care","Iris Care expert presenter"]],"two","editorial")}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("05 · PEBBLE & TMRBAE","Key Visual giữ nguyên thiết kế gốc","Key visuals preserved as supplied","Hai key visual đã có sẵn logo và nội dung, vì vậy không chèn thêm bất kỳ lớp chữ hoặc logo nào.","Both supplied key visuals already contain logos and copy, so no additional overlays are added.")}
  <div class="v22-media-grid two"><figure class="v22-key-visual-plain reveal">${image("affiliate","Pebble Key Visual.jpg","Pebble Key Visual nguyên bản","Original Pebble Key Visual")}</figure><figure class="v22-key-visual-plain reveal">${image("affiliate","Tmrbae Key Visual.jpg","tmrbae Key Visual nguyên bản","Original tmrbae Key Visual")}</figure></div>
</div></section>
<section class="v22-section v22-section-soft"><div class="v22-shell">
  ${heading("06 · TONINGME TEA","Từ nội dung lifestyle đến video hướng dẫn","From lifestyle content to instructional video","ToningMe Tea Key Visual được ghép cùng logo và phần nội dung HTML; ảnh gốc vẫn giữ nguyên tỷ lệ.","The ToningMe Tea Key Visual is paired with a separate logo and HTML copy while preserving its original ratio.")}
  <article class="v22-brand-visual reveal"><div class="v22-brand-visual-copy"><img src="${asset("affiliate","Logo Toningme Tea.jpg")}" alt="ToningMe Tea">${t("h3","ToningMe Tea","ToningMe Tea")}${t("p","Phát triển nội dung hướng dẫn sử dụng, biến sản phẩm thành một phần của thói quen hằng ngày và hỗ trợ creator diễn giải lợi ích rõ ràng.","Usage-led content makes the product part of a daily routine and helps creators communicate benefits clearly.")}</div>${image("affiliate","Toningme Tea Key visual.jpg","ToningMe Tea Key Visual","ToningMe Tea Key Visual")}</article>
  <div class="mt-12">${mediaGrid("affiliate",[["Toningme Tea presenter image.jpg","Hình trình bày ToningMe Tea","ToningMe Tea presenter"]],"two","portrait")}</div>
</div></section>
<section class="v22-section v22-section-dark"><div class="v22-shell">
  ${heading("07 · VIDEO SYSTEM","Lập kế hoạch, storyboard và sản xuất video","Planning, storyboarding and producing video")}
  <figure class="v22-media-card landscape contain reveal">${image("affiliate","Video production plan - storyboard.jpg","Kế hoạch sản xuất video và storyboard","Video production plan and storyboard")}</figure>
  <div class="v22-video-grid mt-12 reveal"><article class="v22-video-card"><video controls preload="metadata" poster="${asset("affiliate","Iris Keyvisual.jpg")}"><source src="../saint-lbeau/iris-care-expert-product-education-film.mp4" type="video/mp4"></video>${t("p","Iris Care · Expert Product Education","Iris Care · Expert Product Education")}</article><article class="v22-video-card"><video controls preload="metadata" poster="${asset("affiliate","Toningme Tea Key visual.jpg")}"><source src="../saint-lbeau/toningme-tea-fruit-preparation.mp4" type="video/mp4"></video>${t("p","ToningMe Tea · Fruit Preparation","ToningMe Tea · Fruit Preparation")}</article><article class="v22-video-card"><video controls preload="metadata" poster="${asset("affiliate","Toningme Tea Key visual.jpg")}"><source src="../saint-lbeau/toningme-tea-milk-tea.mp4" type="video/mp4"></video>${t("p","ToningMe Tea · Milk Tea","ToningMe Tea · Milk Tea")}</article></div>
  <div class="mt-12">${mediaGrid("affiliate",series("Youtube Thumbnail",2,"YouTube Thumbnail","YouTube Thumbnail"),"two","landscape")}</div>
</div></section>
<section class="v22-section"><div class="v22-shell">
  ${heading("08 · SOCIAL COMMERCE","Đưa nội dung vào điểm bán và mạng lưới creator","Connecting content to commerce and creators")}
  <figure class="v22-media-card landscape contain reveal">${image("affiliate","E-commerce Showcase.jpg","E-commerce showcase","E-commerce showcase")}</figure>
  <div class="mt-16">${carousel("affiliate",series("Affiliate Tiktok Proof",4,"Affiliate TikTok Proof","Affiliate TikTok Proof","portrait"),20)}</div>
</div></section>
${footer("epicure-website-replatforming.html","Xây dựng website & tối ưu SEO cho EPICURE","EPICURE Website Replatforming & SEO")}`;

const pages = {
  "epicure-website-replatforming.html": documentShell({titleVi:"Xây dựng website & tối ưu SEO cho EPICURE",titleEn:"EPICURE Website Replatforming & SEO",description:"Case study xây dựng website và tối ưu SEO cho EPICURE của Trần Quang Nhật.",accent:"#c11818",main:epicureMain}),
  "b2b-event-marketing-trade-show-activation.html": documentShell({titleVi:"Tổ chức sự kiện & quảng bá thương hiệu offline",titleEn:"Offline Event Marketing & Brand Activation",description:"Case study tổ chức sự kiện và quảng bá thương hiệu offline của Trần Quang Nhật.",accent:"#4e284b",main:eventsMain}),
  "ecommerce-growth-marketplace-operations.html": documentShell({titleVi:"Quản lý bán hàng đa kênh thương mại điện tử",titleEn:"Omnichannel E-commerce & Marketplace Operations",description:"Case study quản lý bán hàng đa kênh thương mại điện tử của Trần Quang Nhật.",accent:"#c11818",main:ecommerceMain}),
  "smeg-digital-brand-system.html": documentShell({titleVi:"SMEG Vietnam Digital Channels",titleEn:"SMEG Vietnam Digital Channels",description:"Case study xây dựng và quản trị các kênh Digital cho SMEG Vietnam của Trần Quang Nhật.",accent:"#4e284b",main:smegMain}),
  "breville-christmas-challenge.html": documentShell({titleVi:"Breville Christmas Challenge",titleEn:"Breville Christmas Challenge",description:"Case study Breville Christmas Challenge của Trần Quang Nhật.",accent:"#c11818",main:brevilleMain}),
  "saint-lbeau.html": documentShell({titleVi:"Xây dựng nội dung kết hợp Affiliate Marketing",titleEn:"Content Strategy & Affiliate Marketing",description:"Case study xây dựng nội dung kết hợp Affiliate Marketing của Trần Quang Nhật.",accent:"#4e284b",main:affiliateMain}),
};

for (const [filename, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(root, "projects", filename), content, "utf8");
}
