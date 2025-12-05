// 國中生常用英文單字資料庫
const wordsData = [
    {
        word: "beautiful",
        pronunciation: "/ˈbjuːtɪfəl/",
        meaning: "美麗的",
        example: "She has a beautiful smile. (她有一個美麗的笑容。)"
    },
    {
        word: "important",
        pronunciation: "/ɪmˈpɔːrtənt/",
        meaning: "重要的",
        example: "Education is very important. (教育非常重要。)"
    },
    {
        word: "different",
        pronunciation: "/ˈdɪfərənt/",
        meaning: "不同的",
        example: "We have different opinions. (我們有不同的意見。)"
    },
    {
        word: "difficult",
        pronunciation: "/ˈdɪfɪkəlt/",
        meaning: "困難的",
        example: "This math problem is difficult. (這道數學題很困難。)"
    },
    {
        word: "interesting",
        pronunciation: "/ˈɪntrəstɪŋ/",
        meaning: "有趣的",
        example: "This book is very interesting. (這本書很有趣。)"
    },
    {
        word: "comfortable",
        pronunciation: "/ˈkʌmftəbəl/",
        meaning: "舒適的",
        example: "This chair is very comfortable. (這張椅子很舒適。)"
    },
    {
        word: "wonderful",
        pronunciation: "/ˈwʌndərfəl/",
        meaning: "美妙的",
        example: "We had a wonderful time. (我們度過了美好的時光。)"
    },
    {
        word: "delicious",
        pronunciation: "/dɪˈlɪʃəs/",
        meaning: "美味的",
        example: "The food is delicious. (食物很美味。)"
    },
    {
        word: "excited",
        pronunciation: "/ɪkˈsaɪtɪd/",
        meaning: "興奮的",
        example: "I'm excited about the trip. (我對這次旅行感到興奮。)"
    },
    {
        word: "surprised",
        pronunciation: "/sərˈpraɪzd/",
        meaning: "驚訝的",
        example: "I was surprised by the news. (我對這個消息感到驚訝。)"
    },
    {
        word: "library",
        pronunciation: "/ˈlaɪbreri/",
        meaning: "圖書館",
        example: "I study in the library every day. (我每天都在圖書館學習。)"
    },
    {
        word: "restaurant",
        pronunciation: "/ˈrestrɑːnt/",
        meaning: "餐廳",
        example: "We had dinner at a nice restaurant. (我們在一家不錯的餐廳吃晚餐。)"
    },
    {
        word: "hospital",
        pronunciation: "/ˈhɑːspɪtəl/",
        meaning: "醫院",
        example: "My mother works in a hospital. (我媽媽在醫院工作。)"
    },
    {
        word: "museum",
        pronunciation: "/mjuˈziːəm/",
        meaning: "博物館",
        example: "We visited the art museum yesterday. (我們昨天參觀了美術館。)"
    },
    {
        word: "station",
        pronunciation: "/ˈsteɪʃən/",
        meaning: "車站",
        example: "The train station is nearby. (火車站在附近。)"
    },
    {
        word: "homework",
        pronunciation: "/ˈhoʊmwɜːrk/",
        meaning: "家庭作業",
        example: "I need to finish my homework. (我需要完成我的家庭作業。)"
    },
    {
        word: "exercise",
        pronunciation: "/ˈeksərsaɪz/",
        meaning: "運動；練習",
        example: "Exercise is good for your health. (運動對健康有益。)"
    },
    {
        word: "subject",
        pronunciation: "/ˈsʌbdʒekt/",
        meaning: "科目",
        example: "English is my favorite subject. (英文是我最喜歡的科目。)"
    },
    {
        word: "science",
        pronunciation: "/ˈsaɪəns/",
        meaning: "科學",
        example: "I love studying science. (我喜歡學習科學。)"
    },
    {
        word: "history",
        pronunciation: "/ˈhɪstəri/",
        meaning: "歷史",
        example: "History is an important subject. (歷史是一門重要的科目。)"
    },
    {
        word: "geography",
        pronunciation: "/dʒiˈɑːɡrəfi/",
        meaning: "地理",
        example: "We learned about Asia in geography class. (我們在地理課上學習了亞洲。)"
    },
    {
        word: "mathematics",
        pronunciation: "/ˌmæθəˈmætɪks/",
        meaning: "數學",
        example: "Mathematics is challenging but fun. (數學很有挑戰性但也很有趣。)"
    },
    {
        word: "language",
        pronunciation: "/ˈlæŋɡwɪdʒ/",
        meaning: "語言",
        example: "English is an international language. (英語是一種國際語言。)"
    },
    {
        word: "hobby",
        pronunciation: "/ˈhɑːbi/",
        meaning: "嗜好",
        example: "Reading is my hobby. (閱讀是我的嗜好。)"
    },
    {
        word: "friend",
        pronunciation: "/frend/",
        meaning: "朋友",
        example: "She is my best friend. (她是我最好的朋友。)"
    },
    {
        word: "family",
        pronunciation: "/ˈfæməli/",
        meaning: "家庭",
        example: "I love my family very much. (我非常愛我的家人。)"
    },
    {
        word: "teacher",
        pronunciation: "/ˈtiːtʃər/",
        meaning: "老師",
        example: "Our teacher is very kind. (我們的老師很親切。)"
    },
    {
        word: "student",
        pronunciation: "/ˈstuːdənt/",
        meaning: "學生",
        example: "I am a junior high school student. (我是一名國中生。)"
    },
    {
        word: "classmate",
        pronunciation: "/ˈklæsmeɪt/",
        meaning: "同學",
        example: "He is my classmate. (他是我的同學。)"
    },
    {
        word: "breakfast",
        pronunciation: "/ˈbrekfəst/",
        meaning: "早餐",
        example: "I eat breakfast at 7 AM. (我早上7點吃早餐。)"
    },
    {
        word: "lunch",
        pronunciation: "/lʌntʃ/",
        meaning: "午餐",
        example: "We have lunch at school. (我們在學校吃午餐。)"
    },
    {
        word: "dinner",
        pronunciation: "/ˈdɪnər/",
        meaning: "晚餐",
        example: "Dinner is ready. (晚餐準備好了。)"
    },
    {
        word: "morning",
        pronunciation: "/ˈmɔːrnɪŋ/",
        meaning: "早晨",
        example: "Good morning! (早安！)"
    },
    {
        word: "afternoon",
        pronunciation: "/ˌæftərˈnuːn/",
        meaning: "下午",
        example: "I study in the afternoon. (我下午學習。)"
    },
    {
        word: "evening",
        pronunciation: "/ˈiːvnɪŋ/",
        meaning: "晚上",
        example: "We watch TV in the evening. (我們晚上看電視。)"
    },
    {
        word: "weekend",
        pronunciation: "/ˈwiːkend/",
        meaning: "週末",
        example: "I relax on the weekend. (我在週末放鬆。)"
    },
    {
        word: "vacation",
        pronunciation: "/veɪˈkeɪʃən/",
        meaning: "假期",
        example: "We're going on vacation next week. (我們下週要去度假。)"
    },
    {
        word: "weather",
        pronunciation: "/ˈweðər/",
        meaning: "天氣",
        example: "The weather is nice today. (今天天氣很好。)"
    },
    {
        word: "season",
        pronunciation: "/ˈsiːzən/",
        meaning: "季節",
        example: "Spring is my favorite season. (春天是我最喜歡的季節。)"
    },
    {
        word: "temperature",
        pronunciation: "/ˈtemprətʃər/",
        meaning: "溫度",
        example: "The temperature is 25 degrees. (溫度是25度。)"
    },
    // 👇 以下為範例：如何添加新單字
    // 你可以複製這個格式，修改內容後添加更多單字
    {
        word: "computer",
        pronunciation: "/kəmˈpjuːtər/",
        meaning: "電腦",
        example: "I use a computer every day. (我每天都使用電腦。)"
    }
];

