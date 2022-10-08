function Dsign2() {
  document.body.querySelectorAll("*").forEach(function(target) {
    var isValid = true;
    Dsign2.ignore.forEach(function(el) {
      isValid = isValid && !(target instanceof el);
    });
    if(!isValid) return;
    // dsign id
    if(target.dsignID === undefined) {
      target.dsignID = Dsign2.count;
      target.setAttribute("data-dsign-id", Dsign2.count);
      Dsign2.count += 1;
    }
    // class
    target.classList.forEach(function(cls) {
      var useDark = cls.startsWith("#");
      if(useDark) cls = cls.slice(1);
      // style
      if(Dsign2.pick(Dsign2.trim(cls)) != null) {
        Dsign2.check(Dsign2.token(target.dsignID, cls, useDark, "class"), function() {
        Dsign2.add(null, Dsign2.css(cls), target.dsignID, useDark);
        });
      }
      // pseudo selector
      if(cls.match(/.*::.*/)) {
        var m = cls.match(/(.*)::(.*)/);
        Dsign2.check(Dsign2.token(target.dsignID, m["2"], m["1"], useDark, "class"), function() {
          Dsign2.add("::" + m["1"], Dsign2.css(m["2"]), target.dsignID, useDark);
        });
      }
      // selector
      else if(cls.match(/.*:.*/)) {
        var m = cls.match(/(.*):(.*)/);
        Dsign2.check(Dsign2.token(target.dsignID, m["2"], m["1"], useDark, "class"), function() {
        Dsign2.add(":" + m["1"], Dsign2.css(m["2"]), target.dsignID, useDark);
        });
      }
    });
    // attribute
    for(var i = 0; i < target.attributes.length; i++) {
      var attr = target.attributes.item(i);
      var name = attr.localName;
      var value = attr.value;
      var useDark = name.startsWith("#");
      if(useDark) name = name.slice(1);
      // style
      if(Dsign2.pick(Dsign2.trim(name)) != null) {
        Dsign2.check(Dsign2.token(target.dsignID, name, value, useDark, "attr"), function() {
          Dsign2.add(null, `${name}: ${value}`, target.dsignID, useDark);
        });
      }
      // pseudo selector
      if(name.match(/.*::.*/)) {
        var m = name.match(/(.*)::(.*)/);
        Dsign2.check(Dsign2.token(target.dsignID, m["1"], name, value, useDark, "attr"), function() {
          Dsign2.add("::" + m["1"], `${name.replace(m["1"] + "::", "")}: ${value}`, target.dsignID, useDark);
        });
      }
      // selector
      else if(name.match(/.*:.*/)) {
        var m = name.match(/(.*):(.*)/);
        Dsign2.check(Dsign2.token(target.dsignID, m["1"], name, value, useDark, "attr"), function() {
          Dsign2.add(":" + m["1"], `${name.replace(m["1"] + ":", "")}: ${value}`, target.dsignID, useDark);
        });
      }
    }
  });
  if(Dsign2.isDark) Dsign2.element.innerText = Dsign2.darkTemplates;
  else Dsign2.element.innerText = Dsign2.lightTemplates;
  requestAnimationFrame(Dsign2);
}

Dsign2.pick = function(name) {
  var res = null;
  Dsign2.styles.forEach(function(styleName) {
    if(name.startsWith(styleName)) res = styleName;
  });
  return res;
}

Dsign2.reformat = function(name) {
  return name.replace(/(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "-$1").toLowerCase();
}

Dsign2.css = function(name) {
  var pick = Dsign2.pick(Dsign2.trim(name));
  if(pick == null) return;
  if(name == Dsign2.trim(name))
    return `${pick}: ${name.replace(pick + "-", "")}`;
  else {
    var property = name.substr(0, name.indexOf(pick)) + pick;
    var value = name.replace(name.substr(0, name.indexOf(pick)) + pick + "-", "");
    return `${property}: ${value}`;
  }
}

Dsign2.token = function() {
  var args = [];
  for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  return args.join("-");
}

Dsign2.check = function(token, callback) {
  if(!Dsign2.stack.includes(token)) {
    Dsign2.stack.push(token);
    callback();
  }
}

Dsign2.trim = function(name) {
  var ended = false
  var res = "";
  Array.from(name).forEach(function(char) {
    ended = ended || char != "-";
    if(ended) res += char;
  });
  return res;
}

Dsign2.add = function(selector, content, id, isDarkMode) {
  if(isDarkMode)
    Dsign2.darkTemplates += `[data-dsign-id="${id}"]${selector || ""} { ${content} }`;
  else
    Dsign2.lightTemplates += `[data-dsign-id="${id}"]${selector || ""} { ${content} }`;
}

Dsign2.count = 0;
Dsign2.stack = [];
Dsign2.element = document.createElement("style");
document.body.prepend(Dsign2.element)
Dsign2.styles = [];
for(var name in document.body.style) Dsign2.styles.push(Dsign2.reformat(name).toLowerCase());
Dsign2.ignore = [HTMLScriptElement, HTMLStyleElement];

Dsign2.darkTemplates = "";
Dsign2.lightTemplates = "";
Dsign2.isDark = false;

Dsign2();