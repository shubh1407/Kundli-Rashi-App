import type { Bi } from '@/utils/i18n';

export type Category = 'overall' | 'love' | 'career' | 'health' | 'money';
export type Period = 'daily' | 'weekly' | 'monthly';

export const CATEGORIES: Category[] = ['overall', 'love', 'career', 'health', 'money'];
export const PERIODS: Period[] = ['daily', 'weekly', 'monthly'];

export const CATEGORY_META: Record<Category, { label: Bi; icon: string }> = {
  overall: { label: { en: 'Overall', hi: 'समग्र' }, icon: 'sparkles' },
  love: { label: { en: 'Love', hi: 'प्रेम' }, icon: 'heart' },
  career: { label: { en: 'Career', hi: 'करियर' }, icon: 'briefcase' },
  health: { label: { en: 'Health', hi: 'स्वास्थ्य' }, icon: 'fitness' },
  money: { label: { en: 'Money', hi: 'धन' }, icon: 'cash' },
};

export const PERIOD_META: Record<Period, { label: Bi; icon: string }> = {
  daily: { label: { en: 'Daily', hi: 'दैनिक' }, icon: 'sunny' },
  weekly: { label: { en: 'Weekly', hi: 'साप्ताहिक' }, icon: 'calendar' },
  monthly: { label: { en: 'Monthly', hi: 'मासिक' }, icon: 'month' },
};

export const OPENERS: Record<Category, Record<Period, Bi[]>> = {
  overall: {
    daily: [
      { en: 'Today the cosmos asks you to move slowly and notice more.', hi: 'आज ब्रह्मांड आपसे धीरे चलने और अधिक देखने को कहता है।' },
      { en: 'A quiet start today turns into a surprisingly productive afternoon.', hi: 'आज की शांत शुरुआत चौंकाने वाले उत्पादक दोपहर में बदलेगी।' },
      { en: 'The stars favour simplicity today — finish one thing properly.', hi: 'आज सितारे सरलता के पक्ष में हैं — एक काम पूरी ईमानदारी से पूरा करें।' },
      { en: 'Something small that went wrong last week resolves itself today.', hi: 'पिछले हफ़्ते जो छोटी गड़बड़ हुई थी, वह आज अपने आप सुलझ जाएगी।' },
    ],
    weekly: [
      { en: 'This week builds slowly, then suddenly — patience in the first half pays off.', hi: 'यह हफ़्ता धीरे बनेगा, फिर अचानक — पहले भाग का धैर्य रंग लाएगा।' },
      { en: 'The coming week rewards consistency more than intensity.', hi: 'आने वाला हफ़्ता जोश से ज़्यादा निरंतरता को इनाम देगा।' },
      { en: 'Expect two pivotal conversations this week — both will change direction.', hi: 'इस हफ़्ते दो महत्वपूर्ण बातचीतें होंगी — दोनों दिशा बदलेंगी।' },
      { en: 'This week is about clearing the old before inviting the new.', hi: 'यह हफ़्ता नए को बुलाने से पहले पुराना साफ़ करने का है।' },
    ],
    monthly: [
      { en: 'This month unfolds like a slow sunrise — the best arrives in the second half.', hi: 'यह महीना धीमी सूर्योदय की तरह खुलेगा — सबसे अच्छा दूसरे भाग में आएगा।' },
      { en: 'The month ahead asks you to choose depth over speed.', hi: 'आने वाला महीना आपसे गति के बजाय गहराई चुनने को कहता है।' },
      { en: 'Set one clear intention this month and the planets will quietly assist.', hi: 'इस महीने एक स्पष्ट संकल्प लें, ग्रह चुपचाप सहायता करेंगे।' },
      { en: 'This month brings a welcome release from an old burden.', hi: 'यह महीना पुराने बोझ से मुक्ति लाएगा।' },
    ],
  },
  love: {
    daily: [
      { en: 'Today romance lives in ordinary moments, not grand gestures.', hi: 'आज प्रेम बड़े इशारों में नहीं, साधारण पलों में रहता है।' },
      { en: 'A honest conversation tonight can clear weeks of misunderstanding.', hi: 'आज रात एक ईमानदार बातचीत हफ़्तों की ग़लतफ़हमी मिटा सकती है।' },
      { en: 'Your heart knows the answer before your mind does today.', hi: 'आज आपका मन जानने से पहले हृदय उत्तर जान चुका होता है।' },
      { en: 'Warmth you give today comes back multiplied within days.', hi: 'आज दी गई गर्मजोशी दिनों में कई गुना होकर लौटेगी।' },
    ],
    weekly: [
      { en: 'This week deepens an existing bond or closes a chapter gracefully.', hi: 'यह हफ़्ता पुराने रिश्ते को गहरा करेगा या अध्याय सुंदरता से बंद करेगा।' },
      { en: 'Someone has been thinking of you — expect a message midweek.', hi: 'कोई आपके बारे में सोच रहा है — हफ़्ते के बीच संदेश आएगा।' },
      { en: 'The week favours honesty over pride in matters of the heart.', hi: 'हृदय के मामलों में यह हफ़्ता अहंकार से ज़्यादा ईमानदारी को चुनता है।' },
      { en: 'Plan something simple together — the memory will outlast the week.', hi: 'साथ में कुछ सादा योजना बनाएँ — याद हफ़्ते से ज़्यादा टिकेगी।' },
    ],
    monthly: [
      { en: 'This month rewrites an old story in your love life with a kinder ending.', hi: 'यह महीना प्रेम की पुरानी कहानी को दयालु अंत देकर लिखेगा।' },
      { en: 'Singles meet someone through work or a friend; couples find fresh rhythm.', hi: 'एकल लोग काम या मित्र के ज़रिए किसी से मिलेंगे; जोड़े नई लय पाएँगे।' },
      { en: 'Patience with your partner this month becomes next month\'s blessing.', hi: 'इस महीने साथी के प्रति धैर्य, अगले महीने का आशीर्वाद बनेगा।' },
      { en: 'A relationship decision you postponed becomes easy after the 15th.', hi: 'जो रिश्ते का फ़ैसला टाला था, 15 तारीख़ के बाद वह आसान हो जाएगा।' },
    ],
  },
  career: {
    daily: [
      { en: 'A task you thought was stuck begins to move today.', hi: 'जो काम अटका समझ रहे थे, वह आज चलने लगेगा।' },
      { en: 'Your work is being noticed by someone whose opinion matters.', hi: 'आपका काम किसी ऐसे व्यक्ति की नज़र में है जिसकी राय मायने रखती है।' },
      { en: 'Clear communication before noon prevents an evening misunderstanding.', hi: 'दोपहर से पहली स्पष्ट बातचीत शाम की ग़लतफ़हमी रोक देगी।' },
      { en: 'One focused hour today is worth a whole distracted day.', hi: 'आज का एक केंद्रित घंटा पूरे बिखरे दिन के बराबर है।' },
    ],
    weekly: [
      { en: 'This week brings a chance to prove what you actually know.', hi: 'यह हफ़्ता वह साबित करने का मौक़ा लाता है जो आप सचमुच जानते हैं।' },
      { en: 'A delay in approvals works in your favour by Thursday.', hi: 'मंज़ूरी में देरी गुरुवार तक आपके ही काम आएगी।' },
      { en: 'Keep documentation tight this week; details will be audited.', hi: 'इस हफ़्ते दस्तावेज़ व्यवस्थित रखें; विवरण की जाँच होगी।' },
      { en: 'Say yes to the extra responsibility — it is a disguised promotion.', hi: 'अतिरिक्त ज़िम्मेदारी के लिए हाँ कहें — यह छिपा हुआ प्रमोशन है।' },
    ],
    monthly: [
      { en: 'This month lays groundwork for a promotion you will feel next quarter.', hi: 'यह महीना उस पदोन्नति की नींव रखेगा जो अगली तिमाही में दिखेगी।' },
      { en: 'A new collaboration or job conversation arrives mid-month.', hi: 'महीने के बीच नए सहयोग या नौकरी की बातचीत आएगी।' },
      { en: 'Guard your time this month; saying no twice earns you respect.', hi: 'इस महीने अपना समय बचाएँ; दो बार ना कहने से सम्मान मिलेगा।' },
      { en: 'Skill you invest in this month returns with interest within a year.', hi: 'इस महीने जो कौशल सीखेंगे, वह साल भर में ब्याज सहित लौटेगा।' },
    ],
  },
  health: {
    daily: [
      { en: 'Your body asks for water and rest today more than for medicine.', hi: 'आज आपका शरीर दवा से ज़्यादा पानी और आराम माँग रहा है।' },
      { en: 'Ten minutes of stretching this morning will save your evening.', hi: 'आज सुबह दस मिनट स्ट्रेचिंग आपकी शाम बचा लेगी।' },
      { en: 'Eat light today and your energy stays steady till night.', hi: 'आज हल्का खाएँ, ऊर्जा रात तक स्थिर रहेगी।' },
      { en: 'Your mind heals fastest when the phone is out of the bedroom.', hi: 'फ़ोन जब बेडरूम से बाहर हो, तब मन सबसे तेज़ी से ठीक होता है।' },
    ],
    weekly: [
      { en: 'This week your stamina improves once sleep returns to schedule.', hi: 'नींद नियमित होते ही इस हफ़्ते सहनशक्ति बढ़ेगी।' },
      { en: 'Postpone strenuous workouts to the weekend; keep weekdays gentle.', hi: 'कठिन व्यायाम सप्ताहांत पर रखें; कार्यदिवस हल्के रखें।' },
      { en: 'A small dietary change this week shows visible results within weeks.', hi: 'इस हफ़्ते किया गया छोटा आहार बदलाव हफ़्तों में दिखने लगेगा।' },
      { en: 'Watch your screen hours after 10 PM — sleep quality depends on it.', hi: 'रात 10 बजे के बाद स्क्रीन का समय देखें — नींद की गुणवत्ता इसी पर है।' },
    ],
    monthly: [
      { en: 'This month is excellent for rebuilding a fitness routine from scratch.', hi: 'यह महीना फिटनेस की नई दिनचर्या शुरू करने के लिए उत्तम है।' },
      { en: 'Get that pending health check-up done — it brings peace, not fear.', hi: 'रुकी हुई स्वास्थ्य जाँच करवा लें — यह डर नहीं, शांति लाती है।' },
      { en: 'Emotional healing accelerates this month through daily walks and silence.', hi: 'रोज़ की सैर और मौन से इस महीने भावनात्मक उपचार तेज़ होगा।' },
      { en: 'Reduce sugar and increase sunlight; the planets favour routine this month.', hi: 'चीनी घटाएँ और धूप बढ़ाएँ; इस महीने ग्रह नियमितता के पक्ष में हैं।' },
    ],
  },
  money: {
    daily: [
      { en: 'A small saving today becomes a big relief later.', hi: 'आज की छोटी बचत बाद में बड़ी राहत बनेगी।' },
      { en: 'Avoid lending money today; delays may sour a good relationship.', hi: 'आज धन उधार न दें; देरी अच्छे रिश्ते को कड़वा कर सकती है।' },
      { en: 'An earning opportunity appears in conversation, not in an advertisement.', hi: 'कमाई का अवसर विज्ञापन में नहीं, बातचीत में मिलेगा।' },
      { en: 'Check your messages carefully — a pending payment may finally arrive.', hi: 'संदेश ध्यान से देखें — रुका भुगतान आख़िर आ सकता है।' },
    ],
    weekly: [
      { en: 'This week is for auditing expenses, not for big purchases.', hi: 'यह हफ़्ता खर्च की समीक्षा का है, बड़ी ख़रीदारी का नहीं।' },
      { en: 'A financial delay clears once you make one direct phone call.', hi: 'एक सीधे फ़ोन कॉल से आर्थिक रुकावट दूर हो जाएगी।' },
      { en: 'Money saved this week carries you through a lean patch later.', hi: 'इस हफ़्ते की बचत आगे की कमी के काम आएगी।' },
      { en: 'Avoid financial decisions while angry or excited.', hi: 'गुस्से या उत्साह में आर्थिक निर्णय न लें।' },
    ],
    monthly: [
      { en: 'This month brings a welcome inflow you had stopped expecting.', hi: 'यह महीना वह आय लाएगा जिसकी उम्मीद आप छोड़ चुके थे।' },
      { en: 'Invest in learning rather than gadgets this month.', hi: 'इस महीने गैजेट के बजाय सीखने में निवेश करें।' },
      { en: 'Review subscriptions and insurance papers you have been ignoring.', hi: 'जो सदस्यताएँ और बीमा कागज़ टाल रहे थे, उन्हें देखें।' },
      { en: 'Generosity brings luck this month — within a limit fixed beforehand.', hi: 'इस महीने उदारता भाग्य लाती है — पहले तय सीमा के भीतर।' },
    ],
  },
};

export const BODIES: Record<Category, Bi[]> = {
  overall: [
    { en: 'The planets are aligned in your favour; a calm mind will notice the small blessings hidden in routine moments.', hi: 'ग्रह आज आपके पक्ष में हैं; शांत मन रोज़मर्रा के पलों में छिपे छोटे आशीर्वाद दिखा देगा।' },
    { en: 'Someone you helped in the past may return with good news — keep your heart open.', hi: 'पहले आपकी मदद करने वाला कोई शुभ समाचार लेकर लौट सकता है — हृदय खुला रखें।' },
    { en: 'Your presence steadies people around you. Speak less, observe more, let actions talk.', hi: 'आपकी उपस्थिति आसपास के लोगों को स्थिर करती है। कम बोलें, अधिक देखें, कर्म से बोलने दें।' },
    { en: 'A short walk or a few minutes of silence will reset your energy better than a long break.', hi: 'थोड़ी सैर या कुछ मिनट की चुप्पी लंबे आराम से ज़्यादा ऊर्जा लौटाएगी।' },
    { en: 'Do not compare your progress with others; your timeline is written differently.', hi: 'अपनी प्रगति की तुलना दूसरों से न करें; आपका समय अलग लिखा गया है।' },
    { en: 'Old responsibilities may ask for attention — handle them one at a time.', hi: 'पुरानी ज़िम्मेदारियाँ ध्यान माँग सकती हैं — एक-एक करके निभाएँ।' },
    { en: 'Trust the timing. What feels delayed is simply being prepared properly for you.', hi: 'समय पर भरोसा रखें। जो विलंब लग रहा है, वह बस आपके लिए ठीक से तैयार हो रहा है।' },
    { en: 'Write down the one thing that matters today; everything else can wait its turn.', hi: 'आज जो एक काम मायने रखता है उसे लिख लें; बाक़ी सब अपनी बारी का इंतज़ार कर सकते हैं।' },
  ],
  love: [
    { en: 'Choose warmth over being right — that single shift changes the whole conversation.', hi: 'सही होने से पहले गर्मजोशी चुनें — यह एक बदलाव पूरी बातचीत बदल देगा।' },
    { en: 'If you are single, a slow unexpected connection is forming — do not rush it into a label.', hi: 'यदि आप अकेले हैं तो एक धीमा, अनपेक्षित रिश्ता बन रहा है — उसे जल्दी नाम मत दें।' },
    { en: 'Your partner may need reassurance more than advice. Listen fully before responding.', hi: 'आपके साथी को सलाह से ज़्यादा भरोसे की ज़रूरत है। जवाब से पहले पूरा सुनें।' },
    { en: 'Distance, literal or emotional, softens if you send the first message.', hi: 'दूरी, शारीरिक या भावनात्मक, घट जाएगी यदि आप पहला संदेश भेजें।' },
    { en: 'Old memories may resurface. Honour them, but do not let nostalgia decide today.', hi: 'पुरानी यादें लौट सकती हैं। उन्हें सम्मान दें, पर आज का फ़ैसला यादों से न लें।' },
    { en: 'A shared cup of tea will mean more than an expensive gift right now.', hi: 'अभी महँगे तोहफ़े से ज़्यादा एक कप चाय साथ पीना मायने रखेगा।' },
    { en: 'Set a gentle boundary. Saying no kindly protects the love you have built.', hi: 'एक कोमल सीमा रखें। विनम्रता से ना कहना आपके बनाए प्रेम की रक्षा करता है।' },
    { en: 'Someone admires you quietly. Be mindful of the signals you send today.', hi: 'कोई आपको चुपचाप पसंद करता है। आज आपके भेजे संकेतों पर ध्यान दें।' },
  ],
  career: [
    { en: 'Send the follow-up email you have been postponing; it unlocks the next step.', hi: 'जो फ़ॉलो-अप ईमेल टाल रहे हैं, आज भेज दें; वही अगला कदम खोलेगा।' },
    { en: 'Keep your standards high even when no one is watching — that is your reputation.', hi: 'किसी के देखने पर भी मानक ऊँचे रखें — यही आपकी प्रतिष्ठा है।' },
    { en: 'Avoid office politics after lunch; a neutral answer protects your reputation.', hi: 'दोपहर के बाद दफ़्तर की राजनीति से बचें; तटस्थ जवाब प्रतिष्ठा बचाएगा।' },
    { en: 'Learning one small new skill today compounds into a big opportunity within weeks.', hi: 'आज सीखा एक छोटा कौशल हफ़्तों में बड़ा अवसर बन जाएगा।' },
    { en: 'A senior may test your patience. Respond with data and calmness, not emotion.', hi: 'कोई वरिष्ठ धैर्य की परीक्षा ले सकता है। भावना नहीं, तथ्य और शांति से जवाब दें।' },
    { en: 'Delegate one task. Carrying everything alone is slowing the whole team down.', hi: 'एक काम दूसरों को दें। सब अकेले उठाना पूरी टीम को धीमा कर रहा है।' },
    { en: 'Write your goal in one sentence today. Clarity attracts the right opportunity.', hi: 'आज अपना लक्ष्य एक वाक्य में लिखें। स्पष्टता सही अवसर को खींचती है।' },
    { en: 'An unexpected invitation to collaborate could open a door you did not know existed.', hi: 'सहयोग का अप्रत्याशित निमंत्रण उस दरवाज़े को खोल सकता है जिसका आपको पता भी नहीं था।' },
  ],
  health: [
    { en: 'Start the day with a full glass of water; your body has been asking all night.', hi: 'दिन की शुरुआत एक गिलास पानी से करें; शरीर रात भर यही माँग रहा था।' },
    { en: 'Morning stretching will prevent the stiffness you usually feel by evening.', hi: 'सुबह की स्ट्रेचिंग शाम की अकड़न को रोक देगी।' },
    { en: 'Skip one heavy meal today and choose fresh, simple food instead.', hi: 'आज एक भारी भोजन छोड़ें और ताज़ा, सादा भोजन चुनें।' },
    { en: 'Stress is showing up as interrupted sleep — keep the phone away before bed.', hi: 'तनाव नींद में टूटन के रूप में दिख रहा है — सोने से पहले फ़ोन रख दें।' },
    { en: 'An evening walk will do more for your mood than scrolling ever will.', hi: 'शाम की सैर स्क्रॉलिंग से ज़्यादा मूड ठीक करेगी।' },
    { en: 'Watch your posture while working; neck and shoulders carry the day\'s worry.', hi: 'काम करते समय मुद्रा पर ध्यान दें; गर्दन और कंधे दिन की चिंता उठा रहे हैं।' },
    { en: 'Old aches deserve a proper check-up instead of being postponed again.', hi: 'पुराने दर्द को फिर टालने के बजाय एक ठीक जाँच करवाएँ।' },
    { en: 'Breathe deeply four times before every meal — it settles hunger and anger both.', hi: 'हर भोजन से पहले चार गहरी साँसें लें — भूख और क्रोध दोनों शांत होते हैं।' },
  ],
  money: [
    { en: 'Track every expense for the next three days; awareness itself increases flow.', hi: 'अगले तीन दिन हर खर्च लिखें; जागरूकता ही आय बढ़ाती है।' },
    { en: 'A delayed payment or refund may finally arrive — watch your messages.', hi: 'रुका हुआ भुगतान या रिफ़ंड आख़िर आ सकता है — संदेश देखें।' },
    { en: 'This is a good day to review subscriptions and insurance papers.', hi: 'सदस्यताएँ और बीमा कागज़ देखने का आज अच्छा दिन है।' },
    { en: 'Do not make financial decisions while angry or excited. Sleep on big amounts.', hi: 'गुस्से या उत्साह में आर्थिक निर्णय न लें। बड़ी रकम पर सोच-समझकर ही फ़ैसला करें।' },
    { en: 'Invest in learning rather than gadgets; knowledge returns compound interest.', hi: 'गैजेट के बजाय सीखने में निवेश करें; ज्ञान चक्रवृद्धि ब्याज देता है।' },
    { en: 'A side skill can become a second income if you give it two honest hours a week.', hi: 'हफ़्ते में दो ईमानदार घंटे दें तो एक अतिरिक्त कौशल दूसरी आय बन सकता है।' },
    { en: 'Money saved quietly today becomes strength in a louder month ahead.', hi: 'आज चुपचाप की गई बचत आगे के शोर भरे महीने में ताक़त बनेगी।' },
    { en: 'Generosity today brings luck — but only within a limit you decide beforehand.', hi: 'आज की उदारता भाग्य लाती है — पर पहले तय सीमा के भीतर ही।' },
  ],
};

export const CLOSERS: Bi[] = [
  { en: 'Lucky charm: keep something gold with you.', hi: 'शुभ चिह्न: कुछ सुनहरा साथ रखें।' },
  { en: 'A kind word spoken today returns as good fortune.', hi: 'आज कहा एक मीठा शब्द सौभाग्य बनकर लौटेगा।' },
  { en: 'Face the difficult task first; the rest of the day becomes easy.', hi: 'कठिन काम पहले निपटाएँ; बाक़ी दिन आसान रहेगा।' },
  { en: 'Offer water to the Sun; your clarity doubles.', hi: 'सूर्य को जल अर्पित करें; स्पष्टता दुगनी होगी।' },
  { en: 'Meet an elder today — their blessing carries weight this week.', hi: 'आज किसी बुज़ुर्ग से मिलें — उनका आशीर्वाद इस हफ़्ते भारी पड़ेगा।' },
  { en: 'Before sleeping, name three things that went right today.', hi: 'सोने से पहले आज की तीन सही बातें याद करें।' },
];

/** Yearly horoscope: two readings per month, seeded deterministically. */
export const YEARLY: Bi[][] = [
  [
    { en: 'January sets a serious, constructive tone — paperwork and planning go your way.', hi: 'जनवरी गंभीर और रचनात्मक लय देगा — कागज़ी काम और योजना आपके पक्ष में रहेंगे।' },
    { en: 'A relationship needs a calm conversation early in the month.', hi: 'महीने की शुरुआत में एक रिश्ते को शांत बातचीत चाहिए।' },
  ],
  [
    { en: 'February brings warmth and a small wish gets fulfilled.', hi: 'फ़रवरी गर्मजोशी लाएगा और एक छोटी इच्छा पूरी होगी।' },
    { en: 'Money flow improves; avoid impulsive shopping in the second week.', hi: 'धन प्रवाह बेहतर होगा; दूसरे हफ़्ते अनावश्यक ख़रीदारी से बचें।' },
  ],
  [
    { en: 'March opens doors at work — a new responsibility arrives with a title.', hi: 'मार्च काम के दरवाज़े खोलेगा — नई ज़िम्मेदारी पद के साथ आएगी।' },
    { en: 'Travelling this month brings more benefit than entertainment.', hi: 'इस महीने यात्रा मनोरंजन से ज़्यादा लाभ देगी।' },
  ],
  [
    { en: 'April is gentle — health improves once routine settles.', hi: 'अप्रैल कोमल रहेगा — दिनचर्या बनते ही स्वास्थ्य बेहतर होगा।' },
    { en: 'Someone older becomes an unexpected mentor.', hi: 'कोई बड़ा व्यक्ति अप्रत्याशित गुरु बन सकता है।' },
  ],
  [
    { en: 'May rewards patience — results delayed since February finally land.', hi: 'मई धैर्य का इनाम देगा — फ़रवरी से रुके परिणाम आएँगे।' },
    { en: 'Family matters need your attention; balance work and home deliberately.', hi: 'पारिवारिक मामलों में ध्यान चाहिए; काम और घर को सोच-समझकर संतुलित करें।' },
  ],
  [
    { en: 'June brings a fresh start — a project, a habit or a friendship is reborn.', hi: 'जून नई शुरुआत लाएगा — कोई परियोजना, आदत या मित्रता फिर जन्मेगी।' },
    { en: 'Speak up in meetings; your silence is costing you recognition.', hi: 'बैठकों में बोलें; आपकी चुप्पी पहचान रोक रही है।' },
  ],
  [
    { en: 'July is financial — an old debt clears and savings grow.', hi: 'जुलाई आर्थिक रहेगा — पुराना कर्ज चुकेगा और बचत बढ़ेगी।' },
    { en: 'Protect your peace; not every argument needs your reply.', hi: 'अपनी शांति बचाएँ; हर बहस का जवाब आपको नहीं देना।' },
  ],
  [
    { en: 'August shines on you publicly — appreciation arrives from unexpected corners.', hi: 'अगस्त सार्वजनिक रूप से चमकेगा — प्रशंसा अप्रत्याशित जगहों से आएगी।' },
    { en: 'Take care of your eyes and back; long sitting hours are the cause.', hi: 'आँखों और कमर का ध्यान रखें; लंबा बैठना कारण है।' },
  ],
  [
    { en: 'September is for study and skill — what you learn now pays for years.', hi: 'सितंबर अध्ययन और कौशल का है — जो अभी सीखेंगे वह वर्षों चलेगा।' },
    { en: 'A property or vehicle decision becomes favourable after mid-month.', hi: 'महीने के बीच के बाद संपत्ति या वाहन का निर्णय अनुकूल होगा।' },
  ],
  [
    { en: 'October brings celebration — a family event or personal milestone.', hi: 'अक्टूबर उत्सव लाएगा — पारिवारिक आयोजन या निजी उपलब्धि।' },
    { en: 'Relationships deepen; commitment feels natural rather than forced.', hi: 'रिश्ते गहरे होंगे; प्रतिबद्धता ज़बरदस्ती नहीं, स्वाभाविक लगेगी।' },
  ],
  [
    { en: 'November tests and upgrades you — what falls away was blocking the path.', hi: 'नवंबर परखेगा और उन्नति देगा — जो गिरेगा वही रास्ता रोक रहा था।' },
    { en: 'Career movement is strong; keep your resume and network alive.', hi: 'करियर में गति मज़बूत है; रेज़्यूमे और नेटवर्क सक्रिय रखें।' },
  ],
  [
    { en: 'December closes the year with relief and a welcome financial gain.', hi: 'दिसंबर साल को राहत और अच्छी आर्थिक प्राप्ति के साथ बंद करेगा।' },
    { en: 'Rest properly before the new cycle; next year starts from this energy.', hi: 'नए चक्र से पहले ठीक से विश्राम करें; अगला साल इसी ऊर्जा से शुरू होगा।' },
  ],
];

export const COMPAT_SUMMARIES: { min: number; text: Bi }[] = [
  {
    min: 88,
    text: {
      en: 'A rare, harmonious pairing. Both signs share a similar emotional rhythm, so misunderstandings clear quickly and decisions feel natural. Protect this bond from outside noise.',
      hi: 'दुर्लभ और अत्यंत अनुकूल जोड़ी। दोनों राशियों की भावनात्मक लय मिलती है, इसलिए ग़लतफ़हमियाँ जल्दी साफ़ होती हैं और निर्णय स्वाभाविक लगते हैं। इस रिश्ते को बाहरी शोर से बचाएँ।',
    },
  },
  {
    min: 74,
    text: {
      en: 'Strong compatibility with genuine warmth. Differences exist but they complement rather than clash — travel and shared learning keep the spark alive.',
      hi: 'असली गर्मजोशी के साथ मज़बूत अनुकूलता। मतभेद हैं पर टकराव नहीं, वे पूरक हैं — यात्रा और साथ सीखना रिश्ते को ताज़ा रखेगा।',
    },
  },
  {
    min: 60,
    text: {
      en: 'A promising bond that grows with honest communication. Expect a few misunderstandings in the first months — addressing them early builds something lasting.',
      hi: 'आशाजनक रिश्ता जो ईमानदार संवाद से बढ़ेगा। पहले महीनों में कुछ ग़लतफ़हमियाँ संभव हैं — जल्दी बात करने से कुछ टिकाऊ बनेगा।',
    },
  },
  {
    min: 45,
    text: {
      en: 'Moderate matching. Both need to respect each other\'s pace — one moves fast, the other moves sure. Rituals, routines and clear expectations help greatly.',
      hi: 'मध्यम मेल। दोनों को एक-दूसरे की गति का सम्मान करना होगा — एक तेज़ चलता है, दूसरा सुनिश्चित। नियमित रीति और स्पष्ट अपेक्षाएँ बहुत मदद करेंगी।',
    },
  },
  {
    min: 0,
    text: {
      en: 'A challenging pairing that can still work with maturity and patience. Choose your battles, keep finances clear between you, and give each other space to breathe.',
      hi: 'कठिन जोड़ी, पर परिपक्वता और धैर्य से चल सकती है। लड़ाई चुनें, आर्थिक मामले स्पष्ट रखें और एक-दूसरे को साँस लेने की जगह दें।',
    },
  },
];

export const BOND_LEVELS: { min: number; label: Bi }[] = [
  { min: 88, label: { en: 'Soulmate bond', hi: 'आत्मीय जोड़ी' } },
  { min: 74, label: { en: 'Strong bond', hi: 'मज़बूत रिश्ता' } },
  { min: 60, label: { en: 'Promising match', hi: 'आशाजनक मेल' } },
  { min: 45, label: { en: 'Needs effort', hi: 'प्रयास चाहिए' } },
  { min: 0, label: { en: 'Challenging', hi: 'चुनौतीपूर्ण' } },
];

export const ASPECT_LABELS: { key: string; label: Bi }[] = [
  { key: 'love', label: { en: 'Love', hi: 'प्रेम' } },
  { key: 'trust', label: { en: 'Trust', hi: 'विश्वास' } },
  { key: 'communication', label: { en: 'Communication', hi: 'संवाद' } },
  { key: 'career', label: { en: 'Career', hi: 'करियर' } },
  { key: 'health', label: { en: 'Health', hi: 'स्वास्थ्य' } },
];
