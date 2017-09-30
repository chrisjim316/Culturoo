from py_ms_cognitive import PyMsCognitiveImageSearch
search_term = "fish and chips"
search_service = PyMsCognitiveImageSearch('202acb04bda84cc48f8bcf57027a30a2', search_term)
first_fifty_result = search_service.search(limit=50, format='json') #1-50
second_fifty_result = search_service.search(limit=50, format='json') #51-100


print (second_fifty_result[0].content_url)