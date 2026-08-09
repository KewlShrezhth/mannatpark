import urllib.request
import os

urls = [
    ("https://newprojects.99acres.com/projects/mak_infra/mak_the_mannat_park/images/4sdvkni_1722423250_508103417_large.jpg", "public/images/99acres_tour1.jpg"),
    ("https://imagecdn.99acres.com/projects/mak_infra/mak_the_mannat_park/images/sab/nvc6gdv_1722427135_508125937_med.jpg", "public/images/99acres_tour2.jpg"),
    ("https://newprojects.99acres.com/projects/mak_infra/mak_the_mannat_park/tiyflnt_1722250429_507653827_O.jpg", "public/images/99acres_tour3.jpg"),
    ("https://newprojects.99acres.com/projects/makinfra/lfvwqzw_1722248081_507630715_O.jpg", "public/images/99acres_tour4.jpg"),
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for url, dest in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(dest, 'wb') as f:
                f.write(response.read())
            print(f"Downloaded {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {dest}: {e}")
