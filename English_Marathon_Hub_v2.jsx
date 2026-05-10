import { useState, useRef, useEffect } from "react";

// ── TRANSLATION LANGUAGE CONTEXT ─────────────────────────────────────────────
const TRANS_LABELS = {
  ro: {
    langName: "Română",
    flag: "🇷🇴",
    chooseLanguage: "Alege limba de traducere:",
    days: "Zile",
    daysLeft: "Zile rămase",
    avgScore: "Scor mediu",
    complete: "Finalizat",
    backToCourse: "← Înapoi la curs",
    studyMaterials: "📥 Materialele tale de învățare",
    theory: "PDF Teorie",
    theoryDesc: "Explicații gramaticale, vocabular, text de lectură și scenariu de ascultare",
    exercises: "PDF Exerciții",
    exercisesDesc: "Completare spații, alegere multiplă, scriere și teme",
    studyPlan: "⏱️ Plan de studiu",
    submitBtn: "✏️ Trimite exercițiile pentru corecție",
    openLesson: "📚 Deschide",
    reviewLesson: "📖 Recenzie",
    submitExercises: "✏️ Trimite",
    locked: "🔒 Blocat",
    lockMsg: "Obține 80+ la ziua precedentă pentru a debloca!",
    howWorks: "Cum funcționează corecția AI",
    step1T: "Descarcă PDF-urile", step1D: "Obține PDF-ul de Teorie și PDF-ul de Exerciții pentru fiecare zi.",
    step2T: "Studiază și completează", step2D: "Citește teoria, studiază vocabularul și completează exercițiile.",
    step3T: "Tastează răspunsurile", step3D: "Revino aici, deschide ziua și scrie răspunsurile tale.",
    step4T: "Primește feedback AI", step4D: "Profesorul AI îți corectează instant munca și te încurajează!",
    submitTitle: "Trimite exercițiile pentru corecție AI",
    howToSubmit: "📋 Cum trimiți:",
    howToSteps: ["Completează PDF-ul de Exerciții pentru ziua selectată", "Tastează răspunsurile în caseta de mai jos", "Etichetează fiecare răspuns: Ex1-Q1: [răspunsul tău]", "Apasă Trimite pentru corecție"],
    exampleFormat: "📌 Format exemplu:",
    yourAnswers: "✏️ Tastează răspunsurile tale aici",
    cancel: "← Anulează",
    submitCorrection: "🚀 Trimite pentru corecție AI",
    grading: "🔄 Se corectează...",
    teacherReviewing: "Profesorul tău de engleză îți revizuiește răspunsurile... ✨",
    backToDashboard: "📅 Înapoi la curs",
    resubmit: "✏️ Retrimite răspunsurile",
    strengths: "✅ Puncte forte",
    improve: "📌 Zone de îmbunătățit",
    corrections: "📝 Corecții detaliate",
    reviewThis: "📚 Revizuiește asta",
    motivation: "🌟 Motivație",
    yourAnswer: "Răspunsul tău:",
    correctAnswer: "Răspuns corect:",
    why: "De ce?",
    tip: "💡 Sfat:",
    perfect: "Perfect! ✨",
    selfEval: "⭐ Autoevaluare — Cum te simți azi?",
    grammar: "Gramatică:",
    vocabulary: "Vocabular:",
    hard: "😕 Greu", ok: "😐 OK", easy: "😊 Ușor",
    dayResults: "Rezultate Ziua",
    completedScore: "Finalizat — Scor:",
    showAll: "Toate 30 de zile", showDone: "✅ Finalizate", showPending: "⏳ În așteptare",
    errorMsg: "Nu s-a putut conecta la sistemul de corecție. Vă rugăm să încercați din nou.",
    reviewBadge: "⭐ Recapitulare",
    gradBadge: "🎓 Final!",
    passRequired: "Trebuie să obții minim 80/100 la ziua anterioară pentru a debloca această lecție.",
    american: "Engleză americană 🇺🇸",
    translation: "Traducere:",
    grammarTopic: "📘 Gramatică",
    vocabTopic: "📝 Vocabular",
  },
  ru: {
    langName: "Русский",
    flag: "🇷🇺",
    chooseLanguage: "Выберите язык перевода:",
    days: "Дней",
    daysLeft: "Осталось",
    avgScore: "Средний балл",
    complete: "Завершено",
    backToCourse: "← Назад к курсу",
    studyMaterials: "📥 Учебные материалы",
    theory: "PDF Теория",
    theoryDesc: "Объяснение грамматики, словарный запас, текст для чтения и сценарий прослушивания",
    exercises: "PDF Упражнения",
    exercisesDesc: "Заполнение пропусков, выбор ответа, письмо и домашние задания",
    studyPlan: "⏱️ План занятий",
    submitBtn: "✏️ Отправить упражнения на проверку",
    openLesson: "📚 Открыть",
    reviewLesson: "📖 Повторить",
    submitExercises: "✏️ Сдать",
    locked: "🔒 Закрыто",
    lockMsg: "Получи 80+ в предыдущий день, чтобы открыть!",
    howWorks: "Как работает проверка ИИ",
    step1T: "Скачай PDF", step1D: "Получи PDF теории и PDF упражнений для каждого дня.",
    step2T: "Изучай и выполняй", step2D: "Читай теорию, учи слова и выполняй упражнения.",
    step3T: "Введи ответы", step3D: "Вернись сюда, открой день и введи свои ответы.",
    step4T: "Получи обратную связь", step4D: "ИИ-учитель мгновенно проверит и поддержит тебя!",
    submitTitle: "Отправить упражнения на проверку ИИ",
    howToSubmit: "📋 Как отправить:",
    howToSteps: ["Выполни PDF упражнений для выбранного дня", "Введи ответы в поле ниже", "Обозначь каждый ответ: Ex1-Q1: [твой ответ]", "Нажми Отправить на проверку"],
    exampleFormat: "📌 Пример формата:",
    yourAnswers: "✏️ Введи свои ответы здесь",
    cancel: "← Отмена",
    submitCorrection: "🚀 Отправить на проверку ИИ",
    grading: "🔄 Проверяем...",
    teacherReviewing: "Твой учитель английского проверяет ответы... ✨",
    backToDashboard: "📅 Назад к курсу",
    resubmit: "✏️ Отправить снова",
    strengths: "✅ Сильные стороны",
    improve: "📌 Что улучшить",
    corrections: "📝 Подробные исправления",
    reviewThis: "📚 Повтори это",
    motivation: "🌟 Мотивация",
    yourAnswer: "Твой ответ:",
    correctAnswer: "Правильный ответ:",
    why: "Почему?",
    tip: "💡 Подсказка:",
    perfect: "Отлично! ✨",
    selfEval: "⭐ Самооценка — Как ты себя чувствуешь сегодня?",
    grammar: "Грамматика:",
    vocabulary: "Словарный запас:",
    hard: "😕 Сложно", ok: "😐 Нормально", easy: "😊 Легко",
    dayResults: "Результаты Дня",
    completedScore: "Завершено — Балл:",
    showAll: "Все 30 дней", showDone: "✅ Завершённые", showPending: "⏳ В ожидании",
    errorMsg: "Не удалось подключиться к системе проверки. Попробуй ещё раз.",
    reviewBadge: "⭐ Повторение",
    gradBadge: "🎓 Финал!",
    passRequired: "Нужно набрать минимум 80/100 в предыдущий день, чтобы открыть этот урок.",
    american: "Американский английский 🇺🇸",
    translation: "Перевод:",
    grammarTopic: "📘 Грамматика",
    vocabTopic: "📝 Словарный запас",
  }
};

// ── CURRICULUM DATA WITH ROMANIAN & RUSSIAN TRANSLATIONS ─────────────────────
const CURRICULUM = [
  {
    day: 1, color: "#B91C1C",
    title: "Hello, American English! — The Verb 'To Be'",
    grammar: "Verb 'To Be' (am / is / are)",
    vocab: "Greetings & Introductions",
    translations: {
      ro: { title: "Bună, Engleză Americană! — Verbul 'To Be'", grammar: "Verbul 'To Be' (am / is / are)", vocab: "Salutări și Prezentări" },
      ru: { title: "Привет, Американский английский! — Глагол 'To Be'", grammar: "Глагол 'To Be' (am / is / are)", vocab: "Приветствия и Знакомства" }
    }
  },
  {
    day: 2, color: "#1D4ED8",
    title: "Me, You, and Us — Subject Pronouns",
    grammar: "Subject Pronouns (I/you/he/she/it/we/they)",
    vocab: "Numbers 1–20 & Family Words",
    translations: {
      ro: { title: "Eu, Tu și Noi — Pronume Subiect", grammar: "Pronume subiect (eu/tu/el/ea/noi/voi/ei)", vocab: "Numere 1–20 și Cuvinte de Familie" },
      ru: { title: "Я, Ты и Мы — Подлежащие местоимения", grammar: "Личные местоимения (я/ты/он/она/мы/вы/они)", vocab: "Числа 1–20 и Члены семьи" }
    }
  },
  {
    day: 3, color: "#047857",
    title: "A Cat or The Cat? — Articles: A / An / The",
    grammar: "Indefinite Articles (A/An) & Definite Article (The)",
    vocab: "Animals & Common Objects",
    translations: {
      ro: { title: "Un pisică sau Pisica? — Articole: A / An / The", grammar: "Articole nedeterminate (A/An) și determinat (The)", vocab: "Animale și Obiecte Comune" },
      ru: { title: "Кошка или Кошка? — Артикли: A / An / The", grammar: "Неопределённые артикли (A/An) и определённый (The)", vocab: "Животные и распространённые предметы" }
    }
  },
  {
    day: 4, color: "#7C3AED",
    title: "One Cat, Two Cats — Singular & Plural Nouns",
    grammar: "Singular & Plural Nouns (Regular & Irregular)",
    vocab: "Food & Drinks",
    translations: {
      ro: { title: "Un pisică, Două pisici — Substantive Singular & Plural", grammar: "Substantive la singular și plural (regulate și neregulate)", vocab: "Mâncare și Băuturi" },
      ru: { title: "Одна кошка, Две кошки — Существительные ед. и мн. числа", grammar: "Существительные в ед. и мн. числе (правильные и неправильные)", vocab: "Еда и напитки" }
    }
  },
  {
    day: 5, color: "#B45309",
    title: "My, Your, His, Her — Possessive Adjectives",
    grammar: "Possessive Adjectives (my/your/his/her/its/our/their)",
    vocab: "Clothes & Accessories",
    translations: {
      ro: { title: "Al meu, Al tău, Al lui, Al ei — Adjective Posesive", grammar: "Adjective posesive (meu/tău/lui/ei/nostru/vostru/lor)", vocab: "Haine și Accesorii" },
      ru: { title: "Мой, Твой, Его, Её — Притяжательные прилагательные", grammar: "Притяжательные прилагательные (мой/твой/его/её/наш/ваш/их)", vocab: "Одежда и Аксессуары" }
    }
  },
  {
    day: 6, color: "#0891B2",
    title: "I Work Every Day — Present Simple",
    grammar: "Present Simple (positive form)",
    vocab: "Daily Routine Verbs",
    translations: {
      ro: { title: "Lucrez în fiecare zi — Prezent Simplu", grammar: "Prezentul simplu (forma afirmativă)", vocab: "Verbe de rutină zilnică" },
      ru: { title: "Я работаю каждый день — Простое настоящее", grammar: "Простое настоящее (утвердительная форма)", vocab: "Глаголы повседневной жизни" }
    }
  },
  {
    day: 7, color: "#6D28D9",
    title: "Do You Work? — Present Simple Questions",
    grammar: "Present Simple (negative & questions)",
    vocab: "Time & Clock",
    translations: {
      ro: { title: "Lucrezi? — Întrebări la Prezent Simplu", grammar: "Prezentul simplu (forma negativă și interogativă)", vocab: "Timp și Ceas" },
      ru: { title: "Ты работаешь? — Вопросы в простом настоящем", grammar: "Простое настоящее (отрицание и вопросы)", vocab: "Время и Часы" }
    }
  },
  {
    day: 8, color: "#BE185D",
    title: "Always, Sometimes, Never — Adverbs of Frequency",
    grammar: "Adverbs of Frequency",
    vocab: "At Home Vocabulary",
    translations: {
      ro: { title: "Întotdeauna, Uneori, Niciodată — Adverbe de Frecvență", grammar: "Adverbe de frecvență", vocab: "Vocabular Acasă" },
      ru: { title: "Всегда, Иногда, Никогда — Наречия частоты", grammar: "Наречия частотности", vocab: "Дома: словарный запас" }
    }
  },
  {
    day: 9, color: "#065F46",
    title: "There Is a Park! — There Is / There Are",
    grammar: "There is / There are (positive, negative, questions)",
    vocab: "Places in a City",
    translations: {
      ro: { title: "Există un parc! — There Is / There Are", grammar: "There is / There are (afirmativ, negativ, interogativ)", vocab: "Locuri dintr-un Oraș" },
      ru: { title: "Есть парк! — There Is / There Are", grammar: "There is / There are (утверждение, отрицание, вопросы)", vocab: "Места в городе" }
    }
  },
  {
    day: 10, color: "#92400E",
    title: "I Can Swim! — Can / Can't",
    grammar: "Modal Verb: Can / Can't",
    vocab: "Sports & Activities",
    translations: {
      ro: { title: "Pot să înot! — Can / Can't", grammar: "Verb modal: Can / Can't", vocab: "Sporturi și Activități" },
      ru: { title: "Я умею плавать! — Can / Can't", grammar: "Модальный глагол: Can / Can't", vocab: "Спорт и занятия" }
    }
  },
  {
    day: 11, color: "#1D4ED8",
    title: "I'm Eating Now! — Present Continuous",
    grammar: "Present Continuous (positive form)",
    vocab: "Weather & Seasons",
    translations: {
      ro: { title: "Mănânc acum! — Prezent Continuu", grammar: "Prezentul continuu (forma afirmativă)", vocab: "Vreme și Anotimpuri" },
      ru: { title: "Я сейчас ем! — Настоящее продолженное", grammar: "Настоящее продолженное (утвердительная форма)", vocab: "Погода и Времена года" }
    }
  },
  {
    day: 12, color: "#6D28D9",
    title: "Is She Running? — Present Continuous Questions",
    grammar: "Present Continuous (questions & negative)",
    vocab: "Emotions & Feelings",
    translations: {
      ro: { title: "Aleargă ea? — Întrebări la Prezent Continuu", grammar: "Prezentul continuu (forma interogativă și negativă)", vocab: "Emoții și Sentimente" },
      ru: { title: "Она бежит? — Вопросы в настоящем продолженном", grammar: "Настоящее продолженное (вопросы и отрицание)", vocab: "Эмоции и Чувства" }
    }
  },
  {
    day: 13, color: "#047857",
    title: "On, In, Under — Prepositions of Place",
    grammar: "Prepositions of Place (on/in/under/next to/between...)",
    vocab: "The House & Rooms",
    translations: {
      ro: { title: "Pe, În, Sub — Prepoziții de Loc", grammar: "Prepoziții de loc (pe/în/sub/lângă/între...)", vocab: "Casa și Camerele" },
      ru: { title: "На, В, Под — Предлоги места", grammar: "Предлоги места (на/в/под/рядом/между...)", vocab: "Дом и Комнаты" }
    }
  },
  {
    day: 14, color: "#B45309",
    title: "Some Milk, Any Bread — Countable & Uncountable",
    grammar: "Countable/Uncountable Nouns + Some/Any",
    vocab: "Shopping & Supermarket",
    translations: {
      ro: { title: "Ceva lapte, Vreo pâine — Numărabile și Nenumărabile", grammar: "Substantive numărabile/nenumărabile + some/any", vocab: "Cumpărături și Supermarket" },
      ru: { title: "Немного молока, Есть ли хлеб — Исчисляемые/Неисчисляемые", grammar: "Исчисляемые/Неисчисляемые существительные + some/any", vocab: "Магазин и Супермаркет" }
    }
  },
  {
    day: 15, color: "#1F2937", isReview: true,
    title: "🏆 Review Day — Days 1–14 Practice",
    grammar: "Full Review: Days 1–14 (All Grammar)",
    vocab: "Mixed Review Vocabulary",
    translations: {
      ro: { title: "🏆 Zi de Recapitulare — Zilele 1–14", grammar: "Recapitulare completă: Zilele 1–14", vocab: "Vocabular mixt" },
      ru: { title: "🏆 День повторения — Дни 1–14", grammar: "Полное повторение: Дни 1–14", vocab: "Смешанный словарный запас" }
    }
  },
  {
    day: 16, color: "#B91C1C",
    title: "Yesterday — Past Simple: Was / Were",
    grammar: "Past Simple: Was / Were",
    vocab: "Travel & Transportation",
    translations: {
      ro: { title: "Ieri — Trecut Simplu: Was / Were", grammar: "Trecutul simplu: Was / Were", vocab: "Călătorie și Transport" },
      ru: { title: "Вчера — Простое прошедшее: Was / Were", grammar: "Простое прошедшее: Was / Were", vocab: "Путешествие и транспорт" }
    }
  },
  {
    day: 17, color: "#1D4ED8",
    title: "I Worked Yesterday — Past Simple Regular",
    grammar: "Past Simple Regular Verbs (+ed)",
    vocab: "Holidays & Vacation",
    translations: {
      ro: { title: "Am lucrat ieri — Trecut Simplu Verbe Regulate", grammar: "Trecutul simplu verbe regulate (+ed)", vocab: "Vacanțe și Concedii" },
      ru: { title: "Я работал вчера — Правильные глаголы в прошедшем", grammar: "Правильные глаголы прошедшего (+ed)", vocab: "Праздники и Отпуск" }
    }
  },
  {
    day: 18, color: "#047857",
    title: "I Went to the Park — Past Simple Irregular",
    grammar: "Past Simple Irregular Verbs",
    vocab: "Weekend Activities",
    translations: {
      ro: { title: "Am mers în parc — Trecut Simplu Neregulat", grammar: "Trecutul simplu verbe neregulate", vocab: "Activități de Weekend" },
      ru: { title: "Я пошёл в парк — Неправильные глаголы прошедшего", grammar: "Неправильные глаголы прошедшего времени", vocab: "Занятия на выходных" }
    }
  },
  {
    day: 19, color: "#7C3AED",
    title: "Did You Go? — Past Simple Questions",
    grammar: "Past Simple: Negative & Questions",
    vocab: "At the Restaurant",
    translations: {
      ro: { title: "Te-ai dus? — Întrebări la Trecut Simplu", grammar: "Trecutul simplu: forma negativă și interogativă", vocab: "La Restaurant" },
      ru: { title: "Ты ходил? — Вопросы в простом прошедшем", grammar: "Простое прошедшее: отрицание и вопросы", vocab: "В ресторане" }
    }
  },
  {
    day: 20, color: "#B45309",
    title: "I'm Going to Study! — Future with 'Going To'",
    grammar: "Future: be going to",
    vocab: "Plans & Goals",
    translations: {
      ro: { title: "O să studiez! — Viitor cu 'Going To'", grammar: "Viitorul cu be going to", vocab: "Planuri și Obiective" },
      ru: { title: "Я собираюсь учиться! — Будущее с 'Going To'", grammar: "Будущее время: be going to", vocab: "Планы и цели" }
    }
  },
  {
    day: 21, color: "#0891B2",
    title: "Bigger, Smaller, Best! — Comparatives & Superlatives",
    grammar: "Comparatives & Superlatives",
    vocab: "Describing People & Things",
    translations: {
      ro: { title: "Mai mare, Mai mic, Cel mai bun! — Comparative și Superlative", grammar: "Grade de comparație (comparativ și superlativ)", vocab: "Descrierea Persoanelor și Lucrurilor" },
      ru: { title: "Больше, Меньше, Лучший! — Сравнительные и превосходные", grammar: "Степени сравнения прилагательных", vocab: "Описание людей и вещей" }
    }
  },
  {
    day: 22, color: "#6D28D9",
    title: "Where? When? How? — WH- Question Words",
    grammar: "WH- Question Words (who/what/where/when/why/how)",
    vocab: "Directions & Getting Around",
    translations: {
      ro: { title: "Unde? Când? Cum? — Cuvinte Interogative WH-", grammar: "Cuvinte interogative (cine/ce/unde/când/de ce/cum)", vocab: "Direcții și Orientare" },
      ru: { title: "Где? Когда? Как? — Вопросительные слова WH-", grammar: "Вопросительные слова (кто/что/где/когда/почему/как)", vocab: "Направления и ориентирование" }
    }
  },
  {
    day: 23, color: "#BE185D",
    title: "Yes, I Do! — Short Answers",
    grammar: "Short Answers in English",
    vocab: "Jobs & Professions",
    translations: {
      ro: { title: "Da, fac! — Răspunsuri Scurte", grammar: "Răspunsuri scurte în engleză", vocab: "Locuri de Muncă și Profesii" },
      ru: { title: "Да! — Краткие ответы", grammar: "Краткие ответы в английском", vocab: "Работа и Профессии" }
    }
  },
  {
    day: 24, color: "#065F46",
    title: "And, But, Because — Basic Conjunctions",
    grammar: "Basic Conjunctions (and/but/because/or/so)",
    vocab: "Health & Body",
    translations: {
      ro: { title: "Și, Dar, Pentru că — Conjuncții de Bază", grammar: "Conjuncții de bază (și/dar/pentru că/sau/deci)", vocab: "Sănătate și Corp" },
      ru: { title: "И, Но, Потому что — Основные союзы", grammar: "Основные союзы (и/но/потому что/или/поэтому)", vocab: "Здоровье и тело" }
    }
  },
  {
    day: 25, color: "#92400E",
    title: "Stop! Sit Down! — Imperatives",
    grammar: "Imperative Form (commands & requests)",
    vocab: "Classroom Language",
    translations: {
      ro: { title: "Stop! Stai jos! — Imperativul", grammar: "Forma imperativă (comenzi și rugăminți)", vocab: "Limbaj în Clasă" },
      ru: { title: "Стоп! Садись! — Повелительное наклонение", grammar: "Повелительное наклонение (команды и просьбы)", vocab: "Язык классной комнаты" }
    }
  },
  {
    day: 26, color: "#1D4ED8",
    title: "What Time Is It? — Telling the Time & Dates",
    grammar: "Time, Dates, Days of the Week, Months",
    vocab: "A Typical American Day",
    translations: {
      ro: { title: "Cât e ceasul? — A Spune Ora și Data", grammar: "Ora, datele, zilele săptămânii, lunile", vocab: "O Zi Tipică Americană" },
      ru: { title: "Сколько время? — Время и Даты", grammar: "Время, даты, дни недели, месяцы", vocab: "Типичный американский день" }
    }
  },
  {
    day: 27, color: "#6D28D9",
    title: "How Much? How Many? — Quantifiers",
    grammar: "Much / Many / A lot of / A few / A little",
    vocab: "Money & Prices (USD)",
    translations: {
      ro: { title: "Cât de mult? Câți? — Cuantificatori", grammar: "Much / Many / A lot of / A few / A little", vocab: "Bani și Prețuri (USD)" },
      ru: { title: "Сколько? — Квантификаторы", grammar: "Much / Many / A lot of / A few / A little", vocab: "Деньги и Цены (USD)" }
    }
  },
  {
    day: 28, color: "#1F2937", isReview: true,
    title: "🏆 Review Day — Days 16–27 Practice",
    grammar: "Full Review: Days 16–27 (All Grammar)",
    vocab: "Mixed Review 2",
    translations: {
      ro: { title: "🏆 Zi de Recapitulare — Zilele 16–27", grammar: "Recapitulare completă: Zilele 16–27", vocab: "Vocabular mixt 2" },
      ru: { title: "🏆 День повторения — Дни 16–27", grammar: "Полное повторение: Дни 16–27", vocab: "Смешанный словарный запас 2" }
    }
  },
  {
    day: 29, color: "#047857",
    title: "Putting It All Together — Full Conversation",
    grammar: "Mixed Grammar Review (All A1 Topics)",
    vocab: "All Topics: Real American Conversations",
    translations: {
      ro: { title: "Totul laolaltă — Conversație Completă", grammar: "Recapitulare gramaticală mixtă (toate subiectele A1)", vocab: "Toate subiectele: Conversații americane reale" },
      ru: { title: "Всё вместе — Полноценный разговор", grammar: "Смешанное повторение грамматики (все темы A1)", vocab: "Все темы: Реальные американские разговоры" }
    }
  },
  {
    day: 30, color: "#B45309", isGrad: true,
    title: "🎓 Graduation Day! — You Made It!",
    grammar: "Complete A1 Review — Celebrate Your English!",
    vocab: "All 30 Days Vocabulary Review",
    translations: {
      ro: { title: "🎓 Ziua Absolvirii! — Ai reușit!", grammar: "Recapitulare completă A1 — Felicitări!", vocab: "Recapitulare vocabular toate cele 30 de zile" },
      ru: { title: "🎓 День выпуска! — Ты сделал это!", grammar: "Полное повторение A1 — Поздравляем!", vocab: "Повторение словарного запаса всех 30 дней" }
    }
  },
];

const STUDY_STEPS = {
  ro: [
    ["10 min", "📖 Citește PDF Teorie — secțiunea de Gramatică"],
    ["15 min", "📝 Studiază Vocabularul — pronunță fiecare cuvânt cu voce tare"],
    ["10 min", "📖 Citește textul de Lectură — răspunde la întrebări"],
    ["10 min", "🎧 Citește scenariul de Ascultare — răspunde la întrebări"],
    ["10 min", "✏️ Completează PDF-ul de Exerciții"],
    ["10 min", "🎙️ Practică vorbitul și înregistrează-te"],
    ["5 min", "📚 Recapitulare + completează tema"],
  ],
  ru: [
    ["10 мин", "📖 Читай PDF Теории — раздел Грамматики"],
    ["15 мин", "📝 Изучай словарный запас — произноси каждое слово вслух"],
    ["10 мин", "📖 Читай текст для Чтения — отвечай на вопросы"],
    ["10 мин", "🎧 Читай сценарий прослушивания — отвечай на вопросы"],
    ["10 мин", "✏️ Выполняй PDF упражнений"],
    ["10 мин", "🎙️ Практикуй разговор и записывай себя"],
    ["5 мин", "📚 Повторение + выполнение домашнего задания"],
  ]
};

const CORRECTION_PROMPT = (day, title, grammar, answers, lang) => {
  const langInstr = lang === "ro"
    ? "Provide all feedback, explanations, and messages in ROMANIAN (limba română). Grammar explanations should be in Romanian, with English examples."
    : "Provide all feedback, explanations, and messages in RUSSIAN (русский язык). Grammar explanations should be in Russian, with English examples.";

  return `You are a warm, encouraging American English teacher for absolute beginners (CEFR A1 level).
A student has completed Day ${day} exercises: "${title}" — Grammar focus: ${grammar}.
${langInstr}

Here are their answers:
${answers}

Respond EXACTLY in this JSON format (valid JSON only, no markdown, no extra text):
{
  "score": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "emoji": "<one encouraging emoji>",
  "overall_message": "<2-3 warm encouraging sentences in ${lang === "ro" ? "Romanian" : "Russian"}>",
  "corrections": [
    {
      "question": "<the question>",
      "student_answer": "<what they wrote>",
      "correct_answer": "<correct answer>",
      "is_correct": <true/false>,
      "explanation": "<simple explanation in ${lang === "ro" ? "Romanian" : "Russian"}, max 2 sentences>",
      "tip": "<one quick memory tip in ${lang === "ro" ? "Romanian" : "Russian"}>"
    }
  ],
  "grammar_weaknesses": ["<topic in ${lang === "ro" ? "Romanian" : "Russian"}>"],
  "strengths": ["<strength in ${lang === "ro" ? "Romanian" : "Russian"}>"],
  "review_suggestion": "<one thing to review, in ${lang === "ro" ? "Romanian" : "Russian"}>",
  "motivation": "<motivating message for tomorrow, in ${lang === "ro" ? "Romanian" : "Russian"}>"
}`;
};

// ── AMERICAN FLAG SVG COMPONENT ───────────────────────────────────────────────
function AmericanFlag({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.526} viewBox="0 0 190 100" style={{ borderRadius: 3, display: "block" }}>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
        <rect key={i} x="0" y={i * 7.69} width="190" height="7.69"
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect x="0" y="0" width="76" height="53.84" fill="#3C3B6E" />
      {Array.from({length: 50}).map((_, i) => {
        const row = Math.floor(i / 6) + (Math.floor(i / 6) % 2 === 0 ? 0 : 0);
        const col = i % 6;
        const isOffset = Math.floor(i / 6) % 2 === 1;
        const rows = [0,1,2,3,4,5,6,7,8];
        const r = Math.floor(i / (i < 30 ? 6 : 5));
        const c = i % (r % 2 === 0 ? 6 : 5);
        const x = 6 + c * (r % 2 === 0 ? 12 : 14.4) + (r % 2 === 1 ? 7.2 : 0);
        const y = 5.5 + r * 5.5;
        if (y > 52) return null;
        return <text key={i} x={x} y={y} fontSize="5" fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle">★</text>;
      })}
    </svg>
  );
}

// ── LOCK ICON ─────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(null); // null = language chooser screen
  const [view, setView] = useState("dashboard");
  const [selectedDay, setSelectedDay] = useState(null);
  const [answers, setAnswers] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState({});
  const [filter, setFilter] = useState("all");
  const textareaRef = useRef(null);

  // Load progress from storage
  useEffect(() => {
    window.storage?.get("em_progress_v2").then(r => {
      if (r?.value) try { setProgress(JSON.parse(r.value)); } catch {}
    }).catch(() => {});
  }, []);

  const saveProgress = (day, score) => {
    const updated = { ...progress, [day]: score };
    setProgress(updated);
    window.storage?.set("em_progress_v2", JSON.stringify(updated)).catch(() => {});
  };

  const isUnlocked = (dayNum) => {
    if (dayNum === 1) return true;
    const prevScore = progress[dayNum - 1];
    return prevScore !== undefined && prevScore >= 80;
  };

  const L = lang ? TRANS_LABELS[lang] : TRANS_LABELS.ro;

  const completedDays = Object.keys(progress).length;
  const avgScore = completedDays > 0
    ? Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / completedDays)
    : 0;

  const getDisplayData = (day) => ({
    title: lang ? day.translations[lang]?.title || day.title : day.title,
    grammar: lang ? day.translations[lang]?.grammar || day.grammar : day.grammar,
    vocab: lang ? day.translations[lang]?.vocab || day.vocab : day.vocab,
  });

  // ── LANGUAGE CHOOSER ────────────────────────────────────────────────────────
  if (!lang) {
    return (
      <div style={S.langScreen}>
        <div style={S.langCard}>
          <div style={S.langFlagRow}>
            <span style={{ fontSize: 40 }}>🇺🇸</span>
          </div>
          <h1 style={S.langTitle}>30-Day American English Marathon</h1>
          <p style={S.langSubtitle}>CEFR Level A1 — Self-Study Course</p>
          <div style={S.langDivider}/>
          <p style={S.langChoose}>Choose your translation language / Alegeți limba de traducere / Выберите язык перевода:</p>
          <div style={S.langBtnRow}>
            <button style={{ ...S.langBtn, borderColor: "#1D4ED8" }} onClick={() => setLang("ro")}>
              <span style={{ fontSize: 28 }}>🇷🇴</span>
              <span style={S.langBtnLabel}>Română</span>
              <span style={S.langBtnSub}>Romanian</span>
            </button>
            <button style={{ ...S.langBtn, borderColor: "#DC2626" }} onClick={() => setLang("ru")}>
              <span style={{ fontSize: 28 }}>🇷🇺</span>
              <span style={S.langBtnLabel}>Русский</span>
              <span style={S.langBtnSub}>Russian</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const submitForGrading = async () => {
    if (!answers.trim() || !selectedDay) return;
    setLoading(true);
    setResults(null);
    const day = CURRICULUM[selectedDay - 1];
    const dd = getDisplayData(day);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an expert English teacher. Always respond with valid JSON only. No markdown, no backticks, no extra text.",
          messages: [{ role: "user", content: CORRECTION_PROMPT(day.day, dd.title, dd.grammar, answers, lang) }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setResults(parsed);
      saveProgress(selectedDay, parsed.score);
      setView("results");
    } catch (e) {
      setResults({ error: true, message: L.errorMsg });
      setView("results");
    }
    setLoading(false);
  };

  const filteredDays = CURRICULUM.filter(d => {
    if (filter === "completed") return progress[d.day] !== undefined;
    if (filter === "pending") return progress[d.day] === undefined;
    return true;
  });

  // ── RESULTS VIEW ─────────────────────────────────────────────────────────────
  if (view === "results" && results) {
    if (results.error) return (
      <div style={S.centerPage}>
        <p style={{ color: "#DC2626", fontSize: 16, marginBottom: 16 }}>⚠️ {results.message}</p>
        <button style={S.btnPrimary} onClick={() => setView("grader")}>← {L.cancel}</button>
      </div>
    );
    const scoreColor = results.score >= 80 ? "#059669" : results.score >= 60 ? "#D97706" : "#DC2626";
    const passed = results.score >= 80;
    return (
      <div style={S.page}>
        <div style={{ ...S.resultsHero, background: passed ? "linear-gradient(135deg,#065F46,#059669)" : "linear-gradient(135deg,#7F1D1D,#DC2626)" }}>
          <button style={S.backBtnWhite} onClick={() => setView("dashboard")}>{L.backToCourse}</button>
          <div style={{ fontSize: 44, marginBottom: 8 }}>{results.emoji}</div>
          <div style={S.scoreBig}>{results.score}<span style={{ fontSize: 20 }}>/100</span></div>
          <div style={S.gradeTag}>Grade {results.grade} {passed ? "🎉" : "💪"}</div>
          <p style={S.resultsMsg}>{results.overall_message}</p>
          {passed
            ? <div style={S.passedBanner}>✅ {lang === "ro" ? "Felicitări! Ai deblocat ziua următoare!" : "Поздравляем! Следующий день разблокирован!"}</div>
            : <div style={S.failBanner}>📖 {lang === "ro" ? "Mai studiază și încearcă din nou pentru 80+!" : "Ещё поучись и попробуй снова для 80+!"}</div>
          }
        </div>

        <div style={S.resultsBody}>
          <div style={S.twoCol}>
            <div style={{ ...S.card, borderTop: "3px solid #059669" }}>
              <h3 style={S.cardTitle}>{L.strengths}</h3>
              {(results.strengths || []).map((s, i) => <p key={i} style={S.li}>• {s}</p>)}
            </div>
            <div style={{ ...S.card, borderTop: "3px solid #F59E0B" }}>
              <h3 style={S.cardTitle}>{L.improve}</h3>
              {(results.grammar_weaknesses || []).map((w, i) => <p key={i} style={S.li}>• {w}</p>)}
            </div>
          </div>

          <h2 style={S.sectionH}>{L.corrections}</h2>
          {(results.corrections || []).map((c, i) => (
            <div key={i} style={{ ...S.corrCard, borderLeft: `4px solid ${c.is_correct ? "#059669" : "#DC2626"}` }}>
              <div style={S.corrRow}>
                <span>{c.is_correct ? "✅" : "❌"}</span>
                <span style={S.corrQ}>{c.question}</span>
              </div>
              {c.is_correct
                ? <p style={{ color: "#059669", fontSize: 13, marginTop: 4 }}>{L.perfect}</p>
                : <div style={S.corrDetail}>
                    <p><b style={S.label}>{L.yourAnswer}</b> <span style={{ color: "#DC2626" }}>{c.student_answer}</span></p>
                    <p><b style={S.label}>{L.correctAnswer}</b> <span style={{ color: "#059669", fontWeight: 700 }}>{c.correct_answer}</span></p>
                    <p><b style={S.label}>{L.why}</b> {c.explanation}</p>
                    {c.tip && <p style={S.tip}>{L.tip} {c.tip}</p>}
                  </div>
              }
            </div>
          ))}

          <div style={S.twoCol}>
            <div style={{ ...S.card, background: "#EFF6FF", borderTop: "3px solid #2563EB" }}>
              <h3 style={S.cardTitle}>{L.reviewThis}</h3>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{results.review_suggestion}</p>
            </div>
            <div style={{ ...S.card, background: "#FFFBEB", borderTop: "3px solid #F59E0B" }}>
              <h3 style={S.cardTitle}>{L.motivation}</h3>
              <p style={{ fontSize: 14, color: "#374151", fontStyle: "italic", lineHeight: 1.6 }}>"{results.motivation}"</p>
            </div>
          </div>

          <div style={S.btnRow}>
            <button style={S.btnSecondary} onClick={() => { setView("grader"); setAnswers(""); }}>
              {L.resubmit}
            </button>
            <button style={S.btnPrimary} onClick={() => setView("dashboard")}>
              {L.backToDashboard}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GRADER VIEW ──────────────────────────────────────────────────────────────
  if (view === "grader" && selectedDay) {
    const day = CURRICULUM[selectedDay - 1];
    const dd = getDisplayData(day);
    if (!isUnlocked(selectedDay)) { setView("lesson"); return null; }
    return (
      <div style={S.page}>
        <div style={{ ...S.lessonHero, background: day.color }}>
          <button style={S.backBtnWhite} onClick={() => setView("lesson")}>{L.backToCourse}</button>
          <div style={S.dayBadge2}>DAY {day.day}</div>
          <h1 style={S.heroTitle}>{dd.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 6 }}>{L.submitTitle}</p>
        </div>
        <div style={S.graderWrap}>
          <div style={S.infoBox}>
            <h3 style={{ margin: "0 0 8px", color: "#1B2A4A", fontSize: 14, fontWeight: 700 }}>{L.howToSubmit}</h3>
            <ol style={{ margin: 0, paddingLeft: 20, color: "#374151", fontSize: 13, lineHeight: 1.8 }}>
              {L.howToSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
          <div style={S.exBox}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 12, color: "#374151" }}>{L.exampleFormat}</p>
            <pre style={S.pre}>{`Exercise 1 (Grammar):\nQ1: She is a teacher.\nQ2: They are happy.\n\nExercise 2 (Matching):\nQ1: A  Q2: C  Q3: B\n\nExercise 3 (Multiple Choice):\nQ1: B  Q2: A  Q3: C`}</pre>
          </div>
          <label style={{ display: "block", fontWeight: 700, color: "#1B2A4A", fontSize: 14, marginBottom: 8 }}>
            {L.yourAnswers} — Day {day.day} ({dd.grammar}):
          </label>
          <textarea
            ref={textareaRef}
            value={answers}
            onChange={e => setAnswers(e.target.value)}
            style={S.textarea}
            rows={14}
            placeholder={lang === "ro" ? "Tastează răspunsurile tale aici..." : "Введи свои ответы здесь..."}
          />
          <div style={S.btnRow}>
            <button style={S.btnSecondary} onClick={() => setView("lesson")}>{L.cancel}</button>
            <button
              style={{ ...S.btnPrimary, opacity: loading || !answers.trim() ? 0.55 : 1 }}
              onClick={submitForGrading}
              disabled={loading || !answers.trim()}
            >
              {loading ? L.grading : L.submitCorrection}
            </button>
          </div>
          {loading && (
            <div style={S.loadingRow}>
              <div style={S.spinner}/>
              <p style={{ color: "#2563EB", fontWeight: 600, fontSize: 14 }}>{L.teacherReviewing}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── LESSON VIEW ──────────────────────────────────────────────────────────────
  if (view === "lesson" && selectedDay) {
    const day = CURRICULUM[selectedDay - 1];
    const dd = getDisplayData(day);
    const unlocked = isUnlocked(selectedDay);
    const prev = selectedDay > 1 ? CURRICULUM[selectedDay - 2] : null;
    const next = selectedDay < 30 ? CURRICULUM[selectedDay] : null;
    const myScore = progress[selectedDay];

    return (
      <div style={S.page}>
        <div style={{ ...S.lessonHero, background: unlocked ? day.color : "#374151" }}>
          <button style={S.backBtnWhite} onClick={() => setView("dashboard")}>{L.backToCourse}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <AmericanFlag size={36} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              DAY {day.day} / 30 • {L.american}
            </span>
          </div>
          <h1 style={S.heroTitle}>{dd.title}</h1>
          {myScore !== undefined && (
            <div style={S.scorePill}>✅ {L.completedScore} {myScore}/100 {myScore >= 80 ? "🎉" : "💪"}</div>
          )}
          {!unlocked && (
            <div style={S.lockedBanner}>
              <LockIcon/> {L.passRequired}
            </div>
          )}
        </div>

        <div style={S.lessonBody}>
          {!unlocked ? (
            <div style={S.lockMsg}>
              <div style={{ fontSize: 56 }}>🔒</div>
              <h2 style={{ color: "#374151", fontSize: 20, margin: "12px 0 8px" }}>{L.locked}</h2>
              <p style={{ color: "#6B7280", fontSize: 14, textAlign: "center", maxWidth: 320 }}>{L.passRequired}</p>
              {prev && (
                <button style={{ ...S.btnPrimary, marginTop: 16, background: prev.color }}
                  onClick={() => setSelectedDay(prev.day)}>
                  ← {lang === "ro" ? "Înapoi la Ziua" : "Назад к Дню"} {prev.day}
                </button>
              )}
            </div>
          ) : (
            <>
              <div style={S.twoCol}>
                <div style={{ ...S.infoCard, borderTop: `3px solid ${day.color}` }}>
                  <p style={S.infoLabel}>{L.grammarTopic}</p>
                  <p style={S.infoVal}>{dd.grammar}</p>
                </div>
                <div style={{ ...S.infoCard, borderTop: "3px solid #7C3AED" }}>
                  <p style={S.infoLabel}>{L.vocabTopic}</p>
                  <p style={S.infoVal}>{dd.vocab}</p>
                </div>
              </div>

              <h2 style={S.sectionH}>{L.studyMaterials}</h2>
              <div style={S.twoCol}>
                <div style={S.pdfCard}>
                  <div style={{ fontSize: 32 }}>📖</div>
                  <h3 style={S.pdfTitle}>{L.theory}</h3>
                  <p style={S.pdfDesc}>{L.theoryDesc}</p>
                  <div style={S.pdfChip}>Day{String(day.day).padStart(2,"0")}_Theory.pdf</div>
                </div>
                <div style={S.pdfCard}>
                  <div style={{ fontSize: 32 }}>✏️</div>
                  <h3 style={S.pdfTitle}>{L.exercises}</h3>
                  <p style={S.pdfDesc}>{L.exercisesDesc}</p>
                  <div style={{ ...S.pdfChip, background: "#FEF2F2", color: "#DC2626" }}>
                    Day{String(day.day).padStart(2,"0")}_Exercises.pdf
                  </div>
                </div>
              </div>

              <h2 style={S.sectionH}>{L.studyPlan} Day {day.day}</h2>
              <div style={S.studyBox}>
                {STUDY_STEPS[lang].map(([time, task], i) => (
                  <div key={i} style={S.studyRow}>
                    <span style={{ ...S.timePill, background: day.color + "22", color: day.color }}>{time}</span>
                    <span style={{ fontSize: 13, color: "#374151" }}>{task}</span>
                  </div>
                ))}
              </div>

              <div style={S.btnRow}>
                {prev && isUnlocked(prev.day) && (
                  <button style={S.btnSecondary} onClick={() => setSelectedDay(prev.day)}>
                    ← Day {prev.day}
                  </button>
                )}
                <button style={{ ...S.btnPrimary, background: day.color }}
                  onClick={() => setView("grader")}>
                  {L.submitBtn}
                </button>
                {next && isUnlocked(next.day) && (
                  <button style={S.btnSecondary} onClick={() => setSelectedDay(next.day)}>
                    Day {next.day} →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── DASHBOARD ────────────────────────────────────────────────────────────────
  const progressPct = Math.round((completedDays / 30) * 100);

  return (
    <div style={S.app}>
      {/* HERO */}
      <div style={S.hero}>
        <div style={S.heroInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <AmericanFlag size={52} />
            <div>
              <div style={S.heroTag}>{L.american} • CEFR A1</div>
              <h1 style={S.heroH1}>30-Day English Marathon</h1>
            </div>
          </div>
          <p style={S.heroPara}>
            {lang === "ro"
              ? "Cursul tău complet de engleză americană pentru începători. Studiază zilnic, trimite exercițiile și primești corecții și feedback de la AI."
              : "Твой полный курс американского английского для начинающих. Учись каждый день, сдавай упражнения и получай исправления от ИИ."}
          </p>

          {/* Language switch */}
          <div style={S.langSwitch}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{L.chooseLanguage}</span>
            <button style={{ ...S.langSwitchBtn, ...(lang === "ro" ? S.langSwitchActive : {}) }} onClick={() => setLang("ro")}>
              🇷🇴 Română
            </button>
            <button style={{ ...S.langSwitchBtn, ...(lang === "ru" ? S.langSwitchActive : {}) }} onClick={() => setLang("ru")}>
              🇷🇺 Русский
            </button>
          </div>

          <div style={S.statsRow}>
            {[
              [completedDays, L.days],
              [30 - completedDays, L.daysLeft],
              [avgScore || "—", L.avgScore],
              [`${progressPct}%`, L.complete],
            ].map(([val, label]) => (
              <div key={label} style={S.statBox}>
                <div style={S.statNum}>{val}</div>
                <div style={S.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={S.progressWrap}>
        <div style={{ ...S.progressFill, width: `${progressPct}%` }}/>
      </div>

      {/* FILTER BAR */}
      <div style={S.filterBar}>
        {[["all", L.showAll], ["completed", L.showDone], ["pending", L.showPending]].map(([f, label]) => (
          <button key={f}
            style={{ ...S.filterBtn, ...(filter === f ? S.filterActive : {}) }}
            onClick={() => setFilter(f)}>
            {label}
          </button>
        ))}
      </div>

      {/* COURSE GRID */}
      <div style={S.grid}>
        {filteredDays.map(day => {
          const dd = getDisplayData(day);
          const unlocked = isUnlocked(day.day);
          const myScore = progress[day.day];
          const done = myScore !== undefined;
          const scoreColor = myScore >= 80 ? "#059669" : myScore >= 60 ? "#D97706" : "#DC2626";

          return (
            <div key={day.day}
              style={{
                ...S.dayCard,
                borderTop: `4px solid ${unlocked ? day.color : "#9CA3AF"}`,
                opacity: unlocked ? 1 : 0.65,
                cursor: unlocked ? "pointer" : "default",
              }}
              onClick={() => unlocked && (setSelectedDay(day.day), setView("lesson"))}
            >
              <div style={S.cardTop}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {!unlocked && <span style={{ color: "#9CA3AF", display: "flex" }}><LockIcon /></span>}
                  <span style={{ fontSize: 11, fontWeight: 800, color: unlocked ? day.color : "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Day {day.day}
                  </span>
                </div>
                {done && (
                  <span style={{ ...S.scorePillSm, background: scoreColor }}>
                    {myScore}/100 {myScore >= 80 ? "✓" : "↺"}
                  </span>
                )}
                {!done && unlocked && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D1FAE5", border: "2px solid #059669", display: "block" }}/>}
              </div>

              <h3 style={{ ...S.cardTitle, color: unlocked ? "#1B2A4A" : "#6B7280" }}>{dd.title}</h3>
              <p style={S.cardGrammar}>{dd.grammar}</p>
              <p style={S.cardVocab}>📝 {dd.vocab}</p>

              {day.isReview && <span style={S.reviewBadge}>{L.reviewBadge}</span>}
              {day.isGrad && <span style={{ ...S.reviewBadge, background: "#FEF9C3", color: "#92400E" }}>{L.gradBadge}</span>}

              {!unlocked && (
                <div style={S.lockedOverlay}>
                  <span style={{ fontSize: 11, color: "#6B7280" }}>
                    {lang === "ro" ? `Obține 80+ la Ziua ${day.day - 1}` : `Набери 80+ за День ${day.day - 1}`}
                  </span>
                </div>
              )}

              {unlocked && (
                <div style={S.cardBtns}>
                  <button style={{ ...S.cardBtn, background: day.color }}
                    onClick={e => { e.stopPropagation(); setSelectedDay(day.day); setView("lesson"); }}>
                    {done ? L.reviewLesson : L.openLesson}
                  </button>
                  <button style={{ ...S.cardBtn, background: "#F3F4F6", color: "#374151" }}
                    onClick={e => { e.stopPropagation(); setSelectedDay(day.day); setView("grader"); }}>
                    {L.submitExercises}
                  </button>
                </div>
              )}

              {!unlocked && (
                <div style={{ ...S.cardBtns }}>
                  <button style={{ ...S.cardBtn, background: "#E5E7EB", color: "#9CA3AF", cursor: "not-allowed" }} disabled>
                    {L.locked}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* HOW IT WORKS */}
      <div style={S.howSection}>
        <h2 style={S.howTitle}>{L.howWorks}</h2>
        <div style={S.howGrid}>
          {[
            [L.step1T, L.step1D, "1️⃣"],
            [L.step2T, L.step2D, "2️⃣"],
            [L.step3T, L.step3D, "3️⃣"],
            [L.step4T, L.step4D, "4️⃣"],
          ].map(([title, desc, num]) => (
            <div key={title} style={S.howCard}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{num}</div>
              <h3 style={S.howCardTitle}>{title}</h3>
              <p style={S.howCardDesc}>{desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24, paddingBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            🔒 {lang === "ro" ? "Nivelurile se deblochează cu 80+ la ziua precedentă" : "Уровни разблокируются при 80+ за предыдущий день"} • 🇺🇸 American English
          </span>
        </div>
      </div>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  app: { fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#F8FAFC", minHeight: "100vh" },
  page: { fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#F8FAFC", minHeight: "100vh" },
  centerPage: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 24, fontFamily: "'Segoe UI',system-ui,sans-serif" },

  // Language chooser
  langScreen: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1B2A4A 0%,#2563EB 100%)", padding: 24, fontFamily: "'Segoe UI',system-ui,sans-serif" },
  langCard: { background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
  langFlagRow: { marginBottom: 16 },
  langTitle: { fontSize: 22, fontWeight: 800, color: "#1B2A4A", margin: "0 0 6px" },
  langSubtitle: { fontSize: 14, color: "#6B7280", margin: "0 0 20px" },
  langDivider: { height: 1, background: "#E5E7EB", margin: "0 0 20px" },
  langChoose: { fontSize: 13, color: "#374151", marginBottom: 20, lineHeight: 1.5 },
  langBtnRow: { display: "flex", gap: 16, justifyContent: "center" },
  langBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "20px 32px", border: "2.5px solid", borderRadius: 14, background: "white", cursor: "pointer", transition: "all 0.2s", flex: 1 },
  langBtnLabel: { fontSize: 16, fontWeight: 700, color: "#1B2A4A" },
  langBtnSub: { fontSize: 12, color: "#6B7280" },

  // Hero
  hero: { background: "linear-gradient(135deg,#1B2A4A 0%,#1E3A6E 50%,#2563EB 100%)", padding: "40px 20px 32px", position: "relative" },
  heroInner: { maxWidth: 960, margin: "0 auto" },
  heroTag: { fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" },
  heroH1: { color: "white", fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, margin: "2px 0", lineHeight: 1.15 },
  heroPara: { color: "rgba(255,255,255,0.8)", fontSize: 14, maxWidth: 600, lineHeight: 1.6, margin: "0 0 20px" },
  statsRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  statBox: { background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 20px", textAlign: "center", minWidth: 70, border: "1px solid rgba(255,255,255,0.15)" },
  statNum: { color: "#FCD34D", fontSize: 22, fontWeight: 800, lineHeight: 1 },
  statLabel: { color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 3 },
  langSwitch: { display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" },
  langSwitchBtn: { padding: "5px 14px", borderRadius: 20, border: "1.5px solid rgba(255,255,255,0.3)", background: "transparent", color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  langSwitchActive: { background: "rgba(255,255,255,0.2)", color: "white", borderColor: "rgba(255,255,255,0.6)" },

  // Progress
  progressWrap: { height: 5, background: "rgba(0,0,0,0.1)", width: "100%" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#FCD34D,#F59E0B)", transition: "width 0.6s ease", minWidth: 4 },

  // Filter
  filterBar: { display: "flex", gap: 8, padding: "14px 20px", flexWrap: "wrap", maxWidth: 960, margin: "0 auto" },
  filterBtn: { padding: "5px 14px", borderRadius: 20, border: "1.5px solid #E5E7EB", background: "white", fontSize: 12, cursor: "pointer", color: "#374151", fontWeight: 600 },
  filterActive: { background: "#1B2A4A", color: "white", borderColor: "#1B2A4A" },

  // Grid
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, padding: "0 20px 24px", maxWidth: 960, margin: "0 auto" },
  dayCard: { background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", transition: "transform 0.15s" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 12, fontWeight: 700, margin: "0 0 5px", lineHeight: 1.35 },
  cardGrammar: { fontSize: 11, color: "#374151", margin: "0 0 3px", lineHeight: 1.4 },
  cardVocab: { fontSize: 10, color: "#6B7280", margin: "0 0 8px" },
  scorePillSm: { color: "white", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 8 },
  reviewBadge: { display: "inline-block", background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, marginBottom: 8 },
  lockedOverlay: { marginBottom: 6 },
  cardBtns: { display: "flex", gap: 6, marginTop: 8 },
  cardBtn: { flex: 1, padding: "6px 4px", borderRadius: 7, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "white" },

  // Lesson
  lessonHero: { padding: "28px 20px 24px" },
  backBtnWhite: { background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, marginBottom: 12, fontWeight: 600 },
  dayBadge2: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  heroTitle: { color: "white", fontSize: "clamp(17px,3vw,26px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.25 },
  scorePill: { display: "inline-block", background: "rgba(255,255,255,0.18)", color: "white", padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 700, marginTop: 8 },
  lockedBanner: { display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.85)", padding: "8px 14px", borderRadius: 8, fontSize: 12, marginTop: 10, fontWeight: 600 },
  lessonBody: { padding: "16px 20px", maxWidth: 820, margin: "0 auto" },
  lockMsg: { display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px", textAlign: "center" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
  infoCard: { background: "white", borderRadius: 10, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
  infoLabel: { fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" },
  infoVal: { fontSize: 13, color: "#1B2A4A", fontWeight: 600, margin: 0 },
  sectionH: { fontSize: 16, fontWeight: 700, color: "#1B2A4A", margin: "0 0 12px" },
  pdfCard: { background: "white", borderRadius: 12, padding: 18, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" },
  pdfTitle: { fontSize: 14, fontWeight: 700, color: "#1B2A4A", margin: "6px 0 6px" },
  pdfDesc: { fontSize: 12, color: "#6B7280", margin: "0 0 10px", lineHeight: 1.5 },
  pdfChip: { background: "#EFF6FF", color: "#2563EB", fontFamily: "monospace", fontSize: 11, padding: "5px 10px", borderRadius: 6, fontWeight: 700, display: "inline-block" },
  studyBox: { background: "white", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.07)", marginBottom: 20 },
  studyRow: { display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid #F3F4F6" },
  timePill: { fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 10, minWidth: 50, textAlign: "center" },
  btnRow: { display: "flex", gap: 10, justifyContent: "center", padding: "12px 0 24px", flexWrap: "wrap" },
  btnPrimary: { padding: "11px 24px", background: "#2563EB", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnSecondary: { padding: "11px 20px", background: "white", color: "#374151", border: "1.5px solid #D1D5DB", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" },

  // Grader
  graderWrap: { padding: "16px 20px", maxWidth: 740, margin: "0 auto" },
  infoBox: { background: "#EFF6FF", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #BFDBFE" },
  exBox: { background: "#F8FAFC", border: "1.5px dashed #CBD5E1", borderRadius: 10, padding: 12, marginBottom: 14 },
  pre: { margin: 0, fontSize: 11, color: "#374151", fontFamily: "monospace", lineHeight: 1.6 },
  textarea: { width: "100%", padding: 12, borderRadius: 10, border: "1.5px solid #D1D5DB", fontSize: 13, fontFamily: "monospace", lineHeight: 1.6, resize: "vertical", boxSizing: "border-box", color: "#1F2937", outline: "none", background: "white" },
  loadingRow: { display: "flex", alignItems: "center", gap: 12, padding: 14, background: "#EFF6FF", borderRadius: 10, marginTop: 14 },
  spinner: { width: 22, height: 22, border: "3px solid #BFDBFE", borderTop: "3px solid #2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 },

  // Results
  resultsHero: { padding: "32px 20px 24px", textAlign: "center" },
  resultsBody: { padding: "16px 20px", maxWidth: 820, margin: "0 auto" },
  scoreBig: { fontSize: 52, fontWeight: 800, color: "white", lineHeight: 1 },
  gradeTag: { color: "rgba(255,255,255,0.85)", fontSize: 16, fontWeight: 700, margin: "6px 0 10px" },
  resultsMsg: { color: "white", fontSize: 14, maxWidth: 480, margin: "0 auto 14px", lineHeight: 1.6 },
  passedBanner: { display: "inline-block", background: "rgba(255,255,255,0.2)", color: "white", padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700 },
  failBanner: { display: "inline-block", background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.9)", padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600 },
  card: { background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#1B2A4A", margin: "0 0 8px" },
  li: { fontSize: 13, color: "#374151", margin: "3px 0" },
  corrCard: { background: "white", borderRadius: 10, padding: 12, marginBottom: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  corrRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  corrQ: { fontSize: 13, fontWeight: 600, color: "#1B2A4A" },
  corrDetail: { paddingLeft: 26, fontSize: 12, color: "#374151", lineHeight: 1.7 },
  label: { fontWeight: 700, color: "#1B2A4A" },
  tip: { background: "#FFFBEB", padding: "5px 9px", borderRadius: 6, color: "#92400E", fontSize: 11, marginTop: 5 },

  // How it works
  howSection: { background: "#1B2A4A", padding: "36px 20px" },
  howTitle: { color: "white", fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 20 },
  howGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, maxWidth: 820, margin: "0 auto" },
  howCard: { background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 18, textAlign: "center" },
  howCardTitle: { color: "#FCD34D", fontSize: 14, fontWeight: 700, margin: "0 0 6px" },
  howCardDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 1.6, margin: 0 },
};

// Inject keyframes
const style = document.createElement("style");
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
