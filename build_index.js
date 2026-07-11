const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\edval\\.gemini\\antigravity\\scratch\\clinica-vida-plena';

const faqContent = fs.readFileSync(path.join(dir, 'faq-section.html'), 'utf8');
const specContent = fs.readFileSync(path.join(dir, 'specialties-content.html'), 'utf8');

const specialties = [
    { id: 'clinico-geral', name: 'Clínico Geral', desc: 'Atendimento adulto global e preventivo.' },
    { id: 'cardiologia', name: 'Cardiologia', desc: 'Cuidado completo para a saúde do seu coração.' },
    { id: 'dermatologia', name: 'Dermatologia', desc: 'Tratamentos estéticos e clínicos da pele.' },
    { id: 'pediatria', name: 'Pediatria', desc: 'Acompanhamento especializado para o seu filho.' },
    { id: 'ginecologia', name: 'Ginecologia', desc: 'Saúde integral e preventiva da mulher.' },
    { id: 'ortopedia', name: 'Ortopedia', desc: 'Tratamento de lesões ósseas e musculares.' },
    { id: 'neurologia', name: 'Neurologia', desc: 'Cuidado especializado do sistema nervoso.' },
    { id: 'endocrinologia', name: 'Endocrinologia', desc: 'Controle de hormônios e metabolismo.' },
    { id: 'gastroenterologia', name: 'Gastroenterologia', desc: 'Saúde do sistema digestivo.' },
    { id: 'psiquiatria', name: 'Psiquiatria', desc: 'Diagnóstico e tratamento em saúde mental.' },
    { id: 'psicologia', name: 'Psicologia', desc: 'Apoio terapêutico e emocional contínuo.' },
    { id: 'oftalmologia', name: 'Oftalmologia', desc: 'Prevenção e cuidado com a sua visão.' },
    { id: 'otorrinolaringologia', name: 'Otorrinolaringologia', desc: 'Saúde de ouvidos, nariz e garganta.' },
    { id: 'urologia', name: 'Urologia', desc: 'Cuidado da saúde masculina e vias urinárias.' },
    { id: 'pneumologia', name: 'Pneumologia', desc: 'Tratamento de vias respiratórias e pulmões.' },
    { id: 'reumatologia', name: 'Reumatologia', desc: 'Cuidados com doenças das articulações.' },
    { id: 'nutrologia', name: 'Nutrologia', desc: 'Acompanhamento médico nutrológico.' },
    { id: 'nutricao', name: 'Nutrição', desc: 'Planejamento alimentar e qualidade de vida.' }
];

let specCards = '';
specialties.forEach(spec => {
    specCards += `
        <div class="specialty-card" onclick="openSpecialtyModal('${spec.id}')">
          <div class="specialty-icon">🩺</div>
          <h3 class="specialty-name">${spec.name}</h3>
          <p class="specialty-desc">${spec.desc}</p>
          <span class="specialty-link">Saiba mais &rarr;</span>
        </div>\n`;
});

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clínica Vida Plena | Excelência Médica</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  
  <!-- CSS -->
  <link rel="stylesheet" href="styles.css?v=1">
</head>
<body>

  <!-- Header -->
  <header id="header">
    <div class="container header-inner">
      <a href="#" class="logo">
        <div class="logo-icon">➕</div>
        <div class="logo-text">
          <span class="logo-name">Vida Plena</span>
          <span class="logo-tagline">Clínica Médica</span>
        </div>
      </a>
      <nav class="nav-links">
        <a href="#especialidades">Especialidades</a>
        <a href="#medicos">Corpo Clínico</a>
        <a href="#exames">Exames</a>
        <a href="#sobre">Sobre Nós</a>
        <a href="#faq">Dúvidas</a>
      </nav>
      <a href="https://linkmagico.app.br/pricing" class="btn btn-primary header-cta">Agendar Consulta</a>
      <div class="nav-toggle">☰</div>
    </div>
  </header>

  <div class="mobile-menu">
    <a href="#especialidades">Especialidades</a>
    <a href="#medicos">Corpo Clínico</a>
    <a href="#faq">Dúvidas</a>
    <a href="https://wa.me/5511925312151" class="btn btn-whatsapp">WhatsApp</a>
  </div>

  <!-- Hero -->
  <section id="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Sua saúde no mais alto padrão de excelência.</h1>
        <p class="hero-subtitle">Há 22 anos cuidando da sua família com tecnologia de ponta, corpo clínico renomado e atendimento verdadeiramente humanizado.</p>
        <a href="https://linkmagico.app.br/pricing" class="btn btn-primary btn-lg">Agendar Agora</a>
        
        <div class="hero-badges">
          <div class="hero-badge">✓ +18 Especialidades</div>
          <div class="hero-badge">✓ Principais Convênios</div>
          <div class="hero-badge">✓ Resultados Online</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Busca -->
  <section id="busca">
    <div class="container">
      <div class="search-section">
        <div class="search-grid">
          <div class="search-field">
            <label>Especialidade</label>
            <select><option>Todas</option><option>Cardiologia</option></select>
          </div>
          <div class="search-field">
            <label>Médico</label>
            <select><option>Qualquer Médico</option></select>
          </div>
          <div class="search-field">
            <label>Convênio / Particular</label>
            <select><option>Todos os planos</option><option>Unimed</option></select>
          </div>
          <div class="search-field">
            <label>Unidade</label>
            <select><option>Unidade Principal</option></select>
          </div>
          <button class="btn btn-primary search-btn">Pesquisar</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Especialidades -->
  <section id="especialidades" class="section section-alt">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Especialidades Médicas</h2>
        <p class="section-subtitle">Nossa clínica reúne especialistas das mais diversas áreas da medicina, trabalhando de forma integrada para o seu diagnóstico e tratamento.</p>
      </div>
      <div class="specialties-grid">
        ${specCards}
      </div>
    </div>
  </section>

  <!-- Exames -->
  <section id="exames" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Centro de Diagnóstico</h2>
        <p class="section-subtitle">Acesso aos mais modernos equipamentos de imagem e laboratório de análises clínicas no mesmo local.</p>
      </div>
      <div class="exams-grid">
        <div class="exam-card"><h3>Exames Laboratoriais</h3><p>Análises clínicas completas com resultados rápidos online.</p></div>
        <div class="exam-card"><h3>Ultrassonografia</h3><p>Imagens de alta resolução, incluindo USG com doppler.</p></div>
        <div class="exam-card"><h3>Ressonância Magnética</h3><p>Equipamento de 3 Tesla, garantindo maior precisão.</p></div>
        <div class="exam-card"><h3>Tomografia</h3><p>Exames rápidos e precisos com baixa emissão de radiação.</p></div>
        <div class="exam-card"><h3>Endoscopia</h3><p>Realizada com máximo conforto sob leve sedação.</p></div>
        <div class="exam-card"><h3>Cardiológicos</h3><p>Holter, Mapa, ECG e Ecocardiograma completos.</p></div>
      </div>
    </div>
  </section>

  ${faqContent}

  ${specContent}

  <!-- Footer -->
  <footer id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">
            <div class="logo-icon">➕</div>
            <div class="logo-text">
              <span class="logo-name">Vida Plena</span>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size: 0.9rem; margin-bottom:1rem;">Desde 2004 oferecendo medicina de ponta aliada ao cuidado humanizado em um ambiente premium.</p>
        </div>
        <div class="footer-col">
          <h4>Institucional</h4>
          <div class="footer-links">
            <a href="#sobre">Nossa História</a>
            <a href="#medicos">Corpo Clínico</a>
            <a href="#diferenciais">Diferenciais</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Atendimento</h4>
          <div class="footer-links">
            <a href="https://linkmagico.app.br/pricing">Agendar Consulta</a>
            <a href="#faq">Dúvidas Frequentes</a>
            <a href="#convenios">Convênios Aceitos</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <div class="footer-links">
            <span style="color:var(--text-muted)">📍 Av. Paulista, 1000 - Bela Vista</span>
            <span style="color:var(--text-muted)">📞 (11) 3333-4444</span>
            <a href="https://wa.me/5511925312151" style="color:var(--accent-green)">💬 WhatsApp (11) 92531-2151</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Clínica Vida Plena. Todos os direitos reservados.
      </div>
    </div>
  </footer>

  <script src="scripts.js?v=1"></script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'index.html'), htmlContent);
console.log('Final index.html generated successfully.');
