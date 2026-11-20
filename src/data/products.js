// Тестовые VIN для проверки поиска:
// XW7BF4FKX0S123456 — Toyota Camry
// JTDBR32E720123456 — Kia Rio
// XTA210990Y1234567 — Lada Vesta

const products = [
  { id: 101, name: "Тормозные колодки передние", brand: "Bosch", price: 3500, category: "Тормозная система", icon: "🛑", stock: 12, description: "Комплект на переднюю ось, низкий уровень шума.", vin: ["XW7BF4FKX0S123456", "XTA210990Y1234567"] },
  { id: 102, name: "Тормозные колодки задние", brand: "Textar", price: 2900, category: "Тормозная система", icon: "🛑", stock: 9, description: "Задняя ось, керамический состав.", vin: ["XW7BF4FKX0S123456"] },
  { id: 103, name: "Тормозной диск передний", brand: "Brembo", price: 5800, category: "Тормозная система", icon: "💿", stock: 6, description: "Вентилируемый диск.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456"] },
  { id: 104, name: "Тормозной шланг", brand: "TRW", price: 1400, category: "Тормозная система", icon: "💿", stock: 20, description: "Армированный шланг.", vin: ["JTDBR32E720123456"] },
  { id: 105, name: "Масляный фильтр", brand: "Mann-Filter", price: 800, category: "Фильтры", icon: "🧩", stock: 30, description: "Для бензиновых двигателей.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 106, name: "Воздушный фильтр", brand: "Mann-Filter", price: 950, category: "Фильтры", icon: "🧩", stock: 15, description: "Панельный, увеличенная площадь.", vin: ["JTDBR32E720123456"] },
  { id: 107, name: "Топливный фильтр", brand: "Mann-Filter", price: 1100, category: "Фильтры", icon: "🧩", stock: 18, description: "Глубокая очистка топлива.", vin: ["XW7BF4FKX0S123456"] },
  { id: 108, name: "Салонный фильтр угольный", brand: "Bosch", price: 1300, category: "Фильтры", icon: "🧩", stock: 22, description: "С угольной пропиткой.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 109, name: "Свечи зажигания (4 шт.)", brand: "Denso", price: 1200, category: "Двигатель", icon: "⚡", stock: 25, description: "Иридиевые, стабильная искра.", vin: ["JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 110, name: "Ремень ГРМ", brand: "Gates", price: 2400, category: "Двигатель", icon: "⚙️", stock: 10, description: "Комплект с роликами.", vin: ["XW7BF4FKX0S123456"] },
  { id: 111, name: "Цепь ГРМ", brand: "INA", price: 4800, category: "Двигатель", icon: "⚙️", stock: 5, description: "Цепной привод с натяжителем.", vin: ["JTDBR32E720123456"] },
  { id: 112, name: "Катушка зажигания", brand: "Bosch", price: 2800, category: "Двигатель", icon: "⚡", stock: 14, description: "Индивидуальная катушка.", vin: ["XW7BF4FKX0S123456"] },
  { id: 113, name: "Лямбда-зонд", brand: "NGK", price: 4200, category: "Двигатель", icon: "⚙️", stock: 8, description: "Кислородный датчик.", vin: ["JTDBR32E720123456"] },
  { id: 114, name: "Прокладка ГБЦ", brand: "Elring", price: 2200, category: "Двигатель", icon: "⚙️", stock: 7, description: "Оригинальная прокладка.", vin: ["XW7BF4FKX0S123456"] },
  { id: 115, name: "Помпа водяная", brand: "Hepu", price: 5600, category: "Охлаждение", icon: "❄️", stock: 4, description: "Насос охлаждающей жидкости.", vin: ["XW7BF4FKX0S123456"] },
  { id: 116, name: "Радиатор охлаждения", brand: "Nissens", price: 8900, category: "Охлаждение", icon: "❄️", stock: 3, description: "Основной радиатор.", vin: ["JTDBR32E720123456"] },
  { id: 117, name: "Термостат", brand: "Wahler", price: 1700, category: "Охлаждение", icon: "❄️", stock: 16, description: "88°C, с уплотнителем.", vin: ["JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 118, name: "Вентилятор охлаждения", brand: "Valeo", price: 6400, category: "Охлаждение", icon: "❄️", stock: 5, description: "Электрический вентилятор.", vin: ["XW7BF4FKX0S123456"] },
  { id: 119, name: "Амортизатор передний", brand: "KYB", price: 4500, category: "Подвеска", icon: "🔩", stock: 11, description: "Газомасляный.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456"] },
  { id: 120, name: "Амортизатор задний", brand: "KYB", price: 4200, category: "Подвеска", icon: "🔩", stock: 13, description: "Газомасляный, задняя ось.", vin: ["XW7BF4FKX0S123456"] },
  { id: 121, name: "Шаровая опора", brand: "TRW", price: 2100, category: "Подвеска", icon: "🔩", stock: 19, description: "Нижняя опора рычага.", vin: ["XW7BF4FKX0S123456"] },
  { id: 122, name: "Сайлентблок рычага", brand: "Lemforder", price: 1800, category: "Подвеска", icon: "🔩", stock: 24, description: "Резинометаллический шарнир.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456"] },
  { id: 123, name: "Ступичный подшипник", brand: "SKF", price: 3400, category: "Подвеска", icon: "🔩", stock: 9, description: "Ступичный узел.", vin: ["JTDBR32E720123456"] },
  { id: 124, name: "Стабилизатор поперечный", brand: "TRW", price: 2700, category: "Подвеска", icon: "🔩", stock: 8, description: "Стойка стабилизатора.", vin: ["XW7BF4FKX0S123456"] },
  { id: 125, name: "Аккумулятор 60 Ач", brand: "Varta", price: 7200, category: "Электрика", icon: "🔋", stock: 10, description: "Обслуживаемый, 60 Ач.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 126, name: "Генератор", brand: "Bosch", price: 14500, category: "Электрика", icon: "🔋", stock: 3, description: "14 В, 90 А.", vin: ["XW7BF4FKX0S123456"] },
  { id: 127, name: "Стартер", brand: "Valeo", price: 9800, category: "Электрика", icon: "🔋", stock: 4, description: "Редукторный стартер.", vin: ["JTDBR32E720123456"] },
  { id: 128, name: "Моторное масло 5W-30 (4 л)", brand: "Mobil 1", price: 3200, category: "Масла", icon: "🛢️", stock: 20, description: "Полная синтетика.", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456", "XTA210990Y1234567"] },
  { id: 129, name: "Моторное масло 0W-20 (4 л)", brand: "Castrol", price: 3600, category: "Масла", icon: "🛢️", stock: 15, description: "Энергосберегающее.", vin: ["JTDBR32E720123456"] },
  { id: 130, name: "Щетки стеклоочистителя", brand: "Bosch", price: 1500, category: "Аксессуары", icon: "🧽", stock: 40, description: "Каркасные, 600 мм.", vin: [] },
  { id: 131, name: "Ковики резиновые (комплект)", brand: "Nov菱", price: 1900, category: "Аксессуары", icon: "🧽", stock: 28, description: "4 шт., с бортиком.", vin: [] },
  { id: 132, name: "Рулевой наконечник", brand: "Moog", price: 1900, category: "Рулевое", icon: "🎯", stock: 17, description: "Левый/правый.", vin: ["XW7BF4FKX0S123456"] }
];

// Клиенты (минимум 3, как требует методичка)
export const clients = [
  { id: 1, name: "Иван Петров", email: "ivan@example.com", password: "123456", phone: "+7-900-111-22-33", address: "г. Юрга, ул. Ленина, 10" },
  { id: 2, name: "Мария Сидорова", email: "maria@example.com", password: "123456", phone: "+7-900-444-55-66", address: "г. Кемерово, пр. Советский, 25" },
  { id: 3, name: "Алексей Кузнецов", email: "alexey@example.com", password: "123456", phone: "+7-900-777-88-99", address: "г. Томск, ул. Баумана, 5" }
];

// Стартовые заказы (связаны с clientId и productId)
export const initialOrders = [
  { id: 1001, clientId: 1, date: "2026-02-10", status: "completed", items: [{ productId: 101, quantity: 1, price: 3500 }, { productId: 105, quantity: 1, price: 800 }], total: 4300 },
  { id: 1002, clientId: 2, date: "2026-02-12", status: "pending", items: [{ productId: 109, quantity: 2, price: 1200 }], total: 2400 },
  { id: 1003, clientId: 3, date: "2026-02-14", status: "completed", items: [{ productId: 103, quantity: 1, price: 5800 }], total: 5800 }
];

export default products;
