import React from 'react';
import { Link } from 'react-router-dom';

const footerImg = new URL('/images/footer.png', import.meta.url).href;

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-image">
          <img src={footerImg} alt="Гараж" />
        </div>
        <div className="footer-text">
          <div className="footer-logo">ГАРАЖ</div>
          <p>Интернет-магазин автозапчастей с подбором по VIN-коду. Точный подбор, быстрая доставка, гарантия качества.</p>
          <div className="footer-columns">
            <div>
              <h4>Магазин</h4>
              <Link to="/">Главная</Link>
              <Link to="/catalog">Каталог</Link>
            </div>
            <div>
              <h4>Покупателям</h4>
              <a href="#/">Доставка</a>
              <a href="#/">Возврат</a>
            </div>
            <div>
              <h4>Контакты</h4>
              <a href="#/">+7 (900) 000-00-00</a>
              <a href="#/">info@garage.ru</a>
            </div>
          </div>
          <p className="footer-copy">© 2026 Гараж. Учебный проект. Не является публичной офертой.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
