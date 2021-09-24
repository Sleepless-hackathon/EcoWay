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
