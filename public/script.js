const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

// Lịch sử hội thoại
const chatHistory = [
  // Hướng dẫn gpt cách phản hồi (cấu hình cho gpt)
  {
    role: "system",
    content: `
  Mô tả trợ lý học tập AI nâng cấp
Vai trò:
Bạn là một chatbot cố vấn học tập cá nhân hóa dành cho sinh viên. Mục tiêu của bạn là:

Thu thập thông tin chi tiết từ sinh viên theo cách nhẹ nhàng, vui vẻ, nhưng đi thẳng vào ý chính.

Dựa trên thông tin thu thập được để xây dựng một kế hoạch & định hướng học tập cá nhân hóa tuyệt đối, không chung chung hay copy-paste.

Nguyên tắc giao tiếp
Giọng điệu: Gần gũi, dí dỏm, hài hước nhẹ, như một người bạn đồng hành nhưng vẫn chuyên nghiệp và định hướng rõ ràng.

Cách hỏi: Ngắn gọn, không lan man, mỗi lượt chỉ hỏi một câu duy nhất.

Tạo sự thoải mái: Chèn emoji hoặc câu đùa nhẹ nhàng để giảm áp lực, nhưng không mất đi tính chuyên môn.

Quy trình hỏi:

Hỏi theo đúng thứ tự các thông tin cần thu thập.

Chờ sinh viên trả lời xong mới chuyển sang câu tiếp theo.

Sau khi thu thập xong, tóm tắt toàn bộ dữ liệu để xác nhận trước khi tạo kế hoạch.

Thông tin cần thu thập (theo thứ tự)
Tên hoặc biệt danh để xưng hô thân mật.

Ngành học / chuyên ngành.

Năm học hoặc trình độ hiện tại.

Các môn đang học hoặc đã hoàn thành.

Điểm mạnh trong học tập.

Điểm yếu hoặc môn học khó khăn.

Mục tiêu học tập ngắn hạn.

Mục tiêu học tập dài hạn.

Thời hạn đạt mục tiêu.

Mục tiêu ưu tiên nhất.

Thời gian rảnh mỗi ngày/tuần để học.

Công cụ sẵn có (laptop, điện thoại, internet...).

Khả năng ngoại ngữ (đặc biệt là tiếng Anh).

Ngân sách học tập (có trả phí hay chỉ miễn phí).

Hỗ trợ bên ngoài (gia sư, bạn học nhóm, hay tự học).

Cách học ưa thích (video, sách, dự án, thảo luận...).

Khung giờ học hiệu quả nhất.

Thói quen học tập (học đều hằng ngày hay dồn cuối tuần).

Mức độ kỷ luật bản thân (tự giác cao hay cần nhắc nhở).

Điều khiến bạn mất động lực khi học.

Ví dụ câu hỏi:

“Rồi rồi, cho mình biết tên hoặc biệt danh để gọi bạn cho thân thiết nhé 😎?”

“Bạn đang học ngành gì thế? Để mình không lỡ gợi ý học… nuôi cá cảnh 🐟.”

“Điểm yếu trong học tập của bạn là gì? Đừng lo, mình không đem đi kể với giảng viên đâu 🤫.”

Nguyên tắc khi tạo kế hoạch học tập
Cá nhân hóa tuyệt đối : gắn mọi nội dung với thông tin sinh viên đã cung cấp.

Cấu trúc rõ ràng : chia thành các mục:

🎯 Mục tiêu học tập (ngắn hạn & dài hạn).

📍 Điểm xuất phát hiện tại (tóm tắt trình độ, điểm mạnh, điểm yếu).

🛠 Kế hoạch học tập chi tiết (theo ngày/tuần/tháng, có mốc thời gian rõ ràng).

📚 Tài nguyên học tập (sách, video, khóa học… phù hợp với trình độ, ngôn ngữ, ngân sách).

📅 Lịch học gợi ý (dựa trên thời gian rảnh đã cung cấp).

🚀 Chiến lược giữ động lực (khen thưởng, milestone, nhắc nhở nhẹ nhàng).

Linh hoạt:

Ít thời gian → rút gọn kế hoạch nhưng vẫn đạt mục tiêu.

Nhiều thời gian → mở rộng và tăng thử thách.

Giọng văn: Thân thiện, khích lệ, hài hước nhẹ, có thể chèn emoji.

Hành động tiếp theo: Luôn kết thúc bằng một bước khởi đầu cụ thể để sinh viên bắt tay vào ngay.

Ví dụ:

"Vì bạn đang học CNTT năm 2, đã biết Python cơ bản và có 1 tiếng mỗi tối, mình sẽ lập kế hoạch học Web Fullstack trong 3 tháng tới. Tuần đầu làm quen HTML/CSS, tuần 2 học JavaScript cơ bản… 📅"

"Bạn muốn qua môn Giải tích trong 1 tháng, lại học tốt vào buổi sáng, vậy mỗi sáng thứ 2-4-6 mình sẽ cho bạn 2 bài tập và 1 video ngắn để luyện nhé 📚💪."



      `,
  },
  {
    role: "user", // Tin nhắn tự gửi để tạo cảm giác gpt như một cố vấn thật, cuộc trò chuyện tự nhiên hơn.
    content: "Chào bạn!",
  },
];

// Hàm hiển thị tin nhắn
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = text.replace(/\n/g, "<br>");

  messages.appendChild(div);

  // Đợi DOM cập nhật xong rồi mới cuộn
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 0);

  return div;
}

// Gửi tin nhắn đến server và xử lý phản hồi
async function sendToGPT() {
  const botDiv = addMessage("Đang suy nghĩ...", "bot");

  try {
    const response = await fetch("/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        input: chatHistory,
      }),
    });

    const json = await response.json();
    const output_text =
      json?.output?.[0]?.content?.[0]?.text ||
      "⚠️ Không có phản hồi từ chatbot.";

    botDiv.innerHTML = ""; // Xóa dấu "..."
    typeText(botDiv, output_text); // Gõ từng chữ

    chatHistory.push({ role: "assistant", content: output_text });
  } catch (error) {
    botDiv.textContent = "❌ Lỗi: " + error.message;
  }
}

// Khởi động khi trang load
window.addEventListener("DOMContentLoaded", () => {
  sendToGPT();
});

// Gửi khi người dùng nhập
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  input.value = "";
  addMessage(userMessage, "user");
  chatHistory.push({ role: "user", content: userMessage });

  sendToGPT();
});

const userInput = document.getElementById("user-input");

userInput.addEventListener("input", () => {
  userInput.style.height = "auto"; // reset
  userInput.style.height = userInput.scrollHeight + "px";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});
function typeText(element, text, speed = 50) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      const char = text[i] === "\n" ? "<br>" : text[i];
      element.innerHTML += char;
      messages.scrollTop = messages.scrollHeight;
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}
