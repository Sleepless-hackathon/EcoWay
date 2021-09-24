# Пример файла для автотестов
# Если тестируем модуль qwe, то создаём файл в этой директории с названием test_qwe.py (обязательно начало с test)
# Далее испортируем все нужные модули и прописываем функции. Функции тоже должны начинаться с test
# Для запуска тестов используем скрипт run_test.sh (см. уровень ниже)

from . import useless


def test_example():
    assert 1 == 1


def test_useless():
    result = useless.something()
    assert 42 == result
