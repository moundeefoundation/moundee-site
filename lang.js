(function () {
  var STORAGE_KEY = "moundee-lang";
  var body = document.body;
  var toggle = document.getElementById("lang-toggle");

  function detectDefault() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
    return navigator.language && navigator.language.indexOf("zh") === 0 ? "zh" : "en";
  }

  function setLang(lang) {
    body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  setLang(detectDefault());

  toggle.addEventListener("click", function () {
    var current = body.getAttribute("data-lang");
    setLang(current === "zh" ? "en" : "zh");
  });
})();
