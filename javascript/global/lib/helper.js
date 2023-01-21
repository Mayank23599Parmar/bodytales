export const setCookie = (e, t, n) => {
    var i = new Date();
    i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
    var o = "expires=" + i.toUTCString();
    document.cookie = e + "=" + t + ";" + o + ";path=/";
  };
 export const getCookie = (e) => {
    for (
      var t = e + "=", n = document.cookie.split(";"), i = 0;
      i < n.length;
      i++
    ) {
      for (var o = n[i]; " " === o.charAt(0); ) o = o.substring(1);
      if (0 === o.indexOf(t)) return o.substring(t.length, o.length);
    }
    return "";
  };