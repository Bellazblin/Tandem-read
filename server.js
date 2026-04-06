const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

// ============ BUILT-IN LIBRARY ============
const LIBRARY = [
  // --- GERMAN-CHINESE ---
  {id:"gc-a1-daily",lang:"DE-ZH",level:"A1",topic:"Daily Life",topicZh:"日常生活",sentences:[
    ["Ich stehe um sieben Uhr auf.","我七点起床。"],["Ich frühstücke um halb acht.","我七点半吃早餐。"],["Ich trinke eine Tasse Kaffee.","我喝一杯咖啡。"],["Ich gehe um acht Uhr zur Arbeit.","我八点去上班。"],["Ich esse um zwölf Uhr zu Mittag.","我中午十二点吃午饭。"],["Am Abend koche ich das Abendessen.","晚上我做晚饭。"],["Ich sehe ein bisschen fern.","我看一会儿电视。"],["Ich gehe um elf Uhr ins Bett.","我十一点上床睡觉。"]
  ]},
  {id:"gc-a1-food",lang:"DE-ZH",level:"A1",topic:"Food and Drink",topicZh:"饮食",sentences:[
    ["Ich esse gern Brot mit Butter.","我喜欢吃面包加黄油。"],["Zum Frühstück trinke ich Tee.","早餐我喝茶。"],["Mittags esse ich oft Reis mit Gemüse.","中午我经常吃米饭和蔬菜。"],["Ich mag Äpfel und Bananen.","我喜欢苹果和香蕉。"],["Am Wochenende backe ich einen Kuchen.","周末我烤一个蛋糕。"],["Wasser ist mein Lieblingsgetränk.","水是我最喜欢的饮料。"],["Im Sommer esse ich viel Eis.","夏天我吃很多冰淇淋。"],["Abends trinke ich gern ein Glas Milch.","晚上我喜欢喝一杯牛奶。"]
  ]},
  {id:"gc-a1-family",lang:"DE-ZH",level:"A1",topic:"Family",topicZh:"家庭",sentences:[
    ["Meine Familie ist nicht sehr groß.","我的家庭不是很大。"],["Ich habe einen Bruder und eine Schwester.","我有一个哥哥和一个姐姐。"],["Mein Vater arbeitet in einer Fabrik.","我爸爸在一家工厂工作。"],["Meine Mutter ist Lehrerin.","我妈妈是老师。"],["Mein Bruder studiert an der Universität.","我哥哥在大学读书。"],["Meine Schwester ist noch in der Schule.","我姐姐还在上学。"],["Wir essen jeden Abend zusammen.","我们每天晚上一起吃饭。"],["Am Sonntag besuchen wir die Großeltern.","星期天我们去看爷爷奶奶。"]
  ]},
  {id:"gc-a2-shopping",lang:"DE-ZH",level:"A2",topic:"Shopping",topicZh:"购物",sentences:[
    ["Ich gehe heute in den Supermarkt.","我今天去超市。"],["Ich brauche Milch, Eier und Brot.","我需要牛奶、鸡蛋和面包。"],["Die Tomaten kosten zwei Euro pro Kilo.","西红柿两欧元一公斤。"],["Haben Sie das in einer anderen Größe?","你们有其他尺码的吗？"],["Ich möchte mit Karte bezahlen.","我想用卡支付。"],["Der Pullover gefällt mir, aber er ist zu teuer.","我喜欢这件毛衣，但是太贵了。"],["Gibt es heute ein Sonderangebot?","今天有特价吗？"],["Ich nehme zwei Kilo Kartoffeln.","我要两公斤土豆。"]
  ]},
  {id:"gc-a2-weather",lang:"DE-ZH",level:"A2",topic:"Weather",topicZh:"天气与季节",sentences:[
    ["Heute scheint die Sonne.","今天阳光明媚。"],["Es regnet seit drei Tagen.","已经下了三天雨了。"],["Im Winter wird es sehr kalt.","冬天会变得很冷。"],["Der Frühling ist meine Lieblingsjahreszeit.","春天是我最喜欢的季节。"],["Im Herbst fallen die Blätter von den Bäumen.","秋天树叶从树上落下。"],["Im Sommer fahren wir oft ans Meer.","夏天我们经常去海边。"],["Morgen soll es schneien.","明天据说会下雪。"],["Bei schönem Wetter gehe ich spazieren.","天气好的时候我去散步。"]
  ]},
  {id:"gc-a2-transport",lang:"DE-ZH",level:"A2",topic:"Transport",topicZh:"交通",sentences:[
    ["Ich fahre jeden Tag mit der U-Bahn.","我每天坐地铁。"],["Der Bus kommt alle zehn Minuten.","公交车每十分钟来一趟。"],["Ein Einzelticket kostet drei Euro.","一张单程票三欧元。"],["Der Zug hat zwanzig Minuten Verspätung.","火车晚点二十分钟。"],["Ich gehe lieber zu Fuß.","我更喜欢走路。"],["Am Wochenende fahre ich mit dem Fahrrad.","周末我骑自行车。"],["Können Sie mich zum Bahnhof bringen?","您能带我去火车站吗？"],["Der Flughafen ist dreißig Kilometer entfernt.","机场离这里三十公里。"]
  ]},
  {id:"gc-b1-health",lang:"DE-ZH",level:"B1",topic:"Health",topicZh:"健康",sentences:[
    ["Ich habe seit gestern Kopfschmerzen.","我从昨天开始头疼。"],["Der Arzt hat mir Medikamente verschrieben.","医生给我开了药。"],["Man sollte mindestens zwei Liter Wasser am Tag trinken.","一天应该至少喝两升水。"],["Regelmäßige Bewegung ist gut für die Gesundheit.","经常运动对健康有好处。"],["Ich versuche, weniger Zucker zu essen.","我尽量少吃糖。"],["Seit ich jeden Morgen jogge, schlafe ich besser.","自从我每天早上跑步以后，我睡得更好了。"],["Stress kann viele Krankheiten verursachen.","压力可以导致很多疾病。"],["Eine ausgewogene Ernährung ist sehr wichtig.","均衡的饮食非常重要。"]
  ]},
  {id:"gc-b1-travel",lang:"DE-ZH",level:"B1",topic:"Travel",topicZh:"旅行",sentences:[
    ["Letzten Sommer bin ich nach Italien geflogen.","去年夏天我坐飞机去了意大利。"],["Wir haben ein Hotel direkt am Strand gebucht.","我们订了一家就在海滩边的酒店。"],["Die Altstadt war wirklich wunderschön.","老城区真的非常漂亮。"],["Ich habe viele Fotos gemacht.","我拍了很多照片。"],["Das Essen dort war fantastisch.","那里的食物太棒了。"],["Wir sind mit einem Mietwagen durch die Toskana gefahren.","我们开租来的车穿越了托斯卡纳。"],["Nächstes Jahr möchte ich nach Japan reisen.","明年我想去日本旅行。"],["Reisen erweitert den Horizont.","旅行开阔视野。"]
  ]},
  {id:"gc-b1-work",lang:"DE-ZH",level:"B1",topic:"Work",topicZh:"工作与职业",sentences:[
    ["Ich arbeite seit fünf Jahren in dieser Firma.","我在这家公司工作了五年。"],["Mein Chef ist streng, aber fair.","我的老板很严格，但很公正。"],["Nächste Woche habe ich ein Vorstellungsgespräch.","下周我有一个面试。"],["Die Arbeitszeiten sind von neun bis fünf.","工作时间是九点到五点。"],["Ich mache gerade eine Weiterbildung.","我正在参加进修培训。"],["Teamarbeit ist in unserem Büro sehr wichtig.","在我们办公室团队合作非常重要。"],["Ich möchte mich beruflich verändern.","我想在职业上做出改变。"],["Ein guter Lebenslauf ist sehr wichtig.","一份好的简历非常重要。"]
  ]},
  {id:"gc-b2-environment",lang:"DE-ZH",level:"B2",topic:"Environment",topicZh:"环境",sentences:[
    ["Der Klimawandel ist eine der größten Herausforderungen unserer Zeit.","气候变化是我们时代最大的挑战之一。"],["Viele Länder setzen auf erneuerbare Energien.","很多国家正在发展可再生能源。"],["Plastikmüll verschmutzt die Ozeane.","塑料垃圾污染了海洋。"],["Jeder Einzelne kann zum Umweltschutz beitragen.","每个人都可以为环保做出贡献。"],["In vielen Städten gibt es jetzt Fahrverbote für Diesel.","很多城市现在禁止柴油车通行。"],["Die Abholzung der Regenwälder muss gestoppt werden.","必须停止砍伐热带雨林。"],["Nachhaltig leben bedeutet, bewusster zu konsumieren.","可持续生活意味着更有意识地消费。"],["Die Erderwärmung führt zu extremen Wetterereignissen.","全球变暖导致极端天气事件。"]
  ]},
  // --- FRENCH-CHINESE ---
  {id:"fc-a1-daily",lang:"FR-ZH",level:"A1",topic:"Daily Life",topicZh:"日常生活",sentences:[
    ["Je me lève à sept heures.","我七点起床。"],["Je prends le petit déjeuner à huit heures.","我八点吃早餐。"],["Je bois un café avec du lait.","我喝一杯加牛奶的咖啡。"],["Je vais au travail en métro.","我坐地铁去上班。"],["Je déjeune à midi avec mes collègues.","我中午和同事一起吃午饭。"],["Le soir, je prépare le dîner.","晚上我准备晚饭。"],["Je regarde un peu la télévision.","我看一会儿电视。"],["Je me couche vers onze heures.","我大约十一点睡觉。"]
  ]},
  {id:"fc-a1-food",lang:"FR-ZH",level:"A1",topic:"Food and Drink",topicZh:"饮食",sentences:[
    ["Je mange du pain et du beurre le matin.","我早上吃面包和黄油。"],["Je bois du thé vert tous les jours.","我每天喝绿茶。"],["À midi, je mange du riz avec des légumes.","中午我吃米饭和蔬菜。"],["J'aime beaucoup les pommes et les oranges.","我很喜欢苹果和橙子。"],["Le dimanche, je fais un gâteau au chocolat.","星期天我做一个巧克力蛋糕。"],["L'eau est ma boisson préférée.","水是我最喜欢的饮料。"],["En été, je mange beaucoup de glaces.","夏天我吃很多冰淇淋。"],["Le soir, je bois un verre de lait chaud.","晚上我喝一杯热牛奶。"]
  ]},
  {id:"fc-a1-family",lang:"FR-ZH",level:"A1",topic:"Family",topicZh:"家庭",sentences:[
    ["Ma famille n'est pas très grande.","我的家庭不是很大。"],["J'ai un frère et une sœur.","我有一个哥哥和一个姐姐。"],["Mon père travaille dans une usine.","我爸爸在一家工厂工作。"],["Ma mère est professeur.","我妈妈是老师。"],["Mon frère étudie à l'université.","我哥哥在大学读书。"],["Ma sœur est encore au lycée.","我姐姐还在上高中。"],["Nous dînons ensemble tous les soirs.","我们每天晚上一起吃饭。"],["Le dimanche, nous rendons visite à nos grands-parents.","星期天我们去看爷爷奶奶。"]
  ]},
  {id:"fc-a1-greetings",lang:"FR-ZH",level:"A1",topic:"Greetings",topicZh:"问候与自我介绍",sentences:[
    ["Bonjour, je m'appelle Marie.","你好，我叫玛丽。"],["Comment allez-vous aujourd'hui ?","您今天好吗？"],["Je suis française, j'habite à Paris.","我是法国人，住在巴黎。"],["J'ai vingt-cinq ans.","我二十五岁。"],["Enchanté de faire votre connaissance.","很高兴认识你。"],["Je parle français et un peu anglais.","我说法语，还会一点英语。"],["Quel est votre métier ?","您的职业是什么？"],["Je suis étudiant en médecine.","我是医学生。"]
  ]},
  {id:"fc-a2-shopping",lang:"FR-ZH",level:"A2",topic:"Shopping",topicZh:"购物",sentences:[
    ["Je vais au supermarché cet après-midi.","我今天下午去超市。"],["J'ai besoin de lait, d'œufs et de pain.","我需要牛奶、鸡蛋和面包。"],["Les tomates coûtent deux euros le kilo.","西红柿两欧元一公斤。"],["Avez-vous ça dans une autre taille ?","你们有其他尺码的吗？"],["Je voudrais payer par carte.","我想用卡支付。"],["Ce pull me plaît, mais il est trop cher.","我喜欢这件毛衣，但是太贵了。"],["Il y a des promotions aujourd'hui ?","今天有促销吗？"],["Je prends deux kilos de pommes de terre.","我要两公斤土豆。"]
  ]},
  {id:"fc-a2-weather",lang:"FR-ZH",level:"A2",topic:"Weather",topicZh:"天气与季节",sentences:[
    ["Aujourd'hui il fait beau, le soleil brille.","今天天气好，阳光明媚。"],["Il pleut depuis trois jours.","已经下了三天雨了。"],["En hiver, il fait très froid.","冬天非常冷。"],["Le printemps est ma saison préférée.","春天是我最喜欢的季节。"],["En automne, les feuilles tombent des arbres.","秋天树叶从树上落下。"],["En été, nous allons souvent à la mer.","夏天我们经常去海边。"],["Demain, il va neiger.","明天会下雪。"],["Quand il fait beau, je me promène dans le parc.","天气好的时候我在公园散步。"]
  ]},
  {id:"fc-a2-transport",lang:"FR-ZH",level:"A2",topic:"Transport",topicZh:"交通",sentences:[
    ["Je prends le métro tous les jours.","我每天坐地铁。"],["Le bus passe toutes les dix minutes.","公交车每十分钟来一趟。"],["Un ticket simple coûte deux euros.","一张单程票两欧元。"],["Le train a vingt minutes de retard.","火车晚点二十分钟。"],["Je préfère marcher.","我更喜欢走路。"],["Le week-end, je fais du vélo.","周末我骑自行车。"],["Pouvez-vous m'emmener à la gare ?","您能带我去火车站吗？"],["L'aéroport est à trente kilomètres d'ici.","机场离这里三十公里。"]
  ]},
  {id:"fc-a2-home",lang:"FR-ZH",level:"A2",topic:"At Home",topicZh:"在家",sentences:[
    ["Mon appartement a trois pièces.","我的公寓有三个房间。"],["La cuisine est petite mais bien équipée.","厨房很小但设备齐全。"],["Il y a un balcon avec vue sur le jardin.","有一个阳台可以看到花园。"],["Je fais le ménage le samedi matin.","我星期六早上做家务。"],["Le salon est la pièce la plus grande.","客厅是最大的房间。"],["J'ai une machine à laver dans la salle de bain.","我的浴室里有一台洗衣机。"],["Les voisins sont très gentils.","邻居们很友好。"],["Le loyer coûte huit cents euros par mois.","房租每月八百欧元。"]
  ]},
  {id:"fc-b1-health",lang:"FR-ZH",level:"B1",topic:"Health",topicZh:"健康",sentences:[
    ["J'ai mal à la tête depuis hier.","我从昨天开始头疼。"],["Le médecin m'a prescrit des médicaments.","医生给我开了药。"],["Il faut boire au moins deux litres d'eau par jour.","一天应该至少喝两升水。"],["L'exercice régulier est bon pour la santé.","经常运动对健康有好处。"],["J'essaie de manger moins de sucre.","我尽量少吃糖。"],["Depuis que je fais du jogging chaque matin, je dors mieux.","自从我每天早上跑步以后，我睡得更好了。"],["Le stress peut causer beaucoup de maladies.","压力可以导致很多疾病。"],["Une alimentation équilibrée est très importante.","均衡的饮食非常重要。"]
  ]},
  {id:"fc-b1-travel",lang:"FR-ZH",level:"B1",topic:"Travel",topicZh:"旅行",sentences:[
    ["L'été dernier, j'ai pris l'avion pour l'Italie.","去年夏天我坐飞机去了意大利。"],["Nous avons réservé un hôtel en bord de mer.","我们订了一家海边的酒店。"],["La vieille ville était vraiment magnifique.","老城区真的非常漂亮。"],["J'ai pris beaucoup de photos.","我拍了很多照片。"],["La cuisine locale était fantastique.","当地的美食太棒了。"],["Nous avons traversé la Toscane en voiture de location.","我们开租来的车穿越了托斯卡纳。"],["L'année prochaine, je voudrais voyager au Japon.","明年我想去日本旅行。"],["Voyager ouvre l'esprit.","旅行开阔思维。"]
  ]},
  {id:"fc-b1-work",lang:"FR-ZH",level:"B1",topic:"Work",topicZh:"工作与职业",sentences:[
    ["Je travaille dans cette entreprise depuis cinq ans.","我在这家公司工作了五年。"],["Mon patron est strict mais juste.","我的老板很严格但很公正。"],["La semaine prochaine, j'ai un entretien d'embauche.","下周我有一个面试。"],["Les horaires de travail sont de neuf heures à dix-sept heures.","工作时间是九点到五点。"],["Je suis en train de suivre une formation.","我正在参加培训。"],["Le travail en équipe est très important dans notre bureau.","在我们办公室团队合作非常重要。"],["Je voudrais changer de carrière.","我想换一份职业。"],["Un bon CV est très important pour trouver un emploi.","一份好的简历对找工作非常重要。"]
  ]},
  {id:"fc-b1-city",lang:"FR-ZH",level:"B1",topic:"City Life",topicZh:"城市生活",sentences:[
    ["J'habite dans le centre-ville depuis deux ans.","我住在市中心已经两年了。"],["Il y a beaucoup de restaurants dans mon quartier.","我的街区有很多餐厅。"],["Le marché du dimanche est très animé.","星期天的市场非常热闹。"],["La bibliothèque municipale est ouverte jusqu'à vingt heures.","市立图书馆开到晚上八点。"],["Les transports en commun sont très pratiques ici.","这里的公共交通非常方便。"],["Il y a un nouveau parc près de chez moi.","我家附近有一个新公园。"],["Le bruit de la rue me dérange parfois.","街上的噪音有时候打扰我。"],["Je préfère vivre en ville plutôt qu'à la campagne.","比起乡下我更喜欢住在城市。"]
  ]},
  {id:"fc-b2-environment",lang:"FR-ZH",level:"B2",topic:"Environment",topicZh:"环境",sentences:[
    ["Le changement climatique est l'un des plus grands défis de notre époque.","气候变化是我们时代最大的挑战之一。"],["Beaucoup de pays investissent dans les énergies renouvelables.","很多国家正在投资可再生能源。"],["Les déchets plastiques polluent les océans.","塑料垃圾污染了海洋。"],["Chacun peut contribuer à la protection de l'environnement.","每个人都可以为环保做出贡献。"],["De nombreuses villes interdisent désormais les voitures diesel.","很多城市现在禁止柴油车通行。"],["La déforestation des forêts tropicales doit être arrêtée.","必须停止砍伐热带雨林。"],["Vivre durablement signifie consommer de manière plus consciente.","可持续生活意味着更有意识地消费。"],["Le réchauffement climatique provoque des événements météorologiques extrêmes.","全球变暖导致极端天气事件。"]
  ]},
  {id:"fc-b2-culture",lang:"FR-ZH",level:"B2",topic:"Culture",topicZh:"文化与社会",sentences:[
    ["La culture relie les gens au-delà des frontières.","文化跨越国界连接人们。"],["La numérisation transforme notre vie quotidienne.","数字化正在改变我们的日常生活。"],["Dans une société multiculturelle, la tolérance est essentielle.","在多元文化社会中，包容是必不可少的。"],["Les réseaux sociaux ont des avantages et des inconvénients.","社交媒体有优点也有缺点。"],["L'éducation est la clé d'un avenir meilleur.","教育是通往更好未来的钥匙。"],["L'écart entre les riches et les pauvres ne cesse de grandir.","贫富差距在不断扩大。"],["Le bénévolat renforce la cohésion sociale.","志愿工作增强了社会凝聚力。"],["L'art et la musique enrichissent notre vie.","艺术和音乐丰富了我们的生活。"]
  ]},
];

// ============ IN-MEMORY STATE ============
const rooms = {};
const users = {}; // Global user stats: { nickname: { correct, total, words:[], sessions } }

function genCode() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

// ============ SOCKET.IO ============
io.on("connection", (socket) => {
  console.log("+", socket.id);

  // --- Auth ---
  socket.on("set-nickname", (name, cb) => {
    socket.nickname = name;
    if (!users[name]) users[name] = { correct: 0, total: 0, words: [], sessions: 0 };
    cb({ ok: true });
  });

  // --- Library ---
  socket.on("get-library", (cb) => {
    cb(LIBRARY.map(e => ({ id:e.id, lang:e.lang, level:e.level, topic:e.topic, topicZh:e.topicZh, count:e.sentences.length })));
  });

  // --- Leaderboard ---
  socket.on("get-leaderboard", (cb) => {
    const board = Object.entries(users)
      .map(([name, d]) => ({ name, ...d }))
      .filter(u => u.sessions > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 20);
    cb(board);
  });

  // --- Rooms ---
  socket.on("create-room", ({ exerciseId, customSentences }, cb) => {
    let code = genCode();
    while (rooms[code]) code = genCode();

    let sentences, exerciseMeta;
    if (exerciseId) {
      const ex = LIBRARY.find(e => e.id === exerciseId);
      if (!ex) return cb({ error: "Exercise not found" });
      sentences = ex.sentences;
      exerciseMeta = { lang: ex.lang, level: ex.level, topic: ex.topic, topicZh: ex.topicZh };
    } else if (customSentences) {
      sentences = customSentences;
      exerciseMeta = { lang: "Custom", level: "?", topic: "Uploaded", topicZh: "自定义" };
    } else {
      return cb({ error: "No exercise selected" });
    }

    rooms[code] = {
      players: { 1: { id: socket.id, nickname: socket.nickname, ready: false, marks: {} } },
      sentences,
      exerciseMeta,
      phase: "reading", // reading -> practice
      activeIdx: 0,
      u1Val: {}, u2Val: {},
      u1Locked: {}, u2Locked: {},
      revealed: {},
      createdAt: Date.now(),
    };

    socket.join(code);
    socket.roomCode = code;
    socket.playerNum = 1;
    cb({ code, player: 1, sentences, exerciseMeta, phase: "reading" });
    console.log(`Room ${code} by ${socket.nickname}`);
  });

  socket.on("get-rooms", (cb) => {
    const list = Object.entries(rooms)
      .filter(([_, r]) => !r.players[2] && r.phase === "reading")
      .map(([code, r]) => ({
        code,
        creator: r.players[1]?.nickname || "?",
        ...r.exerciseMeta,
        count: r.sentences.length,
      }));
    cb(list);
  });

  socket.on("join-room", (code, cb) => {
    const room = rooms[code];
    if (!room) return cb({ error: "Room not found" });
    if (room.players[2]) return cb({ error: "Room is full" });

    room.players[2] = { id: socket.id, nickname: socket.nickname, ready: false, marks: {} };
    socket.join(code);
    socket.roomCode = code;
    socket.playerNum = 2;

    cb({ code, player: 2, sentences: room.sentences, exerciseMeta: room.exerciseMeta, phase: room.phase });
    io.to(code).emit("player-joined", {
      count: 2,
      p1: room.players[1]?.nickname,
      p2: room.players[2]?.nickname,
    });
    console.log(`Room ${code}: ${socket.nickname} joined`);
  });

  // --- Reading phase: mark words ---
  socket.on("mark-word", ({ sentenceIdx, lang, start, end }) => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    const p = room.players[socket.playerNum];
    if (!p) return;
    const key = `${sentenceIdx}-${lang}`;
    if (!p.marks[key]) p.marks[key] = [];
    // Avoid duplicates
    const exists = p.marks[key].find(m => m.start === start && m.end === end);
    if (!exists) p.marks[key].push({ start, end });
    // Broadcast mark to partner so they see progress
    io.to(socket.roomCode).emit("word-marked", { player: socket.playerNum, sentenceIdx, lang, start, end });
  });

  socket.on("unmark-word", ({ sentenceIdx, lang, start, end }) => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    const p = room.players[socket.playerNum];
    if (!p) return;
    const key = `${sentenceIdx}-${lang}`;
    if (p.marks[key]) {
      p.marks[key] = p.marks[key].filter(m => !(m.start === start && m.end === end));
    }
    io.to(socket.roomCode).emit("word-unmarked", { player: socket.playerNum, sentenceIdx, lang, start, end });
  });

  // --- Ready ---
  socket.on("set-ready", () => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    room.players[socket.playerNum].ready = true;
    io.to(socket.roomCode).emit("player-ready", {
      player: socket.playerNum,
      p1Ready: room.players[1]?.ready,
      p2Ready: room.players[2]?.ready,
    });
  });

  // --- Start practice ---
  socket.on("start-practice", () => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    if (!room.players[1]?.ready || !room.players[2]?.ready) return;

    room.phase = "practice";
    room.activeIdx = 0;
    room.u1Val = {}; room.u2Val = {};
    room.u1Locked = {}; room.u2Locked = {};
    room.revealed = {};

    // Merge marks from both players into blanks per sentence
    // Player 1 marks on langB (their target), Player 2 marks on langA (their target)
    // Actually: each player marks on the language they're LEARNING
    // We send all marks to both players
    const allMarks = {
      1: room.players[1]?.marks || {},
      2: room.players[2]?.marks || {},
    };

    io.to(socket.roomCode).emit("practice-started", {
      sentences: room.sentences,
      allMarks,
      activeIdx: 0,
    });

    // Update session count
    [1, 2].forEach(pn => {
      const nn = room.players[pn]?.nickname;
      if (nn && users[nn]) users[nn].sessions++;
    });
  });

  // --- Practice events (same as before) ---
  socket.on("lock", ({ idx, value }) => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    const p = socket.playerNum;
    if (p === 1) { room.u1Val[idx] = value; room.u1Locked[idx] = true; }
    else { room.u2Val[idx] = value; room.u2Locked[idx] = true; }
    io.to(socket.roomCode).emit("player-locked", {
      player: p, idx, value,
      u1Locked: room.u1Locked, u2Locked: room.u2Locked,
      u1Val: room.u1Val, u2Val: room.u2Val,
    });
  });

  socket.on("reveal", ({ idx }) => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    room.revealed[idx] = true;
    io.to(socket.roomCode).emit("revealed", { idx, revealed: room.revealed });

    // Record stats
    [1, 2].forEach(pn => {
      const nn = room.players[pn]?.nickname;
      if (!nn || !users[nn]) return;
      const val = pn === 1 ? room.u1Val[idx] : room.u2Val[idx];
      // We'd need the answer to check correctness — simplified: just count total
      users[nn].total++;
    });
  });

  socket.on("next", () => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    if (room.activeIdx < room.sentences.length - 1) {
      room.activeIdx++;
      io.to(socket.roomCode).emit("advance", { activeIdx: room.activeIdx });
    }
  });

  socket.on("restart", () => {
    const room = rooms[socket.roomCode];
    if (!room) return;
    room.phase = "reading";
    room.activeIdx = 0;
    room.u1Val = {}; room.u2Val = {};
    room.u1Locked = {}; room.u2Locked = {};
    room.revealed = {};
    if (room.players[1]) { room.players[1].ready = false; room.players[1].marks = {}; }
    if (room.players[2]) { room.players[2].ready = false; room.players[2].marks = {}; }
    io.to(socket.roomCode).emit("restarted", { sentences: room.sentences, exerciseMeta: room.exerciseMeta });
  });

  // --- Disconnect ---
  socket.on("disconnect", () => {
    const code = socket.roomCode;
    if (code && rooms[code]) {
      delete rooms[code].players[socket.playerNum];
      io.to(code).emit("player-left", { player: socket.playerNum });
      const remaining = Object.keys(rooms[code].players).length;
      if (remaining === 0) { delete rooms[code]; console.log(`Room ${code} deleted`); }
    }
    console.log("-", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Tandem v2 on port ${PORT}`));
