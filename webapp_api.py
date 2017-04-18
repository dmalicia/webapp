import requests
import sys

url = 'http://localhost:3000/api/createname'
#url = 'http://requestb.in/16ll5in1'
payload = {'name': sys.argv[1], 'color': sys.argv[2], 'catsdogs': sys.argv[3]}
params = {'Content-Type': 'application/json'}

# GET
#r = requests.get(url)

# GET with params in URL
#r = requests.get(url, params=payload)

# POST with form-encoded data
#r = requests.post(url, data=payload)

# POST with JSON
import json
r = requests.post(url, headers=params, data=json.dumps(payload))
print(payload);

# Response, status etc
print(r.text);
print(r.status_code);
print(sys.argv[1:]);
