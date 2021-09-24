from . import osmap_utils


def test_query_success():
    city = "Москва"
    street = "1905 года улица"

    searcher = osmap_utils.StreetSearcher(city=city)
    result = searcher.query(street)
    assert result.displayName() != None


def test_query_none():
    city = "qrwt234g34"  # random value
    street = "76j56j5j"

    searcher = osmap_utils.StreetSearcher(city=city)
    result = searcher.query(street)
    assert result.displayName() == None


def test_query_check_some_names_json():
    city = "Москва"
    street = "Ленинградское шоссе"

    some_display_names = ["Ленинградское шоссе, Молжаниновский, Молжаниновский район, Москва, Центральный федеральный округ, 141408, Россия",
                          "Ленинградское шоссе, посёлок Сокол, Сокол, район Сокол, Москва, Центральный федеральный округ, 125493, Россия",
                          "Ленинградское шоссе (дублёр), посёлок Сокол, Сокол, район Сокол, Москва, Центральный федеральный округ, 125493, Россия"]

    searcher = osmap_utils.StreetSearcher(city=city)
    result = searcher.query_json(street)

    all_names = [part["display_name"] for part in result]

    for some in some_display_names:
        assert some in all_names


def test_query_check_some_points_json():
    city = "Москва"
    street = "Пятницкая улица"

    some_points = [(56.1861292, 36.9573638),
                   (55.872695, 37.3175797),
                   (55.7324561, 37.6271598)]

    searcher = osmap_utils.StreetSearcher(city=city)
    result = searcher.query_cords(street)

    all_points = [point.get_cord() for point in result]

    for some in some_points:
        assert some in all_points
