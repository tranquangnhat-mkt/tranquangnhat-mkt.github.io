const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const scrollProgress = document.getElementById("scrollProgress");

const caseTranslations = {
  vi: {
    "nav.about": "Giới thiệu",
    "nav.experience": "Kinh nghiệm",
    "nav.projects": "Dự án",
    "nav.contact": "Liên hệ",
    "case.back": "Quay lại danh sách dự án",
    "case.label": "CASE STUDY · BREVILLE · 2023",
    "case.subtitle": "Influencer-led UGC Campaign · Tháng 12/2023",
    "case.overview": "Breville Vietnam hợp tác cùng Huy Trần và Frank Culinary triển khai một thử thách pha chế theo chủ đề Giáng sinh. Thông qua creator content và hoạt động UGC, chiến dịch đưa máy pha cà phê Breville vào những tình huống sử dụng gần gũi, đồng thời tạo sự chú ý và khuyến khích cộng đồng tham gia sáng tạo nội dung.",
    "case.tagPlanning": "Lập kế hoạch",
    "case.tagCreative": "Định hướng sáng tạo",
    "case.tagCoordination": "Phối hợp agency",
    "case.tagReporting": "Báo cáo hiệu quả",
    "impact.title": "Kết quả nổi bật",
    "impact.views": "Tổng lượt xem video",
    "impact.comments": "Bình luận",
    "impact.shares": "Lượt chia sẻ",
    "impact.entries": "Video UGC tham dự",
    "impact.note": "Số liệu organic được ghi nhận ngày 24/12/2023, tổng hợp từ các nền tảng và không đại diện cho số người dùng duy nhất.",
    "creator.title": "Nội dung nổi bật từ influencers",
    "creator.intro": "Mỗi creator card sử dụng một hình đại diện và liên kết trực tiếp đến các bài đăng công khai trên từng nền tảng.",
    "creator.frankDescription": "Video công thức kết hợp bối cảnh Giáng sinh, nội dung ẩm thực và phần trình diễn sản phẩm tự nhiên.",
    "creator.huyDescription": "Video kết hợp trải nghiệm pha chế tại nhà với không khí mùa lễ hội và hình ảnh máy pha cà phê Breville.",
    "context.title": "Bối cảnh và thách thức",
    "context.body": "Mặc dù Việt Nam có nền văn hóa cà phê phát triển, máy pha cà phê gia đình cao cấp vẫn là sản phẩm có mức độ cân nhắc cao. Với mức giá khoảng 15–20 triệu đồng, Breville cần giới thiệu sản phẩm trong những tình huống sử dụng gần gũi, thông qua creators phù hợp và một cơ chế thử thách đủ đơn giản để khuyến khích cộng đồng tham gia.",
    "snapshot.title": "Tóm tắt định hướng chiến lược",
    "snapshot.objectiveTitle": "Mục tiêu",
    "snapshot.objective": "Tạo mức độ hiện diện cho Breville thông qua nội dung trình diễn sản phẩm của creators, đồng thời thúc đẩy tương tác và UGC trong mùa Giáng sinh.",
    "snapshot.audienceTitle": "Đối tượng mục tiêu",
    "snapshot.audience": "Người dùng thành thị quan tâm đến cà phê, ẩm thực và trải nghiệm pha chế tại nhà; đồng thời thường xuyên theo dõi nội dung công thức và phong cách sống.",
    "snapshot.insightTitle": "Insight",
    "snapshot.insight": "Khách hàng muốn có trải nghiệm cà phê chất lượng cao tại nhà, nhưng cần thấy sản phẩm được sử dụng thực tế bởi những người đáng tin cậy trước khi cân nhắc mức giá cao.",
    "choice.title": "Từ thông điệp của thương hiệu đến trải nghiệm từ creators",
    "choice.body": "Thay vì để thương hiệu trực tiếp giới thiệu sản phẩm, chiến dịch đặt creators vào vai trò người sử dụng và hướng dẫn trải nghiệm. Máy pha cà phê Breville được tích hợp vào những công thức Giáng sinh thực tế, giúp sản phẩm xuất hiện tự nhiên và tạo thêm lý do để cộng đồng tương tác.",
    "choice.step1": "Creator trình diễn sản phẩm",
    "choice.step2": "Liên kết với mùa lễ hội",
    "choice.step3": "Cộng đồng tham gia",
    "idea.body": "Creators sử dụng máy Breville để sáng tạo các công thức đồ uống Giáng sinh, sau đó mời cộng đồng tự quay và đăng video công thức của riêng mình để tham gia thử thách.",
    "idea.step1": "Công thức từ creator",
    "idea.step2": "Người xem sáng tạo",
    "idea.step3": "Thử thách UGC",
    "execution.title": "Triển khai và vai trò của tôi",
    "execution.executionTitle": "Triển khai",
    "execution.step1": "Huy Trần và Frank Culinary phát triển các video công thức đồ uống Giáng sinh bằng máy pha cà phê Breville.",
    "execution.step2": "Nội dung được phân phối trên TikTok, Facebook, Instagram và YouTube để mở rộng số điểm tiếp xúc.",
    "execution.step3": "Người xem được kêu gọi tự quay video công thức và tham gia thử thách UGC.",
    "role.title": "Vai trò của tôi",
    "role.item1": "Xây dựng kế hoạch, ý tưởng và cơ chế triển khai chiến dịch.",
    "role.item2": "Phát triển định hướng nội dung và khung kịch bản cho video.",
    "role.item3": "Phối hợp với agency và influencers để hoàn thiện nội dung, đồng thời điều phối kế hoạch phát hành trên các kênh mạng xã hội.",
    "role.item4": "Theo dõi hiệu quả, tổng hợp kết quả và báo cáo cho quản lý cùng các bên liên quan.",
    "learning.title": "Bài học chính",
    "learning.body1": "Lượt xem cao không đồng nghĩa với việc người xem sẽ chủ động tạo nội dung tham gia. Với các chiến dịch UGC, cần đơn giản hóa thể lệ, làm rõ và lặp lại lời kêu gọi hành động, đồng thời cung cấp nội dung mẫu để giảm rào cản tham gia.",
    "learning.body2": "Mục tiêu nhận diện và mục tiêu UGC nên được đo lường bằng các chỉ số riêng, thay vì kỳ vọng mức độ tiếp cận cao sẽ tự động tạo ra nhiều bài dự thi.",
    "attribution.title": "Ghi chú dữ liệu và bản quyền",
    "attribution.body": "Dự án được thực hiện trong thời gian tôi làm việc tại Epicure Vina. Tài sản thương hiệu và nội dung của creators thuộc quyền sở hữu của các bên tương ứng. Số lượng 30 video tham dự được ghi nhận từ báo cáo tổng kết; bài đăng tổng hợp trên fanpage cũ hiện không còn khả dụng.",
    "footer.note": "Built with strategy, curiosity and vibe coding."
  },
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "case.back": "Back to selected projects",
    "case.label": "CASE STUDY · BREVILLE · 2023",
    "case.subtitle": "Influencer-led UGC Campaign · December 2023",
    "case.overview": "Breville Vietnam partnered with Huy Trần and Frank Culinary on a Christmas-themed beverage challenge. Through creator content and user-generated videos, the campaign placed Breville coffee machines in relatable use cases while generating attention and encouraging community participation.",
    "case.tagPlanning": "Campaign planning",
    "case.tagCreative": "Creative direction",
    "case.tagCoordination": "Agency coordination",
    "case.tagReporting": "Performance reporting",
    "impact.title": "Campaign impact",
    "impact.views": "Combined video views",
    "impact.comments": "Comments",
    "impact.shares": "Shares",
    "impact.entries": "UGC video submissions",
    "impact.note": "Organic results captured on 24 December 2023, aggregated across platforms and not representative of unique users.",
    "creator.title": "Featured influencer content",
    "creator.intro": "Each creator card uses one representative visual and links directly to the public post on each platform.",
    "creator.frankDescription": "A recipe video combining a Christmas setting, culinary content and a natural product demonstration.",
    "creator.huyDescription": "A recipe video combining at-home coffee preparation, a festive setting and clear Breville product visibility.",
    "context.title": "Context and challenge",
    "context.body": "Vietnam has a strong coffee culture, but premium home coffee machines remain a high-consideration category. With key products priced around VND 15–20 million, Breville needed to demonstrate the product in relatable settings through relevant creators and a participation mechanic simple enough to encourage community action.",
    "snapshot.title": "Strategy snapshot",
    "snapshot.objectiveTitle": "Objective",
    "snapshot.objective": "Build visibility for Breville through creator-led product demonstrations while driving engagement and UGC participation during the Christmas season.",
    "snapshot.audienceTitle": "Target audience",
    "snapshot.audience": "Urban consumers interested in coffee, culinary content and at-home preparation, who regularly follow recipe and lifestyle creators.",
    "snapshot.insightTitle": "Insight",
    "snapshot.insight": "Consumers want a premium at-home coffee experience, but need to see the product used in real life by people they trust before considering a high-priced purchase.",
    "choice.title": "From brand-led messaging to creator-led experience",
    "choice.body": "Instead of relying on direct brand messaging, the campaign positioned creators as users and guides. Breville machines were integrated into practical Christmas recipes, allowing the product to appear naturally while giving the audience a clear reason to engage.",
    "choice.step1": "Creator-led demonstration",
    "choice.step2": "Festive relevance",
    "choice.step3": "Community participation",
    "idea.body": "Creators used Breville machines to develop Christmas beverage recipes, then invited their audiences to film and publish their own versions as challenge entries.",
    "idea.step1": "Creator recipe",
    "idea.step2": "Audience creation",
    "idea.step3": "UGC challenge",
    "execution.title": "Execution and my role",
    "execution.executionTitle": "Execution",
    "execution.step1": "Huy Trần and Frank Culinary developed Christmas beverage recipe videos using Breville coffee machines.",
    "execution.step2": "Content was distributed across TikTok, Facebook, Instagram and YouTube to extend cross-platform visibility.",
    "execution.step3": "Viewers were invited to film their own recipes and submit them to the UGC challenge.",
    "role.title": "My role",
    "role.item1": "Developed the campaign plan, concept and participation mechanic.",
    "role.item2": "Developed the content direction and initial video script framework.",
    "role.item3": "Coordinated with the agency and influencers to refine content and manage the social publishing plan.",
    "role.item4": "Tracked performance, consolidated results and reported to management and relevant stakeholders.",
    "learning.title": "Key learning",
    "learning.body1": "High video views do not automatically lead audiences to create content. UGC campaigns need simple rules, a clear and repeated call to action, and content examples that reduce the effort required to participate.",
    "learning.body2": "Awareness and UGC participation should be measured as separate objectives rather than assuming that broad visibility will automatically generate more entries.",
    "attribution.title": "Data and ownership note",
    "attribution.body": "This project was completed during my employment at Epicure Vina. Brand assets and creator content remain the property of their respective owners. The 30 UGC submissions were recorded in the final campaign report; the original summary post on the former fanpage is no longer publicly available.",
    "footer.note": "Built with strategy, curiosity and vibe coding."
  }
};

function setCaseLanguage(language) {
  const copy = caseTranslations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  langToggle.textContent = language === "vi" ? "EN" : "VI";
  localStorage.setItem("portfolio-language", language);
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;
themeToggle.textContent = root.dataset.theme === "dark" ? "☀" : "☾";

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", nextTheme);
});

setCaseLanguage(localStorage.getItem("portfolio-language") || "vi");

langToggle.addEventListener("click", () => {
  setCaseLanguage(document.documentElement.lang === "vi" ? "en" : "vi");
});

menuToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
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
  scrollProgress.style.width = `${progress}%`;
});
