class Statistics {
  constructor() {
    this.statictics = {};
    let scriptObj = document.querySelector('script[component]');
    this.timeOut = parseInt(scriptObj.getAttribute("timeOutRate")) || 3;
    this.statictics["browser"] = navigator.userAgent;
    this.statictics["screenSize"] = "" + screen.width + "*" + screen.height;
    this.statictics["Language"] = navigator.language;
    this.statictics["authorizationToken"] = this.getCookie("Authorization");
    this.statictics["url"] = window.location.href;
    document.onreadystatechange = function (event) {
      if (document.readyState === "interactive") {
        this.statictics["documentCompleteTime"] = event.timeStamp;
      }
    }.bind(this);

    window.onload = function (event) {
      this.statictics["windowOnLoadTime"] = event.timeStamp;
      if (!localStorage.getItem(window.location.href) || (new Date().getTime() - parseInt(localStorage.getItem(window.location.href)) > (3600000 * this.timeOut))) {
        this.sendData();
        localStorage.setItem(window.location.href, (new Date().getTime() + (this.timeOut * 3600000)).toString());
      }
    }.bind(this);
  }


    sendData()
    {
      var xhr = new XMLHttpRequest();
      var url = "https://stats.trdizin.gov.tr";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var res = xhr.responseText
          console.log("stat sonucu: ", res);
        }
      };
      var data = JSON.stringify(this.statictics);
      xhr.send(data);
    }

    getCookie(name)
    {
      let ca = document.cookie.split(';');
      let caLen = ca.length;
      let cookieName = `${name}=`;
      let c;

      for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
        }
      }
      return null;
    }
}

new Statistics();




