/* --- Главная: подзаголовок hero --- */
.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  font-weight: 500;
}

/* --- Поиск по VIN --- */
.search-box {
  display: flex;
  gap: 12px;
  max-width: 700px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}
.search-box .search-input {
  flex: 1 1 220px;
  min-width: 0;
}
.search-box .search-btn,
.search-box .search-clear {
  flex: 0 0 auto;
}

/* --- Тестовые VIN --- */
.test-vins {
  margin-top: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.8;
  word-break: break-word;
}
.test-vins span {
  cursor: pointer;
  color: #2563eb;
  margin: 0 4px;
  text-decoration: underline;
}

/* --- Результаты --- */
.results-panel {
  margin-top: 20px;
}
.results-title {
  font-size: 18px;
  margin-bottom: 20px;
}
.results-empty {
  text-align: center;
  padding: 20px;
}
.result-more {
  width: auto;
  padding: 8px 16px;
}

/* --- Каталог --- */
.catalog-title {
  margin-top: 40px;
}
.card-placeholder {
  opacity: 0.3;
}

/* =========================================
   МОБИЛЬНАЯ ВЕРСИЯ
   ========================================= */
@media (max-width: 768px) {
  /* Hero и поиск */
  .hero {
    padding: 20px 16px;
  }
  .hero-subtitle {
    font-size: 15px;
    margin-bottom: 14px;
    line-height: 1.4;
  }

  /* Поиск в столбик */
  .search-box {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .search-box .search-input,
  .search-box .search-btn,
  .search-box .search-clear {
    width: 100%;
    flex: 1 1 auto;
  }

  /* Тестовые VIN по центру и переносятся */
  .test-vins {
    font-size: 12px;
    text-align: center;
    line-height: 2;
    margin-top: 14px;
  }
  .test-vins span {
    display: inline-block;
    margin: 2px 4px;
  }

  /* Результаты в одну колонку */
  .result-item {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 16px 12px;
  }
  .result-price {
    text-align: left;
    font-size: 16px;
  }
  .result-more {
    width: 100%;
    text-align: center;
  }

  /* Каталог: одна карточка в ряд */
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .catalog-title {
    margin-top: 28px;
    font-size: 17px;
  }
}

/* Очень узкие экраны */
@media (max-width: 480px) {
  .hero-subtitle {
    font-size: 14px;
  }
  .test-vins {
    font-size: 11px;
  }
  .card-img {
    height: 140px;
    font-size: 40px;
  }
  .btn,
  .card-btn,
  .search-btn {
    font-size: 12px;
    padding: 11px 16px;
  }
}
