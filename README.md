# EcoWay

[![Build Status](https://app.travis-ci.com/Sleepless-hackathon/EcoWay.svg?branch=main)](https://app.travis-ci.com/Sleepless-hackathon/EcoWay)

<h4>Реализованная функциональность</h4>
<ul>
    <li>Возможность просмотра карты;</li>
    <li>Поиск улицы на карте;</li>
</ul>
<h4>Особенность проекта в следующем:</h4>
<ul>
 <li>При построении маршрута анализируются данные о качестве воздуха (AQI);</li>
 <li>Автоматические подсказки при наборе адреса;</li>
 </ul>
<h4>Основной стек технологий:</h4>
<ul>
	<li>HTML, CSS, JavaScript.</li>
	<li>Flask.</li>
	<li>Gunicorn</li>
    <li>MariaDB.</li>
    <li>jQuery</li>
	<li>Travis CI.</li>
	<li>Docker,  Docker Compose.</li>
	<li>Git.</li>

 </ul>

## Использование

### Docker compose

```bash
docker-compose up --build -d
```

### Gunicorn

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
chmod +x flask_entrypoint.sh
./flask_entrypoint.sh
```

## Запуск тестов

При необходимости создаёте venv

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Запуск

```bash
pytest --verbose
```

или

```
chmod +x run_tests.sh
./run_tests.sh
```
