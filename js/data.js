/* 行程数据：土耳其 TR、希腊 GR、路线节点 NODES */
const TR = [
      {
            id: "d6", d: 6, w: "周五", t: "悉尼（Sydney）- 阿布扎比（Abu Dhabi）",
            img: [["Sydney Airport", "悉尼机场（Sydney Airport, SYD）"], ["Sydney", "悉尼（Sydney）"], ["Istanbul Airport", "伊斯坦布尔机场（İstanbul Havalimanı, IST）"]],
            plan: [["白天", "收拾行李，6 人 6 个大箱先称一遍"], ["18:30", "SYD T1 办票、托运"], ["21:30", "✈ EY455 悉尼 → 阿布扎比"]],
            redeye: "机上（EY455 悉尼 → 阿布扎比）"
      },
      {
            id: "d7", d: 7, w: "周六", t: "阿布扎比（Abu Dhabi）- 伊斯坦布尔（Istanbul）",
            img: [["Hagia Sophia", "圣索菲亚大教堂（Ayasofya）"], ["Sultan Ahmed Mosque", "蓝色清真寺（Sultanahmet Camii）"], ["Hippodrome of Constantinople", "竞技场（Hippodrome / At Meydanı）"]],
            plan: [["08:45", "✈ EY541 阿布扎比 → 伊斯坦布尔"], ["12:50", "落地 IST，到老城酒店寄存行李"], ["15:00", "圣索菲亚（Ayasofya）"], ["16:30", "蓝色清真寺、竞技场（Hippodrome），日落约 17:50"]],
            stay: "伊斯坦布尔（Istanbul）"
      },
      {
            id: "d8", d: 8, w: "周日", t: "伊斯坦布尔（Istanbul）",
            img: [["Bosphorus", "博斯普鲁斯海峡（Boğaziçi）", { src: "images/11-08/Bosphorus-Klook.jpg", credit: "Klook" }], ["Dolmabahçe Palace", "多尔玛巴赫切宫（Dolmabahçe Sarayı）"], ["Galata Tower", "加拉塔塔（Galata Kulesi）"]],
            plan: [["上午", "海峡游船"], ["下午", "多尔玛巴赫切宫、奥塔科伊（Ortaköy）"], ["傍晚", "加拉塔塔、卡拉科伊（Karaköy）"]],
            stay: "伊斯坦布尔（Istanbul）"
      },
      {
            id: "d9", d: 9, w: "周一", t: "伊斯坦布尔（Istanbul）· 老城与市集",
            img: [["Topkapı Palace", "托普卡帕宫（Topkapı Sarayı）"], ["Basilica Cistern", "地下水宫（Yerebatan Sarnıcı）"], ["Grand Bazaar, Istanbul", "大巴扎（Kapalıçarşı）"], ["Süleymaniye Mosque", "苏莱曼尼耶清真寺（Süleymaniye Camii）"]],
            plan: [["上午", "托普卡帕宫、地下水宫（Yerebatan Sarnıcı）"], ["中午", "埃米诺努（Eminönü）午餐"], ["下午", "大巴扎、香料市场（Mısır Çarşısı）、苏莱曼尼耶清真寺"], ["傍晚", "金角湾（Haliç）"]],
            stay: "伊斯坦布尔（Istanbul）"
      },
      {
            id: "d10", d: 10, w: "周二", t: "伊斯坦布尔（Istanbul）- 卡帕多奇亚（Kapadokya）",
            img: [["Uçhisar", "乌奇希萨尔城堡（Uçhisar Kalesi）"], ["Göreme", "格雷梅小镇（Göreme）"], ["Fairy chimney", "精灵烟囱（Peribacaları）"]],
            plan: [["上午", "✈ 伊斯坦布尔 → ASR / NAV"], ["下午", "入住格雷梅（Göreme）或乌奇希萨尔（Uçhisar）"], ["傍晚", "观景点看日落"]],
            stay: "卡帕多奇亚（Kapadokya）"
      },
      {
            id: "d11", d: 11, w: "周三", t: "卡帕多奇亚（Kapadokya）· 热气球日出",
            img: [["Cappadocia", "热气球与岩谷"], ["Göreme Open Air Museum", "格雷梅露天博物馆（Göreme Açık Hava Müzesi）"], ["Göreme National Park", "格雷梅国家公园（Göreme Milli Parkı）"]],
            plan: [["日出", "观景点拍热气球（不乘坐）"], ["上午", "格雷梅露天博物馆"], ["下午", "乌奇希萨尔（Uçhisar）、帕夏贝（Paşabağ）、泽尔韦（Zelve）选 2–3 个"]],
            stay: "卡帕多奇亚（Kapadokya）"
      },
      {
            id: "d12", d: 12, w: "周四", t: "卡帕多奇亚（Kapadokya）- 伊斯坦布尔（Istanbul）- 恰纳卡莱（Çanakkale）",
            img: [["1915 Çanakkale Bridge", "1915 恰纳卡莱大桥（1915 Çanakkale Köprüsü）"], ["Istanbul Airport", "伊斯坦布尔机场（İstanbul Havalimanı, IST）"], ["Çanakkale", "恰纳卡莱海滨的特洛伊木马（Trojan Horse, Çanakkale）", { src: "images/trojan-horse.webp", credit: "Klook" }]],
            plan: [["上午", "✈ 回 IST，机场取车"], ["下午", "🚗 IST → 恰纳卡莱，约 3.5 小时"], ["晚上", "海滨散步、晚餐"]],
            stay: "恰纳卡莱（Çanakkale）"
      },
      {
            id: "d13", d: 13, w: "周五", t: "特洛伊（Troy）- 帕加马（Pergamon）- 伊兹密尔（İzmir）",
            img: [["Troy", "特洛伊遗址（Troya）"], ["Troy Museum", "特洛伊博物馆（Troya Müzesi）"], ["Pergamon", "帕加马卫城（Pergamon Akropolisi）"]],
            plan: [["上午", "🚗 恰纳卡莱 → 特洛伊，约 30 分钟；遗址 + 博物馆"], ["下午", "🚗 到贝尔加马（Bergama），约 2.5–3 小时；帕加马卫城"], ["晚上", "🚗 到伊兹密尔（İzmir），约 1.5 小时"]],
            tip: "全程最累的一天，有时间增加 Asklepion", stay: "伊兹密尔（İzmir）"
      },
      {
            id: "d14", d: 14, w: "周六", t: "伊兹密尔（İzmir）· 以弗所（Ephesus）一日游",
            img: [["Library of Celsus", "塞尔苏斯图书馆（Library of Celsus）"], ["Ephesus", "以弗所古城（Efes）"], ["Şirince", "希林杰村（Şirince）"]],
            plan: [["上午", "🚗 伊兹密尔 → 塞尔丘克（Selçuk），约 1 小时"], ["白天", "塞尔苏斯图书馆、大剧场（Great Theatre）、库雷特斯街（Curetes Street）"], ["下午", "可选：以弗所博物馆（Efes Müzesi）、阿尔忒弥斯神庙（Temple of Artemis）、希林杰（Şirince）"]],
            stay: "伊兹密尔（İzmir）"
      },
      {
            id: "d15", d: 15, w: "周日", t: "伊兹密尔（İzmir）- 雅典（Athens）",
            img: [["İzmir Clock Tower", "科纳克钟楼（İzmir Saat Kulesi）"], ["İzmir", "科尔顿海滨（Kordon）"], ["Kemeraltı", "凯梅拉尔特市集（Kemeraltı）"]],
            plan: [["上午", "科尔顿海滨（Kordon）、科纳克钟楼（Konak）、凯梅拉尔特（Kemeraltı）"], ["下午", "ADB 机场还车"], ["晚上", "✈ 20:40 伊兹密尔 → 雅典（直飞）"]],
            note: ["ADB → ATH 直飞，20:40 起飞 / 20:40 落地——飞行约 1 小时，土耳其比希腊早 1 小时，所以钟点看着没动。白天逛科尔顿和凯梅拉尔特，下午还车，取完行李 21:30 前后进雅典市区。",
                  "这是方案 A 的走法。方案 B 改成 11-15 从卡帕多奇亚经伊斯坦布尔飞，下午两点多就到雅典。"],
            link: { u: "https://www.google.com/travel/flights/s/Vc783tRJRwLQjHXi7", t: "参考航班（Aegean 直飞）" },
            stay: "雅典（Athens）"
      }
];
const GR = [
      {
            id: "d16", d: 16, w: "周一", t: "雅典（Athens）· 卫城",
            img: [["Parthenon", "帕特农神庙（Parthenon）"], ["Acropolis Museum", "卫城博物馆内部（Inside the Acropolis Museum）", { src: "images/arc-mesuem.webp", credit: "Marco Argüello for Lonely Planet" }], ["Temple of Hephaestus", "赫菲斯托斯神庙（Temple of Hephaestus）"]],
            plan: [["上午", "卫城：帕特农、伊瑞克提翁神庙（Erechtheion）"], ["下午", "卫城博物馆 → 古市集（Ancient Agora）"], ["傍晚", "普拉卡（Plaka）、莫纳斯提拉基（Monastiraki）"]],
            stay: "雅典（Athens）"
      },
      {
            id: "d17", d: 17, w: "周二", t: "雅典（Athens）· 自由日",
            img: [["Panathenaic Stadium", "帕纳辛奈克体育场（Panathenaic Stadium）"], ["National Archaeological Museum, Athens", "国家考古博物馆（National Archaeological Museum）"], ["Mount Lycabettus", "利卡维多斯山（Lycabettus）"]],
            plan: [["白天", "国家考古博物馆或帕纳辛奈克体育场"], ["傍晚", "利卡维多斯山看日落"], ["晚上", "准备自驾"]],
            stay: "雅典（Athens）"
      },
      {
            id: "d18", d: 18, w: "周三", t: "雅典（Athens）- 德尔斐（Delphi）",
            img: [["Delphi", "德尔斐遗址（Delphi）"], ["Temple of Apollo (Delphi)", "阿波罗神庙（Temple of Apollo）"], ["Tholos of Delphi", "雅典娜圣域圆形神殿（Tholos）"]],
            plan: [["上午", "雅典取车，🚗 约 2.5 小时"], ["下午", "阿波罗神庙、古剧场（Ancient Theatre）、雅典娜圣域（Athena Pronaia）"], ["另", "德尔斐考古博物馆（Delphi Archaeological Museum）"]],
            stay: "德尔斐（Delphi）"
      },
      {
            id: "d19", d: 19, w: "周四", t: "德尔斐（Delphi）- 约阿尼纳（Ioannina）",
            img: [["Ioannina", "约阿尼纳（Ioannina）"], ["Lake Pamvotida", "帕姆沃蒂斯湖（Lake Pamvotida）"], ["Ioannina Castle", "约阿尼纳城堡（Ioannina Castle）"], ["Zagori", "扎戈里山区（Zagori / Ζαγόρι）"]],
            plan: [["上午", "🚗 约 4–4.5 小时"], ["下午", "湖畔"], ["傍晚", "城堡与老城"]],
            note: ["住宿可换成扎戈里（Zagori）的石屋民宿——莫诺登德里、维察、阿里斯提一带，离约阿尼纳 45–75 分钟，第二天早上省一趟往返。",
                  "代价：湖畔和城堡压到 13:30–15:15，趁天亮上山（日落 17:15）。6 人要 3 间房，淡季民宿常歇业，先订并确认开门。"],
            stay: "约阿尼纳（Ioannina），或扎戈里山间民宿"
      },
      {
            id: "d20", d: 20, w: "周五", t: "约阿尼纳（Ioannina）- 迈泰奥拉（Meteora）",
            img: [["Meteora", "迈泰奥拉（Meteora）"], ["Vikos Gorge", "维科斯峡谷（Vikos Gorge）"], ["Kastraki", "卡斯特拉基村（Kastraki）"], ["Kalabaka", "卡兰巴卡（Kalabaka）"]],
            plan: [["上午", "🚗 扎戈里（Zagori）山区半日，或约阿尼纳补充"], ["中午", "🚗 约 2 小时到卡斯特拉基（Kastraki）"], ["傍晚", "观景点看日落"]],
            note: ["半日线：约阿尼纳 8:00 出发 → 莫诺登德里（Monodendri）50 分钟 → 维科斯峡谷 Oxya 观景台 + Agia Paraskevi 修道院 1–1.5 小时 → 顺路看基皮（Kipoi）石拱桥 → 14:00 前后到卡斯特拉基。",
                  "不算回头路：上下山的路口（Karyes）就在去迈泰奥拉的 A2 上，只比直接开多 20 分钟。帕皮戈和弗拉德托台阶要整天，这趟放不下；11 月高处可能结冰。"],
            stay: "卡斯特拉基（Kastraki）"
      },
      {
            id: "d21", d: 21, w: "周六", t: "迈泰奥拉（Meteora）- 雅典（Athens）",
            img: [["Monastery of Great Meteoron", "大迈泰奥拉修道院（Great Meteoron）"], ["Monastery of Varlaam", "瓦尔拉姆修道院（Varlaam）"], ["Monastery of Rousanou", "鲁萨努修道院（Roussanou）"]],
            plan: [["上午", "选 2–3 座修道院"], ["下午", "🚗 约 4–4.5 小时回雅典"], ["晚上", "还车"]],
            tip: "11 月修道院开放日临近出发再确认", stay: "雅典（Athens）"
      },
      {
            id: "d22", d: 22, w: "周日", t: "雅典（Athens）- 悉尼（Sydney）",
            img: [["Plaka", "普拉卡老街（Plaka）"], ["Syntagma Square", "宪法广场（Syntagma Square）"], ["Athens International Airport", "雅典机场（Athens Intl., ATH）"]],
            plan: [["09:30", "早餐后离开酒店去 ATH"], ["13:05", "✈ EY190 雅典 → 阿布扎比"], ["21:05", "✈ EY454 阿布扎比 → 悉尼，11-23 17:45 落地"]],
            note: ["回程在阿布扎比只停 1 小时 30 分（去程停 3 小时 45 分）。行李直挂悉尼，但 EY190 一旦延误这段就很紧，登机口之间别耽搁。"],
            redeye: "机上（EY454 阿布扎比 → 悉尼）"
      }
];
/* 待定/讨论点：c 决定日期标签配色（tr / gr），to 是跳转到的那天，opts 是可选的方案对比 */
/* 方案 B 的土耳其段：11-6 出发与伊斯坦布尔 3 晚（d6–d9）两方案共用，
   这里只列 11-10 起的差异——先取车南下走完特洛伊与以弗所，最后飞卡帕多奇亚收尾。 */
const TR_B = [
      {
            id: "b10", d: 10, w: "周二", t: "伊斯坦布尔（Istanbul）- 恰纳卡莱（Çanakkale）",
            img: [["Istanbul Airport", "伊斯坦布尔机场（İstanbul Havalimanı, IST）"], ["1915 Çanakkale Bridge", "1915 恰纳卡莱大桥（1915 Çanakkale Köprüsü）"], ["Çanakkale", "恰纳卡莱海滨的特洛伊木马（Trojan Horse, Çanakkale）", { src: "images/trojan-horse.webp", credit: "Klook" }]],
            plan: [["上午", "IST 机场取车"], ["下午", "🚗 IST → 恰纳卡莱，约 3.5 小时"], ["晚上", "海滨散步、晚餐"]],
            note: ["比 A 方案早两天取车，省掉「飞卡帕多奇亚再飞回伊斯坦布尔」那一趟往返。"],
            stay: "恰纳卡莱（Çanakkale）"
      },
      {
            id: "b11", d: 11, w: "周三", t: "特洛伊（Troy）- 帕加马（Pergamon）- 伊兹密尔（İzmir）",
            img: [["Troy", "特洛伊遗址（Troya）"], ["Troy Museum", "特洛伊博物馆（Troya Müzesi）"], ["Pergamon", "帕加马卫城（Pergamon Akropolisi）"]],
            plan: [["上午", "🚗 恰纳卡莱 → 特洛伊，约 30 分钟；遗址 + 博物馆"], ["下午", "🚗 到贝尔加马（Bergama），约 2.5–3 小时；帕加马卫城"], ["晚上", "🚗 到伊兹密尔（İzmir），约 1.5 小时"]],
            tip: "全程最累的一天，有时间增加 Asklepion", stay: "伊兹密尔（İzmir）"
      },
      {
            id: "b12", d: 12, w: "周四", t: "伊兹密尔（İzmir）· 以弗所（Ephesus）一日游",
            img: [["Library of Celsus", "塞尔苏斯图书馆（Library of Celsus）"], ["Ephesus", "以弗所古城（Efes）"], ["Şirince", "希林杰村（Şirince）"]],
            plan: [["上午", "🚗 伊兹密尔 → 塞尔丘克（Selçuk），约 1 小时"], ["白天", "塞尔苏斯图书馆、大剧场（Great Theatre）、库雷特斯街（Curetes Street）"], ["下午", "可选：以弗所博物馆（Efes Müzesi）、阿尔忒弥斯神庙（Temple of Artemis）、希林杰（Şirince）"]],
            stay: "伊兹密尔（İzmir）"
      },
      {
            id: "b13", d: 13, w: "周五", t: "伊兹密尔（İzmir）- 卡帕多奇亚（Kapadokya）",
            img: [["İzmir", "科尔顿海滨（Kordon）"], ["Uçhisar", "乌奇希萨尔城堡（Uçhisar Kalesi）"], ["Göreme", "格雷梅小镇（Göreme）"]],
            plan: [["上午", "科尔顿海滨（Kordon）、凯梅拉尔特（Kemeraltı）"], ["中午", "ADB 机场还车"], ["下午", "✈ 伊兹密尔 → 开塞利（ASR）"], ["傍晚", "入住格雷梅（Göreme）或乌奇希萨尔（Uçhisar）"]],
            note: ["ADB → ASR 有直飞但班次不多，订不到就经伊斯坦布尔转一趟，全程 4–5 小时。出发前先查这一段，它决定 B 方案成不成立。",
                  "还车和航班同一天，中间留足缓冲。"],
            stay: "卡帕多奇亚（Kapadokya）"
      },
      {
            id: "b14", d: 14, w: "周六", t: "卡帕多奇亚（Kapadokya）· 整天",
            img: [["Cappadocia", "热气球与岩谷"], ["Göreme Open Air Museum", "格雷梅露天博物馆（Göreme Açık Hava Müzesi）"], ["Fairy chimney", "精灵烟囱（Peribacaları）"]],
            plan: [["日出", "观景点拍热气球（不乘坐）"], ["上午", "格雷梅露天博物馆"], ["下午", "乌奇希萨尔（Uçhisar）、帕夏贝（Paşabağ）、泽尔韦（Zelve）选 2–3 个"], ["傍晚", "观景点看日落"]],
            stay: "卡帕多奇亚（Kapadokya）"
      },
      {
            id: "b15", d: 15, w: "周日", t: "卡帕多奇亚（Kapadokya）- 伊斯坦布尔（Istanbul）- 雅典（Athens）",
            img: [["Göreme National Park", "格雷梅国家公园（Göreme Milli Parkı）"], ["Istanbul Airport", "伊斯坦布尔机场（İstanbul Havalimanı, IST）"], ["Athens International Airport", "雅典机场（Athens Intl., ATH）"]],
            plan: [["上午", "格雷梅补看，09:30 出发去 NAV 机场"], ["11:25", "✈ 内夫谢希尔（NAV）→ 伊斯坦布尔，13:00 落地"], ["14:25", "✈ 伊斯坦布尔 → 雅典，14:55 落地"], ["下午", "16:00 前后进雅典市区"]],
            note: ["参考航班 NAV 11:25 → IST 13:00、IST 14:25 → ATH 14:55，门到门 4 小时 30 分。下午就能进雅典市区，比 A 方案 20:40 那班到得早得多——11-15 的下午和晚上都还能用。",
                  "要留意的是伊斯坦布尔那 1 小时 25 分中转：国内转国际要重新过护照检查，IST 又特别大。尽量订在同一张票上，延误才有保护。",
                  "NAV（内夫谢希尔）离格雷梅约 40 分钟，比开塞利（ASR）近，这一天从 NAV 走更省事。"],
            link: { u: "https://www.google.com/travel/flights/s/RNdAX65RXHioyetn9", t: "参考航班" },
            stay: "雅典（Athens）"
      }
];
/* 方案 C 的土耳其段：11-6 到 11-12（d6–d12）与方案 A 完全相同，机票一模一样，
   差异只在最后三天的住宿与门票——把伊兹密尔两晚换成塞尔丘克 + 棉花堡。 */
const TR_C = [
      {
            id: "c13", d: 13, w: "周五", t: "特洛伊（Troy）- 帕加马（Pergamon）- 塞尔丘克（Selçuk）",
            img: [["Troy", "特洛伊遗址（Troya）"], ["Troy Museum", "特洛伊博物馆（Troya Müzesi）"], ["Pergamon", "帕加马卫城（Pergamon Akropolisi）"]],
            plan: [["上午", "🚗 恰纳卡莱 → 特洛伊，约 30 分钟；遗址 + 博物馆"], ["下午", "🚗 到贝尔加马（Bergama），约 2.75 小时；帕加马卫城"], ["晚上", "🚗 到塞尔丘克（Selçuk），约 2.5 小时，到店约 19:30"]],
            tip: "全程最累的一天，车程约 5.75 小时，Asklepion 放不进来了",
            note: ["比 A 方案多开 1 小时，换来第二天以弗所就在门口——开门即入，淡季几乎无人。",
                  "日落 17:54，贝尔加马到塞尔丘克这一段全在夜里，走 O-31 高速路况好。"],
            stay: "塞尔丘克（Selçuk）"
      },
      {
            id: "c14", d: 14, w: "周六", t: "以弗所（Ephesus）- 棉花堡（Pamukkale）",
            img: [["Library of Celsus", "塞尔苏斯图书馆（Library of Celsus）"], ["Ephesus", "以弗所古城（Efes）"], ["Pamukkale", "棉花堡的石灰岩梯田（Pamukkale）"]],
            plan: [["08:30", "以弗所开门即入，住处到遗址 5 分钟"], ["中午", "塞尔丘克或希林杰（Şirince）午餐"], ["13:00", "🚗 到棉花堡，约 2.5 小时"], ["傍晚", "石灰岩梯田看日落（17:47）"]],
            note: ["泉水是地热的，约 35 ℃，气温 16 ℃ 也能踩水；11 月淡季人很少。",
                  "梯田要脱鞋走，带一条擦脚的毛巾。"],
            stay: "棉花堡（Pamukkale）"
      },
      {
            id: "c15", d: 15, w: "周日", t: "棉花堡（Pamukkale）- 雅典（Athens）",
            img: [["Pamukkale", "棉花堡的石灰岩梯田（Pamukkale）"], ["Hierapolis", "希拉波利斯（Hierapolis）"], ["Athens International Airport", "雅典机场（Athens Intl., ATH）"]],
            plan: [["日出", "梯田看日出（07:50）"], ["上午", "希拉波利斯：大剧场、墓地群、普鲁托尼翁"], ["12:30", "🚗 到 ADB 机场，约 2.75 小时"], ["晚上", "✈ 20:40 伊兹密尔 → 雅典（直飞）"]],
            note: ["12:30 出发 15:15 到 ADB，距 20:40 还有五小时余量；在希拉波利斯磨到 14:00 也来得及。",
                  "机票与 A 方案完全相同，仍是这班 ADB → ATH 直飞。冬季闭园时间会调整，出发前核实。"],
            link: { u: "https://www.google.com/travel/flights/s/Vc783tRJRwLQjHXi7", t: "参考航班（Aegean 直飞）" },
            stay: "雅典（Athens）"
      }
];
/* 城市速览：点卡片弹出详情。img 是 Wikipedia 条目名（取自由授权主图），hl 为 [名称, 说明] */
const CITIES = [
      {
            c: "tr", n: "伊斯坦布尔", en: "Istanbul", dt: "11-7 – 11-9", nt: "3 晚", to: "d7", img: "Istanbul",
            one: "横跨欧亚的千年都城，三个帝国的首都",
            intro: "先后成为罗马、拜占庭和奥斯曼三个帝国的首都，伊斯坦布尔的历史几乎与这座城市本身一样漫长。博斯普鲁斯海峡从城市中央穿过，将它分成欧洲与亚洲两岸，也让这里成为连接东西方的独特之地。如今，这座拥有约 1600 万人口的城市，是欧洲人口最多的城市之一。走进老城苏丹艾哈迈德区，几步之间便能遇见清真寺、教堂与拜占庭时期的地下蓄水池，不同时代的城市遗迹，就这样层层叠在同一片街区里。",
            hl: [["圣索菲亚（Ayasofya）", "537 年建成的拜占庭大穹顶，做过教堂、清真寺、博物馆，2020 年又改回清真寺"],
            ["蓝色清真寺（Sultanahmet Camii）", "六座宣礼塔，内壁两万多块伊兹尼克蓝瓷砖"],
            ["托普卡帕宫（Topkapı Sarayı）", "奥斯曼苏丹住了近 400 年，后宫和珍宝馆另外收费"],
            ["地下水宫（Yerebatan Sarnıcı）", "336 根柱子的地下蓄水池，角落有两个倒置的美杜莎头"],
            ["大巴扎（Kapalıçarşı）", "四千多家店的顶棚市场，周日休市"]],
            food: "埃米诺努码头的青花鱼三明治（balık ekmek）、各式 kebap 与 pide，甜点 baklava 和 künefe。",
            tips: "清真寺礼拜时段不对外开放，女性需带头巾。老城到 Beyoğlu 坐 T1 电车转地铁最省事。"
      },
      {
            c: "tr", n: "卡帕多奇亚", en: "Kapadokya / Cappadocia", dt: "11-10 – 11-11", nt: "2 晚", to: "d10", img: "Cappadocia",
            b: { dt: "11-13 – 11-14", nt: "2 晚", to: "b13" },
            one: "火山灰凝成的岩谷与洞穴城",
            intro: "几百万年前，火山喷发留下的灰烬沉积成柔软的凝灰岩，漫长的风雨将它雕刻成奇异的尖塔、峡谷与沟壑。人们很早便开始利用这些柔软的岩层，在山体中凿出房屋、教堂，甚至深藏地下的城市。到了拜占庭时期，这里又成为修士们隐居和避难的所在。如今，格雷梅、乌奇希萨尔、阿瓦诺斯等小镇散落在这片奇特的岩石大地之间，仿佛一座仍在延续的古老城市。",
            hl: [["格雷梅露天博物馆", "岩凿教堂群，10–12 世纪湿壁画，世界遗产"],
            ["精灵烟囱（Peribacaları）", "帕夏贝一带的蘑菇状岩柱，最像样的一片"],
            ["乌奇希萨尔城堡", "全区最高点，日落视野最好"],
            ["热气球", "日出前升空，晴天常过百只；我们只在观景台拍"],
            ["代林库尤地下城（Derinkuyu）", "深达 18 层的地下避难城，车程约 40 分钟"]],
            food: "陶罐炖肉（testi kebabı），上桌时当面敲开罐子；于尔居普一带有酒庄。",
            tips: "11 月清晨 0–5 ℃，观景台风大，要穿厚。气球是否起飞看当天风力，取消很常见。"
      },
      {
            c: "tr", n: "恰纳卡莱", en: "Çanakkale", dt: "11-12", nt: "1 晚", to: "d12", img: "Çanakkale",
            b: { dt: "11-10", nt: "1 晚", to: "b10" },
            one: "达达尼尔海峡边的渡口小城，特洛伊在近郊",
            intro: "守着达达尼尔海峡最窄处，约 1.3 公里的水面连接着爱琴海与马尔马拉海，也让这里自古成为横跨欧亚的战略要地。一战期间，著名的加里波利战役就在海峡对岸展开。如今的恰纳卡莱安静地沿着海滨展开，长廊上还摆放着 2004 年电影《特洛伊》拍摄时使用的木马道具。古代传说、近代战争与电影里的神话，在这座海峡城市意外地交汇在一起。",
            hl: [["海滨长廊", "特洛伊木马道具就在岸边，傍晚散步的地方"],
            ["1915 恰纳卡莱大桥", "2022 年通车，主跨 2023 米（对应建国百年），世界最长悬索桥"],
            ["特洛伊遗址（Troya）", "车程 30 分钟，九层城址层层叠压"],
            ["特洛伊博物馆", "2018 年新馆，锈红色方盒子，展品比遗址更好看"],
            ["加里波利半岛（Gelibolu）", "渡船到对岸，一战战场与澳新军团纪念地；这趟没排"]],
            food: "海峡里的沙丁鱼和海鲜，当地的 ezine 白奶酪。",
            tips: "小城一晚够。想去加里波利要单独留半天，渡轮班次很密。"
      },
      {
            c: "tr", n: "伊兹密尔", en: "İzmir", dt: "11-13 – 11-14", nt: "2 晚", to: "d13", img: "İzmir",
            b: { dt: "11-11 – 11-12", nt: "2 晚", to: "b11" },
            c: { dt: "11-15 经过", nt: "仅 ADB 还车", to: "c15" },
            one: "爱琴海岸的港城，古称士麦那",
            intro: "土耳其第三大城市，古希腊时期称为士麦那（Smyrna），也是传说中荷马出生地的候选城市之一。城市沿着爱琴海湾展开，科尔顿海滨长廊是当地人傍晚散步、看海和吹风的日常去处。相比伊斯坦布尔，这里的节奏更舒缓，城市气质也更加世俗而松弛。作为爱琴海沿岸的重要城市，伊兹密尔也是前往以弗所和帕加马等古迹的理想落脚点。",
            hl: [["科尔顿海滨（Kordon）", "沿湾的长廊，傍晚看日落"],
            ["科纳克广场与钟楼", "1901 年的奥斯曼钟楼，城市地标"],
            ["凯梅拉尔特市集（Kemeraltı）", "17 世纪起的老市集，比大巴扎更市井"],
            ["阿桑索尔（Asansör）", "1907 年的老升降机，上去看海湾"],
            ["士麦那阿哥拉遗址", "罗马时期的市集，就在市中心"]],
            food: "本地早餐酥饼 boyoz、kumru 三明治；无花果与葡萄干是这一带的物产。",
            tips: "到以弗所（塞尔丘克）约 1 小时，到帕加马（贝尔加马）约 1.5 小时。ADB 机场在城南，去塞尔丘克方向顺路。"
      },
      {
            c: "tr", n: "以弗所 · 塞尔丘克", en: "Efes / Selçuk", dt: "11-14", nt: "一日游", to: "d14", img: "Ephesus",
            b: { dt: "11-12", nt: "一日游", to: "b12" },
            c: { dt: "11-13 – 11-14", nt: "1 晚", to: "c13" },
            one: "地中海东岸保存最完整的罗马城市",
            intro: "曾是罗马帝国亚细亚行省的首府，鼎盛时期人口约二十万，是古代地中海世界最重要的城市之一。后来，随着港口逐渐淤塞，城市失去出海的优势，最终被废弃。也正因为如此，古城没有被后世的城市建设层层覆盖，大量街道、剧场和建筑遗迹得以保存至今。遗址位于塞尔丘克镇以西约 3 公里，镇上还有拜占庭时期的城堡与圣约翰教堂。从伊兹密尔驾车前往约 1 小时，是爱琴海沿线非常适合作为一日游的古城。",
            hl: [["塞尔苏斯图书馆（Library of Celsus）", "公元 110 年代建成，正立面在 1970 年代按原件复原"],
            ["大剧场（Great Theatre）", "能坐两万五千人，使徒保罗在这里布道引发过骚动"],
            ["库雷特斯街（Curetes Street）", "大理石铺的主街，两侧是柱廊、店铺和公共厕所"],
            ["山坡豪宅（Terrace Houses）", "另外收费，罗马壁画和马赛克保存得极好，值得加"],
            ["阿尔忒弥斯神庙", "古代七大奇迹之一，如今只立着一根柱子"]],
            food: "镇中心广场一圈的小馆；山上的希林杰村（Şirince）产水果酒。",
            tips: "遗址有上下两个门。从上门（马格尼西亚门）进、下门出，全程下坡最省力——包车或打车才方便这么走。冬季约 17:30 关门，博物馆和山坡豪宅各自另收费。"
      },
      {
            c: "tr", n: "棉花堡", en: "Pamukkale / Hierapolis", dt: "11-14", nt: "1 晚", to: "c14", img: "Pamukkale",
            one: "地热泉水堆出来的白色梯田",
            intro: "Pamukkale 在土耳其语里是「棉花城堡」。地下涌出的温泉含大量碳酸钙，沿着山坡层层沉积，两千年间堆出这片白色的石灰岩梯田。台地顶上是希拉波利斯（Hierapolis）——罗马人为泡温泉建起的城市，如今还留着大剧场、绵延两公里的墓地群，以及被古人当作冥界入口的普鲁托尼翁。1988 年与梯田一同列入世界遗产。",
            hl: [["石灰岩梯田", "脱鞋走在约 35 ℃ 的温泉水里，日落和日出时最好看"],
            ["希拉波利斯大剧场", "罗马剧场，约一万二千座，舞台立面保存完好"],
            ["墓地群（Necropolis）", "安纳托利亚规模最大的之一，沿路绵延两公里"],
            ["克娄巴特拉古泉池", "另收费，能在地震塌下的罗马石柱间泡温泉"],
            ["普鲁托尼翁（Ploutonion）", "冒二氧化碳的洞口，古人认作冥界入口"]],
            food: "馆子集中在南门外的棉花堡村；本地的 gözleme 和石板烤肉。",
            tips: "南门（棉花堡村）离梯田最近，北门离墓地群近。梯田必须脱鞋，带毛巾。冬季闭园较早，出发前核实。"
      },
      {
            c: "gr", n: "雅典", en: "Athens / Αθήνα", dt: "11-15 – 11-17、11-21", nt: "4 晚", to: "d16", img: "Athens",
            one: "西方古典世界的中心",
            intro: "卫城的岩顶自公元前 5 世纪起便俯视着这座城市。民主制度、古希腊悲剧与哲学思想，都曾在这里生长，塑造了后来西方文明的重要一页。如今的雅典已是一座约 380 万人口的大都会，古老遗迹并没有被现代城市隔绝，而是散落、嵌入密集的街区之间。沿着普拉卡和莫纳斯提拉基的老街漫步，转过一个街角，便可能与两千多年前的遗迹不期而遇。",
            hl: [["卫城与帕特农神庙", "公元前 447–432 年，多立克柱式的顶点"],
            ["卫城博物馆", "2009 年新馆，玻璃地板下是正在发掘的街区"],
            ["古市集与赫菲斯托斯神庙", "保存最完整的一座多立克神庙"],
            ["帕纳辛奈克体育场", "全大理石，1896 年首届现代奥运会的场地"],
            ["利卡维多斯山", "277 米，全城最高点，看日落"]],
            food: "souvlaki 与 gyros，moussaka；Psyrri 一带的小酒馆（mezedopolio）。",
            tips: "卫城联票含古市集等多处遗址，11 月是淡季票价。山上大理石被磨得很滑，鞋底要有抓地。"
      },
      {
            c: "gr", n: "德尔斐", en: "Delphi / Δελφοί", dt: "11-18", nt: "1 晚", to: "d18", img: "Delphi",
            one: "古希腊人认定的世界中心",
            intro: "坐落在帕纳索斯山南坡的德尔斐，是古希腊世界最重要的神谕中心之一。古人相信这里是大地的中心，即所谓的“世界肚脐”（Omphalos）。城邦在出兵、建立殖民地等重大决定之前，都会来到这里向阿波罗寻求神谕，而神谕则由女祭司皮提亚传达。如今的遗址沿山势层层向上，石柱与残垣之间，视野越过绵延的橄榄树林，一直延伸到远处的科林斯湾。",
            hl: [["阿波罗神庙", "神谕所所在，门楣上刻着「认识你自己」"],
            ["圣道（Sacred Way）", "沿路是各城邦献上的宝库"],
            ["古剧场与体育场", "体育场在最高处，皮提亚竞技会的场地"],
            ["雅典娜圣域的圆形神殿（Tholos）", "遗址里最常被拍的那座"],
            ["德尔斐考古博物馆", "青铜御者像（Charioteer）是镇馆之宝"]],
            food: "山区口味：烤羊、feta、山蜂蜜。",
            tips: "遗址在坡上，上下走完约 1.5–2 小时。村子很小，餐馆都在主街，11 月比雅典冷。"
      },
      {
            c: "gr", n: "约阿尼纳", en: "Ioannina / Ιωάννινα", dt: "11-19", nt: "1 晚", to: "d19", img: "Ioannina",
            one: "湖畔的奥斯曼旧城",
            intro: "伊庇鲁斯地区的首府，坐落在帕姆沃蒂斯湖畔。19 世纪初，这里曾是阿里帕夏的势力中心——这位地方统治者几乎半独立于奥斯曼苏丹，也曾在 1809 年迎来诗人拜伦的到访。如今，城堡区仍保留着清真寺、石板巷和传统建筑，沿着古老街道漫步，可以看到希腊少见的奥斯曼时代城市风貌，也是当地保存较为完整的奥斯曼城区之一。",
            hl: [["城堡区（Kastro）", "湖边的围墙老城，里头至今住人"],
            ["阿斯兰帕夏清真寺", "城堡内，现在是民俗博物馆"],
            ["帕姆沃蒂斯湖与湖心岛", "摆渡过去，阿里帕夏死在岛上的修道院里"],
            ["银器博物馆", "本地的银器工艺有几百年传统"],
            ["扎戈里山区的门户", "上山 45–75 分钟，维科斯峡谷就在那边"]],
            food: "湖鱼和蛙腿是本地特色；伊庇鲁斯的派（pita）——菠菜派、奶酪派。",
            tips: "湖心岛渡船冬季班次减少。这一晚也可以换成扎戈里的山间民宿，见当天备注。"
      },
      {
            c: "gr", n: "迈泰奥拉 · 卡斯特拉基", en: "Meteora / Kastraki", dt: "11-20", nt: "1 晚", to: "d20", img: "Meteora",
            one: "悬在砂岩巨柱顶上的修道院",
            intro: "一片被风雨侵蚀而成的巨大砾岩群，最高的岩柱拔地四百多米，像从平原上突然升起的石塔。11 世纪起，隐修士便开始攀上这些几乎与世隔绝的岩柱修行；14 至 16 世纪间，人们又在峭壁之上陆续建起 24 座修道院，如今仍有 6 座在使用。Meteora 在希腊语中意为“悬在空中”，这个名字几乎就是它最直观的写照。卡斯特拉基和卡兰巴卡两个小镇依偎在岩柱脚下，是探索这片天空之城的落脚点。",
            hl: [["大迈泰奥拉修道院", "最大最老，1340 年代创建"],
            ["瓦尔拉姆修道院", "第二大，16 世纪壁画"],
            ["鲁萨努修道院", "柱顶几乎被建筑填满，最好拍"],
            ["圣三一修道院（Agia Triada）", "007《最高机密》的取景地"],
            ["日落观景台", "卡斯特拉基上方的公路边，不用门票"]],
            food: "山区炖菜；馆子集中在卡兰巴卡主街。",
            tips: "六座各有休息日，11 月还会调整，出发前再查。进修道院要过膝长裤或长裙，门口有围裙可借；台阶很多。"
      }
];
const TOPICS = [
      {
            c: "tr", dt: "11-15", to: "d15", q: "伊兹密尔到雅典的飞行方案？",
            a: "11-15 与 11-13 各有一班 20:40 起飞的 Aegean Airlines 直飞，11-14 没有直飞。",
            link: { u: "https://www.google.com/travel/flights/s/Vc783tRJRwLQjHXi7", t: "Aegean Airlines" },
            opts: [{
                  n: "11-13 直飞", v: "no",
                  a: "土耳其压缩得太厉害：卡帕多奇亚要从 2 天减到 1 天，或者砍掉帕加马、缩短以弗所，伊兹密尔也不住。"
            },
            {
                  n: "11-14 经伊斯坦布尔转机", v: "no",
                  a: "当天没有直飞，转一次，飞行加转机共 6–7 小时，太长。"
            },
            {
                  n: "11-15 直飞", v: "yes", vt: "采用",
                  a: "土耳其前段完整充分；希腊那边把约阿尼纳和扎戈里压缩一下就够了。"
            }],
            now: "11-15 20:40，Aegean Airlines 直飞"
      },
      {
            c: "tr", dt: "11-13", to: "d13", q: "帕加马要不要再加 Asklepion？", soft: true,
            a: "这天车程已经 4.5–5 小时，卫城本身要 1.5–2 小时。Asklepion 在山下，再加约 1 小时，到伊兹密尔就全黑了。",
            now: "先不加，当天看时间"
      },
      {
            c: "gr", dt: "11-19", to: "d19", q: "住约阿尼纳，还是上扎戈里的山间民宿？",
            a: "住山里第二天早上省一趟往返，但今天下午的湖畔与城堡要压缩，而且必须趁天亮上山；淡季民宿要先确认开门。",
            now: "住约阿尼纳"
      },
      {
            c: "gr", dt: "11-21", to: "d21", q: "迈泰奥拉挑哪 2–3 座修道院？", soft: true,
            a: "六座各有开放日，11 月还会调整；下午要开 4–4.5 小时回雅典，上午最多排 3 座。",
            now: "大迈泰奥拉 + 瓦尔拉姆，第三座看开放日"
      }
];
const NODES = {
      tr: [{ n: "悉尼出发", en: "Sydney", dt: "11-6", nt: "SYD → IST", to: "d6", pass: 1, next: "fly" },
      { n: "伊斯坦布尔", en: "Istanbul", dt: "11-7 – 11-9", nt: "3 晚", to: "d7", next: "fly" },
      { n: "卡帕多奇亚", en: "Kapadokya", dt: "11-10 – 11-11", nt: "2 晚", to: "d10", next: "fly" },
      { n: "恰纳卡莱", en: "Çanakkale", dt: "11-12", nt: "1 晚", to: "d12" },
      { n: "特洛伊 · 帕加马", en: "Troya · Pergamon", dt: "11-13", nt: "途经", to: "d13", pass: 1 },
      { n: "伊兹密尔", en: "İzmir", dt: "11-13 – 11-14", nt: "2 晚", to: "d13" },
      { n: "以弗所", en: "Efes / Ephesus", dt: "11-14", nt: "一日游", to: "d14", pass: 1, next: "fly" },
      { n: "飞往雅典", en: "Athens", dt: "11-15", nt: "ADB → ATH", to: "d15", pass: 1 }],
      gr: [{ n: "雅典", en: "Athens", dt: "11-15 – 11-17", nt: "3 晚", to: "d16" },
      { n: "德尔斐", en: "Delphi", dt: "11-18", nt: "1 晚", to: "d18" },
      { n: "约阿尼纳", en: "Ioannina", dt: "11-19", nt: "1 晚", to: "d19" },
      { n: "迈泰奥拉", en: "Meteora", dt: "11-20", nt: "1 晚", to: "d20" },
      { n: "雅典", en: "Athens", dt: "11-21", nt: "1 晚", to: "d21", next: "fly" },
      { n: "回悉尼", en: "Sydney", dt: "11-22", nt: "ATH → SYD", to: "d22", pass: 1 }]
};
