import requests
import json
import html
import re


mirrors = [
    'http://mathics.angusgriffith.com',
    'http://mathics.net',
    'http://mathics.kevz.me',
]


def check_mirror_status(mirror):
    query_url = mirror + '/ajax/query/'
    post = requests.post(query_url, data={b'query': '$Version'})
    if post.ok:
        result = json.loads(post.content.decode('utf-8'))
        result = result['results'][0]['result']
        result = html.unescape(result)
        match = re.search('(?<=Mathics.)\d\.\d', result)
        version = match.group()
    else:
        version = None
    return (post.ok, version)


result = {}
for mirror in mirrors:
    status, version = check_mirror_status(mirror)
    result[mirror] = status

print(json.dumps(result))
