// DOM Elements
const questionInput = document.getElementById('question-input');
const drawButton = document.getElementById('draw-button');
const cardsContainer = document.getElementById('cards-container');
const aiContainer = document.getElementById('ai-container');

let currentCards = [];

function drawCards(n) {
  const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getRandomOrientation() {
  return Math.random() < 0.5 ? '正位' : '逆位';
}

function getCardMeaning(card, orientation) {
  return orientation === '正位' ? card.upright : card.reversed;
}

function generateAIInterpretation(cards, question) {
  const cardInfo = cards.map(c => ({
    name: c.card.name,
    chinese: c.card.chinese,
    orientation: c.orientation,
    meaning: getCardMeaning(c.card, c.orientation),
    isReversed: c.orientation === '逆位'
  }));
  
  const currentSituation = `<div class="ai-section-title">过往经历</div><div class="ai-section-content"><strong>${cardInfo[0].chinese}(${cardInfo[0].name})${cardInfo[0].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[0].meaning}<br>${cardInfo[0].isReversed ? '说明这段经历已经过去，但影响仍在。' : '这段经历正在深刻影响着您，需要认真总结经验教训。'}</div>`;

  const challenge = `<div class="ai-section-title">当前情况</div><div class="ai-section-content"><strong>${cardInfo[1].chinese}(${cardInfo[1].name})${cardInfo[1].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[1].meaning}<br>${cardInfo[1].isReversed ? '提示您需要重新评估当前处境，不要被表象迷惑。' : '您当前正处于这个阶段的关键时期，需要把握机会积极行动。'}</div>`;

  const prediction = `<div class="ai-section-title">未来预测</div><div class="ai-section-content"><strong>${cardInfo[2].chinese}(${cardInfo[2].name})${cardInfo[2].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[2].meaning}<br>${cardInfo[2].isReversed ? '提示未来会有不确定性，需要您做好预案保持灵活性。' : '这是一个积极的发展方向，坚持下去将获得满意的结果。'}</div>`;

  const advice = `<div class="ai-section-title">综合建议</div><div class="ai-section-content"><strong>1. 总结过往</strong><br>结合${cardInfo[0].chinese}(${cardInfo[0].name})的经验，认真总结过去经历的教训，不要重复同样的错误。<br><strong>2. 把握现在</strong><br>面对${cardInfo[1].chinese}(${cardInfo[1].name})的现状，${cardInfo[1].isReversed ? '要客观分析当前处境，避免主观臆断' : '积极应对，把握当下这个关键时期'}。<br><strong>3. 展望未来</strong><br>根据${cardInfo[2].chinese}(${cardInfo[2].name})的提示，${cardInfo[2].isReversed ? '建议您做好Plan B的准备，保持灵活性' : '建议您积极行动，把握当前的机遇'}</div>`;
  
  return `<div class="ai-section">${currentSituation}</div><div class="ai-section">${challenge}</div><div class="ai-section">${prediction}</div><div class="ai-section">${advice}</div>`;
}

async function callAIForInterpretation(cards, question) {
  const cardInfo = cards.map(c => ({
    name: c.card.name,
    chinese: c.card.chinese,
    orientation: c.orientation,
    meaning: getCardMeaning(c.card, c.orientation),
    isReversed: c.orientation === '逆位'
  }));
  
  // 分析用户问题的主题
  const questionLower = question.toLowerCase();
  const isWorkRelated = ['工作', '事业', '职业', '上班', '公司', '职场', 'job', 'work'].some(term => questionLower.includes(term));
  const isLoveRelated = ['爱情', '恋爱', '伴侣', '对象', '情人', '感情', 'love', 'relationship', 'dating'].some(term => questionLower.includes(term));
  const isHealthRelated = ['健康', '身体', '生病', 'health', '身体', 'medical', 'illness'].some(term => questionLower.includes(term));
  const isFinanceRelated = ['财务', '金钱', '财运', '钱', 'money', 'finance', '财富'].some(term => questionLower.includes(term));
  
  // 确定主标题
  let topicTitle = "整体情况";
  if(isWorkRelated) topicTitle = "事业发展";
  else if(isLoveRelated) topicTitle = "感情关系";
  else if(isHealthRelated) topicTitle = "健康状况";
  else if(isFinanceRelated) topicTitle = "财务运势";
  
  // 创建内容片段
  let pastDetail = isWorkRelated ? '这段经历对您的事业发展产生了深远影响。' : 
                 isLoveRelated ? '过去的感情经历塑造了现在的您。' : 
                 isHealthRelated ? '过去的健康习惯影响着现在的状况。' : 
                 isFinanceRelated ? '过去的财务决定造成了现在的结果。' : 
                 cardInfo[0].isReversed ? '说明这段经历已经过去，但影响仍在。' : '这段经历正在深刻影响着您，需要认真总结经验教训。';
                 
  let presentDetail = isWorkRelated ? '当前事业处于关键转折点，需要特别注意决策。' : 
                    isLoveRelated ? '当前感情状态需要真诚沟通与相互理解。' : 
                    isHealthRelated ? '当前身体状况需要关注与调理。' : 
                    isFinanceRelated ? '当前财务状况需要谨慎管理，合理规划。' : 
                    cardInfo[1].isReversed ? '提示您需要重新评估当前处境，不要被表象迷惑。' : '您当前正处于这个阶段的关键时期，需要把握机会积极行动。';
                    
  let futureDetail = isWorkRelated ? '事业发展前景光明，保持专业态度将获得回报。' : 
                   isLoveRelated ? '感情关系将进入稳定发展阶段，真诚相待是关键。' : 
                   isHealthRelated ? '身体健康状况将逐步改善，需坚持良好习惯。' : 
                   isFinanceRelated ? '财务状况向好发展，投资理财时机渐佳。' : 
                   cardInfo[2].isReversed ? '提示未来会有不确定性，需要您做好预案保持灵活性。' : '这是一个积极的发展方向，坚持下去将获得满意的结果。';

  const currentSituation = `<div class="ai-section-title">过往经历</div><div class="ai-section-content"><strong>${cardInfo[0].chinese}(${cardInfo[0].name})${cardInfo[0].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[0].meaning}<br>${pastDetail}</div>`;

  const challenge = `<div class="ai-section-title">当前情况</div><div class="ai-section-content"><strong>${cardInfo[1].chinese}(${cardInfo[1].name})${cardInfo[1].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[1].meaning}<br>${presentDetail}</div>`;

  const prediction = `<div class="ai-section-title">${topicTitle}预测</div><div class="ai-section-content"><strong>${cardInfo[2].chinese}(${cardInfo[2].name})${cardInfo[2].isReversed ? '逆位' : '正位'}</strong><br>${cardInfo[2].meaning}<br>${futureDetail}</div>`;

  let summaryPast = isWorkRelated ? '总结事业道路上的经验教训。' : 
                  isLoveRelated ? '回顾过去感情经历的得失。' : 
                  isHealthRelated ? '反思过去的健康习惯。' : 
                  isFinanceRelated ? '梳理过往的财务决策。' : 
                  '认真总结过去经历的教训，不要重复同样的错误。';
                  
  let summaryPresent = isWorkRelated ? '积极应对职场挑战，展现专业能力。' : 
                     isLoveRelated ? '用心经营感情关系，增进彼此信任。' : 
                     isHealthRelated ? '重视身体健康，调整生活方式。' : 
                     isFinanceRelated ? '优化财务管理，关注投资机会。' : 
                     cardInfo[1].isReversed ? '要客观分析当前处境，避免主观臆断' : '积极应对，把握当下这个关键时期';
                     
  let summaryFuture = isWorkRelated ? '专注于职业发展，积极抓住事业机遇。' : 
                    isLoveRelated ? '继续投入感情，构建稳固的情感纽带。' : 
                    isHealthRelated ? '注重健康保养，形成良好习惯。' : 
                    isFinanceRelated ? '合理规划资金，寻找增值机会。' : 
                    cardInfo[2].isReversed ? '建议您做好Plan B的准备，保持灵活性' : '建议您积极行动，把握当前的机遇';

  const advice = `<div class="ai-section-title">综合建议</div><div class="ai-section-content"><strong>1. 总结过往</strong><br>结合${cardInfo[0].chinese}(${cardInfo[0].name})的经验，${summaryPast}<br><strong>2. 把握现在</strong><br>面对${cardInfo[1].chinese}(${cardInfo[1].name})的现状，${summaryPresent}。<br><strong>3. 展望未来</strong><br>根据${cardInfo[2].chinese}(${cardInfo[2].name})的提示，${summaryFuture}</div>`;
  
  return `<div class="ai-section">${currentSituation}</div><div class="ai-section">${challenge}</div><div class="ai-section">${prediction}</div><div class="ai-section">${advice}</div>`;
}

async function handleDraw() {
  const q = questionInput.value.trim();
  
  if (!q) {
    alert('请输入您想占卜的问题');
    return;
  }
  
  drawButton.disabled = true;
  drawButton.textContent = '正在抽取塔罗牌...';
    cardsContainer.innerHTML = '';
    aiContainer.innerHTML = '';
  
  try {
    const drew = drawCards(3);
    currentCards = drew.map(c => ({ card: c, orientation: getRandomOrientation() }));
    
    cardsContainer.innerHTML = '';
    currentCards.forEach(cd => {
      const el = document.createElement('div');
      el.className = 'tarot-card';
      el.innerHTML = `<img src="${cd.card.image}" alt="${cd.card.name}" class="card-image"><h3 class="card-title">${cd.card.name} <br><span style="font-size: 0.9rem; color: #666;">${cd.card.chinese}</span></h3><p class="card-orientation">${cd.orientation === '正位' ? '☀️ 正位' : '🌙 逆位'}</p><p class="card-meaning">${getCardMeaning(cd.card, cd.orientation)}</p>`;
      cardsContainer.appendChild(el);
    });
    
    const ai = await callAIForInterpretation(currentCards, q);
    
    const aiCard = document.createElement('div');
    aiCard.className = 'tarot-card ai-card';
    aiCard.innerHTML = `<h2 class="card-title">🔮 塔罗占卜师</h2><div class="ai-content">${ai}</div>`;
    aiContainer.appendChild(aiCard);
    
  } catch (e) {
    console.error(e);
    cardsContainer.innerHTML = '<p class="error">抽牌过程中出现错误。</p>';
  } finally {
    drawButton.disabled = false;
    drawButton.textContent = '抽取塔罗牌';
  }
}

drawButton.addEventListener('click', handleDraw);

questionInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    handleDraw();
  }
});
