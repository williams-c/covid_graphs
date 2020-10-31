import sys
import pandas as pd

def get_counties(state):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = df.loc[df['Province_State'] == state]
  df = df['Admin2']
  df.to_csv('counties_list.csv')
  return df

get_counties(sys.argv[1])

