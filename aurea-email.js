/* ============================================================
   AUREA-EMAIL.JS — Integração com EmailJS (versão corrigida)
   ============================================================

   ── PREENCHA APENAS ESTAS 4 LINHAS ────────────────────────
   Acesse https://www.emailjs.com para obter as credenciais.
   ────────────────────────────────────────────────────────── */

const EMAILJS_CONFIG = {
  PUBLIC_KEY:  'rH9TXg2pIulx_MZsy',       // Account → General → Public Key
  SERVICE_ID:  'service_8fmv3el',       // Email Services → seu serviço
  TEMPLATE_ID: 'template_uqoghv9',      // Email Templates → seu template
  STORE_EMAIL: 'aacontavendida@gmail.com',  // E-mail que receberá os pedidos
};

/* ────────────────────────────────────────────────────────────
   CORREÇÃO 1: dados de entrega são capturados e salvos no
   momento que o usuário clica em "Continuar" no step 1,
   não depois — assim garantimos que os valores existem.
   ─────────────────────────────────────────────────────────── */
let _savedDelivery = null;
let _savedPayment  = null;

/** Chamada ao clicar em "Continuar" no step 1 do checkout. */
function saveDeliverySnapshot() {
  const inputs = document.querySelectorAll('#checkoutPanel1 input');
  _savedDelivery = {
    nome:        inputs[0]?.value?.trim() || 'Não informado',
    email:       inputs[1]?.value?.trim() || 'Não informado',
    cep:         inputs[2]?.value?.trim() || 'Não informado',
    telefone:    inputs[3]?.value?.trim() || 'Não informado',
    endereco:    inputs[4]?.value?.trim() || 'Não informado',
    numero:      inputs[5]?.value?.trim() || 'S/N',
    complemento: inputs[6]?.value?.trim() || '',
    bairro:      inputs[7]?.value?.trim() || 'Não informado',
    cidade:      inputs[8]?.value?.trim() || 'Não informado',
  };
}

/** Chamada ao clicar em "Revisar pedido" no step 2 do checkout. */
function savePaymentSnapshot() {
  const selected = document.querySelector('.payment-opt.active input');
  const map = { pix: 'PIX (5% de desconto)', card: 'Cartão de Crédito', boleto: 'Boleto Bancário' };
  _savedPayment = map[selected?.value] || 'Não informado';
}

/* ────────────────────────────────────────────────────────────
   CORREÇÃO 2: itens do pedido como texto puro.
   O EmailJS escapa HTML nas variáveis por padrão —
   usar string formatada resolve o problema de renderização.
   ─────────────────────────────────────────────────────────── */
function buildItemsText(cartItems) {
  const fmtBRL = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return cartItems.map((item, idx) =>
    `${idx + 1}. ${item.brand} — ${item.name}\n` +
    `   Tamanho: ${item.size}${item.color ? ' | Cor: ' + item.color : ''} | Qtd: ${item.qty}\n` +
    `   Subtotal: ${fmtBRL(item.price * item.qty)}`
  ).join('\n\n');
}

/* ────────────────────────────────────────────────────────────
   Inicializa o SDK do EmailJS.
   ─────────────────────────────────────────────────────────── */
function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('[Áurea Email] SDK do EmailJS não carregado. Verifique o <script> no HTML.');
    return;
  }
  emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
  console.log('%c[Áurea Email] EmailJS inicializado ✓', 'color:#c9a84c');
}

/* ────────────────────────────────────────────────────────────
   Função principal de envio — chamada por checkoutNext(3).
   ─────────────────────────────────────────────────────────── */
async function sendOrderEmail(orderNumber, cartSnapshot, total) {
  if (typeof emailjs === 'undefined') {
    console.warn('[Áurea Email] EmailJS não disponível.');
    return;
  }

  const delivery = _savedDelivery || {};
  const payment  = _savedPayment  || 'Não informado';
  const fmtBRL   = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const now      = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

  const enderecoCompleto = [
    delivery.endereco,
    delivery.numero,
    delivery.complemento,
    delivery.bairro,
    delivery.cidade,
    delivery.cep ? `CEP ${delivery.cep}` : '',
  ].filter(Boolean).join(', ');

  const templateParams = {
    to_email:         EMAILJS_CONFIG.STORE_EMAIL,
    reply_to:         delivery.email || '',

    order_number:     String(orderNumber),
    order_date:       now,
    order_total:      fmtBRL(total),
    items_count:      String(cartSnapshot.reduce((s, i) => s + i.qty, 0)),
    payment_method:   payment,

    customer_name:    delivery.nome     || 'Não informado',
    customer_email:   delivery.email    || 'Não informado',
    customer_phone:   delivery.telefone || 'Não informado',
    delivery_address: enderecoCompleto  || 'Não informado',

    // Texto puro dos itens (sem HTML)
    order_items:      buildItemsText(cartSnapshot),
  };

  console.log('[Áurea Email] Enviando pedido #' + orderNumber + '…', templateParams);

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    console.log('%c[Áurea Email] E-mail enviado ✓ Status: ' + response.status, 'color:#2ecc71');
  } catch (err) {
    console.error('[Áurea Email] Erro ao enviar:', err);
  }
}
