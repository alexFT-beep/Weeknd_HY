/**
 * Infrastructure Data Source: fullMenuData
 * Complete catalog digitized from WEEKEND! LOUNGE & RESTAURANT - LISTA DE PRECIOS DEL MENÚ COMPLETO
 * Location: Av. Cabo Alberto Reyes #140 | WhatsApp: 961 336 674
 */

export const MENU_CATEGORIES = [
  { id: "alitas", name: "Alitas & Rondas", emoji: "🍗", color: "#FF6D00", rgb: "255, 109, 0", description: "31 salsas artesanales y combos para compartir" },
  { id: "hamburguesas", name: "Hamburguesas", emoji: "🍔", color: "#FFE600", rgb: "255, 230, 0", description: "Carne artesanal a la parrilla, pollo crispy y adiciones" },
  { id: "broaster", name: "Sabrosos Broaster", emoji: "🍗", color: "#FFB800", rgb: "255, 184, 0", description: "Pollo broaster crocante, contundentes mostritos y agregados" },
  { id: "salchipapas", name: "Salchipapas", emoji: "🍟", color: "#CCFF00", rgb: "204, 255, 0", description: "Salchipapas clásicas, rancheras, royal y especiales" },
  { id: "parrillas", name: "Parrillas & Combos", emoji: "🥩", color: "#FF0033", rgb: "255, 0, 51", description: "Cortes a la brasa, anticuchos y combos parrilleros" },
  { id: "piqueos", name: "Piqueos", emoji: "🍢", color: "#FF5722", rgb: "255, 87, 34", description: "Brochetas, tequeños x10 y nuggets" },
  { id: "marina", name: "Especialidad Marina", emoji: "🐟", color: "#00B4D8", rgb: "0, 180, 216", description: "Ceviches, tiraditos y especialidades marinas artesanales" },
  { id: "pastas", name: "Pastas", emoji: "🍝", color: "#76FF03", rgb: "118, 255, 3", description: "Fetuccinis en salsas artesanales y acompañamientos" },
  { id: "ensaladas", name: "Ensaladas", emoji: "🥗", color: "#0ACC80", rgb: "10, 204, 128", description: "Ensaladas frescas de fruta, pollo y atún" },
  { id: "makis", name: "Makis", emoji: "🍱", color: "#00FFA3", rgb: "0, 255, 163", description: "Makis acevichados, crispy, agridulces y lomo saltado" },
  { id: "jugos", name: "FRAPPES & JUGOS", emoji: "🥤", color: "#FF007F", rgb: "255, 0, 127", description: "Frappes artesanales, jugos naturales y smoothies 100% fruta" },
  { id: "bubble-tea", name: "Bubble Tea & Milkshakes", emoji: "🧋", color: "#D500F9", rgb: "213, 0, 249", description: "Bubble Tea con Popping Bobba y milkshakes cremosos" },
  { id: "refrescos", name: "Refrescos & Bebidas", emoji: "🧊", color: "#00E5FF", rgb: "0, 229, 255", description: "Jarras de refresco (1L y 1/2L), gaseosas y bebidas calientes" },
  { id: "guarniciones", name: "Guarniciones & Extras", emoji: "🥔", color: "#A0AEC0", rgb: "160, 174, 192", description: "Porciones adicionales de papas, arroz, ensaladas y complementos" }
];

export const DELIVERY_ZONES = [
  { id: "casco-urbano", name: "Casco Urbano", fee: 2.00 },
  { id: "santo-domingo", name: "Santo Domingo Centro", fee: 4.00 },
  { id: "la-victoria", name: "La Victoria Centro", fee: 4.00 },
  { id: "buena-villa", name: "Buena Villa (Centro)", fee: 8.00 },
  { id: "puerto-huarmey", name: "Puerto Huarmey", fee: 10.00 },
  { id: "9-de-octubre", name: "9 de Octubre", fee: 10.00 }
];

// Módulo "EMPAQUES Y ENVASES" eliminado por requerimiento.
// El resumen de orden queda limpio, sin cargos automáticos ni manuales por empaques.
export const PACKAGING_OPTIONS = [];

export const FULL_MENU_ITEMS = [
  // =================== 1. EL BRAVO D' CASA..! ALITAS FESTÍN DE SABORES ===================
  // --- Bloque S/ 25.00 (08 unidades + papas fritas + ensalada) ---
  { id: "ali-01", name: "Alitas Crocantes", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-02", name: "Alitas BBQ", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-03", name: "Alitas Búfalo", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-04", name: "Alitas Acevichadas", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada", badge: "FAVORITO" },
  { id: "ali-05", name: "Alitas Anticucheras", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-06", name: "Alitas en Salsa Maracuyá", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-07", name: "Alitas en Salsa Teriyaki", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-08", name: "Alitas en Salsa Honey Mustard", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-09", name: "Alitas al Olivo", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-10", name: "Alitas en Salsa Guacamole", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-11", name: "Alitas Mango Habanero", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-12", name: "Alitas Coreanas", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-13", name: "Alitas en Salsa Mango Picante", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-14", name: "Alitas en Salsa Alfredo", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-15", name: "Alitas en Salsa de Piña", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-16", name: "Alitas Pachamanqueras", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-17", name: "Alitas Chimichurri Ahumado", price: 25, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },

  // --- Bloque S/ 27.00 (08 unidades + papas fritas + ensalada) ---
  { id: "ali-18", name: "Alitas en Salsa Napolitana", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-19", name: "Alitas en Salsa Vino Tinto", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-20", name: "Alitas 04 Quesos", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-21", name: "Alitas en Salsa de Arándanos", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-22", name: "Alitas en Salsa Frutos Rojos", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-23", name: "Alitas en Salsa Fresa", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-24", name: "Alitas en Salsa Fresa Hot", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-25", name: "Alitas Weekend Especial", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-26", name: "Alitas en Salsa Mediterránea Pizza Hut", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-27", name: "Alitas en Salsa de Ajo y Queso Parmesano", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-28", name: "Alitas en Salsa de Durazno", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-29", name: "Alitas en Salsa Ranch", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-30", name: "Alitas en Salsa Maracumango", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },
  { id: "ali-31", name: "Alitas en Salsa Naranja", price: 27, category: "alitas", subcategory: "alitas-individuales", description: "08 unidades + papas fritas + ensalada" },

  // --- RONDAS Y COMBOS DE ALITAS (Las más pedidas) ---
  { id: "combo-duo", name: "Dúo de Alitas", price: 40, category: "alitas", subcategory: "rondas-alitas", description: "12 alitas + papas fritas + ensalada (02 sabores a elección)", badge: "RECOMENDADO" },
  { id: "combo-trio", name: "Trío de Alitas", price: 65, category: "alitas", subcategory: "rondas-alitas", description: "18 alitas + papas fritas + ensalada (03 sabores / 3 personas)", badge: "RECOMENDADO" },
  { id: "combo-ruleta", name: "Ruleta Weekend", price: 80, category: "alitas", subcategory: "rondas-alitas", description: "20 alitas + papas fritas + ensalada (04 sabores a elección)", tapersCount: 2 },
  { id: "combo-carrusel", name: "Carrusel Weekend", price: 85, category: "alitas", subcategory: "rondas-alitas", description: "24 alitas + papas fritas + ensalada (04 sabores a elección)", tapersCount: 2 },
  { id: "combo-ronda", name: "Ronda Festival D' Sabores", price: 108, category: "alitas", subcategory: "rondas-alitas", description: "30 alitas + papas fritas + ensalada (05 sabores / 5 personas)", badge: "GRAN FESTIVAL", tapersCount: 2 },
  { id: "salsa-extra", name: "Salsa Aparte (Pote adicional)", price: 6, category: "alitas", subcategory: "rondas-alitas", description: "Pote adicional de cualquiera de nuestras 31 salsas artesanales" },

  // =================== 2. HAMBURGUESAS ===================
  { id: "hamb-01", name: "La Clásica", price: 15, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Carne artesanal + papas fritas + ensalada" },
  { id: "hamb-02", name: "La Pechugona", price: 15, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Filete de pollo + papas fritas + ensalada" },
  { id: "hamb-03", name: "Cheese Burger", price: 18, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Pollo crispy + queso + papas fritas + ensalada" },
  { id: "hamb-04", name: "La Carretillera", price: 18, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Pollo deshilachado + queso + jamón + papas fritas" },
  { id: "hamb-05", name: "La Gaucha", price: 20, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Carne artesanal + queso + chorizo + chimichurri" },
  { id: "hamb-06", name: "La Tropical", price: 23, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Carne artesanal + piña + queso + tocino + papas fritas" },
  { id: "hamb-07", name: "La Royal Weekend", price: 25, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Carne + huevo + queso edams + jamón + tocino" },
  { id: "hamb-08", name: "Weekend Poderosa", price: 28, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Doble carne + huevo + doble queso + chorizo + tocino" },
  { id: "hamb-09", name: "Warmi Burguer", price: 28, category: "hamburguesas", subcategory: "hamburguesas-principales", description: "Doble carne + doble queso mantecoso + tocino + chimichurri" },

  // Adicionales de Hamburguesas
  { id: "adic-hamb-01", name: "Adicional Huevo", price: 2.50, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-02", name: "Adicional Queso Edams", price: 3.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-03", name: "Adicional Queso Cheddar", price: 4.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-04", name: "Adicional Chorizo", price: 4.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-05", name: "Adicional Tocino", price: 5.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-06", name: "Adicional Salsa 04 Quesos", price: 6.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },
  { id: "adic-hamb-07", name: "Porción de Papas al Hilo", price: 5.00, category: "hamburguesas", subcategory: "adicionales-hamburguesas", description: "Para tu hamburguesa" },

  // =================== 3. SABROSOS BROASTER ===================
  { id: "broast-01", name: "Broaster D' Pecho/Pierna", price: 26, category: "broaster", subcategory: "broaster", description: "Arroz + papas fritas + ensalada" },
  { id: "broast-02", name: "Broaster D' Pierna Deshuesada", price: 28, category: "broaster", subcategory: "broaster", description: "Arroz + papas fritas + ensalada" },
  { id: "broast-03", name: "Salchi Broaster Pierna/Pecho", price: 30, category: "broaster", subcategory: "broaster", description: "Arroz + papas + hotdog + ensalada" },
  { id: "broast-04", name: "Salchibroaster Pierna Deshuesada", price: 32, category: "broaster", subcategory: "broaster", description: "Arroz + papas + hotdog + ensalada" },
  { id: "broast-05", name: "Mostrito Broaster Pecho/Pierna", price: 32, category: "broaster", subcategory: "broaster", description: "Arroz chaufa + papas fritas + ensalada" },
  { id: "broast-06", name: "Mostrito Broaster Pierna Deshuesada", price: 33, category: "broaster", subcategory: "broaster", description: "Arroz chaufa + papas fritas" },

  // Agregados Broaster
  { id: "adic-broast-01", name: "Agregado Huevo", price: 2.50, category: "broaster", subcategory: "agregados-broaster", description: "Para tu plato broaster" },
  { id: "adic-broast-02", name: "Agregado Plátano", price: 3.00, category: "broaster", subcategory: "agregados-broaster", description: "Para tu plato broaster" },
  { id: "adic-broast-03", name: "Agregado Chorizo", price: 4.00, category: "broaster", subcategory: "agregados-broaster", description: "Para tu plato broaster" },
  { id: "adic-broast-04", name: "Agregado Hotdog", price: 6.00, category: "broaster", subcategory: "agregados-broaster", description: "Para tu plato broaster" },

  // =================== 4. SALCHIPAPAS WEEKEND ===================
  { id: "salchi-01", name: "La Simplecita", price: 16, category: "salchipapas", subcategory: "salchipapas", description: "Papas fritas + hotdog" },
  { id: "salchi-02", name: "La Ranchera", price: 18, category: "salchipapas", subcategory: "salchipapas", description: "Papas fritas + hotdog + chorizo" },
  { id: "salchi-03", name: "La Royal Weekend", price: 25, category: "salchipapas", subcategory: "salchipapas", description: "Papas + hotdog + chorizo + huevo + queso" },
  { id: "salchi-04", name: "La Salchi Nuggets", price: 25, category: "salchipapas", subcategory: "salchipapas", description: "Papas fritas + hotdog + nuggets" },
  { id: "salchi-05", name: "La Salchi Warmi", price: 25, category: "salchipapas", subcategory: "salchipapas", description: "Papas + hotdog + chorizo + salsa 04 quesos" },
  { id: "salchi-06", name: "La A lo Pobre", price: 25, category: "salchipapas", subcategory: "salchipapas", description: "Papas + hotdog + chorizo + huevo + plátano" },
  { id: "salchi-07", name: "La Especial Weekend", price: 28, category: "salchipapas", subcategory: "salchipapas", description: "Papas + hotdog + chorizo + 04 quesos + pollo" },

  // =================== 5. PARRILLAS WEEKEND ===================
  { id: "parr-01", name: "Anticuchos D' Corazón", price: 20, category: "parrillas", subcategory: "parrillas", description: "03 palitos + choclo + papas fritas + ensalada" },
  { id: "parr-02", name: "Molleja a la Parrilla", price: 25, category: "parrillas", subcategory: "parrillas", description: "Molleja a la parrilla + choclo + papas + ensalada" },
  { id: "parr-03", name: "Rachi + Molleja", price: 25, category: "parrillas", subcategory: "parrillas", description: "01 porción c/u + choclo + papas + ensalada" },
  { id: "parr-04", name: "Pollo a la Parrilla 1/4", price: 27, category: "parrillas", subcategory: "parrillas", description: "1/4 de pollo a la brasa + choclo + papas + ensalada" },
  { id: "parr-05", name: "Cerdo a la Parrilla (250gr)", price: 28, category: "parrillas", subcategory: "parrillas", description: "Corte de cerdo 250gr + choclo + papas + ensalada" },
  { id: "parr-06", name: "Anticuchos D' Corazón + Rachi + Mollejas", price: 28, category: "parrillas", subcategory: "parrillas", description: "02 palitos anticuchos + rachi + mollejas + guarnición" },
  { id: "parr-07", name: "Churrasco a la Parrilla (250gr)", price: 30, category: "parrillas", subcategory: "parrillas", description: "Churrasco 250gr + choclo + papas + ensalada" },
  { id: "parr-08", name: "Carne a la Parrilla (Lomo Fino)", price: 40, category: "parrillas", subcategory: "parrillas", description: "Lomo fino a la parrilla + choclo + papas + ensalada" },

  // Combos Parrilleros
  { id: "comb-parr-01", name: "Combo Weekend 01", price: 40, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo 1/4 + mollejas + papas + choclo + ensalada" },
  { id: "comb-parr-02", name: "Combo Weekend 02", price: 45, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo 1/4 + rachi + chorizo + papas + choclo" },
  { id: "comb-parr-03", name: "Combo Weekend 03", price: 48, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo 1/4 + rachi o molleja + 02 anticuchos" },
  { id: "comb-parr-04", name: "Combo Weekend 04", price: 69, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo 1/4 + cerdo + mollejas + 02 anticuchos" },
  { id: "comb-parr-05", name: "Combo Weekend 05", price: 95, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo 1/4 + cerdo + lomo fino + mollejas + 2 chorizos" },
  { id: "comb-parr-06", name: "Mega Combo Weekend", price: 199, category: "parrillas", subcategory: "combos-parrilleros", description: "Pollo pecho y pierna + 2 cerdos + 1 lomo fino + 3 chorizos + 3 anticuchos + rachi + 2 mollejas + 2 papas + ensalada", badge: "MEGA BANQUETE" },

  // =================== 6. PIQUEOS (Brochetas, Tequeños, Nuggets) ===================
  // Brochetas
  { id: "broch-01", name: "Brochetas D' Pollo", price: 26, category: "piqueos", subcategory: "piqueos", description: "03 palitos + papas fritas + ensalada" },
  { id: "broch-02", name: "Brochetas D' Cerdo al Chimichurri", price: 30, category: "piqueos", subcategory: "piqueos", description: "03 palitos + papas fritas + ensalada" },
  { id: "broch-03", name: "Brochetas D' Carne (Lomo Fino)", price: 35, category: "piqueos", subcategory: "piqueos", description: "03 palitos + papas fritas + ensalada" },
  { id: "broch-04", name: "Brochetas Weekend", price: 37, category: "piqueos", subcategory: "piqueos", description: "03 palitos Pollo/Carne + papas + ensalada" },
  { id: "broch-05", name: "Brochetas Weekend Especial", price: 40, category: "piqueos", subcategory: "piqueos", description: "03 palitos Pollo/Carne/Cerdo + chimichurri" },

  // Tequeños (10 unidades)
  { id: "teq-01", name: "Tequeños D' Queso (10 Und)", price: 15, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },
  { id: "teq-02", name: "Tequeños D' Jamón y Queso (10 Und)", price: 17, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },
  { id: "teq-03", name: "Tequeños D' Burger (10 Und)", price: 18, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },
  { id: "teq-04", name: "Tequeños D' Chorizo (10 Und)", price: 20, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },
  { id: "teq-05", name: "Tequeños D' Lomo Saltado (10 Und)", price: 25, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },
  { id: "teq-06", name: "Tequeños D' Pollo Crispy + Queso (10 Und)", price: 25, category: "piqueos", subcategory: "piqueos", description: "10 unidades con salsa guacamole" },

  // Nuggets
  { id: "nug-01", name: "Nuggets One (06 Und)", price: 17, category: "piqueos", subcategory: "piqueos", description: "06 unidades + papas fritas" },
  { id: "nug-02", name: "Nuggets Two (12 Und)", price: 27, category: "piqueos", subcategory: "piqueos", description: "12 unidades + papas fritas" },
  { id: "nug-03", name: "Nuggets Three (10 Und)", price: 29, category: "piqueos", subcategory: "piqueos", description: "10 unidades + papas fritas + chorizo" },
  { id: "nug-04", name: "Nuggets Four (10 Und)", price: 30, category: "piqueos", subcategory: "piqueos", description: "10 unidades + papas fritas + salsa 04 quesos" },

  // =================== 7. ESPECIALIDAD MARINA (PRÓXIMAMENTE) ===================
  // (Actualmente vacía sin items)


  // =================== 9. PASTAS ===================
  { id: "past-01", name: "Fetuccini a la Huancaína", price: 22, category: "pastas", subcategory: "pastas", description: "Fetuccinis en salsa huancaína artesanal" },
  { id: "past-02", name: "Fetuccini a la Bolognesa", price: 25, category: "pastas", subcategory: "pastas", description: "Fetuccinis con salsa bolognesa de carne" },
  { id: "past-03", name: "Tallarín Saltado Criollo D' Pollo", price: 25, category: "pastas", subcategory: "pastas", description: "Salteado criollo al wok con pollo y verduras" },
  { id: "past-04", name: "Fetuccini a la Alfredo (Jamón Inglés)", price: 28, category: "pastas", subcategory: "pastas", description: "Fetuccinis en salsa alfredo con jamón inglés" },
  { id: "past-05", name: "Fetuccini en Salsa 04 Quesos c/ Tocino", price: 28, category: "pastas", subcategory: "pastas", description: "Fetuccinis en crema de 4 quesos con tocino crocante" },
  { id: "past-06", name: "Tallarín Saltado Criollo D' Carne (Lomo Fino)", price: 35, category: "pastas", subcategory: "pastas", description: "Salteado criollo al wok con lomo fino" },
  { id: "past-07", name: "Fetuccini c/ Langostinos en Salsa Alfredo", price: 35, category: "pastas", subcategory: "pastas", description: "Fetuccinis con langostinos salteados en crema alfredo" },

  // Acompaña tus Pastas:
  { id: "adic-past-01", name: "Adicional Nuggets (05 Und)", price: 12, category: "pastas", subcategory: "acompana-pastas", description: "05 nuggets para acompañar tus pastas" },
  { id: "adic-past-02", name: "Adicional Milanesa", price: 15, category: "pastas", subcategory: "acompana-pastas", description: "Milanesa de pollo para tus pastas" },
  { id: "adic-past-03", name: "Adicional Chuleta", price: 15, category: "pastas", subcategory: "acompana-pastas", description: "Chuleta ahumada para tus pastas" },
  { id: "adic-past-04", name: "Adicional Lomo Fino Saltado (Porción)", price: 20, category: "pastas", subcategory: "acompana-pastas", description: "Porción de lomo saltado para tus pastas" },
  { id: "adic-past-05", name: "Adicional Bisteck (Lomo Fino)", price: 20, category: "pastas", subcategory: "acompana-pastas", description: "Bisteck de lomo fino para tus pastas" },

  // =================== 10. ENSALADAS WEEKEND ===================
  { id: "ens-01", name: "Ensaladas D' Fruta", price: 18, category: "ensaladas", subcategory: "ensaladas", description: "Frutas frescas de temporada con miel y algarrobina" },
  { id: "ens-02", name: "Ensaladas D' Pollo", price: 25, category: "ensaladas", subcategory: "ensaladas", description: "Mix de verduras frescas con filete de pollo y vinagreta" },
  { id: "ens-03", name: "Ensaladas D' Atún", price: 25, category: "ensaladas", subcategory: "ensaladas", description: "Mix de verduras frescas con atún y vinagreta" },

  // =================== 11. MAKIS ===================
  { id: "maki-01", name: "Makis Acevichados", price: 25, category: "makis", subcategory: "makis", description: "Rollos rellenos de langostino furai y palta, bañados en salsa acevichada" },
  { id: "maki-02", name: "Makis Crispy", price: 25, category: "makis", subcategory: "makis", description: "Rollos crocantes rellenos con salsa especial" },
  { id: "maki-03", name: "Makis en Salsa Agridulce", price: 25, category: "makis", subcategory: "makis", description: "Rollos bañados en salsa agridulce oriental" },
  { id: "maki-04", name: "Makis Lomo Saltado", price: 28, category: "makis", subcategory: "makis", description: "Rollos fusión coronados con lomo saltado flameado" },

  // =================== 12. SMOOTHIES (100% NATURAL) ===================
  { id: "sm-01", name: "Smoothies D' Fresa", price: 15, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-02", name: "Smoothies D' Maracuyá", price: 15, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-03", name: "Smoothies D' Plátano", price: 15, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-04", name: "Smoothies D' Arándanos", price: 16, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-05", name: "Smoothies D' Mango", price: 16, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-06", name: "Smoothies D' Matcha", price: 16, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-07", name: "Smoothies D' Maracumango", price: 17, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-08", name: "Smoothies D' Piña Colada", price: 18, category: "jugos", subcategory: "smoothies", description: "100% Natural" },
  { id: "sm-09", name: "Smoothies Tropical", price: 18, category: "jugos", subcategory: "smoothies", description: "100% Natural" },

  // =================== 13. BUBBLE TEA ===================
  { id: "bt-01", name: "Strawberry Green Tea", price: 15.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea refrescante" },
  { id: "bt-02", name: "Uva Green Tea", price: 15.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea refrescante" },
  { id: "bt-03", name: "Litchy Green Tea", price: 15.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Litchy" },
  { id: "bt-04", name: "Maracuya Green Tea", price: 15.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Maracuyá" },
  { id: "bt-05", name: "Frambuesas Green Tea", price: 15.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Frambuesas" },
  { id: "bt-06", name: "Apple Green Tea", price: 16.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Manzana" },
  { id: "bt-07", name: "Mango Green Tea", price: 16.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Mango" },
  { id: "bt-08", name: "Arándanos Green Tea", price: 16.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Arándanos" },
  { id: "bt-09", name: "Duraznos Green Tea", price: 16.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea de Duraznos" },
  { id: "bt-10", name: "Tropical Tea", price: 20.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Bubble Tea especial" },
  { id: "top-01", name: "Popping Bobba (Topping)", price: 3.50, category: "bubble-tea", subcategory: "bubble-tea", description: "Perlas explosivas de fruta para tus bebidas" },

  // =================== 14. JUGOS NATURALES ===================
  { id: "jug-01", name: "Jugo de Papaya", price: 12, category: "jugos", subcategory: "jugos-frappes", description: "Jugo 100% natural" },
  { id: "jug-02", name: "Jugo de Piña", price: 13, category: "jugos", subcategory: "jugos-frappes", description: "Jugo 100% natural" },
  { id: "jug-03", name: "Jugo de Fresa", price: 13, category: "jugos", subcategory: "jugos-frappes", description: "Jugo 100% natural" },
  { id: "jug-04", name: "Jugo de Mango", price: 13, category: "jugos", subcategory: "jugos-frappes", description: "Jugo 100% natural" },
  { id: "jug-05", name: "Jugo de Melón", price: 13, category: "jugos", subcategory: "jugos-frappes", description: "Jugo 100% natural" },
  { id: "jug-06", name: "Jugo Surtido", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Mix de frutas naturales" },
  { id: "jug-07", name: "Jugo Fresa c/ Piña", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Fresa y piña natural" },
  { id: "jug-08", name: "Jugo Papaya c/ Piña", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Papaya y piña natural" },
  { id: "jug-09", name: "Jugo Papaya c/ Melón", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Papaya y melón natural" },
  { id: "jug-10", name: "Jugo Mango c/ Piña", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Mango y piña natural" },
  { id: "jug-11", name: "Jugo Mango c/ Fresa", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Mango y fresa natural" },
  { id: "jug-12", name: "Jugo Plátano c/ Leche", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Plátano batido con leche" },
  { id: "jug-13", name: "Jugo Papaya c/ Leche", price: 15, category: "jugos", subcategory: "jugos-frappes", description: "Papaya batida con leche" },
  { id: "jug-14", name: "Jugo de Arándanos", price: 16, category: "jugos", subcategory: "jugos-frappes", description: "Arándanos naturales" },
  { id: "jug-15", name: "Jugo Mango c/ Leche", price: 17, category: "jugos", subcategory: "jugos-frappes", description: "Mango batido con leche" },
  { id: "jug-16", name: "Jugo Fresa c/ Leche", price: 17, category: "jugos", subcategory: "jugos-frappes", description: "Fresa batida con leche" },
  { id: "jug-17", name: "Jugo Especial", price: 20, category: "jugos", subcategory: "jugos-frappes", description: "Frutas mixtas, huevo, leche y algarrobina" },
  { id: "jug-18", name: "Jugo Arándanos c/ Leche", price: 22, category: "jugos", subcategory: "jugos-frappes", description: "Arándanos batidos con leche" },

  // =================== 15. FRAPPES (100% NATURAL) ===================
  { id: "frap-01", name: "Frappe D' Fresa", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-02", name: "Frappe D' Chocolate", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-03", name: "Frappe D' Algarrobina", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-04", name: "Frappe D' Moca", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-05", name: "Frappe D' Oreo", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe con galletas Oreo" },
  { id: "frap-06", name: "Frappe D' Vainilla", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-07", name: "Frappe D' Durazno", price: 15.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-08", name: "Frappe D' Arándanos", price: 16.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-09", name: "Frappe D' Mango", price: 16.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-10", name: "Frappe D' Maracumango", price: 16.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe 100% natural" },
  { id: "frap-11", name: "Frappe D' Matcha", price: 16.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe de té matcha" },
  { id: "frap-12", name: "Frappe D' Piña Colada", price: 19.50, category: "jugos", subcategory: "jugos-frappes", description: "Frappe estilo piña colada" },

  // =================== 16. MILKSHAKES ===================
  { id: "milk-01", name: "Milkshake D' Fresa", price: 16.50, category: "bubble-tea", subcategory: "milkshakes", description: "Batido cremoso de fresa" },
  { id: "milk-02", name: "Milkshake D' Chocolate", price: 16.50, category: "bubble-tea", subcategory: "milkshakes", description: "Batido cremoso de chocolate" },
  { id: "milk-03", name: "Milkshake D' Arándanos", price: 16.50, category: "bubble-tea", subcategory: "milkshakes", description: "Batido cremoso de arándanos" },
  { id: "milk-04", name: "Milkshake D' Mango", price: 16.50, category: "bubble-tea", subcategory: "milkshakes", description: "Batido cremoso de mango" },
  { id: "milk-05", name: "Milkshake D' Oreo", price: 16.50, category: "bubble-tea", subcategory: "milkshakes", description: "Batido cremoso con galletas Oreo" },

  // =================== 17. REFRESCOS EN JARRA & 1/2 LITRO ===================
  { id: "jarra-01", name: "Jarra Limonada S/H (1L)", price: 15, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-02", name: "Jarra Maracuyá S/H (1L)", price: 15, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-03", name: "Jarra Limonada D' Hierba Buena S/H (1L)", price: 15, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-04", name: "Jarra Limonada D' Menta S/H (1L)", price: 15, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-05", name: "Jarra Glacial D' Limón S/H (1L)", price: 16, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-06", name: "Jarra Chicha Morada 100% Natural S/H (1L)", price: 16, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-07", name: "Jarra Limonada Helada (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-08", name: "Jarra Maracuyá Helada (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-09", name: "Jarra Limonada D' Hierba Buena Helada (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-10", name: "Jarra Limonada D' Menta Helada (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-11", name: "Jarra Limonada D' Fresa S/H (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-12", name: "Jarra Limonada D' Piña S/H (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-13", name: "Jarra Maracumango S/H (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-14", name: "Jarra Tropical S/H (Mango, Maracuyá, Fresa) (1L)", price: 17, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-15", name: "Jarra Glacial D' Limón Helado (1L)", price: 18, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro helada" },
  { id: "jarra-16", name: "Jarra Limonada Brasileña S/H (1L)", price: 18, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro sin helar" },
  { id: "jarra-17", name: "Jarra Chicha Morada Helada (1L)", price: 18, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-18", name: "Jarra Limonada Frozen (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-19", name: "Jarra Maracuyá Frozen (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-20", name: "Jarra Limonada D' Hierba Buena Frozen (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-21", name: "Jarra Limonada D' Menta Frozen (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-22", name: "Jarra Limonada D' Fresa Helada (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-23", name: "Jarra Limonada D' Piña Helada (1L)", price: 19, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-24", name: "Jarra Glacial D' Limón Frozen (1L)", price: 20, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-25", name: "Jarra Limonada Brasileña Helada (1L)", price: 20, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-26", name: "Jarra Chicha Morada Frozen (1L)", price: 20, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-27", name: "Jarra Maracumango Helado (1L)", price: 20, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-28", name: "Jarra Tropical Helado (1L)", price: 20, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro bien helada" },
  { id: "jarra-29", name: "Jarra Limonada D' Fresa Frozen (1L)", price: 22, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-30", name: "Jarra Limonada D' Piña Frozen (1L)", price: 22, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-31", name: "Jarra Limonada Brasileña Frozen (1L)", price: 23, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-32", name: "Jarra Maracumango Frozen (1L)", price: 23, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },
  { id: "jarra-33", name: "Jarra Tropical Frozen (1L)", price: 23, category: "refrescos", subcategory: "refrescos", description: "Jarra de 1 Litro frozen frappé" },

  // Refrescos 1/2 Litro
  { id: "medio-01", name: "Limonadas Clásicas (1/2L)", price: 11, category: "refrescos", subcategory: "refrescos", description: "Natural, helada o frozen" },
  { id: "medio-02", name: "Chicha Morada (1/2L)", price: 12, category: "refrescos", subcategory: "refrescos", description: "Natural, helada o frozen" },
  { id: "medio-03", name: "Frutados (1/2L)", price: 13, category: "refrescos", subcategory: "refrescos", description: "Natural, helada o frozen" },

  // Gaseosas / Aguas / Bebidas Frías
  { id: "gas-01", name: "Agua 1/2L (Sin gas / Con gas)", price: 3.50, category: "refrescos", subcategory: "refrescos", description: "Botella 500ml" },
  { id: "gas-02", name: "Gaseosas 1/2L (Coca Cola, Inka Kola, Fanta, Sprite, Zero)", price: 4.50, category: "refrescos", subcategory: "refrescos", description: "Botella 500ml personal" },
  { id: "gas-03", name: "Sporade o Gatorade", price: 5.00, category: "refrescos", subcategory: "refrescos", description: "Bebida rehidratante" },
  { id: "gas-04", name: "Gordita Inka Kola", price: 6.50, category: "refrescos", subcategory: "refrescos", description: "Inka Kola vidrio gordita" },
  { id: "gas-05", name: "Cubeta de Hielo", price: 8.00, category: "refrescos", subcategory: "refrescos", description: "Cubeta de hielo" },
  { id: "gas-06", name: "Gaseosas 1L (Coca Cola, Inka Kola)", price: 10.00, category: "refrescos", subcategory: "refrescos", description: "Botella 1 Litro" },
  { id: "gas-07", name: "Gaseosa en Lata (Coca Cola, Inka Kola, Fanta, Sprite, Zero)", price: 11.00, category: "refrescos", subcategory: "refrescos", description: "Lata 355ml" },
  { id: "gas-08", name: "Gaseosas 1 1/2L (Coca Cola, Inka Kola)", price: 12.00, category: "refrescos", subcategory: "refrescos", description: "Botella 1.5 Litros" },
  { id: "gas-09", name: "Gaseosas 3L (Coca Cola, Inka Kola)", price: 18.50, category: "refrescos", subcategory: "refrescos", description: "Botella 3 Litros familiar" },

  // Bebidas Calientes
  { id: "cal-01", name: "Té", price: 3.00, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente" },
  { id: "cal-02", name: "Manzanilla", price: 3.50, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente" },
  { id: "cal-03", name: "Anís", price: 3.50, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente" },
  { id: "cal-04", name: "Té de Jazmín", price: 4.50, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente de jazmín" },
  { id: "cal-05", name: "Té de Limón", price: 4.50, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente de limón" },
  { id: "cal-06", name: "Té de Frutos Rojos", price: 4.50, category: "refrescos", subcategory: "refrescos", description: "Infusión caliente de frutos rojos" },
  { id: "cal-07", name: "Café Granulado", price: 6.50, category: "refrescos", subcategory: "refrescos", description: "Café caliente" },
  { id: "cal-08", name: "Café Pasado", price: 9.00, category: "refrescos", subcategory: "refrescos", description: "Café pasado de chanchamayo" },
  { id: "cal-09", name: "Café c/ Leche", price: 12.00, category: "refrescos", subcategory: "refrescos", description: "Café con leche caliente" },
  { id: "cal-10", name: "Café c/ Leche (Deslactosado)", price: 13.00, category: "refrescos", subcategory: "refrescos", description: "Café con leche deslactosada" },
  { id: "cal-11", name: "Capuccino", price: 14.00, category: "refrescos", subcategory: "refrescos", description: "Espuma de leche, café y canela" },
  { id: "cal-12", name: "Mocaccino", price: 16.00, category: "refrescos", subcategory: "refrescos", description: "Café, chocolate y crema de leche" },
  { id: "cal-13", name: "Dalgona", price: 17.50, category: "refrescos", subcategory: "refrescos", description: "Crema batida de café sobre leche" },

  // =================== 18. GUARNICIONES & EXTRAS ===================
  { id: "guar-01", name: "Porción de Huevo", price: 2.50, category: "guarniciones", subcategory: "guarniciones", description: "Huevo frito montado" },
  { id: "guar-02", name: "Porción de Plátano", price: 3.00, category: "guarniciones", subcategory: "guarniciones", description: "Plátano frito" },
  { id: "guar-03", name: "Ensalada Clásica", price: 4.00, category: "guarniciones", subcategory: "guarniciones", description: "Porción de ensalada fresca" },
  { id: "guar-04", name: "Porción de Chorizo", price: 4.00, category: "guarniciones", subcategory: "guarniciones", description: "Chorizo a la plancha" },
  { id: "guar-05", name: "Porción de Tocino", price: 5.00, category: "guarniciones", subcategory: "guarniciones", description: "Tocino crocante" },
  { id: "guar-06", name: "Porción d' Arroz Blanco", price: 6.00, category: "guarniciones", subcategory: "guarniciones", description: "Porción de arroz blanco graneado" },
  { id: "guar-07", name: "Porción de Hotdog", price: 6.00, category: "guarniciones", subcategory: "guarniciones", description: "Hotdog frito" },
  { id: "guar-08", name: "Porción d' Papas Fritas", price: 10.00, category: "guarniciones", subcategory: "guarniciones", description: "Papas fritas crocantes" },
  { id: "guar-09", name: "Porción d' Arroz Chaufa", price: 15.00, category: "guarniciones", subcategory: "guarniciones", description: "Porción de arroz chaufa al wok" }
];

export const PAYMENT_INFO = {
  qrImage: "https://res.cloudinary.com/dwlzez9mr/image/upload/v1774381246/qr_payment.webp",
  accountName: "WEEKEND RESTAURANT & LOUNGE S.A.C.",
  whatsappNumber: "51961336674",
  address: "Av. Cabo Alberto Reyes #140, Huarmey, Ancash"
};
