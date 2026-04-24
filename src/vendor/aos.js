// Minimal AOS stub to prevent errors when CDN is unavailable
(function(global){
  if (global.AOS) return;
  var AOS = {
    init: function(){ /* no-op for offline preview */ }
  };
  global.AOS = AOS;
})(window);