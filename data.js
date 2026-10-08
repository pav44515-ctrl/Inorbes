// ===== BILLIONAIRE DATA (Forbes 2026 World's Billionaires List) =====
const BILLIONAIRES = [
    { rank:1, name:"Elon Musk", age:54, netWorth:815.7, company:"Tesla / SpaceX", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Tesla, SpaceX, xAI", initials:"EM", color:"#f0b232", photo:"https://specials-images.forbesimg.com/imageserve/62d700cd6094d2c180f269b9/416x416.jpg?background=000000&cropX1=0&cropX2=959&cropY1=0&cropY2=959" },
    { rank:2, name:"Larry Page", age:53, netWorth:324.3, company:"Alphabet (Google)", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Alphabet", initials:"LP", color:"#4285f4", photo:"https://specials-images.forbesimg.com/imageserve/5c76bcaaa7ea43100043c836/416x416.jpg?background=000000&cropX1=227&cropX2=2022&cropY1=22&cropY2=1817" },
    { rank:3, name:"Sergey Brin", age:52, netWorth:299, company:"Alphabet (Google)", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Alphabet", initials:"SB", color:"#ea4335", photo:"https://specials-images.forbesimg.com/imageserve/5c7d7c254bbe6f78090d831f/416x416.jpg?background=000000&cropX1=475&cropX2=2887&cropY1=168&cropY2=2582" },
    { rank:4, name:"Jeff Bezos", age:62, netWorth:279.6, company:"Amazon", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Amazon", initials:"JB", color:"#ff9900", photo:"https://specials-images.forbesimg.com/imageserve/67531eb2b5f7c9e191f632d7/416x416.jpg?background=000000&cropX1=316&cropX2=1027&cropY1=125&cropY2=838" },
    { rank:5, name:"Larry Ellison", age:81, netWorth:244.5, company:"Oracle", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Oracle", initials:"LE", color:"#f80000", photo:"https://specials-images.forbesimg.com/imageserve/5e8b62cfc095010007bffea0/416x416.jpg?background=000000&cropX1=0&cropX2=4529&cropY1=652&cropY2=5184" },
    { rank:6, name:"Mark Zuckerberg", age:41, netWorth:208.3, company:"Meta", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Meta Platforms", initials:"MZ", color:"#0668e1", photo:"https://specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401" },
    { rank:7, name:"Michael Dell", age:61, netWorth:189.2, company:"Dell Technologies", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Dell Technologies", initials:"MD", color:"#007db8", photo:"https://specials-images.forbesimg.com/imageserve/615c93f9da61f2ff5b9ecf9b/416x416.jpg?background=000000&cropX1=0&cropX2=1678&cropY1=118&cropY2=1797" },
    { rank:8, name:"Jensen Huang", age:63, netWorth:186.6, company:"NVIDIA", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"NVIDIA", initials:"JH", color:"#76b900", photo:"https://specials-images.forbesimg.com/imageserve/68750a2d250de42ce7c5301b/416x416.jpg?background=000000&cropX1=832&cropX2=2632&cropY1=152&cropY2=1951" },
    { rank:9, name:"Rob Walton", age:81, netWorth:149, company:"Walmart", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Walmart", initials:"RW", color:"#0071ce", photo:"https://specials-images.forbesimg.com/imageserve/59d50a9e4bbe6f37dd9ff712/416x416.jpg?background=000000&cropX1=244&cropX2=1841&cropY1=60&cropY2=1658" },
    { rank:10, name:"Bernard Arnault", age:77, netWorth:149, company:"LVMH", industry:"luxury", country:"🇫🇷 France", flag:"🇫🇷", source:"LVMH", initials:"BA", color:"#d4a853", photo:"https://specials-images.forbesimg.com/imageserve/5dc05518ca425400079c659f/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212" },
    { rank:11, name:"Warren Buffett", age:95, netWorth:149, company:"Berkshire Hathaway", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Berkshire Hathaway", initials:"WB", color:"#2dd4bf", photo:"https://specials-images.forbesimg.com/imageserve/5babb7f1a7ea4342a948b79a/416x416.jpg?background=000000&cropX1=748&cropX2=3075&cropY1=1753&cropY2=4082" },
    { rank:12, name:"Amancio Ortega", age:89, netWorth:148, company:"Zara / Inditex", industry:"retail", country:"🇪🇸 Spain", flag:"🇪🇸", source:"Inditex", initials:"AO", color:"#a78bfa", photo:"https://specials-images.forbesimg.com/imageserve/5c76b94131358e35dd27748e/416x416.jpg?background=000000&cropX1=179&cropX2=2232&cropY1=216&cropY2=2269" },
    { rank:13, name:"Jim Walton", age:77, netWorth:146.3, company:"Walmart", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Walmart", initials:"JW", color:"#0071ce", photo:"https://specials-images.forbesimg.com/imageserve/5c7ef2fea7ea434b351bca5a/416x416.jpg?background=000000&cropX1=49&cropX2=934&cropY1=65&cropY2=951" },
    { rank:14, name:"Alice Walton", age:76, netWorth:135.9, company:"Walmart", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Walmart", initials:"AW", color:"#0071ce", photo:"https://specials-images.forbesimg.com/imageserve/5c7ef270a7ea434b351bca52/416x416.jpg?background=000000&cropX1=232&cropX2=998&cropY1=222&cropY2=988" },
    { rank:15, name:"Steve Ballmer", age:70, netWorth:132.3, company:"Microsoft", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Microsoft", initials:"SB", color:"#00a4ef", photo:"https://specials-images.forbesimg.com/imageserve/59d50c47a7ea436b47b36d66/416x416.jpg?background=000000&cropX1=553&cropX2=2940&cropY1=322&cropY2=2708" },
    { rank:16, name:"Carlos Slim Helú", age:86, netWorth:125, company:"América Móvil", industry:"finance", country:"🇲🇽 Mexico", flag:"🇲🇽", source:"América Móvil", initials:"CS", color:"#e4002b", photo:"https://specials-images.forbesimg.com/imageserve/5c76ba144bbe6f24ad99c613/416x416.jpg?background=000000&cropX1=0&cropX2=3005&cropY1=389&cropY2=3395" },
    { rank:17, name:"Changpeng Zhao", age:49, netWorth:110, company:"Binance", industry:"finance", country:"🇨🇳 China", flag:"🇨🇳", source:"Binance", initials:"CZ", color:"#f0b90b", photo:"https://specials-images.forbesimg.com/imageserve/61115ac5b4c5d23845419c4e/416x416.jpg?background=000000&cropX1=0&cropX2=911&cropY1=0&cropY2=911" },
    { rank:18, name:"Michael Bloomberg", age:84, netWorth:109.4, company:"Bloomberg LP", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Bloomberg LP", initials:"MB", color:"#472f92", photo:"https://specials-images.forbesimg.com/imageserve/5c76b4104bbe6f24ad99c35d/416x416.jpg?background=000000&cropX1=165&cropX2=5613&cropY1=321&cropY2=5769" },
    { rank:19, name:"Bill Gates", age:70, netWorth:108, company:"Microsoft", industry:"tech", country:"🇺🇸 USA", flag:"🇺🇸", source:"Microsoft, Cascade", initials:"BG", color:"#737373", photo:"https://specials-images.forbesimg.com/imageserve/62d599ede3ff49f348f9b9b4/416x416.jpg?background=000000&cropX1=155&cropX2=976&cropY1=340&cropY2=1161" },
    { rank:20, name:"Françoise Bettencourt Meyers", age:72, netWorth:100, company:"L'Oréal", industry:"luxury", country:"🇫🇷 France", flag:"🇫🇷", source:"L'Oréal", initials:"FM", color:"#fb7185", photo:"https://specials-images.forbesimg.com/imageserve/605e26e3c65f7c2596bd3e15/416x416.jpg?background=000000&cropX1=0&cropX2=1080&cropY1=0&cropY2=1080" },
    { rank:21, name:"Mukesh Ambani", age:68, netWorth:99.7, company:"Reliance Industries", industry:"finance", country:"🇮🇳 India", flag:"🇮🇳", source:"Reliance Industries", initials:"MA", color:"#003087", photo:"https://specials-images.forbesimg.com/imageserve/5c7d7829a7ea434b351ba0b6/416x416.jpg?background=000000&cropX1=206&cropX2=2043&cropY1=250&cropY2=2089" },
    { rank:22, name:"Giancarlo Devasini", age:60, netWorth:89.3, company:"Tether", industry:"finance", country:"🇮🇹 Italy", flag:"🇮🇹", source:"Tether", initials:"GD", color:"#26a17b", photo:"" },
    { rank:23, name:"Thomas Peterffy", age:81, netWorth:82.9, company:"Interactive Brokers", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Interactive Brokers", initials:"TP", color:"#d32f2f", photo:"https://specials-images.forbesimg.com/imageserve/5d8a5c6218444200084e6532/416x416.jpg?background=000000&cropX1=466&cropX2=1132&cropY1=297&cropY2=962" },
    { rank:24, name:"Julia Flesher Koch", age:62, netWorth:81.2, company:"Koch Industries", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Koch Industries", initials:"JK", color:"#1e3a5f", photo:"https://specials-images.forbesimg.com/imageserve/6601ce61b79552a97c9e786c/416x416.jpg?background=000000&cropX1=0&cropX2=2583&cropY1=522&cropY2=3106" },
    { rank:25, name:"Masayoshi Son", age:67, netWorth:74.5, company:"SoftBank", industry:"tech", country:"🇯🇵 Japan", flag:"🇯🇵", source:"SoftBank Group", initials:"MS", color:"#0f0f0f", photo:"https://specials-images.forbesimg.com/imageserve/5e8b632801879f000703e485/416x416.jpg?background=000000&cropX1=0&cropX2=4500&cropY1=833&cropY2=5330" },
    { rank:26, name:"Charles Koch", age:90, netWorth:73.8, company:"Koch Industries", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Koch Industries", initials:"CK", color:"#1e3a5f", photo:"https://specials-images.forbesimg.com/imageserve/615c94bd2aac2936a52682d1/416x416.jpg?background=000000&cropX1=286&cropX2=848&cropY1=110&cropY2=672" },
    { rank:27, name:"Qin Yinglin", age:59, netWorth:70.8, company:"Muyuan Foods", industry:"retail", country:"🇨🇳 China", flag:"🇨🇳", source:"Muyuan Foods", initials:"QY", color:"#e53935", photo:"" },
    { rank:28, name:"Zhang Yiming", age:42, netWorth:69.3, company:"ByteDance / TikTok", industry:"tech", country:"🇨🇳 China", flag:"🇨🇳", source:"ByteDance", initials:"ZY", color:"#010101", photo:"https://specials-images.forbesimg.com/imageserve/618e91e427fcd6441f93c0c6/416x416.jpg?background=000000&cropX1=227&cropX2=1294&cropY1=14&cropY2=1080" },
    { rank:29, name:"Phil Knight", age:88, netWorth:69.2, company:"Nike", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Nike", initials:"PK", color:"#111", photo:"" },
    { rank:30, name:"Dieter Schwarz", age:86, netWorth:67.2, company:"Lidl / Schwarz Group", industry:"retail", country:"🇩🇪 Germany", flag:"🇩🇪", source:"Schwarz Group", initials:"DS", color:"#003399", photo:"https://specials-images.forbesimg.com/imageserve/6050f48ca1ab099ed6e290cc/416x416.jpg?background=000000&cropX1=0&cropX2=800&cropY1=0&cropY2=800" },
    { rank:31, name:"Gautam Adani", age:63, netWorth:66.4, company:"Adani Group", industry:"finance", country:"🇮🇳 India", flag:"🇮🇳", source:"Adani Group", initials:"GA", color:"#1a237e", photo:"https://specials-images.forbesimg.com/imageserve/68e693f20b749254082e47fe/416x416.jpg?background=000000&cropX1=0&cropX2=2041&cropY1=161&cropY2=2203" },
    { rank:32, name:"Tadashi Yanai", age:77, netWorth:65.8, company:"Uniqlo / Fast Retailing", industry:"retail", country:"🇯🇵 Japan", flag:"🇯🇵", source:"Fast Retailing", initials:"TY", color:"#ff0000", photo:"https://specials-images.forbesimg.com/imageserve/66560a756b74351d5b0711e8/416x416.jpg?background=000000&cropX1=689&cropX2=1604&cropY1=78&cropY2=992" },
    { rank:33, name:"François Pinault", age:87, netWorth:64.3, company:"Kering", industry:"luxury", country:"🇫🇷 France", flag:"🇫🇷", source:"Kering", initials:"FP", color:"#b8860b", photo:"" },
    { rank:34, name:"Len Blavatnik", age:68, netWorth:63.9, company:"Access Industries", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Access Industries", initials:"LB", color:"#455a64", photo:"" },
    { rank:35, name:"Miriam Adelson", age:80, netWorth:62.6, company:"Las Vegas Sands", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Las Vegas Sands", initials:"MA", color:"#c62828", photo:"" },
    { rank:36, name:"Alain Wertheimer", age:77, netWorth:61.2, company:"Chanel", industry:"luxury", country:"🇫🇷 France", flag:"🇫🇷", source:"Chanel", initials:"AW", color:"#000", photo:"https://specials-images.forbesimg.com/imageserve/645d0add2a0a83a54a9aa149/416x416.jpg?background=000000&cropX1=0&cropX2=2730&cropY1=100&cropY2=2831" },
    { rank:37, name:"Ma Huateng", age:54, netWorth:53.8, company:"Tencent", industry:"tech", country:"🇨🇳 China", flag:"🇨🇳", source:"Tencent", initials:"MH", color:"#07c160", photo:"https://specials-images.forbesimg.com/imageserve/605e23c0f0986f688fbd3e15/416x416.jpg?background=000000&cropX1=0&cropX2=1080&cropY1=0&cropY2=1080" },
    { rank:38, name:"Jacqueline Mars", age:86, netWorth:49.1, company:"Mars Inc.", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Mars Inc.", initials:"JM", color:"#8b4513", photo:"https://specials-images.forbesimg.com/imageserve/59d50d06a7ea436b47b36d84/416x416.jpg?background=000000&cropX1=147&cropX2=1649&cropY1=377&cropY2=1879" },
    { rank:39, name:"John Mars", age:90, netWorth:49.1, company:"Mars Inc.", industry:"retail", country:"🇺🇸 USA", flag:"🇺🇸", source:"Mars Inc.", initials:"JM", color:"#8b4513", photo:"https://specials-images.forbesimg.com/imageserve/5ba41e08a7ea434e4c6948eb/416x416.jpg?background=000000&cropX1=53&cropX2=1401&cropY1=9&cropY2=1357" },
    { rank:40, name:"Ken Griffin", age:57, netWorth:49.8, company:"Citadel", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Citadel LLC", initials:"KG", color:"#1565c0", photo:"https://specials-images.forbesimg.com/imageserve/6247575a5af6af682d503f2f/416x416.jpg?background=000000&cropX1=0&cropX2=1966&cropY1=0&cropY2=1966" },
    { rank:41, name:"Giovanni Ferrero", age:61, netWorth:48.8, company:"Ferrero Group", industry:"retail", country:"🇮🇹 Italy", flag:"🇮🇹", source:"Ferrero", initials:"GF", color:"#6d4c41", photo:"https://specials-images.forbesimg.com/imageserve/5b11bc5ca7ea436b547f29cb/416x416.jpg?background=000000&cropX1=622&cropX2=1844&cropY1=361&cropY2=1582" },
    { rank:42, name:"Li Ka-shing", age:98, netWorth:45.1, company:"CK Hutchison", industry:"finance", country:"🇭🇰 Hong Kong", flag:"🇭🇰", source:"CK Hutchison", initials:"LK", color:"#bf360c", photo:"https://specials-images.forbesimg.com/imageserve/65d4c4432a6eece8368e841b/416x416.jpg?background=000000&cropX1=250&cropX2=1494&cropY1=226&cropY2=1471" },
    { rank:43, name:"Klaus-Michael Kühne", age:89, netWorth:41.9, company:"Kühne + Nagel", industry:"finance", country:"🇩🇪 Germany", flag:"🇩🇪", source:"Kühne + Nagel", initials:"KK", color:"#003580", photo:"https://specials-images.forbesimg.com/imageserve/5e762e4fc7b02d000666c89b/416x416.jpg?background=000000&cropX1=792&cropX2=4141&cropY1=0&cropY2=3347" },
    { rank:44, name:"David Tepper", age:68, netWorth:41.3, company:"Appaloosa Management", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Appaloosa Management", initials:"DT", color:"#1b5e20", photo:"" },
    { rank:45, name:"Steve Cohen", age:70, netWorth:40.8, company:"Point72", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Point72 Asset Mgmt", initials:"SC", color:"#1a237e", photo:"" },
    { rank:46, name:"Jim Simons Estate", age:0, netWorth:40.5, company:"Renaissance Technologies", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Renaissance Tech", initials:"JS", color:"#37474f", photo:"" },
    { rank:47, name:"Prajogo Pangestu", age:80, netWorth:40.2, company:"Barito Pacific", industry:"finance", country:"🇮🇩 Indonesia", flag:"🇮🇩", source:"Petrochemicals", initials:"PP", color:"#e65100", photo:"" },
    { rank:48, name:"Low Tuck Kwong", age:78, netWorth:39.8, company:"Bayan Resources", industry:"finance", country:"🇮🇩 Indonesia", flag:"🇮🇩", source:"Coal mining", initials:"LT", color:"#424242", photo:"" },
    { rank:49, name:"Gérard Wertheimer", age:73, netWorth:39.4, company:"Chanel", industry:"luxury", country:"🇫🇷 France", flag:"🇫🇷", source:"Chanel", initials:"GW", color:"#000", photo:"https://specials-images.forbesimg.com/imageserve/645d02e2c7d39022642796dd/416x416.jpg?background=000000&cropX1=1150&cropX2=4216&cropY1=0&cropY2=3068" },
    { rank:50, name:"Stephen Schwarzman", age:79, netWorth:38.3, company:"Blackstone", industry:"finance", country:"🇺🇸 USA", flag:"🇺🇸", source:"Blackstone", initials:"SS", color:"#212121", photo:"" },
];

// Company share price data (as of May 8, 2026)
const STOCK_DATA = {
    "Elon Musk": { ticker:"TSLA", price:428.35, chg:"+1.82%" },
    "Larry Page": { ticker:"GOOGL", price:400.80, chg:"+0.94%" },
    "Sergey Brin": { ticker:"GOOGL", price:400.80, chg:"+0.94%" },
    "Jeff Bezos": { ticker:"AMZN", price:272.66, chg:"+1.12%" },
    "Larry Ellison": { ticker:"ORCL", price:195.95, chg:"+0.68%" },
    "Mark Zuckerberg": { ticker:"META", price:609.63, chg:"+1.34%" },
    "Michael Dell": { ticker:"DELL", price:260.46, chg:"+0.92%" },
    "Jensen Huang": { ticker:"NVDA", price:215.20, chg:"+2.14%" },
    "Rob Walton": { ticker:"WMT", price:130.57, chg:"+0.38%" },
    "Bernard Arnault": { ticker:"MC.PA", price:478.00, chg:"-0.42%", currency:"€" },
    "Warren Buffett": { ticker:"BRK.B", price:475.94, chg:"+0.56%" },
    "Amancio Ortega": { ticker:"ITX.MC", price:51.80, chg:"+0.72%", currency:"€" },
    "Jim Walton": { ticker:"WMT", price:130.57, chg:"+0.38%" },
    "Alice Walton": { ticker:"WMT", price:130.57, chg:"+0.38%" },
    "Steve Ballmer": { ticker:"MSFT", price:415.12, chg:"+0.74%" },
    "Carlos Slim Helú": { ticker:"AMX", price:18.42, chg:"+0.33%" },
    "Changpeng Zhao": { ticker:"BNB", price:642.50, chg:"-1.23%", currency:"" },
    "Michael Bloomberg": { ticker:"Private", price:null, chg:"N/A" },
    "Bill Gates": { ticker:"MSFT", price:415.12, chg:"+0.74%" },
    "Françoise Bettencourt Meyers": { ticker:"OR.PA", price:368.45, chg:"+0.28%", currency:"€" },
    "Mukesh Ambani": { ticker:"RELIANCE", price:1452.30, chg:"+0.62%", currency:"₹" },
    "Giancarlo Devasini": { ticker:"USDT", price:1.00, chg:"0.00%", currency:"" },
    "Thomas Peterffy": { ticker:"IBKR", price:85.60, chg:"+1.05%" },
    "Julia Flesher Koch": { ticker:"Private", price:null, chg:"N/A" },
    "Masayoshi Son": { ticker:"9984.T", price:6131, chg:"+1.42%", currency:"¥" },
    "Charles Koch": { ticker:"Private", price:null, chg:"N/A" },
    "Qin Yinglin": { ticker:"002714.SZ", price:42.15, chg:"+0.88%", currency:"¥" },
    "Zhang Yiming": { ticker:"Private", price:null, chg:"N/A" },
    "Phil Knight": { ticker:"NKE", price:43.52, chg:"-0.45%" },
    "Dieter Schwarz": { ticker:"Private", price:null, chg:"N/A" },
    "Gautam Adani": { ticker:"ADANIENT", price:2508.40, chg:"+0.95%", currency:"₹" },
    "Tadashi Yanai": { ticker:"9983.T", price:38420, chg:"+0.64%", currency:"¥" },
    "François Pinault": { ticker:"KER.PA", price:247.30, chg:"-0.68%", currency:"€" },
    "Len Blavatnik": { ticker:"Private", price:null, chg:"N/A" },
    "Miriam Adelson": { ticker:"LVS", price:42.18, chg:"+0.52%" },
    "Alain Wertheimer": { ticker:"Private", price:null, chg:"N/A" },
    "Ma Huateng": { ticker:"0700.HK", price:468.60, chg:"+1.18%", currency:"HK$" },
    "Jacqueline Mars": { ticker:"Private", price:null, chg:"N/A" },
    "John Mars": { ticker:"Private", price:null, chg:"N/A" },
    "Ken Griffin": { ticker:"Private", price:null, chg:"N/A" },
    "Giovanni Ferrero": { ticker:"Private", price:null, chg:"N/A" },
    "Li Ka-shing": { ticker:"0001.HK", price:52.45, chg:"+0.38%", currency:"HK$" },
    "Klaus-Michael Kühne": { ticker:"KNIN.SW", price:224.80, chg:"+0.44%", currency:"CHF" },
    "David Tepper": { ticker:"Private", price:null, chg:"N/A" },
    "Steve Cohen": { ticker:"Private", price:null, chg:"N/A" },
    "Jim Simons Estate": { ticker:"Private", price:null, chg:"N/A" },
    "Prajogo Pangestu": { ticker:"BRPT.JK", price:1285, chg:"+0.78%", currency:"Rp" },
    "Low Tuck Kwong": { ticker:"BYAN.JK", price:16800, chg:"+0.60%", currency:"Rp" },
    "Gérard Wertheimer": { ticker:"Private", price:null, chg:"N/A" },
    "Stephen Schwarzman": { ticker:"BX", price:142.35, chg:"+0.88%" },
};

// Industry breakdown percentages
const INDUSTRY_DATA = [
    { label: "Technology", pct: 52 },
    { label: "Finance", pct: 18 },
    { label: "Luxury", pct: 12 },
    { label: "Retail", pct: 10 },
    { label: "Other", pct: 8 },
];

const REGION_DATA = [
    { label: "N. America", pct: 58 },
    { label: "Europe", pct: 22 },
    { label: "Asia", pct: 15 },
    { label: "Other", pct: 5 },
];

const KEY_METRICS = [
    { value: "3,428", label: "Total Billionaires" },
    { value: "$20.1T", label: "Combined Wealth" },
    { value: "$815.7B", label: "Richest Person" },
    { value: "78", label: "Countries" },
    { value: "+7.2%", label: "YoY Growth" },
    { value: "41", label: "Youngest Age (Top 50)" },
];

const MARKET_PULSE = [
    { label: "S&P 500", value: "5,842.31", change: "+0.82%", up: true },
    { label: "NASDAQ", value: "18,723.55", change: "+1.14%", up: true },
    { label: "Bitcoin", value: "$97,432", change: "-1.23%", up: false },
    { label: "Gold", value: "$3,412/oz", change: "+0.34%", up: true },
];

// Historical net worth data (billions) for chart – years 2021-2026
const CHART_DATA = {
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
    datasets: [
        { name: "Elon Musk", color: "#f0b232", data: [151, 219, 232, 442, 680, 815.7] },
        { name: "Larry Page", color: "#4285f4", data: [91, 111, 114, 156, 210, 324.3] },
        { name: "Jeff Bezos", color: "#ff9900", data: [177, 151, 114, 194, 215, 279.6] },
        { name: "Mark Zuckerberg", color: "#0668e1", data: [97, 55, 106, 177, 202, 208.3] },
        { name: "Bernard Arnault", color: "#d4a853", data: [150, 158, 211, 174, 165, 149] },
    ]
};

const TREND_HIGHLIGHTS = [
    { title: "🚀 Biggest Gainer (2025→26)", desc: "Elon Musk saw the largest absolute gain", value: "+$135.7B" },
    { title: "📈 AI Boom Effect", desc: "Tech billionaires added $800B+ from AI-driven stock surges", value: "+42% avg" },
    { title: "🌏 New Entrants", desc: "127 new billionaires joined the list this year", value: "127 new" },
    { title: "💎 Crypto Surge", desc: "Changpeng Zhao entered top 20 with Binance growth", value: "$110B" },
];

// Recent Billionaire News (May 2026)
const NEWS_DATA = [
    {
        title: "Larry Page Enters the $300 Billion Club",
        summary: "Google co-founder Larry Page saw his net worth surpass $300 billion, driven by a surge in Alphabet stock following strong quarterly earnings, becoming the 3rd person in history to reach this milestone.",
        source: "Forbes",
        time: "2 hours ago",
        related: "Larry Page",
        url: "https://news.google.com/search?q=Larry+Page+net+worth+300+billion"
    },
    {
        title: "LVMH Considers Strategic Divestments",
        summary: "Reports indicate LVMH, helmed by Bernard Arnault, is considering a plan to divest from some unprofitable assets within its Wines & Spirits division following revenue declines.",
        source: "Financial Times",
        time: "5 hours ago",
        related: "Bernard Arnault",
        url: "https://news.google.com/search?q=LVMH+strategic+divestments+Bernard+Arnault"
    },
    {
        title: "Gautam Adani Announces Major Restructuring",
        summary: "The Adani Group is moving to a leaner, three-layer organizational structure designed to accelerate decision-making and project execution across its infrastructure empire.",
        source: "Bloomberg",
        time: "1 day ago",
        related: "Gautam Adani",
        url: "https://news.google.com/search?q=Gautam+Adani+group+organizational+restructuring"
    },
    {
        title: "Nvidia's Huang Reaffirms California Commitment",
        summary: "At the Milken Institute Global Conference, Nvidia CEO Jensen Huang dismissed concerns over potential 'billionaire taxes,' calling them a 'way of giving back' while committing to remain in California.",
        source: "SFGate",
        time: "1 day ago",
        related: "Jensen Huang",
        url: "https://news.google.com/search?q=Nvidia+Jensen+Huang+California+billionaire+tax"
    },
    {
        title: "Bill Gates' TerraPower Breaks Ground on New Facility",
        summary: "TerraPower Isotopes began construction on a $450 million manufacturing facility in Philadelphia intended to become a major producer of actinium-225 for targeted cancer treatments.",
        source: "Reuters",
        time: "2 days ago",
        related: "Bill Gates",
        url: "https://news.google.com/search?q=Bill+Gates+TerraPower+Isotopes+facility"
    },
    {
        title: "Mukesh Ambani Eyes Satellite Communications",
        summary: "Reliance Industries is reportedly planning a major entry into the satellite internet market via Jio Platforms to directly compete with Starlink and Project Kuiper in India.",
        source: "Economic Times",
        time: "3 days ago",
        related: "Mukesh Ambani",
        url: "https://news.google.com/search?q=Mukesh+Ambani+Reliance+satellite+communications+Jio"
    }
];
