const express=require("express"),http=require("http"),{Server}=require("socket.io"),path=require("path");
const app=express(),server=http.createServer(app),io=new Server(server);
app.use(express.static(path.join(__dirname,"public")));

// ===== LANGUAGES =====
const LANGS={EN:"English",ZH:"中文",DE:"Deutsch",FR:"Français",ES:"Español",JA:"日本語",KO:"한국어",PT:"Português",IT:"Italiano",RU:"Русский",AR:"العربية",NL:"Nederlands",TR:"Türkçe",PL:"Polski",VI:"Tiếng Việt",TH:"ไทย"};
const FLAGS={EN:"🇬🇧",ZH:"🇨🇳",DE:"🇩🇪",FR:"🇫🇷",ES:"🇪🇸",JA:"🇯🇵",KO:"🇰🇷",PT:"🇵🇹",IT:"🇮🇹",RU:"🇷🇺",AR:"🇸🇦",NL:"🇳🇱",TR:"🇹🇷",PL:"🇵🇱",VI:"🇻🇳",TH:"🇹🇭"};

// ===== LIBRARY =====
const LIB=[
{id:"gc-a1-daily",lA:"DE",lB:"ZH",level:"A1",topic:"Daily Life",topicB:"日常生活",s:[["Ich stehe um sieben Uhr auf.","我七点起床。"],["Ich frühstücke um halb acht.","我七点半吃早餐。"],["Ich trinke eine Tasse Kaffee.","我喝一杯咖啡。"],["Ich gehe um acht Uhr zur Arbeit.","我八点去上班。"],["Ich esse um zwölf Uhr zu Mittag.","我中午十二点吃午饭。"],["Am Abend koche ich das Abendessen.","晚上我做晚饭。"],["Ich sehe ein bisschen fern.","我看一会儿电视。"],["Ich gehe um elf Uhr ins Bett.","我十一点上床睡觉。"]]},
{id:"gc-a1-food",lA:"DE",lB:"ZH",level:"A1",topic:"Food & Drink",topicB:"饮食",s:[["Ich esse gern Brot mit Butter.","我喜欢吃面包加黄油。"],["Zum Frühstück trinke ich Tee.","早餐我喝茶。"],["Mittags esse ich oft Reis mit Gemüse.","中午我经常吃米饭和蔬菜。"],["Ich mag Äpfel und Bananen.","我喜欢苹果和香蕉。"],["Am Wochenende backe ich einen Kuchen.","周末我烤一个蛋糕。"],["Wasser ist mein Lieblingsgetränk.","水是我最喜欢的饮料。"],["Im Sommer esse ich viel Eis.","夏天我吃很多冰淇淋。"],["Abends trinke ich gern ein Glas Milch.","晚上我喜欢喝一杯牛奶。"]]},
{id:"gc-a1-family",lA:"DE",lB:"ZH",level:"A1",topic:"Family",topicB:"家庭",s:[["Meine Familie ist nicht sehr groß.","我的家庭不是很大。"],["Ich habe einen Bruder und eine Schwester.","我有一个哥哥和一个姐姐。"],["Mein Vater arbeitet in einer Fabrik.","我爸爸在一家工厂工作。"],["Meine Mutter ist Lehrerin.","我妈妈是老师。"],["Mein Bruder studiert an der Universität.","我哥哥在大学读书。"],["Meine Schwester ist noch in der Schule.","我姐姐还在上学。"],["Wir essen jeden Abend zusammen.","我们每天晚上一起吃饭。"],["Am Sonntag besuchen wir die Großeltern.","星期天我们去看爷爷奶奶。"]]},
{id:"gc-a2-shop",lA:"DE",lB:"ZH",level:"A2",topic:"Shopping",topicB:"购物",s:[["Ich gehe heute in den Supermarkt.","我今天去超市。"],["Ich brauche Milch, Eier und Brot.","我需要牛奶、鸡蛋和面包。"],["Die Tomaten kosten zwei Euro pro Kilo.","西红柿两欧元一公斤。"],["Haben Sie das in einer anderen Größe?","你们有其他尺码的吗？"],["Ich möchte mit Karte bezahlen.","我想用卡支付。"],["Der Pullover gefällt mir, aber er ist zu teuer.","我喜欢这件毛衣，但是太贵了。"],["Gibt es heute ein Sonderangebot?","今天有特价吗？"],["Ich nehme zwei Kilo Kartoffeln.","我要两公斤土豆。"]]},
{id:"gc-a2-weather",lA:"DE",lB:"ZH",level:"A2",topic:"Weather",topicB:"天气",s:[["Heute scheint die Sonne.","今天阳光明媚。"],["Es regnet seit drei Tagen.","已经下了三天雨了。"],["Im Winter wird es sehr kalt.","冬天会变得很冷。"],["Der Frühling ist meine Lieblingsjahreszeit.","春天是我最喜欢的季节。"],["Im Herbst fallen die Blätter von den Bäumen.","秋天树叶从树上落下。"],["Im Sommer fahren wir oft ans Meer.","夏天我们经常去海边。"],["Morgen soll es schneien.","明天据说会下雪。"],["Bei schönem Wetter gehe ich spazieren.","天气好的时候我去散步。"]]},
{id:"gc-b1-health",lA:"DE",lB:"ZH",level:"B1",topic:"Health",topicB:"健康",s:[["Ich habe seit gestern Kopfschmerzen.","我从昨天开始头疼。"],["Der Arzt hat mir Medikamente verschrieben.","医生给我开了药。"],["Man sollte mindestens zwei Liter Wasser am Tag trinken.","一天应该至少喝两升水。"],["Regelmäßige Bewegung ist gut für die Gesundheit.","经常运动对健康有好处。"],["Ich versuche, weniger Zucker zu essen.","我尽量少吃糖。"],["Seit ich jeden Morgen jogge, schlafe ich besser.","自从我每天早上跑步以后，我睡得更好了。"],["Stress kann viele Krankheiten verursachen.","压力可以导致很多疾病。"],["Eine ausgewogene Ernährung ist sehr wichtig.","均衡的饮食非常重要。"]]},
{id:"gc-b1-travel",lA:"DE",lB:"ZH",level:"B1",topic:"Travel",topicB:"旅行",s:[["Letzten Sommer bin ich nach Italien geflogen.","去年夏天我坐飞机去了意大利。"],["Wir haben ein Hotel direkt am Strand gebucht.","我们订了一家就在海滩边的酒店。"],["Die Altstadt war wirklich wunderschön.","老城区真的非常漂亮。"],["Ich habe viele Fotos gemacht.","我拍了很多照片。"],["Das Essen dort war fantastisch.","那里的食物太棒了。"],["Wir sind mit einem Mietwagen durch die Toskana gefahren.","我们开租来的车穿越了托斯卡纳。"],["Nächstes Jahr möchte ich nach Japan reisen.","明年我想去日本旅行。"],["Reisen erweitert den Horizont.","旅行开阔视野。"]]},
{id:"gc-b1-work",lA:"DE",lB:"ZH",level:"B1",topic:"Work",topicB:"工作",s:[["Ich arbeite seit fünf Jahren in dieser Firma.","我在这家公司工作了五年。"],["Mein Chef ist streng, aber fair.","我的老板很严格，但很公正。"],["Nächste Woche habe ich ein Vorstellungsgespräch.","下周我有一个面试。"],["Die Arbeitszeiten sind von neun bis fünf.","工作时间是九点到五点。"],["Ich mache gerade eine Weiterbildung.","我正在参加进修培训。"],["Teamarbeit ist in unserem Büro sehr wichtig.","在我们办公室团队合作非常重要。"],["Ich möchte mich beruflich verändern.","我想在职业上做出改变。"],["Ein guter Lebenslauf ist sehr wichtig.","一份好的简历非常重要。"]]},
{id:"gc-b2-env",lA:"DE",lB:"ZH",level:"B2",topic:"Environment",topicB:"环境",s:[["Der Klimawandel ist eine der größten Herausforderungen unserer Zeit.","气候变化是我们时代最大的挑战之一。"],["Viele Länder setzen auf erneuerbare Energien.","很多国家正在发展可再生能源。"],["Plastikmüll verschmutzt die Ozeane.","塑料垃圾污染了海洋。"],["Jeder Einzelne kann zum Umweltschutz beitragen.","每个人都可以为环保做出贡献。"],["Die Abholzung der Regenwälder muss gestoppt werden.","必须停止砍伐热带雨林。"],["Nachhaltig leben bedeutet, bewusster zu konsumieren.","可持续生活意味着更有意识地消费。"]]},
// FRENCH-CHINESE
{id:"fc-a1-daily",lA:"FR",lB:"ZH",level:"A1",topic:"Daily Life",topicB:"日常生活",s:[["Je me lève à sept heures.","我七点起床。"],["Je prends le petit déjeuner à huit heures.","我八点吃早餐。"],["Je bois un café avec du lait.","我喝一杯加牛奶的咖啡。"],["Je vais au travail en métro.","我坐地铁去上班。"],["Je déjeune à midi avec mes collègues.","我中午和同事一起吃午饭。"],["Le soir, je prépare le dîner.","晚上我准备晚饭。"],["Je regarde un peu la télévision.","我看一会儿电视。"],["Je me couche vers onze heures.","我大约十一点睡觉。"]]},
{id:"fc-a1-food",lA:"FR",lB:"ZH",level:"A1",topic:"Food & Drink",topicB:"饮食",s:[["Je mange du pain et du beurre le matin.","我早上吃面包和黄油。"],["Je bois du thé vert tous les jours.","我每天喝绿茶。"],["À midi, je mange du riz avec des légumes.","中午我吃米饭和蔬菜。"],["J'aime beaucoup les pommes et les oranges.","我很喜欢苹果和橙子。"],["Le dimanche, je fais un gâteau au chocolat.","星期天我做一个巧克力蛋糕。"],["L'eau est ma boisson préférée.","水是我最喜欢的饮料。"],["En été, je mange beaucoup de glaces.","夏天我吃很多冰淇淋。"],["Le soir, je bois un verre de lait chaud.","晚上我喝一杯热牛奶。"]]},
{id:"fc-a1-family",lA:"FR",lB:"ZH",level:"A1",topic:"Family",topicB:"家庭",s:[["Ma famille n'est pas très grande.","我的家庭不是很大。"],["J'ai un frère et une sœur.","我有一个哥哥和一个姐姐。"],["Mon père travaille dans une usine.","我爸爸在一家工厂工作。"],["Ma mère est professeur.","我妈妈是老师。"],["Mon frère étudie à l'université.","我哥哥在大学读书。"],["Ma sœur est encore au lycée.","我姐姐还在上高中。"],["Nous dînons ensemble tous les soirs.","我们每天晚上一起吃饭。"],["Le dimanche, nous rendons visite à nos grands-parents.","星期天我们去看爷爷奶奶。"]]},
{id:"fc-a2-shop",lA:"FR",lB:"ZH",level:"A2",topic:"Shopping",topicB:"购物",s:[["Je vais au supermarché cet après-midi.","我今天下午去超市。"],["J'ai besoin de lait, d'œufs et de pain.","我需要牛奶、鸡蛋和面包。"],["Les tomates coûtent deux euros le kilo.","西红柿两欧元一公斤。"],["Avez-vous ça dans une autre taille ?","你们有其他尺码的吗？"],["Je voudrais payer par carte.","我想用卡支付。"],["Ce pull me plaît, mais il est trop cher.","我喜欢这件毛衣，但是太贵了。"],["Il y a des promotions aujourd'hui ?","今天有促销吗？"],["Je prends deux kilos de pommes de terre.","我要两公斤土豆。"]]},
{id:"fc-a2-weather",lA:"FR",lB:"ZH",level:"A2",topic:"Weather",topicB:"天气",s:[["Aujourd'hui il fait beau, le soleil brille.","今天天气好，阳光明媚。"],["Il pleut depuis trois jours.","已经下了三天雨了。"],["En hiver, il fait très froid.","冬天非常冷。"],["Le printemps est ma saison préférée.","春天是我最喜欢的季节。"],["En automne, les feuilles tombent des arbres.","秋天树叶从树上落下。"],["En été, nous allons souvent à la mer.","夏天我们经常去海边。"],["Demain, il va neiger.","明天会下雪。"],["Quand il fait beau, je me promène dans le parc.","天气好的时候我在公园散步。"]]},
{id:"fc-b1-health",lA:"FR",lB:"ZH",level:"B1",topic:"Health",topicB:"健康",s:[["J'ai mal à la tête depuis hier.","我从昨天开始头疼。"],["Le médecin m'a prescrit des médicaments.","医生给我开了药。"],["Il faut boire au moins deux litres d'eau par jour.","一天应该至少喝两升水。"],["L'exercice régulier est bon pour la santé.","经常运动对健康有好处。"],["J'essaie de manger moins de sucre.","我尽量少吃糖。"],["Depuis que je fais du jogging chaque matin, je dors mieux.","自从我每天早上跑步以后，我睡得更好了。"],["Le stress peut causer beaucoup de maladies.","压力可以导致很多疾病。"],["Une alimentation équilibrée est très importante.","均衡的饮食非常重要。"]]},
{id:"fc-b1-travel",lA:"FR",lB:"ZH",level:"B1",topic:"Travel",topicB:"旅行",s:[["L'été dernier, j'ai pris l'avion pour l'Italie.","去年夏天我坐飞机去了意大利。"],["Nous avons réservé un hôtel en bord de mer.","我们订了一家海边的酒店。"],["La vieille ville était vraiment magnifique.","老城区真的非常漂亮。"],["J'ai pris beaucoup de photos.","我拍了很多照片。"],["La cuisine locale était fantastique.","当地的美食太棒了。"],["Nous avons traversé la Toscane en voiture de location.","我们开租来的车穿越了托斯卡纳。"],["L'année prochaine, je voudrais voyager au Japon.","明年我想去日本旅行。"],["Voyager ouvre l'esprit.","旅行开阔思维。"]]},
{id:"fc-b1-work",lA:"FR",lB:"ZH",level:"B1",topic:"Work",topicB:"工作",s:[["Je travaille dans cette entreprise depuis cinq ans.","我在这家公司工作了五年。"],["Mon patron est strict mais juste.","我的老板很严格但很公正。"],["La semaine prochaine, j'ai un entretien d'embauche.","下周我有一个面试。"],["Les horaires de travail sont de neuf heures à dix-sept heures.","工作时间是九点到五点。"],["Je suis en train de suivre une formation.","我正在参加培训。"],["Le travail en équipe est très important dans notre bureau.","在我们办公室团队合作非常重要。"],["Je voudrais changer de carrière.","我想换一份职业。"],["Un bon CV est très important pour trouver un emploi.","一份好的简历对找工作非常重要。"]]},
{id:"fc-b2-env",lA:"FR",lB:"ZH",level:"B2",topic:"Environment",topicB:"环境",s:[["Le changement climatique est l'un des plus grands défis de notre époque.","气候变化是我们时代最大的挑战之一。"],["Beaucoup de pays investissent dans les énergies renouvelables.","很多国家正在投资可再生能源。"],["Les déchets plastiques polluent les océans.","塑料垃圾污染了海洋。"],["Chacun peut contribuer à la protection de l'environnement.","每个人都可以为环保做出贡献。"],["Vivre durablement signifie consommer de manière plus consciente.","可持续生活意味着更有意识地消费。"],["Le réchauffement climatique provoque des événements météorologiques extrêmes.","全球变暖导致极端天气事件。"]]},
{id:"fc-b2-culture",lA:"FR",lB:"ZH",level:"B2",topic:"Culture",topicB:"文化",s:[["La culture relie les gens au-delà des frontières.","文化跨越国界连接人们。"],["La numérisation transforme notre vie quotidienne.","数字化正在改变我们的日常生活。"],["Dans une société multiculturelle, la tolérance est essentielle.","在多元文化社会中，包容是必不可少的。"],["Les réseaux sociaux ont des avantages et des inconvénients.","社交媒体有优点也有缺点。"],["L'éducation est la clé d'un avenir meilleur.","教育是通往更好未来的钥匙。"],["L'art et la musique enrichissent notre vie.","艺术和音乐丰富了我们的生活。"]]},
];

// ===== STATE =====
const rooms={},users={};
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<4;i++)s+=c[Math.floor(Math.random()*c.length)];return s}

// Tokenize for duel keyword matching
function tokenize(text){
  // Chinese: extract 2-3 char sequences; Latin: split by space, filter stopwords
  const cjk=text.match(/[\u4e00-\u9fff]{2,}/g)||[];
  const lat=text.replace(/[\u4e00-\u9fff]/g,' ').replace(/[.,!?;:'"()，。！？、；：""''（）]/g,' ').split(/\s+/).filter(w=>w.length>=3);
  const stop=new Set(["the","a","an","is","are","was","were","in","on","at","to","of","and","or","for","with","that","this","les","des","une","est","dans","pour","avec","que","qui","der","die","das","ein","eine","ist","und","mit","von","für"]);
  return[...cjk,...lat.filter(w=>!stop.has(w.toLowerCase()))];
}

function scoreKeywords(answer,reference){
  const refTokens=tokenize(reference);
  const ansLower=answer.toLowerCase();
  let matched=0;
  refTokens.forEach(t=>{if(ansLower.includes(t.toLowerCase()))matched++});
  const exact=answer.trim().toLowerCase()===reference.trim().toLowerCase();
  return{matched,total:refTokens.length,exact,score:matched*2+(exact?10:0)};
}

// ===== SOCKET =====
io.on("connection",socket=>{
  console.log("+",socket.id);

  socket.on("set-profile",(data,cb)=>{
    socket.nickname=data.nickname;
    socket.speaks=data.speaks||[];
    socket.learning=data.learning||[];
    if(!users[data.nickname])users[data.nickname]={correct:0,total:0,sessions:0,duelWins:0,duelPlayed:0};
    cb({ok:true});
  });

  socket.on("get-langs",cb=>cb({LANGS,FLAGS}));
  socket.on("get-library",cb=>cb(LIB.map(e=>({id:e.id,lA:e.lA,lB:e.lB,level:e.level,topic:e.topic,topicB:e.topicB,count:e.s.length}))));

  socket.on("get-leaderboard",cb=>{
    const b=Object.entries(users).map(([n,d])=>({name:n,...d})).filter(u=>u.sessions>0).sort((a,b)=>b.total-a.total).slice(0,20);
    cb(b);
  });

  // ===== TANDEM ROOM =====
  socket.on("create-room",({exerciseId,customSentences,mode,myLearning},cb)=>{
    let code=genCode();while(rooms[code])code=genCode();
    let sents,meta;
    if(exerciseId){
      const ex=LIB.find(e=>e.id===exerciseId);
      if(!ex)return cb({error:"Not found"});
      sents=ex.s;meta={lA:ex.lA,lB:ex.lB,level:ex.level,topic:ex.topic,topicB:ex.topicB};
    }else if(customSentences){
      sents=customSentences;meta={lA:"??",lB:"??",level:"?",topic:"Custom",topicB:"自定义"};
    }else return cb({error:"No exercise"});

    rooms[code]={
      mode:mode||"tandem", // "tandem" or "duel"
      players:{1:{id:socket.id,nn:socket.nickname,ready:false,marks:{},learning:myLearning||""}},
      sents,meta,
      phase:"reading", activeIdx:0,
      // Tandem vals: u1Vals[sentIdx]=[val1,val2,...], u2Vals[sentIdx]=[val1,val2,...]
      u1Vals:{},u2Vals:{},u1Locked:{},u2Locked:{},revealed:{},
      // Duel specific
      duelTimer:null,duelScores:{1:0,2:0},duelAnswers:{},
      readMode:"lines", // "lines" or "paragraph"
    };
    socket.join(code);socket.roomCode=code;socket.playerNum=1;
    cb({code,player:1,sents,meta,phase:"reading",mode:mode||"tandem",readMode:"lines"});
  });

  socket.on("set-read-mode",mode=>{
    const r=rooms[socket.roomCode];if(r)r.readMode=mode;
    io.to(socket.roomCode).emit("read-mode-changed",mode);
  });

  socket.on("get-rooms",cb=>{
    const list=Object.entries(rooms).filter(([_,r])=>!r.players[2]&&r.phase==="reading").map(([code,r])=>({
      code,creator:r.players[1]?.nn||"?",mode:r.mode,...r.meta,count:r.sents.length,
      creatorLearning:r.players[1]?.learning||"",
    }));
    cb(list);
  });

  socket.on("join-room",(code,{myLearning},cb)=>{
    const r=rooms[code];
    if(!r)return cb({error:"Not found"});
    if(r.players[2])return cb({error:"Full"});
    r.players[2]={id:socket.id,nn:socket.nickname,ready:false,marks:{},learning:myLearning||""};
    socket.join(code);socket.roomCode=code;socket.playerNum=2;
    cb({code,player:2,sents:r.sents,meta:r.meta,phase:r.phase,mode:r.mode,readMode:r.readMode});
    io.to(code).emit("player-joined",{p1:r.players[1]?.nn,p2:r.players[2]?.nn,p1Learning:r.players[1]?.learning,p2Learning:r.players[2]?.learning});
  });

  // ===== MARKING =====
  socket.on("mark-word",d=>{
    const r=rooms[socket.roomCode];if(!r)return;
    const p=r.players[socket.playerNum];if(!p)return;
    const k=d.sentenceIdx+"-"+d.lang;
    if(!p.marks[k])p.marks[k]=[];
    if(!p.marks[k].find(m=>m.s===d.start&&m.e===d.end))p.marks[k].push({s:d.start,e:d.end});
    io.to(socket.roomCode).emit("word-marked",{player:socket.playerNum,...d});
  });

  socket.on("unmark-word",d=>{
    const r=rooms[socket.roomCode];if(!r)return;
    const p=r.players[socket.playerNum];if(!p)return;
    const k=d.sentenceIdx+"-"+d.lang;
    if(p.marks[k])p.marks[k]=p.marks[k].filter(m=>!(m.s===d.start&&m.e===d.end));
    io.to(socket.roomCode).emit("word-unmarked",{player:socket.playerNum,...d});
  });

  // ===== READY / START =====
  socket.on("set-ready",()=>{
    const r=rooms[socket.roomCode];if(!r)return;
    r.players[socket.playerNum].ready=true;
    io.to(socket.roomCode).emit("player-ready",{player:socket.playerNum,p1Ready:r.players[1]?.ready,p2Ready:r.players[2]?.ready});
  });

  socket.on("start-practice",()=>{
    const r=rooms[socket.roomCode];if(!r)return;
    if(!r.players[1]?.ready||!r.players[2]?.ready)return;
    r.phase=r.mode==="duel"?"duel":"practice";
    r.activeIdx=0;r.u1Vals={};r.u2Vals={};r.u1Locked={};r.u2Locked={};r.revealed={};
    r.duelScores={1:0,2:0};r.duelAnswers={};
    const marks={1:r.players[1]?.marks||{},2:r.players[2]?.marks||{}};
    io.to(socket.roomCode).emit("practice-started",{sents:r.sents,marks,activeIdx:0,mode:r.mode});
    [1,2].forEach(pn=>{const nn=r.players[pn]?.nn;if(nn&&users[nn])users[nn].sessions++});
    // Duel timer
    if(r.mode==="duel")startDuelTimer(socket.roomCode);
  });

  // ===== TANDEM: LOCK (multi-value) =====
  socket.on("lock",({idx,values})=>{
    const r=rooms[socket.roomCode];if(!r)return;
    const p=socket.playerNum;
    if(p===1){r.u1Vals[idx]=values;r.u1Locked[idx]=true}
    else{r.u2Vals[idx]=values;r.u2Locked[idx]=true}
    io.to(socket.roomCode).emit("player-locked",{player:p,idx,values,u1Locked:r.u1Locked,u2Locked:r.u2Locked,u1Vals:r.u1Vals,u2Vals:r.u2Vals});
  });

  socket.on("reveal",({idx})=>{
    const r=rooms[socket.roomCode];if(!r)return;
    r.revealed[idx]=true;
    io.to(socket.roomCode).emit("revealed",{idx,revealed:r.revealed});
    [1,2].forEach(pn=>{const nn=r.players[pn]?.nn;if(nn&&users[nn])users[nn].total++});
  });

  socket.on("next",()=>{
    const r=rooms[socket.roomCode];if(!r)return;
    if(r.activeIdx<r.sents.length-1){r.activeIdx++;io.to(socket.roomCode).emit("advance",{activeIdx:r.activeIdx})}
    if(r.mode==="duel")startDuelTimer(socket.roomCode);
  });

  // ===== DUEL: SUBMIT TRANSLATION =====
  socket.on("duel-submit",({idx,answer})=>{
    const r=rooms[socket.roomCode];if(!r||r.mode!=="duel")return;
    const p=socket.playerNum;
    if(!r.duelAnswers[idx])r.duelAnswers[idx]={};
    r.duelAnswers[idx][p]={answer,time:Date.now()};
    // Check if both submitted
    const da=r.duelAnswers[idx];
    if(da[1]&&da[2]){
      clearTimeout(r.duelTimer);
      // Score
      const ref=r.sents[idx]; // [langA, langB]
      // Determine which is the target language text (reference answer)
      // In duel, both learn the same target. The source shown is the other language.
      // Player's learning lang determines which index is the answer
      const p1Lang=r.players[1]?.learning;
      const refIdx=p1Lang===r.meta.lA?0:1; // index of target language in pair
      const refText=ref[refIdx];
      const s1=scoreKeywords(da[1].answer,refText);
      const s2=scoreKeywords(da[2].answer,refText);
      // Time bonus
      const t1=da[1].time,t2=da[2].time;
      const faster=t1<=t2?1:2;
      if(faster===1)s1.score+=3;else s2.score+=3;
      r.duelScores[1]+=s1.score;r.duelScores[2]+=s2.score;
      io.to(socket.roomCode).emit("duel-result",{idx,answers:{1:da[1].answer,2:da[2].answer},scores:{1:s1,2:s2},totalScores:r.duelScores,reference:refText});
    }else{
      // Notify partner that one submitted
      io.to(socket.roomCode).emit("duel-waiting",{player:p,idx});
    }
  });

  socket.on("restart",()=>{
    const r=rooms[socket.roomCode];if(!r)return;
    r.phase="reading";r.activeIdx=0;r.u1Vals={};r.u2Vals={};r.u1Locked={};r.u2Locked={};r.revealed={};
    r.duelScores={1:0,2:0};r.duelAnswers={};
    if(r.players[1]){r.players[1].ready=false;r.players[1].marks={}}
    if(r.players[2]){r.players[2].ready=false;r.players[2].marks={}}
    io.to(socket.roomCode).emit("restarted",{sents:r.sents,meta:r.meta});
  });

  socket.on("disconnect",()=>{
    const code=socket.roomCode;
    if(code&&rooms[code]){
      delete rooms[code].players[socket.playerNum];
      io.to(code).emit("player-left",{player:socket.playerNum});
      if(!rooms[code].players[1]&&!rooms[code].players[2]){delete rooms[code]}
    }
  });
});

function startDuelTimer(code){
  const r=rooms[code];if(!r)return;
  clearTimeout(r.duelTimer);
  r.duelTimer=setTimeout(()=>{
    // Auto-submit empty for anyone who hasn't submitted
    const idx=r.activeIdx;
    if(!r.duelAnswers[idx])r.duelAnswers[idx]={};
    if(!r.duelAnswers[idx][1])r.duelAnswers[idx][1]={answer:"",time:Date.now()};
    if(!r.duelAnswers[idx][2])r.duelAnswers[idx][2]={answer:"",time:Date.now()};
    // Trigger scoring
    const ref=r.sents[idx];
    const p1Lang=r.players[1]?.learning;
    const refIdx=p1Lang===r.meta.lA?0:1;
    const refText=ref[refIdx];
    const da=r.duelAnswers[idx];
    const s1=scoreKeywords(da[1].answer,refText);
    const s2=scoreKeywords(da[2].answer,refText);
    r.duelScores[1]+=s1.score;r.duelScores[2]+=s2.score;
    io.to(code).emit("duel-result",{idx,answers:{1:da[1].answer,2:da[2].answer},scores:{1:s1,2:s2},totalScores:r.duelScores,reference:refText});
  },45000);
}

const PORT=process.env.PORT||3000;
server.listen(PORT,()=>console.log(`Tandem v3 on port ${PORT}`));
