FROM python:3.9-buster

WORKDIR /app

RUN pip install gunicorn
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .