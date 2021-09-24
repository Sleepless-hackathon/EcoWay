# EcoWay

[![Build Status](https://app.travis-ci.com/Sleepless-hackathon/EcoWay.svg?branch=main)](https://app.travis-ci.com/Sleepless-hackathon/EcoWay)

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