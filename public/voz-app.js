/* =========================================
   VOZ — Language system, i18n, interactions
   ========================================= */

/* ---- Hello cycle (English pinned first, then the rest) ---- */
const CYCLE = ["Hello","Hola","नमस्ते","Xin chào","مرحبا","Olá","안녕하세요","Bonjour","Ciao","こんにちは","Merhaba","Привет","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ","வணக்கம்","నమస్కారం","নমস্কার","Sawubona","Habari","Shalom","Salam","Hei","Hallo","Ahoj","Cześć","Szia","Bună","Zdravo","Γεια","Selam","Kamusta","สวัสดี","ສະບາຍດີ","ជំរាបសួរ","မင်္ဂလာပါ","Сайн уу","Сәлем","Салом","ආයුබෝවන්","Mbote","Mhoro"];

/* ---- Language list. English pinned first; then Swahili/Tagalog/Malay/Indonesian/Yoruba/Igbo/Hausa/Amharic added ---- */
const LANGS = [
  ["English","English","en","🇬🇧"],
  ["हिन्दी","Hindi","hi","🇮🇳"],
  ["Español","Spanish","es","🇪🇸"],
  ["Tiếng Việt","Vietnamese","vi","🇻🇳"],
  ["العربية","Arabic","ar","🇸🇦"],
  ["Português","Portuguese","pt","🇵🇹"],
  ["한국어","Korean","ko","🇰🇷"],
  ["Français","French","fr","🇫🇷"],
  ["Italiano","Italian","it","🇮🇹"],
  ["日本語","Japanese","ja","🇯🇵"],
  ["Türkçe","Turkish","tr","🇹🇷"],
  ["Русский","Russian","ru","🇷🇺"],
  ["ਪੰਜਾਬੀ","Punjabi","pa","🇮🇳"],
  ["தமிழ்","Tamil","ta","🇮🇳"],
  ["తెలుగు","Telugu","te","🇮🇳"],
  ["বাংলা","Bengali","bn","🇧🇩"],
  ["isiZulu","Zulu","zu","🇿🇦"],
  ["Kiswahili","Swahili","sw","🇰🇪"],
  ["Filipino","Tagalog","tl","🇵🇭"],
  ["Bahasa Melayu","Malay","ms","🇲🇾"],
  ["Bahasa Indonesia","Indonesian","id","🇮🇩"],
  ["Yorùbá","Yoruba","yo","🇳🇬"],
  ["Igbo","Igbo","ig","🇳🇬"],
  ["Hausa","Hausa","ha","🇳🇬"],
  ["አማርኛ","Amharic","am","🇪🇹"],
  ["עברית","Hebrew","he","🇮🇱"],
  ["فارسی","Persian","fa","🇮🇷"],
  ["Norsk","Norwegian","no","🇳🇴"],
  ["Deutsch","German","de","🇩🇪"],
  ["Čeština","Czech","cs","🇨🇿"],
  ["Polski","Polish","pl","🇵🇱"],
  ["Magyar","Hungarian","hu","🇭🇺"],
  ["Română","Romanian","ro","🇷🇴"],
  ["Srpski","Serbian","sr","🇷🇸"],
  ["Ελληνικά","Greek","el","🇬🇷"],
  ["ภาษาไทย","Thai","th","🇹🇭"],
  ["ລາວ","Lao","lo","🇱🇦"],
  ["ភាសាខ្មែរ","Khmer","km","🇰🇭"],
  ["မြန်မာဘာသာ","Burmese","my","🇲🇲"],
  ["Монгол","Mongolian","mn","🇲🇳"],
  ["Қазақша","Kazakh","kk","🇰🇿"],
  ["Кыргызча","Kyrgyz","ky","🇰🇬"],
  ["Тоҷикӣ","Tajik","tg","🇹🇯"],
  ["සිංහල","Sinhala","si","🇱🇰"],
  ["Lingála","Lingala","ln","🇨🇩"],
  ["ChiShona","Shona","sn","🇿🇼"]
];
const RTL_CODES = new Set(["ar","he","fa","ur"]);

/* ---- Translations ---- */
const I18N = {
  en: {
    appName:"Voz",
    tagline:"Your store, in your voice",
    eyebrow:"AI for artisans, in 70+ languages",
    headline1:"Your voice.",
    headline2:"Your store.",
    headlineSub:"Built by AI. Owned by you.",
    waveLabel:"speak in any language",
    ctaBegin:"Begin your storefront",
    ctaSub:"No account needed · Works on any phone",
    scrollPrompt:"See how it works",
    navLink:"How it works →",
    howItWorksHeading:"Three steps. That is all.",
    howItWorksSub:"No forms. No typing. No English required. Just your hands, your voice, and a phone.",
    step1Title:"Photograph",
    step1Desc:"A single picture of the piece in your hands. Cotton shadow, wooden floor — the imperfections are the story.",
    step2Title:"Speak",
    step2Desc:"Tell us about it, in the language you dream in. What it's made of, who it's for, what it carries.",
    step3Title:"Your storefront goes live",
    step3Desc:"Readable in English, Spanish, Japanese — whichever tongue your buyer walks in with. One link to share.",
    appTitle:"Create your storefront",
    appSub:"Photograph the piece. Speak about it. We handle the rest.",
    uploadPrompt:"Tap to photograph your craft",
    uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"Tap to record your story",
    ctaButton:"Create my storefront",
    processingHeading:"Building your storefront",
    processingSub:"Four small agents at work",
    agentVoiceLabel:"Voice",
    agentVoiceDesc:"Transcribing & translating",
    agentVisionLabel:"Vision",
    agentVisionDesc:"Reading the craft",
    agentListingLabel:"Listing",
    agentListingDesc:"Writing the story",
    agentStorefrontLabel:"Storefront",
    agentStorefrontDesc:"Publishing live",
    agentReasoningLabel:"Agent reasoning",
    chipWaiting:"Waiting",
    chipWorking:"Working",
    chipDone:"Done ✓",
    doneHeading:"Your storefront is live.",
    doneUrlLabel:"Share this link anywhere — WhatsApp, Instagram, a printed card.",
    copyButton:"Copy",
    copiedButton:"Copied ✓",
    openStoreButton:"Open my storefront →",
    whatsappButton:"Share on WhatsApp",
    fallbackNote:"Full translation coming soon — showing English"
  },
  es: {
    appName:"Voz", tagline:"Tu tienda, con tu voz",
    eyebrow:"IA para artesanos, en más de 70 idiomas",
    headline1:"Tu voz.", headline2:"Tu tienda.", headlineSub:"Construida por IA. Tuya para siempre.",
    waveLabel:"habla en cualquier idioma",
    ctaBegin:"Empieza tu tienda", ctaSub:"Sin cuenta · Funciona en cualquier móvil",
    scrollPrompt:"Cómo funciona", navLink:"Cómo funciona →",
    howItWorksHeading:"Tres pasos. Eso es todo.",
    howItWorksSub:"Sin formularios. Sin teclear. Sin inglés. Solo tus manos, tu voz y un teléfono.",
    step1Title:"Fotografía", step1Desc:"Una sola foto de la pieza en tus manos. Las imperfecciones son la historia.",
    step2Title:"Habla", step2Desc:"Cuéntanos de ella, en el idioma en que sueñas. De qué está hecha, para quién, qué lleva dentro.",
    step3Title:"Tu tienda se publica", step3Desc:"Se lee en inglés, español, japonés — en la lengua en que llega tu comprador. Un enlace para compartir.",
    appTitle:"Crea tu tienda", appSub:"Fotografía la pieza. Habla de ella. Nosotros hacemos el resto.",
    uploadPrompt:"Toca para fotografiar tu obra", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"Toca para grabar tu historia",
    ctaButton:"Crear mi tienda",
    processingHeading:"Construyendo tu tienda", processingSub:"Cuatro pequeños agentes trabajando",
    agentVoiceLabel:"Voz", agentVoiceDesc:"Transcribiendo y traduciendo",
    agentVisionLabel:"Visión", agentVisionDesc:"Leyendo la obra",
    agentListingLabel:"Anuncio", agentListingDesc:"Escribiendo la historia",
    agentStorefrontLabel:"Tienda", agentStorefrontDesc:"Publicando en vivo",
    agentReasoningLabel:"Razonamiento del agente",
    chipWaiting:"Esperando", chipWorking:"Trabajando", chipDone:"Listo ✓",
    doneHeading:"Tu tienda está en vivo.",
    doneUrlLabel:"Comparte este enlace donde quieras — WhatsApp, Instagram, una tarjeta.",
    copyButton:"Copiar", copiedButton:"Copiado ✓",
    openStoreButton:"Abrir mi tienda →", whatsappButton:"Compartir por WhatsApp",
    fallbackNote:"Traducción completa pronto — mostrando en inglés"
  },
  hi: {
    appName:"Voz", tagline:"आपकी दुकान, आपकी आवाज़ में",
    eyebrow:"कारीगरों के लिए AI, 70+ भाषाओं में",
    headline1:"आपकी आवाज़।", headline2:"आपकी दुकान।", headlineSub:"AI से बना। आपका अपना।",
    waveLabel:"किसी भी भाषा में बोलें",
    ctaBegin:"अपनी दुकान शुरू करें", ctaSub:"खाते की ज़रूरत नहीं · किसी भी फ़ोन पर",
    scrollPrompt:"यह कैसे काम करता है", navLink:"कैसे काम करता है →",
    howItWorksHeading:"तीन कदम। बस इतना ही।",
    howItWorksSub:"कोई फ़ॉर्म नहीं। कोई टाइपिंग नहीं। अंग्रेज़ी ज़रूरी नहीं। बस आपके हाथ, आवाज़ और फ़ोन।",
    step1Title:"तस्वीर लें", step1Desc:"अपनी कृति की एक तस्वीर। कपास की छाया, लकड़ी का फ़र्श — अपूर्णताएं ही कहानी हैं।",
    step2Title:"बोलें", step2Desc:"अपनी भाषा में बताइए। किस चीज़ से बनी है, किसके लिए है, क्या ले जाती है।",
    step3Title:"आपकी दुकान तैयार", step3Desc:"अंग्रेज़ी, स्पेनिश, जापानी — जिस भी भाषा में ख़रीदार आए। एक लिंक जो साझा हो।",
    appTitle:"अपनी दुकान बनाएं", appSub:"कृति की तस्वीर लीजिए। उसके बारे में बोलिए। बाक़ी हम सँभालेंगे।",
    uploadPrompt:"अपनी कृति की फ़ोटो खींचने के लिए छुएँ", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"अपनी कहानी रिकॉर्ड करने के लिए छुएँ",
    ctaButton:"मेरी दुकान बनाएं",
    processingHeading:"आपकी दुकान बन रही है", processingSub:"चार छोटे एजेंट काम पर",
    agentVoiceLabel:"आवाज़", agentVoiceDesc:"लिपिबद्ध और अनुवाद",
    agentVisionLabel:"दृष्टि", agentVisionDesc:"कृति पढ़ रहा है",
    agentListingLabel:"लिस्टिंग", agentListingDesc:"कहानी लिख रहा है",
    agentStorefrontLabel:"दुकान", agentStorefrontDesc:"लाइव प्रकाशित",
    agentReasoningLabel:"एजेंट का तर्क",
    chipWaiting:"प्रतीक्षित", chipWorking:"काम पर", chipDone:"तैयार ✓",
    doneHeading:"आपकी दुकान लाइव है।",
    doneUrlLabel:"इस लिंक को कहीं भी साझा करें — व्हाट्सऐप, इंस्टाग्राम, छपा हुआ कार्ड।",
    copyButton:"कॉपी", copiedButton:"कॉपी हो गया ✓",
    openStoreButton:"मेरी दुकान खोलें →", whatsappButton:"व्हाट्सऐप पर साझा करें",
    fallbackNote:"पूर्ण अनुवाद जल्द — अभी अंग्रेज़ी दिखाई जा रही है"
  },
  fr: {
    appName:"Voz", tagline:"Votre boutique, dans votre voix",
    eyebrow:"L'IA des artisans, en 70+ langues",
    headline1:"Votre voix.", headline2:"Votre boutique.", headlineSub:"Bâtie par l'IA. Vous appartient.",
    waveLabel:"parlez dans n'importe quelle langue",
    ctaBegin:"Lancer votre boutique", ctaSub:"Sans compte · Sur n'importe quel téléphone",
    scrollPrompt:"Voir comment", navLink:"Comment ça marche →",
    howItWorksHeading:"Trois étapes. C'est tout.",
    howItWorksSub:"Pas de formulaires. Pas de clavier. Pas d'anglais. Juste vos mains, votre voix, un téléphone.",
    step1Title:"Photographiez", step1Desc:"Une seule photo de la pièce dans vos mains. Les imperfections sont l'histoire.",
    step2Title:"Parlez", step2Desc:"Racontez-la, dans la langue où vous rêvez. Ce qu'elle est, pour qui, ce qu'elle porte.",
    step3Title:"Votre boutique est en ligne", step3Desc:"Lisible en anglais, espagnol, japonais — dans la langue de l'acheteur. Un lien à partager.",
    appTitle:"Créez votre boutique", appSub:"Photographiez la pièce. Parlez-en. Le reste, c'est nous.",
    uploadPrompt:"Touchez pour photographier votre œuvre", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"Touchez pour enregistrer votre récit",
    ctaButton:"Créer ma boutique",
    processingHeading:"Nous construisons votre boutique", processingSub:"Quatre petits agents au travail",
    agentVoiceLabel:"Voix", agentVoiceDesc:"Transcription & traduction",
    agentVisionLabel:"Vision", agentVisionDesc:"Lecture de la pièce",
    agentListingLabel:"Annonce", agentListingDesc:"Rédaction de l'histoire",
    agentStorefrontLabel:"Boutique", agentStorefrontDesc:"Publication en direct",
    agentReasoningLabel:"Raisonnement de l'agent",
    chipWaiting:"En attente", chipWorking:"Travail", chipDone:"Terminé ✓",
    doneHeading:"Votre boutique est en ligne.",
    doneUrlLabel:"Partagez ce lien partout — WhatsApp, Instagram, une carte imprimée.",
    copyButton:"Copier", copiedButton:"Copié ✓",
    openStoreButton:"Ouvrir ma boutique →", whatsappButton:"Partager sur WhatsApp",
    fallbackNote:"Traduction complète bientôt — affichage en anglais"
  },
  pt: {
    appName:"Voz", tagline:"Sua loja, na sua voz",
    eyebrow:"IA para artesãos, em mais de 70 línguas",
    headline1:"Sua voz.", headline2:"Sua loja.", headlineSub:"Feita por IA. Sua para sempre.",
    waveLabel:"fale em qualquer idioma",
    ctaBegin:"Comece sua loja", ctaSub:"Sem conta · Funciona em qualquer celular",
    scrollPrompt:"Veja como funciona", navLink:"Como funciona →",
    howItWorksHeading:"Três passos. Só isso.",
    howItWorksSub:"Sem formulários. Sem teclar. Sem inglês. Só suas mãos, sua voz, um celular.",
    step1Title:"Fotografe", step1Desc:"Uma foto da peça em suas mãos. As imperfeições são a história.",
    step2Title:"Fale", step2Desc:"Conte sobre ela, na língua em que você sonha. Do que é feita, pra quem, o que carrega.",
    step3Title:"Sua loja entra no ar", step3Desc:"Legível em inglês, espanhol, japonês — na língua do comprador. Um link pra compartilhar.",
    appTitle:"Crie sua loja", appSub:"Fotografe a peça. Fale sobre ela. O resto é com a gente.",
    uploadPrompt:"Toque para fotografar seu trabalho", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"Toque para gravar sua história",
    ctaButton:"Criar minha loja",
    processingHeading:"Construindo sua loja", processingSub:"Quatro pequenos agentes trabalhando",
    agentVoiceLabel:"Voz", agentVoiceDesc:"Transcrevendo e traduzindo",
    agentVisionLabel:"Visão", agentVisionDesc:"Lendo a peça",
    agentListingLabel:"Anúncio", agentListingDesc:"Escrevendo a história",
    agentStorefrontLabel:"Loja", agentStorefrontDesc:"Publicando ao vivo",
    agentReasoningLabel:"Raciocínio do agente",
    chipWaiting:"Aguardando", chipWorking:"Trabalhando", chipDone:"Pronto ✓",
    doneHeading:"Sua loja está no ar.",
    doneUrlLabel:"Compartilhe este link onde quiser — WhatsApp, Instagram, um cartão impresso.",
    copyButton:"Copiar", copiedButton:"Copiado ✓",
    openStoreButton:"Abrir minha loja →", whatsappButton:"Compartilhar no WhatsApp",
    fallbackNote:"Tradução completa em breve — mostrando em inglês"
  },
  te: {
    appName:"Voz", tagline:"మీ దుకాణం, మీ స్వరంలో",
    eyebrow:"చేతిపనుల కళాకారుల కోసం AI, 70+ భాషలలో",
    headline1:"మీ స్వరం.", headline2:"మీ దుకాణం.", headlineSub:"AI చేత నిర్మితం. మీదే సొంతం.",
    waveLabel:"ఏ భాషలోనైనా మాట్లాడండి",
    ctaBegin:"మీ దుకాణాన్ని ప్రారంభించండి", ctaSub:"ఖాతా అవసరం లేదు · ఏ ఫోన్‌లోనైనా",
    scrollPrompt:"ఎలా పనిచేస్తుంది చూడండి", navLink:"ఎలా పనిచేస్తుంది →",
    howItWorksHeading:"మూడు అడుగులు. అంతే.",
    howItWorksSub:"ఫారమ్‌లు లేవు. టైపింగ్ లేదు. ఇంగ్లీష్ అవసరం లేదు. మీ చేతులు, స్వరం, ఫోన్ చాలు.",
    step1Title:"ఫోటో తీయండి", step1Desc:"మీ చేతిలోని వస్తువు ఒక్క ఫోటో. అసంపూర్ణతలే కథలు.",
    step2Title:"మాట్లాడండి", step2Desc:"మీ స్వప్నభాషలో చెప్పండి. దేనితో తయారైంది, ఎవరి కోసం, ఏమి మోస్తుంది.",
    step3Title:"మీ దుకాణం లైవ్", step3Desc:"ఇంగ్లీష్, స్పానిష్, జపనీస్ — కొనుగోలుదారుని భాషలో. ఒక లింక్ పంచుకోండి.",
    appTitle:"మీ దుకాణాన్ని సృష్టించండి", appSub:"వస్తువును ఫోటో తీయండి. దాని గురించి మాట్లాడండి. మిగిలినది మేము చూసుకుంటాము.",
    uploadPrompt:"మీ కళను ఫోటో తీయడానికి తాకండి", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"మీ కథను రికార్డ్ చేయడానికి తాకండి",
    ctaButton:"నా దుకాణాన్ని సృష్టించండి",
    processingHeading:"మీ దుకాణాన్ని నిర్మిస్తున్నాం", processingSub:"నాలుగు చిన్న ఏజెంట్లు పని చేస్తున్నారు",
    agentVoiceLabel:"స్వరం", agentVoiceDesc:"లిప్యంతరీకరణ & అనువాదం",
    agentVisionLabel:"దృష్టి", agentVisionDesc:"కళను చదువుతోంది",
    agentListingLabel:"జాబితా", agentListingDesc:"కథ రాస్తోంది",
    agentStorefrontLabel:"దుకాణం", agentStorefrontDesc:"లైవ్‌గా ప్రచురిస్తోంది",
    agentReasoningLabel:"ఏజెంట్ తార్కికం",
    chipWaiting:"వేచి", chipWorking:"పనిలో", chipDone:"పూర్తయింది ✓",
    doneHeading:"మీ దుకాణం లైవ్‌గా ఉంది.",
    doneUrlLabel:"ఈ లింక్‌ను ఎక్కడైనా పంచుకోండి — వాట్సాప్, ఇన్‌స్టాగ్రామ్, ముద్రిత కార్డు.",
    copyButton:"కాపీ", copiedButton:"కాపీ అయింది ✓",
    openStoreButton:"నా దుకాణాన్ని తెరవండి →", whatsappButton:"వాట్సాప్‌లో పంచుకోండి",
    fallbackNote:"పూర్తి అనువాదం త్వరలో — ఇప్పుడు ఇంగ్లీష్‌లో"
  },
  ta: {
    appName:"Voz", tagline:"உங்கள் கடை, உங்கள் குரலில்",
    eyebrow:"கைவினைஞர்களுக்கான AI, 70+ மொழிகளில்",
    headline1:"உங்கள் குரல்.", headline2:"உங்கள் கடை.", headlineSub:"AI உருவாக்கியது. உங்களுக்கே சொந்தம்.",
    waveLabel:"எந்த மொழியிலும் பேசுங்கள்",
    ctaBegin:"உங்கள் கடையை தொடங்குங்கள்", ctaSub:"கணக்கு தேவையில்லை · எந்த ஃபோனிலும்",
    scrollPrompt:"எப்படி வேலை செய்கிறது", navLink:"எப்படி வேலை செய்கிறது →",
    howItWorksHeading:"மூன்று படிகள். அவ்வளவே.",
    howItWorksSub:"படிவம் இல்லை. தட்டச்சு இல்லை. ஆங்கிலம் தேவையில்லை. உங்கள் கை, குரல், ஃபோன் மட்டும்.",
    step1Title:"புகைப்படம்", step1Desc:"உங்கள் கையில் படைப்பின் ஒரே படம். குறைபாடுகளே கதை.",
    step2Title:"பேசுங்கள்", step2Desc:"உங்கள் கனவு மொழியில் சொல்லுங்கள். எதில் செய்யப்பட்டது, யாருக்காக, என்ன சுமக்கிறது.",
    step3Title:"உங்கள் கடை நேரலை", step3Desc:"ஆங்கிலம், ஸ்பானிய, ஜப்பானிய — வாங்குபவரின் மொழியில். ஒரு இணைப்பு.",
    appTitle:"உங்கள் கடையை உருவாக்குங்கள்", appSub:"படைப்பை புகைப்படம் எடுங்கள். அதைப்பற்றி பேசுங்கள். மீதியை நாங்கள் பார்த்துக்கொள்வோம்.",
    uploadPrompt:"உங்கள் படைப்பை புகைப்படம் எடுக்க தொடுங்கள்", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"உங்கள் கதையை பதிவு செய்ய தொடுங்கள்",
    ctaButton:"என் கடையை உருவாக்கு",
    processingHeading:"உங்கள் கடையை கட்டுகிறோம்", processingSub:"நான்கு சிறிய முகவர்கள் வேலையில்",
    agentVoiceLabel:"குரல்", agentVoiceDesc:"எழுத்துப்பெயர்ப்பு & மொழிபெயர்ப்பு",
    agentVisionLabel:"பார்வை", agentVisionDesc:"படைப்பை படிக்கிறது",
    agentListingLabel:"பட்டியல்", agentListingDesc:"கதையை எழுதுகிறது",
    agentStorefrontLabel:"கடை", agentStorefrontDesc:"நேரலையில் வெளியிடுகிறது",
    agentReasoningLabel:"முகவர் பகுத்தறிவு",
    chipWaiting:"காத்திருக்கும்", chipWorking:"வேலையில்", chipDone:"முடிந்தது ✓",
    doneHeading:"உங்கள் கடை நேரலையில் உள்ளது.",
    doneUrlLabel:"இந்த இணைப்பை எங்கும் பகிருங்கள் — வாட்ஸ்அப், இன்ஸ்டாகிராம், அச்சிட்ட அட்டை.",
    copyButton:"நகலெடு", copiedButton:"நகலெடுத்தது ✓",
    openStoreButton:"என் கடையை திற →", whatsappButton:"வாட்ஸ்அப்பில் பகிர்",
    fallbackNote:"முழு மொழிபெயர்ப்பு விரைவில் — ஆங்கிலத்தில் காட்டுகிறது"
  },
  ar: {
    appName:"Voz", tagline:"متجرك، بصوتك",
    eyebrow:"ذكاء اصطناعي للحرفيين، بأكثر من 70 لغة",
    headline1:"صوتك.", headline2:"متجرك.", headlineSub:"بُني بالذكاء الاصطناعي. ملكك أنت.",
    waveLabel:"تحدث بأي لغة",
    ctaBegin:"ابدأ متجرك", ctaSub:"لا حساب مطلوب · يعمل على أي هاتف",
    scrollPrompt:"كيف يعمل", navLink:"كيف يعمل →",
    howItWorksHeading:"ثلاث خطوات. هذا كل شيء.",
    howItWorksSub:"لا استمارات. لا كتابة. لا إنجليزية. فقط يداك وصوتك وهاتفك.",
    step1Title:"صوّر", step1Desc:"صورة واحدة للقطعة في يديك. العيوب هي القصة.",
    step2Title:"تحدث", step2Desc:"أخبرنا عنها، باللغة التي تحلم بها. ممّ صُنعت، لمن، ماذا تحمل.",
    step3Title:"متجرك على الهواء", step3Desc:"يُقرأ بالإنجليزية والإسبانية واليابانية — بلغة المشتري. رابط واحد للمشاركة.",
    appTitle:"أنشئ متجرك", appSub:"صوّر القطعة. تحدث عنها. نحن نتولى الباقي.",
    uploadPrompt:"المس لتصوير حرفتك", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"المس لتسجيل قصتك",
    ctaButton:"أنشئ متجري",
    processingHeading:"نبني متجرك", processingSub:"أربعة عملاء صغار يعملون",
    agentVoiceLabel:"الصوت", agentVoiceDesc:"نسخ وترجمة",
    agentVisionLabel:"الرؤية", agentVisionDesc:"تقرأ الحرفة",
    agentListingLabel:"الإعلان", agentListingDesc:"يكتب القصة",
    agentStorefrontLabel:"المتجر", agentStorefrontDesc:"ينشر مباشرة",
    agentReasoningLabel:"تفكير العميل",
    chipWaiting:"منتظر", chipWorking:"يعمل", chipDone:"تم ✓",
    doneHeading:"متجرك على الهواء.",
    doneUrlLabel:"شارك هذا الرابط في أي مكان — واتساب، إنستغرام، بطاقة مطبوعة.",
    copyButton:"نسخ", copiedButton:"تم النسخ ✓",
    openStoreButton:"افتح متجري →", whatsappButton:"شارك على واتساب",
    fallbackNote:"الترجمة الكاملة قريباً — نعرض بالإنجليزية"
  },
  bn: {
    appName:"Voz", tagline:"আপনার দোকান, আপনার কণ্ঠে",
    eyebrow:"কারিগরদের জন্য AI, ৭০+ ভাষায়",
    headline1:"আপনার কণ্ঠ।", headline2:"আপনার দোকান।", headlineSub:"AI দিয়ে তৈরি। আপনারই।",
    waveLabel:"যেকোনো ভাষায় বলুন",
    ctaBegin:"আপনার দোকান শুরু করুন", ctaSub:"অ্যাকাউন্ট দরকার নেই · যেকোনো ফোনে",
    scrollPrompt:"এটি কীভাবে কাজ করে", navLink:"কীভাবে কাজ করে →",
    howItWorksHeading:"তিনটি ধাপ। এটুকুই।",
    howItWorksSub:"কোনো ফর্ম নেই। টাইপ নেই। ইংরেজি দরকার নেই। শুধু হাত, কণ্ঠ, ফোন।",
    step1Title:"ছবি তুলুন", step1Desc:"হাতে ধরা সৃষ্টির একটাই ছবি। অসম্পূর্ণতাই গল্প।",
    step2Title:"বলুন", step2Desc:"যে ভাষায় স্বপ্ন দেখেন সেটাতে বলুন। কী দিয়ে তৈরি, কার জন্য, কী বহন করে।",
    step3Title:"দোকান লাইভ", step3Desc:"ইংরেজি, স্প্যানিশ, জাপানি — ক্রেতার ভাষায় পড়া যায়। একটি লিঙ্ক শেয়ার।",
    appTitle:"আপনার দোকান বানান", appSub:"সৃষ্টির ছবি তুলুন। এটি নিয়ে বলুন। বাকিটা আমরা করব।",
    uploadPrompt:"আপনার কাজের ছবি তুলতে স্পর্শ করুন", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"আপনার গল্প রেকর্ড করতে স্পর্শ করুন",
    ctaButton:"আমার দোকান তৈরি",
    processingHeading:"আপনার দোকান তৈরি হচ্ছে", processingSub:"চারজন ছোট এজেন্ট কাজ করছে",
    agentVoiceLabel:"কণ্ঠ", agentVoiceDesc:"লিখন ও অনুবাদ",
    agentVisionLabel:"দৃষ্টি", agentVisionDesc:"সৃষ্টি পড়ছে",
    agentListingLabel:"তালিকা", agentListingDesc:"গল্প লিখছে",
    agentStorefrontLabel:"দোকান", agentStorefrontDesc:"লাইভ প্রকাশ",
    agentReasoningLabel:"এজেন্টের যুক্তি",
    chipWaiting:"অপেক্ষমান", chipWorking:"কাজে", chipDone:"সম্পন্ন ✓",
    doneHeading:"আপনার দোকান লাইভ।",
    doneUrlLabel:"এই লিঙ্ক যেকোনো জায়গায় শেয়ার করুন — হোয়াটসঅ্যাপ, ইনস্টাগ্রাম, ছাপা কার্ড।",
    copyButton:"কপি", copiedButton:"কপি হয়েছে ✓",
    openStoreButton:"আমার দোকান খুলুন →", whatsappButton:"হোয়াটসঅ্যাপে শেয়ার",
    fallbackNote:"সম্পূর্ণ অনুবাদ শীঘ্রই — এখন ইংরেজিতে"
  },
  vi: {
    appName:"Voz", tagline:"Cửa hàng của bạn, bằng giọng của bạn",
    eyebrow:"AI cho nghệ nhân, hơn 70 ngôn ngữ",
    headline1:"Giọng của bạn.", headline2:"Cửa hàng của bạn.", headlineSub:"Dựng bởi AI. Thuộc về bạn.",
    waveLabel:"nói bằng bất kỳ ngôn ngữ nào",
    ctaBegin:"Bắt đầu cửa hàng", ctaSub:"Không cần tài khoản · Chạy trên mọi điện thoại",
    scrollPrompt:"Xem cách hoạt động", navLink:"Cách hoạt động →",
    howItWorksHeading:"Ba bước. Chỉ vậy thôi.",
    howItWorksSub:"Không biểu mẫu. Không gõ phím. Không cần tiếng Anh. Chỉ cần bàn tay, giọng nói, điện thoại.",
    step1Title:"Chụp ảnh", step1Desc:"Một bức ảnh tác phẩm trong tay bạn. Những điều chưa hoàn hảo chính là câu chuyện.",
    step2Title:"Nói", step2Desc:"Kể về nó bằng ngôn ngữ bạn mơ. Làm bằng gì, cho ai, mang theo điều gì.",
    step3Title:"Cửa hàng lên mạng", step3Desc:"Đọc được bằng tiếng Anh, Tây Ban Nha, Nhật — bất cứ ngôn ngữ nào của khách. Một liên kết để chia sẻ.",
    appTitle:"Tạo cửa hàng của bạn", appSub:"Chụp ảnh. Nói về nó. Phần còn lại để chúng tôi.",
    uploadPrompt:"Chạm để chụp tác phẩm của bạn", uploadHint:"JPG · PNG · HEIC",
    recordPrompt:"Chạm để ghi lại câu chuyện",
    ctaButton:"Tạo cửa hàng của tôi",
    processingHeading:"Đang xây cửa hàng của bạn", processingSub:"Bốn tác tử nhỏ đang làm việc",
    agentVoiceLabel:"Giọng", agentVoiceDesc:"Phiên âm & dịch",
    agentVisionLabel:"Thị giác", agentVisionDesc:"Đọc tác phẩm",
    agentListingLabel:"Niêm yết", agentListingDesc:"Viết câu chuyện",
    agentStorefrontLabel:"Cửa hàng", agentStorefrontDesc:"Xuất bản trực tiếp",
    agentReasoningLabel:"Lập luận của tác tử",
    chipWaiting:"Chờ", chipWorking:"Đang làm", chipDone:"Xong ✓",
    doneHeading:"Cửa hàng của bạn đã hoạt động.",
    doneUrlLabel:"Chia sẻ liên kết này ở bất cứ đâu — WhatsApp, Instagram, thẻ in.",
    copyButton:"Sao chép", copiedButton:"Đã sao chép ✓",
    openStoreButton:"Mở cửa hàng của tôi →", whatsappButton:"Chia sẻ trên WhatsApp",
    fallbackNote:"Bản dịch đầy đủ sắp có — đang hiển thị tiếng Anh"
  }
};

const BANNER_PHRASES_BY_LANG = {
  en: ["Your craft deserves a global stage","Speak your story","AI builds the rest","Any language","Zero setup","No keyboard needed"],
  es: ["Tu arte merece un escenario global","Cuenta tu historia","La IA hace el resto","Cualquier idioma","Sin configuración","Sin teclado"],
  hi: ["आपके हुनर को दुनिया का मंच चाहिए","अपनी कहानी बोलिए","बाक़ी AI करे","कोई भी भाषा","कोई सेटअप नहीं","कीबोर्ड की ज़रूरत नहीं"],
  fr: ["Votre art mérite une scène mondiale","Racontez votre histoire","L'IA fait le reste","Toute langue","Zéro configuration","Sans clavier"],
  pt: ["Seu ofício merece um palco global","Conte sua história","A IA faz o resto","Qualquer idioma","Sem configuração","Sem teclado"],
  te: ["మీ కళకు ప్రపంచ వేదిక కావాలి","మీ కథ చెప్పండి","మిగిలినది AI చేస్తుంది","ఏ భాష అయినా","సెటప్ లేదు","కీబోర్డ్ అవసరం లేదు"],
  ta: ["உங்கள் கலைக்கு உலக மேடை","உங்கள் கதை சொல்லுங்கள்","மீதியை AI செய்யும்","எந்த மொழியும்","அமைப்பு இல்லை","விசைப்பலகை தேவையில்லை"],
  ar: ["حرفتك تستحق منصة عالمية","احكِ قصتك","الذكاء الاصطناعي يبني الباقي","أي لغة","بدون إعداد","بدون لوحة مفاتيح"],
  bn: ["আপনার শিল্পের বিশ্বমঞ্চ প্রাপ্য","আপনার গল্প বলুন","বাকিটা AI বানায়","যেকোনো ভাষা","সেটআপ নেই","কীবোর্ড দরকার নেই"],
  vi: ["Nghề của bạn xứng đáng sân khấu toàn cầu","Kể câu chuyện của bạn","AI làm phần còn lại","Bất kỳ ngôn ngữ nào","Không cần cài đặt","Không cần bàn phím"]
};

/* ---- Core state ---- */
window.selectedLanguage = "en";
window.selectedLanguageName = "English";

/* ---- Apply translation ---- */
function applyTranslation(code){
  const dict = I18N[code] || I18N.en;
  const fallback = !I18N[code];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(dict[key] != null) el.textContent = dict[key];
  });
  // Direction
  const isRtl = RTL_CODES.has(code);
  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", code);
  // Fallback banner
  const fb = document.getElementById("fallbackBanner");
  if(fb){
    if(fallback){
      fb.innerHTML = `<span>${I18N.en.fallbackNote}</span><span class="close" onclick="this.parentElement.style.display='none'">×</span>`;
      fb.style.display = "block";
    } else {
      fb.style.display = "none";
    }
  }
  // Refresh banner strip
  populateBannerStrip(code);
  // Gentle fade of translatable elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.animate([{opacity:0.4},{opacity:1}],{duration:260, easing:"ease-out"});
  });
}

/* ---- Banner strip ---- */
function populateBannerStrip(code){
  const stripEl = document.getElementById("strip");
  if(!stripEl) return;
  const phrases = BANNER_PHRASES_BY_LANG[code] || BANNER_PHRASES_BY_LANG.en;
  // Map: all terracotta dot separators; second phrase rendered as serif italic for rhythm
  let html = "";
  for(let k=0;k<8;k++){
    phrases.forEach((p, i) => {
      const cls = (i===1) ? "serif-italic" : "txt";
      html += `<span class="${cls}">${p}</span><span class="dot"></span>`;
    });
  }
  stripEl.innerHTML = html;
}

/* ---- Globe code ---- */
function updateGlobeCode(code){
  const el = document.getElementById("globeCode");
  if(el) el.textContent = (code || "en").slice(0,2).toUpperCase();
}

/* ---- Language screen (DRY: renders into any host element) ---- */
function initLangScreen(root, { onSelect }){
  const cycleEl = root.querySelector(".lang-cycle");
  const spanA = cycleEl.querySelector(".cy-a");
  const spanB = cycleEl.querySelector(".cy-b");
  let active = spanA, inactive = spanB;
  let idx = 0;
  // Show first word
  active.textContent = CYCLE[0];
  active.animate(
    [{opacity:0, transform:"translateY(20px)"},{opacity:1, transform:"translateY(0)"}],
    {duration:400, easing:"cubic-bezier(0.4, 0, 0.2, 1)", fill:"forwards"}
  );
  idx = 1;
  const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
  const interval = setInterval(() => {
    const next = CYCLE[idx % CYCLE.length];
    idx++;
    // Prepare inactive
    inactive.textContent = next;
    inactive.style.direction = /[\u0600-\u06FF\u0750-\u077F]|[\u0590-\u05FF]/.test(next) ? "rtl" : "ltr";
    // Crossfade — true same-time animations via WAAPI
    const outAnim = active.animate(
      [{opacity:1, transform:"translateY(0)"},{opacity:0, transform:"translateY(-20px)"}],
      {duration:400, easing:EASE, fill:"forwards"}
    );
    const inAnim = inactive.animate(
      [{opacity:0, transform:"translateY(20px)"},{opacity:1, transform:"translateY(0)"}],
      {duration:400, easing:EASE, fill:"forwards"}
    );
    // Swap roles
    [active, inactive] = [inactive, active];
  }, 1300);

  const listEl = root.querySelector(".lang-list");
  const searchEl = root.querySelector(".lang-search");
  function renderList(q = ""){
    q = q.trim().toLowerCase();
    listEl.innerHTML = "";
    LANGS.filter(([n,e])=>!q||n.toLowerCase().includes(q)||e.toLowerCase().includes(q))
      .forEach(([native,english,code,flag], i) => {
        const el = document.createElement("div");
        el.className = "lang-item" + (code === "en" ? " pinned" : "");
        el.innerHTML = `<span style="margin-right:8px">${flag}</span><span class="native">${native}</span> <span class="english">— ${english}</span>`;
        el.addEventListener("click", () => finalize(code, native, english));
        listEl.appendChild(el);
      });
  }
  renderList();
  searchEl.addEventListener("input", e => renderList(e.target.value));

  // Skip to English
  const skipBtn = root.querySelector(".skip-en");
  if(skipBtn) skipBtn.addEventListener("click", () => finalize("en","English","English"));

  function finalize(code, native, english){
    clearInterval(interval);
    // Flash the selected language big
    inactive.textContent = native;
    inactive.style.direction = RTL_CODES.has(code) ? "rtl" : "ltr";
    inactive.classList.add("selected-flash");
    inactive.animate(
      [{opacity:0, transform:"translateY(20px) scale(1)"},{opacity:1, transform:"translateY(0) scale(1.12)"}],
      {duration:500, easing:EASE, fill:"forwards"}
    );
    active.animate(
      [{opacity:1, transform:"translateY(0)"},{opacity:0, transform:"translateY(-20px)"}],
      {duration:300, easing:EASE, fill:"forwards"}
    );
    setTimeout(() => onSelect(code, native, english), 700);
  }

  // Autofocus search (mobile keyboard convenience requested)
  // Slight delay to let the screen mount cleanly
  setTimeout(() => searchEl.focus({preventScroll:true}), 300);
}

/* ---- Form data builder (future API hookup) ---- */
window.buildProcessFormData = function(photoFile, audioBlob){
  const fd = new FormData();
  if(photoFile) fd.append("images", photoFile);
  if(audioBlob) fd.append("audio", audioBlob);
  fd.append("language", window.selectedLanguage || "en");
  fd.append("languageName", window.selectedLanguageName || "English");
  return fd;
};

/* =========================================
   BOOT
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Language screen: first-run or remembered ---------- */
  const saved = localStorage.getItem("vozLanguage");
  const langScreen = document.getElementById("lang-screen");

  function commitLanguage(code, native, english){
    window.selectedLanguage = code;
    window.selectedLanguageName = english;
    try { localStorage.setItem("vozLanguage", code); } catch(e) {}
    updateGlobeCode(code);
    applyTranslation(code);
  }

  if(saved && I18N[saved] || saved){
    // Skip the welcome screen
    langScreen.remove();
    const row = LANGS.find(l => l[2] === saved) || LANGS[0];
    commitLanguage(row[2], row[0], row[1]);
  } else {
    initLangScreen(langScreen, {
      onSelect: (code, native, english) => {
        commitLanguage(code, native, english);
        langScreen.classList.add("hide");
        setTimeout(() => langScreen.remove(), 720);
      }
    });
    // Set defaults even before selection (so banner renders in EN)
    applyTranslation("en");
  }

  /* ---------- Globe button re-opens as overlay modal ---------- */
  document.getElementById("globeBtn").addEventListener("click", () => {
    if(document.getElementById("lang-screen")) return;
    const el = document.createElement("div");
    el.id = "lang-screen";
    el.innerHTML = `
      <div class="lang-label">Voz <span>your voice · your store</span></div>
      <div class="lang-cycle">
        <span class="cy cy-a"></span>
        <span class="cy cy-b"></span>
      </div>
      <div class="pulse-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="lang-cta">
        <div class="hint">Choose your language</div>
        <div class="lang-select">
          <input class="lang-search" placeholder="Search your language…" autocomplete="off" />
          <div class="lang-list"></div>
        </div>
        <button class="skip-en">Continue in English</button>
      </div>`;
    el.style.transform = "translateY(-100vh)";
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.transform = ""; });
    initLangScreen(el, {
      onSelect: (code, native, english) => {
        commitLanguage(code, native, english);
        el.classList.add("hide");
        setTimeout(() => el.remove(), 720);
      }
    });
  });

  /* ---------- CRAFT ARC (edge-only layout) ---------- */
  const craftEmojis = ["🧵","🪡","🎨","🏺","🪵","🧶","🪢","🎭","🖼️","🪬","🧿","🎪"];
  const arc = document.getElementById("craftArc");
  const W = () => arc.offsetWidth, H = () => arc.offsetHeight;
  craftEmojis.forEach((e,i)=>{
    const onLeft = i < 6;
    const idx = onLeft ? i : (i-6);
    const t = idx/5;
    const w = W(), h = H();
    const sideW = Math.min(220, w*0.18);
    const x = onLeft ? (20 + t*sideW*0.5) : (w - 80 - t*sideW*0.5);
    const y = h*0.88 - t*(h*0.68);
    const r = (i%2? 6 : -6);
    const c = document.createElement("div");
    c.className = "card";
    c.textContent = e;
    c.style.left = x+"px"; c.style.top = y+"px";
    c.style.setProperty("--r", r+"deg");
    c.style.transform = `rotate(${r}deg)`;
    c.style.animationDelay = (i*100)+"ms";
    arc.appendChild(c);
  });

  /* ---------- Scroll indicator + Start CTA ---------- */
  document.getElementById("scrollInd").addEventListener("click", () => {
    document.querySelector("section.dark").scrollIntoView({behavior:"smooth",block:"start"});
  });
  document.getElementById("startBtn").addEventListener("click", (e) => {
    const r = document.createElement("div"); r.className="ripple";
    const rect = e.currentTarget.getBoundingClientRect();
    r.style.left = (e.clientX-rect.left)+"px";
    r.style.top  = (e.clientY-rect.top)+"px";
    e.currentTarget.appendChild(r);
    setTimeout(()=>r.remove(),650);
    document.querySelector("section.app").scrollIntoView({behavior:"smooth"});
  });

  /* ---------- UPLOAD ---------- */
  const photoZone = document.getElementById("photoZone");
  const photoInput = document.getElementById("photoInput");
  let hasPhoto = false, hasAudio = false, photoFile = null, audioBlob = null;
  photoZone.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", e => {
    const f = e.target.files[0]; if(!f) return;
    photoFile = f;
    const url = URL.createObjectURL(f);
    const img = document.createElement("img");
    img.src = url;
    photoZone.appendChild(img);
    photoZone.classList.add("has");
    hasPhoto = true; checkReady();
  });
  // Demo fallback: double-click sets placeholder if the user hasn't chosen a file
  let demoClicks = 0;
  photoZone.addEventListener("click", () => {
    demoClicks++;
    if(demoClicks===2 && !hasPhoto){
      const img = document.createElement("img");
      img.src = "data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 220'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#A09ABC'/><stop offset='1' stop-color='#D4BEBE'/></linearGradient></defs><rect width='400' height='220' fill='url(#g)'/><text x='20' y='200' font-family='monospace' font-size='11' fill='#ffffffaa' letter-spacing='2'>HANDLOOM TEXTILE · PREVIEW</text></svg>`);
      photoZone.appendChild(img);
      photoZone.classList.add("has");
      hasPhoto = true; checkReady();
    }
  });

  const voiceWrap = document.getElementById("voiceWrap");
  const voiceBtn = document.getElementById("voiceBtn");
  const waveBars = document.getElementById("waveBars");
  const timer = document.getElementById("timer");
  for(let i=0;i<12;i++){const b=document.createElement("div");b.className="b";waveBars.appendChild(b);}
  let recState = "idle", recStart = 0, recTick, barTick;
  voiceBtn.addEventListener("click", () => {
    if(recState==="idle"){
      recState = "rec";
      voiceWrap.classList.add("rec");
      waveBars.style.display = "flex";
      recStart = Date.now();
      recTick = setInterval(() => {
        const s = Math.floor((Date.now()-recStart)/1000);
        const m = String(Math.floor(s/60)).padStart(2,"0");
        const ss = String(s%60).padStart(2,"0");
        timer.textContent = `${m}:${ss}`;
      },200);
      barTick = setInterval(() => {
        [...waveBars.children].forEach(b => b.style.height = (8 + Math.random()*32)+"px");
      }, 80);
    } else if(recState==="rec"){
      recState = "done";
      clearInterval(recTick); clearInterval(barTick);
      voiceWrap.classList.remove("rec");
      voiceWrap.classList.add("done");
      voiceBtn.innerHTML = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12l5 5 10-11"/></svg>`;
      document.querySelector(".playback").style.display = "flex";
      document.getElementById("playDur").textContent = timer.textContent || "0:12";
      hasAudio = true; checkReady();
    }
  });

  function checkReady(){
    const btn = document.getElementById("createBtn");
    if(hasPhoto && hasAudio) btn.classList.add("ready");
  }

  document.getElementById("createBtn").addEventListener("click", () => {
    if(!hasPhoto || !hasAudio) return;
    const upload = document.getElementById("upload");
    upload.style.transition = "opacity .4s, transform .4s";
    upload.style.opacity = "0"; upload.style.transform = "scale(.95)";

    const apiPromise = fetch('/api/process', {
      method: 'POST',
      body: buildProcessFormData(photoFile, audioBlob)
    })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .catch(() => fetch('/api/demo').then(r => r.json()));

    setTimeout(() => {
      upload.classList.add("hidden");
      document.getElementById("processing").classList.add("active");
      runProcessing(apiPromise);
    }, 400);
  });

  /* ---------- PROCESSING ---------- */
  const ellipsis = document.getElementById("ellipsis");
  let eli = 0;
  setInterval(() => {ellipsis.textContent = [".","..","...",""][eli++%4]},500);

  const LOG_LINES = [
    "[VOICE]   Listening to 0:23 of audio…",
    "[VOICE]   Transcribing user speech…",
    "[VOICE]   Translating to English:",
    "          \"Blue-dyed handloom textile with traditional motif\"",
    "[VISION]  Analysing image regions (512×512)…",
    "[VISION]  Detected: cotton-silk blend, ikat weave,",
    "          natural indigo dye, approx. 2.4m length",
    "[LISTING] Drafting title options…",
    "          → \"The Blue Weave\"",
    "          → \"Indigo Ikat · Handloom\"",
    "[LISTING] Price suggestion: $145 (fair-trade tier)",
    "[LISTING] Writing cultural note in 2 languages…",
    "[STORE]   Provisioning voz.shop/priya-kadu/…",
    "[STORE]   Compiling storefront assets…",
    "[STORE]   ✓ Live."
  ];

  function chipLabel(status){
    const dict = I18N[window.selectedLanguage] || I18N.en;
    if(status==="working") return dict.chipWorking || "Working";
    if(status==="done") return dict.chipDone || "Done ✓";
    return dict.chipWaiting || "Waiting";
  }

  window.updateAgent = function(name, status, logText){
    const a = document.querySelector(`[data-agent="${name}"]`);
    if(!a) return;
    a.dataset.status = status;
    a.querySelector(".chip").textContent = chipLabel(status);
    if(logText) appendLog(logText);
  };

  function showDetectedPill(){
    const code = window.selectedLanguage || "en";
    const row = LANGS.find(l => l[2] === code) || LANGS[0];
    const pill = document.getElementById("detectedPill");
    if(!pill) return;
    pill.innerHTML = `${row[3]} <span style="margin-left:4px">${row[1]} detected</span>`;
    pill.style.display = "inline-flex";
  }

  const termLog = document.getElementById("termLog");
  let logQueue = [], typing = false;
  function appendLog(text){ logQueue.push(text); if(!typing) typeNext(); }
  function typeNext(){
    if(!logQueue.length){typing=false;return;}
    typing = true;
    const text = logQueue.shift();
    const span = document.createElement("span");
    termLog.appendChild(span);
    let i=0;
    const t = setInterval(() => {
      span.textContent += text[i++];
      termLog.scrollTop = termLog.scrollHeight;
      if(i>=text.length){
        clearInterval(t);
        termLog.appendChild(document.createTextNode("\n"));
        setTimeout(typeNext, 120);
      }
    }, 18);
  }

  function runProcessing(apiPromise){
    const agents = document.querySelectorAll("#processing .agent");
    agents.forEach((a,i) => setTimeout(() => a.classList.add("in"), i*180));
    setTimeout(()=>updateAgent("VOICE","working", LOG_LINES[0]+"\n"+LOG_LINES[1]+"\n"+LOG_LINES[2]+"\n"+LOG_LINES[3]), 500);
    setTimeout(()=>updateAgent("VISION","working", LOG_LINES[4]+"\n"+LOG_LINES[5]+"\n"+LOG_LINES[6]), 1400);
    setTimeout(()=>{updateAgent("VOICE","done"); showDetectedPill();}, 2500);
    setTimeout(()=>updateAgent("VISION","done"), 3500);
    setTimeout(()=>updateAgent("LISTING","working", LOG_LINES[7]+"\n"+LOG_LINES[8]+"\n"+LOG_LINES[9]+"\n"+LOG_LINES[10]+"\n"+LOG_LINES[11]), 3700);
    setTimeout(()=>updateAgent("LISTING","done"), 5200);
    setTimeout(()=>updateAgent("STOREFRONT","working", LOG_LINES[12]+"\n"+LOG_LINES[13]+"\n"+LOG_LINES[14]), 5400);
    setTimeout(()=>updateAgent("STOREFRONT","done"), 7000);

    let animReady = false, apiData = null;
    function maybeFinish(){
      if(animReady && apiData !== null) { populateDoneScreen(apiData); goDone(); }
    }
    setTimeout(() => { animReady = true; maybeFinish(); }, 7400);
    apiPromise.then(data => { apiData = data; maybeFinish(); }).catch(() => { apiData = {}; maybeFinish(); });
  }

  function populateDoneScreen(data){
    const slug = data.slug || "priya-warli-painting";
    const storeUrl = data.storefront_url || ("/storefront/" + slug);
    const fullUrl = window.location.origin + storeUrl;
    const displayUrl = window.location.host + storeUrl;

    const urlEl = document.getElementById("urlText");
    if(urlEl){ urlEl.textContent = displayUrl; urlEl.dataset.fullUrl = fullUrl; }

    const openBtn = document.querySelector("#done .b1");
    if(openBtn) openBtn.href = storeUrl;

    const whatsappBtn = document.querySelector("#done .b2");
    if(whatsappBtn){
      whatsappBtn.onclick = () => {
        const msg = encodeURIComponent("Check out my store: " + fullUrl);
        window.open("https://wa.me/?text=" + msg, "_blank");
      };
    }
  }

  function goDone(){
    const agents = document.querySelectorAll("#processing .agent");
    agents.forEach(a => {a.style.transition="all .5s";a.style.transform="scale(1.03)";});
    setTimeout(() => {
      agents.forEach(a => {a.style.opacity="0";a.style.transform="translateY(-20px)"});
      const burst = document.createElement("div");
      burst.style.cssText = "position:fixed;left:50%;top:50%;width:40px;height:40px;border-radius:50%;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgba(160,154,188,.35),transparent 60%);pointer-events:none;z-index:250;transition:transform .6s ease-out, opacity .6s";
      document.body.appendChild(burst);
      requestAnimationFrame(() => {burst.style.transform="translate(-50%,-50%) scale(50)";burst.style.opacity="0";});
      setTimeout(() => burst.remove(),700);
    },200);
    setTimeout(() => {
      document.getElementById("processing").classList.remove("active");
      document.getElementById("processing").style.display="none";
      document.getElementById("done").classList.add("active");
      fireConfetti();
    }, 700);
  }

  function fireConfetti(){
    const wrap = document.createElement("div");
    wrap.id = "confetti";
    document.body.appendChild(wrap);
    const colors = ["#A09ABC","#B6A6CA","#D5CFE1","#D4BEBE","#E1DEE9","#C1694F","#2A2636"];
    for(let i=0;i<40;i++){
      const c = document.createElement("div");
      c.className = "cf";
      c.style.left = (50 + (Math.random()-0.5)*10) + "%";
      c.style.top = "10%";
      c.style.background = colors[i%colors.length];
      c.style.borderRadius = Math.random()>0.6 ? "50%" : "1px";
      const tx = (Math.random()-0.5)*400;
      const ty = 500 + Math.random()*300;
      const rot = (Math.random()-0.5)*1080;
      const d = 1500 + Math.random()*1000;
      const delay = Math.random()*600;
      c.animate([{transform:`translate(0,0) rotate(0deg)`,opacity:1},{transform:`translate(${tx}px,${ty}px) rotate(${rot}deg)`,opacity:0}],{duration:d,delay:delay,fill:"forwards",easing:"cubic-bezier(.2,.7,.2,1)"});
      wrap.appendChild(c);
    }
    setTimeout(() => wrap.remove(),3000);
  }

  document.getElementById("copyBtn").addEventListener("click", function(){
    const urlEl = document.getElementById("urlText");
    const url = urlEl.dataset.fullUrl || urlEl.textContent;
    navigator.clipboard?.writeText(url).catch(()=>{});
    const dict = I18N[window.selectedLanguage] || I18N.en;
    this.textContent = dict.copiedButton; this.classList.add("copied");
    setTimeout(() => {this.textContent = dict.copyButton; this.classList.remove("copied");}, 2000);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}});
  },{threshold:0.15});
  document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

  /* ---------- rAF visuals ---------- */
  const pc = document.getElementById("particles");
  const pctx = pc.getContext("2d");
  function resizeP(){pc.width = pc.offsetWidth; pc.height = pc.offsetHeight;}
  resizeP();window.addEventListener("resize", resizeP);
  const N = 18;
  const parts_ = Array.from({length:N}, () => ({
    x: Math.random()*pc.width, y: Math.random()*pc.height,
    vx: (Math.random()-0.5)*0.6, vy: (Math.random()-0.5)*0.6,
    r: 2 + Math.random()*2, o: 0.15 + Math.random()*0.15
  }));

  const wv = document.getElementById("wave");
  const wctx = wv.getContext("2d");
  (function resizeW(){
    const dpr = devicePixelRatio||1;
    wv.width = 240*dpr; wv.height = 64*dpr; wctx.scale(dpr,dpr);
  })();

  const dw = document.getElementById("darkWave");
  const dctx = dw.getContext("2d");
  function resizeDW(){dw.width = dw.offsetWidth; dw.height = dw.offsetHeight;}
  resizeDW();window.addEventListener("resize", resizeDW);

  const cursor = document.getElementById("cursor");
  let mx=-500,my=-500,cx=-500,cy=-500;
  window.addEventListener("mousemove", e => {mx=e.clientX;my=e.clientY;});

  let t = 0;
  function tick(){
    t += 0.04;
    pctx.clearRect(0,0,pc.width,pc.height);
    parts_.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<-10) p.x = pc.width+10;
      if(p.x>pc.width+10) p.x = -10;
      if(p.y<-10) p.y = pc.height+10;
      if(p.y>pc.height+10) p.y = -10;
      pctx.beginPath();
      pctx.fillStyle = `rgba(160,154,188,${p.o})`;
      pctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      pctx.fill();
    });

    wctx.clearRect(0,0,240,64);
    const bars = 28, gap = 5, bw = 4;
    const totalW = bars*bw + (bars-1)*gap;
    const startX = (240-totalW)/2;
    for(let i=0;i<bars;i++){
      const h = 20 + 18 * Math.sin(i*0.5 + t);
      const x = startX + i*(bw+gap);
      const y = 32 - h/2;
      wctx.fillStyle = "#A09ABC";
      wctx.beginPath();
      wctx.roundRect(x, y, bw, h, 2);
      wctx.fill();
    }

    dctx.clearRect(0,0,dw.width,dw.height);
    dctx.strokeStyle = "rgba(182,166,202,0.15)";
    dctx.lineWidth = 1.5;
    dctx.beginPath();
    for(let x=0;x<dw.width;x+=4){
      const y = dw.height*0.5 + Math.sin(x*0.015 + t*0.6)*16 + Math.sin(x*0.005 + t*0.3)*10;
      if(x===0) dctx.moveTo(x,y); else dctx.lineTo(x,y);
    }
    dctx.stroke();

    cx += (mx-cx)*0.1;
    cy += (my-cy)*0.1;
    cursor.style.left = cx+"px";
    cursor.style.top  = cy+"px";
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ---------- TWEAKS ---------- */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#847aae",
    "serifWeight": 400,
    "particles": true
  }/*EDITMODE-END*/;
  window.addEventListener("message", (e) => {
    if(!e.data) return;
    if(e.data.type === "__activate_edit_mode") openTweaks();
    if(e.data.type === "__deactivate_edit_mode") closeTweaks();
  });
  window.parent.postMessage({type:"__edit_mode_available"},"*");
  function openTweaks(){
    if(document.getElementById("tweakPanel")) return;
    const p = document.createElement("div");
    p.id = "tweakPanel";
    p.style.cssText = "position:fixed;bottom:24px;right:24px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 18px;box-shadow:0 20px 40px rgba(0,0,0,.15);z-index:500;font-family:Inter;font-size:13px;min-width:240px";
    p.innerHTML = `<div style="font-family:'Cormorant Garamond';font-style:italic;font-size:18px;margin-bottom:10px">Tweaks</div>
    <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px">Accent <input type="color" id="twAccent" value="${TWEAK_DEFAULTS.accent}" /></label>
    <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px">Particles <input type="checkbox" id="twPart" ${TWEAK_DEFAULTS.particles?'checked':''} /></label>
    <button id="twReset" style="background:var(--lavender-light);border-radius:100px;padding:6px 12px;font-size:12px;cursor:pointer;margin-top:4px">Reset language</button>`;
    document.body.appendChild(p);
    document.getElementById("twAccent").addEventListener("input", ev => {
      document.documentElement.style.setProperty("--lavender-grey", ev.target.value);
      window.parent.postMessage({type:"__edit_mode_set_keys", edits:{accent:ev.target.value}},"*");
    });
    document.getElementById("twPart").addEventListener("change", ev => {
      document.getElementById("particles").style.display = ev.target.checked ? "" : "none";
      window.parent.postMessage({type:"__edit_mode_set_keys", edits:{particles:ev.target.checked}},"*");
    });
    document.getElementById("twReset").addEventListener("click", () => {
      localStorage.removeItem("vozLanguage"); location.reload();
    });
  }
  function closeTweaks(){document.getElementById("tweakPanel")?.remove()}

  /* ---------- BRAND letter animation after screen clears ---------- */
});
