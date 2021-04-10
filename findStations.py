brown  = ["Kimball", "Kedzie", "Francisco", "Rockwell", "Western", "Damen", "Montrose", "Irving Park", "Addison", "Paulina", "Southport", "Belmont", "Wellington", "Diversey", "Fullerton", "Armitage", "Sedgwick", "Chicago", "Merchandise Mart", "Washington/Wells", "Quincy", "Harold Washington Library-State/Van Buren", "Washington/Wabash", "Clark/Lake"]

blue = ["O’Hare", "Rosemont", "Cumberland", "Harlem (O'Hare branch)", "Jefferson Park", "Addison", "Logan Square", "Western (O’Hare branch)", "Clark/Lake", "Jackson", "UIC-Halsted", "Illinois Medical District", "Kedzie-Homan", "Forest Park"]

green = ["Ashland/63rd", "Halsted", "Cottage Grove", "King Drive", "Garfield", "51st", "47th", "43rd", "Indiana", "35th-Bronzeville-IIT", "Cermak-McCormick Place", "Roosevelt", "Washington/Wabash", "Clark/Lake", "Clinton", "Morgan", "Ashland", "California", "Kedzie", "Conservatory-Central Park Drive", "Pulaski", "Cicero", "Laramie", "Central", "Harlem/Lake (via Marion entrance)"]

orange = ["Midway", "Pulaski", "Kedzie", "Western", "35/Archer", "Ashland", "Halsted", "Roosevelt; also Harold Washington Library-State/Van Buren", "Quincy", "Washington/Wells", "Clark/Lake", "Washington/Wabash"]

pink = ["54th/Cermak", "Cicero", "Kostner", "Pulaski", "Central Park", "Kedzie", "California", "Western", "Damen", "18th", "Polk", "Ashland", "Morgan", "Clinton", "Clark/Lake", "Washington/Wabash", "Harold Washington Library-State/Van Buren", "Quincy", "Washington/Wells"]

purple = ["Linden", "Davis", "Howard", "Wilson", "Belmont", "Wellington", "Diversey", "Fullerton", "Armitage", "Sedgwick", "Chicago", "Merchandise Mart", "Clark/Lake", "Washington/Wabash", "Harold Washington Library-State/Van Buren", "Quincy", "Washington/Wells"]

red = ["Howard", "Loyola", "Granville", "Wilson", "Addison", "Belmont", "Fullerton", "Clark/Division", "Chicago", "Grand", "Lake", "Jackson", "Roosevelt", "Cermak-Chinatown", "Sox-35th", "47th", "Garfield", "63rd", "69th", "79th", "87th", "95th/Dan Ryan"]

lines = {'brown' : brown, 'blue' : blue, 'green' : green, 'orange' : orange, 'pink' : pink, 'purple' : purple, 'red' : red}


from urllib.request import urlopen
from xml.etree.ElementTree import parse
import requests

response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyByylQ2Cq0ZqzbjLkIjeeFFJ2O8lWCsYOw&location=41.9773,-87.8369&rankby=distance&type=subway_station')

json_data = response.json() if response and response.status_code == 200 else None
print (json_data)py

# if json_data and 'hoststatuslist' in json_data:
#     if 'hoststatus' in json_data['hoststatuslist']:
#         for hoststatus in json_data['hoststatuslist']['hoststatus']:
#             host_name = hoststatus.get('name')
#             status_text = hoststatus.get('status_text')


var_url = urlopen('https://www.transitchicago.com/rss/escalator_elevator_alertrss.aspx')
xmldoc = parse(var_url)

unaccesible_station =[];
for item in xmldoc.iterfind('channel/item'):
    title = item.findtext('title')
    if("Elevator" in title ):
        unaccesible_station.append(title.split(' ')[2])

#print(unaccesible_station)
