from OSMPythonTools.nominatim import Nominatim, NominatimResult


class Cord:
    def __init__(self, lat: float, lon: float):
        self.lat = lat
        self.lon = lon

    def set_lat(self, lat: float):
        self.lat = lat

    def set_lon(self, lon: float):
        self.lon = lon

    def get_cord(self):
        return self.lat, self.lon


class StreetSearcher:
    def __init__(self, *, city):
        self.nominatim = Nominatim()
        self.city = city
        self.query_format = f"{{query}}, {self.city}"

    def query(self, street_name) -> NominatimResult:
        query_text = self.query_format.format(query=street_name)
        result = self.nominatim.query(query_text)
        return result

    def query_json(self, street_name) -> list:
        json_data = self.query(street_name).toJSON()
        return json_data

    def query_cords(self, street_name) -> list[Cord]:
        json_data = self.query_json(street_name)

        points = []

        for part in json_data:
            # рассматриваем только части которые являются дорогой (путём)
            if part["osm_type"] == "way":
                cord = Cord(float(part["lat"]), float(part["lon"]))

                points.append(cord)

        return points
