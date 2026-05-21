(function () {
  const saved = localStorage.getItem('wcm_lang');
  if (saved === 'en') document.body.classList.remove('zh');
})();
