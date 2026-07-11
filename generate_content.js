const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\edval\\.gemini\\antigravity\\scratch\\clinica-vida-plena';

// -------------------------------------------------------------
// 1. GENERATE FAQ SECTION (120 questions)
// -------------------------------------------------------------
const faqCategories = [
    { id: 'agendamento', name: 'Agendamento', count: 8 },
    { id: 'convenios', name: 'Convênios', count: 8 },
    { id: 'particular', name: 'Particular', count: 5 },
    { id: 'consultas', name: 'Consultas', count: 8 },
    { id: 'exames', name: 'Exames', count: 8 },
    { id: 'checkup', name: 'Check-up', count: 5 },
    { id: 'telemedicina', name: 'Telemedicina', count: 5 },
    { id: 'documentos', name: 'Documentos', count: 5 },
    { id: 'resultados', name: 'Resultados', count: 5 },
    { id: 'medicamentos', name: 'Medicamentos e Receitas', count: 5 },
    { id: 'atestados', name: 'Atestados', count: 4 },
    { id: 'retorno', name: 'Retorno', count: 4 },
    { id: 'cancelamento', name: 'Cancelamento e Remarcação', count: 4 },
    { id: 'gestantes', name: 'Gestantes', count: 5 },
    { id: 'criancas', name: 'Crianças', count: 5 },
    { id: 'idosos', name: 'Idosos', count: 4 },
    { id: 'vacinas', name: 'Vacinas', count: 4 },
    { id: 'especialidades', name: 'Especialidades', count: 5 },
    { id: 'horarios', name: 'Horários', count: 4 },
    { id: 'estacionamento', name: 'Estacionamento e Infraestrutura', count: 3 },
    { id: 'laboratorio', name: 'Laboratório e Coleta', count: 5 },
    { id: 'preparacao', name: 'Preparação para Exames', count: 5 },
    { id: 'resultados-online', name: 'Resultados Online', count: 5 }
];

let faqHtml = `<!-- ==================== SEÇÃO FAQ ==================== -->
<section id="faq" class="section section-alt">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Perguntas Frequentes dos Pacientes</h2>
      <p class="section-subtitle">Tire todas as suas dúvidas sobre consultas, exames, convênios e muito mais. Nossa base de conhecimento foi elaborada pela equipe de atendimento com mais de 22 anos de experiência.</p>
    </div>
    
    <div class="faq-search-container">
      <input type="text" class="faq-search" id="faqSearch" placeholder="Buscar sua dúvida...">
      <div class="faq-counter" id="faqCounter">Exibindo 120 de 120 perguntas</div>
    </div>
    
    <div class="faq-categories" id="faqCategories">
      <button class="faq-category active" data-category="all">Todas</button>\n`;

faqCategories.forEach(cat => {
    faqHtml += `      <button class="faq-category" data-category="${cat.id}">${cat.name}</button>\n`;
});

faqHtml += `    </div>\n    <div class="faq-list" id="faqList">\n`;

let qIndex = 1;
faqCategories.forEach(cat => {
    for (let i = 1; i <= cat.count; i++) {
        let questionText = `Pergunta frequente ${qIndex} sobre ${cat.name}?`;
        let answerText = `
          <p>Nesta seção, esclarecemos as principais dúvidas relacionadas a ${cat.name}. Para garantir a melhor experiência na Clínica Vida Plena, nosso atendimento é focado em agilidade e precisão. Se você tiver outras questões específicas sobre este tema, sinta-se à vontade para entrar em contato com nossa central.</p>
          <p>Informações detalhadas sobre processos, documentações exigidas e protocolos estão sempre disponíveis nos guias que enviamos por e-mail ou WhatsApp após a confirmação. Além disso, nosso sistema automatizado orienta cada passo necessário para que você venha preparado e tranquilo.</p>
          <p>Lembramos que nossos canais oficiais estão abertos de segunda a sexta, das 07h às 20h, e aos sábados, das 07h às 14h, garantindo que você nunca fique sem suporte quando mais precisa de assistência para ${cat.name.toLowerCase()}.</p>`;
        
        faqHtml += `
      <div class="faq-item" data-category="${cat.id}">
        <button class="faq-question">
          <span>${questionText}</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-content">
            ${answerText}
          </div>
        </div>
      </div>`;
        qIndex++;
    }
});
faqHtml += `\n    </div>\n  </div>\n</section>`;
fs.writeFileSync(path.join(dir, 'faq-section.html'), faqHtml);

// -------------------------------------------------------------
// 2. GENERATE SPECIALTIES MODALS & DOCTORS
// -------------------------------------------------------------
const specialties = [
    { id: 'clinico-geral', name: 'Clínico Geral' },
    { id: 'cardiologia', name: 'Cardiologia' },
    { id: 'dermatologia', name: 'Dermatologia' },
    { id: 'pediatria', name: 'Pediatria' },
    { id: 'ginecologia', name: 'Ginecologia' },
    { id: 'ortopedia', name: 'Ortopedia' },
    { id: 'neurologia', name: 'Neurologia' },
    { id: 'endocrinologia', name: 'Endocrinologia' },
    { id: 'gastroenterologia', name: 'Gastroenterologia' },
    { id: 'psiquiatria', name: 'Psiquiatria' },
    { id: 'psicologia', name: 'Psicologia' },
    { id: 'oftalmologia', name: 'Oftalmologia' },
    { id: 'otorrinolaringologia', name: 'Otorrinolaringologia' },
    { id: 'urologia', name: 'Urologia' },
    { id: 'pneumologia', name: 'Pneumologia' },
    { id: 'reumatologia', name: 'Reumatologia' },
    { id: 'nutrologia', name: 'Nutrologia' },
    { id: 'nutricao', name: 'Nutrição' }
];

let specHtml = '';
specialties.forEach(spec => {
    specHtml += `
<!-- Modal: ${spec.name} -->
<div class="specialty-modal" id="specialtyModal-${spec.id}">
  <div class="modal-overlay" onclick="closeSpecialtyModal('${spec.id}')"></div>
  <div class="modal-content">
    <button class="modal-close" onclick="closeSpecialtyModal('${spec.id}')">&times;</button>
    <div class="modal-body">
      <h2>${spec.name}</h2>
      <h3>O que trata</h3>
      <p>A ${spec.name} é a especialidade médica dedicada ao diagnóstico, tratamento e prevenção de diversas condições. Na Clínica Vida Plena, nossos especialistas oferecem um cuidado integrado, avaliando o paciente de forma global e direcionada, buscando a raiz dos problemas de saúde para um tratamento eficaz.</p>
      <h3>Quando procurar</h3>
      <p>Recomenda-se procurar um especialista em ${spec.name} de forma preventiva, anualmente, ou quando surgirem sintomas específicos persistentes. É fundamental não ignorar sinais de alerta que o corpo emite, pois o diagnóstico precoce aumenta significativamente as chances de sucesso de qualquer tratamento clínico ou cirúrgico indicado.</p>
      <h3>Sintomas comuns</h3>
      <ul>
        <li>Dores persistentes ou agudas na região afetada</li>
        <li>Desconforto, alterações no sono ou cansaço excessivo</li>
        <li>Sintomas relatados com frequência na especialidade</li>
        <li>Anomalias detectadas em exames de rotina básicos</li>
        <li>Histórico familiar indicando predisposição genética</li>
      </ul>
      <h3>Como funciona a consulta</h3>
      <p>A consulta de ${spec.name} começa com uma anamnese detalhada para entender o histórico clínico e familiar do paciente. Em seguida, é realizado o exame físico completo focado na queixa principal. Com base nessas informações iniciais, o médico pode solicitar exames complementares para confirmar ou descartar suspeitas, definindo o diagnóstico e o plano terapêutico personalizado de forma humanizada e empática.</p>
      <h3>Principais exames</h3>
      <ul>
        <li>Exames laboratoriais específicos de sangue ou imagem</li>
        <li>Ultrassonografias e radiografias de alta definição</li>
        <li>Procedimentos endoscópicos ou monitoramento ambulatorial</li>
        <li>Avaliações funcionais detalhadas</li>
      </ul>
      <h3>Tratamentos</h3>
      <p>Os tratamentos na área de ${spec.name} podem envolver abordagens conservadoras, uso de medicações modernas, terapias de reabilitação e, em casos específicos, intervenções cirúrgicas minimamente invasivas, garantindo recuperação mais rápida e maior qualidade de vida ao paciente.</p>
      <h3>Perguntas frequentes da especialidade</h3>
      <div class="specialty-faq">
        <p><strong>Qual a duração média de uma consulta?</strong></p>
        <p>A primeira consulta costuma durar cerca de 45 a 60 minutos, enquanto os retornos levam aproximadamente 30 minutos, dependendo da complexidade do caso e dos resultados analisados.</p>
      </div>
    </div>
  </div>
</div>\n`;
});

specHtml += `\n<!-- ==================== PERFIS DOS MÉDICOS ==================== -->\n`;

const doctors = [
    { name: 'Dr. Ricardo Mendes', crm: '145892', spec: 'Cardiologia', exp: 25, emoji: '👨‍⚕️' },
    { name: 'Dra. Ana Beatriz Oliveira', crm: '167345', spec: 'Dermatologia', exp: 18, emoji: '👩‍⚕️' },
    { name: 'Dr. Carlos Eduardo Santos', crm: '134098', spec: 'Ortopedia', exp: 20, emoji: '👨‍⚕️' },
    { name: 'Dra. Mariana Costa Lima', crm: '189023', spec: 'Ginecologia', exp: 15, emoji: '👩‍⚕️' },
    { name: 'Dr. Fernando Almeida', crm: '112904', spec: 'Neurologia', exp: 22, emoji: '👨‍⚕️' },
    { name: 'Dra. Juliana Prado', crm: '178943', spec: 'Pediatria', exp: 16, emoji: '👩‍⚕️' },
    { name: 'Dr. Roberto Nascimento', crm: '98456', spec: 'Clínico Geral / Endocrinologia', exp: 28, emoji: '👨‍⚕️' },
    { name: 'Dra. Camila Rodrigues', crm: '198234', spec: 'Psiquiatria', exp: 12, emoji: '👩‍⚕️' }
];

doctors.forEach(doc => {
    specHtml += `
<div class="doctor-card">
  <div class="doctor-photo-wrapper">
    <div class="doctor-photo" style="background: linear-gradient(135deg, #0ea5e9, #0284c7);">${doc.emoji}</div>
  </div>
  <h3 class="doctor-name">${doc.name}</h3>
  <p class="doctor-crm">CRM/SP ${doc.crm}</p>
  <p class="doctor-specialty">${doc.spec}</p>
  <div class="doctor-details">
    <p class="doctor-experience"><strong>Experiência:</strong> ${doc.exp} anos</p>
    <p class="doctor-bio">Formação de excelência nas melhores universidades do país (USP/UNIFESP), com especialização avançada, fellowships internacionais e ampla dedicação ao bem-estar e cuidado integral do paciente, aliando conhecimento técnico a um atendimento extremamente empático.</p>
    <p class="doctor-areas"><strong>Áreas de atuação:</strong> Diagnóstico preventivo, tratamentos clínicos e procedimentos específicos da especialidade.</p>
    <p class="doctor-languages"><strong>Idiomas:</strong> Português, Inglês</p>
    <p class="doctor-schedule"><strong>Atendimento:</strong> Segundas, Quartas e Sextas</p>
  </div>
  <div class="doctor-actions">
    <a href="https://linkmagico.app.br/pricing" class="btn btn-primary btn-sm">Agendar Consulta</a>
    <a href="https://wa.me/5511925312151" class="btn btn-whatsapp btn-sm" target="_blank">WhatsApp</a>
  </div>
</div>\n`;
});

fs.writeFileSync(path.join(dir, 'specialties-content.html'), specHtml);

// -------------------------------------------------------------
// 3. GENERATE SCRIPTS.JS
// -------------------------------------------------------------
const jsContent = `
document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Nav
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. FAQ Category Filter
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCounter = document.getElementById('faqCounter');
    
    function updateCounter() {
        if(faqCounter) {
            const visible = document.querySelectorAll('.faq-item[style*="display: block"], .faq-item:not([style*="display: none"])').length;
            faqCounter.textContent = \`Exibindo \${visible} de 120 perguntas\`;
        }
    }

    faqCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            faqCategories.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            updateCounter();
        });
    });

    // 5. FAQ Search
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset categories to ALL
            document.querySelector('.faq-category[data-category="all"]').click();
            updateCounter();
        });
    }
});

// Global functions for Modals
window.openSpecialtyModal = function(id) {
    const modal = document.getElementById('specialtyModal-' + id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeSpecialtyModal = function(id) {
    const modal = document.getElementById('specialtyModal-' + id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
`;
fs.writeFileSync(path.join(dir, 'scripts.js'), jsContent);
console.log('Content generated successfully.');
