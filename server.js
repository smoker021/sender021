const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// تنظیم CORS
app.use(cors({
  origin: '*', // همه درخواست‌ها مجازند. می‌توانید این را به آدرس خاصی محدود کنید، مثل: 'https://sender021.onrender.com'
  methods: ['GET', 'POST'], // متدهای مجاز
  allowedHeaders: ['Content-Type'], // هدرهای مجاز
}));

app.use(bodyParser.json());

// لیست ایمیل‌ها و رمزهای عبور
const emailAccounts = [
  { email: "Abhigyan93Novikov@gmail.com", password: "znfv csna uphs clyn" },
  { email: "rashel729Morozov@gmail.com", password: "allo qnyl klmh sghd" },
  { email: "rozita8373Kozlov@gmail.com", password: "zkvf lltn frjn mokb" },
  { email: "solina7373Petrov@gmail.com", password: "gkoi shbd lled pprq" },
  { email: "kamelia82Lebedev@gmail.com", password: "aufq wgqt erlf vzac" },
  { email: "Artyom826falcon@gmail.com", password: "vfct hlph vthf gezr" },
  { email: "Maxim837Popov@gmail.com", password: "ldye idvk xjgc spmj" },
  { email: "Mikhail726Kuznetsov@gmail.com", password: "aysw hjaj pvjx lvax" },
  { email: "Ilari726Ivanov@gmail.com", password: "ylll idwm zakl llgk" },
  { email: "Daniel729Smirnov@gmail.com", password: "skoa rizl jxfa jcjw" },
  { email: "alexander728popov@gmail.com", password: "kicd ndld rdvi sgxw" },
];

// مسیر ارسال ایمیل
app.post("/send-email", async (req, res) => {
  const { to, subject, body, count, delay } = req.body;

  // بررسی ورودی‌ها
  if (!to || !subject || !body || !count || !delay) {
    console.error("[ERROR] Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  let emailIndex = 0; // ایندکس شروع در لیست ایمیل‌ها

  // ارسال ایمیل‌ها به صورت چرخه‌ای
  for (let i = 0; i < count; i++) {
    const senderEmail = emailAccounts[emailIndex].email;
    const senderPassword = emailAccounts[emailIndex].password;

    // تنظیمات SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    try {
      // ارسال ایمیل
      const info = await transporter.sendMail({
        from: senderEmail,
        to,
        subject,
        text: body,
      });

      console.log(`[DEBUG] Email sent from ${senderEmail} to ${to}:`, info.response);

      // تغییر ایندکس برای استفاده از ایمیل بعدی (به صورت چرخه‌ای)
      emailIndex = (emailIndex + 1) % emailAccounts.length;

      // تأخیر قبل از ارسال ایمیل بعدی
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`[ERROR] Failed to send email from ${senderEmail}:`, error);
    }
  }

  res.status(200).json({ message: "Emails sent successfully" });
});

// مسیر اصلی
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`[DEBUG] Server is running on http://localhost:${PORT}`);
});
