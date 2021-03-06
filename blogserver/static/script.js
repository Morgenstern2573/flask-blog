(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/linkifyjs/lib/linkify.js
  var require_linkify = __commonJS({
    "node_modules/linkifyjs/lib/linkify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function State(token) {
        this.j = {};
        this.jr = [];
        this.jd = null;
        this.t = token;
      }
      State.prototype = {
        accepts: function accepts() {
          return !!this.t;
        },
        tt: function tt(input, tokenOrState) {
          if (tokenOrState && tokenOrState.j) {
            this.j[input] = tokenOrState;
            return tokenOrState;
          }
          var token = tokenOrState;
          var nextState = this.j[input];
          if (nextState) {
            if (token) {
              nextState.t = token;
            }
            return nextState;
          }
          nextState = makeState();
          var templateState = takeT(this, input);
          if (templateState) {
            Object.assign(nextState.j, templateState.j);
            nextState.jr.append(templateState.jr);
            nextState.jr = templateState.jd;
            nextState.t = token || templateState.t;
          } else {
            nextState.t = token;
          }
          this.j[input] = nextState;
          return nextState;
        }
      };
      var makeState = function makeState2() {
        return new State();
      };
      var makeAcceptingState = function makeAcceptingState2(token) {
        return new State(token);
      };
      var makeT = function makeT2(startState, input, nextState) {
        if (!startState.j[input]) {
          startState.j[input] = nextState;
        }
      };
      var makeRegexT = function makeRegexT2(startState, regex, nextState) {
        startState.jr.push([regex, nextState]);
      };
      var takeT = function takeT2(state, input) {
        var nextState = state.j[input];
        if (nextState) {
          return nextState;
        }
        for (var i = 0; i < state.jr.length; i++) {
          var regex = state.jr[i][0];
          var _nextState = state.jr[i][1];
          if (regex.test(input)) {
            return _nextState;
          }
        }
        return state.jd;
      };
      var makeMultiT = function makeMultiT2(startState, chars, nextState) {
        for (var i = 0; i < chars.length; i++) {
          makeT(startState, chars[i], nextState);
        }
      };
      var makeBatchT = function makeBatchT2(startState, transitions) {
        for (var i = 0; i < transitions.length; i++) {
          var input = transitions[i][0];
          var nextState = transitions[i][1];
          makeT(startState, input, nextState);
        }
      };
      var makeChainT = function makeChainT2(state, str, endState, defaultStateFactory) {
        var i = 0, len = str.length, nextState;
        while (i < len && (nextState = state.j[str[i]])) {
          state = nextState;
          i++;
        }
        if (i >= len) {
          return [];
        }
        while (i < len - 1) {
          nextState = defaultStateFactory();
          makeT(state, str[i], nextState);
          state = nextState;
          i++;
        }
        makeT(state, str[len - 1], endState);
      };
      var DOMAIN = "DOMAIN";
      var LOCALHOST = "LOCALHOST";
      var TLD = "TLD";
      var NUM = "NUM";
      var PROTOCOL = "PROTOCOL";
      var MAILTO = "MAILTO";
      var WS = "WS";
      var NL = "NL";
      var OPENBRACE = "OPENBRACE";
      var OPENBRACKET = "OPENBRACKET";
      var OPENANGLEBRACKET = "OPENANGLEBRACKET";
      var OPENPAREN = "OPENPAREN";
      var CLOSEBRACE = "CLOSEBRACE";
      var CLOSEBRACKET = "CLOSEBRACKET";
      var CLOSEANGLEBRACKET = "CLOSEANGLEBRACKET";
      var CLOSEPAREN = "CLOSEPAREN";
      var AMPERSAND = "AMPERSAND";
      var APOSTROPHE = "APOSTROPHE";
      var ASTERISK = "ASTERISK";
      var AT = "AT";
      var BACKSLASH = "BACKSLASH";
      var BACKTICK = "BACKTICK";
      var CARET = "CARET";
      var COLON = "COLON";
      var COMMA = "COMMA";
      var DOLLAR = "DOLLAR";
      var DOT = "DOT";
      var EQUALS = "EQUALS";
      var EXCLAMATION = "EXCLAMATION";
      var HYPHEN = "HYPHEN";
      var PERCENT = "PERCENT";
      var PIPE = "PIPE";
      var PLUS = "PLUS";
      var POUND = "POUND";
      var QUERY = "QUERY";
      var QUOTE = "QUOTE";
      var SEMI = "SEMI";
      var SLASH = "SLASH";
      var TILDE = "TILDE";
      var UNDERSCORE = "UNDERSCORE";
      var SYM = "SYM";
      var text2 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        DOMAIN,
        LOCALHOST,
        TLD,
        NUM,
        PROTOCOL,
        MAILTO,
        WS,
        NL,
        OPENBRACE,
        OPENBRACKET,
        OPENANGLEBRACKET,
        OPENPAREN,
        CLOSEBRACE,
        CLOSEBRACKET,
        CLOSEANGLEBRACKET,
        CLOSEPAREN,
        AMPERSAND,
        APOSTROPHE,
        ASTERISK,
        AT,
        BACKSLASH,
        BACKTICK,
        CARET,
        COLON,
        COMMA,
        DOLLAR,
        DOT,
        EQUALS,
        EXCLAMATION,
        HYPHEN,
        PERCENT,
        PIPE,
        PLUS,
        POUND,
        QUERY,
        QUOTE,
        SEMI,
        SLASH,
        TILDE,
        UNDERSCORE,
        SYM
      });
      var tlds = "aaa aarp abarth abb abbott abbvie abc able abogado abudhabi ac academy accenture accountant accountants aco actor ad adac ads adult ae aeg aero aetna af afamilycompany afl africa ag agakhan agency ai aig airbus airforce airtel akdn al alfaromeo alibaba alipay allfinanz allstate ally alsace alstom am amazon americanexpress americanfamily amex amfam amica amsterdam analytics android anquan anz ao aol apartments app apple aq aquarelle ar arab aramco archi army arpa art arte as asda asia associates at athleta attorney au auction audi audible audio auspost author auto autos avianca aw aws ax axa az azure ba baby baidu banamex bananarepublic band bank bar barcelona barclaycard barclays barefoot bargains baseball basketball bauhaus bayern bb bbc bbt bbva bcg bcn bd be beats beauty beer bentley berlin best bestbuy bet bf bg bh bharti bi bible bid bike bing bingo bio biz bj black blackfriday blockbuster blog bloomberg blue bm bms bmw bn bnpparibas bo boats boehringer bofa bom bond boo book booking bosch bostik boston bot boutique box br bradesco bridgestone broadway broker brother brussels bs bt budapest bugatti build builders business buy buzz bv bw by bz bzh ca cab cafe cal call calvinklein cam camera camp cancerresearch canon capetown capital capitalone car caravan cards care career careers cars casa case cash casino cat catering catholic cba cbn cbre cbs cc cd center ceo cern cf cfa cfd cg ch chanel channel charity chase chat cheap chintai christmas chrome church ci cipriani circle cisco citadel citi citic city cityeats ck cl claims cleaning click clinic clinique clothing cloud club clubmed cm cn co coach codes coffee college cologne com comcast commbank community company compare computer comsec condos construction consulting contact contractors cooking cookingchannel cool coop corsica country coupon coupons courses cpa cr credit creditcard creditunion cricket crown crs cruise cruises csc cu cuisinella cv cw cx cy cymru cyou cz dabur dad dance data date dating datsun day dclk dds de deal dealer deals degree delivery dell deloitte delta democrat dental dentist desi design dev dhl diamonds diet digital direct directory discount discover dish diy dj dk dm dnp do docs doctor dog domains dot download drive dtv dubai duck dunlop dupont durban dvag dvr dz earth eat ec eco edeka edu education ee eg email emerck energy engineer engineering enterprises epson equipment er ericsson erni es esq estate et etisalat eu eurovision eus events exchange expert exposed express extraspace fage fail fairwinds faith family fan fans farm farmers fashion fast fedex feedback ferrari ferrero fi fiat fidelity fido film final finance financial fire firestone firmdale fish fishing fit fitness fj fk flickr flights flir florist flowers fly fm fo foo food foodnetwork football ford forex forsale forum foundation fox fr free fresenius frl frogans frontdoor frontier ftr fujitsu fujixerox fun fund furniture futbol fyi ga gal gallery gallo gallup game games gap garden gay gb gbiz gd gdn ge gea gent genting george gf gg ggee gh gi gift gifts gives giving gl glade glass gle global globo gm gmail gmbh gmo gmx gn godaddy gold goldpoint golf goo goodyear goog google gop got gov gp gq gr grainger graphics gratis green gripe grocery group gs gt gu guardian gucci guge guide guitars guru gw gy hair hamburg hangout haus hbo hdfc hdfcbank health healthcare help helsinki here hermes hgtv hiphop hisamitsu hitachi hiv hk hkt hm hn hockey holdings holiday homedepot homegoods homes homesense honda horse hospital host hosting hot hoteles hotels hotmail house how hr hsbc ht hu hughes hyatt hyundai ibm icbc ice icu id ie ieee ifm ikano il im imamat imdb immo immobilien in inc industries infiniti info ing ink institute insurance insure int international intuit investments io ipiranga iq ir irish is ismaili ist istanbul it itau itv iveco jaguar java jcb je jeep jetzt jewelry jio jll jm jmp jnj jo jobs joburg jot joy jp jpmorgan jprs juegos juniper kaufen kddi ke kerryhotels kerrylogistics kerryproperties kfh kg kh ki kia kim kinder kindle kitchen kiwi km kn koeln komatsu kosher kp kpmg kpn kr krd kred kuokgroup kw ky kyoto kz la lacaixa lamborghini lamer lancaster lancia land landrover lanxess lasalle lat latino latrobe law lawyer lb lc lds lease leclerc lefrak legal lego lexus lgbt li lidl life lifeinsurance lifestyle lighting like lilly limited limo lincoln linde link lipsy live living lixil lk llc llp loan loans locker locus loft lol london lotte lotto love lpl lplfinancial lr ls lt ltd ltda lu lundbeck luxe luxury lv ly ma macys madrid maif maison makeup man management mango map market marketing markets marriott marshalls maserati mattel mba mc mckinsey md me med media meet melbourne meme memorial men menu merckmsd mg mh miami microsoft mil mini mint mit mitsubishi mk ml mlb mls mm mma mn mo mobi mobile moda moe moi mom monash money monster mormon mortgage moscow moto motorcycles mov movie mp mq mr ms msd mt mtn mtr mu museum mutual mv mw mx my mz na nab nagoya name nationwide natura navy nba nc ne nec net netbank netflix network neustar new news next nextdirect nexus nf nfl ng ngo nhk ni nico nike nikon ninja nissan nissay nl no nokia northwesternmutual norton now nowruz nowtv np nr nra nrw ntt nu nyc nz obi observer off office okinawa olayan olayangroup oldnavy ollo om omega one ong onl online onyourside ooo open oracle orange org organic origins osaka otsuka ott ovh pa page panasonic paris pars partners parts party passagens pay pccw pe pet pf pfizer pg ph pharmacy phd philips phone photo photography photos physio pics pictet pictures pid pin ping pink pioneer pizza pk pl place play playstation plumbing plus pm pn pnc pohl poker politie porn post pr pramerica praxi press prime pro prod productions prof progressive promo properties property protection pru prudential ps pt pub pw pwc py qa qpon quebec quest qvc racing radio raid re read realestate realtor realty recipes red redstone redumbrella rehab reise reisen reit reliance ren rent rentals repair report republican rest restaurant review reviews rexroth rich richardli ricoh ril rio rip rmit ro rocher rocks rodeo rogers room rs rsvp ru rugby ruhr run rw rwe ryukyu sa saarland safe safety sakura sale salon samsclub samsung sandvik sandvikcoromant sanofi sap sarl sas save saxo sb sbi sbs sc sca scb schaeffler schmidt scholarships school schule schwarz science scjohnson scot sd se search seat secure security seek select sener services ses seven sew sex sexy sfr sg sh shangrila sharp shaw shell shia shiksha shoes shop shopping shouji show showtime si silk sina singles site sj sk ski skin sky skype sl sling sm smart smile sn sncf so soccer social softbank software sohu solar solutions song sony soy spa space sport spot spreadbetting sr srl ss st stada staples star statebank statefarm stc stcgroup stockholm storage store stream studio study style su sucks supplies supply support surf surgery suzuki sv swatch swiftcover swiss sx sy sydney systems sz tab taipei talk taobao target tatamotors tatar tattoo tax taxi tc tci td tdk team tech technology tel temasek tennis teva tf tg th thd theater theatre tiaa tickets tienda tiffany tips tires tirol tj tjmaxx tjx tk tkmaxx tl tm tmall tn to today tokyo tools top toray toshiba total tours town toyota toys tr trade trading training travel travelchannel travelers travelersinsurance trust trv tt tube tui tunes tushu tv tvs tw tz ua ubank ubs ug uk unicom university uno uol ups us uy uz va vacations vana vanguard vc ve vegas ventures verisign versicherung vet vg vi viajes video vig viking villas vin vip virgin visa vision viva vivo vlaanderen vn vodka volkswagen volvo vote voting voto voyage vu vuelos wales walmart walter wang wanggou watch watches weather weatherchannel webcam weber website wed wedding weibo weir wf whoswho wien wiki williamhill win windows wine winners wme wolterskluwer woodside work works world wow ws wtc wtf xbox xerox xfinity xihuan xin xxx xyz yachts yahoo yamaxun yandex ye yodobashi yoga yokohama you youtube yt yun za zappos zara zero zip zm zone zuerich zw verm\xF6gensberater-ctb verm\xF6gensberatung-pwb \u03B5\u03BB \u03B5\u03C5 \u0431\u0433 \u0431\u0435\u043B \u0434\u0435\u0442\u0438 \u0435\u044E \u043A\u0430\u0442\u043E\u043B\u0438\u043A \u043A\u043E\u043C \u049B\u0430\u0437 \u043C\u043A\u0434 \u043C\u043E\u043D \u043C\u043E\u0441\u043A\u0432\u0430 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u0440\u0433 \u0440\u0443\u0441 \u0440\u0444 \u0441\u0430\u0439\u0442 \u0441\u0440\u0431 \u0443\u043A\u0440 \u10D2\u10D4 \u0570\u0561\u0575 \u05D9\u05E9\u05E8\u05D0\u05DC \u05E7\u05D5\u05DD \u0627\u0628\u0648\u0638\u0628\u064A \u0627\u062A\u0635\u0627\u0644\u0627\u062A \u0627\u0631\u0627\u0645\u0643\u0648 \u0627\u0644\u0627\u0631\u062F\u0646 \u0627\u0644\u0628\u062D\u0631\u064A\u0646 \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0627\u0644\u0639\u0644\u064A\u0627\u0646 \u0627\u0644\u0645\u063A\u0631\u0628 \u0627\u0645\u0627\u0631\u0627\u062A \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627\u0631\u062A \u0628\u0627\u0632\u0627\u0631 \u0628\u06BE\u0627\u0631\u062A \u0628\u064A\u062A\u0643 \u067E\u0627\u06A9\u0633\u062A\u0627\u0646 \u0680\u0627\u0631\u062A \u062A\u0648\u0646\u0633 \u0633\u0648\u062F\u0627\u0646 \u0633\u0648\u0631\u064A\u0629 \u0634\u0628\u0643\u0629 \u0639\u0631\u0627\u0642 \u0639\u0631\u0628 \u0639\u0645\u0627\u0646 \u0641\u0644\u0633\u0637\u064A\u0646 \u0642\u0637\u0631 \u0643\u0627\u062B\u0648\u0644\u064A\u0643 \u0643\u0648\u0645 \u0645\u0635\u0631 \u0645\u0644\u064A\u0633\u064A\u0627 \u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627 \u0645\u0648\u0642\u0639 \u0647\u0645\u0631\u0627\u0647 \u0915\u0949\u092E \u0928\u0947\u091F \u092D\u093E\u0930\u0924 \u092D\u093E\u0930\u0924\u092E\u094D \u092D\u093E\u0930\u094B\u0924 \u0938\u0902\u0917\u0920\u0928 \u09AC\u09BE\u0982\u09B2\u09BE \u09AD\u09BE\u09B0\u09A4 \u09AD\u09BE\u09F0\u09A4 \u0A2D\u0A3E\u0A30\u0A24 \u0AAD\u0ABE\u0AB0\u0AA4 \u0B2D\u0B3E\u0B30\u0B24 \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE \u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8 \u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD \u0C2D\u0C3E\u0C30\u0C24\u0C4D \u0CAD\u0CBE\u0CB0\u0CA4 \u0D2D\u0D3E\u0D30\u0D24\u0D02 \u0DBD\u0D82\u0D9A\u0DCF \u0E04\u0E2D\u0E21 \u0E44\u0E17\u0E22 \u0EA5\u0EB2\u0EA7 \uB2F7\uB137 \uB2F7\uCEF4 \uC0BC\uC131 \uD55C\uAD6D \u30A2\u30DE\u30BE\u30F3 \u30B0\u30FC\u30B0\u30EB \u30AF\u30E9\u30A6\u30C9 \u30B3\u30E0 \u30B9\u30C8\u30A2 \u30BB\u30FC\u30EB \u30D5\u30A1\u30C3\u30B7\u30E7\u30F3 \u30DD\u30A4\u30F3\u30C8 \u307F\u3093\u306A \u4E16\u754C \u4E2D\u4FE1 \u4E2D\u56FD \u4E2D\u570B \u4E2D\u6587\u7F51 \u4E9A\u9A6C\u900A \u4F01\u4E1A \u4F5B\u5C71 \u4FE1\u606F \u5065\u5EB7 \u516B\u5366 \u516C\u53F8 \u516C\u76CA \u53F0\u6E7E \u53F0\u7063 \u5546\u57CE \u5546\u5E97 \u5546\u6807 \u5609\u91CC \u5609\u91CC\u5927\u9152\u5E97 \u5728\u7EBF \u5927\u4F17\u6C7D\u8F66 \u5927\u62FF \u5929\u4E3B\u6559 \u5A31\u4E50 \u5BB6\u96FB \u5E7F\u4E1C \u5FAE\u535A \u6148\u5584 \u6211\u7231\u4F60 \u624B\u673A \u62DB\u8058 \u653F\u52A1 \u653F\u5E9C \u65B0\u52A0\u5761 \u65B0\u95FB \u65F6\u5C1A \u66F8\u7C4D \u673A\u6784 \u6DE1\u9A6C\u9521 \u6E38\u620F \u6FB3\u9580 \u70B9\u770B \u79FB\u52A8 \u7EC4\u7EC7\u673A\u6784 \u7F51\u5740 \u7F51\u5E97 \u7F51\u7AD9 \u7F51\u7EDC \u8054\u901A \u8BFA\u57FA\u4E9A \u8C37\u6B4C \u8D2D\u7269 \u901A\u8CA9 \u96C6\u56E2 \u96FB\u8A0A\u76C8\u79D1 \u98DE\u5229\u6D66 \u98DF\u54C1 \u9910\u5385 \u9999\u683C\u91CC\u62C9 \u9999\u6E2F".split(" ");
      var LETTER = /(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/;
      var EMOJI = /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])/;
      var EMOJI_VARIATION = /\uFE0F/;
      var DIGIT = /\d/;
      var SPACE = /\s/;
      function init$2() {
        var customProtocols = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var S_START = makeState();
        var S_NUM = makeAcceptingState(NUM);
        var S_DOMAIN = makeAcceptingState(DOMAIN);
        var S_DOMAIN_HYPHEN = makeState();
        var S_WS = makeAcceptingState(WS);
        var DOMAIN_REGEX_TRANSITIONS = [[DIGIT, S_DOMAIN], [LETTER, S_DOMAIN], [EMOJI, S_DOMAIN], [EMOJI_VARIATION, S_DOMAIN]];
        var makeDomainState = function makeDomainState2() {
          var state = makeAcceptingState(DOMAIN);
          state.j = {
            "-": S_DOMAIN_HYPHEN
          };
          state.jr = [].concat(DOMAIN_REGEX_TRANSITIONS);
          return state;
        };
        var makeNearDomainState = function makeNearDomainState2(token) {
          var state = makeDomainState();
          state.t = token;
          return state;
        };
        makeBatchT(S_START, [["'", makeAcceptingState(APOSTROPHE)], ["{", makeAcceptingState(OPENBRACE)], ["[", makeAcceptingState(OPENBRACKET)], ["<", makeAcceptingState(OPENANGLEBRACKET)], ["(", makeAcceptingState(OPENPAREN)], ["}", makeAcceptingState(CLOSEBRACE)], ["]", makeAcceptingState(CLOSEBRACKET)], [">", makeAcceptingState(CLOSEANGLEBRACKET)], [")", makeAcceptingState(CLOSEPAREN)], ["&", makeAcceptingState(AMPERSAND)], ["*", makeAcceptingState(ASTERISK)], ["@", makeAcceptingState(AT)], ["`", makeAcceptingState(BACKTICK)], ["^", makeAcceptingState(CARET)], [":", makeAcceptingState(COLON)], [",", makeAcceptingState(COMMA)], ["$", makeAcceptingState(DOLLAR)], [".", makeAcceptingState(DOT)], ["=", makeAcceptingState(EQUALS)], ["!", makeAcceptingState(EXCLAMATION)], ["-", makeAcceptingState(HYPHEN)], ["%", makeAcceptingState(PERCENT)], ["|", makeAcceptingState(PIPE)], ["+", makeAcceptingState(PLUS)], ["#", makeAcceptingState(POUND)], ["?", makeAcceptingState(QUERY)], ['"', makeAcceptingState(QUOTE)], ["/", makeAcceptingState(SLASH)], [";", makeAcceptingState(SEMI)], ["~", makeAcceptingState(TILDE)], ["_", makeAcceptingState(UNDERSCORE)], ["\\", makeAcceptingState(BACKSLASH)]]);
        makeT(S_START, "\n", makeAcceptingState(NL));
        makeRegexT(S_START, SPACE, S_WS);
        makeT(S_WS, "\n", makeState());
        makeRegexT(S_WS, SPACE, S_WS);
        for (var i = 0; i < tlds.length; i++) {
          makeChainT(S_START, tlds[i], makeNearDomainState(TLD), makeDomainState);
        }
        var S_PROTOCOL_FILE = makeDomainState();
        var S_PROTOCOL_FTP = makeDomainState();
        var S_PROTOCOL_HTTP = makeDomainState();
        var S_MAILTO = makeDomainState();
        makeChainT(S_START, "file", S_PROTOCOL_FILE, makeDomainState);
        makeChainT(S_START, "ftp", S_PROTOCOL_FTP, makeDomainState);
        makeChainT(S_START, "http", S_PROTOCOL_HTTP, makeDomainState);
        makeChainT(S_START, "mailto", S_MAILTO, makeDomainState);
        var S_PROTOCOL_SECURE = makeDomainState();
        var S_FULL_PROTOCOL = makeAcceptingState(PROTOCOL);
        var S_FULL_MAILTO = makeAcceptingState(MAILTO);
        makeT(S_PROTOCOL_FTP, "s", S_PROTOCOL_SECURE);
        makeT(S_PROTOCOL_FTP, ":", S_FULL_PROTOCOL);
        makeT(S_PROTOCOL_HTTP, "s", S_PROTOCOL_SECURE);
        makeT(S_PROTOCOL_HTTP, ":", S_FULL_PROTOCOL);
        makeT(S_PROTOCOL_FILE, ":", S_FULL_PROTOCOL);
        makeT(S_PROTOCOL_SECURE, ":", S_FULL_PROTOCOL);
        makeT(S_MAILTO, ":", S_FULL_MAILTO);
        var S_CUSTOM_PROTOCOL = makeDomainState();
        for (var _i = 0; _i < customProtocols.length; _i++) {
          makeChainT(S_START, customProtocols[_i], S_CUSTOM_PROTOCOL, makeDomainState);
        }
        makeT(S_CUSTOM_PROTOCOL, ":", S_FULL_PROTOCOL);
        makeChainT(S_START, "localhost", makeNearDomainState(LOCALHOST), makeDomainState);
        makeRegexT(S_START, DIGIT, S_NUM);
        makeRegexT(S_START, LETTER, S_DOMAIN);
        makeRegexT(S_START, EMOJI, S_DOMAIN);
        makeRegexT(S_START, EMOJI_VARIATION, S_DOMAIN);
        makeRegexT(S_NUM, DIGIT, S_NUM);
        makeRegexT(S_NUM, LETTER, S_DOMAIN);
        makeRegexT(S_NUM, EMOJI, S_DOMAIN);
        makeRegexT(S_NUM, EMOJI_VARIATION, S_DOMAIN);
        makeT(S_NUM, "-", S_DOMAIN_HYPHEN);
        makeT(S_DOMAIN, "-", S_DOMAIN_HYPHEN);
        makeT(S_DOMAIN_HYPHEN, "-", S_DOMAIN_HYPHEN);
        makeRegexT(S_DOMAIN, DIGIT, S_DOMAIN);
        makeRegexT(S_DOMAIN, LETTER, S_DOMAIN);
        makeRegexT(S_DOMAIN, EMOJI, S_DOMAIN);
        makeRegexT(S_DOMAIN, EMOJI_VARIATION, S_DOMAIN);
        makeRegexT(S_DOMAIN_HYPHEN, DIGIT, S_DOMAIN);
        makeRegexT(S_DOMAIN_HYPHEN, LETTER, S_DOMAIN);
        makeRegexT(S_DOMAIN_HYPHEN, EMOJI, S_DOMAIN);
        makeRegexT(S_DOMAIN_HYPHEN, EMOJI_VARIATION, S_DOMAIN);
        S_START.jd = makeAcceptingState(SYM);
        return S_START;
      }
      function run$12(start3, str) {
        var iterable = stringToArray(str.replace(/[A-Z]/g, function(c) {
          return c.toLowerCase();
        }));
        var charCount = iterable.length;
        var tokens = [];
        var cursor = 0;
        var charCursor = 0;
        while (charCursor < charCount) {
          var state = start3;
          var nextState = null;
          var tokenLength = 0;
          var latestAccepting = null;
          var sinceAccepts = -1;
          var charsSinceAccepts = -1;
          while (charCursor < charCount && (nextState = takeT(state, iterable[charCursor]))) {
            state = nextState;
            if (state.accepts()) {
              sinceAccepts = 0;
              charsSinceAccepts = 0;
              latestAccepting = state;
            } else if (sinceAccepts >= 0) {
              sinceAccepts += iterable[charCursor].length;
              charsSinceAccepts++;
            }
            tokenLength += iterable[charCursor].length;
            cursor += iterable[charCursor].length;
            charCursor++;
          }
          cursor -= sinceAccepts;
          charCursor -= charsSinceAccepts;
          tokenLength -= sinceAccepts;
          tokens.push({
            t: latestAccepting.t,
            v: str.substr(cursor - tokenLength, tokenLength),
            s: cursor - tokenLength,
            e: cursor
          });
        }
        return tokens;
      }
      function stringToArray(str) {
        var result2 = [];
        var len = str.length;
        var index2 = 0;
        while (index2 < len) {
          var first2 = str.charCodeAt(index2);
          var second = void 0;
          var char = first2 < 55296 || first2 > 56319 || index2 + 1 === len || (second = str.charCodeAt(index2 + 1)) < 56320 || second > 57343 ? str[index2] : str.slice(index2, index2 + 2);
          result2.push(char);
          index2 += char.length;
        }
        return result2;
      }
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var defaults = {
        defaultProtocol: "http",
        events: null,
        format: noop,
        formatHref: noop,
        nl2br: false,
        tagName: "a",
        target: null,
        rel: null,
        validate: true,
        truncate: 0,
        className: null,
        attributes: null,
        ignoreTags: []
      };
      function Options(opts) {
        opts = opts || {};
        this.defaultProtocol = "defaultProtocol" in opts ? opts.defaultProtocol : defaults.defaultProtocol;
        this.events = "events" in opts ? opts.events : defaults.events;
        this.format = "format" in opts ? opts.format : defaults.format;
        this.formatHref = "formatHref" in opts ? opts.formatHref : defaults.formatHref;
        this.nl2br = "nl2br" in opts ? opts.nl2br : defaults.nl2br;
        this.tagName = "tagName" in opts ? opts.tagName : defaults.tagName;
        this.target = "target" in opts ? opts.target : defaults.target;
        this.rel = "rel" in opts ? opts.rel : defaults.rel;
        this.validate = "validate" in opts ? opts.validate : defaults.validate;
        this.truncate = "truncate" in opts ? opts.truncate : defaults.truncate;
        this.className = "className" in opts ? opts.className : defaults.className;
        this.attributes = opts.attributes || defaults.attributes;
        this.ignoreTags = [];
        var ignoredTags = "ignoreTags" in opts ? opts.ignoreTags : defaults.ignoreTags;
        for (var i = 0; i < ignoredTags.length; i++) {
          this.ignoreTags.push(ignoredTags[i].toUpperCase());
        }
      }
      Options.prototype = {
        resolve: function resolve7(token) {
          var href = token.toHref(this.defaultProtocol);
          return {
            formatted: this.get("format", token.toString(), token),
            formattedHref: this.get("formatHref", href, token),
            tagName: this.get("tagName", href, token),
            className: this.get("className", href, token),
            target: this.get("target", href, token),
            rel: this.get("rel", href, token),
            events: this.getObject("events", href, token),
            attributes: this.getObject("attributes", href, token),
            truncate: this.get("truncate", href, token)
          };
        },
        check: function check2(token) {
          return this.get("validate", token.toString(), token);
        },
        get: function get3(key, operator, token) {
          var option = this[key];
          if (!option) {
            return option;
          }
          var optionValue;
          switch (_typeof(option)) {
            case "function":
              return option(operator, token.t);
            case "object":
              optionValue = token.t in option ? option[token.t] : defaults[key];
              return typeof optionValue === "function" ? optionValue(operator, token.t) : optionValue;
          }
          return option;
        },
        getObject: function getObject(key, operator, token) {
          var option = this[key];
          return typeof option === "function" ? option(operator, token.t) : option;
        }
      };
      function noop(val) {
        return val;
      }
      var options = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        defaults,
        Options
      });
      function inherits(parent, child3) {
        var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var extended = Object.create(parent.prototype);
        for (var p in props) {
          extended[p] = props[p];
        }
        extended.constructor = child3;
        child3.prototype = extended;
        return child3;
      }
      function MultiToken() {
      }
      MultiToken.prototype = {
        t: "token",
        isLink: false,
        toString: function toString7() {
          return this.v;
        },
        toHref: function toHref() {
          return this.toString();
        },
        startIndex: function startIndex() {
          return this.tk[0].s;
        },
        endIndex: function endIndex() {
          return this.tk[this.tk.length - 1].e;
        },
        toObject: function toObject() {
          var protocol = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaults.defaultProtocol;
          return {
            type: this.t,
            value: this.v,
            isLink: this.isLink,
            href: this.toHref(protocol),
            start: this.startIndex(),
            end: this.endIndex()
          };
        }
      };
      function createTokenClass(type, props) {
        function Token(value, tokens) {
          this.t = type;
          this.v = value;
          this.tk = tokens;
        }
        inherits(MultiToken, Token, props);
        return Token;
      }
      var MailtoEmail = createTokenClass("email", {
        isLink: true
      });
      var Email = createTokenClass("email", {
        isLink: true,
        toHref: function toHref() {
          return "mailto:" + this.toString();
        }
      });
      var Text2 = createTokenClass("text");
      var Nl = createTokenClass("nl");
      var Url = createTokenClass("url", {
        isLink: true,
        toHref: function toHref() {
          var protocol = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaults.defaultProtocol;
          var tokens = this.tk;
          var hasProtocol = false;
          var hasSlashSlash = false;
          var result2 = [];
          var i = 0;
          while (tokens[i].t === PROTOCOL) {
            hasProtocol = true;
            result2.push(tokens[i].v);
            i++;
          }
          while (tokens[i].t === SLASH) {
            hasSlashSlash = true;
            result2.push(tokens[i].v);
            i++;
          }
          for (; i < tokens.length; i++) {
            result2.push(tokens[i].v);
          }
          result2 = result2.join("");
          if (!(hasProtocol || hasSlashSlash)) {
            result2 = "".concat(protocol, "://").concat(result2);
          }
          return result2;
        },
        hasProtocol: function hasProtocol() {
          return this.tk[0].t === PROTOCOL;
        }
      });
      var multi = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        MultiToken,
        Base: MultiToken,
        createTokenClass,
        MailtoEmail,
        Email,
        Text: Text2,
        Nl,
        Url
      });
      function init$1() {
        var S_START = makeState();
        var S_PROTOCOL = makeState();
        var S_MAILTO = makeState();
        var S_PROTOCOL_SLASH = makeState();
        var S_PROTOCOL_SLASH_SLASH = makeState();
        var S_DOMAIN = makeState();
        var S_DOMAIN_DOT = makeState();
        var S_TLD = makeAcceptingState(Url);
        var S_TLD_COLON = makeState();
        var S_TLD_PORT = makeAcceptingState(Url);
        var S_URL = makeAcceptingState(Url);
        var S_URL_NON_ACCEPTING = makeState();
        var S_URL_OPENBRACE = makeState();
        var S_URL_OPENBRACKET = makeState();
        var S_URL_OPENANGLEBRACKET = makeState();
        var S_URL_OPENPAREN = makeState();
        var S_URL_OPENBRACE_Q = makeAcceptingState(Url);
        var S_URL_OPENBRACKET_Q = makeAcceptingState(Url);
        var S_URL_OPENANGLEBRACKET_Q = makeAcceptingState(Url);
        var S_URL_OPENPAREN_Q = makeAcceptingState(Url);
        var S_URL_OPENBRACE_SYMS = makeState();
        var S_URL_OPENBRACKET_SYMS = makeState();
        var S_URL_OPENANGLEBRACKET_SYMS = makeState();
        var S_URL_OPENPAREN_SYMS = makeState();
        var S_EMAIL_DOMAIN = makeState();
        var S_EMAIL_DOMAIN_DOT = makeState();
        var S_EMAIL = makeAcceptingState(Email);
        var S_EMAIL_COLON = makeState();
        var S_EMAIL_PORT = makeAcceptingState(Email);
        var S_MAILTO_EMAIL = makeAcceptingState(MailtoEmail);
        var S_MAILTO_EMAIL_NON_ACCEPTING = makeState();
        var S_LOCALPART = makeState();
        var S_LOCALPART_AT = makeState();
        var S_LOCALPART_DOT = makeState();
        var S_NL = makeAcceptingState(Nl);
        makeT(S_START, NL, S_NL);
        makeT(S_START, PROTOCOL, S_PROTOCOL);
        makeT(S_START, MAILTO, S_MAILTO);
        makeT(S_PROTOCOL, SLASH, S_PROTOCOL_SLASH);
        makeT(S_PROTOCOL_SLASH, SLASH, S_PROTOCOL_SLASH_SLASH);
        makeT(S_START, TLD, S_DOMAIN);
        makeT(S_START, DOMAIN, S_DOMAIN);
        makeT(S_START, LOCALHOST, S_TLD);
        makeT(S_START, NUM, S_DOMAIN);
        makeT(S_PROTOCOL_SLASH_SLASH, TLD, S_URL);
        makeT(S_PROTOCOL_SLASH_SLASH, DOMAIN, S_URL);
        makeT(S_PROTOCOL_SLASH_SLASH, NUM, S_URL);
        makeT(S_PROTOCOL_SLASH_SLASH, LOCALHOST, S_URL);
        makeT(S_DOMAIN, DOT, S_DOMAIN_DOT);
        makeT(S_EMAIL_DOMAIN, DOT, S_EMAIL_DOMAIN_DOT);
        makeT(S_DOMAIN_DOT, TLD, S_TLD);
        makeT(S_DOMAIN_DOT, DOMAIN, S_DOMAIN);
        makeT(S_DOMAIN_DOT, NUM, S_DOMAIN);
        makeT(S_DOMAIN_DOT, LOCALHOST, S_DOMAIN);
        makeT(S_EMAIL_DOMAIN_DOT, TLD, S_EMAIL);
        makeT(S_EMAIL_DOMAIN_DOT, DOMAIN, S_EMAIL_DOMAIN);
        makeT(S_EMAIL_DOMAIN_DOT, NUM, S_EMAIL_DOMAIN);
        makeT(S_EMAIL_DOMAIN_DOT, LOCALHOST, S_EMAIL_DOMAIN);
        makeT(S_TLD, DOT, S_DOMAIN_DOT);
        makeT(S_EMAIL, DOT, S_EMAIL_DOMAIN_DOT);
        makeT(S_TLD, COLON, S_TLD_COLON);
        makeT(S_TLD, SLASH, S_URL);
        makeT(S_TLD_COLON, NUM, S_TLD_PORT);
        makeT(S_TLD_PORT, SLASH, S_URL);
        makeT(S_EMAIL, COLON, S_EMAIL_COLON);
        makeT(S_EMAIL_COLON, NUM, S_EMAIL_PORT);
        var qsAccepting = [AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, DOMAIN, EQUALS, HYPHEN, LOCALHOST, NUM, PERCENT, PIPE, PLUS, POUND, PROTOCOL, SLASH, SYM, TILDE, TLD, UNDERSCORE];
        var qsNonAccepting = [APOSTROPHE, CLOSEANGLEBRACKET, CLOSEBRACE, CLOSEBRACKET, CLOSEPAREN, COLON, COMMA, DOT, EXCLAMATION, OPENANGLEBRACKET, OPENBRACE, OPENBRACKET, OPENPAREN, QUERY, QUOTE, SEMI];
        makeT(S_URL, OPENBRACE, S_URL_OPENBRACE);
        makeT(S_URL, OPENBRACKET, S_URL_OPENBRACKET);
        makeT(S_URL, OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET);
        makeT(S_URL, OPENPAREN, S_URL_OPENPAREN);
        makeT(S_URL_NON_ACCEPTING, OPENBRACE, S_URL_OPENBRACE);
        makeT(S_URL_NON_ACCEPTING, OPENBRACKET, S_URL_OPENBRACKET);
        makeT(S_URL_NON_ACCEPTING, OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET);
        makeT(S_URL_NON_ACCEPTING, OPENPAREN, S_URL_OPENPAREN);
        makeT(S_URL_OPENBRACE, CLOSEBRACE, S_URL);
        makeT(S_URL_OPENBRACKET, CLOSEBRACKET, S_URL);
        makeT(S_URL_OPENANGLEBRACKET, CLOSEANGLEBRACKET, S_URL);
        makeT(S_URL_OPENPAREN, CLOSEPAREN, S_URL);
        makeT(S_URL_OPENBRACE_Q, CLOSEBRACE, S_URL);
        makeT(S_URL_OPENBRACKET_Q, CLOSEBRACKET, S_URL);
        makeT(S_URL_OPENANGLEBRACKET_Q, CLOSEANGLEBRACKET, S_URL);
        makeT(S_URL_OPENPAREN_Q, CLOSEPAREN, S_URL);
        makeT(S_URL_OPENBRACE_SYMS, CLOSEBRACE, S_URL);
        makeT(S_URL_OPENBRACKET_SYMS, CLOSEBRACKET, S_URL);
        makeT(S_URL_OPENANGLEBRACKET_SYMS, CLOSEANGLEBRACKET, S_URL);
        makeT(S_URL_OPENPAREN_SYMS, CLOSEPAREN, S_URL);
        makeMultiT(S_URL_OPENBRACE, qsAccepting, S_URL_OPENBRACE_Q);
        makeMultiT(S_URL_OPENBRACKET, qsAccepting, S_URL_OPENBRACKET_Q);
        makeMultiT(S_URL_OPENANGLEBRACKET, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
        makeMultiT(S_URL_OPENPAREN, qsAccepting, S_URL_OPENPAREN_Q);
        makeMultiT(S_URL_OPENBRACE, qsNonAccepting, S_URL_OPENBRACE_SYMS);
        makeMultiT(S_URL_OPENBRACKET, qsNonAccepting, S_URL_OPENBRACKET_SYMS);
        makeMultiT(S_URL_OPENANGLEBRACKET, qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
        makeMultiT(S_URL_OPENPAREN, qsNonAccepting, S_URL_OPENPAREN_SYMS);
        makeMultiT(S_URL_OPENBRACE_Q, qsAccepting, S_URL_OPENBRACE_Q);
        makeMultiT(S_URL_OPENBRACKET_Q, qsAccepting, S_URL_OPENBRACKET_Q);
        makeMultiT(S_URL_OPENANGLEBRACKET_Q, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
        makeMultiT(S_URL_OPENPAREN_Q, qsAccepting, S_URL_OPENPAREN_Q);
        makeMultiT(S_URL_OPENBRACE_Q, qsNonAccepting, S_URL_OPENBRACE_Q);
        makeMultiT(S_URL_OPENBRACKET_Q, qsNonAccepting, S_URL_OPENBRACKET_Q);
        makeMultiT(S_URL_OPENANGLEBRACKET_Q, qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
        makeMultiT(S_URL_OPENPAREN_Q, qsNonAccepting, S_URL_OPENPAREN_Q);
        makeMultiT(S_URL_OPENBRACE_SYMS, qsAccepting, S_URL_OPENBRACE_Q);
        makeMultiT(S_URL_OPENBRACKET_SYMS, qsAccepting, S_URL_OPENBRACKET_Q);
        makeMultiT(S_URL_OPENANGLEBRACKET_SYMS, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
        makeMultiT(S_URL_OPENPAREN_SYMS, qsAccepting, S_URL_OPENPAREN_Q);
        makeMultiT(S_URL_OPENBRACE_SYMS, qsNonAccepting, S_URL_OPENBRACE_SYMS);
        makeMultiT(S_URL_OPENBRACKET_SYMS, qsNonAccepting, S_URL_OPENBRACKET_SYMS);
        makeMultiT(S_URL_OPENANGLEBRACKET_SYMS, qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
        makeMultiT(S_URL_OPENPAREN_SYMS, qsNonAccepting, S_URL_OPENPAREN_SYMS);
        makeMultiT(S_URL, qsAccepting, S_URL);
        makeMultiT(S_URL_NON_ACCEPTING, qsAccepting, S_URL);
        makeMultiT(S_URL, qsNonAccepting, S_URL_NON_ACCEPTING);
        makeMultiT(S_URL_NON_ACCEPTING, qsNonAccepting, S_URL_NON_ACCEPTING);
        makeT(S_MAILTO, TLD, S_MAILTO_EMAIL);
        makeT(S_MAILTO, DOMAIN, S_MAILTO_EMAIL);
        makeT(S_MAILTO, NUM, S_MAILTO_EMAIL);
        makeT(S_MAILTO, LOCALHOST, S_MAILTO_EMAIL);
        makeMultiT(S_MAILTO_EMAIL, qsAccepting, S_MAILTO_EMAIL);
        makeMultiT(S_MAILTO_EMAIL, qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
        makeMultiT(S_MAILTO_EMAIL_NON_ACCEPTING, qsAccepting, S_MAILTO_EMAIL);
        makeMultiT(S_MAILTO_EMAIL_NON_ACCEPTING, qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
        var localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, CLOSEBRACE, DOLLAR, DOMAIN, EQUALS, HYPHEN, NUM, OPENBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, TLD, UNDERSCORE];
        makeMultiT(S_DOMAIN, localpartAccepting, S_LOCALPART);
        makeT(S_DOMAIN, AT, S_LOCALPART_AT);
        makeMultiT(S_TLD, localpartAccepting, S_LOCALPART);
        makeT(S_TLD, AT, S_LOCALPART_AT);
        makeMultiT(S_DOMAIN_DOT, localpartAccepting, S_LOCALPART);
        makeMultiT(S_LOCALPART, localpartAccepting, S_LOCALPART);
        makeT(S_LOCALPART, AT, S_LOCALPART_AT);
        makeT(S_LOCALPART, DOT, S_LOCALPART_DOT);
        makeMultiT(S_LOCALPART_DOT, localpartAccepting, S_LOCALPART);
        makeT(S_LOCALPART_AT, TLD, S_EMAIL_DOMAIN);
        makeT(S_LOCALPART_AT, DOMAIN, S_EMAIL_DOMAIN);
        makeT(S_LOCALPART_AT, NUM, S_EMAIL_DOMAIN);
        makeT(S_LOCALPART_AT, LOCALHOST, S_EMAIL);
        return S_START;
      }
      function run2(start3, input, tokens) {
        var len = tokens.length;
        var cursor = 0;
        var multis = [];
        var textTokens = [];
        while (cursor < len) {
          var state = start3;
          var secondState = null;
          var nextState = null;
          var multiLength = 0;
          var latestAccepting = null;
          var sinceAccepts = -1;
          while (cursor < len && !(secondState = takeT(state, tokens[cursor].t))) {
            textTokens.push(tokens[cursor++]);
          }
          while (cursor < len && (nextState = secondState || takeT(state, tokens[cursor].t))) {
            secondState = null;
            state = nextState;
            if (state.accepts()) {
              sinceAccepts = 0;
              latestAccepting = state;
            } else if (sinceAccepts >= 0) {
              sinceAccepts++;
            }
            cursor++;
            multiLength++;
          }
          if (sinceAccepts < 0) {
            for (var i = cursor - multiLength; i < cursor; i++) {
              textTokens.push(tokens[i]);
            }
          } else {
            if (textTokens.length > 0) {
              multis.push(parserCreateMultiToken(Text2, input, textTokens));
              textTokens = [];
            }
            cursor -= sinceAccepts;
            multiLength -= sinceAccepts;
            var Multi = latestAccepting.t;
            var subtokens = tokens.slice(cursor - multiLength, cursor);
            multis.push(parserCreateMultiToken(Multi, input, subtokens));
          }
        }
        if (textTokens.length > 0) {
          multis.push(parserCreateMultiToken(Text2, input, textTokens));
        }
        return multis;
      }
      function parserCreateMultiToken(Multi, input, tokens) {
        var startIdx = tokens[0].s;
        var endIdx = tokens[tokens.length - 1].e;
        var value = input.substr(startIdx, endIdx - startIdx);
        return new Multi(value, tokens);
      }
      var warn = typeof console !== "undefined" && console && console.warn || function() {
      };
      var INIT = {
        scanner: null,
        parser: null,
        pluginQueue: [],
        customProtocols: [],
        initialized: false
      };
      function reset() {
        INIT.scanner = null;
        INIT.parser = null;
        INIT.pluginQueue = [];
        INIT.customProtocols = [];
        INIT.initialized = false;
      }
      function registerPlugin(name, plugin) {
        for (var i = 0; i < INIT.pluginQueue.length; i++) {
          if (name === INIT.pluginQueue[i][0]) {
            warn('linkifyjs: plugin "'.concat(name, '" already registered - will be overwritten'));
            INIT.pluginQueue[i] = [name, plugin];
            return;
          }
        }
        INIT.pluginQueue.push([name, plugin]);
        if (INIT.initialized) {
          warn('linkifyjs: already initialized - will not register plugin "'.concat(name, '" until you manually call linkify.init(). To avoid this warning, please register all plugins before invoking linkify the first time.'));
        }
      }
      function registerCustomProtocol(protocol) {
        if (INIT.initialized) {
          warn('linkifyjs: already initialized - will not register custom protocol "'.concat(protocol, '" until you manually call linkify.init(). To avoid this warning, please register all custom protocols before invoking linkify the first time.'));
        }
        if (!/^[a-z-]+$/.test(protocol)) {
          throw Error("linkifyjs: protocols containing characters other than a-z or - (hyphen) are not supported");
        }
        INIT.customProtocols.push(protocol);
      }
      function init5() {
        INIT.scanner = {
          start: init$2(INIT.customProtocols),
          tokens: text2
        };
        INIT.parser = {
          start: init$1(),
          tokens: multi
        };
        var utils = {
          createTokenClass
        };
        for (var i = 0; i < INIT.pluginQueue.length; i++) {
          INIT.pluginQueue[i][1]({
            scanner: INIT.scanner,
            parser: INIT.parser,
            utils
          });
        }
        INIT.initialized = true;
      }
      function tokenize2(str) {
        if (!INIT.initialized) {
          init5();
        }
        return run2(INIT.parser.start, str, run$12(INIT.scanner.start, str));
      }
      function find3(str) {
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var tokens = tokenize2(str);
        var filtered = [];
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (token.isLink && (!type || token.t === type)) {
            filtered.push(token.toObject());
          }
        }
        return filtered;
      }
      function test(str) {
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var tokens = tokenize2(str);
        return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].t === type);
      }
      exports.Options = Options;
      exports.find = find3;
      exports.init = init5;
      exports.options = options;
      exports.registerCustomProtocol = registerCustomProtocol;
      exports.registerPlugin = registerPlugin;
      exports.reset = reset;
      exports.test = test;
      exports.tokenize = tokenize2;
    }
  });

  // node_modules/linkifyjs/index.js
  var require_linkifyjs = __commonJS({
    "node_modules/linkifyjs/index.js"(exports, module) {
      module.exports = require_linkify();
    }
  });

  // node_modules/orderedmap/index.es.js
  function OrderedMap(content2) {
    this.content = content2;
  }
  OrderedMap.prototype = {
    constructor: OrderedMap,
    find: function(key) {
      for (var i = 0; i < this.content.length; i += 2)
        if (this.content[i] === key)
          return i;
      return -1;
    },
    get: function(key) {
      var found2 = this.find(key);
      return found2 == -1 ? void 0 : this.content[found2 + 1];
    },
    update: function(key, value, newKey) {
      var self = newKey && newKey != key ? this.remove(newKey) : this;
      var found2 = self.find(key), content2 = self.content.slice();
      if (found2 == -1) {
        content2.push(newKey || key, value);
      } else {
        content2[found2 + 1] = value;
        if (newKey)
          content2[found2] = newKey;
      }
      return new OrderedMap(content2);
    },
    remove: function(key) {
      var found2 = this.find(key);
      if (found2 == -1)
        return this;
      var content2 = this.content.slice();
      content2.splice(found2, 2);
      return new OrderedMap(content2);
    },
    addToStart: function(key, value) {
      return new OrderedMap([key, value].concat(this.remove(key).content));
    },
    addToEnd: function(key, value) {
      var content2 = this.remove(key).content.slice();
      content2.push(key, value);
      return new OrderedMap(content2);
    },
    addBefore: function(place, key, value) {
      var without = this.remove(key), content2 = without.content.slice();
      var found2 = without.find(place);
      content2.splice(found2 == -1 ? content2.length : found2, 0, key, value);
      return new OrderedMap(content2);
    },
    forEach: function(f) {
      for (var i = 0; i < this.content.length; i += 2)
        f(this.content[i], this.content[i + 1]);
    },
    prepend: function(map15) {
      map15 = OrderedMap.from(map15);
      if (!map15.size)
        return this;
      return new OrderedMap(map15.content.concat(this.subtract(map15).content));
    },
    append: function(map15) {
      map15 = OrderedMap.from(map15);
      if (!map15.size)
        return this;
      return new OrderedMap(this.subtract(map15).content.concat(map15.content));
    },
    subtract: function(map15) {
      var result2 = this;
      map15 = OrderedMap.from(map15);
      for (var i = 0; i < map15.content.length; i += 2)
        result2 = result2.remove(map15.content[i]);
      return result2;
    },
    get size() {
      return this.content.length >> 1;
    }
  };
  OrderedMap.from = function(value) {
    if (value instanceof OrderedMap)
      return value;
    var content2 = [];
    if (value)
      for (var prop in value)
        content2.push(prop, value[prop]);
    return new OrderedMap(content2);
  };
  var orderedmap = OrderedMap;
  var index_es_default = orderedmap;

  // node_modules/prosemirror-model/dist/index.es.js
  function findDiffStart(a, b, pos) {
    for (var i = 0; ; i++) {
      if (i == a.childCount || i == b.childCount) {
        return a.childCount == b.childCount ? null : pos;
      }
      var childA = a.child(i), childB = b.child(i);
      if (childA == childB) {
        pos += childA.nodeSize;
        continue;
      }
      if (!childA.sameMarkup(childB)) {
        return pos;
      }
      if (childA.isText && childA.text != childB.text) {
        for (var j = 0; childA.text[j] == childB.text[j]; j++) {
          pos++;
        }
        return pos;
      }
      if (childA.content.size || childB.content.size) {
        var inner = findDiffStart(childA.content, childB.content, pos + 1);
        if (inner != null) {
          return inner;
        }
      }
      pos += childA.nodeSize;
    }
  }
  function findDiffEnd(a, b, posA, posB) {
    for (var iA = a.childCount, iB = b.childCount; ; ) {
      if (iA == 0 || iB == 0) {
        return iA == iB ? null : { a: posA, b: posB };
      }
      var childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
      if (childA == childB) {
        posA -= size;
        posB -= size;
        continue;
      }
      if (!childA.sameMarkup(childB)) {
        return { a: posA, b: posB };
      }
      if (childA.isText && childA.text != childB.text) {
        var same = 0, minSize = Math.min(childA.text.length, childB.text.length);
        while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
          same++;
          posA--;
          posB--;
        }
        return { a: posA, b: posB };
      }
      if (childA.content.size || childB.content.size) {
        var inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
        if (inner) {
          return inner;
        }
      }
      posA -= size;
      posB -= size;
    }
  }
  var Fragment = function Fragment2(content2, size) {
    this.content = content2;
    this.size = size || 0;
    if (size == null) {
      for (var i = 0; i < content2.length; i++) {
        this.size += content2[i].nodeSize;
      }
    }
  };
  var prototypeAccessors = { firstChild: { configurable: true }, lastChild: { configurable: true }, childCount: { configurable: true } };
  Fragment.prototype.nodesBetween = function nodesBetween(from4, to, f, nodeStart, parent) {
    if (nodeStart === void 0)
      nodeStart = 0;
    for (var i = 0, pos = 0; pos < to; i++) {
      var child3 = this.content[i], end2 = pos + child3.nodeSize;
      if (end2 > from4 && f(child3, nodeStart + pos, parent, i) !== false && child3.content.size) {
        var start3 = pos + 1;
        child3.nodesBetween(Math.max(0, from4 - start3), Math.min(child3.content.size, to - start3), f, nodeStart + start3);
      }
      pos = end2;
    }
  };
  Fragment.prototype.descendants = function descendants(f) {
    this.nodesBetween(0, this.size, f);
  };
  Fragment.prototype.textBetween = function textBetween(from4, to, blockSeparator, leafText) {
    var text2 = "", separated = true;
    this.nodesBetween(from4, to, function(node4, pos) {
      if (node4.isText) {
        text2 += node4.text.slice(Math.max(from4, pos) - pos, to - pos);
        separated = !blockSeparator;
      } else if (node4.isLeaf && leafText) {
        text2 += leafText;
        separated = !blockSeparator;
      } else if (!separated && node4.isBlock) {
        text2 += blockSeparator;
        separated = true;
      }
    }, 0);
    return text2;
  };
  Fragment.prototype.append = function append(other) {
    if (!other.size) {
      return this;
    }
    if (!this.size) {
      return other;
    }
    var last = this.lastChild, first2 = other.firstChild, content2 = this.content.slice(), i = 0;
    if (last.isText && last.sameMarkup(first2)) {
      content2[content2.length - 1] = last.withText(last.text + first2.text);
      i = 1;
    }
    for (; i < other.content.length; i++) {
      content2.push(other.content[i]);
    }
    return new Fragment(content2, this.size + other.size);
  };
  Fragment.prototype.cut = function cut(from4, to) {
    if (to == null) {
      to = this.size;
    }
    if (from4 == 0 && to == this.size) {
      return this;
    }
    var result2 = [], size = 0;
    if (to > from4) {
      for (var i = 0, pos = 0; pos < to; i++) {
        var child3 = this.content[i], end2 = pos + child3.nodeSize;
        if (end2 > from4) {
          if (pos < from4 || end2 > to) {
            if (child3.isText) {
              child3 = child3.cut(Math.max(0, from4 - pos), Math.min(child3.text.length, to - pos));
            } else {
              child3 = child3.cut(Math.max(0, from4 - pos - 1), Math.min(child3.content.size, to - pos - 1));
            }
          }
          result2.push(child3);
          size += child3.nodeSize;
        }
        pos = end2;
      }
    }
    return new Fragment(result2, size);
  };
  Fragment.prototype.cutByIndex = function cutByIndex(from4, to) {
    if (from4 == to) {
      return Fragment.empty;
    }
    if (from4 == 0 && to == this.content.length) {
      return this;
    }
    return new Fragment(this.content.slice(from4, to));
  };
  Fragment.prototype.replaceChild = function replaceChild(index2, node4) {
    var current = this.content[index2];
    if (current == node4) {
      return this;
    }
    var copy5 = this.content.slice();
    var size = this.size + node4.nodeSize - current.nodeSize;
    copy5[index2] = node4;
    return new Fragment(copy5, size);
  };
  Fragment.prototype.addToStart = function addToStart(node4) {
    return new Fragment([node4].concat(this.content), this.size + node4.nodeSize);
  };
  Fragment.prototype.addToEnd = function addToEnd(node4) {
    return new Fragment(this.content.concat(node4), this.size + node4.nodeSize);
  };
  Fragment.prototype.eq = function eq(other) {
    if (this.content.length != other.content.length) {
      return false;
    }
    for (var i = 0; i < this.content.length; i++) {
      if (!this.content[i].eq(other.content[i])) {
        return false;
      }
    }
    return true;
  };
  prototypeAccessors.firstChild.get = function() {
    return this.content.length ? this.content[0] : null;
  };
  prototypeAccessors.lastChild.get = function() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  };
  prototypeAccessors.childCount.get = function() {
    return this.content.length;
  };
  Fragment.prototype.child = function child(index2) {
    var found2 = this.content[index2];
    if (!found2) {
      throw new RangeError("Index " + index2 + " out of range for " + this);
    }
    return found2;
  };
  Fragment.prototype.maybeChild = function maybeChild(index2) {
    return this.content[index2];
  };
  Fragment.prototype.forEach = function forEach(f) {
    for (var i = 0, p = 0; i < this.content.length; i++) {
      var child3 = this.content[i];
      f(child3, p, i);
      p += child3.nodeSize;
    }
  };
  Fragment.prototype.findDiffStart = function findDiffStart$1(other, pos) {
    if (pos === void 0)
      pos = 0;
    return findDiffStart(this, other, pos);
  };
  Fragment.prototype.findDiffEnd = function findDiffEnd$1(other, pos, otherPos) {
    if (pos === void 0)
      pos = this.size;
    if (otherPos === void 0)
      otherPos = other.size;
    return findDiffEnd(this, other, pos, otherPos);
  };
  Fragment.prototype.findIndex = function findIndex(pos, round) {
    if (round === void 0)
      round = -1;
    if (pos == 0) {
      return retIndex(0, pos);
    }
    if (pos == this.size) {
      return retIndex(this.content.length, pos);
    }
    if (pos > this.size || pos < 0) {
      throw new RangeError("Position " + pos + " outside of fragment (" + this + ")");
    }
    for (var i = 0, curPos = 0; ; i++) {
      var cur = this.child(i), end2 = curPos + cur.nodeSize;
      if (end2 >= pos) {
        if (end2 == pos || round > 0) {
          return retIndex(i + 1, end2);
        }
        return retIndex(i, curPos);
      }
      curPos = end2;
    }
  };
  Fragment.prototype.toString = function toString() {
    return "<" + this.toStringInner() + ">";
  };
  Fragment.prototype.toStringInner = function toStringInner() {
    return this.content.join(", ");
  };
  Fragment.prototype.toJSON = function toJSON() {
    return this.content.length ? this.content.map(function(n) {
      return n.toJSON();
    }) : null;
  };
  Fragment.fromJSON = function fromJSON(schema, value) {
    if (!value) {
      return Fragment.empty;
    }
    if (!Array.isArray(value)) {
      throw new RangeError("Invalid input for Fragment.fromJSON");
    }
    return new Fragment(value.map(schema.nodeFromJSON));
  };
  Fragment.fromArray = function fromArray(array) {
    if (!array.length) {
      return Fragment.empty;
    }
    var joined, size = 0;
    for (var i = 0; i < array.length; i++) {
      var node4 = array[i];
      size += node4.nodeSize;
      if (i && node4.isText && array[i - 1].sameMarkup(node4)) {
        if (!joined) {
          joined = array.slice(0, i);
        }
        joined[joined.length - 1] = node4.withText(joined[joined.length - 1].text + node4.text);
      } else if (joined) {
        joined.push(node4);
      }
    }
    return new Fragment(joined || array, size);
  };
  Fragment.from = function from(nodes) {
    if (!nodes) {
      return Fragment.empty;
    }
    if (nodes instanceof Fragment) {
      return nodes;
    }
    if (Array.isArray(nodes)) {
      return this.fromArray(nodes);
    }
    if (nodes.attrs) {
      return new Fragment([nodes], nodes.nodeSize);
    }
    throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  };
  Object.defineProperties(Fragment.prototype, prototypeAccessors);
  var found = { index: 0, offset: 0 };
  function retIndex(index2, offset2) {
    found.index = index2;
    found.offset = offset2;
    return found;
  }
  Fragment.empty = new Fragment([], 0);
  function compareDeep(a, b) {
    if (a === b) {
      return true;
    }
    if (!(a && typeof a == "object") || !(b && typeof b == "object")) {
      return false;
    }
    var array = Array.isArray(a);
    if (Array.isArray(b) != array) {
      return false;
    }
    if (array) {
      if (a.length != b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (!compareDeep(a[i], b[i])) {
          return false;
        }
      }
    } else {
      for (var p in a) {
        if (!(p in b) || !compareDeep(a[p], b[p])) {
          return false;
        }
      }
      for (var p$1 in b) {
        if (!(p$1 in a)) {
          return false;
        }
      }
    }
    return true;
  }
  var Mark = function Mark2(type, attrs) {
    this.type = type;
    this.attrs = attrs;
  };
  Mark.prototype.addToSet = function addToSet(set2) {
    var copy5, placed = false;
    for (var i = 0; i < set2.length; i++) {
      var other = set2[i];
      if (this.eq(other)) {
        return set2;
      }
      if (this.type.excludes(other.type)) {
        if (!copy5) {
          copy5 = set2.slice(0, i);
        }
      } else if (other.type.excludes(this.type)) {
        return set2;
      } else {
        if (!placed && other.type.rank > this.type.rank) {
          if (!copy5) {
            copy5 = set2.slice(0, i);
          }
          copy5.push(this);
          placed = true;
        }
        if (copy5) {
          copy5.push(other);
        }
      }
    }
    if (!copy5) {
      copy5 = set2.slice();
    }
    if (!placed) {
      copy5.push(this);
    }
    return copy5;
  };
  Mark.prototype.removeFromSet = function removeFromSet(set2) {
    for (var i = 0; i < set2.length; i++) {
      if (this.eq(set2[i])) {
        return set2.slice(0, i).concat(set2.slice(i + 1));
      }
    }
    return set2;
  };
  Mark.prototype.isInSet = function isInSet(set2) {
    for (var i = 0; i < set2.length; i++) {
      if (this.eq(set2[i])) {
        return true;
      }
    }
    return false;
  };
  Mark.prototype.eq = function eq2(other) {
    return this == other || this.type == other.type && compareDeep(this.attrs, other.attrs);
  };
  Mark.prototype.toJSON = function toJSON2() {
    var obj = { type: this.type.name };
    for (var _ in this.attrs) {
      obj.attrs = this.attrs;
      break;
    }
    return obj;
  };
  Mark.fromJSON = function fromJSON2(schema, json) {
    if (!json) {
      throw new RangeError("Invalid input for Mark.fromJSON");
    }
    var type = schema.marks[json.type];
    if (!type) {
      throw new RangeError("There is no mark type " + json.type + " in this schema");
    }
    return type.create(json.attrs);
  };
  Mark.sameSet = function sameSet(a, b) {
    if (a == b) {
      return true;
    }
    if (a.length != b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (!a[i].eq(b[i])) {
        return false;
      }
    }
    return true;
  };
  Mark.setFrom = function setFrom(marks2) {
    if (!marks2 || marks2.length == 0) {
      return Mark.none;
    }
    if (marks2 instanceof Mark) {
      return [marks2];
    }
    var copy5 = marks2.slice();
    copy5.sort(function(a, b) {
      return a.type.rank - b.type.rank;
    });
    return copy5;
  };
  Mark.none = [];
  function ReplaceError(message) {
    var err2 = Error.call(this, message);
    err2.__proto__ = ReplaceError.prototype;
    return err2;
  }
  ReplaceError.prototype = Object.create(Error.prototype);
  ReplaceError.prototype.constructor = ReplaceError;
  ReplaceError.prototype.name = "ReplaceError";
  var Slice = function Slice2(content2, openStart, openEnd) {
    this.content = content2;
    this.openStart = openStart;
    this.openEnd = openEnd;
  };
  var prototypeAccessors$1 = { size: { configurable: true } };
  prototypeAccessors$1.size.get = function() {
    return this.content.size - this.openStart - this.openEnd;
  };
  Slice.prototype.insertAt = function insertAt(pos, fragment) {
    var content2 = insertInto(this.content, pos + this.openStart, fragment, null);
    return content2 && new Slice(content2, this.openStart, this.openEnd);
  };
  Slice.prototype.removeBetween = function removeBetween(from4, to) {
    return new Slice(removeRange(this.content, from4 + this.openStart, to + this.openStart), this.openStart, this.openEnd);
  };
  Slice.prototype.eq = function eq3(other) {
    return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
  };
  Slice.prototype.toString = function toString2() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  };
  Slice.prototype.toJSON = function toJSON3() {
    if (!this.content.size) {
      return null;
    }
    var json = { content: this.content.toJSON() };
    if (this.openStart > 0) {
      json.openStart = this.openStart;
    }
    if (this.openEnd > 0) {
      json.openEnd = this.openEnd;
    }
    return json;
  };
  Slice.fromJSON = function fromJSON3(schema, json) {
    if (!json) {
      return Slice.empty;
    }
    var openStart = json.openStart || 0, openEnd = json.openEnd || 0;
    if (typeof openStart != "number" || typeof openEnd != "number") {
      throw new RangeError("Invalid input for Slice.fromJSON");
    }
    return new Slice(Fragment.fromJSON(schema, json.content), openStart, openEnd);
  };
  Slice.maxOpen = function maxOpen(fragment, openIsolating) {
    if (openIsolating === void 0)
      openIsolating = true;
    var openStart = 0, openEnd = 0;
    for (var n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild) {
      openStart++;
    }
    for (var n$1 = fragment.lastChild; n$1 && !n$1.isLeaf && (openIsolating || !n$1.type.spec.isolating); n$1 = n$1.lastChild) {
      openEnd++;
    }
    return new Slice(fragment, openStart, openEnd);
  };
  Object.defineProperties(Slice.prototype, prototypeAccessors$1);
  function removeRange(content2, from4, to) {
    var ref = content2.findIndex(from4);
    var index2 = ref.index;
    var offset2 = ref.offset;
    var child3 = content2.maybeChild(index2);
    var ref$1 = content2.findIndex(to);
    var indexTo = ref$1.index;
    var offsetTo = ref$1.offset;
    if (offset2 == from4 || child3.isText) {
      if (offsetTo != to && !content2.child(indexTo).isText) {
        throw new RangeError("Removing non-flat range");
      }
      return content2.cut(0, from4).append(content2.cut(to));
    }
    if (index2 != indexTo) {
      throw new RangeError("Removing non-flat range");
    }
    return content2.replaceChild(index2, child3.copy(removeRange(child3.content, from4 - offset2 - 1, to - offset2 - 1)));
  }
  function insertInto(content2, dist, insert, parent) {
    var ref = content2.findIndex(dist);
    var index2 = ref.index;
    var offset2 = ref.offset;
    var child3 = content2.maybeChild(index2);
    if (offset2 == dist || child3.isText) {
      if (parent && !parent.canReplace(index2, index2, insert)) {
        return null;
      }
      return content2.cut(0, dist).append(insert).append(content2.cut(dist));
    }
    var inner = insertInto(child3.content, dist - offset2 - 1, insert);
    return inner && content2.replaceChild(index2, child3.copy(inner));
  }
  Slice.empty = new Slice(Fragment.empty, 0, 0);
  function replace($from, $to, slice4) {
    if (slice4.openStart > $from.depth) {
      throw new ReplaceError("Inserted content deeper than insertion position");
    }
    if ($from.depth - slice4.openStart != $to.depth - slice4.openEnd) {
      throw new ReplaceError("Inconsistent open depths");
    }
    return replaceOuter($from, $to, slice4, 0);
  }
  function replaceOuter($from, $to, slice4, depth) {
    var index2 = $from.index(depth), node4 = $from.node(depth);
    if (index2 == $to.index(depth) && depth < $from.depth - slice4.openStart) {
      var inner = replaceOuter($from, $to, slice4, depth + 1);
      return node4.copy(node4.content.replaceChild(index2, inner));
    } else if (!slice4.content.size) {
      return close(node4, replaceTwoWay($from, $to, depth));
    } else if (!slice4.openStart && !slice4.openEnd && $from.depth == depth && $to.depth == depth) {
      var parent = $from.parent, content2 = parent.content;
      return close(parent, content2.cut(0, $from.parentOffset).append(slice4.content).append(content2.cut($to.parentOffset)));
    } else {
      var ref = prepareSliceForReplace(slice4, $from);
      var start3 = ref.start;
      var end2 = ref.end;
      return close(node4, replaceThreeWay($from, start3, end2, $to, depth));
    }
  }
  function checkJoin(main, sub) {
    if (!sub.type.compatibleContent(main.type)) {
      throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main.type.name);
    }
  }
  function joinable($before, $after, depth) {
    var node4 = $before.node(depth);
    checkJoin(node4, $after.node(depth));
    return node4;
  }
  function addNode(child3, target) {
    var last = target.length - 1;
    if (last >= 0 && child3.isText && child3.sameMarkup(target[last])) {
      target[last] = child3.withText(target[last].text + child3.text);
    } else {
      target.push(child3);
    }
  }
  function addRange($start, $end, depth, target) {
    var node4 = ($end || $start).node(depth);
    var startIndex = 0, endIndex = $end ? $end.index(depth) : node4.childCount;
    if ($start) {
      startIndex = $start.index(depth);
      if ($start.depth > depth) {
        startIndex++;
      } else if ($start.textOffset) {
        addNode($start.nodeAfter, target);
        startIndex++;
      }
    }
    for (var i = startIndex; i < endIndex; i++) {
      addNode(node4.child(i), target);
    }
    if ($end && $end.depth == depth && $end.textOffset) {
      addNode($end.nodeBefore, target);
    }
  }
  function close(node4, content2) {
    if (!node4.type.validContent(content2)) {
      throw new ReplaceError("Invalid content for node " + node4.type.name);
    }
    return node4.copy(content2);
  }
  function replaceThreeWay($from, $start, $end, $to, depth) {
    var openStart = $from.depth > depth && joinable($from, $start, depth + 1);
    var openEnd = $to.depth > depth && joinable($end, $to, depth + 1);
    var content2 = [];
    addRange(null, $from, depth, content2);
    if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
      checkJoin(openStart, openEnd);
      addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content2);
    } else {
      if (openStart) {
        addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content2);
      }
      addRange($start, $end, depth, content2);
      if (openEnd) {
        addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content2);
      }
    }
    addRange($to, null, depth, content2);
    return new Fragment(content2);
  }
  function replaceTwoWay($from, $to, depth) {
    var content2 = [];
    addRange(null, $from, depth, content2);
    if ($from.depth > depth) {
      var type = joinable($from, $to, depth + 1);
      addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content2);
    }
    addRange($to, null, depth, content2);
    return new Fragment(content2);
  }
  function prepareSliceForReplace(slice4, $along) {
    var extra = $along.depth - slice4.openStart, parent = $along.node(extra);
    var node4 = parent.copy(slice4.content);
    for (var i = extra - 1; i >= 0; i--) {
      node4 = $along.node(i).copy(Fragment.from(node4));
    }
    return {
      start: node4.resolveNoCache(slice4.openStart + extra),
      end: node4.resolveNoCache(node4.content.size - slice4.openEnd - extra)
    };
  }
  var ResolvedPos = function ResolvedPos2(pos, path, parentOffset) {
    this.pos = pos;
    this.path = path;
    this.depth = path.length / 3 - 1;
    this.parentOffset = parentOffset;
  };
  var prototypeAccessors$2 = { parent: { configurable: true }, doc: { configurable: true }, textOffset: { configurable: true }, nodeAfter: { configurable: true }, nodeBefore: { configurable: true } };
  ResolvedPos.prototype.resolveDepth = function resolveDepth(val) {
    if (val == null) {
      return this.depth;
    }
    if (val < 0) {
      return this.depth + val;
    }
    return val;
  };
  prototypeAccessors$2.parent.get = function() {
    return this.node(this.depth);
  };
  prototypeAccessors$2.doc.get = function() {
    return this.node(0);
  };
  ResolvedPos.prototype.node = function node(depth) {
    return this.path[this.resolveDepth(depth) * 3];
  };
  ResolvedPos.prototype.index = function index(depth) {
    return this.path[this.resolveDepth(depth) * 3 + 1];
  };
  ResolvedPos.prototype.indexAfter = function indexAfter(depth) {
    depth = this.resolveDepth(depth);
    return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
  };
  ResolvedPos.prototype.start = function start(depth) {
    depth = this.resolveDepth(depth);
    return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
  };
  ResolvedPos.prototype.end = function end(depth) {
    depth = this.resolveDepth(depth);
    return this.start(depth) + this.node(depth).content.size;
  };
  ResolvedPos.prototype.before = function before(depth) {
    depth = this.resolveDepth(depth);
    if (!depth) {
      throw new RangeError("There is no position before the top-level node");
    }
    return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
  };
  ResolvedPos.prototype.after = function after(depth) {
    depth = this.resolveDepth(depth);
    if (!depth) {
      throw new RangeError("There is no position after the top-level node");
    }
    return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
  };
  prototypeAccessors$2.textOffset.get = function() {
    return this.pos - this.path[this.path.length - 1];
  };
  prototypeAccessors$2.nodeAfter.get = function() {
    var parent = this.parent, index2 = this.index(this.depth);
    if (index2 == parent.childCount) {
      return null;
    }
    var dOff = this.pos - this.path[this.path.length - 1], child3 = parent.child(index2);
    return dOff ? parent.child(index2).cut(dOff) : child3;
  };
  prototypeAccessors$2.nodeBefore.get = function() {
    var index2 = this.index(this.depth);
    var dOff = this.pos - this.path[this.path.length - 1];
    if (dOff) {
      return this.parent.child(index2).cut(0, dOff);
    }
    return index2 == 0 ? null : this.parent.child(index2 - 1);
  };
  ResolvedPos.prototype.posAtIndex = function posAtIndex(index2, depth) {
    depth = this.resolveDepth(depth);
    var node4 = this.path[depth * 3], pos = depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
    for (var i = 0; i < index2; i++) {
      pos += node4.child(i).nodeSize;
    }
    return pos;
  };
  ResolvedPos.prototype.marks = function marks() {
    var parent = this.parent, index2 = this.index();
    if (parent.content.size == 0) {
      return Mark.none;
    }
    if (this.textOffset) {
      return parent.child(index2).marks;
    }
    var main = parent.maybeChild(index2 - 1), other = parent.maybeChild(index2);
    if (!main) {
      var tmp = main;
      main = other;
      other = tmp;
    }
    var marks2 = main.marks;
    for (var i = 0; i < marks2.length; i++) {
      if (marks2[i].type.spec.inclusive === false && (!other || !marks2[i].isInSet(other.marks))) {
        marks2 = marks2[i--].removeFromSet(marks2);
      }
    }
    return marks2;
  };
  ResolvedPos.prototype.marksAcross = function marksAcross($end) {
    var after2 = this.parent.maybeChild(this.index());
    if (!after2 || !after2.isInline) {
      return null;
    }
    var marks2 = after2.marks, next = $end.parent.maybeChild($end.index());
    for (var i = 0; i < marks2.length; i++) {
      if (marks2[i].type.spec.inclusive === false && (!next || !marks2[i].isInSet(next.marks))) {
        marks2 = marks2[i--].removeFromSet(marks2);
      }
    }
    return marks2;
  };
  ResolvedPos.prototype.sharedDepth = function sharedDepth(pos) {
    for (var depth = this.depth; depth > 0; depth--) {
      if (this.start(depth) <= pos && this.end(depth) >= pos) {
        return depth;
      }
    }
    return 0;
  };
  ResolvedPos.prototype.blockRange = function blockRange(other, pred) {
    if (other === void 0)
      other = this;
    if (other.pos < this.pos) {
      return other.blockRange(this);
    }
    for (var d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--) {
      if (other.pos <= this.end(d) && (!pred || pred(this.node(d)))) {
        return new NodeRange(this, other, d);
      }
    }
  };
  ResolvedPos.prototype.sameParent = function sameParent(other) {
    return this.pos - this.parentOffset == other.pos - other.parentOffset;
  };
  ResolvedPos.prototype.max = function max(other) {
    return other.pos > this.pos ? other : this;
  };
  ResolvedPos.prototype.min = function min(other) {
    return other.pos < this.pos ? other : this;
  };
  ResolvedPos.prototype.toString = function toString3() {
    var str = "";
    for (var i = 1; i <= this.depth; i++) {
      str += (str ? "/" : "") + this.node(i).type.name + "_" + this.index(i - 1);
    }
    return str + ":" + this.parentOffset;
  };
  ResolvedPos.resolve = function resolve(doc2, pos) {
    if (!(pos >= 0 && pos <= doc2.content.size)) {
      throw new RangeError("Position " + pos + " out of range");
    }
    var path = [];
    var start3 = 0, parentOffset = pos;
    for (var node4 = doc2; ; ) {
      var ref = node4.content.findIndex(parentOffset);
      var index2 = ref.index;
      var offset2 = ref.offset;
      var rem = parentOffset - offset2;
      path.push(node4, index2, start3 + offset2);
      if (!rem) {
        break;
      }
      node4 = node4.child(index2);
      if (node4.isText) {
        break;
      }
      parentOffset = rem - 1;
      start3 += offset2 + 1;
    }
    return new ResolvedPos(pos, path, parentOffset);
  };
  ResolvedPos.resolveCached = function resolveCached(doc2, pos) {
    for (var i = 0; i < resolveCache.length; i++) {
      var cached = resolveCache[i];
      if (cached.pos == pos && cached.doc == doc2) {
        return cached;
      }
    }
    var result2 = resolveCache[resolveCachePos] = ResolvedPos.resolve(doc2, pos);
    resolveCachePos = (resolveCachePos + 1) % resolveCacheSize;
    return result2;
  };
  Object.defineProperties(ResolvedPos.prototype, prototypeAccessors$2);
  var resolveCache = [];
  var resolveCachePos = 0;
  var resolveCacheSize = 12;
  var NodeRange = function NodeRange2($from, $to, depth) {
    this.$from = $from;
    this.$to = $to;
    this.depth = depth;
  };
  var prototypeAccessors$1$1 = { start: { configurable: true }, end: { configurable: true }, parent: { configurable: true }, startIndex: { configurable: true }, endIndex: { configurable: true } };
  prototypeAccessors$1$1.start.get = function() {
    return this.$from.before(this.depth + 1);
  };
  prototypeAccessors$1$1.end.get = function() {
    return this.$to.after(this.depth + 1);
  };
  prototypeAccessors$1$1.parent.get = function() {
    return this.$from.node(this.depth);
  };
  prototypeAccessors$1$1.startIndex.get = function() {
    return this.$from.index(this.depth);
  };
  prototypeAccessors$1$1.endIndex.get = function() {
    return this.$to.indexAfter(this.depth);
  };
  Object.defineProperties(NodeRange.prototype, prototypeAccessors$1$1);
  var emptyAttrs = Object.create(null);
  var Node2 = function Node3(type, attrs, content2, marks2) {
    this.type = type;
    this.attrs = attrs;
    this.content = content2 || Fragment.empty;
    this.marks = marks2 || Mark.none;
  };
  var prototypeAccessors$3 = { nodeSize: { configurable: true }, childCount: { configurable: true }, textContent: { configurable: true }, firstChild: { configurable: true }, lastChild: { configurable: true }, isBlock: { configurable: true }, isTextblock: { configurable: true }, inlineContent: { configurable: true }, isInline: { configurable: true }, isText: { configurable: true }, isLeaf: { configurable: true }, isAtom: { configurable: true } };
  prototypeAccessors$3.nodeSize.get = function() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  };
  prototypeAccessors$3.childCount.get = function() {
    return this.content.childCount;
  };
  Node2.prototype.child = function child2(index2) {
    return this.content.child(index2);
  };
  Node2.prototype.maybeChild = function maybeChild2(index2) {
    return this.content.maybeChild(index2);
  };
  Node2.prototype.forEach = function forEach2(f) {
    this.content.forEach(f);
  };
  Node2.prototype.nodesBetween = function nodesBetween2(from4, to, f, startPos) {
    if (startPos === void 0)
      startPos = 0;
    this.content.nodesBetween(from4, to, f, startPos, this);
  };
  Node2.prototype.descendants = function descendants2(f) {
    this.nodesBetween(0, this.content.size, f);
  };
  prototypeAccessors$3.textContent.get = function() {
    return this.textBetween(0, this.content.size, "");
  };
  Node2.prototype.textBetween = function textBetween2(from4, to, blockSeparator, leafText) {
    return this.content.textBetween(from4, to, blockSeparator, leafText);
  };
  prototypeAccessors$3.firstChild.get = function() {
    return this.content.firstChild;
  };
  prototypeAccessors$3.lastChild.get = function() {
    return this.content.lastChild;
  };
  Node2.prototype.eq = function eq4(other) {
    return this == other || this.sameMarkup(other) && this.content.eq(other.content);
  };
  Node2.prototype.sameMarkup = function sameMarkup(other) {
    return this.hasMarkup(other.type, other.attrs, other.marks);
  };
  Node2.prototype.hasMarkup = function hasMarkup(type, attrs, marks2) {
    return this.type == type && compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) && Mark.sameSet(this.marks, marks2 || Mark.none);
  };
  Node2.prototype.copy = function copy(content2) {
    if (content2 === void 0)
      content2 = null;
    if (content2 == this.content) {
      return this;
    }
    return new this.constructor(this.type, this.attrs, content2, this.marks);
  };
  Node2.prototype.mark = function mark(marks2) {
    return marks2 == this.marks ? this : new this.constructor(this.type, this.attrs, this.content, marks2);
  };
  Node2.prototype.cut = function cut2(from4, to) {
    if (from4 == 0 && to == this.content.size) {
      return this;
    }
    return this.copy(this.content.cut(from4, to));
  };
  Node2.prototype.slice = function slice(from4, to, includeParents) {
    if (to === void 0)
      to = this.content.size;
    if (includeParents === void 0)
      includeParents = false;
    if (from4 == to) {
      return Slice.empty;
    }
    var $from = this.resolve(from4), $to = this.resolve(to);
    var depth = includeParents ? 0 : $from.sharedDepth(to);
    var start3 = $from.start(depth), node4 = $from.node(depth);
    var content2 = node4.content.cut($from.pos - start3, $to.pos - start3);
    return new Slice(content2, $from.depth - depth, $to.depth - depth);
  };
  Node2.prototype.replace = function replace$1(from4, to, slice4) {
    return replace(this.resolve(from4), this.resolve(to), slice4);
  };
  Node2.prototype.nodeAt = function nodeAt(pos) {
    for (var node4 = this; ; ) {
      var ref = node4.content.findIndex(pos);
      var index2 = ref.index;
      var offset2 = ref.offset;
      node4 = node4.maybeChild(index2);
      if (!node4) {
        return null;
      }
      if (offset2 == pos || node4.isText) {
        return node4;
      }
      pos -= offset2 + 1;
    }
  };
  Node2.prototype.childAfter = function childAfter(pos) {
    var ref = this.content.findIndex(pos);
    var index2 = ref.index;
    var offset2 = ref.offset;
    return { node: this.content.maybeChild(index2), index: index2, offset: offset2 };
  };
  Node2.prototype.childBefore = function childBefore(pos) {
    if (pos == 0) {
      return { node: null, index: 0, offset: 0 };
    }
    var ref = this.content.findIndex(pos);
    var index2 = ref.index;
    var offset2 = ref.offset;
    if (offset2 < pos) {
      return { node: this.content.child(index2), index: index2, offset: offset2 };
    }
    var node4 = this.content.child(index2 - 1);
    return { node: node4, index: index2 - 1, offset: offset2 - node4.nodeSize };
  };
  Node2.prototype.resolve = function resolve2(pos) {
    return ResolvedPos.resolveCached(this, pos);
  };
  Node2.prototype.resolveNoCache = function resolveNoCache(pos) {
    return ResolvedPos.resolve(this, pos);
  };
  Node2.prototype.rangeHasMark = function rangeHasMark(from4, to, type) {
    var found2 = false;
    if (to > from4) {
      this.nodesBetween(from4, to, function(node4) {
        if (type.isInSet(node4.marks)) {
          found2 = true;
        }
        return !found2;
      });
    }
    return found2;
  };
  prototypeAccessors$3.isBlock.get = function() {
    return this.type.isBlock;
  };
  prototypeAccessors$3.isTextblock.get = function() {
    return this.type.isTextblock;
  };
  prototypeAccessors$3.inlineContent.get = function() {
    return this.type.inlineContent;
  };
  prototypeAccessors$3.isInline.get = function() {
    return this.type.isInline;
  };
  prototypeAccessors$3.isText.get = function() {
    return this.type.isText;
  };
  prototypeAccessors$3.isLeaf.get = function() {
    return this.type.isLeaf;
  };
  prototypeAccessors$3.isAtom.get = function() {
    return this.type.isAtom;
  };
  Node2.prototype.toString = function toString4() {
    if (this.type.spec.toDebugString) {
      return this.type.spec.toDebugString(this);
    }
    var name = this.type.name;
    if (this.content.size) {
      name += "(" + this.content.toStringInner() + ")";
    }
    return wrapMarks(this.marks, name);
  };
  Node2.prototype.contentMatchAt = function contentMatchAt(index2) {
    var match = this.type.contentMatch.matchFragment(this.content, 0, index2);
    if (!match) {
      throw new Error("Called contentMatchAt on a node with invalid content");
    }
    return match;
  };
  Node2.prototype.canReplace = function canReplace(from4, to, replacement, start3, end2) {
    if (replacement === void 0)
      replacement = Fragment.empty;
    if (start3 === void 0)
      start3 = 0;
    if (end2 === void 0)
      end2 = replacement.childCount;
    var one = this.contentMatchAt(from4).matchFragment(replacement, start3, end2);
    var two = one && one.matchFragment(this.content, to);
    if (!two || !two.validEnd) {
      return false;
    }
    for (var i = start3; i < end2; i++) {
      if (!this.type.allowsMarks(replacement.child(i).marks)) {
        return false;
      }
    }
    return true;
  };
  Node2.prototype.canReplaceWith = function canReplaceWith(from4, to, type, marks2) {
    if (marks2 && !this.type.allowsMarks(marks2)) {
      return false;
    }
    var start3 = this.contentMatchAt(from4).matchType(type);
    var end2 = start3 && start3.matchFragment(this.content, to);
    return end2 ? end2.validEnd : false;
  };
  Node2.prototype.canAppend = function canAppend(other) {
    if (other.content.size) {
      return this.canReplace(this.childCount, this.childCount, other.content);
    } else {
      return this.type.compatibleContent(other.type);
    }
  };
  Node2.prototype.check = function check() {
    if (!this.type.validContent(this.content)) {
      throw new RangeError("Invalid content for node " + this.type.name + ": " + this.content.toString().slice(0, 50));
    }
    var copy5 = Mark.none;
    for (var i = 0; i < this.marks.length; i++) {
      copy5 = this.marks[i].addToSet(copy5);
    }
    if (!Mark.sameSet(copy5, this.marks)) {
      throw new RangeError("Invalid collection of marks for node " + this.type.name + ": " + this.marks.map(function(m) {
        return m.type.name;
      }));
    }
    this.content.forEach(function(node4) {
      return node4.check();
    });
  };
  Node2.prototype.toJSON = function toJSON4() {
    var obj = { type: this.type.name };
    for (var _ in this.attrs) {
      obj.attrs = this.attrs;
      break;
    }
    if (this.content.size) {
      obj.content = this.content.toJSON();
    }
    if (this.marks.length) {
      obj.marks = this.marks.map(function(n) {
        return n.toJSON();
      });
    }
    return obj;
  };
  Node2.fromJSON = function fromJSON4(schema, json) {
    if (!json) {
      throw new RangeError("Invalid input for Node.fromJSON");
    }
    var marks2 = null;
    if (json.marks) {
      if (!Array.isArray(json.marks)) {
        throw new RangeError("Invalid mark data for Node.fromJSON");
      }
      marks2 = json.marks.map(schema.markFromJSON);
    }
    if (json.type == "text") {
      if (typeof json.text != "string") {
        throw new RangeError("Invalid text node in JSON");
      }
      return schema.text(json.text, marks2);
    }
    var content2 = Fragment.fromJSON(schema, json.content);
    return schema.nodeType(json.type).create(json.attrs, content2, marks2);
  };
  Object.defineProperties(Node2.prototype, prototypeAccessors$3);
  var TextNode = /* @__PURE__ */ function(Node5) {
    function TextNode2(type, attrs, content2, marks2) {
      Node5.call(this, type, attrs, null, marks2);
      if (!content2) {
        throw new RangeError("Empty text nodes are not allowed");
      }
      this.text = content2;
    }
    if (Node5)
      TextNode2.__proto__ = Node5;
    TextNode2.prototype = Object.create(Node5 && Node5.prototype);
    TextNode2.prototype.constructor = TextNode2;
    var prototypeAccessors$15 = { textContent: { configurable: true }, nodeSize: { configurable: true } };
    TextNode2.prototype.toString = function toString7() {
      if (this.type.spec.toDebugString) {
        return this.type.spec.toDebugString(this);
      }
      return wrapMarks(this.marks, JSON.stringify(this.text));
    };
    prototypeAccessors$15.textContent.get = function() {
      return this.text;
    };
    TextNode2.prototype.textBetween = function textBetween3(from4, to) {
      return this.text.slice(from4, to);
    };
    prototypeAccessors$15.nodeSize.get = function() {
      return this.text.length;
    };
    TextNode2.prototype.mark = function mark3(marks2) {
      return marks2 == this.marks ? this : new TextNode2(this.type, this.attrs, this.text, marks2);
    };
    TextNode2.prototype.withText = function withText(text2) {
      if (text2 == this.text) {
        return this;
      }
      return new TextNode2(this.type, this.attrs, text2, this.marks);
    };
    TextNode2.prototype.cut = function cut3(from4, to) {
      if (from4 === void 0)
        from4 = 0;
      if (to === void 0)
        to = this.text.length;
      if (from4 == 0 && to == this.text.length) {
        return this;
      }
      return this.withText(this.text.slice(from4, to));
    };
    TextNode2.prototype.eq = function eq12(other) {
      return this.sameMarkup(other) && this.text == other.text;
    };
    TextNode2.prototype.toJSON = function toJSON7() {
      var base2 = Node5.prototype.toJSON.call(this);
      base2.text = this.text;
      return base2;
    };
    Object.defineProperties(TextNode2.prototype, prototypeAccessors$15);
    return TextNode2;
  }(Node2);
  function wrapMarks(marks2, str) {
    for (var i = marks2.length - 1; i >= 0; i--) {
      str = marks2[i].type.name + "(" + str + ")";
    }
    return str;
  }
  var ContentMatch = function ContentMatch2(validEnd) {
    this.validEnd = validEnd;
    this.next = [];
    this.wrapCache = [];
  };
  var prototypeAccessors$4 = { inlineContent: { configurable: true }, defaultType: { configurable: true }, edgeCount: { configurable: true } };
  ContentMatch.parse = function parse(string, nodeTypes) {
    var stream = new TokenStream(string, nodeTypes);
    if (stream.next == null) {
      return ContentMatch.empty;
    }
    var expr = parseExpr(stream);
    if (stream.next) {
      stream.err("Unexpected trailing text");
    }
    var match = dfa(nfa(expr));
    checkForDeadEnds(match, stream);
    return match;
  };
  ContentMatch.prototype.matchType = function matchType(type) {
    for (var i = 0; i < this.next.length; i += 2) {
      if (this.next[i] == type) {
        return this.next[i + 1];
      }
    }
    return null;
  };
  ContentMatch.prototype.matchFragment = function matchFragment(frag, start3, end2) {
    if (start3 === void 0)
      start3 = 0;
    if (end2 === void 0)
      end2 = frag.childCount;
    var cur = this;
    for (var i = start3; cur && i < end2; i++) {
      cur = cur.matchType(frag.child(i).type);
    }
    return cur;
  };
  prototypeAccessors$4.inlineContent.get = function() {
    var first2 = this.next[0];
    return first2 ? first2.isInline : false;
  };
  prototypeAccessors$4.defaultType.get = function() {
    for (var i = 0; i < this.next.length; i += 2) {
      var type = this.next[i];
      if (!(type.isText || type.hasRequiredAttrs())) {
        return type;
      }
    }
  };
  ContentMatch.prototype.compatible = function compatible(other) {
    for (var i = 0; i < this.next.length; i += 2) {
      for (var j = 0; j < other.next.length; j += 2) {
        if (this.next[i] == other.next[j]) {
          return true;
        }
      }
    }
    return false;
  };
  ContentMatch.prototype.fillBefore = function fillBefore(after2, toEnd, startIndex) {
    if (toEnd === void 0)
      toEnd = false;
    if (startIndex === void 0)
      startIndex = 0;
    var seen = [this];
    function search(match, types) {
      var finished = match.matchFragment(after2, startIndex);
      if (finished && (!toEnd || finished.validEnd)) {
        return Fragment.from(types.map(function(tp) {
          return tp.createAndFill();
        }));
      }
      for (var i = 0; i < match.next.length; i += 2) {
        var type = match.next[i], next = match.next[i + 1];
        if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
          seen.push(next);
          var found2 = search(next, types.concat(type));
          if (found2) {
            return found2;
          }
        }
      }
    }
    return search(this, []);
  };
  ContentMatch.prototype.findWrapping = function findWrapping(target) {
    for (var i = 0; i < this.wrapCache.length; i += 2) {
      if (this.wrapCache[i] == target) {
        return this.wrapCache[i + 1];
      }
    }
    var computed = this.computeWrapping(target);
    this.wrapCache.push(target, computed);
    return computed;
  };
  ContentMatch.prototype.computeWrapping = function computeWrapping(target) {
    var seen = Object.create(null), active = [{ match: this, type: null, via: null }];
    while (active.length) {
      var current = active.shift(), match = current.match;
      if (match.matchType(target)) {
        var result2 = [];
        for (var obj = current; obj.type; obj = obj.via) {
          result2.push(obj.type);
        }
        return result2.reverse();
      }
      for (var i = 0; i < match.next.length; i += 2) {
        var type = match.next[i];
        if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || match.next[i + 1].validEnd)) {
          active.push({ match: type.contentMatch, type, via: current });
          seen[type.name] = true;
        }
      }
    }
  };
  prototypeAccessors$4.edgeCount.get = function() {
    return this.next.length >> 1;
  };
  ContentMatch.prototype.edge = function edge(n) {
    var i = n << 1;
    if (i >= this.next.length) {
      throw new RangeError("There's no " + n + "th edge in this content match");
    }
    return { type: this.next[i], next: this.next[i + 1] };
  };
  ContentMatch.prototype.toString = function toString5() {
    var seen = [];
    function scan(m) {
      seen.push(m);
      for (var i = 1; i < m.next.length; i += 2) {
        if (seen.indexOf(m.next[i]) == -1) {
          scan(m.next[i]);
        }
      }
    }
    scan(this);
    return seen.map(function(m, i) {
      var out = i + (m.validEnd ? "*" : " ") + " ";
      for (var i$1 = 0; i$1 < m.next.length; i$1 += 2) {
        out += (i$1 ? ", " : "") + m.next[i$1].name + "->" + seen.indexOf(m.next[i$1 + 1]);
      }
      return out;
    }).join("\n");
  };
  Object.defineProperties(ContentMatch.prototype, prototypeAccessors$4);
  ContentMatch.empty = new ContentMatch(true);
  var TokenStream = function TokenStream2(string, nodeTypes) {
    this.string = string;
    this.nodeTypes = nodeTypes;
    this.inline = null;
    this.pos = 0;
    this.tokens = string.split(/\s*(?=\b|\W|$)/);
    if (this.tokens[this.tokens.length - 1] == "") {
      this.tokens.pop();
    }
    if (this.tokens[0] == "") {
      this.tokens.shift();
    }
  };
  var prototypeAccessors$1$2 = { next: { configurable: true } };
  prototypeAccessors$1$2.next.get = function() {
    return this.tokens[this.pos];
  };
  TokenStream.prototype.eat = function eat(tok) {
    return this.next == tok && (this.pos++ || true);
  };
  TokenStream.prototype.err = function err(str) {
    throw new SyntaxError(str + " (in content expression '" + this.string + "')");
  };
  Object.defineProperties(TokenStream.prototype, prototypeAccessors$1$2);
  function parseExpr(stream) {
    var exprs = [];
    do {
      exprs.push(parseExprSeq(stream));
    } while (stream.eat("|"));
    return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
  }
  function parseExprSeq(stream) {
    var exprs = [];
    do {
      exprs.push(parseExprSubscript(stream));
    } while (stream.next && stream.next != ")" && stream.next != "|");
    return exprs.length == 1 ? exprs[0] : { type: "seq", exprs };
  }
  function parseExprSubscript(stream) {
    var expr = parseExprAtom(stream);
    for (; ; ) {
      if (stream.eat("+")) {
        expr = { type: "plus", expr };
      } else if (stream.eat("*")) {
        expr = { type: "star", expr };
      } else if (stream.eat("?")) {
        expr = { type: "opt", expr };
      } else if (stream.eat("{")) {
        expr = parseExprRange(stream, expr);
      } else {
        break;
      }
    }
    return expr;
  }
  function parseNum(stream) {
    if (/\D/.test(stream.next)) {
      stream.err("Expected number, got '" + stream.next + "'");
    }
    var result2 = Number(stream.next);
    stream.pos++;
    return result2;
  }
  function parseExprRange(stream, expr) {
    var min2 = parseNum(stream), max2 = min2;
    if (stream.eat(",")) {
      if (stream.next != "}") {
        max2 = parseNum(stream);
      } else {
        max2 = -1;
      }
    }
    if (!stream.eat("}")) {
      stream.err("Unclosed braced range");
    }
    return { type: "range", min: min2, max: max2, expr };
  }
  function resolveName(stream, name) {
    var types = stream.nodeTypes, type = types[name];
    if (type) {
      return [type];
    }
    var result2 = [];
    for (var typeName in types) {
      var type$1 = types[typeName];
      if (type$1.groups.indexOf(name) > -1) {
        result2.push(type$1);
      }
    }
    if (result2.length == 0) {
      stream.err("No node type or group '" + name + "' found");
    }
    return result2;
  }
  function parseExprAtom(stream) {
    if (stream.eat("(")) {
      var expr = parseExpr(stream);
      if (!stream.eat(")")) {
        stream.err("Missing closing paren");
      }
      return expr;
    } else if (!/\W/.test(stream.next)) {
      var exprs = resolveName(stream, stream.next).map(function(type) {
        if (stream.inline == null) {
          stream.inline = type.isInline;
        } else if (stream.inline != type.isInline) {
          stream.err("Mixing inline and block content");
        }
        return { type: "name", value: type };
      });
      stream.pos++;
      return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
    } else {
      stream.err("Unexpected token '" + stream.next + "'");
    }
  }
  function nfa(expr) {
    var nfa2 = [[]];
    connect(compile3(expr, 0), node4());
    return nfa2;
    function node4() {
      return nfa2.push([]) - 1;
    }
    function edge2(from4, to, term) {
      var edge3 = { term, to };
      nfa2[from4].push(edge3);
      return edge3;
    }
    function connect(edges, to) {
      edges.forEach(function(edge3) {
        return edge3.to = to;
      });
    }
    function compile3(expr2, from4) {
      if (expr2.type == "choice") {
        return expr2.exprs.reduce(function(out, expr3) {
          return out.concat(compile3(expr3, from4));
        }, []);
      } else if (expr2.type == "seq") {
        for (var i = 0; ; i++) {
          var next = compile3(expr2.exprs[i], from4);
          if (i == expr2.exprs.length - 1) {
            return next;
          }
          connect(next, from4 = node4());
        }
      } else if (expr2.type == "star") {
        var loop = node4();
        edge2(from4, loop);
        connect(compile3(expr2.expr, loop), loop);
        return [edge2(loop)];
      } else if (expr2.type == "plus") {
        var loop$1 = node4();
        connect(compile3(expr2.expr, from4), loop$1);
        connect(compile3(expr2.expr, loop$1), loop$1);
        return [edge2(loop$1)];
      } else if (expr2.type == "opt") {
        return [edge2(from4)].concat(compile3(expr2.expr, from4));
      } else if (expr2.type == "range") {
        var cur = from4;
        for (var i$1 = 0; i$1 < expr2.min; i$1++) {
          var next$1 = node4();
          connect(compile3(expr2.expr, cur), next$1);
          cur = next$1;
        }
        if (expr2.max == -1) {
          connect(compile3(expr2.expr, cur), cur);
        } else {
          for (var i$2 = expr2.min; i$2 < expr2.max; i$2++) {
            var next$2 = node4();
            edge2(cur, next$2);
            connect(compile3(expr2.expr, cur), next$2);
            cur = next$2;
          }
        }
        return [edge2(cur)];
      } else if (expr2.type == "name") {
        return [edge2(from4, null, expr2.value)];
      }
    }
  }
  function cmp(a, b) {
    return b - a;
  }
  function nullFrom(nfa2, node4) {
    var result2 = [];
    scan(node4);
    return result2.sort(cmp);
    function scan(node5) {
      var edges = nfa2[node5];
      if (edges.length == 1 && !edges[0].term) {
        return scan(edges[0].to);
      }
      result2.push(node5);
      for (var i = 0; i < edges.length; i++) {
        var ref = edges[i];
        var term = ref.term;
        var to = ref.to;
        if (!term && result2.indexOf(to) == -1) {
          scan(to);
        }
      }
    }
  }
  function dfa(nfa2) {
    var labeled = Object.create(null);
    return explore(nullFrom(nfa2, 0));
    function explore(states) {
      var out = [];
      states.forEach(function(node4) {
        nfa2[node4].forEach(function(ref) {
          var term = ref.term;
          var to = ref.to;
          if (!term) {
            return;
          }
          var known = out.indexOf(term), set2 = known > -1 && out[known + 1];
          nullFrom(nfa2, to).forEach(function(node5) {
            if (!set2) {
              out.push(term, set2 = []);
            }
            if (set2.indexOf(node5) == -1) {
              set2.push(node5);
            }
          });
        });
      });
      var state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa2.length - 1) > -1);
      for (var i = 0; i < out.length; i += 2) {
        var states$1 = out[i + 1].sort(cmp);
        state.next.push(out[i], labeled[states$1.join(",")] || explore(states$1));
      }
      return state;
    }
  }
  function checkForDeadEnds(match, stream) {
    for (var i = 0, work = [match]; i < work.length; i++) {
      var state = work[i], dead = !state.validEnd, nodes = [];
      for (var j = 0; j < state.next.length; j += 2) {
        var node4 = state.next[j], next = state.next[j + 1];
        nodes.push(node4.name);
        if (dead && !(node4.isText || node4.hasRequiredAttrs())) {
          dead = false;
        }
        if (work.indexOf(next) == -1) {
          work.push(next);
        }
      }
      if (dead) {
        stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
      }
    }
  }
  function defaultAttrs(attrs) {
    var defaults = Object.create(null);
    for (var attrName in attrs) {
      var attr = attrs[attrName];
      if (!attr.hasDefault) {
        return null;
      }
      defaults[attrName] = attr.default;
    }
    return defaults;
  }
  function computeAttrs(attrs, value) {
    var built = Object.create(null);
    for (var name in attrs) {
      var given = value && value[name];
      if (given === void 0) {
        var attr = attrs[name];
        if (attr.hasDefault) {
          given = attr.default;
        } else {
          throw new RangeError("No value supplied for attribute " + name);
        }
      }
      built[name] = given;
    }
    return built;
  }
  function initAttrs(attrs) {
    var result2 = Object.create(null);
    if (attrs) {
      for (var name in attrs) {
        result2[name] = new Attribute(attrs[name]);
      }
    }
    return result2;
  }
  var NodeType = function NodeType2(name, schema, spec) {
    this.name = name;
    this.schema = schema;
    this.spec = spec;
    this.groups = spec.group ? spec.group.split(" ") : [];
    this.attrs = initAttrs(spec.attrs);
    this.defaultAttrs = defaultAttrs(this.attrs);
    this.contentMatch = null;
    this.markSet = null;
    this.inlineContent = null;
    this.isBlock = !(spec.inline || name == "text");
    this.isText = name == "text";
  };
  var prototypeAccessors$5 = { isInline: { configurable: true }, isTextblock: { configurable: true }, isLeaf: { configurable: true }, isAtom: { configurable: true } };
  prototypeAccessors$5.isInline.get = function() {
    return !this.isBlock;
  };
  prototypeAccessors$5.isTextblock.get = function() {
    return this.isBlock && this.inlineContent;
  };
  prototypeAccessors$5.isLeaf.get = function() {
    return this.contentMatch == ContentMatch.empty;
  };
  prototypeAccessors$5.isAtom.get = function() {
    return this.isLeaf || this.spec.atom;
  };
  NodeType.prototype.hasRequiredAttrs = function hasRequiredAttrs() {
    for (var n in this.attrs) {
      if (this.attrs[n].isRequired) {
        return true;
      }
    }
    return false;
  };
  NodeType.prototype.compatibleContent = function compatibleContent(other) {
    return this == other || this.contentMatch.compatible(other.contentMatch);
  };
  NodeType.prototype.computeAttrs = function computeAttrs$1(attrs) {
    if (!attrs && this.defaultAttrs) {
      return this.defaultAttrs;
    } else {
      return computeAttrs(this.attrs, attrs);
    }
  };
  NodeType.prototype.create = function create(attrs, content2, marks2) {
    if (this.isText) {
      throw new Error("NodeType.create can't construct text nodes");
    }
    return new Node2(this, this.computeAttrs(attrs), Fragment.from(content2), Mark.setFrom(marks2));
  };
  NodeType.prototype.createChecked = function createChecked(attrs, content2, marks2) {
    content2 = Fragment.from(content2);
    if (!this.validContent(content2)) {
      throw new RangeError("Invalid content for node " + this.name);
    }
    return new Node2(this, this.computeAttrs(attrs), content2, Mark.setFrom(marks2));
  };
  NodeType.prototype.createAndFill = function createAndFill(attrs, content2, marks2) {
    attrs = this.computeAttrs(attrs);
    content2 = Fragment.from(content2);
    if (content2.size) {
      var before2 = this.contentMatch.fillBefore(content2);
      if (!before2) {
        return null;
      }
      content2 = before2.append(content2);
    }
    var after2 = this.contentMatch.matchFragment(content2).fillBefore(Fragment.empty, true);
    if (!after2) {
      return null;
    }
    return new Node2(this, attrs, content2.append(after2), Mark.setFrom(marks2));
  };
  NodeType.prototype.validContent = function validContent(content2) {
    var result2 = this.contentMatch.matchFragment(content2);
    if (!result2 || !result2.validEnd) {
      return false;
    }
    for (var i = 0; i < content2.childCount; i++) {
      if (!this.allowsMarks(content2.child(i).marks)) {
        return false;
      }
    }
    return true;
  };
  NodeType.prototype.allowsMarkType = function allowsMarkType(markType) {
    return this.markSet == null || this.markSet.indexOf(markType) > -1;
  };
  NodeType.prototype.allowsMarks = function allowsMarks(marks2) {
    if (this.markSet == null) {
      return true;
    }
    for (var i = 0; i < marks2.length; i++) {
      if (!this.allowsMarkType(marks2[i].type)) {
        return false;
      }
    }
    return true;
  };
  NodeType.prototype.allowedMarks = function allowedMarks(marks2) {
    if (this.markSet == null) {
      return marks2;
    }
    var copy5;
    for (var i = 0; i < marks2.length; i++) {
      if (!this.allowsMarkType(marks2[i].type)) {
        if (!copy5) {
          copy5 = marks2.slice(0, i);
        }
      } else if (copy5) {
        copy5.push(marks2[i]);
      }
    }
    return !copy5 ? marks2 : copy5.length ? copy5 : Mark.empty;
  };
  NodeType.compile = function compile(nodes, schema) {
    var result2 = Object.create(null);
    nodes.forEach(function(name, spec) {
      return result2[name] = new NodeType(name, schema, spec);
    });
    var topType = schema.spec.topNode || "doc";
    if (!result2[topType]) {
      throw new RangeError("Schema is missing its top node type ('" + topType + "')");
    }
    if (!result2.text) {
      throw new RangeError("Every schema needs a 'text' type");
    }
    for (var _ in result2.text.attrs) {
      throw new RangeError("The text node type should not have attributes");
    }
    return result2;
  };
  Object.defineProperties(NodeType.prototype, prototypeAccessors$5);
  var Attribute = function Attribute2(options) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
    this.default = options.default;
  };
  var prototypeAccessors$1$3 = { isRequired: { configurable: true } };
  prototypeAccessors$1$3.isRequired.get = function() {
    return !this.hasDefault;
  };
  Object.defineProperties(Attribute.prototype, prototypeAccessors$1$3);
  var MarkType = function MarkType2(name, rank, schema, spec) {
    this.name = name;
    this.schema = schema;
    this.spec = spec;
    this.attrs = initAttrs(spec.attrs);
    this.rank = rank;
    this.excluded = null;
    var defaults = defaultAttrs(this.attrs);
    this.instance = defaults && new Mark(this, defaults);
  };
  MarkType.prototype.create = function create2(attrs) {
    if (!attrs && this.instance) {
      return this.instance;
    }
    return new Mark(this, computeAttrs(this.attrs, attrs));
  };
  MarkType.compile = function compile2(marks2, schema) {
    var result2 = Object.create(null), rank = 0;
    marks2.forEach(function(name, spec) {
      return result2[name] = new MarkType(name, rank++, schema, spec);
    });
    return result2;
  };
  MarkType.prototype.removeFromSet = function removeFromSet2(set2) {
    for (var i = 0; i < set2.length; i++) {
      if (set2[i].type == this) {
        set2 = set2.slice(0, i).concat(set2.slice(i + 1));
        i--;
      }
    }
    return set2;
  };
  MarkType.prototype.isInSet = function isInSet2(set2) {
    for (var i = 0; i < set2.length; i++) {
      if (set2[i].type == this) {
        return set2[i];
      }
    }
  };
  MarkType.prototype.excludes = function excludes(other) {
    return this.excluded.indexOf(other) > -1;
  };
  var Schema = function Schema2(spec) {
    this.spec = {};
    for (var prop in spec) {
      this.spec[prop] = spec[prop];
    }
    this.spec.nodes = index_es_default.from(spec.nodes);
    this.spec.marks = index_es_default.from(spec.marks);
    this.nodes = NodeType.compile(this.spec.nodes, this);
    this.marks = MarkType.compile(this.spec.marks, this);
    var contentExprCache = Object.create(null);
    for (var prop$1 in this.nodes) {
      if (prop$1 in this.marks) {
        throw new RangeError(prop$1 + " can not be both a node and a mark");
      }
      var type = this.nodes[prop$1], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
      type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = ContentMatch.parse(contentExpr, this.nodes));
      type.inlineContent = type.contentMatch.inlineContent;
      type.markSet = markExpr == "_" ? null : markExpr ? gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
    }
    for (var prop$2 in this.marks) {
      var type$1 = this.marks[prop$2], excl = type$1.spec.excludes;
      type$1.excluded = excl == null ? [type$1] : excl == "" ? [] : gatherMarks(this, excl.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this);
    this.markFromJSON = this.markFromJSON.bind(this);
    this.topNodeType = this.nodes[this.spec.topNode || "doc"];
    this.cached = Object.create(null);
    this.cached.wrappings = Object.create(null);
  };
  Schema.prototype.node = function node2(type, attrs, content2, marks2) {
    if (typeof type == "string") {
      type = this.nodeType(type);
    } else if (!(type instanceof NodeType)) {
      throw new RangeError("Invalid node type: " + type);
    } else if (type.schema != this) {
      throw new RangeError("Node type from different schema used (" + type.name + ")");
    }
    return type.createChecked(attrs, content2, marks2);
  };
  Schema.prototype.text = function text(text$1, marks2) {
    var type = this.nodes.text;
    return new TextNode(type, type.defaultAttrs, text$1, Mark.setFrom(marks2));
  };
  Schema.prototype.mark = function mark2(type, attrs) {
    if (typeof type == "string") {
      type = this.marks[type];
    }
    return type.create(attrs);
  };
  Schema.prototype.nodeFromJSON = function nodeFromJSON(json) {
    return Node2.fromJSON(this, json);
  };
  Schema.prototype.markFromJSON = function markFromJSON(json) {
    return Mark.fromJSON(this, json);
  };
  Schema.prototype.nodeType = function nodeType(name) {
    var found2 = this.nodes[name];
    if (!found2) {
      throw new RangeError("Unknown node type: " + name);
    }
    return found2;
  };
  function gatherMarks(schema, marks2) {
    var found2 = [];
    for (var i = 0; i < marks2.length; i++) {
      var name = marks2[i], mark3 = schema.marks[name], ok2 = mark3;
      if (mark3) {
        found2.push(mark3);
      } else {
        for (var prop in schema.marks) {
          var mark$1 = schema.marks[prop];
          if (name == "_" || mark$1.spec.group && mark$1.spec.group.split(" ").indexOf(name) > -1) {
            found2.push(ok2 = mark$1);
          }
        }
      }
      if (!ok2) {
        throw new SyntaxError("Unknown mark type: '" + marks2[i] + "'");
      }
    }
    return found2;
  }
  var DOMParser = function DOMParser2(schema, rules) {
    var this$1 = this;
    this.schema = schema;
    this.rules = rules;
    this.tags = [];
    this.styles = [];
    rules.forEach(function(rule) {
      if (rule.tag) {
        this$1.tags.push(rule);
      } else if (rule.style) {
        this$1.styles.push(rule);
      }
    });
    this.normalizeLists = !this.tags.some(function(r) {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node) {
        return false;
      }
      var node4 = schema.nodes[r.node];
      return node4.contentMatch.matchType(node4);
    });
  };
  DOMParser.prototype.parse = function parse2(dom, options) {
    if (options === void 0)
      options = {};
    var context = new ParseContext(this, options, false);
    context.addAll(dom, null, options.from, options.to);
    return context.finish();
  };
  DOMParser.prototype.parseSlice = function parseSlice(dom, options) {
    if (options === void 0)
      options = {};
    var context = new ParseContext(this, options, true);
    context.addAll(dom, null, options.from, options.to);
    return Slice.maxOpen(context.finish());
  };
  DOMParser.prototype.matchTag = function matchTag(dom, context, after2) {
    for (var i = after2 ? this.tags.indexOf(after2) + 1 : 0; i < this.tags.length; i++) {
      var rule = this.tags[i];
      if (matches(dom, rule.tag) && (rule.namespace === void 0 || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
        if (rule.getAttrs) {
          var result2 = rule.getAttrs(dom);
          if (result2 === false) {
            continue;
          }
          rule.attrs = result2;
        }
        return rule;
      }
    }
  };
  DOMParser.prototype.matchStyle = function matchStyle(prop, value, context, after2) {
    for (var i = after2 ? this.styles.indexOf(after2) + 1 : 0; i < this.styles.length; i++) {
      var rule = this.styles[i];
      if (rule.style.indexOf(prop) != 0 || rule.context && !context.matchesContext(rule.context) || rule.style.length > prop.length && (rule.style.charCodeAt(prop.length) != 61 || rule.style.slice(prop.length + 1) != value)) {
        continue;
      }
      if (rule.getAttrs) {
        var result2 = rule.getAttrs(value);
        if (result2 === false) {
          continue;
        }
        rule.attrs = result2;
      }
      return rule;
    }
  };
  DOMParser.schemaRules = function schemaRules(schema) {
    var result2 = [];
    function insert(rule) {
      var priority = rule.priority == null ? 50 : rule.priority, i = 0;
      for (; i < result2.length; i++) {
        var next = result2[i], nextPriority = next.priority == null ? 50 : next.priority;
        if (nextPriority < priority) {
          break;
        }
      }
      result2.splice(i, 0, rule);
    }
    var loop = function(name2) {
      var rules = schema.marks[name2].spec.parseDOM;
      if (rules) {
        rules.forEach(function(rule) {
          insert(rule = copy2(rule));
          rule.mark = name2;
        });
      }
    };
    for (var name in schema.marks)
      loop(name);
    var loop$1 = function(name2) {
      var rules$1 = schema.nodes[name$1].spec.parseDOM;
      if (rules$1) {
        rules$1.forEach(function(rule) {
          insert(rule = copy2(rule));
          rule.node = name$1;
        });
      }
    };
    for (var name$1 in schema.nodes)
      loop$1();
    return result2;
  };
  DOMParser.fromSchema = function fromSchema(schema) {
    return schema.cached.domParser || (schema.cached.domParser = new DOMParser(schema, DOMParser.schemaRules(schema)));
  };
  var blockTags = {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    canvas: true,
    dd: true,
    div: true,
    dl: true,
    fieldset: true,
    figcaption: true,
    figure: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    li: true,
    noscript: true,
    ol: true,
    output: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    tfoot: true,
    ul: true
  };
  var ignoreTags = {
    head: true,
    noscript: true,
    object: true,
    script: true,
    style: true,
    title: true
  };
  var listTags = { ol: true, ul: true };
  var OPT_PRESERVE_WS = 1;
  var OPT_PRESERVE_WS_FULL = 2;
  var OPT_OPEN_LEFT = 4;
  function wsOptionsFor(preserveWhitespace) {
    return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0);
  }
  var NodeContext = function NodeContext2(type, attrs, marks2, pendingMarks, solid, match, options) {
    this.type = type;
    this.attrs = attrs;
    this.solid = solid;
    this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
    this.options = options;
    this.content = [];
    this.marks = marks2;
    this.activeMarks = Mark.none;
    this.pendingMarks = pendingMarks;
    this.stashMarks = [];
  };
  NodeContext.prototype.findWrapping = function findWrapping2(node4) {
    if (!this.match) {
      if (!this.type) {
        return [];
      }
      var fill = this.type.contentMatch.fillBefore(Fragment.from(node4));
      if (fill) {
        this.match = this.type.contentMatch.matchFragment(fill);
      } else {
        var start3 = this.type.contentMatch, wrap;
        if (wrap = start3.findWrapping(node4.type)) {
          this.match = start3;
          return wrap;
        } else {
          return null;
        }
      }
    }
    return this.match.findWrapping(node4.type);
  };
  NodeContext.prototype.finish = function finish(openEnd) {
    if (!(this.options & OPT_PRESERVE_WS)) {
      var last = this.content[this.content.length - 1], m;
      if (last && last.isText && (m = /[ \t\r\n\u000c]+$/.exec(last.text))) {
        if (last.text.length == m[0].length) {
          this.content.pop();
        } else {
          this.content[this.content.length - 1] = last.withText(last.text.slice(0, last.text.length - m[0].length));
        }
      }
    }
    var content2 = Fragment.from(this.content);
    if (!openEnd && this.match) {
      content2 = content2.append(this.match.fillBefore(Fragment.empty, true));
    }
    return this.type ? this.type.create(this.attrs, content2, this.marks) : content2;
  };
  NodeContext.prototype.popFromStashMark = function popFromStashMark(mark3) {
    for (var i = this.stashMarks.length - 1; i >= 0; i--) {
      if (mark3.eq(this.stashMarks[i])) {
        return this.stashMarks.splice(i, 1)[0];
      }
    }
  };
  NodeContext.prototype.applyPending = function applyPending(nextType) {
    for (var i = 0, pending = this.pendingMarks; i < pending.length; i++) {
      var mark3 = pending[i];
      if ((this.type ? this.type.allowsMarkType(mark3.type) : markMayApply(mark3.type, nextType)) && !mark3.isInSet(this.activeMarks)) {
        this.activeMarks = mark3.addToSet(this.activeMarks);
        this.pendingMarks = mark3.removeFromSet(this.pendingMarks);
      }
    }
  };
  NodeContext.prototype.inlineContext = function inlineContext(node4) {
    if (this.type) {
      return this.type.inlineContent;
    }
    if (this.content.length) {
      return this.content[0].isInline;
    }
    return node4.parentNode && !blockTags.hasOwnProperty(node4.parentNode.nodeName.toLowerCase());
  };
  var ParseContext = function ParseContext2(parser, options, open) {
    this.parser = parser;
    this.options = options;
    this.isOpen = open;
    var topNode = options.topNode, topContext;
    var topOptions = wsOptionsFor(options.preserveWhitespace) | (open ? OPT_OPEN_LEFT : 0);
    if (topNode) {
      topContext = new NodeContext(topNode.type, topNode.attrs, Mark.none, Mark.none, true, options.topMatch || topNode.type.contentMatch, topOptions);
    } else if (open) {
      topContext = new NodeContext(null, null, Mark.none, Mark.none, true, null, topOptions);
    } else {
      topContext = new NodeContext(parser.schema.topNodeType, null, Mark.none, Mark.none, true, null, topOptions);
    }
    this.nodes = [topContext];
    this.open = 0;
    this.find = options.findPositions;
    this.needsBlock = false;
  };
  var prototypeAccessors$6 = { top: { configurable: true }, currentPos: { configurable: true } };
  prototypeAccessors$6.top.get = function() {
    return this.nodes[this.open];
  };
  ParseContext.prototype.addDOM = function addDOM(dom) {
    if (dom.nodeType == 3) {
      this.addTextNode(dom);
    } else if (dom.nodeType == 1) {
      var style2 = dom.getAttribute("style");
      var marks2 = style2 ? this.readStyles(parseStyles(style2)) : null, top = this.top;
      if (marks2 != null) {
        for (var i = 0; i < marks2.length; i++) {
          this.addPendingMark(marks2[i]);
        }
      }
      this.addElement(dom);
      if (marks2 != null) {
        for (var i$1 = 0; i$1 < marks2.length; i$1++) {
          this.removePendingMark(marks2[i$1], top);
        }
      }
    }
  };
  ParseContext.prototype.addTextNode = function addTextNode(dom) {
    var value = dom.nodeValue;
    var top = this.top;
    if (top.options & OPT_PRESERVE_WS_FULL || top.inlineContext(dom) || /[^ \t\r\n\u000c]/.test(value)) {
      if (!(top.options & OPT_PRESERVE_WS)) {
        value = value.replace(/[ \t\r\n\u000c]+/g, " ");
        if (/^[ \t\r\n\u000c]/.test(value) && this.open == this.nodes.length - 1) {
          var nodeBefore = top.content[top.content.length - 1];
          var domNodeBefore = dom.previousSibling;
          if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == "BR" || nodeBefore.isText && /[ \t\r\n\u000c]$/.test(nodeBefore.text)) {
            value = value.slice(1);
          }
        }
      } else if (!(top.options & OPT_PRESERVE_WS_FULL)) {
        value = value.replace(/\r?\n|\r/g, " ");
      } else {
        value = value.replace(/\r\n?/g, "\n");
      }
      if (value) {
        this.insertNode(this.parser.schema.text(value));
      }
      this.findInText(dom);
    } else {
      this.findInside(dom);
    }
  };
  ParseContext.prototype.addElement = function addElement(dom, matchAfter) {
    var name = dom.nodeName.toLowerCase(), ruleID;
    if (listTags.hasOwnProperty(name) && this.parser.normalizeLists) {
      normalizeList(dom);
    }
    var rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || (ruleID = this.parser.matchTag(dom, this, matchAfter));
    if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
      this.findInside(dom);
      this.ignoreFallback(dom);
    } else if (!rule || rule.skip || rule.closeParent) {
      if (rule && rule.closeParent) {
        this.open = Math.max(0, this.open - 1);
      } else if (rule && rule.skip.nodeType) {
        dom = rule.skip;
      }
      var sync2, top = this.top, oldNeedsBlock = this.needsBlock;
      if (blockTags.hasOwnProperty(name)) {
        sync2 = true;
        if (!top.type) {
          this.needsBlock = true;
        }
      } else if (!dom.firstChild) {
        this.leafFallback(dom);
        return;
      }
      this.addAll(dom);
      if (sync2) {
        this.sync(top);
      }
      this.needsBlock = oldNeedsBlock;
    } else {
      this.addElementByRule(dom, rule, rule.consuming === false ? ruleID : null);
    }
  };
  ParseContext.prototype.leafFallback = function leafFallback(dom) {
    if (dom.nodeName == "BR" && this.top.type && this.top.type.inlineContent) {
      this.addTextNode(dom.ownerDocument.createTextNode("\n"));
    }
  };
  ParseContext.prototype.ignoreFallback = function ignoreFallback(dom) {
    if (dom.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent)) {
      this.findPlace(this.parser.schema.text("-"));
    }
  };
  ParseContext.prototype.readStyles = function readStyles(styles) {
    var marks2 = Mark.none;
    style:
      for (var i = 0; i < styles.length; i += 2) {
        for (var after2 = null; ; ) {
          var rule = this.parser.matchStyle(styles[i], styles[i + 1], this, after2);
          if (!rule) {
            continue style;
          }
          if (rule.ignore) {
            return null;
          }
          marks2 = this.parser.schema.marks[rule.mark].create(rule.attrs).addToSet(marks2);
          if (rule.consuming === false) {
            after2 = rule;
          } else {
            break;
          }
        }
      }
    return marks2;
  };
  ParseContext.prototype.addElementByRule = function addElementByRule(dom, rule, continueAfter) {
    var this$1 = this;
    var sync2, nodeType2, markType, mark3;
    if (rule.node) {
      nodeType2 = this.parser.schema.nodes[rule.node];
      if (!nodeType2.isLeaf) {
        sync2 = this.enter(nodeType2, rule.attrs, rule.preserveWhitespace);
      } else if (!this.insertNode(nodeType2.create(rule.attrs))) {
        this.leafFallback(dom);
      }
    } else {
      markType = this.parser.schema.marks[rule.mark];
      mark3 = markType.create(rule.attrs);
      this.addPendingMark(mark3);
    }
    var startIn = this.top;
    if (nodeType2 && nodeType2.isLeaf) {
      this.findInside(dom);
    } else if (continueAfter) {
      this.addElement(dom, continueAfter);
    } else if (rule.getContent) {
      this.findInside(dom);
      rule.getContent(dom, this.parser.schema).forEach(function(node4) {
        return this$1.insertNode(node4);
      });
    } else {
      var contentDOM = rule.contentElement;
      if (typeof contentDOM == "string") {
        contentDOM = dom.querySelector(contentDOM);
      } else if (typeof contentDOM == "function") {
        contentDOM = contentDOM(dom);
      }
      if (!contentDOM) {
        contentDOM = dom;
      }
      this.findAround(dom, contentDOM, true);
      this.addAll(contentDOM, sync2);
    }
    if (sync2) {
      this.sync(startIn);
      this.open--;
    }
    if (mark3) {
      this.removePendingMark(mark3, startIn);
    }
  };
  ParseContext.prototype.addAll = function addAll(parent, sync2, startIndex, endIndex) {
    var index2 = startIndex || 0;
    for (var dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end2 = endIndex == null ? null : parent.childNodes[endIndex]; dom != end2; dom = dom.nextSibling, ++index2) {
      this.findAtPoint(parent, index2);
      this.addDOM(dom);
      if (sync2 && blockTags.hasOwnProperty(dom.nodeName.toLowerCase())) {
        this.sync(sync2);
      }
    }
    this.findAtPoint(parent, index2);
  };
  ParseContext.prototype.findPlace = function findPlace(node4) {
    var route, sync2;
    for (var depth = this.open; depth >= 0; depth--) {
      var cx = this.nodes[depth];
      var found2 = cx.findWrapping(node4);
      if (found2 && (!route || route.length > found2.length)) {
        route = found2;
        sync2 = cx;
        if (!found2.length) {
          break;
        }
      }
      if (cx.solid) {
        break;
      }
    }
    if (!route) {
      return false;
    }
    this.sync(sync2);
    for (var i = 0; i < route.length; i++) {
      this.enterInner(route[i], null, false);
    }
    return true;
  };
  ParseContext.prototype.insertNode = function insertNode(node4) {
    if (node4.isInline && this.needsBlock && !this.top.type) {
      var block = this.textblockFromContext();
      if (block) {
        this.enterInner(block);
      }
    }
    if (this.findPlace(node4)) {
      this.closeExtra();
      var top = this.top;
      top.applyPending(node4.type);
      if (top.match) {
        top.match = top.match.matchType(node4.type);
      }
      var marks2 = top.activeMarks;
      for (var i = 0; i < node4.marks.length; i++) {
        if (!top.type || top.type.allowsMarkType(node4.marks[i].type)) {
          marks2 = node4.marks[i].addToSet(marks2);
        }
      }
      top.content.push(node4.mark(marks2));
      return true;
    }
    return false;
  };
  ParseContext.prototype.enter = function enter(type, attrs, preserveWS) {
    var ok2 = this.findPlace(type.create(attrs));
    if (ok2) {
      this.enterInner(type, attrs, true, preserveWS);
    }
    return ok2;
  };
  ParseContext.prototype.enterInner = function enterInner(type, attrs, solid, preserveWS) {
    this.closeExtra();
    var top = this.top;
    top.applyPending(type);
    top.match = top.match && top.match.matchType(type, attrs);
    var options = preserveWS == null ? top.options & ~OPT_OPEN_LEFT : wsOptionsFor(preserveWS);
    if (top.options & OPT_OPEN_LEFT && top.content.length == 0) {
      options |= OPT_OPEN_LEFT;
    }
    this.nodes.push(new NodeContext(type, attrs, top.activeMarks, top.pendingMarks, solid, null, options));
    this.open++;
  };
  ParseContext.prototype.closeExtra = function closeExtra(openEnd) {
    var i = this.nodes.length - 1;
    if (i > this.open) {
      for (; i > this.open; i--) {
        this.nodes[i - 1].content.push(this.nodes[i].finish(openEnd));
      }
      this.nodes.length = this.open + 1;
    }
  };
  ParseContext.prototype.finish = function finish2() {
    this.open = 0;
    this.closeExtra(this.isOpen);
    return this.nodes[0].finish(this.isOpen || this.options.topOpen);
  };
  ParseContext.prototype.sync = function sync(to) {
    for (var i = this.open; i >= 0; i--) {
      if (this.nodes[i] == to) {
        this.open = i;
        return;
      }
    }
  };
  prototypeAccessors$6.currentPos.get = function() {
    this.closeExtra();
    var pos = 0;
    for (var i = this.open; i >= 0; i--) {
      var content2 = this.nodes[i].content;
      for (var j = content2.length - 1; j >= 0; j--) {
        pos += content2[j].nodeSize;
      }
      if (i) {
        pos++;
      }
    }
    return pos;
  };
  ParseContext.prototype.findAtPoint = function findAtPoint(parent, offset2) {
    if (this.find) {
      for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].node == parent && this.find[i].offset == offset2) {
          this.find[i].pos = this.currentPos;
        }
      }
    }
  };
  ParseContext.prototype.findInside = function findInside(parent) {
    if (this.find) {
      for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
          this.find[i].pos = this.currentPos;
        }
      }
    }
  };
  ParseContext.prototype.findAround = function findAround(parent, content2, before2) {
    if (parent != content2 && this.find) {
      for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
          var pos = content2.compareDocumentPosition(this.find[i].node);
          if (pos & (before2 ? 2 : 4)) {
            this.find[i].pos = this.currentPos;
          }
        }
      }
    }
  };
  ParseContext.prototype.findInText = function findInText(textNode) {
    if (this.find) {
      for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].node == textNode) {
          this.find[i].pos = this.currentPos - (textNode.nodeValue.length - this.find[i].offset);
        }
      }
    }
  };
  ParseContext.prototype.matchesContext = function matchesContext(context) {
    var this$1 = this;
    if (context.indexOf("|") > -1) {
      return context.split(/\s*\|\s*/).some(this.matchesContext, this);
    }
    var parts = context.split("/");
    var option = this.options.context;
    var useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
    var minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
    var match = function(i, depth) {
      for (; i >= 0; i--) {
        var part = parts[i];
        if (part == "") {
          if (i == parts.length - 1 || i == 0) {
            continue;
          }
          for (; depth >= minDepth; depth--) {
            if (match(i - 1, depth)) {
              return true;
            }
          }
          return false;
        } else {
          var next = depth > 0 || depth == 0 && useRoot ? this$1.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
          if (!next || next.name != part && next.groups.indexOf(part) == -1) {
            return false;
          }
          depth--;
        }
      }
      return true;
    };
    return match(parts.length - 1, this.open);
  };
  ParseContext.prototype.textblockFromContext = function textblockFromContext() {
    var $context = this.options.context;
    if ($context) {
      for (var d = $context.depth; d >= 0; d--) {
        var deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
        if (deflt && deflt.isTextblock && deflt.defaultAttrs) {
          return deflt;
        }
      }
    }
    for (var name in this.parser.schema.nodes) {
      var type = this.parser.schema.nodes[name];
      if (type.isTextblock && type.defaultAttrs) {
        return type;
      }
    }
  };
  ParseContext.prototype.addPendingMark = function addPendingMark(mark3) {
    var found2 = findSameMarkInSet(mark3, this.top.pendingMarks);
    if (found2) {
      this.top.stashMarks.push(found2);
    }
    this.top.pendingMarks = mark3.addToSet(this.top.pendingMarks);
  };
  ParseContext.prototype.removePendingMark = function removePendingMark(mark3, upto) {
    for (var depth = this.open; depth >= 0; depth--) {
      var level = this.nodes[depth];
      var found2 = level.pendingMarks.lastIndexOf(mark3);
      if (found2 > -1) {
        level.pendingMarks = mark3.removeFromSet(level.pendingMarks);
      } else {
        level.activeMarks = mark3.removeFromSet(level.activeMarks);
        var stashMark = level.popFromStashMark(mark3);
        if (stashMark && level.type && level.type.allowsMarkType(stashMark.type)) {
          level.activeMarks = stashMark.addToSet(level.activeMarks);
        }
      }
      if (level == upto) {
        break;
      }
    }
  };
  Object.defineProperties(ParseContext.prototype, prototypeAccessors$6);
  function normalizeList(dom) {
    for (var child3 = dom.firstChild, prevItem = null; child3; child3 = child3.nextSibling) {
      var name = child3.nodeType == 1 ? child3.nodeName.toLowerCase() : null;
      if (name && listTags.hasOwnProperty(name) && prevItem) {
        prevItem.appendChild(child3);
        child3 = prevItem;
      } else if (name == "li") {
        prevItem = child3;
      } else if (name) {
        prevItem = null;
      }
    }
  }
  function matches(dom, selector) {
    return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
  }
  function parseStyles(style2) {
    var re = /\s*([\w-]+)\s*:\s*([^;]+)/g, m, result2 = [];
    while (m = re.exec(style2)) {
      result2.push(m[1], m[2].trim());
    }
    return result2;
  }
  function copy2(obj) {
    var copy5 = {};
    for (var prop in obj) {
      copy5[prop] = obj[prop];
    }
    return copy5;
  }
  function markMayApply(markType, nodeType2) {
    var nodes = nodeType2.schema.nodes;
    var loop = function(name2) {
      var parent = nodes[name2];
      if (!parent.allowsMarkType(markType)) {
        return;
      }
      var seen = [], scan = function(match) {
        seen.push(match);
        for (var i = 0; i < match.edgeCount; i++) {
          var ref = match.edge(i);
          var type = ref.type;
          var next = ref.next;
          if (type == nodeType2) {
            return true;
          }
          if (seen.indexOf(next) < 0 && scan(next)) {
            return true;
          }
        }
      };
      if (scan(parent.contentMatch)) {
        return { v: true };
      }
    };
    for (var name in nodes) {
      var returned = loop(name);
      if (returned)
        return returned.v;
    }
  }
  function findSameMarkInSet(mark3, set2) {
    for (var i = 0; i < set2.length; i++) {
      if (mark3.eq(set2[i])) {
        return set2[i];
      }
    }
  }
  var DOMSerializer = function DOMSerializer2(nodes, marks2) {
    this.nodes = nodes || {};
    this.marks = marks2 || {};
  };
  DOMSerializer.prototype.serializeFragment = function serializeFragment(fragment, options, target) {
    var this$1 = this;
    if (options === void 0)
      options = {};
    if (!target) {
      target = doc(options).createDocumentFragment();
    }
    var top = target, active = null;
    fragment.forEach(function(node4) {
      if (active || node4.marks.length) {
        if (!active) {
          active = [];
        }
        var keep = 0, rendered = 0;
        while (keep < active.length && rendered < node4.marks.length) {
          var next = node4.marks[rendered];
          if (!this$1.marks[next.type.name]) {
            rendered++;
            continue;
          }
          if (!next.eq(active[keep]) || next.type.spec.spanning === false) {
            break;
          }
          keep += 2;
          rendered++;
        }
        while (keep < active.length) {
          top = active.pop();
          active.pop();
        }
        while (rendered < node4.marks.length) {
          var add3 = node4.marks[rendered++];
          var markDOM = this$1.serializeMark(add3, node4.isInline, options);
          if (markDOM) {
            active.push(add3, top);
            top.appendChild(markDOM.dom);
            top = markDOM.contentDOM || markDOM.dom;
          }
        }
      }
      top.appendChild(this$1.serializeNodeInner(node4, options));
    });
    return target;
  };
  DOMSerializer.prototype.serializeNodeInner = function serializeNodeInner(node4, options) {
    if (options === void 0)
      options = {};
    var ref = DOMSerializer.renderSpec(doc(options), this.nodes[node4.type.name](node4));
    var dom = ref.dom;
    var contentDOM = ref.contentDOM;
    if (contentDOM) {
      if (node4.isLeaf) {
        throw new RangeError("Content hole not allowed in a leaf node spec");
      }
      if (options.onContent) {
        options.onContent(node4, contentDOM, options);
      } else {
        this.serializeFragment(node4.content, options, contentDOM);
      }
    }
    return dom;
  };
  DOMSerializer.prototype.serializeNode = function serializeNode(node4, options) {
    if (options === void 0)
      options = {};
    var dom = this.serializeNodeInner(node4, options);
    for (var i = node4.marks.length - 1; i >= 0; i--) {
      var wrap = this.serializeMark(node4.marks[i], node4.isInline, options);
      if (wrap) {
        (wrap.contentDOM || wrap.dom).appendChild(dom);
        dom = wrap.dom;
      }
    }
    return dom;
  };
  DOMSerializer.prototype.serializeMark = function serializeMark(mark3, inline2, options) {
    if (options === void 0)
      options = {};
    var toDOM = this.marks[mark3.type.name];
    return toDOM && DOMSerializer.renderSpec(doc(options), toDOM(mark3, inline2));
  };
  DOMSerializer.renderSpec = function renderSpec(doc2, structure, xmlNS) {
    if (xmlNS === void 0)
      xmlNS = null;
    if (typeof structure == "string") {
      return { dom: doc2.createTextNode(structure) };
    }
    if (structure.nodeType != null) {
      return { dom: structure };
    }
    if (structure.dom && structure.dom.nodeType != null) {
      return structure;
    }
    var tagName = structure[0], space = tagName.indexOf(" ");
    if (space > 0) {
      xmlNS = tagName.slice(0, space);
      tagName = tagName.slice(space + 1);
    }
    var contentDOM = null, dom = xmlNS ? doc2.createElementNS(xmlNS, tagName) : doc2.createElement(tagName);
    var attrs = structure[1], start3 = 1;
    if (attrs && typeof attrs == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
      start3 = 2;
      for (var name in attrs) {
        if (attrs[name] != null) {
          var space$1 = name.indexOf(" ");
          if (space$1 > 0) {
            dom.setAttributeNS(name.slice(0, space$1), name.slice(space$1 + 1), attrs[name]);
          } else {
            dom.setAttribute(name, attrs[name]);
          }
        }
      }
    }
    for (var i = start3; i < structure.length; i++) {
      var child3 = structure[i];
      if (child3 === 0) {
        if (i < structure.length - 1 || i > start3) {
          throw new RangeError("Content hole must be the only child of its parent node");
        }
        return { dom, contentDOM: dom };
      } else {
        var ref = DOMSerializer.renderSpec(doc2, child3, xmlNS);
        var inner = ref.dom;
        var innerContent = ref.contentDOM;
        dom.appendChild(inner);
        if (innerContent) {
          if (contentDOM) {
            throw new RangeError("Multiple content holes");
          }
          contentDOM = innerContent;
        }
      }
    }
    return { dom, contentDOM };
  };
  DOMSerializer.fromSchema = function fromSchema2(schema) {
    return schema.cached.domSerializer || (schema.cached.domSerializer = new DOMSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
  };
  DOMSerializer.nodesFromSchema = function nodesFromSchema(schema) {
    var result2 = gatherToDOM(schema.nodes);
    if (!result2.text) {
      result2.text = function(node4) {
        return node4.text;
      };
    }
    return result2;
  };
  DOMSerializer.marksFromSchema = function marksFromSchema(schema) {
    return gatherToDOM(schema.marks);
  };
  function gatherToDOM(obj) {
    var result2 = {};
    for (var name in obj) {
      var toDOM = obj[name].spec.toDOM;
      if (toDOM) {
        result2[name] = toDOM;
      }
    }
    return result2;
  }
  function doc(options) {
    return options.document || window.document;
  }

  // node_modules/prosemirror-transform/dist/index.es.js
  var lower16 = 65535;
  var factor16 = Math.pow(2, 16);
  function makeRecover(index2, offset2) {
    return index2 + offset2 * factor16;
  }
  function recoverIndex(value) {
    return value & lower16;
  }
  function recoverOffset(value) {
    return (value - (value & lower16)) / factor16;
  }
  var MapResult = function MapResult2(pos, deleted, recover2) {
    if (deleted === void 0)
      deleted = false;
    if (recover2 === void 0)
      recover2 = null;
    this.pos = pos;
    this.deleted = deleted;
    this.recover = recover2;
  };
  var StepMap = function StepMap2(ranges, inverted) {
    if (inverted === void 0)
      inverted = false;
    this.ranges = ranges;
    this.inverted = inverted;
  };
  StepMap.prototype.recover = function recover(value) {
    var diff = 0, index2 = recoverIndex(value);
    if (!this.inverted) {
      for (var i = 0; i < index2; i++) {
        diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
      }
    }
    return this.ranges[index2 * 3] + diff + recoverOffset(value);
  };
  StepMap.prototype.mapResult = function mapResult(pos, assoc) {
    if (assoc === void 0)
      assoc = 1;
    return this._map(pos, assoc, false);
  };
  StepMap.prototype.map = function map(pos, assoc) {
    if (assoc === void 0)
      assoc = 1;
    return this._map(pos, assoc, true);
  };
  StepMap.prototype._map = function _map(pos, assoc, simple) {
    var diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (var i = 0; i < this.ranges.length; i += 3) {
      var start3 = this.ranges[i] - (this.inverted ? diff : 0);
      if (start3 > pos) {
        break;
      }
      var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end2 = start3 + oldSize;
      if (pos <= end2) {
        var side = !oldSize ? assoc : pos == start3 ? -1 : pos == end2 ? 1 : assoc;
        var result2 = start3 + diff + (side < 0 ? 0 : newSize);
        if (simple) {
          return result2;
        }
        var recover2 = pos == (assoc < 0 ? start3 : end2) ? null : makeRecover(i / 3, pos - start3);
        return new MapResult(result2, assoc < 0 ? pos != start3 : pos != end2, recover2);
      }
      diff += newSize - oldSize;
    }
    return simple ? pos + diff : new MapResult(pos + diff);
  };
  StepMap.prototype.touches = function touches(pos, recover2) {
    var diff = 0, index2 = recoverIndex(recover2);
    var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (var i = 0; i < this.ranges.length; i += 3) {
      var start3 = this.ranges[i] - (this.inverted ? diff : 0);
      if (start3 > pos) {
        break;
      }
      var oldSize = this.ranges[i + oldIndex], end2 = start3 + oldSize;
      if (pos <= end2 && i == index2 * 3) {
        return true;
      }
      diff += this.ranges[i + newIndex] - oldSize;
    }
    return false;
  };
  StepMap.prototype.forEach = function forEach3(f) {
    var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (var i = 0, diff = 0; i < this.ranges.length; i += 3) {
      var start3 = this.ranges[i], oldStart = start3 - (this.inverted ? diff : 0), newStart = start3 + (this.inverted ? 0 : diff);
      var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
      f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
      diff += newSize - oldSize;
    }
  };
  StepMap.prototype.invert = function invert() {
    return new StepMap(this.ranges, !this.inverted);
  };
  StepMap.prototype.toString = function toString6() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  };
  StepMap.offset = function offset(n) {
    return n == 0 ? StepMap.empty : new StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
  };
  StepMap.empty = new StepMap([]);
  var Mapping = function Mapping2(maps, mirror, from4, to) {
    this.maps = maps || [];
    this.from = from4 || 0;
    this.to = to == null ? this.maps.length : to;
    this.mirror = mirror;
  };
  Mapping.prototype.slice = function slice2(from4, to) {
    if (from4 === void 0)
      from4 = 0;
    if (to === void 0)
      to = this.maps.length;
    return new Mapping(this.maps, this.mirror, from4, to);
  };
  Mapping.prototype.copy = function copy3() {
    return new Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  };
  Mapping.prototype.appendMap = function appendMap(map15, mirrors) {
    this.to = this.maps.push(map15);
    if (mirrors != null) {
      this.setMirror(this.maps.length - 1, mirrors);
    }
  };
  Mapping.prototype.appendMapping = function appendMapping(mapping) {
    for (var i = 0, startSize = this.maps.length; i < mapping.maps.length; i++) {
      var mirr = mapping.getMirror(i);
      this.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : null);
    }
  };
  Mapping.prototype.getMirror = function getMirror(n) {
    if (this.mirror) {
      for (var i = 0; i < this.mirror.length; i++) {
        if (this.mirror[i] == n) {
          return this.mirror[i + (i % 2 ? -1 : 1)];
        }
      }
    }
  };
  Mapping.prototype.setMirror = function setMirror(n, m) {
    if (!this.mirror) {
      this.mirror = [];
    }
    this.mirror.push(n, m);
  };
  Mapping.prototype.appendMappingInverted = function appendMappingInverted(mapping) {
    for (var i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--) {
      var mirr = mapping.getMirror(i);
      this.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : null);
    }
  };
  Mapping.prototype.invert = function invert2() {
    var inverse = new Mapping();
    inverse.appendMappingInverted(this);
    return inverse;
  };
  Mapping.prototype.map = function map2(pos, assoc) {
    if (assoc === void 0)
      assoc = 1;
    if (this.mirror) {
      return this._map(pos, assoc, true);
    }
    for (var i = this.from; i < this.to; i++) {
      pos = this.maps[i].map(pos, assoc);
    }
    return pos;
  };
  Mapping.prototype.mapResult = function mapResult2(pos, assoc) {
    if (assoc === void 0)
      assoc = 1;
    return this._map(pos, assoc, false);
  };
  Mapping.prototype._map = function _map2(pos, assoc, simple) {
    var deleted = false;
    for (var i = this.from; i < this.to; i++) {
      var map15 = this.maps[i], result2 = map15.mapResult(pos, assoc);
      if (result2.recover != null) {
        var corr = this.getMirror(i);
        if (corr != null && corr > i && corr < this.to) {
          i = corr;
          pos = this.maps[corr].recover(result2.recover);
          continue;
        }
      }
      if (result2.deleted) {
        deleted = true;
      }
      pos = result2.pos;
    }
    return simple ? pos : new MapResult(pos, deleted);
  };
  function TransformError(message) {
    var err2 = Error.call(this, message);
    err2.__proto__ = TransformError.prototype;
    return err2;
  }
  TransformError.prototype = Object.create(Error.prototype);
  TransformError.prototype.constructor = TransformError;
  TransformError.prototype.name = "TransformError";
  var Transform = function Transform2(doc2) {
    this.doc = doc2;
    this.steps = [];
    this.docs = [];
    this.mapping = new Mapping();
  };
  var prototypeAccessors2 = { before: { configurable: true }, docChanged: { configurable: true } };
  prototypeAccessors2.before.get = function() {
    return this.docs.length ? this.docs[0] : this.doc;
  };
  Transform.prototype.step = function step(object) {
    var result2 = this.maybeStep(object);
    if (result2.failed) {
      throw new TransformError(result2.failed);
    }
    return this;
  };
  Transform.prototype.maybeStep = function maybeStep(step2) {
    var result2 = step2.apply(this.doc);
    if (!result2.failed) {
      this.addStep(step2, result2.doc);
    }
    return result2;
  };
  prototypeAccessors2.docChanged.get = function() {
    return this.steps.length > 0;
  };
  Transform.prototype.addStep = function addStep(step2, doc2) {
    this.docs.push(this.doc);
    this.steps.push(step2);
    this.mapping.appendMap(step2.getMap());
    this.doc = doc2;
  };
  Object.defineProperties(Transform.prototype, prototypeAccessors2);
  function mustOverride() {
    throw new Error("Override me");
  }
  var stepsByID = Object.create(null);
  var Step = function Step2() {
  };
  Step.prototype.apply = function apply(_doc) {
    return mustOverride();
  };
  Step.prototype.getMap = function getMap() {
    return StepMap.empty;
  };
  Step.prototype.invert = function invert3(_doc) {
    return mustOverride();
  };
  Step.prototype.map = function map3(_mapping) {
    return mustOverride();
  };
  Step.prototype.merge = function merge(_other) {
    return null;
  };
  Step.prototype.toJSON = function toJSON5() {
    return mustOverride();
  };
  Step.fromJSON = function fromJSON5(schema, json) {
    if (!json || !json.stepType) {
      throw new RangeError("Invalid input for Step.fromJSON");
    }
    var type = stepsByID[json.stepType];
    if (!type) {
      throw new RangeError("No step type " + json.stepType + " defined");
    }
    return type.fromJSON(schema, json);
  };
  Step.jsonID = function jsonID(id, stepClass) {
    if (id in stepsByID) {
      throw new RangeError("Duplicate use of step JSON ID " + id);
    }
    stepsByID[id] = stepClass;
    stepClass.prototype.jsonID = id;
    return stepClass;
  };
  var StepResult = function StepResult2(doc2, failed) {
    this.doc = doc2;
    this.failed = failed;
  };
  StepResult.ok = function ok(doc2) {
    return new StepResult(doc2, null);
  };
  StepResult.fail = function fail(message) {
    return new StepResult(null, message);
  };
  StepResult.fromReplace = function fromReplace(doc2, from4, to, slice4) {
    try {
      return StepResult.ok(doc2.replace(from4, to, slice4));
    } catch (e) {
      if (e instanceof ReplaceError) {
        return StepResult.fail(e.message);
      }
      throw e;
    }
  };
  var ReplaceStep = /* @__PURE__ */ function(Step3) {
    function ReplaceStep2(from4, to, slice4, structure) {
      Step3.call(this);
      this.from = from4;
      this.to = to;
      this.slice = slice4;
      this.structure = !!structure;
    }
    if (Step3)
      ReplaceStep2.__proto__ = Step3;
    ReplaceStep2.prototype = Object.create(Step3 && Step3.prototype);
    ReplaceStep2.prototype.constructor = ReplaceStep2;
    ReplaceStep2.prototype.apply = function apply8(doc2) {
      if (this.structure && contentBetween(doc2, this.from, this.to)) {
        return StepResult.fail("Structure replace would overwrite content");
      }
      return StepResult.fromReplace(doc2, this.from, this.to, this.slice);
    };
    ReplaceStep2.prototype.getMap = function getMap2() {
      return new StepMap([this.from, this.to - this.from, this.slice.size]);
    };
    ReplaceStep2.prototype.invert = function invert4(doc2) {
      return new ReplaceStep2(this.from, this.from + this.slice.size, doc2.slice(this.from, this.to));
    };
    ReplaceStep2.prototype.map = function map15(mapping) {
      var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
      if (from4.deleted && to.deleted) {
        return null;
      }
      return new ReplaceStep2(from4.pos, Math.max(from4.pos, to.pos), this.slice);
    };
    ReplaceStep2.prototype.merge = function merge3(other) {
      if (!(other instanceof ReplaceStep2) || other.structure || this.structure) {
        return null;
      }
      if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
        var slice4 = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
        return new ReplaceStep2(this.from, this.to + (other.to - other.from), slice4, this.structure);
      } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
        var slice$1 = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
        return new ReplaceStep2(other.from, this.to, slice$1, this.structure);
      } else {
        return null;
      }
    };
    ReplaceStep2.prototype.toJSON = function toJSON7() {
      var json = { stepType: "replace", from: this.from, to: this.to };
      if (this.slice.size) {
        json.slice = this.slice.toJSON();
      }
      if (this.structure) {
        json.structure = true;
      }
      return json;
    };
    ReplaceStep2.fromJSON = function fromJSON8(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") {
        throw new RangeError("Invalid input for ReplaceStep.fromJSON");
      }
      return new ReplaceStep2(json.from, json.to, Slice.fromJSON(schema, json.slice), !!json.structure);
    };
    return ReplaceStep2;
  }(Step);
  Step.jsonID("replace", ReplaceStep);
  var ReplaceAroundStep = /* @__PURE__ */ function(Step3) {
    function ReplaceAroundStep2(from4, to, gapFrom, gapTo, slice4, insert, structure) {
      Step3.call(this);
      this.from = from4;
      this.to = to;
      this.gapFrom = gapFrom;
      this.gapTo = gapTo;
      this.slice = slice4;
      this.insert = insert;
      this.structure = !!structure;
    }
    if (Step3)
      ReplaceAroundStep2.__proto__ = Step3;
    ReplaceAroundStep2.prototype = Object.create(Step3 && Step3.prototype);
    ReplaceAroundStep2.prototype.constructor = ReplaceAroundStep2;
    ReplaceAroundStep2.prototype.apply = function apply8(doc2) {
      if (this.structure && (contentBetween(doc2, this.from, this.gapFrom) || contentBetween(doc2, this.gapTo, this.to))) {
        return StepResult.fail("Structure gap-replace would overwrite content");
      }
      var gap = doc2.slice(this.gapFrom, this.gapTo);
      if (gap.openStart || gap.openEnd) {
        return StepResult.fail("Gap is not a flat range");
      }
      var inserted = this.slice.insertAt(this.insert, gap.content);
      if (!inserted) {
        return StepResult.fail("Content does not fit in gap");
      }
      return StepResult.fromReplace(doc2, this.from, this.to, inserted);
    };
    ReplaceAroundStep2.prototype.getMap = function getMap2() {
      return new StepMap([
        this.from,
        this.gapFrom - this.from,
        this.insert,
        this.gapTo,
        this.to - this.gapTo,
        this.slice.size - this.insert
      ]);
    };
    ReplaceAroundStep2.prototype.invert = function invert4(doc2) {
      var gap = this.gapTo - this.gapFrom;
      return new ReplaceAroundStep2(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc2.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
    };
    ReplaceAroundStep2.prototype.map = function map15(mapping) {
      var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
      var gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
      if (from4.deleted && to.deleted || gapFrom < from4.pos || gapTo > to.pos) {
        return null;
      }
      return new ReplaceAroundStep2(from4.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
    };
    ReplaceAroundStep2.prototype.toJSON = function toJSON7() {
      var json = {
        stepType: "replaceAround",
        from: this.from,
        to: this.to,
        gapFrom: this.gapFrom,
        gapTo: this.gapTo,
        insert: this.insert
      };
      if (this.slice.size) {
        json.slice = this.slice.toJSON();
      }
      if (this.structure) {
        json.structure = true;
      }
      return json;
    };
    ReplaceAroundStep2.fromJSON = function fromJSON8(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") {
        throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
      }
      return new ReplaceAroundStep2(json.from, json.to, json.gapFrom, json.gapTo, Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
    };
    return ReplaceAroundStep2;
  }(Step);
  Step.jsonID("replaceAround", ReplaceAroundStep);
  function contentBetween(doc2, from4, to) {
    var $from = doc2.resolve(from4), dist = to - from4, depth = $from.depth;
    while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
      depth--;
      dist--;
    }
    if (dist > 0) {
      var next = $from.node(depth).maybeChild($from.indexAfter(depth));
      while (dist > 0) {
        if (!next || next.isLeaf) {
          return true;
        }
        next = next.firstChild;
        dist--;
      }
    }
    return false;
  }
  function canCut(node4, start3, end2) {
    return (start3 == 0 || node4.canReplace(start3, node4.childCount)) && (end2 == node4.childCount || node4.canReplace(0, end2));
  }
  function liftTarget(range) {
    var parent = range.parent;
    var content2 = parent.content.cutByIndex(range.startIndex, range.endIndex);
    for (var depth = range.depth; ; --depth) {
      var node4 = range.$from.node(depth);
      var index2 = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
      if (depth < range.depth && node4.canReplace(index2, endIndex, content2)) {
        return depth;
      }
      if (depth == 0 || node4.type.spec.isolating || !canCut(node4, index2, endIndex)) {
        break;
      }
    }
  }
  Transform.prototype.lift = function(range, target) {
    var $from = range.$from;
    var $to = range.$to;
    var depth = range.depth;
    var gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
    var start3 = gapStart, end2 = gapEnd;
    var before2 = Fragment.empty, openStart = 0;
    for (var d = depth, splitting = false; d > target; d--) {
      if (splitting || $from.index(d) > 0) {
        splitting = true;
        before2 = Fragment.from($from.node(d).copy(before2));
        openStart++;
      } else {
        start3--;
      }
    }
    var after2 = Fragment.empty, openEnd = 0;
    for (var d$1 = depth, splitting$1 = false; d$1 > target; d$1--) {
      if (splitting$1 || $to.after(d$1 + 1) < $to.end(d$1)) {
        splitting$1 = true;
        after2 = Fragment.from($to.node(d$1).copy(after2));
        openEnd++;
      } else {
        end2++;
      }
    }
    return this.step(new ReplaceAroundStep(start3, end2, gapStart, gapEnd, new Slice(before2.append(after2), openStart, openEnd), before2.size - openStart, true));
  };
  function findWrapping3(range, nodeType2, attrs, innerRange) {
    if (innerRange === void 0)
      innerRange = range;
    var around = findWrappingOutside(range, nodeType2);
    var inner = around && findWrappingInside(innerRange, nodeType2);
    if (!inner) {
      return null;
    }
    return around.map(withAttrs).concat({ type: nodeType2, attrs }).concat(inner.map(withAttrs));
  }
  function withAttrs(type) {
    return { type, attrs: null };
  }
  function findWrappingOutside(range, type) {
    var parent = range.parent;
    var startIndex = range.startIndex;
    var endIndex = range.endIndex;
    var around = parent.contentMatchAt(startIndex).findWrapping(type);
    if (!around) {
      return null;
    }
    var outer = around.length ? around[0] : type;
    return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
  }
  function findWrappingInside(range, type) {
    var parent = range.parent;
    var startIndex = range.startIndex;
    var endIndex = range.endIndex;
    var inner = parent.child(startIndex);
    var inside = type.contentMatch.findWrapping(inner.type);
    if (!inside) {
      return null;
    }
    var lastType = inside.length ? inside[inside.length - 1] : type;
    var innerMatch = lastType.contentMatch;
    for (var i = startIndex; innerMatch && i < endIndex; i++) {
      innerMatch = innerMatch.matchType(parent.child(i).type);
    }
    if (!innerMatch || !innerMatch.validEnd) {
      return null;
    }
    return inside;
  }
  Transform.prototype.wrap = function(range, wrappers) {
    var content2 = Fragment.empty;
    for (var i = wrappers.length - 1; i >= 0; i--) {
      content2 = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content2));
    }
    var start3 = range.start, end2 = range.end;
    return this.step(new ReplaceAroundStep(start3, end2, start3, end2, new Slice(content2, 0, 0), wrappers.length, true));
  };
  Transform.prototype.setBlockType = function(from4, to, type, attrs) {
    var this$1 = this;
    if (to === void 0)
      to = from4;
    if (!type.isTextblock) {
      throw new RangeError("Type given to setBlockType should be a textblock");
    }
    var mapFrom = this.steps.length;
    this.doc.nodesBetween(from4, to, function(node4, pos) {
      if (node4.isTextblock && !node4.hasMarkup(type, attrs) && canChangeType(this$1.doc, this$1.mapping.slice(mapFrom).map(pos), type)) {
        this$1.clearIncompatible(this$1.mapping.slice(mapFrom).map(pos, 1), type);
        var mapping = this$1.mapping.slice(mapFrom);
        var startM = mapping.map(pos, 1), endM = mapping.map(pos + node4.nodeSize, 1);
        this$1.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new Slice(Fragment.from(type.create(attrs, null, node4.marks)), 0, 0), 1, true));
        return false;
      }
    });
    return this;
  };
  function canChangeType(doc2, pos, type) {
    var $pos = doc2.resolve(pos), index2 = $pos.index();
    return $pos.parent.canReplaceWith(index2, index2 + 1, type);
  }
  Transform.prototype.setNodeMarkup = function(pos, type, attrs, marks2) {
    var node4 = this.doc.nodeAt(pos);
    if (!node4) {
      throw new RangeError("No node at given position");
    }
    if (!type) {
      type = node4.type;
    }
    var newNode = type.create(attrs, null, marks2 || node4.marks);
    if (node4.isLeaf) {
      return this.replaceWith(pos, pos + node4.nodeSize, newNode);
    }
    if (!type.validContent(node4.content)) {
      throw new RangeError("Invalid content for node type " + type.name);
    }
    return this.step(new ReplaceAroundStep(pos, pos + node4.nodeSize, pos + 1, pos + node4.nodeSize - 1, new Slice(Fragment.from(newNode), 0, 0), 1, true));
  };
  function canSplit(doc2, pos, depth, typesAfter) {
    if (depth === void 0)
      depth = 1;
    var $pos = doc2.resolve(pos), base2 = $pos.depth - depth;
    var innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
    if (base2 < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) {
      return false;
    }
    for (var d = $pos.depth - 1, i = depth - 2; d > base2; d--, i--) {
      var node4 = $pos.node(d), index$1 = $pos.index(d);
      if (node4.type.spec.isolating) {
        return false;
      }
      var rest = node4.content.cutByIndex(index$1, node4.childCount);
      var after2 = typesAfter && typesAfter[i] || node4;
      if (after2 != node4) {
        rest = rest.replaceChild(0, after2.type.create(after2.attrs));
      }
      if (!node4.canReplace(index$1 + 1, node4.childCount) || !after2.type.validContent(rest)) {
        return false;
      }
    }
    var index2 = $pos.indexAfter(base2);
    var baseType = typesAfter && typesAfter[0];
    return $pos.node(base2).canReplaceWith(index2, index2, baseType ? baseType.type : $pos.node(base2 + 1).type);
  }
  Transform.prototype.split = function(pos, depth, typesAfter) {
    if (depth === void 0)
      depth = 1;
    var $pos = this.doc.resolve(pos), before2 = Fragment.empty, after2 = Fragment.empty;
    for (var d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
      before2 = Fragment.from($pos.node(d).copy(before2));
      var typeAfter = typesAfter && typesAfter[i];
      after2 = Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after2) : $pos.node(d).copy(after2));
    }
    return this.step(new ReplaceStep(pos, pos, new Slice(before2.append(after2), depth, depth), true));
  };
  function canJoin(doc2, pos) {
    var $pos = doc2.resolve(pos), index2 = $pos.index();
    return joinable2($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index2, index2 + 1);
  }
  function joinable2(a, b) {
    return a && b && !a.isLeaf && a.canAppend(b);
  }
  Transform.prototype.join = function(pos, depth) {
    if (depth === void 0)
      depth = 1;
    var step2 = new ReplaceStep(pos - depth, pos + depth, Slice.empty, true);
    return this.step(step2);
  };
  function insertPoint(doc2, pos, nodeType2) {
    var $pos = doc2.resolve(pos);
    if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType2)) {
      return pos;
    }
    if ($pos.parentOffset == 0) {
      for (var d = $pos.depth - 1; d >= 0; d--) {
        var index2 = $pos.index(d);
        if ($pos.node(d).canReplaceWith(index2, index2, nodeType2)) {
          return $pos.before(d + 1);
        }
        if (index2 > 0) {
          return null;
        }
      }
    }
    if ($pos.parentOffset == $pos.parent.content.size) {
      for (var d$1 = $pos.depth - 1; d$1 >= 0; d$1--) {
        var index$1 = $pos.indexAfter(d$1);
        if ($pos.node(d$1).canReplaceWith(index$1, index$1, nodeType2)) {
          return $pos.after(d$1 + 1);
        }
        if (index$1 < $pos.node(d$1).childCount) {
          return null;
        }
      }
    }
  }
  function dropPoint(doc2, pos, slice4) {
    var $pos = doc2.resolve(pos);
    if (!slice4.content.size) {
      return pos;
    }
    var content2 = slice4.content;
    for (var i = 0; i < slice4.openStart; i++) {
      content2 = content2.firstChild.content;
    }
    for (var pass = 1; pass <= (slice4.openStart == 0 && slice4.size ? 2 : 1); pass++) {
      for (var d = $pos.depth; d >= 0; d--) {
        var bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
        var insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
        var parent = $pos.node(d), fits = false;
        if (pass == 1) {
          fits = parent.canReplace(insertPos, insertPos, content2);
        } else {
          var wrapping = parent.contentMatchAt(insertPos).findWrapping(content2.firstChild.type);
          fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
        }
        if (fits) {
          return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
        }
      }
    }
    return null;
  }
  function mapFragment(fragment, f, parent) {
    var mapped = [];
    for (var i = 0; i < fragment.childCount; i++) {
      var child3 = fragment.child(i);
      if (child3.content.size) {
        child3 = child3.copy(mapFragment(child3.content, f, child3));
      }
      if (child3.isInline) {
        child3 = f(child3, parent, i);
      }
      mapped.push(child3);
    }
    return Fragment.fromArray(mapped);
  }
  var AddMarkStep = /* @__PURE__ */ function(Step3) {
    function AddMarkStep2(from4, to, mark3) {
      Step3.call(this);
      this.from = from4;
      this.to = to;
      this.mark = mark3;
    }
    if (Step3)
      AddMarkStep2.__proto__ = Step3;
    AddMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
    AddMarkStep2.prototype.constructor = AddMarkStep2;
    AddMarkStep2.prototype.apply = function apply8(doc2) {
      var this$1 = this;
      var oldSlice = doc2.slice(this.from, this.to), $from = doc2.resolve(this.from);
      var parent = $from.node($from.sharedDepth(this.to));
      var slice4 = new Slice(mapFragment(oldSlice.content, function(node4, parent2) {
        if (!node4.isAtom || !parent2.type.allowsMarkType(this$1.mark.type)) {
          return node4;
        }
        return node4.mark(this$1.mark.addToSet(node4.marks));
      }, parent), oldSlice.openStart, oldSlice.openEnd);
      return StepResult.fromReplace(doc2, this.from, this.to, slice4);
    };
    AddMarkStep2.prototype.invert = function invert4() {
      return new RemoveMarkStep(this.from, this.to, this.mark);
    };
    AddMarkStep2.prototype.map = function map15(mapping) {
      var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
      if (from4.deleted && to.deleted || from4.pos >= to.pos) {
        return null;
      }
      return new AddMarkStep2(from4.pos, to.pos, this.mark);
    };
    AddMarkStep2.prototype.merge = function merge3(other) {
      if (other instanceof AddMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
        return new AddMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
      }
    };
    AddMarkStep2.prototype.toJSON = function toJSON7() {
      return {
        stepType: "addMark",
        mark: this.mark.toJSON(),
        from: this.from,
        to: this.to
      };
    };
    AddMarkStep2.fromJSON = function fromJSON8(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") {
        throw new RangeError("Invalid input for AddMarkStep.fromJSON");
      }
      return new AddMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
    };
    return AddMarkStep2;
  }(Step);
  Step.jsonID("addMark", AddMarkStep);
  var RemoveMarkStep = /* @__PURE__ */ function(Step3) {
    function RemoveMarkStep2(from4, to, mark3) {
      Step3.call(this);
      this.from = from4;
      this.to = to;
      this.mark = mark3;
    }
    if (Step3)
      RemoveMarkStep2.__proto__ = Step3;
    RemoveMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
    RemoveMarkStep2.prototype.constructor = RemoveMarkStep2;
    RemoveMarkStep2.prototype.apply = function apply8(doc2) {
      var this$1 = this;
      var oldSlice = doc2.slice(this.from, this.to);
      var slice4 = new Slice(mapFragment(oldSlice.content, function(node4) {
        return node4.mark(this$1.mark.removeFromSet(node4.marks));
      }), oldSlice.openStart, oldSlice.openEnd);
      return StepResult.fromReplace(doc2, this.from, this.to, slice4);
    };
    RemoveMarkStep2.prototype.invert = function invert4() {
      return new AddMarkStep(this.from, this.to, this.mark);
    };
    RemoveMarkStep2.prototype.map = function map15(mapping) {
      var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
      if (from4.deleted && to.deleted || from4.pos >= to.pos) {
        return null;
      }
      return new RemoveMarkStep2(from4.pos, to.pos, this.mark);
    };
    RemoveMarkStep2.prototype.merge = function merge3(other) {
      if (other instanceof RemoveMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
        return new RemoveMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
      }
    };
    RemoveMarkStep2.prototype.toJSON = function toJSON7() {
      return {
        stepType: "removeMark",
        mark: this.mark.toJSON(),
        from: this.from,
        to: this.to
      };
    };
    RemoveMarkStep2.fromJSON = function fromJSON8(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") {
        throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
      }
      return new RemoveMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
    };
    return RemoveMarkStep2;
  }(Step);
  Step.jsonID("removeMark", RemoveMarkStep);
  Transform.prototype.addMark = function(from4, to, mark3) {
    var this$1 = this;
    var removed = [], added = [], removing = null, adding = null;
    this.doc.nodesBetween(from4, to, function(node4, pos, parent) {
      if (!node4.isInline) {
        return;
      }
      var marks2 = node4.marks;
      if (!mark3.isInSet(marks2) && parent.type.allowsMarkType(mark3.type)) {
        var start3 = Math.max(pos, from4), end2 = Math.min(pos + node4.nodeSize, to);
        var newSet = mark3.addToSet(marks2);
        for (var i = 0; i < marks2.length; i++) {
          if (!marks2[i].isInSet(newSet)) {
            if (removing && removing.to == start3 && removing.mark.eq(marks2[i])) {
              removing.to = end2;
            } else {
              removed.push(removing = new RemoveMarkStep(start3, end2, marks2[i]));
            }
          }
        }
        if (adding && adding.to == start3) {
          adding.to = end2;
        } else {
          added.push(adding = new AddMarkStep(start3, end2, mark3));
        }
      }
    });
    removed.forEach(function(s) {
      return this$1.step(s);
    });
    added.forEach(function(s) {
      return this$1.step(s);
    });
    return this;
  };
  Transform.prototype.removeMark = function(from4, to, mark3) {
    var this$1 = this;
    if (mark3 === void 0)
      mark3 = null;
    var matched = [], step2 = 0;
    this.doc.nodesBetween(from4, to, function(node4, pos) {
      if (!node4.isInline) {
        return;
      }
      step2++;
      var toRemove = null;
      if (mark3 instanceof MarkType) {
        var set2 = node4.marks, found2;
        while (found2 = mark3.isInSet(set2)) {
          (toRemove || (toRemove = [])).push(found2);
          set2 = found2.removeFromSet(set2);
        }
      } else if (mark3) {
        if (mark3.isInSet(node4.marks)) {
          toRemove = [mark3];
        }
      } else {
        toRemove = node4.marks;
      }
      if (toRemove && toRemove.length) {
        var end2 = Math.min(pos + node4.nodeSize, to);
        for (var i = 0; i < toRemove.length; i++) {
          var style2 = toRemove[i], found$1 = void 0;
          for (var j = 0; j < matched.length; j++) {
            var m = matched[j];
            if (m.step == step2 - 1 && style2.eq(matched[j].style)) {
              found$1 = m;
            }
          }
          if (found$1) {
            found$1.to = end2;
            found$1.step = step2;
          } else {
            matched.push({ style: style2, from: Math.max(pos, from4), to: end2, step: step2 });
          }
        }
      }
    });
    matched.forEach(function(m) {
      return this$1.step(new RemoveMarkStep(m.from, m.to, m.style));
    });
    return this;
  };
  Transform.prototype.clearIncompatible = function(pos, parentType, match) {
    if (match === void 0)
      match = parentType.contentMatch;
    var node4 = this.doc.nodeAt(pos);
    var delSteps = [], cur = pos + 1;
    for (var i = 0; i < node4.childCount; i++) {
      var child3 = node4.child(i), end2 = cur + child3.nodeSize;
      var allowed = match.matchType(child3.type, child3.attrs);
      if (!allowed) {
        delSteps.push(new ReplaceStep(cur, end2, Slice.empty));
      } else {
        match = allowed;
        for (var j = 0; j < child3.marks.length; j++) {
          if (!parentType.allowsMarkType(child3.marks[j].type)) {
            this.step(new RemoveMarkStep(cur, end2, child3.marks[j]));
          }
        }
      }
      cur = end2;
    }
    if (!match.validEnd) {
      var fill = match.fillBefore(Fragment.empty, true);
      this.replace(cur, cur, new Slice(fill, 0, 0));
    }
    for (var i$1 = delSteps.length - 1; i$1 >= 0; i$1--) {
      this.step(delSteps[i$1]);
    }
    return this;
  };
  function replaceStep(doc2, from4, to, slice4) {
    if (to === void 0)
      to = from4;
    if (slice4 === void 0)
      slice4 = Slice.empty;
    if (from4 == to && !slice4.size) {
      return null;
    }
    var $from = doc2.resolve(from4), $to = doc2.resolve(to);
    if (fitsTrivially($from, $to, slice4)) {
      return new ReplaceStep(from4, to, slice4);
    }
    return new Fitter($from, $to, slice4).fit();
  }
  Transform.prototype.replace = function(from4, to, slice4) {
    if (to === void 0)
      to = from4;
    if (slice4 === void 0)
      slice4 = Slice.empty;
    var step2 = replaceStep(this.doc, from4, to, slice4);
    if (step2) {
      this.step(step2);
    }
    return this;
  };
  Transform.prototype.replaceWith = function(from4, to, content2) {
    return this.replace(from4, to, new Slice(Fragment.from(content2), 0, 0));
  };
  Transform.prototype.delete = function(from4, to) {
    return this.replace(from4, to, Slice.empty);
  };
  Transform.prototype.insert = function(pos, content2) {
    return this.replaceWith(pos, pos, content2);
  };
  function fitsTrivially($from, $to, slice4) {
    return !slice4.openStart && !slice4.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice4.content);
  }
  var Fitter = function Fitter2($from, $to, slice4) {
    this.$to = $to;
    this.$from = $from;
    this.unplaced = slice4;
    this.frontier = [];
    for (var i = 0; i <= $from.depth; i++) {
      var node4 = $from.node(i);
      this.frontier.push({
        type: node4.type,
        match: node4.contentMatchAt($from.indexAfter(i))
      });
    }
    this.placed = Fragment.empty;
    for (var i$1 = $from.depth; i$1 > 0; i$1--) {
      this.placed = Fragment.from($from.node(i$1).copy(this.placed));
    }
  };
  var prototypeAccessors$12 = { depth: { configurable: true } };
  prototypeAccessors$12.depth.get = function() {
    return this.frontier.length - 1;
  };
  Fitter.prototype.fit = function fit() {
    while (this.unplaced.size) {
      var fit2 = this.findFittable();
      if (fit2) {
        this.placeNodes(fit2);
      } else {
        this.openMore() || this.dropNode();
      }
    }
    var moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
    var $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
    if (!$to) {
      return null;
    }
    var content2 = this.placed, openStart = $from.depth, openEnd = $to.depth;
    while (openStart && openEnd && content2.childCount == 1) {
      content2 = content2.firstChild.content;
      openStart--;
      openEnd--;
    }
    var slice4 = new Slice(content2, openStart, openEnd);
    if (moveInline > -1) {
      return new ReplaceAroundStep($from.pos, moveInline, this.$to.pos, this.$to.end(), slice4, placedSize);
    }
    if (slice4.size || $from.pos != this.$to.pos) {
      return new ReplaceStep($from.pos, $to.pos, slice4);
    }
  };
  Fitter.prototype.findFittable = function findFittable() {
    for (var pass = 1; pass <= 2; pass++) {
      for (var sliceDepth = this.unplaced.openStart; sliceDepth >= 0; sliceDepth--) {
        var fragment = void 0, parent = void 0;
        if (sliceDepth) {
          parent = contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
          fragment = parent.content;
        } else {
          fragment = this.unplaced.content;
        }
        var first2 = fragment.firstChild;
        for (var frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--) {
          var ref = this.frontier[frontierDepth];
          var type = ref.type;
          var match = ref.match;
          var wrap = void 0, inject = void 0;
          if (pass == 1 && (first2 ? match.matchType(first2.type) || (inject = match.fillBefore(Fragment.from(first2), false)) : type.compatibleContent(parent.type))) {
            return { sliceDepth, frontierDepth, parent, inject };
          } else if (pass == 2 && first2 && (wrap = match.findWrapping(first2.type))) {
            return { sliceDepth, frontierDepth, parent, wrap };
          }
          if (parent && match.matchType(parent.type)) {
            break;
          }
        }
      }
    }
  };
  Fitter.prototype.openMore = function openMore() {
    var ref = this.unplaced;
    var content2 = ref.content;
    var openStart = ref.openStart;
    var openEnd = ref.openEnd;
    var inner = contentAt(content2, openStart);
    if (!inner.childCount || inner.firstChild.isLeaf) {
      return false;
    }
    this.unplaced = new Slice(content2, openStart + 1, Math.max(openEnd, inner.size + openStart >= content2.size - openEnd ? openStart + 1 : 0));
    return true;
  };
  Fitter.prototype.dropNode = function dropNode() {
    var ref = this.unplaced;
    var content2 = ref.content;
    var openStart = ref.openStart;
    var openEnd = ref.openEnd;
    var inner = contentAt(content2, openStart);
    if (inner.childCount <= 1 && openStart > 0) {
      var openAtEnd = content2.size - openStart <= openStart + inner.size;
      this.unplaced = new Slice(dropFromFragment(content2, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
    } else {
      this.unplaced = new Slice(dropFromFragment(content2, openStart, 1), openStart, openEnd);
    }
  };
  Fitter.prototype.placeNodes = function placeNodes(ref) {
    var sliceDepth = ref.sliceDepth;
    var frontierDepth = ref.frontierDepth;
    var parent = ref.parent;
    var inject = ref.inject;
    var wrap = ref.wrap;
    while (this.depth > frontierDepth) {
      this.closeFrontierNode();
    }
    if (wrap) {
      for (var i = 0; i < wrap.length; i++) {
        this.openFrontierNode(wrap[i]);
      }
    }
    var slice4 = this.unplaced, fragment = parent ? parent.content : slice4.content;
    var openStart = slice4.openStart - sliceDepth;
    var taken = 0, add3 = [];
    var ref$1 = this.frontier[frontierDepth];
    var match = ref$1.match;
    var type = ref$1.type;
    if (inject) {
      for (var i$1 = 0; i$1 < inject.childCount; i$1++) {
        add3.push(inject.child(i$1));
      }
      match = match.matchFragment(inject);
    }
    var openEndCount = fragment.size + sliceDepth - (slice4.content.size - slice4.openEnd);
    while (taken < fragment.childCount) {
      var next = fragment.child(taken), matches2 = match.matchType(next.type);
      if (!matches2) {
        break;
      }
      taken++;
      if (taken > 1 || openStart == 0 || next.content.size) {
        match = matches2;
        add3.push(closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
      }
    }
    var toEnd = taken == fragment.childCount;
    if (!toEnd) {
      openEndCount = -1;
    }
    this.placed = addToFragment(this.placed, frontierDepth, Fragment.from(add3));
    this.frontier[frontierDepth].match = match;
    if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1) {
      this.closeFrontierNode();
    }
    for (var i$2 = 0, cur = fragment; i$2 < openEndCount; i$2++) {
      var node4 = cur.lastChild;
      this.frontier.push({ type: node4.type, match: node4.contentMatchAt(node4.childCount) });
      cur = node4.content;
    }
    this.unplaced = !toEnd ? new Slice(dropFromFragment(slice4.content, sliceDepth, taken), slice4.openStart, slice4.openEnd) : sliceDepth == 0 ? Slice.empty : new Slice(dropFromFragment(slice4.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice4.openEnd : sliceDepth - 1);
  };
  Fitter.prototype.mustMoveInline = function mustMoveInline() {
    if (!this.$to.parent.isTextblock || this.$to.end() == this.$to.pos) {
      return -1;
    }
    var top = this.frontier[this.depth], level;
    if (!top.type.isTextblock || !contentAfterFits(this.$to, this.$to.depth, top.type, top.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth) {
      return -1;
    }
    var ref = this.$to;
    var depth = ref.depth;
    var after2 = this.$to.after(depth);
    while (depth > 1 && after2 == this.$to.end(--depth)) {
      ++after2;
    }
    return after2;
  };
  Fitter.prototype.findCloseLevel = function findCloseLevel($to) {
    scan:
      for (var i = Math.min(this.depth, $to.depth); i >= 0; i--) {
        var ref = this.frontier[i];
        var match = ref.match;
        var type = ref.type;
        var dropInner = i < $to.depth && $to.end(i + 1) == $to.pos + ($to.depth - (i + 1));
        var fit2 = contentAfterFits($to, i, type, match, dropInner);
        if (!fit2) {
          continue;
        }
        for (var d = i - 1; d >= 0; d--) {
          var ref$1 = this.frontier[d];
          var match$1 = ref$1.match;
          var type$1 = ref$1.type;
          var matches2 = contentAfterFits($to, d, type$1, match$1, true);
          if (!matches2 || matches2.childCount) {
            continue scan;
          }
        }
        return { depth: i, fit: fit2, move: dropInner ? $to.doc.resolve($to.after(i + 1)) : $to };
      }
  };
  Fitter.prototype.close = function close2($to) {
    var close3 = this.findCloseLevel($to);
    if (!close3) {
      return null;
    }
    while (this.depth > close3.depth) {
      this.closeFrontierNode();
    }
    if (close3.fit.childCount) {
      this.placed = addToFragment(this.placed, close3.depth, close3.fit);
    }
    $to = close3.move;
    for (var d = close3.depth + 1; d <= $to.depth; d++) {
      var node4 = $to.node(d), add3 = node4.type.contentMatch.fillBefore(node4.content, true, $to.index(d));
      this.openFrontierNode(node4.type, node4.attrs, add3);
    }
    return $to;
  };
  Fitter.prototype.openFrontierNode = function openFrontierNode(type, attrs, content2) {
    var top = this.frontier[this.depth];
    top.match = top.match.matchType(type);
    this.placed = addToFragment(this.placed, this.depth, Fragment.from(type.create(attrs, content2)));
    this.frontier.push({ type, match: type.contentMatch });
  };
  Fitter.prototype.closeFrontierNode = function closeFrontierNode() {
    var open = this.frontier.pop();
    var add3 = open.match.fillBefore(Fragment.empty, true);
    if (add3.childCount) {
      this.placed = addToFragment(this.placed, this.frontier.length, add3);
    }
  };
  Object.defineProperties(Fitter.prototype, prototypeAccessors$12);
  function dropFromFragment(fragment, depth, count) {
    if (depth == 0) {
      return fragment.cutByIndex(count);
    }
    return fragment.replaceChild(0, fragment.firstChild.copy(dropFromFragment(fragment.firstChild.content, depth - 1, count)));
  }
  function addToFragment(fragment, depth, content2) {
    if (depth == 0) {
      return fragment.append(content2);
    }
    return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy(addToFragment(fragment.lastChild.content, depth - 1, content2)));
  }
  function contentAt(fragment, depth) {
    for (var i = 0; i < depth; i++) {
      fragment = fragment.firstChild.content;
    }
    return fragment;
  }
  function closeNodeStart(node4, openStart, openEnd) {
    if (openStart <= 0) {
      return node4;
    }
    var frag = node4.content;
    if (openStart > 1) {
      frag = frag.replaceChild(0, closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
    }
    if (openStart > 0) {
      frag = node4.type.contentMatch.fillBefore(frag).append(frag);
      if (openEnd <= 0) {
        frag = frag.append(node4.type.contentMatch.matchFragment(frag).fillBefore(Fragment.empty, true));
      }
    }
    return node4.copy(frag);
  }
  function contentAfterFits($to, depth, type, match, open) {
    var node4 = $to.node(depth), index2 = open ? $to.indexAfter(depth) : $to.index(depth);
    if (index2 == node4.childCount && !type.compatibleContent(node4.type)) {
      return null;
    }
    var fit2 = match.fillBefore(node4.content, true, index2);
    return fit2 && !invalidMarks(type, node4.content, index2) ? fit2 : null;
  }
  function invalidMarks(type, fragment, start3) {
    for (var i = start3; i < fragment.childCount; i++) {
      if (!type.allowsMarks(fragment.child(i).marks)) {
        return true;
      }
    }
    return false;
  }
  Transform.prototype.replaceRange = function(from4, to, slice4) {
    if (!slice4.size) {
      return this.deleteRange(from4, to);
    }
    var $from = this.doc.resolve(from4), $to = this.doc.resolve(to);
    if (fitsTrivially($from, $to, slice4)) {
      return this.step(new ReplaceStep(from4, to, slice4));
    }
    var targetDepths = coveredDepths($from, this.doc.resolve(to));
    if (targetDepths[targetDepths.length - 1] == 0) {
      targetDepths.pop();
    }
    var preferredTarget = -($from.depth + 1);
    targetDepths.unshift(preferredTarget);
    for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
      var spec = $from.node(d).type.spec;
      if (spec.defining || spec.isolating) {
        break;
      }
      if (targetDepths.indexOf(d) > -1) {
        preferredTarget = d;
      } else if ($from.before(d) == pos) {
        targetDepths.splice(1, 0, -d);
      }
    }
    var preferredTargetIndex = targetDepths.indexOf(preferredTarget);
    var leftNodes = [], preferredDepth = slice4.openStart;
    for (var content2 = slice4.content, i = 0; ; i++) {
      var node4 = content2.firstChild;
      leftNodes.push(node4);
      if (i == slice4.openStart) {
        break;
      }
      content2 = node4.content;
    }
    if (preferredDepth > 0 && leftNodes[preferredDepth - 1].type.spec.defining && $from.node(preferredTargetIndex).type != leftNodes[preferredDepth - 1].type) {
      preferredDepth -= 1;
    } else if (preferredDepth >= 2 && leftNodes[preferredDepth - 1].isTextblock && leftNodes[preferredDepth - 2].type.spec.defining && $from.node(preferredTargetIndex).type != leftNodes[preferredDepth - 2].type) {
      preferredDepth -= 2;
    }
    for (var j = slice4.openStart; j >= 0; j--) {
      var openDepth = (j + preferredDepth + 1) % (slice4.openStart + 1);
      var insert = leftNodes[openDepth];
      if (!insert) {
        continue;
      }
      for (var i$1 = 0; i$1 < targetDepths.length; i$1++) {
        var targetDepth = targetDepths[(i$1 + preferredTargetIndex) % targetDepths.length], expand = true;
        if (targetDepth < 0) {
          expand = false;
          targetDepth = -targetDepth;
        }
        var parent = $from.node(targetDepth - 1), index2 = $from.index(targetDepth - 1);
        if (parent.canReplaceWith(index2, index2, insert.type, insert.marks)) {
          return this.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new Slice(closeFragment(slice4.content, 0, slice4.openStart, openDepth), openDepth, slice4.openEnd));
        }
      }
    }
    var startSteps = this.steps.length;
    for (var i$2 = targetDepths.length - 1; i$2 >= 0; i$2--) {
      this.replace(from4, to, slice4);
      if (this.steps.length > startSteps) {
        break;
      }
      var depth = targetDepths[i$2];
      if (depth < 0) {
        continue;
      }
      from4 = $from.before(depth);
      to = $to.after(depth);
    }
    return this;
  };
  function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
    if (depth < oldOpen) {
      var first2 = fragment.firstChild;
      fragment = fragment.replaceChild(0, first2.copy(closeFragment(first2.content, depth + 1, oldOpen, newOpen, first2)));
    }
    if (depth > newOpen) {
      var match = parent.contentMatchAt(0);
      var start3 = match.fillBefore(fragment).append(fragment);
      fragment = start3.append(match.matchFragment(start3).fillBefore(Fragment.empty, true));
    }
    return fragment;
  }
  Transform.prototype.replaceRangeWith = function(from4, to, node4) {
    if (!node4.isInline && from4 == to && this.doc.resolve(from4).parent.content.size) {
      var point = insertPoint(this.doc, from4, node4.type);
      if (point != null) {
        from4 = to = point;
      }
    }
    return this.replaceRange(from4, to, new Slice(Fragment.from(node4), 0, 0));
  };
  Transform.prototype.deleteRange = function(from4, to) {
    var $from = this.doc.resolve(from4), $to = this.doc.resolve(to);
    var covered = coveredDepths($from, $to);
    for (var i = 0; i < covered.length; i++) {
      var depth = covered[i], last = i == covered.length - 1;
      if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) {
        return this.delete($from.start(depth), $to.end(depth));
      }
      if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) {
        return this.delete($from.before(depth), $to.after(depth));
      }
    }
    for (var d = 1; d <= $from.depth && d <= $to.depth; d++) {
      if (from4 - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d) {
        return this.delete($from.before(d), to);
      }
    }
    return this.delete(from4, to);
  };
  function coveredDepths($from, $to) {
    var result2 = [], minDepth = Math.min($from.depth, $to.depth);
    for (var d = minDepth; d >= 0; d--) {
      var start3 = $from.start(d);
      if (start3 < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) {
        break;
      }
      if (start3 == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start3 - 1) {
        result2.push(d);
      }
    }
    return result2;
  }

  // node_modules/prosemirror-state/dist/index.es.js
  var classesById = Object.create(null);
  var Selection = function Selection2($anchor, $head, ranges) {
    this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
    this.$anchor = $anchor;
    this.$head = $head;
  };
  var prototypeAccessors3 = { anchor: { configurable: true }, head: { configurable: true }, from: { configurable: true }, to: { configurable: true }, $from: { configurable: true }, $to: { configurable: true }, empty: { configurable: true } };
  prototypeAccessors3.anchor.get = function() {
    return this.$anchor.pos;
  };
  prototypeAccessors3.head.get = function() {
    return this.$head.pos;
  };
  prototypeAccessors3.from.get = function() {
    return this.$from.pos;
  };
  prototypeAccessors3.to.get = function() {
    return this.$to.pos;
  };
  prototypeAccessors3.$from.get = function() {
    return this.ranges[0].$from;
  };
  prototypeAccessors3.$to.get = function() {
    return this.ranges[0].$to;
  };
  prototypeAccessors3.empty.get = function() {
    var ranges = this.ranges;
    for (var i = 0; i < ranges.length; i++) {
      if (ranges[i].$from.pos != ranges[i].$to.pos) {
        return false;
      }
    }
    return true;
  };
  Selection.prototype.content = function content() {
    return this.$from.node(0).slice(this.from, this.to, true);
  };
  Selection.prototype.replace = function replace2(tr, content2) {
    if (content2 === void 0)
      content2 = Slice.empty;
    var lastNode = content2.content.lastChild, lastParent = null;
    for (var i = 0; i < content2.openEnd; i++) {
      lastParent = lastNode;
      lastNode = lastNode.lastChild;
    }
    var mapFrom = tr.steps.length, ranges = this.ranges;
    for (var i$1 = 0; i$1 < ranges.length; i$1++) {
      var ref = ranges[i$1];
      var $from = ref.$from;
      var $to = ref.$to;
      var mapping = tr.mapping.slice(mapFrom);
      tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i$1 ? Slice.empty : content2);
      if (i$1 == 0) {
        selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
      }
    }
  };
  Selection.prototype.replaceWith = function replaceWith(tr, node4) {
    var mapFrom = tr.steps.length, ranges = this.ranges;
    for (var i = 0; i < ranges.length; i++) {
      var ref = ranges[i];
      var $from = ref.$from;
      var $to = ref.$to;
      var mapping = tr.mapping.slice(mapFrom);
      var from4 = mapping.map($from.pos), to = mapping.map($to.pos);
      if (i) {
        tr.deleteRange(from4, to);
      } else {
        tr.replaceRangeWith(from4, to, node4);
        selectionToInsertionEnd(tr, mapFrom, node4.isInline ? -1 : 1);
      }
    }
  };
  Selection.findFrom = function findFrom($pos, dir, textOnly) {
    var inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
    if (inner) {
      return inner;
    }
    for (var depth = $pos.depth - 1; depth >= 0; depth--) {
      var found2 = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
      if (found2) {
        return found2;
      }
    }
  };
  Selection.near = function near($pos, bias) {
    if (bias === void 0)
      bias = 1;
    return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
  };
  Selection.atStart = function atStart(doc2) {
    return findSelectionIn(doc2, doc2, 0, 0, 1) || new AllSelection(doc2);
  };
  Selection.atEnd = function atEnd(doc2) {
    return findSelectionIn(doc2, doc2, doc2.content.size, doc2.childCount, -1) || new AllSelection(doc2);
  };
  Selection.fromJSON = function fromJSON6(doc2, json) {
    if (!json || !json.type) {
      throw new RangeError("Invalid input for Selection.fromJSON");
    }
    var cls = classesById[json.type];
    if (!cls) {
      throw new RangeError("No selection type " + json.type + " defined");
    }
    return cls.fromJSON(doc2, json);
  };
  Selection.jsonID = function jsonID2(id, selectionClass) {
    if (id in classesById) {
      throw new RangeError("Duplicate use of selection JSON ID " + id);
    }
    classesById[id] = selectionClass;
    selectionClass.prototype.jsonID = id;
    return selectionClass;
  };
  Selection.prototype.getBookmark = function getBookmark() {
    return TextSelection.between(this.$anchor, this.$head).getBookmark();
  };
  Object.defineProperties(Selection.prototype, prototypeAccessors3);
  Selection.prototype.visible = true;
  var SelectionRange = function SelectionRange2($from, $to) {
    this.$from = $from;
    this.$to = $to;
  };
  var TextSelection = /* @__PURE__ */ function(Selection3) {
    function TextSelection2($anchor, $head) {
      if ($head === void 0)
        $head = $anchor;
      Selection3.call(this, $anchor, $head);
    }
    if (Selection3)
      TextSelection2.__proto__ = Selection3;
    TextSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
    TextSelection2.prototype.constructor = TextSelection2;
    var prototypeAccessors$15 = { $cursor: { configurable: true } };
    prototypeAccessors$15.$cursor.get = function() {
      return this.$anchor.pos == this.$head.pos ? this.$head : null;
    };
    TextSelection2.prototype.map = function map15(doc2, mapping) {
      var $head = doc2.resolve(mapping.map(this.head));
      if (!$head.parent.inlineContent) {
        return Selection3.near($head);
      }
      var $anchor = doc2.resolve(mapping.map(this.anchor));
      return new TextSelection2($anchor.parent.inlineContent ? $anchor : $head, $head);
    };
    TextSelection2.prototype.replace = function replace3(tr, content2) {
      if (content2 === void 0)
        content2 = Slice.empty;
      Selection3.prototype.replace.call(this, tr, content2);
      if (content2 == Slice.empty) {
        var marks2 = this.$from.marksAcross(this.$to);
        if (marks2) {
          tr.ensureMarks(marks2);
        }
      }
    };
    TextSelection2.prototype.eq = function eq12(other) {
      return other instanceof TextSelection2 && other.anchor == this.anchor && other.head == this.head;
    };
    TextSelection2.prototype.getBookmark = function getBookmark2() {
      return new TextBookmark(this.anchor, this.head);
    };
    TextSelection2.prototype.toJSON = function toJSON7() {
      return { type: "text", anchor: this.anchor, head: this.head };
    };
    TextSelection2.fromJSON = function fromJSON8(doc2, json) {
      if (typeof json.anchor != "number" || typeof json.head != "number") {
        throw new RangeError("Invalid input for TextSelection.fromJSON");
      }
      return new TextSelection2(doc2.resolve(json.anchor), doc2.resolve(json.head));
    };
    TextSelection2.create = function create5(doc2, anchor, head) {
      if (head === void 0)
        head = anchor;
      var $anchor = doc2.resolve(anchor);
      return new this($anchor, head == anchor ? $anchor : doc2.resolve(head));
    };
    TextSelection2.between = function between($anchor, $head, bias) {
      var dPos = $anchor.pos - $head.pos;
      if (!bias || dPos) {
        bias = dPos >= 0 ? 1 : -1;
      }
      if (!$head.parent.inlineContent) {
        var found2 = Selection3.findFrom($head, bias, true) || Selection3.findFrom($head, -bias, true);
        if (found2) {
          $head = found2.$head;
        } else {
          return Selection3.near($head, bias);
        }
      }
      if (!$anchor.parent.inlineContent) {
        if (dPos == 0) {
          $anchor = $head;
        } else {
          $anchor = (Selection3.findFrom($anchor, -bias, true) || Selection3.findFrom($anchor, bias, true)).$anchor;
          if ($anchor.pos < $head.pos != dPos < 0) {
            $anchor = $head;
          }
        }
      }
      return new TextSelection2($anchor, $head);
    };
    Object.defineProperties(TextSelection2.prototype, prototypeAccessors$15);
    return TextSelection2;
  }(Selection);
  Selection.jsonID("text", TextSelection);
  var TextBookmark = function TextBookmark2(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  };
  TextBookmark.prototype.map = function map4(mapping) {
    return new TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
  };
  TextBookmark.prototype.resolve = function resolve3(doc2) {
    return TextSelection.between(doc2.resolve(this.anchor), doc2.resolve(this.head));
  };
  var NodeSelection = /* @__PURE__ */ function(Selection3) {
    function NodeSelection2($pos) {
      var node4 = $pos.nodeAfter;
      var $end = $pos.node(0).resolve($pos.pos + node4.nodeSize);
      Selection3.call(this, $pos, $end);
      this.node = node4;
    }
    if (Selection3)
      NodeSelection2.__proto__ = Selection3;
    NodeSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
    NodeSelection2.prototype.constructor = NodeSelection2;
    NodeSelection2.prototype.map = function map15(doc2, mapping) {
      var ref = mapping.mapResult(this.anchor);
      var deleted = ref.deleted;
      var pos = ref.pos;
      var $pos = doc2.resolve(pos);
      if (deleted) {
        return Selection3.near($pos);
      }
      return new NodeSelection2($pos);
    };
    NodeSelection2.prototype.content = function content2() {
      return new Slice(Fragment.from(this.node), 0, 0);
    };
    NodeSelection2.prototype.eq = function eq12(other) {
      return other instanceof NodeSelection2 && other.anchor == this.anchor;
    };
    NodeSelection2.prototype.toJSON = function toJSON7() {
      return { type: "node", anchor: this.anchor };
    };
    NodeSelection2.prototype.getBookmark = function getBookmark2() {
      return new NodeBookmark(this.anchor);
    };
    NodeSelection2.fromJSON = function fromJSON8(doc2, json) {
      if (typeof json.anchor != "number") {
        throw new RangeError("Invalid input for NodeSelection.fromJSON");
      }
      return new NodeSelection2(doc2.resolve(json.anchor));
    };
    NodeSelection2.create = function create5(doc2, from4) {
      return new this(doc2.resolve(from4));
    };
    NodeSelection2.isSelectable = function isSelectable(node4) {
      return !node4.isText && node4.type.spec.selectable !== false;
    };
    return NodeSelection2;
  }(Selection);
  NodeSelection.prototype.visible = false;
  Selection.jsonID("node", NodeSelection);
  var NodeBookmark = function NodeBookmark2(anchor) {
    this.anchor = anchor;
  };
  NodeBookmark.prototype.map = function map5(mapping) {
    var ref = mapping.mapResult(this.anchor);
    var deleted = ref.deleted;
    var pos = ref.pos;
    return deleted ? new TextBookmark(pos, pos) : new NodeBookmark(pos);
  };
  NodeBookmark.prototype.resolve = function resolve4(doc2) {
    var $pos = doc2.resolve(this.anchor), node4 = $pos.nodeAfter;
    if (node4 && NodeSelection.isSelectable(node4)) {
      return new NodeSelection($pos);
    }
    return Selection.near($pos);
  };
  var AllSelection = /* @__PURE__ */ function(Selection3) {
    function AllSelection2(doc2) {
      Selection3.call(this, doc2.resolve(0), doc2.resolve(doc2.content.size));
    }
    if (Selection3)
      AllSelection2.__proto__ = Selection3;
    AllSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
    AllSelection2.prototype.constructor = AllSelection2;
    AllSelection2.prototype.replace = function replace3(tr, content2) {
      if (content2 === void 0)
        content2 = Slice.empty;
      if (content2 == Slice.empty) {
        tr.delete(0, tr.doc.content.size);
        var sel = Selection3.atStart(tr.doc);
        if (!sel.eq(tr.selection)) {
          tr.setSelection(sel);
        }
      } else {
        Selection3.prototype.replace.call(this, tr, content2);
      }
    };
    AllSelection2.prototype.toJSON = function toJSON7() {
      return { type: "all" };
    };
    AllSelection2.fromJSON = function fromJSON8(doc2) {
      return new AllSelection2(doc2);
    };
    AllSelection2.prototype.map = function map15(doc2) {
      return new AllSelection2(doc2);
    };
    AllSelection2.prototype.eq = function eq12(other) {
      return other instanceof AllSelection2;
    };
    AllSelection2.prototype.getBookmark = function getBookmark2() {
      return AllBookmark;
    };
    return AllSelection2;
  }(Selection);
  Selection.jsonID("all", AllSelection);
  var AllBookmark = {
    map: function map6() {
      return this;
    },
    resolve: function resolve5(doc2) {
      return new AllSelection(doc2);
    }
  };
  function findSelectionIn(doc2, node4, pos, index2, dir, text2) {
    if (node4.inlineContent) {
      return TextSelection.create(doc2, pos);
    }
    for (var i = index2 - (dir > 0 ? 0 : 1); dir > 0 ? i < node4.childCount : i >= 0; i += dir) {
      var child3 = node4.child(i);
      if (!child3.isAtom) {
        var inner = findSelectionIn(doc2, child3, pos + dir, dir < 0 ? child3.childCount : 0, dir, text2);
        if (inner) {
          return inner;
        }
      } else if (!text2 && NodeSelection.isSelectable(child3)) {
        return NodeSelection.create(doc2, pos - (dir < 0 ? child3.nodeSize : 0));
      }
      pos += child3.nodeSize * dir;
    }
  }
  function selectionToInsertionEnd(tr, startLen, bias) {
    var last = tr.steps.length - 1;
    if (last < startLen) {
      return;
    }
    var step2 = tr.steps[last];
    if (!(step2 instanceof ReplaceStep || step2 instanceof ReplaceAroundStep)) {
      return;
    }
    var map15 = tr.mapping.maps[last], end2;
    map15.forEach(function(_from, _to, _newFrom, newTo) {
      if (end2 == null) {
        end2 = newTo;
      }
    });
    tr.setSelection(Selection.near(tr.doc.resolve(end2), bias));
  }
  var UPDATED_SEL = 1;
  var UPDATED_MARKS = 2;
  var UPDATED_SCROLL = 4;
  var Transaction = /* @__PURE__ */ function(Transform3) {
    function Transaction2(state) {
      Transform3.call(this, state.doc);
      this.time = Date.now();
      this.curSelection = state.selection;
      this.curSelectionFor = 0;
      this.storedMarks = state.storedMarks;
      this.updated = 0;
      this.meta = Object.create(null);
    }
    if (Transform3)
      Transaction2.__proto__ = Transform3;
    Transaction2.prototype = Object.create(Transform3 && Transform3.prototype);
    Transaction2.prototype.constructor = Transaction2;
    var prototypeAccessors5 = { selection: { configurable: true }, selectionSet: { configurable: true }, storedMarksSet: { configurable: true }, isGeneric: { configurable: true }, scrolledIntoView: { configurable: true } };
    prototypeAccessors5.selection.get = function() {
      if (this.curSelectionFor < this.steps.length) {
        this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
        this.curSelectionFor = this.steps.length;
      }
      return this.curSelection;
    };
    Transaction2.prototype.setSelection = function setSelection2(selection) {
      if (selection.$from.doc != this.doc) {
        throw new RangeError("Selection passed to setSelection must point at the current document");
      }
      this.curSelection = selection;
      this.curSelectionFor = this.steps.length;
      this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
      this.storedMarks = null;
      return this;
    };
    prototypeAccessors5.selectionSet.get = function() {
      return (this.updated & UPDATED_SEL) > 0;
    };
    Transaction2.prototype.setStoredMarks = function setStoredMarks(marks2) {
      this.storedMarks = marks2;
      this.updated |= UPDATED_MARKS;
      return this;
    };
    Transaction2.prototype.ensureMarks = function ensureMarks2(marks2) {
      if (!Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks2)) {
        this.setStoredMarks(marks2);
      }
      return this;
    };
    Transaction2.prototype.addStoredMark = function addStoredMark(mark3) {
      return this.ensureMarks(mark3.addToSet(this.storedMarks || this.selection.$head.marks()));
    };
    Transaction2.prototype.removeStoredMark = function removeStoredMark(mark3) {
      return this.ensureMarks(mark3.removeFromSet(this.storedMarks || this.selection.$head.marks()));
    };
    prototypeAccessors5.storedMarksSet.get = function() {
      return (this.updated & UPDATED_MARKS) > 0;
    };
    Transaction2.prototype.addStep = function addStep2(step2, doc2) {
      Transform3.prototype.addStep.call(this, step2, doc2);
      this.updated = this.updated & ~UPDATED_MARKS;
      this.storedMarks = null;
    };
    Transaction2.prototype.setTime = function setTime(time) {
      this.time = time;
      return this;
    };
    Transaction2.prototype.replaceSelection = function replaceSelection(slice4) {
      this.selection.replace(this, slice4);
      return this;
    };
    Transaction2.prototype.replaceSelectionWith = function replaceSelectionWith(node4, inheritMarks) {
      var selection = this.selection;
      if (inheritMarks !== false) {
        node4 = node4.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || Mark.none));
      }
      selection.replaceWith(this, node4);
      return this;
    };
    Transaction2.prototype.deleteSelection = function deleteSelection3() {
      this.selection.replace(this);
      return this;
    };
    Transaction2.prototype.insertText = function insertText(text2, from4, to) {
      if (to === void 0)
        to = from4;
      var schema = this.doc.type.schema;
      if (from4 == null) {
        if (!text2) {
          return this.deleteSelection();
        }
        return this.replaceSelectionWith(schema.text(text2), true);
      } else {
        if (!text2) {
          return this.deleteRange(from4, to);
        }
        var marks2 = this.storedMarks;
        if (!marks2) {
          var $from = this.doc.resolve(from4);
          marks2 = to == from4 ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
        }
        this.replaceRangeWith(from4, to, schema.text(text2, marks2));
        if (!this.selection.empty) {
          this.setSelection(Selection.near(this.selection.$to));
        }
        return this;
      }
    };
    Transaction2.prototype.setMeta = function setMeta2(key, value) {
      this.meta[typeof key == "string" ? key : key.key] = value;
      return this;
    };
    Transaction2.prototype.getMeta = function getMeta(key) {
      return this.meta[typeof key == "string" ? key : key.key];
    };
    prototypeAccessors5.isGeneric.get = function() {
      for (var _ in this.meta) {
        return false;
      }
      return true;
    };
    Transaction2.prototype.scrollIntoView = function scrollIntoView2() {
      this.updated |= UPDATED_SCROLL;
      return this;
    };
    prototypeAccessors5.scrolledIntoView.get = function() {
      return (this.updated & UPDATED_SCROLL) > 0;
    };
    Object.defineProperties(Transaction2.prototype, prototypeAccessors5);
    return Transaction2;
  }(Transform);
  function bind(f, self) {
    return !self || !f ? f : f.bind(self);
  }
  var FieldDesc = function FieldDesc2(name, desc, self) {
    this.name = name;
    this.init = bind(desc.init, self);
    this.apply = bind(desc.apply, self);
  };
  var baseFields = [
    new FieldDesc("doc", {
      init: function init(config) {
        return config.doc || config.schema.topNodeType.createAndFill();
      },
      apply: function apply2(tr) {
        return tr.doc;
      }
    }),
    new FieldDesc("selection", {
      init: function init2(config, instance) {
        return config.selection || Selection.atStart(instance.doc);
      },
      apply: function apply3(tr) {
        return tr.selection;
      }
    }),
    new FieldDesc("storedMarks", {
      init: function init3(config) {
        return config.storedMarks || null;
      },
      apply: function apply4(tr, _marks, _old, state) {
        return state.selection.$cursor ? tr.storedMarks : null;
      }
    }),
    new FieldDesc("scrollToSelection", {
      init: function init4() {
        return 0;
      },
      apply: function apply5(tr, prev) {
        return tr.scrolledIntoView ? prev + 1 : prev;
      }
    })
  ];
  var Configuration = function Configuration2(schema, plugins) {
    var this$1 = this;
    this.schema = schema;
    this.fields = baseFields.concat();
    this.plugins = [];
    this.pluginsByKey = Object.create(null);
    if (plugins) {
      plugins.forEach(function(plugin) {
        if (this$1.pluginsByKey[plugin.key]) {
          throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")");
        }
        this$1.plugins.push(plugin);
        this$1.pluginsByKey[plugin.key] = plugin;
        if (plugin.spec.state) {
          this$1.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
        }
      });
    }
  };
  var EditorState = function EditorState2(config) {
    this.config = config;
  };
  var prototypeAccessors$13 = { schema: { configurable: true }, plugins: { configurable: true }, tr: { configurable: true } };
  prototypeAccessors$13.schema.get = function() {
    return this.config.schema;
  };
  prototypeAccessors$13.plugins.get = function() {
    return this.config.plugins;
  };
  EditorState.prototype.apply = function apply6(tr) {
    return this.applyTransaction(tr).state;
  };
  EditorState.prototype.filterTransaction = function filterTransaction(tr, ignore) {
    if (ignore === void 0)
      ignore = -1;
    for (var i = 0; i < this.config.plugins.length; i++) {
      if (i != ignore) {
        var plugin = this.config.plugins[i];
        if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) {
          return false;
        }
      }
    }
    return true;
  };
  EditorState.prototype.applyTransaction = function applyTransaction(rootTr) {
    if (!this.filterTransaction(rootTr)) {
      return { state: this, transactions: [] };
    }
    var trs = [rootTr], newState = this.applyInner(rootTr), seen = null;
    for (; ; ) {
      var haveNew = false;
      for (var i = 0; i < this.config.plugins.length; i++) {
        var plugin = this.config.plugins[i];
        if (plugin.spec.appendTransaction) {
          var n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this;
          var tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
          if (tr && newState.filterTransaction(tr, i)) {
            tr.setMeta("appendedTransaction", rootTr);
            if (!seen) {
              seen = [];
              for (var j = 0; j < this.config.plugins.length; j++) {
                seen.push(j < i ? { state: newState, n: trs.length } : { state: this, n: 0 });
              }
            }
            trs.push(tr);
            newState = newState.applyInner(tr);
            haveNew = true;
          }
          if (seen) {
            seen[i] = { state: newState, n: trs.length };
          }
        }
      }
      if (!haveNew) {
        return { state: newState, transactions: trs };
      }
    }
  };
  EditorState.prototype.applyInner = function applyInner(tr) {
    if (!tr.before.eq(this.doc)) {
      throw new RangeError("Applying a mismatched transaction");
    }
    var newInstance = new EditorState(this.config), fields = this.config.fields;
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
    }
    for (var i$1 = 0; i$1 < applyListeners.length; i$1++) {
      applyListeners[i$1](this, tr, newInstance);
    }
    return newInstance;
  };
  prototypeAccessors$13.tr.get = function() {
    return new Transaction(this);
  };
  EditorState.create = function create3(config) {
    var $config = new Configuration(config.doc ? config.doc.type.schema : config.schema, config.plugins);
    var instance = new EditorState($config);
    for (var i = 0; i < $config.fields.length; i++) {
      instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
    }
    return instance;
  };
  EditorState.prototype.reconfigure = function reconfigure(config) {
    var $config = new Configuration(this.schema, config.plugins);
    var fields = $config.fields, instance = new EditorState($config);
    for (var i = 0; i < fields.length; i++) {
      var name = fields[i].name;
      instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
    }
    return instance;
  };
  EditorState.prototype.toJSON = function toJSON6(pluginFields) {
    var result2 = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks) {
      result2.storedMarks = this.storedMarks.map(function(m) {
        return m.toJSON();
      });
    }
    if (pluginFields && typeof pluginFields == "object") {
      for (var prop in pluginFields) {
        if (prop == "doc" || prop == "selection") {
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        }
        var plugin = pluginFields[prop], state = plugin.spec.state;
        if (state && state.toJSON) {
          result2[prop] = state.toJSON.call(plugin, this[plugin.key]);
        }
      }
    }
    return result2;
  };
  EditorState.fromJSON = function fromJSON7(config, json, pluginFields) {
    if (!json) {
      throw new RangeError("Invalid input for EditorState.fromJSON");
    }
    if (!config.schema) {
      throw new RangeError("Required config field 'schema' missing");
    }
    var $config = new Configuration(config.schema, config.plugins);
    var instance = new EditorState($config);
    $config.fields.forEach(function(field) {
      if (field.name == "doc") {
        instance.doc = Node2.fromJSON(config.schema, json.doc);
      } else if (field.name == "selection") {
        instance.selection = Selection.fromJSON(instance.doc, json.selection);
      } else if (field.name == "storedMarks") {
        if (json.storedMarks) {
          instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
        }
      } else {
        if (pluginFields) {
          for (var prop in pluginFields) {
            var plugin = pluginFields[prop], state = plugin.spec.state;
            if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
              instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
              return;
            }
          }
        }
        instance[field.name] = field.init(config, instance);
      }
    });
    return instance;
  };
  EditorState.addApplyListener = function addApplyListener(f) {
    applyListeners.push(f);
  };
  EditorState.removeApplyListener = function removeApplyListener(f) {
    var found2 = applyListeners.indexOf(f);
    if (found2 > -1) {
      applyListeners.splice(found2, 1);
    }
  };
  Object.defineProperties(EditorState.prototype, prototypeAccessors$13);
  var applyListeners = [];
  function bindProps(obj, self, target) {
    for (var prop in obj) {
      var val = obj[prop];
      if (val instanceof Function) {
        val = val.bind(self);
      } else if (prop == "handleDOMEvents") {
        val = bindProps(val, self, {});
      }
      target[prop] = val;
    }
    return target;
  }
  var Plugin = function Plugin2(spec) {
    this.props = {};
    if (spec.props) {
      bindProps(spec.props, this, this.props);
    }
    this.spec = spec;
    this.key = spec.key ? spec.key.key : createKey("plugin");
  };
  Plugin.prototype.getState = function getState(state) {
    return state[this.key];
  };
  var keys = Object.create(null);
  function createKey(name) {
    if (name in keys) {
      return name + "$" + ++keys[name];
    }
    keys[name] = 0;
    return name + "$";
  }
  var PluginKey = function PluginKey2(name) {
    if (name === void 0)
      name = "key";
    this.key = createKey(name);
  };
  PluginKey.prototype.get = function get(state) {
    return state.config.pluginsByKey[this.key];
  };
  PluginKey.prototype.getState = function getState2(state) {
    return state[this.key];
  };

  // node_modules/prosemirror-commands/dist/index.es.js
  function deleteSelection(state, dispatch2) {
    if (state.selection.empty) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.deleteSelection().scrollIntoView());
    }
    return true;
  }
  function joinBackward(state, dispatch2, view) {
    var ref = state.selection;
    var $cursor = ref.$cursor;
    if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) {
      return false;
    }
    var $cut = findCutBefore($cursor);
    if (!$cut) {
      var range = $cursor.blockRange(), target = range && liftTarget(range);
      if (target == null) {
        return false;
      }
      if (dispatch2) {
        dispatch2(state.tr.lift(range, target).scrollIntoView());
      }
      return true;
    }
    var before2 = $cut.nodeBefore;
    if (!before2.type.spec.isolating && deleteBarrier(state, $cut, dispatch2)) {
      return true;
    }
    if ($cursor.parent.content.size == 0 && (textblockAt(before2, "end") || NodeSelection.isSelectable(before2))) {
      if (dispatch2) {
        var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
        tr.setSelection(textblockAt(before2, "end") ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : NodeSelection.create(tr.doc, $cut.pos - before2.nodeSize));
        dispatch2(tr.scrollIntoView());
      }
      return true;
    }
    if (before2.isAtom && $cut.depth == $cursor.depth - 1) {
      if (dispatch2) {
        dispatch2(state.tr.delete($cut.pos - before2.nodeSize, $cut.pos).scrollIntoView());
      }
      return true;
    }
    return false;
  }
  function textblockAt(node4, side, only) {
    for (; node4; node4 = side == "start" ? node4.firstChild : node4.lastChild) {
      if (node4.isTextblock) {
        return true;
      }
      if (only && node4.childCount != 1) {
        return false;
      }
    }
    return false;
  }
  function selectNodeBackward(state, dispatch2, view) {
    var ref = state.selection;
    var $head = ref.$head;
    var empty2 = ref.empty;
    var $cut = $head;
    if (!empty2) {
      return false;
    }
    if ($head.parent.isTextblock) {
      if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) {
        return false;
      }
      $cut = findCutBefore($head);
    }
    var node4 = $cut && $cut.nodeBefore;
    if (!node4 || !NodeSelection.isSelectable(node4)) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos - node4.nodeSize)).scrollIntoView());
    }
    return true;
  }
  function findCutBefore($pos) {
    if (!$pos.parent.type.spec.isolating) {
      for (var i = $pos.depth - 1; i >= 0; i--) {
        if ($pos.index(i) > 0) {
          return $pos.doc.resolve($pos.before(i + 1));
        }
        if ($pos.node(i).type.spec.isolating) {
          break;
        }
      }
    }
    return null;
  }
  function joinForward(state, dispatch2, view) {
    var ref = state.selection;
    var $cursor = ref.$cursor;
    if (!$cursor || (view ? !view.endOfTextblock("forward", state) : $cursor.parentOffset < $cursor.parent.content.size)) {
      return false;
    }
    var $cut = findCutAfter($cursor);
    if (!$cut) {
      return false;
    }
    var after2 = $cut.nodeAfter;
    if (deleteBarrier(state, $cut, dispatch2)) {
      return true;
    }
    if ($cursor.parent.content.size == 0 && (textblockAt(after2, "start") || NodeSelection.isSelectable(after2))) {
      if (dispatch2) {
        var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
        tr.setSelection(textblockAt(after2, "start") ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
        dispatch2(tr.scrollIntoView());
      }
      return true;
    }
    if (after2.isAtom && $cut.depth == $cursor.depth - 1) {
      if (dispatch2) {
        dispatch2(state.tr.delete($cut.pos, $cut.pos + after2.nodeSize).scrollIntoView());
      }
      return true;
    }
    return false;
  }
  function selectNodeForward(state, dispatch2, view) {
    var ref = state.selection;
    var $head = ref.$head;
    var empty2 = ref.empty;
    var $cut = $head;
    if (!empty2) {
      return false;
    }
    if ($head.parent.isTextblock) {
      if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size) {
        return false;
      }
      $cut = findCutAfter($head);
    }
    var node4 = $cut && $cut.nodeAfter;
    if (!node4 || !NodeSelection.isSelectable(node4)) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos)).scrollIntoView());
    }
    return true;
  }
  function findCutAfter($pos) {
    if (!$pos.parent.type.spec.isolating) {
      for (var i = $pos.depth - 1; i >= 0; i--) {
        var parent = $pos.node(i);
        if ($pos.index(i) + 1 < parent.childCount) {
          return $pos.doc.resolve($pos.after(i + 1));
        }
        if (parent.type.spec.isolating) {
          break;
        }
      }
    }
    return null;
  }
  function lift(state, dispatch2) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to), target = range && liftTarget(range);
    if (target == null) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  function newlineInCode(state, dispatch2) {
    var ref = state.selection;
    var $head = ref.$head;
    var $anchor = ref.$anchor;
    if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.insertText("\n").scrollIntoView());
    }
    return true;
  }
  function defaultBlockAt(match) {
    for (var i = 0; i < match.edgeCount; i++) {
      var ref = match.edge(i);
      var type = ref.type;
      if (type.isTextblock && !type.hasRequiredAttrs()) {
        return type;
      }
    }
    return null;
  }
  function exitCode(state, dispatch2) {
    var ref = state.selection;
    var $head = ref.$head;
    var $anchor = ref.$anchor;
    if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
      return false;
    }
    var above = $head.node(-1), after2 = $head.indexAfter(-1), type = defaultBlockAt(above.contentMatchAt(after2));
    if (!above.canReplaceWith(after2, after2, type)) {
      return false;
    }
    if (dispatch2) {
      var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
      tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
      dispatch2(tr.scrollIntoView());
    }
    return true;
  }
  function createParagraphNear(state, dispatch2) {
    var sel = state.selection;
    var $from = sel.$from;
    var $to = sel.$to;
    if (sel instanceof AllSelection || $from.parent.inlineContent || $to.parent.inlineContent) {
      return false;
    }
    var type = defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
    if (!type || !type.isTextblock) {
      return false;
    }
    if (dispatch2) {
      var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
      var tr = state.tr.insert(side, type.createAndFill());
      tr.setSelection(TextSelection.create(tr.doc, side + 1));
      dispatch2(tr.scrollIntoView());
    }
    return true;
  }
  function liftEmptyBlock(state, dispatch2) {
    var ref = state.selection;
    var $cursor = ref.$cursor;
    if (!$cursor || $cursor.parent.content.size) {
      return false;
    }
    if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
      var before2 = $cursor.before();
      if (canSplit(state.doc, before2)) {
        if (dispatch2) {
          dispatch2(state.tr.split(before2).scrollIntoView());
        }
        return true;
      }
    }
    var range = $cursor.blockRange(), target = range && liftTarget(range);
    if (target == null) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  function splitBlock(state, dispatch2) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    if (state.selection instanceof NodeSelection && state.selection.node.isBlock) {
      if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) {
        return false;
      }
      if (dispatch2) {
        dispatch2(state.tr.split($from.pos).scrollIntoView());
      }
      return true;
    }
    if (!$from.parent.isBlock) {
      return false;
    }
    if (dispatch2) {
      var atEnd2 = $to.parentOffset == $to.parent.content.size;
      var tr = state.tr;
      if (state.selection instanceof TextSelection || state.selection instanceof AllSelection) {
        tr.deleteSelection();
      }
      var deflt = $from.depth == 0 ? null : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
      var types = atEnd2 && deflt ? [{ type: deflt }] : null;
      var can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
      if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{ type: deflt }])) {
        types = [{ type: deflt }];
        can = true;
      }
      if (can) {
        tr.split(tr.mapping.map($from.pos), 1, types);
        if (!atEnd2 && !$from.parentOffset && $from.parent.type != deflt) {
          var first2 = tr.mapping.map($from.before()), $first = tr.doc.resolve(first2);
          if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
            tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
          }
        }
      }
      dispatch2(tr.scrollIntoView());
    }
    return true;
  }
  function selectParentNode(state, dispatch2) {
    var ref = state.selection;
    var $from = ref.$from;
    var to = ref.to;
    var pos;
    var same = $from.sharedDepth(to);
    if (same == 0) {
      return false;
    }
    pos = $from.before(same);
    if (dispatch2) {
      dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
    }
    return true;
  }
  function selectAll(state, dispatch2) {
    if (dispatch2) {
      dispatch2(state.tr.setSelection(new AllSelection(state.doc)));
    }
    return true;
  }
  function joinMaybeClear(state, $pos, dispatch2) {
    var before2 = $pos.nodeBefore, after2 = $pos.nodeAfter, index2 = $pos.index();
    if (!before2 || !after2 || !before2.type.compatibleContent(after2.type)) {
      return false;
    }
    if (!before2.content.size && $pos.parent.canReplace(index2 - 1, index2)) {
      if (dispatch2) {
        dispatch2(state.tr.delete($pos.pos - before2.nodeSize, $pos.pos).scrollIntoView());
      }
      return true;
    }
    if (!$pos.parent.canReplace(index2, index2 + 1) || !(after2.isTextblock || canJoin(state.doc, $pos.pos))) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.clearIncompatible($pos.pos, before2.type, before2.contentMatchAt(before2.childCount)).join($pos.pos).scrollIntoView());
    }
    return true;
  }
  function deleteBarrier(state, $cut, dispatch2) {
    var before2 = $cut.nodeBefore, after2 = $cut.nodeAfter, conn, match;
    if (before2.type.spec.isolating || after2.type.spec.isolating) {
      return false;
    }
    if (joinMaybeClear(state, $cut, dispatch2)) {
      return true;
    }
    var canDelAfter = $cut.parent.canReplace($cut.index(), $cut.index() + 1);
    if (canDelAfter && (conn = (match = before2.contentMatchAt(before2.childCount)).findWrapping(after2.type)) && match.matchType(conn[0] || after2.type).validEnd) {
      if (dispatch2) {
        var end2 = $cut.pos + after2.nodeSize, wrap = Fragment.empty;
        for (var i = conn.length - 1; i >= 0; i--) {
          wrap = Fragment.from(conn[i].create(null, wrap));
        }
        wrap = Fragment.from(before2.copy(wrap));
        var tr = state.tr.step(new ReplaceAroundStep($cut.pos - 1, end2, $cut.pos, end2, new Slice(wrap, 1, 0), conn.length, true));
        var joinAt = end2 + 2 * conn.length;
        if (canJoin(tr.doc, joinAt)) {
          tr.join(joinAt);
        }
        dispatch2(tr.scrollIntoView());
      }
      return true;
    }
    var selAfter = Selection.findFrom($cut, 1);
    var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && liftTarget(range);
    if (target != null && target >= $cut.depth) {
      if (dispatch2) {
        dispatch2(state.tr.lift(range, target).scrollIntoView());
      }
      return true;
    }
    if (canDelAfter && textblockAt(after2, "start", true) && textblockAt(before2, "end")) {
      var at = before2, wrap$1 = [];
      for (; ; ) {
        wrap$1.push(at);
        if (at.isTextblock) {
          break;
        }
        at = at.lastChild;
      }
      var afterText = after2, afterDepth = 1;
      for (; !afterText.isTextblock; afterText = afterText.firstChild) {
        afterDepth++;
      }
      if (at.canReplace(at.childCount, at.childCount, afterText.content)) {
        if (dispatch2) {
          var end$1 = Fragment.empty;
          for (var i$1 = wrap$1.length - 1; i$1 >= 0; i$1--) {
            end$1 = Fragment.from(wrap$1[i$1].copy(end$1));
          }
          var tr$1 = state.tr.step(new ReplaceAroundStep($cut.pos - wrap$1.length, $cut.pos + after2.nodeSize, $cut.pos + afterDepth, $cut.pos + after2.nodeSize - afterDepth, new Slice(end$1, wrap$1.length, 0), 0, true));
          dispatch2(tr$1.scrollIntoView());
        }
        return true;
      }
    }
    return false;
  }
  function wrapIn(nodeType2, attrs) {
    return function(state, dispatch2) {
      var ref = state.selection;
      var $from = ref.$from;
      var $to = ref.$to;
      var range = $from.blockRange($to), wrapping = range && findWrapping3(range, nodeType2, attrs);
      if (!wrapping) {
        return false;
      }
      if (dispatch2) {
        dispatch2(state.tr.wrap(range, wrapping).scrollIntoView());
      }
      return true;
    };
  }
  function setBlockType(nodeType2, attrs) {
    return function(state, dispatch2) {
      var ref = state.selection;
      var from4 = ref.from;
      var to = ref.to;
      var applicable = false;
      state.doc.nodesBetween(from4, to, function(node4, pos) {
        if (applicable) {
          return false;
        }
        if (!node4.isTextblock || node4.hasMarkup(nodeType2, attrs)) {
          return;
        }
        if (node4.type == nodeType2) {
          applicable = true;
        } else {
          var $pos = state.doc.resolve(pos), index2 = $pos.index();
          applicable = $pos.parent.canReplaceWith(index2, index2 + 1, nodeType2);
        }
      });
      if (!applicable) {
        return false;
      }
      if (dispatch2) {
        dispatch2(state.tr.setBlockType(from4, to, nodeType2, attrs).scrollIntoView());
      }
      return true;
    };
  }
  function chainCommands() {
    var commands = [], len = arguments.length;
    while (len--)
      commands[len] = arguments[len];
    return function(state, dispatch2, view) {
      for (var i = 0; i < commands.length; i++) {
        if (commands[i](state, dispatch2, view)) {
          return true;
        }
      }
      return false;
    };
  }
  var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
  var del = chainCommands(deleteSelection, joinForward, selectNodeForward);
  var pcBaseKeymap = {
    "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
    "Mod-Enter": exitCode,
    "Backspace": backspace,
    "Mod-Backspace": backspace,
    "Shift-Backspace": backspace,
    "Delete": del,
    "Mod-Delete": del,
    "Mod-a": selectAll
  };
  var macBaseKeymap = {
    "Ctrl-h": pcBaseKeymap["Backspace"],
    "Alt-Backspace": pcBaseKeymap["Mod-Backspace"],
    "Ctrl-d": pcBaseKeymap["Delete"],
    "Ctrl-Alt-Backspace": pcBaseKeymap["Mod-Delete"],
    "Alt-Delete": pcBaseKeymap["Mod-Delete"],
    "Alt-d": pcBaseKeymap["Mod-Delete"]
  };
  for (key in pcBaseKeymap) {
    macBaseKeymap[key] = pcBaseKeymap[key];
  }
  var key;
  var mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : typeof os != "undefined" ? os.platform() == "darwin" : false;

  // node_modules/prosemirror-schema-list/dist/index.es.js
  function wrapInList(listType, attrs) {
    return function(state, dispatch2) {
      var ref = state.selection;
      var $from = ref.$from;
      var $to = ref.$to;
      var range = $from.blockRange($to), doJoin = false, outerRange = range;
      if (!range) {
        return false;
      }
      if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
        if ($from.index(range.depth - 1) == 0) {
          return false;
        }
        var $insert = state.doc.resolve(range.start - 2);
        outerRange = new NodeRange($insert, $insert, range.depth);
        if (range.endIndex < range.parent.childCount) {
          range = new NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
        }
        doJoin = true;
      }
      var wrap = findWrapping3(outerRange, listType, attrs, range);
      if (!wrap) {
        return false;
      }
      if (dispatch2) {
        dispatch2(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
      }
      return true;
    };
  }
  function doWrapInList(tr, range, wrappers, joinBefore, listType) {
    var content2 = Fragment.empty;
    for (var i = wrappers.length - 1; i >= 0; i--) {
      content2 = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content2));
    }
    tr.step(new ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new Slice(content2, 0, 0), wrappers.length, true));
    var found2 = 0;
    for (var i$1 = 0; i$1 < wrappers.length; i$1++) {
      if (wrappers[i$1].type == listType) {
        found2 = i$1 + 1;
      }
    }
    var splitDepth = wrappers.length - found2;
    var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
    for (var i$2 = range.startIndex, e = range.endIndex, first2 = true; i$2 < e; i$2++, first2 = false) {
      if (!first2 && canSplit(tr.doc, splitPos, splitDepth)) {
        tr.split(splitPos, splitDepth);
        splitPos += 2 * splitDepth;
      }
      splitPos += parent.child(i$2).nodeSize;
    }
    return tr;
  }
  function liftListItem(itemType) {
    return function(state, dispatch2) {
      var ref = state.selection;
      var $from = ref.$from;
      var $to = ref.$to;
      var range = $from.blockRange($to, function(node4) {
        return node4.childCount && node4.firstChild.type == itemType;
      });
      if (!range) {
        return false;
      }
      if (!dispatch2) {
        return true;
      }
      if ($from.node(range.depth - 1).type == itemType) {
        return liftToOuterList(state, dispatch2, itemType, range);
      } else {
        return liftOutOfList(state, dispatch2, range);
      }
    };
  }
  function liftToOuterList(state, dispatch2, itemType, range) {
    var tr = state.tr, end2 = range.end, endOfList = range.$to.end(range.depth);
    if (end2 < endOfList) {
      tr.step(new ReplaceAroundStep(end2 - 1, endOfList, end2, endOfList, new Slice(Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
      range = new NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    dispatch2(tr.lift(range, liftTarget(range)).scrollIntoView());
    return true;
  }
  function liftOutOfList(state, dispatch2, range) {
    var tr = state.tr, list = range.parent;
    for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
      pos -= list.child(i).nodeSize;
      tr.delete(pos - 1, pos + 1);
    }
    var $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
    if (tr.mapping.map(range.end) != range.start + $start.nodeAfter.nodeSize) {
      return false;
    }
    var atStart2 = range.startIndex == 0, atEnd2 = range.endIndex == list.childCount;
    var parent = $start.node(-1), indexBefore = $start.index(-1);
    if (!parent.canReplace(indexBefore + (atStart2 ? 0 : 1), indexBefore + 1, item.content.append(atEnd2 ? Fragment.empty : Fragment.from(list)))) {
      return false;
    }
    var start3 = $start.pos, end2 = start3 + item.nodeSize;
    tr.step(new ReplaceAroundStep(start3 - (atStart2 ? 1 : 0), end2 + (atEnd2 ? 1 : 0), start3 + 1, end2 - 1, new Slice((atStart2 ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))).append(atEnd2 ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))), atStart2 ? 0 : 1, atEnd2 ? 0 : 1), atStart2 ? 0 : 1));
    dispatch2(tr.scrollIntoView());
    return true;
  }
  function sinkListItem(itemType) {
    return function(state, dispatch2) {
      var ref = state.selection;
      var $from = ref.$from;
      var $to = ref.$to;
      var range = $from.blockRange($to, function(node4) {
        return node4.childCount && node4.firstChild.type == itemType;
      });
      if (!range) {
        return false;
      }
      var startIndex = range.startIndex;
      if (startIndex == 0) {
        return false;
      }
      var parent = range.parent, nodeBefore = parent.child(startIndex - 1);
      if (nodeBefore.type != itemType) {
        return false;
      }
      if (dispatch2) {
        var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
        var inner = Fragment.from(nestedBefore ? itemType.create() : null);
        var slice4 = new Slice(Fragment.from(itemType.create(null, Fragment.from(parent.type.create(null, inner)))), nestedBefore ? 3 : 1, 0);
        var before2 = range.start, after2 = range.end;
        dispatch2(state.tr.step(new ReplaceAroundStep(before2 - (nestedBefore ? 3 : 1), after2, before2, after2, slice4, 1, true)).scrollIntoView());
      }
      return true;
    };
  }

  // node_modules/prosemirror-view/dist/index.es.js
  var result = {};
  if (typeof navigator != "undefined" && typeof document != "undefined") {
    ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
    ie_upto10 = /MSIE \d/.test(navigator.userAgent);
    ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
    result.mac = /Mac/.test(navigator.platform);
    ie2 = result.ie = !!(ie_upto10 || ie_11up || ie_edge);
    result.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
    result.gecko = !ie2 && /gecko\/(\d+)/i.test(navigator.userAgent);
    result.gecko_version = result.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
    chrome2 = !ie2 && /Chrome\/(\d+)/.exec(navigator.userAgent);
    result.chrome = !!chrome2;
    result.chrome_version = chrome2 && +chrome2[1];
    result.safari = !ie2 && /Apple Computer/.test(navigator.vendor);
    result.ios = result.safari && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2);
    result.android = /Android \d/.test(navigator.userAgent);
    result.webkit = "webkitFontSmoothing" in document.documentElement.style;
    result.webkit_version = result.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
  }
  var ie_edge;
  var ie_upto10;
  var ie_11up;
  var ie2;
  var chrome2;
  var domIndex = function(node4) {
    for (var index2 = 0; ; index2++) {
      node4 = node4.previousSibling;
      if (!node4) {
        return index2;
      }
    }
  };
  var parentNode = function(node4) {
    var parent = node4.assignedSlot || node4.parentNode;
    return parent && parent.nodeType == 11 ? parent.host : parent;
  };
  var reusedRange = null;
  var textRange = function(node4, from4, to) {
    var range = reusedRange || (reusedRange = document.createRange());
    range.setEnd(node4, to == null ? node4.nodeValue.length : to);
    range.setStart(node4, from4 || 0);
    return range;
  };
  var isEquivalentPosition = function(node4, off, targetNode, targetOff) {
    return targetNode && (scanFor(node4, off, targetNode, targetOff, -1) || scanFor(node4, off, targetNode, targetOff, 1));
  };
  var atomElements = /^(img|br|input|textarea|hr)$/i;
  function scanFor(node4, off, targetNode, targetOff, dir) {
    for (; ; ) {
      if (node4 == targetNode && off == targetOff) {
        return true;
      }
      if (off == (dir < 0 ? 0 : nodeSize(node4))) {
        var parent = node4.parentNode;
        if (parent.nodeType != 1 || hasBlockDesc(node4) || atomElements.test(node4.nodeName) || node4.contentEditable == "false") {
          return false;
        }
        off = domIndex(node4) + (dir < 0 ? 0 : 1);
        node4 = parent;
      } else if (node4.nodeType == 1) {
        node4 = node4.childNodes[off + (dir < 0 ? -1 : 0)];
        if (node4.contentEditable == "false") {
          return false;
        }
        off = dir < 0 ? nodeSize(node4) : 0;
      } else {
        return false;
      }
    }
  }
  function nodeSize(node4) {
    return node4.nodeType == 3 ? node4.nodeValue.length : node4.childNodes.length;
  }
  function isOnEdge(node4, offset2, parent) {
    for (var atStart2 = offset2 == 0, atEnd2 = offset2 == nodeSize(node4); atStart2 || atEnd2; ) {
      if (node4 == parent) {
        return true;
      }
      var index2 = domIndex(node4);
      node4 = node4.parentNode;
      if (!node4) {
        return false;
      }
      atStart2 = atStart2 && index2 == 0;
      atEnd2 = atEnd2 && index2 == nodeSize(node4);
    }
  }
  function hasBlockDesc(dom) {
    var desc;
    for (var cur = dom; cur; cur = cur.parentNode) {
      if (desc = cur.pmViewDesc) {
        break;
      }
    }
    return desc && desc.node && desc.node.isBlock && (desc.dom == dom || desc.contentDOM == dom);
  }
  var selectionCollapsed = function(domSel) {
    var collapsed = domSel.isCollapsed;
    if (collapsed && result.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed) {
      collapsed = false;
    }
    return collapsed;
  };
  function keyEvent(keyCode, key) {
    var event = document.createEvent("Event");
    event.initEvent("keydown", true, true);
    event.keyCode = keyCode;
    event.key = event.code = key;
    return event;
  }
  function windowRect(doc2) {
    return {
      left: 0,
      right: doc2.documentElement.clientWidth,
      top: 0,
      bottom: doc2.documentElement.clientHeight
    };
  }
  function getSide(value, side) {
    return typeof value == "number" ? value : value[side];
  }
  function clientRect(node4) {
    var rect = node4.getBoundingClientRect();
    var scaleX = rect.width / node4.offsetWidth || 1;
    var scaleY = rect.height / node4.offsetHeight || 1;
    return {
      left: rect.left,
      right: rect.left + node4.clientWidth * scaleX,
      top: rect.top,
      bottom: rect.top + node4.clientHeight * scaleY
    };
  }
  function scrollRectIntoView(view, rect, startDOM) {
    var scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin") || 5;
    var doc2 = view.dom.ownerDocument;
    for (var parent = startDOM || view.dom; ; parent = parentNode(parent)) {
      if (!parent) {
        break;
      }
      if (parent.nodeType != 1) {
        continue;
      }
      var atTop = parent == doc2.body || parent.nodeType != 1;
      var bounding = atTop ? windowRect(doc2) : clientRect(parent);
      var moveX = 0, moveY = 0;
      if (rect.top < bounding.top + getSide(scrollThreshold, "top")) {
        moveY = -(bounding.top - rect.top + getSide(scrollMargin, "top"));
      } else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, "bottom")) {
        moveY = rect.bottom - bounding.bottom + getSide(scrollMargin, "bottom");
      }
      if (rect.left < bounding.left + getSide(scrollThreshold, "left")) {
        moveX = -(bounding.left - rect.left + getSide(scrollMargin, "left"));
      } else if (rect.right > bounding.right - getSide(scrollThreshold, "right")) {
        moveX = rect.right - bounding.right + getSide(scrollMargin, "right");
      }
      if (moveX || moveY) {
        if (atTop) {
          doc2.defaultView.scrollBy(moveX, moveY);
        } else {
          var startX = parent.scrollLeft, startY = parent.scrollTop;
          if (moveY) {
            parent.scrollTop += moveY;
          }
          if (moveX) {
            parent.scrollLeft += moveX;
          }
          var dX = parent.scrollLeft - startX, dY = parent.scrollTop - startY;
          rect = { left: rect.left - dX, top: rect.top - dY, right: rect.right - dX, bottom: rect.bottom - dY };
        }
      }
      if (atTop) {
        break;
      }
    }
  }
  function storeScrollPos(view) {
    var rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
    var refDOM, refTop;
    for (var x = (rect.left + rect.right) / 2, y = startY + 1; y < Math.min(innerHeight, rect.bottom); y += 5) {
      var dom = view.root.elementFromPoint(x, y);
      if (dom == view.dom || !view.dom.contains(dom)) {
        continue;
      }
      var localRect = dom.getBoundingClientRect();
      if (localRect.top >= startY - 20) {
        refDOM = dom;
        refTop = localRect.top;
        break;
      }
    }
    return { refDOM, refTop, stack: scrollStack(view.dom) };
  }
  function scrollStack(dom) {
    var stack = [], doc2 = dom.ownerDocument;
    for (; dom; dom = parentNode(dom)) {
      stack.push({ dom, top: dom.scrollTop, left: dom.scrollLeft });
      if (dom == doc2) {
        break;
      }
    }
    return stack;
  }
  function resetScrollPos(ref) {
    var refDOM = ref.refDOM;
    var refTop = ref.refTop;
    var stack = ref.stack;
    var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
    restoreScrollStack(stack, newRefTop == 0 ? 0 : newRefTop - refTop);
  }
  function restoreScrollStack(stack, dTop) {
    for (var i = 0; i < stack.length; i++) {
      var ref = stack[i];
      var dom = ref.dom;
      var top = ref.top;
      var left = ref.left;
      if (dom.scrollTop != top + dTop) {
        dom.scrollTop = top + dTop;
      }
      if (dom.scrollLeft != left) {
        dom.scrollLeft = left;
      }
    }
  }
  var preventScrollSupported = null;
  function focusPreventScroll(dom) {
    if (dom.setActive) {
      return dom.setActive();
    }
    if (preventScrollSupported) {
      return dom.focus(preventScrollSupported);
    }
    var stored = scrollStack(dom);
    dom.focus(preventScrollSupported == null ? {
      get preventScroll() {
        preventScrollSupported = { preventScroll: true };
        return true;
      }
    } : void 0);
    if (!preventScrollSupported) {
      preventScrollSupported = false;
      restoreScrollStack(stored, 0);
    }
  }
  function findOffsetInNode(node4, coords) {
    var closest, dxClosest = 2e8, coordsClosest, offset2 = 0;
    var rowBot = coords.top, rowTop = coords.top;
    for (var child3 = node4.firstChild, childIndex = 0; child3; child3 = child3.nextSibling, childIndex++) {
      var rects = void 0;
      if (child3.nodeType == 1) {
        rects = child3.getClientRects();
      } else if (child3.nodeType == 3) {
        rects = textRange(child3).getClientRects();
      } else {
        continue;
      }
      for (var i = 0; i < rects.length; i++) {
        var rect = rects[i];
        if (rect.top <= rowBot && rect.bottom >= rowTop) {
          rowBot = Math.max(rect.bottom, rowBot);
          rowTop = Math.min(rect.top, rowTop);
          var dx = rect.left > coords.left ? rect.left - coords.left : rect.right < coords.left ? coords.left - rect.right : 0;
          if (dx < dxClosest) {
            closest = child3;
            dxClosest = dx;
            coordsClosest = dx && closest.nodeType == 3 ? { left: rect.right < coords.left ? rect.right : rect.left, top: coords.top } : coords;
            if (child3.nodeType == 1 && dx) {
              offset2 = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0);
            }
            continue;
          }
        }
        if (!closest && (coords.left >= rect.right && coords.top >= rect.top || coords.left >= rect.left && coords.top >= rect.bottom)) {
          offset2 = childIndex + 1;
        }
      }
    }
    if (closest && closest.nodeType == 3) {
      return findOffsetInText(closest, coordsClosest);
    }
    if (!closest || dxClosest && closest.nodeType == 1) {
      return { node: node4, offset: offset2 };
    }
    return findOffsetInNode(closest, coordsClosest);
  }
  function findOffsetInText(node4, coords) {
    var len = node4.nodeValue.length;
    var range = document.createRange();
    for (var i = 0; i < len; i++) {
      range.setEnd(node4, i + 1);
      range.setStart(node4, i);
      var rect = singleRect(range, 1);
      if (rect.top == rect.bottom) {
        continue;
      }
      if (inRect(coords, rect)) {
        return { node: node4, offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0) };
      }
    }
    return { node: node4, offset: 0 };
  }
  function inRect(coords, rect) {
    return coords.left >= rect.left - 1 && coords.left <= rect.right + 1 && coords.top >= rect.top - 1 && coords.top <= rect.bottom + 1;
  }
  function targetKludge(dom, coords) {
    var parent = dom.parentNode;
    if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left) {
      return parent;
    }
    return dom;
  }
  function posFromElement(view, elt, coords) {
    var ref = findOffsetInNode(elt, coords);
    var node4 = ref.node;
    var offset2 = ref.offset;
    var bias = -1;
    if (node4.nodeType == 1 && !node4.firstChild) {
      var rect = node4.getBoundingClientRect();
      bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
    }
    return view.docView.posFromDOM(node4, offset2, bias);
  }
  function posFromCaret(view, node4, offset2, coords) {
    var outside = -1;
    for (var cur = node4; ; ) {
      if (cur == view.dom) {
        break;
      }
      var desc = view.docView.nearestDesc(cur, true);
      if (!desc) {
        return null;
      }
      if (desc.node.isBlock && desc.parent) {
        var rect = desc.dom.getBoundingClientRect();
        if (rect.left > coords.left || rect.top > coords.top) {
          outside = desc.posBefore;
        } else if (rect.right < coords.left || rect.bottom < coords.top) {
          outside = desc.posAfter;
        } else {
          break;
        }
      }
      cur = desc.dom.parentNode;
    }
    return outside > -1 ? outside : view.docView.posFromDOM(node4, offset2);
  }
  function elementFromPoint(element, coords, box) {
    var len = element.childNodes.length;
    if (len && box.top < box.bottom) {
      for (var startI = Math.max(0, Math.min(len - 1, Math.floor(len * (coords.top - box.top) / (box.bottom - box.top)) - 2)), i = startI; ; ) {
        var child3 = element.childNodes[i];
        if (child3.nodeType == 1) {
          var rects = child3.getClientRects();
          for (var j = 0; j < rects.length; j++) {
            var rect = rects[j];
            if (inRect(coords, rect)) {
              return elementFromPoint(child3, coords, rect);
            }
          }
        }
        if ((i = (i + 1) % len) == startI) {
          break;
        }
      }
    }
    return element;
  }
  function posAtCoords(view, coords) {
    var assign, assign$1;
    var doc2 = view.dom.ownerDocument, node4, offset2;
    if (doc2.caretPositionFromPoint) {
      try {
        var pos$1 = doc2.caretPositionFromPoint(coords.left, coords.top);
        if (pos$1) {
          assign = pos$1, node4 = assign.offsetNode, offset2 = assign.offset;
        }
      } catch (_) {
      }
    }
    if (!node4 && doc2.caretRangeFromPoint) {
      var range = doc2.caretRangeFromPoint(coords.left, coords.top);
      if (range) {
        assign$1 = range, node4 = assign$1.startContainer, offset2 = assign$1.startOffset;
      }
    }
    var elt = (view.root.elementFromPoint ? view.root : doc2).elementFromPoint(coords.left, coords.top + 1), pos;
    if (!elt || !view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) {
      var box = view.dom.getBoundingClientRect();
      if (!inRect(coords, box)) {
        return null;
      }
      elt = elementFromPoint(view.dom, coords, box);
      if (!elt) {
        return null;
      }
    }
    if (result.safari) {
      for (var p = elt; node4 && p; p = parentNode(p)) {
        if (p.draggable) {
          node4 = offset2 = null;
        }
      }
    }
    elt = targetKludge(elt, coords);
    if (node4) {
      if (result.gecko && node4.nodeType == 1) {
        offset2 = Math.min(offset2, node4.childNodes.length);
        if (offset2 < node4.childNodes.length) {
          var next = node4.childNodes[offset2], box$1;
          if (next.nodeName == "IMG" && (box$1 = next.getBoundingClientRect()).right <= coords.left && box$1.bottom > coords.top) {
            offset2++;
          }
        }
      }
      if (node4 == view.dom && offset2 == node4.childNodes.length - 1 && node4.lastChild.nodeType == 1 && coords.top > node4.lastChild.getBoundingClientRect().bottom) {
        pos = view.state.doc.content.size;
      } else if (offset2 == 0 || node4.nodeType != 1 || node4.childNodes[offset2 - 1].nodeName != "BR") {
        pos = posFromCaret(view, node4, offset2, coords);
      }
    }
    if (pos == null) {
      pos = posFromElement(view, elt, coords);
    }
    var desc = view.docView.nearestDesc(elt, true);
    return { pos, inside: desc ? desc.posAtStart - desc.border : -1 };
  }
  function singleRect(object, bias) {
    var rects = object.getClientRects();
    return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1];
  }
  var BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  function coordsAtPos(view, pos, side) {
    var ref = view.docView.domFromPos(pos, side < 0 ? -1 : 1);
    var node4 = ref.node;
    var offset2 = ref.offset;
    var supportEmptyRange = result.webkit || result.gecko;
    if (node4.nodeType == 3) {
      if (supportEmptyRange && (BIDI.test(node4.nodeValue) || (side < 0 ? !offset2 : offset2 == node4.nodeValue.length))) {
        var rect = singleRect(textRange(node4, offset2, offset2), side);
        if (result.gecko && offset2 && /\s/.test(node4.nodeValue[offset2 - 1]) && offset2 < node4.nodeValue.length) {
          var rectBefore = singleRect(textRange(node4, offset2 - 1, offset2 - 1), -1);
          if (rectBefore.top == rect.top) {
            var rectAfter = singleRect(textRange(node4, offset2, offset2 + 1), -1);
            if (rectAfter.top != rect.top) {
              return flattenV(rectAfter, rectAfter.left < rectBefore.left);
            }
          }
        }
        return rect;
      } else {
        var from4 = offset2, to = offset2, takeSide = side < 0 ? 1 : -1;
        if (side < 0 && !offset2) {
          to++;
          takeSide = -1;
        } else if (side >= 0 && offset2 == node4.nodeValue.length) {
          from4--;
          takeSide = 1;
        } else if (side < 0) {
          from4--;
        } else {
          to++;
        }
        return flattenV(singleRect(textRange(node4, from4, to), takeSide), takeSide < 0);
      }
    }
    if (!view.state.doc.resolve(pos).parent.inlineContent) {
      if (offset2 && (side < 0 || offset2 == nodeSize(node4))) {
        var before2 = node4.childNodes[offset2 - 1];
        if (before2.nodeType == 1) {
          return flattenH(before2.getBoundingClientRect(), false);
        }
      }
      if (offset2 < nodeSize(node4)) {
        var after2 = node4.childNodes[offset2];
        if (after2.nodeType == 1) {
          return flattenH(after2.getBoundingClientRect(), true);
        }
      }
      return flattenH(node4.getBoundingClientRect(), side >= 0);
    }
    if (offset2 && (side < 0 || offset2 == nodeSize(node4))) {
      var before$1 = node4.childNodes[offset2 - 1];
      var target = before$1.nodeType == 3 ? textRange(before$1, nodeSize(before$1) - (supportEmptyRange ? 0 : 1)) : before$1.nodeType == 1 && (before$1.nodeName != "BR" || !before$1.nextSibling) ? before$1 : null;
      if (target) {
        return flattenV(singleRect(target, 1), false);
      }
    }
    if (offset2 < nodeSize(node4)) {
      var after$1 = node4.childNodes[offset2];
      while (after$1.pmViewDesc && after$1.pmViewDesc.ignoreForCoords) {
        after$1 = after$1.nextSibling;
      }
      var target$1 = !after$1 ? null : after$1.nodeType == 3 ? textRange(after$1, 0, supportEmptyRange ? 0 : 1) : after$1.nodeType == 1 ? after$1 : null;
      if (target$1) {
        return flattenV(singleRect(target$1, -1), true);
      }
    }
    return flattenV(singleRect(node4.nodeType == 3 ? textRange(node4) : node4, -side), side >= 0);
  }
  function flattenV(rect, left) {
    if (rect.width == 0) {
      return rect;
    }
    var x = left ? rect.left : rect.right;
    return { top: rect.top, bottom: rect.bottom, left: x, right: x };
  }
  function flattenH(rect, top) {
    if (rect.height == 0) {
      return rect;
    }
    var y = top ? rect.top : rect.bottom;
    return { top: y, bottom: y, left: rect.left, right: rect.right };
  }
  function withFlushedState(view, state, f) {
    var viewState = view.state, active = view.root.activeElement;
    if (viewState != state) {
      view.updateState(state);
    }
    if (active != view.dom) {
      view.focus();
    }
    try {
      return f();
    } finally {
      if (viewState != state) {
        view.updateState(viewState);
      }
      if (active != view.dom && active) {
        active.focus();
      }
    }
  }
  function endOfTextblockVertical(view, state, dir) {
    var sel = state.selection;
    var $pos = dir == "up" ? sel.$from : sel.$to;
    return withFlushedState(view, state, function() {
      var ref = view.docView.domFromPos($pos.pos, dir == "up" ? -1 : 1);
      var dom = ref.node;
      for (; ; ) {
        var nearest = view.docView.nearestDesc(dom, true);
        if (!nearest) {
          break;
        }
        if (nearest.node.isBlock) {
          dom = nearest.dom;
          break;
        }
        dom = nearest.dom.parentNode;
      }
      var coords = coordsAtPos(view, $pos.pos, 1);
      for (var child3 = dom.firstChild; child3; child3 = child3.nextSibling) {
        var boxes = void 0;
        if (child3.nodeType == 1) {
          boxes = child3.getClientRects();
        } else if (child3.nodeType == 3) {
          boxes = textRange(child3, 0, child3.nodeValue.length).getClientRects();
        } else {
          continue;
        }
        for (var i = 0; i < boxes.length; i++) {
          var box = boxes[i];
          if (box.bottom > box.top + 1 && (dir == "up" ? coords.top - box.top > (box.bottom - coords.top) * 2 : box.bottom - coords.bottom > (coords.bottom - box.top) * 2)) {
            return false;
          }
        }
      }
      return true;
    });
  }
  var maybeRTL = /[\u0590-\u08ac]/;
  function endOfTextblockHorizontal(view, state, dir) {
    var ref = state.selection;
    var $head = ref.$head;
    if (!$head.parent.isTextblock) {
      return false;
    }
    var offset2 = $head.parentOffset, atStart2 = !offset2, atEnd2 = offset2 == $head.parent.content.size;
    var sel = view.root.getSelection();
    if (!maybeRTL.test($head.parent.textContent) || !sel.modify) {
      return dir == "left" || dir == "backward" ? atStart2 : atEnd2;
    }
    return withFlushedState(view, state, function() {
      var oldRange = sel.getRangeAt(0), oldNode = sel.focusNode, oldOff = sel.focusOffset;
      var oldBidiLevel = sel.caretBidiLevel;
      sel.modify("move", dir, "character");
      var parentDOM = $head.depth ? view.docView.domAfterPos($head.before()) : view.dom;
      var result2 = !parentDOM.contains(sel.focusNode.nodeType == 1 ? sel.focusNode : sel.focusNode.parentNode) || oldNode == sel.focusNode && oldOff == sel.focusOffset;
      sel.removeAllRanges();
      sel.addRange(oldRange);
      if (oldBidiLevel != null) {
        sel.caretBidiLevel = oldBidiLevel;
      }
      return result2;
    });
  }
  var cachedState = null;
  var cachedDir = null;
  var cachedResult = false;
  function endOfTextblock(view, state, dir) {
    if (cachedState == state && cachedDir == dir) {
      return cachedResult;
    }
    cachedState = state;
    cachedDir = dir;
    return cachedResult = dir == "up" || dir == "down" ? endOfTextblockVertical(view, state, dir) : endOfTextblockHorizontal(view, state, dir);
  }
  var NOT_DIRTY = 0;
  var CHILD_DIRTY = 1;
  var CONTENT_DIRTY = 2;
  var NODE_DIRTY = 3;
  var ViewDesc = function ViewDesc2(parent, children, dom, contentDOM) {
    this.parent = parent;
    this.children = children;
    this.dom = dom;
    dom.pmViewDesc = this;
    this.contentDOM = contentDOM;
    this.dirty = NOT_DIRTY;
  };
  var prototypeAccessors4 = { size: { configurable: true }, border: { configurable: true }, posBefore: { configurable: true }, posAtStart: { configurable: true }, posAfter: { configurable: true }, posAtEnd: { configurable: true }, contentLost: { configurable: true }, domAtom: { configurable: true }, ignoreForCoords: { configurable: true } };
  ViewDesc.prototype.matchesWidget = function matchesWidget() {
    return false;
  };
  ViewDesc.prototype.matchesMark = function matchesMark() {
    return false;
  };
  ViewDesc.prototype.matchesNode = function matchesNode() {
    return false;
  };
  ViewDesc.prototype.matchesHack = function matchesHack(_nodeName) {
    return false;
  };
  ViewDesc.prototype.parseRule = function parseRule() {
    return null;
  };
  ViewDesc.prototype.stopEvent = function stopEvent() {
    return false;
  };
  prototypeAccessors4.size.get = function() {
    var size = 0;
    for (var i = 0; i < this.children.length; i++) {
      size += this.children[i].size;
    }
    return size;
  };
  prototypeAccessors4.border.get = function() {
    return 0;
  };
  ViewDesc.prototype.destroy = function destroy() {
    this.parent = null;
    if (this.dom.pmViewDesc == this) {
      this.dom.pmViewDesc = null;
    }
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].destroy();
    }
  };
  ViewDesc.prototype.posBeforeChild = function posBeforeChild(child3) {
    for (var i = 0, pos = this.posAtStart; i < this.children.length; i++) {
      var cur = this.children[i];
      if (cur == child3) {
        return pos;
      }
      pos += cur.size;
    }
  };
  prototypeAccessors4.posBefore.get = function() {
    return this.parent.posBeforeChild(this);
  };
  prototypeAccessors4.posAtStart.get = function() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  };
  prototypeAccessors4.posAfter.get = function() {
    return this.posBefore + this.size;
  };
  prototypeAccessors4.posAtEnd.get = function() {
    return this.posAtStart + this.size - 2 * this.border;
  };
  ViewDesc.prototype.localPosFromDOM = function localPosFromDOM(dom, offset2, bias) {
    if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
      if (bias < 0) {
        var domBefore, desc;
        if (dom == this.contentDOM) {
          domBefore = dom.childNodes[offset2 - 1];
        } else {
          while (dom.parentNode != this.contentDOM) {
            dom = dom.parentNode;
          }
          domBefore = dom.previousSibling;
        }
        while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this)) {
          domBefore = domBefore.previousSibling;
        }
        return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart;
      } else {
        var domAfter, desc$1;
        if (dom == this.contentDOM) {
          domAfter = dom.childNodes[offset2];
        } else {
          while (dom.parentNode != this.contentDOM) {
            dom = dom.parentNode;
          }
          domAfter = dom.nextSibling;
        }
        while (domAfter && !((desc$1 = domAfter.pmViewDesc) && desc$1.parent == this)) {
          domAfter = domAfter.nextSibling;
        }
        return domAfter ? this.posBeforeChild(desc$1) : this.posAtEnd;
      }
    }
    var atEnd2;
    if (dom == this.dom && this.contentDOM) {
      atEnd2 = offset2 > domIndex(this.contentDOM);
    } else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
      atEnd2 = dom.compareDocumentPosition(this.contentDOM) & 2;
    } else if (this.dom.firstChild) {
      if (offset2 == 0) {
        for (var search = dom; ; search = search.parentNode) {
          if (search == this.dom) {
            atEnd2 = false;
            break;
          }
          if (search.parentNode.firstChild != search) {
            break;
          }
        }
      }
      if (atEnd2 == null && offset2 == dom.childNodes.length) {
        for (var search$1 = dom; ; search$1 = search$1.parentNode) {
          if (search$1 == this.dom) {
            atEnd2 = true;
            break;
          }
          if (search$1.parentNode.lastChild != search$1) {
            break;
          }
        }
      }
    }
    return (atEnd2 == null ? bias > 0 : atEnd2) ? this.posAtEnd : this.posAtStart;
  };
  ViewDesc.prototype.nearestDesc = function nearestDesc(dom, onlyNodes) {
    for (var first2 = true, cur = dom; cur; cur = cur.parentNode) {
      var desc = this.getDesc(cur);
      if (desc && (!onlyNodes || desc.node)) {
        if (first2 && desc.nodeDOM && !(desc.nodeDOM.nodeType == 1 ? desc.nodeDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode) : desc.nodeDOM == dom)) {
          first2 = false;
        } else {
          return desc;
        }
      }
    }
  };
  ViewDesc.prototype.getDesc = function getDesc(dom) {
    var desc = dom.pmViewDesc;
    for (var cur = desc; cur; cur = cur.parent) {
      if (cur == this) {
        return desc;
      }
    }
  };
  ViewDesc.prototype.posFromDOM = function posFromDOM(dom, offset2, bias) {
    for (var scan = dom; scan; scan = scan.parentNode) {
      var desc = this.getDesc(scan);
      if (desc) {
        return desc.localPosFromDOM(dom, offset2, bias);
      }
    }
    return -1;
  };
  ViewDesc.prototype.descAt = function descAt(pos) {
    for (var i = 0, offset2 = 0; i < this.children.length; i++) {
      var child3 = this.children[i], end2 = offset2 + child3.size;
      if (offset2 == pos && end2 != offset2) {
        while (!child3.border && child3.children.length) {
          child3 = child3.children[0];
        }
        return child3;
      }
      if (pos < end2) {
        return child3.descAt(pos - offset2 - child3.border);
      }
      offset2 = end2;
    }
  };
  ViewDesc.prototype.domFromPos = function domFromPos(pos, side) {
    if (!this.contentDOM) {
      return { node: this.dom, offset: 0 };
    }
    var i = 0, offset2 = 0;
    for (var curPos = 0; i < this.children.length; i++) {
      var child3 = this.children[i], end2 = curPos + child3.size;
      if (end2 > pos || child3 instanceof TrailingHackViewDesc) {
        offset2 = pos - curPos;
        break;
      }
      curPos = end2;
    }
    if (offset2) {
      return this.children[i].domFromPos(offset2 - this.children[i].border, side);
    }
    for (var prev = void 0; i && !(prev = this.children[i - 1]).size && prev instanceof WidgetViewDesc && prev.widget.type.side >= 0; i--) {
    }
    if (side <= 0) {
      var prev$1, enter3 = true;
      for (; ; i--, enter3 = false) {
        prev$1 = i ? this.children[i - 1] : null;
        if (!prev$1 || prev$1.dom.parentNode == this.contentDOM) {
          break;
        }
      }
      if (prev$1 && side && enter3 && !prev$1.border && !prev$1.domAtom) {
        return prev$1.domFromPos(prev$1.size, side);
      }
      return { node: this.contentDOM, offset: prev$1 ? domIndex(prev$1.dom) + 1 : 0 };
    } else {
      var next, enter$12 = true;
      for (; ; i++, enter$12 = false) {
        next = i < this.children.length ? this.children[i] : null;
        if (!next || next.dom.parentNode == this.contentDOM) {
          break;
        }
      }
      if (next && enter$12 && !next.border && !next.domAtom) {
        return next.domFromPos(0, side);
      }
      return { node: this.contentDOM, offset: next ? domIndex(next.dom) : this.contentDOM.childNodes.length };
    }
  };
  ViewDesc.prototype.parseRange = function parseRange(from4, to, base2) {
    if (base2 === void 0)
      base2 = 0;
    if (this.children.length == 0) {
      return { node: this.contentDOM, from: from4, to, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    }
    var fromOffset = -1, toOffset = -1;
    for (var offset2 = base2, i = 0; ; i++) {
      var child3 = this.children[i], end2 = offset2 + child3.size;
      if (fromOffset == -1 && from4 <= end2) {
        var childBase = offset2 + child3.border;
        if (from4 >= childBase && to <= end2 - child3.border && child3.node && child3.contentDOM && this.contentDOM.contains(child3.contentDOM)) {
          return child3.parseRange(from4, to, childBase);
        }
        from4 = offset2;
        for (var j = i; j > 0; j--) {
          var prev = this.children[j - 1];
          if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
            fromOffset = domIndex(prev.dom) + 1;
            break;
          }
          from4 -= prev.size;
        }
        if (fromOffset == -1) {
          fromOffset = 0;
        }
      }
      if (fromOffset > -1 && (end2 > to || i == this.children.length - 1)) {
        to = end2;
        for (var j$1 = i + 1; j$1 < this.children.length; j$1++) {
          var next = this.children[j$1];
          if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
            toOffset = domIndex(next.dom);
            break;
          }
          to += next.size;
        }
        if (toOffset == -1) {
          toOffset = this.contentDOM.childNodes.length;
        }
        break;
      }
      offset2 = end2;
    }
    return { node: this.contentDOM, from: from4, to, fromOffset, toOffset };
  };
  ViewDesc.prototype.emptyChildAt = function emptyChildAt(side) {
    if (this.border || !this.contentDOM || !this.children.length) {
      return false;
    }
    var child3 = this.children[side < 0 ? 0 : this.children.length - 1];
    return child3.size == 0 || child3.emptyChildAt(side);
  };
  ViewDesc.prototype.domAfterPos = function domAfterPos(pos) {
    var ref = this.domFromPos(pos, 0);
    var node4 = ref.node;
    var offset2 = ref.offset;
    if (node4.nodeType != 1 || offset2 == node4.childNodes.length) {
      throw new RangeError("No node after pos " + pos);
    }
    return node4.childNodes[offset2];
  };
  ViewDesc.prototype.setSelection = function setSelection(anchor, head, root, force) {
    var from4 = Math.min(anchor, head), to = Math.max(anchor, head);
    for (var i = 0, offset2 = 0; i < this.children.length; i++) {
      var child3 = this.children[i], end2 = offset2 + child3.size;
      if (from4 > offset2 && to < end2) {
        return child3.setSelection(anchor - offset2 - child3.border, head - offset2 - child3.border, root, force);
      }
      offset2 = end2;
    }
    var anchorDOM = this.domFromPos(anchor, anchor ? -1 : 1);
    var headDOM = head == anchor ? anchorDOM : this.domFromPos(head, head ? -1 : 1);
    var domSel = root.getSelection();
    var brKludge = false;
    if ((result.gecko || result.safari) && anchor == head) {
      var node4 = anchorDOM.node;
      var offset$1 = anchorDOM.offset;
      if (node4.nodeType == 3) {
        brKludge = offset$1 && node4.nodeValue[offset$1 - 1] == "\n";
        if (brKludge && offset$1 == node4.nodeValue.length) {
          for (var scan = node4, after2 = void 0; scan; scan = scan.parentNode) {
            if (after2 = scan.nextSibling) {
              if (after2.nodeName == "BR") {
                anchorDOM = headDOM = { node: after2.parentNode, offset: domIndex(after2) + 1 };
              }
              break;
            }
            var desc = scan.pmViewDesc;
            if (desc && desc.node && desc.node.isBlock) {
              break;
            }
          }
        }
      } else {
        var prev = node4.childNodes[offset$1 - 1];
        brKludge = prev && (prev.nodeName == "BR" || prev.contentEditable == "false");
      }
    }
    if (result.gecko && domSel.focusNode && domSel.focusNode != headDOM.node && domSel.focusNode.nodeType == 1) {
      var after$1 = domSel.focusNode.childNodes[domSel.focusOffset];
      if (after$1 && after$1.contentEditable == "false") {
        force = true;
      }
    }
    if (!(force || brKludge && result.safari) && isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) && isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset)) {
      return;
    }
    var domSelExtended = false;
    if ((domSel.extend || anchor == head) && !brKludge) {
      domSel.collapse(anchorDOM.node, anchorDOM.offset);
      try {
        if (anchor != head) {
          domSel.extend(headDOM.node, headDOM.offset);
        }
        domSelExtended = true;
      } catch (err2) {
        if (!(err2 instanceof DOMException)) {
          throw err2;
        }
      }
    }
    if (!domSelExtended) {
      if (anchor > head) {
        var tmp = anchorDOM;
        anchorDOM = headDOM;
        headDOM = tmp;
      }
      var range = document.createRange();
      range.setEnd(headDOM.node, headDOM.offset);
      range.setStart(anchorDOM.node, anchorDOM.offset);
      domSel.removeAllRanges();
      domSel.addRange(range);
    }
  };
  ViewDesc.prototype.ignoreMutation = function ignoreMutation(mutation) {
    return !this.contentDOM && mutation.type != "selection";
  };
  prototypeAccessors4.contentLost.get = function() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  };
  ViewDesc.prototype.markDirty = function markDirty(from4, to) {
    for (var offset2 = 0, i = 0; i < this.children.length; i++) {
      var child3 = this.children[i], end2 = offset2 + child3.size;
      if (offset2 == end2 ? from4 <= end2 && to >= offset2 : from4 < end2 && to > offset2) {
        var startInside = offset2 + child3.border, endInside = end2 - child3.border;
        if (from4 >= startInside && to <= endInside) {
          this.dirty = from4 == offset2 || to == end2 ? CONTENT_DIRTY : CHILD_DIRTY;
          if (from4 == startInside && to == endInside && (child3.contentLost || child3.dom.parentNode != this.contentDOM)) {
            child3.dirty = NODE_DIRTY;
          } else {
            child3.markDirty(from4 - startInside, to - startInside);
          }
          return;
        } else {
          child3.dirty = child3.dom == child3.contentDOM && child3.dom.parentNode == this.contentDOM ? CONTENT_DIRTY : NODE_DIRTY;
        }
      }
      offset2 = end2;
    }
    this.dirty = CONTENT_DIRTY;
  };
  ViewDesc.prototype.markParentsDirty = function markParentsDirty() {
    var level = 1;
    for (var node4 = this.parent; node4; node4 = node4.parent, level++) {
      var dirty = level == 1 ? CONTENT_DIRTY : CHILD_DIRTY;
      if (node4.dirty < dirty) {
        node4.dirty = dirty;
      }
    }
  };
  prototypeAccessors4.domAtom.get = function() {
    return false;
  };
  prototypeAccessors4.ignoreForCoords.get = function() {
    return false;
  };
  Object.defineProperties(ViewDesc.prototype, prototypeAccessors4);
  var nothing = [];
  var WidgetViewDesc = /* @__PURE__ */ function(ViewDesc3) {
    function WidgetViewDesc2(parent, widget2, view, pos) {
      var self, dom = widget2.type.toDOM;
      if (typeof dom == "function") {
        dom = dom(view, function() {
          if (!self) {
            return pos;
          }
          if (self.parent) {
            return self.parent.posBeforeChild(self);
          }
        });
      }
      if (!widget2.type.spec.raw) {
        if (dom.nodeType != 1) {
          var wrap = document.createElement("span");
          wrap.appendChild(dom);
          dom = wrap;
        }
        dom.contentEditable = false;
        dom.classList.add("ProseMirror-widget");
      }
      ViewDesc3.call(this, parent, nothing, dom, null);
      this.widget = widget2;
      self = this;
    }
    if (ViewDesc3)
      WidgetViewDesc2.__proto__ = ViewDesc3;
    WidgetViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
    WidgetViewDesc2.prototype.constructor = WidgetViewDesc2;
    var prototypeAccessors$15 = { domAtom: { configurable: true } };
    WidgetViewDesc2.prototype.matchesWidget = function matchesWidget2(widget2) {
      return this.dirty == NOT_DIRTY && widget2.type.eq(this.widget.type);
    };
    WidgetViewDesc2.prototype.parseRule = function parseRule2() {
      return { ignore: true };
    };
    WidgetViewDesc2.prototype.stopEvent = function stopEvent2(event) {
      var stop2 = this.widget.spec.stopEvent;
      return stop2 ? stop2(event) : false;
    };
    WidgetViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
      return mutation.type != "selection" || this.widget.spec.ignoreSelection;
    };
    prototypeAccessors$15.domAtom.get = function() {
      return true;
    };
    Object.defineProperties(WidgetViewDesc2.prototype, prototypeAccessors$15);
    return WidgetViewDesc2;
  }(ViewDesc);
  var CompositionViewDesc = /* @__PURE__ */ function(ViewDesc3) {
    function CompositionViewDesc2(parent, dom, textDOM, text2) {
      ViewDesc3.call(this, parent, nothing, dom, null);
      this.textDOM = textDOM;
      this.text = text2;
    }
    if (ViewDesc3)
      CompositionViewDesc2.__proto__ = ViewDesc3;
    CompositionViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
    CompositionViewDesc2.prototype.constructor = CompositionViewDesc2;
    var prototypeAccessors$23 = { size: { configurable: true } };
    prototypeAccessors$23.size.get = function() {
      return this.text.length;
    };
    CompositionViewDesc2.prototype.localPosFromDOM = function localPosFromDOM2(dom, offset2) {
      if (dom != this.textDOM) {
        return this.posAtStart + (offset2 ? this.size : 0);
      }
      return this.posAtStart + offset2;
    };
    CompositionViewDesc2.prototype.domFromPos = function domFromPos2(pos) {
      return { node: this.textDOM, offset: pos };
    };
    CompositionViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mut) {
      return mut.type === "characterData" && mut.target.nodeValue == mut.oldValue;
    };
    Object.defineProperties(CompositionViewDesc2.prototype, prototypeAccessors$23);
    return CompositionViewDesc2;
  }(ViewDesc);
  var MarkViewDesc = /* @__PURE__ */ function(ViewDesc3) {
    function MarkViewDesc2(parent, mark3, dom, contentDOM) {
      ViewDesc3.call(this, parent, [], dom, contentDOM);
      this.mark = mark3;
    }
    if (ViewDesc3)
      MarkViewDesc2.__proto__ = ViewDesc3;
    MarkViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
    MarkViewDesc2.prototype.constructor = MarkViewDesc2;
    MarkViewDesc2.create = function create5(parent, mark3, inline2, view) {
      var custom = view.nodeViews[mark3.type.name];
      var spec = custom && custom(mark3, view, inline2);
      if (!spec || !spec.dom) {
        spec = DOMSerializer.renderSpec(document, mark3.type.spec.toDOM(mark3, inline2));
      }
      return new MarkViewDesc2(parent, mark3, spec.dom, spec.contentDOM || spec.dom);
    };
    MarkViewDesc2.prototype.parseRule = function parseRule2() {
      return { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
    };
    MarkViewDesc2.prototype.matchesMark = function matchesMark2(mark3) {
      return this.dirty != NODE_DIRTY && this.mark.eq(mark3);
    };
    MarkViewDesc2.prototype.markDirty = function markDirty2(from4, to) {
      ViewDesc3.prototype.markDirty.call(this, from4, to);
      if (this.dirty != NOT_DIRTY) {
        var parent = this.parent;
        while (!parent.node) {
          parent = parent.parent;
        }
        if (parent.dirty < this.dirty) {
          parent.dirty = this.dirty;
        }
        this.dirty = NOT_DIRTY;
      }
    };
    MarkViewDesc2.prototype.slice = function slice4(from4, to, view) {
      var copy5 = MarkViewDesc2.create(this.parent, this.mark, true, view);
      var nodes = this.children, size = this.size;
      if (to < size) {
        nodes = replaceNodes(nodes, to, size, view);
      }
      if (from4 > 0) {
        nodes = replaceNodes(nodes, 0, from4, view);
      }
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].parent = copy5;
      }
      copy5.children = nodes;
      return copy5;
    };
    return MarkViewDesc2;
  }(ViewDesc);
  var NodeViewDesc = /* @__PURE__ */ function(ViewDesc3) {
    function NodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos) {
      ViewDesc3.call(this, parent, node4.isLeaf ? nothing : [], dom, contentDOM);
      this.nodeDOM = nodeDOM2;
      this.node = node4;
      this.outerDeco = outerDeco;
      this.innerDeco = innerDeco;
      if (contentDOM) {
        this.updateChildren(view, pos);
      }
    }
    if (ViewDesc3)
      NodeViewDesc2.__proto__ = ViewDesc3;
    NodeViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
    NodeViewDesc2.prototype.constructor = NodeViewDesc2;
    var prototypeAccessors$32 = { size: { configurable: true }, border: { configurable: true }, domAtom: { configurable: true } };
    NodeViewDesc2.create = function create5(parent, node4, outerDeco, innerDeco, view, pos) {
      var assign;
      var custom = view.nodeViews[node4.type.name], descObj;
      var spec = custom && custom(node4, view, function() {
        if (!descObj) {
          return pos;
        }
        if (descObj.parent) {
          return descObj.parent.posBeforeChild(descObj);
        }
      }, outerDeco, innerDeco);
      var dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
      if (node4.isText) {
        if (!dom) {
          dom = document.createTextNode(node4.text);
        } else if (dom.nodeType != 3) {
          throw new RangeError("Text must be rendered as a DOM text node");
        }
      } else if (!dom) {
        assign = DOMSerializer.renderSpec(document, node4.type.spec.toDOM(node4)), dom = assign.dom, contentDOM = assign.contentDOM;
      }
      if (!contentDOM && !node4.isText && dom.nodeName != "BR") {
        if (!dom.hasAttribute("contenteditable")) {
          dom.contentEditable = false;
        }
        if (node4.type.spec.draggable) {
          dom.draggable = true;
        }
      }
      var nodeDOM2 = dom;
      dom = applyOuterDeco(dom, outerDeco, node4);
      if (spec) {
        return descObj = new CustomNodeViewDesc(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, spec, view, pos + 1);
      } else if (node4.isText) {
        return new TextViewDesc(parent, node4, outerDeco, innerDeco, dom, nodeDOM2, view);
      } else {
        return new NodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos + 1);
      }
    };
    NodeViewDesc2.prototype.parseRule = function parseRule2() {
      var this$1 = this;
      if (this.node.type.spec.reparseInView) {
        return null;
      }
      var rule = { node: this.node.type.name, attrs: this.node.attrs };
      if (this.node.type.spec.code) {
        rule.preserveWhitespace = "full";
      }
      if (this.contentDOM && !this.contentLost) {
        rule.contentElement = this.contentDOM;
      } else {
        rule.getContent = function() {
          return this$1.contentDOM ? Fragment.empty : this$1.node.content;
        };
      }
      return rule;
    };
    NodeViewDesc2.prototype.matchesNode = function matchesNode2(node4, outerDeco, innerDeco) {
      return this.dirty == NOT_DIRTY && node4.eq(this.node) && sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco);
    };
    prototypeAccessors$32.size.get = function() {
      return this.node.nodeSize;
    };
    prototypeAccessors$32.border.get = function() {
      return this.node.isLeaf ? 0 : 1;
    };
    NodeViewDesc2.prototype.updateChildren = function updateChildren(view, pos) {
      var this$1 = this;
      var inline2 = this.node.inlineContent, off = pos;
      var composition = view.composing && this.localCompositionInfo(view, pos);
      var localComposition = composition && composition.pos > -1 ? composition : null;
      var compositionInChild = composition && composition.pos < 0;
      var updater = new ViewTreeUpdater(this, localComposition && localComposition.node);
      iterDeco(this.node, this.innerDeco, function(widget2, i, insideNode) {
        if (widget2.spec.marks) {
          updater.syncToMarks(widget2.spec.marks, inline2, view);
        } else if (widget2.type.side >= 0 && !insideNode) {
          updater.syncToMarks(i == this$1.node.childCount ? Mark.none : this$1.node.child(i).marks, inline2, view);
        }
        updater.placeWidget(widget2, view, off);
      }, function(child3, outerDeco, innerDeco, i) {
        updater.syncToMarks(child3.marks, inline2, view);
        var compIndex;
        if (updater.findNodeMatch(child3, outerDeco, innerDeco, i))
          ;
        else if (compositionInChild && view.state.selection.from > off && view.state.selection.to < off + child3.nodeSize && (compIndex = updater.findIndexWithChild(composition.node)) > -1 && updater.updateNodeAt(child3, outerDeco, innerDeco, compIndex, view))
          ;
        else if (updater.updateNextNode(child3, outerDeco, innerDeco, view, i))
          ;
        else {
          updater.addNode(child3, outerDeco, innerDeco, view, off);
        }
        off += child3.nodeSize;
      });
      updater.syncToMarks(nothing, inline2, view);
      if (this.node.isTextblock) {
        updater.addTextblockHacks();
      }
      updater.destroyRest();
      if (updater.changed || this.dirty == CONTENT_DIRTY) {
        if (localComposition) {
          this.protectLocalComposition(view, localComposition);
        }
        renderDescs(this.contentDOM, this.children, view);
        if (result.ios) {
          iosHacks(this.dom);
        }
      }
    };
    NodeViewDesc2.prototype.localCompositionInfo = function localCompositionInfo(view, pos) {
      var ref = view.state.selection;
      var from4 = ref.from;
      var to = ref.to;
      if (!(view.state.selection instanceof TextSelection) || from4 < pos || to > pos + this.node.content.size) {
        return;
      }
      var sel = view.root.getSelection();
      var textNode = nearbyTextNode(sel.focusNode, sel.focusOffset);
      if (!textNode || !this.dom.contains(textNode.parentNode)) {
        return;
      }
      if (this.node.inlineContent) {
        var text2 = textNode.nodeValue;
        var textPos = findTextInFragment(this.node.content, text2, from4 - pos, to - pos);
        return textPos < 0 ? null : { node: textNode, pos: textPos, text: text2 };
      } else {
        return { node: textNode, pos: -1 };
      }
    };
    NodeViewDesc2.prototype.protectLocalComposition = function protectLocalComposition(view, ref) {
      var node4 = ref.node;
      var pos = ref.pos;
      var text2 = ref.text;
      if (this.getDesc(node4)) {
        return;
      }
      var topNode = node4;
      for (; ; topNode = topNode.parentNode) {
        if (topNode.parentNode == this.contentDOM) {
          break;
        }
        while (topNode.previousSibling) {
          topNode.parentNode.removeChild(topNode.previousSibling);
        }
        while (topNode.nextSibling) {
          topNode.parentNode.removeChild(topNode.nextSibling);
        }
        if (topNode.pmViewDesc) {
          topNode.pmViewDesc = null;
        }
      }
      var desc = new CompositionViewDesc(this, topNode, node4, text2);
      view.compositionNodes.push(desc);
      this.children = replaceNodes(this.children, pos, pos + text2.length, view, desc);
    };
    NodeViewDesc2.prototype.update = function update3(node4, outerDeco, innerDeco, view) {
      if (this.dirty == NODE_DIRTY || !node4.sameMarkup(this.node)) {
        return false;
      }
      this.updateInner(node4, outerDeco, innerDeco, view);
      return true;
    };
    NodeViewDesc2.prototype.updateInner = function updateInner(node4, outerDeco, innerDeco, view) {
      this.updateOuterDeco(outerDeco);
      this.node = node4;
      this.innerDeco = innerDeco;
      if (this.contentDOM) {
        this.updateChildren(view, this.posAtStart);
      }
      this.dirty = NOT_DIRTY;
    };
    NodeViewDesc2.prototype.updateOuterDeco = function updateOuterDeco(outerDeco) {
      if (sameOuterDeco(outerDeco, this.outerDeco)) {
        return;
      }
      var needsWrap = this.nodeDOM.nodeType != 1;
      var oldDOM = this.dom;
      this.dom = patchOuterDeco(this.dom, this.nodeDOM, computeOuterDeco(this.outerDeco, this.node, needsWrap), computeOuterDeco(outerDeco, this.node, needsWrap));
      if (this.dom != oldDOM) {
        oldDOM.pmViewDesc = null;
        this.dom.pmViewDesc = this;
      }
      this.outerDeco = outerDeco;
    };
    NodeViewDesc2.prototype.selectNode = function selectNode() {
      this.nodeDOM.classList.add("ProseMirror-selectednode");
      if (this.contentDOM || !this.node.type.spec.draggable) {
        this.dom.draggable = true;
      }
    };
    NodeViewDesc2.prototype.deselectNode = function deselectNode() {
      this.nodeDOM.classList.remove("ProseMirror-selectednode");
      if (this.contentDOM || !this.node.type.spec.draggable) {
        this.dom.removeAttribute("draggable");
      }
    };
    prototypeAccessors$32.domAtom.get = function() {
      return this.node.isAtom;
    };
    Object.defineProperties(NodeViewDesc2.prototype, prototypeAccessors$32);
    return NodeViewDesc2;
  }(ViewDesc);
  function docViewDesc(doc2, outerDeco, innerDeco, dom, view) {
    applyOuterDeco(dom, outerDeco, doc2);
    return new NodeViewDesc(null, doc2, outerDeco, innerDeco, dom, dom, dom, view, 0);
  }
  var TextViewDesc = /* @__PURE__ */ function(NodeViewDesc2) {
    function TextViewDesc2(parent, node4, outerDeco, innerDeco, dom, nodeDOM2, view) {
      NodeViewDesc2.call(this, parent, node4, outerDeco, innerDeco, dom, null, nodeDOM2, view);
    }
    if (NodeViewDesc2)
      TextViewDesc2.__proto__ = NodeViewDesc2;
    TextViewDesc2.prototype = Object.create(NodeViewDesc2 && NodeViewDesc2.prototype);
    TextViewDesc2.prototype.constructor = TextViewDesc2;
    var prototypeAccessors$42 = { domAtom: { configurable: true } };
    TextViewDesc2.prototype.parseRule = function parseRule2() {
      var skip = this.nodeDOM.parentNode;
      while (skip && skip != this.dom && !skip.pmIsDeco) {
        skip = skip.parentNode;
      }
      return { skip: skip || true };
    };
    TextViewDesc2.prototype.update = function update3(node4, outerDeco, _, view) {
      if (this.dirty == NODE_DIRTY || this.dirty != NOT_DIRTY && !this.inParent() || !node4.sameMarkup(this.node)) {
        return false;
      }
      this.updateOuterDeco(outerDeco);
      if ((this.dirty != NOT_DIRTY || node4.text != this.node.text) && node4.text != this.nodeDOM.nodeValue) {
        this.nodeDOM.nodeValue = node4.text;
        if (view.trackWrites == this.nodeDOM) {
          view.trackWrites = null;
        }
      }
      this.node = node4;
      this.dirty = NOT_DIRTY;
      return true;
    };
    TextViewDesc2.prototype.inParent = function inParent() {
      var parentDOM = this.parent.contentDOM;
      for (var n = this.nodeDOM; n; n = n.parentNode) {
        if (n == parentDOM) {
          return true;
        }
      }
      return false;
    };
    TextViewDesc2.prototype.domFromPos = function domFromPos2(pos) {
      return { node: this.nodeDOM, offset: pos };
    };
    TextViewDesc2.prototype.localPosFromDOM = function localPosFromDOM2(dom, offset2, bias) {
      if (dom == this.nodeDOM) {
        return this.posAtStart + Math.min(offset2, this.node.text.length);
      }
      return NodeViewDesc2.prototype.localPosFromDOM.call(this, dom, offset2, bias);
    };
    TextViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
      return mutation.type != "characterData" && mutation.type != "selection";
    };
    TextViewDesc2.prototype.slice = function slice4(from4, to, view) {
      var node4 = this.node.cut(from4, to), dom = document.createTextNode(node4.text);
      return new TextViewDesc2(this.parent, node4, this.outerDeco, this.innerDeco, dom, dom, view);
    };
    TextViewDesc2.prototype.markDirty = function markDirty2(from4, to) {
      NodeViewDesc2.prototype.markDirty.call(this, from4, to);
      if (this.dom != this.nodeDOM && (from4 == 0 || to == this.nodeDOM.nodeValue.length)) {
        this.dirty = NODE_DIRTY;
      }
    };
    prototypeAccessors$42.domAtom.get = function() {
      return false;
    };
    Object.defineProperties(TextViewDesc2.prototype, prototypeAccessors$42);
    return TextViewDesc2;
  }(NodeViewDesc);
  var TrailingHackViewDesc = /* @__PURE__ */ function(ViewDesc3) {
    function TrailingHackViewDesc2() {
      ViewDesc3.apply(this, arguments);
    }
    if (ViewDesc3)
      TrailingHackViewDesc2.__proto__ = ViewDesc3;
    TrailingHackViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
    TrailingHackViewDesc2.prototype.constructor = TrailingHackViewDesc2;
    var prototypeAccessors$52 = { domAtom: { configurable: true }, ignoreForCoords: { configurable: true } };
    TrailingHackViewDesc2.prototype.parseRule = function parseRule2() {
      return { ignore: true };
    };
    TrailingHackViewDesc2.prototype.matchesHack = function matchesHack2(nodeName) {
      return this.dirty == NOT_DIRTY && this.dom.nodeName == nodeName;
    };
    prototypeAccessors$52.domAtom.get = function() {
      return true;
    };
    prototypeAccessors$52.ignoreForCoords.get = function() {
      return this.dom.nodeName == "IMG";
    };
    Object.defineProperties(TrailingHackViewDesc2.prototype, prototypeAccessors$52);
    return TrailingHackViewDesc2;
  }(ViewDesc);
  var CustomNodeViewDesc = /* @__PURE__ */ function(NodeViewDesc2) {
    function CustomNodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, spec, view, pos) {
      NodeViewDesc2.call(this, parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos);
      this.spec = spec;
    }
    if (NodeViewDesc2)
      CustomNodeViewDesc2.__proto__ = NodeViewDesc2;
    CustomNodeViewDesc2.prototype = Object.create(NodeViewDesc2 && NodeViewDesc2.prototype);
    CustomNodeViewDesc2.prototype.constructor = CustomNodeViewDesc2;
    CustomNodeViewDesc2.prototype.update = function update3(node4, outerDeco, innerDeco, view) {
      if (this.dirty == NODE_DIRTY) {
        return false;
      }
      if (this.spec.update) {
        var result2 = this.spec.update(node4, outerDeco, innerDeco);
        if (result2) {
          this.updateInner(node4, outerDeco, innerDeco, view);
        }
        return result2;
      } else if (!this.contentDOM && !node4.isLeaf) {
        return false;
      } else {
        return NodeViewDesc2.prototype.update.call(this, node4, outerDeco, innerDeco, view);
      }
    };
    CustomNodeViewDesc2.prototype.selectNode = function selectNode() {
      this.spec.selectNode ? this.spec.selectNode() : NodeViewDesc2.prototype.selectNode.call(this);
    };
    CustomNodeViewDesc2.prototype.deselectNode = function deselectNode() {
      this.spec.deselectNode ? this.spec.deselectNode() : NodeViewDesc2.prototype.deselectNode.call(this);
    };
    CustomNodeViewDesc2.prototype.setSelection = function setSelection2(anchor, head, root, force) {
      this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : NodeViewDesc2.prototype.setSelection.call(this, anchor, head, root, force);
    };
    CustomNodeViewDesc2.prototype.destroy = function destroy4() {
      if (this.spec.destroy) {
        this.spec.destroy();
      }
      NodeViewDesc2.prototype.destroy.call(this);
    };
    CustomNodeViewDesc2.prototype.stopEvent = function stopEvent2(event) {
      return this.spec.stopEvent ? this.spec.stopEvent(event) : false;
    };
    CustomNodeViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
      return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : NodeViewDesc2.prototype.ignoreMutation.call(this, mutation);
    };
    return CustomNodeViewDesc2;
  }(NodeViewDesc);
  function renderDescs(parentDOM, descs, view) {
    var dom = parentDOM.firstChild, written = false;
    for (var i = 0; i < descs.length; i++) {
      var desc = descs[i], childDOM = desc.dom;
      if (childDOM.parentNode == parentDOM) {
        while (childDOM != dom) {
          dom = rm(dom);
          written = true;
        }
        dom = dom.nextSibling;
      } else {
        written = true;
        parentDOM.insertBefore(childDOM, dom);
      }
      if (desc instanceof MarkViewDesc) {
        var pos = dom ? dom.previousSibling : parentDOM.lastChild;
        renderDescs(desc.contentDOM, desc.children, view);
        dom = pos ? pos.nextSibling : parentDOM.firstChild;
      }
    }
    while (dom) {
      dom = rm(dom);
      written = true;
    }
    if (written && view.trackWrites == parentDOM) {
      view.trackWrites = null;
    }
  }
  function OuterDecoLevel(nodeName) {
    if (nodeName) {
      this.nodeName = nodeName;
    }
  }
  OuterDecoLevel.prototype = Object.create(null);
  var noDeco = [new OuterDecoLevel()];
  function computeOuterDeco(outerDeco, node4, needsWrap) {
    if (outerDeco.length == 0) {
      return noDeco;
    }
    var top = needsWrap ? noDeco[0] : new OuterDecoLevel(), result2 = [top];
    for (var i = 0; i < outerDeco.length; i++) {
      var attrs = outerDeco[i].type.attrs;
      if (!attrs) {
        continue;
      }
      if (attrs.nodeName) {
        result2.push(top = new OuterDecoLevel(attrs.nodeName));
      }
      for (var name in attrs) {
        var val = attrs[name];
        if (val == null) {
          continue;
        }
        if (needsWrap && result2.length == 1) {
          result2.push(top = new OuterDecoLevel(node4.isInline ? "span" : "div"));
        }
        if (name == "class") {
          top.class = (top.class ? top.class + " " : "") + val;
        } else if (name == "style") {
          top.style = (top.style ? top.style + ";" : "") + val;
        } else if (name != "nodeName") {
          top[name] = val;
        }
      }
    }
    return result2;
  }
  function patchOuterDeco(outerDOM, nodeDOM2, prevComputed, curComputed) {
    if (prevComputed == noDeco && curComputed == noDeco) {
      return nodeDOM2;
    }
    var curDOM = nodeDOM2;
    for (var i = 0; i < curComputed.length; i++) {
      var deco = curComputed[i], prev = prevComputed[i];
      if (i) {
        var parent = void 0;
        if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM && (parent = curDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
          curDOM = parent;
        } else {
          parent = document.createElement(deco.nodeName);
          parent.pmIsDeco = true;
          parent.appendChild(curDOM);
          prev = noDeco[0];
          curDOM = parent;
        }
      }
      patchAttributes(curDOM, prev || noDeco[0], deco);
    }
    return curDOM;
  }
  function patchAttributes(dom, prev, cur) {
    for (var name in prev) {
      if (name != "class" && name != "style" && name != "nodeName" && !(name in cur)) {
        dom.removeAttribute(name);
      }
    }
    for (var name$1 in cur) {
      if (name$1 != "class" && name$1 != "style" && name$1 != "nodeName" && cur[name$1] != prev[name$1]) {
        dom.setAttribute(name$1, cur[name$1]);
      }
    }
    if (prev.class != cur.class) {
      var prevList = prev.class ? prev.class.split(" ").filter(Boolean) : nothing;
      var curList = cur.class ? cur.class.split(" ").filter(Boolean) : nothing;
      for (var i = 0; i < prevList.length; i++) {
        if (curList.indexOf(prevList[i]) == -1) {
          dom.classList.remove(prevList[i]);
        }
      }
      for (var i$1 = 0; i$1 < curList.length; i$1++) {
        if (prevList.indexOf(curList[i$1]) == -1) {
          dom.classList.add(curList[i$1]);
        }
      }
    }
    if (prev.style != cur.style) {
      if (prev.style) {
        var prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
        while (m = prop.exec(prev.style)) {
          dom.style.removeProperty(m[1]);
        }
      }
      if (cur.style) {
        dom.style.cssText += cur.style;
      }
    }
  }
  function applyOuterDeco(dom, deco, node4) {
    return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node4, dom.nodeType != 1));
  }
  function sameOuterDeco(a, b) {
    if (a.length != b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (!a[i].type.eq(b[i].type)) {
        return false;
      }
    }
    return true;
  }
  function rm(dom) {
    var next = dom.nextSibling;
    dom.parentNode.removeChild(dom);
    return next;
  }
  var ViewTreeUpdater = function ViewTreeUpdater2(top, lockedNode) {
    this.top = top;
    this.lock = lockedNode;
    this.index = 0;
    this.stack = [];
    this.changed = false;
    this.preMatch = preMatch(top.node.content, top.children);
  };
  ViewTreeUpdater.prototype.destroyBetween = function destroyBetween(start3, end2) {
    if (start3 == end2) {
      return;
    }
    for (var i = start3; i < end2; i++) {
      this.top.children[i].destroy();
    }
    this.top.children.splice(start3, end2 - start3);
    this.changed = true;
  };
  ViewTreeUpdater.prototype.destroyRest = function destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  };
  ViewTreeUpdater.prototype.syncToMarks = function syncToMarks(marks2, inline2, view) {
    var keep = 0, depth = this.stack.length >> 1;
    var maxKeep = Math.min(depth, marks2.length);
    while (keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[keep + 1 << 1]).matchesMark(marks2[keep]) && marks2[keep].type.spec.spanning !== false) {
      keep++;
    }
    while (keep < depth) {
      this.destroyRest();
      this.top.dirty = NOT_DIRTY;
      this.index = this.stack.pop();
      this.top = this.stack.pop();
      depth--;
    }
    while (depth < marks2.length) {
      this.stack.push(this.top, this.index + 1);
      var found2 = -1;
      for (var i = this.index; i < Math.min(this.index + 3, this.top.children.length); i++) {
        if (this.top.children[i].matchesMark(marks2[depth])) {
          found2 = i;
          break;
        }
      }
      if (found2 > -1) {
        if (found2 > this.index) {
          this.changed = true;
          this.destroyBetween(this.index, found2);
        }
        this.top = this.top.children[this.index];
      } else {
        var markDesc = MarkViewDesc.create(this.top, marks2[depth], inline2, view);
        this.top.children.splice(this.index, 0, markDesc);
        this.top = markDesc;
        this.changed = true;
      }
      this.index = 0;
      depth++;
    }
  };
  ViewTreeUpdater.prototype.findNodeMatch = function findNodeMatch(node4, outerDeco, innerDeco, index2) {
    var children = this.top.children, found2 = -1;
    if (index2 >= this.preMatch.index) {
      for (var i = this.index; i < children.length; i++) {
        if (children[i].matchesNode(node4, outerDeco, innerDeco)) {
          found2 = i;
          break;
        }
      }
    } else {
      for (var i$1 = this.index, e = Math.min(children.length, i$1 + 1); i$1 < e; i$1++) {
        var child3 = children[i$1];
        if (child3.matchesNode(node4, outerDeco, innerDeco) && !this.preMatch.matched.has(child3)) {
          found2 = i$1;
          break;
        }
      }
    }
    if (found2 < 0) {
      return false;
    }
    this.destroyBetween(this.index, found2);
    this.index++;
    return true;
  };
  ViewTreeUpdater.prototype.updateNodeAt = function updateNodeAt(node4, outerDeco, innerDeco, index2, view) {
    var child3 = this.top.children[index2];
    if (!child3.update(node4, outerDeco, innerDeco, view)) {
      return false;
    }
    this.destroyBetween(this.index, index2);
    this.index = index2 + 1;
    return true;
  };
  ViewTreeUpdater.prototype.findIndexWithChild = function findIndexWithChild(domNode) {
    for (; ; ) {
      var parent = domNode.parentNode;
      if (!parent) {
        return -1;
      }
      if (parent == this.top.contentDOM) {
        var desc = domNode.pmViewDesc;
        if (desc) {
          for (var i = this.index; i < this.top.children.length; i++) {
            if (this.top.children[i] == desc) {
              return i;
            }
          }
        }
        return -1;
      }
      domNode = parent;
    }
  };
  ViewTreeUpdater.prototype.updateNextNode = function updateNextNode(node4, outerDeco, innerDeco, view, index2) {
    for (var i = this.index; i < this.top.children.length; i++) {
      var next = this.top.children[i];
      if (next instanceof NodeViewDesc) {
        var preMatch2 = this.preMatch.matched.get(next);
        if (preMatch2 != null && preMatch2 != index2) {
          return false;
        }
        var nextDOM = next.dom;
        var locked = this.lock && (nextDOM == this.lock || nextDOM.nodeType == 1 && nextDOM.contains(this.lock.parentNode)) && !(node4.isText && next.node && next.node.isText && next.nodeDOM.nodeValue == node4.text && next.dirty != NODE_DIRTY && sameOuterDeco(outerDeco, next.outerDeco));
        if (!locked && next.update(node4, outerDeco, innerDeco, view)) {
          this.destroyBetween(this.index, i);
          if (next.dom != nextDOM) {
            this.changed = true;
          }
          this.index++;
          return true;
        }
        break;
      }
    }
    return false;
  };
  ViewTreeUpdater.prototype.addNode = function addNode2(node4, outerDeco, innerDeco, view, pos) {
    this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node4, outerDeco, innerDeco, view, pos));
    this.changed = true;
  };
  ViewTreeUpdater.prototype.placeWidget = function placeWidget(widget2, view, pos) {
    var next = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (next && next.matchesWidget(widget2) && (widget2 == next.widget || !next.widget.type.toDOM.parentNode)) {
      this.index++;
    } else {
      var desc = new WidgetViewDesc(this.top, widget2, view, pos);
      this.top.children.splice(this.index++, 0, desc);
      this.changed = true;
    }
  };
  ViewTreeUpdater.prototype.addTextblockHacks = function addTextblockHacks() {
    var lastChild = this.top.children[this.index - 1];
    while (lastChild instanceof MarkViewDesc) {
      lastChild = lastChild.children[lastChild.children.length - 1];
    }
    if (!lastChild || !(lastChild instanceof TextViewDesc) || /\n$/.test(lastChild.node.text)) {
      if ((result.safari || result.chrome) && lastChild && lastChild.dom.contentEditable == "false") {
        this.addHackNode("IMG");
      }
      this.addHackNode("BR");
    }
  };
  ViewTreeUpdater.prototype.addHackNode = function addHackNode(nodeName) {
    if (this.index < this.top.children.length && this.top.children[this.index].matchesHack(nodeName)) {
      this.index++;
    } else {
      var dom = document.createElement(nodeName);
      if (nodeName == "IMG") {
        dom.className = "ProseMirror-separator";
      }
      if (nodeName == "BR") {
        dom.className = "ProseMirror-trailingBreak";
      }
      this.top.children.splice(this.index++, 0, new TrailingHackViewDesc(this.top, nothing, dom, null));
      this.changed = true;
    }
  };
  function preMatch(frag, descs) {
    var fI = frag.childCount, dI = descs.length, matched = new Map();
    for (; fI > 0 && dI > 0; dI--) {
      var desc = descs[dI - 1], node4 = desc.node;
      if (!node4) {
        continue;
      }
      if (node4 != frag.child(fI - 1)) {
        break;
      }
      --fI;
      matched.set(desc, fI);
    }
    return { index: fI, matched };
  }
  function compareSide(a, b) {
    return a.type.side - b.type.side;
  }
  function iterDeco(parent, deco, onWidget, onNode) {
    var locals3 = deco.locals(parent), offset2 = 0;
    if (locals3.length == 0) {
      for (var i = 0; i < parent.childCount; i++) {
        var child3 = parent.child(i);
        onNode(child3, locals3, deco.forChild(offset2, child3), i);
        offset2 += child3.nodeSize;
      }
      return;
    }
    var decoIndex = 0, active = [], restNode = null;
    for (var parentIndex = 0; ; ) {
      if (decoIndex < locals3.length && locals3[decoIndex].to == offset2) {
        var widget2 = locals3[decoIndex++], widgets = void 0;
        while (decoIndex < locals3.length && locals3[decoIndex].to == offset2) {
          (widgets || (widgets = [widget2])).push(locals3[decoIndex++]);
        }
        if (widgets) {
          widgets.sort(compareSide);
          for (var i$1 = 0; i$1 < widgets.length; i$1++) {
            onWidget(widgets[i$1], parentIndex, !!restNode);
          }
        } else {
          onWidget(widget2, parentIndex, !!restNode);
        }
      }
      var child$1 = void 0, index2 = void 0;
      if (restNode) {
        index2 = -1;
        child$1 = restNode;
        restNode = null;
      } else if (parentIndex < parent.childCount) {
        index2 = parentIndex;
        child$1 = parent.child(parentIndex++);
      } else {
        break;
      }
      for (var i$2 = 0; i$2 < active.length; i$2++) {
        if (active[i$2].to <= offset2) {
          active.splice(i$2--, 1);
        }
      }
      while (decoIndex < locals3.length && locals3[decoIndex].from <= offset2 && locals3[decoIndex].to > offset2) {
        active.push(locals3[decoIndex++]);
      }
      var end2 = offset2 + child$1.nodeSize;
      if (child$1.isText) {
        var cutAt = end2;
        if (decoIndex < locals3.length && locals3[decoIndex].from < cutAt) {
          cutAt = locals3[decoIndex].from;
        }
        for (var i$3 = 0; i$3 < active.length; i$3++) {
          if (active[i$3].to < cutAt) {
            cutAt = active[i$3].to;
          }
        }
        if (cutAt < end2) {
          restNode = child$1.cut(cutAt - offset2);
          child$1 = child$1.cut(0, cutAt - offset2);
          end2 = cutAt;
          index2 = -1;
        }
      }
      var outerDeco = !active.length ? nothing : child$1.isInline && !child$1.isLeaf ? active.filter(function(d) {
        return !d.inline;
      }) : active.slice();
      onNode(child$1, outerDeco, deco.forChild(offset2, child$1), index2);
      offset2 = end2;
    }
  }
  function iosHacks(dom) {
    if (dom.nodeName == "UL" || dom.nodeName == "OL") {
      var oldCSS = dom.style.cssText;
      dom.style.cssText = oldCSS + "; list-style: square !important";
      window.getComputedStyle(dom).listStyle;
      dom.style.cssText = oldCSS;
    }
  }
  function nearbyTextNode(node4, offset2) {
    for (; ; ) {
      if (node4.nodeType == 3) {
        return node4;
      }
      if (node4.nodeType == 1 && offset2 > 0) {
        if (node4.childNodes.length > offset2 && node4.childNodes[offset2].nodeType == 3) {
          return node4.childNodes[offset2];
        }
        node4 = node4.childNodes[offset2 - 1];
        offset2 = nodeSize(node4);
      } else if (node4.nodeType == 1 && offset2 < node4.childNodes.length) {
        node4 = node4.childNodes[offset2];
        offset2 = 0;
      } else {
        return null;
      }
    }
  }
  function findTextInFragment(frag, text2, from4, to) {
    for (var i = 0, pos = 0; i < frag.childCount && pos <= to; ) {
      var child3 = frag.child(i++), childStart = pos;
      pos += child3.nodeSize;
      if (!child3.isText) {
        continue;
      }
      var str = child3.text;
      while (i < frag.childCount) {
        var next = frag.child(i++);
        pos += next.nodeSize;
        if (!next.isText) {
          break;
        }
        str += next.text;
      }
      if (pos >= from4) {
        var found2 = str.lastIndexOf(text2, to - childStart);
        if (found2 >= 0 && found2 + text2.length + childStart >= from4) {
          return childStart + found2;
        }
      }
    }
    return -1;
  }
  function replaceNodes(nodes, from4, to, view, replacement) {
    var result2 = [];
    for (var i = 0, off = 0; i < nodes.length; i++) {
      var child3 = nodes[i], start3 = off, end2 = off += child3.size;
      if (start3 >= to || end2 <= from4) {
        result2.push(child3);
      } else {
        if (start3 < from4) {
          result2.push(child3.slice(0, from4 - start3, view));
        }
        if (replacement) {
          result2.push(replacement);
          replacement = null;
        }
        if (end2 > to) {
          result2.push(child3.slice(to - start3, child3.size, view));
        }
      }
    }
    return result2;
  }
  function selectionFromDOM(view, origin) {
    var domSel = view.root.getSelection(), doc2 = view.state.doc;
    if (!domSel.focusNode) {
      return null;
    }
    var nearestDesc2 = view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc2 && nearestDesc2.size == 0;
    var head = view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
    if (head < 0) {
      return null;
    }
    var $head = doc2.resolve(head), $anchor, selection;
    if (selectionCollapsed(domSel)) {
      $anchor = $head;
      while (nearestDesc2 && !nearestDesc2.node) {
        nearestDesc2 = nearestDesc2.parent;
      }
      if (nearestDesc2 && nearestDesc2.node.isAtom && NodeSelection.isSelectable(nearestDesc2.node) && nearestDesc2.parent && !(nearestDesc2.node.isInline && isOnEdge(domSel.focusNode, domSel.focusOffset, nearestDesc2.dom))) {
        var pos = nearestDesc2.posBefore;
        selection = new NodeSelection(head == pos ? $head : doc2.resolve(pos));
      }
    } else {
      var anchor = view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
      if (anchor < 0) {
        return null;
      }
      $anchor = doc2.resolve(anchor);
    }
    if (!selection) {
      var bias = origin == "pointer" || view.state.selection.head < $head.pos && !inWidget ? 1 : -1;
      selection = selectionBetween(view, $anchor, $head, bias);
    }
    return selection;
  }
  function editorOwnsSelection(view) {
    return view.editable ? view.hasFocus() : hasSelection(view) && document.activeElement && document.activeElement.contains(view.dom);
  }
  function selectionToDOM(view, force) {
    var sel = view.state.selection;
    syncNodeSelection(view, sel);
    if (!editorOwnsSelection(view)) {
      return;
    }
    if (!force && view.mouseDown && view.mouseDown.allowDefault) {
      view.mouseDown.delayedSelectionSync = true;
      view.domObserver.setCurSelection();
      return;
    }
    view.domObserver.disconnectSelection();
    if (view.cursorWrapper) {
      selectCursorWrapper(view);
    } else {
      var anchor = sel.anchor;
      var head = sel.head;
      var resetEditableFrom, resetEditableTo;
      if (brokenSelectBetweenUneditable && !(sel instanceof TextSelection)) {
        if (!sel.$from.parent.inlineContent) {
          resetEditableFrom = temporarilyEditableNear(view, sel.from);
        }
        if (!sel.empty && !sel.$from.parent.inlineContent) {
          resetEditableTo = temporarilyEditableNear(view, sel.to);
        }
      }
      view.docView.setSelection(anchor, head, view.root, force);
      if (brokenSelectBetweenUneditable) {
        if (resetEditableFrom) {
          resetEditable(resetEditableFrom);
        }
        if (resetEditableTo) {
          resetEditable(resetEditableTo);
        }
      }
      if (sel.visible) {
        view.dom.classList.remove("ProseMirror-hideselection");
      } else {
        view.dom.classList.add("ProseMirror-hideselection");
        if ("onselectionchange" in document) {
          removeClassOnSelectionChange(view);
        }
      }
    }
    view.domObserver.setCurSelection();
    view.domObserver.connectSelection();
  }
  var brokenSelectBetweenUneditable = result.safari || result.chrome && result.chrome_version < 63;
  function temporarilyEditableNear(view, pos) {
    var ref = view.docView.domFromPos(pos, 0);
    var node4 = ref.node;
    var offset2 = ref.offset;
    var after2 = offset2 < node4.childNodes.length ? node4.childNodes[offset2] : null;
    var before2 = offset2 ? node4.childNodes[offset2 - 1] : null;
    if (result.safari && after2 && after2.contentEditable == "false") {
      return setEditable(after2);
    }
    if ((!after2 || after2.contentEditable == "false") && (!before2 || before2.contentEditable == "false")) {
      if (after2) {
        return setEditable(after2);
      } else if (before2) {
        return setEditable(before2);
      }
    }
  }
  function setEditable(element) {
    element.contentEditable = "true";
    if (result.safari && element.draggable) {
      element.draggable = false;
      element.wasDraggable = true;
    }
    return element;
  }
  function resetEditable(element) {
    element.contentEditable = "false";
    if (element.wasDraggable) {
      element.draggable = true;
      element.wasDraggable = null;
    }
  }
  function removeClassOnSelectionChange(view) {
    var doc2 = view.dom.ownerDocument;
    doc2.removeEventListener("selectionchange", view.hideSelectionGuard);
    var domSel = view.root.getSelection();
    var node4 = domSel.anchorNode, offset2 = domSel.anchorOffset;
    doc2.addEventListener("selectionchange", view.hideSelectionGuard = function() {
      if (domSel.anchorNode != node4 || domSel.anchorOffset != offset2) {
        doc2.removeEventListener("selectionchange", view.hideSelectionGuard);
        setTimeout(function() {
          if (!editorOwnsSelection(view) || view.state.selection.visible) {
            view.dom.classList.remove("ProseMirror-hideselection");
          }
        }, 20);
      }
    });
  }
  function selectCursorWrapper(view) {
    var domSel = view.root.getSelection(), range = document.createRange();
    var node4 = view.cursorWrapper.dom, img = node4.nodeName == "IMG";
    if (img) {
      range.setEnd(node4.parentNode, domIndex(node4) + 1);
    } else {
      range.setEnd(node4, 0);
    }
    range.collapse(false);
    domSel.removeAllRanges();
    domSel.addRange(range);
    if (!img && !view.state.selection.visible && result.ie && result.ie_version <= 11) {
      node4.disabled = true;
      node4.disabled = false;
    }
  }
  function syncNodeSelection(view, sel) {
    if (sel instanceof NodeSelection) {
      var desc = view.docView.descAt(sel.from);
      if (desc != view.lastSelectedViewDesc) {
        clearNodeSelection(view);
        if (desc) {
          desc.selectNode();
        }
        view.lastSelectedViewDesc = desc;
      }
    } else {
      clearNodeSelection(view);
    }
  }
  function clearNodeSelection(view) {
    if (view.lastSelectedViewDesc) {
      if (view.lastSelectedViewDesc.parent) {
        view.lastSelectedViewDesc.deselectNode();
      }
      view.lastSelectedViewDesc = null;
    }
  }
  function selectionBetween(view, $anchor, $head, bias) {
    return view.someProp("createSelectionBetween", function(f) {
      return f(view, $anchor, $head);
    }) || TextSelection.between($anchor, $head, bias);
  }
  function hasFocusAndSelection(view) {
    if (view.editable && view.root.activeElement != view.dom) {
      return false;
    }
    return hasSelection(view);
  }
  function hasSelection(view) {
    var sel = view.root.getSelection();
    if (!sel.anchorNode) {
      return false;
    }
    try {
      return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode) && (view.editable || view.dom.contains(sel.focusNode.nodeType == 3 ? sel.focusNode.parentNode : sel.focusNode));
    } catch (_) {
      return false;
    }
  }
  function anchorInRightPlace(view) {
    var anchorDOM = view.docView.domFromPos(view.state.selection.anchor, 0);
    var domSel = view.root.getSelection();
    return isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset);
  }
  function moveSelectionBlock(state, dir) {
    var ref = state.selection;
    var $anchor = ref.$anchor;
    var $head = ref.$head;
    var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
    var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
    return $start && Selection.findFrom($start, dir);
  }
  function apply7(view, sel) {
    view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
    return true;
  }
  function selectHorizontally(view, dir, mods) {
    var sel = view.state.selection;
    if (sel instanceof TextSelection) {
      if (!sel.empty || mods.indexOf("s") > -1) {
        return false;
      } else if (view.endOfTextblock(dir > 0 ? "right" : "left")) {
        var next = moveSelectionBlock(view.state, dir);
        if (next && next instanceof NodeSelection) {
          return apply7(view, next);
        }
        return false;
      } else if (!(result.mac && mods.indexOf("m") > -1)) {
        var $head = sel.$head, node4 = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter, desc;
        if (!node4 || node4.isText) {
          return false;
        }
        var nodePos = dir < 0 ? $head.pos - node4.nodeSize : $head.pos;
        if (!(node4.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM)) {
          return false;
        }
        if (NodeSelection.isSelectable(node4)) {
          return apply7(view, new NodeSelection(dir < 0 ? view.state.doc.resolve($head.pos - node4.nodeSize) : $head));
        } else if (result.webkit) {
          return apply7(view, new TextSelection(view.state.doc.resolve(dir < 0 ? nodePos : nodePos + node4.nodeSize)));
        } else {
          return false;
        }
      }
    } else if (sel instanceof NodeSelection && sel.node.isInline) {
      return apply7(view, new TextSelection(dir > 0 ? sel.$to : sel.$from));
    } else {
      var next$1 = moveSelectionBlock(view.state, dir);
      if (next$1) {
        return apply7(view, next$1);
      }
      return false;
    }
  }
  function nodeLen(node4) {
    return node4.nodeType == 3 ? node4.nodeValue.length : node4.childNodes.length;
  }
  function isIgnorable(dom) {
    var desc = dom.pmViewDesc;
    return desc && desc.size == 0 && (dom.nextSibling || dom.nodeName != "BR");
  }
  function skipIgnoredNodesLeft(view) {
    var sel = view.root.getSelection();
    var node4 = sel.focusNode, offset2 = sel.focusOffset;
    if (!node4) {
      return;
    }
    var moveNode, moveOffset, force = false;
    if (result.gecko && node4.nodeType == 1 && offset2 < nodeLen(node4) && isIgnorable(node4.childNodes[offset2])) {
      force = true;
    }
    for (; ; ) {
      if (offset2 > 0) {
        if (node4.nodeType != 1) {
          break;
        } else {
          var before2 = node4.childNodes[offset2 - 1];
          if (isIgnorable(before2)) {
            moveNode = node4;
            moveOffset = --offset2;
          } else if (before2.nodeType == 3) {
            node4 = before2;
            offset2 = node4.nodeValue.length;
          } else {
            break;
          }
        }
      } else if (isBlockNode(node4)) {
        break;
      } else {
        var prev = node4.previousSibling;
        while (prev && isIgnorable(prev)) {
          moveNode = node4.parentNode;
          moveOffset = domIndex(prev);
          prev = prev.previousSibling;
        }
        if (!prev) {
          node4 = node4.parentNode;
          if (node4 == view.dom) {
            break;
          }
          offset2 = 0;
        } else {
          node4 = prev;
          offset2 = nodeLen(node4);
        }
      }
    }
    if (force) {
      setSelFocus(view, sel, node4, offset2);
    } else if (moveNode) {
      setSelFocus(view, sel, moveNode, moveOffset);
    }
  }
  function skipIgnoredNodesRight(view) {
    var sel = view.root.getSelection();
    var node4 = sel.focusNode, offset2 = sel.focusOffset;
    if (!node4) {
      return;
    }
    var len = nodeLen(node4);
    var moveNode, moveOffset;
    for (; ; ) {
      if (offset2 < len) {
        if (node4.nodeType != 1) {
          break;
        }
        var after2 = node4.childNodes[offset2];
        if (isIgnorable(after2)) {
          moveNode = node4;
          moveOffset = ++offset2;
        } else {
          break;
        }
      } else if (isBlockNode(node4)) {
        break;
      } else {
        var next = node4.nextSibling;
        while (next && isIgnorable(next)) {
          moveNode = next.parentNode;
          moveOffset = domIndex(next) + 1;
          next = next.nextSibling;
        }
        if (!next) {
          node4 = node4.parentNode;
          if (node4 == view.dom) {
            break;
          }
          offset2 = len = 0;
        } else {
          node4 = next;
          offset2 = 0;
          len = nodeLen(node4);
        }
      }
    }
    if (moveNode) {
      setSelFocus(view, sel, moveNode, moveOffset);
    }
  }
  function isBlockNode(dom) {
    var desc = dom.pmViewDesc;
    return desc && desc.node && desc.node.isBlock;
  }
  function setSelFocus(view, sel, node4, offset2) {
    if (selectionCollapsed(sel)) {
      var range = document.createRange();
      range.setEnd(node4, offset2);
      range.setStart(node4, offset2);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (sel.extend) {
      sel.extend(node4, offset2);
    }
    view.domObserver.setCurSelection();
    var state = view.state;
    setTimeout(function() {
      if (view.state == state) {
        selectionToDOM(view);
      }
    }, 50);
  }
  function selectVertically(view, dir, mods) {
    var sel = view.state.selection;
    if (sel instanceof TextSelection && !sel.empty || mods.indexOf("s") > -1) {
      return false;
    }
    if (result.mac && mods.indexOf("m") > -1) {
      return false;
    }
    var $from = sel.$from;
    var $to = sel.$to;
    if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
      var next = moveSelectionBlock(view.state, dir);
      if (next && next instanceof NodeSelection) {
        return apply7(view, next);
      }
    }
    if (!$from.parent.inlineContent) {
      var side = dir < 0 ? $from : $to;
      var beyond = sel instanceof AllSelection ? Selection.near(side, dir) : Selection.findFrom(side, dir);
      return beyond ? apply7(view, beyond) : false;
    }
    return false;
  }
  function stopNativeHorizontalDelete(view, dir) {
    if (!(view.state.selection instanceof TextSelection)) {
      return true;
    }
    var ref = view.state.selection;
    var $head = ref.$head;
    var $anchor = ref.$anchor;
    var empty2 = ref.empty;
    if (!$head.sameParent($anchor)) {
      return true;
    }
    if (!empty2) {
      return false;
    }
    if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) {
      return true;
    }
    var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
    if (nextNode && !nextNode.isText) {
      var tr = view.state.tr;
      if (dir < 0) {
        tr.delete($head.pos - nextNode.nodeSize, $head.pos);
      } else {
        tr.delete($head.pos, $head.pos + nextNode.nodeSize);
      }
      view.dispatch(tr);
      return true;
    }
    return false;
  }
  function switchEditable(view, node4, state) {
    view.domObserver.stop();
    node4.contentEditable = state;
    view.domObserver.start();
  }
  function safariDownArrowBug(view) {
    if (!result.safari || view.state.selection.$head.parentOffset > 0) {
      return;
    }
    var ref = view.root.getSelection();
    var focusNode = ref.focusNode;
    var focusOffset = ref.focusOffset;
    if (focusNode && focusNode.nodeType == 1 && focusOffset == 0 && focusNode.firstChild && focusNode.firstChild.contentEditable == "false") {
      var child3 = focusNode.firstChild;
      switchEditable(view, child3, true);
      setTimeout(function() {
        return switchEditable(view, child3, false);
      }, 20);
    }
  }
  function getMods(event) {
    var result2 = "";
    if (event.ctrlKey) {
      result2 += "c";
    }
    if (event.metaKey) {
      result2 += "m";
    }
    if (event.altKey) {
      result2 += "a";
    }
    if (event.shiftKey) {
      result2 += "s";
    }
    return result2;
  }
  function captureKeyDown(view, event) {
    var code = event.keyCode, mods = getMods(event);
    if (code == 8 || result.mac && code == 72 && mods == "c") {
      return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodesLeft(view);
    } else if (code == 46 || result.mac && code == 68 && mods == "c") {
      return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodesRight(view);
    } else if (code == 13 || code == 27) {
      return true;
    } else if (code == 37) {
      return selectHorizontally(view, -1, mods) || skipIgnoredNodesLeft(view);
    } else if (code == 39) {
      return selectHorizontally(view, 1, mods) || skipIgnoredNodesRight(view);
    } else if (code == 38) {
      return selectVertically(view, -1, mods) || skipIgnoredNodesLeft(view);
    } else if (code == 40) {
      return safariDownArrowBug(view) || selectVertically(view, 1, mods) || skipIgnoredNodesRight(view);
    } else if (mods == (result.mac ? "m" : "c") && (code == 66 || code == 73 || code == 89 || code == 90)) {
      return true;
    }
    return false;
  }
  function parseBetween(view, from_, to_) {
    var ref = view.docView.parseRange(from_, to_);
    var parent = ref.node;
    var fromOffset = ref.fromOffset;
    var toOffset = ref.toOffset;
    var from4 = ref.from;
    var to = ref.to;
    var domSel = view.root.getSelection(), find3 = null, anchor = domSel.anchorNode;
    if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
      find3 = [{ node: anchor, offset: domSel.anchorOffset }];
      if (!selectionCollapsed(domSel)) {
        find3.push({ node: domSel.focusNode, offset: domSel.focusOffset });
      }
    }
    if (result.chrome && view.lastKeyCode === 8) {
      for (var off = toOffset; off > fromOffset; off--) {
        var node4 = parent.childNodes[off - 1], desc = node4.pmViewDesc;
        if (node4.nodeName == "BR" && !desc) {
          toOffset = off;
          break;
        }
        if (!desc || desc.size) {
          break;
        }
      }
    }
    var startDoc = view.state.doc;
    var parser = view.someProp("domParser") || DOMParser.fromSchema(view.state.schema);
    var $from = startDoc.resolve(from4);
    var sel = null, doc2 = parser.parse(parent, {
      topNode: $from.parent,
      topMatch: $from.parent.contentMatchAt($from.index()),
      topOpen: true,
      from: fromOffset,
      to: toOffset,
      preserveWhitespace: $from.parent.type.spec.code ? "full" : true,
      editableContent: true,
      findPositions: find3,
      ruleFromNode,
      context: $from
    });
    if (find3 && find3[0].pos != null) {
      var anchor$1 = find3[0].pos, head = find3[1] && find3[1].pos;
      if (head == null) {
        head = anchor$1;
      }
      sel = { anchor: anchor$1 + from4, head: head + from4 };
    }
    return { doc: doc2, sel, from: from4, to };
  }
  function ruleFromNode(dom) {
    var desc = dom.pmViewDesc;
    if (desc) {
      return desc.parseRule();
    } else if (dom.nodeName == "BR" && dom.parentNode) {
      if (result.safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) {
        var skip = document.createElement("div");
        skip.appendChild(document.createElement("li"));
        return { skip };
      } else if (dom.parentNode.lastChild == dom || result.safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) {
        return { ignore: true };
      }
    } else if (dom.nodeName == "IMG" && dom.getAttribute("mark-placeholder")) {
      return { ignore: true };
    }
  }
  function readDOMChange(view, from4, to, typeOver, addedNodes) {
    if (from4 < 0) {
      var origin = view.lastSelectionTime > Date.now() - 50 ? view.lastSelectionOrigin : null;
      var newSel = selectionFromDOM(view, origin);
      if (newSel && !view.state.selection.eq(newSel)) {
        var tr$1 = view.state.tr.setSelection(newSel);
        if (origin == "pointer") {
          tr$1.setMeta("pointer", true);
        } else if (origin == "key") {
          tr$1.scrollIntoView();
        }
        view.dispatch(tr$1);
      }
      return;
    }
    var $before = view.state.doc.resolve(from4);
    var shared = $before.sharedDepth(to);
    from4 = $before.before(shared + 1);
    to = view.state.doc.resolve(to).after(shared + 1);
    var sel = view.state.selection;
    var parse3 = parseBetween(view, from4, to);
    if (result.chrome && view.cursorWrapper && parse3.sel && parse3.sel.anchor == view.cursorWrapper.deco.from) {
      var text2 = view.cursorWrapper.deco.type.toDOM.nextSibling;
      var size = text2 && text2.nodeValue ? text2.nodeValue.length : 1;
      parse3.sel = { anchor: parse3.sel.anchor + size, head: parse3.sel.anchor + size };
    }
    var doc2 = view.state.doc, compare = doc2.slice(parse3.from, parse3.to);
    var preferredPos, preferredSide;
    if (view.lastKeyCode === 8 && Date.now() - 100 < view.lastKeyCodeTime) {
      preferredPos = view.state.selection.to;
      preferredSide = "end";
    } else {
      preferredPos = view.state.selection.from;
      preferredSide = "start";
    }
    view.lastKeyCode = null;
    var change = findDiff(compare.content, parse3.doc.content, parse3.from, preferredPos, preferredSide);
    if (!change) {
      if (typeOver && sel instanceof TextSelection && !sel.empty && sel.$head.sameParent(sel.$anchor) && !view.composing && !(parse3.sel && parse3.sel.anchor != parse3.sel.head)) {
        change = { start: sel.from, endA: sel.to, endB: sel.to };
      } else if ((result.ios && view.lastIOSEnter > Date.now() - 225 || result.android) && addedNodes.some(function(n) {
        return n.nodeName == "DIV" || n.nodeName == "P";
      }) && view.someProp("handleKeyDown", function(f) {
        return f(view, keyEvent(13, "Enter"));
      })) {
        view.lastIOSEnter = 0;
        return;
      } else {
        if (parse3.sel) {
          var sel$1 = resolveSelection(view, view.state.doc, parse3.sel);
          if (sel$1 && !sel$1.eq(view.state.selection)) {
            view.dispatch(view.state.tr.setSelection(sel$1));
          }
        }
        return;
      }
    }
    view.domChangeCount++;
    if (view.state.selection.from < view.state.selection.to && change.start == change.endB && view.state.selection instanceof TextSelection) {
      if (change.start > view.state.selection.from && change.start <= view.state.selection.from + 2) {
        change.start = view.state.selection.from;
      } else if (change.endA < view.state.selection.to && change.endA >= view.state.selection.to - 2) {
        change.endB += view.state.selection.to - change.endA;
        change.endA = view.state.selection.to;
      }
    }
    if (result.ie && result.ie_version <= 11 && change.endB == change.start + 1 && change.endA == change.start && change.start > parse3.from && parse3.doc.textBetween(change.start - parse3.from - 1, change.start - parse3.from + 1) == " \xA0") {
      change.start--;
      change.endA--;
      change.endB--;
    }
    var $from = parse3.doc.resolveNoCache(change.start - parse3.from);
    var $to = parse3.doc.resolveNoCache(change.endB - parse3.from);
    var inlineChange = $from.sameParent($to) && $from.parent.inlineContent;
    var nextSel;
    if ((result.ios && view.lastIOSEnter > Date.now() - 225 && (!inlineChange || addedNodes.some(function(n) {
      return n.nodeName == "DIV" || n.nodeName == "P";
    })) || !inlineChange && $from.pos < parse3.doc.content.size && (nextSel = Selection.findFrom(parse3.doc.resolve($from.pos + 1), 1, true)) && nextSel.head == $to.pos) && view.someProp("handleKeyDown", function(f) {
      return f(view, keyEvent(13, "Enter"));
    })) {
      view.lastIOSEnter = 0;
      return;
    }
    if (view.state.selection.anchor > change.start && looksLikeJoin(doc2, change.start, change.endA, $from, $to) && view.someProp("handleKeyDown", function(f) {
      return f(view, keyEvent(8, "Backspace"));
    })) {
      if (result.android && result.chrome) {
        view.domObserver.suppressSelectionUpdates();
      }
      return;
    }
    if (result.chrome && result.android && change.toB == change.from) {
      view.lastAndroidDelete = Date.now();
    }
    if (result.android && !inlineChange && $from.start() != $to.start() && $to.parentOffset == 0 && $from.depth == $to.depth && parse3.sel && parse3.sel.anchor == parse3.sel.head && parse3.sel.head == change.endA) {
      change.endB -= 2;
      $to = parse3.doc.resolveNoCache(change.endB - parse3.from);
      setTimeout(function() {
        view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(13, "Enter"));
        });
      }, 20);
    }
    var chFrom = change.start, chTo = change.endA;
    var tr, storedMarks, markChange, $from1;
    if (inlineChange) {
      if ($from.pos == $to.pos) {
        if (result.ie && result.ie_version <= 11 && $from.parentOffset == 0) {
          view.domObserver.suppressSelectionUpdates();
          setTimeout(function() {
            return selectionToDOM(view);
          }, 20);
        }
        tr = view.state.tr.delete(chFrom, chTo);
        storedMarks = doc2.resolve(change.start).marksAcross(doc2.resolve(change.endA));
      } else if (change.endA == change.endB && ($from1 = doc2.resolve(change.start)) && (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset), $from1.parent.content.cut($from1.parentOffset, change.endA - $from1.start())))) {
        tr = view.state.tr;
        if (markChange.type == "add") {
          tr.addMark(chFrom, chTo, markChange.mark);
        } else {
          tr.removeMark(chFrom, chTo, markChange.mark);
        }
      } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
        var text$1 = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
        if (view.someProp("handleTextInput", function(f) {
          return f(view, chFrom, chTo, text$1);
        })) {
          return;
        }
        tr = view.state.tr.insertText(text$1, chFrom, chTo);
      }
    }
    if (!tr) {
      tr = view.state.tr.replace(chFrom, chTo, parse3.doc.slice(change.start - parse3.from, change.endB - parse3.from));
    }
    if (parse3.sel) {
      var sel$2 = resolveSelection(view, tr.doc, parse3.sel);
      if (sel$2 && !(result.chrome && result.android && view.composing && sel$2.empty && (change.start != change.endB || view.lastAndroidDelete < Date.now() - 100) && (sel$2.head == chFrom || sel$2.head == tr.mapping.map(chTo) - 1) || result.ie && sel$2.empty && sel$2.head == chFrom)) {
        tr.setSelection(sel$2);
      }
    }
    if (storedMarks) {
      tr.ensureMarks(storedMarks);
    }
    view.dispatch(tr.scrollIntoView());
  }
  function resolveSelection(view, doc2, parsedSel) {
    if (Math.max(parsedSel.anchor, parsedSel.head) > doc2.content.size) {
      return null;
    }
    return selectionBetween(view, doc2.resolve(parsedSel.anchor), doc2.resolve(parsedSel.head));
  }
  function isMarkChange(cur, prev) {
    var curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
    var added = curMarks, removed = prevMarks, type, mark3, update3;
    for (var i = 0; i < prevMarks.length; i++) {
      added = prevMarks[i].removeFromSet(added);
    }
    for (var i$1 = 0; i$1 < curMarks.length; i$1++) {
      removed = curMarks[i$1].removeFromSet(removed);
    }
    if (added.length == 1 && removed.length == 0) {
      mark3 = added[0];
      type = "add";
      update3 = function(node4) {
        return node4.mark(mark3.addToSet(node4.marks));
      };
    } else if (added.length == 0 && removed.length == 1) {
      mark3 = removed[0];
      type = "remove";
      update3 = function(node4) {
        return node4.mark(mark3.removeFromSet(node4.marks));
      };
    } else {
      return null;
    }
    var updated = [];
    for (var i$2 = 0; i$2 < prev.childCount; i$2++) {
      updated.push(update3(prev.child(i$2)));
    }
    if (Fragment.from(updated).eq(cur)) {
      return { mark: mark3, type };
    }
  }
  function looksLikeJoin(old, start3, end2, $newStart, $newEnd) {
    if (!$newStart.parent.isTextblock || end2 - start3 <= $newEnd.pos - $newStart.pos || skipClosingAndOpening($newStart, true, false) < $newEnd.pos) {
      return false;
    }
    var $start = old.resolve(start3);
    if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock) {
      return false;
    }
    var $next = old.resolve(skipClosingAndOpening($start, true, true));
    if (!$next.parent.isTextblock || $next.pos > end2 || skipClosingAndOpening($next, true, false) < end2) {
      return false;
    }
    return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content);
  }
  function skipClosingAndOpening($pos, fromEnd, mayOpen) {
    var depth = $pos.depth, end2 = fromEnd ? $pos.end() : $pos.pos;
    while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
      depth--;
      end2++;
      fromEnd = false;
    }
    if (mayOpen) {
      var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
      while (next && !next.isLeaf) {
        next = next.firstChild;
        end2++;
      }
    }
    return end2;
  }
  function findDiff(a, b, pos, preferredPos, preferredSide) {
    var start3 = a.findDiffStart(b, pos);
    if (start3 == null) {
      return null;
    }
    var ref = a.findDiffEnd(b, pos + a.size, pos + b.size);
    var endA = ref.a;
    var endB = ref.b;
    if (preferredSide == "end") {
      var adjust = Math.max(0, start3 - Math.min(endA, endB));
      preferredPos -= endA + adjust - start3;
    }
    if (endA < start3 && a.size < b.size) {
      var move2 = preferredPos <= start3 && preferredPos >= endA ? start3 - preferredPos : 0;
      start3 -= move2;
      endB = start3 + (endB - endA);
      endA = start3;
    } else if (endB < start3) {
      var move$1 = preferredPos <= start3 && preferredPos >= endB ? start3 - preferredPos : 0;
      start3 -= move$1;
      endA = start3 + (endA - endB);
      endB = start3;
    }
    return { start: start3, endA, endB };
  }
  function serializeForClipboard(view, slice4) {
    var context = [];
    var content2 = slice4.content;
    var openStart = slice4.openStart;
    var openEnd = slice4.openEnd;
    while (openStart > 1 && openEnd > 1 && content2.childCount == 1 && content2.firstChild.childCount == 1) {
      openStart--;
      openEnd--;
      var node4 = content2.firstChild;
      context.push(node4.type.name, node4.attrs != node4.type.defaultAttrs ? node4.attrs : null);
      content2 = node4.content;
    }
    var serializer = view.someProp("clipboardSerializer") || DOMSerializer.fromSchema(view.state.schema);
    var doc2 = detachedDoc(), wrap = doc2.createElement("div");
    wrap.appendChild(serializer.serializeFragment(content2, { document: doc2 }));
    var firstChild = wrap.firstChild, needsWrap;
    while (firstChild && firstChild.nodeType == 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
      for (var i = needsWrap.length - 1; i >= 0; i--) {
        var wrapper = doc2.createElement(needsWrap[i]);
        while (wrap.firstChild) {
          wrapper.appendChild(wrap.firstChild);
        }
        wrap.appendChild(wrapper);
        if (needsWrap[i] != "tbody") {
          openStart++;
          openEnd++;
        }
      }
      firstChild = wrap.firstChild;
    }
    if (firstChild && firstChild.nodeType == 1) {
      firstChild.setAttribute("data-pm-slice", openStart + " " + openEnd + " " + JSON.stringify(context));
    }
    var text2 = view.someProp("clipboardTextSerializer", function(f) {
      return f(slice4);
    }) || slice4.content.textBetween(0, slice4.content.size, "\n\n");
    return { dom: wrap, text: text2 };
  }
  function parseFromClipboard(view, text2, html, plainText, $context) {
    var dom, inCode = $context.parent.type.spec.code, slice4;
    if (!html && !text2) {
      return null;
    }
    var asText = text2 && (plainText || inCode || !html);
    if (asText) {
      view.someProp("transformPastedText", function(f) {
        text2 = f(text2, inCode || plainText);
      });
      if (inCode) {
        return text2 ? new Slice(Fragment.from(view.state.schema.text(text2.replace(/\r\n?/g, "\n"))), 0, 0) : Slice.empty;
      }
      var parsed = view.someProp("clipboardTextParser", function(f) {
        return f(text2, $context, plainText);
      });
      if (parsed) {
        slice4 = parsed;
      } else {
        var marks2 = $context.marks();
        var ref = view.state;
        var schema = ref.schema;
        var serializer = DOMSerializer.fromSchema(schema);
        dom = document.createElement("div");
        text2.split(/(?:\r\n?|\n)+/).forEach(function(block) {
          var p = dom.appendChild(document.createElement("p"));
          if (block) {
            p.appendChild(serializer.serializeNode(schema.text(block, marks2)));
          }
        });
      }
    } else {
      view.someProp("transformPastedHTML", function(f) {
        html = f(html);
      });
      dom = readHTML(html);
      if (result.webkit) {
        restoreReplacedSpaces(dom);
      }
    }
    var contextNode = dom && dom.querySelector("[data-pm-slice]");
    var sliceData = contextNode && /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute("data-pm-slice"));
    if (!slice4) {
      var parser = view.someProp("clipboardParser") || view.someProp("domParser") || DOMParser.fromSchema(view.state.schema);
      slice4 = parser.parseSlice(dom, { preserveWhitespace: !!(asText || sliceData), context: $context });
    }
    if (sliceData) {
      slice4 = addContext(closeSlice(slice4, +sliceData[1], +sliceData[2]), sliceData[3]);
    } else {
      slice4 = Slice.maxOpen(normalizeSiblings(slice4.content, $context), true);
      if (slice4.openStart || slice4.openEnd) {
        var openStart = 0, openEnd = 0;
        for (var node4 = slice4.content.firstChild; openStart < slice4.openStart && !node4.type.spec.isolating; openStart++, node4 = node4.firstChild) {
        }
        for (var node$1 = slice4.content.lastChild; openEnd < slice4.openEnd && !node$1.type.spec.isolating; openEnd++, node$1 = node$1.lastChild) {
        }
        slice4 = closeSlice(slice4, openStart, openEnd);
      }
    }
    view.someProp("transformPasted", function(f) {
      slice4 = f(slice4);
    });
    return slice4;
  }
  function normalizeSiblings(fragment, $context) {
    if (fragment.childCount < 2) {
      return fragment;
    }
    var loop = function(d2) {
      var parent = $context.node(d2);
      var match = parent.contentMatchAt($context.index(d2));
      var lastWrap = void 0, result2 = [];
      fragment.forEach(function(node4) {
        if (!result2) {
          return;
        }
        var wrap = match.findWrapping(node4.type), inLast;
        if (!wrap) {
          return result2 = null;
        }
        if (inLast = result2.length && lastWrap.length && addToSibling(wrap, lastWrap, node4, result2[result2.length - 1], 0)) {
          result2[result2.length - 1] = inLast;
        } else {
          if (result2.length) {
            result2[result2.length - 1] = closeRight(result2[result2.length - 1], lastWrap.length);
          }
          var wrapped = withWrappers(node4, wrap);
          result2.push(wrapped);
          match = match.matchType(wrapped.type, wrapped.attrs);
          lastWrap = wrap;
        }
      });
      if (result2) {
        return { v: Fragment.from(result2) };
      }
    };
    for (var d = $context.depth; d >= 0; d--) {
      var returned = loop(d);
      if (returned)
        return returned.v;
    }
    return fragment;
  }
  function withWrappers(node4, wrap, from4) {
    if (from4 === void 0)
      from4 = 0;
    for (var i = wrap.length - 1; i >= from4; i--) {
      node4 = wrap[i].create(null, Fragment.from(node4));
    }
    return node4;
  }
  function addToSibling(wrap, lastWrap, node4, sibling, depth) {
    if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
      var inner = addToSibling(wrap, lastWrap, node4, sibling.lastChild, depth + 1);
      if (inner) {
        return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
      }
      var match = sibling.contentMatchAt(sibling.childCount);
      if (match.matchType(depth == wrap.length - 1 ? node4.type : wrap[depth + 1])) {
        return sibling.copy(sibling.content.append(Fragment.from(withWrappers(node4, wrap, depth + 1))));
      }
    }
  }
  function closeRight(node4, depth) {
    if (depth == 0) {
      return node4;
    }
    var fragment = node4.content.replaceChild(node4.childCount - 1, closeRight(node4.lastChild, depth - 1));
    var fill = node4.contentMatchAt(node4.childCount).fillBefore(Fragment.empty, true);
    return node4.copy(fragment.append(fill));
  }
  function closeRange(fragment, side, from4, to, depth, openEnd) {
    var node4 = side < 0 ? fragment.firstChild : fragment.lastChild, inner = node4.content;
    if (depth < to - 1) {
      inner = closeRange(inner, side, from4, to, depth + 1, openEnd);
    }
    if (depth >= from4) {
      inner = side < 0 ? node4.contentMatchAt(0).fillBefore(inner, fragment.childCount > 1 || openEnd <= depth).append(inner) : inner.append(node4.contentMatchAt(node4.childCount).fillBefore(Fragment.empty, true));
    }
    return fragment.replaceChild(side < 0 ? 0 : fragment.childCount - 1, node4.copy(inner));
  }
  function closeSlice(slice4, openStart, openEnd) {
    if (openStart < slice4.openStart) {
      slice4 = new Slice(closeRange(slice4.content, -1, openStart, slice4.openStart, 0, slice4.openEnd), openStart, slice4.openEnd);
    }
    if (openEnd < slice4.openEnd) {
      slice4 = new Slice(closeRange(slice4.content, 1, openEnd, slice4.openEnd, 0, 0), slice4.openStart, openEnd);
    }
    return slice4;
  }
  var wrapMap = {
    thead: ["table"],
    tbody: ["table"],
    tfoot: ["table"],
    caption: ["table"],
    colgroup: ["table"],
    col: ["table", "colgroup"],
    tr: ["table", "tbody"],
    td: ["table", "tbody", "tr"],
    th: ["table", "tbody", "tr"]
  };
  var _detachedDoc = null;
  function detachedDoc() {
    return _detachedDoc || (_detachedDoc = document.implementation.createHTMLDocument("title"));
  }
  function readHTML(html) {
    var metas = /^(\s*<meta [^>]*>)*/.exec(html);
    if (metas) {
      html = html.slice(metas[0].length);
    }
    var elt = detachedDoc().createElement("div");
    var firstTag = /<([a-z][^>\s]+)/i.exec(html), wrap;
    if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
      html = wrap.map(function(n) {
        return "<" + n + ">";
      }).join("") + html + wrap.map(function(n) {
        return "</" + n + ">";
      }).reverse().join("");
    }
    elt.innerHTML = html;
    if (wrap) {
      for (var i = 0; i < wrap.length; i++) {
        elt = elt.querySelector(wrap[i]) || elt;
      }
    }
    return elt;
  }
  function restoreReplacedSpaces(dom) {
    var nodes = dom.querySelectorAll(result.chrome ? "span:not([class]):not([style])" : "span.Apple-converted-space");
    for (var i = 0; i < nodes.length; i++) {
      var node4 = nodes[i];
      if (node4.childNodes.length == 1 && node4.textContent == "\xA0" && node4.parentNode) {
        node4.parentNode.replaceChild(dom.ownerDocument.createTextNode(" "), node4);
      }
    }
  }
  function addContext(slice4, context) {
    if (!slice4.size) {
      return slice4;
    }
    var schema = slice4.content.firstChild.type.schema, array;
    try {
      array = JSON.parse(context);
    } catch (e) {
      return slice4;
    }
    var content2 = slice4.content;
    var openStart = slice4.openStart;
    var openEnd = slice4.openEnd;
    for (var i = array.length - 2; i >= 0; i -= 2) {
      var type = schema.nodes[array[i]];
      if (!type || type.hasRequiredAttrs()) {
        break;
      }
      content2 = Fragment.from(type.create(array[i + 1], content2));
      openStart++;
      openEnd++;
    }
    return new Slice(content2, openStart, openEnd);
  }
  var observeOptions = {
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    attributes: true,
    attributeOldValue: true,
    subtree: true
  };
  var useCharData = result.ie && result.ie_version <= 11;
  var SelectionState = function SelectionState2() {
    this.anchorNode = this.anchorOffset = this.focusNode = this.focusOffset = null;
  };
  SelectionState.prototype.set = function set(sel) {
    this.anchorNode = sel.anchorNode;
    this.anchorOffset = sel.anchorOffset;
    this.focusNode = sel.focusNode;
    this.focusOffset = sel.focusOffset;
  };
  SelectionState.prototype.eq = function eq5(sel) {
    return sel.anchorNode == this.anchorNode && sel.anchorOffset == this.anchorOffset && sel.focusNode == this.focusNode && sel.focusOffset == this.focusOffset;
  };
  var DOMObserver = function DOMObserver2(view, handleDOMChange) {
    var this$1 = this;
    this.view = view;
    this.handleDOMChange = handleDOMChange;
    this.queue = [];
    this.flushingSoon = -1;
    this.observer = window.MutationObserver && new window.MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        this$1.queue.push(mutations[i]);
      }
      if (result.ie && result.ie_version <= 11 && mutations.some(function(m) {
        return m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length;
      })) {
        this$1.flushSoon();
      } else {
        this$1.flush();
      }
    });
    this.currentSelection = new SelectionState();
    if (useCharData) {
      this.onCharData = function(e) {
        this$1.queue.push({ target: e.target, type: "characterData", oldValue: e.prevValue });
        this$1.flushSoon();
      };
    }
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.suppressingSelectionUpdates = false;
  };
  DOMObserver.prototype.flushSoon = function flushSoon() {
    var this$1 = this;
    if (this.flushingSoon < 0) {
      this.flushingSoon = window.setTimeout(function() {
        this$1.flushingSoon = -1;
        this$1.flush();
      }, 20);
    }
  };
  DOMObserver.prototype.forceFlush = function forceFlush() {
    if (this.flushingSoon > -1) {
      window.clearTimeout(this.flushingSoon);
      this.flushingSoon = -1;
      this.flush();
    }
  };
  DOMObserver.prototype.start = function start2() {
    if (this.observer) {
      this.observer.observe(this.view.dom, observeOptions);
    }
    if (useCharData) {
      this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
    }
    this.connectSelection();
  };
  DOMObserver.prototype.stop = function stop() {
    var this$1 = this;
    if (this.observer) {
      var take = this.observer.takeRecords();
      if (take.length) {
        for (var i = 0; i < take.length; i++) {
          this.queue.push(take[i]);
        }
        window.setTimeout(function() {
          return this$1.flush();
        }, 20);
      }
      this.observer.disconnect();
    }
    if (useCharData) {
      this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
    }
    this.disconnectSelection();
  };
  DOMObserver.prototype.connectSelection = function connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  };
  DOMObserver.prototype.disconnectSelection = function disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  };
  DOMObserver.prototype.suppressSelectionUpdates = function suppressSelectionUpdates() {
    var this$1 = this;
    this.suppressingSelectionUpdates = true;
    setTimeout(function() {
      return this$1.suppressingSelectionUpdates = false;
    }, 50);
  };
  DOMObserver.prototype.onSelectionChange = function onSelectionChange() {
    if (!hasFocusAndSelection(this.view)) {
      return;
    }
    if (this.suppressingSelectionUpdates) {
      return selectionToDOM(this.view);
    }
    if (result.ie && result.ie_version <= 11 && !this.view.state.selection.empty) {
      var sel = this.view.root.getSelection();
      if (sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) {
        return this.flushSoon();
      }
    }
    this.flush();
  };
  DOMObserver.prototype.setCurSelection = function setCurSelection() {
    this.currentSelection.set(this.view.root.getSelection());
  };
  DOMObserver.prototype.ignoreSelectionChange = function ignoreSelectionChange(sel) {
    if (sel.rangeCount == 0) {
      return true;
    }
    var container = sel.getRangeAt(0).commonAncestorContainer;
    var desc = this.view.docView.nearestDesc(container);
    if (desc && desc.ignoreMutation({ type: "selection", target: container.nodeType == 3 ? container.parentNode : container })) {
      this.setCurSelection();
      return true;
    }
  };
  DOMObserver.prototype.flush = function flush() {
    if (!this.view.docView || this.flushingSoon > -1) {
      return;
    }
    var mutations = this.observer ? this.observer.takeRecords() : [];
    if (this.queue.length) {
      mutations = this.queue.concat(mutations);
      this.queue.length = 0;
    }
    var sel = this.view.root.getSelection();
    var newSel = !this.suppressingSelectionUpdates && !this.currentSelection.eq(sel) && hasSelection(this.view) && !this.ignoreSelectionChange(sel);
    var from4 = -1, to = -1, typeOver = false, added = [];
    if (this.view.editable) {
      for (var i = 0; i < mutations.length; i++) {
        var result$1 = this.registerMutation(mutations[i], added);
        if (result$1) {
          from4 = from4 < 0 ? result$1.from : Math.min(result$1.from, from4);
          to = to < 0 ? result$1.to : Math.max(result$1.to, to);
          if (result$1.typeOver) {
            typeOver = true;
          }
        }
      }
    }
    if (result.gecko && added.length > 1) {
      var brs = added.filter(function(n) {
        return n.nodeName == "BR";
      });
      if (brs.length == 2) {
        var a = brs[0];
        var b = brs[1];
        if (a.parentNode && a.parentNode.parentNode == b.parentNode) {
          b.remove();
        } else {
          a.remove();
        }
      }
    }
    if (from4 > -1 || newSel) {
      if (from4 > -1) {
        this.view.docView.markDirty(from4, to);
        checkCSS(this.view);
      }
      this.handleDOMChange(from4, to, typeOver, added);
      if (this.view.docView.dirty) {
        this.view.updateState(this.view.state);
      } else if (!this.currentSelection.eq(sel)) {
        selectionToDOM(this.view);
      }
      this.currentSelection.set(sel);
    }
  };
  DOMObserver.prototype.registerMutation = function registerMutation(mut, added) {
    if (added.indexOf(mut.target) > -1) {
      return null;
    }
    var desc = this.view.docView.nearestDesc(mut.target);
    if (mut.type == "attributes" && (desc == this.view.docView || mut.attributeName == "contenteditable" || mut.attributeName == "style" && !mut.oldValue && !mut.target.getAttribute("style"))) {
      return null;
    }
    if (!desc || desc.ignoreMutation(mut)) {
      return null;
    }
    if (mut.type == "childList") {
      for (var i = 0; i < mut.addedNodes.length; i++) {
        added.push(mut.addedNodes[i]);
      }
      if (desc.contentDOM && desc.contentDOM != desc.dom && !desc.contentDOM.contains(mut.target)) {
        return { from: desc.posBefore, to: desc.posAfter };
      }
      var prev = mut.previousSibling, next = mut.nextSibling;
      if (result.ie && result.ie_version <= 11 && mut.addedNodes.length) {
        for (var i$1 = 0; i$1 < mut.addedNodes.length; i$1++) {
          var ref = mut.addedNodes[i$1];
          var previousSibling = ref.previousSibling;
          var nextSibling = ref.nextSibling;
          if (!previousSibling || Array.prototype.indexOf.call(mut.addedNodes, previousSibling) < 0) {
            prev = previousSibling;
          }
          if (!nextSibling || Array.prototype.indexOf.call(mut.addedNodes, nextSibling) < 0) {
            next = nextSibling;
          }
        }
      }
      var fromOffset = prev && prev.parentNode == mut.target ? domIndex(prev) + 1 : 0;
      var from4 = desc.localPosFromDOM(mut.target, fromOffset, -1);
      var toOffset = next && next.parentNode == mut.target ? domIndex(next) : mut.target.childNodes.length;
      var to = desc.localPosFromDOM(mut.target, toOffset, 1);
      return { from: from4, to };
    } else if (mut.type == "attributes") {
      return { from: desc.posAtStart - desc.border, to: desc.posAtEnd + desc.border };
    } else {
      return {
        from: desc.posAtStart,
        to: desc.posAtEnd,
        typeOver: mut.target.nodeValue == mut.oldValue
      };
    }
  };
  var cssChecked = false;
  function checkCSS(view) {
    if (cssChecked) {
      return;
    }
    cssChecked = true;
    if (getComputedStyle(view.dom).whiteSpace == "normal") {
      console["warn"]("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.");
    }
  }
  var handlers = {};
  var editHandlers = {};
  function initInput(view) {
    view.shiftKey = false;
    view.mouseDown = null;
    view.lastKeyCode = null;
    view.lastKeyCodeTime = 0;
    view.lastClick = { time: 0, x: 0, y: 0, type: "" };
    view.lastSelectionOrigin = null;
    view.lastSelectionTime = 0;
    view.lastIOSEnter = 0;
    view.lastIOSEnterFallbackTimeout = null;
    view.lastAndroidDelete = 0;
    view.composing = false;
    view.composingTimeout = null;
    view.compositionNodes = [];
    view.compositionEndedAt = -2e8;
    view.domObserver = new DOMObserver(view, function(from4, to, typeOver, added) {
      return readDOMChange(view, from4, to, typeOver, added);
    });
    view.domObserver.start();
    view.domChangeCount = 0;
    view.eventHandlers = Object.create(null);
    var loop = function(event2) {
      var handler = handlers[event2];
      view.dom.addEventListener(event2, view.eventHandlers[event2] = function(event3) {
        if (eventBelongsToView(view, event3) && !runCustomHandler(view, event3) && (view.editable || !(event3.type in editHandlers))) {
          handler(view, event3);
        }
      });
    };
    for (var event in handlers)
      loop(event);
    if (result.safari) {
      view.dom.addEventListener("input", function() {
        return null;
      });
    }
    ensureListeners(view);
  }
  function setSelectionOrigin(view, origin) {
    view.lastSelectionOrigin = origin;
    view.lastSelectionTime = Date.now();
  }
  function destroyInput(view) {
    view.domObserver.stop();
    for (var type in view.eventHandlers) {
      view.dom.removeEventListener(type, view.eventHandlers[type]);
    }
    clearTimeout(view.composingTimeout);
    clearTimeout(view.lastIOSEnterFallbackTimeout);
  }
  function ensureListeners(view) {
    view.someProp("handleDOMEvents", function(currentHandlers) {
      for (var type in currentHandlers) {
        if (!view.eventHandlers[type]) {
          view.dom.addEventListener(type, view.eventHandlers[type] = function(event) {
            return runCustomHandler(view, event);
          });
        }
      }
    });
  }
  function runCustomHandler(view, event) {
    return view.someProp("handleDOMEvents", function(handlers2) {
      var handler = handlers2[event.type];
      return handler ? handler(view, event) || event.defaultPrevented : false;
    });
  }
  function eventBelongsToView(view, event) {
    if (!event.bubbles) {
      return true;
    }
    if (event.defaultPrevented) {
      return false;
    }
    for (var node4 = event.target; node4 != view.dom; node4 = node4.parentNode) {
      if (!node4 || node4.nodeType == 11 || node4.pmViewDesc && node4.pmViewDesc.stopEvent(event)) {
        return false;
      }
    }
    return true;
  }
  function dispatchEvent(view, event) {
    if (!runCustomHandler(view, event) && handlers[event.type] && (view.editable || !(event.type in editHandlers))) {
      handlers[event.type](view, event);
    }
  }
  editHandlers.keydown = function(view, event) {
    view.shiftKey = event.keyCode == 16 || event.shiftKey;
    if (inOrNearComposition(view, event)) {
      return;
    }
    if (event.keyCode != 229) {
      view.domObserver.forceFlush();
    }
    view.lastKeyCode = event.keyCode;
    view.lastKeyCodeTime = Date.now();
    if (result.ios && event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      var now = Date.now();
      view.lastIOSEnter = now;
      view.lastIOSEnterFallbackTimeout = setTimeout(function() {
        if (view.lastIOSEnter == now) {
          view.someProp("handleKeyDown", function(f) {
            return f(view, keyEvent(13, "Enter"));
          });
          view.lastIOSEnter = 0;
        }
      }, 200);
    } else if (view.someProp("handleKeyDown", function(f) {
      return f(view, event);
    }) || captureKeyDown(view, event)) {
      event.preventDefault();
    } else {
      setSelectionOrigin(view, "key");
    }
  };
  editHandlers.keyup = function(view, e) {
    if (e.keyCode == 16) {
      view.shiftKey = false;
    }
  };
  editHandlers.keypress = function(view, event) {
    if (inOrNearComposition(view, event) || !event.charCode || event.ctrlKey && !event.altKey || result.mac && event.metaKey) {
      return;
    }
    if (view.someProp("handleKeyPress", function(f) {
      return f(view, event);
    })) {
      event.preventDefault();
      return;
    }
    var sel = view.state.selection;
    if (!(sel instanceof TextSelection) || !sel.$from.sameParent(sel.$to)) {
      var text2 = String.fromCharCode(event.charCode);
      if (!view.someProp("handleTextInput", function(f) {
        return f(view, sel.$from.pos, sel.$to.pos, text2);
      })) {
        view.dispatch(view.state.tr.insertText(text2).scrollIntoView());
      }
      event.preventDefault();
    }
  };
  function eventCoords(event) {
    return { left: event.clientX, top: event.clientY };
  }
  function isNear(event, click) {
    var dx = click.x - event.clientX, dy = click.y - event.clientY;
    return dx * dx + dy * dy < 100;
  }
  function runHandlerOnContext(view, propName, pos, inside, event) {
    if (inside == -1) {
      return false;
    }
    var $pos = view.state.doc.resolve(inside);
    var loop = function(i2) {
      if (view.someProp(propName, function(f) {
        return i2 > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i2), event, true) : f(view, pos, $pos.node(i2), $pos.before(i2), event, false);
      })) {
        return { v: true };
      }
    };
    for (var i = $pos.depth + 1; i > 0; i--) {
      var returned = loop(i);
      if (returned)
        return returned.v;
    }
    return false;
  }
  function updateSelection(view, selection, origin) {
    if (!view.focused) {
      view.focus();
    }
    var tr = view.state.tr.setSelection(selection);
    if (origin == "pointer") {
      tr.setMeta("pointer", true);
    }
    view.dispatch(tr);
  }
  function selectClickedLeaf(view, inside) {
    if (inside == -1) {
      return false;
    }
    var $pos = view.state.doc.resolve(inside), node4 = $pos.nodeAfter;
    if (node4 && node4.isAtom && NodeSelection.isSelectable(node4)) {
      updateSelection(view, new NodeSelection($pos), "pointer");
      return true;
    }
    return false;
  }
  function selectClickedNode(view, inside) {
    if (inside == -1) {
      return false;
    }
    var sel = view.state.selection, selectedNode, selectAt;
    if (sel instanceof NodeSelection) {
      selectedNode = sel.node;
    }
    var $pos = view.state.doc.resolve(inside);
    for (var i = $pos.depth + 1; i > 0; i--) {
      var node4 = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
      if (NodeSelection.isSelectable(node4)) {
        if (selectedNode && sel.$from.depth > 0 && i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos) {
          selectAt = $pos.before(sel.$from.depth);
        } else {
          selectAt = $pos.before(i);
        }
        break;
      }
    }
    if (selectAt != null) {
      updateSelection(view, NodeSelection.create(view.state.doc, selectAt), "pointer");
      return true;
    } else {
      return false;
    }
  }
  function handleSingleClick(view, pos, inside, event, selectNode) {
    return runHandlerOnContext(view, "handleClickOn", pos, inside, event) || view.someProp("handleClick", function(f) {
      return f(view, pos, event);
    }) || (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside));
  }
  function handleDoubleClick(view, pos, inside, event) {
    return runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) || view.someProp("handleDoubleClick", function(f) {
      return f(view, pos, event);
    });
  }
  function handleTripleClick(view, pos, inside, event) {
    return runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) || view.someProp("handleTripleClick", function(f) {
      return f(view, pos, event);
    }) || defaultTripleClick(view, inside, event);
  }
  function defaultTripleClick(view, inside, event) {
    if (event.button != 0) {
      return false;
    }
    var doc2 = view.state.doc;
    if (inside == -1) {
      if (doc2.inlineContent) {
        updateSelection(view, TextSelection.create(doc2, 0, doc2.content.size), "pointer");
        return true;
      }
      return false;
    }
    var $pos = doc2.resolve(inside);
    for (var i = $pos.depth + 1; i > 0; i--) {
      var node4 = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
      var nodePos = $pos.before(i);
      if (node4.inlineContent) {
        updateSelection(view, TextSelection.create(doc2, nodePos + 1, nodePos + 1 + node4.content.size), "pointer");
      } else if (NodeSelection.isSelectable(node4)) {
        updateSelection(view, NodeSelection.create(doc2, nodePos), "pointer");
      } else {
        continue;
      }
      return true;
    }
  }
  function forceDOMFlush(view) {
    return endComposition(view);
  }
  var selectNodeModifier = result.mac ? "metaKey" : "ctrlKey";
  handlers.mousedown = function(view, event) {
    view.shiftKey = event.shiftKey;
    var flushed = forceDOMFlush(view);
    var now = Date.now(), type = "singleClick";
    if (now - view.lastClick.time < 500 && isNear(event, view.lastClick) && !event[selectNodeModifier]) {
      if (view.lastClick.type == "singleClick") {
        type = "doubleClick";
      } else if (view.lastClick.type == "doubleClick") {
        type = "tripleClick";
      }
    }
    view.lastClick = { time: now, x: event.clientX, y: event.clientY, type };
    var pos = view.posAtCoords(eventCoords(event));
    if (!pos) {
      return;
    }
    if (type == "singleClick") {
      if (view.mouseDown) {
        view.mouseDown.done();
      }
      view.mouseDown = new MouseDown(view, pos, event, flushed);
    } else if ((type == "doubleClick" ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event)) {
      event.preventDefault();
    } else {
      setSelectionOrigin(view, "pointer");
    }
  };
  var MouseDown = function MouseDown2(view, pos, event, flushed) {
    var this$1 = this;
    this.view = view;
    this.startDoc = view.state.doc;
    this.pos = pos;
    this.event = event;
    this.flushed = flushed;
    this.selectNode = event[selectNodeModifier];
    this.allowDefault = event.shiftKey;
    this.delayedSelectionSync = false;
    var targetNode, targetPos;
    if (pos.inside > -1) {
      targetNode = view.state.doc.nodeAt(pos.inside);
      targetPos = pos.inside;
    } else {
      var $pos = view.state.doc.resolve(pos.pos);
      targetNode = $pos.parent;
      targetPos = $pos.depth ? $pos.before() : 0;
    }
    this.mightDrag = null;
    var target = flushed ? null : event.target;
    var targetDesc = target ? view.docView.nearestDesc(target, true) : null;
    this.target = targetDesc ? targetDesc.dom : null;
    var ref = view.state;
    var selection = ref.selection;
    if (event.button == 0 && targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false || selection instanceof NodeSelection && selection.from <= targetPos && selection.to > targetPos) {
      this.mightDrag = {
        node: targetNode,
        pos: targetPos,
        addAttr: this.target && !this.target.draggable,
        setUneditable: this.target && result.gecko && !this.target.hasAttribute("contentEditable")
      };
    }
    if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
      this.view.domObserver.stop();
      if (this.mightDrag.addAttr) {
        this.target.draggable = true;
      }
      if (this.mightDrag.setUneditable) {
        setTimeout(function() {
          if (this$1.view.mouseDown == this$1) {
            this$1.target.setAttribute("contentEditable", "false");
          }
        }, 20);
      }
      this.view.domObserver.start();
    }
    view.root.addEventListener("mouseup", this.up = this.up.bind(this));
    view.root.addEventListener("mousemove", this.move = this.move.bind(this));
    setSelectionOrigin(view, "pointer");
  };
  MouseDown.prototype.done = function done() {
    var this$1 = this;
    this.view.root.removeEventListener("mouseup", this.up);
    this.view.root.removeEventListener("mousemove", this.move);
    if (this.mightDrag && this.target) {
      this.view.domObserver.stop();
      if (this.mightDrag.addAttr) {
        this.target.removeAttribute("draggable");
      }
      if (this.mightDrag.setUneditable) {
        this.target.removeAttribute("contentEditable");
      }
      this.view.domObserver.start();
    }
    if (this.delayedSelectionSync) {
      setTimeout(function() {
        return selectionToDOM(this$1.view);
      });
    }
    this.view.mouseDown = null;
  };
  MouseDown.prototype.up = function up(event) {
    this.done();
    if (!this.view.dom.contains(event.target.nodeType == 3 ? event.target.parentNode : event.target)) {
      return;
    }
    var pos = this.pos;
    if (this.view.state.doc != this.startDoc) {
      pos = this.view.posAtCoords(eventCoords(event));
    }
    if (this.allowDefault || !pos) {
      setSelectionOrigin(this.view, "pointer");
    } else if (handleSingleClick(this.view, pos.pos, pos.inside, event, this.selectNode)) {
      event.preventDefault();
    } else if (event.button == 0 && (this.flushed || result.safari && this.mightDrag && !this.mightDrag.node.isAtom || result.chrome && !(this.view.state.selection instanceof TextSelection) && Math.min(Math.abs(pos.pos - this.view.state.selection.from), Math.abs(pos.pos - this.view.state.selection.to)) <= 2)) {
      updateSelection(this.view, Selection.near(this.view.state.doc.resolve(pos.pos)), "pointer");
      event.preventDefault();
    } else {
      setSelectionOrigin(this.view, "pointer");
    }
  };
  MouseDown.prototype.move = function move(event) {
    if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 || Math.abs(this.event.y - event.clientY) > 4)) {
      this.allowDefault = true;
    }
    setSelectionOrigin(this.view, "pointer");
    if (event.buttons == 0) {
      this.done();
    }
  };
  handlers.touchdown = function(view) {
    forceDOMFlush(view);
    setSelectionOrigin(view, "pointer");
  };
  handlers.contextmenu = function(view) {
    return forceDOMFlush(view);
  };
  function inOrNearComposition(view, event) {
    if (view.composing) {
      return true;
    }
    if (result.safari && Math.abs(event.timeStamp - view.compositionEndedAt) < 500) {
      view.compositionEndedAt = -2e8;
      return true;
    }
    return false;
  }
  var timeoutComposition = result.android ? 5e3 : -1;
  editHandlers.compositionstart = editHandlers.compositionupdate = function(view) {
    if (!view.composing) {
      view.domObserver.flush();
      var state = view.state;
      var $pos = state.selection.$from;
      if (state.selection.empty && (state.storedMarks || !$pos.textOffset && $pos.parentOffset && $pos.nodeBefore.marks.some(function(m) {
        return m.type.spec.inclusive === false;
      }))) {
        view.markCursor = view.state.storedMarks || $pos.marks();
        endComposition(view, true);
        view.markCursor = null;
      } else {
        endComposition(view);
        if (result.gecko && state.selection.empty && $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.length) {
          var sel = view.root.getSelection();
          for (var node4 = sel.focusNode, offset2 = sel.focusOffset; node4 && node4.nodeType == 1 && offset2 != 0; ) {
            var before2 = offset2 < 0 ? node4.lastChild : node4.childNodes[offset2 - 1];
            if (!before2) {
              break;
            }
            if (before2.nodeType == 3) {
              sel.collapse(before2, before2.nodeValue.length);
              break;
            } else {
              node4 = before2;
              offset2 = -1;
            }
          }
        }
      }
      view.composing = true;
    }
    scheduleComposeEnd(view, timeoutComposition);
  };
  editHandlers.compositionend = function(view, event) {
    if (view.composing) {
      view.composing = false;
      view.compositionEndedAt = event.timeStamp;
      scheduleComposeEnd(view, 20);
    }
  };
  function scheduleComposeEnd(view, delay) {
    clearTimeout(view.composingTimeout);
    if (delay > -1) {
      view.composingTimeout = setTimeout(function() {
        return endComposition(view);
      }, delay);
    }
  }
  function clearComposition(view) {
    if (view.composing) {
      view.composing = false;
      view.compositionEndedAt = timestampFromCustomEvent();
    }
    while (view.compositionNodes.length > 0) {
      view.compositionNodes.pop().markParentsDirty();
    }
  }
  function timestampFromCustomEvent() {
    var event = document.createEvent("Event");
    event.initEvent("event", true, true);
    return event.timeStamp;
  }
  function endComposition(view, forceUpdate) {
    view.domObserver.forceFlush();
    clearComposition(view);
    if (forceUpdate || view.docView.dirty) {
      var sel = selectionFromDOM(view);
      if (sel && !sel.eq(view.state.selection)) {
        view.dispatch(view.state.tr.setSelection(sel));
      } else {
        view.updateState(view.state);
      }
      return true;
    }
    return false;
  }
  function captureCopy(view, dom) {
    if (!view.dom.parentNode) {
      return;
    }
    var wrap = view.dom.parentNode.appendChild(document.createElement("div"));
    wrap.appendChild(dom);
    wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
    var sel = getSelection(), range = document.createRange();
    range.selectNodeContents(dom);
    view.dom.blur();
    sel.removeAllRanges();
    sel.addRange(range);
    setTimeout(function() {
      if (wrap.parentNode) {
        wrap.parentNode.removeChild(wrap);
      }
      view.focus();
    }, 50);
  }
  var brokenClipboardAPI = result.ie && result.ie_version < 15 || result.ios && result.webkit_version < 604;
  handlers.copy = editHandlers.cut = function(view, e) {
    var sel = view.state.selection, cut3 = e.type == "cut";
    if (sel.empty) {
      return;
    }
    var data = brokenClipboardAPI ? null : e.clipboardData;
    var slice4 = sel.content();
    var ref = serializeForClipboard(view, slice4);
    var dom = ref.dom;
    var text2 = ref.text;
    if (data) {
      e.preventDefault();
      data.clearData();
      data.setData("text/html", dom.innerHTML);
      data.setData("text/plain", text2);
    } else {
      captureCopy(view, dom);
    }
    if (cut3) {
      view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
    }
  };
  function sliceSingleNode(slice4) {
    return slice4.openStart == 0 && slice4.openEnd == 0 && slice4.content.childCount == 1 ? slice4.content.firstChild : null;
  }
  function capturePaste(view, e) {
    if (!view.dom.parentNode) {
      return;
    }
    var plainText = view.shiftKey || view.state.selection.$from.parent.type.spec.code;
    var target = view.dom.parentNode.appendChild(document.createElement(plainText ? "textarea" : "div"));
    if (!plainText) {
      target.contentEditable = "true";
    }
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.focus();
    setTimeout(function() {
      view.focus();
      if (target.parentNode) {
        target.parentNode.removeChild(target);
      }
      if (plainText) {
        doPaste(view, target.value, null, e);
      } else {
        doPaste(view, target.textContent, target.innerHTML, e);
      }
    }, 50);
  }
  function doPaste(view, text2, html, e) {
    var slice4 = parseFromClipboard(view, text2, html, view.shiftKey, view.state.selection.$from);
    if (view.someProp("handlePaste", function(f) {
      return f(view, e, slice4 || Slice.empty);
    })) {
      return true;
    }
    if (!slice4) {
      return false;
    }
    var singleNode = sliceSingleNode(slice4);
    var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, view.shiftKey) : view.state.tr.replaceSelection(slice4);
    view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"));
    return true;
  }
  editHandlers.paste = function(view, e) {
    var data = brokenClipboardAPI ? null : e.clipboardData;
    if (data && doPaste(view, data.getData("text/plain"), data.getData("text/html"), e)) {
      e.preventDefault();
    } else {
      capturePaste(view, e);
    }
  };
  var Dragging = function Dragging2(slice4, move2) {
    this.slice = slice4;
    this.move = move2;
  };
  var dragCopyModifier = result.mac ? "altKey" : "ctrlKey";
  handlers.dragstart = function(view, e) {
    var mouseDown = view.mouseDown;
    if (mouseDown) {
      mouseDown.done();
    }
    if (!e.dataTransfer) {
      return;
    }
    var sel = view.state.selection;
    var pos = sel.empty ? null : view.posAtCoords(eventCoords(e));
    if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof NodeSelection ? sel.to - 1 : sel.to))
      ;
    else if (mouseDown && mouseDown.mightDrag) {
      view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, mouseDown.mightDrag.pos)));
    } else if (e.target && e.target.nodeType == 1) {
      var desc = view.docView.nearestDesc(e.target, true);
      if (desc && desc.node.type.spec.draggable && desc != view.docView) {
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, desc.posBefore)));
      }
    }
    var slice4 = view.state.selection.content();
    var ref = serializeForClipboard(view, slice4);
    var dom = ref.dom;
    var text2 = ref.text;
    e.dataTransfer.clearData();
    e.dataTransfer.setData(brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
    e.dataTransfer.effectAllowed = "copyMove";
    if (!brokenClipboardAPI) {
      e.dataTransfer.setData("text/plain", text2);
    }
    view.dragging = new Dragging(slice4, !e[dragCopyModifier]);
  };
  handlers.dragend = function(view) {
    var dragging = view.dragging;
    window.setTimeout(function() {
      if (view.dragging == dragging) {
        view.dragging = null;
      }
    }, 50);
  };
  editHandlers.dragover = editHandlers.dragenter = function(_, e) {
    return e.preventDefault();
  };
  editHandlers.drop = function(view, e) {
    var dragging = view.dragging;
    view.dragging = null;
    if (!e.dataTransfer) {
      return;
    }
    var eventPos = view.posAtCoords(eventCoords(e));
    if (!eventPos) {
      return;
    }
    var $mouse = view.state.doc.resolve(eventPos.pos);
    if (!$mouse) {
      return;
    }
    var slice4 = dragging && dragging.slice;
    if (slice4) {
      view.someProp("transformPasted", function(f) {
        slice4 = f(slice4);
      });
    } else {
      slice4 = parseFromClipboard(view, e.dataTransfer.getData(brokenClipboardAPI ? "Text" : "text/plain"), brokenClipboardAPI ? null : e.dataTransfer.getData("text/html"), false, $mouse);
    }
    var move2 = dragging && !e[dragCopyModifier];
    if (view.someProp("handleDrop", function(f) {
      return f(view, e, slice4 || Slice.empty, move2);
    })) {
      e.preventDefault();
      return;
    }
    if (!slice4) {
      return;
    }
    e.preventDefault();
    var insertPos = slice4 ? dropPoint(view.state.doc, $mouse.pos, slice4) : $mouse.pos;
    if (insertPos == null) {
      insertPos = $mouse.pos;
    }
    var tr = view.state.tr;
    if (move2) {
      tr.deleteSelection();
    }
    var pos = tr.mapping.map(insertPos);
    var isNode = slice4.openStart == 0 && slice4.openEnd == 0 && slice4.content.childCount == 1;
    var beforeInsert = tr.doc;
    if (isNode) {
      tr.replaceRangeWith(pos, pos, slice4.content.firstChild);
    } else {
      tr.replaceRange(pos, pos, slice4);
    }
    if (tr.doc.eq(beforeInsert)) {
      return;
    }
    var $pos = tr.doc.resolve(pos);
    if (isNode && NodeSelection.isSelectable(slice4.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice4.content.firstChild)) {
      tr.setSelection(new NodeSelection($pos));
    } else {
      var end2 = tr.mapping.map(insertPos);
      tr.mapping.maps[tr.mapping.maps.length - 1].forEach(function(_from, _to, _newFrom, newTo) {
        return end2 = newTo;
      });
      tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end2)));
    }
    view.focus();
    view.dispatch(tr.setMeta("uiEvent", "drop"));
  };
  handlers.focus = function(view) {
    if (!view.focused) {
      view.domObserver.stop();
      view.dom.classList.add("ProseMirror-focused");
      view.domObserver.start();
      view.focused = true;
      setTimeout(function() {
        if (view.docView && view.hasFocus() && !view.domObserver.currentSelection.eq(view.root.getSelection())) {
          selectionToDOM(view);
        }
      }, 20);
    }
  };
  handlers.blur = function(view, e) {
    if (view.focused) {
      view.domObserver.stop();
      view.dom.classList.remove("ProseMirror-focused");
      view.domObserver.start();
      if (e.relatedTarget && view.dom.contains(e.relatedTarget)) {
        view.domObserver.currentSelection.set({});
      }
      view.focused = false;
    }
  };
  handlers.beforeinput = function(view, event) {
    if (result.chrome && result.android && event.inputType == "deleteContentBackward") {
      var domChangeCount = view.domChangeCount;
      setTimeout(function() {
        if (view.domChangeCount != domChangeCount) {
          return;
        }
        view.dom.blur();
        view.focus();
        if (view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(8, "Backspace"));
        })) {
          return;
        }
        var ref = view.state.selection;
        var $cursor = ref.$cursor;
        if ($cursor && $cursor.pos > 0) {
          view.dispatch(view.state.tr.delete($cursor.pos - 1, $cursor.pos).scrollIntoView());
        }
      }, 50);
    }
  };
  for (prop in editHandlers) {
    handlers[prop] = editHandlers[prop];
  }
  var prop;
  function compareObjs(a, b) {
    if (a == b) {
      return true;
    }
    for (var p in a) {
      if (a[p] !== b[p]) {
        return false;
      }
    }
    for (var p$1 in b) {
      if (!(p$1 in a)) {
        return false;
      }
    }
    return true;
  }
  var WidgetType = function WidgetType2(toDOM, spec) {
    this.spec = spec || noSpec;
    this.side = this.spec.side || 0;
    this.toDOM = toDOM;
  };
  WidgetType.prototype.map = function map7(mapping, span, offset2, oldOffset) {
    var ref = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1);
    var pos = ref.pos;
    var deleted = ref.deleted;
    return deleted ? null : new Decoration(pos - offset2, pos - offset2, this);
  };
  WidgetType.prototype.valid = function valid() {
    return true;
  };
  WidgetType.prototype.eq = function eq6(other) {
    return this == other || other instanceof WidgetType && (this.spec.key && this.spec.key == other.spec.key || this.toDOM == other.toDOM && compareObjs(this.spec, other.spec));
  };
  var InlineType = function InlineType2(attrs, spec) {
    this.spec = spec || noSpec;
    this.attrs = attrs;
  };
  InlineType.prototype.map = function map8(mapping, span, offset2, oldOffset) {
    var from4 = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset2;
    var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset2;
    return from4 >= to ? null : new Decoration(from4, to, this);
  };
  InlineType.prototype.valid = function valid2(_, span) {
    return span.from < span.to;
  };
  InlineType.prototype.eq = function eq7(other) {
    return this == other || other instanceof InlineType && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
  };
  InlineType.is = function is(span) {
    return span.type instanceof InlineType;
  };
  var NodeType3 = function NodeType4(attrs, spec) {
    this.spec = spec || noSpec;
    this.attrs = attrs;
  };
  NodeType3.prototype.map = function map9(mapping, span, offset2, oldOffset) {
    var from4 = mapping.mapResult(span.from + oldOffset, 1);
    if (from4.deleted) {
      return null;
    }
    var to = mapping.mapResult(span.to + oldOffset, -1);
    if (to.deleted || to.pos <= from4.pos) {
      return null;
    }
    return new Decoration(from4.pos - offset2, to.pos - offset2, this);
  };
  NodeType3.prototype.valid = function valid3(node4, span) {
    var ref = node4.content.findIndex(span.from);
    var index2 = ref.index;
    var offset2 = ref.offset;
    var child3;
    return offset2 == span.from && !(child3 = node4.child(index2)).isText && offset2 + child3.nodeSize == span.to;
  };
  NodeType3.prototype.eq = function eq8(other) {
    return this == other || other instanceof NodeType3 && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
  };
  var Decoration = function Decoration2(from4, to, type) {
    this.from = from4;
    this.to = to;
    this.type = type;
  };
  var prototypeAccessors$14 = { spec: { configurable: true }, inline: { configurable: true } };
  Decoration.prototype.copy = function copy4(from4, to) {
    return new Decoration(from4, to, this.type);
  };
  Decoration.prototype.eq = function eq9(other, offset2) {
    if (offset2 === void 0)
      offset2 = 0;
    return this.type.eq(other.type) && this.from + offset2 == other.from && this.to + offset2 == other.to;
  };
  Decoration.prototype.map = function map10(mapping, offset2, oldOffset) {
    return this.type.map(mapping, this, offset2, oldOffset);
  };
  Decoration.widget = function widget(pos, toDOM, spec) {
    return new Decoration(pos, pos, new WidgetType(toDOM, spec));
  };
  Decoration.inline = function inline(from4, to, attrs, spec) {
    return new Decoration(from4, to, new InlineType(attrs, spec));
  };
  Decoration.node = function node3(from4, to, attrs, spec) {
    return new Decoration(from4, to, new NodeType3(attrs, spec));
  };
  prototypeAccessors$14.spec.get = function() {
    return this.type.spec;
  };
  prototypeAccessors$14.inline.get = function() {
    return this.type instanceof InlineType;
  };
  Object.defineProperties(Decoration.prototype, prototypeAccessors$14);
  var none = [];
  var noSpec = {};
  var DecorationSet = function DecorationSet2(local, children) {
    this.local = local && local.length ? local : none;
    this.children = children && children.length ? children : none;
  };
  DecorationSet.create = function create4(doc2, decorations) {
    return decorations.length ? buildTree(decorations, doc2, 0, noSpec) : empty;
  };
  DecorationSet.prototype.find = function find(start3, end2, predicate) {
    var result2 = [];
    this.findInner(start3 == null ? 0 : start3, end2 == null ? 1e9 : end2, result2, 0, predicate);
    return result2;
  };
  DecorationSet.prototype.findInner = function findInner(start3, end2, result2, offset2, predicate) {
    for (var i = 0; i < this.local.length; i++) {
      var span = this.local[i];
      if (span.from <= end2 && span.to >= start3 && (!predicate || predicate(span.spec))) {
        result2.push(span.copy(span.from + offset2, span.to + offset2));
      }
    }
    for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
      if (this.children[i$1] < end2 && this.children[i$1 + 1] > start3) {
        var childOff = this.children[i$1] + 1;
        this.children[i$1 + 2].findInner(start3 - childOff, end2 - childOff, result2, offset2 + childOff, predicate);
      }
    }
  };
  DecorationSet.prototype.map = function map11(mapping, doc2, options) {
    if (this == empty || mapping.maps.length == 0) {
      return this;
    }
    return this.mapInner(mapping, doc2, 0, 0, options || noSpec);
  };
  DecorationSet.prototype.mapInner = function mapInner(mapping, node4, offset2, oldOffset, options) {
    var newLocal;
    for (var i = 0; i < this.local.length; i++) {
      var mapped = this.local[i].map(mapping, offset2, oldOffset);
      if (mapped && mapped.type.valid(node4, mapped)) {
        (newLocal || (newLocal = [])).push(mapped);
      } else if (options.onRemove) {
        options.onRemove(this.local[i].spec);
      }
    }
    if (this.children.length) {
      return mapChildren(this.children, newLocal, mapping, node4, offset2, oldOffset, options);
    } else {
      return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty;
    }
  };
  DecorationSet.prototype.add = function add(doc2, decorations) {
    if (!decorations.length) {
      return this;
    }
    if (this == empty) {
      return DecorationSet.create(doc2, decorations);
    }
    return this.addInner(doc2, decorations, 0);
  };
  DecorationSet.prototype.addInner = function addInner(doc2, decorations, offset2) {
    var this$1 = this;
    var children, childIndex = 0;
    doc2.forEach(function(childNode, childOffset) {
      var baseOffset = childOffset + offset2, found2;
      if (!(found2 = takeSpansForNode(decorations, childNode, baseOffset))) {
        return;
      }
      if (!children) {
        children = this$1.children.slice();
      }
      while (childIndex < children.length && children[childIndex] < childOffset) {
        childIndex += 3;
      }
      if (children[childIndex] == childOffset) {
        children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found2, baseOffset + 1);
      } else {
        children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found2, childNode, baseOffset + 1, noSpec));
      }
      childIndex += 3;
    });
    var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset2);
    for (var i = 0; i < local.length; i++) {
      if (!local[i].type.valid(doc2, local[i])) {
        local.splice(i--, 1);
      }
    }
    return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local, children || this.children);
  };
  DecorationSet.prototype.remove = function remove(decorations) {
    if (decorations.length == 0 || this == empty) {
      return this;
    }
    return this.removeInner(decorations, 0);
  };
  DecorationSet.prototype.removeInner = function removeInner(decorations, offset2) {
    var children = this.children, local = this.local;
    for (var i = 0; i < children.length; i += 3) {
      var found2 = void 0, from4 = children[i] + offset2, to = children[i + 1] + offset2;
      for (var j = 0, span = void 0; j < decorations.length; j++) {
        if (span = decorations[j]) {
          if (span.from > from4 && span.to < to) {
            decorations[j] = null;
            (found2 || (found2 = [])).push(span);
          }
        }
      }
      if (!found2) {
        continue;
      }
      if (children == this.children) {
        children = this.children.slice();
      }
      var removed = children[i + 2].removeInner(found2, from4 + 1);
      if (removed != empty) {
        children[i + 2] = removed;
      } else {
        children.splice(i, 3);
        i -= 3;
      }
    }
    if (local.length) {
      for (var i$1 = 0, span$1 = void 0; i$1 < decorations.length; i$1++) {
        if (span$1 = decorations[i$1]) {
          for (var j$1 = 0; j$1 < local.length; j$1++) {
            if (local[j$1].eq(span$1, offset2)) {
              if (local == this.local) {
                local = this.local.slice();
              }
              local.splice(j$1--, 1);
            }
          }
        }
      }
    }
    if (children == this.children && local == this.local) {
      return this;
    }
    return local.length || children.length ? new DecorationSet(local, children) : empty;
  };
  DecorationSet.prototype.forChild = function forChild(offset2, node4) {
    if (this == empty) {
      return this;
    }
    if (node4.isLeaf) {
      return DecorationSet.empty;
    }
    var child3, local;
    for (var i = 0; i < this.children.length; i += 3) {
      if (this.children[i] >= offset2) {
        if (this.children[i] == offset2) {
          child3 = this.children[i + 2];
        }
        break;
      }
    }
    var start3 = offset2 + 1, end2 = start3 + node4.content.size;
    for (var i$1 = 0; i$1 < this.local.length; i$1++) {
      var dec = this.local[i$1];
      if (dec.from < end2 && dec.to > start3 && dec.type instanceof InlineType) {
        var from4 = Math.max(start3, dec.from) - start3, to = Math.min(end2, dec.to) - start3;
        if (from4 < to) {
          (local || (local = [])).push(dec.copy(from4, to));
        }
      }
    }
    if (local) {
      var localSet = new DecorationSet(local.sort(byPos));
      return child3 ? new DecorationGroup([localSet, child3]) : localSet;
    }
    return child3 || empty;
  };
  DecorationSet.prototype.eq = function eq10(other) {
    if (this == other) {
      return true;
    }
    if (!(other instanceof DecorationSet) || this.local.length != other.local.length || this.children.length != other.children.length) {
      return false;
    }
    for (var i = 0; i < this.local.length; i++) {
      if (!this.local[i].eq(other.local[i])) {
        return false;
      }
    }
    for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
      if (this.children[i$1] != other.children[i$1] || this.children[i$1 + 1] != other.children[i$1 + 1] || !this.children[i$1 + 2].eq(other.children[i$1 + 2])) {
        return false;
      }
    }
    return true;
  };
  DecorationSet.prototype.locals = function locals(node4) {
    return removeOverlap(this.localsInner(node4));
  };
  DecorationSet.prototype.localsInner = function localsInner(node4) {
    if (this == empty) {
      return none;
    }
    if (node4.inlineContent || !this.local.some(InlineType.is)) {
      return this.local;
    }
    var result2 = [];
    for (var i = 0; i < this.local.length; i++) {
      if (!(this.local[i].type instanceof InlineType)) {
        result2.push(this.local[i]);
      }
    }
    return result2;
  };
  var empty = new DecorationSet();
  DecorationSet.empty = empty;
  DecorationSet.removeOverlap = removeOverlap;
  var DecorationGroup = function DecorationGroup2(members) {
    this.members = members;
  };
  DecorationGroup.prototype.map = function map12(mapping, doc2) {
    var mappedDecos = this.members.map(function(member) {
      return member.map(mapping, doc2, noSpec);
    });
    return DecorationGroup.from(mappedDecos);
  };
  DecorationGroup.prototype.forChild = function forChild2(offset2, child3) {
    if (child3.isLeaf) {
      return DecorationSet.empty;
    }
    var found2 = [];
    for (var i = 0; i < this.members.length; i++) {
      var result2 = this.members[i].forChild(offset2, child3);
      if (result2 == empty) {
        continue;
      }
      if (result2 instanceof DecorationGroup) {
        found2 = found2.concat(result2.members);
      } else {
        found2.push(result2);
      }
    }
    return DecorationGroup.from(found2);
  };
  DecorationGroup.prototype.eq = function eq11(other) {
    if (!(other instanceof DecorationGroup) || other.members.length != this.members.length) {
      return false;
    }
    for (var i = 0; i < this.members.length; i++) {
      if (!this.members[i].eq(other.members[i])) {
        return false;
      }
    }
    return true;
  };
  DecorationGroup.prototype.locals = function locals2(node4) {
    var result2, sorted = true;
    for (var i = 0; i < this.members.length; i++) {
      var locals3 = this.members[i].localsInner(node4);
      if (!locals3.length) {
        continue;
      }
      if (!result2) {
        result2 = locals3;
      } else {
        if (sorted) {
          result2 = result2.slice();
          sorted = false;
        }
        for (var j = 0; j < locals3.length; j++) {
          result2.push(locals3[j]);
        }
      }
    }
    return result2 ? removeOverlap(sorted ? result2 : result2.sort(byPos)) : none;
  };
  DecorationGroup.from = function from2(members) {
    switch (members.length) {
      case 0:
        return empty;
      case 1:
        return members[0];
      default:
        return new DecorationGroup(members);
    }
  };
  function mapChildren(oldChildren, newLocal, mapping, node4, offset2, oldOffset, options) {
    var children = oldChildren.slice();
    var shift2 = function(oldStart, oldEnd, newStart, newEnd) {
      for (var i2 = 0; i2 < children.length; i2 += 3) {
        var end2 = children[i2 + 1], dSize = void 0;
        if (end2 == -1 || oldStart > end2 + oldOffset) {
          continue;
        }
        if (oldEnd >= children[i2] + oldOffset) {
          children[i2 + 1] = -1;
        } else if (newStart >= offset2 && (dSize = newEnd - newStart - (oldEnd - oldStart))) {
          children[i2] += dSize;
          children[i2 + 1] += dSize;
        }
      }
    };
    for (var i = 0; i < mapping.maps.length; i++) {
      mapping.maps[i].forEach(shift2);
    }
    var mustRebuild = false;
    for (var i$1 = 0; i$1 < children.length; i$1 += 3) {
      if (children[i$1 + 1] == -1) {
        var from4 = mapping.map(oldChildren[i$1] + oldOffset), fromLocal = from4 - offset2;
        if (fromLocal < 0 || fromLocal >= node4.content.size) {
          mustRebuild = true;
          continue;
        }
        var to = mapping.map(oldChildren[i$1 + 1] + oldOffset, -1), toLocal = to - offset2;
        var ref = node4.content.findIndex(fromLocal);
        var index2 = ref.index;
        var childOffset = ref.offset;
        var childNode = node4.maybeChild(index2);
        if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
          var mapped = children[i$1 + 2].mapInner(mapping, childNode, from4 + 1, oldChildren[i$1] + oldOffset + 1, options);
          if (mapped != empty) {
            children[i$1] = fromLocal;
            children[i$1 + 1] = toLocal;
            children[i$1 + 2] = mapped;
          } else {
            children[i$1 + 1] = -2;
            mustRebuild = true;
          }
        } else {
          mustRebuild = true;
        }
      }
    }
    if (mustRebuild) {
      var decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal || [], mapping, offset2, oldOffset, options);
      var built = buildTree(decorations, node4, 0, options);
      newLocal = built.local;
      for (var i$2 = 0; i$2 < children.length; i$2 += 3) {
        if (children[i$2 + 1] < 0) {
          children.splice(i$2, 3);
          i$2 -= 3;
        }
      }
      for (var i$3 = 0, j = 0; i$3 < built.children.length; i$3 += 3) {
        var from$1 = built.children[i$3];
        while (j < children.length && children[j] < from$1) {
          j += 3;
        }
        children.splice(j, 0, built.children[i$3], built.children[i$3 + 1], built.children[i$3 + 2]);
      }
    }
    return new DecorationSet(newLocal && newLocal.sort(byPos), children);
  }
  function moveSpans(spans, offset2) {
    if (!offset2 || !spans.length) {
      return spans;
    }
    var result2 = [];
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      result2.push(new Decoration(span.from + offset2, span.to + offset2, span.type));
    }
    return result2;
  }
  function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset2, oldOffset, options) {
    function gather(set2, oldOffset2) {
      for (var i2 = 0; i2 < set2.local.length; i2++) {
        var mapped = set2.local[i2].map(mapping, offset2, oldOffset2);
        if (mapped) {
          decorations.push(mapped);
        } else if (options.onRemove) {
          options.onRemove(set2.local[i2].spec);
        }
      }
      for (var i$1 = 0; i$1 < set2.children.length; i$1 += 3) {
        gather(set2.children[i$1 + 2], set2.children[i$1] + oldOffset2 + 1);
      }
    }
    for (var i = 0; i < children.length; i += 3) {
      if (children[i + 1] == -1) {
        gather(children[i + 2], oldChildren[i] + oldOffset + 1);
      }
    }
    return decorations;
  }
  function takeSpansForNode(spans, node4, offset2) {
    if (node4.isLeaf) {
      return null;
    }
    var end2 = offset2 + node4.nodeSize, found2 = null;
    for (var i = 0, span = void 0; i < spans.length; i++) {
      if ((span = spans[i]) && span.from > offset2 && span.to < end2) {
        (found2 || (found2 = [])).push(span);
        spans[i] = null;
      }
    }
    return found2;
  }
  function withoutNulls(array) {
    var result2 = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] != null) {
        result2.push(array[i]);
      }
    }
    return result2;
  }
  function buildTree(spans, node4, offset2, options) {
    var children = [], hasNulls = false;
    node4.forEach(function(childNode, localStart) {
      var found2 = takeSpansForNode(spans, childNode, localStart + offset2);
      if (found2) {
        hasNulls = true;
        var subtree = buildTree(found2, childNode, offset2 + localStart + 1, options);
        if (subtree != empty) {
          children.push(localStart, localStart + childNode.nodeSize, subtree);
        }
      }
    });
    var locals3 = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset2).sort(byPos);
    for (var i = 0; i < locals3.length; i++) {
      if (!locals3[i].type.valid(node4, locals3[i])) {
        if (options.onRemove) {
          options.onRemove(locals3[i].spec);
        }
        locals3.splice(i--, 1);
      }
    }
    return locals3.length || children.length ? new DecorationSet(locals3, children) : empty;
  }
  function byPos(a, b) {
    return a.from - b.from || a.to - b.to;
  }
  function removeOverlap(spans) {
    var working = spans;
    for (var i = 0; i < working.length - 1; i++) {
      var span = working[i];
      if (span.from != span.to) {
        for (var j = i + 1; j < working.length; j++) {
          var next = working[j];
          if (next.from == span.from) {
            if (next.to != span.to) {
              if (working == spans) {
                working = spans.slice();
              }
              working[j] = next.copy(next.from, span.to);
              insertAhead(working, j + 1, next.copy(span.to, next.to));
            }
            continue;
          } else {
            if (next.from < span.to) {
              if (working == spans) {
                working = spans.slice();
              }
              working[i] = span.copy(span.from, next.from);
              insertAhead(working, j, span.copy(next.from, span.to));
            }
            break;
          }
        }
      }
    }
    return working;
  }
  function insertAhead(array, i, deco) {
    while (i < array.length && byPos(deco, array[i]) > 0) {
      i++;
    }
    array.splice(i, 0, deco);
  }
  function viewDecorations(view) {
    var found2 = [];
    view.someProp("decorations", function(f) {
      var result2 = f(view.state);
      if (result2 && result2 != empty) {
        found2.push(result2);
      }
    });
    if (view.cursorWrapper) {
      found2.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco]));
    }
    return DecorationGroup.from(found2);
  }
  var EditorView = function EditorView2(place, props) {
    this._props = props;
    this.state = props.state;
    this.directPlugins = props.plugins || [];
    this.directPlugins.forEach(checkStateComponent);
    this.dispatch = this.dispatch.bind(this);
    this._root = null;
    this.focused = false;
    this.trackWrites = null;
    this.dom = place && place.mount || document.createElement("div");
    if (place) {
      if (place.appendChild) {
        place.appendChild(this.dom);
      } else if (place.apply) {
        place(this.dom);
      } else if (place.mount) {
        this.mounted = true;
      }
    }
    this.editable = getEditable(this);
    this.markCursor = null;
    this.cursorWrapper = null;
    updateCursorWrapper(this);
    this.nodeViews = buildNodeViews(this);
    this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);
    this.lastSelectedViewDesc = null;
    this.dragging = null;
    initInput(this);
    this.prevDirectPlugins = [];
    this.pluginViews = [];
    this.updatePluginViews();
  };
  var prototypeAccessors$22 = { props: { configurable: true }, root: { configurable: true } };
  prototypeAccessors$22.props.get = function() {
    if (this._props.state != this.state) {
      var prev = this._props;
      this._props = {};
      for (var name in prev) {
        this._props[name] = prev[name];
      }
      this._props.state = this.state;
    }
    return this._props;
  };
  EditorView.prototype.update = function update(props) {
    if (props.handleDOMEvents != this._props.handleDOMEvents) {
      ensureListeners(this);
    }
    this._props = props;
    if (props.plugins) {
      props.plugins.forEach(checkStateComponent);
      this.directPlugins = props.plugins;
    }
    this.updateStateInner(props.state, true);
  };
  EditorView.prototype.setProps = function setProps(props) {
    var updated = {};
    for (var name in this._props) {
      updated[name] = this._props[name];
    }
    updated.state = this.state;
    for (var name$1 in props) {
      updated[name$1] = props[name$1];
    }
    this.update(updated);
  };
  EditorView.prototype.updateState = function updateState(state) {
    this.updateStateInner(state, this.state.plugins != state.plugins);
  };
  EditorView.prototype.updateStateInner = function updateStateInner(state, reconfigured) {
    var this$1 = this;
    var prev = this.state, redraw = false, updateSel = false;
    if (state.storedMarks && this.composing) {
      clearComposition(this);
      updateSel = true;
    }
    this.state = state;
    if (reconfigured) {
      var nodeViews = buildNodeViews(this);
      if (changedNodeViews(nodeViews, this.nodeViews)) {
        this.nodeViews = nodeViews;
        redraw = true;
      }
      ensureListeners(this);
    }
    this.editable = getEditable(this);
    updateCursorWrapper(this);
    var innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this);
    var scroll = reconfigured ? "reset" : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
    var updateDoc = redraw || !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
    if (updateDoc || !state.selection.eq(prev.selection)) {
      updateSel = true;
    }
    var oldScrollPos = scroll == "preserve" && updateSel && this.dom.style.overflowAnchor == null && storeScrollPos(this);
    if (updateSel) {
      this.domObserver.stop();
      var forceSelUpdate = updateDoc && (result.ie || result.chrome) && !this.composing && !prev.selection.empty && !state.selection.empty && selectionContextChanged(prev.selection, state.selection);
      if (updateDoc) {
        var chromeKludge = result.chrome ? this.trackWrites = this.root.getSelection().focusNode : null;
        if (redraw || !this.docView.update(state.doc, outerDeco, innerDeco, this)) {
          this.docView.updateOuterDeco([]);
          this.docView.destroy();
          this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
        }
        if (chromeKludge && !this.trackWrites) {
          forceSelUpdate = true;
        }
      }
      if (forceSelUpdate || !(this.mouseDown && this.domObserver.currentSelection.eq(this.root.getSelection()) && anchorInRightPlace(this))) {
        selectionToDOM(this, forceSelUpdate);
      } else {
        syncNodeSelection(this, state.selection);
        this.domObserver.setCurSelection();
      }
      this.domObserver.start();
    }
    this.updatePluginViews(prev);
    if (scroll == "reset") {
      this.dom.scrollTop = 0;
    } else if (scroll == "to selection") {
      var startDOM = this.root.getSelection().focusNode;
      if (this.someProp("handleScrollToSelection", function(f) {
        return f(this$1);
      }))
        ;
      else if (state.selection instanceof NodeSelection) {
        scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect(), startDOM);
      } else {
        scrollRectIntoView(this, this.coordsAtPos(state.selection.head, 1), startDOM);
      }
    } else if (oldScrollPos) {
      resetScrollPos(oldScrollPos);
    }
  };
  EditorView.prototype.destroyPluginViews = function destroyPluginViews() {
    var view;
    while (view = this.pluginViews.pop()) {
      if (view.destroy) {
        view.destroy();
      }
    }
  };
  EditorView.prototype.updatePluginViews = function updatePluginViews(prevState) {
    if (!prevState || prevState.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins;
      this.destroyPluginViews();
      for (var i = 0; i < this.directPlugins.length; i++) {
        var plugin = this.directPlugins[i];
        if (plugin.spec.view) {
          this.pluginViews.push(plugin.spec.view(this));
        }
      }
      for (var i$1 = 0; i$1 < this.state.plugins.length; i$1++) {
        var plugin$1 = this.state.plugins[i$1];
        if (plugin$1.spec.view) {
          this.pluginViews.push(plugin$1.spec.view(this));
        }
      }
    } else {
      for (var i$2 = 0; i$2 < this.pluginViews.length; i$2++) {
        var pluginView = this.pluginViews[i$2];
        if (pluginView.update) {
          pluginView.update(this, prevState);
        }
      }
    }
  };
  EditorView.prototype.someProp = function someProp(propName, f) {
    var prop = this._props && this._props[propName], value;
    if (prop != null && (value = f ? f(prop) : prop)) {
      return value;
    }
    for (var i = 0; i < this.directPlugins.length; i++) {
      var prop$1 = this.directPlugins[i].props[propName];
      if (prop$1 != null && (value = f ? f(prop$1) : prop$1)) {
        return value;
      }
    }
    var plugins = this.state.plugins;
    if (plugins) {
      for (var i$1 = 0; i$1 < plugins.length; i$1++) {
        var prop$2 = plugins[i$1].props[propName];
        if (prop$2 != null && (value = f ? f(prop$2) : prop$2)) {
          return value;
        }
      }
    }
  };
  EditorView.prototype.hasFocus = function hasFocus() {
    return this.root.activeElement == this.dom;
  };
  EditorView.prototype.focus = function focus() {
    this.domObserver.stop();
    if (this.editable) {
      focusPreventScroll(this.dom);
    }
    selectionToDOM(this);
    this.domObserver.start();
  };
  prototypeAccessors$22.root.get = function() {
    var cached = this._root;
    if (cached == null) {
      for (var search = this.dom.parentNode; search; search = search.parentNode) {
        if (search.nodeType == 9 || search.nodeType == 11 && search.host) {
          if (!search.getSelection) {
            Object.getPrototypeOf(search).getSelection = function() {
              return document.getSelection();
            };
          }
          return this._root = search;
        }
      }
    }
    return cached || document;
  };
  EditorView.prototype.posAtCoords = function posAtCoords$1(coords) {
    return posAtCoords(this, coords);
  };
  EditorView.prototype.coordsAtPos = function coordsAtPos$1(pos, side) {
    if (side === void 0)
      side = 1;
    return coordsAtPos(this, pos, side);
  };
  EditorView.prototype.domAtPos = function domAtPos(pos, side) {
    if (side === void 0)
      side = 0;
    return this.docView.domFromPos(pos, side);
  };
  EditorView.prototype.nodeDOM = function nodeDOM(pos) {
    var desc = this.docView.descAt(pos);
    return desc ? desc.nodeDOM : null;
  };
  EditorView.prototype.posAtDOM = function posAtDOM(node4, offset2, bias) {
    if (bias === void 0)
      bias = -1;
    var pos = this.docView.posFromDOM(node4, offset2, bias);
    if (pos == null) {
      throw new RangeError("DOM position not inside the editor");
    }
    return pos;
  };
  EditorView.prototype.endOfTextblock = function endOfTextblock$1(dir, state) {
    return endOfTextblock(this, state || this.state, dir);
  };
  EditorView.prototype.destroy = function destroy2() {
    if (!this.docView) {
      return;
    }
    destroyInput(this);
    this.destroyPluginViews();
    if (this.mounted) {
      this.docView.update(this.state.doc, [], viewDecorations(this), this);
      this.dom.textContent = "";
    } else if (this.dom.parentNode) {
      this.dom.parentNode.removeChild(this.dom);
    }
    this.docView.destroy();
    this.docView = null;
  };
  EditorView.prototype.dispatchEvent = function dispatchEvent$1(event) {
    return dispatchEvent(this, event);
  };
  EditorView.prototype.dispatch = function dispatch(tr) {
    var dispatchTransaction = this._props.dispatchTransaction;
    if (dispatchTransaction) {
      dispatchTransaction.call(this, tr);
    } else {
      this.updateState(this.state.apply(tr));
    }
  };
  Object.defineProperties(EditorView.prototype, prototypeAccessors$22);
  function computeDocDeco(view) {
    var attrs = Object.create(null);
    attrs.class = "ProseMirror";
    attrs.contenteditable = String(view.editable);
    attrs.translate = "no";
    view.someProp("attributes", function(value) {
      if (typeof value == "function") {
        value = value(view.state);
      }
      if (value) {
        for (var attr in value) {
          if (attr == "class") {
            attrs.class += " " + value[attr];
          } else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName") {
            attrs[attr] = String(value[attr]);
          }
        }
      }
    });
    return [Decoration.node(0, view.state.doc.content.size, attrs)];
  }
  function updateCursorWrapper(view) {
    if (view.markCursor) {
      var dom = document.createElement("img");
      dom.className = "ProseMirror-separator";
      dom.setAttribute("mark-placeholder", "true");
      view.cursorWrapper = { dom, deco: Decoration.widget(view.state.selection.head, dom, { raw: true, marks: view.markCursor }) };
    } else {
      view.cursorWrapper = null;
    }
  }
  function getEditable(view) {
    return !view.someProp("editable", function(value) {
      return value(view.state) === false;
    });
  }
  function selectionContextChanged(sel1, sel2) {
    var depth = Math.min(sel1.$anchor.sharedDepth(sel1.head), sel2.$anchor.sharedDepth(sel2.head));
    return sel1.$anchor.start(depth) != sel2.$anchor.start(depth);
  }
  function buildNodeViews(view) {
    var result2 = {};
    view.someProp("nodeViews", function(obj) {
      for (var prop in obj) {
        if (!Object.prototype.hasOwnProperty.call(result2, prop)) {
          result2[prop] = obj[prop];
        }
      }
    });
    return result2;
  }
  function changedNodeViews(a, b) {
    var nA = 0, nB = 0;
    for (var prop in a) {
      if (a[prop] != b[prop]) {
        return true;
      }
      nA++;
    }
    for (var _ in b) {
      nB++;
    }
    return nA != nB;
  }
  function checkStateComponent(plugin) {
    if (plugin.spec.state || plugin.spec.filterTransaction || plugin.spec.appendTransaction) {
      throw new RangeError("Plugins passed directly to the view must not have a state component");
    }
  }

  // node_modules/w3c-keyname/index.es.js
  var base = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    229: "q"
  };
  var shift = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"',
    229: "Q"
  };
  var chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
  var safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
  var gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
  var mac2 = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
  var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  var brokenModifierNames = chrome && (mac2 || +chrome[1] < 57) || gecko && mac2;
  for (i = 0; i < 10; i++)
    base[48 + i] = base[96 + i] = String(i);
  var i;
  for (i = 1; i <= 24; i++)
    base[i + 111] = "F" + i;
  var i;
  for (i = 65; i <= 90; i++) {
    base[i] = String.fromCharCode(i + 32);
    shift[i] = String.fromCharCode(i);
  }
  var i;
  for (code in base)
    if (!shift.hasOwnProperty(code))
      shift[code] = base[code];
  var code;
  function keyName(event) {
    var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari || ie) && event.shiftKey && event.key && event.key.length == 1;
    var name = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
    if (name == "Esc")
      name = "Escape";
    if (name == "Del")
      name = "Delete";
    if (name == "Left")
      name = "ArrowLeft";
    if (name == "Up")
      name = "ArrowUp";
    if (name == "Right")
      name = "ArrowRight";
    if (name == "Down")
      name = "ArrowDown";
    return name;
  }

  // node_modules/prosemirror-keymap/dist/index.es.js
  var mac3 = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : false;
  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/), result2 = parts[parts.length - 1];
    if (result2 == "Space") {
      result2 = " ";
    }
    var alt, ctrl, shift2, meta;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) {
        meta = true;
      } else if (/^a(lt)?$/i.test(mod)) {
        alt = true;
      } else if (/^(c|ctrl|control)$/i.test(mod)) {
        ctrl = true;
      } else if (/^s(hift)?$/i.test(mod)) {
        shift2 = true;
      } else if (/^mod$/i.test(mod)) {
        if (mac3) {
          meta = true;
        } else {
          ctrl = true;
        }
      } else {
        throw new Error("Unrecognized modifier name: " + mod);
      }
    }
    if (alt) {
      result2 = "Alt-" + result2;
    }
    if (ctrl) {
      result2 = "Ctrl-" + result2;
    }
    if (meta) {
      result2 = "Meta-" + result2;
    }
    if (shift2) {
      result2 = "Shift-" + result2;
    }
    return result2;
  }
  function normalize(map15) {
    var copy5 = Object.create(null);
    for (var prop in map15) {
      copy5[normalizeKeyName(prop)] = map15[prop];
    }
    return copy5;
  }
  function modifiers(name, event, shift2) {
    if (event.altKey) {
      name = "Alt-" + name;
    }
    if (event.ctrlKey) {
      name = "Ctrl-" + name;
    }
    if (event.metaKey) {
      name = "Meta-" + name;
    }
    if (shift2 !== false && event.shiftKey) {
      name = "Shift-" + name;
    }
    return name;
  }
  function keymap(bindings) {
    return new Plugin({ props: { handleKeyDown: keydownHandler(bindings) } });
  }
  function keydownHandler(bindings) {
    var map15 = normalize(bindings);
    return function(view, event) {
      var name = keyName(event), isChar = name.length == 1 && name != " ", baseName;
      var direct = map15[modifiers(name, event, !isChar)];
      if (direct && direct(view.state, view.dispatch, view)) {
        return true;
      }
      if (isChar && (event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) && (baseName = base[event.keyCode]) && baseName != name) {
        var fromCode = map15[modifiers(baseName, event, true)];
        if (fromCode && fromCode(view.state, view.dispatch, view)) {
          return true;
        }
      } else if (isChar && event.shiftKey) {
        var withShift = map15[modifiers(name, event, true)];
        if (withShift && withShift(view.state, view.dispatch, view)) {
          return true;
        }
      }
      return false;
    };
  }

  // node_modules/@tiptap/core/dist/tiptap-core.esm.js
  function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  function isPlainObject(value) {
    if (getType(value) !== "Object")
      return false;
    return value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
  }
  function mergeDeep(target, source) {
    const output = { ...target };
    if (isPlainObject(target) && isPlainObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isPlainObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }
  var Extension = class {
    constructor(config = {}) {
      this.type = "extension";
      this.name = "extension";
      this.parent = null;
      this.child = null;
      this.config = {
        name: this.name,
        defaultOptions: {}
      };
      this.config = {
        ...this.config,
        ...config
      };
      this.name = this.config.name;
      this.options = this.config.defaultOptions;
    }
    static create(config = {}) {
      return new Extension(config);
    }
    configure(options = {}) {
      const extension = this.extend();
      extension.options = mergeDeep(this.options, options);
      return extension;
    }
    extend(extendedConfig = {}) {
      const extension = new Extension(extendedConfig);
      extension.parent = this;
      this.child = extension;
      extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
      extension.options = extendedConfig.defaultOptions ? extendedConfig.defaultOptions : extension.parent.options;
      return extension;
    }
  };
  function getTextBetween(startNode, range, options) {
    const { from: from4, to } = range;
    const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
    let text2 = "";
    let separated = true;
    startNode.nodesBetween(from4, to, (node4, pos, parent, index2) => {
      var _a;
      const textSerializer = textSerializers === null || textSerializers === void 0 ? void 0 : textSerializers[node4.type.name];
      if (textSerializer) {
        if (node4.isBlock && !separated) {
          text2 += blockSeparator;
          separated = true;
        }
        text2 += textSerializer({
          node: node4,
          pos,
          parent,
          index: index2
        });
      } else if (node4.isText) {
        text2 += (_a = node4 === null || node4 === void 0 ? void 0 : node4.text) === null || _a === void 0 ? void 0 : _a.slice(Math.max(from4, pos) - pos, to - pos);
        separated = false;
      } else if (node4.isBlock && !separated) {
        text2 += blockSeparator;
        separated = true;
      }
    });
    return text2;
  }
  function getTextSeralizersFromSchema(schema) {
    return Object.fromEntries(Object.entries(schema.nodes).filter(([, node4]) => node4.spec.toText).map(([name, node4]) => [name, node4.spec.toText]));
  }
  var ClipboardTextSerializer = Extension.create({
    name: "clipboardTextSerializer",
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("clipboardTextSerializer"),
          props: {
            clipboardTextSerializer: () => {
              const { editor: editor2 } = this;
              const { state, schema } = editor2;
              const { doc: doc2, selection } = state;
              const { from: from4, to } = selection;
              const textSerializers = getTextSeralizersFromSchema(schema);
              const range = { from: from4, to };
              return getTextBetween(doc2, range, {
                textSerializers
              });
            }
          }
        })
      ];
    }
  });
  var blur = () => ({ editor: editor2, view }) => {
    requestAnimationFrame(() => {
      if (!editor2.isDestroyed) {
        view.dom.blur();
      }
    });
    return true;
  };
  var blur$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    blur
  });
  var clearContent = (emitUpdate = false) => ({ commands }) => {
    return commands.setContent("", emitUpdate);
  };
  var clearContent$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    clearContent
  });
  var clearNodes = () => ({ state, tr, dispatch: dispatch2 }) => {
    const { selection } = tr;
    const { ranges } = selection;
    ranges.forEach((range) => {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node4, pos) => {
        if (node4.type.isText) {
          return;
        }
        const $fromPos = tr.doc.resolve(tr.mapping.map(pos));
        const $toPos = tr.doc.resolve(tr.mapping.map(pos + node4.nodeSize));
        const nodeRange = $fromPos.blockRange($toPos);
        if (!nodeRange) {
          return;
        }
        const targetLiftDepth = liftTarget(nodeRange);
        if (node4.type.isTextblock && dispatch2) {
          const { defaultType } = $fromPos.parent.contentMatchAt($fromPos.index());
          tr.setNodeMarkup(nodeRange.start, defaultType);
        }
        if ((targetLiftDepth || targetLiftDepth === 0) && dispatch2) {
          tr.lift(nodeRange, targetLiftDepth);
        }
      });
    });
    return true;
  };
  var clearNodes$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    clearNodes
  });
  var command = (fn) => (props) => {
    return fn(props);
  };
  var command$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    command
  });
  var createParagraphNear2 = () => ({ state, dispatch: dispatch2 }) => {
    return createParagraphNear(state, dispatch2);
  };
  var createParagraphNear$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    createParagraphNear: createParagraphNear2
  });
  function getNodeType(nameOrType, schema) {
    if (typeof nameOrType === "string") {
      if (!schema.nodes[nameOrType]) {
        throw Error(`There is no node type named '${nameOrType}'. Maybe you forgot to add the extension?`);
      }
      return schema.nodes[nameOrType];
    }
    return nameOrType;
  }
  var deleteNode = (typeOrName) => ({ tr, state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    const $pos = tr.selection.$anchor;
    for (let depth = $pos.depth; depth > 0; depth -= 1) {
      const node4 = $pos.node(depth);
      if (node4.type === type) {
        if (dispatch2) {
          const from4 = $pos.before(depth);
          const to = $pos.after(depth);
          tr.delete(from4, to).scrollIntoView();
        }
        return true;
      }
    }
    return false;
  };
  var deleteNode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    deleteNode
  });
  var deleteRange = (range) => ({ tr, dispatch: dispatch2 }) => {
    const { from: from4, to } = range;
    if (dispatch2) {
      tr.delete(from4, to);
    }
    return true;
  };
  var deleteRange$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    deleteRange
  });
  var deleteSelection2 = () => ({ state, dispatch: dispatch2 }) => {
    return deleteSelection(state, dispatch2);
  };
  var deleteSelection$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    deleteSelection: deleteSelection2
  });
  var enter2 = () => ({ commands }) => {
    return commands.keyboardShortcut("Enter");
  };
  var enter$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    enter: enter2
  });
  var exitCode2 = () => ({ state, dispatch: dispatch2 }) => {
    return exitCode(state, dispatch2);
  };
  var exitCode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    exitCode: exitCode2
  });
  function getMarkType(nameOrType, schema) {
    if (typeof nameOrType === "string") {
      if (!schema.marks[nameOrType]) {
        throw Error(`There is no mark type named '${nameOrType}'. Maybe you forgot to add the extension?`);
      }
      return schema.marks[nameOrType];
    }
    return nameOrType;
  }
  function isRegExp(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]";
  }
  function objectIncludes(object1, object2, options = { strict: true }) {
    const keys2 = Object.keys(object2);
    if (!keys2.length) {
      return true;
    }
    return keys2.every((key) => {
      if (options.strict) {
        return object2[key] === object1[key];
      }
      if (isRegExp(object2[key])) {
        return object2[key].test(object1[key]);
      }
      return object2[key] === object1[key];
    });
  }
  function findMarkInSet(marks2, type, attributes = {}) {
    return marks2.find((item) => {
      return item.type === type && objectIncludes(item.attrs, attributes);
    });
  }
  function isMarkInSet(marks2, type, attributes = {}) {
    return !!findMarkInSet(marks2, type, attributes);
  }
  function getMarkRange($pos, type, attributes = {}) {
    if (!$pos || !type) {
      return;
    }
    const start3 = $pos.parent.childAfter($pos.parentOffset);
    if (!start3.node) {
      return;
    }
    const mark3 = findMarkInSet(start3.node.marks, type, attributes);
    if (!mark3) {
      return;
    }
    let startIndex = $pos.index();
    let startPos = $pos.start() + start3.offset;
    let endIndex = startIndex + 1;
    let endPos = startPos + start3.node.nodeSize;
    findMarkInSet(start3.node.marks, type, attributes);
    while (startIndex > 0 && mark3.isInSet($pos.parent.child(startIndex - 1).marks)) {
      startIndex -= 1;
      startPos -= $pos.parent.child(startIndex).nodeSize;
    }
    while (endIndex < $pos.parent.childCount && isMarkInSet($pos.parent.child(endIndex).marks, type, attributes)) {
      endPos += $pos.parent.child(endIndex).nodeSize;
      endIndex += 1;
    }
    return {
      from: startPos,
      to: endPos
    };
  }
  var extendMarkRange = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
    const type = getMarkType(typeOrName, state.schema);
    const { doc: doc2, selection } = tr;
    const { $from, from: from4, to } = selection;
    if (dispatch2) {
      const range = getMarkRange($from, type, attributes);
      if (range && range.from <= from4 && range.to >= to) {
        const newSelection = TextSelection.create(doc2, range.from, range.to);
        tr.setSelection(newSelection);
      }
    }
    return true;
  };
  var extendMarkRange$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    extendMarkRange
  });
  var first = (commands) => (props) => {
    const items = typeof commands === "function" ? commands(props) : commands;
    for (let i = 0; i < items.length; i += 1) {
      if (items[i](props)) {
        return true;
      }
    }
    return false;
  };
  var first$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    first
  });
  function minMax(value = 0, min2 = 0, max2 = 0) {
    return Math.min(Math.max(value, min2), max2);
  }
  function isClass(value) {
    var _a;
    if (((_a = value.constructor) === null || _a === void 0 ? void 0 : _a.toString().substring(0, 5)) !== "class") {
      return false;
    }
    return true;
  }
  function isObject$1(value) {
    return value && typeof value === "object" && !Array.isArray(value) && !isClass(value);
  }
  function isTextSelection(value) {
    return isObject$1(value) && value instanceof TextSelection;
  }
  function isiOS() {
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod"
    ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
  }
  function resolveSelection2(state, position = null) {
    if (!position) {
      return null;
    }
    if (position === "start" || position === true) {
      return {
        from: 0,
        to: 0
      };
    }
    if (position === "end") {
      const { size } = state.doc.content;
      return {
        from: size,
        to: size
      };
    }
    return {
      from: position,
      to: position
    };
  }
  var focus2 = (position = null) => ({ editor: editor2, view, tr, dispatch: dispatch2 }) => {
    const delayedFocus = () => {
      if (isiOS()) {
        view.dom.focus();
      }
      requestAnimationFrame(() => {
        if (!editor2.isDestroyed) {
          view.focus();
          editor2.commands.scrollIntoView();
        }
      });
    };
    if (view.hasFocus() && position === null || position === false) {
      return true;
    }
    if (dispatch2 && position === null && !isTextSelection(editor2.state.selection)) {
      delayedFocus();
      return true;
    }
    const { from: from4, to } = resolveSelection2(editor2.state, position) || editor2.state.selection;
    const { doc: doc2, storedMarks } = tr;
    const minPos = Selection.atStart(doc2).from;
    const maxPos = Selection.atEnd(doc2).to;
    const resolvedFrom = minMax(from4, minPos, maxPos);
    const resolvedEnd = minMax(to, minPos, maxPos);
    const selection = TextSelection.create(doc2, resolvedFrom, resolvedEnd);
    const isSameSelection = editor2.state.selection.eq(selection);
    if (dispatch2) {
      if (!isSameSelection) {
        tr.setSelection(selection);
      }
      if (isSameSelection && storedMarks) {
        tr.setStoredMarks(storedMarks);
      }
      delayedFocus();
    }
    return true;
  };
  var focus$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    focus: focus2
  });
  var forEach4 = (items, fn) => (props) => {
    return items.every((item, index2) => fn(item, { ...props, index: index2 }));
  };
  var forEach$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    forEach: forEach4
  });
  var insertContent = (value, options) => ({ tr, commands }) => {
    return commands.insertContentAt({ from: tr.selection.from, to: tr.selection.to }, value, options);
  };
  var insertContent$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    insertContent
  });
  function elementFromString(value) {
    const wrappedValue = `<body>${value}</body>`;
    return new window.DOMParser().parseFromString(wrappedValue, "text/html").body;
  }
  function createNodeFromContent(content2, schema, options) {
    options = {
      slice: true,
      parseOptions: {},
      ...options
    };
    if (typeof content2 === "object" && content2 !== null) {
      try {
        if (Array.isArray(content2)) {
          return Fragment.fromArray(content2.map((item) => schema.nodeFromJSON(item)));
        }
        return schema.nodeFromJSON(content2);
      } catch (error2) {
        console.warn("[tiptap warn]: Invalid content.", "Passed value:", content2, "Error:", error2);
        return createNodeFromContent("", schema, options);
      }
    }
    if (typeof content2 === "string") {
      const parser = DOMParser.fromSchema(schema);
      return options.slice ? parser.parseSlice(elementFromString(content2), options.parseOptions).content : parser.parse(elementFromString(content2), options.parseOptions);
    }
    return createNodeFromContent("", schema, options);
  }
  function selectionToInsertionEnd2(tr, startLen, bias) {
    const last = tr.steps.length - 1;
    if (last < startLen) {
      return;
    }
    const step2 = tr.steps[last];
    if (!(step2 instanceof ReplaceStep || step2 instanceof ReplaceAroundStep)) {
      return;
    }
    const map15 = tr.mapping.maps[last];
    let end2 = 0;
    map15.forEach((_from, _to, _newFrom, newTo) => {
      if (end2 === 0) {
        end2 = newTo;
      }
    });
    tr.setSelection(Selection.near(tr.doc.resolve(end2), bias));
  }
  var insertContentAt = (position, value, options) => ({ tr, dispatch: dispatch2, editor: editor2 }) => {
    if (dispatch2) {
      options = {
        parseOptions: {},
        updateSelection: true,
        ...options
      };
      const content2 = createNodeFromContent(value, editor2.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...options.parseOptions
        }
      });
      if (content2.toString() === "<>") {
        return true;
      }
      const { from: from4, to } = typeof position === "number" ? { from: position, to: position } : position;
      tr.replaceWith(from4, to, content2);
      if (options.updateSelection) {
        selectionToInsertionEnd2(tr, tr.steps.length - 1, 1);
      }
    }
    return true;
  };
  var insertContentAt$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    insertContentAt
  });
  var joinBackward2 = () => ({ state, dispatch: dispatch2 }) => {
    return joinBackward(state, dispatch2);
  };
  var joinBackward$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    joinBackward: joinBackward2
  });
  var joinForward2 = () => ({ state, dispatch: dispatch2 }) => {
    return joinForward(state, dispatch2);
  };
  var joinForward$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    joinForward: joinForward2
  });
  var mac4 = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
  function normalizeKeyName2(name) {
    const parts = name.split(/-(?!$)/);
    let result2 = parts[parts.length - 1];
    if (result2 === "Space") {
      result2 = " ";
    }
    let alt;
    let ctrl;
    let shift2;
    let meta;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) {
        meta = true;
      } else if (/^a(lt)?$/i.test(mod)) {
        alt = true;
      } else if (/^(c|ctrl|control)$/i.test(mod)) {
        ctrl = true;
      } else if (/^s(hift)?$/i.test(mod)) {
        shift2 = true;
      } else if (/^mod$/i.test(mod)) {
        if (mac4) {
          meta = true;
        } else {
          ctrl = true;
        }
      } else {
        throw new Error(`Unrecognized modifier name: ${mod}`);
      }
    }
    if (alt) {
      result2 = `Alt-${result2}`;
    }
    if (ctrl) {
      result2 = `Ctrl-${result2}`;
    }
    if (meta) {
      result2 = `Meta-${result2}`;
    }
    if (shift2) {
      result2 = `Shift-${result2}`;
    }
    return result2;
  }
  var keyboardShortcut = (name) => ({ editor: editor2, view, tr, dispatch: dispatch2 }) => {
    const keys2 = normalizeKeyName2(name).split(/-(?!$)/);
    const key = keys2.find((item) => !["Alt", "Ctrl", "Meta", "Shift"].includes(item));
    const event = new KeyboardEvent("keydown", {
      key: key === "Space" ? " " : key,
      altKey: keys2.includes("Alt"),
      ctrlKey: keys2.includes("Ctrl"),
      metaKey: keys2.includes("Meta"),
      shiftKey: keys2.includes("Shift"),
      bubbles: true,
      cancelable: true
    });
    const capturedTransaction = editor2.captureTransaction(() => {
      view.someProp("handleKeyDown", (f) => f(view, event));
    });
    capturedTransaction === null || capturedTransaction === void 0 ? void 0 : capturedTransaction.steps.forEach((step2) => {
      const newStep = step2.map(tr.mapping);
      if (newStep && dispatch2) {
        tr.maybeStep(newStep);
      }
    });
    return true;
  };
  var keyboardShortcut$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    keyboardShortcut
  });
  function isNodeActive(state, typeOrName, attributes = {}) {
    const { from: from4, to, empty: empty2 } = state.selection;
    const type = typeOrName ? getNodeType(typeOrName, state.schema) : null;
    const nodeRanges = [];
    state.doc.nodesBetween(from4, to, (node4, pos) => {
      if (node4.isText) {
        return;
      }
      const relativeFrom = Math.max(from4, pos);
      const relativeTo = Math.min(to, pos + node4.nodeSize);
      nodeRanges.push({
        node: node4,
        from: relativeFrom,
        to: relativeTo
      });
    });
    const selectionRange = to - from4;
    const matchedNodeRanges = nodeRanges.filter((nodeRange) => {
      if (!type) {
        return true;
      }
      return type.name === nodeRange.node.type.name;
    }).filter((nodeRange) => objectIncludes(nodeRange.node.attrs, attributes, { strict: false }));
    if (empty2) {
      return !!matchedNodeRanges.length;
    }
    const range = matchedNodeRanges.reduce((sum, nodeRange) => sum + nodeRange.to - nodeRange.from, 0);
    return range >= selectionRange;
  }
  var lift2 = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    const isActive2 = isNodeActive(state, type, attributes);
    if (!isActive2) {
      return false;
    }
    return lift(state, dispatch2);
  };
  var lift$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    lift: lift2
  });
  var liftEmptyBlock2 = () => ({ state, dispatch: dispatch2 }) => {
    return liftEmptyBlock(state, dispatch2);
  };
  var liftEmptyBlock$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    liftEmptyBlock: liftEmptyBlock2
  });
  var liftListItem2 = (typeOrName) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    return liftListItem(type)(state, dispatch2);
  };
  var liftListItem$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    liftListItem: liftListItem2
  });
  var newlineInCode2 = () => ({ state, dispatch: dispatch2 }) => {
    return newlineInCode(state, dispatch2);
  };
  var newlineInCode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    newlineInCode: newlineInCode2
  });
  function getSchemaTypeNameByName(name, schema) {
    if (schema.nodes[name]) {
      return "node";
    }
    if (schema.marks[name]) {
      return "mark";
    }
    return null;
  }
  function deleteProps(obj, propOrProps) {
    const props = typeof propOrProps === "string" ? [propOrProps] : propOrProps;
    return Object.keys(obj).reduce((newObj, prop) => {
      if (!props.includes(prop)) {
        newObj[prop] = obj[prop];
      }
      return newObj;
    }, {});
  }
  var resetAttributes = (typeOrName, attributes) => ({ tr, state, dispatch: dispatch2 }) => {
    let nodeType2 = null;
    let markType = null;
    const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
    if (!schemaType) {
      return false;
    }
    if (schemaType === "node") {
      nodeType2 = getNodeType(typeOrName, state.schema);
    }
    if (schemaType === "mark") {
      markType = getMarkType(typeOrName, state.schema);
    }
    if (dispatch2) {
      tr.selection.ranges.forEach((range) => {
        state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node4, pos) => {
          if (nodeType2 && nodeType2 === node4.type) {
            tr.setNodeMarkup(pos, void 0, deleteProps(node4.attrs, attributes));
          }
          if (markType && node4.marks.length) {
            node4.marks.forEach((mark3) => {
              if (markType === mark3.type) {
                tr.addMark(pos, pos + node4.nodeSize, markType.create(deleteProps(mark3.attrs, attributes)));
              }
            });
          }
        });
      });
    }
    return true;
  };
  var resetAttributes$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    resetAttributes
  });
  var scrollIntoView = () => ({ tr, dispatch: dispatch2 }) => {
    if (dispatch2) {
      tr.scrollIntoView();
    }
    return true;
  };
  var scrollIntoView$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    scrollIntoView
  });
  var selectAll2 = () => ({ tr, commands }) => {
    return commands.setTextSelection({
      from: 0,
      to: tr.doc.content.size
    });
  };
  var selectAll$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    selectAll: selectAll2
  });
  var selectNodeBackward2 = () => ({ state, dispatch: dispatch2 }) => {
    return selectNodeBackward(state, dispatch2);
  };
  var selectNodeBackward$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    selectNodeBackward: selectNodeBackward2
  });
  var selectNodeForward2 = () => ({ state, dispatch: dispatch2 }) => {
    return selectNodeForward(state, dispatch2);
  };
  var selectNodeForward$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    selectNodeForward: selectNodeForward2
  });
  var selectParentNode2 = () => ({ state, dispatch: dispatch2 }) => {
    return selectParentNode(state, dispatch2);
  };
  var selectParentNode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    selectParentNode: selectParentNode2
  });
  function createDocument(content2, schema, parseOptions = {}) {
    return createNodeFromContent(content2, schema, { slice: false, parseOptions });
  }
  var setContent = (content2, emitUpdate = false, parseOptions = {}) => ({ tr, editor: editor2, dispatch: dispatch2 }) => {
    const { doc: doc2 } = tr;
    const document2 = createDocument(content2, editor2.schema, parseOptions);
    const selection = TextSelection.create(doc2, 0, doc2.content.size);
    if (dispatch2) {
      tr.setSelection(selection).replaceSelectionWith(document2, false).setMeta("preventUpdate", !emitUpdate);
    }
    return true;
  };
  var setContent$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setContent
  });
  function getMarkAttributes(state, typeOrName) {
    const type = getMarkType(typeOrName, state.schema);
    const { from: from4, to, empty: empty2 } = state.selection;
    const marks2 = [];
    if (empty2) {
      if (state.storedMarks) {
        marks2.push(...state.storedMarks);
      }
      marks2.push(...state.selection.$head.marks());
    } else {
      state.doc.nodesBetween(from4, to, (node4) => {
        marks2.push(...node4.marks);
      });
    }
    const mark3 = marks2.find((markItem) => markItem.type.name === type.name);
    if (!mark3) {
      return {};
    }
    return { ...mark3.attrs };
  }
  var setMark = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
    const { selection } = tr;
    const { empty: empty2, ranges } = selection;
    const type = getMarkType(typeOrName, state.schema);
    if (dispatch2) {
      if (empty2) {
        const oldAttributes = getMarkAttributes(state, type);
        tr.addStoredMark(type.create({
          ...oldAttributes,
          ...attributes
        }));
      } else {
        ranges.forEach((range) => {
          const from4 = range.$from.pos;
          const to = range.$to.pos;
          state.doc.nodesBetween(from4, to, (node4, pos) => {
            const trimmedFrom = Math.max(pos, from4);
            const trimmedTo = Math.min(pos + node4.nodeSize, to);
            const someHasMark = node4.marks.find((mark3) => mark3.type === type);
            if (someHasMark) {
              node4.marks.forEach((mark3) => {
                if (type === mark3.type) {
                  tr.addMark(trimmedFrom, trimmedTo, type.create({
                    ...mark3.attrs,
                    ...attributes
                  }));
                }
              });
            } else {
              tr.addMark(trimmedFrom, trimmedTo, type.create(attributes));
            }
          });
        });
      }
    }
    return true;
  };
  var setMark$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setMark
  });
  var setMeta = (key, value) => ({ tr }) => {
    tr.setMeta(key, value);
    return true;
  };
  var setMeta$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setMeta
  });
  var setNode = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    return setBlockType(type, attributes)(state, dispatch2);
  };
  var setNode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setNode
  });
  var setNodeSelection = (position) => ({ tr, dispatch: dispatch2 }) => {
    if (dispatch2) {
      const { doc: doc2 } = tr;
      const minPos = Selection.atStart(doc2).from;
      const maxPos = Selection.atEnd(doc2).to;
      const resolvedPos = minMax(position, minPos, maxPos);
      const selection = NodeSelection.create(doc2, resolvedPos);
      tr.setSelection(selection);
    }
    return true;
  };
  var setNodeSelection$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setNodeSelection
  });
  var setTextSelection = (position) => ({ tr, dispatch: dispatch2 }) => {
    if (dispatch2) {
      const { doc: doc2 } = tr;
      const { from: from4, to } = typeof position === "number" ? { from: position, to: position } : position;
      const minPos = Selection.atStart(doc2).from;
      const maxPos = Selection.atEnd(doc2).to;
      const resolvedFrom = minMax(from4, minPos, maxPos);
      const resolvedEnd = minMax(to, minPos, maxPos);
      const selection = TextSelection.create(doc2, resolvedFrom, resolvedEnd);
      tr.setSelection(selection);
    }
    return true;
  };
  var setTextSelection$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    setTextSelection
  });
  var sinkListItem2 = (typeOrName) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    return sinkListItem(type)(state, dispatch2);
  };
  var sinkListItem$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    sinkListItem: sinkListItem2
  });
  function getSplittedAttributes(extensionAttributes, typeName, attributes) {
    return Object.fromEntries(Object.entries(attributes).filter(([name]) => {
      const extensionAttribute = extensionAttributes.find((item) => {
        return item.type === typeName && item.name === name;
      });
      if (!extensionAttribute) {
        return false;
      }
      return extensionAttribute.attribute.keepOnSplit;
    }));
  }
  function defaultBlockAt2(match) {
    for (let i = 0; i < match.edgeCount; i += 1) {
      const { type } = match.edge(i);
      if (type.isTextblock && !type.hasRequiredAttrs()) {
        return type;
      }
    }
    return null;
  }
  function ensureMarks(state, splittableMarks) {
    const marks2 = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
    if (marks2) {
      const filteredMarks = marks2.filter((mark3) => splittableMarks === null || splittableMarks === void 0 ? void 0 : splittableMarks.includes(mark3.type.name));
      state.tr.ensureMarks(filteredMarks);
    }
  }
  var splitBlock2 = ({ keepMarks = true } = {}) => ({ tr, state, dispatch: dispatch2, editor: editor2 }) => {
    const { selection, doc: doc2 } = tr;
    const { $from, $to } = selection;
    const extensionAttributes = editor2.extensionManager.attributes;
    const newAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
    if (selection instanceof NodeSelection && selection.node.isBlock) {
      if (!$from.parentOffset || !canSplit(doc2, $from.pos)) {
        return false;
      }
      if (dispatch2) {
        if (keepMarks) {
          ensureMarks(state, editor2.extensionManager.splittableMarks);
        }
        tr.split($from.pos).scrollIntoView();
      }
      return true;
    }
    if (!$from.parent.isBlock) {
      return false;
    }
    if (dispatch2) {
      const atEnd2 = $to.parentOffset === $to.parent.content.size;
      if (selection instanceof TextSelection) {
        tr.deleteSelection();
      }
      const deflt = $from.depth === 0 ? void 0 : defaultBlockAt2($from.node(-1).contentMatchAt($from.indexAfter(-1)));
      let types = atEnd2 && deflt ? [{
        type: deflt,
        attrs: newAttributes
      }] : void 0;
      let can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
      if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt ? [{ type: deflt }] : void 0)) {
        can = true;
        types = deflt ? [{
          type: deflt,
          attrs: newAttributes
        }] : void 0;
      }
      if (can) {
        tr.split(tr.mapping.map($from.pos), 1, types);
        if (deflt && !atEnd2 && !$from.parentOffset && $from.parent.type !== deflt) {
          const first2 = tr.mapping.map($from.before());
          const $first = tr.doc.resolve(first2);
          if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
            tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
          }
        }
      }
      if (keepMarks) {
        ensureMarks(state, editor2.extensionManager.splittableMarks);
      }
      tr.scrollIntoView();
    }
    return true;
  };
  var splitBlock$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    splitBlock: splitBlock2
  });
  var splitListItem = (typeOrName) => ({ tr, state, dispatch: dispatch2, editor: editor2 }) => {
    var _a;
    const type = getNodeType(typeOrName, state.schema);
    const { $from, $to } = state.selection;
    const node4 = state.selection.node;
    if (node4 && node4.isBlock || $from.depth < 2 || !$from.sameParent($to)) {
      return false;
    }
    const grandParent = $from.node(-1);
    if (grandParent.type !== type) {
      return false;
    }
    const extensionAttributes = editor2.extensionManager.attributes;
    if ($from.parent.content.size === 0 && $from.node(-1).childCount === $from.indexAfter(-1)) {
      if ($from.depth === 2 || $from.node(-3).type !== type || $from.index(-2) !== $from.node(-2).childCount - 1) {
        return false;
      }
      if (dispatch2) {
        let wrap = Fragment.empty;
        const depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
        for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d -= 1) {
          wrap = Fragment.from($from.node(d).copy(wrap));
        }
        const depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
        const newNextTypeAttributes2 = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
        const nextType2 = ((_a = type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.createAndFill(newNextTypeAttributes2)) || void 0;
        wrap = wrap.append(Fragment.from(type.createAndFill(null, nextType2) || void 0));
        const start3 = $from.before($from.depth - (depthBefore - 1));
        tr.replace(start3, $from.after(-depthAfter), new Slice(wrap, 4 - depthBefore, 0));
        let sel = -1;
        tr.doc.nodesBetween(start3, tr.doc.content.size, (n, pos) => {
          if (sel > -1) {
            return false;
          }
          if (n.isTextblock && n.content.size === 0) {
            sel = pos + 1;
          }
        });
        if (sel > -1) {
          tr.setSelection(TextSelection.near(tr.doc.resolve(sel)));
        }
        tr.scrollIntoView();
      }
      return true;
    }
    const nextType = $to.pos === $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
    const newTypeAttributes = getSplittedAttributes(extensionAttributes, grandParent.type.name, grandParent.attrs);
    const newNextTypeAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
    tr.delete($from.pos, $to.pos);
    const types = nextType ? [{ type, attrs: newTypeAttributes }, { type: nextType, attrs: newNextTypeAttributes }] : [{ type, attrs: newTypeAttributes }];
    if (!canSplit(tr.doc, $from.pos, 2)) {
      return false;
    }
    if (dispatch2) {
      tr.split($from.pos, 2, types).scrollIntoView();
    }
    return true;
  };
  var splitListItem$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    splitListItem
  });
  function findParentNodeClosestToPos($pos, predicate) {
    for (let i = $pos.depth; i > 0; i -= 1) {
      const node4 = $pos.node(i);
      if (predicate(node4)) {
        return {
          pos: i > 0 ? $pos.before(i) : 0,
          start: $pos.start(i),
          depth: i,
          node: node4
        };
      }
    }
  }
  function findParentNode(predicate) {
    return (selection) => findParentNodeClosestToPos(selection.$from, predicate);
  }
  function splitExtensions(extensions2) {
    const baseExtensions = extensions2.filter((extension) => extension.type === "extension");
    const nodeExtensions = extensions2.filter((extension) => extension.type === "node");
    const markExtensions = extensions2.filter((extension) => extension.type === "mark");
    return {
      baseExtensions,
      nodeExtensions,
      markExtensions
    };
  }
  function isObject(value) {
    return typeof value === "function";
  }
  function callOrReturn(value, context = void 0, ...props) {
    if (isObject(value)) {
      if (context) {
        return value.bind(context)(...props);
      }
      return value(...props);
    }
    return value;
  }
  function getExtensionField(extension, field, context = {}) {
    if (extension.config[field] === void 0 && extension.parent) {
      return getExtensionField(extension.parent, field, context);
    }
    if (typeof extension.config[field] === "function") {
      const value = extension.config[field].bind({
        ...context,
        parent: extension.parent ? getExtensionField(extension.parent, field, context) : null
      });
      return value;
    }
    return extension.config[field];
  }
  function isList(name, extensions2) {
    const { nodeExtensions } = splitExtensions(extensions2);
    const extension = nodeExtensions.find((item) => item.name === name);
    if (!extension) {
      return false;
    }
    const context = {
      name: extension.name,
      options: extension.options
    };
    const group = callOrReturn(getExtensionField(extension, "group", context));
    if (typeof group !== "string") {
      return false;
    }
    return group.split(" ").includes("list");
  }
  var toggleList = (listTypeOrName, itemTypeOrName) => ({ editor: editor2, tr, state, dispatch: dispatch2, chain, commands, can }) => {
    const { extensions: extensions2 } = editor2.extensionManager;
    const listType = getNodeType(listTypeOrName, state.schema);
    const itemType = getNodeType(itemTypeOrName, state.schema);
    const { selection } = state;
    const { $from, $to } = selection;
    const range = $from.blockRange($to);
    if (!range) {
      return false;
    }
    const parentList = findParentNode((node4) => isList(node4.type.name, extensions2))(selection);
    if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
      if (parentList.node.type === listType) {
        return commands.liftListItem(itemType);
      }
      if (isList(parentList.node.type.name, extensions2) && listType.validContent(parentList.node.content) && dispatch2) {
        tr.setNodeMarkup(parentList.pos, listType);
        return true;
      }
    }
    const canWrapInList = can().wrapInList(listType);
    if (!canWrapInList) {
      return chain().clearNodes().wrapInList(listType).run();
    }
    return commands.wrapInList(listType);
  };
  var toggleList$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    toggleList
  });
  function isMarkActive(state, typeOrName, attributes = {}) {
    const { empty: empty2, ranges } = state.selection;
    const type = typeOrName ? getMarkType(typeOrName, state.schema) : null;
    if (empty2) {
      return !!(state.storedMarks || state.selection.$from.marks()).filter((mark3) => {
        if (!type) {
          return true;
        }
        return type.name === mark3.type.name;
      }).find((mark3) => objectIncludes(mark3.attrs, attributes, { strict: false }));
    }
    let selectionRange = 0;
    const markRanges = [];
    ranges.forEach(({ $from, $to }) => {
      const from4 = $from.pos;
      const to = $to.pos;
      state.doc.nodesBetween(from4, to, (node4, pos) => {
        if (!node4.isText && !node4.marks.length) {
          return;
        }
        const relativeFrom = Math.max(from4, pos);
        const relativeTo = Math.min(to, pos + node4.nodeSize);
        const range2 = relativeTo - relativeFrom;
        selectionRange += range2;
        markRanges.push(...node4.marks.map((mark3) => ({
          mark: mark3,
          from: relativeFrom,
          to: relativeTo
        })));
      });
    });
    if (selectionRange === 0) {
      return false;
    }
    const matchedRange = markRanges.filter((markRange) => {
      if (!type) {
        return true;
      }
      return type.name === markRange.mark.type.name;
    }).filter((markRange) => objectIncludes(markRange.mark.attrs, attributes, { strict: false })).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
    const excludedRange = markRanges.filter((markRange) => {
      if (!type) {
        return true;
      }
      return markRange.mark.type !== type && markRange.mark.type.excludes(type);
    }).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
    const range = matchedRange > 0 ? matchedRange + excludedRange : matchedRange;
    return range >= selectionRange;
  }
  var toggleMark = (typeOrName, attributes = {}, options = {}) => ({ state, commands }) => {
    const { extendEmptyMarkRange = false } = options;
    const type = getMarkType(typeOrName, state.schema);
    const isActive2 = isMarkActive(state, type, attributes);
    if (isActive2) {
      return commands.unsetMark(type, { extendEmptyMarkRange });
    }
    return commands.setMark(type, attributes);
  };
  var toggleMark$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    toggleMark
  });
  var toggleNode = (typeOrName, toggleTypeOrName, attributes = {}) => ({ state, commands }) => {
    const type = getNodeType(typeOrName, state.schema);
    const toggleType = getNodeType(toggleTypeOrName, state.schema);
    const isActive2 = isNodeActive(state, type, attributes);
    if (isActive2) {
      return commands.setNode(toggleType);
    }
    return commands.setNode(type, attributes);
  };
  var toggleNode$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    toggleNode
  });
  var toggleWrap = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    const isActive2 = isNodeActive(state, type, attributes);
    if (isActive2) {
      return lift(state, dispatch2);
    }
    return wrapIn(type, attributes)(state, dispatch2);
  };
  var toggleWrap$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    toggleWrap
  });
  var undoInputRule = () => ({ state, dispatch: dispatch2 }) => {
    const plugins = state.plugins;
    for (let i = 0; i < plugins.length; i += 1) {
      const plugin = plugins[i];
      let undoable;
      if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
        if (dispatch2) {
          const tr = state.tr;
          const toUndo = undoable.transform;
          for (let j = toUndo.steps.length - 1; j >= 0; j -= 1) {
            tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
          }
          if (undoable.text) {
            const marks2 = tr.doc.resolve(undoable.from).marks();
            tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks2));
          } else {
            tr.delete(undoable.from, undoable.to);
          }
        }
        return true;
      }
    }
    return false;
  };
  var undoInputRule$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    undoInputRule
  });
  var unsetAllMarks = () => ({ tr, state, dispatch: dispatch2 }) => {
    const { selection } = tr;
    const { empty: empty2, ranges } = selection;
    if (empty2) {
      return true;
    }
    if (dispatch2) {
      Object.entries(state.schema.marks).forEach(([, mark3]) => {
        ranges.forEach((range) => {
          tr.removeMark(range.$from.pos, range.$to.pos, mark3);
        });
      });
    }
    return true;
  };
  var unsetAllMarks$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    unsetAllMarks
  });
  var unsetMark = (typeOrName, options = {}) => ({ tr, state, dispatch: dispatch2 }) => {
    var _a;
    const { extendEmptyMarkRange = false } = options;
    const { selection } = tr;
    const type = getMarkType(typeOrName, state.schema);
    const { $from, empty: empty2, ranges } = selection;
    if (!dispatch2) {
      return true;
    }
    if (empty2 && extendEmptyMarkRange) {
      let { from: from4, to } = selection;
      const attrs = (_a = $from.marks().find((mark3) => mark3.type === type)) === null || _a === void 0 ? void 0 : _a.attrs;
      const range = getMarkRange($from, type, attrs);
      if (range) {
        from4 = range.from;
        to = range.to;
      }
      tr.removeMark(from4, to, type);
    } else {
      ranges.forEach((range) => {
        tr.removeMark(range.$from.pos, range.$to.pos, type);
      });
    }
    tr.removeStoredMark(type);
    return true;
  };
  var unsetMark$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    unsetMark
  });
  var updateAttributes = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
    let nodeType2 = null;
    let markType = null;
    const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
    if (!schemaType) {
      return false;
    }
    if (schemaType === "node") {
      nodeType2 = getNodeType(typeOrName, state.schema);
    }
    if (schemaType === "mark") {
      markType = getMarkType(typeOrName, state.schema);
    }
    if (dispatch2) {
      tr.selection.ranges.forEach((range) => {
        const from4 = range.$from.pos;
        const to = range.$to.pos;
        state.doc.nodesBetween(from4, to, (node4, pos) => {
          if (nodeType2 && nodeType2 === node4.type) {
            tr.setNodeMarkup(pos, void 0, {
              ...node4.attrs,
              ...attributes
            });
          }
          if (markType && node4.marks.length) {
            node4.marks.forEach((mark3) => {
              if (markType === mark3.type) {
                const trimmedFrom = Math.max(pos, from4);
                const trimmedTo = Math.min(pos + node4.nodeSize, to);
                tr.addMark(trimmedFrom, trimmedTo, markType.create({
                  ...mark3.attrs,
                  ...attributes
                }));
              }
            });
          }
        });
      });
    }
    return true;
  };
  var updateAttributes$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    updateAttributes
  });
  var wrapIn2 = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    const isActive2 = isNodeActive(state, type, attributes);
    if (isActive2) {
      return false;
    }
    return wrapIn(type, attributes)(state, dispatch2);
  };
  var wrapIn$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    wrapIn: wrapIn2
  });
  var wrapInList2 = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
    const type = getNodeType(typeOrName, state.schema);
    return wrapInList(type, attributes)(state, dispatch2);
  };
  var wrapInList$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    wrapInList: wrapInList2
  });
  var Commands = Extension.create({
    name: "commands",
    addCommands() {
      return {
        ...blur$1,
        ...clearContent$1,
        ...clearNodes$1,
        ...command$1,
        ...createParagraphNear$1,
        ...deleteNode$1,
        ...deleteRange$1,
        ...deleteSelection$1,
        ...enter$1,
        ...exitCode$1,
        ...extendMarkRange$1,
        ...first$1,
        ...focus$1,
        ...forEach$1,
        ...insertContent$1,
        ...insertContentAt$1,
        ...joinBackward$1,
        ...joinForward$1,
        ...keyboardShortcut$1,
        ...lift$1,
        ...liftEmptyBlock$1,
        ...liftListItem$1,
        ...newlineInCode$1,
        ...resetAttributes$1,
        ...scrollIntoView$1,
        ...selectAll$1,
        ...selectNodeBackward$1,
        ...selectNodeForward$1,
        ...selectParentNode$1,
        ...setContent$1,
        ...setMark$1,
        ...setMeta$1,
        ...setNode$1,
        ...setNodeSelection$1,
        ...setTextSelection$1,
        ...sinkListItem$1,
        ...splitBlock$1,
        ...splitListItem$1,
        ...toggleList$1,
        ...toggleMark$1,
        ...toggleNode$1,
        ...toggleWrap$1,
        ...undoInputRule$1,
        ...unsetAllMarks$1,
        ...unsetMark$1,
        ...updateAttributes$1,
        ...wrapIn$1,
        ...wrapInList$1
      };
    }
  });
  var Editable = Extension.create({
    name: "editable",
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("editable"),
          props: {
            editable: () => this.editor.options.editable
          }
        })
      ];
    }
  });
  var FocusEvents = Extension.create({
    name: "focusEvents",
    addProseMirrorPlugins() {
      const { editor: editor2 } = this;
      return [
        new Plugin({
          key: new PluginKey("focusEvents"),
          props: {
            handleDOMEvents: {
              focus: (view, event) => {
                editor2.isFocused = true;
                const transaction = editor2.state.tr.setMeta("focus", { event }).setMeta("addToHistory", false);
                view.dispatch(transaction);
                return false;
              },
              blur: (view, event) => {
                editor2.isFocused = false;
                const transaction = editor2.state.tr.setMeta("blur", { event }).setMeta("addToHistory", false);
                view.dispatch(transaction);
                return false;
              }
            }
          }
        })
      ];
    }
  });
  var Keymap = Extension.create({
    name: "keymap",
    addKeyboardShortcuts() {
      const handleBackspace = () => this.editor.commands.first(({ commands }) => [
        () => commands.undoInputRule(),
        () => commands.deleteSelection(),
        () => commands.joinBackward(),
        () => commands.selectNodeBackward()
      ]);
      const handleDelete = () => this.editor.commands.first(({ commands }) => [
        () => commands.deleteSelection(),
        () => commands.joinForward(),
        () => commands.selectNodeForward()
      ]);
      return {
        Enter: () => this.editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock()
        ]),
        "Mod-Enter": () => this.editor.commands.exitCode(),
        Backspace: handleBackspace,
        "Mod-Backspace": handleBackspace,
        "Shift-Backspace": handleBackspace,
        Delete: handleDelete,
        "Mod-Delete": handleDelete,
        "Mod-a": () => this.editor.commands.selectAll()
      };
    }
  });
  var Tabindex = Extension.create({
    name: "tabindex",
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("tabindex"),
          props: {
            attributes: {
              tabindex: "0"
            }
          }
        })
      ];
    }
  });
  var extensions = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ClipboardTextSerializer,
    Commands,
    Editable,
    FocusEvents,
    Keymap,
    Tabindex
  });
  function getNodeAttributes(state, typeOrName) {
    const type = getNodeType(typeOrName, state.schema);
    const { from: from4, to } = state.selection;
    const nodes = [];
    state.doc.nodesBetween(from4, to, (node5) => {
      nodes.push(node5);
    });
    const node4 = nodes.reverse().find((nodeItem) => nodeItem.type.name === type.name);
    if (!node4) {
      return {};
    }
    return { ...node4.attrs };
  }
  function getAttributes(state, typeOrName) {
    const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
    if (schemaType === "node") {
      return getNodeAttributes(state, typeOrName);
    }
    if (schemaType === "mark") {
      return getMarkAttributes(state, typeOrName);
    }
    return {};
  }
  function isActive(state, name, attributes = {}) {
    if (!name) {
      return isNodeActive(state, null, attributes) || isMarkActive(state, null, attributes);
    }
    const schemaType = getSchemaTypeNameByName(name, state.schema);
    if (schemaType === "node") {
      return isNodeActive(state, name, attributes);
    }
    if (schemaType === "mark") {
      return isMarkActive(state, name, attributes);
    }
    return false;
  }
  function removeElement(element) {
    if (element === null || element === void 0 ? void 0 : element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  function getHTMLFromFragment(fragment, schema) {
    const documentFragment = DOMSerializer.fromSchema(schema).serializeFragment(fragment);
    const temporaryDocument = document.implementation.createHTMLDocument();
    const container = temporaryDocument.createElement("div");
    container.appendChild(documentFragment);
    return container.innerHTML;
  }
  function getText(node4, options) {
    const range = {
      from: 0,
      to: node4.content.size
    };
    return getTextBetween(node4, range, options);
  }
  function isNodeEmpty(node4) {
    var _a;
    const defaultContent = (_a = node4.type.createAndFill()) === null || _a === void 0 ? void 0 : _a.toJSON();
    const content2 = node4.toJSON();
    return JSON.stringify(defaultContent) === JSON.stringify(content2);
  }
  function createStyleTag(style2) {
    const tipTapStyleTag = document.querySelector("style[data-tiptap-style]");
    if (tipTapStyleTag !== null) {
      return tipTapStyleTag;
    }
    const styleNode = document.createElement("style");
    styleNode.setAttribute("data-tiptap-style", "");
    styleNode.innerHTML = style2;
    document.getElementsByTagName("head")[0].appendChild(styleNode);
    return styleNode;
  }
  function createChainableState(config) {
    const { state, transaction } = config;
    let { selection } = transaction;
    let { doc: doc2 } = transaction;
    let { storedMarks } = transaction;
    return {
      ...state,
      schema: state.schema,
      plugins: state.plugins,
      apply: state.apply.bind(state),
      applyTransaction: state.applyTransaction.bind(state),
      reconfigure: state.reconfigure.bind(state),
      toJSON: state.toJSON.bind(state),
      get storedMarks() {
        return storedMarks;
      },
      get selection() {
        return selection;
      },
      get doc() {
        return doc2;
      },
      get tr() {
        selection = transaction.selection;
        doc2 = transaction.doc;
        storedMarks = transaction.storedMarks;
        return transaction;
      }
    };
  }
  var CommandManager = class {
    constructor(props) {
      this.editor = props.editor;
      this.rawCommands = this.editor.extensionManager.commands;
      this.customState = props.state;
    }
    get hasCustomState() {
      return !!this.customState;
    }
    get state() {
      return this.customState || this.editor.state;
    }
    get commands() {
      const { rawCommands, editor: editor2, state } = this;
      const { view } = editor2;
      const { tr } = state;
      const props = this.buildProps(tr);
      return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
        const method = (...args) => {
          const callback = command2(...args)(props);
          if (!tr.getMeta("preventDispatch") && !this.hasCustomState) {
            view.dispatch(tr);
          }
          return callback;
        };
        return [name, method];
      }));
    }
    get chain() {
      return () => this.createChain();
    }
    get can() {
      return () => this.createCan();
    }
    createChain(startTr, shouldDispatch = true) {
      const { rawCommands, editor: editor2, state } = this;
      const { view } = editor2;
      const callbacks = [];
      const hasStartTransaction = !!startTr;
      const tr = startTr || state.tr;
      const run2 = () => {
        if (!hasStartTransaction && shouldDispatch && !tr.getMeta("preventDispatch") && !this.hasCustomState) {
          view.dispatch(tr);
        }
        return callbacks.every((callback) => callback === true);
      };
      const chain = {
        ...Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
          const chainedCommand = (...args) => {
            const props = this.buildProps(tr, shouldDispatch);
            const callback = command2(...args)(props);
            callbacks.push(callback);
            return chain;
          };
          return [name, chainedCommand];
        })),
        run: run2
      };
      return chain;
    }
    createCan(startTr) {
      const { rawCommands, state } = this;
      const dispatch2 = void 0;
      const tr = startTr || state.tr;
      const props = this.buildProps(tr, dispatch2);
      const formattedCommands = Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
        return [name, (...args) => command2(...args)({ ...props, dispatch: dispatch2 })];
      }));
      return {
        ...formattedCommands,
        chain: () => this.createChain(tr, dispatch2)
      };
    }
    buildProps(tr, shouldDispatch = true) {
      const { rawCommands, editor: editor2, state } = this;
      const { view } = editor2;
      if (state.storedMarks) {
        tr.setStoredMarks(state.storedMarks);
      }
      const props = {
        tr,
        editor: editor2,
        view,
        state: createChainableState({
          state,
          transaction: tr
        }),
        dispatch: shouldDispatch ? () => void 0 : void 0,
        chain: () => this.createChain(tr),
        can: () => this.createCan(tr),
        get commands() {
          return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
            return [name, (...args) => command2(...args)(props)];
          }));
        }
      };
      return props;
    }
  };
  var InputRule = class {
    constructor(config) {
      this.find = config.find;
      this.handler = config.handler;
    }
  };
  var inputRuleMatcherHandler = (text2, find3) => {
    if (isRegExp(find3)) {
      return find3.exec(text2);
    }
    const inputRuleMatch = find3(text2);
    if (!inputRuleMatch) {
      return null;
    }
    const result2 = [];
    result2.push(inputRuleMatch.text);
    result2.index = inputRuleMatch.index;
    result2.input = text2;
    result2.data = inputRuleMatch.data;
    if (inputRuleMatch.replaceWith) {
      if (!inputRuleMatch.text.includes(inputRuleMatch.replaceWith)) {
        console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".');
      }
      result2.push(inputRuleMatch.replaceWith);
    }
    return result2;
  };
  function run$1(config) {
    var _a;
    const { editor: editor2, from: from4, to, text: text2, rules, plugin } = config;
    const { view } = editor2;
    if (view.composing) {
      return false;
    }
    const $from = view.state.doc.resolve(from4);
    if ($from.parent.type.spec.code || !!((_a = $from.nodeBefore || $from.nodeAfter) === null || _a === void 0 ? void 0 : _a.marks.find((mark3) => mark3.type.spec.code))) {
      return false;
    }
    let matched = false;
    const maxMatch = 500;
    const textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - maxMatch), $from.parentOffset, void 0, "\uFFFC") + text2;
    rules.forEach((rule) => {
      if (matched) {
        return;
      }
      const match = inputRuleMatcherHandler(textBefore, rule.find);
      if (!match) {
        return;
      }
      const tr = view.state.tr;
      const state = createChainableState({
        state: view.state,
        transaction: tr
      });
      const range = {
        from: from4 - (match[0].length - text2.length),
        to
      };
      const { commands, chain, can } = new CommandManager({
        editor: editor2,
        state
      });
      rule.handler({
        state,
        range,
        match,
        commands,
        chain,
        can
      });
      if (!tr.steps.length) {
        return;
      }
      tr.setMeta(plugin, {
        transform: tr,
        from: from4,
        to,
        text: text2
      });
      view.dispatch(tr);
      matched = true;
    });
    return matched;
  }
  function inputRulesPlugin(props) {
    const { editor: editor2, rules } = props;
    const plugin = new Plugin({
      state: {
        init() {
          return null;
        },
        apply(tr, prev) {
          const stored = tr.getMeta(this);
          if (stored) {
            return stored;
          }
          return tr.selectionSet || tr.docChanged ? null : prev;
        }
      },
      props: {
        handleTextInput(view, from4, to, text2) {
          return run$1({
            editor: editor2,
            from: from4,
            to,
            text: text2,
            rules,
            plugin
          });
        },
        handleDOMEvents: {
          compositionend: (view) => {
            setTimeout(() => {
              const { $cursor } = view.state.selection;
              if ($cursor) {
                run$1({
                  editor: editor2,
                  from: $cursor.pos,
                  to: $cursor.pos,
                  text: "",
                  rules,
                  plugin
                });
              }
            });
            return false;
          }
        },
        handleKeyDown(view, event) {
          if (event.key !== "Enter") {
            return false;
          }
          const { $cursor } = view.state.selection;
          if ($cursor) {
            return run$1({
              editor: editor2,
              from: $cursor.pos,
              to: $cursor.pos,
              text: "\n",
              rules,
              plugin
            });
          }
          return false;
        }
      },
      isInputRules: true
    });
    return plugin;
  }
  var PasteRule = class {
    constructor(config) {
      this.find = config.find;
      this.handler = config.handler;
    }
  };
  var pasteRuleMatcherHandler = (text2, find3) => {
    if (isRegExp(find3)) {
      return [...text2.matchAll(find3)];
    }
    const matches2 = find3(text2);
    if (!matches2) {
      return [];
    }
    return matches2.map((pasteRuleMatch) => {
      const result2 = [];
      result2.push(pasteRuleMatch.text);
      result2.index = pasteRuleMatch.index;
      result2.input = text2;
      result2.data = pasteRuleMatch.data;
      if (pasteRuleMatch.replaceWith) {
        if (!pasteRuleMatch.text.includes(pasteRuleMatch.replaceWith)) {
          console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".');
        }
        result2.push(pasteRuleMatch.replaceWith);
      }
      return result2;
    });
  };
  function run(config) {
    const { editor: editor2, state, from: from4, to, rules } = config;
    const { commands, chain, can } = new CommandManager({
      editor: editor2,
      state
    });
    state.doc.nodesBetween(from4, to, (node4, pos) => {
      if (!node4.isTextblock || node4.type.spec.code) {
        return;
      }
      const resolvedFrom = Math.max(from4, pos);
      const resolvedTo = Math.min(to, pos + node4.content.size);
      const textToMatch = node4.textBetween(resolvedFrom - pos, resolvedTo - pos, void 0, "\uFFFC");
      rules.forEach((rule) => {
        const matches2 = pasteRuleMatcherHandler(textToMatch, rule.find);
        matches2.forEach((match) => {
          if (match.index === void 0) {
            return;
          }
          const start3 = resolvedFrom + match.index + 1;
          const end2 = start3 + match[0].length;
          const range = {
            from: state.tr.mapping.map(start3),
            to: state.tr.mapping.map(end2)
          };
          rule.handler({
            state,
            range,
            match,
            commands,
            chain,
            can
          });
        });
      });
    });
  }
  function pasteRulesPlugin(props) {
    const { editor: editor2, rules } = props;
    let isProseMirrorHTML = false;
    const plugin = new Plugin({
      props: {
        handlePaste: (view, event) => {
          var _a;
          const html = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/html");
          isProseMirrorHTML = !!(html === null || html === void 0 ? void 0 : html.includes("data-pm-slice"));
          return false;
        }
      },
      appendTransaction: (transactions, oldState, state) => {
        const transaction = transactions[0];
        if (!transaction.getMeta("paste") || isProseMirrorHTML) {
          return;
        }
        const { doc: doc2, before: before2 } = transaction;
        const from4 = before2.content.findDiffStart(doc2.content);
        const to = before2.content.findDiffEnd(doc2.content);
        if (!from4 || !to || from4 === to.b) {
          return;
        }
        const tr = state.tr;
        const chainableState = createChainableState({
          state,
          transaction: tr
        });
        run({
          editor: editor2,
          state: chainableState,
          from: Math.max(from4 - 1, 0),
          to: to.b,
          rules,
          plugin
        });
        if (!tr.steps.length) {
          return;
        }
        return tr;
      },
      isPasteRules: true
    });
    return plugin;
  }
  function getAttributesFromExtensions(extensions2) {
    const extensionAttributes = [];
    const { nodeExtensions, markExtensions } = splitExtensions(extensions2);
    const nodeAndMarkExtensions = [...nodeExtensions, ...markExtensions];
    const defaultAttribute = {
      default: null,
      rendered: true,
      renderHTML: null,
      parseHTML: null,
      keepOnSplit: true
    };
    extensions2.forEach((extension) => {
      const context = {
        name: extension.name,
        options: extension.options
      };
      const addGlobalAttributes = getExtensionField(extension, "addGlobalAttributes", context);
      if (!addGlobalAttributes) {
        return;
      }
      const globalAttributes = addGlobalAttributes();
      globalAttributes.forEach((globalAttribute) => {
        globalAttribute.types.forEach((type) => {
          Object.entries(globalAttribute.attributes).forEach(([name, attribute]) => {
            extensionAttributes.push({
              type,
              name,
              attribute: {
                ...defaultAttribute,
                ...attribute
              }
            });
          });
        });
      });
    });
    nodeAndMarkExtensions.forEach((extension) => {
      const context = {
        name: extension.name,
        options: extension.options
      };
      const addAttributes = getExtensionField(extension, "addAttributes", context);
      if (!addAttributes) {
        return;
      }
      const attributes = addAttributes();
      Object.entries(attributes).forEach(([name, attribute]) => {
        extensionAttributes.push({
          type: extension.name,
          name,
          attribute: {
            ...defaultAttribute,
            ...attribute
          }
        });
      });
    });
    return extensionAttributes;
  }
  function mergeAttributes(...objects) {
    return objects.filter((item) => !!item).reduce((items, item) => {
      const mergedAttributes = { ...items };
      Object.entries(item).forEach(([key, value]) => {
        const exists = mergedAttributes[key];
        if (!exists) {
          mergedAttributes[key] = value;
          return;
        }
        if (key === "class") {
          mergedAttributes[key] = [mergedAttributes[key], value].join(" ");
        } else if (key === "style") {
          mergedAttributes[key] = [mergedAttributes[key], value].join("; ");
        } else {
          mergedAttributes[key] = value;
        }
      });
      return mergedAttributes;
    }, {});
  }
  function getRenderedAttributes(nodeOrMark, extensionAttributes) {
    return extensionAttributes.filter((item) => item.attribute.rendered).map((item) => {
      if (!item.attribute.renderHTML) {
        return {
          [item.name]: nodeOrMark.attrs[item.name]
        };
      }
      return item.attribute.renderHTML(nodeOrMark.attrs) || {};
    }).reduce((attributes, attribute) => mergeAttributes(attributes, attribute), {});
  }
  function isEmptyObject(value = {}) {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }
  function fromString(value) {
    if (typeof value !== "string") {
      return value;
    }
    if (value.match(/^\d*(\.\d+)?$/)) {
      return Number(value);
    }
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    return value;
  }
  function injectExtensionAttributesToParseRule(parseRule2, extensionAttributes) {
    if (parseRule2.style) {
      return parseRule2;
    }
    return {
      ...parseRule2,
      getAttrs: (node4) => {
        const oldAttributes = parseRule2.getAttrs ? parseRule2.getAttrs(node4) : parseRule2.attrs;
        if (oldAttributes === false) {
          return false;
        }
        const newAttributes = extensionAttributes.filter((item) => item.attribute.rendered).reduce((items, item) => {
          const value = item.attribute.parseHTML ? item.attribute.parseHTML(node4) : fromString(node4.getAttribute(item.name));
          if (isObject$1(value)) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "parseHTML" for your attribute "${item.name}" returns an object but should return the value itself. If this is expected you can ignore this message. This warning will be removed in one of the next releases. Further information: https://github.com/ueberdosis/tiptap/issues/1863`);
          }
          if (value === null || value === void 0) {
            return items;
          }
          return {
            ...items,
            [item.name]: value
          };
        }, {});
        return { ...oldAttributes, ...newAttributes };
      }
    };
  }
  function cleanUpSchemaItem(data) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => {
      if (key === "attrs" && isEmptyObject(value)) {
        return false;
      }
      return value !== null && value !== void 0;
    }));
  }
  function getSchemaByResolvedExtensions(extensions2) {
    var _a;
    const allAttributes = getAttributesFromExtensions(extensions2);
    const { nodeExtensions, markExtensions } = splitExtensions(extensions2);
    const topNode = (_a = nodeExtensions.find((extension) => getExtensionField(extension, "topNode"))) === null || _a === void 0 ? void 0 : _a.name;
    const nodes = Object.fromEntries(nodeExtensions.map((extension) => {
      const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
      const context = {
        name: extension.name,
        options: extension.options
      };
      const extraNodeFields = extensions2.reduce((fields, e) => {
        const extendNodeSchema = getExtensionField(e, "extendNodeSchema", context);
        return {
          ...fields,
          ...extendNodeSchema ? extendNodeSchema(extension) : {}
        };
      }, {});
      const schema = cleanUpSchemaItem({
        ...extraNodeFields,
        content: callOrReturn(getExtensionField(extension, "content", context)),
        marks: callOrReturn(getExtensionField(extension, "marks", context)),
        group: callOrReturn(getExtensionField(extension, "group", context)),
        inline: callOrReturn(getExtensionField(extension, "inline", context)),
        atom: callOrReturn(getExtensionField(extension, "atom", context)),
        selectable: callOrReturn(getExtensionField(extension, "selectable", context)),
        draggable: callOrReturn(getExtensionField(extension, "draggable", context)),
        code: callOrReturn(getExtensionField(extension, "code", context)),
        defining: callOrReturn(getExtensionField(extension, "defining", context)),
        isolating: callOrReturn(getExtensionField(extension, "isolating", context)),
        attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
          var _a2;
          return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
        }))
      });
      const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
      if (parseHTML) {
        schema.parseDOM = parseHTML.map((parseRule2) => injectExtensionAttributesToParseRule(parseRule2, extensionAttributes));
      }
      const renderHTML = getExtensionField(extension, "renderHTML", context);
      if (renderHTML) {
        schema.toDOM = (node4) => renderHTML({
          node: node4,
          HTMLAttributes: getRenderedAttributes(node4, extensionAttributes)
        });
      }
      const renderText = getExtensionField(extension, "renderText", context);
      if (renderText) {
        schema.toText = renderText;
      }
      return [extension.name, schema];
    }));
    const marks2 = Object.fromEntries(markExtensions.map((extension) => {
      const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
      const context = {
        name: extension.name,
        options: extension.options
      };
      const extraMarkFields = extensions2.reduce((fields, e) => {
        const extendMarkSchema = getExtensionField(e, "extendMarkSchema", context);
        return {
          ...fields,
          ...extendMarkSchema ? extendMarkSchema(extension) : {}
        };
      }, {});
      const schema = cleanUpSchemaItem({
        ...extraMarkFields,
        inclusive: callOrReturn(getExtensionField(extension, "inclusive", context)),
        excludes: callOrReturn(getExtensionField(extension, "excludes", context)),
        group: callOrReturn(getExtensionField(extension, "group", context)),
        spanning: callOrReturn(getExtensionField(extension, "spanning", context)),
        code: callOrReturn(getExtensionField(extension, "code", context)),
        attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
          var _a2;
          return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
        }))
      });
      const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
      if (parseHTML) {
        schema.parseDOM = parseHTML.map((parseRule2) => injectExtensionAttributesToParseRule(parseRule2, extensionAttributes));
      }
      const renderHTML = getExtensionField(extension, "renderHTML", context);
      if (renderHTML) {
        schema.toDOM = (mark3) => renderHTML({
          mark: mark3,
          HTMLAttributes: getRenderedAttributes(mark3, extensionAttributes)
        });
      }
      return [extension.name, schema];
    }));
    return new Schema({
      topNode,
      nodes,
      marks: marks2
    });
  }
  function getSchemaTypeByName(name, schema) {
    return schema.nodes[name] || schema.marks[name] || null;
  }
  var ExtensionManager = class {
    constructor(extensions2, editor2) {
      this.splittableMarks = [];
      this.editor = editor2;
      this.extensions = ExtensionManager.resolve(extensions2);
      this.schema = getSchemaByResolvedExtensions(this.extensions);
      this.extensions.forEach((extension) => {
        var _a;
        const context = {
          name: extension.name,
          options: extension.options,
          editor: this.editor,
          type: getSchemaTypeByName(extension.name, this.schema)
        };
        if (extension.type === "mark") {
          const keepOnSplit = (_a = callOrReturn(getExtensionField(extension, "keepOnSplit", context))) !== null && _a !== void 0 ? _a : true;
          if (keepOnSplit) {
            this.splittableMarks.push(extension.name);
          }
        }
        const onBeforeCreate = getExtensionField(extension, "onBeforeCreate", context);
        if (onBeforeCreate) {
          this.editor.on("beforeCreate", onBeforeCreate);
        }
        const onCreate = getExtensionField(extension, "onCreate", context);
        if (onCreate) {
          this.editor.on("create", onCreate);
        }
        const onUpdate = getExtensionField(extension, "onUpdate", context);
        if (onUpdate) {
          this.editor.on("update", onUpdate);
        }
        const onSelectionUpdate = getExtensionField(extension, "onSelectionUpdate", context);
        if (onSelectionUpdate) {
          this.editor.on("selectionUpdate", onSelectionUpdate);
        }
        const onTransaction = getExtensionField(extension, "onTransaction", context);
        if (onTransaction) {
          this.editor.on("transaction", onTransaction);
        }
        const onFocus = getExtensionField(extension, "onFocus", context);
        if (onFocus) {
          this.editor.on("focus", onFocus);
        }
        const onBlur = getExtensionField(extension, "onBlur", context);
        if (onBlur) {
          this.editor.on("blur", onBlur);
        }
        const onDestroy = getExtensionField(extension, "onDestroy", context);
        if (onDestroy) {
          this.editor.on("destroy", onDestroy);
        }
      });
    }
    static resolve(extensions2) {
      return ExtensionManager.sort(ExtensionManager.flatten(extensions2));
    }
    static flatten(extensions2) {
      return extensions2.map((extension) => {
        const context = {
          name: extension.name,
          options: extension.options
        };
        const addExtensions = getExtensionField(extension, "addExtensions", context);
        if (addExtensions) {
          return [
            extension,
            ...this.flatten(addExtensions())
          ];
        }
        return extension;
      }).flat(10);
    }
    static sort(extensions2) {
      const defaultPriority = 100;
      return extensions2.sort((a, b) => {
        const priorityA = getExtensionField(a, "priority") || defaultPriority;
        const priorityB = getExtensionField(b, "priority") || defaultPriority;
        if (priorityA > priorityB) {
          return -1;
        }
        if (priorityA < priorityB) {
          return 1;
        }
        return 0;
      });
    }
    get commands() {
      return this.extensions.reduce((commands, extension) => {
        const context = {
          name: extension.name,
          options: extension.options,
          editor: this.editor,
          type: getSchemaTypeByName(extension.name, this.schema)
        };
        const addCommands = getExtensionField(extension, "addCommands", context);
        if (!addCommands) {
          return commands;
        }
        return {
          ...commands,
          ...addCommands()
        };
      }, {});
    }
    get plugins() {
      const { editor: editor2 } = this;
      const extensions2 = ExtensionManager.sort([...this.extensions].reverse());
      const inputRules = [];
      const pasteRules = [];
      const allPlugins = extensions2.map((extension) => {
        const context = {
          name: extension.name,
          options: extension.options,
          editor: editor2,
          type: getSchemaTypeByName(extension.name, this.schema)
        };
        const plugins = [];
        const addKeyboardShortcuts = getExtensionField(extension, "addKeyboardShortcuts", context);
        if (addKeyboardShortcuts) {
          const bindings = Object.fromEntries(Object.entries(addKeyboardShortcuts()).map(([shortcut, method]) => {
            return [shortcut, () => method({ editor: editor2 })];
          }));
          const keyMapPlugin = keymap(bindings);
          plugins.push(keyMapPlugin);
        }
        const addInputRules = getExtensionField(extension, "addInputRules", context);
        if (editor2.options.enableInputRules && addInputRules) {
          inputRules.push(...addInputRules());
        }
        const addPasteRules = getExtensionField(extension, "addPasteRules", context);
        if (editor2.options.enablePasteRules && addPasteRules) {
          pasteRules.push(...addPasteRules());
        }
        const addProseMirrorPlugins = getExtensionField(extension, "addProseMirrorPlugins", context);
        if (addProseMirrorPlugins) {
          const proseMirrorPlugins = addProseMirrorPlugins();
          plugins.push(...proseMirrorPlugins);
        }
        return plugins;
      }).flat();
      return [
        inputRulesPlugin({
          editor: editor2,
          rules: inputRules
        }),
        pasteRulesPlugin({
          editor: editor2,
          rules: pasteRules
        }),
        ...allPlugins
      ];
    }
    get attributes() {
      return getAttributesFromExtensions(this.extensions);
    }
    get nodeViews() {
      const { editor: editor2 } = this;
      const { nodeExtensions } = splitExtensions(this.extensions);
      return Object.fromEntries(nodeExtensions.filter((extension) => !!getExtensionField(extension, "addNodeView")).map((extension) => {
        const extensionAttributes = this.attributes.filter((attribute) => attribute.type === extension.name);
        const context = {
          name: extension.name,
          options: extension.options,
          editor: editor2,
          type: getNodeType(extension.name, this.schema)
        };
        const addNodeView = getExtensionField(extension, "addNodeView", context);
        if (!addNodeView) {
          return [];
        }
        const nodeview = (node4, view, getPos, decorations) => {
          const HTMLAttributes = getRenderedAttributes(node4, extensionAttributes);
          return addNodeView()({
            editor: editor2,
            node: node4,
            getPos,
            decorations,
            HTMLAttributes,
            extension
          });
        };
        return [extension.name, nodeview];
      }));
    }
  };
  var EventEmitter = class {
    constructor() {
      this.callbacks = {};
    }
    on(event, fn) {
      if (!this.callbacks[event]) {
        this.callbacks[event] = [];
      }
      this.callbacks[event].push(fn);
      return this;
    }
    emit(event, ...args) {
      const callbacks = this.callbacks[event];
      if (callbacks) {
        callbacks.forEach((callback) => callback.apply(this, args));
      }
      return this;
    }
    off(event, fn) {
      const callbacks = this.callbacks[event];
      if (callbacks) {
        if (fn) {
          this.callbacks[event] = callbacks.filter((callback) => callback !== fn);
        } else {
          delete this.callbacks[event];
        }
      }
      return this;
    }
    removeAllListeners() {
      this.callbacks = {};
    }
  };
  var style = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
  var Editor = class extends EventEmitter {
    constructor(options = {}) {
      super();
      this.isFocused = false;
      this.options = {
        element: document.createElement("div"),
        content: "",
        injectCSS: true,
        extensions: [],
        autofocus: false,
        editable: true,
        editorProps: {},
        parseOptions: {},
        enableInputRules: true,
        enablePasteRules: true,
        enableCoreExtensions: true,
        onBeforeCreate: () => null,
        onCreate: () => null,
        onUpdate: () => null,
        onSelectionUpdate: () => null,
        onTransaction: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onDestroy: () => null
      };
      this.isCapturingTransaction = false;
      this.capturedTransaction = null;
      this.setOptions(options);
      this.createExtensionManager();
      this.createCommandManager();
      this.createSchema();
      this.on("beforeCreate", this.options.onBeforeCreate);
      this.emit("beforeCreate", { editor: this });
      this.createView();
      this.injectCSS();
      this.on("create", this.options.onCreate);
      this.on("update", this.options.onUpdate);
      this.on("selectionUpdate", this.options.onSelectionUpdate);
      this.on("transaction", this.options.onTransaction);
      this.on("focus", this.options.onFocus);
      this.on("blur", this.options.onBlur);
      this.on("destroy", this.options.onDestroy);
      window.setTimeout(() => {
        if (this.isDestroyed) {
          return;
        }
        this.commands.focus(this.options.autofocus);
        this.emit("create", { editor: this });
      }, 0);
    }
    get commands() {
      return this.commandManager.commands;
    }
    chain() {
      return this.commandManager.chain();
    }
    can() {
      return this.commandManager.can();
    }
    injectCSS() {
      if (this.options.injectCSS && document) {
        this.css = createStyleTag(style);
      }
    }
    setOptions(options = {}) {
      this.options = {
        ...this.options,
        ...options
      };
      if (!this.view || !this.state || this.isDestroyed) {
        return;
      }
      if (this.options.editorProps) {
        this.view.setProps(this.options.editorProps);
      }
      this.view.updateState(this.state);
    }
    setEditable(editable) {
      this.setOptions({ editable });
    }
    get isEditable() {
      return this.options.editable && this.view && this.view.editable;
    }
    get state() {
      return this.view.state;
    }
    registerPlugin(plugin, handlePlugins) {
      const plugins = isObject(handlePlugins) ? handlePlugins(plugin, this.state.plugins) : [...this.state.plugins, plugin];
      const state = this.state.reconfigure({ plugins });
      this.view.updateState(state);
    }
    unregisterPlugin(nameOrPluginKey) {
      if (this.isDestroyed) {
        return;
      }
      const name = typeof nameOrPluginKey === "string" ? `${nameOrPluginKey}$` : nameOrPluginKey.key;
      const state = this.state.reconfigure({
        plugins: this.state.plugins.filter((plugin) => !plugin.key.startsWith(name))
      });
      this.view.updateState(state);
    }
    createExtensionManager() {
      const coreExtensions = this.options.enableCoreExtensions ? Object.values(extensions) : [];
      const allExtensions = [...coreExtensions, ...this.options.extensions].filter((extension) => {
        return ["extension", "node", "mark"].includes(extension === null || extension === void 0 ? void 0 : extension.type);
      });
      this.extensionManager = new ExtensionManager(allExtensions, this);
    }
    createCommandManager() {
      this.commandManager = new CommandManager({
        editor: this
      });
    }
    createSchema() {
      this.schema = this.extensionManager.schema;
    }
    createView() {
      this.view = new EditorView(this.options.element, {
        ...this.options.editorProps,
        dispatchTransaction: this.dispatchTransaction.bind(this),
        state: EditorState.create({
          doc: createDocument(this.options.content, this.schema, this.options.parseOptions)
        })
      });
      const newState = this.state.reconfigure({
        plugins: this.extensionManager.plugins
      });
      this.view.updateState(newState);
      this.createNodeViews();
      const dom = this.view.dom;
      dom.editor = this;
    }
    createNodeViews() {
      this.view.setProps({
        nodeViews: this.extensionManager.nodeViews
      });
    }
    captureTransaction(fn) {
      this.isCapturingTransaction = true;
      fn();
      this.isCapturingTransaction = false;
      const tr = this.capturedTransaction;
      this.capturedTransaction = null;
      return tr;
    }
    dispatchTransaction(transaction) {
      if (this.isCapturingTransaction) {
        if (!this.capturedTransaction) {
          this.capturedTransaction = transaction;
          return;
        }
        transaction.steps.forEach((step2) => {
          var _a;
          return (_a = this.capturedTransaction) === null || _a === void 0 ? void 0 : _a.step(step2);
        });
        return;
      }
      const state = this.state.apply(transaction);
      const selectionHasChanged = !this.state.selection.eq(state.selection);
      this.view.updateState(state);
      this.emit("transaction", {
        editor: this,
        transaction
      });
      if (selectionHasChanged) {
        this.emit("selectionUpdate", {
          editor: this,
          transaction
        });
      }
      const focus3 = transaction.getMeta("focus");
      const blur2 = transaction.getMeta("blur");
      if (focus3) {
        this.emit("focus", {
          editor: this,
          event: focus3.event,
          transaction
        });
      }
      if (blur2) {
        this.emit("blur", {
          editor: this,
          event: blur2.event,
          transaction
        });
      }
      if (!transaction.docChanged || transaction.getMeta("preventUpdate")) {
        return;
      }
      this.emit("update", {
        editor: this,
        transaction
      });
    }
    getAttributes(nameOrType) {
      return getAttributes(this.state, nameOrType);
    }
    isActive(nameOrAttributes, attributesOrUndefined) {
      const name = typeof nameOrAttributes === "string" ? nameOrAttributes : null;
      const attributes = typeof nameOrAttributes === "string" ? attributesOrUndefined : nameOrAttributes;
      return isActive(this.state, name, attributes);
    }
    getJSON() {
      return this.state.doc.toJSON();
    }
    getHTML() {
      return getHTMLFromFragment(this.state.doc.content, this.schema);
    }
    getText(options) {
      const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
      return getText(this.state.doc, {
        blockSeparator,
        textSerializers: {
          ...textSerializers,
          ...getTextSeralizersFromSchema(this.schema)
        }
      });
    }
    get isEmpty() {
      return isNodeEmpty(this.state.doc);
    }
    getCharacterCount() {
      return this.state.doc.content.size - 2;
    }
    destroy() {
      this.emit("destroy");
      if (this.view) {
        this.view.destroy();
      }
      this.removeAllListeners();
      removeElement(this.css);
    }
    get isDestroyed() {
      var _a;
      return !((_a = this.view) === null || _a === void 0 ? void 0 : _a.docView);
    }
  };
  var Node4 = class {
    constructor(config = {}) {
      this.type = "node";
      this.name = "node";
      this.parent = null;
      this.child = null;
      this.config = {
        name: this.name,
        defaultOptions: {}
      };
      this.config = {
        ...this.config,
        ...config
      };
      this.name = this.config.name;
      this.options = this.config.defaultOptions;
    }
    static create(config = {}) {
      return new Node4(config);
    }
    configure(options = {}) {
      const extension = this.extend();
      extension.options = mergeDeep(this.options, options);
      return extension;
    }
    extend(extendedConfig = {}) {
      const extension = new Node4(extendedConfig);
      extension.parent = this;
      this.child = extension;
      extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
      extension.options = extendedConfig.defaultOptions ? extendedConfig.defaultOptions : extension.parent.options;
      return extension;
    }
  };
  var Mark3 = class {
    constructor(config = {}) {
      this.type = "mark";
      this.name = "mark";
      this.parent = null;
      this.child = null;
      this.config = {
        name: this.name,
        defaultOptions: {}
      };
      this.config = {
        ...this.config,
        ...config
      };
      this.name = this.config.name;
      this.options = this.config.defaultOptions;
    }
    static create(config = {}) {
      return new Mark3(config);
    }
    configure(options = {}) {
      const extension = this.extend();
      extension.options = mergeDeep(this.options, options);
      return extension;
    }
    extend(extendedConfig = {}) {
      const extension = new Mark3(extendedConfig);
      extension.parent = this;
      this.child = extension;
      extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
      extension.options = extendedConfig.defaultOptions ? extendedConfig.defaultOptions : extension.parent.options;
      return extension;
    }
  };
  function nodeInputRule(config) {
    return new InputRule({
      find: config.find,
      handler: ({ state, range, match }) => {
        const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
        const { tr } = state;
        const start3 = range.from;
        let end2 = range.to;
        if (match[1]) {
          const offset2 = match[0].lastIndexOf(match[1]);
          let matchStart = start3 + offset2;
          if (matchStart > end2) {
            matchStart = end2;
          } else {
            end2 = matchStart + match[1].length;
          }
          const lastChar = match[0][match[0].length - 1];
          tr.insertText(lastChar, start3 + match[0].length - 1);
          tr.replaceWith(matchStart, end2, config.type.create(attributes));
        } else if (match[0]) {
          tr.replaceWith(start3, end2, config.type.create(attributes));
        }
      }
    });
  }
  function getMarksBetween(from4, to, state) {
    const marks2 = [];
    state.doc.nodesBetween(from4, to, (node4, pos) => {
      marks2.push(...node4.marks.map((mark3) => ({
        from: pos,
        to: pos + node4.nodeSize,
        mark: mark3
      })));
    });
    return marks2;
  }
  function markInputRule(config) {
    return new InputRule({
      find: config.find,
      handler: ({ state, range, match }) => {
        const attributes = callOrReturn(config.getAttributes, void 0, match);
        if (attributes === false || attributes === null) {
          return;
        }
        const { tr } = state;
        const captureGroup = match[match.length - 1];
        const fullMatch = match[0];
        let markEnd = range.to;
        if (captureGroup) {
          const startSpaces = fullMatch.search(/\S/);
          const textStart = range.from + fullMatch.indexOf(captureGroup);
          const textEnd = textStart + captureGroup.length;
          const excludedMarks = getMarksBetween(range.from, range.to, state).filter((item) => {
            const excluded = item.mark.type.excluded;
            return excluded.find((type) => type === config.type && type !== item.mark.type);
          }).filter((item) => item.to > textStart);
          if (excludedMarks.length) {
            return null;
          }
          if (textEnd < range.to) {
            tr.delete(textEnd, range.to);
          }
          if (textStart > range.from) {
            tr.delete(range.from + startSpaces, textStart);
          }
          markEnd = range.from + startSpaces + captureGroup.length;
          tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
          tr.removeStoredMark(config.type);
        }
      }
    });
  }
  function textblockTypeInputRule(config) {
    return new InputRule({
      find: config.find,
      handler: ({ state, range, match }) => {
        const $start = state.doc.resolve(range.from);
        const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
        if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), config.type)) {
          return null;
        }
        state.tr.delete(range.from, range.to).setBlockType(range.from, range.from, config.type, attributes);
      }
    });
  }
  function wrappingInputRule(config) {
    return new InputRule({
      find: config.find,
      handler: ({ state, range, match }) => {
        const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
        const tr = state.tr.delete(range.from, range.to);
        const $start = tr.doc.resolve(range.from);
        const blockRange2 = $start.blockRange();
        const wrapping = blockRange2 && findWrapping3(blockRange2, config.type, attributes);
        if (!wrapping) {
          return null;
        }
        tr.wrap(blockRange2, wrapping);
        const before2 = tr.doc.resolve(range.from - 1).nodeBefore;
        if (before2 && before2.type === config.type && canJoin(tr.doc, range.from - 1) && (!config.joinPredicate || config.joinPredicate(match, before2))) {
          tr.join(range.from - 1);
        }
      }
    });
  }
  function markPasteRule(config) {
    return new PasteRule({
      find: config.find,
      handler: ({ state, range, match }) => {
        const attributes = callOrReturn(config.getAttributes, void 0, match);
        if (attributes === false || attributes === null) {
          return;
        }
        const { tr } = state;
        const captureGroup = match[match.length - 1];
        const fullMatch = match[0];
        let markEnd = range.to;
        if (captureGroup) {
          const startSpaces = fullMatch.search(/\S/);
          const textStart = range.from + fullMatch.indexOf(captureGroup);
          const textEnd = textStart + captureGroup.length;
          const excludedMarks = getMarksBetween(range.from, range.to, state).filter((item) => {
            const excluded = item.mark.type.excluded;
            return excluded.find((type) => type === config.type && type !== item.mark.type);
          }).filter((item) => item.to > textStart);
          if (excludedMarks.length) {
            return null;
          }
          if (textEnd < range.to) {
            tr.delete(textEnd, range.to);
          }
          if (textStart > range.from) {
            tr.delete(range.from + startSpaces, textStart);
          }
          markEnd = range.from + startSpaces + captureGroup.length;
          tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
          tr.removeStoredMark(config.type);
        }
      }
    });
  }

  // node_modules/@tiptap/extension-blockquote/dist/tiptap-extension-blockquote.esm.js
  var inputRegex = /^\s*>\s$/;
  var Blockquote = Node4.create({
    name: "blockquote",
    defaultOptions: {
      HTMLAttributes: {}
    },
    content: "block*",
    group: "block",
    defining: true,
    parseHTML() {
      return [
        { tag: "blockquote" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["blockquote", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setBlockquote: () => ({ commands }) => {
          return commands.wrapIn("blockquote");
        },
        toggleBlockquote: () => ({ commands }) => {
          return commands.toggleWrap("blockquote");
        },
        unsetBlockquote: () => ({ commands }) => {
          return commands.lift("blockquote");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
      };
    },
    addInputRules() {
      return [
        wrappingInputRule({
          find: inputRegex,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-bold/dist/tiptap-extension-bold.esm.js
  var starInputRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/;
  var starPasteRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g;
  var underscoreInputRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/;
  var underscorePasteRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g;
  var Bold = Mark3.create({
    name: "bold",
    defaultOptions: {
      HTMLAttributes: {}
    },
    parseHTML() {
      return [
        {
          tag: "strong"
        },
        {
          tag: "b",
          getAttrs: (node4) => node4.style.fontWeight !== "normal" && null
        },
        {
          style: "font-weight",
          getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["strong", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setBold: () => ({ commands }) => {
          return commands.setMark("bold");
        },
        toggleBold: () => ({ commands }) => {
          return commands.toggleMark("bold");
        },
        unsetBold: () => ({ commands }) => {
          return commands.unsetMark("bold");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-b": () => this.editor.commands.toggleBold()
      };
    },
    addInputRules() {
      return [
        markInputRule({
          find: starInputRegex,
          type: this.type
        }),
        markInputRule({
          find: underscoreInputRegex,
          type: this.type
        })
      ];
    },
    addPasteRules() {
      return [
        markPasteRule({
          find: starPasteRegex,
          type: this.type
        }),
        markPasteRule({
          find: underscorePasteRegex,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-bullet-list/dist/tiptap-extension-bullet-list.esm.js
  var inputRegex2 = /^\s*([-+*])\s$/;
  var BulletList = Node4.create({
    name: "bulletList",
    defaultOptions: {
      HTMLAttributes: {}
    },
    group: "block list",
    content: "listItem+",
    parseHTML() {
      return [
        { tag: "ul" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["ul", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        toggleBulletList: () => ({ commands }) => {
          return commands.toggleList("bulletList", "listItem");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
      };
    },
    addInputRules() {
      return [
        wrappingInputRule({
          find: inputRegex2,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-code/dist/tiptap-extension-code.esm.js
  var inputRegex3 = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/;
  var pasteRegex = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g;
  var Code = Mark3.create({
    name: "code",
    defaultOptions: {
      HTMLAttributes: {}
    },
    excludes: "_",
    code: true,
    parseHTML() {
      return [
        { tag: "code" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["code", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setCode: () => ({ commands }) => {
          return commands.setMark("code");
        },
        toggleCode: () => ({ commands }) => {
          return commands.toggleMark("code");
        },
        unsetCode: () => ({ commands }) => {
          return commands.unsetMark("code");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-e": () => this.editor.commands.toggleCode()
      };
    },
    addInputRules() {
      return [
        markInputRule({
          find: inputRegex3,
          type: this.type
        })
      ];
    },
    addPasteRules() {
      return [
        markPasteRule({
          find: pasteRegex,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-code-block/dist/tiptap-extension-code-block.esm.js
  var backtickInputRegex = /^```(?<language>[a-z]*)?[\s\n]$/;
  var tildeInputRegex = /^~~~(?<language>[a-z]*)?[\s\n]$/;
  var CodeBlock = Node4.create({
    name: "codeBlock",
    defaultOptions: {
      languageClassPrefix: "language-",
      HTMLAttributes: {}
    },
    content: "text*",
    marks: "",
    group: "block",
    code: true,
    defining: true,
    addAttributes() {
      return {
        language: {
          default: null,
          parseHTML: (element) => {
            var _a;
            const { languageClassPrefix } = this.options;
            const classNames = [...((_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList) || []];
            const languages = classNames.filter((className) => className.startsWith(languageClassPrefix)).map((className) => className.replace(languageClassPrefix, ""));
            const language = languages[0];
            if (!language) {
              return null;
            }
            return language;
          },
          renderHTML: (attributes) => {
            if (!attributes.language) {
              return null;
            }
            return {
              class: this.options.languageClassPrefix + attributes.language
            };
          }
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "pre",
          preserveWhitespace: "full"
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["pre", this.options.HTMLAttributes, ["code", HTMLAttributes, 0]];
    },
    addCommands() {
      return {
        setCodeBlock: (attributes) => ({ commands }) => {
          return commands.setNode("codeBlock", attributes);
        },
        toggleCodeBlock: (attributes) => ({ commands }) => {
          return commands.toggleNode("codeBlock", "paragraph", attributes);
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
        Backspace: () => {
          const { empty: empty2, $anchor } = this.editor.state.selection;
          const isAtStart = $anchor.pos === 1;
          if (!empty2 || $anchor.parent.type.name !== this.name) {
            return false;
          }
          if (isAtStart || !$anchor.parent.textContent.length) {
            return this.editor.commands.clearNodes();
          }
          return false;
        }
      };
    },
    addInputRules() {
      return [
        textblockTypeInputRule({
          find: backtickInputRegex,
          type: this.type,
          getAttributes: ({ groups }) => groups
        }),
        textblockTypeInputRule({
          find: tildeInputRegex,
          type: this.type,
          getAttributes: ({ groups }) => groups
        })
      ];
    },
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("codeBlockVSCodeHandler"),
          props: {
            handlePaste: (view, event) => {
              if (!event.clipboardData) {
                return false;
              }
              if (this.editor.isActive(this.type.name)) {
                return false;
              }
              const text2 = event.clipboardData.getData("text/plain");
              const vscode = event.clipboardData.getData("vscode-editor-data");
              const vscodeData = vscode ? JSON.parse(vscode) : void 0;
              const language = vscodeData === null || vscodeData === void 0 ? void 0 : vscodeData.mode;
              if (!text2 || !language) {
                return false;
              }
              const { tr } = view.state;
              tr.replaceSelectionWith(this.type.create({ language }));
              tr.setSelection(TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2))));
              tr.insertText(text2.replace(/\r\n?/g, "\n"));
              tr.setMeta("paste", true);
              view.dispatch(tr);
              return true;
            }
          }
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-document/dist/tiptap-extension-document.esm.js
  var Document = Node4.create({
    name: "doc",
    topNode: true,
    content: "block+"
  });
  var tiptap_extension_document_esm_default = Document;

  // node_modules/prosemirror-dropcursor/dist/index.es.js
  function dropCursor(options) {
    if (options === void 0)
      options = {};
    return new Plugin({
      view: function view(editorView) {
        return new DropCursorView(editorView, options);
      }
    });
  }
  var DropCursorView = function DropCursorView2(editorView, options) {
    var this$1 = this;
    this.editorView = editorView;
    this.width = options.width || 1;
    this.color = options.color || "black";
    this.class = options.class;
    this.cursorPos = null;
    this.element = null;
    this.timeout = null;
    this.handlers = ["dragover", "dragend", "drop", "dragleave"].map(function(name) {
      var handler = function(e) {
        return this$1[name](e);
      };
      editorView.dom.addEventListener(name, handler);
      return { name, handler };
    });
  };
  DropCursorView.prototype.destroy = function destroy3() {
    var this$1 = this;
    this.handlers.forEach(function(ref) {
      var name = ref.name;
      var handler = ref.handler;
      return this$1.editorView.dom.removeEventListener(name, handler);
    });
  };
  DropCursorView.prototype.update = function update2(editorView, prevState) {
    if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
      if (this.cursorPos > editorView.state.doc.content.size) {
        this.setCursor(null);
      } else {
        this.updateOverlay();
      }
    }
  };
  DropCursorView.prototype.setCursor = function setCursor(pos) {
    if (pos == this.cursorPos) {
      return;
    }
    this.cursorPos = pos;
    if (pos == null) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    } else {
      this.updateOverlay();
    }
  };
  DropCursorView.prototype.updateOverlay = function updateOverlay() {
    var $pos = this.editorView.state.doc.resolve(this.cursorPos), rect;
    if (!$pos.parent.inlineContent) {
      var before2 = $pos.nodeBefore, after2 = $pos.nodeAfter;
      if (before2 || after2) {
        var nodeRect = this.editorView.nodeDOM(this.cursorPos - (before2 ? before2.nodeSize : 0)).getBoundingClientRect();
        var top = before2 ? nodeRect.bottom : nodeRect.top;
        if (before2 && after2) {
          top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
        }
        rect = { left: nodeRect.left, right: nodeRect.right, top: top - this.width / 2, bottom: top + this.width / 2 };
      }
    }
    if (!rect) {
      var coords = this.editorView.coordsAtPos(this.cursorPos);
      rect = { left: coords.left - this.width / 2, right: coords.left + this.width / 2, top: coords.top, bottom: coords.bottom };
    }
    var parent = this.editorView.dom.offsetParent;
    if (!this.element) {
      this.element = parent.appendChild(document.createElement("div"));
      if (this.class) {
        this.element.className = this.class;
      }
      this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none; background-color: " + this.color;
    }
    var parentLeft, parentTop;
    if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
      parentLeft = -pageXOffset;
      parentTop = -pageYOffset;
    } else {
      var rect$1 = parent.getBoundingClientRect();
      parentLeft = rect$1.left - parent.scrollLeft;
      parentTop = rect$1.top - parent.scrollTop;
    }
    this.element.style.left = rect.left - parentLeft + "px";
    this.element.style.top = rect.top - parentTop + "px";
    this.element.style.width = rect.right - rect.left + "px";
    this.element.style.height = rect.bottom - rect.top + "px";
  };
  DropCursorView.prototype.scheduleRemoval = function scheduleRemoval(timeout) {
    var this$1 = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      return this$1.setCursor(null);
    }, timeout);
  };
  DropCursorView.prototype.dragover = function dragover(event) {
    if (!this.editorView.editable) {
      return;
    }
    var pos = this.editorView.posAtCoords({ left: event.clientX, top: event.clientY });
    if (pos) {
      var target = pos.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        target = dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
        if (target == null) {
          return this.setCursor(null);
        }
      }
      this.setCursor(target);
      this.scheduleRemoval(5e3);
    }
  };
  DropCursorView.prototype.dragend = function dragend() {
    this.scheduleRemoval(20);
  };
  DropCursorView.prototype.drop = function drop() {
    this.scheduleRemoval(20);
  };
  DropCursorView.prototype.dragleave = function dragleave(event) {
    if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget)) {
      this.setCursor(null);
    }
  };

  // node_modules/@tiptap/extension-dropcursor/dist/tiptap-extension-dropcursor.esm.js
  var Dropcursor = Extension.create({
    name: "dropCursor",
    defaultOptions: {
      color: "currentColor",
      width: 1,
      class: null
    },
    addProseMirrorPlugins() {
      return [
        dropCursor(this.options)
      ];
    }
  });

  // node_modules/prosemirror-gapcursor/dist/index.es.js
  var GapCursor = /* @__PURE__ */ function(Selection3) {
    function GapCursor2($pos) {
      Selection3.call(this, $pos, $pos);
    }
    if (Selection3)
      GapCursor2.__proto__ = Selection3;
    GapCursor2.prototype = Object.create(Selection3 && Selection3.prototype);
    GapCursor2.prototype.constructor = GapCursor2;
    GapCursor2.prototype.map = function map15(doc2, mapping) {
      var $pos = doc2.resolve(mapping.map(this.head));
      return GapCursor2.valid($pos) ? new GapCursor2($pos) : Selection3.near($pos);
    };
    GapCursor2.prototype.content = function content2() {
      return Slice.empty;
    };
    GapCursor2.prototype.eq = function eq12(other) {
      return other instanceof GapCursor2 && other.head == this.head;
    };
    GapCursor2.prototype.toJSON = function toJSON7() {
      return { type: "gapcursor", pos: this.head };
    };
    GapCursor2.fromJSON = function fromJSON8(doc2, json) {
      if (typeof json.pos != "number") {
        throw new RangeError("Invalid input for GapCursor.fromJSON");
      }
      return new GapCursor2(doc2.resolve(json.pos));
    };
    GapCursor2.prototype.getBookmark = function getBookmark2() {
      return new GapBookmark(this.anchor);
    };
    GapCursor2.valid = function valid4($pos) {
      var parent = $pos.parent;
      if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) {
        return false;
      }
      var override = parent.type.spec.allowGapCursor;
      if (override != null) {
        return override;
      }
      var deflt = parent.contentMatchAt($pos.index()).defaultType;
      return deflt && deflt.isTextblock;
    };
    GapCursor2.findFrom = function findFrom2($pos, dir, mustMove) {
      search:
        for (; ; ) {
          if (!mustMove && GapCursor2.valid($pos)) {
            return $pos;
          }
          var pos = $pos.pos, next = null;
          for (var d = $pos.depth; ; d--) {
            var parent = $pos.node(d);
            if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
              next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
              break;
            } else if (d == 0) {
              return null;
            }
            pos += dir;
            var $cur = $pos.doc.resolve(pos);
            if (GapCursor2.valid($cur)) {
              return $cur;
            }
          }
          for (; ; ) {
            var inside = dir > 0 ? next.firstChild : next.lastChild;
            if (!inside) {
              if (next.isAtom && !next.isText && !NodeSelection.isSelectable(next)) {
                $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
                mustMove = false;
                continue search;
              }
              break;
            }
            next = inside;
            pos += dir;
            var $cur$1 = $pos.doc.resolve(pos);
            if (GapCursor2.valid($cur$1)) {
              return $cur$1;
            }
          }
          return null;
        }
    };
    return GapCursor2;
  }(Selection);
  GapCursor.prototype.visible = false;
  Selection.jsonID("gapcursor", GapCursor);
  var GapBookmark = function GapBookmark2(pos) {
    this.pos = pos;
  };
  GapBookmark.prototype.map = function map13(mapping) {
    return new GapBookmark(mapping.map(this.pos));
  };
  GapBookmark.prototype.resolve = function resolve6(doc2) {
    var $pos = doc2.resolve(this.pos);
    return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
  };
  function closedBefore($pos) {
    for (var d = $pos.depth; d >= 0; d--) {
      var index2 = $pos.index(d);
      if (index2 == 0) {
        continue;
      }
      for (var before2 = $pos.node(d).child(index2 - 1); ; before2 = before2.lastChild) {
        if (before2.childCount == 0 && !before2.inlineContent || before2.isAtom || before2.type.spec.isolating) {
          return true;
        }
        if (before2.inlineContent) {
          return false;
        }
      }
    }
    return true;
  }
  function closedAfter($pos) {
    for (var d = $pos.depth; d >= 0; d--) {
      var index2 = $pos.indexAfter(d), parent = $pos.node(d);
      if (index2 == parent.childCount) {
        continue;
      }
      for (var after2 = parent.child(index2); ; after2 = after2.firstChild) {
        if (after2.childCount == 0 && !after2.inlineContent || after2.isAtom || after2.type.spec.isolating) {
          return true;
        }
        if (after2.inlineContent) {
          return false;
        }
      }
    }
    return true;
  }
  var gapCursor = function() {
    return new Plugin({
      props: {
        decorations: drawGapCursor,
        createSelectionBetween: function createSelectionBetween(_view, $anchor, $head) {
          if ($anchor.pos == $head.pos && GapCursor.valid($head)) {
            return new GapCursor($head);
          }
        },
        handleClick,
        handleKeyDown
      }
    });
  };
  var handleKeyDown = keydownHandler({
    "ArrowLeft": arrow("horiz", -1),
    "ArrowRight": arrow("horiz", 1),
    "ArrowUp": arrow("vert", -1),
    "ArrowDown": arrow("vert", 1)
  });
  function arrow(axis, dir) {
    var dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
    return function(state, dispatch2, view) {
      var sel = state.selection;
      var $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
      if (sel instanceof TextSelection) {
        if (!view.endOfTextblock(dirStr) || $start.depth == 0) {
          return false;
        }
        mustMove = false;
        $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
      }
      var $found = GapCursor.findFrom($start, dir, mustMove);
      if (!$found) {
        return false;
      }
      if (dispatch2) {
        dispatch2(state.tr.setSelection(new GapCursor($found)));
      }
      return true;
    };
  }
  function handleClick(view, pos, event) {
    if (!view.editable) {
      return false;
    }
    var $pos = view.state.doc.resolve(pos);
    if (!GapCursor.valid($pos)) {
      return false;
    }
    var ref = view.posAtCoords({ left: event.clientX, top: event.clientY });
    var inside = ref.inside;
    if (inside > -1 && NodeSelection.isSelectable(view.state.doc.nodeAt(inside))) {
      return false;
    }
    view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
    return true;
  }
  function drawGapCursor(state) {
    if (!(state.selection instanceof GapCursor)) {
      return null;
    }
    var node4 = document.createElement("div");
    node4.className = "ProseMirror-gapcursor";
    return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node4, { key: "gapcursor" })]);
  }

  // node_modules/@tiptap/extension-gapcursor/dist/tiptap-extension-gapcursor.esm.js
  var Gapcursor = Extension.create({
    name: "gapCursor",
    addProseMirrorPlugins() {
      return [
        gapCursor()
      ];
    },
    extendNodeSchema(extension) {
      var _a;
      const context = {
        name: extension.name,
        options: extension.options
      };
      return {
        allowGapCursor: (_a = callOrReturn(getExtensionField(extension, "allowGapCursor", context))) !== null && _a !== void 0 ? _a : null
      };
    }
  });

  // node_modules/@tiptap/extension-hard-break/dist/tiptap-extension-hard-break.esm.js
  var HardBreak = Node4.create({
    name: "hardBreak",
    defaultOptions: {
      keepMarks: true,
      HTMLAttributes: {}
    },
    inline: true,
    group: "inline",
    selectable: false,
    parseHTML() {
      return [
        { tag: "br" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["br", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    renderText() {
      return "\n";
    },
    addCommands() {
      return {
        setHardBreak: () => ({ commands, chain, state, editor: editor2 }) => {
          return commands.first([
            () => commands.exitCode(),
            () => commands.command(() => {
              const { keepMarks } = this.options;
              const { splittableMarks } = editor2.extensionManager;
              const marks2 = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
              return chain().insertContent({ type: this.name }).command(({ tr, dispatch: dispatch2 }) => {
                if (dispatch2 && marks2 && keepMarks) {
                  const filteredMarks = marks2.filter((mark3) => splittableMarks.includes(mark3.type.name));
                  tr.ensureMarks(filteredMarks);
                }
                return true;
              }).run();
            })
          ]);
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => this.editor.commands.setHardBreak(),
        "Shift-Enter": () => this.editor.commands.setHardBreak()
      };
    }
  });

  // node_modules/@tiptap/extension-heading/dist/tiptap-extension-heading.esm.js
  var Heading = Node4.create({
    name: "heading",
    defaultOptions: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    },
    content: "inline*",
    group: "block",
    defining: true,
    addAttributes() {
      return {
        level: {
          default: 1,
          rendered: false
        }
      };
    },
    parseHTML() {
      return this.options.levels.map((level) => ({
        tag: `h${level}`,
        attrs: { level }
      }));
    },
    renderHTML({ node: node4, HTMLAttributes }) {
      const hasLevel = this.options.levels.includes(node4.attrs.level);
      const level = hasLevel ? node4.attrs.level : this.options.levels[0];
      return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setHeading: (attributes) => ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }
          return commands.setNode("heading", attributes);
        },
        toggleHeading: (attributes) => ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }
          return commands.toggleNode("heading", "paragraph", attributes);
        }
      };
    },
    addKeyboardShortcuts() {
      return this.options.levels.reduce((items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
        }
      }), {});
    },
    addInputRules() {
      return this.options.levels.map((level) => {
        return textblockTypeInputRule({
          find: new RegExp(`^(#{1,${level}})\\s$`),
          type: this.type,
          getAttributes: {
            level
          }
        });
      });
    }
  });

  // node_modules/rope-sequence/dist/index.es.js
  var GOOD_LEAF_SIZE = 200;
  var RopeSequence = function RopeSequence2() {
  };
  RopeSequence.prototype.append = function append2(other) {
    if (!other.length) {
      return this;
    }
    other = RopeSequence.from(other);
    return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
  };
  RopeSequence.prototype.prepend = function prepend(other) {
    if (!other.length) {
      return this;
    }
    return RopeSequence.from(other).append(this);
  };
  RopeSequence.prototype.appendInner = function appendInner(other) {
    return new Append(this, other);
  };
  RopeSequence.prototype.slice = function slice3(from4, to) {
    if (from4 === void 0)
      from4 = 0;
    if (to === void 0)
      to = this.length;
    if (from4 >= to) {
      return RopeSequence.empty;
    }
    return this.sliceInner(Math.max(0, from4), Math.min(this.length, to));
  };
  RopeSequence.prototype.get = function get2(i) {
    if (i < 0 || i >= this.length) {
      return void 0;
    }
    return this.getInner(i);
  };
  RopeSequence.prototype.forEach = function forEach5(f, from4, to) {
    if (from4 === void 0)
      from4 = 0;
    if (to === void 0)
      to = this.length;
    if (from4 <= to) {
      this.forEachInner(f, from4, to, 0);
    } else {
      this.forEachInvertedInner(f, from4, to, 0);
    }
  };
  RopeSequence.prototype.map = function map14(f, from4, to) {
    if (from4 === void 0)
      from4 = 0;
    if (to === void 0)
      to = this.length;
    var result2 = [];
    this.forEach(function(elt, i) {
      return result2.push(f(elt, i));
    }, from4, to);
    return result2;
  };
  RopeSequence.from = function from3(values) {
    if (values instanceof RopeSequence) {
      return values;
    }
    return values && values.length ? new Leaf(values) : RopeSequence.empty;
  };
  var Leaf = /* @__PURE__ */ function(RopeSequence3) {
    function Leaf2(values) {
      RopeSequence3.call(this);
      this.values = values;
    }
    if (RopeSequence3)
      Leaf2.__proto__ = RopeSequence3;
    Leaf2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
    Leaf2.prototype.constructor = Leaf2;
    var prototypeAccessors5 = { length: { configurable: true }, depth: { configurable: true } };
    Leaf2.prototype.flatten = function flatten() {
      return this.values;
    };
    Leaf2.prototype.sliceInner = function sliceInner(from4, to) {
      if (from4 == 0 && to == this.length) {
        return this;
      }
      return new Leaf2(this.values.slice(from4, to));
    };
    Leaf2.prototype.getInner = function getInner(i) {
      return this.values[i];
    };
    Leaf2.prototype.forEachInner = function forEachInner(f, from4, to, start3) {
      for (var i = from4; i < to; i++) {
        if (f(this.values[i], start3 + i) === false) {
          return false;
        }
      }
    };
    Leaf2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from4, to, start3) {
      for (var i = from4 - 1; i >= to; i--) {
        if (f(this.values[i], start3 + i) === false) {
          return false;
        }
      }
    };
    Leaf2.prototype.leafAppend = function leafAppend(other) {
      if (this.length + other.length <= GOOD_LEAF_SIZE) {
        return new Leaf2(this.values.concat(other.flatten()));
      }
    };
    Leaf2.prototype.leafPrepend = function leafPrepend(other) {
      if (this.length + other.length <= GOOD_LEAF_SIZE) {
        return new Leaf2(other.flatten().concat(this.values));
      }
    };
    prototypeAccessors5.length.get = function() {
      return this.values.length;
    };
    prototypeAccessors5.depth.get = function() {
      return 0;
    };
    Object.defineProperties(Leaf2.prototype, prototypeAccessors5);
    return Leaf2;
  }(RopeSequence);
  RopeSequence.empty = new Leaf([]);
  var Append = /* @__PURE__ */ function(RopeSequence3) {
    function Append2(left, right) {
      RopeSequence3.call(this);
      this.left = left;
      this.right = right;
      this.length = left.length + right.length;
      this.depth = Math.max(left.depth, right.depth) + 1;
    }
    if (RopeSequence3)
      Append2.__proto__ = RopeSequence3;
    Append2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
    Append2.prototype.constructor = Append2;
    Append2.prototype.flatten = function flatten() {
      return this.left.flatten().concat(this.right.flatten());
    };
    Append2.prototype.getInner = function getInner(i) {
      return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
    };
    Append2.prototype.forEachInner = function forEachInner(f, from4, to, start3) {
      var leftLen = this.left.length;
      if (from4 < leftLen && this.left.forEachInner(f, from4, Math.min(to, leftLen), start3) === false) {
        return false;
      }
      if (to > leftLen && this.right.forEachInner(f, Math.max(from4 - leftLen, 0), Math.min(this.length, to) - leftLen, start3 + leftLen) === false) {
        return false;
      }
    };
    Append2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from4, to, start3) {
      var leftLen = this.left.length;
      if (from4 > leftLen && this.right.forEachInvertedInner(f, from4 - leftLen, Math.max(to, leftLen) - leftLen, start3 + leftLen) === false) {
        return false;
      }
      if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from4, leftLen), to, start3) === false) {
        return false;
      }
    };
    Append2.prototype.sliceInner = function sliceInner(from4, to) {
      if (from4 == 0 && to == this.length) {
        return this;
      }
      var leftLen = this.left.length;
      if (to <= leftLen) {
        return this.left.slice(from4, to);
      }
      if (from4 >= leftLen) {
        return this.right.slice(from4 - leftLen, to - leftLen);
      }
      return this.left.slice(from4, leftLen).append(this.right.slice(0, to - leftLen));
    };
    Append2.prototype.leafAppend = function leafAppend(other) {
      var inner = this.right.leafAppend(other);
      if (inner) {
        return new Append2(this.left, inner);
      }
    };
    Append2.prototype.leafPrepend = function leafPrepend(other) {
      var inner = this.left.leafPrepend(other);
      if (inner) {
        return new Append2(inner, this.right);
      }
    };
    Append2.prototype.appendInner = function appendInner2(other) {
      if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) {
        return new Append2(this.left, new Append2(this.right, other));
      }
      return new Append2(this, other);
    };
    return Append2;
  }(RopeSequence);
  var ropeSequence = RopeSequence;
  var index_es_default2 = ropeSequence;

  // node_modules/prosemirror-history/dist/index.es.js
  var max_empty_items = 500;
  var Branch = function Branch2(items, eventCount) {
    this.items = items;
    this.eventCount = eventCount;
  };
  Branch.prototype.popEvent = function popEvent(state, preserveItems) {
    var this$1 = this;
    if (this.eventCount == 0) {
      return null;
    }
    var end2 = this.items.length;
    for (; ; end2--) {
      var next = this.items.get(end2 - 1);
      if (next.selection) {
        --end2;
        break;
      }
    }
    var remap, mapFrom;
    if (preserveItems) {
      remap = this.remapping(end2, this.items.length);
      mapFrom = remap.maps.length;
    }
    var transform = state.tr;
    var selection, remaining;
    var addAfter = [], addBefore = [];
    this.items.forEach(function(item, i) {
      if (!item.step) {
        if (!remap) {
          remap = this$1.remapping(end2, i + 1);
          mapFrom = remap.maps.length;
        }
        mapFrom--;
        addBefore.push(item);
        return;
      }
      if (remap) {
        addBefore.push(new Item(item.map));
        var step2 = item.step.map(remap.slice(mapFrom)), map15;
        if (step2 && transform.maybeStep(step2).doc) {
          map15 = transform.mapping.maps[transform.mapping.maps.length - 1];
          addAfter.push(new Item(map15, null, null, addAfter.length + addBefore.length));
        }
        mapFrom--;
        if (map15) {
          remap.appendMap(map15, mapFrom);
        }
      } else {
        transform.maybeStep(item.step);
      }
      if (item.selection) {
        selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
        remaining = new Branch(this$1.items.slice(0, end2).append(addBefore.reverse().concat(addAfter)), this$1.eventCount - 1);
        return false;
      }
    }, this.items.length, 0);
    return { remaining, transform, selection };
  };
  Branch.prototype.addTransform = function addTransform(transform, selection, histOptions, preserveItems) {
    var newItems = [], eventCount = this.eventCount;
    var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
    for (var i = 0; i < transform.steps.length; i++) {
      var step2 = transform.steps[i].invert(transform.docs[i]);
      var item = new Item(transform.mapping.maps[i], step2, selection), merged = void 0;
      if (merged = lastItem && lastItem.merge(item)) {
        item = merged;
        if (i) {
          newItems.pop();
        } else {
          oldItems = oldItems.slice(0, oldItems.length - 1);
        }
      }
      newItems.push(item);
      if (selection) {
        eventCount++;
        selection = null;
      }
      if (!preserveItems) {
        lastItem = item;
      }
    }
    var overflow = eventCount - histOptions.depth;
    if (overflow > DEPTH_OVERFLOW) {
      oldItems = cutOffEvents(oldItems, overflow);
      eventCount -= overflow;
    }
    return new Branch(oldItems.append(newItems), eventCount);
  };
  Branch.prototype.remapping = function remapping(from4, to) {
    var maps = new Mapping();
    this.items.forEach(function(item, i) {
      var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from4 ? maps.maps.length - item.mirrorOffset : null;
      maps.appendMap(item.map, mirrorPos);
    }, from4, to);
    return maps;
  };
  Branch.prototype.addMaps = function addMaps(array) {
    if (this.eventCount == 0) {
      return this;
    }
    return new Branch(this.items.append(array.map(function(map15) {
      return new Item(map15);
    })), this.eventCount);
  };
  Branch.prototype.rebased = function rebased(rebasedTransform, rebasedCount) {
    if (!this.eventCount) {
      return this;
    }
    var rebasedItems = [], start3 = Math.max(0, this.items.length - rebasedCount);
    var mapping = rebasedTransform.mapping;
    var newUntil = rebasedTransform.steps.length;
    var eventCount = this.eventCount;
    this.items.forEach(function(item) {
      if (item.selection) {
        eventCount--;
      }
    }, start3);
    var iRebased = rebasedCount;
    this.items.forEach(function(item) {
      var pos = mapping.getMirror(--iRebased);
      if (pos == null) {
        return;
      }
      newUntil = Math.min(newUntil, pos);
      var map15 = mapping.maps[pos];
      if (item.step) {
        var step2 = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
        var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
        if (selection) {
          eventCount++;
        }
        rebasedItems.push(new Item(map15, step2, selection));
      } else {
        rebasedItems.push(new Item(map15));
      }
    }, start3);
    var newMaps = [];
    for (var i = rebasedCount; i < newUntil; i++) {
      newMaps.push(new Item(mapping.maps[i]));
    }
    var items = this.items.slice(0, start3).append(newMaps).append(rebasedItems);
    var branch = new Branch(items, eventCount);
    if (branch.emptyItemCount() > max_empty_items) {
      branch = branch.compress(this.items.length - rebasedItems.length);
    }
    return branch;
  };
  Branch.prototype.emptyItemCount = function emptyItemCount() {
    var count = 0;
    this.items.forEach(function(item) {
      if (!item.step) {
        count++;
      }
    });
    return count;
  };
  Branch.prototype.compress = function compress(upto) {
    if (upto === void 0)
      upto = this.items.length;
    var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
    var items = [], events = 0;
    this.items.forEach(function(item, i) {
      if (i >= upto) {
        items.push(item);
        if (item.selection) {
          events++;
        }
      } else if (item.step) {
        var step2 = item.step.map(remap.slice(mapFrom)), map15 = step2 && step2.getMap();
        mapFrom--;
        if (map15) {
          remap.appendMap(map15, mapFrom);
        }
        if (step2) {
          var selection = item.selection && item.selection.map(remap.slice(mapFrom));
          if (selection) {
            events++;
          }
          var newItem = new Item(map15.invert(), step2, selection), merged, last = items.length - 1;
          if (merged = items.length && items[last].merge(newItem)) {
            items[last] = merged;
          } else {
            items.push(newItem);
          }
        }
      } else if (item.map) {
        mapFrom--;
      }
    }, this.items.length, 0);
    return new Branch(index_es_default2.from(items.reverse()), events);
  };
  Branch.empty = new Branch(index_es_default2.empty, 0);
  function cutOffEvents(items, n) {
    var cutPoint;
    items.forEach(function(item, i) {
      if (item.selection && n-- == 0) {
        cutPoint = i;
        return false;
      }
    });
    return items.slice(cutPoint);
  }
  var Item = function Item2(map15, step2, selection, mirrorOffset) {
    this.map = map15;
    this.step = step2;
    this.selection = selection;
    this.mirrorOffset = mirrorOffset;
  };
  Item.prototype.merge = function merge2(other) {
    if (this.step && other.step && !other.selection) {
      var step2 = other.step.merge(this.step);
      if (step2) {
        return new Item(step2.getMap().invert(), step2, this.selection);
      }
    }
  };
  var HistoryState = function HistoryState2(done2, undone, prevRanges, prevTime) {
    this.done = done2;
    this.undone = undone;
    this.prevRanges = prevRanges;
    this.prevTime = prevTime;
  };
  var DEPTH_OVERFLOW = 20;
  function applyTransaction2(history2, state, tr, options) {
    var historyTr = tr.getMeta(historyKey), rebased2;
    if (historyTr) {
      return historyTr.historyState;
    }
    if (tr.getMeta(closeHistoryKey)) {
      history2 = new HistoryState(history2.done, history2.undone, null, 0);
    }
    var appended = tr.getMeta("appendedTransaction");
    if (tr.steps.length == 0) {
      return history2;
    } else if (appended && appended.getMeta(historyKey)) {
      if (appended.getMeta(historyKey).redo) {
        return new HistoryState(history2.done.addTransform(tr, null, options, mustPreserveItems(state)), history2.undone, rangesFor(tr.mapping.maps[tr.steps.length - 1]), history2.prevTime);
      } else {
        return new HistoryState(history2.done, history2.undone.addTransform(tr, null, options, mustPreserveItems(state)), null, history2.prevTime);
      }
    } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
      var newGroup = history2.prevTime == 0 || !appended && (history2.prevTime < (tr.time || 0) - options.newGroupDelay || !isAdjacentTo(tr, history2.prevRanges));
      var prevRanges = appended ? mapRanges(history2.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);
      return new HistoryState(history2.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time);
    } else if (rebased2 = tr.getMeta("rebased")) {
      return new HistoryState(history2.done.rebased(tr, rebased2), history2.undone.rebased(tr, rebased2), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime);
    } else {
      return new HistoryState(history2.done.addMaps(tr.mapping.maps), history2.undone.addMaps(tr.mapping.maps), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime);
    }
  }
  function isAdjacentTo(transform, prevRanges) {
    if (!prevRanges) {
      return false;
    }
    if (!transform.docChanged) {
      return true;
    }
    var adjacent = false;
    transform.mapping.maps[0].forEach(function(start3, end2) {
      for (var i = 0; i < prevRanges.length; i += 2) {
        if (start3 <= prevRanges[i + 1] && end2 >= prevRanges[i]) {
          adjacent = true;
        }
      }
    });
    return adjacent;
  }
  function rangesFor(map15) {
    var result2 = [];
    map15.forEach(function(_from, _to, from4, to) {
      return result2.push(from4, to);
    });
    return result2;
  }
  function mapRanges(ranges, mapping) {
    if (!ranges) {
      return null;
    }
    var result2 = [];
    for (var i = 0; i < ranges.length; i += 2) {
      var from4 = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
      if (from4 <= to) {
        result2.push(from4, to);
      }
    }
    return result2;
  }
  function histTransaction(history2, state, dispatch2, redo2) {
    var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
    var pop = (redo2 ? history2.undone : history2.done).popEvent(state, preserveItems);
    if (!pop) {
      return;
    }
    var selection = pop.selection.resolve(pop.transform.doc);
    var added = (redo2 ? history2.done : history2.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
    var newHist = new HistoryState(redo2 ? added : pop.remaining, redo2 ? pop.remaining : added, null, 0);
    dispatch2(pop.transform.setSelection(selection).setMeta(historyKey, { redo: redo2, historyState: newHist }).scrollIntoView());
  }
  var cachedPreserveItems = false;
  var cachedPreserveItemsPlugins = null;
  function mustPreserveItems(state) {
    var plugins = state.plugins;
    if (cachedPreserveItemsPlugins != plugins) {
      cachedPreserveItems = false;
      cachedPreserveItemsPlugins = plugins;
      for (var i = 0; i < plugins.length; i++) {
        if (plugins[i].spec.historyPreserveItems) {
          cachedPreserveItems = true;
          break;
        }
      }
    }
    return cachedPreserveItems;
  }
  var historyKey = new PluginKey("history");
  var closeHistoryKey = new PluginKey("closeHistory");
  function history(config) {
    config = {
      depth: config && config.depth || 100,
      newGroupDelay: config && config.newGroupDelay || 500
    };
    return new Plugin({
      key: historyKey,
      state: {
        init: function init5() {
          return new HistoryState(Branch.empty, Branch.empty, null, 0);
        },
        apply: function apply8(tr, hist, state) {
          return applyTransaction2(hist, state, tr, config);
        }
      },
      config,
      props: {
        handleDOMEvents: {
          beforeinput: function beforeinput(view, e) {
            var handled = e.inputType == "historyUndo" ? undo(view.state, view.dispatch) : e.inputType == "historyRedo" ? redo(view.state, view.dispatch) : false;
            if (handled) {
              e.preventDefault();
            }
            return handled;
          }
        }
      }
    });
  }
  function undo(state, dispatch2) {
    var hist = historyKey.getState(state);
    if (!hist || hist.done.eventCount == 0) {
      return false;
    }
    if (dispatch2) {
      histTransaction(hist, state, dispatch2, false);
    }
    return true;
  }
  function redo(state, dispatch2) {
    var hist = historyKey.getState(state);
    if (!hist || hist.undone.eventCount == 0) {
      return false;
    }
    if (dispatch2) {
      histTransaction(hist, state, dispatch2, true);
    }
    return true;
  }

  // node_modules/@tiptap/extension-history/dist/tiptap-extension-history.esm.js
  var History = Extension.create({
    name: "history",
    defaultOptions: {
      depth: 100,
      newGroupDelay: 500
    },
    addCommands() {
      return {
        undo: () => ({ state, dispatch: dispatch2 }) => {
          return undo(state, dispatch2);
        },
        redo: () => ({ state, dispatch: dispatch2 }) => {
          return redo(state, dispatch2);
        }
      };
    },
    addProseMirrorPlugins() {
      return [
        history(this.options)
      ];
    },
    addKeyboardShortcuts() {
      return {
        "Mod-z": () => this.editor.commands.undo(),
        "Mod-y": () => this.editor.commands.redo(),
        "Shift-Mod-z": () => this.editor.commands.redo(),
        "Mod-\u044F": () => this.editor.commands.undo(),
        "Shift-Mod-\u044F": () => this.editor.commands.redo()
      };
    }
  });

  // node_modules/@tiptap/extension-horizontal-rule/dist/tiptap-extension-horizontal-rule.esm.js
  var HorizontalRule = Node4.create({
    name: "horizontalRule",
    defaultOptions: {
      HTMLAttributes: {}
    },
    group: "block",
    parseHTML() {
      return [
        { tag: "hr" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addCommands() {
      return {
        setHorizontalRule: () => ({ chain }) => {
          return chain().command(({ tr, dispatch: dispatch2 }) => {
            const { selection } = tr;
            const { empty: empty2, $anchor } = selection;
            const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent;
            if (!empty2 || !isEmptyTextBlock || !dispatch2) {
              return true;
            }
            const from4 = $anchor.before();
            const to = $anchor.start();
            tr.deleteRange(from4, to);
            tr.setSelection(TextSelection.create(tr.doc, from4));
            return true;
          }).insertContent({ type: this.name }).command(({ tr, dispatch: dispatch2 }) => {
            var _a;
            if (dispatch2) {
              const { parent, pos } = tr.selection.$from;
              const posAfter = pos + 1;
              const nodeAfter = tr.doc.nodeAt(posAfter);
              if (!nodeAfter) {
                const node4 = (_a = parent.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.create();
                if (node4) {
                  tr.insert(posAfter, node4);
                  tr.setSelection(TextSelection.create(tr.doc, posAfter));
                }
              }
              tr.scrollIntoView();
            }
            return true;
          }).run();
        }
      };
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: /^(?:---|???-|___\s|\*\*\*\s)$/,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-italic/dist/tiptap-extension-italic.esm.js
  var starInputRegex2 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/;
  var starPasteRegex2 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g;
  var underscoreInputRegex2 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/;
  var underscorePasteRegex2 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g;
  var Italic = Mark3.create({
    name: "italic",
    defaultOptions: {
      HTMLAttributes: {}
    },
    parseHTML() {
      return [
        {
          tag: "em"
        },
        {
          tag: "i",
          getAttrs: (node4) => node4.style.fontStyle !== "normal" && null
        },
        {
          style: "font-style=italic"
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["em", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setItalic: () => ({ commands }) => {
          return commands.setMark("italic");
        },
        toggleItalic: () => ({ commands }) => {
          return commands.toggleMark("italic");
        },
        unsetItalic: () => ({ commands }) => {
          return commands.unsetMark("italic");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-i": () => this.editor.commands.toggleItalic()
      };
    },
    addInputRules() {
      return [
        markInputRule({
          find: starInputRegex2,
          type: this.type
        }),
        markInputRule({
          find: underscoreInputRegex2,
          type: this.type
        })
      ];
    },
    addPasteRules() {
      return [
        markPasteRule({
          find: starPasteRegex2,
          type: this.type
        }),
        markPasteRule({
          find: underscorePasteRegex2,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-list-item/dist/tiptap-extension-list-item.esm.js
  var ListItem = Node4.create({
    name: "listItem",
    defaultOptions: {
      HTMLAttributes: {}
    },
    content: "paragraph block*",
    defining: true,
    parseHTML() {
      return [
        {
          tag: "li"
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addKeyboardShortcuts() {
      return {
        Enter: () => this.editor.commands.splitListItem("listItem"),
        Tab: () => this.editor.commands.sinkListItem("listItem"),
        "Shift-Tab": () => this.editor.commands.liftListItem("listItem")
      };
    }
  });
  var tiptap_extension_list_item_esm_default = ListItem;

  // node_modules/@tiptap/extension-ordered-list/dist/tiptap-extension-ordered-list.esm.js
  var inputRegex4 = /^(\d+)\.\s$/;
  var OrderedList = Node4.create({
    name: "orderedList",
    defaultOptions: {
      HTMLAttributes: {}
    },
    group: "block list",
    content: "listItem+",
    addAttributes() {
      return {
        start: {
          default: 1,
          parseHTML: (element) => {
            return element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1;
          }
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "ol"
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      const { start: start3, ...attributesWithoutStart } = HTMLAttributes;
      return start3 === 1 ? ["ol", mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0] : ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        toggleOrderedList: () => ({ commands }) => {
          return commands.toggleList("orderedList", "listItem");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
      };
    },
    addInputRules() {
      return [
        wrappingInputRule({
          find: inputRegex4,
          type: this.type,
          getAttributes: (match) => ({ start: +match[1] }),
          joinPredicate: (match, node4) => node4.childCount + node4.attrs.start === +match[1]
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-paragraph/dist/tiptap-extension-paragraph.esm.js
  var Paragraph = Node4.create({
    name: "paragraph",
    priority: 1e3,
    defaultOptions: {
      HTMLAttributes: {}
    },
    group: "block",
    content: "inline*",
    parseHTML() {
      return [
        { tag: "p" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["p", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setParagraph: () => ({ commands }) => {
          return commands.setNode("paragraph");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Alt-0": () => this.editor.commands.setParagraph()
      };
    }
  });

  // node_modules/@tiptap/extension-strike/dist/tiptap-extension-strike.esm.js
  var inputRegex5 = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/;
  var pasteRegex2 = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g;
  var Strike = Mark3.create({
    name: "strike",
    defaultOptions: {
      HTMLAttributes: {}
    },
    parseHTML() {
      return [
        {
          tag: "s"
        },
        {
          tag: "del"
        },
        {
          tag: "strike"
        },
        {
          style: "text-decoration",
          consuming: false,
          getAttrs: (style2) => style2.includes("line-through") ? {} : false
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["s", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setStrike: () => ({ commands }) => {
          return commands.setMark("strike");
        },
        toggleStrike: () => ({ commands }) => {
          return commands.toggleMark("strike");
        },
        unsetStrike: () => ({ commands }) => {
          return commands.unsetMark("strike");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-x": () => this.editor.commands.toggleStrike()
      };
    },
    addInputRules() {
      return [
        markInputRule({
          find: inputRegex5,
          type: this.type
        })
      ];
    },
    addPasteRules() {
      return [
        markPasteRule({
          find: pasteRegex2,
          type: this.type
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-text/dist/tiptap-extension-text.esm.js
  var Text = Node4.create({
    name: "text",
    group: "inline"
  });
  var tiptap_extension_text_esm_default = Text;

  // node_modules/@tiptap/starter-kit/dist/tiptap-starter-kit.esm.js
  var StarterKit = Extension.create({
    name: "starterKit",
    addExtensions() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
      const extensions2 = [];
      if (this.options.blockquote !== false) {
        extensions2.push(Blockquote.configure((_a = this.options) === null || _a === void 0 ? void 0 : _a.blockquote));
      }
      if (this.options.bold !== false) {
        extensions2.push(Bold.configure((_b = this.options) === null || _b === void 0 ? void 0 : _b.bold));
      }
      if (this.options.bulletList !== false) {
        extensions2.push(BulletList.configure((_c = this.options) === null || _c === void 0 ? void 0 : _c.bulletList));
      }
      if (this.options.code !== false) {
        extensions2.push(Code.configure((_d = this.options) === null || _d === void 0 ? void 0 : _d.code));
      }
      if (this.options.codeBlock !== false) {
        extensions2.push(CodeBlock.configure((_e = this.options) === null || _e === void 0 ? void 0 : _e.codeBlock));
      }
      if (this.options.document !== false) {
        extensions2.push(tiptap_extension_document_esm_default.configure((_f = this.options) === null || _f === void 0 ? void 0 : _f.document));
      }
      if (this.options.dropcursor !== false) {
        extensions2.push(Dropcursor.configure((_g = this.options) === null || _g === void 0 ? void 0 : _g.dropcursor));
      }
      if (this.options.gapcursor !== false) {
        extensions2.push(Gapcursor.configure((_h = this.options) === null || _h === void 0 ? void 0 : _h.gapcursor));
      }
      if (this.options.hardBreak !== false) {
        extensions2.push(HardBreak.configure((_j = this.options) === null || _j === void 0 ? void 0 : _j.hardBreak));
      }
      if (this.options.heading !== false) {
        extensions2.push(Heading.configure((_k = this.options) === null || _k === void 0 ? void 0 : _k.heading));
      }
      if (this.options.history !== false) {
        extensions2.push(History.configure((_l = this.options) === null || _l === void 0 ? void 0 : _l.history));
      }
      if (this.options.horizontalRule !== false) {
        extensions2.push(HorizontalRule.configure((_m = this.options) === null || _m === void 0 ? void 0 : _m.horizontalRule));
      }
      if (this.options.italic !== false) {
        extensions2.push(Italic.configure((_o = this.options) === null || _o === void 0 ? void 0 : _o.italic));
      }
      if (this.options.listItem !== false) {
        extensions2.push(tiptap_extension_list_item_esm_default.configure((_p = this.options) === null || _p === void 0 ? void 0 : _p.listItem));
      }
      if (this.options.orderedList !== false) {
        extensions2.push(OrderedList.configure((_q = this.options) === null || _q === void 0 ? void 0 : _q.orderedList));
      }
      if (this.options.paragraph !== false) {
        extensions2.push(Paragraph.configure((_r = this.options) === null || _r === void 0 ? void 0 : _r.paragraph));
      }
      if (this.options.strike !== false) {
        extensions2.push(Strike.configure((_s = this.options) === null || _s === void 0 ? void 0 : _s.strike));
      }
      if (this.options.text !== false) {
        extensions2.push(tiptap_extension_text_esm_default.configure((_t = this.options) === null || _t === void 0 ? void 0 : _t.text));
      }
      return extensions2;
    }
  });

  // node_modules/@tiptap/extension-link/dist/tiptap-extension-link.esm.js
  var import_linkifyjs = __toModule(require_linkifyjs());
  var Link = Mark3.create({
    name: "link",
    priority: 1e3,
    inclusive: false,
    defaultOptions: {
      openOnClick: true,
      linkOnPaste: true,
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow"
      }
    },
    addAttributes() {
      return {
        href: {
          default: null
        },
        target: {
          default: this.options.HTMLAttributes.target
        }
      };
    },
    parseHTML() {
      return [
        { tag: "a[href]" }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["a", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setLink: (attributes) => ({ commands }) => {
          return commands.setMark("link", attributes);
        },
        toggleLink: (attributes) => ({ commands }) => {
          return commands.toggleMark("link", attributes, { extendEmptyMarkRange: true });
        },
        unsetLink: () => ({ commands }) => {
          return commands.unsetMark("link", { extendEmptyMarkRange: true });
        }
      };
    },
    addPasteRules() {
      return [
        markPasteRule({
          find: (text2) => (0, import_linkifyjs.find)(text2).filter((link) => link.isLink).map((link) => ({
            text: link.value,
            index: link.start,
            data: link
          })),
          type: this.type,
          getAttributes: (match) => {
            var _a;
            return {
              href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href
            };
          }
        })
      ];
    },
    addProseMirrorPlugins() {
      const plugins = [];
      if (this.options.openOnClick) {
        plugins.push(new Plugin({
          key: new PluginKey("handleClickLink"),
          props: {
            handleClick: (view, pos, event) => {
              var _a;
              const attrs = this.editor.getAttributes("link");
              const link = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest("a");
              if (link && attrs.href) {
                window.open(attrs.href, attrs.target);
                return true;
              }
              return false;
            }
          }
        }));
      }
      if (this.options.linkOnPaste) {
        plugins.push(new Plugin({
          key: new PluginKey("handlePasteLink"),
          props: {
            handlePaste: (view, event, slice4) => {
              const { state } = view;
              const { selection } = state;
              const { empty: empty2 } = selection;
              if (empty2) {
                return false;
              }
              let textContent = "";
              slice4.content.forEach((node4) => {
                textContent += node4.textContent;
              });
              const link = (0, import_linkifyjs.find)(textContent).find((item) => item.isLink && item.value === textContent);
              if (!textContent || !link) {
                return false;
              }
              this.editor.commands.setMark(this.type, {
                href: link.href
              });
              return true;
            }
          }
        }));
      }
      return plugins;
    }
  });

  // node_modules/@tiptap/extension-image/dist/tiptap-extension-image.esm.js
  var inputRegex6 = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))/;
  var Image = Node4.create({
    name: "image",
    defaultOptions: {
      inline: false,
      HTMLAttributes: {}
    },
    inline() {
      return this.options.inline;
    },
    group() {
      return this.options.inline ? "inline" : "block";
    },
    draggable: true,
    addAttributes() {
      return {
        src: {
          default: null
        },
        alt: {
          default: null
        },
        title: {
          default: null
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "img[src]"
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addCommands() {
      return {
        setImage: (options) => ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
      };
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: inputRegex6,
          type: this.type,
          getAttributes: (match) => {
            const [, , alt, src, title] = match;
            return { src, alt, title };
          }
        })
      ];
    }
  });

  // node_modules/@tiptap/extension-underline/dist/tiptap-extension-underline.esm.js
  var Underline = Mark3.create({
    name: "underline",
    defaultOptions: {
      HTMLAttributes: {}
    },
    parseHTML() {
      return [
        {
          tag: "u"
        },
        {
          style: "text-decoration",
          consuming: false,
          getAttrs: (style2) => style2.includes("underline") ? {} : false
        }
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["u", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
      return {
        setUnderline: () => ({ commands }) => {
          return commands.setMark("underline");
        },
        toggleUnderline: () => ({ commands }) => {
          return commands.toggleMark("underline");
        },
        unsetUnderline: () => ({ commands }) => {
          return commands.unsetMark("underline");
        }
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-u": () => this.editor.commands.toggleUnderline()
      };
    }
  });
  var tiptap_extension_underline_esm_default = Underline;

  // node_modules/@hotwired/stimulus/dist/stimulus.js
  var EventListener = class {
    constructor(eventTarget, eventName, eventOptions) {
      this.eventTarget = eventTarget;
      this.eventName = eventName;
      this.eventOptions = eventOptions;
      this.unorderedBindings = new Set();
    }
    connect() {
      this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
    }
    disconnect() {
      this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
    }
    bindingConnected(binding) {
      this.unorderedBindings.add(binding);
    }
    bindingDisconnected(binding) {
      this.unorderedBindings.delete(binding);
    }
    handleEvent(event) {
      const extendedEvent = extendEvent(event);
      for (const binding of this.bindings) {
        if (extendedEvent.immediatePropagationStopped) {
          break;
        } else {
          binding.handleEvent(extendedEvent);
        }
      }
    }
    get bindings() {
      return Array.from(this.unorderedBindings).sort((left, right) => {
        const leftIndex = left.index, rightIndex = right.index;
        return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
      });
    }
  };
  function extendEvent(event) {
    if ("immediatePropagationStopped" in event) {
      return event;
    } else {
      const { stopImmediatePropagation } = event;
      return Object.assign(event, {
        immediatePropagationStopped: false,
        stopImmediatePropagation() {
          this.immediatePropagationStopped = true;
          stopImmediatePropagation.call(this);
        }
      });
    }
  }
  var Dispatcher = class {
    constructor(application) {
      this.application = application;
      this.eventListenerMaps = new Map();
      this.started = false;
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.eventListeners.forEach((eventListener) => eventListener.connect());
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.eventListeners.forEach((eventListener) => eventListener.disconnect());
      }
    }
    get eventListeners() {
      return Array.from(this.eventListenerMaps.values()).reduce((listeners, map15) => listeners.concat(Array.from(map15.values())), []);
    }
    bindingConnected(binding) {
      this.fetchEventListenerForBinding(binding).bindingConnected(binding);
    }
    bindingDisconnected(binding) {
      this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    }
    handleError(error2, message, detail = {}) {
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    fetchEventListenerForBinding(binding) {
      const { eventTarget, eventName, eventOptions } = binding;
      return this.fetchEventListener(eventTarget, eventName, eventOptions);
    }
    fetchEventListener(eventTarget, eventName, eventOptions) {
      const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
      const cacheKey = this.cacheKey(eventName, eventOptions);
      let eventListener = eventListenerMap.get(cacheKey);
      if (!eventListener) {
        eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
        eventListenerMap.set(cacheKey, eventListener);
      }
      return eventListener;
    }
    createEventListener(eventTarget, eventName, eventOptions) {
      const eventListener = new EventListener(eventTarget, eventName, eventOptions);
      if (this.started) {
        eventListener.connect();
      }
      return eventListener;
    }
    fetchEventListenerMapForEventTarget(eventTarget) {
      let eventListenerMap = this.eventListenerMaps.get(eventTarget);
      if (!eventListenerMap) {
        eventListenerMap = new Map();
        this.eventListenerMaps.set(eventTarget, eventListenerMap);
      }
      return eventListenerMap;
    }
    cacheKey(eventName, eventOptions) {
      const parts = [eventName];
      Object.keys(eventOptions).sort().forEach((key) => {
        parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
      });
      return parts.join(":");
    }
  };
  var descriptorPattern = /^((.+?)(@(window|document))?->)?(.+?)(#([^:]+?))(:(.+))?$/;
  function parseActionDescriptorString(descriptorString) {
    const source = descriptorString.trim();
    const matches2 = source.match(descriptorPattern) || [];
    return {
      eventTarget: parseEventTarget(matches2[4]),
      eventName: matches2[2],
      eventOptions: matches2[9] ? parseEventOptions(matches2[9]) : {},
      identifier: matches2[5],
      methodName: matches2[7]
    };
  }
  function parseEventTarget(eventTargetName) {
    if (eventTargetName == "window") {
      return window;
    } else if (eventTargetName == "document") {
      return document;
    }
  }
  function parseEventOptions(eventOptions) {
    return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
  }
  function stringifyEventTarget(eventTarget) {
    if (eventTarget == window) {
      return "window";
    } else if (eventTarget == document) {
      return "document";
    }
  }
  function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
  }
  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function dasherize(value) {
    return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
  }
  function tokenize(value) {
    return value.match(/[^\s]+/g) || [];
  }
  var Action = class {
    constructor(element, index2, descriptor) {
      this.element = element;
      this.index = index2;
      this.eventTarget = descriptor.eventTarget || element;
      this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
      this.eventOptions = descriptor.eventOptions || {};
      this.identifier = descriptor.identifier || error("missing identifier");
      this.methodName = descriptor.methodName || error("missing method name");
    }
    static forToken(token) {
      return new this(token.element, token.index, parseActionDescriptorString(token.content));
    }
    toString() {
      const eventNameSuffix = this.eventTargetName ? `@${this.eventTargetName}` : "";
      return `${this.eventName}${eventNameSuffix}->${this.identifier}#${this.methodName}`;
    }
    get params() {
      if (this.eventTarget instanceof Element) {
        return this.getParamsFromEventTargetAttributes(this.eventTarget);
      } else {
        return {};
      }
    }
    getParamsFromEventTargetAttributes(eventTarget) {
      const params = {};
      const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`);
      const attributes = Array.from(eventTarget.attributes);
      attributes.forEach(({ name, value }) => {
        const match = name.match(pattern);
        const key = match && match[1];
        if (key) {
          Object.assign(params, { [camelize(key)]: typecast(value) });
        }
      });
      return params;
    }
    get eventTargetName() {
      return stringifyEventTarget(this.eventTarget);
    }
  };
  var defaultEventNames = {
    "a": (e) => "click",
    "button": (e) => "click",
    "form": (e) => "submit",
    "details": (e) => "toggle",
    "input": (e) => e.getAttribute("type") == "submit" ? "click" : "input",
    "select": (e) => "change",
    "textarea": (e) => "input"
  };
  function getDefaultEventNameForElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName in defaultEventNames) {
      return defaultEventNames[tagName](element);
    }
  }
  function error(message) {
    throw new Error(message);
  }
  function typecast(value) {
    try {
      return JSON.parse(value);
    } catch (o_O) {
      return value;
    }
  }
  var Binding = class {
    constructor(context, action) {
      this.context = context;
      this.action = action;
    }
    get index() {
      return this.action.index;
    }
    get eventTarget() {
      return this.action.eventTarget;
    }
    get eventOptions() {
      return this.action.eventOptions;
    }
    get identifier() {
      return this.context.identifier;
    }
    handleEvent(event) {
      if (this.willBeInvokedByEvent(event)) {
        this.invokeWithEvent(event);
      }
    }
    get eventName() {
      return this.action.eventName;
    }
    get method() {
      const method = this.controller[this.methodName];
      if (typeof method == "function") {
        return method;
      }
      throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
    }
    invokeWithEvent(event) {
      const { target, currentTarget } = event;
      try {
        const { params } = this.action;
        const actionEvent = Object.assign(event, { params });
        this.method.call(this.controller, actionEvent);
        this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
      } catch (error2) {
        const { identifier, controller, element, index: index2 } = this;
        const detail = { identifier, controller, element, index: index2, event };
        this.context.handleError(error2, `invoking action "${this.action}"`, detail);
      }
    }
    willBeInvokedByEvent(event) {
      const eventTarget = event.target;
      if (this.element === eventTarget) {
        return true;
      } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
        return this.scope.containsElement(eventTarget);
      } else {
        return this.scope.containsElement(this.action.element);
      }
    }
    get controller() {
      return this.context.controller;
    }
    get methodName() {
      return this.action.methodName;
    }
    get element() {
      return this.scope.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  var ElementObserver = class {
    constructor(element, delegate) {
      this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
      this.element = element;
      this.started = false;
      this.delegate = delegate;
      this.elements = new Set();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.refresh();
      }
    }
    pause(callback) {
      if (this.started) {
        this.mutationObserver.disconnect();
        this.started = false;
      }
      callback();
      if (!this.started) {
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        const matches2 = new Set(this.matchElementsInTree());
        for (const element of Array.from(this.elements)) {
          if (!matches2.has(element)) {
            this.removeElement(element);
          }
        }
        for (const element of Array.from(matches2)) {
          this.addElement(element);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      if (mutation.type == "attributes") {
        this.processAttributeChange(mutation.target, mutation.attributeName);
      } else if (mutation.type == "childList") {
        this.processRemovedNodes(mutation.removedNodes);
        this.processAddedNodes(mutation.addedNodes);
      }
    }
    processAttributeChange(node4, attributeName) {
      const element = node4;
      if (this.elements.has(element)) {
        if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
          this.delegate.elementAttributeChanged(element, attributeName);
        } else {
          this.removeElement(element);
        }
      } else if (this.matchElement(element)) {
        this.addElement(element);
      }
    }
    processRemovedNodes(nodes) {
      for (const node4 of Array.from(nodes)) {
        const element = this.elementFromNode(node4);
        if (element) {
          this.processTree(element, this.removeElement);
        }
      }
    }
    processAddedNodes(nodes) {
      for (const node4 of Array.from(nodes)) {
        const element = this.elementFromNode(node4);
        if (element && this.elementIsActive(element)) {
          this.processTree(element, this.addElement);
        }
      }
    }
    matchElement(element) {
      return this.delegate.matchElement(element);
    }
    matchElementsInTree(tree = this.element) {
      return this.delegate.matchElementsInTree(tree);
    }
    processTree(tree, processor) {
      for (const element of this.matchElementsInTree(tree)) {
        processor.call(this, element);
      }
    }
    elementFromNode(node4) {
      if (node4.nodeType == Node.ELEMENT_NODE) {
        return node4;
      }
    }
    elementIsActive(element) {
      if (element.isConnected != this.element.isConnected) {
        return false;
      } else {
        return this.element.contains(element);
      }
    }
    addElement(element) {
      if (!this.elements.has(element)) {
        if (this.elementIsActive(element)) {
          this.elements.add(element);
          if (this.delegate.elementMatched) {
            this.delegate.elementMatched(element);
          }
        }
      }
    }
    removeElement(element) {
      if (this.elements.has(element)) {
        this.elements.delete(element);
        if (this.delegate.elementUnmatched) {
          this.delegate.elementUnmatched(element);
        }
      }
    }
  };
  var AttributeObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeName = attributeName;
      this.delegate = delegate;
      this.elementObserver = new ElementObserver(element, this);
    }
    get element() {
      return this.elementObserver.element;
    }
    get selector() {
      return `[${this.attributeName}]`;
    }
    start() {
      this.elementObserver.start();
    }
    pause(callback) {
      this.elementObserver.pause(callback);
    }
    stop() {
      this.elementObserver.stop();
    }
    refresh() {
      this.elementObserver.refresh();
    }
    get started() {
      return this.elementObserver.started;
    }
    matchElement(element) {
      return element.hasAttribute(this.attributeName);
    }
    matchElementsInTree(tree) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches2 = Array.from(tree.querySelectorAll(this.selector));
      return match.concat(matches2);
    }
    elementMatched(element) {
      if (this.delegate.elementMatchedAttribute) {
        this.delegate.elementMatchedAttribute(element, this.attributeName);
      }
    }
    elementUnmatched(element) {
      if (this.delegate.elementUnmatchedAttribute) {
        this.delegate.elementUnmatchedAttribute(element, this.attributeName);
      }
    }
    elementAttributeChanged(element, attributeName) {
      if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
        this.delegate.elementAttributeValueChanged(element, attributeName);
      }
    }
  };
  var StringMapObserver = class {
    constructor(element, delegate) {
      this.element = element;
      this.delegate = delegate;
      this.started = false;
      this.stringMap = new Map();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
        this.refresh();
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        for (const attributeName of this.knownAttributeNames) {
          this.refreshAttribute(attributeName, null);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      const attributeName = mutation.attributeName;
      if (attributeName) {
        this.refreshAttribute(attributeName, mutation.oldValue);
      }
    }
    refreshAttribute(attributeName, oldValue) {
      const key = this.delegate.getStringMapKeyForAttribute(attributeName);
      if (key != null) {
        if (!this.stringMap.has(attributeName)) {
          this.stringMapKeyAdded(key, attributeName);
        }
        const value = this.element.getAttribute(attributeName);
        if (this.stringMap.get(attributeName) != value) {
          this.stringMapValueChanged(value, key, oldValue);
        }
        if (value == null) {
          const oldValue2 = this.stringMap.get(attributeName);
          this.stringMap.delete(attributeName);
          if (oldValue2)
            this.stringMapKeyRemoved(key, attributeName, oldValue2);
        } else {
          this.stringMap.set(attributeName, value);
        }
      }
    }
    stringMapKeyAdded(key, attributeName) {
      if (this.delegate.stringMapKeyAdded) {
        this.delegate.stringMapKeyAdded(key, attributeName);
      }
    }
    stringMapValueChanged(value, key, oldValue) {
      if (this.delegate.stringMapValueChanged) {
        this.delegate.stringMapValueChanged(value, key, oldValue);
      }
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      if (this.delegate.stringMapKeyRemoved) {
        this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
      }
    }
    get knownAttributeNames() {
      return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
    }
    get currentAttributeNames() {
      return Array.from(this.element.attributes).map((attribute) => attribute.name);
    }
    get recordedAttributeNames() {
      return Array.from(this.stringMap.keys());
    }
  };
  function add2(map15, key, value) {
    fetch2(map15, key).add(value);
  }
  function del2(map15, key, value) {
    fetch2(map15, key).delete(value);
    prune(map15, key);
  }
  function fetch2(map15, key) {
    let values = map15.get(key);
    if (!values) {
      values = new Set();
      map15.set(key, values);
    }
    return values;
  }
  function prune(map15, key) {
    const values = map15.get(key);
    if (values != null && values.size == 0) {
      map15.delete(key);
    }
  }
  var Multimap = class {
    constructor() {
      this.valuesByKey = new Map();
    }
    get keys() {
      return Array.from(this.valuesByKey.keys());
    }
    get values() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((values, set2) => values.concat(Array.from(set2)), []);
    }
    get size() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((size, set2) => size + set2.size, 0);
    }
    add(key, value) {
      add2(this.valuesByKey, key, value);
    }
    delete(key, value) {
      del2(this.valuesByKey, key, value);
    }
    has(key, value) {
      const values = this.valuesByKey.get(key);
      return values != null && values.has(value);
    }
    hasKey(key) {
      return this.valuesByKey.has(key);
    }
    hasValue(value) {
      const sets = Array.from(this.valuesByKey.values());
      return sets.some((set2) => set2.has(value));
    }
    getValuesForKey(key) {
      const values = this.valuesByKey.get(key);
      return values ? Array.from(values) : [];
    }
    getKeysForValue(value) {
      return Array.from(this.valuesByKey).filter(([key, values]) => values.has(value)).map(([key, values]) => key);
    }
  };
  var TokenListObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeObserver = new AttributeObserver(element, attributeName, this);
      this.delegate = delegate;
      this.tokensByElement = new Multimap();
    }
    get started() {
      return this.attributeObserver.started;
    }
    start() {
      this.attributeObserver.start();
    }
    pause(callback) {
      this.attributeObserver.pause(callback);
    }
    stop() {
      this.attributeObserver.stop();
    }
    refresh() {
      this.attributeObserver.refresh();
    }
    get element() {
      return this.attributeObserver.element;
    }
    get attributeName() {
      return this.attributeObserver.attributeName;
    }
    elementMatchedAttribute(element) {
      this.tokensMatched(this.readTokensForElement(element));
    }
    elementAttributeValueChanged(element) {
      const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
      this.tokensUnmatched(unmatchedTokens);
      this.tokensMatched(matchedTokens);
    }
    elementUnmatchedAttribute(element) {
      this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
    }
    tokensMatched(tokens) {
      tokens.forEach((token) => this.tokenMatched(token));
    }
    tokensUnmatched(tokens) {
      tokens.forEach((token) => this.tokenUnmatched(token));
    }
    tokenMatched(token) {
      this.delegate.tokenMatched(token);
      this.tokensByElement.add(token.element, token);
    }
    tokenUnmatched(token) {
      this.delegate.tokenUnmatched(token);
      this.tokensByElement.delete(token.element, token);
    }
    refreshTokensForElement(element) {
      const previousTokens = this.tokensByElement.getValuesForKey(element);
      const currentTokens = this.readTokensForElement(element);
      const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
      if (firstDifferingIndex == -1) {
        return [[], []];
      } else {
        return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
      }
    }
    readTokensForElement(element) {
      const attributeName = this.attributeName;
      const tokenString = element.getAttribute(attributeName) || "";
      return parseTokenString(tokenString, element, attributeName);
    }
  };
  function parseTokenString(tokenString, element, attributeName) {
    return tokenString.trim().split(/\s+/).filter((content2) => content2.length).map((content2, index2) => ({ element, attributeName, content: content2, index: index2 }));
  }
  function zip(left, right) {
    const length = Math.max(left.length, right.length);
    return Array.from({ length }, (_, index2) => [left[index2], right[index2]]);
  }
  function tokensAreEqual(left, right) {
    return left && right && left.index == right.index && left.content == right.content;
  }
  var ValueListObserver = class {
    constructor(element, attributeName, delegate) {
      this.tokenListObserver = new TokenListObserver(element, attributeName, this);
      this.delegate = delegate;
      this.parseResultsByToken = new WeakMap();
      this.valuesByTokenByElement = new WeakMap();
    }
    get started() {
      return this.tokenListObserver.started;
    }
    start() {
      this.tokenListObserver.start();
    }
    stop() {
      this.tokenListObserver.stop();
    }
    refresh() {
      this.tokenListObserver.refresh();
    }
    get element() {
      return this.tokenListObserver.element;
    }
    get attributeName() {
      return this.tokenListObserver.attributeName;
    }
    tokenMatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).set(token, value);
        this.delegate.elementMatchedValue(element, value);
      }
    }
    tokenUnmatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).delete(token);
        this.delegate.elementUnmatchedValue(element, value);
      }
    }
    fetchParseResultForToken(token) {
      let parseResult = this.parseResultsByToken.get(token);
      if (!parseResult) {
        parseResult = this.parseToken(token);
        this.parseResultsByToken.set(token, parseResult);
      }
      return parseResult;
    }
    fetchValuesByTokenForElement(element) {
      let valuesByToken = this.valuesByTokenByElement.get(element);
      if (!valuesByToken) {
        valuesByToken = new Map();
        this.valuesByTokenByElement.set(element, valuesByToken);
      }
      return valuesByToken;
    }
    parseToken(token) {
      try {
        const value = this.delegate.parseValueForToken(token);
        return { value };
      } catch (error2) {
        return { error: error2 };
      }
    }
  };
  var BindingObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.bindingsByAction = new Map();
    }
    start() {
      if (!this.valueListObserver) {
        this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
        this.valueListObserver.start();
      }
    }
    stop() {
      if (this.valueListObserver) {
        this.valueListObserver.stop();
        delete this.valueListObserver;
        this.disconnectAllActions();
      }
    }
    get element() {
      return this.context.element;
    }
    get identifier() {
      return this.context.identifier;
    }
    get actionAttribute() {
      return this.schema.actionAttribute;
    }
    get schema() {
      return this.context.schema;
    }
    get bindings() {
      return Array.from(this.bindingsByAction.values());
    }
    connectAction(action) {
      const binding = new Binding(this.context, action);
      this.bindingsByAction.set(action, binding);
      this.delegate.bindingConnected(binding);
    }
    disconnectAction(action) {
      const binding = this.bindingsByAction.get(action);
      if (binding) {
        this.bindingsByAction.delete(action);
        this.delegate.bindingDisconnected(binding);
      }
    }
    disconnectAllActions() {
      this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding));
      this.bindingsByAction.clear();
    }
    parseValueForToken(token) {
      const action = Action.forToken(token);
      if (action.identifier == this.identifier) {
        return action;
      }
    }
    elementMatchedValue(element, action) {
      this.connectAction(action);
    }
    elementUnmatchedValue(element, action) {
      this.disconnectAction(action);
    }
  };
  var ValueObserver = class {
    constructor(context, receiver) {
      this.context = context;
      this.receiver = receiver;
      this.stringMapObserver = new StringMapObserver(this.element, this);
      this.valueDescriptorMap = this.controller.valueDescriptorMap;
      this.invokeChangedCallbacksForDefaultValues();
    }
    start() {
      this.stringMapObserver.start();
    }
    stop() {
      this.stringMapObserver.stop();
    }
    get element() {
      return this.context.element;
    }
    get controller() {
      return this.context.controller;
    }
    getStringMapKeyForAttribute(attributeName) {
      if (attributeName in this.valueDescriptorMap) {
        return this.valueDescriptorMap[attributeName].name;
      }
    }
    stringMapKeyAdded(key, attributeName) {
      const descriptor = this.valueDescriptorMap[attributeName];
      if (!this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
      }
    }
    stringMapValueChanged(value, name, oldValue) {
      const descriptor = this.valueDescriptorNameMap[name];
      if (value === null)
        return;
      if (oldValue === null) {
        oldValue = descriptor.writer(descriptor.defaultValue);
      }
      this.invokeChangedCallback(name, value, oldValue);
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      const descriptor = this.valueDescriptorNameMap[key];
      if (this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
      } else {
        this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
      }
    }
    invokeChangedCallbacksForDefaultValues() {
      for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
        if (defaultValue != void 0 && !this.controller.data.has(key)) {
          this.invokeChangedCallback(name, writer(defaultValue), void 0);
        }
      }
    }
    invokeChangedCallback(name, rawValue, rawOldValue) {
      const changedMethodName = `${name}Changed`;
      const changedMethod = this.receiver[changedMethodName];
      if (typeof changedMethod == "function") {
        const descriptor = this.valueDescriptorNameMap[name];
        const value = descriptor.reader(rawValue);
        let oldValue = rawOldValue;
        if (rawOldValue) {
          oldValue = descriptor.reader(rawOldValue);
        }
        changedMethod.call(this.receiver, value, oldValue);
      }
    }
    get valueDescriptors() {
      const { valueDescriptorMap } = this;
      return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
    }
    get valueDescriptorNameMap() {
      const descriptors = {};
      Object.keys(this.valueDescriptorMap).forEach((key) => {
        const descriptor = this.valueDescriptorMap[key];
        descriptors[descriptor.name] = descriptor;
      });
      return descriptors;
    }
    hasValue(attributeName) {
      const descriptor = this.valueDescriptorNameMap[attributeName];
      const hasMethodName = `has${capitalize(descriptor.name)}`;
      return this.receiver[hasMethodName];
    }
  };
  var TargetObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.targetsByName = new Multimap();
    }
    start() {
      if (!this.tokenListObserver) {
        this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
        this.tokenListObserver.start();
      }
    }
    stop() {
      if (this.tokenListObserver) {
        this.disconnectAllTargets();
        this.tokenListObserver.stop();
        delete this.tokenListObserver;
      }
    }
    tokenMatched({ element, content: name }) {
      if (this.scope.containsElement(element)) {
        this.connectTarget(element, name);
      }
    }
    tokenUnmatched({ element, content: name }) {
      this.disconnectTarget(element, name);
    }
    connectTarget(element, name) {
      var _a;
      if (!this.targetsByName.has(name, element)) {
        this.targetsByName.add(name, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
      }
    }
    disconnectTarget(element, name) {
      var _a;
      if (this.targetsByName.has(name, element)) {
        this.targetsByName.delete(name, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
      }
    }
    disconnectAllTargets() {
      for (const name of this.targetsByName.keys) {
        for (const element of this.targetsByName.getValuesForKey(name)) {
          this.disconnectTarget(element, name);
        }
      }
    }
    get attributeName() {
      return `data-${this.context.identifier}-target`;
    }
    get element() {
      return this.context.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  var Context = class {
    constructor(module, scope) {
      this.logDebugActivity = (functionName, detail = {}) => {
        const { identifier, controller, element } = this;
        detail = Object.assign({ identifier, controller, element }, detail);
        this.application.logDebugActivity(this.identifier, functionName, detail);
      };
      this.module = module;
      this.scope = scope;
      this.controller = new module.controllerConstructor(this);
      this.bindingObserver = new BindingObserver(this, this.dispatcher);
      this.valueObserver = new ValueObserver(this, this.controller);
      this.targetObserver = new TargetObserver(this, this);
      try {
        this.controller.initialize();
        this.logDebugActivity("initialize");
      } catch (error2) {
        this.handleError(error2, "initializing controller");
      }
    }
    connect() {
      this.bindingObserver.start();
      this.valueObserver.start();
      this.targetObserver.start();
      try {
        this.controller.connect();
        this.logDebugActivity("connect");
      } catch (error2) {
        this.handleError(error2, "connecting controller");
      }
    }
    disconnect() {
      try {
        this.controller.disconnect();
        this.logDebugActivity("disconnect");
      } catch (error2) {
        this.handleError(error2, "disconnecting controller");
      }
      this.targetObserver.stop();
      this.valueObserver.stop();
      this.bindingObserver.stop();
    }
    get application() {
      return this.module.application;
    }
    get identifier() {
      return this.module.identifier;
    }
    get schema() {
      return this.application.schema;
    }
    get dispatcher() {
      return this.application.dispatcher;
    }
    get element() {
      return this.scope.element;
    }
    get parentElement() {
      return this.element.parentElement;
    }
    handleError(error2, message, detail = {}) {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    targetConnected(element, name) {
      this.invokeControllerMethod(`${name}TargetConnected`, element);
    }
    targetDisconnected(element, name) {
      this.invokeControllerMethod(`${name}TargetDisconnected`, element);
    }
    invokeControllerMethod(methodName, ...args) {
      const controller = this.controller;
      if (typeof controller[methodName] == "function") {
        controller[methodName](...args);
      }
    }
  };
  function readInheritableStaticArrayValues(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return Array.from(ancestors.reduce((values, constructor2) => {
      getOwnStaticArrayValues(constructor2, propertyName).forEach((name) => values.add(name));
      return values;
    }, new Set()));
  }
  function readInheritableStaticObjectPairs(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return ancestors.reduce((pairs, constructor2) => {
      pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
      return pairs;
    }, []);
  }
  function getAncestorsForConstructor(constructor) {
    const ancestors = [];
    while (constructor) {
      ancestors.push(constructor);
      constructor = Object.getPrototypeOf(constructor);
    }
    return ancestors.reverse();
  }
  function getOwnStaticArrayValues(constructor, propertyName) {
    const definition = constructor[propertyName];
    return Array.isArray(definition) ? definition : [];
  }
  function getOwnStaticObjectPairs(constructor, propertyName) {
    const definition = constructor[propertyName];
    return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
  }
  function bless(constructor) {
    return shadow(constructor, getBlessedProperties(constructor));
  }
  function shadow(constructor, properties) {
    const shadowConstructor = extend(constructor);
    const shadowProperties = getShadowProperties(constructor.prototype, properties);
    Object.defineProperties(shadowConstructor.prototype, shadowProperties);
    return shadowConstructor;
  }
  function getBlessedProperties(constructor) {
    const blessings = readInheritableStaticArrayValues(constructor, "blessings");
    return blessings.reduce((blessedProperties, blessing) => {
      const properties = blessing(constructor);
      for (const key in properties) {
        const descriptor = blessedProperties[key] || {};
        blessedProperties[key] = Object.assign(descriptor, properties[key]);
      }
      return blessedProperties;
    }, {});
  }
  function getShadowProperties(prototype, properties) {
    return getOwnKeys(properties).reduce((shadowProperties, key) => {
      const descriptor = getShadowedDescriptor(prototype, properties, key);
      if (descriptor) {
        Object.assign(shadowProperties, { [key]: descriptor });
      }
      return shadowProperties;
    }, {});
  }
  function getShadowedDescriptor(prototype, properties, key) {
    const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
    const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
    if (!shadowedByValue) {
      const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
      if (shadowingDescriptor) {
        descriptor.get = shadowingDescriptor.get || descriptor.get;
        descriptor.set = shadowingDescriptor.set || descriptor.set;
      }
      return descriptor;
    }
  }
  var getOwnKeys = (() => {
    if (typeof Object.getOwnPropertySymbols == "function") {
      return (object) => [
        ...Object.getOwnPropertyNames(object),
        ...Object.getOwnPropertySymbols(object)
      ];
    } else {
      return Object.getOwnPropertyNames;
    }
  })();
  var extend = (() => {
    function extendWithReflect(constructor) {
      function extended() {
        return Reflect.construct(constructor, arguments, new.target);
      }
      extended.prototype = Object.create(constructor.prototype, {
        constructor: { value: extended }
      });
      Reflect.setPrototypeOf(extended, constructor);
      return extended;
    }
    function testReflectExtension() {
      const a = function() {
        this.a.call(this);
      };
      const b = extendWithReflect(a);
      b.prototype.a = function() {
      };
      return new b();
    }
    try {
      testReflectExtension();
      return extendWithReflect;
    } catch (error2) {
      return (constructor) => class extended extends constructor {
      };
    }
  })();
  function blessDefinition(definition) {
    return {
      identifier: definition.identifier,
      controllerConstructor: bless(definition.controllerConstructor)
    };
  }
  var Module = class {
    constructor(application, definition) {
      this.application = application;
      this.definition = blessDefinition(definition);
      this.contextsByScope = new WeakMap();
      this.connectedContexts = new Set();
    }
    get identifier() {
      return this.definition.identifier;
    }
    get controllerConstructor() {
      return this.definition.controllerConstructor;
    }
    get contexts() {
      return Array.from(this.connectedContexts);
    }
    connectContextForScope(scope) {
      const context = this.fetchContextForScope(scope);
      this.connectedContexts.add(context);
      context.connect();
    }
    disconnectContextForScope(scope) {
      const context = this.contextsByScope.get(scope);
      if (context) {
        this.connectedContexts.delete(context);
        context.disconnect();
      }
    }
    fetchContextForScope(scope) {
      let context = this.contextsByScope.get(scope);
      if (!context) {
        context = new Context(this, scope);
        this.contextsByScope.set(scope, context);
      }
      return context;
    }
  };
  var ClassMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    has(name) {
      return this.data.has(this.getDataKey(name));
    }
    get(name) {
      return this.getAll(name)[0];
    }
    getAll(name) {
      const tokenString = this.data.get(this.getDataKey(name)) || "";
      return tokenize(tokenString);
    }
    getAttributeName(name) {
      return this.data.getAttributeNameForKey(this.getDataKey(name));
    }
    getDataKey(name) {
      return `${name}-class`;
    }
    get data() {
      return this.scope.data;
    }
  };
  var DataMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get(key) {
      const name = this.getAttributeNameForKey(key);
      return this.element.getAttribute(name);
    }
    set(key, value) {
      const name = this.getAttributeNameForKey(key);
      this.element.setAttribute(name, value);
      return this.get(key);
    }
    has(key) {
      const name = this.getAttributeNameForKey(key);
      return this.element.hasAttribute(name);
    }
    delete(key) {
      if (this.has(key)) {
        const name = this.getAttributeNameForKey(key);
        this.element.removeAttribute(name);
        return true;
      } else {
        return false;
      }
    }
    getAttributeNameForKey(key) {
      return `data-${this.identifier}-${dasherize(key)}`;
    }
  };
  var Guide = class {
    constructor(logger) {
      this.warnedKeysByObject = new WeakMap();
      this.logger = logger;
    }
    warn(object, key, message) {
      let warnedKeys = this.warnedKeysByObject.get(object);
      if (!warnedKeys) {
        warnedKeys = new Set();
        this.warnedKeysByObject.set(object, warnedKeys);
      }
      if (!warnedKeys.has(key)) {
        warnedKeys.add(key);
        this.logger.warn(message, object);
      }
    }
  };
  function attributeValueContainsToken(attributeName, token) {
    return `[${attributeName}~="${token}"]`;
  }
  var TargetSet = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get schema() {
      return this.scope.schema;
    }
    has(targetName) {
      return this.find(targetName) != null;
    }
    find(...targetNames) {
      return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), void 0);
    }
    findAll(...targetNames) {
      return targetNames.reduce((targets, targetName) => [
        ...targets,
        ...this.findAllTargets(targetName),
        ...this.findAllLegacyTargets(targetName)
      ], []);
    }
    findTarget(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findElement(selector);
    }
    findAllTargets(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findAllElements(selector);
    }
    getSelectorForTargetName(targetName) {
      const attributeName = this.schema.targetAttributeForScope(this.identifier);
      return attributeValueContainsToken(attributeName, targetName);
    }
    findLegacyTarget(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.deprecate(this.scope.findElement(selector), targetName);
    }
    findAllLegacyTargets(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
    }
    getLegacySelectorForTargetName(targetName) {
      const targetDescriptor = `${this.identifier}.${targetName}`;
      return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
    }
    deprecate(element, targetName) {
      if (element) {
        const { identifier } = this;
        const attributeName = this.schema.targetAttribute;
        const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
        this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
      }
      return element;
    }
    get guide() {
      return this.scope.guide;
    }
  };
  var Scope = class {
    constructor(schema, element, identifier, logger) {
      this.targets = new TargetSet(this);
      this.classes = new ClassMap(this);
      this.data = new DataMap(this);
      this.containsElement = (element2) => {
        return element2.closest(this.controllerSelector) === this.element;
      };
      this.schema = schema;
      this.element = element;
      this.identifier = identifier;
      this.guide = new Guide(logger);
    }
    findElement(selector) {
      return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
    }
    findAllElements(selector) {
      return [
        ...this.element.matches(selector) ? [this.element] : [],
        ...this.queryElements(selector).filter(this.containsElement)
      ];
    }
    queryElements(selector) {
      return Array.from(this.element.querySelectorAll(selector));
    }
    get controllerSelector() {
      return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
    }
  };
  var ScopeObserver = class {
    constructor(element, schema, delegate) {
      this.element = element;
      this.schema = schema;
      this.delegate = delegate;
      this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
      this.scopesByIdentifierByElement = new WeakMap();
      this.scopeReferenceCounts = new WeakMap();
    }
    start() {
      this.valueListObserver.start();
    }
    stop() {
      this.valueListObserver.stop();
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    parseValueForToken(token) {
      const { element, content: identifier } = token;
      const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
      let scope = scopesByIdentifier.get(identifier);
      if (!scope) {
        scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
        scopesByIdentifier.set(identifier, scope);
      }
      return scope;
    }
    elementMatchedValue(element, value) {
      const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
      this.scopeReferenceCounts.set(value, referenceCount);
      if (referenceCount == 1) {
        this.delegate.scopeConnected(value);
      }
    }
    elementUnmatchedValue(element, value) {
      const referenceCount = this.scopeReferenceCounts.get(value);
      if (referenceCount) {
        this.scopeReferenceCounts.set(value, referenceCount - 1);
        if (referenceCount == 1) {
          this.delegate.scopeDisconnected(value);
        }
      }
    }
    fetchScopesByIdentifierForElement(element) {
      let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
      if (!scopesByIdentifier) {
        scopesByIdentifier = new Map();
        this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
      }
      return scopesByIdentifier;
    }
  };
  var Router = class {
    constructor(application) {
      this.application = application;
      this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
      this.scopesByIdentifier = new Multimap();
      this.modulesByIdentifier = new Map();
    }
    get element() {
      return this.application.element;
    }
    get schema() {
      return this.application.schema;
    }
    get logger() {
      return this.application.logger;
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    get modules() {
      return Array.from(this.modulesByIdentifier.values());
    }
    get contexts() {
      return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
    }
    start() {
      this.scopeObserver.start();
    }
    stop() {
      this.scopeObserver.stop();
    }
    loadDefinition(definition) {
      this.unloadIdentifier(definition.identifier);
      const module = new Module(this.application, definition);
      this.connectModule(module);
    }
    unloadIdentifier(identifier) {
      const module = this.modulesByIdentifier.get(identifier);
      if (module) {
        this.disconnectModule(module);
      }
    }
    getContextForElementAndIdentifier(element, identifier) {
      const module = this.modulesByIdentifier.get(identifier);
      if (module) {
        return module.contexts.find((context) => context.element == element);
      }
    }
    handleError(error2, message, detail) {
      this.application.handleError(error2, message, detail);
    }
    createScopeForElementAndIdentifier(element, identifier) {
      return new Scope(this.schema, element, identifier, this.logger);
    }
    scopeConnected(scope) {
      this.scopesByIdentifier.add(scope.identifier, scope);
      const module = this.modulesByIdentifier.get(scope.identifier);
      if (module) {
        module.connectContextForScope(scope);
      }
    }
    scopeDisconnected(scope) {
      this.scopesByIdentifier.delete(scope.identifier, scope);
      const module = this.modulesByIdentifier.get(scope.identifier);
      if (module) {
        module.disconnectContextForScope(scope);
      }
    }
    connectModule(module) {
      this.modulesByIdentifier.set(module.identifier, module);
      const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
      scopes.forEach((scope) => module.connectContextForScope(scope));
    }
    disconnectModule(module) {
      this.modulesByIdentifier.delete(module.identifier);
      const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
      scopes.forEach((scope) => module.disconnectContextForScope(scope));
    }
  };
  var defaultSchema = {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-target",
    targetAttributeForScope: (identifier) => `data-${identifier}-target`
  };
  var Application = class {
    constructor(element = document.documentElement, schema = defaultSchema) {
      this.logger = console;
      this.debug = false;
      this.logDebugActivity = (identifier, functionName, detail = {}) => {
        if (this.debug) {
          this.logFormattedMessage(identifier, functionName, detail);
        }
      };
      this.element = element;
      this.schema = schema;
      this.dispatcher = new Dispatcher(this);
      this.router = new Router(this);
    }
    static start(element, schema) {
      const application = new Application(element, schema);
      application.start();
      return application;
    }
    async start() {
      await domReady();
      this.logDebugActivity("application", "starting");
      this.dispatcher.start();
      this.router.start();
      this.logDebugActivity("application", "start");
    }
    stop() {
      this.logDebugActivity("application", "stopping");
      this.dispatcher.stop();
      this.router.stop();
      this.logDebugActivity("application", "stop");
    }
    register(identifier, controllerConstructor) {
      if (controllerConstructor.shouldLoad) {
        this.load({ identifier, controllerConstructor });
      }
    }
    load(head, ...rest) {
      const definitions = Array.isArray(head) ? head : [head, ...rest];
      definitions.forEach((definition) => this.router.loadDefinition(definition));
    }
    unload(head, ...rest) {
      const identifiers = Array.isArray(head) ? head : [head, ...rest];
      identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
    }
    get controllers() {
      return this.router.contexts.map((context) => context.controller);
    }
    getControllerForElementAndIdentifier(element, identifier) {
      const context = this.router.getContextForElementAndIdentifier(element, identifier);
      return context ? context.controller : null;
    }
    handleError(error2, message, detail) {
      var _a;
      this.logger.error(`%s

%o

%o`, message, error2, detail);
      (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error2);
    }
    logFormattedMessage(identifier, functionName, detail = {}) {
      detail = Object.assign({ application: this }, detail);
      this.logger.groupCollapsed(`${identifier} #${functionName}`);
      this.logger.log("details:", Object.assign({}, detail));
      this.logger.groupEnd();
    }
  };
  function domReady() {
    return new Promise((resolve7) => {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", () => resolve7());
      } else {
        resolve7();
      }
    });
  }
  function ClassPropertiesBlessing(constructor) {
    const classes = readInheritableStaticArrayValues(constructor, "classes");
    return classes.reduce((properties, classDefinition) => {
      return Object.assign(properties, propertiesForClassDefinition(classDefinition));
    }, {});
  }
  function propertiesForClassDefinition(key) {
    return {
      [`${key}Class`]: {
        get() {
          const { classes } = this;
          if (classes.has(key)) {
            return classes.get(key);
          } else {
            const attribute = classes.getAttributeName(key);
            throw new Error(`Missing attribute "${attribute}"`);
          }
        }
      },
      [`${key}Classes`]: {
        get() {
          return this.classes.getAll(key);
        }
      },
      [`has${capitalize(key)}Class`]: {
        get() {
          return this.classes.has(key);
        }
      }
    };
  }
  function TargetPropertiesBlessing(constructor) {
    const targets = readInheritableStaticArrayValues(constructor, "targets");
    return targets.reduce((properties, targetDefinition) => {
      return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
    }, {});
  }
  function propertiesForTargetDefinition(name) {
    return {
      [`${name}Target`]: {
        get() {
          const target = this.targets.find(name);
          if (target) {
            return target;
          } else {
            throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
          }
        }
      },
      [`${name}Targets`]: {
        get() {
          return this.targets.findAll(name);
        }
      },
      [`has${capitalize(name)}Target`]: {
        get() {
          return this.targets.has(name);
        }
      }
    };
  }
  function ValuePropertiesBlessing(constructor) {
    const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
    const propertyDescriptorMap = {
      valueDescriptorMap: {
        get() {
          return valueDefinitionPairs.reduce((result2, valueDefinitionPair) => {
            const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair);
            const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
            return Object.assign(result2, { [attributeName]: valueDescriptor });
          }, {});
        }
      }
    };
    return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
      return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
    }, propertyDescriptorMap);
  }
  function propertiesForValueDefinitionPair(valueDefinitionPair) {
    const definition = parseValueDefinitionPair(valueDefinitionPair);
    const { key, name, reader: read, writer: write } = definition;
    return {
      [name]: {
        get() {
          const value = this.data.get(key);
          if (value !== null) {
            return read(value);
          } else {
            return definition.defaultValue;
          }
        },
        set(value) {
          if (value === void 0) {
            this.data.delete(key);
          } else {
            this.data.set(key, write(value));
          }
        }
      },
      [`has${capitalize(name)}`]: {
        get() {
          return this.data.has(key) || definition.hasCustomDefaultValue;
        }
      }
    };
  }
  function parseValueDefinitionPair([token, typeDefinition]) {
    return valueDescriptorForTokenAndTypeDefinition(token, typeDefinition);
  }
  function parseValueTypeConstant(constant) {
    switch (constant) {
      case Array:
        return "array";
      case Boolean:
        return "boolean";
      case Number:
        return "number";
      case Object:
        return "object";
      case String:
        return "string";
    }
  }
  function parseValueTypeDefault(defaultValue) {
    switch (typeof defaultValue) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
    }
    if (Array.isArray(defaultValue))
      return "array";
    if (Object.prototype.toString.call(defaultValue) === "[object Object]")
      return "object";
  }
  function parseValueTypeObject(typeObject) {
    const typeFromObject = parseValueTypeConstant(typeObject.type);
    if (typeFromObject) {
      const defaultValueType = parseValueTypeDefault(typeObject.default);
      if (typeFromObject !== defaultValueType) {
        throw new Error(`Type "${typeFromObject}" must match the type of the default value. Given default value: "${typeObject.default}" as "${defaultValueType}"`);
      }
      return typeFromObject;
    }
  }
  function parseValueTypeDefinition(typeDefinition) {
    const typeFromObject = parseValueTypeObject(typeDefinition);
    const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
    const typeFromConstant = parseValueTypeConstant(typeDefinition);
    const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
    if (type)
      return type;
    throw new Error(`Unknown value type "${typeDefinition}"`);
  }
  function defaultValueForDefinition(typeDefinition) {
    const constant = parseValueTypeConstant(typeDefinition);
    if (constant)
      return defaultValuesByType[constant];
    const defaultValue = typeDefinition.default;
    if (defaultValue !== void 0)
      return defaultValue;
    return typeDefinition;
  }
  function valueDescriptorForTokenAndTypeDefinition(token, typeDefinition) {
    const key = `${dasherize(token)}-value`;
    const type = parseValueTypeDefinition(typeDefinition);
    return {
      type,
      key,
      name: camelize(key),
      get defaultValue() {
        return defaultValueForDefinition(typeDefinition);
      },
      get hasCustomDefaultValue() {
        return parseValueTypeDefault(typeDefinition) !== void 0;
      },
      reader: readers[type],
      writer: writers[type] || writers.default
    };
  }
  var defaultValuesByType = {
    get array() {
      return [];
    },
    boolean: false,
    number: 0,
    get object() {
      return {};
    },
    string: ""
  };
  var readers = {
    array(value) {
      const array = JSON.parse(value);
      if (!Array.isArray(array)) {
        throw new TypeError("Expected array");
      }
      return array;
    },
    boolean(value) {
      return !(value == "0" || value == "false");
    },
    number(value) {
      return Number(value);
    },
    object(value) {
      const object = JSON.parse(value);
      if (object === null || typeof object != "object" || Array.isArray(object)) {
        throw new TypeError("Expected object");
      }
      return object;
    },
    string(value) {
      return value;
    }
  };
  var writers = {
    default: writeString,
    array: writeJSON,
    object: writeJSON
  };
  function writeJSON(value) {
    return JSON.stringify(value);
  }
  function writeString(value) {
    return `${value}`;
  }
  var Controller = class {
    constructor(context) {
      this.context = context;
    }
    static get shouldLoad() {
      return true;
    }
    get application() {
      return this.context.application;
    }
    get scope() {
      return this.context.scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get targets() {
      return this.scope.targets;
    }
    get classes() {
      return this.scope.classes;
    }
    get data() {
      return this.scope.data;
    }
    initialize() {
    }
    connect() {
    }
    disconnect() {
    }
    dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
      const type = prefix ? `${prefix}:${eventName}` : eventName;
      const event = new CustomEvent(type, { detail, bubbles, cancelable });
      target.dispatchEvent(event);
      return event;
    }
  };
  Controller.blessings = [ClassPropertiesBlessing, TargetPropertiesBlessing, ValuePropertiesBlessing];
  Controller.targets = [];
  Controller.values = {};

  // controllers/collapse_controller.js
  function createCategoryTag(value, text2) {
    let tag = document.createElement("p");
    tag.classList = "post-category badge badge-outline mr-2";
    let delBtn = document.createElement("span");
    delBtn.classList = "cursor-pointer";
    delBtn.title = `remove ${text2}`;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-3 h-3 stroke-current">   
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
                      </svg>`;
    delBtn.addEventListener("click", (e) => {
      tag.remove();
    });
    let val = document.createElement("span");
    val.classList = "hidden cat-value";
    val.innerText = value;
    tag.innerHTML = `<span class="mr-2 category-name">${text2}</span>`;
    tag.appendChild(delBtn);
    tag.appendChild(val);
    return tag;
  }
  function addCategoryTag(value, text2) {
    if (value.length === 0) {
      return;
    }
    for (const node4 of document.getElementsByClassName("category-name")) {
      if (node4.innerHTML === text2) {
        return;
      }
    }
    let categoryCont = document.getElementById("category-cont");
    let tag = createCategoryTag(value, text2);
    categoryCont.appendChild(tag);
  }
  var collapse_controller_default = class extends Controller {
    toggleVisibility() {
      if (!this.hasContentTarget) {
        return;
      }
      if (this.contentTarget.classList.contains("hidden")) {
        this.contentTarget.classList.remove("hidden");
      } else {
        this.contentTarget.classList.add("hidden");
      }
    }
    hide() {
      if (!this.hasContentTarget) {
        return;
      }
      this.contentTarget.classList.add("hidden");
    }
    saveCategory() {
      if (!this.hasContentTarget || !this.hasTriggerTarget) {
        return;
      }
      let parent = this.triggerTarget.parentElement;
      let inputField = parent.querySelector(".category-input");
      let value = inputField.value.trim().toLowerCase();
      let text2 = inputField.options[inputField.selectedIndex].text;
      addCategoryTag(value, text2);
      this.contentTarget.classList.add("hidden");
    }
  };
  __publicField(collapse_controller_default, "targets", ["content", "trigger"]);

  // script.js
  var QUERY_PARAMS = new URLSearchParams(window.location.search);
  var boldBtn = document.getElementById("bold-button");
  var italBtn = document.getElementById("italics-button");
  var underBtn = document.getElementById("underline-button");
  var lHeaderBtn = document.getElementById("h1-button");
  var sHeaderBtn = document.getElementById("h2-button");
  var linkBtn = document.getElementById("link-button");
  var imgBtn = document.getElementById("image-button");
  var editor = new Editor({
    element: document.querySelector("#mount-element"),
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        }
      }),
      Link,
      Image,
      tiptap_extension_underline_esm_default
    ],
    onTransaction({ editor: editor2, transaction }) {
      function updateBtnState(prop, btn, options) {
        if (editor2.isActive(prop, options)) {
          btn.classList.remove("btn-outline");
        } else {
          btn.classList.add("btn-outline");
        }
      }
      updateBtnState("bold", boldBtn);
      updateBtnState("italic", italBtn);
      updateBtnState("underline", underBtn);
      updateBtnState("link", linkBtn);
      updateBtnState("heading", lHeaderBtn, { level: 1 });
      updateBtnState("heading", sHeaderBtn, { level: 2 });
    }
  });
  boldBtn.addEventListener("click", (e) => {
    editor.chain().toggleBold().focus().run();
  });
  italBtn.addEventListener("click", (e) => {
    editor.chain().toggleItalic().focus().run();
  });
  underBtn.addEventListener("click", (e) => {
    editor.chain().toggleUnderline().focus().run();
  });
  lHeaderBtn.addEventListener("click", (e) => {
    editor.chain().toggleHeading({ level: 1 }).focus().run();
  });
  sHeaderBtn.addEventListener("click", (e) => {
    editor.chain().toggleHeading({ level: 2 }).focus().run();
  });
  linkBtn.addEventListener("click", (e) => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().toggleLink({ href: url }).focus().run();
  });
  imgBtn.addEventListener("click", (e) => {
    document.getElementById("img-upload-input").click();
  });
  document.getElementById("img-upload-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      editor.chain().focus().setImage({ src: reader.result }).run();
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  });
  window.Stimulus = Application.start();
  Stimulus.register("collapse", collapse_controller_default);
  function createCategoryTag2(value, text2) {
    let tag = document.createElement("p");
    tag.classList = "post-category badge badge-outline mr-2";
    let delBtn = document.createElement("span");
    delBtn.classList = "cursor-pointer";
    delBtn.title = `remove ${text2}`;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-3 h-3 stroke-current">   
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
                      </svg>`;
    delBtn.addEventListener("click", (e) => {
      tag.remove();
    });
    let val = document.createElement("span");
    val.classList = "hidden cat-value";
    val.innerText = value;
    tag.innerHTML = `<span class="mr-2 category-name">${text2}</span>`;
    tag.appendChild(delBtn);
    tag.appendChild(val);
    return tag;
  }
  function addCategoryTag2(value, text2) {
    if (value.length === 0) {
      return;
    }
    for (const node4 of document.getElementsByClassName("category-name")) {
      if (node4.innerHTML === text2) {
        return;
      }
    }
    let categoryCont = document.getElementById("category-cont");
    let tag = createCategoryTag2(value, text2);
    categoryCont.appendChild(tag);
  }
  function submit(publish) {
    let titleField = document.getElementById("title-field");
    let postTitle = titleField.value.trim().toLowerCase();
    let postContent = editor.getHTML();
    let errorMsg = document.getElementById("error-msg");
    let postCategories = "";
    if (postTitle === "") {
      errorMsg.innerText = "Post must have a title!";
      errorMsg.classList.remove("hidden");
      return;
    } else if (editor.isEmpty) {
      errorMsg.innerText = "Post Content Cannot be empty!";
      errorMsg.classList.remove("hidden");
      return;
    } else {
      errorMsg.classList.add("hidden");
    }
    for (const element of document.getElementsByClassName("cat-value")) {
      postCategories += element.innerText.toLowerCase() + ",";
    }
    postCategories = postCategories.slice(0, -1);
    const form = new FormData();
    form.set("title", postTitle);
    form.set("categories", postCategories);
    form.set("body", postContent);
    if (QUERY_PARAMS.get("edit") === "true") {
      form.set("edit", "true");
      form.set("id", QUERY_PARAMS.get("id"));
    }
    if (!publish || publish === false) {
      publish = false;
    } else {
      publish = true;
    }
    form.set("publish", publish);
    fetch("/admin/post", {
      credentials: "include",
      method: "POST",
      body: form
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    }).then((data) => {
      if (data.status !== "ok") {
        errorMsg.innerText = data.message;
        errorMsg.classList.remove("hidden");
        return;
      }
      location.assign("/admin/dashboard");
    }).catch((e) => console.log(e));
  }
  for (const element of document.getElementsByClassName("submit-btn")) {
    element.addEventListener("click", (e) => {
      if (e.target.classList.contains("publish-btn")) {
        submit(true);
      } else {
        submit(false);
      }
    });
  }
  function preFillPage() {
    let titleField = document.getElementById("title-field");
    titleField.value = document.getElementById("prev-title").innerHTML.trim();
    let prevCategories = JSON.parse(document.getElementById("prev-cat").innerHTML);
    let prevContent = document.getElementById("prev-content").innerHTML.trim();
    if (prevContent.length !== 0) {
      editor.commands.setContent(prevContent);
    }
    for (let cat of prevCategories) {
      if (cat.length !== 0) {
        addCategoryTag2(cat[0], cat[1]);
      }
    }
  }
  if (QUERY_PARAMS.get("edit") === "true") {
    preFillPage();
  }
})();
