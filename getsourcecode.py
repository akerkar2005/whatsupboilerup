from urllib.request import urlopen
from datetime import datetime, timedelta
from threading import Timer

def getsourcecode():
    response = urlopen("https://boilerlink.purdue.edu/events.rss")
    page_source = response.read()

    print(page_source)

    result = open("results.txt", "w")
    result.write(str(page_source))
    result.close()

    t = Timer(secs, getsourcecode)
    t.start()


x=datetime.today()
y = x.replace(day=x.day, hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)
delta_t=y-x

secs=delta_t.total_seconds()    

t = Timer(secs, getsourcecode)
t.start()

getsourcecode()