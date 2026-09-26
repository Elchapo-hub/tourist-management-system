(() => {
  const key = 'run-africa-language';
  const sw = { Home: 'Mwanzo', Safaris: 'Safari', Destinations: 'Maeneo', 'Cultural Tourism': 'Utalii wa Utamaduni', 'Mountain Trekking': 'Matembezi ya Milimani', Leisure: 'Mapumziko', 'Plan Your Trip': 'Panga Safari Yako', 'About Us': 'Kuhusu Sisi', Contact: 'Wasiliana', 'Plan Your Adventure': 'Panga Safari Yako', 'Explore Wildlife Safaris': 'Chunguza Safari za Wanyamapori', 'Explore Ngorongoro': 'Chunguza Ngorongoro', 'Explore Mountain Trekking': 'Chunguza Matembezi ya Milimani', 'Explore Cultural Tours': 'Chunguza Ziara za Utamaduni', 'Explore Leisure Trips': 'Chunguza Safari za Mapumziko', 'Plan Your Tanzanian Adventure': 'Panga Safari Yako ya Tanzania', 'Search / Plan': 'Tafuta / Panga', '← Back to home': '← Rudi mwanzo', 'CONTACT RUN AFRICA': 'WASILIANA NA RUN AFRICA', 'Send inquiry': 'Tuma ombi', 'Explore Tanzania': 'Chunguza Tanzania', 'Ready to plan this experience?': 'Uko tayari kupanga tukio hili?', 'Talk to Run Africa': 'Ongea na Run Africa' };
  const originals = new WeakMap();
  function apply(language) {
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement.closest('script,style,noscript,[data-language-switcher]')) return;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const english = originals.get(node), leading = english.match(/^\s*/)[0], trailing = english.match(/\s*$/)[0];
      node.nodeValue = leading + (language === 'sw' ? (sw[english.trim()] || english.trim()) : english.trim()) + trailing;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === language;
      button.setAttribute('aria-pressed', active); button.classList.toggle('bg-surface', active); button.classList.toggle('font-bold', active); button.classList.toggle('text-primary', active);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    // The site home page is index.html. Repair legacy links that referenced a
    // non-existent runafrica.html file so the destination directory is reachable.
    const onHomePage = /(?:^|\/)index\.html$/.test(location.pathname) || location.pathname.endsWith('/pages/');
    document.querySelectorAll('a[href="runafrica.html"]').forEach(link => {
      link.href = 'index.html';
    });
    document.querySelectorAll('a[href="runafrica.html#destinations-section"]').forEach(link => {
      link.href = onHomePage ? '#destinations-section' : 'index.html#destinations-section';
    });

    document.querySelectorAll('button').forEach(button => { const text = button.textContent.trim().toLowerCase(); if (text === 'en' || text === 'sw') button.dataset.language ||= text; });
    document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => { const language = button.dataset.language === 'sw' ? 'sw' : 'en'; localStorage.setItem(key, language); apply(language); }));
    apply(localStorage.getItem(key) === 'sw' ? 'sw' : 'en');
  });
})();
