import sys
import pandas as pd

def get_counties(state):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = df.loc[df['Province_State'] == state]
  df = df['Admin2']
  output = df.to_csv()
  print(output)
  sys.stdout.flush()

get_counties(sys.argv[1])

