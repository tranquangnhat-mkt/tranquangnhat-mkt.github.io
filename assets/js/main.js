const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const toast = document.getElementById("toast");
const modal = document.getElementById("projectModal");

const translations = {
  vi: {
    "nav.about": "Giới thiệu",
    "nav.experience": "Kinh nghiệm",
    "nav.projects": "Dự án",
    "nav.skills": "Kỹ năng",
    "nav.contact": "Liên hệ",
    "hero.status": "Open to Marketing opportunities",
    "hero.headline": "Trăn trở của tôi là tìm lời giải cho những trăn trở của bạn.",
    "hero.intro": "Marketing Professional với hơn 3 năm kinh nghiệm trong lĩnh vực hàng tiêu dùng, cà phê và thiết bị gia dụng cao cấp. Có kinh nghiệm triển khai Marketing Plan, IMC Campaign, Trade Marketing và Product Launch.",
    "hero.primaryCta": "Xem dự án",
    "hero.secondaryCta": "Tải CV",
    "metrics.experience": "năm kinh nghiệm",
    "metrics.growth": "tăng trưởng doanh thu",
    "metrics.experienceFull": "Năm kinh nghiệm Marketing",
    "metrics.revenueFull": "Tăng trưởng doanh thu công ty năm 2025",
    "metrics.top4": "Thương hiệu máy pha cà phê trên sàn",
    "metrics.budget": "Ngân sách chiến dịch tích hợp đã triển khai",
    "common.sampleImage": "Ảnh mẫu — thay sau",
    "common.updating": "Đang cập nhật",
    "common.caseUpdating": "Case study đang hoàn thiện",
    "about.eyebrow": "VỀ TÔI",
    "about.title": "Marketing bắt đầu từ việc hiểu đúng vấn đề.",
    "about.intro": "Thế mạnh của tôi nằm ở Brand Execution, Market Research, POSM & Activation và khả năng phối hợp đa phòng ban nhằm chuyển kế hoạch thành hoạt động cụ thể.",
    "about.career": "Tôi mong muốn được phát triển và gắn bó lâu dài trong một môi trường chuyên nghiệp, có lộ trình thăng tiến rõ ràng, đặc biệt tại các doanh nghiệp thuộc lĩnh vực FMCG, thực phẩm, đồ uống và những ngành hàng gắn với nông nghiệp Việt Nam.",
    "about.value": "Giá trị nghề nghiệp tôi theo đuổi là sự chủ động trong công việc và tinh thần ownership cao: hiểu vấn đề, chịu trách nhiệm với đầu ra và phối hợp đến khi công việc hoàn tất.",
    "about.strength1": "Triển khai nội dung, social media, quảng cáo và hoạt động thu hút khách hàng đa kênh.",
    "about.strength2": "Kết nối mục tiêu kinh doanh, insight thị trường và dữ liệu triển khai để đưa ra hành động phù hợp.",
    "about.strength3": "Phối hợp Digital, E-commerce, Trade Marketing, POSM và Activation thành một kế hoạch thống nhất.",
    "experience.eyebrow": "KINH NGHIỆM",
    "experience.title": "Từ nội dung số đến marketing tích hợp.",
    "experience.epicureSummary": "Triển khai hoạt động marketing tích hợp cho danh mục máy pha cà phê, thiết bị gia dụng cao cấp và cà phê, với các thương hiệu nổi bật gồm Breville, SMEG và Lavazza.",
    "experience.phase1": "Tập trung vào ngành hàng máy pha cà phê, đặc biệt là thương hiệu Breville.",
    "experience.phase2": "Mở rộng sang thiết bị gia dụng cao cấp SMEG, Digital Marketing, triển lãm ngành và hoạt động tại điểm bán.",
    "experience.phase3": "Phụ trách thêm việc xây dựng chiến lược Marketing và ra mắt thương hiệu cà phê cao cấp Lavazza tại Việt Nam.",
    "experience.resp1Title": "Integrated Campaigns",
    "experience.resp1": "Lập kế hoạch, ngân sách, nội dung, POSM, activation và phối hợp nhà cung cấp.",
    "experience.resp2Title": "Digital & E-commerce",
    "experience.resp2": "Vận hành social, website, sàn thương mại điện tử, influencer và affiliate.",
    "experience.resp3Title": "Trade & BTL",
    "experience.resp3": "Triển khai catalogue, voucher, quầy trưng bày, wobbler và hoạt động tại điểm bán.",
    "experience.resp4Title": "Regional Coordination",
    "experience.resp4": "Phối hợp Sales, Supply Chain, Finance, đối tác tại Úc và Ý; báo cáo hiệu quả định kỳ.",
    "experience.highlights": "HIGHLIGHTS",
    "experience.highlight1": "Góp phần giúp doanh thu công ty năm 2025 tăng 2,3 lần so với năm 2024.",
    "experience.highlight2": "Góp phần đưa Breville vào Top 4 thương hiệu máy pha cà phê cao cấp trên Shopee và Lazada giai đoạn 2024–2025.",
    "experience.highlight3": "Triển khai chiến dịch marketing tích hợp với ngân sách hơn 50.000 USD.",
    "experience.highlight4": "Thực hiện activation tại hơn 10 sự kiện thương mại lớn.",
    "experience.maybeRole": "Biên tập viên nội dung",
    "experience.maybeSummary": "Tham gia nghiên cứu chủ đề, biên tập nội dung và phát triển các định dạng social content. Phần mô tả chi tiết sẽ được bổ sung khi hoàn thiện dữ liệu dự án.",
    "experience.saintSummary": "Tham gia triển khai các hoạt động Marketing cho ngành hàng thiết bị làm đẹp và chăm sóc cá nhân. Nội dung chi tiết sẽ được cập nhật ở phiên bản tiếp theo.",
    "projects.eyebrow": "DỰ ÁN TIÊU BIỂU",
    "projects.title": "Một dự án tốt cần có vấn đề, lựa chọn và kết quả.",
    "projects.note": "Hình ảnh hiện tại là hình mẫu. Bạn có thể thay bằng ảnh thật mà không cần thay đổi bố cục.",
    "projects.brevilleSummary": "Chiến dịch kết hợp influencer, social content và minigame nhằm tăng nhận diện thương hiệu, chứng minh giá trị sản phẩm và tạo tương tác trực tiếp với khách hàng.",
    "projects.viewCase": "Xem case study",
    "projects.ecomTitle": "E-commerce Growth",
    "projects.ecomSummary": "Kết hợp nội dung, influencer, affiliate và hoạt động thúc đẩy bán hàng để nâng mức độ hiện diện của thương hiệu trên Shopee và Lazada.",
    "projects.smegTitle": "Brand Launch & Retail Activation",
    "projects.smegSummary": "Hỗ trợ thực thi hoạt động ra mắt thương hiệu, phát triển POSM, sự kiện ngành và truyền thông tại điểm bán.",
    "projects.lavazzaTitle": "Lavazza Vietnam Market Launch",
    "projects.lavazzaSummary": "Tham gia xây dựng chiến lược Marketing và hoạt động ra mắt thương hiệu cà phê cao cấp Lavazza tại Việt Nam.",
    "skills.eyebrow": "NĂNG LỰC",
    "skills.title": "Kỹ năng chỉ có ý nghĩa khi được chứng minh bằng công việc.",
    "contact.eyebrow": "LIÊN HỆ",
    "contact.title": "Bạn đang có một bài toán Marketing cần được giải?",
    "contact.text": "Tôi sẵn sàng trao đổi về các cơ hội trong Brand Marketing, Digital Marketing, IMC, Trade Marketing và các ngành hàng FMCG, thực phẩm, đồ uống.",
    "contact.linkedinNote": "LinkedIn và CV sẽ được cập nhật sau.",
    "footer.note": "Built with strategy, curiosity and vibe coding.",
    "case.contextTitle": "Bối cảnh",
    "case.context": "Breville là thương hiệu uy tín tại Úc, châu Âu và Bắc Mỹ nhưng vẫn còn mới với nhiều khách hàng Việt Nam, đặc biệt trong ngành hàng máy pha cà phê cao cấp. Thách thức là vừa mở rộng nhận diện, vừa chứng minh chất lượng và giá trị tương xứng của sản phẩm.",
    "case.objectiveTitle": "Mục tiêu",
    "case.objective": "Tăng nhận diện và tương tác với thương hiệu, được theo dõi qua lượt tiếp cận, lượt tương tác và mức độ tham gia thử thách trên các nền tảng social media.",
    "case.roleTitle": "Vai trò",
    "case.role": "Lên ý tưởng và kế hoạch, phối hợp với agency và influencer, xây dựng nội dung social, viết kịch bản video, theo dõi số liệu và báo cáo cho quản lý cùng các bên liên quan.",
    "case.resultTitle": "Kết quả",
    "case.result": "Gần 800.000 lượt xem, gần 20.000 lượt thích, hơn 500 lượt chia sẻ, hơn 50 bài dự thi và hơn 1.000 lượt đề cập #BrevilleVietnam. Sản phẩm được xuất hiện trên Kênh14.",
    "case.learningTitle": "Bài học",
    "case.learning": "Minigame kết hợp influencer không phải một chiến thuật mới, nhưng hiệu quả phụ thuộc vào việc lựa chọn đúng người, đúng sản phẩm và đúng thời điểm. Khi được thiết kế thành một hành trình thống nhất, influencer content và hoạt động tương tác có thể hỗ trợ lẫn nhau thay vì tồn tại như các video rời rạc."
  },

  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.status": "Open to Marketing opportunities",
    "hero.headline": "My concern is finding the right answer to your business concerns.",
    "hero.intro": "Marketing professional with over three years of experience across consumer goods, coffee and premium home appliances. Experienced in marketing planning, integrated campaigns, trade marketing and product launches.",
    "hero.primaryCta": "View projects",
    "hero.secondaryCta": "Download CV",
    "metrics.experience": "years of experience",
    "metrics.growth": "revenue growth",
    "metrics.experienceFull": "Years of Marketing experience",
    "metrics.revenueFull": "Company revenue growth in 2025",
    "metrics.top4": "Coffee-machine brand on marketplaces",
    "metrics.budget": "Integrated campaign budget managed",
    "common.sampleImage": "Sample image — replace later",
    "common.updating": "Updating",
    "common.caseUpdating": "Case study in progress",
    "about.eyebrow": "ABOUT",
    "about.title": "Good marketing starts with understanding the right problem.",
    "about.intro": "My strengths are brand execution, market research, POSM and activation, along with cross-functional coordination that turns plans into tangible action.",
    "about.career": "I aim to build a long-term career in a professional environment with a clear growth path, especially in FMCG, food, beverages and industries connected to Vietnamese agriculture.",
    "about.value": "The professional value I pursue is proactivity and a strong sense of ownership: understand the problem, take responsibility for the output and coordinate until the work is complete.",
    "about.strength1": "Executing content, social media, advertising and multi-channel lead-generation activities.",
    "about.strength2": "Connecting business objectives, market insights and performance data to practical actions.",
    "about.strength3": "Bringing Digital, E-commerce, Trade Marketing, POSM and Activation into one integrated plan.",
    "experience.eyebrow": "EXPERIENCE",
    "experience.title": "From digital content to integrated marketing.",
    "experience.epicureSummary": "Executed integrated marketing for coffee machines, premium home appliances and coffee, including Breville, SMEG and Lavazza.",
    "experience.phase1": "Focused on the coffee-machine category, especially the Breville brand.",
    "experience.phase2": "Expanded into SMEG premium home appliances, digital marketing, trade exhibitions and point-of-sale activities.",
    "experience.phase3": "Took on additional responsibility for developing the marketing strategy and launching Lavazza premium coffee in Vietnam.",
    "experience.resp1Title": "Integrated Campaigns",
    "experience.resp1": "Planned budgets, content, POSM, activations and supplier coordination.",
    "experience.resp2Title": "Digital & E-commerce",
    "experience.resp2": "Managed social, website, marketplaces, influencer and affiliate activities.",
    "experience.resp3Title": "Trade & BTL",
    "experience.resp3": "Delivered catalogues, vouchers, displays, wobblers and point-of-sale activities.",
    "experience.resp4Title": "Regional Coordination",
    "experience.resp4": "Worked with Sales, Supply Chain, Finance and partners in Australia and Italy; reported performance regularly.",
    "experience.highlights": "HIGHLIGHTS",
    "experience.highlight1": "Contributed to 2.3× company revenue growth in 2025 versus 2024.",
    "experience.highlight2": "Helped Breville rank among the Top 4 premium coffee-machine brands on Shopee and Lazada in 2024–2025.",
    "experience.highlight3": "Executed integrated marketing campaigns with budgets exceeding USD 50,000.",
    "experience.highlight4": "Delivered activations at more than 10 major trade events.",
    "experience.maybeRole": "Content Editor",
    "experience.maybeSummary": "Contributed to topic research, content editing and social content formats. Further details will be added when project information is completed.",
    "experience.saintSummary": "Supported marketing activities for beauty and personal-care appliances. More details will be added in the next version.",
    "projects.eyebrow": "SELECTED PROJECTS",
    "projects.title": "A strong project needs a problem, a decision and a result.",
    "projects.note": "The current visuals are placeholders. They can be replaced with real project images without changing the layout.",
    "projects.brevilleSummary": "An influencer, social-content and minigame campaign designed to build brand awareness, demonstrate product value and create direct customer participation.",
    "projects.viewCase": "View case study",
    "projects.ecomTitle": "E-commerce Growth",
    "projects.ecomSummary": "Combined content, influencer, affiliate and sales-promotion activities to strengthen Breville's presence on Shopee and Lazada.",
    "projects.smegTitle": "Brand Launch & Retail Activation",
    "projects.smegSummary": "Supported brand-launch execution, POSM production, industry events and point-of-sale communication.",
    "projects.lavazzaTitle": "Lavazza Vietnam Market Launch",
    "projects.lavazzaSummary": "Contributed to marketing strategy development and the market launch of Lavazza premium coffee in Vietnam.",
    "skills.eyebrow": "CAPABILITIES",
    "skills.title": "Skills matter when they are demonstrated through real work.",
    "contact.eyebrow": "CONTACT",
    "contact.title": "Do you have a Marketing challenge to solve?",
    "contact.text": "I am open to opportunities in Brand Marketing, Digital Marketing, IMC, Trade Marketing and FMCG, food and beverage categories.",
    "contact.linkedinNote": "LinkedIn and CV will be updated later.",
    "footer.note": "Built with strategy, curiosity and vibe coding.",
    "case.contextTitle": "Context",
    "case.context": "Breville is well established in Australia, Europe and North America but was still unfamiliar to many Vietnamese consumers, particularly in the premium coffee-machine category. The challenge was to expand awareness while demonstrating product quality and value.",
    "case.objectiveTitle": "Objective",
    "case.objective": "Increase brand awareness and engagement through social reach, interactions and participation in the campaign challenge.",
    "case.roleTitle": "My role",
    "case.role": "Developed the idea and plan, coordinated with the agency and influencers, created supporting social content, wrote video scripts, tracked performance and reported to managers and stakeholders.",
    "case.resultTitle": "Results",
    "case.result": "Nearly 800,000 views, almost 20,000 likes, more than 500 shares, over 50 challenge entries and more than 1,000 #BrevilleVietnam mentions. The product was also featured on Kenh14.",
    "case.learningTitle": "Learning",
    "case.learning": "Influencer minigames are not new, but performance depends on choosing the right creator, product and timing. When designed as one connected journey, influencer content and audience participation can reinforce each other instead of becoming isolated videos."
  }
};

function setLanguage(language) {
  const copy = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  langToggle.textContent = language === "vi" ? "EN" : "VI";
  localStorage.setItem("portfolio-language", language);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "☀" : "☾";
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", nextTheme);
});

const savedLanguage = localStorage.getItem("portfolio-language") || "vi";
setLanguage(savedLanguage);

langToggle.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "vi" ? "en" : "vi";
  setLanguage(nextLanguage);
});

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

document.querySelectorAll(".experience-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".experience-tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".experience-panel").forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`experience-${tab.dataset.experience}`).classList.add("active");
  });
});

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});

document.getElementById("cvButton").addEventListener("click", () => {
  const message = document.documentElement.lang === "vi"
    ? "CV chưa được đính kèm. Hãy đặt file PDF vào assets/documents và cập nhật đường dẫn nút."
    : "The CV is not attached yet. Add the PDF to assets/documents and update the button link.";
  showToast(message);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener("scroll", () => {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  document.getElementById("scrollProgress").style.width = `${progress}%`;
});
