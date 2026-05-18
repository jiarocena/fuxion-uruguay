// 7-day meal plan extracted from PACK 5/14 DIETA KETO PDF

export interface DayPlan {
  day: number;
  type: 'A' | 'B';
  desayuno: { title: string; juice: string; meal: string; };
  mediaMañana: { title: string; meal: string; };
  almuerzo: { title: string; meal: string; };
  mediaTarde: { title: string; meal: string; };
  cena: { title: string; meal: string; };
}

export const PLAN_SEMANAL: DayPlan[] = [
  {
    day: 1, type: 'A',
    desayuno: {
      title: 'Huevos revueltos + Batido',
      juice: 'Licuar ¾ tz. de papaya en 1 tz. de agua fría + 2 chdas. de zanahoria rallada + zumo de 1 naranja + chía hidratada + Vita Xtra T+ + hielo.',
      meal: '2 huevos revueltos. Soazar en sartén 1 tomate en láminas con aceite de oliva y orégano. Acompañar al huevo revuelto. 1 chda. de chía deshidratada (hidratar en ¼ de tz. de agua caliente). 1 chdta. de aceite de oliva.',
    },
    mediaMañana: {
      title: 'Pollo con ensalada griega',
      meal: '120 g. de pechuga a la plancha con ajo. 1 tj. de queso fresco bajo en grasa en dados. 8 almendras. Ensalada de 1 tz. de tomate picado + ½ tz. de cebolla corte juliana + 1 tz. de pepino en rodajas + 1 tz. de apio en dados + albahaca al gusto. Añadir 5 aceitunas negras sin pepa en rodajas + aliño (1 chdta. de aceite de oliva + limón + sal + pimienta + ajo al gusto).',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Soufflé de poro',
      meal: 'Saltear en aceite de oliva 1½ poro rallado grueso (la parte blanca), retirar del fuego. Mezclar en un bowl el poro + ¼ de leche evaporada baja en grasa + 1 huevo + 1 clara batidos + nuez moscada + sal + pimienta. Colocar en un pirex y espolvorear con queso parmesano. Meter al horno, cocer y gratinar (5 min. microondas / 20 min. horno). 1 chdta. de aceite de oliva (para el soufflé). 1 chdta. de queso parmesano (para gratinar).',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 2, type: 'A',
    desayuno: {
      title: 'Guacamole con apio y huevos de codorniz',
      juice: 'Licuar 6 fresas + zumo de 1 naranja + 2 hojas de espinaca + linaza + Vita Xtra T+ + hielo.',
      meal: '6 huevos de codorniz. Mezclar 1 tomate en dados + ½ cebolla picadita, culantro picadito al gusto + zumo de 1 limón + palta prensada. Acompañar con 10 bastones de apio. ½ palta prensada. 1 chda. de semillas de linaza.',
    },
    mediaMañana: {
      title: 'Pescado con ensalada mediterránea',
      meal: '120 g. de trucha (o cualquier pescado) a la plancha con curry, sal y pimienta. 3 pecanas. 1 chda. de aceite de oliva. Ensalada de brócoli cocido al vapor + espinaca + lechuga romana + tomate en dados s/semilla + zanahoria y rábanos rallados. Añadir ¼ de palta en dados + aliño (1 chdta. de aceite de oliva + vinagre balsámico + 1 chdta. de mostaza + sal + pimienta + ajo al gusto).',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Saltado de vegetales y jamón',
      meal: 'Saltear en aceite de oliva: cebolla blanca + brócoli + pimiento + zapallito italiano (zuccini) + jamón. 1 chdta. de aceite de oliva (para el saltado). 2 tj. de jamón de pavo (60 g.) enrollado o en dados.',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 3, type: 'B',
    desayuno: {
      title: 'Pizzetas + Batido',
      juice: 'Licuar ¾ de tz. de manzana en 1 tz. de agua fría + ½ tz. de espinaca picada + ½ chdta. de kión rallado + zumo de ½ limón + chía + Thermo T3 + hielo.',
      meal: '1 Pan pita integral pequeño (2 tapas) rociar con aceite de oliva, acomodar el tomate, queso, aceitunas y orégano. Gratinar al horno o microondas. 6-8 rodajas de tomate espolvoreadas con orégano. 5 aceitunas verdes en rodajas. 2 chdas. de queso mozzarella bajo en grasa rallado. 1 chdta. de aceite de oliva. 1 chda. de chía deshidratada.',
    },
    mediaMañana: {
      title: 'Quinoa chaufa con pollo',
      meal: '120 g. de pechuga de pollo en dados, cocida a la plancha con ajo y kión rallado. Quinoa al dente: Lavar bien ¼ tz. de quinoa (3 veces). Llevar al agua hirviendo por 15 min. hasta cocida al dente. Enfriar y colar. Saltear en aceite de ajonjolí: champiñones + tomates + cebolla china picada. Combinar con ½ tz. de quinoa graneada, salsa de soja y de ostión, sal al gusto. Espolvorear con semillas de ajonjolí. 1 chdta. de aceite de ajonjolí. 1 chda. de semillas de ajonjolí tostado.',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Omelette con vegetales',
      meal: 'Saltear en aceite de oliva: champiñones + espinaca + pimiento + cebolla blanca. Agregar los huevos batidos, cocinar, voltear y servir. 2 huevos completos (batidos con sal y pimienta). 8 almendras. 1 chdta. de aceite de oliva (para el omelette).',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 4, type: 'A',
    desayuno: {
      title: 'Ensalada Caprese + Batido',
      juice: 'Licuar ¾ tz. de fresas en 1 tz. de agua fría + 2 chdas. de betarraga rallada + linaza + Vita Xtra T+ + hielo.',
      meal: 'Colocar tomate en rodajas en un plato (una al lado de la otra). Encima de cada una poner un pedazo de queso mozzarella y hojas de albahaca. Chorrear aceite de oliva y sal al gusto. 2 tj. de queso mozzarella bajo en grasa. 1 chda. de aceite de oliva. 1 chda. de semillas de linaza.',
    },
    mediaMañana: {
      title: 'Pavo con ensalada',
      meal: '120 g. de medallón de pavita a la plancha con sal y páprika. 3 pecanas. Ensalada de lechuga romana picada + espinaca cruda picada + brócoli cocido al vapor + champiñones salteados + tiras de pimiento. Añadir 1 chda. de queso fresco rallado + aliño (1 chdta. de aceite de oliva + limón + sal + pimienta + perejil picado + ajo al gusto).',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Soufflé de vegetales',
      meal: 'Saltear en aceite de coco champiñones, agregar tomate en dados + 1 tz. de espinaca picada + sal y pimienta. Combinar todo con el queso y huevo. Ponerlo en un pirex personal y llevarlo al microondas por 6 min (horno 20 min). 1 chdta. de aceite de coco. 2 chdas. de queso mozzarella bajo en grasa rallado. 1 huevo completo. ½ palta prensada.',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 5, type: 'A',
    desayuno: {
      title: 'Omelette + Batido',
      juice: 'En 1 tz. de agua fría licuar 1 tz. de fresas + arándanos + 2 chdas. de pepino picado (sin pepas) + chía + Vita Xtra T+ + hielo.',
      meal: 'Omelette de champiñones + espinaca + pimiento + cebolla blanca. 2 huevos. 1 chda. de aceite de oliva (para freír). 1 chda. de chía deshidratada. 8 almendras.',
    },
    mediaMañana: {
      title: 'Pescado sudado con ensalada',
      meal: '120 g. de cojinova (o cualquier otro pescado blanco) sudado con aros de cebolla + tomate + perejil + vinagre blanco + sal y pimienta. Añadir ¼ de palta en dados o 5 aceitunas partidas + aliño (1 chdta. de aceite de oliva + limón + 1 chdta. de mostaza + sal + pimienta + ajo). Ensalada de corazones de alcachofa en tiras + col morada picada + ½ de betarraga rallada + lechuga romana + tiras de pimientos.',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Sopa casera con pollo',
      meal: 'Hervir la pechuga + poro + nabo + zapallo + apio + zanahoria en dados + pizca de kión + sal + aceite de oliva. Una vez hervido, agregar el huevo y batir. 60 g. de pechuga de pollo. 1 huevo batido. 1 chdta. de aceite de oliva.',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 6, type: 'B',
    desayuno: {
      title: 'Kekitos de avena',
      juice: 'Licuar ¾ tz. de fresas en 1 tz. de agua fría + ¼ palta + Vita Xtra T+ + hielo. Opcional: Añadir 1/3 de tz. de jugo de naranja y ½ chdta. de ralladura de cáscara de naranja.',
      meal: 'Mezclar 1/3 tz. de avena cruda + canela en polvo + esencia de vainilla + aceite de coco derretido + chía hidratada + BioPro+ Fit y NoCarb-T. Luego incorporar 2 huevos batidos (primero batir la clara a punto de nieve, luego agregar la yema) a la premezcla. Acomodar en moldes de kekitos engrasados y poner al horno por 20 min, a 200°C (microondas 5 min.). 1 chda. de aceite de coco. 1 chda. de chía deshidratada.',
    },
    mediaMañana: {
      title: 'Poke Bowl',
      meal: '120 g. de lomo de atún picado en trozos (al natural o enlatado). Añadir ½ tz. de quinoa hervida al dente. 1 tz. de col morada picada + 1 pepino en dados + 1 zanahoria rallada + pimiento en tiras + cebollita china picada. Acomodar los ingredientes uno al costado del otro, junto con el atún y la quinoa, en un plato hondo (bowl). ¼ de palta en dados + aliño (1 chda. de aceite de ajonjolí + salsa de soja + limón + sal y pimienta) + 1 chdta. de semillas de ajonjolí.',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Lomo oriental',
      meal: 'Dorar 60 g. de carne lomo fino (o pollo) en cuadrados con aceite de ajonjolí + cebolla roja + pimiento en dados + zapallito italiano en bastones + colantao + brócoli al vapor + frejolito chino + kión rallado + sal. 1 chda. de aceite de ajonjolí. 3 pecanas. 1 chdta. de semillas de ajonjolí para espolvorear.',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
  {
    day: 7, type: 'A',
    desayuno: {
      title: 'Parfait de chía y arándanos',
      juice: 'Licuar ¾ de tz. de piña en 1 tz. de agua + 2 chdas. de pepino + 3 hojas de hierbabuena + zumo de 1 limón + linaza + Thermo T3 + hielo.',
      meal: 'Combinar en un bowl pequeño chía hidratada con aceite de coco derretido + zumo + ralladura de limón y 1/3 de tz. de arándanos azules. Aparte disolver en ½ tz. de agua tibia BioPro+ Fit + Vita Xtra T+. Incorporar ambas mezclas y refrigerar por media hora (de preferencia preparar el día anterior). 2 chdas. de chía. 1 chdta. de aceite de coco. 1 chda. de semillas de linaza.',
    },
    mediaMañana: {
      title: 'Ceviche de pescado',
      meal: '200 g. de pescado blanco fresco cortado en dados. En un bowl sazonar el pescado con sal, limón y ají limo, mezclar bien. Colocar sobre cama de 4 hojas de lechuga + ½ cebolla corte juliana. Bañar con leche de tigre y acompañar con ½ palta. Leche de tigre: Licuar 25 g. de retazos de pescado + ¼ de diente de ajo + 1 rama de culantro + ¼ de tallo de apio + 1/8 de cebolla + 1 tz. de zumo de limón + ½ ají limo + sal y pimienta.',
    },
    almuerzo: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
    mediaTarde: {
      title: 'Pollo a la brasa con ensalada',
      meal: '60 g. de pechuga de pollo a la brasa, sin piel (½ pechuga). Ensalada mixta: Lechuga + tomate + zanahoria rallada. Añadir ½ palta + aliño (1 chdta. de aceite de oliva + limón + 1 chdta. de mostaza + sal + pimienta + ajo al gusto).',
    },
    cena: { title: 'Batido', meal: 'BioPro+ Fit batido en 1 vaso de agua fría.' },
  },
];
