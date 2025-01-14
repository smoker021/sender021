const nodemailer = require('nodemailer');

// تنظیمات SMTP برای جیمیل
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // استفاده از TLS
  auth: {
    user: 'gptchat3366@gmail.com', // ایمیل فرستنده
    pass: 'jijy obzx aztk wxgb' // رمز عبور (App Password)
  }
});

// تابع تأخیر (Delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// لیست ایمیل‌های گیرنده
const emailList = [
  'erfan021turk@gmail.com',
  'mohammdajad1@gmail.com'
];

// تابع ارسال ایمیل
const sendEmail = async (recipient, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"GPT Chat" <gptchat3366@gmail.com>', // فرستنده
      to: recipient, // گیرنده
      subject: subject, // موضوع ایمیل
      text: text // متن ایمیل
    });
    console.log(`ایمیل ارسال شد به: ${recipient}, اطلاعات: ${info.response}`);
  } catch (error) {
    console.error(`خطا در ارسال ایمیل به ${recipient}:`, error);
  }
};

// ارسال ایمیل‌ها با تأخیر
const sendEmailsWithDelay = async () => {
  for (let i = 0; i < emailList.length; i++) {
    const recipient = emailList[i];
    console.log(`در حال ارسال ایمیل به: ${recipient}`);
    await sendEmail(recipient, 'Latency Test', 'این یک تست ارسال ایمیل با تأخیر است.');
    console.log(`منتظر 1000 میلی‌ثانیه قبل از ارسال ایمیل بعدی...`);
    await delay(1000); // تأخیر ۱۰۰۰ میلی‌ثانیه
  }
  console.log('تمام ایمیل‌ها ارسال شدند.');
};

// اجرای تابع اصلی
sendEmailsWithDelay();
