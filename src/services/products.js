const productNamesPtBr = {
  'cv-linen-m-001': 'Camisa Linho Costa',
  'cv-linen-m-002': 'Calça Linho Areia Ajustável',
  'cv-linen-m-003': 'Blazer Linho Marfim Refúgio',
  'cv-linen-m-004': 'Sobrecamisa Linho Pedra',
  'cv-linen-m-005': 'Polo Linho Sal do Mar',
  'cv-travel-m-001': 'Conjunto Viagem Conforto',
  'cv-travel-m-002': 'Jaqueta Trânsito Costeiro',
  'cv-travel-m-003': 'Calça Aeroporto Leve',
  'cv-travel-m-004': 'Polo Tricot Fim de Semana',
  'cv-travel-m-005': 'Sobrecamisa Utilitária Duna',
  'cv-beach-m-001': 'Shorts Brisa de Praia',
  'cv-beach-m-002': 'Shorts de Banho Costa',
  'cv-beach-m-003': 'Camisa Praia Algodão Areia',
  'cv-beach-m-004': 'Polo Atoalhado Refúgio',
  'cv-beach-m-005': 'Calça Praia Sal do Mar',
  'cv-linen-f-001': 'Vestido Linho Refúgio Fluido',
  'cv-linen-f-002': 'Blazer Linho Transpassado Marfim',
  'cv-linen-f-003': 'Calça Linho Pantalona Areia',
  'cv-linen-f-004': 'Camisa Linho Aveia Minimalista',
  'cv-linen-f-005': 'Saia Midi Linho Costa',
  'cv-travel-f-001': 'Conjunto Viagem Suave',
  'cv-travel-f-002': 'Vestido Transpassado Urbano',
  'cv-travel-f-003': 'Pantalona Aeroporto Fluida',
  'cv-travel-f-004': 'Jaqueta Leve Costa',
  'cv-travel-f-005': 'Vestido Camisa Fim de Semana',
  'cv-beach-f-001': 'Maiô Musa de Praia',
  'cv-beach-f-002': 'Saída Véu de Praia',
  'cv-beach-f-003': 'Biquíni Costa de Verão',
  'cv-beach-f-004': 'Vestido Brisa de Praia',
  'cv-beach-f-005': 'Túnica Crochê Sal do Mar',
};

export function getProductNamePtBr(product) {
  return productNamesPtBr[product.id] || product.name;
}

function withPtBrName(product) {
  return {
    ...product,
    name: getProductNamePtBr(product),
  };
}

export async function getProducts(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });

  const query = params.toString();
  const response = await fetch(`/api/products${query ? `?${query}` : ''}`);

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  const products = await response.json();
  return products.map(withPtBrName);
}

export async function getProduct(id) {
  const response = await fetch(`/api/products/${id}`);

  if (!response.ok) {
    throw new Error('Product not found');
  }

  const product = await response.json();
  return withPtBrName(product);
}
