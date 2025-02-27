// نادیده گرفتن هشدارهای منسوخ‌شدن
process.removeAllListeners("warning");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

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

app.post("/send-email", async (req, res) => {
  const { to, subject, body, count, delay } = req.body;

  if (!to || !subject || !body || !count || !delay) {
    console.error("[ERROR] Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  let emailIndex = 0;
  let sentCount = 0;

  const sendEmail = async () => {
    if (sentCount >= count) {
      return res
        .status(200)
        .json({ message: "Emails sent successfully", sentCount });
    }

    const senderEmail = emailAccounts[emailIndex].email;
    const senderPassword = emailAccounts[emailIndex].password;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: senderEmail,
        to,
        subject,
        text: body,
      });

      console.log(`[DEBUG] Email sent from ${senderEmail} to ${to}:`, info.response);
      sentCount++;
      emailIndex = (emailIndex + 1) % emailAccounts.length;

      setTimeout(sendEmail, delay);
    } catch (error) {
      console.error(`[ERROR] Failed to send email from ${senderEmail}:`, error);
      setTimeout(sendEmail, delay);
    }
  };

  sendEmail();
});

// مدیریت مسیرهای دیگر و هدایت به فایل index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[DEBUG] Server is running on http://localhost:${PORT}`);
});
