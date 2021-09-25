import os
import csv
import pandas as pd

dataset = "./data-csv/"

keys = ['Дата измерения', 'Температура', 'Влажность', 'СО2', 'ЛОС',
        'Пыль pm 1.0', 'Пыль pm 2.5', 'Пыль pm 10', 'Давление', 'AQI', 'Формальдегид']

if not os.path.exists(dataset):
    os.system("./download_data.sh")

files = os.listdir(dataset)
files.sort()

dataframes = []

for file in files:
    full_path = os.path.join(dataset, file)

    name, tail = file.split("_")
    sensor_n, tail = tail.split(".")
    name = name.strip()
    sensor_n = int(sensor_n)

    print(name, "|", sensor_n)

    df = pd.read_csv(full_path)
    dataframes.append({"name": name, "number": sensor_n, "df": df})

    # with open(full_path) as csvfile:

    # reader = csv.DictReader(csvfile)

    # for row in reader:
    #     date = row['Дата измерения']
    #     temp = row['Температура']
    #     humid = row['Влажность']
    #     co2 = row['СО2']
    #     los = row['ЛОС']
    #     pm1_0 = row['Пыль pm 1.0']
    #     pm2_5 = row['Пыль pm 2.5']
    #     pm10 = row['Пыль pm 10']
    #     pressure = row['Давление']
    #     AQI = row['AQI']
    #     formald = row['Формальдегид']

    #     # print(row)

# print(dataframes)

all_df = pd.DataFrame(dataframes)
all_df.to_pickle("dataset.pkl")
