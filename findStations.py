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

def findNearest(lat,long):
    nearest_location=[]
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyByylQ2Cq0ZqzbjLkIjeeFFJ2O8lWCsYOw&location={},{}&rankby=distance&type=subway_station'.format(lat, long)
    response = requests.get(url)

    json_data = response.json() if response and response.status_code == 200 else None
    for i in json_data["results"]:
        nearest_location.append(i["name"])

    var_url = urlopen('https://www.transitchicago.com/rss/escalator_elevator_alertrss.aspx')
    xmldoc = parse(var_url)

    unaccesible_station =[]
    for item in xmldoc.iterfind('channel/item'):
        title = item.findtext('title')
        if("Elevator" in title ):
            unaccesible_station.append(title.split(' ')[2])

    nearest_location= set(nearest_location) - set(unaccesible_station)

    return nearest_location

def findLine(nearest_location):
    for loc in nearest_location:
        for l in lines.keys():
            if loc in lines[l]:
                my_line = loc
    return my_line            


# testing code
lat = 41.8858
long = -87.6316
print(findNearest(lat,long))
nearest = findNearest(lat,long)
print(findLine(nearest))