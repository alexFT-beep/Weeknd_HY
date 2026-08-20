/**
 * Infrastructure Data Source: fullMenuData
 * Complete catalog digitized from CARTA WEEKEND (16 Pages)
 * Location: Av. Cabo Alberto Reyes #140 | WhatsApp: 961 336 674
 */

export const MENU_CATEGORIES = [
  { id: "alitas", name: "Alitas & Barcos", icon: "lunch_dining", description: "Festín de Sabores: 31 salsas artesanales, grandes Barcos y Rondas de Alitas" },
  { id: "hamburguesas", name: "Hamburguesas", icon: "local_pizza", description: "Hamburguesas con carne artesanal a la parrilla, filete de pollo y adiciones" },
  { id: "broaster-salchipapas", name: "Broaster & Salchipapas", icon: "fastfood", description: "Pollo broaster crocante, contundentes mostritos y salchipapas Weekend" },
  { id: "parrillas-piqueos", name: "Parrillas & Piqueos", icon: "outdoor_grill", description: "Cortes a la brasa, anticuchos, combos parrilleros, brochetas, tequeños y nuggets" },
  { id: "a-la-carta-chifa", name: "A la Carta, Chifa & Pastas", icon: "restaurant", description: "Chaufas, aeropuertos al wok, lomos saltados, Barrio Chino y fetuccinis" },
  { id: "makis-ensaladas", name: "Makis & Ensaladas", icon: "set_meal", description: "Makis nikkei y ensaladas frescas Weekend" },
  { id: "bebidas-jugos", name: "Jugos & Bebidas", icon: "local_cafe", description: "Smoothies 100% natural, Bubble Tea, jugos de fruta, frappes, milkshakes y jarras" },
  { id: "cocteles-licores", name: "Coctelería & Licores", icon: "cocktail", description: "Chilcanos, Sours, Mojitos, Tragos de Autor, botellas con complementos y cervezas" },
  { id: "guarniciones", name: "Guarniciones & Extras", icon: "bakery_dining", description: "Porciones adicionales de papas, arroz, ensaladas y complementos" },
  { id: "pago", name: "Escanea y Paga", icon: "qr_code_2", description: "Información de pagos digitales mediante Yape y Plin, ubicación y contacto" }
];

export const DELIVERY_ZONES = [
  { id: 'casco-urbano', name: 'Casco Urbano', fee: 2.00 },
  { id: 'santo-domingo', name: 'Santo Domingo Centro', fee: 4.00 },
  { id: 'la-victoria', name: 'La Victoria Centro', fee: 4.00 },
  { id: 'buena-villa', name: 'Buena Villa (Centro)', fee: 8.00 },
  { id: 'puerto-huarmey', name: 'Puerto Huarmey', fee: 10.00 },
  { id: '9-de-octubre', name: '9 de Octubre', fee: 10.00 }
];

export const PACKAGING_OPTIONS = [
  { id: 'tupper', name: 'Tupper Descartable', price: 1.00, defaultQty: 1 },
  { id: 'bolsa', name: 'Bolsa Biodegradable', price: 1.00, defaultQty: 1 },
  { id: 'vaso', name: 'Vaso Biodegradable', price: 1.00, defaultQty: 1 }
];

export const FULL_MENU_ITEMS = [
  // =================== PÁGINA 3: EL BRAVO D' CASA...! ALITAS - FESTÍN DE SABORES ===================
  // --- Bloque S/ 25.00 (08 unidades + papa + ensalada) ---
  { id: 'ali-01', name: 'Alitas Crocantes', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-02', name: 'Alitas BBQ', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-03', name: 'Alitas Búfalo', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-04', name: 'Alitas Acevichadas', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada', badge: 'FAVORITO' },
  { id: 'ali-05', name: 'Alitas Anticucheras', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-06', name: 'Alitas en Salsa Maracuyá', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-07', name: 'Alitas en Salsa Teriyaki', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-08', name: 'Alitas en Salsa Honey Mustand', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-09', name: 'Alitas al Olivo', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-10', name: 'Alitas en Salsa Guacamole', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-11', name: 'Alitas Mango Habanero', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-12', name: 'Alitas Coreanas', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-13', name: 'Alitas en Salsa Mango Picante', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-14', name: 'Alitas en Salsa Alfredo', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-15', name: 'Alitas en Salsa de Piña', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-16', name: 'Alitas Pachamanqueras', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-17', name: 'Alitas Chimichurri Ahumado', price: 25, category: 'alitas', description: '08 unidades + papa + ensalada' },

  // --- Bloque S/ 27.00 (08 unidades + papa + ensalada) ---
  { id: 'ali-18', name: 'Alitas en Salsa Napolitana', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-19', name: 'Alitas en Salsa Vino Tinto', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-20', name: 'Alitas 04 Quesos', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-21', name: 'Alitas en Salsa de Arándanos', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-22', name: 'Alitas en Salsa Frutos Rojos', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-23', name: 'Alitas en Salsa Fresa', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-24', name: 'Alitas en Salsa Fresa Hot', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-25', name: 'Alitas Weekend Especial', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada', badge: 'RECOMENDADO' },
  { id: 'ali-26', name: 'Alitas en Salsa Mediterránea Pizza Hut', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-27', name: 'Alitas en Salsa de Ajo y Queso Parmesano', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-28', name: 'Alitas en Salsa de Durazno', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-29', name: 'Alitas en Salsa Ranch', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-30', name: 'Alitas en Salsa Maracumango', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },
  { id: 'ali-31', name: 'Alitas en Salsa Naranja', price: 27, category: 'alitas', description: '08 unidades + papa + ensalada' },

  // =================== PÁGINA 5: RONDA DE ALITAS & BARCOS WEEKEND ===================
  {
    id: 'combo-duo',
    name: 'Dúo de Alitas',
    price: 40,
    category: 'alitas', subcategory: 'barcos',
    description: '02 sabores a elegir • (12 alitas + papa + ensalada)',
    badge: 'PARA 2 PERSONAS',
    isFeatured: true
  },
  {
    id: 'combo-trio',
    name: 'Trío de Alitas',
    price: 65,
    category: 'alitas', subcategory: 'barcos',
    description: '03 sabores a elegir (03 personas) • (18 alitas + papa + ensalada)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD98olyC9a0vS55Shucpnd1WjVgb_PLOzUx7jvlJew1D17vPOQsypxopKzNs2j9YlGELKldT8nbpB9K98pmpLD_1SwPZfyrAMrgzolZXEiJTVnJjLE_rKhKD8taZ9sHLLb8hjYiymBJ9QMofYjrjj3MRoiTAXrR0TIQbH1Ic8CESV9NB7N8hzcB5O8th77yRR2Nqo2Luq8KXRDvL1N29kL_L0GXm-zOMxs1rEySTSjrprtQgHdWHjew8ogFYTHRw6I',
    badge: 'MÁS PEDIDO',
    isFeatured: true
  },
  {
    id: 'combo-ruleta',
    name: 'Ruleta Weekend',
    price: 80,
    category: 'alitas', subcategory: 'barcos',
    description: '04 sabores a elegir • (20 alitas + papa + ensalada)',
    badge: 'BARCO WEEKEND',
    isFeatured: true
  },
  {
    id: 'combo-carrusel',
    name: 'Carrusel Weekend',
    price: 85,
    category: 'alitas', subcategory: 'barcos',
    description: '04 sabores a elegir • (24 alitas + papa + ensalada)',
    badge: 'BARCO WEEKEND',
    isFeatured: true
  },
  {
    id: 'combo-ronda',
    name: 'Ronda Festival D\' Sabores',
    price: 108,
    category: 'alitas', subcategory: 'barcos',
    description: '05 sabores a elegir (05 personas) • (30 alitas + papa + ensalada)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkqAGNeZzQnp4pQYbTE0YERjotTiEYFK79vWbfnBic9xBAe1gQnyvkUGNcJuSvHjNVw7RbSHrkYhjmWDlYOdMMNyg6CdfBuEewV6Jrt-wCapEMhcuIBEC1FwQjNtMA3EEPCIH-l0zt6hCesXKw5piQqDMSyDZzkFbZ4nPgMcqoJBXx6HmuUIzbQ8QvA0vZzZ3r-8G3s11om_EOLhyjX4mP9OzIClkDXgEHfFSrCktu9qUD70YPWttBwQG7xUloR76F',
    badge: 'MEGA FESTIVAL',
    isFeatured: true
  },
  {
    id: 'salsa-extra',
    name: 'Salsa Aparte (Pote)',
    price: 6,
    category: 'alitas', subcategory: 'barcos',
    description: 'Pote adicional de cualquier salsa a elección de nuestra carta'
  },

  // =================== PÁGINA 4: HAMBURGUESAS & ADICIONALES ===================
  { id: 'burg-01', name: 'La Clásica', price: 15, category: 'hamburguesas', description: 'Carne artesanal + papas fritas + ensalada' },
  { id: 'burg-02', name: 'La Pechugona', price: 15, category: 'hamburguesas', description: 'Filete de pollo + papas fritas + ensalada' },
  { id: 'burg-03', name: 'Cheese Burger', price: 18, category: 'hamburguesas', description: 'Pollo crispy + queso + papas fritas + ensalada' },
  { id: 'burg-04', name: 'La Carretillera', price: 18, category: 'hamburguesas', description: 'Pollo deshilachado + queso + jamón + papas fritas + ensalada' },
  { id: 'burg-05', name: 'La Gaucha', price: 20, category: 'hamburguesas', description: 'Carne artesanal + queso + chorizo + chimichurri + papas fritas + ensalada' },
  { id: 'burg-06', name: 'La Tropical', price: 23, category: 'hamburguesas', description: 'Carne artesanal + piña + queso + tocino + papas fritas + ensalada' },
  { id: 'burg-07', name: 'La Royal Weekend', price: 25, category: 'hamburguesas', description: 'Carne molida + huevo + queso edams + jamón + tocino + papas fritas + ensalada' },
  { id: 'burg-08', name: 'Weekend Poderosa', price: 28, category: 'hamburguesas', description: 'Doble carne artesanal + huevo + doble queso + chorizo + tocino + papas fritas + ensalada', badge: 'CONTUNDENTE' },
  { id: 'burg-09', name: 'Warmi Burguer', price: 28, category: 'hamburguesas', description: 'Doble carne artesanal + doble queso mantecoso + tocino + chimichurri + papas fritas + ensalada', badge: 'FAVORITO' },
  // Adicionales Hamburguesas
  { id: 'adic-burg-01', name: 'Adicional: Huevo', price: 2.5, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-02', name: 'Adicional: Queso Edams', price: 3.0, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-03', name: 'Adicional: Queso Cheddar', price: 4.0, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-04', name: 'Adicional: Chorizo', price: 4.0, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-05', name: 'Adicional: Tocino', price: 5.0, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-06', name: 'Adicional: Salsa 04 Quesos', price: 6.0, category: 'hamburguesas', description: 'Adición para tu hamburguesa' },
  { id: 'adic-burg-07', name: 'Adicional: Porción de Papas al Hilo', price: 5.0, category: 'hamburguesas', description: 'Porción de papas al hilo' },

  // =================== PÁGINA 4: BROASTER SABROSOS & AGREGADOS ===================
  { id: 'broas-01', name: 'Broaster D\' Pecho / Pierna', price: 26, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz + papas fritas + ensalada' },
  { id: 'broas-02', name: 'Broaster D\' Pierna Deshuesada', price: 28, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz + papas fritas + ensalada' },
  { id: 'broas-03', name: 'Salchi Broaster Pierna / Pecho', price: 30, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz + papas fritas + hotdog + ensalada' },
  { id: 'broas-04', name: 'Salchibroaster Pierna Deshuesada', price: 32, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz + papas fritas + hotdog + ensalada' },
  { id: 'broas-05', name: 'Mostrito Broaster Pecho / Pierna', price: 32, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz chaufa + papas fritas + ensalada', badge: 'POPULAR' },
  { id: 'broas-06', name: 'Mostrito Broaster Pierna Deshuesada', price: 33, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Arroz chaufa + papas fritas + ensalada', badge: 'RECOMENDADO' },
  // Agregados Broaster
  { id: 'agr-broas-01', name: 'Agregado: Huevo', price: 2.5, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Huevo frito montado' },
  { id: 'agr-broas-02', name: 'Agregado: Plátano', price: 3.0, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Plátano frito' },
  { id: 'agr-broas-03', name: 'Agregado: Hotdog', price: 6.0, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Porción de hotdog' },
  { id: 'agr-broas-04', name: 'Agregado: Chorizo', price: 4.0, category: 'broaster-salchipapas', subcategory: 'broaster', description: 'Chorizo parrillero artesanal' },

  // =================== PÁGINA 5: SALCHIPAPAS WEEKEND ===================
  { id: 'salch-01', name: 'La Simplecita', price: 16, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog' },
  { id: 'salch-02', name: 'La Ranchera', price: 18, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + chorizo' },
  { id: 'salch-03', name: 'La Royal Weekend', price: 25, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + chorizo + huevo + queso edams' },
  { id: 'salch-04', name: 'La Salchi Nuggets', price: 25, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + nuggets' },
  { id: 'salch-05', name: 'La Salchi Warmi', price: 25, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + chorizo + salsa 04 quesos' },
  { id: 'salch-06', name: 'La A lo Pobre', price: 25, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + chorizo + huevo + plátano' },
  { id: 'salch-07', name: 'La Especial Weekend', price: 28, category: 'broaster-salchipapas', subcategory: 'salchipapas', description: 'Papas fritas + hotdog + chorizo + 04 quesos + tiras de pollo', badge: 'ESPECIAL' },

  // =================== PÁGINA 6: PARRILLAS WEEKEND, COMBOS & MEGA COMBO ===================
  { id: 'parr-01', name: 'Pollo a la Parrilla 1/4', price: 27, category: 'parrillas-piqueos', subcategory: 'parrillas', description: '1/4 de Pollo + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-02', name: 'Carne a la Parrilla (Lomo Fino)', price: 40, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Lomo fino tierno + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-03', name: 'Cerdo a la Parrilla (250gr)', price: 28, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Corte de cerdo 250gr + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-04', name: 'Churrasco a la Parrilla (250gr)', price: 30, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Churrasco 250gr + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-05', name: 'Molleja a la Parrilla', price: 25, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Mollejas marinadas + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-06', name: 'Anticuchos D\' Corazón', price: 20, category: 'parrillas-piqueos', subcategory: 'parrillas', description: '03 palitos + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-07', name: 'Anticuchos D\' Corazón + Rachi + Mollejas', price: 28, category: 'parrillas-piqueos', subcategory: 'parrillas', description: '02 palitos + rachi + mollejas + choclo + papas fritas / sancochadas + ensalada' },
  { id: 'parr-08', name: 'Rachi + Molleja', price: 25, category: 'parrillas-piqueos', subcategory: 'parrillas', description: '01 porción c/u + choclo + papas fritas / sancochadas + ensalada' },
  // Combos Parrilleros
  { id: 'comb-parr-01', name: 'Combo Weekend 01', price: 40, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Pollo 1/4 + mollejas + papas fritas / sancochadas + choclo + ensalada' },
  { id: 'comb-parr-02', name: 'Combo Weekend 02', price: 45, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Pollo 1/4 + rachi + chorizo + papas fritas / sancochadas + choclo + ensalada' },
  { id: 'comb-parr-03', name: 'Combo Weekend 03', price: 48, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Pollo 1/4 + rachi / molleja + 02 anticuchos d\' corazón + papas fritas / sancochadas + choclo + ensalada' },
  { id: 'comb-parr-04', name: 'Combo Weekend 04', price: 69, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Pollo 1/4 + cerdo (250gr) + mollejas + 02 anticuchos d\' corazón + papas fritas / sancochadas + ensalada' },
  { id: 'comb-parr-05', name: 'Combo Weekend 05', price: 95, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Pollo 1/4 + cerdo + carne (lomo fino) + mollejas + 02 chorizos + papas fritas / sancochadas + ensalada', badge: 'PREMIUM' },
  { id: 'comb-parr-mega', name: 'Mega Combo Weekend', price: 199, category: 'parrillas-piqueos', subcategory: 'parrillas', description: '1/4 Pollo (pecho) + 1/4 Pollo (pierna) + 02 cortes de cerdo + 01 corte carne (lomo fino) + 03 chorizos parrilleros + 03 anticuchos d\' corazón + 01 porción rachi + 02 porción molleja + 02 porciones papas fritas + 01 porción ensalada', badge: 'MEGA FAMILIAR', isFeatured: true },
  // Agregados Parrillas
  { id: 'agr-parr-01', name: 'Agregado Parrilla: Huevo', price: 2.5, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Huevo montado' },
  { id: 'agr-parr-02', name: 'Agregado Parrilla: Plátano', price: 3.0, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Plátano frito' },
  { id: 'agr-parr-03', name: 'Agregado Parrilla: Hotdog', price: 6.0, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Porción de hotdog' },
  { id: 'agr-parr-04', name: 'Agregado Parrilla: Chorizo', price: 4.0, category: 'parrillas-piqueos', subcategory: 'parrillas', description: 'Chorizo parrillero' },

  // =================== PÁGINA 7: PIQUEOS (BROCHETAS, TEQUEÑOS, NUGGETS) ===================
  // Brochetas
  { id: 'broch-01', name: 'Brochetas D\' Pollo', price: 26, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '03 palitos + papas fritas / sancochadas + ensalada' },
  { id: 'broch-02', name: 'Brochetas D\' Carne (Lomo Fino)', price: 35, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '03 palitos + papas fritas / sancochadas + ensalada' },
  { id: 'broch-03', name: 'Brochetas Weekend', price: 37, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '03 palitos D\' Pollo / Carne + papas fritas / sancochadas + ensalada' },
  { id: 'broch-04', name: 'Brochetas D\' Cerdo al Chimichurri', price: 30, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '03 palitos + papas fritas / sancochadas + ensalada + chimichurri' },
  { id: 'broch-05', name: 'Brochetas Weekend Especial', price: 40, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '03 palitos D\' Pollo / Carne / Cerdo + papas fritas / sancochadas + ensalada + chimichurri', badge: 'MIXTO' },
  // Tequeños (10 unidades)
  { id: 'teq-01', name: 'Tequeños D\' Queso (10 Und)', price: 15, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades crocantes rellenas de queso' },
  { id: 'teq-02', name: 'Tequeños D\' Jamón y Queso (10 Und)', price: 17, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades rellenas de jamón y queso' },
  { id: 'teq-03', name: 'Tequeños D\' Burger (10 Und)', price: 18, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades rellenas de carne artesanal y queso' },
  { id: 'teq-04', name: 'Tequeños D\' Chorizo (10 Und)', price: 20, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades rellenas de chorizo parrillero' },
  { id: 'teq-05', name: 'Tequeños D\' Lomo Saltado (10 Und)', price: 25, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades rellenas de jugoso lomo saltado' },
  { id: 'teq-06', name: 'Tequeños D\' Pollo Crispy + Queso (10 Und)', price: 25, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades rellenas de pollo crispy y queso fundido' },
  // Nuggets
  { id: 'nug-01', name: 'Nuggets One', price: 17, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '06 unidades + papas fritas' },
  { id: 'nug-02', name: 'Nuggets Two', price: 27, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '12 unidades + papas fritas' },
  { id: 'nug-03', name: 'Nuggets Three', price: 29, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades + papas fritas + chorizo' },
  { id: 'nug-04', name: 'Nuggets Four', price: 30, category: 'parrillas-piqueos', subcategory: 'piqueos', description: '10 unidades + papas fritas + salsa 04 quesos' },

  // =================== PÁGINA 8: WEEKEND A LA CARTA ===================
  { id: 'cart-01', name: 'Arroz a la Cubana', price: 18, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Arroz graneado, huevos fritos montados y plátanos fritos' },
  { id: 'cart-02', name: 'Chaufa D\' Pollo', price: 25, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Arroz chaufa al wok con trozos de pollo' },
  { id: 'cart-03', name: 'Chaufa D\' Chancho', price: 25, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Arroz chaufa al wok con chancho asado' },
  { id: 'cart-04', name: 'Chaufa D\' Carne (Lomo Fino)', price: 33, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Arroz chaufa al wok con lomo fino tierno' },
  { id: 'cart-05', name: 'Chaufa D\' Langostinos', price: 33, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Arroz chaufa al wok con langostinos' },
  { id: 'cart-06', name: 'Aeropuerto D\' Pollo', price: 27, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Chaufa con fideos salteados, frejolito chino y pollo' },
  { id: 'cart-07', name: 'Aeropuerto D\' Chancho', price: 27, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Chaufa con fideos salteados, frejolito chino y chancho ahumado' },
  { id: 'cart-08', name: 'Aeropuerto D\' Carne (Lomo Fino)', price: 34, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Chaufa con fideos salteados y lomo fino' },
  { id: 'cart-09', name: 'Aeropuerto D\' Langostinos', price: 34, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Chaufa con fideos salteados y langostinos' },
  { id: 'cart-10', name: 'Chaufa Especial Weekend', price: 40, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Pollo, chancho, carne y langostinos al wok', badge: 'ESPECIAL' },
  { id: 'cart-11', name: 'Aeropuerto Especial Weekend', price: 40, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Pollo, chancho, carne y langostinos con fideos salteados', badge: 'ESPECIAL' },
  { id: 'cart-12', name: 'Pollo Saltado', price: 28, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Pollo en cubos salteado al wok con cebolla, tomate, ají y papas' },
  { id: 'cart-13', name: 'Lomo Fino Saltado', price: 40, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Clásico lomo fino salteado al wok con cebolla, tomate, ají y papas', badge: 'CLÁSICO' },
  { id: 'cart-14', name: 'Milanesa', price: 28, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Pechuga de pollo apanada crocante + arroz + papas + ensalada' },
  { id: 'cart-15', name: 'Pollo a la Plancha', price: 28, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Filete de pollo tierno y dorado + arroz + papas + ensalada' },
  { id: 'cart-16', name: 'Pollo Frito', price: 28, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Presa de pollo frito dorado + arroz + papas + ensalada' },
  { id: 'cart-17', name: 'Chuleta Ahumada', price: 28, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Chuleta de cerdo ahumada y jugosa + arroz + papas + ensalada' },
  { id: 'cart-18', name: 'Bisteck (Lomo Fino)', price: 40, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Jugoso bisteck de lomo fino a la plancha con guarnición' },
  { id: 'cart-19', name: 'Alitas + Chaufa', price: 35, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: '05 unidades + papas + chaufa + 01 salsa a elegir', badge: 'COMBINADO' },
  { id: 'cart-20', name: 'Churrasco Ahumado', price: 30, category: 'a-la-carta-chifa', subcategory: 'a-la-carta', description: 'Corte de churrasco ahumado + arroz + papas + ensalada' },

  // =================== PÁGINA 8: BARRIO CHINO WEEKEND ===================
  { id: 'chif-01', name: 'Tallarín c/ Pollo', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Tallarines salteados al wok con pollo y verduras chifa' },
  { id: 'chif-02', name: 'Tallarín c/ Carne (Lomo Fino)', price: 33, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Tallarines salteados al wok con lomo fino y verduras' },
  { id: 'chif-03', name: 'Tallarín c/ Langostinos', price: 33, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Tallarines salteados al wok con langostinos frescos' },
  { id: 'chif-04', name: 'Pollo c/ Verduras', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Filete de pollo salteado con variedad de verduras chifa' },
  { id: 'chif-05', name: 'Pollo Chi Jau Kay (Salado)', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Pollo empanizado bañado en salsa tradicional de ostión y sillao' },
  { id: 'chif-06', name: 'Pollo Tipakay (Agridulce)', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Pollo crocante bañado en salsa agridulce tamarindo' },
  { id: 'chif-07', name: 'Pollo Siu Pei con Piña y Durazno (Agridulce)', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Pollo estilo Siu Pei glaseado en salsa agridulce con piña y durazno', badge: 'ESPECIALIDAD' },
  { id: 'chif-08', name: 'Pollo con Piña (Agridulce)', price: 28, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Pollo en salsa agridulce con trozos de piña dorada' },
  { id: 'chif-09', name: 'Kam Lu Wantan', price: 30, category: 'a-la-carta-chifa', subcategory: 'barrio-chino', description: 'Wantanes crocantes coronados con carnes mixtas en salsa agridulce', badge: 'RECOMENDADO' },

  // =================== PÁGINA 9: PASTAS & ACOMPAÑAMIENTOS ===================
  { id: 'past-01', name: 'Tallarín Saltado Criollo D\' Pollo', price: 25, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Tallarines salteados al wok con pollo, cebolla, tomate y ají amarillo' },
  { id: 'past-02', name: 'Tallarín Saltado Criollo D\' Carne (Lomo Fino)', price: 35, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Tallarines salteados al wok con tierno lomo fino de res' },
  { id: 'past-03', name: 'Fetuccini a la Huancaína', price: 22, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Fetuccini en cremosa salsa huancaína tradicional' },
  { id: 'past-04', name: 'Fetuccini a la Bolognesa', price: 25, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Fetuccini con salsa de carne molida, tomate natural y especias' },
  { id: 'past-05', name: 'Fetuccini a la Alfredo (Jamón Inglés)', price: 28, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Fetuccini bañado en crema de leche, mantequilla y jamón inglés' },
  { id: 'past-06', name: 'Fetuccini en Salsa 04 Quesos c/ Tocino', price: 28, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Combinación de 04 quesos exquisitos con tocino crocante' },
  { id: 'past-07', name: 'Fetuccini c/ Langostinos en Salsa Alfredo', price: 35, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Fetuccini bañado en crema alfredo con langostinos salteados', badge: 'DEL MAR' },
  // Acompaña tus Pastas
  { id: 'acomp-01', name: 'Acompaña: Milanesa', price: 15, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Porción individual para complementar tus pastas' },
  { id: 'acomp-02', name: 'Acompaña: Chuleta', price: 15, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Porción individual de chuleta dorada' },
  { id: 'acomp-03', name: 'Acompaña: Nuggets (05 unidades)', price: 12, category: 'a-la-carta-chifa', subcategory: 'pastas', description: '5 Nuggets crocantes' },
  { id: 'acomp-04', name: 'Acompaña: Lomo Fino Saltado (Porción)', price: 20, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Porción jugosa de lomo fino saltado' },
  { id: 'acomp-05', name: 'Acompaña: Bisteck (Lomo Fino)', price: 20, category: 'a-la-carta-chifa', subcategory: 'pastas', description: 'Filete de bisteck de lomo fino a la plancha' },

  // =================== PÁGINA 9: MAKIS & ENSALADAS WEEKEND ===================
  // Makis
  { id: 'maki-01', name: 'Makis Acevichadas', price: 25, category: 'makis-ensaladas', description: 'Relleno de langostino furai y palta, cubierto con salsa acevichada' },
  { id: 'maki-02', name: 'Makis Crispy', price: 25, category: 'makis-ensaladas', description: 'Empanizado crocante por fuera con salsa tare' },
  { id: 'maki-03', name: 'Makis Lomo Saltado', price: 28, category: 'makis-ensaladas', description: 'Fusión nikkei coronado con jugoso lomo saltado' },
  { id: 'maki-04', name: 'Makis en Salsa Agridulce', price: 25, category: 'makis-ensaladas', description: 'Makis glaseados con salsa agridulce especial' },
  // Ensaladas
  { id: 'ens-01', name: 'Ensalada D\' Fruta', price: 18, category: 'makis-ensaladas', description: 'Variedad de frutas frescas de estación' },
  { id: 'ens-02', name: 'Ensalada D\' Pollo', price: 25, category: 'makis-ensaladas', description: 'Pechuga de pollo, lechuga, verduras y aderezo especial' },
  { id: 'ens-03', name: 'Ensalada D\' Atún', price: 25, category: 'makis-ensaladas', description: 'Lomo de atún con vegetales frescos y vinagreta' },

  // =================== PÁGINA 10: SMOOTHIES 100% NATURAL, BUBBLE TEA & TOPPINGS ===================
  // Smoothies
  { id: 'smt-01', name: 'Smoothies D\' Arándanos', price: 16, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie 100% natural de arándanos' },
  { id: 'smt-02', name: 'Smoothies D\' Mango', price: 16, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie 100% natural de mango maduro' },
  { id: 'smt-03', name: 'Smoothies D\' Piña Colada', price: 18, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie cremoso de piña y crema de coco' },
  { id: 'smt-04', name: 'Smoothies D\' Fresa', price: 15, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie 100% natural de fresa' },
  { id: 'smt-05', name: 'Smoothies D\' Maracuyá', price: 15, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie 100% natural refrescante de maracuyá' },
  { id: 'smt-06', name: 'Smoothies D\' Maracumango', price: 17, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Dúo tropical de maracuyá y mango frappé' },
  { id: 'smt-07', name: 'Smoothies D\' Plátano', price: 15, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Smoothie cremoso de plátano natural' },
  { id: 'smt-08', name: 'Smoothies D\' Matcha', price: 16, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Té verde matcha concentrado con hielo frappé' },
  { id: 'smt-09', name: 'Smoothies Tropical', price: 18, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Combinación frutal tropical 100% natural', badge: 'POPULAR' },
  // Bubble Tea
  { id: 'bub-01', name: 'Apple Green Tea', price: 16.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con manzana' },
  { id: 'bub-02', name: 'Tropical Tea', price: 20.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea con mezcla tropical de frutas', badge: 'ESPECIAL' },
  { id: 'bub-03', name: 'Strawberry Green Tea', price: 15.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde y fresas' },
  { id: 'bub-04', name: 'Uva Green Tea', price: 15.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde y uvas' },
  { id: 'bub-05', name: 'Litchy Tea', price: 15.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea exótico de litchy' },
  { id: 'bub-06', name: 'Maracuyá Green Tea', price: 15.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con maracuyá' },
  { id: 'bub-07', name: 'Mango Green Tea', price: 16.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con mango' },
  { id: 'bub-08', name: 'Arándonos Green Tea', price: 16.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con arándanos' },
  { id: 'bub-09', name: 'Duraznos Green Tea', price: 16.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con duraznos' },
  { id: 'bub-10', name: 'Frambuesas Green Tea', price: 15.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Bubble tea de té verde con frambuesas' },
  // Toppings
  { id: 'top-01', name: 'Topping: Popping Bobba', price: 3.5, category: 'bebidas-jugos', subcategory: 'smoothies-bubble-tea', description: 'Perlas explosivas de fruta para Frappes, Smoothies, Milkshake o Bubble Tea' },

  // =================== PÁGINA 11: JUGOS, FRAPPES 100% NATURAL & MILKSHAKES ===================
  // Jugos
  { id: 'jug-01', name: 'Jugo de Papaya', price: 12, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Papaya fresca licuada al momento' },
  { id: 'jug-02', name: 'Jugo de Piña', price: 13, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Piña golden dulce y refrescante' },
  { id: 'jug-03', name: 'Jugo de Fresa', price: 13, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Fresas naturales seleccionadas' },
  { id: 'jug-04', name: 'Jugo de Mango', price: 13, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mango tropical natural' },
  { id: 'jug-05', name: 'Jugo de Melón', price: 13, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Melón fresco y ligero' },
  { id: 'jug-06', name: 'Jugo Surtido', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mezcla vitamínica de papaya, piña y fresa' },
  { id: 'jug-07', name: 'Jugo Fresa c/ Piña', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Combinación fresca de fresa y piña natural' },
  { id: 'jug-08', name: 'Jugo Papaya c/ Piña', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Papaya y piña natural' },
  { id: 'jug-09', name: 'Jugo Papaya c/ Melón', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Papaya y melón fresco licuado' },
  { id: 'jug-10', name: 'Jugo Mango c/ Piña', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mango y piña tropical' },
  { id: 'jug-11', name: 'Jugo Mango c/ Fresa', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mango y fresas naturales' },
  { id: 'jug-12', name: 'Jugo Plátano c/ Leche', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Plátano maduro batido con leche fresca' },
  { id: 'jug-13', name: 'Jugo Papaya c/ Leche', price: 15, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Papaya natural batida con leche cremosa' },
  { id: 'jug-14', name: 'Jugo Mango c/ Leche', price: 17, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mango natural batido con leche' },
  { id: 'jug-15', name: 'Jugo Fresa c/ Leche', price: 17, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Fresas naturales con leche fresca' },
  { id: 'jug-16', name: 'Jugo de Arándanos', price: 16, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Puros arándanos frescos antioxidantes' },
  { id: 'jug-17', name: 'Jugo de Arándanos c/ Leche', price: 22, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Arándanos frescos batidos con leche' },
  { id: 'jug-18', name: 'Jugo Especial', price: 20, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Frutas mixtas, huevo, algarrobina, leche y cerveza negra', badge: 'ENERGÉTICO' },
  // Frappes 100% natural
  { id: 'frap-01', name: 'Frappe D\' Fresa', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Frappe 100% natural con fresas y crema chantilly' },
  { id: 'frap-02', name: 'Frappe D\' Chocolate', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Cacao selecto, café, hielo granizado y chantilly' },
  { id: 'frap-03', name: 'Frappe D\' Algarrobina', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Tradicional algarrobina piurana con leche y café' },
  { id: 'frap-04', name: 'Frappe D\' Arándonos', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Arándanos frescos batidos con hielo frappé' },
  { id: 'frap-05', name: 'Frappe D\' Moca', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Café expreso con chocolate y chantilly' },
  { id: 'frap-06', name: 'Frappe D\' Oreo', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Galletas oreo con crema batida' },
  { id: 'frap-07', name: 'Frappe D\' Vainilla', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Cremoso frappé con esencia de vainilla francesa' },
  { id: 'frap-08', name: 'Frappe D\' Mango', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Mango maduro tropical frappé' },
  { id: 'frap-09', name: 'Frappe D\' Durazno', price: 15.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Duraznos naturales batidos frappé' },
  { id: 'frap-10', name: 'Frappe D\' Maracumango', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Dúo exclusivo de maracuyá y mango' },
  { id: 'frap-11', name: 'Frappe D\' Matcha', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Té verde matcha concentrado frappé' },
  { id: 'frap-12', name: 'Frappe D\' Piña Colada', price: 19.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Frappe de piña fresca y crema de coco' },
  // Milkshakes
  { id: 'mlk-01', name: 'Milkshake D\' Fresa', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Batido cremoso de fresas con helado y chantilly' },
  { id: 'mlk-02', name: 'Milkshake D\' Chocolate', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Batido espeso de chocolate con helado y fudge' },
  { id: 'mlk-03', name: 'Milkshake D\' Arándonos', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Batido cremoso de arándanos naturales' },
  { id: 'mlk-04', name: 'Milkshake D\' Mango', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Batido cremoso de mango tropical' },
  { id: 'mlk-05', name: 'Milkshake D\' Oreo', price: 16.5, category: 'bebidas-jugos', subcategory: 'bebidas-jugos-frappes', description: 'Batido cremoso con trozos de galleta oreo', badge: 'FAVORITO' },

  // =================== PÁGINAS 12 & 15: DRINKS & COCTELERÍA ===================
  // Pisco
  { id: 'drk-01', name: 'Chilcanos (Sabor a Elección)', price: 20, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco quebranta con ginger ale y sabor a elegir: limón, maracuyá, fresa, piña, arándanos, durazno, mango, frambuesa, manzana o tropical' },
  { id: 'drk-02', name: 'Pisco Sour (Sabor a Elección)', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco quebranta, limón y jarabe batido. Sabores: limón, maracuyá, mango o piña', badge: 'BANDERA' },
  { id: 'drk-03', name: 'Primavera', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco con variedad de jugos naturales y toque de granadina' },
  { id: 'drk-04', name: 'Pisco Punch', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco, almíbar de piña fresca y limón' },
  { id: 'drk-05', name: 'Sacsay Huaman', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco macerado con notas cítricas, maracuyá y toques dulces' },
  { id: 'drk-06', name: 'Pisco Sunrise', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco, jugo de naranja fresco y granadina' },
  { id: 'drk-07', name: 'Perú Libre', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco peruano, Coca Cola y gotas de limón' },
  { id: 'drk-08', name: 'Machu Picchu', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Granadina, jugo de naranja, licor de menta y pisco en capas tricolor', badge: 'CLÁSICO' },
  // Vodka
  { id: 'drk-09', name: 'Laguna Azul', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, Blue Curacao, zumo de limón y Sprite' },
  { id: 'drk-10', name: 'Sex on the Beach', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, licor de durazno, jugo de naranja y arándanos' },
  { id: 'drk-11', name: 'Semen de Pitufo', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, Blue Curacao, piña colada y leche condensada' },
  { id: 'drk-12', name: 'Destornillador', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka con jugo de naranja natural y hielo' },
  { id: 'drk-13', name: 'Coco Loco', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, ron, tequila, crema de coco y jugo de limón' },
  { id: 'drk-14', name: 'Sub Marino', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Shot invertido de licor servido en tarro de cerveza helada' },
  { id: 'drk-15', name: 'Apple Martini', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka con licor aromático de manzana verde' },
  { id: 'drk-16', name: 'Cosmopolita', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, triple sec, zumo de arándano y lima' },
  { id: 'drk-17', name: 'Limonada Eléctrica', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, Blue Curacao, zumo de limón y gaseosa' },
  { id: 'drk-18', name: 'Caipiroska Clásica', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka macerado con limones frescos y azúcar' },
  { id: 'drk-19', name: 'Caipiroska D\' Maracuyá', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka con reducción de maracuyá y lima' },
  { id: 'drk-20', name: 'Caipiroska D\' Fresa', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka con fresas maceradas y lima fresca' },
  // Ron
  { id: 'drk-21', name: 'Mojitos (Sabor a Elección)', price: 20, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron blanco, hierba buena macerada y sabor a elegir: limón, maracuyá, fresa, piña, arándanos, durazno, mango, frambuesa, manzana o tropical' },
  { id: 'drk-22', name: 'Mojito Azul', price: 20, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron blanco, Blue Curacao, hierba buena, limón y soda' },
  { id: 'drk-23', name: 'Surf Blue', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron, curacao, piña y notas cítricas' },
  { id: 'drk-24', name: 'Blue Huaman', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron con curacao y macerado especial de frutas' },
  { id: 'drk-25', name: 'Cuba Libre', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron oscuro, Coca Cola y rodajas de limón' },
  { id: 'drk-26', name: 'Pantera Rosa', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron, vodka, granadina, piña y crema suave' },
  { id: 'drk-27', name: 'Barbados Surprise', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron, granadina, naranja, curacao y jarabe' },
  { id: 'drk-28', name: 'Piña Colada', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron blanco, crema de coco espesa y jugo de piña' },
  { id: 'drk-29', name: 'Good Tropical', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron con mix de frutas tropicales refrescantes' },
  { id: 'drk-30', name: 'Cafe Cao', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron con licor de café y toques de cacao' },
  { id: 'drk-31', name: 'Algarrobina', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Pisco/Ron, algarrobina, leche evaporada y canela' },
  { id: 'drk-32', name: 'Daikiris (Sabor a Elección)', price: 25, category: 'cocteles-licores', subcategory: 'drinks', description: 'Ron con frappé frutal a elegir: limón, maracuyá, fresa, piña, arándanos, durazno, mango o uva' },
  // Whisky Las Rocas
  { id: 'drk-33', name: 'Red Label (En las Rocas)', price: 28, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vaso de Johnnie Walker Red Label con hielo' },
  { id: 'drk-34', name: 'Jack Label (En las Rocas)', price: 45, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vaso de Jack Daniel\'s Tennessee Whiskey' },
  { id: 'drk-35', name: 'Black Label (En las Rocas)', price: 55, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vaso de Johnnie Walker Black Label 12 Años' },
  { id: 'drk-36', name: 'Jogger Orange', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Whisky con notas cítricas y jugo de naranja' },
  { id: 'drk-37', name: 'Jhon Collins', price: 45, category: 'cocteles-licores', subcategory: 'drinks', description: 'Whisky, zumo de limón, azúcar y soda' },
  // Tequila (Página 15)
  { id: 'drk-38', name: 'Margarita Clásica', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila, triple sec, limón y azúcar en copa escarchada' },
  { id: 'drk-39', name: 'Margarita D\' Mango', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila con pulpa de mango frappé y copa escarchada' },
  { id: 'drk-40', name: 'Margarita D\' Maracuyá', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila con reducción de maracuyá y limón' },
  { id: 'drk-41', name: 'Margarita D\' Durazno', price: 32, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila con néctar de durazno granizado' },
  { id: 'drk-42', name: 'Tequila Sunrise', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila dorado, jugo de naranja y granadina en capas' },
  { id: 'drk-43', name: 'Charro Negro', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila con Coca Cola y limón escarchado' },
  { id: 'drk-44', name: 'Margarita Blue', price: 30, category: 'cocteles-licores', subcategory: 'drinks', description: 'Tequila, Blue Curacao, zumo de limón y hielo frappé' },
  // Internacional (Página 15)
  { id: 'drk-45', name: 'Tom Collins', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Gin, zumo de limón, jarabe de goma y agua con gas' },
  { id: 'drk-46', name: 'Negroni', price: 38, category: 'cocteles-licores', subcategory: 'drinks', description: 'Gin, vermouth rosso y Campari', badge: 'INTERNACIONAL' },
  { id: 'drk-47', name: 'Gin Tonic', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Gin Bombay/Beefeater con agua tónica y botánicos' },
  { id: 'drk-48', name: 'Gin Tonic Blue', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Gin con Blue Curacao y agua tónica' },
  { id: 'drk-49', name: 'Caipirinha Tradicional', price: 33, category: 'cocteles-licores', subcategory: 'drinks', description: 'Cachaça brasileña macerada con limones frescos y azúcar' },
  { id: 'drk-50', name: 'Caipirinha Maracuyá', price: 33, category: 'cocteles-licores', subcategory: 'drinks', description: 'Cachaça con maracuyá fresca y limones' },
  { id: 'drk-51', name: 'Whisky Sour', price: 35, category: 'cocteles-licores', subcategory: 'drinks', description: 'Whisky con jugo de limón y jarabe batido' },
  { id: 'drk-52', name: 'Long Island Ice Tea', price: 55, category: 'cocteles-licores', subcategory: 'drinks', description: 'Vodka, ron, tequila, gin, triple sec, limón y cola', badge: 'FUERTE' },

  // =================== PÁGINA 13: REFRESCOS, BEBIDAS FRÍAS & BEBIDAS CALIENTES ===================
  // Jarras de 1 Litro
  { id: 'ref-jar-01', name: 'Limonada S/H (1 Litro)', price: 15, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo recién exprimida' },
  { id: 'ref-jar-02', name: 'Limonada Helada (1 Litro)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L bien helada' },
  { id: 'ref-jar-03', name: 'Limonada Frozen (1 Litro)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen frappé granizada' },
  { id: 'ref-jar-04', name: 'Maracuyá S/H (1 Litro)', price: 15, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo natural' },
  { id: 'ref-jar-05', name: 'Maracuyá Helada (1 Litro)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada' },
  { id: 'ref-jar-06', name: 'Maracuyá Frozen (1 Litro)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen granizada' },
  { id: 'ref-jar-07', name: 'Limonada D\' Hierba Buena S/H (1L)', price: 15, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo con hierba buena macerada' },
  { id: 'ref-jar-08', name: 'Limonada D\' Hierba Buena Helada (1L)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada con hierba buena' },
  { id: 'ref-jar-09', name: 'Limonada D\' Hierba Buena Frozen (1L)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen con hierba buena' },
  { id: 'ref-jar-10', name: 'Limonada D\' Menta S/H (1L)', price: 15, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo con hojas de menta' },
  { id: 'ref-jar-11', name: 'Limonada D\' Menta Helada (1L)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada con menta' },
  { id: 'ref-jar-12', name: 'Limonada D\' Menta Frozen (1L)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen con menta' },
  { id: 'ref-jar-13', name: 'Limonada D\' Fresa S/H (1L)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo con fresas naturales' },
  { id: 'ref-jar-14', name: 'Limonada D\' Fresa Helada (1L)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada de fresa' },
  { id: 'ref-jar-15', name: 'Limonada D\' Fresa Frozen (1L)', price: 22, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen de fresa' },
  { id: 'ref-jar-16', name: 'Limonada D\' Piña S/H (1L)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo con piña fresca' },
  { id: 'ref-jar-17', name: 'Limonada D\' Piña Helada (1L)', price: 19, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada de piña' },
  { id: 'ref-jar-18', name: 'Limonada D\' Piña Frozen (1L)', price: 22, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen de piña' },
  { id: 'ref-jar-19', name: 'Maracumango S/H (1 Litro)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo maracuyá y mango' },
  { id: 'ref-jar-20', name: 'Maracumango Helado (1 Litro)', price: 20, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada maracumango' },
  { id: 'ref-jar-21', name: 'Maracumango Frozen (1 Litro)', price: 23, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen granizada' },
  { id: 'ref-jar-22', name: 'Tropical (Mango, Maracuyá, Fresa) S/H (1L)', price: 17, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo trío de frutas' },
  { id: 'ref-jar-23', name: 'Tropical Helado (1 Litro)', price: 20, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada tropical' },
  { id: 'ref-jar-24', name: 'Tropical Frozen (1 Litro)', price: 23, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen tropical' },
  { id: 'ref-jar-25', name: 'Glacial D\' Limón S/H (1 Litro)', price: 16, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo glacial' },
  { id: 'ref-jar-26', name: 'Glacial D\' Limón Helado (1 Litro)', price: 18, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada con toque glacial' },
  { id: 'ref-jar-27', name: 'Glacial D\' Limón Frozen (1 Litro)', price: 20, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen glacial' },
  { id: 'ref-jar-28', name: 'Limonada Brasileña S/H (1 Litro)', price: 18, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo con leche condensada' },
  { id: 'ref-jar-29', name: 'Limonada Brasileña Helada (1 Litro)', price: 20, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada brasileña cremosa' },
  { id: 'ref-jar-30', name: 'Limonada Brasileña Frozen (1 Litro)', price: 23, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen brasileña', badge: 'FAVORITO' },
  { id: 'ref-jar-31', name: 'Chicha Morada 100% Natural S/H (1L)', price: 16, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L sin hielo maíz morado' },
  { id: 'ref-jar-32', name: 'Chicha Morada Helada (1 Litro)', price: 18, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L helada de maíz morado' },
  { id: 'ref-jar-33', name: 'Chicha Morada Frozen (1 Litro)', price: 20, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Jarra de 1L frozen de maíz morado' },
  // Refrescos 1/2 Litro
  { id: 'ref-med-01', name: 'Limonada Clásicas (1/2 Litro)', price: 11, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Elegir: Natural, Helada o Frozen (500 ml)' },
  { id: 'ref-med-02', name: 'Frutados (1/2 Litro)', price: 13, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Elegir: Natural, Helada o Frozen (500 ml)' },
  { id: 'ref-med-03', name: 'Chicha Morada (1/2 Litro)', price: 12, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Elegir: Natural, Helada o Frozen (500 ml)' },
  // Bebidas Frías
  { id: 'gas-01', name: 'Gaseosas 1/2L', price: 4.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Coca Cola, Inca Kola, Fanta, Sprite, Inka Kola Zero o Coca Cola Zero (500 ml)' },
  { id: 'gas-02', name: 'Gaseosas 1L', price: 10, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Coca Cola o Inca Kola (1 Litro)' },
  { id: 'gas-03', name: 'Gaseosas 1 1/2L', price: 12, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Coca Cola o Inca Kola (1.5 Litros)' },
  { id: 'gas-04', name: 'Gaseosas 3L', price: 18.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Coca Cola o Inca Kola (3 Litros familiar)' },
  { id: 'gas-05', name: 'Gaseosa en Lata', price: 11, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Coca Cola, Inca Kola, Fanta, Sprite, Inka Kola Zero o Coca Cola Zero' },
  { id: 'gas-06', name: 'Agua 1/2L (Sin Gas / Con Gas)', price: 3.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Botella de agua mineral 500 ml' },
  { id: 'gas-07', name: 'Gordita Inka Kola', price: 6.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Botella de vidrio retornable 625 ml' },
  { id: 'gas-08', name: 'Sporade o Gatorade', price: 5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Bebida rehidratante personal 500 ml' },
  { id: 'gas-09', name: 'Cubeta de Hielo', price: 8, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Cubeta llena de hielo adicional' },
  // Bebidas Calientes
  { id: 'cal-01', name: 'Té', price: 3, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Taza de té caliente' },
  { id: 'cal-02', name: 'Manzanilla', price: 3.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Infusión digestiva de manzanilla' },
  { id: 'cal-03', name: 'Anís', price: 3.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Infusión digestiva de granos de anís' },
  { id: 'cal-04', name: 'Té de Jazmín', price: 4.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Té aromático con flores de jazmín' },
  { id: 'cal-05', name: 'Té de Limón', price: 4.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Té caliente con limón fresco' },
  { id: 'cal-06', name: 'Té de Frutos Rojos', price: 4.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Infusión caliente de bayas y frutos rojos' },
  { id: 'cal-07', name: 'Café Granulado', price: 6.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Taza de café granulado soluble' },
  { id: 'cal-08', name: 'Café Pasado', price: 9, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Café de cafetera tradicional aromático' },
  { id: 'cal-09', name: 'Café c/ Leche', price: 12, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Café pasado con abundante leche vaporizada' },
  { id: 'cal-10', name: 'Café c/ Leche (Deslactosado)', price: 13, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Café pasado con leche deslactosada' },
  { id: 'cal-11', name: 'Capuccino', price: 14, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Expreso con abundante leche espumada y canela' },
  { id: 'cal-12', name: 'Mocaccino', price: 16, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Café expreso, chocolate espeso y espuma de leche' },
  { id: 'cal-13', name: 'Dalgona', price: 17.5, category: 'bebidas-jugos', subcategory: 'refrescos-calientes', description: 'Café batido en crema sobre leche bien fría o caliente' },

  // =================== PÁGINA 14: BOTELLAS & LICORES ===================
  { id: 'bot-01', name: 'Vino Rosé', price: 45, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella de vino rosé selecto' },
  { id: 'bot-02', name: 'Vino Borgoña', price: 45, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella de vino tinto dulce borgoña' },
  { id: 'bot-03', name: 'Vino Huarmeyano', price: 45, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella de vino artesanal de los valles de Huarmey', badge: 'LOCAL' },
  { id: 'bot-04', name: 'Somethimes', price: 120, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 3 Guaraná + 1 Cubeta de hielo' },
  { id: 'bot-05', name: 'Pisco 04 Gallos', price: 140, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 1 Ginger + 1 Cubeta de hielo + Limón (1 porción)' },
  { id: 'bot-06', name: 'Ballantines', price: 140, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 3 Guaraná + 1 Cubeta de hielo' },
  { id: 'bot-07', name: 'Jagermeister', price: 140, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + Jugo de naranja + 1 Cubeta de hielo' },
  { id: 'bot-08', name: 'Red Label', price: 140, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 3 Guaraná + 1 Cubeta de hielo' },
  { id: 'bot-09', name: 'Tequila', price: 150, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 01 Porción de limón + Sal' },
  { id: 'bot-10', name: 'Pisco Biondi', price: 160, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 1 Ginger + 1 Cubeta de hielo + 01 Porción limón' },
  { id: 'bot-11', name: 'Pisco Portón', price: 170, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 1 Ginger + 1 Cubeta de hielo + 01 Porción limón' },
  { id: 'bot-12', name: 'Chivas Regal 12 Años', price: 200, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 3 Guaraná + 1 Cubeta de hielo' },
  { id: 'bot-13', name: 'Jack Daniel', price: 210, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 3 Guaraná + 1 Cubeta de hielo' },
  { id: 'bot-14', name: 'Black Label', price: 250, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 1 Ginger + 1 Cubeta de hielo' },
  { id: 'bot-15', name: 'Golden Label', price: 340, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 2 Red Bull + 1 Cubeta de hielo', badge: 'PREMIUM' },
  { id: 'bot-16', name: 'Green Label', price: 380, category: 'cocteles-licores', subcategory: 'botellas', description: 'Botella + 2 Red Bull + 1 Cubeta de hielo', badge: 'EXCLUSIVE' },

  // =================== PÁGINA 15: CERVEZAS ===================
  { id: 'cer-01', name: 'Pilsen Pequeña', price: 10, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella personal 310 ml' },
  { id: 'cer-02', name: 'Cusqueña Trigo Pequeña', price: 11, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella personal 310 ml' },
  { id: 'cer-03', name: 'Corona', price: 12, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella con gajo de limón' },
  { id: 'cer-04', name: 'Stella Artois', price: 12, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Cerveza belga premium 330 ml' },
  { id: 'cer-05', name: 'Heineken', price: 12, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Cerveza holandesa 330 ml' },
  { id: 'cer-06', name: 'Pilsen Grande', price: 12, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella 630 ml' },
  { id: 'cer-07', name: 'Cusqueña Trigo Grande', price: 14, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella 620 ml' },
  { id: 'cer-08', name: 'Cusqueña Negra', price: 14, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Botella 620 ml' },
  { id: 'cer-09', name: 'Cusqueña Weekend', price: 16, category: 'cocteles-licores', subcategory: 'cervezas', description: 'Cerveza especial Weekend', badge: 'WEEKEND' },

  // =================== PÁGINA 8: GUARNICIONES & EXTRAS ===================
  { id: 'guar-01', name: 'Huevo Frito', price: 2.5, category: 'guarniciones', description: '01 Huevo montado' },
  { id: 'guar-02', name: 'Plátano Frito', price: 3.0, category: 'guarniciones', description: 'Porción de plátanos fritos' },
  { id: 'guar-03', name: 'Ensalada Clásica', price: 4.0, category: 'guarniciones', description: 'Porción de ensalada fresca de la casa' },
  { id: 'guar-04', name: 'Chorizo', price: 4.0, category: 'guarniciones', description: '01 Unidad de chorizo a la brasa' },
  { id: 'guar-05', name: 'Porción D\' Arroz Blanco', price: 6.0, category: 'guarniciones', description: 'Porción de arroz blanco graneado' },
  { id: 'guar-06', name: 'Tocino', price: 5.0, category: 'guarniciones', description: 'Láminas de tocino crocante' },
  { id: 'guar-07', name: 'Hotdog', price: 6.0, category: 'guarniciones', description: 'Porción de hotdog dorado' },
  { id: 'guar-08', name: 'Porción D\' Papas Fritas', price: 10.0, category: 'guarniciones', description: 'Porción generosa de papas fritas crocantes' },
  { id: 'guar-09', name: 'Porción D\' Arroz Chaufa', price: 15.0, category: 'guarniciones', description: 'Porción generosa de chaufa al wok' }
];

export const PAYMENT_INFO = {
  accountName: 'FIORELLA MADELEINE HERRERA CABOS',
  qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-q4HtckYCIxnK3f4Pqs-d8jS4kITBipiA1J9n6EsxTVIhPzHVHrB_LcXbogBpsTJe1MqW6vjScSYgSWj-dvpQ7Cua0_bKAVFCBm4UgUQI85xaON7dj9Css3aDao4USFOumJRe-4XvuBb0pl14eJGEUxpG9uDug_C6r4cKkMuhWvh3yo6QHSpRTwYWmApSOFbYrTKpDwkNrMIErOIKXykXBwTygNwzhpqkUqrB5dlP-YBFy8DsBWspwFT-R_CJ2NIh',
  whatsappNumber: '51961336674',
  address: 'Av. Cabo Alberto Reyes #140',
  socialMedia: 'weekendrestobar'
};
