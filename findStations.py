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
import csv

# Returns a list of nearest stations from the Google API
def findNearest(lat,long):
    nearest_locations=[]
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyByylQ2Cq0ZqzbjLkIjeeFFJ2O8lWCsYOw&location={},{}&rankby=distance&type=subway_station'.format(lat, long)
    response = requests.get(url)

    json_data = response.json() if response and response.status_code == 200 else None
    for i in json_data["results"]:
        nearest_locations.append(i["name"])

    var_url = urlopen('https://www.transitchicago.com/rss/escalator_elevator_alertrss.aspx')
    xmldoc = parse(var_url)

    unaccesible_station =[]
    for item in xmldoc.iterfind('channel/item'):
        title = item.findtext('title')
        if("Elevator" in title ):
            unaccesible_station.append(title.split(' ')[2])

    nearest_location = [elem for elem in nearest_locations]
    for loc in nearest_locations:
        if loc in unaccesible_station:
            nearest_location.remove(loc)

    #nearest_location = set(nearest_location) - set(unaccesible_station)

    return nearest_location

# Finds the lines for any given station
def findLine(loc):
    loc_lines = []
    for key in lines.keys():
        if loc in lines[key]:
            loc_lines.append(key)
    return loc_lines    

# Returns tuples of potential start and end locations
def generatePaths(start_locs, end_locs):
    paths = []
    path_count = 0
    for start_loc in start_locs:
        for end_loc in end_locs:
            common_lines = set(findLine(start_loc)) & set(findLine(end_loc))
            if len(common_lines) != 0 and start_loc != end_loc:
                paths.append((start_loc, end_loc))
                path_count = path_count + 1
                if path_count == 3:
                    return paths
    return paths

def returnCoords(station_name):
    file = open("transit_info/stops.csv")
    reader = csv.reader(file)
    for row in reader:
        if(row[2] == station_name):
            return (row[4],row[5])

    return (91,181)

# testing code
start_lat = 41.8858
start_long = -87.6316
start_nearest = findNearest(start_lat,start_long)
print(start_nearest)

dest_lat = 41.8696
dest_long = -87.6496
dest_nearest = findNearest(dest_lat,dest_long)
print(dest_nearest)

paths = generatePaths(start_nearest, dest_nearest)
print(paths)

print(returnCoords(paths[0][0]))