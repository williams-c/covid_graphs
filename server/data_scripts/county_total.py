import sys
import pandas as pd
from format_counties import format_csv_by_county

def total_cases_by_county(start, end, state, counties):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  df.index.names=['Date']
  df.to_csv('total_cases_county.csv')
  return df

countiesArray = []
for i in range (4, len(sys.argv)):
  countiesArray.append(sys.argv[i])

total_cases_by_county(sys.argv[1], sys.argv[2], sys.argv[3], countiesArray)