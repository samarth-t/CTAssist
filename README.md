# CTAssist

![CTAssist Logo](https://i.ibb.co/Xj8Ht0R/logo2.png)

## Wheelchair-accessible navigation just got smarter! With real-time elevator closures, live user inputs, and station accessibility infrastructure accounted for, enjoy your hassle-free journey on CTA.

### Inspiration
We wanted to ensure that as we start rekindling our connections, we keep all people in mind. So we decided to tackle the issue of accessibility, specifically in Chicago. As the situation improves, more and more people are bound to visit Chicago. Unfortunately, most common navigation tools like Google or Apple maps do not account for accessibility when recommending routes around the city. We decided to leverage easily accessible tools from the CTA to take a small step towards making city travel more accessible.

### What it does
CTAssist is a smart navigation system that suggests you the best route to take for wheelchair accessibility. It finds the nearest stations to your start and destination location using Google Maps API. Using data provided by CTA Chicago's Train tracker API, elevator/escalator and train station closure alerts from the Customer Alerts API, and user inputs, it calculates the optimum train route to your destination location.

### How we built it
We wrote it in Python, JavaScript, HTML and used a Flask server, AWS EC2 instance, and Firebase. Our frontend displayed the information using google maps api, and took in the users start and end location using google places autocomplete api. On our backend we processed the start and end coordinates and cross referenced them with a database of wheelchair accessible transit stations, CTA live feed of elevator outages, and our database of user reported outages. Using this information and the haversine method to calculate geospatial distances, we are able to generate paths for the user to follow and display them on our frontend.

### Challenges we ran into
Due to the limited time given, we were not able to integrate the Chicago bus system into our calculations for route predictions, however, in the future we plan to do so. Standardizing all our API calls and data that we accumulated from CTA's website for our own use.

### Accomplishments that we're proud of
We are proud that our algorithm was able to find the optimum train line to take between the nearest stations at each of the start and destination coordinates. Testing the results was very strenuous to make sure our calculations were working. We are also proud of our team. We are three freshman and we met coincidentally in a study hall on a Friday night never looked back since then.

### What we learned
From our competitor analysis, we found that the wheelchair friendly navigation services are sub par. There are unreasonable routes suggested, and from our limited customer discover, we found that there is a lot of room for improvement to wheelchair accessible navigation.

We learned that there is no limit to the data we have at our dispose. We were initially surprised that CTA Chicago made its data and APIs available for developers. It made the process of combining our algorithms with the reputed Google Maps API and directions API very streamlines. Researching into wheelchair accessibility also helped us identify shortages in infrastructure and hopefully our efforts provide better navigation services for wheelchair users.

### What's next for CTAssist
Implement the Bus Transfer API, prioritize real-time user inputs(potentially report these to station authorities to speed up infrastructure construction), scale this to other developed cities like NewYork and LA, provide alternate routes, improve algorithm to include transit timings.

### Gallery

![Route 1](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/480/746/datas/gallery.jpg)
![Route 2](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/480/747/datas/gallery.jpg)
![Autocomplete](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/480/745/datas/gallery.jpg)
![Outage Reporting](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/480/810/datas/gallery.jpg)
