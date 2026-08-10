import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "مدرستي الذكية API" });
});

// Gemini AI Chat endpoint for "مساعد مدرستي"
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, role, childContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "الرجاء تقديم نص السؤال أو الطلب." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Fallback smart response when API key is not yet configured
      return res.json({
        reply: `أهلاً بك! أنا "مساعد مدرستي" الذكي 🤖.
سؤالك: "${message}"

💡 إجابة إسترشادية:
بناءً على طلبك، يُنصح بتبسيط المفاهيم واستخدام الوسائل البصرية والأمثلة المحسوسة من الحياة اليومية للطفل.
(ملاحظة: يمكنك ضبط مفتاح Gemini API للحصول على إجابات تفاعلية متقدمة ومباشرة عبر الذكاء الاصطناعي).`,
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `أنت "مساعد مدرستي"، مساعد ذكي متواضع ولطيف ومحترف مخصص للمرحلة الابتدائية في منصة "مدرستي الذكية".
دورك إما مساعدة ولي الأمر في شرح الدروس وأفكار المراجعة والتمارين لطفله، أو مساعدة الأستاذ في إعداد تمارين، صياغة اختبارات قصيرة، واقتراح أنشطة تعليمية مبسطة.
قواعد الإجابة:
- استخدم لغة عربية سليمة وواضحة ومبسطة جداً.
- التزم بدور المساعد المساعد ولا تدعي أنك معلم كامل، بل أداة مساعدة للولي والأستاذ.
- إذا سأل ولي الأمر عن شرح درس أو طريقة تدريس (مثلاً جمع الأعداد لسن ثانية)، قدم خطوات تطبيقية سهلة ولطيفة.
- إذا طلب الأستاذ تمارين أو اختبارات صغها بشكل منظم وواضح ومناسب للمستوى المطلوب.
- سياق المستخدم الحالي: ${role === "parent" ? "ولي أمر" : role === "teacher" ? "أستاذ" : "مستخدم العامة"}. ${childContext ? `سياق الطفل: ${childContext}` : ""}.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      reply: response.text || "عذراً، لم أتمكن من توليد إجابة في الوقت الحالي. يرجى المحاولة مرة أخرى.",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "حدث خطأ أثناء التواصل مع المساعد الذكي.",
      details: error.message || String(error),
    });
  }
});

// Gemini AI Exercise Generation endpoint for Teachers
app.post("/api/gemini/generate-exercises", async (req, res) => {
  try {
    const { subject, level, topic, count = 5, difficulty = "متوسط" } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // High quality fallback primary school questions
      return res.json({
        title: `تمارين ${subject}: ${topic}`,
        questions: Array.from({ length: Math.min(Number(count) || 3, 5) }).map((_, idx) => ({
          id: `gen-q-${idx + 1}`,
          text: `السؤال ${idx + 1}: احسب أو حدد الإجابة الصحيحة حول موضوع (${topic}) لمستوى ${level}.`,
          type: "choice",
          options: ["الخيار الأول (صحيح)", "الخيار الثاني", "الخيار الثالث"],
          correctOptionIndex: 0,
        })),
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const prompt = `قم بتوليد ${count} أسئلة تمارين تفاعلية لمادة (${subject})، المستوى الدراسي: (${level})، الموضوع: (${topic})، درجة الصعوبة: (${difficulty}).
النتيجة يجب أن تكون JSON مصاغ بدقة بالشكل التالي:
{
  "title": "عنوان التمرين",
  "questions": [
    {
      "id": "q-1",
      "text": "نص السؤال الواضح والسهل",
      "type": "choice",
      "options": ["خيار 1", "خيار 2", "خيار 3"],
      "correctOptionIndex": 0
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("Gemini Exercises Error:", error);
    return res.status(500).json({
      error: "تعذر توليد التمارين حالياً بواسطة الذكاء الاصطناعي.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server "مدرستي الذكية" running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
